import Image from '../../models/image'

/**
  NOTE: 특정 코스의 이미지들 조회
**/
export function getImagesOfWalkCourse (params, next) {
  return Image.find({road_id: 'test', is_map: 0, is_ok: 1})
    .select('image_url').sort({crt_dt: -1}).then((images, err) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    let imageUrls = []
    for (var i=0; i<images.length; i++) {
      imageUrls.push(images[i].image_url)
    }
    return imageUrls
  })
}
