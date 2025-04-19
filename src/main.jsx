import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from '@/App'
import Home from '@/pages/home/Home'
import About from '@/pages/about/About'
import Contact from '@/pages/contact/Contact'
import NotFound from '@/pages/notfound/NotFound'
import DemoPage from '@/pages/demo/DemoPage' // 🧪 Page de démonstration
import '@/i18n/i18n' // 🌍 Initialisation de la traduction (i18n)

// ==============================
// 🧭 Définition des routes React Router
// ==============================

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // -------------------------
      // 📄 Pages principales
      // -------------------------
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },

      // -------------------------
      // 🧪 Page de démonstration (à supprimer dans les projets finaux)
      // Sert à tester le thème, la langue, l'accessibilité, etc.
      // -------------------------
      { path: 'demo', element: <DemoPage /> },

      // -------------------------
      // 🔍 404 - Page non trouvée
      // -------------------------
      { path: '*', element: <NotFound /> },
    ],
  },
])

// ==============================
// 🚀 Lancement de l’application React
// ==============================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
