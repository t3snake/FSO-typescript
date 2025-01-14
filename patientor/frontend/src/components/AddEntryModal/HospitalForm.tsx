import TextField from "@mui/material/TextField";
import { HospitalProps } from "../../types";



const HospitalForm = (props: HospitalProps) => {

    return (
        <>
            <TextField
                label="Visit Date"
                color="secondary"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={props.hospitalDate}
                onChange={({ target }) => props.setHospitalDate(target.value)}
                style={{ marginTop: 10 }}
            />
            <TextField
                label="Visit Criteria"
                color="secondary"
                fullWidth
                value={props.criteria}
                onChange={({ target }) => props.setCriteria(target.value)}
                style={{ marginTop: 10 }}
            />
        </>
    );
};

export default HospitalForm;