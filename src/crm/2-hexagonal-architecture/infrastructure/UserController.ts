import * as Database from "./Database";
import { CompanyFactory, UserFactory } from "./factories";
import { MessageBus } from "./MessageBus";

export class UserController {
  constructor(private messageBus: MessageBus) {}

  async changeEmail(userId: number, newEmail: string) {
    const userData = await Database.getUserById(userId);
    if (!userData)
      throw new Error(
        `User entree with id ${userId} not found in the database`
      );
    const user = UserFactory.create(userData);
    const companyData = await Database.getCompany();
    if (!companyData)
      throw new Error("Company entree not found in the database");
    const company = CompanyFactory.create(companyData);

    user.changeEmail(newEmail, company);

    await Database.saveCompany(company.numberOfEmployees);
    await Database.saveUser(user);
    this.messageBus.sendEmailChangedMessage(userId, newEmail);
  }
}
