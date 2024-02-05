export interface Project {
  id: number;
  name: string;
  grantorId: number;
  grantor: string;
  code: string;
  beginDate: Date;
  endDate: Date;
}
