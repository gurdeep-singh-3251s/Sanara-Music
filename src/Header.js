import React from 'react'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { useDatalayerValue } from './Datalayer';
import SpotifyWebApi from 'spotify-web-api-js';
import Link  from 'react-router-dom';
const spotify = SpotifyWebApi();

function Header() {
  const [{ user }, dispatch] = useDatalayerValue();
  return (
    <div className='header'>
      <a target='_blank' className='header_right' href='https://www.spotify.com/in-en/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account'>
        <Avatar src={user?.images[0]?.url} alt='GS' />
        <h2>{user?.display_name}</h2>
      </a>
    </div>
  )
}

export default Header