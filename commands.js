import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
import * as openaiService from './open-ai.services.js';

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

		const query = await interaction.options.getString('query')

		const isViolation = await isModerationViolation(query)

		if (!isViolation) {
			const reply = await getChat(query)
			const chatGPTEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setDescription(reply)
				.setTimestamp()
				.setFooter({ text: 'TalkaBot - powered by OpenAI' });

			await interaction.editReply({ embeds: [chatGPTEmbed] });
		}
		else {

			const chatGPTEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setDescription("Your query is in violation of OpenAI Moderation")
				.setTimestamp()
				.setFooter({ text: 'TalkaBot - powered by OpenAI' });

			await interaction.editReply({ embeds: [chatGPTEmbed], ephemeral: true })
		}



	}
}

export function getCommandsArray() {
	let commands = [];
	commands.push(this.chat);

	return commands;
}

async function getChat(message) {
	dotenv.config();
	const OPENAI_TOKEN = process.env.OPENAI_TOKEN;

	const response = await openaiService.chatService(message, OPENAI_TOKEN);

	return response.data.choices[0].message.content
}

async function isModerationViolation(message) {
	dotenv.config();
	const OPENAI_TOKEN = process.env.OPENAI_TOKEN;

	const response = await openaiService.moderationCheckService(message, OPENAI_TOKEN);

	return response.data.results[0].flagged
}