import React, { useRef } from 'react';
import "./SongRow.css";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

function SongRow({ track, index, onClick, isPlaying, stopSong }) {
  const AudioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      AudioRef.current.pause();
      stopSong(); // Call the stopSong prop to stop other songs in the Body component
    } else {
      AudioRef.current.play();
      onClick(index); // Call the onClick prop to update the currently playing song in the Body component
    }
  };


  return (
    <div className='songrow' onClick={handlePlayPause}>
      <div className="info">
        <h5 style={{ padding: "10px" }}>{index + 1}</h5>
        <img className='songrow_album' src={track?.album?.images[0]?.url} alt='' />
        <div className='songrow_info'>
          <h1>{track?.name}</h1>
          <p>
            {track?.artists?.map((artist) => artist?.name).join(', ')} - {track.album.name}
          </p>
        </div>
      </div>
      <div className="play">
        <div >
          {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
        </div>
        <audio ref={AudioRef} src={track.preview_url}></audio>
      </div>
    </div>
  );
}

export default SongRow;
