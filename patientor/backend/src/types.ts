export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other',
} 

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Error {
    error: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
    
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type SecuredPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;