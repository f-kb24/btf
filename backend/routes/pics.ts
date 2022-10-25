import express from 'express'
import { client } from '../prisma/prismaClient'

const picRouter = express.Router()

picRouter
    .route('/getall')
    .get(async (req, res, next) => {
        try {
            const pics = await client.pics.findMany()
            if (!pics) {
                next(new Error('picture unavailable'))
            } else {
                res.json(pics)
            }
        } catch (err) {
            next(err)
        }
    })
    .post(async (req, res, next) => {})

export default picRouter
