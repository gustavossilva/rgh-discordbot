import { SubHealerEmoji, SubDPSEmoji } from "../constants/roles.js";
import fetch from 'node-fetch'

function capitalizeFirstLetter(str) {
    if (!str) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const funnyArray = ["Dizzy is awesome", "E'vhano is Awesome", "Mikel is gay", "I love you all", "Use your bathroom to pee", "The easiest battle is the one you never appear to fight", "RGH Rules", "What do Shiva and Crystal Tower have in common? Bone Dragon", "I'm a bot, beep boop", "A Dragoon walked into a bar. The rest of the party dodged.", "Why shouldn't a lalafell be a culinarian? The steaks are too high."];

export default {
    name: 'serverstatus',
    description: "Show current server status",
    async execute(message, args) { //message, args, Discord, client
        const serverToCheck = args?.[0]
        const parsedServerString = capitalizeFirstLetter(serverToCheck);
        if (parsedServerString) {
            try {
                const serverStatusResponse = await fetch('https://frontier.ffxiv.com/worldStatus/current_status.json');
                const serverStatusParsed = await serverStatusResponse.json();
                const serverRequestedStatus = serverStatusParsed?.[parsedServerString];
                if (typeof serverRequestedStatus !== "undefined") {
                    if (serverRequestedStatus) {
                        message.channel.send({ content: `Server ${parsedServerString} is currently `+SubHealerEmoji+" ONLINE! Have fun o/" });
                    } else {
                        message.channel.send({ content: `Server ${parsedServerString} is currently `+SubDPSEmoji+" OFFLINE! Go watch some youtube or drink beer"});
                    }
                } else {
                    const randomString = Math.floor((Math.random() * funnyArray.length));
                    message.channel.send({ content: "I can't find the server you typed, try something like"+"\n\n"+"-serverstatus Exodus"+"\n\n"+"And here is a joke or a fact: "+funnyArray?.[randomString] });
                }
            } catch (e) {
                console.error(e);
                message.channel.send({ content:"Something is wrong with me, please contact Dizzy or E'vhano :smiling_face_with_tear:" });
            }
        }
    }
}