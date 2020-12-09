import { all, put, call, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

import {
	createVideo,
	createVideoFile,
	deleteVideo,
	updateVideo,
	updateVideoFile,
} from '../../../services/videos.service';

import { NotificationManager } from 'react-notifications';
import i18next from 'i18next';

function* fetchCreateVideo(action: ReturnType<typeof actions.createVideo>) {
	try {
		const result = yield call(createVideo, action.data);
		yield put(actions.createVideoSuccess({ video: result }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_create_video'));
		yield put(actions.createVideoSuccess({}));
	}
}

function* watchCreateVideo() {
	yield takeEvery(actionTypes.CREATE_VIDEO, fetchCreateVideo);
}

function* fetchCreateVideoFile(action: ReturnType<typeof actions.createVideoFile>) {
	try {
		const result = yield call(createVideoFile, action.data, action.file);
		yield put(actions.createVideoSuccess({ video: result }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_create_video'));
		yield put(actions.createVideoSuccess({}));
	}
}

function* watchCreateVideoFile() {
	yield takeEvery(actionTypes.CREATE_VIDEO_FILE, fetchCreateVideoFile);
}

function* fetchUpdateVideo(action: ReturnType<typeof actions.updateVideo>) {
	try {
		const result = yield call(updateVideo, action.id, action.data);
		yield put(actions.updateVideoSuccess({ id: action.id, video: result }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_update_video'));
		yield put(actions.updateVideoSuccess({ id: action.id }));
	}
}

function* watchUpdateVideo() {
	yield takeEvery(actionTypes.UPDATE_VIDEO, fetchUpdateVideo);
}

function* fetchUpdateVideoFile(action: ReturnType<typeof actions.updateVideoFile>) {
	try {
		const result = yield call(updateVideoFile, action.id, action.data, action.file);
		yield put(actions.updateVideoSuccess({ id: action.id, video: result }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_update_video'));
		yield put(actions.updateVideoSuccess({ id: action.id }));
	}
}

function* watchUpdateVideoFile() {
	yield takeEvery(actionTypes.UPDATE_VIDEO_FILE, fetchUpdateVideoFile);
}

function* fetchDeleteVideo(action: ReturnType<typeof actions.deleteVideo>) {
	try {
		yield call(deleteVideo, action.id);
		yield put(actions.deleteVideoSuccess({ id: action.id, albumId: action.albumId }));
	} catch (err) {
		NotificationManager.error(i18next.t('cant_delete_video'));
	}
}

function* watchDeleteVideo() {
	yield takeEvery(actionTypes.DELETE_VIDEO, fetchDeleteVideo);
}

export default function* videosSaga() {
	yield all([
		watchCreateVideo(),
		watchCreateVideoFile(),
		watchUpdateVideo(),
		watchUpdateVideoFile(),
		watchDeleteVideo(),
	]);
}
