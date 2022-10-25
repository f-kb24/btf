import express from 'express'

const testRouter = express.Router()

testRouter.route('/hello/:id').get((req, res, next) => {
    try {
        const parsedId = parseInt(req.params.id)
        res.json({ yourId: parsedId })
    } catch (err) {
        next(err)
    }
})

export default testRouter
