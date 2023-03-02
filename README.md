# talkaBot
chatGPT enabled Discord bot written in JS

# Configuration
At root of project create a `.env` file. In this file you will need to include the following variables
- `BOT_TOKEN` - This would be the token for your bot from the Discord Developer Portal
- `BOT_CLIENT_ID` - This would be the client id for your bot from the Discord Developer Portal

# Current Commands
- `/ping` - TalkaBot will return `Pong!`

# Run TalkaBot

## Run Locally
In terminal run `npm install && node index.js`

## Run in Docker
In terminal run `docker build . -t talka-bot && docker run -d talka-bot`