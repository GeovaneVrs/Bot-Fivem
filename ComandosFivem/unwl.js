const Discord = require("discord.js")
const mysql = require("mysql")
const config = require('../config.json');

module.exports = {
    name: "unwl",
    description: "unwl",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'steam',
            description: 'steam da pessoa',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async(client, interaction) => {
        const con = mysql.createConnection(config.mysql);

        let steam = interaction.options.getString('steam')
        let valor = 0
        let sql = `UPDATE summerz_accounts SET whitelist = '${valor}' WHERE steam = '${steam}'`
        con.query(sql, function (err, result) {
            if (err) throw err;
        })

        
        let embed = new Discord.EmbedBuilder()
        .setColor(`#2f3136`)
        .setDescription(`> A Steam **${steam}** Teve a Whitelist retirada.`)
        .setTimestamp(new Date())
    
        interaction.reply({
            embeds: [embed],ephemeral: true
         })
         
    }
}