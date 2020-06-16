import axios from "axios";
import Token from "./Token"

const config = {
   //.. configuration
   withCredentials : true,
   baseURL: "http://t.ztest.org/api/",
}

if (typeof window !== "undefined") {
  const token = Token.getToken();
  config.headers = { token };
}

const Axios = axios.create(config);

export default Axios;
