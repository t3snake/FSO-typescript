export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnosis['code'][];
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export interface HealthCheckProps {
    healthCheckRating: HealthCheckRating;
    setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface HospitalProps {
    hospitalDate: string;
    setHospitalDate: React.Dispatch<React.SetStateAction<string>>;
    criteria: string;
    setCriteria: React.Dispatch<React.SetStateAction<string>>;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export interface OccupationalHealthcareProps {
    employerName: string;
    setEmployerName: React.Dispatch<React.SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;