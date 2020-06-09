import React, {useState} from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Row, Col, Alert, Typography } from "antd";
import axios from 'axios';
import Router from 'next/router'

const { Title } = Typography;

const loginPage = () => {
  const [loginFail, SetLoginStatus] = useState(false);
  const [loginFailMsg, SetloginFailMsg] = useState('');

  const showloginError = (msg) => {
    SetLoginStatus(true)
    SetloginFailMsg(msg)
  };

  const onFinish = (values) => {  
    axios.post('http://t.ztest.org/api/teacher/login', values)
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
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Title style={{ textAlign: "center" }}>Curriculum Assistant</Title>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
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
