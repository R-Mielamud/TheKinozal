export const validateYoutubeLink = (link: string) => {
	return /https:\/\/www\.youtube.com\/watch\?v=[a-zA-Z0-9_]*/.test(link);
};

export const extractYoutubeId = (link: string): string | null => {
	if (validateYoutubeLink(link)) {
		const match = link.match(/https:\/\/www\.youtube.com\/watch\?v=([a-zA-Z0-9_]*)/);

		if (!match) {
			return null;
		}

		return match[1];
	}

	return null;
};
