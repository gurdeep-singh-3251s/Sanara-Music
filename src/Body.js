import React, { useState, useRef } from 'react'
import "./Body.css";
import Header from './Header';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Footer from './Footer';


function Body({ PlaylistID, spotify }) {

  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  const handlePlayStart = () => {
    setCurrentSongIndex(0);
    handlePlayPause(0);
    
  }
  const handlePlayPause = (trackIndex) => {
    if (trackIndex === currentSongIndex) {
      // The clicked song is already playing, so stop it
      setCurrentSongIndex(null);
    } else {
      // Start playing the clicked song and stop other songs
      setCurrentSongIndex(trackIndex);
      stopOtherSongs(trackIndex);
    }
  };

  const stopOtherSongs = (clickedIndex) => {
    const songRows = document.getElementsByClassName('songrow');
    for (let i = 0; i < songRows.length; i++) {
      if (i !== clickedIndex) {
        const audio = songRows[i].getElementsByTagName('audio')[0];
        audio.pause();
        audio.currentTime = 0;
      }
    }
  };

  const handleSkipPrevious = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + PlaylistID.tracks.items.length) % PlaylistID.tracks.items.length);
  };

  const handleSkipNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % PlaylistID.tracks.items.length);
  };
  return (
      <div className='body'>
        <div className="header_front">
          <Header spotify={spotify} />
          <div className="body_info">
            <img src={PlaylistID?.images[0]?.url} alt="" />

            <div className="body_infotext">

              <strong>PLAYLIST</strong>
              <h3>{PlaylistID?.name}</h3>
              <p>{PlaylistID?.description}</p>
            </div>
          </div>
        </div>

        <div className="body_songs">
          <div className="body_icons">

            <PlayCircleFilledIcon onClick={handlePlayStart} className='body_shuffle' />
            <FavoriteIcon fontSize='large' />
            <MoreHorizIcon />
          </div>
          {/* List of songs */}


          <div >
            {(PlaylistID?.tracks?.items)?.map((item, index) => (
              <SongRow
                onClick={(index) => handlePlayPause(index)}
                key={item.track.id}
                track={item.track}
                index={index}
                isPlaying={index === currentSongIndex}
                stopSong={() => setCurrentSongIndex(null)} // Pass the stopSong function
              />
            ))}

          </div>

        </div>
      <Footer className='footerr' currentSong={PlaylistID?.tracks?.items[currentSongIndex]?.track}
        onSkipPrevious={handleSkipPrevious}
        onSkipNext={handleSkipNext}
        handlePlayPause={handlePlayPause} />
        
      </div>
  )
}

export default Body;