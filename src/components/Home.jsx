import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home.css';

const Home = ({ currentPodcast }) => {
  const navigate = useNavigate();

  const playingTitle = currentPodcast?.title || 'The Tech Talk';
  const playingSubtitle = currentPodcast
    ? `${currentPodcast.host || 'Unknown host'} · ${currentPodcast.duration || ''}`
    : 'Latest episode';

  return (
    <div className="hero-section">
      <div className="animated-bg"></div>

      <div className="hero-content">
        <div className="hero-left">
          <p className="hero-badge">
            <span className="status-dot" /> Live · Stream your stories
          </p>

          <h1 className="hero-title fade-in">
            🎙️ Your Dynamic <span>Podcast Hub</span>
          </h1>

          <p className="hero-tagline slide-in">
            "Discover your favorite podcasts in one place, listen smarter to what matters, fitting perfectly into your day—press play, follow, binge, and repeat to turn free time into deep time."
          </p>

          <div className="hero-buttons">
            <button
              className="hero-btn primary-btn pulse"
              onClick={() => navigate('/podcastlist')}
            >
              Browse Podcasts
            </button>
            <button
              className="hero-btn ghost-btn"
              onClick={() => navigate('/add')}
            >
              Add New Podcast
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-chip">
              <span className="stat-number">3+</span>
              <span className="stat-label">Sample Episodes</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-equalizer">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="hero-card-body">
              <h3>Now Playing</h3>
              <p>{playingTitle} · {playingSubtitle}</p>
              <div className="hero-progress">
                <div className="hero-progress-bar" />
              </div>
              <div className="hero-card-actions">
                <button
                  className="mini-btn"
                  onClick={() => navigate('/podcastlist')}
                >
                  ▶ Play
                </button>
                <button
                  className="mini-btn mini-outline"
                  onClick={() => navigate('/add')}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          <div className="hero-graphics">
            <span className="wave-icon">🌊</span>
            <span className="mic-icon">🎤</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
