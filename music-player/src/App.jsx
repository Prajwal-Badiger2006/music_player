import { Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import { PlaylistProvider } from './context/PlaylistContext';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import './App.css';

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:id" element={<Playlist />} />
        </Routes>
      </main>
      <PlayerBar />
    </div>
  );
}

function App() {
  return (
    <PlayerProvider>
      <PlaylistProvider>
        <AppLayout />
      </PlaylistProvider>
    </PlayerProvider>
  );
}

export default App;
