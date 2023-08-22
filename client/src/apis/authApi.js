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
export const getCurrentUserService = (authToken) => {
	return fetch(`${API_URL}/auth/current-user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
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
