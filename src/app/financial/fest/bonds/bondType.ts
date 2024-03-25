export enum BondType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  TEMPORARY = 'TEMPORARY',
  INTERNSHIP = 'INTERNSHIP',
}

export const BondTypeLabels: { [key in BondType]: string } = {
  [BondType.FULL_TIME]: 'Tempo Integral',
  [BondType.PART_TIME]: 'Meio Período',
  [BondType.TEMPORARY]: 'Temporário',
  [BondType.INTERNSHIP]: 'Estágio',
};

export const BondTypeFromString = (value: string): BondType => {
  switch (value) {
    case 'FULL_TIME':
      return BondType.FULL_TIME;
    case 'PART_TIME':
      return BondType.PART_TIME;
    case 'TEMPORARY':
      return BondType.TEMPORARY;
    case 'INTERNSHIP':
      return BondType.INTERNSHIP;
    default:
      return BondType.FULL_TIME;
  }
};
