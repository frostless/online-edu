import { useEffect } from "react";
import Router from "next/router";
import User from "../lib/user";
import LoginType from "../components/types/logintypes"

function HomePage() {
  useEffect(() => {
    let isLogin = false;
    if (User.getToken()) isLogin = true;

    if (!isLogin) {
      Router.push("/login");
    } else {
      const loginType = User.getLoginType();
      if (loginType === LoginType.teacher) {
        Router.push("/student");
      } else {
        Router.push("/student/selections");
      }
    }
  });

  return <React.Fragment></React.Fragment>;
}

export default HomePage;