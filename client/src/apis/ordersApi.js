import { API_URL } from '../utils/constants';
// Function to fetch details about a specific order by its ID
export const orderByIdService = (orderId, authToken) => {
	const headers = {
		'Content-Type': 'application/json',
	};
	if (authToken) {
		headers['Authorization'] = `Bearer ${authToken}`;
	}
	// Send a GET request to the API endpoint for the specified order ID
	return fetch(`${API_URL}/orders/${orderId}`, {
		method: 'GET',
		headers: headers,
	});
};
// Function to create a new order
export const createOrderService = (data, authToken) => {
	// Initialize headers with the Content-Type and the provided authentication token
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${authToken}`,
	};
	// Send a POST request to the API endpoint to create a new order
	return fetch(`${API_URL}/orders/`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(data),
	});
};
