import LayoutService from "../../components/layout/layoutservice";

describe("Test LayoutService GetBreadcrumbName Function", () => {
    it("Returns name correctly for top level directory without query string", () => {
        let path = '/students';
        const query = {};
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Student List'); 

        path = '/course';
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Course List'); 

        path = '/manager';
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Manager List'); 

        path = '/role';
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Role List'); 

        path = '/settings';
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Settings'); 
    });

    it("Returns name correctly for second level directory without query string", () => {
        let path = '/student/selections';
        const query = {};
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Selections'); 

        path = '/student/editcourse';
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Add Course'); 

        path = '/student/editstudent';
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Add Student'); 
    });

    it("Returns name correctly for second level directory with query string", () => {
        let path = '/student/editcourse';
        const query = { id: 1 };
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Edit Course'); 

        path = '/student/editstudent';
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Edit Student'); 

        path = '/student/selections';
        expect(LayoutService.getBreadcrumbName(path, query)).toBe('Selections'); 
    });
})