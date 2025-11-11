import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/components/layout/Layout'
import Home from '@/pages/home/Home'
import About from '@/pages/about/About'
import Taches from '@/pages/taches/Taches'
import Rdv from '@/pages/rdv/Rdv'
import LiensGrid from '@/pages/liens/LiensGrid'
import NotFound from '@/pages/notFound/NotFound'
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
      { path: 'taches', element: <Taches /> },
      { path: 'rdv', element: <Rdv /> },
      { path: 'liens', element: <LiensGrid /> },
      { path: 'demo', element: <DemoPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

// ==============================
// 🚀 Rendu de l'application
// ==============================

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
