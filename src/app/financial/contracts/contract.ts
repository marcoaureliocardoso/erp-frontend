export interface Contract {
  id: number;
  grantorName: string;
  projectName: string;
  courseName: string;
  employeeId: number;
  employeeGivenName: string;
  employeeSurname: string;
  beginDate: Date;
  endDate: Date;
  informDeadlineOfFirstRecess: Date;
  informDeadlineOfSecondRecess: Date;
}
