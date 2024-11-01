import express from 'express';
import { Response } from 'express';

import { Diagnosis } from '../types';

import diagnoseService from '../services/diagnoseServices';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  console.log('Fetching all diaries!');
  const diagnoses = diagnoseService.getDiagnoses();
  res.json(diagnoses);

});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;