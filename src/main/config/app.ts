import express from 'express'
import middlewares from './middlewares'
import setupRoutes from './routes'
import configSwagger from './swagger'

const app = express()
configSwagger(app)
middlewares(app)
setupRoutes(app)
export default app
