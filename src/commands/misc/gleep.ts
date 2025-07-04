import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('gleep')
        .setDescription('Glorp?'),
    async execute(interaction: ChatInputCommandInteraction ) {
        const embed = new EmbedBuilder()
            .setColor(0x46FA55)
            .setTitle('Glorp!')
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
}