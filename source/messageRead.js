const showReact = require('./utils/showReact'); 
const showCovid = require('./utils/showCovid');
const showInfo = require('./utils/showInfo');
const showHelp = require('./utils/showHelp');
const showLog = require('./utils/showLog');
const voteKick = require('./utils/voteKick');
const createPoll = require('./utils/createPoll');

module.exports = (bot) => {

    bot.on('message', async (message) => {

        const prefix = '!';

        // Preliminary cheks
        if (message.author.bot) return;    

        if (message.guild){
            if (!message.content.startsWith(prefix)) return;
        }
    
        const commandBody = (message.guild)? message.content.slice(prefix.length) : message.content;
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        const text = args.join(' ')
        
        // console.log("CommandBody:",commandBody);
        // console.log("args:",args);
        // console.log("command:",command);
        // console.log("text:",text);


        if (message.mentions.has(bot.user)) {
            message.channel.send(
                '`$ Summon.exe : Successful\n$ Waiting for Command ... \n$ Use !help for help     \n`'
            );
        }

        switch (command) {
            case 'react':
                showReact(message,text);
                break;
            case 'info':
                showInfo(message, text);
                break;
            case 'log':
                showLog(message, text);
                break;
            case 'help':
                showHelp(message, text);
                break;
            case 'covid':
                showCovid(message, text);
                break;
            case 'clip' : 
                playClip(message, text); 
                break;
            case 'kick' : 
                voteKick(message, args); 
                break;
            case 'vote':
                createPoll(message, text)
            default : 
                break;
        }
    });
}
