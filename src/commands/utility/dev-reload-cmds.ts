import 'dotenv/config';
import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { BlorpClient, loadCommands } from "../../blorpclient";

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("dev-reload-cmds")
        .setDescription("Reload all commands."),
    async execute(interaction: ChatInputCommandInteraction) {
        const devRoleIds = (process.env.DEV_USER_IDS ?? "").split(",").map(id => id.trim()).filter(id => id.length > 0);
        if (!devRoleIds.includes(interaction.user.id)) {
            return await interaction.reply({
                content: "You do not have permission to use this command.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const client = interaction.client as BlorpClient;

        try {
            loadCommands(client);
            await interaction.reply({
                content: "Commands reloaded successfully.",
            });
        } catch (error) {
            console.error("Error reloading commands:", error);
            await interaction.reply({
                content: "There was an error reloading the commands.",
            });
        }
    },
};