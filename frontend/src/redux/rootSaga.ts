import { all } from 'redux-saga/effects';
import albumsSaga from '../containers/AlbumsMenu/logic/saga';
import authSaga from '../containers/LoginPage/logic/saga';

export default function* rootSaga() {
	yield all([authSaga(), albumsSaga()]);
}
