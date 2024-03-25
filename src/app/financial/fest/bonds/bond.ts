import { Course } from '../courses/course';
import { Employee } from '../employees/employee';
import { Project } from '../projects/project';
import { BondType } from './bondType';

export interface Bond {
  id: number;
  type: BondType;
  role: string;
  project: Project;
  course: Course;
  employee: Employee;
  startDate: Date;
  endDate: Date;
  informDeadlineOfFirstRecess: Date;
  informDeadlineOfSecondRecess: Date;
}
