const Discord = require('discord.js');

//settings
const { reactImages, welcomeGifs, emojiList} = require('../../settings');

// reducer
const getRandomElement = (element) => element[Math.floor(Math.random() * element.length)];


module.exports = (message, choice) => {

    if (choice in reactImages) {
        reactImage = reactImages[choice];
        let attachment = new Discord.MessageAttachment(reactImage);
        message.channel.send(attachment)
        message.react("👍");
        message.delete({timeout : 15000});

    }
    else if(choice === ''){
        message.channel.send(new Discord.MessageAttachment(getRandomElement(welcomeGifs)));
        message.react(getRandomElement(emojiList));
        message.delete({timeout : 15000});

    }else{

        var newReactList = '';
        newReactList += '```rkt - r3kt gif\n```';
        newReactList += '```b1 - b7 - bosskey nude pics\n```';
        newReactList += '```<leave the field empty> - Random gif ```';

        var Wembed = new Discord.MessageEmbed()
            .setTitle(`Available Reactions ${getRandomElement(emojiList)} :`)
            .setColor('#0099ff')
            .setThumbnail(message.author.avatarURL)
            .addFields({name : 'Name: ', value : newReactList})
            .setDescription('Usage: !react [Name]')
            .setFooter(`${getRandomElement(emojiList)} ${getRandomElement(emojiList)} ${getRandomElement(emojiList)}`);
        
        message.channel.send(Wembed);
        message.react("👍");
        message.delete({timeout : 5000});

    }
};