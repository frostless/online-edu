class MenuMap {
  static getBreadcrumbName(path) {
    const secondaryPath = path.split("/")[2];
    if (secondaryPath === "addcourse") {
      return "Add Course";
    }

    const currentPath = path.split("/")[1];
    if(currentPath === "student"){
        return "Student List"
    } else if (currentPath === "course"){
        return "Course list"
    }
  }
}

export default MenuMap
