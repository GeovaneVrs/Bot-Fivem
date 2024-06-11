const Discord = require("discord.js")
const mysql = require("mysql")
const config = require("../config.json")
module.exports = {
    name: "bank",
    description: "trocar o valor da conta do id",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'id',
            description: 'id da pessoa',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'valor',
            description: 'valor',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async(client, interaction) => {
        const con = mysql.createConnection(config.mysql);
      
        let id = interaction.options.getString('id')
        let valor = interaction.options.getString('valor')
       
        let sql = `UPDATE summerz_characters SET bank = '${valor}' WHERE id = '${id}'`
        con.query(sql, function (err, result) {
            if (err) throw err;
        })

        let embed = new Discord.EmbedBuilder()
        .setColor(`#2f3136`)
        .setDescription(`> O saldo Bancário do ID: \`${id}\` foi alterado para o valor: \`${valor}\``)
        .setTimestamp(new Date())
    
        interaction.reply({
            embeds: [embed],ephemeral: true
         })
    }
}