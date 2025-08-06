"use client";

import React, { useState, useEffect, useRef } from "react";
import { BackgroundMusicButton } from "./components/background-music-button";

interface BackgroundMusicProps {
  audioSrc: string;
  volume?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  audioSrc,
  volume = 0.3,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = volume;
    audio.preload = "metadata";

    audio.load();

    const handleCanPlay = () => {
      console.log("Audio can start playing");
      setIsLoaded(true);
      setError(null);
    };

    const handleCanPlayThrough = () => {
      console.log("Audio loaded successfully - can play through");
      setIsLoaded(true);
      setError(null);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      setError(`Failed to load audio file (Error: ${target?.error?.code})`);
      setIsLoaded(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };
    console.log(error);

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [volume]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    try {
      if (isPlaying && !isMuted) {
        audio.pause();
        setIsMuted(true);
      } else {
        audio.volume = volume;
        await audio.play();
        setIsMuted(false);
      }
    } catch (err) {
      console.error("Error controlling audio:", err);
      setError("Failed to control audio playback");
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} crossOrigin="anonymous" />
      <BackgroundMusicButton
        isMuted={isMuted}
        isLoaded={isLoaded}
        isPlaying={isPlaying}
        onClick={toggleMusic}
      />
    </>
  );
};
