import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin!'),
    async execute(interaction: ChatInputCommandInteraction ) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

        const embed = new EmbedBuilder()
            .setColor(result === 'Heads' ? 0x00FF00 : 0xFF0000)
            .setTitle('Coin Flip Result')
            .setDescription(`The coin landed on **${result}**!`)
            .setImage(result === 'Heads' ? 'https://upload.wikimedia.org/wikipedia/commons/c/c0/OBVERSE_GEORGE_III%2C_new_coinage%2C_half_sovereign%2C_1817_%28S3786%29._Nearly_uncirculated.jpg' : 'https://upload.wikimedia.org/wikipedia/commons/4/40/REVERSE_GEORGE_III%2C_new_coinage%2C_half_sovereign%2C_1817_%28S3786%29._Nearly_uncirculated.jpg')
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    }
}