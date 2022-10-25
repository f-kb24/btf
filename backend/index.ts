import express, {
    Express,
    Request,
    Response,
    json,
    ErrorRequestHandler,
} from 'express'

import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import testRouter from './routes/testroute'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors())
app.use(json())
app.use(morgan('tiny'))
app.use('/route', testRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: `${err.name}: ${err.message}` })
}
app.use(errorHandler)

app.listen(port, () => {
    console.log(`[server]: Server is running on port: ${port}`)
})
