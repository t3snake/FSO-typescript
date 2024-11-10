import { useEffect, useState } from 'react'

import DiaryEntries from './components/DiaryEntries'

import { Diary } from './types'
import diaryService from './services/diaryService'
import DiaryForm from './components/DiaryForm';

function App() {
    const [diaries, setDiaries] = useState<Diary[]>([]);

    useEffect(() => {
        const getDiaries = async () => {
            const diaries = await diaryService.getDiaries();
            setDiaries(diaries)
        };
        getDiaries();
    }, []);

    return (
        <>
            <DiaryForm diaries={diaries} setDiaries={setDiaries} />
            <DiaryEntries diaries={diaries} />
        </>
    )
}

export default App
