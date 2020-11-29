const { MessageEmbed } = require('discord.js');

//settings
const {commands} = require('../../settings');

module.exports = (message, text) => {
    let commandList = '';
    commands.forEach((command) => (commandList += '```' + command + '```'));

    var Wembed = new MessageEmbed()
        .setTitle('Available Commands')
        .setColor('#2200ff')
        .addFields({ name: '\u200B', value: commandList })
        .setDescription('Commands are case-sensitive and starts with "!"')
        .setFooter('For suggestions/help contact Shriram/Shravan.')
        .setTimestamp(new Date());

    message.channel.send(Wembed);
    message.react('👍');
};
