export const SET_SELECTED_ALBUM = 'ALBUM:SELECT:SET';
export const LOAD_ALBUMS = 'ALBUM:LOAD';
export const LOAD_ALBUMS_SUCCESS = 'ALBUM:LOAD:SUCCESS';

export interface SetSelectedAlbum {
	id: number;
}

export interface LoadAlbumsSuccess {
	albums: WebApi.Entity.Album[];
}
