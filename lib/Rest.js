import Axios from "./axios";
import Logger from "./logger";
import Router from "next/router";

class REST {
  /**
   * Returns a axios get promise object.
   *
   * @param {string} url the url for http get
   * @return {promise} axios get promise object
   */
  static async get(url) {
    let res;
    const axios = Axios.init();
    try {
      res = await axios.get(url);

      if (res.code === 555) {
        Logger.log(res.error);
        Router.push("/login");
      }

      if (res.data.code != 0) {
        throw `Error occured with http get, error code: ${res.data.code} ,message: ${res.data.message}`;
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
  static async post(url, req) {
    let res;
    const axios = Axios.init();
    try {
      res = await axios.post(url, req);

      if (res.code === 555) {
        Logger.log(res.error);
        Router.push("/login");
      }

      if (res.data.code != 0) {
        throw `Error occured with http post, error code: ${res.data.code} ,message: ${res.data.message}`;
      }
    } catch (e) {
      Logger.log(e);
    }
    return res;
  }
}

export default REST;
