import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('lorempicsum')
        .setDescription('Get a random image from Lorem Picsum!')
        .addBooleanOption(option =>
            option.setName('grayscale')
                .setDescription('Whether to fetch a grayscale image')),
    async execute(interaction: ChatInputCommandInteraction ) {
        // Fetch a random image from Lorem Picsum

        const grayscale = interaction.options.getBoolean('grayscale') ? '?grayscale' : '';
        const imageUrl = `https://picsum.photos/300/200${grayscale}`;

        const embed = new EmbedBuilder()
            .setColor(0xB3A89A)
            .setTitle('[🖼️] Here\'s your random image:')
            .setImage(imageUrl)
            .setFooter({ text: 'Photo provided by Lorem Picsum (picsum.photos)' })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
}