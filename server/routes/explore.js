import express from 'express'
import axios from 'axios'
import { authentication } from '../modules/middleware'

const router = express.Router()

// router.use(authentication)

router.get('/', (req, res) => {
  res.send(`get - /explore${req.query.page ? `?page=${req.query.page}` : ''}`)
})

router.get('/:id', (req, res) => {
  res.send(`get - /explore/${req.params.id}`)
})

export default router

// clear      : authentication                    // 공통 middleware. 인증
//            : /srb/vbeta/explore?page=2         // 서울시 API를 읽어와서 둘레길 리스트 뿌려주기. 사용자가 올린 길 경로들에 대해서 처음 20개를 제공
//            : /srb/vbeta/explore/:id            // 특정 둘레길에 대한 정보. 사용자가 길 경로들에 올린 이미지는 feeds에서 따로 가져오기
