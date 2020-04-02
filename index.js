// OC code :)
const Discord = require('discord.js');
const bot = new Discord.Client();

// Place 'token.js' in the root, if you dont have download it form our  Discord server 
const token = require('./token')


// Prefix for all our commands
const prefix ='!';


// https: //discord.js.org/#/ = DOCUMENTATION


// is executed once after bot login event.
bot.on('ready', () => {

    //  Summa log da this one
    console.log('Bosskey ready to bomb');

    // Setting status
    bot.user.setPresence({
        activity: {
            name: 'nahi learning hai',
            type: 'PLAYING',
            url: 'https://google.com'
        },
        status: 'online'
    })

});

// New member welcome message
// NOTE: This isnt working,
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    const attachment = new MessageAttachment('https://i.imgur.com/O9fbO4L.png');
    channel.send(`${member} ${attachment}`);
});


// Function called when a message is received
bot.on('message', msg=>{
    //  NOTE: isMemberMentioned is depricated
    // if (msg.isMemberMentioned(bot.user)) {
    //     msg.reply('Hey groot, Use !help to know what i can do or !info to know about me.');
    // }

    // spliting the command message and storing in args 
    // !one two ...
    // args[0] = 'one'
    // args[1] = 'two'
    // ... 
    let args = msg.content.substring(prefix.length).split(" ");

    switch (args[0]){
        case 'react':
            switch(args[1]){
                case '1':
                    const attachment = new Discord.MessageAttachment('https://i.imgur.com/dQQqaMP.png');
                    msg.channel.send(attachment);
                    break;
                case '2':
                    const attachment1 = new Discord.MessageAttachment('https://i.imgur.com/UC6YLky.png');
                    msg.channel.send(attachment1);
                    break;
                case '3':
                    const attachment2 = new Discord.MessageAttachment('https://i.imgur.com/lQ7VBF2.png');
                    msg.channel.send(attachment2);
                    break;
                case '4':
                    const attachment3 = new Discord.MessageAttachment('https://i.imgur.com/YxZzO4H.png');
                    msg.channel.send(attachment3);
                    break;
                case '5':
                    const attachment4 = new Discord.MessageAttachment('https://i.imgur.com/gjb11q7.png');
                    msg.channel.send(attachment4);
                    break;
                case '6':
                    const attachment5 = new Discord.MessageAttachment('https://i.imgur.com/VlFZn6k.png');
                    msg.channel.send(attachment5);
                    break;
                case '7':
                    const attachment6 = new Discord.MessageAttachment('https://i.imgur.com/23yQN04.png');
                    msg.channel.send(attachment6);
                    break;
            }
            break;
        
        case 'welcome':
            const attachment7 = new Discord.MessageAttachment('https://i.imgur.com/O9fbO4L.png');
            msg.channel.send(attachment7);
            break; 
        
    }
});

// let the bot conquer the world
bot.login(token);