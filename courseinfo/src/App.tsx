
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

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDesc extends CoursePartBase{
    description: string;
}
  
interface CoursePartBasic extends CoursePartWithDesc {
    kind: "basic";
}
  
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}
  
interface CoursePartBackground extends CoursePartWithDesc {
    backgroundMaterial: string;
    kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDesc {
    requirements: string[];
    kind: "special";
}
  
type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Part = ({part}: {part: CoursePart}): JSX.Element => {
    let content: JSX.Element | null = null;
    switch(part.kind) {
        case "basic":
            content = (
                <p><i>
                    {part.description}
                </i></p>
            );
            break;
        case "group":
            content = (
                <p> 
                    {part.groupProjectCount} group projects to go 
                </p>
            );
            break;
        case "background":
            content = (
                <div>
                    <p><i> {part.description} </i></p>
                    <p> background material: {part.backgroundMaterial}</p>
                </div>
            );
            break;
        case "special":
            content = (
                <div>
                    <p><i>
                        {part.description}
                    </i></p>
                    <p>
                        required skills: {part.requirements.toString()}
                    </p>
                </div>
            )
            break;
        default:
            break;
    }

    return (
        <div>
            <h3>{part.name}</h3>
            {content}
            <p>{part.exerciseCount} exercises to complete</p>
        </div>
    )
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
                        <Part part={part} />
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
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part",
            kind: "basic"
          },
          {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: "group"
          },
          {
            name: "Basics of type Narrowing",
            exerciseCount: 7,
            description: "How to go from unknown to string",
            kind: "basic"
          },
          {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
            kind: "background"
          },
          {
            name: "TypeScript in frontend",
            exerciseCount: 10,
            description: "a hard part",
            kind: "basic",
          },
          {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            kind: "special"
          }
    ];
  
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