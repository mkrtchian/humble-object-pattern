import { Precondition } from "./utils";

export class Company {
  constructor(public domainName: string, public numberOfEmployees: number) {}

  changeNumberOfEmployees(delta: number) {
    Precondition.requires(this.numberOfEmployees + delta >= 0);
    this.numberOfEmployees += delta;
  }

  isEmailCorporate(email: string) {
    const emailDomain = email.split("@")[1];
    return emailDomain === this.domainName;
  }
}
