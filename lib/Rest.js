import Axios from "./axios";
import Logger from "./logger";
import Router from "next/router";
import axios from "axios";
import Token from "./token";

const _baseURL = "http://t.ztest.org/api/";

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
      const token = Token.getToken();

      res = await axios.get(_baseURL + url, {
        withCredentials: true,
        headers: { token },
      });

      if (res.data.code != 0) {
        throw `Cannot get student list, error code: ${res.data.code}`;
      }
    } catch (e) {
      Logger.log(e);
      Router.push("/login");
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
