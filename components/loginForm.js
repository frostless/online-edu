import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from 'styled-components';

// Properties
const { Title } = Typography;
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
  const onFinish = props.onFinish;
  return (
    <Form
      name="login"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <StyledTitle>Curriculum Assistant</StyledTitle>
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
        <StyledButton type="primary" htmlType="submit">
          Log in
        </StyledButton>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
