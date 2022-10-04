import { closeDB, db, deleteDB, initializeDB } from "./Database";
import { UserType } from "./types";
import { User } from "./User";

beforeEach(async () => {
  deleteDB();
  await initializeDB();
});

afterEach(async () => {
  await closeDB();
});

it("changes email from non corporate to corporate", async () => {
  await testChangeEmail({
    initialEmail: "user@gmail.com",
    newEmail: "user@mycorp.com",
    initialType: "customer",
    newType: "employee",
    initialNumberOfEmployees: 0,
    newNumberOfEmployees: 1,
  });
});

it("changes email from corporate to non corporate", async () => {
  await testChangeEmail({
    initialEmail: "user@mycorp.com",
    newEmail: "user@gmail.com",
    initialType: "employee",
    newType: "customer",
    initialNumberOfEmployees: 1,
    newNumberOfEmployees: 0,
  });
});

it("does not change anything when the email is the same", async () => {
  await testChangeEmail({
    initialEmail: "user@mycorp.com",
    newEmail: "user@mycorp.com",
    initialType: "employee",
    newType: "employee",
    initialNumberOfEmployees: 1,
    newNumberOfEmployees: 1,
  });
});

it("changes an email for a corporate user", async () => {
  await testChangeEmail({
    initialEmail: "user@mycorp.com",
    newEmail: "new@mycorp.com",
    initialType: "employee",
    newType: "employee",
    initialNumberOfEmployees: 1,
    newNumberOfEmployees: 1,
  });
});

it("changes an email for a non corporate user", async () => {
  await testChangeEmail({
    initialEmail: "user@gmail.com",
    newEmail: "new@gmail.com",
    initialType: "customer",
    newType: "customer",
    initialNumberOfEmployees: 0,
    newNumberOfEmployees: 0,
  });
});

async function testChangeEmail({
  initialEmail,
  newEmail,
  initialType,
  newType,
  companyDomain = "mycorp.com",
  initialNumberOfEmployees,
  newNumberOfEmployees,
}: {
  initialEmail: string;
  newEmail: string;
  initialType: UserType;
  newType: UserType;
  companyDomain?: string;
  initialNumberOfEmployees: number;
  newNumberOfEmployees: number;
}) {
  await db.run(
    `INSERT INTO Company (domainName, numberOfEmployees) VALUES ('${companyDomain}', ${initialNumberOfEmployees})`
  );
  await db.run(
    `INSERT INTO User (id, email, type) VALUES (1, '${initialEmail}', '${initialType}')`
  );
  const sut = new User(1, initialEmail, initialType);

  await sut.changeEmail(1, newEmail);

  const userData: { email: string; type: string } | undefined = await db.get(
    "SELECT * FROM User WHERE id = 1"
  );
  expect(userData?.email).toBe(newEmail);
  expect(userData?.type).toBe(newType);
  const companyData: { numberOfEmployees: number } | undefined = await db.get(
    "SELECT numberOfEmployees FROM Company"
  );
  expect(companyData?.numberOfEmployees).toBe(newNumberOfEmployees);
}
