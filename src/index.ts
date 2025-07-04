import 'dotenv/config';
import { Client } from 'discord.js';

const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent']
})

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.BOT_TOKEN)