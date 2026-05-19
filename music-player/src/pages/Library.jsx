import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlaylists } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';

export default function Library() {
  const { playlists, createPlaylist, deletePlaylist, getPlaylistTracks } = usePlaylists();
  const { playTrack } = usePlayer();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createPlaylist(newName.trim(), newDesc.trim());
    setNewName('');
    setNewDesc('');
    setShowCreate(false);
  };

  const likedTracks = getPlaylistTracks('pl-1');

  return (
    <div className="page-container library-page">
      <div className="page-header">
        <h1>Your Library</h1>
        <p>Manage your playlists and liked tracks</p>
      </div>

      {/* Liked Songs */}
      <section className="library-section">
        <div className="section-header">
          <h2>Liked Songs</h2>
          <Link to="/playlist/pl-1" className="section-link">View All →</Link>
        </div>
        <div className="liked-banner" onClick={() => {
          if (likedTracks.length > 0) playTrack(likedTracks[0], likedTracks);
        }}>
          <div className="liked-banner-art">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </div>
          <div className="liked-banner-info">
            <h3>Liked Songs</h3>
            <p>{likedTracks.length} {likedTracks.length === 1 ? 'track' : 'tracks'}</p>
          </div>
          <button className="liked-play-btn" aria-label="Play liked songs">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </button>
        </div>
      </section>

      {/* Playlists */}
      <section className="library-section">
        <div className="section-header">
          <h2>Playlists</h2>
          <button className="section-link create-btn" onClick={() => setShowCreate(true)}>
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            New Playlist
          </button>
        </div>

        {showCreate && (
          <form className="create-playlist-form" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Playlist name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              autoFocus
              required
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
            />
            <div className="create-playlist-actions">
              <button type="submit" className="btn-primary" disabled={!newName.trim()}>Create</button>
              <button type="button" className="btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
            </div>
          </form>
        )}

        <div className="playlist-grid">
          {playlists.filter(p => !p.isDefault).map(pl => {
            const plTracks = getPlaylistTracks(pl.id);
            return (
              <Link to={`/playlist/${pl.id}`} key={pl.id} className="playlist-card">
                <div className="playlist-card-art" style={{ background: pl.cover }}>
                  <span className="playlist-card-icon">
                    <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </span>
                </div>
                <h4>{pl.name}</h4>
                <p>{pl.description || `${plTracks.length} tracks`}</p>
              </Link>
            );
          })}
        </div>

        {playlists.filter(p => !p.isDefault).length === 0 && !showCreate && (
          <div className="library-empty">
            <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            <h3>No playlists yet</h3>
            <p>Create your first playlist to get started</p>
          </div>
        )}
      </section>
    </div>
  );
}
