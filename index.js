// const { Client, Intents } = require('discord.js');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, channelID } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { channel } = require('diagnostics_channel');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
	
}

// 먼저 fetch로 채널의 id를 이용해 요청한다
// 
// client.on('debug', console.error);
//when new promise is created, the executor runs automatically.

// const cachedChannel = client.channels.cache.get(channel)

	// const cachedChannel = client.channels.cache.get(channel)
	
  	// .then(channel => console.log(channel))
  	// .catch(console.error);

// // 굳이 분리하지 않기
// channel.send('content');

client.on('ready', () => {

	console.log('Ready!');
	const cachedChannel = client.channels.cache.get(channelID);
	// (property) DataManager<string, AnyChannel, ChannelResolvable>.cache: Collection<string, AnyChannel>
    console.log(cachedChannel);
	// client.channels.fetch(channelID)
	// .then(console.log)
	// .catch(console.error)

	
});


// 명령어 + url
// slashCommandBuilder 알아서 쪼개지않을까? 
// url 갖고와서 og로 넘겨주는 친구 

client.on('interactionCreate', async interaction => {
	
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
});

client.login(token);


