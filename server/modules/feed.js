import Image from '../models/image'
import Feed from '../models/feed'
import User from '../models/user'

/**
  NOTE: 전체 경로 조회 (한꺼번에)
**/
export function getAllFeedList (next) {
  return Feed.find({is_ok: 1}).sort({crt_dt: -1}).then((feeds, err) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return feeds
  })
}


/**
  NOTE: 전체 경로 조회 (페이지 단위)
**/
export function getPageFeedList (req, next) {
  const page = (!req.query.page || req.query.page <= 0) ? 1 : req.query.page
  const count = !req.query.count ? 20 : req.query.count

  return Feed.find({is_ok: 1}).sort({crt_dt: -1})
    .limit(count).skip((page-1) * count).then((feeds, err) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return feeds
  })
}


/**
  NOTE: 피드 저장 (저장 전에 이미지들 부터 저장 후 진행)
**/
export function insertFeed (req, res, next) {
  let errDetail = new Error('Database failure.')
  errDetail.status = 500

  return User.findOne({'id': req.query.id, 'platform': req.query.platform}).then(async (user, err) => {
    let newFeed = new Feed()
    newFeed.road_id = req.body.road_id || 0
    newFeed.contents = req.body.contents
    newFeed.walk_langth = req.body.walk_langth || 0
    newFeed.walk_time = req.body.walk_time || 0
    newFeed.walk_count = req.body.walk_count || 0
    newFeed.images = _saveImages(req, res, next)
    newFeed.is_ok = 1
    newFeed.crt_dt = new Date()
    newFeed.udt_dt = newFeed.crt_dt
    const feed = await newFeed.save((err, feed) => {
      if (err) {
        return next(errDetail)
      }
      return feed
    })

    user.feeds.push(newFeed)
    return user.save((err, user) => {
      if (err) {
        return next(errDetail)
      }
      return user
    })
  })
}

function _saveImages (req, res, next) {
  const allFiles = req.files.map.concat(req.files.photo)

  return allFiles.map((v, k) => {
    let newImage = new Image()
    newImage.road_id = req.body.road_id || 0
    newImage.image_url = req.headers.host + '/static/' + v.filename
    newImage.is_map = (v.fieldname === 'map') ? 1 : 0
    newImage.is_ok = 1
    newImage.crt_dt = new Date()
    newImage.udt_dt = newImage.crt_dt
    newImage.save((err, image) => {
      if (err) {
        return next(errDetail)
      }
    })
    return newImage
  })
}


/**
  TODO: 구현
  NOTE: 피드 수정 (저장 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export function updateFeed () {

}


/**
  TODO: 구현
  NOTE: 피드 삭제 (삭제 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export function deleteFeed () {

}
