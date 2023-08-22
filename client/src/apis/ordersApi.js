import { API_URL } from '../utils/constants';

export const orderByIdService = (orderId, authToken) => {
	const headers = {
		'Content-Type': 'application/json',
	};
	if (authToken) {
		headers['Authorization'] = `Bearer ${authToken}`;
	}
	return fetch(`${API_URL}/orders/${orderId}`, {
		method: 'GET',
		headers: headers,
	});
};

export const createOrderService = (data, authToken) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${authToken}`,
	};
	return fetch(`${API_URL}/orders/`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(data),
	});
};
