import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8-ball a question!')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question you want to ask the magic 8-ball')
                .setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction ) {
        const responses = [
            'Yes', 'No', 'Maybe', 'Ask again later', 'Definitely', 'Absolutely not',
            'It is certain', 'Very doubtful', 'Without a doubt', 'My sources say no',
            'As I see it, yes', 'Outlook not so good', 'Yes, in due time', 'You may rely on it',
            'Concentrate and ask again', 'Better not tell you now', 'Cannot predict now', 'Don’t count on it',
            'Most likely', 'Outlook good', 'Yes, definitely', 'You can count on it', 'It is decidedly so',
            'My reply is no', 'Yes, in the near future', 'The outlook is not so good', 'Yes, but be cautious',
            'In this economy?!', 'Idk mate', 'No idea buddy', 'Ask your mom', 'The stars say no',
            'You can certainly try', 'Hell no', 'Heck yeah'
        ];
        const result = responses[Math.floor(Math.random() * responses.length)];

        // Set a random color for the embed
        const colors = [0x9613F1, 0xAE43F9, 0xF943F1, 0xA61BA0, 0xB20EE7];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const embed = new EmbedBuilder()
            .setColor(randomColor)
            .setTitle('Magic 8-Ball Response')
            .setDescription(`**Question:** ${interaction.options.getString('question')}\n**Answer:** ${result}`)
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    }
}