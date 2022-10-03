import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
import * as fs from "fs";
import type { UserType } from "./types";
import { User } from "./User";

const databaseFileFolder = `${__dirname}/test_artifacts`;
const databaseFilePath = `${databaseFileFolder}/crm.db`;
export let db: Database;

export async function initializeDB() {
  createDBDirectory();
  db = await open({
    filename: databaseFilePath,
    driver: sqlite3.Database,
  });
  await db.run(
    "CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY, email TEXT, type TEXT)"
  );
  await db.run(
    "CREATE TABLE IF NOT EXISTS Company (domainName TEXT PRIMARY KEY, numberOfEmployees INTEGER)"
  );
}

function createDBDirectory() {
  if (!fs.existsSync(databaseFileFolder)) {
    fs.mkdirSync(databaseFileFolder);
  }
}

export async function closeDB() {
  await db.close();
}

export function deleteDB() {
  if (fs.existsSync(databaseFilePath)) {
    fs.rmSync(databaseFilePath);
  }
}

export async function getUserById(
  userId: number
): Promise<{ id: number; email: string; type: UserType } | undefined> {
  return db.get(`SELECT * FROM User WHERE id = ${userId}`);
}

export async function getUserByEmail(
  email: string
): Promise<{ id: number; email: string; type: UserType } | undefined> {
  return db.get(`SELECT * FROM User WHERE email = ${email}`);
}

export async function saveUser(user: User): Promise<void> {
  await db.run(`UPDATE User SET type = ?, email = ? WHERE id = ?`, [
    user.type,
    user.email,
    user.userId,
  ]);
}

export async function getCompany(): Promise<
  { domainName: string; numberOfEmployees: number } | undefined
> {
  return db.get("SELECT * FROM Company");
}

export async function saveCompany(newEmployeeNumber: number): Promise<void> {
  await db.run(`UPDATE Company SET numberOfEmployees = ?`, [newEmployeeNumber]);
}
