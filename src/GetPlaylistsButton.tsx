import React, { useEffect, useState } from "react";
import axios from "axios";

const GetPlaylistsButton = () => {
    const [token, setToken] = useState('');
    const [data, setData] = useState({});

    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const handleGetPlaylists = () => {
        axios.get(PLAYLISTS_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
    <>
    <button onClick={handleGetPlaylists}> get playlists </button>
    {data?.items ? data.items.map((item : {}) => <p>{item.name}</p>) : null}
    </>
    );
};

export default GetPlaylistsButton;