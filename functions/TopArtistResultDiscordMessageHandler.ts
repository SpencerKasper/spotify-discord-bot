import {DiscordMessageHandler} from "./DiscordMessageHandler";
import {Message} from "discord.js";
import {DiscordMessageParser} from "./DiscordMessageParser";
import {PhraseAfterIdentifierMessageParser} from "./PhraseAfterIdentifierMessageParser";
import {SearchResultsSpotifyDataSource} from "../SearchResultsSpotifyDataSource";

export class TopArtistResultDiscordMessageHandler implements DiscordMessageHandler {
    message: Message;
    messageParser: DiscordMessageParser;

    constructor(message: Message) {
        this.message = message;
        this.messageParser = new PhraseAfterIdentifierMessageParser(message);
    }

    handle: VoidFunction = async () => {
        const artistNameToSearchFor = new PhraseAfterIdentifierMessageParser(this.message).parse();
        const songUrl = await SearchResultsSpotifyDataSource.getTopArtistResult(artistNameToSearchFor);
        await this.message.channel.send(songUrl);
    };

}