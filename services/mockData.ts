
import { Site, Worker, Role, Team } from '../types';

export const MOCK_SITES: Site[] = [
  { id: 'S1', name: 'Elite Towers Salem', latitude: 11.485444, longitude: 77.881000, radiusMeters: 300 },
  { id: 'S2', name: 'Grand Mall Site', latitude: 11.485300, longitude: 77.882000, radiusMeters: 300 },
  // Testing coordinates provided by user
  { id: 'S3', name: 'Salem Main Project', latitude: 11.485444, longitude: 77.881000, radiusMeters: 300 }
];

export const MOCK_TEAMS: Team[] = [
  { id: 'T1', name: 'Salem Mason A', category: 'Masonry', representative: 'Raj Kumar' },
  { id: 'T2', name: 'Salem Mason B', category: 'Masonry', representative: 'Suresh V' }
];

export const MOCK_WORKERS: Worker[] = [
  { id: 'W1', name: 'Anil Kumar', role: Role.MASON, teamId: 'T1', dailyRate: 800 },
  { id: 'W2', name: 'Sunil Sethi', role: Role.MASON, teamId: 'T1', dailyRate: 800 },
  { id: 'W3', name: 'Ravi Prakash', role: Role.HELPER, teamId: 'T1', dailyRate: 500 },
  { id: 'W4', name: 'Vikram Singh', role: Role.HELPER, teamId: 'T1', dailyRate: 500 },
  { id: 'W5', name: 'Mani K', role: Role.MASON, teamId: 'T2', dailyRate: 850 }
];
