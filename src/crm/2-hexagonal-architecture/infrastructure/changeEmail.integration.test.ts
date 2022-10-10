import { closeDB, db, deleteDB, initializeDB } from "./Database";
import { MessageBus } from "./MessageBus";
import { UserController } from "./UserController";

beforeEach(async () => {
  deleteDB();
  await initializeDB();
});

afterEach(async () => {
  await closeDB();
});

it("changes email from non corporate to corporate", async () => {
  // Arrange
  await db.run(
    `INSERT INTO Company (domainName, numberOfEmployees) VALUES ('mycorp.com', 0)`
  );
  await db.run(
    `INSERT INTO User (id, email, type) VALUES (1, 'user@gmail.com', 'customer')`
  );
  const busMock = { send: jest.fn() };
  const sut = new UserController(new MessageBus(busMock));

  // Act
  await sut.changeEmail(1, "user@mycorp.com");

  // Assert
  const userData: { email: string; type: string } | undefined = await db.get(
    "SELECT * FROM User WHERE id = 1"
  );
  expect(userData?.email).toBe("user@mycorp.com");
  expect(userData?.type).toBe("employee");
  const companyData: { numberOfEmployees: number } | undefined = await db.get(
    "SELECT numberOfEmployees FROM Company"
  );
  expect(companyData?.numberOfEmployees).toBe(1);

  expect(busMock.send).toHaveBeenCalledTimes(1);
  expect(busMock.send).toHaveBeenCalledWith(expect.toInclude("1"));
  expect(busMock.send).toHaveBeenCalledWith(
    expect.toInclude("user@mycorp.com")
  );
});
