import createAction from '../../../helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const setSelectedAlbum = createAction<actionTypes.SetSelectedAlbum>(actionTypes.SET_SELECTED_ALBUM);
export const loadAlbums = createAction(actionTypes.LOAD_ALBUMS);
export const loadAlbumsSuccess = createAction<actionTypes.LoadAlbumsSuccess>(actionTypes.LOAD_ALBUMS_SUCCESS);
export const createAlbum = createAction<actionTypes.CreateAlbum>(actionTypes.CREATE_ALBUM);
export const createAlbumSuccess = createAction<actionTypes.CreateAlbumSuccess>(actionTypes.CREATE_ALBUM_SUCCESS);
export const updateAlbum = createAction<actionTypes.UpdateAlbum>(actionTypes.UPDATE_ALBUM);
export const updateAlbumSuccess = createAction<actionTypes.UpdateAlbumSuccess>(actionTypes.UPDATE_ALBUM_SUCCESS);
export const deleteAlbum = createAction<actionTypes.DeleteAlbum>(actionTypes.DELETE_ALBUM);
export const deleteAlbumSuccess = createAction<actionTypes.DeleteAlbumSuccess>(actionTypes.DELETE_ALBUM_SUCCESS);
