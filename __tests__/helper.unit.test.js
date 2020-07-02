import Helper from "../lib/helper";

describe("Test Helper FormatDate Function", () => {
  it("formatDate should return correctly yyyy/mm/dd", () => {
    let input = "2020-06-19T07:29:58.000Z";
    expect(Helper.formatDate(input)).toBe("2020-06-19");
    input = "2020-06-30T16:00:00.000Z";
    expect(Helper.formatDate(input)).toBe("2020-06-30");
  });
});
