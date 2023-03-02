import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { register_commands } from "./register-slash-commands.js";

dotenv.config();
const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.BOT_CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

register_commands(TOKEN, CLIENT_ID);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('Observing', { type: 'WATCHING' });
});

client.on('interactionCreate', async interaction => {

	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login(TOKEN);