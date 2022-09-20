import type { Config } from "jest";

const config: Config = {
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
