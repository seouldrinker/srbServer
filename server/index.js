import express from 'express'
import index from './routes/index'

const app = express()
const port = 3000

app.use('/', index)

const server = app.listen(port, () => {
  console.log('Express listening on port', port)
})
