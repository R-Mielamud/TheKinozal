import { getToken } from '../../../helpers/token.helper';

export interface AuthState {
	user: WebApi.Entity.User | null;
	isAuthorized: boolean;
	jwtToken: string | null;
	profileLoaded: boolean;
	requestingLogin: boolean;
}

export const initialState: AuthState = {
	user: null,
	isAuthorized: false,
	jwtToken: getToken(),
	profileLoaded: false,
	requestingLogin: false,
};
