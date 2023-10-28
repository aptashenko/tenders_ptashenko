import axios from 'axios'

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

const basicRequest = axios.create({
    baseURL: 'https://prozzoro-rfux7eiaq-nazariiko.vercel.app',
    headers: {
        post: headers,
        get: headers,
        patch: headers,
        put: headers,
        delete: headers
    },
})

basicRequest.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    })

basicRequest.interceptors.response.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export { basicRequest }
