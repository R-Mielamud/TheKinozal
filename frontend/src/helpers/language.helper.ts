export const getBrowserLanguage = () => {
	const navigatorLng = navigator.language;
	const lngParts = navigatorLng.split('-');
	const realLng = lngParts[lngParts.length - 1];
	const lowerLng = realLng.toLowerCase();

	return lowerLng;
};
