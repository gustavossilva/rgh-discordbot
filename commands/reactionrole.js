import { HealerEmoji, TankEmoji, DPSEmoji } from "../constants/roles.js";


export default {
    name: 'reactionrole',
    description: "Sets up a reaction role message.",
    async execute(message, _, Discord, __) { //message, args, Discord, client
        try {
            const messages = await message.channel.messages.fetch();
            const filtered = [...messages.values()].filter(msg => msg.author.bot);
            
            if (filtered.length !== 3){
                let embed = new Discord.MessageEmbed()
                .setColor('#ff8605')
                .setTitle('Choose your preferred roles.')
                .setDescription('Choosing a role will assign you to the group you wish to be associated with.\n\n'
                    +`${HealerEmoji} for the Healer role.\n`
                    +`${TankEmoji} for the Tank role.\n`
                    +`${DPSEmoji} for the DPS role.`);

                let messageEmbed = await message.channel.send(embed);
                messageEmbed.react(HealerEmoji);
                messageEmbed.react(TankEmoji);
                messageEmbed.react(DPSEmoji);    
            }
        } catch(e) {
            console.error(e);
        }
    }
}