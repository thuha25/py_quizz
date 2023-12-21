import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Quiz, { loader as quizLoader } from './routes/quiz'
import Index from './routes/index.jsx'
import { action as deleteAction } from './routes/delete.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
