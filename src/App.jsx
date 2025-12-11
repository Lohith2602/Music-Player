import React, { useRef, useState } from "react";
import Song1 from "./rose.mp3";
import Song2 from "./tobrherox.mp3";
import img1 from "./rose.jpeg";
import img2 from "./tbhx.jpeg";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import "./Global.css";

const App = () => {
  let [isPlaying, setIsPlaying] = useState(false);
  let [currentSongIndex, setCurrentSongIndex] = useState(0);
  let [currentTime, setCurrentTime] = useState(0);
  let [duration, setDuration] = useState(0);
  let audioRef = useRef();

  let songs = [
    {
      src: Song1,
      title: "Rose",
      img: img1,
    },
    {
      src: Song2,
      title: " To Be Hero X",
      img: img2,
    },
  ];

  let currentSong = songs[currentSongIndex];

  let formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  let handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  let timeUpdateHandle = (e) => {
    setCurrentTime(e.target.currentTime);
    console.log(e.target.currentTime);
  };

  let dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
    console.log(e.target.value);
  };

  let skipTrackHandler = (direction) => {
    if (direction === "skip-forward") {
      setCurrentSongIndex((preIndex) => (preIndex + 1) % songs.length);
    } else if (direction === "skip-backward") {
      setCurrentSongIndex(
        (preIndex) => (preIndex - 1 + songs.length) % songs.length
      );
    }
  };

  let handleLoadMetadata = () => {
    setDuration(audioRef.current.duration);
    console.log(audioRef.current.duration);
  };

  return (
    <div>
      <div className="song_container">
        <img src={currentSong.img} alt="" />
        <h2 style={{ color: "white", fontSize: "30px" }}>
          Title :{currentSong.title}{" "}
        </h2>
        <audio
          src={currentSong.src}
          ref={audioRef}
          onTimeUpdate={timeUpdateHandle}
          onLoadedMetadata={handleLoadMetadata} 
          onEnded={() => skipTrackHandler("skip-forward")}
        ></audio>

        <div className="audio_container">
          <span style={{ fontSize: "30px", color: "white" }}>
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            value={currentTime}
            max={duration || 0}
            onChange={dragHandler}
          />
          <span style={{ fontSize: "30px", color: "white" }}>
            {formatTime(duration)}
          </span>
        </div>

        <div className="btn_group">
          <button onClick={() => skipTrackHandler("skip-backward")}>
            <TbPlayerTrackPrevFilled />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? <FaPause />: <FaPlay />}{" "}
          </button>
          <button onClick={() => skipTrackHandler("skip-forward")}>
            
            <TbPlayerTrackNextFilled />
            </button>
        </div>
      </div>
    </div>
  );
};

export default App;

