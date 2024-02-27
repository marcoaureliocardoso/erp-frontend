import { Contract } from '../contract';

export interface ContractEventNote {
  id: number;
  content: string;
}
export interface ContractEventReminder {
  id: number;
  eventType: string;
  eventReminderDate: Date;
  contract: Contract;
  note: ContractEventNote;
  sent: boolean;
}
