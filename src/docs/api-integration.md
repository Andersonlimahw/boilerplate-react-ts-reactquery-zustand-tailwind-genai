# API Integration

This document explains how to work with APIs in the application using React Query and Axios.

## Table of Contents
- [API Client Setup](#api-client-setup)
- [Making API Requests](#making-api-requests)
- [React Query Integration](#react-query-integration)
- [Error Handling](#error-handling)
- [Authentication](#authentication)
- [Mocking API Responses](#mocking-api-responses)

## API Client Setup

The project uses fetch as the HTTP client. The base configuration is set up in `src/services/api.ts`:


## Making API Requests

### GET Request Example

```typescript
import { api } from '../services/api';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};
```

### POST Request Example

```typescript
export const createPost = async (postData: CreatePostDto): Promise<Post> => {
  const response = await api.post<Post>('/posts', postData);
  return response.data;
};
```

## React Query Integration

### Query Example

```typescript
// src/services/postService.ts
import { useQuery } from '@tanstack/react-query';

export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Mutation Example

```typescript
// src/services/postService.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Post, Error, CreatePostDto>({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
```

## Error Handling

### Global Error Handling

Global error handling is set up in the Axios response interceptor:

```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    
    // Show error toast
    toast.error(errorMessage);
    
    // Log error for debugging
    console.error('API Error:', error);
    
    return Promise.reject(error);
  }
);
```

### Local Error Handling

```typescript
const { data, error } = usePosts();

if (error) {
  return <div>Error: {error.message}</div>;
}
```

## Authentication

### Login Example

```typescript
export const login = async (credentials: LoginDto): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

// In a component
const loginMutation = useMutation({
  mutationFn: login,
  onSuccess: (data) => {
    localStorage.setItem('auth_token', data.token);
    // Update auth state
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
```

## Mocking API Responses

For development and testing, you can use the provided mock service worker:

1. **Create a mock handler** in `src/mocks/handlers.ts`:

```typescript
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/posts', (req, res, ctx) => {
    return res(
      ctx.delay(150),
      ctx.json([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ])
    );
  }),
];
```

2. **Start the mock server** in development:

```typescript
// src/main.tsx
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start();
}
```

This setup allows you to develop and test your components without a backend server.
