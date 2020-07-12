class LayoutService {
  static getBreadcrumbName(path, query) {
    const { id } = query;

    const secondaryPath = path.split("/")[2];
    if (secondaryPath === "editcourse") {
      return id ? "Edit Course" : "Add Course";
    } else if (secondaryPath === "coursetype") {
      return "Course Type";
    } else if (secondaryPath === "editstudent") {
      return id ? "Edit Student" : "Add Student";
    } else if (secondaryPath === "selections") {
      return "Selections";
    } 

    const currentPath = path.split("/")[1];
    if (currentPath === "student") {
      return "Student List";
    } else if (currentPath === "course") {
      return "Course List";
    } else if (currentPath === "manager") {
      return "Manager List";
    } else if (currentPath === "role") {
      return "Role List";
    } else if (currentPath === "teacher") {
      return "Teacher List";
    } else if (currentPath === "setting") {
      return "setting";
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