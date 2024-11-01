import express from 'express';
import { Response } from 'express';

import { Diagnosis } from '../types';

import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  console.log('Fetching all diagnoses!');
  const diagnoses = diagnoseService.getDiagnoses();
  res.json(diagnoses);

});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;