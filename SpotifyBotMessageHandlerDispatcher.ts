import {TopSongResultDiscordMessageHandler} from "./discordMessageHandlers/TopSongResultDiscordMessageHandler";
import {TopArtistResultDiscordMessageHandler} from "./discordMessageHandlers/TopArtistResultDiscordMessageHandler";
import {SearchResultsSpotifyDataSource} from "./data/SearchResultsSpotifyDataSource";
import {Message} from "discord.js";

export class SpotifyBotMessageHandlerDispatcher {
    private message: Message;

    constructor(message) {
        this.message = message;
    }

    async dispatch() {
        const {message} = this;
        const {content} = message;
        const spotifyToken = await SearchResultsSpotifyDataSource.requestBearerTokenFromSpotify();

        if (content.startsWith('!song-search')) {
            new TopSongResultDiscordMessageHandler(message, spotifyToken).handle();
        } else if (content.startsWith('!artist-search')) {
            new TopArtistResultDiscordMessageHandler(message, spotifyToken).handle();
        }
    }
}