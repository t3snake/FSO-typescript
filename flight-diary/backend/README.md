# Flight Diary - Backend

This folder contains a full-stack application for managing flight diaries.

### Files

- `src/`: Source code for the backend.
  - `index.ts`: Entry point for the Express server.
  - `routes/diaries.ts`: Routes for managing diary entries.
  - `services/diaryService.ts`: Service for managing diary entries.
  - `types.ts`: Type definitions.
  - `utils.ts`: Utility functions.
- `data/entries.ts`: Sample data for diary entries.
- `package.json`: Project configuration and dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `.gitignore`: Git ignore file.
- `.eslintrc`: ESLint configuration file.
- `.eslintignore`: ESLint ignore file.

### Scripts

- `npm run dev`: Start the development server.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run start`: Start the production server.

### Usage

1. Install dependencies:
    ```sh
    npm install
    ```

2. Start the development server:
    ```sh
    npm run dev
    ```

3. Access the endpoints:
    - `/ping`: Returns a pong message.
    - `/api/diaries`: CRUD operations for diary entries.