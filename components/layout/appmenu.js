import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  UserAddOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import LayoutService from "./layoutservice";
const { SubMenu } = Menu;
import { useRouter } from "next/router";

function AppMenu() {
  const [openKeys, SetOpenKeys] = useState([]);
  const [selectedKeys, SetSelectedKeys] = useState([]);
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    SetOpenKeys(LayoutService.getOpenKeys(path));
    SetSelectedKeys(LayoutService.getSelectedkeys(path));
  }, []);

  const onOpenChange = (openKeys) => {
    SetOpenKeys(openKeys);
  };

  return (
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
            <a>Add Course</a>
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
  );
}

export default AppMenu;