import { Pics } from '@prisma/client'
import express from 'express'
import { client } from '../prisma/prismaClient'

const picRouter = express.Router()

picRouter
    .route('/getall')
    .get(async (req, res, next) => {
        try {
            const pics = await client.pics.findMany()
            if (!pics) {
                next(new Error('pictures unavailable'))
            } else {
                // return 20 pictures sorted by socre
                pics.sort((a: Pics, b: Pics) => b.score - a.score)
                const slicedPics = pics.slice(0, 20)
                res.json(slicedPics)
            }
        } catch (err) {
            next(err)
        }
    })
    .post(async (req, res, next) => {})

export default picRouter
