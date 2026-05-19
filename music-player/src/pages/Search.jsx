import { useState } from 'react';
import { searchTracks, genres } from '../data/tracks';
import { usePlayer } from '../context/PlayerContext';
import TrackList from '../components/TrackList';

export default function Search() {
  const [query, setQuery] = useState('');
  const { playTrack } = usePlayer();

  const results = query.trim() ? searchTracks(query) : [];

  const hasResults = results.length > 0;

  return (
    <div className="page-container search-page">
      <div className="page-header">
        <h1>Search</h1>
        <p>Find your favorite tracks, artists, and albums</p>
      </div>

      <div className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
          className="search-input"
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        )}
      </div>

      {!query && (
        <div className="search-suggestions">
          <h2>Browse by Genre</h2>
          <div className="genre-grid compact">
            {genres.map(genre => {
              const gradientColors = [
                'linear-gradient(135deg, #667eea, #764ba2)',
                'linear-gradient(135deg, #f093fb, #f5576c)',
                'linear-gradient(135deg, #4facfe, #00f2fe)',
                'linear-gradient(135deg, #43e97b, #38f9d7)',
                'linear-gradient(135deg, #fa709a, #fee140)',
                'linear-gradient(135deg, #a18cd1, #fbc2eb)',
                'linear-gradient(135deg, #fc5c7d, #6a82fb)',
                'linear-gradient(135deg, #ff0844, #ffb199)',
                'linear-gradient(135deg, #13547a, #80d0c7)',
                'linear-gradient(135deg, #00b4db, #0083b0)',
                'linear-gradient(135deg, #e65c00, #f9d423)',
                'linear-gradient(135deg, #0fd850, #2b91e4)',
                'linear-gradient(135deg, #c471f5, #fa71cd)',
                'linear-gradient(135deg, #03001e, #7303c0)',
                'linear-gradient(135deg, #3e5151, #dec236)',
              ];
              const idx = genres.indexOf(genre);
              return (
                <div
                  key={genre}
                  className="genre-card small"
                  style={{ background: gradientColors[idx % gradientColors.length] }}
                  onClick={() => setQuery(genre)}
                >
                  <h3>{genre}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {query && !hasResults && (
        <div className="search-empty">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <h3>No results found</h3>
          <p>We couldn&apos;t find anything for &ldquo;{query}&rdquo;</p>
        </div>
      )}

      {query && hasResults && (
        <div className="search-results">
          <h2>Results ({results.length})</h2>
          <TrackList tracks={results} />
        </div>
      )}
    </div>
  );
}
