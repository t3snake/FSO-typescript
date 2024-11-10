import axios from "axios";
import { Diary, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

const getDiaries = async () => {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data
}

const addDiary = async (diary: NewDiaryEntry) => {
    const response = await axios.post<Diary>(baseUrl, diary);
    return response.data;
}


export default {
    getDiaries,
    addDiary
}