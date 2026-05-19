import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistContext';

export default function TrackList({ tracks, showIndex = true, showAlbum = true, compact = false, onRemoveTrack }) {
  const { playTrack, currentTrack } = usePlayer();
  const { isLiked, toggleLike } = usePlaylists();

  const isCurrent = (track) => currentTrack?.id === track.id;

  return (
    <div className={`track-list ${compact ? 'compact' : ''}`}>
      <div className="track-list-header">
        <span className="track-list-col-num">#</span>
        <span className="track-list-col-title">Title</span>
        {showAlbum && <span className="track-list-col-album">Album</span>}
        <span className="track-list-col-duration">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </span>
      </div>
      {tracks.map((track, idx) => (
        <div
          key={track.id}
          className={`track-list-row ${isCurrent(track) ? 'current' : ''}`}
          onDoubleClick={() => playTrack(track, tracks)}
        >
          <span className="track-list-col-num">
            {isCurrent(track) ? (
              <span className="track-equalizer">
                <span /><span /><span />
              </span>
            ) : (
              showIndex ? idx + 1 : <button className="track-play-icon" onClick={() => playTrack(track, tracks)} aria-label={`Play ${track.title}`}>
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
            )}
          </span>
          <div className="track-list-col-title">
            <div className="track-list-art" style={{ background: track.cover }}>
              <span>♪</span>
            </div>
            <div>
              <h4>{track.title}</h4>
              <p>{track.artist}</p>
            </div>
          </div>
          {showAlbum && <span className="track-list-col-album">{track.album}</span>}
          <div className="track-list-col-actions">
            <button
              className={`track-like-btn ${isLiked(track.id) ? 'liked' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
              aria-label={isLiked(track.id) ? 'Unlike' : 'Like'}
            >
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            {onRemoveTrack && (
              <button
                className="track-remove-btn"
                onClick={(e) => { e.stopPropagation(); onRemoveTrack(track.id); }}
                aria-label={`Remove ${track.title}`}
              >
                <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
            <span className="track-list-col-duration">{track.duration}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
