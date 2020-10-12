import {Message} from "discord.js";
import {DiscordMessageHandler} from "./DiscordMessageHandler";
import {DiscordMessageParser} from "../messageParsers/DiscordMessageParser";
import {PhraseAfterIdentifierMessageParser} from "../messageParsers/PhraseAfterIdentifierMessageParser";
import {SearchResultsSpotifyDataSource} from "../data/SearchResultsSpotifyDataSource";
import {TYPE_TRACK} from "../static/SpotifySearchConstants";

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
        const {messageParser, message, spotifyToken} = this;
        const songNameToSearchFor = messageParser
            .parse();

        const songUrl = await new SearchResultsSpotifyDataSource(spotifyToken)
            .getTopResult({query: songNameToSearchFor, type: TYPE_TRACK});

        await message.channel
            .send(songUrl);
    };

}