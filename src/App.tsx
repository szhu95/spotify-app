import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import { Credentials } from './Credentials';
import axios from 'axios';

const App = () => {

     const spotify = Credentials();

    console.log('RENDERING APP.JS');

    const[token, setToken] = useState('');
    const [playlists, setPlaylists] = useState({selectedPlaylist: '', listOfPlaylistsFromAPI: []});

    useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
            })
            .then(tokenResponse => {
                console.log(tokenResponse.data.access_token);
                setToken(tokenResponse.data.access_token);

                axios('https://api.spotify.com/v1/me/playlists', {
                    method: 'GET',
                    headers: {'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
                })
                .then (playlistResponse => {
                    setPlaylists({
                        selectedPlaylist: playlists.selectedPlaylist,
                        listOfPlaylistsFromAPI: playlistResponse.data.playlists.items
                    });
                });

        });
    
    }, [playlists.selectedPlaylist, spotify.ClientId, spotify.ClientSecret]);


    return (
        <form onSubmit={() => {}}>
        <div>
            <Dropdown options={playlists.listOfPlaylistsFromAPI}/>
        </div>
        <button type='submit'>
            Search
        </button>
        </form>
    );
}

export default App;