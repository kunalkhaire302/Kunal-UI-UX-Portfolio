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
  { src: '/photos/study-01.svg', alt: 'Abstract placeholder for a future street photograph', title: 'Add photograph 01', location: 'Add location', camera: 'Add camera', settings: 'Add settings', accent: '#31d7ff' },
  { src: '/photos/study-02.svg', alt: 'Abstract placeholder for a future architecture photograph', title: 'Add photograph 02', location: 'Add location', camera: 'Add camera', settings: 'Add settings', accent: '#ffb15c' },
  { src: '/photos/study-03.svg', alt: 'Abstract placeholder for a future nature photograph', title: 'Add photograph 03', location: 'Add location', camera: 'Add camera', settings: 'Add settings', accent: '#8b5cf6' },
  { src: '/photos/study-04.svg', alt: 'Abstract placeholder for a future night photograph', title: 'Add photograph 04', location: 'Add location', camera: 'Add camera', settings: 'Add settings', accent: '#6ee7b7' },
  { src: '/photos/study-05.svg', alt: 'Abstract placeholder for a future portrait photograph', title: 'Add photograph 05', location: 'Add location', camera: 'Add camera', settings: 'Add settings', accent: '#ff7a90' },
  { src: '/photos/study-06.svg', alt: 'Abstract placeholder for a future detail photograph', title: 'Add photograph 06', location: 'Add location', camera: 'Add camera', settings: 'Add settings', accent: '#7dd3fc' },
];

export const videos = [
  { title: 'Add project film 01', duration: '00:00', poster: '/videos/poster-01.svg', src: '', caption: 'Placeholder — add a captioned MP4 or WebM.' },
  { title: 'Add project film 02', duration: '00:00', poster: '/videos/poster-02.svg', src: '', caption: 'Placeholder — add a captioned MP4 or WebM.' },
  { title: 'Add project film 03', duration: '00:00', poster: '/videos/poster-03.svg', src: '', caption: 'Placeholder — add a captioned MP4 or WebM.' },
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
