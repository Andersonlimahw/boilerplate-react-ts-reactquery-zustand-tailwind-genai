import React from 'react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Login } from './pages/Login/index.js';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';

import { startMirage } from './mocks/miragejs/index.js';

import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

if (import.meta.env.DEV) {
  startMirage();
} else {
  console.log('Enviroment: ', import.meta.env);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/profile",
    element: <Profile />,
  }
]);

const staleTimeMinutes = 10;
const slateTimeInMiliseconds = (1000 * 60) * staleTimeMinutes;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: slateTimeInMiliseconds,
      retry: 2, 
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>,
)
