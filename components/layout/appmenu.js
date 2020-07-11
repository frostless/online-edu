import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { AppSubmenu, AppMenuItem } from "./appmenuitem";
import { UserAddOutlined, SettingOutlined, TeamOutlined, UserOutlined, BookOutlined, SelectOutlined } from "@ant-design/icons";
import LayoutService from "./layoutservice";
import { useRouter } from "next/router";
import loginTypes from "../types/logintypes"

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
      <AppSubmenu
        key="student"
        icon={<TeamOutlined />}
        title="Students"
        owners={[loginTypes.student, loginTypes.teacher, loginTypes.manager]}
      >
        <AppMenuItem key="/student" icon={<TeamOutlined />} owners={[loginTypes.teacher, loginTypes.manager]}>
          <Link href="/student">
            <a>Student List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/student/editstudent" icon={<UserAddOutlined />} owners={[loginTypes.teacher, loginTypes.manager]}>
          <Link href="/student/editstudent">
            <a>Add Student</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/student/selections" icon={<SelectOutlined />} owners={[loginTypes.teacher, loginTypes.student]}>
          <Link href="/student/selections">
            <a>Selections</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key="course" icon={<BookOutlined />} title="Course" owners={[loginTypes.teacher]}>
        <AppMenuItem key="/course" owners={[loginTypes.teacher]}>
          <Link href="/course">
            <a>Course List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/course/editcourse" owners={[loginTypes.teacher]}>
          <Link href="/course/editcourse">
            <a>Add Course</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key="/course/coursetype" owners={[loginTypes.teacher]}>Course Type</AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key="teacher"
        title="Teacher"
        icon={<TeamOutlined />}
        owners={[loginTypes.manager]}
      >
        <AppMenuItem key="/teacher" icon={<TeamOutlined />} owners={[loginTypes.manager]}>
          <Link href="/teacher">
            <a>Teacher List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key="manager"
        title="Manager"
        icon={<TeamOutlined />}
        owners={[loginTypes.manager]}
      >
        <AppMenuItem key="/manager" icon={<TeamOutlined />} owners={[loginTypes.manager]}>
          <Link href="/manager">
            <a>Manager List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key="/setting" icon={<SettingOutlined />} title="Setting" owners={[loginTypes.manager]}>
        <AppMenuItem key="/setting" owners={[loginTypes.manager]}>Password</AppMenuItem>
      </AppSubmenu>
    </Menu>
  );
}

export default AppMenu;