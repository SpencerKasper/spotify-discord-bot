import {auth} from "./auth";
import {ErrorLogger} from "./utils/ErrorLogger";
import Discord from 'discord.js';
import {TopSongResultDiscordMessageHandler} from "./discordMessageHandlers/TopSongResultDiscordMessageHandler";
import {TopArtistResultDiscordMessageHandler} from "./discordMessageHandlers/TopArtistResultDiscordMessageHandler";

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    try {
        if (message.content.startsWith('!song-search')) {
            new TopSongResultDiscordMessageHandler(message).handle();
        } else if(message.content.startsWith('!artist-search')) {
            new TopArtistResultDiscordMessageHandler(message).handle();
        }
    } catch (error) {
        ErrorLogger.log(error);
    }
});

client.login(auth.discordToken).then(r => {
    console.log("Logged in");
});