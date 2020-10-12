import {DiscordMessageHandler} from "./DiscordMessageHandler";
import {Message} from "discord.js";
import {DiscordMessageParser} from "../messageParsers/DiscordMessageParser";
import {PhraseAfterIdentifierMessageParser} from "../messageParsers/PhraseAfterIdentifierMessageParser";
import {SearchResultsSpotifyDataSource} from "../data/SearchResultsSpotifyDataSource";
import {TYPE_ARTIST} from "../static/SpotifySearchConstants";

export class TopArtistResultDiscordMessageHandler implements DiscordMessageHandler {
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
        const artistNameToSearchFor = messageParser
            .parse();

        const songUrl = await new SearchResultsSpotifyDataSource(spotifyToken)
            .getTopResult({query: artistNameToSearchFor, type: TYPE_ARTIST});

        await message.channel.send(songUrl);
    };

}