export interface Alert {
  id: string;
  message: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  resolved: boolean;
  type: 'STRANGER' | 'FORBIDDEN' | 'DEVICE_OFFLINE';
  location: string;
  imageUrl?: string;
}
