import React from "react";
import { Row, Col } from "antd";
import LoginForm from '../components/loginform'

const loginPage = () => {

  return (
    <Row justify="center" style={{ marginTop: "5%" }}>
      <Col span={8}>
       <LoginForm />
      </Col>
    </Row>
  );
};

export default loginPage;
