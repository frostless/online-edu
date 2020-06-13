import axios from "axios";

const Axios = axios.create({
  //.. configuration
  baseURL: "http://t.ztest.org/api/",
});

export default Axios;
