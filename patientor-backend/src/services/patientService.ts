import { Patient, SecuredPatient } from '../types';

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

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    getSecuredPatients,
    addPatient
};