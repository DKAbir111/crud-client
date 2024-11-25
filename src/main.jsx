import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root';
import Login from './components/Login';
import Home from './components/Home';
import Signin from './components/Signin';
import Users from './components/Users';
import Update from './components/Update';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/users',
        element: <Users />,
        loader: async () => await fetch('http://localhost:5001/users')
      },
      {
        path: '/update/:id',
        element: <Update />,
        loader: async ({ params }) => await fetch(`http://localhost:5001/user/${params.id}`),

      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
