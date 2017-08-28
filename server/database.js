import mongoose from 'mongoose'

const db = mongoose.connection

export default function database () {
  _connect()
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', console.log.bind(console, "Connected to mongod server"))
  db.on('disconnected', _connect)
}

function _connect() {
  mongoose.connect('mongodb://127.0.0.1:27017', { useMongoClient: true })
}
