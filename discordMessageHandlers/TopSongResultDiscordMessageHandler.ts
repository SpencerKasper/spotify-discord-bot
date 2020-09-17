import {Message} from "discord.js";
import {DiscordMessageHandler} from "./DiscordMessageHandler";
import {DiscordMessageParser} from "../messageParsers/DiscordMessageParser";
import {PhraseAfterIdentifierMessageParser} from "../messageParsers/PhraseAfterIdentifierMessageParser";
import {SearchResultsSpotifyDataSource} from "../data/SearchResultsSpotifyDataSource";

export class TopSongResultDiscordMessageHandler implements DiscordMessageHandler {
    message: Message;
    messageParser: DiscordMessageParser;
    private spotifyToken: string;

    constructor(message: Message, spotifyToken: string) {
        this.message = message;
        this.messageParser = new PhraseAfterIdentifierMessageParser(message);
        this.spotifyToken = spotifyToken;
    }

    handle: VoidFunction = async () => {
        const songNameToSearchFor = this.messageParser
            .parse();

        const songUrl = await new SearchResultsSpotifyDataSource(this.spotifyToken)
            .getTopSongResult(songNameToSearchFor);

        await this.message.channel
            .send(songUrl);
    };

}