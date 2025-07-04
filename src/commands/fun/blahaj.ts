import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blahaj')
        .setDescription('Blåhaj! 🦈'),
    async execute(interaction: ChatInputCommandInteraction ) {
        const images = [
            'https://media.tenor.com/zC1BUiPyXHIAAAAM/bl%C3%A5haj.gif',
            'https://c.tenor.com/cai6MV7B-CYAAAAd/tenor.gif',
            'https://c.tenor.com/AaII8wLccUAAAAAd/tenor.gif',
            'https://c.tenor.com/xxFotzZ0__oAAAAd/tenor.gif',
            'https://c.tenor.com/NSnUvXsN9-8AAAAd/tenor.gif',
            'https://c.tenor.com/gkyOCUxvTvUAAAAd/tenor.gif',
            'https://c.tenor.com/vuyNenVHoRIAAAAd/tenor.gif',
            'https://c.tenor.com/ned0piZ3HT8AAAAd/tenor.gif',
            'https://c.tenor.com/JpairZOomiEAAAAd/tenor.gif',
            'https://c.tenor.com/yiO4tNS5CtkAAAAd/tenor.gif',
            'https://c.tenor.com/K4Y0WdnEUq0AAAAd/tenor.gif',
            'https://c.tenor.com/_Dxo87-JPu4AAAAd/tenor.gif',
            'https://c.tenor.com/GAR9pKKpnIEAAAAd/tenor.gif',
            'https://c.tenor.com/xmEoF3cCVA4AAAAd/tenor.gif',
            'https://c.tenor.com/EDi5YeeBspIAAAAd/tenor.gif',
            'https://c.tenor.com/wj7Z82HE3kAAAAAd/tenor.gif'
        ];

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const embed = new EmbedBuilder()
            .setColor(0x5795A5)
            .setTitle('[🦈] Blåhaj')
            .setImage(randomImage)
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
}