// src/components/PodcastList.jsx
import React, { useEffect, useState } from 'react';
import podcastService from '../services/podcastServices';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    podcastService.getAllPodcasts().then(setPodcasts);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this podcast?')) {
      try {
        await podcastService.deletePodcast(id);
        setPodcasts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        alert('Error deleting podcast: ' + err.message);
      }
    }
  };

  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleView = (id) => navigate(`/view/${id}`);

  return (
    <div className="podcast-list">
      <h2 className="podcast-heading">All Podcasts</h2>

      <div className="card-grid">
        {podcasts.map((p) => (
          <div className="podcast-card" key={p.id}>
            <div className="podcast-thumb-wrapper">
              <img src={p.thumbnail} alt={p.title} className="podcast-thumb" />
            </div>

            <div className="podcast-details">
              <h3 className="podcast-title">{p.title}</h3>
              <p className="podcast-desc">{p.description}</p>
              <div className="podcast-meta">
                <span>Host: {p.host}</span>
                 <span>Guest: {p.guest}</span>
                <span>•</span> 
                <span>{p.duration}</span>
              </div>

              <div className="podcast-actions">
                <button
                  className="btn-secondary"
                  onClick={() => handleEdit(p.id)}
                >
                  Edit
                </button>
                <button
                  className="btn-danger delete-btn"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
                <button
                  className="btn-primary-outline"
                  onClick={() => handleView(p.id)}
                >
                  Listen / View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastList;
