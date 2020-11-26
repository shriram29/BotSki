// Discord OG
const Discord = require('discord.js');

// Api 
const getCovidInfo = require('../../api/covid');
const getPlaylistInfo = require('../../api/playlist');

// defaults
const { showLog, showReact, showHelp, showInfo } = require('./botDefault');

const showDefault = async (message, command, bot, text) => {

    switch(command){
        case 'react' :
            showReact(message, text)
            break;
        
        case 'help':
            showHelp(message, text);
            break;

        case 'info':
            showInfo(message, text, bot.user.name);
            break;

        case 'log':
            showLog(message, text, bot.user.name);
            break;

        case 'welcome':
            message.channel.send(new Discord.MessageAttachment('https://i.imgur.com/O9fbO4L.png'));
            break;

        case 'update':
            message.channel.send('**I just got updated!**');
            showLog(message, text);
            break;

        default:
            break;
    }

}

// bot exploitation
const getListOfChannels = async (bot) => {

    var array = [];
    let channels = bot.channels.cache.array();

    for (const channel of channels) {
        array.push({ channelName : channel.name, channelId : channel.id });
    }

    return array
};


// External 
const showPlaylist = async (message, id) => {

    let port = process.env.PORT || 3000;
    var data = await getPlaylistInfo(port, id);


    if (data.length == 0) {
        message.channel.send('Playlist Not available');
    } else {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) 
            return message.channel.send('You need to be in a voice channel to play music!');

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
            return message.channel.send('I need the permissions to join and speak in your voice channel!');

        voiceChannel.join()
            .then(() => { for (links of data[0]['links']) message.channel.send('Playlist :' + links) })
            .catch(e => message.channel.send(e));
    }

    message.react("👍");

}

const showCovidDetails = async (message, text) => {

    let { active, confirmed, recovered, deaths, deltaconfirmed, deltadeaths, deltarecovered, updated} = await getCovidInfo();

    var Wembed = new Discord.MessageEmbed()
        .setURL('https://www.covid19india.org/')
        .setTitle('Covid-19 Stats')
        .setColor('#24f3ff')
        .setAuthor('COVID19 India Stats', 
            'https://avatars3.githubusercontent.com/u/62393982?s=200&v=4', 
            'https://www.covid19india.org/')
        .setThumbnail(message.author.avatarURL)
        .addFields([
            {name: '\u200B ', value: 'Today'},
            {name: 'Confirmed ', value: deltaconfirmed, inline: true},
            {name: 'Recovered ', value: deltarecovered, inline: true},
            {name: 'Deaths ', value: deltadeaths, inline: true},
            {name: '\u200B ', value: 'Total'},
            {name: ' Active', value: active, inline: true},
            {name: ' Recovered', value: recovered, inline: true},
            {name: ' death', value: deaths, inline: true}
        ])
        .setDescription(`Total confirmed : ${confirmed}`)
        .setFooter(`Last Updated ${(updated===undefined? 'Unsure |' : updated) }`)
        .setTimestamp(new Date())


        message.channel.send(Wembed);
        message.react("👍");

};

module.exports = {
    showDefault,
    showCovidDetails,
    showPlaylist,

    getListOfChannels
}