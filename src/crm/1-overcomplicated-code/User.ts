import * as Database from "./Database";
import * as MessageBus from "./MessageBus";
import type { UserType } from "./types";

export class User {
  constructor(
    public userId: number,
    public email: string | undefined,
    public type: UserType | undefined
  ) {}

  async changeEmail(userId: number, newEmail: string) {
    const userData = await Database.getUserById(userId);
    if (!userData)
      throw new Error(
        `User entree with id ${userId} not found in the database`
      );
    this.userId = userId;
    this.email = userData.email;
    this.type = userData.type;

    if (this.email == newEmail) {
      return;
    }

    const companyData = await Database.getCompany();
    if (!companyData)
      throw new Error("Company entree not found in the database");
    const companyDomainName = companyData.domainName;
    const numberOfEmployees = companyData.numberOfEmployees;

    const emailDomain = newEmail.split("@")[1];
    const isEmailCorporate = emailDomain === companyDomainName;
    const newType = isEmailCorporate ? "employee" : "customer";

    if (this.type != newType) {
      const delta = newType === "employee" ? 1 : -1;
      const newNumber = numberOfEmployees + delta;
      await Database.saveCompany(newNumber);
    }
    this.email = newEmail;
    this.type = newType;

    await Database.saveUser(this);
    MessageBus.sendEmailChangedMessage(userId, newEmail);
  }
}
