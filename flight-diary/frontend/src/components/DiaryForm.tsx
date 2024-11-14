import React, { useState } from "react";
import axios from "axios";

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

    const [error, setError] = useState('');

    const handleWeatherChange = (state: Weather) => {
        setWeather(state);
    }

    const handleVisibilityChange = (state: Visibility) => {
        setVisibility(state);
    }

    const addDiary = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const diary = await diaryService.addDiary({
                date,
                weather,
                visibility,
                comment
            });
            const newDiaries = props.diaries.concat(diary);
            props.setDiaries(newDiaries);
            setError('');
            setDate('');
            setComment('');
            setVisibility(Visibility.Great);
            setWeather(Weather.Sunny);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                console.log(error);
            }
        }
    }

    const ErrorNotification = () => {
        return (
            <>
                <p>Error: {error}</p>
            </>
        )
    }

    return (
        <>
            <h2>Add new diary</h2>
            {error.length !== 0 && <ErrorNotification />}
            <form onSubmit={addDiary}>
                <div>
                    Date:
                    <input 
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>
                <div>
                    Visibility:
                    <input 
                        type="radio"
                        id="good"
                        value={Visibility.Good}
                        checked={visibility === Visibility.Good}
                        onChange={() => handleVisibilityChange(Visibility.Good)}
                    />
                    <label htmlFor="good">Good</label>
                    <input 
                        type="radio"
                        id="great"
                        value={Visibility.Great}
                        checked={visibility === Visibility.Great}
                        onChange={() => handleVisibilityChange(Visibility.Great)}
                    />
                    <label htmlFor="great">Great</label>
                    <input 
                        type="radio"
                        id="ok"
                        value={Visibility.Ok}
                        checked={visibility === Visibility.Ok}
                        onChange={() => handleVisibilityChange(Visibility.Ok)}
                    />
                    <label htmlFor="ok">Ok</label>
                    <input 
                        type="radio"
                        id="poor"
                        value={Visibility.Poor}
                        checked={visibility === Visibility.Poor}
                        onChange={() => handleVisibilityChange(Visibility.Poor)}
                    />
                    <label htmlFor="poor">Poor</label>
                </div>
                <div>
                    Weather:
                    <input 
                        type="radio"
                        id="cloudy"
                        value={Weather.Cloudy}
                        checked={weather === Weather.Cloudy}
                        onChange={() => handleWeatherChange(Weather.Cloudy)}
                    />
                    <label htmlFor="cloudy">Cloudy</label>
                    <input 
                        type="radio"
                        id="rainy"
                        value={Weather.Rainy}
                        checked={weather === Weather.Rainy}
                        onChange={() => handleWeatherChange(Weather.Rainy)}
                    />
                    <label htmlFor="rainy">Rainy</label>
                    <input 
                        type="radio"
                        id="stormy"
                        value={Weather.Stormy}
                        checked={weather === Weather.Stormy}
                        onChange={() => handleWeatherChange(Weather.Stormy)}
                    />
                    <label htmlFor="stormy">Stormy</label>
                    <input 
                        type="radio"
                        id="sunny"
                        value={Weather.Sunny}
                        checked={weather === Weather.Sunny}
                        onChange={() => handleWeatherChange(Weather.Sunny)}
                    />
                    <label htmlFor="sunny">Sunny</label>
                    <input 
                        type="radio"
                        id="windy"
                        value={Weather.Windy}
                        checked={weather === Weather.Windy}
                        onChange={() => handleWeatherChange(Weather.Windy)}
                    />
                    <label htmlFor="windy">Windy</label>

                </div>
                <div>
                    Comment:
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