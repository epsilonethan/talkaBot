import axios from 'axios';

export async function chatService(message, OPENAI_TOKEN){
	const url = 'https://api.openai.com/v1/chat/completions'
	const data = {
		"model": "gpt-3.5-turbo",
		"messages": [{ "role": "user", "content": message }]
	}

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${OPENAI_TOKEN}`
	}

	return await axios.post(url, data, { headers: headers })
	
}

export async function moderationCheckService(message, OPENAI_TOKEN){
	const url = 'https://api.openai.com/v1/moderations'
	
	const data = {
		"input": message
	}

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${OPENAI_TOKEN}`
	}

	return await axios.post(url, data, { headers: headers })

}