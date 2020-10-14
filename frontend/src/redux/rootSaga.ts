import { all } from 'redux-saga/effects';
import albumsSaga from '../containers/AlbumsManagementPage/logic/saga';
import authSaga from '../containers/LoginPage/logic/saga';
import videosSaga from '../containers/VideosManagementPage/logic/saga';

export default function* rootSaga() {
	yield all([authSaga(), albumsSaga(), videosSaga()]);
}
