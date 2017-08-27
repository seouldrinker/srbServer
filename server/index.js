import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import index from './routes/index'

const app = express()
const port = 3000

// config - logs, cookie, cors, route, exception
app.use(morgan('combined', {stream: fs.createWriteStream(path.join(__dirname + '/../logs', 'access.log'), {flags: 'a'})}))
app.use(cookieParser())
app.use(cors())
app.use('/', index)

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    code: err.status || 500,
    message: err.message || 'Server error'
  })
})


const server = app.listen(port, () => {
  console.log('Express listening on port', port)
})
