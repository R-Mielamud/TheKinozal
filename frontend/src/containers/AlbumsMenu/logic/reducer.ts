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
});
