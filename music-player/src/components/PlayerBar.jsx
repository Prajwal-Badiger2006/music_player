import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistContext';

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    repeatMode,
    isShuffled,
    togglePlay,
    playNext,
    playPrev,
    seekTo,
    setVolume,
    toggleShuffle,
    cycleRepeat,
    clearQueue,
  } = usePlayer();

  const { isLiked, toggleLike } = usePlaylists();

  if (!currentTrack) return null;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    seekTo(Math.min(100, Math.max(0, pct)));
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setVolume(Math.min(1, Math.max(0, pct / 100)));
  };

  const liked = isLiked(currentTrack.id);

  const getDurationSeconds = (dur) => {
    const [m, s] = dur.split(':').map(Number);
    return m * 60 + s;
  };

  const totalSecs = getDurationSeconds(currentTrack.duration);
  const currentSecs = (progress / 100) * totalSecs;
  const currentMin = Math.floor(currentSecs / 60);
  const currentSec = Math.floor(currentSecs % 60);

  return (
    <div className="player-bar">
      <div className="player-bar-track" onClick={handleProgressClick}>
        <div className="player-bar-progress" style={{ width: `${progress}%` }} />
      </div>
      <div className="player-bar-inner">
        <div className="player-bar-left">
          <div className="player-bar-art" style={{ background: currentTrack.cover }}>
            <span className="player-bar-note">♪</span>
          </div>
          <div className="player-bar-info">
            <h4>{currentTrack.title}</h4>
            <p>{currentTrack.artist}</p>
          </div>
          <button
            className={`player-bar-like ${liked ? 'liked' : ''}`}
            onClick={() => toggleLike(currentTrack.id)}
            aria-label={liked ? 'Unlike' : 'Like'}
          >
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="player-bar-center">
          <div className="player-bar-controls">
            <button onClick={toggleShuffle} className={`ctrl-btn ${isShuffled ? 'active' : ''}`} aria-label="Shuffle">
              <svg viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
            </button>
            <button onClick={playPrev} className="ctrl-btn" aria-label="Previous">
              <svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
            </button>
            <button onClick={togglePlay} className="ctrl-btn play-ctrl" aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              )}
            </button>
            <button onClick={playNext} className="ctrl-btn" aria-label="Next">
              <svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
            </button>
            <button onClick={cycleRepeat} className={`ctrl-btn ${repeatMode !== 'off' ? 'active' : ''}`} aria-label="Repeat">
              <svg viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
              {repeatMode === 'one' && <span className="repeat-one">1</span>}
            </button>
          </div>
          <div className="player-bar-time">
            <span>{String(currentMin).padStart(2, '0')}:{String(currentSec).padStart(2, '0')}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        <div className="player-bar-right">
          <button onClick={() => clearQueue()} className="ctrl-btn" aria-label="Queue">
            <svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <div className="player-bar-volume">
            <svg viewBox="0 0 24 24">
              {volume === 0 ? (
                <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></>
              ) : (
                <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></>
              )}
            </svg>
            <div className="player-bar-volume-track" onClick={handleVolumeClick}>
              <div className="player-bar-volume-fill" style={{ width: `${volume * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
