import 'dotenv/config';
import { Client, Collection, Events, MessageFlags } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { BlorpClient, loadCommands, loadEvents } from './blorpclient';


const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent']
}) as BlorpClient;

client.cooldowns = new Collection();

// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
//     const commandsPath = path.join(foldersPath, folder);
//     const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
//     for (const file of commandFiles) {
//         const filePath = path.join(commandsPath, file);
//         const command = require(filePath);

//         if ('data' in command && 'execute' in command) {
//             client.commands.set(command.data.name, command);
//         } else {
//             console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
//         }
//     }
// }

loadCommands(client);
loadEvents(client);

client.login(process.env.BOT_TOKEN)