import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('picsum')
        .setDescription('Get a random image from Lorem Picsum!')
        .addIntegerOption(option =>
            option.setName('width')
                .setDescription('Width of the image (default: 300)')
                .setMinValue(100)
                .setMaxValue(1000))
        .addIntegerOption(option =>
            option.setName('height')
                .setDescription('Height of the image (default: 200)')
                .setMinValue(100)
                .setMaxValue(1000))
        .addIntegerOption(option =>
            option.setName('blur')
                .setDescription('Blur level of the image (default: 0)')
                .setMinValue(0)
                .setMaxValue(10))
        .addBooleanOption(option =>
            option.setName('grayscale')
                .setDescription('Whether to fetch a grayscale image (default: false)'))
        .addStringOption(option =>
            option.setName('seed')
                .setDescription('Seed for the image (default: none)')),
    async execute(interaction: ChatInputCommandInteraction) {
        // Fetch a random image from Lorem Picsum

        const width = interaction.options.getInteger('width') || 300;
        const height = interaction.options.getInteger('height') || 200; // width and height example: https://picsum.photos/200/300
        const blur = interaction.options.getInteger('blur') || 0; // blur example: https://picsum.photos/200/300/?blur=2
        const grayscale = interaction.options.getBoolean('grayscale') || false; // grayscale example: https://picsum.photos/200/300?grayscale
        const seed = interaction.options.getString('seed') || ''; // seed example: https://picsum.photos/seed/seedname/200/300 Get the same random image every time based on a seed, by adding /seed/{seed} to the start of the url.

        let baseUrl = 'https://picsum.photos';

        if (seed && seed.trim() !== '') {
            baseUrl += `/seed/${encodeURIComponent(seed)}`;
        }

        baseUrl += `/${width}/${height}`;

        const queryParams = [];
        if (grayscale) queryParams.push('grayscale');
        if (blur > 0) queryParams.push(`blur=${blur}`);

        const imageUrl = queryParams.length > 0 ? `${baseUrl}?${queryParams.join('&')}` : baseUrl;

        const embed = new EmbedBuilder()
            .setColor(0xB3A89A)
            .setTitle('[🖼️] Here\'s your random image:')
            .setImage(imageUrl)
            .setFooter({ text: 'Photo provided by Lorem Picsum (picsum.photos)' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}