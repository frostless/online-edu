import React, {useState} from "react";
import { Row, Col, Alert } from "antd";
import Router from 'next/router'
import API from './api/API'
import LoginForm from './components/LoginForm'

const loginPage = () => {
  const [loginFail, SetLoginStatus] = useState(false);
  const [loginFailMsg, SetloginFailMsg] = useState('');

  const showloginError = (msg) => {
    SetLoginStatus(true)
    SetloginFailMsg(msg)
  };

  const onFinish = (values) => {  
    API.Login(values)
      .then(res => {
        if (res.data["datas"]) Router.push("/index?login=true");
        else {
          showloginError(res.data['message']);
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
