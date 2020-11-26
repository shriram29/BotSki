// Discord OG
const Discord = require('discord.js');

// Api 
const getCovidInfo = require('../../api/covid');

module.exports = async (message, text) => {
    let {
        active,
        confirmed,
        recovered,
        deaths,
        deltaconfirmed,
        deltadeaths,
        deltarecovered,
        updated,
    } = await getCovidInfo();

    var Wembed = new Discord.MessageEmbed()
        .setURL('https://www.covid19india.org/')
        .setTitle('Covid-19 Stats')
        .setColor('#24f3ff')
        .setAuthor(
            'COVID19 India Stats',
            'https://avatars3.githubusercontent.com/u/62393982?s=200&v=4',
            'https://www.covid19india.org/'
        )
        .setThumbnail(message.author.avatarURL)
        .addFields([
            { name: '\u200B ', value: 'Today' },
            { name: 'Confirmed ', value: deltaconfirmed, inline: true },
            { name: 'Recovered ', value: deltarecovered, inline: true },
            { name: 'Deaths ', value: deltadeaths, inline: true },
            { name: '\u200B ', value: 'Total' },
            { name: ' Active', value: active, inline: true },
            { name: ' Recovered', value: recovered, inline: true },
            { name: ' death', value: deaths, inline: true },
        ])
        .setDescription(`Total confirmed : ${confirmed}`)
        .setFooter(
            `Last Updated ${updated === undefined ? 'Unsure |' : updated}`
        )
        .setTimestamp(new Date());

    message.channel.send(Wembed);
    message.react('👍');
};
