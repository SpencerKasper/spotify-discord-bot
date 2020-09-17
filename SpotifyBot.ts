import {auth} from "./auth";
import {ErrorLogger} from "./ErrorLogger";
import Discord from 'discord.js';
import {SpotifyDataSource} from "./SpotifyDataSource";

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    try {
        if (message.content.startsWith('!song-search')) {
            const songNameToSearchFor = message.content.split(' ')[1];
            const songUrl = await SpotifyDataSource.getFirstSearchResultSongUrl(songNameToSearchFor);
            await message.channel.send(songUrl);
        }
    } catch (error) {
        ErrorLogger.log(error);
    }
});

client.login(auth.discordToken).then(r => {
    console.log("Logged in");
});