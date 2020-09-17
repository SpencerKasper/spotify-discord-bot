import {DiscordMessageParser} from "./DiscordMessageParser";
import {Message} from "discord.js";

export class TopSongResultMessageParser implements DiscordMessageParser {
    message: Message;

    constructor(message: Message) {
        this.message = message;
    }

    parse = (): string => {
        const allOfTheArgsSeparatedBySpace: string[] = this.message.content.split(' ');
        allOfTheArgsSeparatedBySpace.shift();
        return allOfTheArgsSeparatedBySpace.join(' ');
    }
}