class LayoutService {
  static getBreadcrumbName(path, query) {
    const { id } = query;

    const secondaryPath = path.split("/")[2];
    if (secondaryPath === "editcourse") {
      return id ? "Edit Course" : "Add Course";
    } else if (secondaryPath === "editstudent") {
      return id ? "Edit Student": "Add Student";
    } else if (secondaryPath === "selections") {
      return "Selections";
    }

    const currentPath = path.split("/")[1];
    if (currentPath === "student") {
      return "Student List";
    } else if (currentPath === "course") {
      return "Course list";
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