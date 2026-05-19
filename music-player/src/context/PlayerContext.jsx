import { createContext, useContext, useState, useCallback, useRef } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // off, one, all
  const progressInterval = useRef(null);

  const startProgress = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval.current);
          return 100;
        }
        return p + 0.5;
      });
    }, 300);
  }, []);

  const stopProgress = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const playTrack = useCallback((track, tracksQueue) => {
    setCurrentTrack(track);
    if (tracksQueue) {
      setQueue(tracksQueue);
      setQueueIndex(tracksQueue.findIndex(t => t.id === track.id));
    }
    setIsPlaying(true);
    setProgress(0);
    stopProgress();
    startProgress();
  }, [startProgress, stopProgress]);

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;
    setIsPlaying(p => {
      if (!p) {
        startProgress();
      } else {
        stopProgress();
      }
      return !p;
    });
  }, [currentTrack, startProgress, stopProgress]);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;
    let nextIdx = queueIndex + 1;
    if (nextIdx >= queue.length) {
      if (repeatMode === 'all') {
        nextIdx = 0;
      } else {
        return;
      }
    }
    setQueueIndex(nextIdx);
    setCurrentTrack(queue[nextIdx]);
    setProgress(0);
    setIsPlaying(true);
    stopProgress();
    startProgress();
  }, [queue, queueIndex, repeatMode, startProgress, stopProgress]);

  const playPrev = useCallback(() => {
    if (queue.length === 0) return;
    if (progress > 5) {
      setProgress(0);
      return;
    }
    const prevIdx = queueIndex - 1 < 0
      ? (repeatMode === 'all' ? queue.length - 1 : 0)
      : queueIndex - 1;
    setQueueIndex(prevIdx);
    setCurrentTrack(queue[prevIdx]);
    setProgress(0);
    setIsPlaying(true);
    stopProgress();
    startProgress();
  }, [queue, queueIndex, repeatMode, progress, startProgress, stopProgress]);

  const addToQueue = useCallback((track) => {
    setQueue(q => [...q, track]);
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setQueueIndex(-1);
    setCurrentTrack(null);
    setIsPlaying(false);
    setProgress(0);
    stopProgress();
  }, [stopProgress]);

  const seekTo = useCallback((value) => {
    setProgress(value);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(s => !s);
  }, []);

  const cycleRepeat = useCallback(() => {
    setRepeatMode(r => r === 'off' ? 'all' : r === 'all' ? 'one' : 'off');
  }, []);

  const value = {
    currentTrack,
    queue,
    queueIndex,
    isPlaying,
    progress,
    volume,
    isShuffled,
    repeatMode,
    playTrack,
    togglePlay,
    playNext,
    playPrev,
    addToQueue,
    clearQueue,
    seekTo,
    setVolume,
    toggleShuffle,
    cycleRepeat,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
