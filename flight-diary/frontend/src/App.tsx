import { useEffect, useState } from 'react'

import DiaryEntries from './components/DiaryEntries'

import { Diary } from './types'
import diaryService from './services/diaryService'

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
            <DiaryEntries diaries={diaries} />
        </>
    )
}

export default App
