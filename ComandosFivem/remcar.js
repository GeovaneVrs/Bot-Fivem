const Discord = require('discord.js');
const mysql = require('mysql'); 
const config = require('../config.json');

module.exports = {
    name: "remcar",
    description: "remcar",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'id',
            description: 'id da pessoa',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'carro',
            description: 'carro',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async(client, interaction) => {
        let id = interaction.options.getString('id')
        let carro = interaction.options.getString('carro')
        const connection = mysql.createConnection(config.mysql);

        connection.query(`DELETE FROM summerz_vehicles WHERE user_id = '${id}' AND vehicle = '${carro}'`, (err, rows) => { 
           let embed = new Discord.EmbedBuilder()

            .setDescription(`:oncoming_automobile: | Carro: \`${carro}\` foi retirado do ID: \`${id}\` com sucesso.`)
            .setColor("#85dac0")
           
            return  interaction.reply({
                embeds: [embed],ephemeral: true
             })
        });
}

}