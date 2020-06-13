import REST from "./Rest";

class API {
  /**
   * Returns a login result promise object.
   *
   * @param {string} req the output login credential Json
   * @return {promise} login result in promise
   */
  static teachLogin(req) {
    return REST.post("teacher/login", req);
  }

  /**
   * Returns a student list promise object.
   *
   * @return {promise} student list in promise
   */
  static studentList() {
    return REST.get(`student/list`, req);
  }
}

export default API;
