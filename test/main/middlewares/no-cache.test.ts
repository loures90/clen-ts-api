import request from 'supertest'
import app from '../../../src/main/config/app'
import { noCache } from '../../../src/main/middlewares/no-cache'

describe('NoCache middleware', () => {
  test('Should enable nocache', async () => {
    app.get('/no_cache', noCache, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
