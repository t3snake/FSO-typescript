import TextField from "@mui/material/TextField";
import { OccupationalHealthcareProps } from "../../types";

const defaultDate = '2020-01-13';

const OccupationalHealthcareForm = (props: OccupationalHealthcareProps) => {

    return (
        <>
            <TextField
                label="Employer Name"
                color="secondary"
                fullWidth
                value={props.employerName}
                onChange={({ target }) => props.setEmployerName(target.value)}
                style={{ marginTop: 10 }}
            />
            <TextField
                label="Start Date"
                color="secondary"
                placeholder="YYYY-MM-DD"
                fullWidth
                defaultValue={defaultDate}
                value={props.startDate}
                onChange={({ target }) => props.setStartDate(target.value)}
                style={{ marginTop: 10 }}
            />
            <TextField
                label="End Date"
                color="secondary"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={props.endDate}
                onChange={({ target }) => props.setEndDate(target.value)}
                style={{ marginTop: 10 }}
            />
        </>
    );
};

export default OccupationalHealthcareForm;