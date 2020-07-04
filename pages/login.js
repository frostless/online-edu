import React, {useState} from "react";
import { Row, Col, Alert } from "antd";
import Router from 'next/router'
import API from '../lib/api'
import LoginForm from '../components/loginform'
import Credential from '../lib/credential'

const loginPage = () => {
  const [loginFail, SetLoginStatus] = useState(false);
  const [loginFailMsg, SetloginFailMsg] = useState('');

  const showloginError = (msg) => {
    SetLoginStatus(true)
    SetloginFailMsg(msg)
  };

  const studentLogin = (credential) => {
    API.studentLogin(credential)
      .then((res) => {
        let success = API.CheckAPIResult(res);
        if (success) {
          const { token, login_type } = res.data["datas"];
          Credential.saveToken(token);
          Credential.saveLoginType(login_type);
          Router.push("/index");
        } else {
          showloginError(res["msg"]);
        }
      })
      .catch((error) => {
        showloginError(error);
      });
  };

  const teacherLogin = (credential) => {
    API.teacherLogin(credential)
      .then((res) => {
        let success = API.CheckAPIResult(res);
        if (success) {
          const { token, login_type } = res.data["datas"];
          Credential.saveToken(token);
          Credential.saveLoginType(login_type);
          Router.push("/index");
        } else {
          showloginError(res["msg"]);
        }
      })
      .catch((error) => {
        showloginError(error);
      });
  };

  const onFinish = (credential) => {
    const { loginType } = credential;
    if (loginType === "student") {
      studentLogin(credential);
    } else {
      teacherLogin(credential);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "5%" }}>
      <Col span={8}>
       <LoginForm onFinish={onFinish} />
        {loginFail && (
          <Alert
            message="Login Failed"
            description={loginFailMsg}
            type="error"
          />
        )}
      </Col>
    </Row>
  );
};

export default loginPage;
