import * as Database from "./Database";
import * as MessageBus from "./MessageBus";
import type { UserType } from "./types";

export class User {
  constructor(
    private userId: number,
    private email: string,
    private type: UserType
  ) {}

  changeEmail(userId: number, newEmail: string) {
    const userData = Database.getUserById(userId);
    this.userId = userId;
    this.email = userData[1];
    this.type = userData[2];

    if (this.email == newEmail) {
      return;
    }

    const companyData = Database.getCompany();
    const companyDomainName = companyData[0];
    const numberOfEmployees = companyData[1];

    const emailDomain = newEmail.split("@")[1];
    const isEmailCorporate = emailDomain === companyDomainName;
    const newType = isEmailCorporate ? "employee" : "customer";

    if (this.type != newType) {
      const delta = newType === "employee" ? 1 : -1;
      const newNumber = numberOfEmployees + delta;
      Database.saveCompany(newNumber);
    }
    this.email = newEmail;
    this.type = newType;

    Database.saveUser(this);
    MessageBus.sendEmailChangedMessage(userId, newEmail);
  }
}
