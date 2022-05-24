import { readFileSync } from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import help from "./commands/help.js";
import notion from "./commands/notion.js";
import ping from './commands/ping.js'
// import config from './config.json';
//

//const configJson = readFileSync("./config/initial-config.json");

const configJson = readFileSync('./config/initial-config.json');
const config = JSON.parse(configJson);
const { token, channelID } = config;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandList = [help, notion, ping];

for (const command of commandList) {
  console.log(command.data.name);
  client.commands.set(command.data.name, command);
}

client.on('ready', () => {
  client.channels.fetch(channelID).then(channel => {
    channel.guild.commands.set(commandList.map(obj => obj.data))
  })
  console.log('ready')
});
//textChannel.id = 959611383786393680


client.on('interactionCreate', async interaction => {
	console.log('interaction')
	const cachedChannel = client.channels.cache.get(channelID);
	//console.log(cachedChannel)
	//console.log(channelID)

	if (cachedChannel.id !== interaction.channelId) return;
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	await command.execute(interaction).catch((error) => {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	});

});
client.login(token);

