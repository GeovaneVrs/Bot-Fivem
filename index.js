const Discord = require("discord.js");
const token = require("./meutoken").token;
const fs = require("fs");
const { JsonDatabase } = require("wio.db");
const config = require("./config.json");
const mysql = require("mysql");
const { Server } = require("socket.io");
const datefns = require("date-fns");
const io = new Server(3000);

io.on("connection", (socket) => {
  const token = socket.handshake.auth.token
  socket.join(token);
  socket.on("command", (command) => {
    socket.to(token).emit("command", command);
  });

  socket.on("pon", (pon) => {
    socket.to(token).emit("pon", pon);
  });

  socket.on("rg", (rg) => {
    socket.to(token).emit("rg", rg);
  });
});

// Database
global.db = new JsonDatabase({
  databasePath: "./databases/tickets.json",
});

const connection = mysql.createConnection(config.mysql);

connection.connect((err) => {
  if (err) return console.log("👋 Não fo possível conectar ao mysql!");
  console.log("👋 Conectado ao mysql!");
});

global.queryDB = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMembers,
    Discord.IntentsBitField.Flags.MessageContent,
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.GuildModeration,
  ],
});

client.on("interactionCreate", (interaction) => {
  if (interaction.type !== Discord.InteractionType.ApplicationCommand) {
    return;
  } else {
    if (!client.slashCommands.get(interaction.commandName)) {
      interaction.reply({
        ephemeral: true,
        content: "Houve um erro no comando selecinado.",
      });
    } else {
      client.slashCommands
        .get(interaction.commandName)
        .run(client, interaction);
    }
  }
});

client.slashCommands = new Discord.Collection();
module.exports = client;

fs.readdir("./handler", (err, file) => {
  for (let main of file) {
    require(`./handler/${main}`);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.login(token);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// process.on('multipleResolves', (type, reason, promise) => {
//     return new promise((resolve) => {
//         resolve("")
//     } )
// });
// process.on('unhandRejection', (reason, promise) => {
//      return new promise((resolve) => {
//         resolve("")
//     } )
// });
// process.on('uncaughtException', (error, origin) => {
//     return;
// });
// process.on('uncaughtException', (error, origin) => {
//     return;
// });