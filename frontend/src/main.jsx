import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Quiz, { loader as quizLoader } from './routes/quiz'
import Index from './routes/index.jsx'
import { action as deleteAction } from './routes/delete.jsx'
import Login from './routes/login.jsx'
import Register from './routes/register.jsx'
import { UserProvider } from './context/user_context.jsx'
import Profile from './routes/profile.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        index: true,
        element: <Index />,
      },
      {
        path: '/quizzes/:quizId',
        element: <Quiz />,
        loader: quizLoader,
      },
      {
        path: '/quizzes/:quizId/delete/:questionId',
        action: deleteAction,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
