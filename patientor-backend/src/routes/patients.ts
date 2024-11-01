import express from 'express';
import { Response } from 'express';

import { SecuredPatient } from '../types';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<SecuredPatient[]>) => {
  console.log('Fetching all patients!');
  const patients = patientService.getSecuredPatients();
  res.json(patients);

});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;