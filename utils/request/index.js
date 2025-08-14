uni.$u.http.setConfig((config) => {
	config.baseURL = 'http://192.168.110.143:3004';
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