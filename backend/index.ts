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
import { client } from './prisma/prismaClient'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors())
app.use(json())
app.use(morgan('tiny'))
app.use('/pics', picRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: `${err.name}: ${err.message}` })
}
app.use(errorHandler)

app.listen(port, async () => {
    console.log(`[server]: Server is running on port: ${port}`)
    try {
        const response = await axios.get(
            'https://www.reddit.com/r/pics/.json?jsonp='
        )
        response.data.data.children.forEach(async (child: any) => {
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

            // apparently some children do not have preview
            if (preview) {
                let selectedResolution = {
                    url: '',
                    width: 0,
                    height: 0,
                    distance: 10000,
                }
                // find the resolution object with the next biggest width
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
                            width - thumbnail_width > 0 &&
                            width - thumbnail_width <
                                selectedResolution.distance
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
                try {
                    const response = await client.pics.create({
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
                    console.log(response)
                } catch (err) {
                    // most likely a unique id error if db has already been filled
                    // if typeof error = PrismaClientRequestError
                    console.log(
                        `Pic ID: ${id} unable to insert into db: most likely a unique foreign key error`
                    )
                }
            }
        })
    } catch (err) {
        console.log(`unable to grab data from reddit : ${err}`)
    }
})
