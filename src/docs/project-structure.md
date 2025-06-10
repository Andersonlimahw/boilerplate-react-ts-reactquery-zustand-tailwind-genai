# Project Structure

This document outlines the structure of the project and the purpose of each directory and file.

```
boilerplate-react-ts-reactquery-zustand-tailwind-genai/
├── public/                 # Static files
├── src/
│   ├── assets/            # Static assets like images, fonts, etc.
│   ├── commons/           # Reusable components and utilities
│   ├── docs/              # Project documentation
│   ├── enums/             # TypeScript enums
│   ├── interfaces/        # TypeScript interfaces
│   ├── mocks/             # Mock data for development and testing
│   ├── models/            # Data models and types
│   ├── pages/             # Page components
│   ├── services/          # API services and data fetching logic
│   ├── store/             # Zustand store configuration
│   ├── types/             # Global TypeScript type definitions
│   ├── index.css          # Global styles
│   └── main.tsx         # Application entry point
├── .env                  # Environment variables
├── .eslintrc.cjs        # ESLint configuration
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.js        # Vite configuration
```

## Key Files

- `src/main.tsx`: The entry point of the application where React is rendered.
- `src/index.css`: Global CSS styles and Tailwind directives.
- `src/store/`: Contains Zustand store definitions for state management.
- `src/services/`: Houses API service functions and React Query hooks.
- `src/pages/`: Contains the main page components of the application.
- `src/commons/`: Reusable UI components and utilities.

## Development Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run lint`: Run ESLint to check code quality
- `npm test`: Run tests
- `npm run test:coverage`: Run tests with coverage report

## Configuration

The project is configured with:

- **Vite** for fast development and building
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality
- **Tailwind CSS** for styling
- **React Router** for routing
- **React Query** for data fetching and caching
- **Zustand** for state management
