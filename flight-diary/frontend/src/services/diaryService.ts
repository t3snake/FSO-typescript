import axios from "axios";
import { Diary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

const getDiaries = async () => {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data
}

const addDiary = async (diary: Diary) => {
    const response = await axios.post<Diary>(baseUrl, diary);
    return response;
}


export default {
    getDiaries,
    addDiary
}