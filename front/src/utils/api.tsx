import axios from 'axios'

const base = axios.create({
    baseURL: 'http://localhost:9000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

const picsApi = {
    getAllPics: async () => {
        try {
            const response = await base.get<Pic[]>('pics/getall')
            return response.data
        } catch (err) {
            console.log(err)
        }
    },
}

export default picsApi
