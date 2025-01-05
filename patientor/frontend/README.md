# Patientor Frontend

This folder contains the frontend for the Patientor application, which manages patient records.

## Usage

1. Install dependencies:
    ```sh
    npm install
    ```

2. Start the development server:
    ```sh
    npm run dev
    ```

3. Build the application for production:
    ```sh
    npm run build
    ```

4. Preview the production build:
    ```sh
    npm run preview
    ```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build.

## Files

- `src/`: Source code for the frontend.
  - [App.tsx](http://_vscodecontentref_/2): Main application component.
  - `components/`: React components.
    - [AddPatientModal/](http://_vscodecontentref_/3): Modal component for adding a new patient.
      - [AddPatientForm.tsx](http://_vscodecontentref_/4): Form component for adding a new patient.
    - [HealthRatingBar.tsx](http://_vscodecontentref_/5): Component for displaying health rating.
    - [PatientListPage/](http://_vscodecontentref_/6): Component for displaying the list of patients.
  - [patients.ts](http://_vscodecontentref_/7): Service for managing patients.
  - [types.ts](http://_vscodecontentref_/8): Type definitions.
  - [main.tsx](http://_vscodecontentref_/9): Entry point for the React application.
  - [constants.ts](http://_vscodecontentref_/10): API base URL.
  - [vite-env.d.ts](http://_vscodecontentref_/11): Vite environment types.
- [index.html](http://_vscodecontentref_/12): HTML template for the application.
- [package.json](http://_vscodecontentref_/13): Project configuration and dependencies.
- [tsconfig.json](http://_vscodecontentref_/14): TypeScript configuration file.
- [tsconfig.node.json](http://_vscodecontentref_/15): TypeScript configuration file for Node.js.
- [vite.config.ts](http://_vscodecontentref_/16): Vite configuration file.
- [.gitignore](http://_vscodecontentref_/17): Git ignore file.
- [.eslintrc.cjs](http://_vscodecontentref_/18): ESLint configuration file.