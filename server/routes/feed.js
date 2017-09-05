import express from 'express'
import bodyParser from 'body-parser'

import { insertFeed, updateFeed, deleteFeed, getAllFeedList, getPageFeedList } from '../modules/feed'
import { imageUpload } from '../middleware/image'

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))

router.route('/').get(async (req, res, next) => {
  let results = null
  if (req.query.page) {
    results = await getPageFeedList(req, next)
  } else {
    results = await getAllFeedList(next)
  }
  if (typeof results !== 'undefined') {
    res.send({
      code: 200,
      results: results
    })
  } else {
    return next('route')
  }
}).post(imageUpload, async (req, res, next) => {
  const results = await insertFeed(req, res, next)
  if (typeof results !== 'undefined') {
    res.send({
      code: 200,
      results: results
    })
  } else {
    return next('route')
  }
})

router.route('/:id').put(imageUpload, (req, res, next) => {
  res.send(`put - /feed/${req.params.id}`)
}).delete((req, res, next) => {
  res.send(`delete - /feed/${req.params.id}`)
})

export default router

// clear      : /srb/vbeta/feed?page=2                         // 전체 피드 히스토리 조회, 피드 생성
//            : /srb/vbeta/feed/:id                            // 특정 피드 수정, 삭제 (특정 게시글 조회는 불가)
