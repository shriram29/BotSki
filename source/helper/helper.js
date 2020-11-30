// bot exploitation

const getRandomElement = (element) => element[Math.floor(Math.random() * element.length)];

const getUserAvatar = async (bot, id) => {
    const { displayAvatarURL } = await bot.fetchUser(id).catch(console.error);
}

const fetch = require('node-fetch');

const getRandomSubarray = (arr, size) => {

    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

const getListOfChannels = async (bot) => {

    var array = [];
    let channels = bot.channels.cache.array();

    for (const channel of channels) {
        array.push({ channelName : channel.name, channelId : channel.id });
    }

    return array
};

const getCurrentTime = () => {
    
    let date = new Date();  
    let options = {weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"  };  
    let timeNow = date.toLocaleTimeString("en-us", options);    

    return timeNow;
}

const getImageFromURL = async (url) => {
    let response = await fetch(url);
    let buffer = await response.buffer();

    return buffer;
}

module.exports = {
    getListOfChannels,
    getRandomElement,
    getRandomSubarray,
    getCurrentTime,
    getImageFromURL
}