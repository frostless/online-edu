import Axios from "./Axios";

class REST {
  /**
   * Returns a axios get promise object.
   *
   * @param {string} url the url for http get
   * @return {promise} axios get promise object
   */
  static get(url) {
    return Axios.get(url, req);
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
