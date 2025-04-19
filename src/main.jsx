import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/components/layout/Layout'
import Home from '@/pages/home/Home'
import About from '@/pages/about/About'
import Contact from '@/pages/contact/Contact'
import NotFound from '@/pages/notfound/NotFound'
import DemoPage from '@/pages/demo/DemoPage'
import '@/i18n/i18n' // 🌍 Initialisation i18n
import '@/styles/main.scss' // 🎨 Styles globaux

// ==============================
// 🧭 Définition des routes
// ==============================

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'demo', element: <DemoPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

// ==============================
// 🚀 Rendu de l'application
// ==============================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
