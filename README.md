# talkaBot
chatGPT enabled Discord bot written in JS

# Configuration
At root of project create a `.env` file. In this file you will need to include the following variables
- `BOT_TOKEN` - The token for your bot from the Discord Developer Portal
- `BOT_CLIENT_ID` - The client id for your bot from the Discord Developer Portal
- `OPENAI_TOKEN` - The access token from OpenAI

# Current Commands
- `/chat` - TalkaBot will return chatGPT response based on the users query

# Run TalkaBot

## Run Locally
In terminal run `npm install && node index.js`

## Run in Docker
In terminal run `docker build . -t talka-bot` then `docker run -d talka-bot`