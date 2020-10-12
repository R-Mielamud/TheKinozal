import { call, put, all, takeEvery } from 'redux-saga/effects';
import { getAlbums } from '../../../services/albums.service';
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

export default function* albumsSaga() {
	yield all([watchLoadAlbums()]);
}
