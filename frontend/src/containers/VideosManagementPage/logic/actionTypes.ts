export const CREATE_VIDEO = 'VIDEO:CREATE';
export const CREATE_VIDEO_SUCCESS = 'VIDEO:CREATE:SUCCESS';
export const UPDATE_VIDEO = 'VIDEO:UPDATE';
export const UPDATE_VIDEO_SUCCESS = 'VIDEO:UPDATE:SUCCESS';
export const DELETE_VIDEO = 'VIDEO:DELETE';
export const DELETE_VIDEO_SUCCESS = 'VIDEO:DELETE:SUCCESS';

export interface CreateVideo {
	data: WebApi.Entity.Video;
}

export interface CreateVideoSuccess {
	video?: WebApi.Entity.Video;
}

export interface UpdateVideo {
	id: number;
	data: Partial<WebApi.Entity.Video>;
}

export interface UpdateVideoSuccess {
	id: number;
	video?: WebApi.Entity.Video;
}

export interface DeleteVideo {
	id: number;
	albumId: number;
}

export interface DeleteVideoSuccess {
	id: number;
	albumId: number;
}
