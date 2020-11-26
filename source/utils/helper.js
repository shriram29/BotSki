// bot exploitation
const getListOfChannels = async (bot) => {

    var array = [];
    let channels = bot.channels.cache.array();

    for (const channel of channels) {
        array.push({ channelName : channel.name, channelId : channel.id });
    }

    return array
};

module.exports = {
    getListOfChannels
}