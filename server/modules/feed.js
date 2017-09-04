import multer from 'multer'

import Image from '../model/image'
import Feed from '../model/feed'
import User from '../model/user'

export function imageUpload (req, res, next) {
  let mapCounter = 0
  let imageCounter = 0

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'feeds/')
      },
      filename: function (req, file, cb) {
        const currentDate = new Date()
        cb(null, file.fieldname
          + (file.fieldname === 'map' ? mapCounter++ : imageCounter++) + '_'
          + currentDate.getFullYear()
          + (currentDate.getMonth() < 10 ? '0' : '') + currentDate.getMonth()
          + (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate()
          + (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours()
          + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()
          + (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds()
          + '.' + file.mimetype.split('/')[1])
      }
    })
  }).fields([
    { name: 'map', maxCount: 1 },
    { name: 'photo', maxCount: 100 }
  ])

  upload(req, res, function (err) {
    if (!err) {
      return next()
    }
    let errDetail = new Error('Image save failure.')
    errDetail.status = 500
    return next(errDetail)
  })
}

export async function saveFeed (req, res, next) {
  let errDetail = new Error('Database failure.')
  errDetail.status = 500

  return await User.findOne({'id': req.query.id, 'platform': req.query.platform}).then(async (user, err) => {
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
    console.log(req.body)
    const feed = await newFeed.save(async (err, feed) => {
      if (err) {
        return next(errDetail)
      }
      return feed
    })

    user.feeds.push(newFeed)
    return await user.save((err, user) => {
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
    newImage.image_url = req.headers.host + '/static/' + v.filename
    if (v.fieldname === 'map') {
      newImage.is_map = 1
    } else {
      newImage.is_map = 0
    }
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
