import { useEffect } from "react";
import Router from "next/router";
import User from "../lib/user";
import LoginTypes from "../components/types/logintypes"
import { AppMenuKeys } from "../components/layout/appmenuconfig";

function HomePage() {
  const { student, teacher, manager } = LoginTypes;
  useEffect(() => {
    let isLogin = false;
    if (User.getToken()) isLogin = true;

    if (!isLogin) {
      Router.push("/login");
    } else {
      const loginType = User.getLoginType();
      if (loginType === teacher) {
        Router.push(AppMenuKeys.studentList);
      } else if (loginType === student) {
        Router.push(AppMenuKeys.studentSelection);
      } else if (loginType === manager) {
        Router.push(AppMenuKeys.dashBoard);
      }
    }
  });

  return <React.Fragment></React.Fragment>;
}

export default HomePage;