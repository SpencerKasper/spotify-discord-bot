import {Message} from "discord.js";
import {SpotifyDataSource} from "../SpotifyDataSource";
import {DiscordMessageHandler} from "./DiscordMessageHandler";
import {DiscordMessageParser} from "./DiscordMessageParser";
import {TopSongResultMessageParser} from "./TopSongResultMessageParser";

export class TopSongResultDiscordMessageHandler implements DiscordMessageHandler {
    message: Message;
    messageParser: DiscordMessageParser;

    constructor(message: Message) {
        this.message = message;
        this.messageParser = new TopSongResultMessageParser(message);
    }

    handle: VoidFunction = async () => {
        const songNameToSearchFor = new TopSongResultMessageParser(this.message).parse();
        const songUrl = await SpotifyDataSource.getFirstSearchResultSongUrl(songNameToSearchFor);
        await this.message.channel.send(songUrl);
    };

}