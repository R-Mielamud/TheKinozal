export interface AlbumsState {
	albums: WebApi.Entity.Album[];
	albumsLoaded: boolean;
	creatingAlbum: boolean;
	updatingAlbum: boolean;
}

export const initialState: AlbumsState = {
	albums: [],
	albumsLoaded: false,
	creatingAlbum: false,
	updatingAlbum: false,
};
