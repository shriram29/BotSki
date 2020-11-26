const Discord = require('discord.js');

//settings
const { botInfo } = require('../../settings');

module.exports = (message, text, botName) => {
    var Wembed = new Discord.MessageEmbed()
        .setTitle('(>‿◠)✌')
        .setColor('#24f3ff')
        .setAuthor(botName)
        .addFields([
            { name: '\u200B', value: '\u200B' },
            {
                name: 'Dev1 👨‍💻',
                value: '[@WatchDog](https://github.com/shriram29)',
            },
            {
                name: 'Dev2 👨‍💻',
                value: '[@ShravanDheep](https://github.com/Shravandheep4)',
            },
            { name: '\u200B', value: '\u200B' },
            {
                name: '🤖💫⭐️✨⚡️☄️🌟🔥🌪🌈☀️💥',
                value: '```Use !help to know more```',
            },
            { name: '\u200B', value: '\u200B' },
            {
                name: 'https://botski.shriram.xyz/',
                value: 'To add Botskey to your discord server',
            },
        ])
        .setFooter(
            `Build🆔 ${botInfo.version} ✔️`,
            'https://i.imgur.com/dG966Od.png'
        )
        .setTimestamp(new Date());

    message.channel.send(Wembed);
    message.react('👍');
};
