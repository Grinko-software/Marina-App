import useHttpStore from '@/stores/http';
import http from '@/utils/http';
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const PATCH = 'PATCH';

export const updateTokenSystem = () => {
	window.addEventListener('message', (event) => {
		if (event?.data && event?.data?.type === 'refreshToken') {
			const newToken = event.data.token;
			localStorage.setItem('token', newToken);
		}
	});
};
export const getBaseUrl = () => {
	const { apiUrl } = useHttpStore.getState();
	return apiUrl;
};
export const getIsRefreshing = () => {
	const { isRefreshing } = useHttpStore.getState();
	return isRefreshing;
};
export const setIsRefreshing = (value) => {
	const { setIsRefreshing } = useHttpStore.getState();
	setIsRefreshing(value);
};
/**
 * Handle the data request
 * @returns request async
 */
export const getData = (url, method = GET, data, fullUrl) => {
	return http.makeRequest(url, method, data, fullUrl);
};

/**
 * Handle the data request multiple
 * @returns request async
 */
export const getDataMultiple = (requests) => {
	return http.fetchDataMulti(requests);
};
