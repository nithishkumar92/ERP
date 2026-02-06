
export enum Role {
  MASON = 'Mason',
  HELPER = 'Helper',
  SUPERVISOR = 'Supervisor'
}

export interface Team {
  id: string;
  name: string;
  category: string;
  representative: string;
}

export interface Worker {
  id: string;
  name: string;
  role: Role;
  teamId: string;
  dailyRate: number;
}

export interface Site {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
}

export interface PunchRecord {
  id: string;
  workerId: string;
  siteId: string;
  teamId: string;
  punchInTime: string;
  punchOutTime?: string;
  photoIn?: string;
  photoOut?: string;
  date: string;
}

export interface Advance {
  id: string;
  workerId: string;
  teamId: string;
  amount: number;
  date: string;
  reason?: string;
}
