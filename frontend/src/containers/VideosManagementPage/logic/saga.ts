import { all, put, call, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { createVideo, deleteVideo, updateVideo } from '../../../services/videos.service';
import { NotificationManager } from 'react-notifications';

function* fetchCreateVideo(action: ReturnType<typeof actions.createVideo>) {
	try {
		const result = yield call(createVideo, action.data);
		yield put(actions.createVideoSuccess({ video: result }));
	} catch (err) {
		NotificationManager.error("Sorry, can't create video");
		yield put(actions.createVideoSuccess({}));
	}
}

function* watchCreateVideo() {
	yield takeEvery(actionTypes.CREATE_VIDEO, fetchCreateVideo);
}

function* fetchUpdateVideo(action: ReturnType<typeof actions.updateVideo>) {
	try {
		const result = yield call(updateVideo, action.id, action.data);
		yield put(actions.updateVideoSuccess({ id: action.id, video: result }));
	} catch (err) {
		NotificationManager.error("Sorry, can't update video");
		yield put(actions.updateVideoSuccess({ id: action.id }));
	}
}

function* watchUpdateVideo() {
	yield takeEvery(actionTypes.UPDATE_VIDEO, fetchUpdateVideo);
}

function* fetchDeleteVideo(action: ReturnType<typeof actions.deleteVideo>) {
	try {
		yield call(deleteVideo, action.id);
		yield put(actions.deleteVideoSuccess({ id: action.id, albumId: action.albumId }));
	} catch (err) {
		NotificationManager.error("Sorry, can't delete video");
	}
}

function* watchDeleteVideo() {
	yield takeEvery(actionTypes.DELETE_VIDEO, fetchDeleteVideo);
}

export default function* videosSaga() {
	yield all([watchCreateVideo(), watchUpdateVideo(), watchDeleteVideo()]);
}
