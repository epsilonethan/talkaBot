import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import {CommandHelper} from './command.helpers.js';

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

		const commandHelper = new CommandHelper();

		const query = await interaction.options.getString('query')

		const isViolation = await commandHelper.isModerationViolation(query)

		if (!isViolation) {
			const reply = await commandHelper.getChat(query)
			const responseEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setDescription(reply)
				.setTimestamp()
				.setFooter({ text: 'TalkaBot - powered by OpenAI' });

			await interaction.editReply({ embeds: [responseEmbed] });
		}
		else {

			const responseEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setDescription("Your query is in violation of OpenAI Moderation")
				.setTimestamp()
				.setFooter({ text: 'TalkaBot - powered by OpenAI' });

			await interaction.editReply({ embeds: [responseEmbed], ephemeral: true })
		}
	}
}

export let image = {
	data: new SlashCommandBuilder()
		.setName('image')
		.setDescription('executes a Dall-E query')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('The prompt to send Dall-E')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();

		const commandHelper = new CommandHelper();

		const query = await interaction.options.getString('query')

		const isViolation = await commandHelper.isModerationViolation(query)

		if (!isViolation) {
			const imageUrl = await commandHelper.getImage(query)
			const responseEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setImage(imageUrl)
				.setTimestamp()
				.setFooter({ text: 'TalkaBot - powered by OpenAI' });

			await interaction.editReply({ embeds: [responseEmbed] });
		}
		else {

			const responseEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setDescription("Your query is in violation of OpenAI Moderation")
				.setTimestamp()
				.setFooter({ text: 'TalkaBot - powered by OpenAI' });

			await interaction.editReply({ embeds: [responseEmbed], ephemeral: true })
		}
	}
}