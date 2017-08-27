import express from 'express'
import axios from 'axios'
import { authentication } from '../modules/middleware'

const router = express.Router()

router.use('/', express.static(__dirname + '/../../'))
router.use('/static', express.static(__dirname + '/../../feeds'))

export default router

// clear      : /                          // json
// processing : /static                    // 이미지 저장 경로
