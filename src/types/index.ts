
export type UserRole = 'admin' | 'staff';

export interface Prisoner {
  id: string;
  inmate_id: string;
  first_name: string;
  last_name: string;
  dob: string;
  crime: string;
  sentence_start: string;
  sentence_end: string;
  status: 'incarcerated' | 'released' | 'parole';
  cell_id: string | null;
}

export interface Cell {
  id: string;
  cell_number: string;
  block: string;
  capacity: number;
  occupancy: number;
  security_level: 'minimum' | 'medium' | 'maximum';
}

export interface Staff {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  contact: string;
  shift: 'morning' | 'evening' | 'night';
}

export interface Visit {
  id: string;
  prisoner_id: string;
  visitor_name: string;
  relationship: string;
  date: string;
  time_in: string;
  time_out: string;
}

export interface DashboardStats {
  totalPrisoners: number;
  totalCapacity: number;
  occupancyRate: number;
  releasingThisMonth: number;
}

export interface ActivityItem {
  id: string;
  description: string;
  type: 'admission' | 'transfer' | 'release' | 'visit' | 'incident';
  timestamp: string;
}
