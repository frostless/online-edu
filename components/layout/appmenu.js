import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { AppSubmenu, AppMenuItem } from "./appmenuitem";
import {
  UserAddOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  SelectOutlined,
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
      <AppSubmenu key="student" icon={<TeamOutlined />} title="Students" visible="true">
        <AppMenuItem key="/student" icon={<TeamOutlined />}>
          <Link href="/student">
            <a>Student List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/student/editstudent" icon={<UserAddOutlined />}>
          <Link href="/student/editstudent">
            <a>Add Student</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/student/selections" icon={<SelectOutlined />} visible="true">
          <Link href="/student/selections">
            <a>Selections</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key="course" icon={<BookOutlined />} title="Course">
        <AppMenuItem key="/course">
          <Link href="/course">
            <a>Course List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/course/editcourse">
          <Link href="/course/editcourse">
            <a>Add Course</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/course/coursetype">Course Type</AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key="sub3" icon={<UserOutlined />} title="Teacher">
        <AppMenuItem key="6">To Do</AppMenuItem>
        <AppMenuItem key="7">To Do</AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key="sub4" icon={<SettingOutlined />} title="Setting">
        <AppMenuItem key="8">To Do</AppMenuItem>
        <AppMenuItem key="9">To Do</AppMenuItem>
      </AppSubmenu>
    </Menu>
  );
}

export default AppMenu;