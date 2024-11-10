import React, { useState } from "react";

import { Diary, Visibility, Weather } from "../types";

import diaryService from "../services/diaryService";

type FormProps = {
    diaries: Diary[];
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}
const DiaryForm = (props: FormProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [comment, setComment] = useState('');

    const addDiary = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const diary = await diaryService.addDiary({
            date,
            weather,
            visibility,
            comment
        });
        const newDiaries = props.diaries.concat(diary);
        props.setDiaries(newDiaries);

        setDate('');
        setComment('');
        setVisibility(Visibility.Great);
        setWeather(Weather.Sunny);
    }

    return (
        <>
            <h2>Add new diary</h2>
            <form onSubmit={addDiary}>
                <div>
                    date
                    <input 
                        type="text"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>
                <div>
                    visibility
                    <input 
                        type="text"
                        value={visibility}
                        onChange={(event) => setVisibility(event.target.value as Visibility)}
                    />
                </div>
                <div>
                    weather
                    <input 
                        type="text"
                        value={weather}
                        onChange={(event) => setWeather(event.target.value as Weather)}
                    />
                </div>
                <div>
                    comment
                    <input 
                        type="text"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    )
};

export default DiaryForm;