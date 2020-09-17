import {FileReaderAndWriter} from "./FileSaveRequest";
import {auth} from "./auth";
import {DiscordUser} from "./DiscordUser";

const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    try {
        const username = DiscordUser.getUsername(msg, client);
        console.log(username);
    } catch (err) {
        const date = new Date();
        const timestamp = date.getTime().toString();
        const formattedDateTime = date.toISOString();
        FileReaderAndWriter.writeFile({ message: err.message, time: formattedDateTime }, `/../logs/error-${timestamp}`)
    }
});

client.login(auth.token).then(r => {
    console.log("Logged in");
});