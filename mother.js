const { Client, Events, GatewayIntentBits, Guild, ChannelType } = require('discord.js');
const { token } = require('./auth.json');
const Voice = require('@discordjs/voice');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	]
});

console.log("Setting up Din Mamma...");
client.once(Events.ClientReady, c => {
	console.log(`Logged in as ${c.user.tag}!`);

	// Get all voice channels.
	client.guilds.fetch().then(guilds => {
		let guildEntries = guilds.entries();
		for (const g of guildEntries) {
			g.channels.fetch().then(channels => {
				let voiceChannels = [];
				let entries = channels.entries();
				for (const item of entries) {
					let channel = item[1];
					if(channel.type == ChannelType.GuildVoice) {
						// Get guild id, get current channels from "allChannels" map
						// overwrite with new channel using key guild id.
						let currentChannels = allChannels.get()
						// voiceChannels.push(channel);
						allChannels
					}
				}
				console.log(voiceChannels);
			});
		}
	});
});

let allChannels = new Map();

// Listen for messages from users.
client.on(Events.MessageCreate, msg => {
	// let currentGuild = msg.guild;
	// let userId = msg.author.id;
	// let userChannel = getUserChannel(currentGuild, userId);

	// console.log("Message read:");
	// console.log(msg);
	// console.log(msg.author);
	// let chan = await client.guilds.fetch()
});

client.login(token);

// Helper functions.
const getUserChannel = async function(guild, userId) {
	let channels = await guild.channels;
	console.log("CHANNEL");
	console.log(channels);
	let chan = await guild.members.fetch(userId);
	// console.log(chan);
};