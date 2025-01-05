# Patientor Backend

This folder contains the backend for the Patientor application, which manages patient records.

## Usage

1. Install dependencies:
    ```sh
    npm install
    ```

2. Start the development server:
    ```sh
    npm run dev
    ```
   OR
   Start the production server:
    ```sh
    npm start
    ```

3. Access the endpoints:

- `/api/ping`: Returns a pong message.
- `/api/diagnoses`: CRUD operations for diagnoses.
- `/api/patients`: CRUD operations for patients.

## Scripts

- `npm run dev`: Start the development server.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run start`: Start the production server.

## Files

- `src/`: Source code for the backend.
  - `index.ts`: Entry point for the Express server.
  - `routes/diagnoses.ts`: Routes for managing diagnoses.
  - `routes/patients.ts`: Routes for managing patients.
  - `services/diagnoseService.ts`: Service for managing diagnoses.
  - `services/patientService.ts`: Service for managing patients.
  - `types.ts`: Type definitions.
  - `utils.ts`: Utility functions.
- `data/diagnoses.ts`: Sample data for diagnoses.
- `data/patients.ts`: Sample data for patients.
- `package.json`: Project configuration and dependencies.
- `tsconfig.json`: TypeScript configuration file.