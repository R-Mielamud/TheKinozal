import { NotificationManager } from 'react-notifications';
import { put, all, call, takeEvery } from 'redux-saga/effects';
import history from '../../../helpers/history.helper';
import { removeToken, setToken } from '../../../helpers/token.helper';
import { getProfile, login, register } from '../../../services/auth.service';
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

function* fetchRegister(action: ReturnType<typeof actions.register>) {
	try {
		const result: WebApi.Specific.AuthResult = yield call(register, action.email, action.password);
		setToken(result.jwt_token);

		yield put(
			actions.loadProfileSuccess({
				user: result.user,
				jwtToken: result.jwt_token,
			}),
		);
	} catch (err) {
		NotificationManager.error('This email is already taken');

		yield put(
			actions.loadProfileSuccess({
				user: null,
				jwtToken: null,
			}),
		);
	}
}

function* watchRegister() {
	yield takeEvery(actionTypes.REGISTER, fetchRegister);
}

function* fetchLoadProfile() {
	try {
		const result: WebApi.Entity.User = yield call(getProfile);

		yield put(
			actions.loadProfileSuccess({
				user: result,
			}),
		);
	} catch (err) {
		if (!/login|register/.test(window.location.href)) {
			removeToken();
			history.push('/login');
		}

		yield put(
			actions.loadProfileSuccess({
				user: null,
				jwtToken: null,
			}),
		);
	}
}

function* watchLoadProfile() {
	yield takeEvery(actionTypes.LOAD_PROFILE, fetchLoadProfile);
}

export default function* authSaga() {
	yield all([watchLogin(), watchRegister(), watchLoadProfile()]);
}
