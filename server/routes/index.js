import express from 'express'
import axios from 'axios'

const router = express.Router()

router.use((req, res, next) => {
  const keyList = Object.keys(req.query)
  if (keyList.length > 0 && keyList.includes('access_token') && keyList.includes('id') && keyList.includes('platform')) {
    axios.get('https://graph.facebook.com/me?fields=id,name,picture&access_token=' + req.query.access_token).then(res => {
      if (res.data.id === req.query.id) {
        next()
      }
    }).catch(function(err) {
      let errDetail = new Error('You didn\'t have authentication.')
      errDetail.status = 401
      return next(errDetail)
    })
  }
})

router.use('/', express.static(__dirname + '/../../'))
router.use('/static', express.static(__dirname + '/../../feeds'))

router.get('/:id', (req, res) => {
  res.send('world id : ' + req.params.id + ' ' + req.query.test)
})

export default router
