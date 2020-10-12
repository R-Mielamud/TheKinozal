import callWebApi from '../helpers/callWebApi.helper';

export const getAlbums = async (): Promise<WebApi.Entity.Album[]> => {
	const res: Response = await callWebApi({
		endpoint: 'album/',
		method: 'GET',
	});

	return (await res.json()) as WebApi.Entity.Album[];
};

export const createAlbum = async (body: WebApi.Entity.Album): Promise<WebApi.Entity.Album> => {
	const res: Response = await callWebApi({
		endpoint: 'album/',
		method: 'POST',
		body,
	});

	return (await res.json()) as WebApi.Entity.Album;
};

export const updateAlbum = async (id: number, body: Partial<WebApi.Entity.Album>): Promise<WebApi.Entity.Album> => {
	const res: Response = await callWebApi({
		endpoint: `album/${id}/`,
		method: 'PATCH',
		body,
	});

	return (await res.json()) as WebApi.Entity.Album;
};
