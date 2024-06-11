const Discord = require("discord.js")
const mysql = require("mysql")
const config = require('../config.json');

module.exports = {
    name: "user",
    description: "trocar dados do personagem",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'id',
            description: 'id da pessoa',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'firstname',
            description: 'primeiro nome',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'name',
            description: 'id da pessoa',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'age',
            description: 'id da pessoa',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async(client, interaction) => {
        const con = mysql.createConnection(config.mysql);

        let id = interaction.options.getString('id')
        let firstname = interaction.options.getString('firstname')
        let name = interaction.options.getString('name')
        let age = interaction.options.getString('age')
        let sql = `UPDATE summerz_characters SET name = '${firstname}' WHERE id = '${id}'`
        let sql2 = `UPDATE summerz_characters SET name2 = '${name}' WHERE id = '${id}'`
        let sql3 = `UPDATE summerz_characters SET age = '${age}' WHERE id = '${id}'`
        con.query(sql, function (err, result) {
            if (err) throw err;
        })
        con.query(sql2, function (err, result) {
            if (err) throw err;
        })
        con.query(sql3, function (err, result) {
            if (err) throw err;
        })

        
        let embed = new Discord.EmbedBuilder()
        .setColor(`#2f3136`)
        .setDescription(`> O ID **${id}** teve o nome alterado para **${firstname} ${name}** e idade para **${age}**.`)
        .setTimestamp(new Date())
    
        interaction.reply({
            embeds: [embed],ephemeral: true
         })
    }
}