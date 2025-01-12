import { z } from 'zod';
import { Gender, NewPatient, EntryWithoutId, Diagnosis, HealthCheckRating } from "./types";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
    if(!object || !(typeof(object) == 'object') ) {
        throw new Error('object not valid');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'occupation' in object && 'gender' in object) {
        const newPatient: NewPatient = {
            name: parseStringProperty(object.name, "name invalid"),
            dateOfBirth: parseDob(object.dateOfBirth),
            ssn: parseStringProperty(object.ssn, 'ssn invalid'),
            gender: parseGender(object.gender),
            occupation: parseStringProperty(object.occupation, "occupation invalid")
        };

        return newPatient;
    }

    throw new Error('incomplete parameters');
};

const parseStringProperty = (property: unknown, errorMessage: string): string => {
    if(!property || !isString(property)){
        throw new Error(errorMessage);
    }
    return property;
};

const parseDob = (dob: unknown): string => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('dateOfBirth is invalid');
    }

    return dob;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)){
        throw new Error('gender is invalid');
    }

    return gender;
};

const isGender = (gender: string): gender is Gender => {
    return (Object.values(Gender).map(g => g.toString()).includes(gender));
};

const isDate = (dob: string): boolean => {
    return Boolean(Date.parse(dob));
};

const isString = (text: unknown): text is string => {
    if (typeof(text) === 'string' || text instanceof String) {
        return true;
    }
    return false;
};

export const toNewEntry = (entry: unknown): EntryWithoutId => {
    if (!entry || typeof entry !== 'object') {
        throw new Error("Entry undefined");
    }
    if ('description' in entry && 'date' in entry && 'specialist' in entry && 'diagnosisCodes' in entry) {
        const newEntry = {
            description: parseStringProperty(entry.description, "description is invalid"),
            date: parseDate(entry.date),
            specialist: parseStringProperty(entry.specialist, "specialist invalid"),
            diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
        };
        if ('type' in entry) {
            const type = parseType(entry.type);
            switch(type) {
                case "HealthCheck":
                    if ('healthCheckRating' in entry){
                        return {
                            ...newEntry,
                            type: "HealthCheck",
                            healthCheckRating: parseHealthRating(entry.healthCheckRating)
                        };

                    } else {
                        throw new Error("healthCheckRating missing");
                    }
                case "Hospital":
                    if ('discharge' in entry){
                        return {
                            ...newEntry,
                            type: "Hospital",
                            discharge: parseDischarge(entry.discharge) 
                        };

                    } else {
                        throw new Error("discharge missing");
                    }
                case "OccupationalHealthcare":
                    if ('sickLeave' in entry && 'employerName' in entry) {
                        return {
                            ...newEntry,
                            type: "OccupationalHealthcare",
                            employerName: parseStringProperty(entry.employerName, "employerName invalid"),
                            sickLeave: parseSickLeave(entry.sickLeave)
                        };
                    } else if ('employerName' in entry) {
                        return {
                            ...newEntry,
                            type: "OccupationalHealthcare",
                            employerName: parseStringProperty(entry.employerName, "employerName invalid"),
                        };
                    } else {
                        throw new Error("invalid OccupationalHealthcare type");
                    }
                default:
                    assertNever(type);
            }
        } 
        throw new Error("missing type parameter");
    } else {
        throw new Error("Entry doesnt have all relevant parameters");
    }

};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('dateOfBirth is invalid');
    }

    return date;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseType = (object: unknown): EntryWithoutId['type'] => {
    const obj = parseStringProperty(object, "type invalid");

    if ( obj === "Hospital" || obj === "HealthCheck" || obj === "OccupationalHealthcare") {
        return obj;
    } else {
        throw new Error("Invalid type value");
    }
};

const parseHealthRating = (object: unknown): HealthCheckRating => {
    if (object == undefined || typeof object !== 'number' || !isHealthRating(object)){
        console.log(typeof object !== 'number');
        throw new Error('health rating is invalid');
    }
    return object;
};

const isHealthRating = (rating: number): rating is HealthCheckRating => {
    return [0, 1, 2, 3].includes(rating);
};

interface Discharge {
    date: string;
    criteria: string;
}

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object != 'object'){
        throw new Error("discharge undefined");
    }

    if('date' in object && 'criteria' in object){
        return {
            date: parseDate(object.date),
            criteria: parseStringProperty(object.criteria, "discharge criteria invalid")
        };
    } else {
        throw new Error("Malformed discharge");
    }

};

interface SickLeave {
    startDate: string; 
    endDate: string;
}

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object != 'object') {
        throw new Error("invalid sick leave");
    }

    if ('startDate' in object && 'endDate' in object) {
        return {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate)
        };
    } else {
        throw new Error("malformed sick leave");
    }
};