// OC code :)
const Discord = require('discord.js');
const bot = new Discord.Client();

// env
require('dotenv').config();

// DB SERVER [wtf is this shit]
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
server.listen(port);

// let the bot conquer the world
bot.login(process.env.BOT_TOKEN).then(() => {
    require('./source/readyState')(bot);
    require('./source/guildMemberAdd')(bot);
    require('./source/messageWrite')(bot);
    require('./source/messageRead')(bot);
});
