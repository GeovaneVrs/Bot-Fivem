const Discord = require("discord.js");
const io = require("socket.io-client");
const config = require('../config.json').scriptToken;

function connectedWs(token) {
  const socket = io("ws://localhost:3000", {
    transports: ["websocket"],
    auth: {
      token,
    },
  });
  return socket;
}
const socket = connectedWs(config);

module.exports = {
  name: "addcar",
  description: "addcar",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "id",
      description: "id da pessoa",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "carro",
      description: "carro",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let id = interaction.options.getString("id");
    let carro = interaction.options.getString("carro");
    socket.emit("command", { command: "addcar", id, carro});

    let embed = new Discord.EmbedBuilder()
      .setColor("#85dac0")
      .setDescription(`> :oncoming_automobile: | O carro: \`${carro}\` foi adicionado com sucesso ao id: \`${id}\`.`)
      
    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
