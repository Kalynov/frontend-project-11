import i18next from 'i18next';
import resources from './locales/index.js';


const i18n = i18next.createInstance();
await i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources,
})

export { i18n };