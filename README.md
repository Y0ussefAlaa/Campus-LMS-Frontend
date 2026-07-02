# New Campus AI

A role-based educational dashboard for administrators, teachers, and students built with React, TypeScript, and Vite.

## Overview

New Campus AI is designed to support a modern campus workflow with role-specific functionality:

- Admins manage users, departments, courses, and overall system access
- Teachers create courses, add materials, build quizzes, and assign tasks
- Students enroll in courses, review content, take quizzes, and submit assignments

## Features

- Role-based authentication and protected routes
- Admin dashboard with user and department management
- Teacher dashboard with course creation, materials, quizzes, and task management
- Student dashboard with enrollment, course content, quiz-taking, and submission tracking
- Responsive UI using reusable components and loading skeletons
- API integration with Axios and shared state via React context

## Technology Stack

- React 19
- TypeScript 6
- Vite
- Tailwind CSS 4
- Material UI
- React Router Dom 7
- React Query
- Axios
- React Hook Form + Yup
- ESLint

## Repo Structure

- `src/Components` — reusable components, UI widgets, and skeleton loaders
- `src/Layouts` — layout wrappers for admin, teacher, and student pages
- `src/Pages` — feature pages and views for each role
- `src/routes` — route definitions for admin, teacher, and student sections
- `src/context` — auth and application state providers
- `src/lib` — API client modules
- `src/schema` — validation schemas and shared data definitions
- `src/Services` — utilities for cookies and profile handling
- `src/utils` — helper utilities

## Getting Started

### Prerequisites

- Node.js v20 or later
- npm v10 or later

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` — start application in development mode
- `npm run build` — compile and bundle application
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks

## Notes

- Public landing page is shown when users are not authenticated.
- Authenticated users are redirected to the correct dashboard by role.
- Admin routes live under `/admin/*`, teacher routes under `/teacher/*`, and student routes under `/student/*`.

## Contributing

Contributions are welcome. Please open issues or pull requests for bug fixes, improvements, or documentation updates.

## License

This repository does not include a license file. Add one if you intend to publish or distribute it publicly.
