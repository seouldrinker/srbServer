import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

// import database from './database'

import index from './routes/index'
import explore from './routes/explore'
import feeds from './routes/feeds'
import info from './routes/info'

import { SESSION_SECRET } from './config'

const app = express()
const port = 3000

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
app.use(bodyParser.json());
// database()

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
