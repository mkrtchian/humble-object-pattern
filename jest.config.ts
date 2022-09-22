import type { Config } from "jest";

const config: Config = {
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  setupFilesAfterEnv: ["jest-extended/all"]
};

export default config;
