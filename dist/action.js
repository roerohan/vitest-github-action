var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/action.ts
var core = __toESM(require("@actions/core"));
var import_node = require("vitest/node");

// src/GithubReporter.ts
var import_core = require("@actions/core");
var GithubReporter = class {
  ctx;
  onInit(ctx) {
    this.ctx = ctx;
  }
  onFinished(files, _errors) {
    if (!(files == null ? void 0 : files.length)) {
      return;
    }
    (0, import_core.startGroup)("Vitest annotations:");
    const tests = this.identifyTests(files);
    const failedTests = tests.filter(({ result }) => (result == null ? void 0 : result.state) === "fail");
    const formattedErrors = this.getFormattedErrors(failedTests);
    formattedErrors.forEach((error) => {
      (0, import_core.error)(
        error.stack ? `Stack trace: 

${error.stack}` : "Vitest Error",
        error.annotation
      );
    });
    console.log("Formatted Errors", formattedErrors);
    (0, import_core.endGroup)();
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
      var _a, _b;
      const errs = (_b = (_a = test.result) == null ? void 0 : _a.errors) == null ? void 0 : _b.map((error) => ({
        ...error,
        file: test.file,
        testName: this.getFullNameOfTest(test)
      }));
      if (errs == null ? void 0 : errs.length) {
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
      var _a;
      if (!(error == null ? void 0 : error.stack)) {
        return;
      }
      error.stack = this.removeAnsiColors(error.stack);
      error.message = this.removeAnsiColors(error.message);
      error.name = this.removeAnsiColors(error.name);
      const { file, line, col } = this.getErrorLocation(error.stack, ((_a = error.file) == null ? void 0 : _a.name) ?? "") ?? {};
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
    const colorRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
    return str.replace(colorRegex, "");
  }
};

// src/action.ts
async function main() {
  const configFile = core.getInput("config");
  const vitest = await (0, import_node.startVitest)("test", [], {
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
//# sourceMappingURL=action.js.map