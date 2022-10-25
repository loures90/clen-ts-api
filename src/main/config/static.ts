import express, { Express } from 'express'
import path from 'path'

export default (app: Express): void => {
  app.use('/static', express.static(path.join(__dirname, '../../static')))
}
