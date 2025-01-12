import express from 'express';
import { Response } from 'express';
import { z } from 'zod';

import { NewPatient, Patient, SecuredPatient, Error, Entry, EntryWithoutId } from '../types';

import patientService from '../services/patientService';
import { newPatientSchema, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<SecuredPatient[]>) => {
  console.log('Fetching all patients!');
  const patients = patientService.getSecuredPatients();
  res.json(patients);

});

router.post('/', (req, res: Response<Patient | Error>) => {
    try{
        console.log('Adding a patient!');
        const newPatient: NewPatient = newPatientSchema.parse(req.body);
        const patient: Patient = patientService.addPatient(newPatient);
    
        res.json(patient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {      
            res.status(400).send({ error: error.message });    
        } else if (error instanceof Error) {
            res.status(400).send({ error: error.message});
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

router.post('/:id/entries', (req, res: Response<Entry | Error>) => {
    try{
        const id = req.params.id;
        console.log(`Adding entry to id: ${id}`);
    
        const newEntry: EntryWithoutId = toNewEntry(req.body);
        const entry: Entry | undefined = patientService.addEntry(id, newEntry);
    
        if( !entry ){
            res.status(404).send({ error: `${id} id not found`});
        } else {
            res.json(entry);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(400).send({ error: "unnown error" });
        }
    }
    
});

export default router;