export function authentication (req, res, next) {
  const keyList = Object.keys(req.query)

  if (keyList.length > 0 && keyList.includes('token') && keyList.includes('id') && keyList.includes('platform')) {
    switch(req.query.platform) {
      case 'facebook':
        axios.get('https://graph.facebook.com/me?fields=id,name,picture&access_token=' + req.query.token).then(res => {
          if (res.data.id === req.query.id) {
            return next()
          }
        }).catch(err => {
          let errDetail = new Error('You didn\'t have authentication.')
          errDetail.status = 401
          return next(errDetail)
        })
        break

      case 'google':
        axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + req.query.tken).then(res => {
          if (res.email === req.query.id) {
            return next()
          }
        }).catch(err => {
          let errDetail = new Error('You didn\'t have authentication.')
          errDetail.status = 401
          return next(errDetail)
        })
        break

      case 'kakaotalk':
        axios.get('https://kapi.kakao.com/v1/user/access_token_info', {
          headers: {
            'Authorization': 'Bearer ' + req.query.token
          }
        }).then(res => {
          if (res.id === req.query.id) {
            return next()
          }
        }).catch(err => {
          let errDetail = new Error('You didn\'t have authentication.')
          errDetail.status = 401
          return next(errDetail)
        })
        break
    }
  }
  let errDetail = new Error('You didn\'t have authentication.')
  errDetail.status = 401
  return next(errDetail)
}
