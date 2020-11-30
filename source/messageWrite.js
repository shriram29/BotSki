const { MessageEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');

const { getListOfChannels, getRandomElement } = require('./helper/helper');
const { fetchJokes , fetchMemes } = require('../api/reddit');

const draftJoke =  async (bot) => {
    
    // message.guild.members.cache.filter(member => member.presence.status !== "offline").size;
    channels = await getListOfChannels(bot); 
    joke = await fetchJokes();

    var Wembed = new MessageEmbed()
    .setAuthor("Bosskey's words of wisdom: ")
    .setDescription(`${joke['title']}`)
    .setFooter(`${joke['selftext']} \n`)

    channels.forEach(element => {

        if (element.channelName === 'bird-chat'){
            let textChannel = bot.channels.cache.get(element.channelId);
            textChannel.send(Wembed);
        }
    })

};

const draftMeme = async (bot) => {

    var channels = await getListOfChannels(bot); 
    var meme = await fetchMemes();

    var Wembed = new MessageEmbed()
        .setAuthor("Bosskey's journal: ")
        .setFooter(`Page : ${Math.round(Math.random() * 10000)}`)

    channels.some(element => {
        
        if (element.channelName === 'bird-chat'){
            let textChannel = bot.channels.cache.get(element.channelId);
            textChannel.send({ embed : Wembed, files: [new MessageAttachment(meme)]})
                .then((res) => fs.unlink(meme, ()=>{}))

            return true;
        }

    })
}


// Bot message scheduler
module.exports = (bot) => {

    var interval = [6, 9, 12, 18, 24];

    var minutesInMillisecond = 1000 * 60 * 1;
    var hoursInMilliseconds = minutesInMillisecond * 60;
    var dayInMilliseconds = hoursInMilliseconds * 24

    var randomInterval = () => hoursInMilliseconds * getRandomElement(interval);

    setInterval(draftJoke, randomInterval(), bot);
    setInterval(draftMeme, randomInterval(), bot)

}

