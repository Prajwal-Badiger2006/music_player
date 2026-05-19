import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePlaylists } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import TrackList from '../components/TrackList';

export default function Playlist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlaylist, getPlaylistTracks, deletePlaylist, removeTrackFromPlaylist } = usePlaylists();
  const { playTrack } = usePlayer();

  const playlist = getPlaylist(id);
  const tracks = getPlaylistTracks(id);

  if (!playlist) {
    return (
      <div className="page-container playlist-page">
        <div className="page-header">
          <h1>Playlist not found</h1>
          <Link to="/library" className="btn-secondary">Back to Library</Link>
        </div>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (tracks.length > 0) playTrack(tracks[0], tracks);
  };

  return (
    <div className="page-container playlist-page">
      <div className="playlist-header">
        <div className="playlist-header-art" style={{ background: playlist.cover }}>
          <span className="playlist-header-icon">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </span>
        </div>
        <div className="playlist-header-info">
          <span className="playlist-type">Playlist</span>
          <h1>{playlist.name}</h1>
          {playlist.description && <p className="playlist-desc">{playlist.description}</p>}
          <p className="playlist-meta">
            {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
            {tracks.length > 0 && (
              <>
                <span className="playlist-meta-dot">·</span>
                {tracks.reduce((acc, t) => {
                  const [m, s] = t.duration.split(':').map(Number);
                  return acc + m * 60 + s;
                }, 0) > 3600
                  ? `${Math.floor(tracks.reduce((acc, t) => {
                      const [m, s] = t.duration.split(':').map(Number);
                      return acc + m * 60 + s;
                    }, 0) / 3600)} hr`
                  : `${Math.floor(tracks.reduce((acc, t) => {
                      const [m, s] = t.duration.split(':').map(Number);
                      return acc + m * 60 + s;
                    }, 0) / 60)} min`}
              </>
            )}
            {playlist.isDefault && <span className="playlist-meta-dot">·</span>}
            {playlist.isDefault && 'Auto-generated'}
          </p>
          <div className="playlist-actions">
            <button className="btn-primary" onClick={handlePlayAll} disabled={tracks.length === 0}>
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              Play All
            </button>
            {!playlist.isDefault && (
              <button className="btn-secondary danger" onClick={() => {
                if (window.confirm(`Delete "${playlist.name}"?`)) {
                  deletePlaylist(id);
                  navigate('/library');
                }
              }}>
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {tracks.length === 0 ? (
        <div className="playlist-empty">
          <svg viewBox="0 0 24 24"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.22 4.97a2.12 2.12 0 0 1 3 3L10.5 15.5 6 17l1.5-4.5 7.72-7.53z" /></svg>
          <h3>This playlist is empty</h3>
          <p>Search for tracks to add to this playlist</p>
          <Link to="/search" className="btn-primary">Search Music</Link>
        </div>
      ) : (
        <TrackList
          tracks={tracks}
          showAlbum={false}
          onRemoveTrack={!playlist.isDefault ? (trackId) => removeTrackFromPlaylist(id, trackId) : undefined}
        />
      )}
    </div>
  );
}
