export const CREATE_VIDEO = 'VIDEO:CREATE';
export const CREATE_VIDEO_FILE = 'VIDEO:CREATE:FILE';
export const CREATE_VIDEO_SUCCESS = 'VIDEO:CREATE:SUCCESS';
export const UPDATE_VIDEO = 'VIDEO:UPDATE';
export const UPDATE_VIDEO_FILE = 'VIDEO:UPDATE:FILE';
export const UPDATE_VIDEO_SUCCESS = 'VIDEO:UPDATE:SUCCESS';
export const DELETE_VIDEO = 'VIDEO:DELETE';
export const DELETE_VIDEO_SUCCESS = 'VIDEO:DELETE:SUCCESS';

export interface CreateVideo {
	data: WebApi.Entity.Video;
}

export interface CreateVideoFile {
	data: WebApi.Entity.Video;
	file: File;
}

export interface CreateVideoSuccess {
	video?: WebApi.Entity.Video;
}

export interface UpdateVideo {
	id: number;
	data: Partial<WebApi.Entity.Video>;
}

export interface UpdateVideoFile {
	id: number;
	data: Partial<WebApi.Entity.Video>;
	file?: File;
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
