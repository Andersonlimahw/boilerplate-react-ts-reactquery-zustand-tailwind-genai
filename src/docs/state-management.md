# State Management

This project uses a combination of Zustand and React Query for state management, providing a powerful and flexible solution for both client and server state.

## Zustand (Client State)

Zustand is used for managing client-side application state. The stores are located in the `src/store` directory.

### Key Concepts

1. **Store Creation**
   ```typescript
   import { create } from 'zustand';
   
   interface StoreState {
     count: number;
     increment: () => void;
     decrement: () => void;
   }
   
   export const useStore = create<StoreState>((set) => ({
     count: 0,
     increment: () => set((state) => ({ count: state.count + 1 })),
     decrement: () => set((state) => ({ count: state.count - 1 })),
   }));
   ```

2. **Using the Store**
   ```typescript
   import { useStore } from '../store/counterStore';
   
   function Counter() {
     const { count, increment, decrement } = useStore();
     
     return (
       <div>
         <button onClick={decrement}>-</button>
         <span>{count}</span>
         <button onClick={increment}>+</button>
       </div>
     );
   }
   ```

## React Query (Server State)

React Query is used for managing server state, data fetching, and caching.

### Key Concepts

1. **Query Setup**
   ```typescript
   // In src/services/api.ts
   import { useQuery } from '@tanstack/react-query';
   
   const fetchTodos = async (): Promise<Todo[]> => {
     const response = await fetch('/api/todos');
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     return response.json();
   };
   
   export const useTodos = () => {
     return useQuery({
       queryKey: ['todos'],
       queryFn: fetchTodos,
     });
   };
   ```

2. **Using the Query**
   ```typescript
   import { useTodos } from '../services/api';
   
   function TodoList() {
     const { data: todos, isLoading, error } = useTodos();
   
     if (isLoading) return <div>Loading...</div>;
     if (error) return <div>Error: {error.message}</div>;
   
     return (
       <ul>
         {todos?.map((todo) => (
           <li key={todo.id}>{todo.title}</li>
         ))}
       </ul>
     );
   }
   ```

## Best Practices

1. **Separation of Concerns**
   - Use Zustand for UI state that needs to be accessed globally
   - Use React Query for server state and data fetching

2. **Selective State**
   ```typescript
   // Only re-render when the count changes
   const count = useStore((state) => state.count);
   ```

3. **Optimistic Updates**
   ```typescript
   // Example with React Query mutation
   const mutation = useMutation({
     mutationFn: updateTodo,
     onMutate: async (newTodo) => {
       // Cancel any outgoing refetches
       await queryClient.cancelQueries({ queryKey: ['todos'] });
       
       // Snapshot the previous value
       const previousTodos = queryClient.getQueryData(['todos']);
       
       // Optimistically update to the new value
       queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => 
         old?.map((todo) => 
           todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
         )
       );
       
       return { previousTodos };
     },
     onError: (err, newTodo, context) => {
       // Rollback on error
       queryClient.setQueryData(['todos'], context?.previousTodos);
     },
     onSettled: () => {
       // Always refetch after error or success
       queryClient.invalidateQueries({ queryKey: ['todos'] });
     },
   });
   ```

## DevTools

Both Zustand and React Query come with excellent dev tools for debugging:

1. **Zustand DevTools**
   - Install the Redux DevTools Extension for your browser
   - The store state will be visible in the Redux tab

2. **React Query DevTools**
   - The `ReactQueryDevtools` component is already included in the app
   - Access it by clicking the React Query logo in the bottom-left corner of the app in development mode
