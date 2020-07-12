import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { AppSubmenu, AppMenuItem } from "./appmenuitem";
import { UserAddOutlined, SettingOutlined, TeamOutlined, BookOutlined, SelectOutlined } from "@ant-design/icons";
import LayoutService from "./layoutservice";
import { useRouter } from "next/router";
import loginTypes from "../types/logintypes";

function AppMenu() {
  const [openKeys, SetOpenKeys] = useState([]);
  const [selectedKeys, SetSelectedKeys] = useState([]);
  const router = useRouter();
  const path = router.pathname;
  const {student, manager, teacher } = loginTypes;

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
      <AppSubmenu
        key="student"
        icon={<TeamOutlined />}
        title="Students"
        owners={[student, teacher, manager]}
      >
        <AppMenuItem key="/student" icon={<TeamOutlined />} owners={[teacher, manager]}>
          <Link href="/student">
            <a>Student List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/student/editstudent" icon={<UserAddOutlined />} owners={[teacher, manager]}>
          <Link href="/student/editstudent">
            <a>Add Student</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/student/selections" icon={<SelectOutlined />} owners={[teacher, student]}>
          <Link href="/student/selections">
            <a>Selections</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key="course" icon={<BookOutlined />} title="Course" owners={[teacher]}>
        <AppMenuItem key="/course" owners={[teacher]}>
          <Link href="/course">
            <a>Course List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/course/editcourse" owners={[teacher]}>
          <Link href="/course/editcourse">
            <a>Add Course</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/course/coursetype" owners={[teacher]}>Course Type</AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key="teacher"
        title="Teacher"
        icon={<TeamOutlined />}
        owners={[manager]}
      >
        <AppMenuItem key="/teacher" icon={<TeamOutlined />} owners={[manager]}>
          <Link href="/teacher">
            <a>Teacher List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key="manager"
        title="Manager"
        icon={<TeamOutlined />}
        owners={[manager]}
      >
        <AppMenuItem key="/manager" icon={<TeamOutlined />} owners={[manager]}>
          <Link href="/manager">
            <a>Manager List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key="role"
        title="Role"
        owners={[manager]}
      >
        <AppMenuItem key="/role" owners={[manager]}>
          <Link href="/role">
            <a>Role List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key="/setting" icon={<SettingOutlined />} title="Setting" owners={[manager]}>
        <AppMenuItem key="/setting" owners={[manager]}>Password</AppMenuItem>
      </AppSubmenu>
    </Menu>
  );
}

export default AppMenu;