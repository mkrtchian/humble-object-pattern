import { User } from "./User";

it("changes email from non corporate to corporate", () => {
  // TODO: setup database
  const sut = new User(1, "user@gmail.com", "customer");

  sut.changeEmail(1, "new@mycorp.com");

  // TODO: check changes in database
});
