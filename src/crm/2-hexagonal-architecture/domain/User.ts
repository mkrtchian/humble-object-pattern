import { Company } from "./Company";
import { UserType } from "./types";

export class User {
  constructor(
    public userId: number,
    public email: string,
    public type: UserType
  ) {}

  changeEmail(newEmail: string, company: Company) {
    if (newEmail === this.email) return;

    const newType = company.isEmailCorporate(newEmail)
      ? "employee"
      : "customer";
    if (this.type != newType) {
      const delta = newType === "employee" ? 1 : -1;
      company.changeNumberOfEmployees(delta);
    }

    this.email = newEmail;
    this.type = newType;
  }
}
