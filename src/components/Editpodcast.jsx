import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import podcastService from '../services/podcastServices';
import '../Edit.css';

const EditPodcast = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    podcastService.getPodcastById(id).then(setForm);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await podcastService.updatePodcast(id, form);
    navigate('/podcastlist');
  };

  if (!form) return <div className="view-loading">Loading...</div>;

  return (
    <div className="edit-page">
      <div className="edit-card">
        <h2 className="edit-title">Edit Podcast</h2>
        <p className="edit-subtitle">{form.title}</p>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="edit-field">
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-field">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>

          <div className="edit-two-cols">
            <div className="edit-field">
              <label>Host</label>
              <input
                name="host"
                value={form.host}
                onChange={handleChange}
              />
            </div>
            <div className="edit-two-cols">
            <div className="edit-field">
              <label>Guest</label>
              <input
                name="guest"
                value={form.guest}
                onChange={handleChange}
              />
            </div>
            </div>
            
            <div className="edit-field">
              <label>Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="edit-field">
            <label>Thumbnail URL</label>
            <input
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
            />
          </div>

          <div className="edit-field">
            <label>Video URL</label>
            <input
              name="videoUrl"
              value={form.videoUrl}
              onChange={handleChange}
            />
          </div>

          <div className="edit-field">
            <label>Audio URL</label>
            <input
              name="audioUrl"
              value={form.audioUrl}
              onChange={handleChange}
            />
          </div>

          <div className="edit-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/podcastlist')}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary-outline edit-save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPodcast;
