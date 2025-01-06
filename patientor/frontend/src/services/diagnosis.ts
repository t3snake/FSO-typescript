import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getDiagnosis = async (id: string) => {
    const diagnoses = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

    return diagnoses.data.find(diag => diag.code === id);
};

export default {getDiagnosis};