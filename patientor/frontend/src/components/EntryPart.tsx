import { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import HealingRoundedIcon from '@mui/icons-material/HealingRounded';

import diagnosisService from "../services/diagnosis";
import { Entry } from "../types";
import Stack from "@mui/material/Stack";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

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
        <ListItem id={code} >
            {code} {description}
        </ListItem>
    );
};

const EntryPart = ({entry}: {entry: Entry}) => {
    const getIcon = () => {
        switch (entry.type) {
            case "HealthCheck":
                return ( <> <MonitorHeartRoundedIcon /> </>);
            case "Hospital":
                return ( <> <LocalHospitalRoundedIcon /> </>);
            case "OccupationalHealthcare":
                return ( <> <HealingRoundedIcon /> </> );
            default:
                return assertNever(entry);
        }
    };

    const getEntrySpecificContent = () => {
        switch (entry.type) {
            case "HealthCheck":
                return ( 
                    <Typography style={ { marginLeft: "1em" } }>
                        {`Health Rating: ${ 4 - entry.healthCheckRating.valueOf() }/4`}    
                    </Typography>
                );
            case "Hospital":
                return ( 
                    <div style={ { marginLeft: "1em" } }> 
                        <Typography>{ `Discharge date: ${entry.discharge.date}` }</Typography>
                        <Typography>{ `Discharge criteria: ${entry.discharge.criteria}` }</Typography>
                    </div>
                );
            case "OccupationalHealthcare":
                return ( 
                    <div style={ { marginLeft: "1em" } }> 
                        <Typography>{ `Employer: ${entry.employerName}` }</Typography>
                        {entry.sickLeave && 
                            <Typography>
                                { `Leave Range: [${entry.sickLeave?.startDate}] 
                                    to [${entry.sickLeave?.endDate}]` }
                            </Typography>
                        }  
                    </div>
                );
            default:
                return assertNever(entry);
        }
    };

    return (
        <Paper 
          elevation={3} 
          square={false} 
          style={ { margin: "1em", padding: "1em", backgroundColor: "#d7e9b9"} }
        >
            <Stack alignItems="center" direction="row" gap={2}>
                { getIcon() }
                <Typography variant="h6">{entry.date}</Typography>
            </Stack>

            <Typography>
                {entry.description}    
            </Typography> 
            
            { getEntrySpecificContent() }

            {(entry.diagnosisCodes && entry.diagnosisCodes.length > 0) && 
            <>
                <Typography>Diagnoses</Typography>
                <List>
                    {entry.diagnosisCodes?.map(code => 
                        <div key={code}>
                            <DiagnosisList code={code} />
                        </div> 
                    )}
                </List>
            </>}
            <Typography variant="caption">
                Diagnosed by {entry.specialist}
            </Typography>
        </Paper>
    );
};

export default EntryPart;