import { ContractEventReminder } from './contract-event-reminder';

export const CONTRACT_EVENTS: ContractEventReminder[] = [
  { id: 1, contractId: 1, employeeGivenName: 'John', employeeSurname: 'Doe', type: 'startDate', date: new Date('2022-06-09'), note: '', sent: false && new Date('2022-06-09') <= new Date() },
  {
    id: 2,
    contractId: 1,
    employeeGivenName: 'John',
    employeeSurname: 'Doe',
    type: 'recess1DeadlineAlertDate',
    date: new Date('2022-11-23'),
    note: 'Some notes here.',
    sent: true && new Date('2022-11-23') <= new Date(),
  },
  {
    id: 3,
    contractId: 1,
    employeeGivenName: 'John',
    employeeSurname: 'Doe',
    type: 'recess1startDate',
    date: new Date('2022-12-23'),
    note: 'Some notes here.',
    sent: false && new Date('2022-12-23') <= new Date(),
  },
  { id: 4, contractId: 1, employeeGivenName: 'John', employeeSurname: 'Doe', type: 'recess1EndDate', date: new Date('2023-01-23'), note: '', sent: false && new Date('2023-01-23') <= new Date() },
  {
    id: 5,
    contractId: 1,
    employeeGivenName: 'John',
    employeeSurname: 'Doe',
    type: 'report1DeadlineAlertDate',
    date: new Date('2022-11-24'),
    note: 'Some notes here.',
    sent: true && new Date('2022-11-24') <= new Date(),
  },
  {
    id: 6,
    contractId: 1,
    employeeGivenName: 'John',
    employeeSurname: 'Doe',
    type: 'report1DeliveryDate',
    date: new Date('2022-12-09'),
    note: 'Some notes here.',
    sent: false && new Date('2022-12-09') <= new Date(),
  },
  { id: 7, contractId: 1, employeeGivenName: 'John', employeeSurname: 'Doe', type: 'recess2DeadlineAlertDate', date: new Date('2023-05-24'), note: '', sent: true && new Date('2023-05-24') <= new Date() },
  { id: 8, contractId: 1, employeeGivenName: 'John', employeeSurname: 'Doe', type: 'recess2startDate', date: new Date('2023-06-24'), note: '', sent: false && new Date('2023-06-24') <= new Date() },
  {
    id: 9,
    contractId: 1,
    employeeGivenName: 'John',
    employeeSurname: 'Doe',
    type: 'recess2EndDate',
    date: new Date('2023-07-24'),
    note: 'Some notes here.',
    sent: false && new Date('2023-07-24') <= new Date(),
  },
  { id: 10, contractId: 1, employeeGivenName: 'John', employeeSurname: 'Doe', type: 'report2DeadlineAlertDate', date: new Date('2023-05-25'), note: '', sent: true && new Date('2023-05-25') <= new Date() },
  {
    id: 11,
    contractId: 1,
    employeeGivenName: 'John',
    employeeSurname: 'Doe',
    type: 'report2DeliveryDate',
    date: new Date('2023-06-09'),
    note: 'Some notes here.',
    sent: false && new Date('2023-06-09') <= new Date(),
  },
  {
    id: 12,
    contractId: 1,
    employeeGivenName: 'John',
    employeeSurname: 'Doe',
    type: 'endDeadlineAlertDate',
    date: new Date('2023-07-09'),
    note: 'Some notes here.',
    sent: true && new Date('2023-07-09') <= new Date(),
  },
  { id: 13, contractId: 1, employeeGivenName: 'John', employeeSurname: 'Doe', type: 'endDate', date: new Date('2023-08-09'), note: '', sent: false && new Date('2023-08-09') <= new Date() },
  { id: 14, contractId: 2, employeeGivenName: 'Jane', employeeSurname: 'Smith', type: 'startDate', date: new Date('2024-09-23'), note: 'Some notes here.', sent: false && new Date('2024-09-23') <= new Date() },
  { id: 15, contractId: 2, employeeGivenName: 'Jane', employeeSurname: 'Smith', type: 'recess1DeadlineAlertDate', date: new Date('2025-03-07'), note: '', sent: true && new Date('2025-03-07') <= new Date() },
  { id: 16, contractId: 2, employeeGivenName: 'Jane', employeeSurname: 'Smith', type: 'recess1startDate', date: new Date('2025-04-07'), note: '', sent: false && new Date('2025-04-07') <= new Date() },
  {
    id: 17,
    contractId: 2,
    employeeGivenName: 'Jane',
    employeeSurname: 'Smith',
    type: 'recess1EndDate',
    date: new Date('2025-05-07'),
    note: 'Some notes here.',
    sent: false && new Date('2025-05-07') <= new Date(),
  },
  {
    id: 18,
    contractId: 2,
    employeeGivenName: 'Jane',
    employeeSurname: 'Smith',
    type: 'report1DeadlineAlertDate',
    date: new Date('2025-03-08'),
    note: 'Some notes here.',
    sent: true && new Date('2025-03-08') <= new Date(),
  },
  { id: 19, contractId: 2, employeeGivenName: 'Jane', employeeSurname: 'Smith', type: 'report1DeliveryDate', date: new Date('2025-03-23'), note: '', sent: false && new Date('2025-03-23') <= new Date() },
  {
    id: 20,
    contractId: 2,
    employeeGivenName: 'Jane',
    employeeSurname: 'Smith',
    type: 'recess2DeadlineAlertDate',
    date: new Date('2025-09-07'),
    note: 'Some notes here.',
    sent: true && new Date('2025-09-07') <= new Date(),
  },
  {
    id: 21,
    contractId: 2,
    employeeGivenName: 'Jane',
    employeeSurname: 'Smith',
    type: 'recess2startDate',
    date: new Date('2025-10-07'),
    note: 'Some notes here.',
    sent: false && new Date('2025-10-07') <= new Date(),
  },
  { id: 22, contractId: 2, employeeGivenName: 'Jane', employeeSurname: 'Smith', type: 'recess2EndDate', date: new Date('2025-11-07'), note: '', sent: false && new Date('2025-11-07') <= new Date() },
  { id: 23, contractId: 2, employeeGivenName: 'Jane', employeeSurname: 'Smith', type: 'report2DeadlineAlertDate', date: new Date('2025-09-08'), note: '', sent: true && new Date('2025-09-08') <= new Date() },
  {
    id: 24,
    contractId: 2,
    employeeGivenName: 'Jane',
    employeeSurname: 'Smith',
    type: 'report2DeliveryDate',
    date: new Date('2025-09-23'),
    note: 'Some notes here.',
    sent: false && new Date('2025-09-23') <= new Date(),
  },
  { id: 25, contractId: 2, employeeGivenName: 'Jane', employeeSurname: 'Smith', type: 'endDeadlineAlertDate', date: new Date('2025-10-23'), note: '', sent: true && new Date('2025-10-23') <= new Date() },
  { id: 26, contractId: 2, employeeGivenName: 'Jane', employeeSurname: 'Smith', type: 'endDate', date: new Date('2025-11-23'), note: 'Some notes here.', sent: false && new Date('2025-11-23') <= new Date() },
  { id: 27, contractId: 3, employeeGivenName: 'Jack', employeeSurname: 'Black', type: 'startDate', date: new Date('2020-04-17'), note: 'Some notes here.', sent: false && new Date('2020-04-17') <= new Date() },
  { id: 28, contractId: 3, employeeGivenName: 'Jack', employeeSurname: 'Black', type: 'recess1DeadlineAlertDate', date: new Date('2020-10-01'), note: '', sent: true && new Date('2020-10-01') <= new Date() },
  {
    id: 29,
    contractId: 3,
    employeeGivenName: 'Jack',
    employeeSurname: 'Black',
    type: 'recess1startDate',
    date: new Date('2020-11-01'),
    note: 'Some notes here.',
    sent: false && new Date('2020-11-01') <= new Date(),
  },
  { id: 30, contractId: 3, employeeGivenName: 'Jack', employeeSurname: 'Black', type: 'recess1EndDate', date: new Date('2020-12-01'), note: '', sent: false && new Date('2020-12-01') <= new Date() },
  { id: 31, contractId: 3, employeeGivenName: 'Jack', employeeSurname: 'Black', type: 'report1DeadlineAlertDate', date: new Date('2020-10-02'), note: '', sent: true && new Date('2020-10-02') <= new Date() },
  {
    id: 32,
    contractId: 3,
    employeeGivenName: 'Jack',
    employeeSurname: 'Black',
    type: 'report1DeliveryDate',
    date: new Date('2020-10-17'),
    note: 'Some notes here.',
    sent: false && new Date('2020-10-17') <= new Date(),
  },
  {
    id: 33,
    contractId: 3,
    employeeGivenName: 'Jack',
    employeeSurname: 'Black',
    type: 'recess2DeadlineAlertDate',
    date: new Date('2021-04-01'),
    note: 'Some notes here.',
    sent: true && new Date('2021-04-01') <= new Date(),
  },
  { id: 34, contractId: 3, employeeGivenName: 'Jack', employeeSurname: 'Black', type: 'recess2startDate', date: new Date('2021-05-01'), note: 'S', sent: false && new Date('2021-05-01') <= new Date() },
  {
    id: 35,
    contractId: 3,
    employeeGivenName: 'Jack',
    employeeSurname: 'Black',
    type: 'recess2EndDate',
    date: new Date('2021-06-01'),
    note: 'Some notes here.',
    sent: false && new Date('2021-06-01') <= new Date(),
  },
  {
    id: 36,
    contractId: 3,
    employeeGivenName: 'Jack',
    employeeSurname: 'Black',
    type: 'report2DeadlineAlertDate',
    date: new Date('2021-04-02'),
    note: 'Some notes here.',
    sent: true && new Date('2021-04-02') <= new Date(),
  },
  { id: 37, contractId: 3, employeeGivenName: 'Jack', employeeSurname: 'Black', type: 'report2DeliveryDate', date: new Date('2021-04-17'), note: '', sent: false && new Date('2021-04-17') <= new Date() },
  { id: 38, contractId: 3, employeeGivenName: 'Jack', employeeSurname: 'Black', type: 'endDeadlineAlertDate', date: new Date('2021-05-17'), note: '', sent: true && new Date('2021-05-17') <= new Date() },
  { id: 39, contractId: 3, employeeGivenName: 'Jack', employeeSurname: 'Black', type: 'endDate', date: new Date('2021-06-17'), note: 'Some notes here.', sent: false && new Date('2021-06-17') <= new Date() },
  { id: 40, contractId: 4, employeeGivenName: 'Jill', employeeSurname: 'White', type: 'startDate', date: new Date('2024-06-26'), note: '', sent: false && new Date('2024-06-26') <= new Date() },
  {
    id: 41,
    contractId: 4,
    employeeGivenName: 'Jill',
    employeeSurname: 'White',
    type: 'recess1DeadlineAlertDate',
    date: new Date('2024-12-10'),
    note: 'Some notes here.',
    sent: true && new Date('2024-12-10') <= new Date(),
  },
  {
    id: 42,
    contractId: 4,
    employeeGivenName: 'Jill',
    employeeSurname: 'White',
    type: 'recess1startDate',
    date: new Date('2025-01-10'),
    note: 'Some notes here.',
    sent: false && new Date('2025-01-10') <= new Date(),
  },
  { id: 43, contractId: 4, employeeGivenName: 'Jill', employeeSurname: 'White', type: 'recess1EndDate', date: new Date('2025-02-10'), note: '', sent: false && new Date('2025-02-10') <= new Date() },
  {
    id: 44,
    contractId: 4,
    employeeGivenName: 'Jill',
    employeeSurname: 'White',
    type: 'report1DeadlineAlertDate',
    date: new Date('2024-12-11'),
    note: 'Some notes here.',
    sent: true && new Date('2024-12-11') <= new Date(),
  },
  { id: 45, contractId: 4, employeeGivenName: 'Jill', employeeSurname: 'White', type: 'report1DeliveryDate', date: new Date('2024-12-26'), note: '', sent: false && new Date('2024-12-26') <= new Date() },
  { id: 46, contractId: 4, employeeGivenName: 'Jill', employeeSurname: 'White', type: 'recess2DeadlineAlertDate', date: new Date('2025-06-10'), note: '', sent: true && new Date('2025-06-10') <= new Date() },
  {
    id: 47,
    contractId: 4,
    employeeGivenName: 'Jill',
    employeeSurname: 'White',
    type: 'recess2startDate',
    date: new Date('2025-07-10'),
    note: 'Some notes here.',
    sent: false && new Date('2025-07-10') <= new Date(),
  },
  {
    id: 48,
    contractId: 4,
    employeeGivenName: 'Jill',
    employeeSurname: 'White',
    type: 'recess2EndDate',
    date: new Date('2025-08-10'),
    note: 'Some notes here.',
    sent: false && new Date('2025-08-10') <= new Date(),
  },
  { id: 49, contractId: 4, employeeGivenName: 'Jill', employeeSurname: 'White', type: 'report2DeadlineAlertDate', date: new Date('2025-06-11'), note: '', sent: true && new Date('2025-06-11') <= new Date() },
  {
    id: 50,
    contractId: 4,
    employeeGivenName: 'Jill',
    employeeSurname: 'White',
    type: 'report2DeliveryDate',
    date: new Date('2025-06-26'),
    note: 'Some notes here.',
    sent: false && new Date('2025-06-26') <= new Date(),
  },
  {
    id: 51,
    contractId: 4,
    employeeGivenName: 'Jill',
    employeeSurname: 'White',
    type: 'endDeadlineAlertDate',
    date: new Date('2025-07-26'),
    note: 'Some notes here.',
    sent: true && new Date('2025-07-26') <= new Date(),
  },
  { id: 52, contractId: 4, employeeGivenName: 'Jill', employeeSurname: 'White', type: 'endDate', date: new Date('2025-08-26'), note: '', sent: false && new Date('2025-08-26') <= new Date() },
  { id: 53, contractId: 5, employeeGivenName: 'Jim', employeeSurname: 'Green', type: 'startDate', date: new Date('2023-11-29'), note: '', sent: false && new Date('2023-11-29') <= new Date() },
  {
    id: 54,
    contractId: 5,
    employeeGivenName: 'Jim',
    employeeSurname: 'Green',
    type: 'recess1DeadlineAlertDate',
    date: new Date('2024-05-13'),
    note: 'Some notes here.',
    sent: true && new Date('2024-05-13') <= new Date(),
  },
  { id: 55, contractId: 5, employeeGivenName: 'Jim', employeeSurname: 'Green', type: 'recess1startDate', date: new Date('2024-06-13'), note: '', sent: false && new Date('2024-06-13') <= new Date() },
  {
    id: 56,
    contractId: 5,
    employeeGivenName: 'Jim',
    employeeSurname: 'Green',
    type: 'recess1EndDate',
    date: new Date('2024-07-13'),
    note: 'Some notes here.',
    sent: false && new Date('2024-07-13') <= new Date(),
  },
  {
    id: 57,
    contractId: 5,
    employeeGivenName: 'Jim',
    employeeSurname: 'Green',
    type: 'report1DeadlineAlertDate',
    date: new Date('2024-05-14'),
    note: 'Some notes here.',
    sent: true && new Date('2024-05-14') <= new Date(),
  },
  { id: 58, contractId: 5, employeeGivenName: 'Jim', employeeSurname: 'Green', type: 'report1DeliveryDate', date: new Date('2024-05-29'), note: '', sent: false && new Date('2024-05-29') <= new Date() },
  {
    id: 59,
    contractId: 5,
    employeeGivenName: 'Jim',
    employeeSurname: 'Green',
    type: 'recess2DeadlineAlertDate',
    date: new Date('2024-11-13'),
    note: 'Some notes here.',
    sent: true && new Date('2024-11-13') <= new Date(),
  },
  { id: 60, contractId: 5, employeeGivenName: 'Jim', employeeSurname: 'Green', type: 'recess2startDate', date: new Date('2024-12-13'), note: '', sent: false && new Date('2024-12-13') <= new Date() },
  { id: 61, contractId: 5, employeeGivenName: 'Jim', employeeSurname: 'Green', type: 'recess2EndDate', date: new Date('2025-01-13'), note: '', sent: false && new Date('2025-01-13') <= new Date() },
  {
    id: 62,
    contractId: 5,
    employeeGivenName: 'Jim',
    employeeSurname: 'Green',
    type: 'report2DeadlineAlertDate',
    date: new Date('2024-11-14'),
    note: 'Some notes here.',
    sent: true && new Date('2024-11-14') <= new Date(),
  },
  {
    id: 63,
    contractId: 5,
    employeeGivenName: 'Jim',
    employeeSurname: 'Green',
    type: 'report2DeliveryDate',
    date: new Date('2024-11-29'),
    note: 'Some notes here.',
    sent: false && new Date('2024-11-29') <= new Date(),
  },
  { id: 64, contractId: 5, employeeGivenName: 'Jim', employeeSurname: 'Green', type: 'endDeadlineAlertDate', date: new Date('2024-12-29'), note: '', sent: true && new Date('2024-12-29') <= new Date() },
  { id: 65, contractId: 5, employeeGivenName: 'Jim', employeeSurname: 'Green', type: 'endDate', date: new Date('2025-01-29'), note: 'Some notes here.', sent: false && new Date('2025-01-29') <= new Date() },
];