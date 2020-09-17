import {auth} from "./auth";
import {ErrorLogger} from "./utils/ErrorLogger";
import Discord from 'discord.js';
import {TopSongResultDiscordMessageHandler} from "./discordMessageHandlers/TopSongResultDiscordMessageHandler";
import {TopArtistResultDiscordMessageHandler} from "./discordMessageHandlers/TopArtistResultDiscordMessageHandler";
import axios, {AxiosRequestConfig} from 'axios';

const client = new Discord.Client();
let spotifyToken;

async function requestBearerTokenFromSpotify() {
    const {spotifyClientId, spotifyClientSecret} = auth;
    const base64EncodedIdAndSecret = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64');
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Basic ${base64EncodedIdAndSecret}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            'grant_type=client_credentials',
            config
        );

        const {access_token, token_type} = response.data;

        return `${token_type} ${access_token}`;
    } catch (err) {
        console.log(err);
    }
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    spotifyToken = await requestBearerTokenFromSpotify();
});

client.on('message', async message => {
    if(!spotifyToken){
        spotifyToken = await requestBearerTokenFromSpotify();
    }

    try {
        if (message.content.startsWith('!song-search')) {
            new TopSongResultDiscordMessageHandler(message, spotifyToken).handle();
        } else if (message.content.startsWith('!artist-search')) {
            new TopArtistResultDiscordMessageHandler(message, spotifyToken).handle();
        }
    } catch (error) {
        spotifyToken = undefined;
        ErrorLogger.log(error);
    }
});

client.login(auth.discordToken).then(r => {
    console.log("Logged in");
});