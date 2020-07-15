import { PermittedMenus } from "../layout/appmenuconfig";
import { TreeSelect } from "antd";
const { TreeNode } = TreeSelect;

const getMenus = () => {
    return (
      <React.Fragment>
        <TreeNode value="home" title="Home" disabled>
          <TreeNode value={PermittedMenus.dashboard} title="Dashboard" />
        </TreeNode>
        <TreeNode value="student" title="Student" disabled>
          <TreeNode value={PermittedMenus.studentList} title="Student List" />
          <TreeNode value={PermittedMenus.studentEdit} title="Student Edit" />
          <TreeNode value={PermittedMenus.studentSelection} title="Student Selection" />
        </TreeNode>
        <TreeNode value="course" title="Course" disabled>
          <TreeNode value={PermittedMenus.courseList} title="Course List" />
          <TreeNode value={PermittedMenus.courseEdit} title="Course Edit" />
          <TreeNode value={PermittedMenus.courseTypelist} title="Course Type list" />
        </TreeNode>
        <TreeNode value="teacher" title="Teacher" disabled>
          <TreeNode value={PermittedMenus.teacherList} title="Teacher List" />
        </TreeNode>
        <TreeNode value="manager" title="Manager" disabled>
          <TreeNode value={PermittedMenus.managerList} title="Manager List" />
        </TreeNode>
        <TreeNode value="role" title="Role" disabled>
          <TreeNode value={PermittedMenus.roleList} title="Role List" />
        </TreeNode>
        <TreeNode value="setting" title="Setting" disabled>
          <TreeNode value={PermittedMenus.password} title="Password" />
        </TreeNode>
      </React.Fragment>
    );
  };

  export { getMenus };