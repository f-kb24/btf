import { setupServer } from 'msw/node'
import { rest } from 'msw'
import data from './data'

const handlers = [
    rest.get('http://localhost:9000/pics/getall', (req, res, ctx) => {
        return res(
            ctx.json({
                ...data,
            })
        )
    }),
    rest.post('http://localhost:9000/selection', (req, res, ctx) => {
        return res(
            ctx.json({
                msg: 'updated',
            })
        )
    }),
]

const server = setupServer(...handlers)

export { server, rest }
