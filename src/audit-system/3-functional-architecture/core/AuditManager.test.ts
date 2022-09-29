import { AuditManager, FileContent } from "./AuditManager";

it("creates a new file with the record when there are no files yet", () => {
  const sut = new AuditManager(2);
  const files: FileContent[] = [];

  const update = sut.addRecord(
    files,
    "Alice",
    new Date("2019-04-06T00:00:00.000Z")
  );

  expect(update.fileName).toBe("audit_1.txt");
  expect(update.newContent).toBe("Alice;2019-04-06T00:00:00.000Z");
});

it("adds the record to the last existing file if no overflow", () => {
  const sut = new AuditManager(2);
  const files = [
    new FileContent("audits/audit_1.txt", [
      "Bob;2019-04-03T00:00:00.000Z",
      "Joe;2019-04-04T00:00:00.000Z",
    ]),
    new FileContent("audits/audit_1.txt", [
      "Laurence;2019-04-05T00:00:00.000Z",
    ]),
  ];

  const update = sut.addRecord(
    files,
    "Alice",
    new Date("2019-04-06T00:00:00.000Z")
  );

  expect(update.fileName).toBe("audit_2.txt");
  expect(update.newContent).toBe("Alice;2019-04-06T00:00:00.000Z");
});

it("creates a new file with the record if last file overflows", () => {
  const sut = new AuditManager(2);
  const files = [
    new FileContent("audits/audit_1.txt", [
      "Bob;2019-04-03T00:00:00.000Z",
      "Joe;2019-04-04T00:00:00.000Z",
    ]),
    new FileContent("audits/audit_1.txt", [
      "Laurence;2019-04-05T00:00:00.000Z",
      "Jamy;2019-04-05T00:00:03.000Z",
    ]),
  ];

  const update = sut.addRecord(
    files,
    "Alice",
    new Date("2019-04-06T00:00:00.000Z")
  );

  expect(update.fileName).toBe("audit_3.txt");
  expect(update.newContent).toBe("Alice;2019-04-06T00:00:00.000Z");
});
