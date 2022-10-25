import { Pics, prisma } from '@prisma/client'
import express from 'express'
import { client } from '../prisma/prismaClient'

const selectionRouter = express.Router()

selectionRouter
    .route('/selection')
    .get(async (req, res, next) => {
        try {
            const pic = await client.current.findUnique({
                where: {
                    id: 1,
                },
            })
            if (!pic) {
                res.json({ pictureId: null })
            } else {
                res.json({ pictureId: pic.picture_id })
            }
        } catch (err) {
            next(err)
        }
    })
    .post(async (req, res, next) => {
        const { picture_id } = req.body
        try {
            const update = await client.current.update({
                where: {
                    id: 1,
                },
                data: {
                    picture_id,
                },
            })
            console.log(update)
            res.statusCode = 201
            res.json({ msg: `updated ${picture_id}` })
        } catch (err) {
            next(err)
        }
    })

export default selectionRouter
