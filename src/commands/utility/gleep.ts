import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gleep')
        .setDescription('Glorp?'),
    async execute(interaction: ChatInputCommandInteraction ) {
        await interaction.reply('Glorp!');
    }
}