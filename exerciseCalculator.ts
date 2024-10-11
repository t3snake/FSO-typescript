interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exerciseHours: number[], target: number): Result => {
    const res: Result = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: '',
        target: 0,
        average: 0
    };

    res.periodLength = exerciseHours.length;
    res.trainingDays = exerciseHours.filter(hours => hours !== 0).length;
    const sum = exerciseHours.reduce((a, b) => a+b, 0);
    res.average = sum/exerciseHours.length || 0;
    res.success = res.average >= target;
    res.target = target;
    res.rating = 1 + (res.average/target);

    if ( res.rating < 1.75 ) {
        res.ratingDescription = 'Poor performance';
    } else if ( res.rating < 2 ) {
        res.ratingDescription = 'Not bad, just a bit more to succeed';
    } else if ( res.rating < 2.25 ) {
        res.ratingDescription = 'Reached goals! Congrats!';
    } else {
        res.ratingDescription = 'Amazing! Over achieved targets';
    }

    return res;
};

const parseArguments = (args: string[]) => {
    if (args.length < 4) throw new Error('Not enough arguments');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_arg0, _arg1, target, ...exDays] = args;
    if (isNaN(Number(target))) throw new Error('target not a number');

    exDays.forEach(day => {
        if (isNaN(Number(day))) throw new Error('hours are not all numbers');
    });

    return {
        exerciseHours: exDays.map(day => Number(day)),
        target: Number(target)
    };
};

const {exerciseHours, target} = parseArguments(process.argv);

console.log(calculateExercises(exerciseHours, target));