import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tracks } from '../data/tracks';
import { usePlayer } from '../context/PlayerContext';

export default function Home() {
  const [counts, setCounts] = useState({ songs: 0, artists: 0, users: 0 });
  const { playTrack } = usePlayer();

  useEffect(() => {
    const targets = { songs: 120, artists: 85, users: 12 };
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts({
        songs: Math.floor(ease * targets.songs),
        artists: Math.floor(ease * targets.artists),
        users: Math.floor(ease * targets.users),
      });
      if (progress < 1) requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), 400);
    return () => clearTimeout(timer);
  }, []);

  const featuredTracks = tracks.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-visualizer" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="hero-vis-bar" />
          ))}
        </div>
        <div className="floating-note" style={{top:'10%',left:'5%',animationDelay:'0s',fontSize:'2rem'}}>♪</div>
        <div className="floating-note" style={{top:'20%',right:'15%',animationDelay:'1.5s',fontSize:'1.8rem'}}>♫</div>
        <div className="floating-note" style={{bottom:'25%',left:'10%',animationDelay:'3s',fontSize:'2.2rem'}}>♩</div>
        <div className="floating-note" style={{bottom:'15%',right:'8%',animationDelay:'4.5s',fontSize:'1.6rem'}}>♬</div>

        <div className="page-container">
          <div className="page-hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              Now available worldwide
            </div>
            <h1>
              Your Music, <br />
              <span className="gradient-text">Your Vibe</span>
            </h1>
            <p>
              Discover millions of tracks, create perfect playlists, and
              experience sound like never before. Melodify brings the
              world&apos;s music to your fingertips.
            </p>
            <div className="hero-actions">
              <Link to="/browse" className="btn-primary">
                Start Listening
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </Link>
              <Link to="/search" className="btn-secondary">
                Search Music
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <h3><span className="stat-num">{counts.songs}M+</span></h3>
                <p>Songs</p>
              </div>
              <div className="hero-stat">
                <h3><span className="stat-num">{counts.artists}K+</span></h3>
                <p>Artists</p>
              </div>
              <div className="hero-stat">
                <h3><span className="stat-num">{counts.users}M+</span></h3>
                <p>Listeners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Tracks */}
      <section className="page-section">
        <div className="page-container">
          <div className="section-header">
            <div>
              <span className="section-label">Trending Now</span>
              <h2 className="section-title">Popular Tracks</h2>
            </div>
            <Link to="/browse" className="section-link">View All →</Link>
          </div>
          <div className="home-tracks">
            {featuredTracks.map(track => (
              <div key={track.id} className="home-track-card" onClick={() => playTrack(track, featuredTracks)}>
                <div className="home-track-art" style={{ background: track.cover }}>
                  <span className="home-track-note">♪</span>
                  <div className="home-track-play">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                  </div>
                </div>
                <h4>{track.title}</h4>
                <p>{track.artist}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="page-section cta-mini">
        <div className="page-container">
          <div className="cta-card">
            <h2>Create Your First Playlist</h2>
            <p>Organize your favorite tracks and discover new music along the way.</p>
            <Link to="/library" className="btn-primary">
              Go to Library
              <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
