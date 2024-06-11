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
  name: "pon",
  description: "pon",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    socket.emit("command", { command: "pon" });
    socket.on("pon", (response) => {
      let embed = new Discord.EmbedBuilder()
      .setColor(`#2f3136`)
      .setDescription(`
        > **Total onlines:** ${response["quantidade"]}\n
        > **IDs onlines:** ${response["players"]}
      `)

      interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    })
  },
};
