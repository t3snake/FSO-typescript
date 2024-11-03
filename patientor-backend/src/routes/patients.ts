import express from 'express';
import { Response } from 'express';

import { NewPatient, Patient, SecuredPatient } from '../types';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<SecuredPatient[]>) => {
  console.log('Fetching all patients!');
  const patients = patientService.getSecuredPatients();
  res.json(patients);

});

router.post('/', (req, res) => {
  console.log('Saving a diary!');
  const newPatient: NewPatient = req.body as NewPatient;
  const patient: Patient = patientService.addPatient(newPatient);

  res.json(patient);
});

export default router;