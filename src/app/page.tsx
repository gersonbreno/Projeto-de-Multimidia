'use client'

import { useContext, useState } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPause, FaPlay,} from "react-icons/fa";
import videos, { Video } from './data/video';
import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";7
import { FaVolumeUp } from 'react-icons/fa';



export default function Home() {
  const {
    videoURL,
    playing,
    totalTime,
    currentTime,
    videoRef,
    playPause,
    configCurrentTime,
    configVideo,
    volume,
    changeVolume ,
    muted, // Adicione o estado de mudo do contexto
    toggleMute, // Adicione a função de mudo do contexto
    unMute,
  } = useContext(HomeContext);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleVideoSelection = (index: number) => {
    setSelectedVideo(videos[index]);
    configVideo(index);
  };
  
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  

  return (
    <main className="mx-auto w-[80%] mt-2 flex">
      
      <div className="w-[65%] mr-1">
      {selectedVideo && (
          <h1 style={{ color: 'black', fontSize: '24px' }}>{selectedVideo.title}</h1>
        )}
        <video className="w-full" ref={videoRef} src={videoURL}></video>
       

        <div className="bg-black">
        <input
  type="range"
  min={0}
  max={totalTime}
  value={currentTime}
  onChange={(e) => configCurrentTime(Number(e.target.value))}
  style={{
    width: "100%",
    backgroundColor: "red", // Altere a cor de fundo da barra de rolagem aqui
    outline: "none",
  }}
/>
  <span className="text-white mx-2">{formatTime(currentTime)}</span>
  <button className="text-white" onClick={playPause}>
    {playing ? <FaPause /> : <FaPlay />}
  </button>
</div>

        <div>
        <button onClick={toggleMute}>
  {muted ? <CiVolumeMute /> : <CiVolumeHigh />}
</button>
<input
  type="range"
  min={0}
  max={1}
  step={0.01}
  value={volume}
  onChange={(e) => {
    const newVolume = Number(e.target.value);
    changeVolume(newVolume);
    if (newVolume === 0) {
      toggleMute();
    }
    else{
      unMute();
    }

  }}
/>
</div>

<div className="">
{selectedVideo && (
  <h1   style={{ color: 'black', fontSize: '18px' }}>Discrição: <br />
  {selectedVideo.description}</h1>

)}
</div>
      </div>
      <div className="w-[35%] h-[100vh]">
  {videos.map((video: Video, index) => {
    return (
      <button className="w-full" onClick={(e) => handleVideoSelection(index)} key={index}>
        <img className="w-full h-[200px] mb-1" src={video.imageURL} alt={video.title} />
        
      </button>
    );
  })}
</div>

    </main>
  );
}
