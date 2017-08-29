import axios from 'axios'
import { API_KEY } from '../config'

export function getFilteredWalkCourse(startPage, endPage, next) {
  return _getCommonWalkCourse(startPage, endPage, next, course => {
    return _filterWalkCourse(course)
  })
}

export function getAllWalkCourse(startPage, endPage, next) {
  return _getCommonWalkCourse(startPage, endPage, next, course => {
    return course.row
  })
}

function _getCommonWalkCourse(startPage, endPage, next, func) {
  return axios.get(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/SeoulGilWalkCourse/${startPage}/${endPage}`).then(results => {
    const course = results.data.SeoulGilWalkCourse
    let errDetail = null

    // Success
    if (course && course.RESULT.CODE === 'INFO-000' && course.list_total_count > 0) {
      return func(course)
    } else if (results.data.RESULT.CODE === 'INFO-100') {
      errDetail = new Error('Invalid API KEY')
      errDetail.status = 403
    } else if (results.data.RESULT.CODE === 'INFO-200') {
      errDetail = new Error('Have no return value')
      errDetail.status = 406
    } else {
      errDetail = new Error('Server error')
      errDetail.status = 500
    }
    return next(errDetail)
  }).catch(e => {
    let errDetail = new Error('Server error')
    errDetail.status = 500
    return next(errDetail)
  })
}

function _filterWalkCourse(course) {
  let courseNameArr = []
  let flagSaveArea = {}

  // Put a flag on the save area use the same names
  for (let i=0; i<course.row.length; i++) {
    flagSaveArea[course.row[i].COURSE_NAME] = course.row[i]
  }
  // Removed same name values
  for (var i in flagSaveArea) {
    courseNameArr[courseNameArr.length] = flagSaveArea[i]
  }
  return courseNameArr
}
