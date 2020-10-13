import axios, {AxiosRequestConfig} from 'axios';
import {ErrorLogger} from "../utils/ErrorLogger";
import {auth} from "../auth";
import {SPOTIFY_SEARCH_TYPE_ARTIST, SPOTIFY_SEARCH_TYPE_TYPE_TRACK} from "../static/SpotifySearchConstants";

export type SpotifySearchType = 'track' | 'artist';
type SpotifySearchParams = {
    query: string;
    type: SpotifySearchType;
}

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

    getTopResult = async (params: SpotifySearchParams) => {
        const {query, type} = params;
        try {
            const url = `${SearchResultsSpotifyDataSource.domain}search?q=${query}&type=${type}`;

            const response = await axios.get(
                url,
                this.config
            );

            const responseDataKey = type === SPOTIFY_SEARCH_TYPE_TYPE_TRACK ? 'tracks' : 'artists';

            const firstTrack = response.data[responseDataKey].items[0];
            return firstTrack ? firstTrack.external_urls.spotify : '';
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
