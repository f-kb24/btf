import express, {
    Express,
    Request,
    Response,
    json,
    ErrorRequestHandler,
} from 'express'
import axios from 'axios'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import picRouter from './routes/pics'
import selectionRouter from './routes/selection'
import startupFunctions from './startupFunctions'

dotenv.config()
const app: Express = express()
const port = process.env.PORT

app.use(cors())
app.use(json())
app.use(morgan('tiny'))
app.use('/pics', picRouter)
app.use('/', selectionRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: `${err.name}: ${err.message}` })
}
app.use(errorHandler)

app.listen(port, async () => {
    console.log(`[server]: Server is running on port: ${port}`)
    //fetchdata()
    await startupFunctions.fetchPictures()
})
