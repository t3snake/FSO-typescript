import express from 'express';
import { Response } from 'express';
import { z } from 'zod';

import { NewPatient, Patient, SecuredPatient } from '../types';

import patientService from '../services/patientService';
import { newEntrySchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<SecuredPatient[]>) => {
  console.log('Fetching all patients!');
  const patients = patientService.getSecuredPatients();
  res.json(patients);

});

router.post('/', (req, res) => {
    try{
        console.log('Saving a diary!');
        const newPatient: NewPatient = newEntrySchema.parse(req.body);
        const patient: Patient = patientService.addPatient(newPatient);
    
        res.json(patient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {      
            res.status(400).send({ error: error.issues });    
        } else {      
            res.status(400).send({ error: 'unknown error' });    
        }  
    }
});

export default router;