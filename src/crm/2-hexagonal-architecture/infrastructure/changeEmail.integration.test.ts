import { closeDB, db, deleteDB, initializeDB } from "./Database";
import { UserController } from "./UserController";

beforeEach(async () => {
  deleteDB();
  await initializeDB();
});

afterEach(async () => {
  await closeDB();
});

it("changes email from non corporate to corporate", async () => {
  const initialEmail = "user@gmail.com";
  const newEmail = "user@mycorp.com";
  const initialType = "customer";
  const newType = "employee";
  const companyDomain = "mycorp.com";
  const initialNumberOfEmployees = 0;
  const newNumberOfEmployees = 1;
  await db.run(
    `INSERT INTO Company (domainName, numberOfEmployees) VALUES ('${companyDomain}', ${initialNumberOfEmployees})`
  );
  await db.run(
    `INSERT INTO User (id, email, type) VALUES (1, '${initialEmail}', '${initialType}')`
  );
  const sut = new UserController();

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
});
