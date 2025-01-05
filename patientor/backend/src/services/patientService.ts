import { NewPatient, Patient, SecuredPatient } from '../types';
import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';

const patients: Patient[] = patientData;

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

export default {
    getPatients,
    getSecuredPatients,
    addPatient,
    getPatientDetails
};