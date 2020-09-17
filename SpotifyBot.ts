import {auth} from "./auth";
import {DiscordUser} from "./DiscordUser";
import {ErrorLogger} from "./ErrorLogger";

const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    try {
        const username = DiscordUser.getUsername(msg, client);
        console.log(username);
    } catch (error) {
        ErrorLogger.log(error);
    }
});

client.login(auth.token).then(r => {
    console.log("Logged in");
});