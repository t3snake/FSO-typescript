import { Gender, NewPatient } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
    if(!object || !(typeof(object) == 'object') ) {
        throw new Error('object not valid');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'occupation' in object && 'gender' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDob(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };

        return newPatient;
    }

    throw new Error('incomplete parameters');
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('name is invalid');
    }

    return name;
};

const parseDob = (dob: unknown): string => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('dateOfBirth is invalid');
    }

    return dob;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)){
        throw new Error('ssn is invalid');
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)){
        throw new Error('gender is invalid');
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)){
        throw new Error('occupation is invalid');
    }

    return occupation;
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