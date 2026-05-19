import { createContext, useContext, useState, useCallback } from 'react';
import { defaultPlaylists } from '../data/playlists';
import { getTrackById } from '../data/tracks';

const PlaylistContext = createContext(null);

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState(defaultPlaylists);

  const getPlaylist = useCallback((id) => {
    return playlists.find(p => p.id === id) || null;
  }, [playlists]);

  const getPlaylistTracks = useCallback((id) => {
    const pl = playlists.find(p => p.id === id);
    if (!pl) return [];
    return pl.trackIds.map(getTrackById).filter(Boolean);
  }, [playlists]);

  const createPlaylist = useCallback((name, description) => {
    const newPlaylist = {
      id: `pl-${Date.now()}`,
      name,
      description: description || '',
      trackIds: [],
      cover: `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})`,
      isDefault: false,
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  }, []);

  const deletePlaylist = useCallback((id) => {
    setPlaylists(prev => prev.filter(p => p.id !== id));
  }, []);

  const addTrackToPlaylist = useCallback((playlistId, trackId) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id !== playlistId) return p;
      if (p.trackIds.includes(trackId)) return p;
      return { ...p, trackIds: [...p.trackIds, trackId] };
    }));
  }, []);

  const removeTrackFromPlaylist = useCallback((playlistId, trackId) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id !== playlistId) return p;
      return { ...p, trackIds: p.trackIds.filter(id => id !== trackId) };
    }));
  }, []);

  const isTrackInPlaylist = useCallback((playlistId, trackId) => {
    const pl = playlists.find(p => p.id === playlistId);
    return pl ? pl.trackIds.includes(trackId) : false;
  }, [playlists]);

  const getUserPlaylists = useCallback(() => {
    return playlists;
  }, [playlists]);

  const likedPlaylist = playlists.find(p => p.id === 'pl-1');

  const toggleLike = useCallback((trackId) => {
    if (!likedPlaylist) return;
    if (likedPlaylist.trackIds.includes(trackId)) {
      removeTrackFromPlaylist('pl-1', trackId);
    } else {
      addTrackToPlaylist('pl-1', trackId);
    }
  }, [likedPlaylist, removeTrackFromPlaylist, addTrackToPlaylist]);

  const isLiked = useCallback((trackId) => {
    return likedPlaylist ? likedPlaylist.trackIds.includes(trackId) : false;
  }, [likedPlaylist]);

  const value = {
    playlists,
    getPlaylist,
    getPlaylistTracks,
    createPlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    isTrackInPlaylist,
    getUserPlaylists,
    toggleLike,
    isLiked,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylists() {
  const ctx = useContext(PlaylistContext);
  if (!ctx) throw new Error('usePlaylists must be used within PlaylistProvider');
  return ctx;
}
