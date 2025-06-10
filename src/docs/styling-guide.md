# Styling Guide

This project uses Tailwind CSS for styling, providing a utility-first approach to building custom designs.

## Table of Contents
- [Tailwind CSS](#tailwind-css)
- [Customizing the Theme](#customizing-the-theme)
- [Component Styling](#component-styling)
- [Responsive Design](#responsive-design)
- [Dark Mode](#dark-mode)
- [Custom CSS](#custom-css)
- [Icons](#icons)
- [Animations](#animations)

## Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs.

### Basic Usage

```jsx
// Example of using Tailwind classes
const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
  >
    {children}
  </button>
);
```

### Common Utility Classes

| Category | Example Classes | Description |
|----------|----------------|-------------|
| Layout | `flex`, `grid`, `hidden` | Control the layout of elements |
| Spacing | `m-4`, `p-2`, `space-x-4` | Margin and padding utilities |
| Typography | `text-lg`, `font-bold`, `text-center` | Text styling and alignment |
| Colors | `bg-blue-500`, `text-white`, `border-gray-200` | Background, text, and border colors |
| Sizing | `w-full`, `h-8`, `max-w-md` | Width and height utilities |
| Effects | `shadow-md`, `rounded-lg`, `opacity-75` | Shadows, border radius, opacity |

## Customizing the Theme

Customize the Tailwind theme in `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          light: '#93C5FD',
          dark: '#1D4ED8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

## Component Styling

### Component Variants with `clsx`

Use `clsx` to conditionally apply classes:

```jsx
import { clsx } from 'clsx';

const Button = ({ variant = 'primary', size = 'md', children, className, ...props }) => {
  const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Responsive Design

Tailwind uses a mobile-first breakpoint system:

```jsx
<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">Responsive Card</h3>
    <p className="text-gray-600">This card is responsive and will change width based on the screen size.</p>
  </div>
</div>
```

### Breakpoints

| Prefix | Min-width | CSS |
|--------|-----------|-----|
| `sm` | 640px | `@media (min-width: 640px)` |
| `md` | 768px | `@media (min-width: 768px)` |
| `lg` | 1024px | `@media (min-width: 1024px)` |
| `xl` | 1280px | `@media (min-width: 1280px)` |
| `2xl` | 1536px | `@media (min-width: 1536px)` |

## Dark Mode

Dark mode is enabled by default in `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' for system preference
  // ...
};
```

### Using Dark Mode

```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6">
  <h2 className="text-2xl font-bold mb-4">Dark Mode Example</h2>
  <p>This text and background will change in dark mode.</p>
</div>
```

## Custom CSS

For styles that can't be achieved with Tailwind, create a CSS file and import it in your component:

```css
/* src/components/CustomComponent/CustomComponent.css */
.custom-gradient {
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
}
```

## Icons

This project includes `@phosphor-icons/react` for icons:

```jsx
import { MagnifyingGlass, User, Bell } from '@phosphor-icons/react';

// Usage
<button className="flex items-center space-x-2">
  <Bell size={20} weight="bold" />
  <span>Notifications</span>
</button>
```

## Animations

### Built-in Transitions

```jsx
// Fade in
<div className="opacity-0 animate-fade-in">Fading in...</div>

// Slide in from left
<div className="transform -translate-x-full animate-slide-in">Sliding in...</div>
```

### Custom Animations

Add custom animations in `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
};
```

## Best Practices

1. **Use @apply for Repeated Styles**
   ```css
   .btn {
     @apply px-4 py-2 rounded-md font-medium transition-colors;
   }
   
   .btn-primary {
     @apply bg-blue-600 text-white hover:bg-blue-700;
   }
   ```

2. **Extract Components** for repeated UI patterns

3. **Use JIT Mode** (enabled by default in Tailwind 3.0+)

4. **Purge Unused Styles** in production builds (configured in `tailwind.config.js`)

5. **Use `@layer` for Custom Styles**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer components {
     .card {
       @apply bg-white rounded-lg shadow-md p-6;
     }
   }
   ```
