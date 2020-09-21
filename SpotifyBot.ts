import {auth} from "./auth";
import {ErrorLogger} from "./utils/ErrorLogger";
import Discord from 'discord.js';
import {TopSongResultDiscordMessageHandler} from "./discordMessageHandlers/TopSongResultDiscordMessageHandler";
import {TopArtistResultDiscordMessageHandler} from "./discordMessageHandlers/TopArtistResultDiscordMessageHandler";
import {SearchResultsSpotifyDataSource} from "./data/SearchResultsSpotifyDataSource";

const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', async message => {
    const spotifyToken = await SearchResultsSpotifyDataSource.requestBearerTokenFromSpotify();
    try {
        if (message.content.startsWith('!song-search')) {
            new TopSongResultDiscordMessageHandler(message, spotifyToken).handle();
        } else if (message.content.startsWith('!artist-search')) {
            new TopArtistResultDiscordMessageHandler(message, spotifyToken).handle();
        }
    } catch (error) {
        ErrorLogger.log(error);
    }
});

client.login(auth.discordToken).then(r => {
    console.log("Logged in");
});