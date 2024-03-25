import { Bond } from '../bond';

export interface BondEventNote {
  id: number;
  content: string;
}
export interface BondEventReminder {
  id: number;
  eventType: string;
  eventReminderDate: Date;
  bond: Bond;
  note: BondEventNote;
  sent: boolean;
}
