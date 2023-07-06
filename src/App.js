import React, { useEffect,useState } from 'react';
import { getTokenFromUrl } from './Spotify';
import { useDatalayerValue } from './Datalayer';
import SpotifyWebApi from "spotify-web-api-js";
import Login from './Login';
import Player from './Player'
import './App.css';


const spotify= new SpotifyWebApi();

function App() {

  const [token,setToken] = useState(null);
  const [{ user }, dispatch] = useDatalayerValue();


  const playlist = [
    '7i9dQZF1DWXVJK4aT7pmk','37i9dQZF1E3a5KhBSufVbw',
    '37i9dQZF1DWYztMONFqfvX','37i9dQZF1DX5cZuAHLNjGz',
    '37i9dQZF1DX0XUfTFmNBRM',
  ];

  const artist = [
    '37i9dQZF1DX0GO2iStOATx','37i9dQZF1DX6cg4h2PoN9y',
    '5xqIpDdtK4kkmPKWpZ0Bv5','37i9dQZF1DZ06evO3Vbkk0',
    '37i9dQZF1DXcISkz62UgzG','37i9dQZF1DZ06evO0KEAbC',
    '2E2I2tAtsfs1MZ2Qez6eU0','56oLtcCrLpN7UFTt9JfvLC',
    '37i9dQZF1DZ06evO2YsPPW','7i9dQZF1DZ06evO4rvWRa'
  ];

  useEffect(()=>{
      const hash = getTokenFromUrl();
      const _token = hash.access_token;
      window.location.hash = "";

      if(_token){
        setToken(_token);
        spotify.setAccessToken(_token);
        spotify.getMe().then((user)=>{
          dispatch({
            type : 'SET_USER',
            user : user,
          });
        });
        artist.forEach((item, index) => {
          spotify.getPlaylist(item)
            .then(response => {
              const playlistWithIndex = {
                ...response,
                index: index
              };
              dispatch({
                type:"SET_ARTISTS",
                artists: playlistWithIndex,
              });
            })
            .catch(error => {
              console.log("Error fetching playlist:", error);
            });
        });
        playlist.forEach((item, index) => {
          spotify.getPlaylist(item)
            .then(response => {
              const playlistWithIndex = {
                ...response,
                index: index
              };
              dispatch({
                type:"SET_PLAYLISTS",
                playlists: playlistWithIndex,
              });
            })
            .catch(error => {
              console.log("Error fetching playlist:", error);
            });
        });
        // const currentURL = window.location.href;
        // const playlistId = currentURL.match(/playlist\/(\w+)/)[1];

        spotify.getPlaylist('37i9dQZF1DWXVJK4aT7pmk').then(response =>{
          dispatch({
            type: "SET_DISCOVER_WEEKLY",
            discover_weekly: response,
          })
        })
        spotify.getPlaylist('37i9dQZF1E368p9FVgrdX6').then(response =>{
          dispatch({
            type: "SET_LIBRARY",
            library: response,
          })
        })

        
        
      }
    },[]);
    console.log('I have a token',token)
    console.log(user)
    
  

  return (
    <div className="app">
      {token ? (<Player spotify={spotify}/>) :( <Login/>)}
    </div>
  )
}

export default App;
