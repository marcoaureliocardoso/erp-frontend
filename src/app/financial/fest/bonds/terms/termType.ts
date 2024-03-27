export enum TermType {
  EMPLOYMENT = 'EMPLOYMENT',
  ADDENDUM = 'ADDENDUM',
  TERMINATION = 'TERMINATION',
}

export const TermTypeLabels: { [key in TermType]: string } = {
  [TermType.EMPLOYMENT]: 'Contrato de Trabalho',
  [TermType.ADDENDUM]: 'Aditivo',
  [TermType.TERMINATION]: 'Rescisão',
};

export const TermTypeFromString = (value: string): TermType => {
  switch (value) {
    case 'EMPLOYMENT':
      return TermType.EMPLOYMENT;
    case 'ADDENDUM':
      return TermType.ADDENDUM;
    case 'TERMINATION':
      return TermType.TERMINATION;
    default:
      return TermType.EMPLOYMENT;
  }
};
