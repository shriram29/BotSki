const { welcomeGifs, emojiPoints, emojiList } = require('../settings.js');

module.exports = (bot) => {
    
    // New member welcome message
    bot.on('guildMemberAdd', (member) => {
        const channel = member.guild.channels.cache.find((c) => c.name === 'welcome'); 

        const attachment = new Discord.MessageAttachment(
            welcomeGifs[Math.floor(Math.random() * welcomeGifs.length)]
        );
        
        channel.send(`Welcome ${member} ` + emojiList[Math.floor(Math.random() * emojiList.length)] +' !');
        channel.send(attachment);
    });

}