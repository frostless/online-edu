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

const RoleMenus = {
  stuedentList: "-student-list",
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

const RoleMenuMapToMenuKey = {
  [RoleMenus.studentList]: AppMenuKeys.studentList,
  [RoleMenus.studentEdit]: AppMenuKeys.editStudent,
  [RoleMenus.studentSelection]: AppMenuKeys.studentSelection,
  [RoleMenus.courselist]: AppMenuKeys.courselist,
  [RoleMenus.courseEdit]: AppMenuKeys.editCourse,
  [RoleMenus.courseTypelist]: AppMenuKeys.courseType,
  [RoleMenus.teacherList]: AppMenuKeys.teacherList,
  [RoleMenus.managerList]: AppMenuKeys.managerList,
  [RoleMenus.rolelist]: AppMenuKeys.rolelist,
  [RoleMenus.password]: AppMenuKeys.settingPassword,
};

export { AppMenuKeys, RoleMenus, RoleMenuMapToMenuKey };
