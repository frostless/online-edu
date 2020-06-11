import REST from "./rest";

const _baseURL = "http://t.ztest.org/api/";

class API {
/**
 * Returns a login result promise object.
 *
 * @param {string} req the output login credential Json
 * @return {promise} login result in promise
 */
  static Login(req) {
    const url = 'teacher/login';
    return REST.post(`${_baseURL}${url}`, req);
  }
}

export default API
