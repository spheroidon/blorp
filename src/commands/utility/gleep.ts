import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('gleep')
        .setDescription('Glorp?'),
    async execute(interaction: ChatInputCommandInteraction ) {
        await interaction.reply('Glorp!');
    }
}