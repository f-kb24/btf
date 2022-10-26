import { Pics } from '@prisma/client'
import express from 'express'
import { client } from '../prisma/prismaClient'

const picRouter = express.Router()

picRouter.route('/getall').get(async (req, res, next) => {
    try {
        const pics = await client.pics.findMany({
            orderBy: [
                {
                    score: 'desc',
                },
            ],
            take: 20,
        })
        const selectedPic = await client.current.findUnique({
            where: {
                id: 1,
            },
        })
        const pictureId = selectedPic?.picture_id ? selectedPic.picture_id : '0'

        const pic = await client.pics.findUnique({
            where: {
                id: pictureId,
            },
        })
        if (!pics) {
            next(new Error('pictures unavailable'))
        } else {
            // return 20 pictures sorted by score
            // also return if there's a selected picture
            res.json({
                pictures: pics,
                selected: pic,
            })
        }
    } catch (err) {
        next(err)
    }
})

export default picRouter
