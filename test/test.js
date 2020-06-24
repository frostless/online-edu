import * as enzyme from 'enzyme';
import Helper from "../lib/helper";
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from "../components/searchbar";

enzyme.configure({ adapter: new Adapter() });

describe("Test Helper Format Date Function", () => {
    test("formatDate returns correctly", () => {
        const input = '2020-06-19T07:29:58.000Z';
        expect(Helper.formatDate(input)).toBeDefined(); 
        expect(Helper.formatDate(input)).toBe('2020-06-19'); 
        expect(typeof Helper.formatDate(input)).toBe('string');
    });
})

describe("Test SearchBar OnSearch Function", () => {
    //test case
    it("OnSearch Called", () => {
        const inputText = 'test';
        const props = {
            onSearch: (val) => {
                expect(val).toEqual(inputText);
            }
        }
        const onSearch = (val)=>{
            expect(val).toEqual(inputText);
        }
        const component = enzyme.mount(<SearchBar {...props} />);
        component.find('input').at(0).simulate('change', {
            target: {
                value: inputText
            }
        });
        component.find('input').at(0).simulate('keypress', {key: 'Enter'})
        
        const onSearchMock = jest.spyOn(props, 'onSearch');
        // expect(onSubmitMock).toHaveBeenCalledTimes(0);
        
        setTimeout(()=>{
            Log.debug("calls", onSearchMock.mock.calls);
            expect(onSearchMock).toHaveBeenCalledTimes(1);
            done();
        }, 0)
        
    });
});