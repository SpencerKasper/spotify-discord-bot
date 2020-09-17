import axios, {AxiosRequestConfig} from 'axios';
import {auth} from "../auth";
import {ErrorLogger} from "../utils/ErrorLogger";


export class SearchResultsSpotifyDataSource {
    private static domain: string = 'https://api.spotify.com/v1/';
    private static config: AxiosRequestConfig = {
        headers: {
            Authorization: auth.spotifyBearerToken
        }
    };

    static getTopSongResult = async (songNameToSearchFor) => {
        try {
            const url = `${SearchResultsSpotifyDataSource.domain}search?q=${songNameToSearchFor}&type=track`;

            const response = await axios.get(
                url,
                SearchResultsSpotifyDataSource.config
            );

            const firstTrack = response.data.tracks.items[0];
            return firstTrack ? firstTrack.external_urls.spotify : '';
        } catch (error) {
            ErrorLogger.log(error);
        }
    };

    static getTopArtistResult = async (artistToSearchFor) => {
        try {
            const url = `${SearchResultsSpotifyDataSource.domain}search?q=${artistToSearchFor}&type=artist`;

            const response = await axios.get(
                url,
                SearchResultsSpotifyDataSource.config
            );

            const firstArtist = response.data.artists.items[0];
            return firstArtist ? firstArtist.external_urls.spotify : '';
        } catch (error) {
            ErrorLogger.log(error);
        }
    }
}
