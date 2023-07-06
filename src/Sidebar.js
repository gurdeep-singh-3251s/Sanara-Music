import React, { useEffect } from 'react'
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search"
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SidebarOption from './SidebarOption';
import { useDatalayerValue } from './Datalayer';
import SpotifyWebApi from 'spotify-web-api-js';
import Body from './Body';
import { Outlet, Link } from "react-router-dom";
import  logo from './sanora.png'


const spotify = SpotifyWebApi();

function Sidebar() {


  const [{ playlists, artists }, dispatch] = useDatalayerValue();
  return (
    <div className='sidebar'>
      <img src={logo}
        className='sidebar_logo' alt="sanora_logo" />
      <Link to="/" className='link'>
        <SidebarOption Icon={HomeIcon} title="Home" />
      </Link>
      <Link to="/search" className='link'>
        <SidebarOption Icon={SearchIcon} title="Search" spotify={spotify} />
      </Link>
      <Link to="/library" className='link'>
        <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
      </Link>
      <br />
      <strong className='sidebar_title'>PLAYLISTS</strong>
      <hr />
      {playlists?.map(item => (
        <Link className='link' to={`/myplaylist/${item.id}`} key={item.id} >
            <SidebarOption title={item.name} />
        </Link>
      ))}
      <br />
      <strong className='sidebar_title'>Top Artists</strong>
      <hr />
      {artists?.map(item => (
        <Link className='link' to={`/myartist/${item.id}`} key={item.id} >
            <SidebarOption title={(item.name.replace(/this is/i,''))} />
        </Link>
      ))}

    </div>
  );
}

const playlistname = ['This is Gurdeep', 'this is ansh' , 'gurdeep all playlist', 'ansh all playlist']

export default Sidebar
