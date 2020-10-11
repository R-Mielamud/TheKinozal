import { LocalStorageKeys } from '../constants/LocalStorageKeys';

export const getToken = () => {
	return localStorage.getItem(LocalStorageKeys.UserToken);
};

export const setToken = (token: string) => {
	return localStorage.setItem(LocalStorageKeys.UserToken, token);
};

export const removeToken = () => {
	return localStorage.removeItem(LocalStorageKeys.UserToken);
};
