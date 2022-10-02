import { closeDB, deleteDB, initializeDB } from "./Database";
import { User } from "./User";

beforeAll(() => {
  deleteDB();
  initializeDB();
});

afterAll(() => {
  closeDB();
});

it("changes email from non corporate to corporate", () => {
  // TODO: setup database
  const sut = new User(1, "user@gmail.com", "customer");

  sut.changeEmail(1, "new@mycorp.com");

  // TODO: check changes in database
});
