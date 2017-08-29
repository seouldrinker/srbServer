import mongoose from 'mongoose'
import { DB_URL } from './config'

const db = mongoose.connection

export default function database () {
  _connect()
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', console.log.bind(console, "Connected to mongod server"))
  db.on('disconnected', _connect)
}

function _connect() {
  mongoose.connect(DB_URL, { useMongoClient: true })
}
