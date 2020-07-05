import axios from "axios";
import Login from "./login";

class Axios {
  static _baseURL = "http://t.ztest.org/api/";
  static init() {
    const config = {
      //.. configuration
      withCredentials: true,
      baseURL: Axios._baseURL,
    };

    if (typeof window !== "undefined") {
      const token = Login.getToken();
      config.headers = { token };
    }
    return axios.create(config);
  }
}

export default Axios;
