const http = uni.$u.http

export const img = () => http.get('/img')

export const video = () => http.get('/video')