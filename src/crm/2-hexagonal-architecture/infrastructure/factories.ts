/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Company } from "../domain/Company";
import { UserType } from "../domain/types";
import { User } from "../domain/User";
import { Precondition } from "../domain/utils";

export class UserFactory {
  static create(data: { id: number; email: string; type: UserType }) {
    Precondition.requires(Object.keys(data).length >= 3);
    return new User(data.id, data.email, data.type);
  }
}

export class CompanyFactory {
  static create(data: { domainName: string; numberOfEmployees: number }) {
    Precondition.requires(Object.keys(data).length >= 2);
    return new Company(data.domainName, data.numberOfEmployees);
  }
}
