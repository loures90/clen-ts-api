import express from 'express'
import middlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
middlewares(app)
setupRoutes(app)
export default app
