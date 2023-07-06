import React, { useState, useEffect } from 'react';
import './Footer.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ReplayIcon from '@mui/icons-material/Replay';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

function Footer({ currentSong, handlePlayPause, onSkipNext, onSkipPrevious }) {
  const [volume, setVolume] = useState(0.7); // Initial volume level
  const audioRef = React.useRef(null);

  const [songTime, setSongTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setSongTime(audioRef.current.currentTime);
    }
  };

  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setSongDuration(audioRef.current.duration);
    }
  };


  const handleSongSeek = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
    }
    setSongTime(newValue);
  };
  const handleSkipNext = () => {
    if (onSkipNext) {
      onSkipNext();
    }
  };
  const handleSkipPrevious = () => {
    if (onSkipPrevious) {
      onSkipPrevious();
    }
  };


  const isPlaying = !!currentSong;

  return (
    <div className='footer'>
      <div className="footer_left">
        <img src={(currentSong?.album?.images[0]) ? (currentSong?.album?.images[0]).url : ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY5_ukxzBXGexonaUIOvZFP8FHYQ8lkkgwvQ&usqp=CAU')} className='footer_albumlogo' alt="" />
        <div className="footer_songinfo">
          <h4>{currentSong?.name}</h4>
          <p>{currentSong?.artists?.map((artist) => artist.name).join(', ')}</p>
        </div>
      </div>

      <div className="footer_center">
        <SkipPreviousIcon className='footer_icon' onClick={handleSkipPrevious} />
        {isPlaying ? (
          <PauseCircleOutlineIcon fontSize='large' onClick={handlePlayPause} className='footer_icon' />
        ) : (
          <PlayCircleOutlineIcon fontSize='large' onClick={handlePlayPause} className='footer_icon' />
        )}
        <SkipNextIcon className='footer_icon' onClick={handleSkipNext} />
      </div>

      <div className="footer_right">
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <input
            type="range"
            min={0}
            max={songDuration}
            value={songTime}
            onChange={handleSongSeek}
            className='slider'
            aria-label="Seek"
          />
        </Stack>
      </div>
      <audio ref={audioRef} src={currentSong?.audioUrl} />
    </div>
  );
}

export default Footer;
