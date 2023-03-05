import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';


export class CommandHelper {
	constructor() {

		dotenv.config()
		const OPENAI_TOKEN = process.env.OPENAI_TOKEN

		const configuration = new Configuration({
			apiKey: OPENAI_TOKEN,
		});

		this.openai = new OpenAIApi(configuration);
	}

	async getChat(message) {
		const response = await this.openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ "role": "user", "content": message }]
		});

		return response.data.choices[0].message.content
	}

	async getImage(message) {
		const response = await this.openai.createImage({
			prompt: message,
			n: 1,
			size: "1024x1024",
		});

		return response.data.data[0].url;
	}

	async isModerationViolation(message) {
		const response = await this.openai.createModeration({
			"input": message
		})

		console.log(response.data.results[0])
		console.log(response.data.results[0].categories)

		return response.data.results[0].flagged
	}

}
