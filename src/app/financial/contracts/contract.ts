export interface Contract {
  id: number;
  grantorId: number;
  grantorName: string;
  projectId: number;
  projectName: string;
  courseId: number;
  courseName: string;
  employeeId: number;
  employeeGivenName: string;
  employeeSurname: string;
  beginDate: Date;
  endDate: Date;
  informDeadlineOfFirstRecess: Date;
  informDeadlineOfSecondRecess: Date;
}
