const Discord = require("discord.js")
const mysql = require("mysql")
const config = require('../config.json');

module.exports = {
    name: "numero",
    description: "numero que quer setar",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'id',
            description: 'id da pessoa',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'numero',
            description: 'seguir o exemplo: 491-201',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async(client, interaction) => {
        const connection = mysql.createConnection(config.mysql);

        let id = interaction.options.getString('id')
        let numero = interaction.options.getString('numero')
        let sql = `UPDATE summerz_characters SET phone = '${numero}' WHERE id = '${id}'`
        connection.query(sql, function (err, result) {
            if (err) throw err;
        })

         
        let embed = new Discord.EmbedBuilder()
        .setColor(`#2f3136`)
        .setDescription(`> O Número do ID: \`${id}\` foi alterado para \`${numero}\``)
        .setTimestamp(new Date())
    
        interaction.reply({
            embeds: [embed],ephemeral: true
         })
    }
}