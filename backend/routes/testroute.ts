import express from 'express'
import { client } from '../prisma/prismaClient'

const authRouter = express.Router()

authRouter
    .route('/hello/:id')
    .get(async (req, res, next) => {
        try {
            const parsedId = parseInt(req.params.id)
            const user = await client.user.findUnique({
                where: {
                    id: parsedId,
                },
            })
            if (!user) {
                next(new Error('no user with that'))
            } else {
                res.json(user)
            }
        } catch (err) {
            next(err)
        }
    })
    .post(async (req, res, next) => {
        const { name, email } = req.body
        try {
            const user = await client.user.create({
                data: {
                    name,
                    email,
                },
            })
            res.json(user)
        } catch (err) {
            next(err)
        }
    })

export default authRouter
