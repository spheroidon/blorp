import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('owoify')
        .setDescription('OwOifies the text you provide!')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to OwOify')
                .setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        const text = interaction.options.getString('text');
        if (!text) {
            return await interaction.reply({
                content: 'Please provide some text to OwOify!',
                ephemeral: true
            });
        }

        // OwOify the text by replacing certain patterns
        const owoifiedText = text
            .replace(/r/g, 'w')
            .replace(/l/g, 'w')
            .replace(/R/g, 'W')
            .replace(/L/g, 'W')
            .replace(/n([aeiou])/gi, 'ny$1')
            .replace(/ove/gi, 'uv')
            .replace(/\!+/g, ' owo!')
            + ' ~uwu';


        const embed = new EmbedBuilder()
            .setColor(0xF7D2EA)
            .setTitle(`[🎀] ${owoifiedText}`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}