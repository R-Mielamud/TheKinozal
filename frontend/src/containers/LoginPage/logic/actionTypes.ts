export const LOGIN = 'USER:AUTH:LOGIN';
export const LOAD_PROFILE_SUCCESS = 'USER:AUTH:PROFILE:LOAD:SUCCESS';

export interface Login {
	email: string;
	password: string;
}

export interface LoadProfileSuccess {
	user: WebApi.Entity.User | null;
	jwtToken: string | null;
}
