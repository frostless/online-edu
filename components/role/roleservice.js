import { RoleMenus } from "../layout/appmenuconfig";
import { TreeSelect } from "antd";
const { TreeNode } = TreeSelect;

const getMenus = () => {
    return (
      <React.Fragment>
        <TreeNode value="student" title="Student" disabled>
          <TreeNode value={RoleMenus.stuedentList} title="Student List" />
          <TreeNode value={RoleMenus.studentEdit} title="Student Edit" />
          <TreeNode value={RoleMenus.studentSelection} title="Student Selection" />
        </TreeNode>
        <TreeNode value="course" title="Course" disabled>
          <TreeNode value={RoleMenus.courselist} title="Course List" />
          <TreeNode value={RoleMenus.courseEdit} title="Course Edit" />
          <TreeNode value={RoleMenus.courseTypelist} title="Course Type list" />
        </TreeNode>
        <TreeNode value="teacher" title="Teacher" disabled>
          <TreeNode value={RoleMenus.teacherList} title="Teacher List" />
        </TreeNode>
        <TreeNode value="manager" title="Manager" disabled>
          <TreeNode value={RoleMenus.managerList} title="Manager List" />
        </TreeNode>
        <TreeNode value="role" title="Role" disabled>
          <TreeNode value={RoleMenus.rolelist} title="Role List" />
        </TreeNode>
        <TreeNode value="setting" title="Setting" disabled>
          <TreeNode value={RoleMenus.password} title="Password" />
        </TreeNode>
      </React.Fragment>
    );
  };

  export { getMenus };