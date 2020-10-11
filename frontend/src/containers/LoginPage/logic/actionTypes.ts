export const LOGIN = 'USER:AUTH:LOGIN';
export const REGISTER = 'USER:AUTH:REGISTER';
export const LOAD_PROFILE = 'USER:AUTH:PROFILE:LOAD';
export const LOAD_PROFILE_SUCCESS = 'USER:AUTH:PROFILE:LOAD:SUCCESS';

export interface Auth {
	email: string;
	password: string;
}

export interface LoadProfileSuccess {
	user: WebApi.Entity.User | null;
	jwtToken?: string | null;
}
