import { NavLink } from 'react-router-dom';
import { usePlaylists } from '../context/PlaylistContext';

export default function Sidebar() {
  const { playlists } = usePlaylists();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <svg viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="sidebarLogo" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <path d="M9 18V5l12-2v13" stroke="url(#sidebarLogo)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" fill="url(#sidebarLogo)" />
          <circle cx="18" cy="16" r="3" fill="url(#sidebarLogo)" />
        </svg>
        <span>Melodify</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </NavLink>
        <NavLink to="/browse" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
          Browse
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Search
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Library
        </NavLink>
      </nav>

      <div className="sidebar-divider" />

      <div className="sidebar-playlists">
        <h3 className="sidebar-playlists-title">Playlists</h3>
        {playlists.filter(p => !p.isDefault).map(pl => (
          <NavLink
            key={pl.id}
            to={`/playlist/${pl.id}`}
            className={({ isActive }) => `sidebar-playlist-link ${isActive ? 'active' : ''}`}
          >
            <div className="sidebar-playlist-dot" style={{ background: pl.cover }} />
            {pl.name}
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <NavLink to="/library" className="sidebar-link small">
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Playlist
        </NavLink>
      </div>
    </aside>
  );
}
