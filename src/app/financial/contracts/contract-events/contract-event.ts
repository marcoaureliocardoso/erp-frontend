export interface ContractEvent {
  id: number;
  contractId: number;
  employeeGivenName: string;
  employeeSurname: string;
  type: string;
  date: Date;
  note: string;
  sent: boolean;
}
