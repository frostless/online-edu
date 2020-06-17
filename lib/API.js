import REST from "./rest";

class API {
  /**
   * Returns a login result promise object.
   *
   * @param {string} req login credential in Json
   * @return {promise} login result in promise
   */
  static login(req) {
    return REST.post('teacher/login', req);
  }

  /**
   * Returns a student list promise object.
   *
   * @return {promise} student list in promise
   */
  static getStudentList() {
    return REST.get('student/list');
  }
}

export default API;
