// OC code :)
const Discord = require('discord.js');
const https = require("https");
// const ta = require('time-ago')

// SERVER 
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);



const bot = new Discord.Client();

// Bot meta
const botVer = "1.2";
const botDate ="17/04/20 4:00PM";
let botNew ="";
botNew += "```✔️ !info Added \n```";
botNew += "```✔️ !log Added \n```";
botNew += "```✔️ !help Added \n```";
botNew += "```✔️ Summon Added \n```";
let botUpdate ="";
botUpdate += "```💣 !Covid - *Updated* \n```";

// global gifs
let welcomeGifs = ["https://media.giphy.com/media/LPaBB9d1GegMFC75Qf/giphy.gif", "https://media.giphy.com/media/LQ2nRiL5Au4nD4cNw7/giphy.gif", "https://media.giphy.com/media/553wiYN2lOZz5CBdpF/giphy.gif", "https://media.giphy.com/media/mTs11L9uuyGiI/giphy.gif", "https://media.giphy.com/media/1iZS2vRXtTlBI1a0/giphy.gif", "https://media.giphy.com/media/iugZw96Gq1gmk/giphy.gif"];
let emojiList = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "☀", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "❤", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚"];
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
    const attachment = new Discord.MessageAttachment(welcomeGifs[Math.floor(Math.random() * welcomeGifs.length)]);
    channel.send(`Welcome ${member} `+emojiList[Math.floor(Math.random() * emojiList.length)] +' !');
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
    if (msg.mentions.has(bot.user)){
        msg.channel.send("\`$ Summon.exe : Successful\n$ Waiting for Command ... \n$ Use !help for help     \n\`");
    }
    switch (args[0]) {
        case 'react':
            switch (args[1]) {
                case 'b1':
                    const attachment = new Discord.MessageAttachment('https://i.imgur.com/dQQqaMP.png');
                    msg.channel.send(attachment);
                    break;
                case 'b2':
                    const attachment1 = new Discord.MessageAttachment('https://i.imgur.com/UC6YLky.png');
                    msg.channel.send(attachment1);
                    break;
                case 'b3':
                    const attachment2 = new Discord.MessageAttachment('https://i.imgur.com/lQ7VBF2.png');
                    msg.channel.send(attachment2);
                    break;
                case 'b4':
                    const attachment3 = new Discord.MessageAttachment('https://i.imgur.com/YxZzO4H.png');
                    msg.channel.send(attachment3);
                    break;
                case 'b5':
                    const attachment4 = new Discord.MessageAttachment('https://i.imgur.com/gjb11q7.png');
                    msg.channel.send(attachment4);
                    break;
                case 'b6':
                    const attachment5 = new Discord.MessageAttachment('https://i.imgur.com/VlFZn6k.png');
                    msg.channel.send(attachment5);
                    break;
                case 'b7':
                    const attachment6 = new Discord.MessageAttachment('https://i.imgur.com/23yQN04.png');
                    msg.channel.send(attachment6);
                    break;
                case 'rkt':
                    const attachment7 = new Discord.MessageAttachment('https://media.giphy.com/media/G6i8s8IyQYS4g/giphy.gif');
                    msg.channel.send(attachment7);
                    break;
                case 'rand':
                    const attachment8 = new Discord.MessageAttachment(welcomeGifs[Math.floor(Math.random() * welcomeGifs.length)]);
                    msg.channel.send(attachment8);
                    break;
                case 'help':
                    let reactList = "";
                    reactList += "```rkt - r3kt gif\n```";
                    reactList += "```rand - Random gif ```";
                    msg.channel.send({
                        embed: {
                            color: 12118406,
                            title: "Available Reactions " + emojiList[Math.floor(Math.random() * emojiList.length)] + " :",
                            description: "Usage: !react [Name]",
                            fields: [{
                                name: "Name:",
                                value: reactList
                            }],
                            footer: {
                                text: emojiList[Math.floor(Math.random() * emojiList.length)] + " " + emojiList[Math.floor(Math.random() * emojiList.length)] + " " + emojiList[Math.floor(Math.random() * emojiList.length)] + " "
                            }
                        }
                    });
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
                    let active      = data['statewise'][0]['active'].toString();
                    let confirmed = data['statewise'][0]['confirmed'].toString();
                    let recovered   = data['statewise'][0]['recovered'].toString();
                    let deaths      = data['statewise'][0]['deaths'].toString();
                    let deltaconfirmed  = data['statewise'][0]['deltaconfirmed'].toString();
                    let deltadeaths     = data['statewise'][0]['deltadeaths'].toString();
                    let deltarecovered  = data['statewise'][0]['deltarecovered'].toString();
                    let Updated     = data['statewise'][0]['lastupdatedtime'].toString();

                    msg.channel.send({
                        embed: {
                            "url": "https://www.covid19india.org/",
                            "color": 13632027,
                            "timestamp" : new Date(),
                            "footer": {
                                "text": "Last Updated " + Updated +""
                            },
                            "description": "Total confirmed : " + confirmed,
                            "author": {
                                "name": "COVID19 India Stats",
                                "url": "https://www.covid19india.org/",
                                "icon_url": "https://avatars3.githubusercontent.com/u/62393982?s=200&v=4"
                            },
                            "fields": [
                                {
                                    "name": "\u200B ",
                                    "value": "Today"
                                },
                                {
                                    "name": "Confirmed ",
                                    "value": deltaconfirmed,
                                    "inline": true
                                },
                                {
                                    "name": "Recovered ",
                                    "value": deltarecovered,
                                    "inline": true
                                },
                                {
                                    "name": "Deaths ",
                                    "value": deltadeaths,
                                    "inline": true
                                }, 
                                {
                                    "name": "\u200B ",
                                    "value": "Total"
                                },
                                {
                                    "name": " Active",
                                    "value": active,
                                    "inline": true
                                }, 
                                {
                                    "name": " Recovered",
                                    "value": recovered,
                                    "inline": true
                                },
                                {
                                    "name": " death",
                                    "value": deaths,
                                    "inline": true
                                }

                            ]
                        }
                    });
                });
            }).on('error', function (e) {
                console.log("Got an error: ", e);
            });
            break;
        case 'help':
            let commandList ="";
            commandList += "```!react - Sends stickers. Use \"!react help\" for more.\n```";
            commandList += "```!covid - Get the latest Covid19 numbers.```";
            commandList += "```!log - Bot update logs.```";
            commandList += "```!info - Know about the bot.```";
            msg.channel.send({
                embed: {
                    color: 12118406,
                    title: "Available Commands :",
                    description: "Commands are case-sensitive and starts with \"!\"",
                    fields: [
                        {
                            name: "\u200B",
                            value: commandList
                        }
                    ],
                    footer: {
                        text: "For suggestions/help contact devs."
                    }
                }
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
                            value: "[@WatchDog](https://github.com/shriram29)"
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
                        text: "Build🆔 "+botVer+"✔️"
                    }
                }
            });
            break;
        case 'log':
            msg.channel.send({
                "embed": {
                    "title": "Change Logs for " + "Build🆔  " + botVer ,
                    "color": 9056477,
                    "footer": {
                        "text": "Updated on " + botDate + " 🏷️"
                    },
                    "fields": [{
                        "name": "New features 🔥:",
                        "value": botNew
                    }, {
                        "name": "Updates 👍:",
                        "value": botUpdate
                    }]
                }
            });
            break;

    }
});

// let the bot conquer the world
bot.login(token);