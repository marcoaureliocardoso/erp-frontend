import { Contract } from '../contract';

export interface ContractEventNote {
  id: number;
  note: string;
}
export interface ContractEventReminder {
  id: number;
  eventType: string;
  eventReminderDate: Date;
  contract: Contract;
  note: ContractEventNote;
  sent: boolean;
}
