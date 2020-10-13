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
        if (this.messageContainsACommand()) {
            new TopSpotifySearchResultDiscordMessageHandler(
                this.message
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