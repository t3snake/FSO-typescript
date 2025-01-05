import express from 'express';
import { Response } from 'express';
import { z } from 'zod';

import { NewPatient, Patient, SecuredPatient, Error } from '../types';

import patientService from '../services/patientService';
import { newEntrySchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<SecuredPatient[]>) => {
  console.log('Fetching all patients!');
  const patients = patientService.getSecuredPatients();
  res.json(patients);

});

router.post('/', (req, res: Response<Patient | Error>) => {
    try{
        console.log('Adding a patient!');
        const newPatient: NewPatient = newEntrySchema.parse(req.body);
        const patient: Patient = patientService.addPatient(newPatient);
    
        res.json(patient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {      
            res.status(400).send({ error: error.message });    
        } else {      
            res.status(400).send({ error: 'unknown error' });    
        }  
    }
});

router.get('/:id', (req, res: Response<Patient | Error>) => {
    const id = req.params.id;
    const patient = patientService.getPatientDetails(id);

    if ( patient === undefined ) {
        res.status(404).send({ error: `${id} id not found`});
    } else {
        res.json(patient);
    }
});

export default router;