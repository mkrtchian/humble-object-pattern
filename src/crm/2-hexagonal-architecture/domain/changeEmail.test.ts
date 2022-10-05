import { Company } from "./Company";
import { User } from "./User";

describe("Main feature", () => {
  it("changes email from non corporate to corporate", () => {
    const company = new Company("mycorp.com", 1);
    const sut = new User("user@gmail.com", "customer");

    sut.changeEmail("user@mycorp.com", company);

    expect(company.numberOfEmployees).toBe(2);
    expect(sut.email).toBe("user@mycorp.com");
    expect(sut.type).toBe("employee");
  });

  it("changes email from corporate to non corporate", () => {
    const company = new Company("mycorp.com", 1);
    const sut = new User("user@mycorp.com", "employee");

    sut.changeEmail("user@gmail.com", company);

    expect(company.numberOfEmployees).toBe(0);
    expect(sut.email).toBe("user@gmail.com");
    expect(sut.type).toBe("customer");
  });

  it("does not change anything when the email is the same", () => {
    const company = new Company("mycorp.com", 1);
    const sut = new User("user@gmail.com", "customer");

    sut.changeEmail("user@gmail.com", company);

    expect(company.numberOfEmployees).toBe(1);
    expect(sut.email).toBe("user@gmail.com");
    expect(sut.type).toBe("customer");
  });

  it("changes an email for a corporate user", () => {
    const company = new Company("mycorp.com", 1);
    const sut = new User("user@mycorp.com", "employee");

    sut.changeEmail("new@mycorp.com", company);

    expect(company.numberOfEmployees).toBe(1);
    expect(sut.email).toBe("new@mycorp.com");
    expect(sut.type).toBe("employee");
  });

  it("changes an email for a non corporate user", () => {
    const company = new Company("mycorp.com", 1);
    const sut = new User("user@gmail.com", "customer");

    sut.changeEmail("new@gmail.com", company);

    expect(company.numberOfEmployees).toBe(1);
    expect(sut.email).toBe("new@gmail.com");
    expect(sut.type).toBe("customer");
  });
});

describe("Preconditions", () => {
  it("fails when changing number of employees results in negative number", () => {
    const sut = new Company("mycorp.com", 1);

    function shouldThrow() {
      sut.changeNumberOfEmployees(-2);
    }

    expect(shouldThrow).toThrowError();
  });
});
