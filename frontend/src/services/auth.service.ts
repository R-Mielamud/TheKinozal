import callWebApi from '../helpers/callWebApi.helper';

export const login = async (email: string, password: string) => {
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

export const getProfile = async () => {
	const res: Response = await callWebApi({
		endpoint: 'auth/profile/',
		method: 'GET',
	});

	return (await res.json()) as WebApi.Entity.User;
};
