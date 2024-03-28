import { Education } from "../../../shared/education";
import { Bond } from "../bonds/bond";

export interface Employee {
  id: number;
  givenName: string;
  surname: string;
  identityNumber: string;
  birthDate: Date;
  education: Education;
  address: string;
  email: string;
  bonds: Bond[];
}
