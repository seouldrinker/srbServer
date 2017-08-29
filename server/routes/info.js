import express from 'express'
import axios from 'axios'
import { authentication } from '../middleware/authentication'

const router = express.Router()

// router.use(authentication)

router.get('/', (req, res) => {
  res.send(`/info`)
})

export default router

// clear      : authentication             // 공통 middleware. 인증
//            : /srb/vbeta/info            // 해당 사용자의 정보들. 피드 히스토리는 따로 가져오기
