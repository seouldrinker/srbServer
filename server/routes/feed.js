import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import { imageUpload, saveFeed } from '../modules/feed'

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

router.route('/').get((req, res) => {
  res.send(`get - /feed${req.query.page ? `?page=${req.query.page}` : ''}`)
}).post(imageUpload, async (req, res, next) => {
  const results = await saveFeed(req, res, next)
  if (typeof results !== 'undefined') {
    res.send({
      code: 200,
      results: results
    })
  } else {
    return next('route')
  }
})

router.route('/:id').put((req, res) => {                        // 수정
  res.send(`put - /feed/${req.params.id}`)
}).delete((req, res) => {                     // 삭제
  res.send(`delete - /feed/${req.params.id}`)
})

router.get('/explore/:explore_id', (req, res) => {
  res.send(`get - /feed/explore/${req.params.explore_id}${req.query.page ? `?page=${req.query.page}` : ''}`)
})

router.get('/user/:user_id', (req, res) => {
  res.send(`get - /feed/user/${req.params.user_id}${req.query.page ? `?page=${req.query.page}` : ''}`)
})

export default router

// clear      : /srb/vbeta/feed?page=2                         // 전체 피드 히스토리 조회, 피드 생성
// clear      : /srb/vbeta/feed/:id                            // 특정 피드 수정, 삭제 (특정 게시글 조회는 불가)
//            : /srb/vbeta/feed/explore/:explore_id?page=2     // 특정 둘레길의 피드 히스토리 조회
//            : /srb/vbeta/feed/user/:user_id?page=2           // 특정 사용자의 피드 히스토리 조회
