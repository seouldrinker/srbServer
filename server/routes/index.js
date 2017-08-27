import express from 'express'
import axios from 'axios'
import { authentication } from '../modules/middleware'

const router = express.Router()

router.use('/', express.static(__dirname + '/../../'))
router.use('/static', express.static(__dirname + '/../../feeds'))

router.use(authentication)
router.get('/:id', (req, res) => {
  res.send('world id : ' + req.params.id + ' ' + req.query.test)
})

export default router

// clear: authentication             // 공통 middleware. 인증
// clear: /                          // 걍 html이나 json
//      : /srb/vbeta/static          // 이미지 저장 경로
//      : /srb/vbeta/explore         // 없음
//      : /srb/vbeta/explore/:id     // 사용자가 길 경로들에 올린 이미지
//      : /srb/vbeta/feeds           // 없음
//      : /srb/vbeta/feeds/:page     // 최신 20개 정도씩 긁어가도록...
//      : /srb/vbeta/feeds/update    // 업데이트
//      : /srb/vbeta/info            // 해당 사용자의 정보와 Feed(기본 20개를 줌)
//      : /srb/vbeta/info/:page      // 해당 사용자의 피드 20개 (처응메 20개를 주니까 무조건 2페이지부터)
