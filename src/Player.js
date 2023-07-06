import React, {useEffect} from 'react'
import "./Player.css"
import Sidebar from './Sidebar'
import Body from './Body'
import Footer from './Footer'
import { useDatalayerValue } from './Datalayer'
import Search from './Search'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";


export default function Player({ spotify }) {

  const [{ discover_weekly, library }, dispatch] = useDatalayerValue();
  return (
    <BrowserRouter className="player_body">
      <Sidebar spotify={spotify} />
      <Routes>
        <Route path="/" element={<Body PlaylistID={discover_weekly} />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/library" element={<Body PlaylistID={library} />} />
        <Route path={`/Playlist/:key`} element={<BodyWrapper />} />
        <Route path={`/myPlaylist/:key`} element={<MyBodyWrapper />} />
        <Route path={`/myArtist/:key`} element={<MyBodyWrapper2 />} />

      </Routes>
    </BrowserRouter>

  )
}
function BodyWrapper() {
  const { key } = useParams();
  const [{ search_playlist }] = useDatalayerValue();

  // Find the playlist with the matching key in the search_playlist array
  const playlist = search_playlist.find(item => item.id === key);

  return (
    <Body PlaylistID={playlist} />
    
  );
}
function MyBodyWrapper() {
  const { key } = useParams();
  const [{ playlists }] = useDatalayerValue();
  const playlist = playlists.find(item => item.id === key);
  console.log(playlist)
  return (
    <Body PlaylistID={playlist} />
  );
}
function MyBodyWrapper2() {
  const { key } = useParams();
  const [{ artists }] = useDatalayerValue();
  const artist = artists.find(item => item.id === key);
  console.log(artist)
  return (
    <Body PlaylistID={artist} />
  );
}

