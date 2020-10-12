import { call, put, all, takeEvery } from 'redux-saga/effects';
import { createAlbum, getAlbums, updateAlbum } from '../../../services/albums.service';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { NotificationManager } from 'react-notifications';

function* fetchLoadAlbums() {
	try {
		const albums = yield call(getAlbums);
		yield put(actions.loadAlbumsSuccess({ albums }));
	} catch (err) {
		NotificationManager.error("Sorry, can't load albums");
	}
}

function* watchLoadAlbums() {
	yield takeEvery(actionTypes.LOAD_ALBUMS, fetchLoadAlbums);
}

function* fetchCreateAlbum(action: ReturnType<typeof actions.createAlbum>) {
	try {
		const album = yield call(createAlbum, action.data);
		yield put(actions.createAlbumSuccess({ album }));
	} catch (err) {
		NotificationManager.error("Sorry, can't create album");
		yield put(actions.createAlbumSuccess({}));
	}
}

function* watchCreateAlbum() {
	yield takeEvery(actionTypes.CREATE_ALBUM, fetchCreateAlbum);
}

function* fetchUpdateAlbum(action: ReturnType<typeof actions.updateAlbum>) {
	try {
		const album = yield call(updateAlbum, action.id, action.data);
		yield put(actions.updateAlbumSuccess({ id: action.id, album }));
	} catch (err) {
		NotificationManager.error("Sorry, can't update album");
		yield put(actions.updateAlbumSuccess({ id: 0 }));
	}
}

function* watchUpdateAlbum() {
	yield takeEvery(actionTypes.UPDATE_ALBUM, fetchUpdateAlbum);
}

export default function* albumsSaga() {
	yield all([watchLoadAlbums(), watchCreateAlbum(), watchUpdateAlbum()]);
}
