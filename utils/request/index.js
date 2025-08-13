uni.$u.http.setConfig((config) => {
	config.baseURL = 'http://127.0.0.1:3004';
	return config
})

uni.$u.http.interceptors.request.use(async (config) => {
	return config
}, config => {
	return Promise.reject(config)
})

uni.$u.http.interceptors.response.use(({
	data
}) => {
	return data
}, (response) => {
	return Promise.reject(response)
})