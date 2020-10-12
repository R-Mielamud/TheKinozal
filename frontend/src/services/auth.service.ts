import callWebApi from '../helpers/callWebApi.helper';

export const login = async (email: string, password: string): Promise<WebApi.Specific.AuthResult> => {
	const res: Response = await callWebApi({
		endpoint: 'auth/login/',
		method: 'POST',
		body: {
			email,
			password,
		},
	});

	return (await res.json()) as WebApi.Specific.AuthResult;
};

export const register = async (email: string, password: string): Promise<WebApi.Specific.AuthResult> => {
	const res: Response = await callWebApi({
		endpoint: 'auth/register/',
		method: 'POST',
		body: {
			email,
			password,
		},
	});

	return (await res.json()) as WebApi.Specific.AuthResult;
};

export const getProfile = async (): Promise<WebApi.Entity.User> => {
	const res: Response = await callWebApi({
		endpoint: 'auth/profile/',
		method: 'GET',
	});

	return (await res.json()) as WebApi.Entity.User;
};
