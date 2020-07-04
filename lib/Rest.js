import Axios from "./axios";
import Logger from "./logger";
import Router from "next/router";
import Error from "../models/error";

class REST {
  /**
   * Returns a axios get promise object.
   *
   * @param {string} url the url for http get
   * @return {promise} axios get promise object
   */
  static async get(url) {
    let res;
    let error = new Error();
    const axios = Axios.init();
    try {
      res = await axios.get(url);

      if (res.data.code != 0) {
        error.msg = res.data.message;
        error.code = res.data.code
        
        if (res.data.code === 555) {
          error.action = () => {
            Router.push("/login");
          };
        }
        throw '';
      }
      return res;
    } catch (e) {
      Logger.log(`Error occured with http get, error code: ${error.code} ,message: ${error.msg}`);
      error.action && error.action();
      return error;
    }
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
    let error = new Error();
    const axios = Axios.init();
    try {
      res = await axios.post(url, req);

      if (res.data.code != 0) {
        error.msg = res.data.message;
        error.code = res.data.code
        
        if (res.data.code === 555) {
          error.action = () => {
            Router.push("/login");
          };
        }
        throw '';
      }
      return res;
    } catch (e) {
      Logger.log(`Error occured with http post, error code: ${error.code} ,message: ${error.msg}`);
      error.action && error.action();
      return error;
    }
  }
}

export default REST;
