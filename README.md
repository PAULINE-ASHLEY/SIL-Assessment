# SIL Assessment

This project has been developed as part of the SIL Frontend Engineering Assessment.
The goal was to build a React application that consumes the jsonplaceholder API while demonstrating frontend engineering skills, including:

Authentication (Firebase + Google Sign-In, GitHub Sign-In & Email/Password).

Data fetching and state management.

UI/UX presentation with responsive design.

Error handling and persistence across reloads.

Unit testing with Vitest + React Testing Library.

Code quality checks with ESLint.

CI/CD setup with GitHub Actions and Vercel deployment.

---

## Project Overview

The application includes the following features:

- **Landing Page**: A publicly accessible introduction to the application.
- **Authentication**:

  - Google and GitHub Authentication (Firebase).
  - Email/Password authentication (Firebase).
  - Error handling for invalid credentials.
  - Reusable AuthForm component for login/signup.

- **Home Page (Authenticated)**: Lists all users, showing how many albums each user owns.
- **User Page**: Displays user information and their albums.
- **Album Page**: Displays album details and its photos.
- **Photo Page**: Displays a single photo with the option to edit its title, which triggers a PATCH/PUT request.

Additional requirements achieved:

- Fully responsive design (mobile, tablet, desktop).
- Loading states and error handling for API requests.
- Data persistence so session/authentication persists across reloads.
- Reusable components for forms, navigation, and layout.
- Test coverage with Vitest and React Testing Library.
- Branching workflow with CI/CD integration.

---

## What Has Been Achieved

- **Coding Quality and Tooling**
  - Configured ESLint (React, Hooks, JSX rules).
  - Pre-configured linting commands for fixes.
- **Testing**
  - Added Vitest + React Testing Library.
  - Wrote tests for reusable components (AuthForm, etc.).
  - Handled common test cases: multiple matches, missing roles, async API data.
- **Authentication**
  - Integrated Firebase Authentication.
  - Added error handling for auth/invalid-credential.
  - Abstracted Firebase error messages for better UX.
- **CI/CD Deployment**
  - GitHub Actions workflow: runs linting and tests on every push/PR.
  - Vercel deployment: automatically deploys merges to main.
  - Branching: development for coding, main for production.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PAULINE-ASHLEY/SIL-Assessment.git
cd SIL-Assessment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Firebase

- Create a Firebase project.
- Enable Google authentication and Email/Password authentication.
- Copy your Firebase config into .env file:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run locally

```bash
npm run dev
```

The app will be available at http://localhost:5173

## Code Quality

### Linting

We use ESLint to enforce consistent code style and catch errors early.

### Check for lint errors:

```bash
npm run lint
```

### Fix issues automatically:

```bash
npm run lint -- --fix
```

### Testing

Unit tests are written with Vitest.

### Run tests:

```bash
npm run test
```

### Run tests with coverage:

```bash
npm run test:coverage
```

## Branching Strategy

- main → production branch (auto-deployed to Vercel).
- development → working branch for new features and fixes.

### Workflow:

- Make changes in development.
- Push to GitHub and open a Pull Request into main.
- GitHub Actions runs linting and tests.
- If checks pass, merge, and the application is automatically deployed to Vercel.

## Deployment (Vercel)

Deployment is handled by Vercel and is triggered automatically whenever code is merged into the main branch.

## Contributing

Ensure Node.js is installed (tested with v22.19.0).

### Install dependencies with:

```bash
npm install
```

### Run linting and tests before pushing changes:

```bash
npm run lint
npm run test
```

Use Conventional Commits for meaningful commit messages (e.g., feat: add navbar component, fix: resolve lint issue).
