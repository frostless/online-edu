import REST from "./rest";
import User from "./user";
import Router from "next/router";
import Error from "../models/error";

 /**
   * * @param {object} object with key and value
   *
   * @return {string} query string
   */
  const objectToQuery = (param) => {
    if(!param) return;
    return '?' + Object.keys(param).map((i) => {
      return i + "=" + param[i];
    }).join('&')
  }

class API {
  /**
   * Returns a teacher login result promise object.
   *
   * @param {string} req teacher login credential in Json
   * @return {promise} login result in promise
   */
  static teacherLogin(req) {
    return REST.post("teacher/login", req);
  }

  /**
   * Returns a student login result promise object.
   *
   * @param {string} req login credential in Json
   * @return {promise} login stuent result in promise
   */
  static studentLogin(req) {
    return REST.post("student/login", req);
  }

  /**
   * Logout from the system
   * @Logout
   */
  static logout() {
    User.deleteToken();
    Router.push("/");
  }

  /**
   * Returns a student list promise object.
   * @param {string} param query string
   *
   * @return {promise} student list in promise
   */
  static getStudentList(param) {
    return REST.get(`student/list${objectToQuery(param)}`);
  }

  /**
   * Returns a course list promise object.
   * @param {string} param query string
   *
   * @return {promise} course list in promise
   */
  static getCourseList(param) {
    return REST.get(`course/list${objectToQuery(param)}`);
  }

  /**
   * Returns a course type list promise object.
   *
   * @return {promise} course type list in promise
   */
  static getCourseTypeList() {
    return REST.get("course/type/list");
  }

  /**
   * @param {object} new course
   * add a new course
   */
  static addCourse(param) {
    return REST.post("course/add", param);
  }

  /**
   * @param {object} updated course
   * update a existing course
   */
  static updateCourse(param) {
    return REST.post("course/update", param);
  }

  /**
   * @param course id
   * get a student by id
   *  @return {promise} course object
   */
  static getCourse(param) {
    return REST.get(`course/info?id=${param}`);
  }

  /**
   * @param {object} new student
   * add a new student
   */
  static addStudent(param) {
    return REST.post("student/add", param);
  }

  /**
   * @param {object} updated student
   * update a existing student
   */
  static updateStudent(param) {
    return REST.post("student/update", param);
  }

  /**
   * @param student id
   * get a student by id
   *  @return {promise} student object
   */
  static getStudent(param) {
    return REST.get(`student/info?id=${param}`);
  }

  /**
   * Returns a student type list promise object.
   *
   * @return {promise} student type list in promise
   */
  static getStudentTypeList() {
    return REST.get("student/type/list");
  }

  /**
   * Returns a student course list promise object.
   *
   * @return {promise} student course list in promise
   */
  static getStudentCourseList(param) {
    return REST.get(`student/course/list${objectToQuery(param)}`);
  }

   /**
   *
   * @return {promise} add student course
   */
  static addStudetCourse(param) {
    return REST.post("student/course/add", param);
  }

  /**
   *
   * @return {promise} delete a student
   */
  static deleteStudent(param) {
    return REST.post("student/delete", param);
  }

   /**
   *
   * @return {promise} delete a student type
   */
  static deleteStudentType(param) {
    return REST.post("student/type/delete", param);
  }

  /**
   *
   * @return {promise} delete a course
   */
  static deleteCourse(param) {
    return REST.post("course/delete", param);
  }

  /**
   *
   * @return {promise} delete a course type
   */
  static deleteCourseType(param) {
    return REST.post("course/type/delete", param);
  }

   /**
   *
   * @param API reponse in  Promise
   * @return {result} bool indicating API request result
   */
  static CheckAPIResult(param) {
    return param instanceof Error ? false: true;
  }
}

export default API;
