import express from 'express'

const router = express.Router()

router.use((req, res, next) => {
  // somthing to do. like, login check...
  next()
})

router.use('/', express.static(__dirname + '/../../'))

router.get('/:id', (req, res) => {
  res.send('world id : ' + req.params.id)
})

export default router
