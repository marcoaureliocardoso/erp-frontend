import { Bond } from '../bond';
import { TermType } from './termType';

export interface Term {
  id: number;
  type: TermType;
  path: string;
  bond: Bond;
}
