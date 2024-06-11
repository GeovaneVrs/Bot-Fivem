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
  name: "ensure",
  description: "ensure",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "script",
      description: "teste",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let script = interaction.options.getString("script");
    socket.emit("command", { command: "ensure", script });

    let embed = new Discord.EmbedBuilder()
      .setColor(`#2f3136`)
      .setDescription(`> Ensure dado com sucesso no script: ${script}  `)
      .setTimestamp(new Date());

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
