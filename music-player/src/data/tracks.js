export const tracks = [
  {
    id: '1',
    title: 'Midnight Waves',
    artist: 'Luna & The Echoes',
    album: 'Ocean Dreams',
    duration: '4:07',
    cover: 'linear-gradient(135deg, #667eea, #764ba2)',
    genre: 'Electronic',
    plays: '23.4M',
  },
  {
    id: '2',
    title: 'Electric Dreams',
    artist: 'Neon Pulse',
    album: 'Synthetic Nights',
    duration: '3:52',
    cover: 'linear-gradient(135deg, #f093fb, #f5576c)',
    genre: 'Synthwave',
    plays: '18.7M',
  },
  {
    id: '3',
    title: 'Ocean Drive',
    artist: 'Sarah Blue',
    album: 'Summer Nights',
    duration: '4:23',
    cover: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    genre: 'Pop',
    plays: '15.2M',
  },
  {
    id: '4',
    title: 'Golden Hour',
    artist: 'Solstice Band',
    album: 'Warm Glow',
    duration: '3:45',
    cover: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    genre: 'Indie',
    plays: '12.8M',
  },
  {
    id: '5',
    title: 'Starlight Serenade',
    artist: 'Celestial Keys',
    album: 'Cosmic Harmony',
    duration: '5:12',
    cover: 'linear-gradient(135deg, #fa709a, #fee140)',
    genre: 'Classical',
    plays: '9.6M',
  },
  {
    id: '6',
    title: 'Velvet Nights',
    artist: 'Indigo Soul',
    album: 'After Dark',
    duration: '4:31',
    cover: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    genre: 'R&B',
    plays: '11.3M',
  },
  {
    id: '7',
    title: 'Neon Horizon',
    artist: 'Circuit Breaker',
    album: 'Digital Dawn',
    duration: '3:38',
    cover: 'linear-gradient(135deg, #fc5c7d, #6a82fb)',
    genre: 'Electronic',
    plays: '8.1M',
  },
  {
    id: '8',
    title: 'Crimson Tide',
    artist: 'The Afterglow',
    album: 'Blood Moon',
    duration: '4:15',
    cover: 'linear-gradient(135deg, #ff0844, #ffb199)',
    genre: 'Rock',
    plays: '7.4M',
  },
  {
    id: '9',
    title: 'Moonlit Dance',
    artist: 'Echo Valley',
    album: 'Silver Shadows',
    duration: '3:59',
    cover: 'linear-gradient(135deg, #13547a, #80d0c7)',
    genre: 'Folk',
    plays: '6.8M',
  },
  {
    id: '10',
    title: 'Urban Jungle',
    artist: 'Beat Syndicate',
    album: 'Concrete Beats',
    duration: '3:27',
    cover: 'linear-gradient(135deg, #00b4db, #0083b0)',
    genre: 'Hip-Hop',
    plays: '14.5M',
  },
  {
    id: '11',
    title: 'Whiskey Sunset',
    artist: 'Dusty Trails',
    album: 'Country Roads',
    duration: '4:42',
    cover: 'linear-gradient(135deg, #e65c00, #f9d423)',
    genre: 'Country',
    plays: '5.9M',
  },
  {
    id: '12',
    title: 'Pixel Rain',
    artist: '8-Bit Heroes',
    album: 'Retro Wave',
    duration: '3:15',
    cover: 'linear-gradient(135deg, #0fd850, #2b91e4)',
    genre: 'Chiptune',
    plays: '4.2M',
  },
  {
    id: '13',
    title: 'Silk & Steel',
    artist: 'Jade Lotus',
    album: 'Zen Garden',
    duration: '5:34',
    cover: 'linear-gradient(135deg, #c471f5, #fa71cd)',
    genre: 'Ambient',
    plays: '3.8M',
  },
  {
    id: '14',
    title: 'Thunder Road',
    artist: 'Highway Saints',
    album: 'Open Road',
    duration: '4:08',
    cover: 'linear-gradient(135deg, #03001e, #7303c0, #ec38bc)',
    genre: 'Rock',
    plays: '9.1M',
  },
  {
    id: '15',
    title: 'Coffee & Rain',
    artist: 'Misty Morning',
    album: 'Quiet Mornings',
    duration: '3:44',
    cover: 'linear-gradient(135deg, #3e5151, #dec236)',
    genre: 'Jazz',
    plays: '6.3M',
  },
  {
    id: '16',
    title: 'Fractal Love',
    artist: 'Digital Dreamer',
    album: 'Binary Hearts',
    duration: '4:19',
    cover: 'linear-gradient(135deg, #1f4037, #99f2c8)',
    genre: 'Electronic',
    plays: '7.7M',
  },
];

export const genres = [...new Set(tracks.map(t => t.genre))];

export function getTrackById(id) {
  return tracks.find(t => t.id === id);
}

export function searchTracks(query) {
  const q = query.toLowerCase();
  return tracks.filter(
    t =>
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.album.toLowerCase().includes(q) ||
      t.genre.toLowerCase().includes(q)
  );
}

