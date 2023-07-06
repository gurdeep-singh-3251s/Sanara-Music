import React, { useEffect } from 'react'
import "./Search.css"
import { useDatalayerValue } from './Datalayer';
import { Link } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-js";


const spotify = new SpotifyWebApi();
function Search() {
  const [{ search_playlist }, dispatch] = useDatalayerValue();

  const PlaylistIds = ['37i9dQZF1DWUzG8YciRYE0', '37i9dQZF1DX9L0PulSSl2E', '37i9dQZF1DX5cZuAHLNjGz', '37i9dQZF1DWWwF1YkSKLlU', '37i9dQZF1DWZEYG45EmWYV', '37i9dQZF1DX0XUfTFmNBRM', '37i9dQZF1DXd8cOUiye1o2', '37i9dQZF1DXdpQPPZq3F7n', '37i9dQZF1DX14CbVHtvHRB', '37i9dQZF1DXa6iPZDThhLh', '37i9dQZF1DXbVhgADFy3im', '37i9dQZF1DX5Vy6DFOcx00', '37i9dQZF1DWYZMqvHuSJYT', '37i9dQZF1DXcmMuW52BXP0', '37i9dQZF1DX7MebWJqMVqO', '37i9dQZF1DX3txqabhtJQF', '37i9dQZF1DX8xfQRRX1PDm',
    '37i9dQZF1DX0BcQWzuB7ZO', '37i9dQZF1DX2HoNPxDKe6s', '37i9dQZF1DWY7IeIP1cdjF',
    '37i9dQZF1DXcQNdt1GHNdg', '37i9dQZF1DX76Wlfdnj7AP', ' 37i9dQZF1DXadOVCgGhS7j', '37i9dQZF1DXdURFimg6Blm', '37i9dQZF1DX9oh43oAzkyx', '37i9dQZF1DX76t638V6CA8'];

  useEffect(() => {
    PlaylistIds.forEach((item, index) => {
      spotify.getPlaylist(item)
        .then(response => {
          const playlistWithIndex = {
            ...response,
            index: index
          };
          dispatch({
            type: "SET_SEARCH_PLAYLISTS",
            search_playlist: playlistWithIndex,
          });
        })
        .catch(error => {
          console.log("Error fetching playlist:", error);
        });
    });
  }, []);



  return (
    <>
      <div className='Search'>
        <strong>PLAYLIST</strong>
        <div className="items" >

          {search_playlist?.map(item => (

            <Link to={`/playlist/${item.id}`} key={item.id} >
              <div className="playlist_info">
                <img src={item?.images[0].url} alt="" />
                <div className="playlist_infotext">
                  <h3>{item?.name}</h3>
                  <p>{item?.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search