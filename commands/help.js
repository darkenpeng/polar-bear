import { SlashCommandBuilder } from '@discordjs/builders';
// const discord = require('discord.js');
// const message = discord.Message;
// const url = message.URL;

export default {
	data: new SlashCommandBuilder()
    // .setName(name,[reason])
    
		.setName('help')
		.setDescription('/help!'),
	async execute(interaction) {
		return interaction.reply('도움말도움말');
	},
};