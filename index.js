// OC code :)
const Discord = require('discord.js');
const bot = new Discord.Client();

// env
require('dotenv').config();


// let the bot conquer the world
bot.login(process.env.BOT_TOKEN).then(() => {
    require('./source/readyState')(bot);
    require('./source/guildMemberAdd')(bot);
    require('./source/messageWrite')(bot);
    require('./source/messageRead')(bot);
});
