export const LOAD_ALBUMS = 'ALBUM:LOAD';
export const LOAD_ALBUMS_SUCCESS = 'ALBUM:LOAD:SUCCESS';
export const CREATE_ALBUM = 'ALBUM:CREATE';
export const CREATE_ALBUM_SUCCESS = 'ALBUM:CREATE:SUCCESS';
export const IMPORT_ALBUM = 'ALBUM:IMPORT';
export const UPDATE_ALBUM = 'ALBUM:UPDATE';
export const UPDATE_ALBUM_SUCCESS = 'ALBUM:UPDATE:SUCCESS';
export const TOGGLE_FAVORITE_ALBUM = 'ALBUM:TOGGLE_FAVORITE';
export const DELETE_ALBUM = 'ALBUM:DELETE';
export const DELETE_ALBUM_SUCCESS = 'ALBUM:DELETE:SUCCESS';

export interface LoadAlbumsSuccess {
	albums: WebApi.Entity.Album[];
}

export interface CreateAlbum {
	data: WebApi.Entity.Album;
	copyFrom?: number;
}

export interface CreateAlbumSuccess {
	album?: WebApi.Entity.Album;
}

export interface ImportAlbum {
	data: WebApi.Entity.Album;
	playlistId: string;
}

export interface UpdateAlbum {
	id: number;
	data: Partial<WebApi.Entity.Album>;
}

export interface UpdateAlbumSuccess {
	id: number;
	album?: WebApi.Entity.Album;
}

export interface ToggleFavoriteAlbum {
	id: number;
	favorite: boolean;
}

export interface DeleteAlbum {
	id: number;
}

export interface DeleteAlbumSuccess {
	id: number;
}
