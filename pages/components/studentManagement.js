import React from "react";
import { useState } from "react";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import StudentList from "./studentList"
import styled from 'styled-components';
import {
  UserAddOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined
} from "@ant-design/icons";
import {css} from 'styled-components'

// Properties
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// End Properties

// Style Components
const sharedBackGroundColor = css`
  background: #fff;
`;

const StyledLogoDiv= styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`
const StyledlayoutHeader = styled(Header)`
  &&& {
    ${sharedBackGroundColor}
  }
`;

const StyledLayoutDiv= styled.div`
  ${sharedBackGroundColor}
`
// End Style Components

function StudentManagement() {
  const [collapsed, ToggleCollapse] = useState(false);

  const onCollapse = (collapsed) => {
    ToggleCollapse(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <StyledLogoDiv />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" icon={<TeamOutlined />} title="Students">
            <Menu.Item key="1" icon={<TeamOutlined />}>Student List</Menu.Item>
            <Menu.Item key="2" icon={<UserAddOutlined />}>
              Add Student
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<BookOutlined />} title="Course">
            <Menu.Item key="3">To Do </Menu.Item>
            <Menu.Item key="4">To Do</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UserOutlined />} title="Teacher">
            <Menu.Item key="5">To Do </Menu.Item>
            <Menu.Item key="6">To Do</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Setting">
            <Menu.Item key="7">To Do </Menu.Item>
            <Menu.Item key="8">To Do</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <StyledlayoutHeader style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin Panel</Breadcrumb.Item>
            <Breadcrumb.Item>Student List</Breadcrumb.Item>
          </Breadcrumb>
          <StyledLayoutDiv
            style={{ padding: 24, minHeight: 360 }}
          >
            <StudentList />
          </StyledLayoutDiv>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Curriculum Assistant</Footer>
      </Layout>
    </Layout>
  );
}

export default StudentManagement;