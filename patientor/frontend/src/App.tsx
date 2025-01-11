import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import type {} from '@mui/material/themeCssVarsAugmentation';
import { Button, Divider, Container, Typography, ThemeProvider } from '@mui/material';

import {createTheme} from '@mui/material/styles';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

let theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#f5f5dc"
        },
        secondary: {
            main: "#715a41"
        },
        error: {
            main: "#f5e9dc"
        },
        success: {
            main: "#e9f5dc"
        },
        warning: {
            main: "#f0fbf1"
        },
        info: {
            main: "#dcf5f5"
        },
        background: {
            default: "#fff8f4",
            paper: "#f9ece0"
        }
    },
});

  
theme = createTheme(theme, {
    // Custom colors created with augmentColor go here
    palette: {
        salmon: theme.palette.augmentColor({
            color: {
                main: '#FF5733',
            },
            name: 'salmon',
        }),
    },
});


const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
            <Container color="primary">
                <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                    Patientor
                </Typography>
                <Button component={Link} to="/" variant="contained" color="info">
                    Home
                </Button>
                <Divider hidden />
                <Routes>
                    <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
                    <Route path="/patients/:id" element={<PatientPage />} />
                </Routes>
            </Container>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
