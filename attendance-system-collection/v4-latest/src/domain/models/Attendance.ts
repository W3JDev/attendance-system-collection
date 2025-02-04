export enum AttendanceType {
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT'
}

export enum VerificationMethod {
  FACIAL_RECOGNITION = 'FACIAL_RECOGNITION',
  QR_CODE = 'QR_CODE',
  MANUAL = 'MANUAL'
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  timestamp: Date;
  type: AttendanceType;
  location: GeoLocation;
  verificationMethod: VerificationMethod;
  deviceInfo?: string;
  notes?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}