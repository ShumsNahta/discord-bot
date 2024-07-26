const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })  
const { token } = process.env
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require("fs");

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates]});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection()
client.modals = new Collection()
client.commandArray = []

const functionFolders = fs.readdirSync("./functions")

for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./functions/${folder}`).filter(file => file.endsWith('.js'))
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}
client.handleCommands()
client.handleEvents()
client.handleComponents()
client.login(token)