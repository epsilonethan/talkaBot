import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
import axios from 'axios';

export let chat = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('executes a chatGPT query')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('The prompt to send chatGPT')
				.setRequired(true)),
	async execute(interaction) {

		await interaction.deferReply();

		const reply = await get_chat(await interaction.options.getString('query'))

		const chatGPTEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setDescription(reply)
			.setTimestamp()
			.setFooter({ text: 'TalkaBot - a ChatGPT enabled Discord Bot'});

		await interaction.editReply({ embeds: [chatGPTEmbed]});
	}
}

export function getCommands() {
	let commands = [];
	commands.push(this.chat);

	return commands;
}

async function get_chat(message) {
	dotenv.config();
	const OPENAI_TOKEN = process.env.OPENAI_TOKEN;
	const url = 'https://api.openai.com/v1/chat/completions'
	const data = {
		"model": "gpt-3.5-turbo",
		"messages": [{ "role": "user", "content": message }]
	}

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${OPENAI_TOKEN}`
	}

	const response = await axios.post(url, data, { headers: headers })

	return response.data.choices[0].message.content

}