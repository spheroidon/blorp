import { Collection, Events, Interaction, MessageFlags } from 'discord.js';
import { BlorpClient } from '../blorpclient';

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            const command = (interaction.client as BlorpClient).commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            const cooldowns = (interaction.client as BlorpClient).cooldowns;
            if (!cooldowns.has(command.data.name)) {
                cooldowns.set(command.data.name, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (command.cooldown || defaultCooldownDuration) * 1000;

            if (timestamps && interaction && timestamps.has(interaction.user.id)) {
                const userTimestamp = timestamps.get(interaction.user.id);
                if (userTimestamp !== undefined) {
                    const expirationTime = userTimestamp + cooldownAmount;

                    if (now < expirationTime) {
                        const expiredTimestamp = Math.round(expirationTime / 1_000);
                        return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, flags: MessageFlags.Ephemeral });
                    }
                }
            }

            if (timestamps) {
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                }
            }
        }
    }
};