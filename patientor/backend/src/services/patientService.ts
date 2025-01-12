import { Entry, EntryWithoutId, NewPatient, Patient, SecuredPatient } from '../types';
import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';

let patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return patients;
};

const getSecuredPatients = (): SecuredPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
    }) );
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
        entries: []
    };

    patients.push(newPatient);

    return newPatient;
};

const getPatientDetails = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addEntry = (id: string, entry: EntryWithoutId): Entry | undefined => {
    const newEntry = {
        id: uuid(),
        ...entry
    };
    
    let found: boolean = false;

    patients = patients.map(patient => {
        if(patient.id === id) {
            found = true;
            const entries = patient.entries;
            entries.push(newEntry);
            return {
                ...patient,
                entries: entries,
            };
        } else return patient;
    });

    if( !found ) {
        return undefined;
    } else {
        return newEntry;
    }
};

export default {
    getPatients,
    getSecuredPatients,
    addPatient,
    getPatientDetails,
    addEntry
};