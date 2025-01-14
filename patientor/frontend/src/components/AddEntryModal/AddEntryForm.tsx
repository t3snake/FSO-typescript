import { useState, SyntheticEvent } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

import { EntryFormValues, Diagnosis, Entry, BaseEntry, HealthCheckRating, HealthCheckProps, HospitalProps, OccupationalHealthcareProps } from "../../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
}

enum  EntryType {
    HealthCheck = "HealthCheck",
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare"
}

const typeOptions = Object.values(EntryType).map(v => ({
    value: v, label: v.toString()
}));



const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Entry['date']>('2020-01-13');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code']>('');
    const [type, setType] = useState<Entry['type']>("HealthCheck");

    // HealthCheck properties
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

    const healthCheckProps: HealthCheckProps = {
        healthCheckRating,
        setHealthCheckRating
    };

    // Hospital properties
    const [hospitalDate, setHospitalDate] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('');

    const hospitalProps: HospitalProps = {
        hospitalDate,
        setHospitalDate,
        criteria,
        setCriteria
    };

    // OccupationalHealthcare properties
    const [employerName, setEmployerName] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const occupationalHealthcareProp: OccupationalHealthcareProps = {
        employerName,
        setEmployerName,
        startDate,
        setStartDate,
        endDate,
        setEndDate
    };

    const entryBase: Omit<BaseEntry, "id"> = {
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.split(", "),
    };

    const getEntry = (): EntryFormValues => {
        switch(type) {
            case "HealthCheck":
                return {
                    ...entryBase,
                    type,
                    healthCheckRating
                };
                break;
            case "Hospital":
                return {
                    ...entryBase,
                    type,
                    discharge: {
                        date: hospitalDate,
                        criteria
                    }
                };
                break;
            case "OccupationalHealthcare":
                return{
                    ...entryBase,
                    type,
                    employerName,
                    sickLeave: {
                        startDate,
                        endDate,
                    }
                };
                break;
            default:
                throw new Error("invalid type");
        }
    };

    const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if ( typeof event.target.value !== "string") {
            return;
        }

        const value = event.target.value;
        const entryType = Object.values(EntryType).find(g => g.toString() === value);
        if (entryType == undefined){
            return;
        }

        setType(entryType);
    };

    const onSubmitForm = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit(getEntry());
    };

    return (
        <form onSubmit={onSubmitForm}>
            <TextField
                label="Description"
                color="secondary"
                fullWidth 
                value={description}
                onChange={({ target }) => setDescription(target.value)}
            />
             <TextField
                label="Date"
                color="secondary"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={date}
                onChange={({ target }) => setDate(target.value)}
                style={{ marginTop: 10 }}
            />
            <TextField
                label="Specialist"
                color="secondary"
                fullWidth
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
                style={{ marginTop: 10 }}
            />
            <TextField
                label="Diagnoses Codes"
                color="secondary"
                fullWidth
                value={diagnosisCodes}
                onChange={({ target }) => setDiagnosisCodes(target.value)}
                style={{ marginTop: 10 }}
            />

            <TextField
                select
                label="Type"
                color="secondary"
                value={type}
                fullWidth
                onChange={onTypeChange}
                style={{ marginTop: 10 }}
            >
                {typeOptions.map(option =>
                    <MenuItem
                        key={option.label}
                        value={option.value}
                        color="secondary"
                    >
                        {option.label}
                    </MenuItem>
                )}
            </TextField>

            { type === "HealthCheck" && 
                <HealthCheckForm
                  {...healthCheckProps}
                /> 
            }
            { type === "Hospital" &&
                <HospitalForm
                  {...hospitalProps}
                />
            }
            { type === "OccupationalHealthcare" &&
                <OccupationalHealthcareForm
                   {...occupationalHealthcareProp}
                />
            }

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

export default AddEntryForm;