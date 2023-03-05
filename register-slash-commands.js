import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import * as commands from './commands.js';

dotenv.config();
const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.BOT_CLIENT_ID;

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
let commandsArray = [];
for (const command of commands.getCommandsArray()) {
	commandsArray.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commandsArray.length} application (/) commands.`);

		// Remove old slash commands before setting new ones
		// rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
		// 	.then(() => console.log('Successfully deleted all application commands.'))
		// 	.catch(console.error);

		// The put method is used to fully refresh all commands globally with the current set
		const data = await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{ body: commandsArray },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();