import express from 'express'
import { createServer as createViteServer } from 'vite'
import SurveyRouter from './api/surveys'

async function startServer() {
    const app = express()
    const port = 5173

    app.use(express.json())
    app.use('/api/survey', SurveyRouter)

    const vite = await createViteServer({
        server: { middlewareMode: true },
    })

    app.use(vite.middlewares)

    return app.listen(port)
}

const server = await startServer()

if (import.meta.hot) {
    import.meta.hot.on('vite:beforeFullReload', () => {
        server.close()
    })

    import.meta.hot.dispose(() => {
        server.close()
    })
}
