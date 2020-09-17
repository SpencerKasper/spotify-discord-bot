import {Message} from "discord.js";
import {DiscordMessageParser} from "./DiscordMessageParser";

export interface DiscordMessageHandler {
    message: Message;
    messageParser: DiscordMessageParser;
    handle: () => void;
}