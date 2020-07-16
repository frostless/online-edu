import Helper from "../lib/helper";

describe("Test Helper FormatDate Function", () => {
  it("formatDate should return correctly yyyy/mm/dd", () => {
    let input = "2020-06-19T07:29:58.000Z";
    expect(Helper.formatDate(input)).toBe("2020-06-19");
    input = "2020-06-30T16:00:00.000Z";
    expect(Helper.formatDate(input)).toBe("2020-06-30");
    input = "Wed Mar 25 2015 11:00:00 GMT+1100";
    expect(Helper.formatDate(input)).toBe("2015-03-25");
    // input = "25/03/2016"
    // expect(Helper.formatDate(input)).toBe("2016-03-25");
    // input = "2020/01/01"
    // expect(Helper.formatDate(input)).toBe("2020-01-01");
  });
});
