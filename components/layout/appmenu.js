import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { AppSubmenu, AppMenuItem } from "./appmenuitem";
import { UserAddOutlined, SettingOutlined, TeamOutlined, BookOutlined, SelectOutlined } from "@ant-design/icons";
import LayoutService from "./layoutservice";
import { useRouter } from "next/router";
import loginTypes from "../types/logintypes";
import { AppMenuKeys } from "../layout/appmenuconfig";

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
      <AppSubmenu key={AppMenuKeys.studentSubMenu} icon={<TeamOutlined />} title="Students" owners={[student, teacher, manager]} >
        <AppMenuItem key={AppMenuKeys.studentList} icon={<TeamOutlined />} owners={[teacher, manager]} >
          <Link href={AppMenuKeys.studentList}>
            <a>Student List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key={AppMenuKeys.editStudent} icon={<UserAddOutlined />} owners={[teacher, manager]} >
          <Link href={AppMenuKeys.editStudent}>
            <a>Add Student</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key={AppMenuKeys.studentSelection} icon={<SelectOutlined />} owners={[teacher, student]} >
          <Link href={AppMenuKeys.studentSelection}>
            <a>Selections</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key={AppMenuKeys.courseSubMenu} icon={<BookOutlined />} title="Course" owners={[teacher]} >
        <AppMenuItem key={AppMenuKeys.courselist} owners={[teacher]}>
          <Link href={AppMenuKeys.courselist}>
            <a>Course List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key={AppMenuKeys.editCourse} owners={[teacher]}>
          <Link href={AppMenuKeys.editCourse}>
            <a>Add Course</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key={AppMenuKeys.courseType} owners={[teacher]}>
          Course Type
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key={AppMenuKeys.teacherSubMenu}
        title="Teacher"
        icon={<TeamOutlined />}
        owners={[manager]}
      >
        <AppMenuItem key={AppMenuKeys.teacherList} icon={<TeamOutlined />} owners={[manager]}>
          <Link href={AppMenuKeys.teacherList}>
            <a>Teacher List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key={AppMenuKeys.managerSubMenu}
        title="Manager"
        icon={<TeamOutlined />}
        owners={[manager]}
      >
        <AppMenuItem key={AppMenuKeys.managerList} icon={<TeamOutlined />} owners={[manager]}>
          <Link href={AppMenuKeys.managerList}>
            <a>Manager List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key={AppMenuKeys.roleSubMenu} title="Role" owners={[manager]}>
        <AppMenuItem key={AppMenuKeys.rolelist} owners={[manager]}>
          <Link href={AppMenuKeys.rolelist}>
            <a>Role List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key={AppMenuKeys.settingSubMenu} icon={<SettingOutlined />} title="Setting" owners={[manager]} >
        <AppMenuItem key={AppMenuKeys.settingPassword} owners={[manager]}>
          Password
        </AppMenuItem>
      </AppSubmenu>
    </Menu>
  );
}

export default AppMenu;