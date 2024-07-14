import { SubHealerEmoji, SubTankEmoji, SubDPSEmoji } from '../constants/roles.js'

export default {
    name: 'reacta',
    description: "Sets up a reaction role message.",
    async execute(message, _, Discord, __) { //message, args, Discord, client
        const messages = await message.channel.messages.fetch();
        const filtered = [...messages.values()].filter(msg => msg.author.bot);
        
        if (filtered.length !== 3) {
            let embed = new Discord.MessageEmbed()
                .setColor('#ff8605')
                .setTitle('Choose your preferred roles.')
                .setDescription('Choosing a role will assign you to the group you wish to be associated with.\n\n'
                    +`${SubHealerEmoji} for the Sub-Healer role.\n`
                    +`${SubTankEmoji} for the Sub-Tank role.\n`
                    +`${SubDPSEmoji} for the Sub-DPS role.`);

            let messageEmbed = await message.channel.send(embed);
            messageEmbed.react(SubHealerEmoji);
            messageEmbed.react(SubTankEmoji);
            messageEmbed.react(SubDPSEmoji);
        }
    }
}