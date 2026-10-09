export type PhotoItem = {
  src: string;
  alt: string;
  title: string;
  location: string;
  camera: string;
  settings: string;
  accent: string;
};

export const photos: PhotoItem[] = [
  { src: '/photos/monsoon-valley.webp', alt: 'A deep green mountain valley beneath heavy monsoon clouds', title: 'Monsoon Valley', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#6ee7b7' },
  { src: '/photos/green-gorge.webp', alt: 'A lush green gorge with a small waterfall below', title: 'Into the Gorge', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#31d7ff' },
  { src: '/photos/reservoir-horizon.webp', alt: 'A wide reservoir with rocky islands and hills on the horizon', title: 'Reservoir Horizon', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#7dd3fc' },
  { src: '/photos/stone-dam.webp', alt: 'A concrete dam spanning a rocky riverbed under a clear sky', title: 'Water and Stone', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#ffb15c' },
  { src: '/photos/full-moon.webp', alt: 'A bright full moon isolated against a black night sky', title: 'Night Beacon', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#8b5cf6' },
  { src: '/photos/hill-panorama.webp', alt: 'A panoramic view across green hills and distant farmland', title: 'Open Country', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#6ee7b7' },
  { src: '/photos/sunset-reflection.webp', alt: 'A sunset reflected across rippling water beneath dark clouds', title: 'Last Light', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#ffb15c' },
  { src: '/photos/green-plains.webp', alt: 'Rolling green plains viewed from a rocky hillside', title: 'Beyond the Ridge', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#7dd3fc' },
  { src: '/photos/viewpoint-rest.webp', alt: 'A seated viewpoint overlooking green hills and a distant valley', title: 'Pause at the Edge', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#ff7a90' },
  { src: '/photos/forest-ride.webp', alt: 'A motorcycle ride along a narrow road through dense green forest', title: 'Forest Route', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#6ee7b7' },
  { src: '/photos/stream-bridge.webp', alt: 'A forest stream reflecting trees beneath a narrow footbridge', title: 'Under the Bridge', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#31d7ff' },
  { src: '/photos/hillside-green.webp', alt: 'A vivid green hillside layered with trees beneath an overcast sky', title: 'Hillside Layers', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#6ee7b7' },
  { src: '/photos/lakeside-boat.webp', alt: 'A small boat crossing a quiet lake bordered by green grass', title: 'Quiet Crossing', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#7dd3fc' },
  { src: '/photos/winding-road.webp', alt: 'A winding mountain road overlooking a vast valley beneath bright clouds', title: 'Road Through the Hills', location: 'Location not supplied', camera: 'Not supplied', settings: 'Not supplied', accent: '#31d7ff' },
];

export const videos = [
  { title: 'CapstoneX', duration: '01:12', poster: '/videos/capstonex-poster.jpg', src: '/videos/capstonex.mp4', captions: '', caption: 'CapstoneX project walkthrough.' },
  { title: 'Automarket', duration: '01:10', poster: '/videos/automarket-poster.jpg', src: '/videos/automarket.mp4', captions: '', caption: 'Automarket project walkthrough.' },
  { title: 'Carbon Footprint AI', duration: '01:00', poster: '/videos/carbon-footprint-ai-poster.jpg', src: '/videos/carbon-footprint-ai.mp4', captions: '', caption: 'Carbon Footprint AI project walkthrough.' },
];

export const games = [
  { title: 'Add favorite game 01', genre: 'Genre placeholder', lesson: 'Health bars show status at a glance — visibility of system status.' },
  { title: 'Add favorite game 02', genre: 'Genre placeholder', lesson: 'Tutorials reveal complexity in steps — progressive disclosure.' },
  { title: 'Add favorite game 03', genre: 'Genre placeholder', lesson: 'Consistent controls reduce relearning — consistency and standards.' },
  { title: 'Add favorite game 04', genre: 'Genre placeholder', lesson: 'Clear rewards make progress tangible — feedback and motivation.' },
];

export const playerStats = [
  { label: 'Interface craft', value: 86 },
  { label: 'Product thinking', value: 78 },
  { label: 'Frontend build', value: 88 },
  { label: 'Visual stories', value: 72 },
];
