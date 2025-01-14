import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Divider, Paper, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { EntryFormValues, Gender, Patient } from "../types";
import patientService from "../services/patients";
import EntryPart from "./EntryPart";
import AddEntryModal from "./AddEntryModal";
import axios from "axios";

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

    // props for patient form
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    
    const openModal = (): void => setModalOpen(true);
    
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    
    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if (id && patient) {
                const entry = await patientService.createEntryForPatient(id, values);
                const entries = patient.entries;

                entries.push(entry);
                setPatient({
                    ...patient,
                    entries: entries
                });

                setModalOpen(false);
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    if (e.response && 'error' in e.response?.data) {
                        setError(e.response?.data.error);
                    }
                    
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

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

                <AddEntryModal 
                  modalOpen={modalOpen}
                  onClose={closeModal}
                  onSubmit={submitNewEntry}
                  error={error}
                />
                <Button color="secondary" variant="contained" onClick={() => openModal()}>
                    Add New Entry
                </Button>

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