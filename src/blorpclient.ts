import { Client, Collection } from "discord.js";

interface BlorpClient extends Client {
    commands: Collection<string, any>;
}

export type { BlorpClient };