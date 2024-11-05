
interface HeaderProps {
    courseName: string;
}

const Header = (props: HeaderProps) => {
    return (
        <h1>
            {props.courseName}
        </h1>
    )
};

interface CoursePart {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
    return (
        <div>
            {props.courseParts.map( (part, index) => {
                return (
                    <p key={index}>
                        {part.name} {part.exerciseCount}
                    </p>
                )
            })}
        </div>
    )
};

const Total = ({total}:{total: number}) => {
    return (
        <p>
            Number of exercises {total}
        </p>
    )
}

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts = [
        {
            name: "Fundamentals",
            exerciseCount: 10
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14
        }
    ] as CoursePart[];
  
    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
  
    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <Total total={totalExercises} />
        </div>
    );
};
  
export default App;