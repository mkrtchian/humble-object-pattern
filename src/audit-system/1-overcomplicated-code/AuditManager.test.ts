import * as fs from "fs";
import { AuditManager } from "./AuditManager";

const directoryName = `${__dirname}/test_artifacts`;

beforeEach(() => {
  clearDirectory();
});

function clearDirectory() {
  fs.readdirSync(directoryName).forEach((file) =>
    fs.rmSync(`${directoryName}/${file}`)
  );
}

it("creates a new file with the record when there are no files yet", () => {
  const sut = new AuditManager(3, directoryName);

  sut.addRecord("Alice", new Date("2019-04-06T00:00:00.000Z"));

  const fileContent = fs.readFileSync(`${directoryName}/audit_1.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  expect(fileContent).toBe("Alice;2019-04-06T00:00:00.000Z");
});

it("adds the record to the last existing file if no overflow", () => {
  const sut = new AuditManager(3, directoryName);

  sut.addRecord("Alice", new Date("2019-04-06T00:00:00.000Z"));

  const fileContent = fs.readFileSync(`${directoryName}/audit_2.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  expect(fileContent).toEndWith("Alice;2019-04-06T00:00:00.000Z");
});
