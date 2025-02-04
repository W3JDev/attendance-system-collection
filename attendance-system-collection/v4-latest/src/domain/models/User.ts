export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN'
}

export interface BiometricData {
  faceData?: string;
  fingerprint?: string;
}

export interface Schedule {
  id: string;
  startTime: Date;
  endTime: Date;
  weekDays: number[];
  flexibility: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  schedules: Schedule[];
  biometricData?: BiometricData;
  createdAt: Date;
  updatedAt: Date;
}