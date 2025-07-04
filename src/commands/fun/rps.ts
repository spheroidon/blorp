import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play Rock, Paper, Scissors against Blorp!')
        .addStringOption(option =>
            option.setName('choice')
                .setDescription('Your choice: rock, paper, or scissors')
                .setRequired(true)
                .addChoices(
                    { name: 'Rock', value: 'rock' },
                    { name: 'Paper', value: 'paper' },
                    { name: 'Scissors', value: 'scissors' }
                )),
    async execute(interaction: ChatInputCommandInteraction ) {
        const userChoice = interaction.options.getString('choice');
        const choices = ['rock', 'paper', 'scissors'];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        let result;
        if (userChoice === botChoice) {
            result = `I chose **${botChoice}** too. *It\'s a tie!*`;
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = `I chose **${botChoice}**. *You win!*`;
        } else {
            result = `I chose **${botChoice}**. *You lose!*`;
        }

        let emoji;
        if (userChoice === 'rock') {
            emoji = '✊';
        } else if (userChoice === 'paper') {
            emoji = '✋';
        } else if (userChoice === 'scissors') {
            emoji = '✌️';
        }

        const embed = new EmbedBuilder()
            .setColor(0xEEE9DC)
            .setTitle(`[${emoji}] Rock, Paper, Scissors!`)
            .setDescription(`You chose: **${userChoice}**. ${result}`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}