import axios from 'axios'
import { client } from './prisma/prismaClient'

// fetches data, maps data into data model to be cleanly inserted into db
const fetchPictures = async () => {
    try {
        const response = await axios.get(
            'https://www.reddit.com/r/pics/.json?jsonp='
        )
        // validate json data, make sure data is clean
        return response.data.data.children.map(async (child: any) => {
            const {
                thumbnail,
                score,
                title,
                id,
                author,
                url,
                num_comments,
                thumbnail_width,
                preview,
            } = child.data
            return {
                thumbnail,
                score,
                title,
                id,
                author,
                url,
                num_comments,
                thumbnail_width,
                preview,
            }
        })
    } catch (err) {
        throw new Error('unable to fetch data')
    }
}

const findResolution = (preview: any, thumbnail_width: number) => {
    let selectedResolution = {
        url: '',
        width: 0,
        height: 0,
        distance: 10000,
    }

    preview.images[0].resolutions.forEach(
        ({
            url,
            width,
            height,
        }: {
            url: string
            width: number
            height: number
        }) => {
            if (
                width - thumbnail_width >= 0 &&
                width - thumbnail_width < selectedResolution.distance
            ) {
                selectedResolution = {
                    url,
                    width,
                    height,
                    distance: width - thumbnail_width,
                }
            }
        }
    )
    return selectedResolution
}

const uploadToDb = async (child: any, selectedResolution: any) => {
    const { thumbnail, score, title, id, author, url, num_comments } = child
    try {
        const pic = await client.pics.findUnique({
            where: {
                id,
            },
        })

        if (!pic) {
            await client.pics.create({
                data: {
                    thumbnail,
                    score,
                    title,
                    id,
                    author,
                    url,
                    num_comments,
                    reso: selectedResolution,
                },
            })
            console.log(`Success: Pic ID: ${id} has been inserted into db`)
        } else {
            await client.pics.update({
                where: {
                    id,
                },
                data: {
                    thumbnail,
                    score,
                    title,
                    id,
                    author,
                    url,
                    num_comments,
                    reso: selectedResolution,
                },
            })
            console.log(`Success: Pic ID: ${id} has been updated into db`)
        }
    } catch (err) {
        // most likely a unique id error if db has already been filled
        // if typeof error = PrismaClientRequestError
        console.log(`Error: Pic ID: ${id} cannot be inserted or updated`)
    }
}

const startupFunctions = {
    fetchPictures: async () => {
        try {
            const response = await client.current.create({
                data: {
                    id: 1,
                    picture_id: null,
                },
            })
            console.log('success: current table is seeded')
        } catch (err) {
            console.log('error: current table is most likely already seeded')
        }
        try {
            const response = await fetchPictures()
            response.forEach(async (child: any) => {
                const {
                    thumbnail,
                    score,
                    title,
                    id,
                    author,
                    url,
                    num_comments,
                    thumbnail_width,
                    preview,
                } = await child
                if (preview) {
                    const selectedResolution = findResolution(
                        preview,
                        thumbnail_width
                    )
                    uploadToDb(child, selectedResolution)
                }
            })
        } catch (err) {
            console.log(`unable to grab data from reddit : ${err}`)
        }
    },
}

export default startupFunctions
