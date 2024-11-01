import { Diagnosis } from '../types';

import diagnosisData from '../../data/diagnoses';

const diaries: Diagnosis[] = diagnosisData;

const getDiagnoses = (): Diagnosis[] => {
    return diaries;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnosis
};