import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: require('./locales/en.json'),
  },
  'pt-BR': {
    translation: require('./locales/pt-BR.json'),
  },
};

const languageDetector = new LanguageDetector(null, {
  order: ['querystring', 'localStorage', 'navigator'],
  lookupQuerystring: 'lang',
  lookupCookie: 'lang',
  lookupLocalStorage: 'lang',
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });

export default i18n;
