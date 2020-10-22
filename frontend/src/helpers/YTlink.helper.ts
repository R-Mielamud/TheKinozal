const VIDEO_LINK_REGEX = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
const PLAYLIST_LINK_REGEX = /https:\/\/www\.youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/;

export const validateLink = (link: string, regex: RegExp) => {
	return regex.test(link);
};

export const extractId = (link: string, regex: RegExp) => {
	if (validateLink(link, regex)) {
		const match = link.match(regex);

		if (!match) {
			return null;
		}

		return match[1];
	}

	return null;
};

export const validateYoutubeLink = (link: string) => {
	return validateLink(link, VIDEO_LINK_REGEX);
};

export const extractYoutubeId = (link: string): string | null => {
	return extractId(link, VIDEO_LINK_REGEX);
};

export const validatePlaylistLink = (link: string) => {
	return validateLink(link, PLAYLIST_LINK_REGEX);
};

export const extractPlaylistId = (link: string): string | null => {
	return extractId(link, PLAYLIST_LINK_REGEX);
};
