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
  name: "kick",
  description: "kick",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "id",
      description: "id da pessoa",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let id = interaction.options.getString("id");
    socket.emit("command", { command: "kick", id });

    let embed = new Discord.EmbedBuilder()
      .setColor(`#2f3136`)
      .setDescription(`> O ID: \`${id}\` foi kickado da cidade com sucesso.`)
      .setTimestamp(new Date());

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
