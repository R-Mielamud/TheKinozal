import i18next from 'i18next';
import { LocalStorageKeys } from '../constants/LocalStorageKeys';

export const getLanguage = () => {
	const localStorageLanguage = localStorage.getItem(LocalStorageKeys.UserLng);

	if (!localStorageLanguage) {
		const navigatorLng = navigator.language;
		const lngParts = navigatorLng.split('-');
		const realLng = lngParts[lngParts.length - 1];
		const lowerLng = realLng.toLowerCase();

		return lowerLng;
	}

	return localStorageLanguage;
};

export const setLanguage = (lng: string) => {
	localStorage.setItem(LocalStorageKeys.UserLng, lng);
	return i18next.changeLanguage(lng);
};

export const removeLanguageToken = () => {
	return localStorage.removeItem(LocalStorageKeys.UserLng);
};
