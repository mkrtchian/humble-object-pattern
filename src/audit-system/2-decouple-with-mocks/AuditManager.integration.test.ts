import { FileSystem } from "../2-decouple-with-mocks/AuditManager";
import { AuditManager } from "./AuditManager";

it("creates a new file with the record when there are no files yet", () => {
  const fileSystemMock: FileSystem = {
    readdirSync: () => [],
    readFileSync: () => "",
    writeFileSync: jest.fn(),
  };
  const sut = new AuditManager(3, "audits", fileSystemMock);

  sut.addRecord("Alice", new Date("2019-04-06T00:00:00.000Z"));

  expect(fileSystemMock.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fileSystemMock.writeFileSync).toHaveBeenCalledWith(
    "audits/audit_1.txt",
    "Alice;2019-04-06T00:00:00.000Z"
  );
});

it("adds the record to the last existing file if no overflow", () => {
  const fileSystemMock: FileSystem = {
    readdirSync: () => ["audit_1.txt", "audit_2.txt"],
    readFileSync: (directory) => {
      if (directory === "audits/audit_1.txt")
        return "Bob;2019-04-03T00:00:00.000Z\r\nJoe;2019-04-04T00:00:00.000Z";
      if (directory === "audits/audit_2.txt")
        return "Laurence;2019-04-05T00:00:00.000Z";
      throw new Error("An unexpected file was read");
    },
    writeFileSync: jest.fn(),
  };
  const sut = new AuditManager(2, "audits", fileSystemMock);

  sut.addRecord("Alice", new Date("2019-04-06T00:00:00.000Z"));

  expect(fileSystemMock.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fileSystemMock.writeFileSync).toHaveBeenCalledWith(
    "audits/audit_2.txt",
    "Laurence;2019-04-05T00:00:00.000Z\r\nAlice;2019-04-06T00:00:00.000Z"
  );
});

it("acreates a new file with the record if last file overflows", () => {
  const fileSystemMock: FileSystem = {
    readdirSync: () => ["audit_1.txt", "audit_2.txt"],
    readFileSync: (directory) => {
      if (directory === "audits/audit_1.txt")
        return "Bob;2019-04-03T00:00:00.000Z\r\nJoe;2019-04-04T00:00:00.000Z";
      if (directory === "audits/audit_2.txt")
        return "Laurence;2019-04-05T00:00:00.000Z\r\nJamy;2019-04-05T00:00:03.000Z";
      throw new Error("An unexpected file was read");
    },
    writeFileSync: jest.fn(),
  };
  const sut = new AuditManager(2, "audits", fileSystemMock);

  sut.addRecord("Alice", new Date("2019-04-06T00:00:00.000Z"));

  expect(fileSystemMock.writeFileSync).toHaveBeenCalledTimes(1);
  expect(fileSystemMock.writeFileSync).toHaveBeenCalledWith(
    "audits/audit_3.txt",
    "Alice;2019-04-06T00:00:00.000Z"
  );
});
