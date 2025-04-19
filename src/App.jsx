// ==============================
// 🎨 Feuille de style principale
// ==============================
import '@/styles/main.scss'

// ==============================
// 🧩 Composants globaux
// ==============================
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

// ==============================
// 📦 Outlet : zone de contenu pour les routes enfants
// ==============================
import { Outlet } from 'react-router-dom'

// ==============================
// 🧱 Structure principale de l'application
// ==============================

export default function App() {
  return (
    <>
      {/* 🧭 En-tête affiché sur toutes les pages */}
      <Header />

      {/* 📄 Contenu de la route en cours */}
      <Outlet />

      {/* ⚓ Pied de page global */}
      <Footer />
    </>
  )
}
