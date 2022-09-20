import { alwaysTrue } from "./index";

describe("True tests", () => {
  it("returns true when being called", () => {
    const result = alwaysTrue();
    expect(result).toBe(true);
  });
});
