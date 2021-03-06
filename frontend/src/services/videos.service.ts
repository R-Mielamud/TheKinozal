import callWebApi from '../helpers/callWebApi.helper';

export const createVideo = async (body: WebApi.Entity.Video): Promise<WebApi.Entity.Video> => {
	const res: Response = await callWebApi({
		endpoint: 'video/',
		method: 'POST',
		body,
	});

	return (await res.json()) as WebApi.Entity.Video;
};

export const createVideoFile = async (body: WebApi.Entity.Video, file: File): Promise<WebApi.Entity.Video> => {
	const res: Response = await callWebApi({
		endpoint: 'video/',
		method: 'POST',
		body,
		attachment: file,
		attachmentFieldName: 'custom_link',
	});

	return (await res.json()) as WebApi.Entity.Video;
};

export const updateVideo = async (id: number, body: Partial<WebApi.Entity.Video>): Promise<WebApi.Entity.Video> => {
	const res: Response = await callWebApi({
		endpoint: `video/${id}/`,
		method: 'PATCH',
		body,
	});

	return (await res.json()) as WebApi.Entity.Video;
};

export const updateVideoFile = async (
	id: number,
	body: Partial<WebApi.Entity.Video>,
	file?: File,
): Promise<WebApi.Entity.Video> => {
	const res: Response = await callWebApi({
		endpoint: `video/${id}/`,
		method: 'PATCH',
		body,
		...(file
			? {
					attachment: file,
					attachmentFieldName: 'custom_link',
			  }
			: {}),
	});

	return (await res.json()) as WebApi.Entity.Video;
};

export const deleteVideo = async (id: number): Promise<void> => {
	await callWebApi({
		endpoint: `video/${id}/`,
		method: 'DELETE',
	});
};
