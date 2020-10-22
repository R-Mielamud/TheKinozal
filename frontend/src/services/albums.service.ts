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

export const importAlbum = async (body: WebApi.Entity.Album, playlistId: string): Promise<WebApi.Entity.Album> => {
	const res: Response = await callWebApi({
		endpoint: 'album/import/',
		method: 'POST',
		body: {
			...body,
			playlist_id: playlistId,
		},
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

export const toggleFavorite = (id: number, favorite: boolean): Promise<WebApi.Entity.Album> => {
	return updateAlbum(id, { favorite });
};

export const deleteAlbum = async (id: number): Promise<void> => {
	await callWebApi({
		endpoint: `album/${id}/`,
		method: 'DELETE',
	});
};
