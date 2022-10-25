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
            const response = await base.get<GetPicturesResponse>('pics/getall')
            return response.data
        } catch (err) {
            console.log(err)
        }
    },
}

const selectionApi = {
    saveSelection: async (picture_id: string) => {
        try {
            const response = await base.post('/selection', { picture_id })
            return response.data
        } catch (err) {
            console.log(err)
        }
    },
}

export { picsApi, selectionApi }
