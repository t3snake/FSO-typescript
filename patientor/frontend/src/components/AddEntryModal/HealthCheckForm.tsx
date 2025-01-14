import TextField from "@mui/material/TextField";
import { HealthCheckProps, HealthCheckRating } from "../../types";
import MenuItem from "@mui/material/MenuItem";

const ratingOptions = [
        {value: HealthCheckRating.Healthy, label: "Healthy"},
        {value: HealthCheckRating.LowRisk, label: "Low Risk"},
        {value: HealthCheckRating.HighRisk, label: "High Risk"},
        {value: HealthCheckRating.CriticalRisk, label: "Critical Risk"}
];



const HealthCheckForm = ({healthCheckRating, setHealthCheckRating}: HealthCheckProps) => {
    const onRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = Number(event.target.value);
        console.log(value);
        if (value >= 0 && value <= 3) {
            setHealthCheckRating(value);
        }
    };

    return (
        <>
            <TextField
                label="Health Check Rating"
                select
                type="number"
                color="secondary"
                fullWidth
                value={healthCheckRating}
                onChange={onRatingChange}
                style={{ marginTop: 10 }}
            >
                {ratingOptions.map(option =>
                    <MenuItem
                        key={option.label}
                        value={option.value}
                        color="secondary"
                    >
                        {option.label}
                    </MenuItem>
                )}
            </TextField>
        </>
    );
};

export default HealthCheckForm;