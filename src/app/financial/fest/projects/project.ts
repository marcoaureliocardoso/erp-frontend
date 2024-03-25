import { Grantor } from './grantors/grantor';

export interface Project {
  id: number;
  name: string;
  grantor: Grantor;
  code: string;
  startDate: Date;
  endDate: Date;
}
