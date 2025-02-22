import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody, Paper } from '@mui/material';
import axios from 'axios';

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import { Link } from "react-router-dom";

interface Props {
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patients, setPatients } : Props ) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewPatient = async (values: PatientFormValues) => {
        try {
            const patient = await patientService.createPatient(values);
            setPatients(patients.concat(patient));
            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    return (
        <Paper color="primary" className="App" style={{ marginTop: "1em", padding: "1em" }}>
            <Box>
                    <Typography align="center" variant="h5">
                        Patient list
                    </Typography>
            </Box>
            <Table style={{ marginBottom: "1em" }} color="primary">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Occupation</TableCell>
                        <TableCell>Health Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {Object.values(patients).map((patient: Patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>
                                <Link to={`/patients/${patient.id}`}>
                                    {patient.name}
                                </Link> 
                            </TableCell>
                            <TableCell>{patient.gender}</TableCell>
                            <TableCell>{patient.occupation}</TableCell>
                            <TableCell>
                                <HealthRatingBar showText={false} rating={1} />
                            </TableCell>
                        </TableRow>
                ))}
                </TableBody>
            </Table>
            <AddPatientModal
                modalOpen={modalOpen}
                onSubmit={submitNewPatient}
                error={error}
                onClose={closeModal}
            />
            <Button color="secondary" variant="contained" onClick={() => openModal()}>
                Add New Patient
            </Button>
        </Paper>
    );
};

export default PatientListPage;
