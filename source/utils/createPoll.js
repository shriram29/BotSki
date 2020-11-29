const minimist = require('minimist');
const { MessageEmbed, Collection } = require('discord.js');

const { getRandomSubarray, getRandomElement, getCurrentTime } = require('../helper/helper');
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

const structureResult = async (collected, mapping, embedParams) => {

        var fields = [];

        for await (const collect of collected) {
            emoji = collect[0];
            mapping[emoji].value = collect[1].count - 1;

            let {name, value} = mapping[emoji];

            fields.push({name : `${name.replace(/_/g, ' ')} \t ${emoji}\t ${value}`, value : '\u200B'});

            // results += `${emoji} ${name}  :  ${value}\n`
        }


        var Wembed = new MessageEmbed()
            .setColor('#0099ff')
            .addFields(fields)
            .setTitle(embedParams.message)
            .setAuthor("POLL HAS ENDED")
            .setFooter(`${embedParams.author} started a poll on ${embedParams.time}`)

            
        return Wembed;

}

module.exports = async (message, text) => {


    var choice = getVotingParams(text);
    var checks = checkVotingParams(message, choice);

    if (!checks) {message.delete({timeout : 5000}); return;}

    var emojiSubset = (choice.option.length >= 2)? getRandomSubarray(emojiList, choice.option.length) : getRandomElement([ ['✅','❎'], ['👍', '👎']]);
    if (choice.option.length == 0) choice.option = ['Yes', 'No'];

    var fields = [], mapping = {};

    choice.option.forEach((element, idx) =>  {
        fields.push({name : `${element.replace(/_/g, ' ')} \t ${emojiSubset[idx]}`, value : '\u200B'});
        mapping[emojiSubset[idx]] = { value : 0, name : element };
    });

    var embedParams = {author : message.author.username, time : getCurrentTime(), message : choice.message.slice(1,-1)};

    var Wembed = new MessageEmbed()
        .setColor('#0099ff')
        .setThumbnail(message.author.avatarURL)
        .setAuthor("POLLING TIME")
        .addFields(fields)
        .setTitle(embedParams.message)
        .setFooter(`${embedParams.author} has started a poll  |\t ${choice.time} minute(s)`)

    discordMessage = await message.channel.send(Wembed);
    emojiSubset.forEach((element,index) => discordMessage.react(element))

    const collector = discordMessage.createReactionCollector((reaction, user) => emojiSubset.includes(reaction.emoji.name), {time: (1000 * choice.time * 60)});

    collector.on('end', async collected => {

        let newEmbed = await structureResult(collected, mapping, embedParams);
        discordMessage.edit(newEmbed);

    })

    
    message.delete({timeout : 5000})

}

