import createAction from '../../../helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const setSelectedAlbum = createAction<actionTypes.SetSelectedAlbum>(actionTypes.SET_SELECTED_ALBUM);
export const loadAlbums = createAction(actionTypes.LOAD_ALBUMS);
export const loadAlbumsSuccess = createAction<actionTypes.LoadAlbumsSuccess>(actionTypes.LOAD_ALBUMS_SUCCESS);
