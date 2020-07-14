import { AppMenuKeys } from "./appmenuconfig";

const getSecondaryPathByString = (string) => {
  return string.split('/').pop()
};

class LayoutService {
  static getBreadcrumbName(path, query) {
    const { id } = query;

    const secondaryPath = path.split("/")[2];
    if (secondaryPath === getSecondaryPathByString(AppMenuKeys.editCourse)) {
      return id ? "Edit Course" : "Add Course";
    } else if (secondaryPath === getSecondaryPathByString(AppMenuKeys.courseType)) {
      return "Course Type";
    } else if (secondaryPath === getSecondaryPathByString(AppMenuKeys.editStudent)) {
      return id ? "Edit Student" : "Add Student";
    } else if (secondaryPath === getSecondaryPathByString(AppMenuKeys.studentSelection)) {
      return "Selections";
    } 

    const currentPath = path.split("/")[1];
    if (currentPath === AppMenuKeys.studentSubMenu) {
      return "Student List";
    } else if (currentPath === AppMenuKeys.courseSubMenu) {
      return "Course List";
    } else if (currentPath === AppMenuKeys.managerSubMenu) {
      return "Manager List";
    } else if (currentPath === AppMenuKeys.roleSubMenu) {
      return "Role List";
    } else if (currentPath === AppMenuKeys.teacherSubMenu) {
      return "Teacher List";
    } else if (currentPath === AppMenuKeys.settingSubMenu) {
      return "Settings";
    }
  }

  static getOpenKeys(path) {
    const currentPath = path.split("/")[1];
    return ([currentPath])
  }

  static getSelectedkeys(path) {
    return [path];
  }
}

export default LayoutService;