import {
  GithubReporter
} from "./chunk-CGJ7XAKK.mjs";

// src/action.ts
import { getInput } from "@actions/core";
import { startVitest } from "vitest/node";
async function main() {
  const configFile = getInput("config");
  const vitest = await startVitest("test", [], {
    watch: false,
    config: configFile
  }, {
    test: {
      reporters: [new GithubReporter(), "default"]
    }
  });
  await (vitest == null ? void 0 : vitest.close());
}
void main();
//# sourceMappingURL=action.mjs.map