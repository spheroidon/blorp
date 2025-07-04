import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { BlorpClient } from '../../blorpclient';

module.exports = {
    cooldown: 7,
    data: new SlashCommandBuilder()
        .setName('cmd-count')
        .setDescription('Check how many commands Blorp has to offer!'),
    async execute(interaction: ChatInputCommandInteraction ) {
        const commandCount = (interaction.client as BlorpClient).commands.size;

        const response = await fetch(`http://numbersapi.com/${commandCount}`);
        const funfact = await response.text() || `Normally, I'd share a fun fact here, but I couldn't find one this time.`;

        const embed = new EmbedBuilder()
            .setColor(0xDEDEDE)
            .setTitle(`[👽] Blorp has ${commandCount} commands available!`)
            .setDescription(funfact)
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
}