import { tracks, genres } from '../data/tracks';
import { usePlayer } from '../context/PlayerContext';

export default function Browse() {
  const { playTrack } = usePlayer();

  return (
    <div className="page-container browse-page">
      <div className="page-header">
        <h1>Browse Music</h1>
        <p>Discover tracks by genre</p>
      </div>

      {/* Genre Cards */}
      <div className="genre-grid">
        {genres.map(genre => {
          const genreTracks = tracks.filter(t => t.genre === genre);
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
              className="genre-card"
              style={{ background: gradientColors[idx % gradientColors.length] }}
              onClick={() => {
                const section = document.getElementById(`genre-${genre.replace(/\s+/g, '-').toLowerCase()}`);
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <h3>{genre}</h3>
              <p>{genreTracks.length} tracks</p>
            </div>
          );
        })}
      </div>

      {/* All Tracks by Genre */}
      <div className="browse-tracks">
        {genres.map(genre => {
          const genreTracks = tracks.filter(t => t.genre === genre);
          if (genreTracks.length === 0) return null;
          return (
            <section key={genre} id={`genre-${genre.replace(/\s+/g, '-').toLowerCase()}`} className="browse-genre-section">
              <h2 className="browse-genre-title">{genre}</h2>
              <div className="browse-track-row">
                {genreTracks.map(track => (
                  <div key={track.id} className="browse-track-card" onClick={() => playTrack(track, genreTracks)}>
                    <div className="browse-track-art" style={{ background: track.cover }}>
                      <span>♪</span>
                      <div className="browse-track-overlay">
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                      </div>
                    </div>
                    <h4>{track.title}</h4>
                    <p>{track.artist}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
