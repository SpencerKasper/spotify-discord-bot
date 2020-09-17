import axios, {AxiosRequestConfig} from 'axios';
import {auth} from "./auth";
import {ErrorLogger} from "./ErrorLogger";


export class SpotifyDataSource {
    private static domain: string = 'https://api.spotify.com/v1/';
    private static config: AxiosRequestConfig = {
        headers: {
            Authorization: auth.spotifyBearerToken
        }
    };

    static getFirstSearchResultSongUrl = async (songNameToSearchFor) => {
        try {
            const url = `${SpotifyDataSource.domain}search?q=${songNameToSearchFor}&type=track`;

            const response = await axios.get(
                url,
                SpotifyDataSource.config
            );

            const firstTrack = response.data.tracks.items[0];
            return firstTrack ? firstTrack.external_urls.spotify : '';
        } catch (error) {
            ErrorLogger.log(error);
        }
    }
}
