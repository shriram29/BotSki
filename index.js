// OC code :)
const Discord = require('discord.js');
const bot = new Discord.Client();

const token = require('./token.json')['token'][process.env.NODE_ENV];

// env
require('dotenv').config();

// let the bot conquer the world
bot.login(token).then(() => {
    require('./source/readyState')(bot);
    require('./source/guildMemberAdd')(bot);
    require('./source/messageWrite')(bot);
    require('./source/messageRead')(bot);
});
