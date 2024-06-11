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
  name: "removeitem",
  description: "removeitem",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "id",
      description: "id da pessoa",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "item",
      description: "item",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "quantidade",
      description: "quantidade",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let id = interaction.options.getString("id");
    let item = interaction.options.getString("item");
    let quantidade = interaction.options.getString("quantidade");
    socket.emit("command", { command: "remitem", id, item, quantidade});

    let embed = new Discord.EmbedBuilder()
      .setColor(`#2f3136`)
      .setDescription(`> O item: \`${item}\` foi removido do inventario do id: \`${id}\``)
      .setTimestamp(new Date());

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
