export interface ReleaseItem {
  code: string;
  title: string;
  artist: string;
  year: string;
  speed: string;
  weight: string;
  edition: string;
  format: string;
  genre: string;
  palette: {
    accent: string;
    secondary: string;
    bg: string;
  };
  tracklist: string[];
}

export interface RosterItem {
  id: string;
  name: string;
  discipline: string;
  location: string;
  editionsCount: string;
  activeYears: string;
}

export interface TourDateItem {
  id: string;
  date: string;
  city: string;
  venue: string;
  artists: string;
  format: string;
  status: string;
  statusType: 'amber' | 'teal' | 'muted';
}
