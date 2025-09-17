# SIL Assessment

This project has been developed as part of SIL frontend engineering assessment. The goal of the test is to build a React application that consumes a backend service (the provided `jsonplaceholder` API) and demonstrate frontend engineering skills including authentication, data fetching, UI presentation, state management, testing, and CI/CD integration.

The project also showcases a complete developer workflow by integrating code quality checks, automated testing, and deployment pipelines. Every change pushed goes through linting, testing, and is automatically deployed to Vercel when merged into the `main` branch.

---

## Project Overview

The application includes the following features:

- **Landing Page**: Publicly accessible with a short explanation of what the application does.
- **Authentication**: Users can log in using Google authentication via Firebase.
- **Home Page (Authenticated)**: Lists all users, including how many albums each user has.
- **User Page**: Shows user information and their albums.
- **Album Page**: Displays album details and its photos.
- **Photo Page**: Displays a single photo with the option to edit its title, which triggers a PATCH/PUT request.

Additional requirements achieved:

- Responsive design (works on mobile, tablet, and desktop).
- Data persistence across page reloads.
- Loading states and error handling for API requests.

---

## What Has Been Achieved

- Configured ESLint with React, Hooks, and JSX accessibility rules.
- Added Vitest testing setup with global configuration (`test`, `expect`, etc.).
- Created a GitHub Actions workflow that runs linting and tests on every push/PR.
- Integrated Vercel deployment so that merges to `main` are deployed automatically.
- Established a branching workflow (`development` for coding, `main` for production).
- Successfully deployed the application to Vercel.

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

### 3. Run locally

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
