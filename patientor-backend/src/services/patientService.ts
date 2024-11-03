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
        ...patient
    };

    patients.push(newPatient);

    return newPatient;
};

export default {
    getPatients,
    getSecuredPatients,
    addPatient
};