import axios from 'axios'
import { API_KEY } from '../config'

export async function getFilteredAllWalkCourse(session, next) {
  if (!session.getFilteredAllWalkCourse) {
    session.getFilteredAllWalkCourse
      = _filterWalkCourse(await _collectWalkAllCourse(next))
  }
  return session.getFilteredAllWalkCourse
}

export async function getFilteredAllWalkCourseCount(session, next) {
  if (!session.getFilteredAllWalkCourseCount) {
    session.getFilteredAllWalkCourseCount
      = _filterWalkCourse(await _collectWalkAllCourse(next)).length
  }
  return session.getFilteredAllWalkCourseCount
}

export async function getAllWalkCourse(session, next) {
  if (!session.getAllWalkCourse) {
    session.getAllWalkCourse = await _collectWalkAllCourse(next)
  }
  return session.getAllWalkCourse
}

export async function getAllWalkCourseCount(session, next) {
  if (!session.getAllWalkCourseCount) {
    session.getAllWalkCourseCount = await _collectWalkAllCourse(next).length
  }
  return session.getAllWalkCourseCount
}

export async function getOneWalkCourse(id, next) {
  const roads = await _queryOneWalkCourse(id, next)
  return roads.data.SeoulGilWalkCourse.row[0]
}

async function _collectWalkAllCourse(next) {
  let results = []
  let roads = await _queryAllWalkCourse(1, 1000, next)
  const course = roads.data.SeoulGilWalkCourse
  const totalPageCount = Math.ceil(course.list_total_count/1000)
  results = results.concat(course.row)

  for (let i=2; i<=totalPageCount; i++) {
    const endCount = i * 1000
    const startCount = endCount - 1000 + 1
    roads = await _queryAllWalkCourse(startCount, endCount, next)
    results = results.concat(roads.data.SeoulGilWalkCourse.row)
  }
  // console.log(results.length)
  return results
}

function _queryOneWalkCourse(id, next) {
  return _getWalkCourse(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/SeoulGilWalkCourse/1/1000/${id}`, next)
}

function _queryAllWalkCourse(startCount, endCount, next) {
  return _getWalkCourse(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/SeoulGilWalkCourse/${startCount}/${endCount}`, next)
}

async function _getWalkCourse(url, next) {
  const results = await axios.get(url)
  const course = results.data.SeoulGilWalkCourse
  let errDetail = null

  // Success
  if (course && course.RESULT.CODE === 'INFO-000' && course.list_total_count > 0) {
    return results
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
}

function _filterWalkCourse(course) {
  let courseNameArr = []
  let flagSaveArea = {}

  // Put a flag on the save area use the same names
  for (let i=0; i<course.length; i++) {
    if (!flagSaveArea[course[i].COURSE_NAME]
      || flagSaveArea[course[i].COURSE_NAME] === undefined) {
      flagSaveArea[course[i].COURSE_NAME] = course[i]
    }
  }
  // Removed same name values
  for (var i in flagSaveArea) {
    courseNameArr[courseNameArr.length] = flagSaveArea[i]
  }
  return courseNameArr
}
