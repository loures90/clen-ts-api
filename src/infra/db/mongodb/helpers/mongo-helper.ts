import { Collection, MongoClient } from 'mongodb'

export default {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {})
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection > {
    const collection = await this.client.db().collection(name)
    return collection
  }
}
