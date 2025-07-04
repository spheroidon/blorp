import { Client, Collection } from "discord.js";

interface BlorpClient extends Client {
    commands: Collection<string, any>;
    cooldowns: Collection<string, Collection<string, number>>;
}

export type { BlorpClient };