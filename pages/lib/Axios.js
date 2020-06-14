import axios from "axios";
import Token from "./Token"

const Axios = axios.create({
  //.. configuration
  baseURL: "http://t.ztest.org/api/",
});

if (typeof window !== 'undefined') {
    Axios.defaults.headers.common['token'] = Token.getToken();
}

export default Axios;
