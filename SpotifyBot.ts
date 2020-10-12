import {auth} from "./auth";
import {ErrorLogger} from "./utils/ErrorLogger";
import Discord from 'discord.js';
import {TopSongResultDiscordMessageHandler} from "./discordMessageHandlers/TopSongResultDiscordMessageHandler";
import {TopArtistResultDiscordMessageHandler} from "./discordMessageHandlers/TopArtistResultDiscordMessageHandler";
import {SearchResultsSpotifyDataSource} from "./data/SearchResultsSpotifyDataSource";
import {SpotifyBotMessageHandlerDispatcher} from "./SpotifyBotMessageHandlerDispatcher";

const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

const handleMessage = async message => {
    try {
        new SpotifyBotMessageHandlerDispatcher(message).dispatch();
    } catch (error) {
        ErrorLogger.log(error);
    }
};

client.on('message', handleMessage);

client.login(auth.discordToken).then(r => {
    console.log("Logged in");
});