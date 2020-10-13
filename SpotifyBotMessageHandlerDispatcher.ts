import {TopSpotifySearchResultDiscordMessageHandler} from "./discordMessageHandlers/TopSpotifySearchResultDiscordMessageHandler";
import {Message} from "discord.js";
import {SPOTIFY_SEARCH_TYPE_ARTIST, SPOTIFY_SEARCH_TYPE_TYPE_TRACK} from "./static/SpotifySearchConstants";
import {COMMANDS} from "./static/SpotifyBotCommands";

export class SpotifyBotMessageHandlerDispatcher {
    private readonly message: Message;
    private messageContent: string;

    constructor(message) {
        this.message = message;
        this.messageContent = message.content;
    }

    async dispatch() {
        const {content} = this.message;

        if (this.messageContainsACommand()) {
            // Only since there are only two commands. Once we have more I will change the pattern.
            const searchType = content.startsWith('!song-search') ?
                SPOTIFY_SEARCH_TYPE_TYPE_TRACK :
                SPOTIFY_SEARCH_TYPE_ARTIST;
            new TopSpotifySearchResultDiscordMessageHandler(
                this.message,
                searchType
            ).handle();
        }
    }

    private messageContainsACommand() {
        return this.getMatchingSpotifyBotCommands().length === 1;
    }

    private getMatchingSpotifyBotCommands() {
        return COMMANDS.filter(command => this.messageContent.startsWith(command.command));
    }
}