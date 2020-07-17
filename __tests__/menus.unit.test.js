import { PermittedMenus, AppMenuKeys,  shouldSubMenuVisible, shouldMenItemVisible } from "../components/layout/appmenuconfig";

describe("App menus' visibility should return correctly based on the permitted menus", () => {
    it("SubMenu visibility should return false if none of its secondary menus is included on permitted menus", () => {
        let permittedMenus = [];
        let subMenuKey = AppMenuKeys.studentSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(false); 
        subMenuKey = AppMenuKeys.courseSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(false); 
        subMenuKey = AppMenuKeys.homeSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(false); 
        subMenuKey = AppMenuKeys.teacherSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(false); 
        subMenuKey = AppMenuKeys.managerSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(false); 
        subMenuKey = AppMenuKeys.roleSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(false); 
        subMenuKey = AppMenuKeys.settingSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(false); 
    });

    it("SubMenu visibility should return true if any of its secondary menus is included in permitted menus", () => {
        let permittedMenus = [PermittedMenus.studentList];
        let subMenuKey = AppMenuKeys.studentSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(true); 

        permittedMenus = [PermittedMenus.studentList, PermittedMenus.courseList];
        subMenuKey = AppMenuKeys.courseSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(true); 

        permittedMenus = [PermittedMenus.studentList, PermittedMenus.courseList,
        PermittedMenus.teacherList, PermittedMenus.managerList, PermittedMenus.roleList,
        PermittedMenus.password];
        subMenuKey = AppMenuKeys.teacherSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(true); 
        subMenuKey = AppMenuKeys.managerSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(true); 
        subMenuKey = AppMenuKeys.roleSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(true); 
        subMenuKey = AppMenuKeys.settingSubMenu;
        expect(shouldSubMenuVisible(subMenuKey, permittedMenus)).toBe(true); 
    });

    it("Secondary menu visibility should return false if it is not included in the permitted menu", () => {
        let permittedMenus = [];
        let menuItemKey = AppMenuKeys.dashBoard;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false); 
        menuItemKey = AppMenuKeys.studentList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false); 
        menuItemKey = AppMenuKeys.studentSelection;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false); 
        menuItemKey = AppMenuKeys.editStudent;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false); 
        menuItemKey = AppMenuKeys.courseList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false); 
        menuItemKey = AppMenuKeys.courseType;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false);
        menuItemKey = AppMenuKeys.editCourse;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false); 
        menuItemKey = AppMenuKeys.teacherList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false); 
        menuItemKey = AppMenuKeys.managerList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false);  
        menuItemKey = AppMenuKeys.roleList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false);  
        menuItemKey = AppMenuKeys.settingPassword;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(false);  
    });

    it("Secondary menu visibility should return true it is included in the permitted menus", () => {
        let permittedMenus = [PermittedMenus.studentList, PermittedMenus.studentSelection,
        PermittedMenus.studentEdit, PermittedMenus.courseList, PermittedMenus.courseEdit,
        PermittedMenus.courseTypeList, PermittedMenus.teacherList, PermittedMenus.managerList,
        PermittedMenus.roleList, PermittedMenus.password];
        let menuItemKey = AppMenuKeys.settingPassword;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true); 
        menuItemKey = AppMenuKeys.studentList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true); 
        menuItemKey = AppMenuKeys.studentSelection;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true); 
        menuItemKey = AppMenuKeys.editStudent;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true); 
        menuItemKey = AppMenuKeys.courseList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true); 
        menuItemKey = AppMenuKeys.courseType;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true);
        menuItemKey = AppMenuKeys.editCourse;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true); 
        menuItemKey = AppMenuKeys.teacherList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true); 
        menuItemKey = AppMenuKeys.managerList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true);  
        menuItemKey = AppMenuKeys.roleList;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true);  
        menuItemKey = AppMenuKeys.settingPassword;
        expect(shouldMenItemVisible(menuItemKey, permittedMenus)).toBe(true);  
    });
})