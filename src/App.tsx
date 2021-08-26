import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import { Credentials } from './Credentials';
import axios from 'axios';

const App = () => {

    const spotify = Credentials();

    console.log('RENDERING APP.JS');

    let [token, setToken] = useState({ accessToken: '', expiresIn: '', tokenType: '' });
    let [playlists, setPlaylists] = useState({ selectedPlaylist: '', listOfPlaylistsFromAPI: [] });

    /* https://accounts.spotify.com/authorize?response_type=code&client_id=f075bf24332845daa1836ba0abc9ae06&redirect_uri=http%3A%2F%2Flocalhost&scope=user-follow-modify&state=e21392da45dbf4&code_challenge=KADwyz1X~HIdcAG20lnXitK6k51xBP4pEMEZHmCneHD1JhrcHjE1P3yU_NjhBz4TdhV6acGo16PCd10xLwMJJ4uCutQZHw&code_challenge_method=S256 */

    const CLIENT_ID = spotify.ClientId;
    const SPOTIFY_AUTHORIZE_ENDPOINT = spotify.SpotifyAuthorizeEndpoint;
    const REDIRECT_URL_AFTER_LOGIN = spotify.RedirectUrlAfterLogin;
    const SPACE_DELIMITER = "%20";
    const SCOPES = ["user-read-currently-playing", "user-read-playback-state", "playlist-read-private"];
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

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

    const handleLogin = () => {
        window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
    };

    useEffect(() => {
        console.log(token.accessToken.length);
        if (token.accessToken.length > 0) {
            axios.get(PLAYLISTS_ENDPOINT, {
                headers: {
                    'Authorization': 'Bearer ' + token.accessToken
                },
            }).then((playlistResponse) => {
                setPlaylists({
                    selectedPlaylist: playlists.selectedPlaylist,
                    listOfPlaylistsFromAPI: playlistResponse.data.items
                });
            })
                .catch((error) => {
                    console.log("Error: " + error);
                });
        };
    }, [token.accessToken]);

    useEffect(() => {


        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);

            setToken({
                accessToken: access_token,
                expiresIn: expires_in,
                tokenType: token_type
            });
        }

    }, []);


    return (
        <div>
            <button onClick={handleLogin}>
                login to spotify
            </button>

            <div>
                <Dropdown options={playlists?.listOfPlaylistsFromAPI ? playlists.listOfPlaylistsFromAPI : null} />
            </div>

            <div>
                
            </div>
        </div>
    );
}

export default App;