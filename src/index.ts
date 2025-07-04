import 'dotenv/config';
import { Client, Collection, Events, MessageFlags } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { BlorpClient, loadCommands, loadEvents } from './blorpclient';


const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent']
}) as BlorpClient;

client.cooldowns = new Collection();

loadCommands(client);
loadEvents(client);

client.login(process.env.BOT_TOKEN)