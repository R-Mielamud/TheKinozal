import createReducer from '../../../helpers/createReducer';
import { initialState } from './state';
import * as actionTypes from './actionTypes';

export const albumsReducer = createReducer(initialState, {
	[actionTypes.SET_SELECTED_ALBUM](state, action: actionTypes.SetSelectedAlbum) {
		return {
			...state,
			selectedId: action.id,
		};
	},
	[actionTypes.LOAD_ALBUMS_SUCCESS](state, action: actionTypes.LoadAlbumsSuccess) {
		return {
			...state,
			albums: action.albums,
			albumsLoaded: true,
		};
	},
	[actionTypes.CREATE_ALBUM](state) {
		return {
			...state,
			creatingAlbum: true,
		};
	},
	[actionTypes.CREATE_ALBUM_SUCCESS](state, action: actionTypes.CreateAlbumSuccess) {
		if (action.album) {
			return {
				...state,
				albums: [...state.albums, action.album],
				creatingAlbum: false,
			};
		}

		return {
			...state,
			creatingAlbum: false,
		};
	},
	[actionTypes.UPDATE_ALBUM](state) {
		return {
			...state,
			updatingAlbum: true,
		};
	},
	[actionTypes.UPDATE_ALBUM_SUCCESS](state, action: actionTypes.UpdateAlbumSuccess) {
		if (action.album) {
			const newAlbums: WebApi.Entity.Album[] = [...state.albums];
			const index = newAlbums.findIndex((album) => album.id === action.id);
			newAlbums[index] = action.album;

			return {
				...state,
				albums: newAlbums,
				updatingAlbum: false,
			};
		}

		return {
			...state,
			updatingAlbum: false,
		};
	},
	[actionTypes.DELETE_ALBUM_SUCCESS](state, action: actionTypes.DeleteAlbumSuccess) {
		const newAlbums: WebApi.Entity.Album[] = [...state.albums];
		const index = newAlbums.findIndex((album) => album.id === action.id);
		newAlbums.splice(index, 1);

		return {
			...state,
			albums: newAlbums,
		};
	},
});
