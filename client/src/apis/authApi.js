import { API_URL } from '../utils/constants';

export const singInService = (crendentials) => {
	return fetch(`${API_URL}/auth/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(crendentials),
	});
};

export const signUpService = (data) => {
	return fetch(`${API_URL}/auth/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
};
