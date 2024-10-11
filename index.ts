import express from 'express';

import { calculateBmi } from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});