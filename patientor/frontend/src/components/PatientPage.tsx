import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Gender, Patient } from "../types";
import patientService from "../services/patients";

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
        <Container style={ { marginTop: "1em"} } >
            {!patient && <div>Loading...</div>}
            {patient && 
            <>
                <Typography align="center" variant="h4">
                    {patient.name}
                    {patient.gender == Gender.Male && <MaleIcon />} 
                    {patient.gender == Gender.Female && <FemaleIcon />} 
                    {patient.gender == Gender.Other && <TransgenderIcon />} 
                </Typography>
                <Typography align="center">ssn: {patient.ssn}</Typography>
                <Typography align="center">occupation: {patient.occupation}</Typography>
            </>     
            }
        </Container>
    );
};

export default PatientPage;