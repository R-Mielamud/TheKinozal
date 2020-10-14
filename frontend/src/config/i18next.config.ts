import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getBrowserLanguage } from '../helpers/language.helper';
import { en } from '../translations/en';

export default function automaticConfigureLanguages() {
	const lng = getBrowserLanguage();
	return configureLanguages(lng);
}

export function configureLanguages(lng: string) {
	return i18next.use(initReactI18next).init({
		resources: {
			en: {
				translation: en,
			},
		},
		lng,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: true,
		},
	});
}

export function setLanguage(lng: string) {
	return i18next.changeLanguage(lng);
}

export const Languages = {
	en: 'English',
	ru: 'Русский',
	ua: 'Українська',
};

export const specificLngCodes = {
	en: 'uk',
};
