const minimist = require('minimist');
const { MessageEmbed, Collection } = require('discord.js');

const { getRandomSubarray, getRandomElement } = require('../helper/helper');
const { emojiList } = require('../../settings');


// Helper functions
const getVotingParams = (text) => {

    flagsArray = []
    choice = {option : [], message : '', time : 1}
    
    flags = text.split(/-|--/);
    flags = flags.filter((element) => element.length != 0)
    flags.forEach((element) => {
        element = element.trim()
        flagsArray.push({flag : element.split(' ')[0], body : element.split(' ').slice(1)})
    });

    flagsArray.forEach((element) => {
        
        switch(element.flag){

            case 'o':
            case 'option':
                choice['option'] = element['body'];
                break;
            
            case 'm':
            case 'message':
                choice['message'] = element['body'].join(' ');
                break;

            case 't':
            case 'time':
                choice['time'] = parseFloat(element['body']);
                    break;

            default:
                break;
        }
    })

    return choice;
}

const checkVotingParams = (message, choice) => {

    let valid = true

    if (choice.message === '' && choice.option.length === 0){
        message.channel.send(
        "Hey "+ message.author.username +", try this\n\
        ```!vote -m \"<message>\" -o <option1 option2 ... option n> -t <time in minutes>```\n\
        `For Yes/No you can leave the options flag empty`");

        valid = false;
    }

    if (choice.option.length === 1){
        message.channel.send(`${message.author.username},  Having only one option is communism`)
            .then((msg) => msg.delete({timeout : 10 * 1000}))
        valid = false;
    } 

    return valid
}

module.exports = async (message, text) => {


    var choice = getVotingParams(text);
    let checks = checkVotingParams(message, choice);

    if (!checks) {
        message.delete({timeout : 5000})
        return;
    }


    var YesOrNo = getRandomElement([ ['✅','❎'], ['👍', '👎']]);
    var emojiSubset = (choice.option.length >= 2)? getRandomSubarray(emojiList, choice.option.length) : YesOrNo;
    if (choice.option.length == 0) choice.option = ['Yes', 'No'];

    var connection = {};
    var fields = []

    choice.option.forEach((element, idx) =>  {
        fields.push({name : `${element} \t ${emojiSubset[idx]}`, value : '\u200B'});
        connection[emojiSubset[idx]] = { value : 0, name : element };
    });
    
    var Wembed = new MessageEmbed()
        .setColor('#0099ff')
        .setThumbnail(message.author.avatarURL)
        .setAuthor("POLLING TIME")
        .addFields(fields)
        .setTitle(choice.message.slice(1,-1))
        .setFooter(`${message.author.username} has started a poll  |\t ${choice.time} minute(s)`)

    discordMessage = await message.channel.send(Wembed);
    emojiSubset.forEach((element,index) => discordMessage.react(element))

    const filter = (reaction, user) => emojiSubset.includes(reaction.emoji.name);
    const collector = discordMessage.createReactionCollector(filter, {time: (1000 * choice.time * 60)});

    // collector.on('collect', (reaction, user) => console.log(`${user.username} has voted`))

    var results = {}

    console.log(connection);

    collector.on('end', collected => {
        for (let collect of collected) {
            connection[collect[0]].value = collect[1].count - 1
        }
        console.log(connection);
        message.channel.send('Polling is over. Doesn\'t matter, Bosskey is still a hoe.');
    });
    
    message.delete({timeout : 5000})

}

