import {Message} from "discord.js";
import {DiscordMessageHandler} from "./DiscordMessageHandler";
import {DiscordMessageParser} from "../messageParsers/DiscordMessageParser";
import {PhraseAfterIdentifierMessageParser} from "../messageParsers/PhraseAfterIdentifierMessageParser";
import {SearchResultsSpotifyDataSource} from "../data/SearchResultsSpotifyDataSource";

export class TopSongResultDiscordMessageHandler implements DiscordMessageHandler {
    message: Message;
    messageParser: DiscordMessageParser;

    constructor(message: Message) {
        this.message = message;
        this.messageParser = new PhraseAfterIdentifierMessageParser(message);
    }

    handle: VoidFunction = async () => {
        const songNameToSearchFor = new PhraseAfterIdentifierMessageParser(this.message).parse();
        const songUrl = await SearchResultsSpotifyDataSource.getTopSongResult(songNameToSearchFor);
        await this.message.channel.send(songUrl);
    };

}