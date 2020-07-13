const AppMenuKeys = {
  studentSubMenu: "student",
  studentList: "/student",
  editStudent: "/student/editstudent",
  studentSelection: "/student/selections",
  courseSubMenu: "course",
  courselist: "/course",
  editCourse: "/course/editcourse",
  courseType: "/course/coursetype",
  teacherSubMenu: "teacher",
  teacherList: "/teacher",
  managerSubMenu: "manager",
  managerList: "/manager",
  roleSubMenu: "role",
  rolelist: "/role",
  settingSubMenu: "setting",
  settingPassword: "/setting",
};

const PermittedMenus = {
  studentList: "-student-list",
  studentEdit: "-student-edit",
  studentSelection: "-student-selection",
  courselist: "-course-list",
  courseEdit: "-course-edit",
  courseTypelist: "-course-type-list",
  teacherList: "-teacher-list",
  managerList: "-manager-list",
  rolelist: "-role-list",
  password: "-password",
};

const PermittedMenuMapToMenuKey = {
  [PermittedMenus.studentList]: AppMenuKeys.studentList,
  [PermittedMenus.studentEdit]: AppMenuKeys.editStudent,
  [PermittedMenus.studentSelection]: AppMenuKeys.studentSelection,
  [PermittedMenus.courselist]: AppMenuKeys.courselist,
  [PermittedMenus.courseEdit]: AppMenuKeys.editCourse,
  [PermittedMenus.courseTypelist]: AppMenuKeys.courseType,
  [PermittedMenus.teacherList]: AppMenuKeys.teacherList,
  [PermittedMenus.managerList]: AppMenuKeys.managerList,
  [PermittedMenus.rolelist]: AppMenuKeys.rolelist,
  [PermittedMenus.password]: AppMenuKeys.settingPassword,
};

const getStudentMenus = () => {
  return [PermittedMenus.studentEdit, PermittedMenus.studentSelection, PermittedMenus.studentList];
};

const getCourseMenus = () => {
  return [PermittedMenus.courseEdit, PermittedMenus.courselist, PermittedMenus.courseTypelist];
};

const getTeacherMenus = () => {
  return [PermittedMenus.teacherList];
};

const getManagerMenus = () => {
  return [PermittedMenus.managerList];
};

const getRoleMenus = () => {
  return [PermittedMenus.rolelist];
};

const getSettingMenus = () => {
  return [PermittedMenus.password];
};

const getMenusByKey = (key) => {
  let menus = [];
  if (key === AppMenuKeys.studentSubMenu) {
    menus = getStudentMenus();
  } else if (key === AppMenuKeys.courseSubMenu) {
    menus = getCourseMenus();
  } else if (key === AppMenuKeys.teacherSubMenu) {
    menus = getTeacherMenus();
  } else if (key === AppMenuKeys.managerSubMenu) {
    menus = getManagerMenus();
  } else if (key === AppMenuKeys.roleSubMenu) {
    menus = getRoleMenus();
  } else if (key === AppMenuKeys.settingSubMenu) {
    menus = getSettingMenus();
  }
  return menus;
};

const shouldSubMenuVisible = (subMenuKey, permittedMenus) => {
  let menus = getMenusByKey(subMenuKey);
  let shouldSubMenuVisible = menus.some((item) => {
    return permittedMenus.includes(item);
  });
  return shouldSubMenuVisible;
};

const convertPermittedMenutoMenuKeys = (permittedMenus) => {
  let menus =[];
  permittedMenus.forEach((item)=>{
    const menu = PermittedMenuMapToMenuKey[item];
    menus.push(menu);
  })
  return menus;
};

const shouldMenItemVisible = (menuItemKey, permittedMenus) => {
  let menus = convertPermittedMenutoMenuKeys(permittedMenus);
  let visible = menus.includes(menuItemKey);
  return visible;
};

export { AppMenuKeys, PermittedMenus, PermittedMenuMapToMenuKey, shouldSubMenuVisible, shouldMenItemVisible};
