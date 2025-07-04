import { Client, Collection } from "discord.js";
import fs from 'node:fs';
import path from 'node:path';

interface BlorpClient extends Client {
    commands: Collection<string, any>;
    cooldowns: Collection<string, Collection<string, number>>;
}

export function loadCommands(client: BlorpClient) {
    if (client.commands) {
        client.commands.clear();
    } else {
        client.commands = new Collection();
    }

    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);

            delete require.cache[require.resolve(filePath)];

            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                const missingProps = [];
                if (!('data' in command)) missingProps.push('"data"');
                if (!('execute' in command)) missingProps.push('"execute"');
                console.log(`[WARNING] The command at ${filePath} is missing required property(ies): ${missingProps.join(', ')}.`);
            }
        }
    }
}    

export function loadEvents(client: BlorpClient) {
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    const eventHandler = (event: any) => (...args: any[]) => event.execute(...args);

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, eventHandler(event));
        } else {
            client.on(event.name, eventHandler(event));
        }
    }
}

export type { BlorpClient };
