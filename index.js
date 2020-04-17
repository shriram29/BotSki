// OC code :)
const Discord = require('discord.js');
const https = require("https");
// const ta = require('time-ago')

const bot = new Discord.Client();


// Place 'token.js' in the root, if you dont have download it form our  Discord server 
const token = require('./token')


// Prefix for all our commands
const prefix = '!';


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
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(c => c.name === 'welcome'); // change this to the channel name you want to send the greeting to
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    const attachment = new Discord.MessageAttachment('https://i.imgur.com/O9fbO4L.png');
    channel.send(`Hey ${member}!`);
    channel.send(attachment);
});


// Function called when a message is received
bot.on('message', msg => {
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
    console.log(msg.mentions.has(bot))
    switch (args[0]) {
        case 'react':
            switch (args[1]) {
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

        case 'covid':
            var url = 'https://api.covid19india.org/data.json';
            https.get(url, function (res) {
                var body = '';
                res.on('data', function (chunk) {
                    body += chunk;
                });
                res.on('end', function () {
                    var data = JSON.parse(body);
                    let resStr = "Covid19 - India Stats\n\n";
                    resStr += "\`";
                    resStr += "Active    : " + data['statewise'][0]['active'].toString() + '\n';
                    resStr += "Confirmed : " + data['statewise'][0]['confirmed'].toString() + '\n';
                    resStr += "Recovered : " + data['statewise'][0]['recovered'].toString() + '\n';
                    resStr += "Deaths    : " + data['statewise'][0]['deaths'].toString() + '\n\n';
                    // ta.ago(new Date(data['statewise'][0]['lastupdatedtime']).toUTCString())
                    resStr += "Last Updated " + data['statewise'][0]['lastupdatedtime'] + '\n';
                    resStr += "\`";
                    msg.channel.send(resStr);
                });
            }).on('error', function (e) {
                console.log("Got an error: ", e);
            });
            break;
        case 'info':
            msg.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: bot.user.username,
                        icon_url: 'https://i.imgur.com/dG966Od.png'
                    },
                    title: "(>‿◠)✌",
                    url: "http://google.com",
                    description: "i am groot?",
                    fields: [
                        {
                            name: "Devs 👨‍💻",
                            value: "[@WatchDog](http://shriram.xyz/)"
                        },
                        {
                            name: "Description",
                            value: "Son Of Anton is secretly powered by quantum robot groots. Currently fluent with grooten he's learning English.\n\n"
                        },
                        {
                            name: "🤖💫⭐️✨⚡️☄️🌟🔥🌪🌈☀️💥",
                            value: "```Use !help to know more```"
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: 'https://i.imgur.com/dG966Od.png',
                        text: "Build🆔 1.2✔️"
                    }
                }
            });
            break;

    }
});

// let the bot conquer the world
bot.login(token);