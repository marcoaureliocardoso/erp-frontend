export enum Education {
    CHILDHOOD = 'CHILDHOOD',
    ELEMENTARY = 'ELEMENTARY',
    HIGH_SCHOOL = 'HIGH_SCHOOL',
    TECHNICAL = 'TECHNICAL',
    UNDERGRADUATE = 'UNDERGRADUATE',
    GRADUATED = 'GRADUATED',
    SPECIALIZATION = 'SPECIALIZATION',
    MASTER = 'MASTER',
    DOCTORATE = 'DOCTORATE',
    ADULT_EDUCATION = 'ADULT_EDUCATION',
    UNSPECIFIED = 'UNSPECIFIED',
}

export const EducationLabels: { [key in Education]: string } = {
    [Education.CHILDHOOD]: 'Ensino Infantil',
    [Education.ELEMENTARY]: 'Ensino Fundamental',
    [Education.HIGH_SCHOOL]: 'Ensino Médio',
    [Education.TECHNICAL]: 'Ensino Técnico',
    [Education.UNDERGRADUATE]: 'Graduação',
    [Education.GRADUATED]: 'Graduado',
    [Education.SPECIALIZATION]: 'Especialização',
    [Education.MASTER]: 'Mestrado',
    [Education.DOCTORATE]: 'Doutorado',
    [Education.ADULT_EDUCATION]: 'Educação de Adultos',
    [Education.UNSPECIFIED]: 'Não Especificado',
};

export const EducationFromString = (value: string): Education => {
    switch (value) {
        case 'CHILDHOOD':
            return Education.CHILDHOOD;
        case 'ELEMENTARY':
            return Education.ELEMENTARY;
        case 'HIGH_SCHOOL':
            return Education.HIGH_SCHOOL;
        case 'TECHNICAL':
            return Education.TECHNICAL;
        case 'UNDERGRADUATE':
            return Education.UNDERGRADUATE;
        case 'GRADUATED':
            return Education.GRADUATED;
        case 'SPECIALIZATION':
            return Education.SPECIALIZATION;
        case 'MASTER':
            return Education.MASTER;
        case 'DOCTORATE':
            return Education.DOCTORATE;
        case 'ADULT_EDUCATION':
            return Education.ADULT_EDUCATION;
        case 'UNSPECIFIED':
            return Education.UNSPECIFIED;
        default:
            return Education.UNSPECIFIED;
    }
}
