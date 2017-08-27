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

router.route('/:id').get((req, res) => {    // 조회
  res.send(`get - /feeds/${req.params.id}`)
}).put((req, res) => {                        // 수정
  res.send(`put - /feeds/${req.params.id}`)
}).delete((req, res) => {                     // 삭제
  res.send(`delete - /feeds/${req.params.id}`)
})

export default router

// clear      : authentication                      // 공통 middleware. 인증
//            : /srb/vbeta/feeds?page=2             // 피드들 조회, 생성
//            : /srb/vbeta/feeds/:id                // 특정 게시글 조회, 수정, 삭제
