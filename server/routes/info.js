import express from 'express'
import axios from 'axios'
import { authentication } from '../modules/middleware'

const router = express.Router()

// router.use(authentication)

router.get('/', (req, res) => {
  res.send(`/info${req.query.page ? `?page=${req.query.page}` : ''}`)
})

export default router

// clear      : authentication             // 공통 middleware. 인증
//            : /srb/vbeta/info?page=2     // 해당 사용자의 정보와 Feed(기본 20개를 줌) page로 다음 페이지
