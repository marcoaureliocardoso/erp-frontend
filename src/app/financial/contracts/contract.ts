import { Course } from '../courses/course';
import { Employee } from '../employees/employee';
import { Project } from '../projects/project';

export interface Contract {
  id: number;
  project: Project;
  course: Course;
  employee: Employee;
  startDate: Date;
  endDate: Date;
  informDeadlineOfFirstRecess: Date;
  informDeadlineOfSecondRecess: Date;
}
