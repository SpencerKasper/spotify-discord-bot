import axios, {AxiosRequestConfig} from 'axios';
import {ErrorLogger} from "../utils/ErrorLogger";


export class SearchResultsSpotifyDataSource {
    private spotifyToken: string;
    private config: AxiosRequestConfig;
    private static domain: string = 'https://api.spotify.com/v1/';

    constructor(spotifyToken: string) {
        this.spotifyToken = spotifyToken;
        this.config = {
            headers: {
                Authorization: this.spotifyToken
            }
        };
    }

    getTopSongResult = async (songNameToSearchFor) => {
        try {
            const url = `${SearchResultsSpotifyDataSource.domain}search?q=${songNameToSearchFor}&type=track`;

            const response = await axios.get(
                url,
                this.config
            );

            const firstTrack = response.data.tracks.items[0];
            return firstTrack ? firstTrack.external_urls.spotify : '';
        } catch (error) {
            ErrorLogger.log(error);
        }
    };

    getTopArtistResult = async (artistToSearchFor,) => {
        try {
            const url = `${SearchResultsSpotifyDataSource.domain}search?q=${artistToSearchFor}&type=artist`;

            const response = await axios.get(
                url,
                this.config
            );

            const firstArtist = response.data.artists.items[0];
            return firstArtist ? firstArtist.external_urls.spotify : '';
        } catch (error) {
            ErrorLogger.log(error);
        }
    }
}
