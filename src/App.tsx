import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import { Credentials } from './Credentials';
import axios from 'axios';
import GetPlaylistsButton from './GetPlaylistsButton';

const App = () => {

    const spotify = Credentials();

    console.log('RENDERING APP.JS');

    const [token, setToken] = useState('');
    const [playlists, setPlaylists] = useState({ selectedPlaylist: '', listOfPlaylistsFromAPI: [] });

    /* https://accounts.spotify.com/authorize?response_type=code&client_id=f075bf24332845daa1836ba0abc9ae06&redirect_uri=http%3A%2F%2Flocalhost&scope=user-follow-modify&state=e21392da45dbf4&code_challenge=KADwyz1X~HIdcAG20lnXitK6k51xBP4pEMEZHmCneHD1JhrcHjE1P3yU_NjhBz4TdhV6acGo16PCd10xLwMJJ4uCutQZHw&code_challenge_method=S256 */

    const CLIENT_ID = spotify.ClientId;
    const SPOTIFY_AUTHORIZE_ENDPOINT = spotify.SpotifyAuthorizeEndpoint;
    const REDIRECT_URL_AFTER_LOGIN = spotify.RedirectUrlAfterLogin;
    const SPACE_DELIMITER = "%20";
    const SCOPES = ["user-read-currently-playing", "user-read-playback-state", "playlist-read-private"];
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
            console.log(currentValue);
            const [key, value] = currentValue.split('=');
            accumulater[key] = value;
            return accumulater;
        }, {});

        return paramsSplitUp;
    };

    useEffect(() => {

        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);
            
            localStorage.clear();

            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }
        // axios('https://accounts.spotify.com/api/token', {
        //     headers: {
        //         'Content-Type' : 'application/x-www-form-urlencoded',
        //         'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
        //     },
        //     data: 'grant_type=client_credentials',
        //     method: 'POST'
        //     })
        //     .then(tokenResponse => {
        //         console.log(tokenResponse.data.access_token);
        //         setToken(tokenResponse.data.access_token);

        //         // axios('https://api.spotify.com/v1/me/playlists', {
        //         //     method: 'GET',
        //         //     headers: {'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        //         // })
        //         // .then (playlistResponse => {
        //         //     setPlaylists({
        //         //         selectedPlaylist: playlists.selectedPlaylist,
        //         //         listOfPlaylistsFromAPI: playlistResponse.data.playlists.items
        //         //     });
        //         // });

        // });

    });

    const handleLogin = () => {
        window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
    };

    return (
        <div>
            <button onClick={handleLogin}>
                login to spotify
            </button>

            {/* <div>
            <Dropdown options={playlists.listOfPlaylistsFromAPI}/>
        </div> */}
            <GetPlaylistsButton />
        </div>
    );
}

export default App;