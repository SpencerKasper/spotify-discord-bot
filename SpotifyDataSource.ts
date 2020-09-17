import axios, {AxiosRequestConfig} from 'axios';
import {auth} from "./auth";

export class SpotifyDataSource {
    private static domain: string = 'https://api.spotify.com/v1/';
    private static config: AxiosRequestConfig = {
        headers: {
            Authorization: auth.spotifyBearerToken
        }
    };

    static getFirstSearchResultSongUrl = async (songNameToSearchFor) => {
        const response = await axios.get(
            `${SpotifyDataSource.domain}search?q=${songNameToSearchFor}&type=track`,
            SpotifyDataSource.config
        );

        return response.data.tracks.items[0].external_urls.spotify;
    }
}
