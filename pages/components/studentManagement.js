import React from "react";
import { useState } from "react";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import styled from 'styled-components';
import {
  UserAddOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined
} from "@ant-design/icons";

// Properties
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;
// End Properties

// Style Components
const StyledDiv= styled.div`
padding: 24, minHeight: 360 
`
const StyledTitle = styled(Title)`
color: "white" 
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
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" icon={<TeamOutlined />} title="Students">
            <Menu.Item key="1">Student List</Menu.Item>
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
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin Panel</Breadcrumb.Item>
            <Breadcrumb.Item>Student List</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            To be implement
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>CA</Footer>
      </Layout>
    </Layout>
  );
}

export default StudentManagement;