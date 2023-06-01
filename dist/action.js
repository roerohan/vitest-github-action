// src/action.ts
import { getInput } from "@actions/core";
import { startVitest } from "vitest/node";

// src/GithubReporter.ts
import { endGroup, startGroup, error as actionsError } from "@actions/core";
var GithubReporter = class {
  ctx;
  onInit(ctx) {
    this.ctx = ctx;
  }
  onFinished(files, _errors) {
    if (!files?.length) {
      return;
    }
    startGroup("Vitest annotations:");
    const tests = this.identifyTests(files);
    const failedTests = tests.filter(({ result }) => result?.state === "fail");
    const formattedErrors = this.getFormattedErrors(failedTests);
    formattedErrors.forEach((error) => {
      actionsError(
        error.stack ? `Stack trace: 

${error.stack}` : "Vitest Error",
        error.annotation
      );
    });
    console.log("Formatted Errors", formattedErrors);
    endGroup();
  }
  identifyTests(tasks, tests = []) {
    tasks.forEach((task) => {
      if (task.type === "suite") {
        this.identifyTests(task.tasks, tests);
      } else if (task.type === "test") {
        tests.push(task);
      }
    });
    return tests;
  }
  getFullNameOfTest(test, name = "") {
    if (!test.suite) {
      return "";
    }
    name = test.name;
    const suiteName = this.getFullNameOfTest(test.suite, name);
    return `${suiteName ? `${suiteName} > ` : ""}${name}`;
  }
  getAllErrors(tests) {
    let errors = [];
    tests.forEach((test) => {
      const errs = test.result?.errors?.map((error) => ({
        ...error,
        file: test.file,
        testName: this.getFullNameOfTest(test)
      }));
      if (errs?.length) {
        errors = errors.concat(errs);
      }
    });
    return errors;
  }
  getErrorLocation(stackTrace, fileName) {
    const errorLine = stackTrace.split("\n").find((stackTraceLine) => stackTraceLine.includes(fileName)) ?? "";
    const bracketRegex = /\((.*):(\d+):(\d+)\)$/;
    const atRegex = /at (.*):(\d+):(\d+)$/;
    let match;
    match = bracketRegex.exec(errorLine);
    if (!match) {
      match = atRegex.exec(errorLine);
    }
    if (match && match.length >= 3) {
      return {
        file: match[1],
        line: parseInt(match[2], 10),
        col: parseInt(match[3], 10)
      };
    }
  }
  getFormattedErrors(failedTests) {
    const errors = this.getAllErrors(failedTests);
    const formattedErrors = [];
    errors.forEach((error) => {
      if (!error?.stack) {
        return;
      }
      error.stack = this.removeAnsiColors(error.stack);
      error.message = this.removeAnsiColors(error.message);
      error.name = this.removeAnsiColors(error.name);
      const { file, line, col } = this.getErrorLocation(error.stack, error.file?.name ?? "") ?? {};
      if (file && line && col) {
        const annotation = {
          file,
          startLine: line,
          startColumn: col,
          title: `${error.name}: ${error.testName}`
        };
        formattedErrors.push({
          annotation,
          stack: error.stack
        });
      }
    });
    return formattedErrors;
  }
  removeAnsiColors(str) {
    const colorRegex = /^$/;
    return str.replace(colorRegex, "");
  }
};

// src/action.ts
async function main() {
  const configFile = getInput("config");
  const coverage = Boolean(getInput("coverage")) ?? true;
  const vitest = await startVitest("test", [], {
    watch: false,
    config: configFile
  }, {
    test: {
      reporters: [new GithubReporter(), "default"],
      coverage: {
        enabled: coverage,
        provider: "custom",
        customProviderModule: "github-istanbul-coverage-provider"
      }
    }
  });
  await vitest?.close();
}
void main();
