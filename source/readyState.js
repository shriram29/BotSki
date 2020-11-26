const { botActivity } = require('../settings');

const readyState = (bot) => {

    bot.on('ready', () => {
        console.log('Bosskey ready to bomb');
        bot.user.setPresence({
            activity: botActivity,
            status: 'available',
        });
    });
    
    bot.on("disconnected", () => {
        client.user.setStatus("offline");
        console.log(client.user);
    });

}

module.exports = readyState;