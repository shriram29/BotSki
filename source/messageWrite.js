const Discord = require('discord.js');

const { getListOfChannels } = require('./helper/helper');
const { fetchJokes } = require('../api/reddit');

const draftJoke =  async (bot) => {
    
    // message.guild.members.cache.filter(member => member.presence.status !== "offline").size;
    channels = await getListOfChannels(bot); 
    joke = await fetchJokes();

    var Wembed = new Discord.MessageEmbed()
    .setAuthor("Bosskey's words of wisdom: ")
    .setDescription(`${joke['title']}`)
    .setFooter(`${joke['selftext']} \n`)

    channels.forEach(element => {

        if (element.channelName === 'development🖥'){
            let textChannel = bot.channels.cache.get(element.channelId);
            textChannel.send(Wembed);
        }
    })

};


// Bot message scheduler
module.exports = (bot) => {

    var minutesInMillisecond = 1000 * 60 * 1;
    var hoursInMilliseconds = minutesInMillisecond * 60;
    var dayInMilliseconds = hoursInMilliseconds* 24;

    setInterval(draftJoke, dayInMilliseconds, bot);
}

