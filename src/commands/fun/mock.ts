import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mock')
        .setDescription('Mocks the text you provide!')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to mock')
                .setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction ) {
        const text = interaction.options.getString('text');
        if (!text) {
            return await interaction.reply({
                content: 'Please provide some text to mock!',
                ephemeral: true
            });
        }

        // Mock the text by alternating between uppercase and lowercase
        const mockedText = text.split('')
            .map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
            .join('');

        const embed = new EmbedBuilder()
            .setColor(0xFCEE68)
            .setTitle(mockedText)
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
}