const { showPlaylist, showDefault, showCovidDetails } = require('./utils/helper');

const prefix = '!';


module.exports = (bot) => {

    bot.on('message', (message) => {

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
            case 'info':
            case 'log':
            case 'help':
            case 'update':
                showDefault(message, command, bot, text);
                break;

            case 'covid':
                showCovidDetails(message, text);
                break;
    
            case 'playlist':
                showPlaylist(message, text);
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
