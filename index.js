// OC code :)
const Discord = require('discord.js');
const https = require('https');
const http = require('http');
const jsonServer = require('json-server');
const settings = require('./settings.js');
// const ta = require('time-ago')

// Place Auth folder in the root, if you dont have download it form our  Discord server
const token = require('./auth/token');
const twtAuth = require('./auth/twtA.js');

// DB SERVER
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
server.use(middlewares);
server.use(router);
server.listen(port);

// Twitter init
const twtOptions = {
    method: 'GET',
    hostname: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=2295424',
    headers: twtAuth,
    maxRedirects: 20,
};
// Chennai 2295424

const bot = new Discord.Client();

// Bot meta
const botVer = settings.version;
const botDate = settings.releaseDate;

let botNew = '';
for (let i = 0; i < settings.newFeatures.length; i++) {
    botNew += '```' + settings.newFeatures[i] + '```';
}
botNew += '*use !help to know more*';
let botUpdate = '';
for (let i = 0; i < settings.updates.length; i++) {
    botUpdate += '```' + settings.updates[i] + '```';
}

// global gifs/emojis
const welcomeGifs = settings.welcomeGifs;
const emojiList = settings.emojiList;
const emojiPoints = settings.emojiPoints;

// Prefix for all our commands
const prefix = '!';

// https: //discord.js.org/#/ = DOCUMENTATION

bot.on('ready', () => {
    console.log('Bosskey ready to bomb');
    bot.user.setPresence({
        activity: settings.botActivity,
        status: 'online',
    });
});

// New member welcome message
bot.on('guildMemberAdd', (member) => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(
        (c) => c.name === 'welcome'
    ); // change this to the channel name you want to send the greeting to
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    const attachment = new Discord.MessageAttachment(
        welcomeGifs[Math.floor(Math.random() * welcomeGifs.length)]
    );
    channel.send(
        `Welcome ${member} ` +
            emojiList[Math.floor(Math.random() * emojiList.length)] +
            ' !'
    );
    channel.send(attachment);
});

// Function called when a message is received
bot.on('message', (msg) => {
    //  NOTE: isMemberMentioned is depricated
    // if (msg.isMemberMentioned(bot.user)) {
    //     msg.reply('Hey groot, Use !help to know what i can do or !info to know about me.');
    // }

    // spliting the command message and storing in args
    // !one two ...
    // args[0] = 'one'
    // args[1] = 'two'
    // ...
    let args = msg.content.substring(prefix.length).split(' ');
    if (msg.mentions.has(bot.user)) {
        msg.channel.send(
            '`$ Summon.exe : Successful\n$ Waiting for Command ... \n$ Use !help for help     \n`'
        );
    }
    switch (args[0]) {
        case 'react':
            react(msg, args);
            break;

        case 'covid':
            covid(msg, args);
            break;
        case 'news':
            newsfeed(msg, args);
            break;
        case 'help':
            help(msg, args);
            break;
        case 'info':
            info(msg, args);
            break;
        case 'log':
            log(msg, args);
            break;
        case 'welcome':
            const attachment7 = new Discord.MessageAttachment(
                'https://i.imgur.com/O9fbO4L.png'
            );
            msg.channel.send(attachment7);
            break;
        case 'update':
            msg.channel.send('**I just got updated!**');
            log(msg, args);
            break;

        //  Features under testing
        case 'playlist':
            playlist(msg, args);
            break;
        case 'nftest':
            let chn = bot.channels.cache.find((c) => c.name === 'newsfeed');
            // console.log(chn)
            try {
                chn.channel.send('lol');
            } catch (e) {
                msg.channel.send(e.toString());
            }
            break;
    }
});

