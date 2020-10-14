import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLanguage } from '../helpers/language.helper';
import { en } from '../translations/en';
import { ru } from '../translations/ru';
import { ua } from '../translations/ua';

interface Dict<T> {
	[key: string]: T;
}

export default function automaticConfigureLanguages() {
	const lng = getLanguage();
	return configureLanguages(lng);
}

export function configureLanguages(lng: string) {
	return i18next.use(initReactI18next).init({
		resources: {
			en: {
				translation: en,
			},
			ru: {
				translation: ru,
			},
			ua: {
				translation: ua,
			},
		},
		lng,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: true,
		},
	});
}

export const Languages: Dict<string> = {
	en: 'English',
	ru: 'Русский',
	ua: 'Українська',
};

export const specificLngCodes: Dict<string> = {
	en: 'uk',
};
