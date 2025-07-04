import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('diceroll')
        .setDescription('Roll dice!')
        .addStringOption(option =>
            option.setName('dice')
                .setDescription('The dice you want to roll (e.g., 1d6, 2d10+3)')
                .setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction ) {
        const diceInput = interaction.options.getString('dice');
        if (!diceInput) {
            return await interaction.reply({
                content: 'Please provide a dice format like `1d6`, `2d10+3`, etc.',
                ephemeral: true
            });
        }
        const dicePattern = /^(\d+)?d(\d+)([+-]\d+)?$/i;
        const match = diceInput.match(dicePattern);
        if (!match) {
            return await interaction.reply({
                content: 'Invalid dice format! Use the format like `1d6`, `2d10+3`, etc.',
                ephemeral: true
            });
        }
        const numDice = match[1] ? parseInt(match[1]) : 1; // Default to 1 die if not specified
        const dieSides = parseInt(match[2]);
        const modifier = match[3] ? parseInt(match[3]) : 0; // Default to 0 if no modifier
        if (isNaN(numDice) || isNaN(dieSides) || isNaN(modifier)) {
            return await interaction.reply({
                content: 'Invalid dice format! Please ensure you use numbers.',
                ephemeral: true
            });
        }
        if (numDice < 1 || dieSides < 2) {
            return await interaction.reply({
                content: 'You must roll at least one die with at least two sides.',
                ephemeral: true
            });
        }
        if (numDice > 100 || dieSides > 1000) {
            return await interaction.reply({
                content: 'You cannot roll more than 100 dice or dice with more than 1000 sides.',
                ephemeral: true
            });
        }
        let result = 0;
        const rolls = [];
        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * dieSides) + 1;
            rolls.push(roll);
            result += roll;
        }
        result += modifier;
        const rollsString = rolls.join(', ');
        const modifierString = modifier !== 0 ? (modifier > 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`) : '';
        const resultString = `${rollsString}${modifierString ? ` ${modifierString}` : ''} = **${result}**`;
        
        let description = `You rolled **${numDice}d${dieSides}**:\n${resultString}`;
        if (modifier > 0) {
            description = `You rolled **${numDice}d${dieSides}+${modifier}**:\n${resultString}`;
        } else if (modifier < 0) {
            description = `You rolled **${numDice}d${dieSides}${modifier}**:\n${resultString}`;
        }

        const embed = new EmbedBuilder()
            .setColor(0xE2392B)
            .setTitle('[🎲] Dice Roll Result:')
            .setDescription(description)
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    }
}