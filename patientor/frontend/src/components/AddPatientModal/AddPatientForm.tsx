import { useState, SyntheticEvent } from "react";

import {  TextField, MenuItem, Grid, Button } from '@mui/material';

import { PatientFormValues, Gender } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption{
    value: Gender;
    label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
    value: v, label: v.toString()
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [ssn, setSsn] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState(Gender.Male);

    const onGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
        const value = event.target.value;
        const gender = Object.values(Gender).find(g => g.toString() === value);
        if (gender) {
            setGender(gender);
        }
        }
    };

    const addPatient = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            name,
            occupation,
            ssn,
            dateOfBirth,
            gender
        });
    };

    return (
        <form onSubmit={addPatient}>
            <TextField
                label="Name"
                color="secondary"
                fullWidth 
                value={name}
                onChange={({ target }) => setName(target.value)}
            />
            <TextField
                label="Social security number"
                color="secondary"
                fullWidth
                value={ssn}
                onChange={({ target }) => setSsn(target.value)}
                style={{ marginTop: 10 }}
            />
            <TextField
                label="Date of birth"
                color="secondary"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={dateOfBirth}
                onChange={({ target }) => setDateOfBirth(target.value)}
                style={{ marginTop: 10 }}
            />
            <TextField
                label="Occupation"
                color="secondary"
                fullWidth
                value={occupation}
                onChange={({ target }) => setOccupation(target.value)}
                style={{ marginTop: 10 }}
            />

            <TextField
                select
                label="Gender"
                color="secondary"
                value={gender}
                fullWidth
                onChange={onGenderChange}
                style={{ marginTop: 10 }}
            >
                {genderOptions.map(option =>
                    <MenuItem
                        key={option.label}
                        value={option.value}
                        color="secondary"
                    >
                        {option.label}
                    </MenuItem>
                )}
            </TextField>

            <Grid style={{ marginTop: 10 }}>
                <Grid item>
                <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                </Grid>
                <Grid item>
                <Button
                    style={{
                    float: "right",
                    }}
                    type="submit"
                    variant="contained"
                >
                    Add
                </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddPatientForm;