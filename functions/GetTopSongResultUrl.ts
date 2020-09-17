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

        const allOfTheArgsSeparatedBySpace: string[] = content.split(' ');
        allOfTheArgsSeparatedBySpace.shift();
        const songNameToSearchFor = allOfTheArgsSeparatedBySpace.join(' ');
        const songUrl = await SpotifyDataSource.getFirstSearchResultSongUrl(songNameToSearchFor);
        await channel.send(songUrl);
    };

}