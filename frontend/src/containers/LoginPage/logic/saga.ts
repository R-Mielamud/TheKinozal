import { NotificationManager } from 'react-notifications';
import { put, all, call, takeEvery } from 'redux-saga/effects';
import { setToken } from '../../../helpers/token.helper';
import { login } from '../../../services/auth.service';
import * as actions from './actions';
import * as actionTypes from './actionTypes';

function* fetchLogin(action: ReturnType<typeof actions.login>) {
	try {
		const result: WebApi.Specific.AuthResult = yield call(login, action.email, action.password);
		setToken(result.jwt_token);

		yield put(
			actions.loadProfileSuccess({
				user: result.user,
				jwtToken: result.jwt_token,
			}),
		);
	} catch (err) {
		NotificationManager.error('Invalid email or password');

		yield put(
			actions.loadProfileSuccess({
				user: null,
				jwtToken: null,
			}),
		);
	}
}

function* watchLogin() {
	yield takeEvery(actionTypes.LOGIN, fetchLogin);
}

export default function* authSaga() {
	yield all([watchLogin()]);
}
