import { SlashCommandBuilder } from '@discordjs/builders';
export default {
	data: new SlashCommandBuilder()    
		.setName('help')
		.setDescription('/help!'),
	async execute(interaction) {
		return interaction.reply('/notion URL을 입력하면 노션 데이터베이스로 날아가요!');
	},
};