import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import podcastService from '../services/podcastServices';
import '../App.css';

const ViewPodcast = ({ setCurrentPodcast }) => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    podcastService
      .getPodcastById(id)
      .then((data) => {
        setPodcast(data);
        if (setCurrentPodcast && data) setCurrentPodcast(data);
      })
      .catch(() => setPodcast(null));
  }, [id, setCurrentPodcast]);

  if (!podcast) return <div className="view-loading">Loading...</div>;

  const renderMedia = () => {
    if (podcast.videoUrl) {
      const url = podcast.videoUrl;
      if (url.includes('youtube.com/watch?v=') || url.includes('youtu.be/')) {
        let embedUrl = url;
        if (embedUrl.includes('youtube.com/watch?v=')) {
          embedUrl = embedUrl.replace('watch?v=', 'embed/');
        } else if (embedUrl.includes('youtu.be/')) {
          const videoId = embedUrl.split('youtu.be/')[1];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        return (
          <div className="view-media-wrapper">
            <iframe
              className="view-media"
              src={embedUrl}
              title={podcast.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
      return (
        <div className="view-media-wrapper">
          <video className="view-media" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (podcast.audioUrl) {
      return (
        <div className="view-media-wrapper">
          <audio className="view-audio" controls src={podcast.audioUrl}>
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="view-page">
      <div className="view-card">
        <div className="view-header">
          {podcast.thumbnail && (
            <img
              src={podcast.thumbnail}
              alt={podcast.title}
              className="view-thumb"
            />
          )}
          <div className="view-title-block">
            <h2 className="view-title">
              {podcast.title || 'Untitled Podcast'}
            </h2>
            <p className="view-host">
              <span>Host:</span> {podcast.host || 'N/A'}
            </p>
              <p className="view-host">
              <span>Guest:</span> {podcast.guest || 'N/A'}
            </p>
            <p className="view-duration">
              <span>Duration:</span> {podcast.duration || 'N/A'}
            </p>
          </div>
        </div>

        <p className="view-description">
          {podcast.description || 'No description available.'}
        </p>

        {renderMedia()}
      </div>
    </div>
  );
};

export default ViewPodcast;
