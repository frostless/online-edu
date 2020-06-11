import axios from "axios";

class REST {
  static get(url, req) {
    return axios.get(url, req);
  }

  static post(url, req) {
    return axios.post(url, req);
  }
}

export default REST
