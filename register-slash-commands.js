import { REST, Routes } from 'discord.js';
import * as commands from './commands.js';

export async function register_slash_commands(TOKEN, CLIENT_ID) {
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	let commandsArray = [];
	for (const command of commands.getCommands()) {
		commandsArray.push(command.data.toJSON());
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST({ version: '10' }).setToken(TOKEN);

	// and deploy your commands!
	(async () => {
		try {
			console.log(`Started refreshing ${commandsArray.length} application (/) commands.`);

			// Remove old slash commands before setting new ones
			await rest.get(Routes.applicationCommands(CLIENT_ID))
				.then(data => {
					const promises = [];
					for (const command of data) {
						const deleteUrl = `${Routes.applicationCommands(CLIENT_ID)}/${command.id}`;
						promises.push(rest.delete(deleteUrl));
					}
					return Promise.all(promises);
				});

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
}