function covid(msg, args) {
    var url = 'https://api.covid19india.org/data.json';
    https
        .get(url, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                var data = JSON.parse(body);
                let active = data['statewise'][0]['active'].toString();
                let confirmed = data['statewise'][0]['confirmed'].toString();
                let recovered = data['statewise'][0]['recovered'].toString();
                let deaths = data['statewise'][0]['deaths'].toString();
                let deltaconfirmed = data['statewise'][0][
                    'deltaconfirmed'
                ].toString();
                let deltadeaths = data['statewise'][0][
                    'deltadeaths'
                ].toString();
                let deltarecovered = data['statewise'][0][
                    'deltarecovered'
                ].toString();
                let Updated = data['statewise'][0][
                    'lastupdatedtime'
                ].toString();

                msg.channel.send({
                    embed: {
                        url: 'https://www.covid19india.org/',
                        color: 13632027,
                        timestamp: new Date(),
                        footer: {
                            text: 'Last Updated ' + Updated + '',
                        },
                        description: 'Total confirmed : ' + confirmed,
                        author: {
                            name: 'COVID19 India Stats',
                            url: 'https://www.covid19india.org/',
                            icon_url:
                                'https://avatars3.githubusercontent.com/u/62393982?s=200&v=4',
                        },
                        fields: [
                            {
                                name: '\u200B ',
                                value: 'Today',
                            },
                            {
                                name: 'Confirmed ',
                                value: deltaconfirmed,
                                inline: true,
                            },
                            {
                                name: 'Recovered ',
                                value: deltarecovered,
                                inline: true,
                            },
                            {
                                name: 'Deaths ',
                                value: deltadeaths,
                                inline: true,
                            },
                            {
                                name: '\u200B ',
                                value: 'Total',
                            },
                            {
                                name: ' Active',
                                value: active,
                                inline: true,
                            },
                            {
                                name: ' Recovered',
                                value: recovered,
                                inline: true,
                            },
                            {
                                name: ' death',
                                value: deaths,
                                inline: true,
                            },
                        ],
                    },
                });
            });
        })
        .on('error', function (e) {
            console.log('Got an error: ', e);
        });
}

function react(msg, args) {
    switch (args[1]) {
        case 'b1':
            const attachment = new Discord.MessageAttachment(
                'https://i.imgur.com/dQQqaMP.png'
            );
            msg.channel.send(attachment);
            break;
        case 'b2':
            const attachment1 = new Discord.MessageAttachment(
                'https://i.imgur.com/UC6YLky.png'
            );
            msg.channel.send(attachment1);
            break;
        case 'b3':
            const attachment2 = new Discord.MessageAttachment(
                'https://i.imgur.com/lQ7VBF2.png'
            );
            msg.channel.send(attachment2);
            break;
        case 'b4':
            const attachment3 = new Discord.MessageAttachment(
                'https://i.imgur.com/YxZzO4H.png'
            );
            msg.channel.send(attachment3);
            break;
        case 'b5':
            const attachment4 = new Discord.MessageAttachment(
                'https://i.imgur.com/gjb11q7.png'
            );
            msg.channel.send(attachment4);
            break;
        case 'b6':
            const attachment5 = new Discord.MessageAttachment(
                'https://i.imgur.com/VlFZn6k.png'
            );
            msg.channel.send(attachment5);
            break;
        case 'b7':
            const attachment6 = new Discord.MessageAttachment(
                'https://i.imgur.com/23yQN04.png'
            );
            msg.channel.send(attachment6);
            break;
        case 'rkt':
            const attachment7 = new Discord.MessageAttachment(
                'https://media.giphy.com/media/G6i8s8IyQYS4g/giphy.gif'
            );
            msg.channel.send(attachment7);
            break;
        case 'rand':
            const attachment8 = new Discord.MessageAttachment(
                welcomeGifs[Math.floor(Math.random() * welcomeGifs.length)]
            );
            msg.channel.send(attachment8);
            break;
        case 'help':
            let reactList = '';
            reactList += '```rkt - r3kt gif\n```';
            reactList += '```rand - Random gif ```';
            msg.channel.send({
                embed: {
                    color: 12118406,
                    title:
                        'Available Reactions ' +
                        emojiList[
                            Math.floor(Math.random() * emojiList.length)
                        ] +
                        ' :',
                    description: 'Usage: !react [Name]',
                    fields: [
                        {
                            name: 'Name:',
                            value: reactList,
                        },
                    ],
                    footer: {
                        text:
                            emojiList[
                                Math.floor(Math.random() * emojiList.length)
                            ] +
                            ' ' +
                            emojiList[
                                Math.floor(Math.random() * emojiList.length)
                            ] +
                            ' ' +
                            emojiList[
                                Math.floor(Math.random() * emojiList.length)
                            ] +
                            ' ',
                    },
                },
            });
            break;
    }
}

