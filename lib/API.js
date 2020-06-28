import REST from "./rest";
import Token from "./token";
import Router from "next/router";

class API {
  /**
   * Returns a login result promise object.
   *
   * @param {string} req login credential in Json
   * @return {promise} login result in promise
   */
  static login(req) {
    return REST.post("teacher/login", req);
  }

  /**
   * Logout from the system
   * @Logout
   */
  static logout() {
    Token.deleteToken();
    Router.push("/");
  }

  /**
   * Returns a student list promise object.
   *
   * @return {promise} student list in promise
   */
  static getStudentList() {
    return REST.get("student/list");
  }

  /**
   * Returns a course list promise object.
   *
   * @return {promise} course list in promise
   */
  static getCourseList() {
    return REST.get("course/list");
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
  static getStudentCourseList() {
    return REST.get("student/course/list");
  }

   /**
   *
   * @return {promise} add student course
   */
  static addStudetCourse(param) {
    return REST.post("student/course/add", param);
  }
}

export default API;
