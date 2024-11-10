import { Diary } from "../types";

type EntryProps = {
    diaries: Diary[]
};

const DiaryEntries = (props: EntryProps) => {
    return (
        <>
            <h2>Diary Entries</h2>
            {props.diaries.map(diary => {
                return (
                    <div key={diary.id}>
                        <h3>{diary.date}</h3>
                        <p>
                            visibility: {diary.visibility}
                        </p>
                        <p>
                            weather: {diary.weather}
                        </p>
                    </div>
                )
            })}
        </>
    )
}

export default DiaryEntries