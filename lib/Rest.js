import Axios from "./Axios";
import Logger from "./logger"

class REST {
  /**
   * Returns a axios get promise object.
   *
   * @param {string} url the url for http get
   * @return {promise} axios get promise object
   */
  static async get(url) {
    let res;
    try {
      res = await Axios.get(url);
      if (res.data.code != 0) {
        throw `Cannot get student list, error code: {res.data.code }`;
      }
    } catch (e) {
      Logger.log(e);
    }
    return res;
  }

  /**
   * Returns a axios get promise object.
   *
   * @param {string} url the url for http post
   * @param {string} req the post body in Json
   * @return {promise} axios post promise object
   */
  static post(url, req) {
    return Axios.post(url, req);
  }
}

export default REST;
