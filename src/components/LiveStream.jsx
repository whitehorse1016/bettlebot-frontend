import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import styled from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";
import LiveStreamImg from "../assets/images/cockevent1.png";

const LiveStream = ({ streamUrl, betRefresh }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [volumeIcon, setVolumeIcon] = useState(1);

  useEffect(() => {
    if (Hls.isSupported() && streamUrl) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
        setIsPlaying(true);
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = streamUrl;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
        setIsPlaying(true);
      });
    }
  }, [streamUrl, betRefresh]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    // Set volume icon based on volume level
    if (newVolume === 0) setVolumeIcon(3);
    else if (newVolume < 0.3) setVolumeIcon(0);
    else if (newVolume < 0.7) setVolumeIcon(1);
    else setVolumeIcon(2);
  };

  const toggleFullScreen = () => {
    if (videoRef.current.requestFullscreen)
      videoRef.current.requestFullscreen();
    else if (videoRef.current.webkitRequestFullscreen)
      videoRef.current.webkitRequestFullscreen();
    else if (videoRef.current.mozRequestFullScreen)
      videoRef.current.mozRequestFullScreen();
    else if (videoRef.current.msRequestFullscreen)
      videoRef.current.msRequestFullscreen();
  };

  const handleVolumeButtonClick = () => {
    let newVolume = 0;
    if (volume === 0) {
      newVolume = 0.3;  // Low volume
    } else if (volume < 0.3) {
      newVolume = 0.7;  // Medium volume
    } else if (volume < 0.7) {
      newVolume = 1;    // High volume
    } else {
      newVolume = 0;    // Mute
    }

    setVolume(newVolume);
    videoRef.current.volume = newVolume;

    // Update the volume icon based on the new volume level
    updateVolumeIcon(newVolume);
  };

  const updateVolumeIcon = (newVolume) => {
    if (newVolume === 0) {
      setVolumeIcon(3);  // Mute icon
    } else if (newVolume < 0.3) {
      setVolumeIcon(0);  // Low volume icon
    } else if (newVolume < 0.7) {
      setVolumeIcon(1);  // Medium volume icon
    } else {
      setVolumeIcon(2);  // High volume icon
    }
  };


  useEffect(() => {
    videoRef.current.volume = volume;
  }, [volume]);

  return (
    <VideoContainer>
      <LiveStreamVideo
        ref={videoRef}
        autoPlay={!!streamUrl}
        muted={!isPlaying}
        poster={LiveStreamImg}
        loop
        onError={() => console.error("Failed to load video")}
      />
      <LiveLabel>LIVE</LiveLabel>
      <ControlOverlay>
        <LeftControl>
          <ControlButton onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </ControlButton>
          <ControlButton2 onClick={handleVolumeButtonClick}>
            {volumeIcon === 0 && <IoVolumeLow />}
            {volumeIcon === 1 && <IoVolumeMedium />}
            {volumeIcon === 2 && <IoVolumeHigh />}
            {volumeIcon === 3 && <IoVolumeMute />}
          </ControlButton2>
          <ProgressBar
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
          />
        </LeftControl>
        <ControlButton2 onClick={toggleFullScreen}>
          <MdFullscreen />
        </ControlButton2>
      </ControlOverlay>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 430px;
  overflow: hidden;
  border-radius: 8px;
  user-select: none;
`;
const LiveStreamVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
`;

const LiveLabel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #980312;
  color: white;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
`;

const ControlOverlay = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 16px;
  padding: 16px 16px 0px 16px;
  color: white;
  width: 100%;
  box-sizing: border-box;
`;

const LeftControl = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const ControlButton = styled.div`
  color: white;
  width: 24px;
  height: 24px;
  font-size: 18px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const ControlButton2 = styled(ControlButton)`
  font-size: 28px;
  width: 28px;
  height: 28px;
`;
const ProgressBar = styled.input`
  width: 112px;
  height: 4px;
  appearance: none;
  background: #ccc;
  outline: none;
  border-radius: 7px;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    border: 2px solid #980312;
    cursor: pointer;
  }
`;

export default LiveStream;
