const Discord = require('discord.js');

//settings
const { botInfo } = require('../../settings');
module.exports = (message, text, botName) => {
    let botNewFeatures = '',
        botUpdate = '';

    botInfo.newFeatures.forEach((element) => {
        botNewFeatures += '```' + element + '```';
    });
    botInfo.updates.forEach((elemenet) => {
        botUpdate += '```' + elemenet + '```';
    });
    botNewFeatures += '*use !help to know more*';

    var Wembed = new Discord.MessageEmbed()
        .setTitle(`Change Logs for Build🆔 ${botInfo.version}`)
        .setColor('#2f2b42')
        .setAuthor(botName)
        .addFields([
            { name: 'New features 🔥', value: botNewFeatures },
            { name: 'Updates 👍:', value: botUpdate },
        ])
        .setFooter(`Updated on ${botInfo.releaseDate} 🏷️`)
        .setTimestamp(new Date());

    message.channel.send(Wembed);
    message.react('👍');
};
