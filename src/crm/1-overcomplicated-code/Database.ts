import sqlite3 from "sqlite3";
import * as fs from "fs";
import type { UserType } from "./types";
import { User } from "./User";

const databaseFilePath = `${__dirname}/test_artifacts/crm.db`;
let db: sqlite3.Database;

export function initializeDB() {
  createDBDirectory();
  db = new sqlite3.Database(databaseFilePath);
  db.run(
    "CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY, email TEXT, type TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Company (domainName TEXT PRIMARY KEY, numberOfEmployees INTEGER)"
  );
}

function createDBDirectory() {
  if (!fs.existsSync(databaseFilePath)) {
    fs.mkdirSync(databaseFilePath);
  }
}

export function closeDB() {
  db.close();
}

export function deleteDB() {
  fs.rmSync(databaseFilePath);
}

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
