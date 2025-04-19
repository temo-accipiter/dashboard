// ==============================
// 🌍 Initialisation de la traduction avec i18next + react-i18next
// ==============================

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// ==============================
// 📁 Chargement des fichiers de traduction
// ==============================

// 🇫🇷 Français
import headerFR from '../locales/fr/header.json'
import footerFR from '../locales/fr/footer.json'
import commonFR from '../locales/fr/common.json'

// 🇬🇧 Anglais
import headerEN from '../locales/en/header.json'
import footerEN from '../locales/en/footer.json'
import commonEN from '../locales/en/common.json'

// ==============================
// 🗂️ Organisation des traductions par langue et "namespace"
// Chaque section du site a son fichier (header, footer, etc.)
// ==============================

const resources = {
  fr: {
    header: headerFR,
    footer: footerFR,
    common: commonFR,
  },
  en: {
    header: headerEN,
    footer: footerEN,
    common: commonEN,
  },
}

// ==============================
// 🚀 Initialisation de i18next avec React
// ==============================

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || 'fr', // ← langue mémorisée ou "fr" par défaut
  fallbackLng: 'fr', // ← si la langue choisie est absente, on utilise le français

  interpolation: {
    escapeValue: false, // ← nécessaire pour React (protection contre l'injection HTML inutile ici)
  },
})

export default i18n
