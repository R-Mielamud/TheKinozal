export interface AlbumsState {
	selectedId: number | null;
	albums: WebApi.Entity.Album[];
	albumsLoaded: boolean;
	creatingAlbum: boolean;
	updatingAlbum: boolean;
}

export const initialState: AlbumsState = {
	selectedId: null,
	albums: [],
	albumsLoaded: false,
	creatingAlbum: false,
	updatingAlbum: false,
};
