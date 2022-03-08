// const { Client, Intents } = require('discord.js');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, channelID } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
	
}

client.on('ready', () => {
	const cachedChannel = client.channels.cache.get(channelID);
	cachedChannel.send('메세지가 특정한 채널에 보내지는지 확인하는 메세지')
	console.log('Ready!');
	
});


// 명령어 + url
// slashCommandBuilder 알아서 쪼개지않을까? 
// url 갖고와서 og로 넘겨주는 친구 

client.on('interactionCreate', async interaction => {
	const cachedChannel = client.channels.cache.get(channelID);
	console.log(cachedChannel.id)
	console.log(interaction.channelId)
	if(cachedChannel.id == interaction.channelId){
		if (!interaction.isCommand()) return;
	
	
		// const channel = client.channels.cache.get('id');
		// channel.send();
		const command = client.commands.get(interaction.commandName);
		
		if (!command) return;
	
		try {
	
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

	}
});

client.login(token);



