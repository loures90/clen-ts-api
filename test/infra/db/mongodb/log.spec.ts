import { Collection } from 'mongodb'
import { mongoHelper } from '../../../../src/infra/db/mongodb'
import { LogMongoRepository } from '../../../../src/infra/db/mongodb'

describe('LogMongoRepository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })
  beforeEach(async () => {
    errorCollection = await mongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })
  test('Should create a logError on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
