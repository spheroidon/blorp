import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    cooldown: 7,
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('Get a random dad joke!'),
    async execute(interaction: ChatInputCommandInteraction ) {
        const joke = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'text/plain'
            }
        }).then(response => response.text());

        if (!joke || joke.length === 0) {
            return await interaction.reply({
                content: 'Oops! It appears I ran out of dad jokes. Please try again later!',
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setColor(0xABBEEB)
            .setTitle(`[🥸] Here's your Dad Joke:`)
            .setDescription(joke)
            .setFooter({ text: 'Dad Joke provided by icanhazdadjoke.com' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}