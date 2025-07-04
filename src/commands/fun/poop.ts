import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poop')
        .setDescription('?!?!?!?!'),
    async execute(interaction: ChatInputCommandInteraction ) {
        const embed = new EmbedBuilder()
            .setColor(0x7289DA)
            .setTitle('[💩] !?')
            .setImage('https://i.postimg.cc/v8qsHpTP/9-HZBYcva-OEnh4t-Op5-Eqgc-Cr-v-KH7cj-FJwkvw-45-Dfjs.png')
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
}