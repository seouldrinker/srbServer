import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

// [routes]
import index from './routes/index'
import explore from './routes/explore'
import feeds from './routes/feeds'
import info from './routes/info'

import database from './database'

import { DB_URL, SESSION_SECRET } from './config'

const app = express()
const router = express.Router()
const port = 3000

// [DB Config]
const db = mongoose.createConnection(DB_URL, { useMongoClient: true })
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, "Connected to mongod server"))

app.use((req, res, next) => {
  req.models = database(db)
  next()
})

// config - logs, cookie, cors, route, exception
app.use(morgan('combined', {stream: fs.createWriteStream(path.join(__dirname + '/../logs', 'access.log'), {flags: 'a'})}))
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/srb/vbeta/explore', explore)
app.use('/srb/vbeta/feeds', feeds)
app.use('/srb/vbeta/info', info)
app.use('/', index)

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    code: err.status || 500,
    message: err.message || 'Server error'
  })
})

const server = app.listen(port, () => {
  console.log('Express listening on port', port)
})
