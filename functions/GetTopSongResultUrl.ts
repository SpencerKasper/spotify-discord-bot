import {Message} from "discord.js";
import {SpotifyDataSource} from "../SpotifyDataSource";
import {DiscordMessageHandler} from "./DiscordMessageHandler";

export class TopSongResultDiscordMessageHandler implements DiscordMessageHandler {
    message: Message;

    constructor(message: Message) {
        this.message = message;
    }

    handle: VoidFunction = async () => {
        const {content, channel} = this.message;

        const songNameToSearchFor = content.split(' ')[1];
        const songUrl = await SpotifyDataSource.getFirstSearchResultSongUrl(songNameToSearchFor);
        console.log(songUrl);
        await channel.send(songUrl);
    };

}