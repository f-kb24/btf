import { Pics } from '@prisma/client'
import express from 'express'
import { client } from '../prisma/prismaClient'

const picRouter = express.Router()

picRouter.route('/getall').get(async (req, res, next) => {
    try {
        const pics = await client.pics.findMany()
        const selectedPic = await client.current.findUnique({
            where: {
                id: 1,
            },
        })
        if (!pics) {
            next(new Error('pictures unavailable'))
        } else {
            // return 20 pictures sorted by score
            // also return if there's a selected picture
            pics.sort((a: Pics, b: Pics) => b.score - a.score)
            const slicedPics = pics.slice(0, 20)
            res.json({
                pictures: slicedPics,
                selected: selectedPic?.picture_id,
            })
        }
    } catch (err) {
        next(err)
    }
})

export default picRouter
