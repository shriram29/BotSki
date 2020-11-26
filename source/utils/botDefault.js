const Discord = require('discord.js');

//settings
const { reactImages, welcomeGifs, emojiList, reactList, commands, botInfo } = require('../../settings');

// reducer
const getRandomElement = (element) => element[Math.floor(Math.random() * element.length)];

// ---- Helper functions ---- //
const showReact = (message, choice) => {

    if (choice in reactImages) {
        reactImage = reactImages[choice];
        let attachment = new Discord.MessageAttachment(reactImage);
        message.channel.send(attachment)
        message.react("👍");
        message.delete({timeout : 5000});

    }
    else if(choice === ''){
        message.channel.send(new Discord.MessageAttachment(getRandomElement(welcomeGifs)));
        message.react("👍");
        message.delete({timeout : 5000});

    }else{

        var newReactList = '';
        newReactList += '```rkt - r3kt gif\n```';
        newReactList += '```b1 - b7 - bosskey nude pics\n```';
        newReactList += '```<leave the field empty> - Random gif ```';

        var Wembed = new Discord.MessageEmbed()
            .setTitle(`Available Reactions ${getRandomElement(emojiList)} :`)
            .setColor('#0099ff')
            .setThumbnail(message.author.avatarURL)
            .addFields({name : 'Name: '}, {value : newReactList})
            .setDescription('Usage: !react [Name]')
            .setFooter(`${getRandomElement(emojiList)} ${getRandomElement(emojiList)} ${getRandomElement(emojiList)}`);
        
        message.channel.send(Wembed);
        message.react("👍");
        message.delete({timeout : 5000});

    }
};

const showHelp = (message, text) => {
 
    let commandList = '';
    commands.forEach(command => commandList += '```' + command + '```' );

    var Wembed = new Discord.MessageEmbed()
        .setTitle('Available Commands')
        .setColor('#2200ff')
        .addFields({name: '\u200B',value: commandList})
        .setDescription('Commands are case-sensitive and starts with "!"')
        .setFooter('For suggestions/help contact Shriram/Shravan.')
        .setTimestamp(new Date())

    message.channel.send(Wembed);
    message.react("👍");

}

const showInfo = (message, text, botName) => {

    var Wembed = new Discord.MessageEmbed()
        .setTitle('(>‿◠)✌')
        .setColor('#24f3ff')
        .setAuthor(botName)
        .addFields([
            {name: 'Dev1 👨‍💻', value: '[@WatchDog](https://github.com/shriram29)'},
            {name: 'Dev2 👨‍💻', value: '[@ShravanDheep](https://github.com/Shravandheep4)'},
            {name: '🤖💫⭐️✨⚡️☄️🌟🔥🌪🌈☀️💥', value: '```Use !help to know more```'},
            {name: '\u200B', value: '\u200B'},
            {name: 'https://botski.shriram.xyz/',value: 'To add Botskey to your discord server'},
        ])
        .setFooter(`Build🆔 ${botInfo.version} ✔️`, 'https://i.imgur.com/dG966Od.png' )
        .setTimestamp(new Date())

    message.channel.send(Wembed);
    message.react("👍");

}

const showLog = (message, text, botName) => {

    let botNewFeatures = '', botUpdate = '';

    botInfo.newFeatures.forEach(element => {botNewFeatures += '```' + element + '```'});
    botInfo.updates.forEach(elemenet => {botUpdate += '```' + elemenet + '```'});
    botNewFeatures += '*use !help to know more*';


    var Wembed = new Discord.MessageEmbed()
        .setTitle(`Change Logs for Build🆔 ${botInfo.version}`)
        .setColor('#2f2b42')
        .setAuthor(botName)
        .addFields([
            {name: 'New features 🔥', value: botNewFeatures},
            {name: 'Updates 👍:', value: botUpdate}
        ])
        .setFooter(`Updated on ${botInfo.releaseDate} 🏷️`)
        .setTimestamp(new Date())


    message.channel.send(Wembed);
    message.react("👍");

}

module.exports = {
    showReact,
    showHelp,
    showInfo,
    showLog
}