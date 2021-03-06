import { call, put, all, takeEvery } from 'redux-saga/effects';

import {
	createAlbum,
	deleteAlbum,
	getAlbums,
	importAlbum,
	toggleFavorite,
	updateAlbum,
} from '../../../services/albums.service';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { NotificationManager } from 'react-notifications';
import i18next from 'i18next';

function* fetchLoadAlbums() {
	try {
		const albums = yield call(getAlbums);
		yield put(actions.loadAlbumsSuccess({ albums }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_load_albums'));
	}
}

function* watchLoadAlbums() {
	yield takeEvery(actionTypes.LOAD_ALBUMS, fetchLoadAlbums);
}

function* fetchCreateAlbum(action: ReturnType<typeof actions.createAlbum>) {
	try {
		const album = yield call(createAlbum, action.data, action.copyFrom);
		yield put(actions.createAlbumSuccess({ album }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_create_album'));
		yield put(actions.createAlbumSuccess({}));
	}
}

function* watchCreateAlbum() {
	yield takeEvery(actionTypes.CREATE_ALBUM, fetchCreateAlbum);
}

function* fetchImportAlbum(action: ReturnType<typeof actions.importAlbum>) {
	try {
		const album = yield call(importAlbum, action.data, action.playlistId);
		yield put(actions.createAlbumSuccess({ album }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_create_album'));
		yield put(actions.createAlbumSuccess({}));
	}
}

function* watchImportAlbum() {
	yield takeEvery(actionTypes.IMPORT_ALBUM, fetchImportAlbum);
}

function* fetchUpdateAlbum(action: ReturnType<typeof actions.updateAlbum>) {
	try {
		const album = yield call(updateAlbum, action.id, action.data);
		yield put(actions.updateAlbumSuccess({ id: action.id, album }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_update_album'));
		yield put(actions.updateAlbumSuccess({ id: 0 }));
	}
}

function* watchUpdateAlbum() {
	yield takeEvery(actionTypes.UPDATE_ALBUM, fetchUpdateAlbum);
}

function* fetchToggleFavorite(action: ReturnType<typeof actions.toggleFavoriteAlbum>) {
	try {
		const album = yield call(toggleFavorite, action.id, action.favorite);
		yield put(actions.updateAlbumSuccess({ id: action.id, album }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_update_album'));
		yield put(actions.updateAlbumSuccess({ id: 0 }));
	}
}

function* watchToggleFavorite() {
	yield takeEvery(actionTypes.TOGGLE_FAVORITE_ALBUM, fetchToggleFavorite);
}

function* fetchDeleteAlbum(action: ReturnType<typeof actions.deleteAlbum>) {
	try {
		yield call(deleteAlbum, action.id);
		yield put(actions.deleteAlbumSuccess({ id: action.id }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_delete_album'));
	}
}

function* watchDeleteAlbum() {
	yield takeEvery(actionTypes.DELETE_ALBUM, fetchDeleteAlbum);
}

export default function* albumsSaga() {
	yield all([
		watchLoadAlbums(),
		watchCreateAlbum(),
		watchImportAlbum(),
		watchUpdateAlbum(),
		watchToggleFavorite(),
		watchDeleteAlbum(),
	]);
}
