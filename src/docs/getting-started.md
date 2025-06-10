# Getting Started

This guide will help you set up and run the project on your local machine for development and testing purposes.

## Prerequisites

- Node.js (v16 or later)
- npm (v8 or later) or yarn
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/boilerplate-react-ts-reactquery-zustand-tailwind-genai.git
   cd boilerplate-react-ts-reactquery-zustand-tailwind-genai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_APP_TITLE=Your App Name
   ```

## Available Scripts

In the project directory, you can run:

- `npm run dev`
  Runs the app in development mode.
  Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

- `npm run build`
  Builds the app for production to the `dist` folder.
  It correctly bundles React in production mode and optimizes the build for the best performance.

- `npm run test`
  Launches the test runner in interactive watch mode.

- `npm run test:coverage`
  Runs tests and generates a coverage report.

- `npm run lint`
  Runs ESLint to check for code quality issues.

## Project Structure

Refer to the [Project Structure](./project-structure.md) documentation for a detailed overview of the project's directory structure.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
