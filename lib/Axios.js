import axios from "axios";
import Token from "./token";

class Axios {
  static init() {
    const config = {
      //.. configuration
      withCredentials: true,
      baseURL: "http://t.ztest.org/api/",
    };

    if (typeof window !== "undefined") {
      const token = Token.getToken();
      config.headers = { token };
    }
    return axios.create(config);
  }
}

export default Axios;
