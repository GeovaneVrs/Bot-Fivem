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
  name: "addgroup",
  description: "addgroup",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "id",
      description: "id da pessoa",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "permissão",
      description: "permissão",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    }
  ],

  run: async (client, interaction) => {
    let id = interaction.options.getString("id");
    let permissao = interaction.options.getString("permissão");
    socket.emit("command", { command: "addgroup", id, 'permissão': permissao});

    let embed = new Discord.EmbedBuilder()
      .setColor(`#2f3136`)
      .setDescription(`> O id: \`${id}\` foi adicionado ao grupo: \`${permissao}\` com sucesso!`)
      .setTimestamp(new Date());

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
