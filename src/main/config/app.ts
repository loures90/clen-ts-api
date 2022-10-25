import express from 'express'
import middlewares from './middlewares'
import setupRoutes from './routes'
import configSwagger from './swagger'
import staticFiles from './static'

const app = express()
staticFiles(app)
configSwagger(app)
middlewares(app)
setupRoutes(app)
export default app
