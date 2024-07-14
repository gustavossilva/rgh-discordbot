import { SpoilEmoji, SpoilaEmoji, SpoilbEmoji, RaiderEmoji, FCEmoji, NonFCEmoji } from "../constants/roles.js";

export default {
    name: 'reactb',
    description: "Sets up a reaction role message.",
    async execute(message, _, Discord, __) { //message, args, Discord, client
        const messages = await message.channel.messages.fetch();
        const filtered = [...messages.values()].filter(msg => msg.author.bot);

        if (filtered.length !== 3) {
            let embed = new Discord.MessageEmbed()
                .setColor('#ff8605')
                .setTitle('Choose your preferred roles.')
                .setDescription('Choosing a role will assign you to the group you wish to be associated with.\n\n'
                    +`${RaiderEmoji} for the Raider role.\n`
                    +`${FCEmoji} for FC Role.\n`
                    +`${NonFCEmoji} for the Non-FC Role.\n`
                    +`${SpoilEmoji} for the Spoiler Chat role.\n`
                    +`${SpoilaEmoji} for the 6.5 Spoiler Chat Access Role.\n`
                    +`${SpoilbEmoji} for the 7.0 Spoiler Chat Access Role.\n`);
            let messageEmbed = await message.channel.send(embed);
            messageEmbed.react(SpoilEmoji);
            messageEmbed.react(RaiderEmoji);
            messageEmbed.react(FCEmoji);
            messageEmbed.react(NonFCEmoji);
            messageEmbed.react(SpoilaEmoji);
            messageEmbed.react(SpoilbEmoji);
        }
    }
}