function newsfeed(msg, args) {
    let twt;
    var req = https.request(twtOptions, function (res) {
        var chunks = [];
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function (chunk) {
            var data = JSON.parse(body);
            // console.log(data[0].trends);
            twt = data[0].trends;
            feed = '';
            let i = 0;
            let max = args[1]
                ? !isNaN(args[1])
                    ? args[1] > 50
                        ? 50
                        : args[1]
                    : 5
                : 5;
            for (t of twt) {
                if (i < max) {
                    feed +=
                        '``` ' +
                        emojiPoints[
                            Math.floor(Math.random() * emojiPoints.length)
                        ] +
                        '  ' +
                        t.name +
                        ' ```';
                }
                i++;
            }
            console.log(feed);
            try {
                if (feed.length > 1023)
                    throw (
                        'Top ' +
                        args[1] +
                        ' is a huge list, try a smaller number'
                    );
                msg.channel.send({
                    embed: {
                        color: 12118406,
                        title: 'News Feed 📰',
                        description: 'Here are the recent trends 📈',
                        timestamp: new Date(),
                        fields: [
                            {
                                name: '\u200B',
                                value: feed,
                            },
                        ],
                    },
                });
            } catch (e) {
                msg.channel.send(e.toString());
            }
        });

        res.on('error', function (error) {
            // console.error(error);
            twt = {
                name: error,
                url: 'http://404.com',
                promoted_content: null,
                query: '404',
                tweet_volume: 0,
            };
            msg.channel.send(twt);
        });
    });
    req.end();
}

function help(msg, args) {
    let commandList = '';
    for (let i = 0; i < settings.commands.length; i++) {
        commandList += '```' + settings.commands[i] + '```';
    }
    msg.channel.send({
        embed: {
            color: 12118406,
            title: 'Available Commands :',
            description: 'Commands are case-sensitive and starts with "!"',
            fields: [
                {
                    name: '\u200B',
                    value: commandList,
                },
            ],
            footer: {
                text: 'For suggestions/help contact devs.',
            },
        },
    });
}

function info(msg, args) {
    msg.channel.send({
        embed: {
            color: 3447003,
            author: {
                name: bot.user.username,
                icon_url: 'https://i.imgur.com/dG966Od.png',
            },
            title: '(>‿◠)✌',
            url: 'http://google.com',
            description: "I'm a bot. And i can groot groo...",
            fields: [
                {
                    name: 'Devs 👨‍💻',
                    value: '[@WatchDog](https://github.com/shriram29)',
                },
                {
                    name: '🤖💫⭐️✨⚡️☄️🌟🔥🌪🌈☀️💥',
                    value: '```Use !help to know more```',
                },
                {
                    name: '\u200B',
                    value: '\u200B',
                },
                {
                    name: 'https://botski.shriram.xyz/',
                    value: 'To add BotSki to your discord server',
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: 'https://i.imgur.com/dG966Od.png',
                text: 'Build🆔 ' + botVer + '✔️',
            },
        },
    });
}

function log(msg, args) {
    msg.channel.send({
        embed: {
            title: 'Change Logs for ' + 'Build🆔  ' + botVer,
            color: 9056477,
            footer: {
                text: 'Updated on ' + botDate + ' 🏷️',
            },
            fields: [
                {
                    name: 'New features 🔥:',
                    value: botNew,
                },
                {
                    name: 'Updates 👍:',
                    value: botUpdate,
                },
            ],
        },
    });
}

function playlist(msg, args) {
    var url = 'http://localhost:' + port + '/playlist?id=' + args[2];
    http.get(url, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var datas = JSON.parse(body);
            if (datas.length == 0) {
                msg.channel.send('Playlist Not available');
            } else {
                const voiceChannel = msg.member.voice.channel;
                if (!voiceChannel)
                    return msg.channel.send(
                        'You need to be in a voice channel to play music!'
                    );

                const permissions = voiceChannel.permissionsFor(
                    msg.client.user
                );
                if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
                    return msg.channel.send(
                        'I need the permissions to join and speak in your voice channel!'
                    );

                try {
                    voiceChannel.join();
                    for (links of datas[0]['links'])
                        msg.channel.send(args[1] + ' ' + links);
                } catch (err) {
                    return msg.channel.send(err);
                }
            }
        });
    }).on('error', function (e) {
        console.log('Got an error: ', e);
    });
}

// let the bot conquer the world
bot.login(token);
