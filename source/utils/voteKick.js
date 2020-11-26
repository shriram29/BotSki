module.exports = async (msg, args) => {
    msg.delete();
    const mssgvar = await msg.channel.send({
        embed: {
            color: 9056477,
            description: `${msg.member} wants to kick ${args[1]}!`,
        },
    });
    const voiceChannel = msg.member.voice.channel;
    if (!msg.mentions.users.first().id)
        return msg.channel.send({
            embed: {
                color: 9056477,
                description: `User doesn't exist`,
            },
        });
    const userKick = msg.guild.member(msg.mentions.users.first().id);
    let adminPriv = 0;
    if (args[2] == 'ImIronMan') {
        adminPriv = 1;
    }
    console.log(userKick);
    if (!voiceChannel)
        return msg.channel.send({
            embed: {
                color: 9056477,
                description:
                    'You need to be in a voice channel to kick people ',
            },
        });
    if (!userKick.voice.channel)
        return msg.channel.send({
            embed: {
                color: 9056477,
                description: `${args[1]} is not in the voice channel ...`,
            },
        });
    mssgvar.react(`✅`);
    mssgvar.react(`⛔`);
    const filter = (reaction) =>
        reaction.emoji.name === '✅' || reaction.emoji.name === '⛔';
    const collector = mssgvar.createReactionCollector(filter, {
        time: 5000,
    });
    collector.on('end', (collected) => {
        console.log(collected.get('✅').count);
        console.log(collected.get('⛔').count);
        msg.channel.send({
            embed: {
                title: 'Voting has finished! ',
                color: 9056477,
                fields: [
                    {
                        name: 'Yessssss!!!!! :',
                        value: collected.get('✅').count - 1,
                    },
                    {
                        name: 'Nooooo... :',
                        value: collected.get('⛔').count - 1,
                    },
                ],
            },
        });
        if (collected.get('✅').count > collected.get('⛔').count) {
            userKick.voice.setMute(true, 'Nee oru pacha cancer dawww');
            if (adminPriv) userKick.voice.kick();
            msg.channel.send({
                embed: {
                    color: 9056477,
                    description: `Kicking ${args[1]}...`,
                },
            });
        }
    });
}
