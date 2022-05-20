import { SlashCommandBuilder } from '@discordjs/builders';
export default {
	data: new SlashCommandBuilder()    
		.setName('help')
		.setDescription('/help!'),
	async execute(interaction) {
		return interaction.reply('도움말도움말');
	},
};