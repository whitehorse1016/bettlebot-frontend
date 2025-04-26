import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import LiveStreamImg from "../assets/images/cockevent1.png";

const LiveStream = ({ streamUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [volumeIcon, setVolumeIcon] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = streamUrl;
    video.muted = true;
    video.volume = volume;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.warn("Autoplay prevented:", error);
        });
    }
    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [streamUrl]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      if (videoRef.current.muted && !isPlaying) {
        videoRef.current.muted = false;
        updateVolumeIcon(volume);
      }
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
    updateVolumeIcon(newVolume);
  };

  const updateVolumeIcon = (newVolume) => {
    if (newVolume === 0) setVolumeIcon(3);
    else if (newVolume < 0.3) setVolumeIcon(0);
    else if (newVolume < 0.7) setVolumeIcon(1);
    else setVolumeIcon(2);
  };

  const handleVolumeButtonClick = () => {
    let newVolume = 0;
    if (volume === 0) newVolume = 0.3;
    else if (volume < 0.3) newVolume = 0.7;
    else if (volume < 0.7) newVolume = 1;
    else newVolume = 0;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    updateVolumeIcon(newVolume);
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;
    const container = video.parentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch((err) => {
        console.error("Fullscreen error:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.error("Exit fullscreen error:", err);
      });
      setIsFullscreen(false);
    }
  };

  return (
    <VideoContainer>
      <LiveStreamVideo
        ref={videoRef}
        autoPlay
        muted
        playsInline
        poster={LiveStreamImg}
        onEnded={() => setIsPlaying(false)}
        onError={() => setError(true)}
        controls={false}
        disablePictureInPicture
        controlsList="nodownload"
      />
      {/* {console.log(error, "error")} */}
      {error && <ErrorMessage>Unable to load video stream.</ErrorMessage>}
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
          {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
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

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(20, 20, 20, 0.8);
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 14px;
`;

export default LiveStream;
