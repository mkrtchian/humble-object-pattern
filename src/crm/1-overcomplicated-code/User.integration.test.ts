import { closeDB, db, deleteDB, initializeDB } from "./Database";
import { User } from "./User";

beforeAll(async () => {
  deleteDB();
  await initializeDB();
});

afterAll(async () => {
  await closeDB();
});

it("changes email from non corporate to corporate", async () => {
  await db.run(
    "INSERT INTO Company (domainName, numberOfEmployees) VALUES ('mycorp.com', 0)"
  );
  await db.run(
    "INSERT INTO User (id, email, type) VALUES (1, 'user@gmail.com', 'customer')"
  );
  const sut = new User(1, "user@gmail.com", "customer");

  await sut.changeEmail(1, "new@mycorp.com");

  const userData: { email: string; type: string } | undefined = await db.get(
    "SELECT * FROM User WHERE id = 1"
  );
  expect(userData?.email).toBe("new@mycorp.com");
  expect(userData?.type).toBe("employee");
  const companyData: { numberOfEmployees: number } | undefined = await db.get(
    "SELECT numberOfEmployees FROM Company"
  );
  expect(companyData?.numberOfEmployees).toBe(1);
});
