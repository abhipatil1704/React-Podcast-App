import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Home from './components/Home';
import PodcastList from './components/PodcastList';
import AddPodcast from './components/AddPodcast';
import EditPodcast from './components/EditPodcast';
import ViewPodcast from './components/Viewpodcast';
import Deletepodcast from './components/Deletepodcast';
import Register from './components/Registration';
import Login from './components/Login';

// Simple PrivateRoute 
const PrivateRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;
  const [currentPodcast, setCurrentPodcast] = useState(null)
  useEffect(() => {
    const stored = localStorage.getItem('podcastUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('podcastUser');
      }
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser({
      id: loggedInUser.id,
      name: loggedInUser.name,
      email: loggedInUser.email,
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('podcastUser');
  };

  return (
    <Router>
      <div className="app-wrapper">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container">
            <Link className="navbar-brand fw-bold" to={isLoggedIn ? '/' : '/login'}>
              🎙️ PodSphere
            </Link>

            <div className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                  <span className="nav-link disabled">
                    {user?.name ? `Hi, ${user.name}` : 'Logged in'}
                  </span>
                  <Link className="nav-link" to="/">Home</Link>
                  <Link className="nav-link" to="/podcastlist">Podcast List</Link>
                  <Link className="nav-link" to="/add">Add Podcast</Link>
                  <button
                    className="btn btn-sm btn-outline-light ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>

    
        <main className="main-shell">
          <Routes>
            {/* Public routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Home currentPodcast={currentPodcast} />
                </PrivateRoute>
              }
            />
            <Route
              path="/podcastlist"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <PodcastList setCurrentPodcast={setCurrentPodcast} />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <AddPodcast />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <EditPodcast />
                </PrivateRoute>
              }
            />
            <Route
              path="/view/:id"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <ViewPodcast setCurrentPodcast={setCurrentPodcast} />
                </PrivateRoute>
              }
            />
            <Route
              path="/delete/:id"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Deletepodcast />
                </PrivateRoute>
              }
            />

            {/* Fallback: redirect unknown paths */}
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />}
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-light py-3 mt-5">
          <div className="container text-center">
            <p className="mb-0">PodSphere © 2025</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
