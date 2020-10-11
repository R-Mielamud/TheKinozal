import createReducer from '../../../helpers/createReducer';
import * as actionTypes from './actionTypes';
import { initialState } from './state';

export const authReducer = createReducer(initialState, {
	[actionTypes.LOGIN](state) {
		return {
			...state,
			requestingLogin: true,
		};
	},
	[actionTypes.REGISTER](state) {
		return {
			...state,
			requestingRegister: true,
		};
	},
	[actionTypes.LOAD_PROFILE_SUCCESS](state, action: actionTypes.LoadProfileSuccess) {
		return {
			...state,
			user: action.user,
			isAuthorized: Boolean(action.user),
			...(action.jwtToken ? { jwtToken: action.jwtToken } : {}),
			profileLoaded: true,
			requestingLogin: false,
			requestingRegister: false,
		};
	},
});
