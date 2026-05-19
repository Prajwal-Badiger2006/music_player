export const defaultPlaylists = [
  {
    id: 'pl-1',
    name: 'Liked Songs',
    description: 'Your favorite tracks',
    trackIds: ['1', '3', '5', '7', '10'],
    cover: 'linear-gradient(135deg, #f093fb, #f5576c)',
    isDefault: true,
  },
  {
    id: 'pl-2',
    name: 'Chill Vibes',
    description: 'Relax and unwind',
    trackIds: ['1', '6', '9', '13', '15'],
    cover: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    isDefault: false,
  },
  {
    id: 'pl-3',
    name: 'Workout Mix',
    description: 'High energy bangers',
    trackIds: ['2', '7', '8', '10', '14'],
    cover: 'linear-gradient(135deg, #fc5c7d, #6a82fb)',
    isDefault: false,
  },
  {
    id: 'pl-4',
    name: 'Road Trip',
    description: 'Songs for the open road',
    trackIds: ['3', '11', '14', '15', '4'],
    cover: 'linear-gradient(135deg, #e65c00, #f9d423)',
    isDefault: false,
  },
  {
    id: 'pl-5',
    name: 'Late Night Jazz',
    description: 'Smooth sounds for late hours',
    trackIds: ['13', '15', '9'],
    cover: 'linear-gradient(135deg, #3e5151, #dec236)',
    isDefault: false,
  },
];

export function getPlaylistById(id) {
  return defaultPlaylists.find(p => p.id === id);
}
