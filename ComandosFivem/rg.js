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
  name: "rg",
  description: "informações do player",
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
    socket.emit("command", { command: "rg", id });
    socket.on("rg", (response) => {
      const inventory = response["inventory"]
      const weight = response["weight"]
      const hunger = response["hunger"]
      const perm = response["perm"]
      const thirst = response["thirst"]
      const bank = response["bank"]
      const phone = response["phone"]
      const name = response["name"]
      const age = response["age"]
      const isBan = response["isBan"]
      const vehicles = response["vehicles"]
      
      let embed = new Discord.EmbedBuilder()
      .setColor(`#2f3136`)
      .setDescription(`
        > **PLAYER INFO:**
        \`\`\`yaml\n${name} | ${id}\`\`\`
      `)
      .addFields( 
        {
          name: '**Banido:**',
          value: `${isBan ? "✅" : "❌"}`,
          inline: true
        },
        {
          name: '**Idade:**',
          value: `${age}`,
          inline: true
        },
        {
          name: '**Telefone:**',
          value: `${phone}`,
          inline: true
        },
        {
          name: '**Banco:**',
          value: `${bank}`,
          inline: true
        },
        {
          name: '**Fome:**',
          value: `${hunger}`,
          inline: true
        },
        {
          name: '**Sede:**',
          value: `${thirst}`,
          inline: true
        },
        {
          name: '**Veiculos:**',
          value: `\`\`\`${vehicles.map((vehicle, index, arr) => `\n${vehicle.name} ${index !== arr.length - 1 ? ``: ''}`).join("")}\`\`\``,
          inline: true
        },
        {
          name: '**Groups:**',
          value: `\`\`\`${perm.map((group) => `${group.perm} \n`).join("")}\`\`\``,
          inline: true
        },
        {
          name: '**Inventario:**',
          value: `\`\`\`${inventory.map((item) =>  `${item.item}: ${item.amount}\n` ).join("")}\`\`\``,
          inline: true
        },
      )

      interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    })
  },
};
