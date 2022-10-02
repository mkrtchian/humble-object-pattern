import type { UserType } from "./types";
import { User } from "./User";

export function getUserById(userId: number): [number, string, UserType] {
  return [userId, "me@mycorp.com", "customer"];
}

export function getUserByEmail(email: string): [number, string, UserType] {
  return [1, email, "customer"];
}

export function saveUser(user: User) {
  return user;
}

export function getCompany(): [string, number] {
  return ["mycorp.com", 1];
}

export function saveCompany(newEmployeeNumber: number) {
  return newEmployeeNumber;
}
