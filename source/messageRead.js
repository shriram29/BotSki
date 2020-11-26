const { showPlaylist, showDefault, showCovidDetails } = require('./utils/helper');
const showReact = require("./utils/showReact");
const showCovid = require("./utils/showCovid");
const showInfo = require("./utils/showInfo");
const showHelp = require("./utils/showHelp");
const showLog = require("./utils/showLog");

const prefix = '!';


module.exports = (bot) => {

    bot.on('message', async (message) => {

        if (message.author.bot) return;        
        if (!message.content.startsWith(prefix)) return;
    
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        const text = args.join(' ')
        
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
                showInfo(message, text,bot.user.username);
                break;
            case 'log':
                showLog(message, text, bot.user.username);
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
            
            case 'vote':
                createPoll()

            default : 
                break;
        }
    });
}
