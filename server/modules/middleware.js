import axios from 'axios'

export function authentication (req, res, next) {
  const keyList = Object.keys(req.query)

  if (keyList.length > 0 && keyList.includes('token') && keyList.includes('id')
    && keyList.includes('platform')) {
    switch(req.query.platform) {
      case 'facebook':
        return _commonAuth(next,
          'https://graph.facebook.com/me?fields=id,name,picture&access_token=',
          req.query, true)
        break

      case 'google':
        return _commonAuth(next,
          'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=',
          req.query, true)
        break

      case 'kakaotalk':
        return _commonAuth(next,
          'https://kapi.kakao.com/v1/user/access_token_info',
          req.query, true, {
          'Authorization': 'Bearer ' + req.query.token
        })
        break
    }
  }
  let errDetail = new Error('You didn\'t have authentication.')
  errDetail.status = 401
  return next(errDetail)
}

function _commonAuth(next, url, query, includeToken, headers) {
  let mergedUrl = includeToken ? url + query.token : mergedUrl = url
  let options = {}

  options.headers = (!headers || Object.keys(headers).length <= 0) ?
    {} : options.headers = headers

  return axios.get(mergedUrl, options).then(res => {
    if ((query.platform === 'facebook' && res.data.id === query.id)
      || (query.platform === 'google' && res.email === query.id)
      || (query.platform === 'kakaotalk' && res.id === query.id)) {
      return next()
    }
  }).catch(err => {
    let errDetail = new Error('You didn\'t have authentication.')
    errDetail.status = 401
    return next(errDetail)
  })
}
