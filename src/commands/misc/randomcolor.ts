import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    cooldown: 7,
    data: new SlashCommandBuilder()
        .setName('randomcolor')
        .setDescription('Generate a random color!'),
    async execute(interaction: ChatInputCommandInteraction) {
        const colorInt = Math.floor(Math.random() * 0xffffff);
        const hexColor = `#${colorInt.toString(16).padStart(6, '0').toUpperCase()}`;

        // Convert to RGB
        const r = (colorInt >> 16) & 0xff;
        const g = (colorInt >> 8) & 0xff;
        const b = colorInt & 0xff;
        const rgb = `(${r}, ${g}, ${b})`;

        const embed = new EmbedBuilder()
            .setTitle('[🎨] Random Color:')
            .setDescription(`Hex: \`${hexColor}\`\nRGB: \`${rgb}\``)
            .setColor(colorInt)
            .setImage(`https://singlecolorimage.com/get/${hexColor.slice(1)}/400x100`);

        await interaction.reply({ embeds: [embed] });
    }
}