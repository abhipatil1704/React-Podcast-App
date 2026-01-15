import React, { useState } from 'react';
import podcastService from '../services/podcastServices';
import { useNavigate } from 'react-router-dom';
import '../Edit.css';

const AddPodcast = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    host: '',
    duration: '',
    thumbnail: '',
    videoUrl: '',
    audioUrl: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await podcastService.addPodcast(form);
    navigate('/podcastlist');
  };

  return (
    <div className="add-page">
      <div className="add-card">
        <h2 className="add-title">Add New Podcast</h2>
        <p className="add-subtitle">Fill the details to create a new episode.</p>

        <form className="add-form" onSubmit={handleSubmit}>
          <div className="add-field">
            <label>Title</label>
            <input
              name="title"
              placeholder="Podcast title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-field">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Short description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>

          <div className="add-two-cols">
            <div className="add-field">
              <label>Host</label>
              <input
                name="host"
                placeholder="Host name"
                value={form.host}
                onChange={handleChange}
              />
            </div>

            <div className="add-field">
              <label>Guest</label>
              <input
                name="guest"
                placeholder="Guest name"
                value={form.guest}
                onChange={handleChange}
              />
            </div>

            <div className="add-field">
              <label>Duration</label>
              <input
                name="duration"
                placeholder="e.g. 35:20"
                value={form.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="add-field">
            <label>Thumbnail URL</label>
            <input
              name="thumbnail"
              placeholder="Image URL"
              value={form.thumbnail}
              onChange={handleChange}
            />
          </div>

          <div className="add-field">
            <label>Video URL</label>
            <input
              name="videoUrl"
              placeholder="YouTube or MP4 URL"
              value={form.videoUrl}
              onChange={handleChange}
            />
          </div>

          <div className="add-field">
            <label>Audio URL</label>
            <input
              name="audioUrl"
              placeholder="MP3 URL"
              value={form.audioUrl}
              onChange={handleChange}
            />
          </div>

          <div className="add-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/podcastlist')}
            >
              Cancel
            </button>
            <button type="submit" className="add-save-btn">
              Add Podcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPodcast;
