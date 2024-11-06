import { MongoClient } from 'mongodb'
import { isDevelopment } from './environment'

export const databaseName = 'dan-edwards-creative-analytics'
export const tableNames = {
  pageViews: 'page-views',
  preSaves: 'pre-saves',
  linkClicks: 'link-clicks',
}

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI missing')
}

const uri = process.env.MONGODB_URI

interface GlobalWithMongo extends Global {
  _mongoClientPromise?: Promise<MongoClient>
}

declare const global: GlobalWithMongo

let client: MongoClient
let mongoClient: Promise<MongoClient>

if (isDevelopment) {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  mongoClient = global._mongoClientPromise!
} else {
  client = new MongoClient(uri)
  mongoClient = client.connect()
}

export default mongoClient
