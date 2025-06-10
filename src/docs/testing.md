# Testing Guide

This document outlines the testing strategy and tools used in the project to ensure code quality and reliability.

## Table of Contents
- [Testing Tools](#testing-tools)
- [Unit Testing](#unit-testing)
- [Component Testing](#component-testing)
- [Mocking](#mocking)
- [Testing Hooks](#testing-hooks)
- [Testing Custom Hooks](#testing-custom-hooks)
- [Testing Pages](#testing-pages)
- [Code Coverage](#code-coverage)
- [Best Practices](#best-practices)

## Testing Tools

The project uses the following testing tools:

- **Vitest**: A fast test runner with Jest-compatible API
- **React Testing Library**: For testing React components
- **MSW (Mock Service Worker)**: For API mocking
- **@testing-library/user-event**: For simulating user interactions
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing

## Unit Testing

### Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Example Test File

```typescript
// src/components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders the button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Component Testing

### Testing Library Setup

Tests are typically placed next to the component file with a `.test.tsx` or `.spec.tsx` extension.

### Example: Testing a Form Component

```typescript
// src/components/LoginForm/LoginForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('submits the form with email and password', async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    // Type into inputs
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Assert the form was submitted with correct values
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
  
  it('shows validation errors', async () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    
    // Submit without filling the form
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check for validation messages
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
```

## Mocking

### Mocking API Calls with MSW

```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(
      ctx.delay(150),
      ctx.json({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      })
    );
  }),
];

// src/setupTests.ts
import { server } from './mocks/server';

// Enable API mocking before tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done
afterAll(() => server.close());
```

### Mocking Modules

```typescript
// Mock a module
vi.mock('../../services/api', () => ({
  fetchUser: vi.fn().mockResolvedValue({
    id: 1,
    name: 'Mock User',
  }),
}));

// In your test
import { fetchUser } from '../../services/api';

describe('UserProfile', () => {
  it('displays user data', async () => {
    render(<UserProfile userId="1" />);
    expect(await screen.findByText('Mock User')).toBeInTheDocument();
    expect(fetchUser).toHaveBeenCalledWith('1');
  });
});
```

## Testing Hooks

### Testing Custom Hooks

```typescript
// src/hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('should accept initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
});
```

## Testing Pages

### Testing Page Components

```typescript
// src/pages/Home/Home.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';

describe('Home Page', () => {
  it('loads and displays posts', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Check loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
    });
    
    // Check that posts are displayed
    expect(screen.getByText('First Post')).toBeInTheDocument();
  });
});
```

## Code Coverage

### Running Coverage

```bash
npm run test:coverage
```

This will generate a coverage report in the `coverage` directory. Open `coverage/lcov-report/index.html` in a browser to view the detailed report.

### Coverage Thresholds

You can set coverage thresholds in `vite.config.js`:

```javascript
// vite.config.js
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Test what the user sees and does, not internal component state
   - Avoid testing implementation details that might change

2. **Use Descriptive Test Names**
   - Test names should describe the behavior being tested
   - Follow the pattern "should [expected behavior] when [state/action]"

3. **Keep Tests Isolated**
   - Each test should be independent of others
   - Use `beforeEach` and `afterEach` to set up common test conditions

4. **Test Edge Cases**
   - Test empty states
   - Test error states
   - Test boundary conditions

5. **Use Mocks Wisely**
   - Mock external dependencies, but avoid over-mocking
   - Consider using MSW for API mocking

6. **Test Accessibility**
   - Use `@testing-library`'s built-in accessibility checks
   - Test keyboard navigation and screen reader compatibility

7. **Keep Tests Maintainable**
   - Follow the DRY principle with test utilities
   - Use test data factories for complex objects
   - Keep tests focused and simple
