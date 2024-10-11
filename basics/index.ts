import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_request, response) => {
    response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
    const height = Number(request.query.height);
    const weight = Number(request.query.weight);

    if ( !height || !weight || isNaN(weight) || isNaN(height) ) {
        response.status(400).send({error: 'Malformed query parameters'});
        return;
    }
    response.json({
        weight,
        height,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (request, response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = request.body;

    // validations
    if ( !daily_exercises || !target) {
        response.status(400).send({error: 'parameters missing'});
        return;
    }

    if ( isNaN(Number(target)) || !Array.isArray(daily_exercises) ) {
        response.status(400).send({error: 'malformed parameters'});
        return;
    }

    let error_occured = false;
    daily_exercises.forEach(ex => {
        if (isNaN(Number(ex))) {
            response.status(400).send({error: 'malformed parameters'});
            error_occured = true;
            return;
        }
    });

    if (error_occured) return;

    // calculate response
    const result = calculateExercises(daily_exercises.map(ex => Number(ex)), Number(target));

    response.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});