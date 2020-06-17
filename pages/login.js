import React, {useState} from "react";
import { Row, Col, Alert } from "antd";
import Router from 'next/router'
import API from '../lib/api'
import LoginForm from '../components/loginform'
import Token from '../lib/token'

const loginPage = () => {
  const [loginFail, SetLoginStatus] = useState(false);
  const [loginFailMsg, SetloginFailMsg] = useState('');

  const showloginError = (msg) => {
    SetLoginStatus(true)
    SetloginFailMsg(msg)
  };

  const onFinish = (credential) => {  
    API.login(credential)
      .then(res => {
        const data = res.data["datas"];
        if (data && data['token']) {
          Token.saveToken(data['token']);
          Router.push("/index");
        } else {
          showloginError(res.data["message"]);
        }
      })
      .catch(error => {
        showloginError(error);
      });
    }

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
