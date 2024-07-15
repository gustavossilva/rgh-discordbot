import { emojis, prefix } from './constants/roles.js'
import { getRoles } from './utils/interactions.js';
import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';

// Load environment variables from .env file
dotenv.config();

// Set up Express server to keep the bot running
const app = express();
app.get('/', (_, res) => res.send('Bot is running!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

// setup Discord
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION",]});
const channel = '1164960265662631986';
client.commands = new Discord.Collection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandFiles = fs.readdirSync(path.join(__dirname, './commands')).filter(file => file.endsWith('.js'));
(async () => {
    for (const file of commandFiles) {
        const command = await import(`./commands/${file}`);
        client.commands.set(command.default.name, command.default);
    }
})();

client.once('ready', () => {
    console.log('Osorio is online!'); 
});

client.on('messageReactionAdd', async (reaction, user) => {
    try {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id == channel) {
            const roles = getRoles({ rolesCache: reaction.message.guild.roles.cache });
            const emoji = emojis.find(emote => emote === reaction.emoji.name);
            if (emoji) {
                console.log('Adding role');
                await reaction.message.guild.members.cache.get(user.id).roles.add(roles.get(emoji));
            }
        } else {
            console.error("Emoji not recognized");
            return;
        }
    } catch (e) {
        console.error(e);
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    try {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id == channel) {
            const roles = getRoles({ rolesCache: reaction.message.guild.roles.cache });
            const emoji = emojis.find(emote => emote === reaction.emoji.name);
            if (emoji) {
                console.log("Removing role");
                await reaction.message.guild.members.cache.get(user.id).roles.remove(roles.get(emoji));
            }
        }else {
            console.error("Emoji not recognized");
            return;
        }
    } catch (e) {
        console.error(e);
    }
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client);
    } else if (command === 'reacta') {
        client.commands.get('reacta').execute(message, args, Discord, client);
    } else if (command === 'reactb') {
        client.commands.get('reactb').execute(message, args, Discord, client);
    } else if (command?.includes('serverstatus')) {
        client.commands.get('serverstatus').execute(message, args, Discord, client);        
    }
});

client.login(process.env.DISCORD_TOKEN);
