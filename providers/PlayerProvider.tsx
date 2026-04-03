import library from "@/constants/library.json";
import type { Track } from "@/types/track";
import React, { createContext, useContext, useMemo, useState } from "react";

type PlayerContextValue = {
  tracks: Track[];
  currentTrack: Track | null;
  currentTrackIndex: number;
  isPlaying: boolean;
  selectTrack: (track: Track) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlayback: () => void;
};

const tracks = library as Track[];

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack =
    currentTrackIndex >= 0 ? tracks[currentTrackIndex] ?? null : null;

  const value = useMemo<PlayerContextValue>(
    () => ({
      tracks,
      currentTrack,
      currentTrackIndex,
      isPlaying,
      selectTrack: (track) => {
        const nextIndex = tracks.findIndex((item) => item.url === track.url);

        if (nextIndex === -1) {
          return;
        }

        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
      },
      playNext: () => {
        if (!tracks.length) {
          return;
        }

        setCurrentTrackIndex((index) => {
          if (index < 0) {
            setIsPlaying(true);
            return 0;
          }

          return (index + 1) % tracks.length;
        });
        setIsPlaying(true);
      },
      playPrevious: () => {
        if (!tracks.length) {
          return;
        }

        setCurrentTrackIndex((index) => {
          if (index < 0) {
            setIsPlaying(true);
            return 0;
          }

          return index === 0 ? tracks.length - 1 : index - 1;
        });
        setIsPlaying(true);
      },
      togglePlayback: () => {
        if (!currentTrack && tracks.length) {
          setCurrentTrackIndex(0);
          setIsPlaying(true);
          return;
        }

        setIsPlaying((value) => !value);
      },
    }),
    [currentTrack, currentTrackIndex, isPlaying]
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return context;
}
