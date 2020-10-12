import callWebApi from '../helpers/callWebApi.helper';

export const getAlbums = async (): Promise<WebApi.Entity.Album[]> => {
	const res: Response = await callWebApi({
		endpoint: 'album/',
		method: 'GET',
	});

	return (await res.json()) as WebApi.Entity.Album[];
};
