import axios, {AxiosRequestConfig} from 'axios';
import {ErrorLogger} from "../utils/ErrorLogger";
import {auth} from "../auth";

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
    };

    static requestBearerTokenFromSpotify = async () => {
        const {spotifyClientId, spotifyClientSecret} = auth;
        const base64EncodedIdAndSecret = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`)
            .toString('base64');
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
    };
}
