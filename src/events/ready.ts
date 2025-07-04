import { Events } from 'discord.js';
import { BlorpClient } from '../blorpclient';

module.exports = {
	name: Events.ClientReady,
	once: true,
    execute(client: BlorpClient ): void {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    },
};