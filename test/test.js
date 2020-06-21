import Helper from "../lib/helper";

test("formatDate returns correctly", () => {
    const input = '2020-06-19T07:29:58.000Z';
    expect(Helper.formatDate(input)).toBeDefined(); 
    expect(Helper.formatDate(input)).toBe('2020-06-19'); 
    expect(typeof Helper.formatDate(input)).toBe('string');
});

