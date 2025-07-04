import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('4th-of-july-countdown')
        .setDescription('Get the countdown to the 4th of July!'),
    async execute(interaction: ChatInputCommandInteraction) {
        const now = new Date();

        // one day into the future
        // const now = new Date(Date.now() + 24 * 60 * 60 * 1000); // For testing purposes, set to one day in the future

        const pacificOffsetHours = 7;
        const pacificNow = new Date(now.getTime() - pacificOffsetHours * 60 * 60 * 1000);
        const pacificYear = pacificNow.getUTCFullYear();

        const isJulyFourth =
            pacificNow.getUTCMonth() === 6 && // July is month 6 (zero-based)
            pacificNow.getUTCDate() === 4;


        let color = 0xA1561C;
        let message = '🦅 Oops! This isn\'t supposed to happen...';
        if (isJulyFourth) {
            message =
                `🎆 **Happy Independence Day!** 🎆\n\n` +
                `🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽\n` +
                `🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅\n` +
                `🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽\n` +
                `🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅\n` +
                `🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽\n` +
                `🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅\n` +
                `🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽\n` +
                `🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅\n` +
                `🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽\n` +
                `🦅🗽🦅🗽🦅🗽🦅🗽🦅🗽🦅\n`;
            color = 0xA5C3B6
        } else {
            const target = new Date(Date.UTC(pacificYear, 6, 4, pacificOffsetHours, 0, 0)); // July 4, 00:00 PDT => 07:00 UTC
            if (now >= target) {
                // Target is next year's July 4
                target.setUTCFullYear(pacificYear + 1);
            }

            const diffMs = target.getTime() - now.getTime();
            const totalSeconds = Math.floor(diffMs / 1000);

            const days = Math.floor(totalSeconds / (60 * 60 * 24));
            const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
            const seconds = totalSeconds % 60;

            message = `🎆 Countdown to **4th of July** (Pacific Time):\n` +
                `**${days} days**, **${hours} hours**, **${minutes} minutes**, **${seconds} seconds** remaining!`;

            const colors = [0xFF0000, 0xFFFFFF, 0x0000FF];
            color = colors[Math.floor(Math.random() * colors.length)];
        }

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('[🇺🇸] 4th of July Countdown:')
            .setDescription(message)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}