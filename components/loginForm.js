import React, {useState} from "react";
import { Form, Input, Button, Typography, Checkbox, Radio, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from 'styled-components';
import Router from 'next/router'
import API from '../lib/api'
import User from '../lib/user'

// Properties
const { Title } = Typography;
const student = "student", teacher = "teacher", manager = "manager";
// End Properties

// Style Components
const StyledButton = styled(Button)`
  &&& {
    width: 100%;
  }
`;

const StyledTitle = styled(Title)`
  &&& {
    text-align: center;
  }
`;
// End Style Components

function LoginForm(props) {
  const [form] = Form.useForm();
  const [loginFailMsg, SetloginFailMsg] = useState();

  const login = async (loginRequest, loginType) => {
    let res;
    if(loginType === student){
      res = await API.studentLogin(loginRequest);
    } else if (loginType === teacher){
      res = await API.teacherLogin(loginRequest);
    } else {
      res = await API.managerLogin(loginRequest);
    }

    let success = API.CheckAPIResult(res);
    if (success) {
      const { token, login_type } = res.data["datas"];
      User.saveToken(token);
      User.saveLoginType(login_type);
      Router.push("/index");
    } else {
      showloginError(res["msg"]);
    }
  }

  const showloginError = (msg) => {
    SetloginFailMsg(msg);
  };

  const onFinish = (loginRequest) => {
    const { loginType } = loginRequest;
    login(loginRequest, loginType);
  };

  const onLoginTypeChange = e => {
    const selectedLoginType = e.target.value;
    form.resetFields();
    form.setFieldsValue({ loginType: selectedLoginType });
    SetloginFailMsg();
  }

  return (
    <React.Fragment>
    <Form
      name="login"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      form={form}
    >
      <StyledTitle>Curriculum Assistant</StyledTitle>
      <Form.Item
        name="loginType"
        initialValue="student"
        rules={[
          {
            required: true,
            message: "Please choose a login type!",
          },
        ]}
      >
        <Radio.Group onChange={onLoginTypeChange}>
          <Radio.Button value={student}>Student</Radio.Button>
          <Radio.Button value={teacher}>Teacher</Radio.Button>
          <Radio.Button value={manager}>Manager</Radio.Button>
        </Radio.Group>
      </Form.Item>
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
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <StyledButton type="primary" htmlType="submit">
          Log in
        </StyledButton>
      </Form.Item>
    </Form>
    {loginFailMsg && (
      <Alert
        message="Login Failed"
        description={loginFailMsg}
        type="error"
      />
    )}
    </React.Fragment>
  );
}

export default LoginForm;