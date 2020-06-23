import React from "react";
import { useState, useEffect} from "react";
import { useRouter } from 'next/router'
import MenuMap from './menumap'
import Link from 'next/link'
import { Layout, Menu, Breadcrumb } from "antd";
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

function AppLayout(props) {
  const [collapsed, ToggleCollapse] = useState(false);
  const [openKeys, SetOpenKeys] = useState([]);
  const [selectedKeys, SetSelectedKeys] = useState([]);
  const router = useRouter();

  const onCollapse = (collapsed) => {
    ToggleCollapse(collapsed);
  };

  const onOpenChange = (openKeys) => {
    SetOpenKeys(openKeys)
  }

  const path = router.pathname;
  const breadcrumbName = MenuMap.getBreadcrumbName(path);

  useEffect(() => {
    const currentPath = path.split("/")[1];
    SetOpenKeys([currentPath])
    SetSelectedKeys([path])
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <StyledLogoDiv />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          <SubMenu key="student" icon={<TeamOutlined />} title="Students">
            <Menu.Item key="/student" icon={<TeamOutlined />}>
              <Link href="/student">
                <a>Student List</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/student/editstudent" icon={<UserAddOutlined />}>
              <Link href="/student/editstudent">
                <a>Add Student</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="course" icon={<BookOutlined />} title="Course">
            <Menu.Item key="/course">
              <Link href="/course">
                <a>Course List</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/course/editcourse">
              <Link href="/course/editcourse">
                <a>Edit Course</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/course/coursetype">Course Type</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UserOutlined />} title="Teacher">
            <Menu.Item key="6">To Do </Menu.Item>
            <Menu.Item key="7">To Do</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Setting">
            <Menu.Item key="8">To Do </Menu.Item>
            <Menu.Item key="9">To Do</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <StyledlayoutHeader style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link href="/">
                <a>Admin Panel</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbName}</Breadcrumb.Item>
          </Breadcrumb>
          <StyledLayoutDiv style={{ padding: 24, minHeight: 360 }}>
            {props.content}
          </StyledLayoutDiv>
        </Content>
        <Footer style={{ textAlign: "center" }}>Curriculum Assistant</Footer>
      </Layout>
    </Layout>
  );
}

export default AppLayout;