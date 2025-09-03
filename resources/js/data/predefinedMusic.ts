import { MusicItem } from '../components/music';

// Predefined music tracks for wedding invitations
// These are placeholder URLs - in a real application, these would be actual audio files
export const predefinedMusic: MusicItem[] = [
  // Classical & Traditional
  {
    id: 'classic-1',
    title: 'Canon in D',
    artist: 'Johann Pachelbel',
    category: 'Classical',
    duration: 180,
    src: '/audio/canon-in-d.mp3',
    isPredefined: true,
    description: 'A timeless classical piece perfect for wedding ceremonies and romantic moments.',
  },
  {
    id: 'classic-2',
    title: 'Ave Maria',
    artist: 'Franz Schubert',
    category: 'Classical',
    duration: 240,
    src: '/audio/ave-maria.mp3',
    isPredefined: true,
    description: 'A beautiful and solemn piece ideal for traditional wedding ceremonies.',
  },
  {
    id: 'classic-3',
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    category: 'Classical',
    duration: 300,
    src: '/audio/clair-de-lune.mp3',
    isPredefined: true,
    description: 'A dreamy and romantic piece that creates an elegant atmosphere.',
  },

  // Romantic & Modern
  {
    id: 'romantic-1',
    title: 'All of Me',
    artist: 'John Legend',
    category: 'Romantic',
    duration: 270,
    src: '/audio/all-of-me.mp3',
    isPredefined: true,
    description: 'A modern romantic ballad perfect for contemporary weddings.',
  },
  {
    id: 'romantic-2',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    category: 'Romantic',
    duration: 263,
    src: '/audio/perfect.mp3',
    isPredefined: true,
    description: 'A heartfelt love song that captures the essence of true love.',
  },
  {
    id: 'romantic-3',
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    category: 'Romantic',
    duration: 240,
    src: '/audio/a-thousand-years.mp3',
    isPredefined: true,
    description: 'An emotional and beautiful song about eternal love.',
  },

  // Wedding March
  {
    id: 'march-1',
    title: 'Wedding March',
    artist: 'Felix Mendelssohn',
    category: 'Wedding March',
    duration: 180,
    src: '/audio/wedding-march.mp3',
    isPredefined: true,
    description: 'The traditional wedding march for the bride\'s entrance.',
  },
  {
    id: 'march-2',
    title: 'Bridal Chorus',
    artist: 'Richard Wagner',
    category: 'Wedding March',
    duration: 195,
    src: '/audio/bridal-chorus.mp3',
    isPredefined: true,
    description: 'Classic bridal entrance music from Wagner\'s Lohengrin.',
  },

  // Instrumental
  {
    id: 'instrumental-1',
    title: 'River Flows in You',
    artist: 'Yiruma',
    category: 'Instrumental',
    duration: 210,
    src: '/audio/river-flows-in-you.mp3',
    isPredefined: true,
    description: 'A beautiful piano piece that creates a peaceful and romantic mood.',
  },
  {
    id: 'instrumental-2',
    title: 'Kiss the Rain',
    artist: 'Yiruma',
    category: 'Instrumental',
    duration: 240,
    src: '/audio/kiss-the-rain.mp3',
    isPredefined: true,
    description: 'An emotional piano composition perfect for intimate moments.',
  },
  {
    id: 'instrumental-3',
    title: 'Comptine d\'un autre été',
    artist: 'Yann Tiersen',
    category: 'Instrumental',
    duration: 180,
    src: '/audio/comptine.mp3',
    isPredefined: true,
    description: 'A whimsical and charming piece from the Amélie soundtrack.',
  },

  // Jazz
  {
    id: 'jazz-1',
    title: 'At Last',
    artist: 'Etta James',
    category: 'Jazz',
    duration: 195,
    src: '/audio/at-last.mp3',
    isPredefined: true,
    description: 'A soulful jazz classic that celebrates finding true love.',
  },
  {
    id: 'jazz-2',
    title: 'The Way You Look Tonight',
    artist: 'Frank Sinatra',
    category: 'Jazz',
    duration: 210,
    src: '/audio/the-way-you-look-tonight.mp3',
    isPredefined: true,
    description: 'A timeless jazz standard perfect for elegant wedding celebrations.',
  },

  // Ceremony
  {
    id: 'ceremony-1',
    title: 'Here Comes the Sun',
    artist: 'The Beatles',
    category: 'Ceremony',
    duration: 185,
    src: '/audio/here-comes-the-sun.mp3',
    isPredefined: true,
    description: 'An uplifting and joyful song perfect for outdoor ceremonies.',
  },
  {
    id: 'ceremony-2',
    title: 'Marry Me',
    artist: 'Train',
    category: 'Ceremony',
    duration: 240,
    src: '/audio/marry-me.mp3',
    isPredefined: true,
    description: 'A sweet and romantic song ideal for proposal moments or ceremonies.',
  },

  // Reception
  {
    id: 'reception-1',
    title: 'I Will Always Love You',
    artist: 'Whitney Houston',
    category: 'Reception',
    duration: 270,
    src: '/audio/i-will-always-love-you.mp3',
    isPredefined: true,
    description: 'A powerful ballad perfect for first dance or special moments.',
  },
  {
    id: 'reception-2',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    category: 'Reception',
    duration: 281,
    src: '/audio/thinking-out-loud.mp3',
    isPredefined: true,
    description: 'A beautiful song about growing old together, perfect for receptions.',
  },

  // Pop
  {
    id: 'pop-1',
    title: 'Shallow',
    artist: 'Lady Gaga & Bradley Cooper',
    category: 'Pop',
    duration: 215,
    src: '/audio/shallow.mp3',
    isPredefined: true,
    description: 'A powerful duet that captures the depth of love and connection.',
  },
  {
    id: 'pop-2',
    title: 'Love Story',
    artist: 'Taylor Swift',
    category: 'Pop',
    duration: 235,
    src: '/audio/love-story.mp3',
    isPredefined: true,
    description: 'A modern take on Romeo and Juliet, perfect for young couples.',
  },
];

// Categories for filtering
export const musicCategories = [
  'All',
  'Classical',
  'Romantic',
  'Wedding March',
  'Instrumental',
  'Jazz',
  'Ceremony',
  'Reception',
  'Pop',
  'Modern',
  'Other'
];

// Helper function to get music by category
export const getMusicByCategory = (category: string): MusicItem[] => {
  if (category === 'All') {
    return predefinedMusic;
  }
  return predefinedMusic.filter(music => music.category === category);
};

// Helper function to search music
export const searchMusic = (query: string): MusicItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return predefinedMusic.filter(music =>
    music.title.toLowerCase().includes(lowercaseQuery) ||
    music.artist?.toLowerCase().includes(lowercaseQuery) ||
    music.description?.toLowerCase().includes(lowercaseQuery)
  );
};

// Helper function to get featured music (most popular)
export const getFeaturedMusic = (): MusicItem[] => {
  return predefinedMusic.slice(0, 6); // First 6 items as featured
};
