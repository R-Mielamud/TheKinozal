export interface AlbumsState {
	selectedId: number | null;
	albums: WebApi.Entity.Album[];
	albumsLoaded: boolean;
}

export const initialState: AlbumsState = {
	selectedId: null,
	albums: [],
	albumsLoaded: false,
};
