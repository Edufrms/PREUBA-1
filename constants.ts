
import { Fair } from './types';

export const PRELOADED_FAIRS: Fair[] = [
  { id: 'mwc-24', name: 'Mobile World Congress 2024', location: 'Barcelona, España', date: 'Feb 26 - Feb 29' },
  { id: 'ces-24', name: 'CES 2024', location: 'Las Vegas, USA', date: 'Jan 9 - Jan 12' },
  { id: 'ifa-24', name: 'IFA Berlin 2024', location: 'Berlin, Alemania', date: 'Sep 6 - Sep 10' },
  { id: 'fitur-24', name: 'FITUR 2024', location: 'Madrid, España', date: 'Jan 24 - Jan 28' },
  { id: 'ibc-24', name: 'IBC 2024', location: 'Amsterdam, Países Bajos', date: 'Sep 13 - Sep 16' },
  { id: 'hannover-24', name: 'Hannover Messe 2024', location: 'Hannover, Alemania', date: 'Apr 22 - Apr 26' }
];

export const STORAGE_KEY = 'fairagenda_data';
