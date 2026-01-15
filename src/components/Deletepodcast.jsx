import React from 'react';

const DeletePodcast = ({ id, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this podcast?')) {
            onDelete(id);
        }
    };

    return (
        <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete Podcast
        </button>
    );
};

export default DeletePodcast;
