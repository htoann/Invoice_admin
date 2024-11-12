import { getLocalStorage } from '@/utils/localStorage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import vi from './vi.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',
  lng: getLocalStorage('lang') || 'vi',
  resources: {
    vi: {
      translations: vi,
    },
    en: {
      translations: en,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['vi', 'en'];

export default i18n;
