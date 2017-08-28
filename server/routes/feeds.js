import express from 'express'
import axios from 'axios'
import { authentication } from '../modules/middleware'

const router = express.Router()

// router.use(authentication)

router.route('/').get((req, res) => {
  res.send(`get - /feeds${req.query.page ? `?page=${req.query.page}` : ''}`)
}).post((req, res) => {
  res.send('post - /feeds')
})

router.route('/:id').put((req, res) => {                        // 수정
  res.send(`put - /feeds/${req.params.id}`)
}).delete((req, res) => {                     // 삭제
  res.send(`delete - /feeds/${req.params.id}`)
})

router.get('/explore/:explore_id', (req, res) => {
  res.send(`get - /feeds/explore/${req.params.explore_id}${req.query.page ? `?page=${req.query.page}` : ''}`)
})

router.get('/user/:user_id', (req, res) => {
  res.send(`get - /feeds/user/${req.params.user_id}${req.query.page ? `?page=${req.query.page}` : ''}`)
})

export default router

// clear      : authentication                                  // 공통 middleware. 인증
//            : /srb/vbeta/feeds?page=2                         // 전체 피드 히스토리 조회, 피드 생성
//            : /srb/vbeta/feeds/:id                            // 특정 피드 수정, 삭제 (특정 게시글 조회는 불가)
//            : /srb/vbeta/feeds/explore/:explore_id?page=2     // 특정 둘레길의 피드 히스토리 조회
//            : /srb/vbeta/feeds/user/:user_id?page=2           // 특정 사용자의 피드 히스토리 조회
