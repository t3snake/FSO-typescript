import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Divider, Paper, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Gender, Patient } from "../types";
import patientService from "../services/patients";
import EntryPart from "./EntryPart";


const PatientPage = () => {
    const id  = useParams<string>().id;
    const [patient, setPatient] = useState<Patient | undefined>(undefined);
    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                const patient = await patientService.getPatient(id);
                setPatient(patient);
            }
        };
        fetchPatient();
    }, [id]);

    return (
        <Paper 
          elevation={2} 
          square={false} 
          style={ { marginTop: "1em", marginBottom: "1em", padding: "1em"} } 
        >
            {!patient && <div>Loading...</div>}
            {patient && 
            <>
                <Typography variant="h4">
                    {patient.name}
                    {patient.gender == Gender.Male && <MaleIcon />} 
                    {patient.gender == Gender.Female && <FemaleIcon />} 
                    {patient.gender == Gender.Other && <TransgenderIcon />} 
                </Typography>
                <Typography style={ { marginLeft: "1em" } }>
                    ssn: {patient.ssn}
                </Typography>
                <Typography style={ { marginLeft: "1em" } }>
                    occupation: {patient.occupation}
                </Typography>

                <Divider style={ { margin: "1em" } } />

                <Typography variant="h5">
                    entries
                </Typography>

                <div>
                {
                    patient.entries.map(entry => {
                        return (
                            <EntryPart key={entry.id} entry={entry} />
                        );                                      
                    })
                }
                </div>
            </>     
            }
        </Paper>
    );
};

export default PatientPage;