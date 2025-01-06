import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container, List, ListItem, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Gender, Patient, Entry } from "../types";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnosis";

const DiagnosisList = ({code}: {code: string}) => {
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const fetchDiagnosis = async () => {
            if (code) {
                const diagnosis = await diagnosisService.getDiagnosis(code);
                if (diagnosis){
                    setDescription(diagnosis.name);
                }
            }
        };
        fetchDiagnosis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ListItem id={code}>
            {code} {description}
        </ListItem>
    );
};

const EntryPart = ({entry}: {entry: Entry}) => {
    return (
        <div key={entry.id}>
        {entry.date} {entry.description}
        <List>
            {entry.diagnosisCodes?.map(code => 
                <>
                    <DiagnosisList code={code} />
                </> 
            )}
        </List>
    </div>
    );
};

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

                <Typography variant="h5">entries</Typography>
                <Typography>
                {
                    patient.entries.map(entry => {
                        return (
                            <EntryPart entry={entry} />
                        );                                      
                    })
                }
                </Typography>
                
            </>     
            }
        </Container>
    );
};

export default PatientPage;