import * as fs from "fs";
import { AuditManager } from "./AuditManager";

const directoryName = `${__dirname}/test_artifacts`;

beforeAll(() => {
  if (!fs.existsSync(directoryName)) {
    fs.mkdirSync(directoryName);
  }
});

beforeEach(() => {
  clearDirectory();
});

function clearDirectory() {
  fs.readdirSync(directoryName).forEach((file) =>
    fs.rmSync(`${directoryName}/${file}`)
  );
}

it("acreates a new file with the record if last file overflows", () => {
  fs.writeFileSync(
    `${directoryName}/audit_1.txt`,
    "Bob;2019-04-03T00:00:00.000Z\r\nJoe;2019-04-04T00:00:00.000Z"
  );
  fs.writeFileSync(
    `${directoryName}/audit_2.txt`,
    "Laurence;2019-04-05T00:00:00.000Z\r\nJamy;2019-04-05T00:00:03.000Z"
  );
  const sut = new AuditManager(2, directoryName, fs);

  sut.addRecord("Alice", new Date("2019-04-06T00:00:00.000Z"));

  const fileContent = fs.readFileSync(`${directoryName}/audit_3.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  expect(fileContent).toBe("Alice;2019-04-06T00:00:00.000Z");
});
