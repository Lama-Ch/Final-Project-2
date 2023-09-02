//making HTTP requests to an authentication-related API

import { API_URL } from '../utils/constants';

//login credentials (such as username and password)
//POST request to the ${API_URL}/auth/signin
export const singInService = (crendentials) => {
	return fetch(`${API_URL}/auth/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(crendentials),
	});
};

//valid authentication token obtained after successful login
// GET request to the ${API_URL}/auth/current-user
export const getCurrentUserService = (authToken) => {
	return fetch(`${API_URL}/auth/current-user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
	});
};

//user registration (email, password, ect)
//POST request to the ${API_URL}/auth/signup

export const signUpService = (data) => {
	return fetch(`${API_URL}/auth/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
};
