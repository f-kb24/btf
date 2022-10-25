import axios from 'axios'

const base = axios.create({
    baseURL: 'http://localhost:9000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

const authAPI = {
    createUser: async (formData: any) => {
        try {
            const response = await base.post('route/hello/1', formData)
            return response.data
        } catch (err) {
            console.log(err)
        }
    },
}

export default authAPI
