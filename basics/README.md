# Basics

This folder contains basic TypeScript exercises and examples.

## Files

- `bmiCalculator.ts`: A script to calculate BMI based on height and weight.
- `exerciseCalculator.ts`: A script to calculate exercise statistics based on daily exercise hours and a target.
- `index.ts`: An Express server that provides endpoints for BMI and exercise calculations.
- `package.json`: Project configuration and dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `.gitignore`: Git ignore file.
- `eslint.config.mjs`: ESLint configuration file.

## Scripts

- `npm run calculateBmi`: Run the BMI calculator script.
- `npm run calculateExercises`: Run the exercise calculator script.
- `npm run dev`: Start the Express server.
- `npm run lint`: Run ESLint to check for code quality issues.

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```

2. Run the server:
   ```sh
   npm run dev
   ```

3. Access the endpoints:
   - `/hello`: Returns a greeting message.
   - `/bmi`: Calculates BMI based on query parameters `height` and `weight`.
   - `/exercises`: Calculates exercise statistics based on a JSON body with `daily_exercises` and `target`.