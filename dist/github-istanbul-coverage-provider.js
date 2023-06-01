var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/istanbul-lib-coverage/lib/percent.js
var require_percent = __commonJS({
  "node_modules/istanbul-lib-coverage/lib/percent.js"(exports, module) {
    "use strict";
    module.exports = function percent(covered, total) {
      let tmp;
      if (total > 0) {
        tmp = 1e3 * 100 * covered / total;
        return Math.floor(tmp / 10) / 100;
      } else {
        return 100;
      }
    };
  }
});

// node_modules/istanbul-lib-coverage/lib/data-properties.js
var require_data_properties = __commonJS({
  "node_modules/istanbul-lib-coverage/lib/data-properties.js"(exports, module) {
    "use strict";
    module.exports = function dataProperties(klass, properties) {
      properties.forEach((p) => {
        Object.defineProperty(klass.prototype, p, {
          enumerable: true,
          get() {
            return this.data[p];
          }
        });
      });
    };
  }
});

// node_modules/istanbul-lib-coverage/lib/coverage-summary.js
var require_coverage_summary = __commonJS({
  "node_modules/istanbul-lib-coverage/lib/coverage-summary.js"(exports, module) {
    "use strict";
    var percent = require_percent();
    var dataProperties = require_data_properties();
    function blankSummary() {
      const empty = () => ({
        total: 0,
        covered: 0,
        skipped: 0,
        pct: "Unknown"
      });
      return {
        lines: empty(),
        statements: empty(),
        functions: empty(),
        branches: empty(),
        branchesTrue: empty()
      };
    }
    function assertValidSummary(obj) {
      const valid = obj && obj.lines && obj.statements && obj.functions && obj.branches;
      if (!valid) {
        throw new Error(
          "Invalid summary coverage object, missing keys, found:" + Object.keys(obj).join(",")
        );
      }
    }
    var CoverageSummary = class {
      /**
       * @constructor
       * @param {Object|CoverageSummary} [obj=undefined] an optional data object or
       * another coverage summary to initialize this object with.
       */
      constructor(obj) {
        if (!obj) {
          this.data = blankSummary();
        } else if (obj instanceof CoverageSummary) {
          this.data = obj.data;
        } else {
          this.data = obj;
        }
        assertValidSummary(this.data);
      }
      /**
       * merges a second summary coverage object into this one
       * @param {CoverageSummary} obj - another coverage summary object
       */
      merge(obj) {
        const keys = [
          "lines",
          "statements",
          "branches",
          "functions",
          "branchesTrue"
        ];
        keys.forEach((key) => {
          if (obj[key]) {
            this[key].total += obj[key].total;
            this[key].covered += obj[key].covered;
            this[key].skipped += obj[key].skipped;
            this[key].pct = percent(this[key].covered, this[key].total);
          }
        });
        return this;
      }
      /**
       * returns a POJO that is JSON serializable. May be used to get the raw
       * summary object.
       */
      toJSON() {
        return this.data;
      }
      /**
       * return true if summary has no lines of code
       */
      isEmpty() {
        return this.lines.total === 0;
      }
    };
    dataProperties(CoverageSummary, [
      "lines",
      "statements",
      "functions",
      "branches",
      "branchesTrue"
    ]);
    module.exports = {
      CoverageSummary
    };
  }
});

// node_modules/istanbul-lib-coverage/lib/file-coverage.js
var require_file_coverage = __commonJS({
  "node_modules/istanbul-lib-coverage/lib/file-coverage.js"(exports, module) {
    "use strict";
    var percent = require_percent();
    var dataProperties = require_data_properties();
    var { CoverageSummary } = require_coverage_summary();
    function emptyCoverage(filePath, reportLogic) {
      const cov = {
        path: filePath,
        statementMap: {},
        fnMap: {},
        branchMap: {},
        s: {},
        f: {},
        b: {}
      };
      if (reportLogic)
        cov.bT = {};
      return cov;
    }
    function assertValidObject(obj) {
      const valid = obj && obj.path && obj.statementMap && obj.fnMap && obj.branchMap && obj.s && obj.f && obj.b;
      if (!valid) {
        throw new Error(
          "Invalid file coverage object, missing keys, found:" + Object.keys(obj).join(",")
        );
      }
    }
    var keyFromLoc = ({ start, end }) => `${start.line}|${start.column}|${end.line}|${end.column}`;
    var mergeProp = (aHits, aMap, bHits, bMap, itemKey = keyFromLoc) => {
      const aItems = {};
      for (const [key, itemHits] of Object.entries(aHits)) {
        const item = aMap[key];
        aItems[itemKey(item)] = [itemHits, item];
      }
      for (const [key, bItemHits] of Object.entries(bHits)) {
        const bItem = bMap[key];
        const k = itemKey(bItem);
        if (aItems[k]) {
          const aPair = aItems[k];
          if (bItemHits.forEach) {
            bItemHits.forEach((hits2, h) => {
              if (aPair[0][h] !== void 0)
                aPair[0][h] += hits2;
              else
                aPair[0][h] = hits2;
            });
          } else {
            aPair[0] += bItemHits;
          }
        } else {
          aItems[k] = [bItemHits, bItem];
        }
      }
      const hits = {};
      const map = {};
      Object.values(aItems).forEach(([itemHits, item], i) => {
        hits[i] = itemHits;
        map[i] = item;
      });
      return [hits, map];
    };
    var FileCoverage = class {
      /**
       * @constructor
       * @param {Object|FileCoverage|String} pathOrObj is a string that initializes
       * and empty coverage object with the specified file path or a data object that
       * has all the required properties for a file coverage object.
       */
      constructor(pathOrObj, reportLogic = false) {
        if (!pathOrObj) {
          throw new Error(
            "Coverage must be initialized with a path or an object"
          );
        }
        if (typeof pathOrObj === "string") {
          this.data = emptyCoverage(pathOrObj, reportLogic);
        } else if (pathOrObj instanceof FileCoverage) {
          this.data = pathOrObj.data;
        } else if (typeof pathOrObj === "object") {
          this.data = pathOrObj;
        } else {
          throw new Error("Invalid argument to coverage constructor");
        }
        assertValidObject(this.data);
      }
      /**
       * returns computed line coverage from statement coverage.
       * This is a map of hits keyed by line number in the source.
       */
      getLineCoverage() {
        const statementMap = this.data.statementMap;
        const statements = this.data.s;
        const lineMap = /* @__PURE__ */ Object.create(null);
        Object.entries(statements).forEach(([st, count]) => {
          if (!statementMap[st]) {
            return;
          }
          const { line } = statementMap[st].start;
          const prevVal = lineMap[line];
          if (prevVal === void 0 || prevVal < count) {
            lineMap[line] = count;
          }
        });
        return lineMap;
      }
      /**
       * returns an array of uncovered line numbers.
       * @returns {Array} an array of line numbers for which no hits have been
       *  collected.
       */
      getUncoveredLines() {
        const lc = this.getLineCoverage();
        const ret = [];
        Object.entries(lc).forEach(([l, hits]) => {
          if (hits === 0) {
            ret.push(l);
          }
        });
        return ret;
      }
      /**
       * returns a map of branch coverage by source line number.
       * @returns {Object} an object keyed by line number. Each object
       * has a `covered`, `total` and `coverage` (percentage) property.
       */
      getBranchCoverageByLine() {
        const branchMap = this.branchMap;
        const branches = this.b;
        const ret = {};
        Object.entries(branchMap).forEach(([k, map]) => {
          const line = map.line || map.loc.start.line;
          const branchData = branches[k];
          ret[line] = ret[line] || [];
          ret[line].push(...branchData);
        });
        Object.entries(ret).forEach(([k, dataArray]) => {
          const covered = dataArray.filter((item) => item > 0);
          const coverage = covered.length / dataArray.length * 100;
          ret[k] = {
            covered: covered.length,
            total: dataArray.length,
            coverage
          };
        });
        return ret;
      }
      /**
       * return a JSON-serializable POJO for this file coverage object
       */
      toJSON() {
        return this.data;
      }
      /**
       * merges a second coverage object into this one, updating hit counts
       * @param {FileCoverage} other - the coverage object to be merged into this one.
       *  Note that the other object should have the same structure as this one (same file).
       */
      merge(other) {
        if (other.all === true) {
          return;
        }
        if (this.all === true) {
          this.data = other.data;
          return;
        }
        let [hits, map] = mergeProp(
          this.s,
          this.statementMap,
          other.s,
          other.statementMap
        );
        this.data.s = hits;
        this.data.statementMap = map;
        const keyFromLocProp = (x) => keyFromLoc(x.loc);
        const keyFromLocationsProp = (x) => keyFromLoc(x.locations[0]);
        [hits, map] = mergeProp(
          this.f,
          this.fnMap,
          other.f,
          other.fnMap,
          keyFromLocProp
        );
        this.data.f = hits;
        this.data.fnMap = map;
        [hits, map] = mergeProp(
          this.b,
          this.branchMap,
          other.b,
          other.branchMap,
          keyFromLocationsProp
        );
        this.data.b = hits;
        this.data.branchMap = map;
        if (this.bT && other.bT) {
          [hits, map] = mergeProp(
            this.bT,
            this.branchMap,
            other.bT,
            other.branchMap,
            keyFromLocationsProp
          );
          this.data.bT = hits;
        }
      }
      computeSimpleTotals(property) {
        let stats = this[property];
        if (typeof stats === "function") {
          stats = stats.call(this);
        }
        const ret = {
          total: Object.keys(stats).length,
          covered: Object.values(stats).filter((v) => !!v).length,
          skipped: 0
        };
        ret.pct = percent(ret.covered, ret.total);
        return ret;
      }
      computeBranchTotals(property) {
        const stats = this[property];
        const ret = { total: 0, covered: 0, skipped: 0 };
        Object.values(stats).forEach((branches) => {
          ret.covered += branches.filter((hits) => hits > 0).length;
          ret.total += branches.length;
        });
        ret.pct = percent(ret.covered, ret.total);
        return ret;
      }
      /**
       * resets hit counts for all statements, functions and branches
       * in this coverage object resulting in zero coverage.
       */
      resetHits() {
        const statements = this.s;
        const functions = this.f;
        const branches = this.b;
        const branchesTrue = this.bT;
        Object.keys(statements).forEach((s) => {
          statements[s] = 0;
        });
        Object.keys(functions).forEach((f) => {
          functions[f] = 0;
        });
        Object.keys(branches).forEach((b) => {
          branches[b].fill(0);
        });
        if (branchesTrue) {
          Object.keys(branchesTrue).forEach((bT) => {
            branchesTrue[bT].fill(0);
          });
        }
      }
      /**
       * returns a CoverageSummary for this file coverage object
       * @returns {CoverageSummary}
       */
      toSummary() {
        const ret = {};
        ret.lines = this.computeSimpleTotals("getLineCoverage");
        ret.functions = this.computeSimpleTotals("f", "fnMap");
        ret.statements = this.computeSimpleTotals("s", "statementMap");
        ret.branches = this.computeBranchTotals("b");
        if (this["bt"]) {
          ret.branchesTrue = this.computeBranchTotals("bT");
        }
        return new CoverageSummary(ret);
      }
    };
    dataProperties(FileCoverage, [
      "path",
      "statementMap",
      "fnMap",
      "branchMap",
      "s",
      "f",
      "b",
      "bT",
      "all"
    ]);
    module.exports = {
      FileCoverage
    };
  }
});

// node_modules/istanbul-lib-coverage/lib/coverage-map.js
var require_coverage_map = __commonJS({
  "node_modules/istanbul-lib-coverage/lib/coverage-map.js"(exports, module) {
    "use strict";
    var { FileCoverage } = require_file_coverage();
    var { CoverageSummary } = require_coverage_summary();
    function maybeConstruct(obj, klass) {
      if (obj instanceof klass) {
        return obj;
      }
      return new klass(obj);
    }
    function loadMap(source) {
      const data = /* @__PURE__ */ Object.create(null);
      if (!source) {
        return data;
      }
      Object.entries(source).forEach(([k, cov]) => {
        data[k] = maybeConstruct(cov, FileCoverage);
      });
      return data;
    }
    var CoverageMap = class {
      /**
       * @constructor
       * @param {Object} [obj=undefined] obj A coverage map from which to initialize this
       * map's contents. This can be the raw global coverage object.
       */
      constructor(obj) {
        if (obj instanceof CoverageMap) {
          this.data = obj.data;
        } else {
          this.data = loadMap(obj);
        }
      }
      /**
       * merges a second coverage map into this one
       * @param {CoverageMap} obj - a CoverageMap or its raw data. Coverage is merged
       *  correctly for the same files and additional file coverage keys are created
       *  as needed.
       */
      merge(obj) {
        const other = maybeConstruct(obj, CoverageMap);
        Object.values(other.data).forEach((fc) => {
          this.addFileCoverage(fc);
        });
      }
      /**
       * filter the coveragemap based on the callback provided
       * @param {Function (filename)} callback - Returns true if the path
       *  should be included in the coveragemap. False if it should be
       *  removed.
       */
      filter(callback) {
        Object.keys(this.data).forEach((k) => {
          if (!callback(k)) {
            delete this.data[k];
          }
        });
      }
      /**
       * returns a JSON-serializable POJO for this coverage map
       * @returns {Object}
       */
      toJSON() {
        return this.data;
      }
      /**
       * returns an array for file paths for which this map has coverage
       * @returns {Array{string}} - array of files
       */
      files() {
        return Object.keys(this.data);
      }
      /**
       * returns the file coverage for the specified file.
       * @param {String} file
       * @returns {FileCoverage}
       */
      fileCoverageFor(file) {
        const fc = this.data[file];
        if (!fc) {
          throw new Error(`No file coverage available for: ${file}`);
        }
        return fc;
      }
      /**
       * adds a file coverage object to this map. If the path for the object,
       * already exists in the map, it is merged with the existing coverage
       * otherwise a new key is added to the map.
       * @param {FileCoverage} fc the file coverage to add
       */
      addFileCoverage(fc) {
        const cov = new FileCoverage(fc);
        const { path: path2 } = cov;
        if (this.data[path2]) {
          this.data[path2].merge(cov);
        } else {
          this.data[path2] = cov;
        }
      }
      /**
       * returns the coverage summary for all the file coverage objects in this map.
       * @returns {CoverageSummary}
       */
      getCoverageSummary() {
        const ret = new CoverageSummary();
        Object.values(this.data).forEach((fc) => {
          ret.merge(fc.toSummary());
        });
        return ret;
      }
    };
    module.exports = {
      CoverageMap
    };
  }
});

// node_modules/istanbul-lib-coverage/index.js
var require_istanbul_lib_coverage = __commonJS({
  "node_modules/istanbul-lib-coverage/index.js"(exports, module) {
    "use strict";
    var { FileCoverage } = require_file_coverage();
    var { CoverageMap } = require_coverage_map();
    var { CoverageSummary } = require_coverage_summary();
    module.exports = {
      /**
       * creates a coverage summary object
       * @param {Object} obj an argument with the same semantics
       *  as the one passed to the `CoverageSummary` constructor
       * @returns {CoverageSummary}
       */
      createCoverageSummary(obj) {
        if (obj && obj instanceof CoverageSummary) {
          return obj;
        }
        return new CoverageSummary(obj);
      },
      /**
       * creates a CoverageMap object
       * @param {Object} obj optional - an argument with the same semantics
       *  as the one passed to the CoverageMap constructor.
       * @returns {CoverageMap}
       */
      createCoverageMap(obj) {
        if (obj && obj instanceof CoverageMap) {
          return obj;
        }
        return new CoverageMap(obj);
      },
      /**
       * creates a FileCoverage object
       * @param {Object} obj optional - an argument with the same semantics
       *  as the one passed to the FileCoverage constructor.
       * @returns {FileCoverage}
       */
      createFileCoverage(obj) {
        if (obj && obj instanceof FileCoverage) {
          return obj;
        }
        return new FileCoverage(obj);
      }
    };
    module.exports.classes = {
      /**
       * the file coverage constructor
       */
      FileCoverage
    };
  }
});

// src/GithubReporter.ts
import { endGroup, startGroup, error as actionsError } from "@actions/core";

// src/coverage/GithubIstanbulCoverageProviderModule.ts
var import_istanbul_lib_coverage = __toESM(require_istanbul_lib_coverage(), 1);
import libSourceMaps from "istanbul-lib-source-maps";
import libReport3 from "istanbul-lib-report";
import reports from "istanbul-reports";

// src/coverage/GithubIstanbulCoverageReporter.ts
import libReport from "istanbul-lib-report";
var GithubIstanbulCoverageReporter = class extends libReport.ReportBase {
  octokit;
  github;
  constructor(options) {
    super();
    this.octokit = options.octokit;
    this.github = options.github;
  }
  //
  // onStart(root: any, context: Context) {
  // 	this.contentWriter = context.writer.writeFile(this.file);
  // 	this.contentWriter.write('{');
  // }
  //
  // onDetail(node: any) {
  // 	const fc = node.getFileCoverage();
  // 	const key = fc.path;
  // 	const cw = this.contentWriter;
  //
  // 	if (this.first) {
  // 		this.first = false;
  // 	} else {
  // 		cw.write(',');
  // 	}
  //
  // 	cw.write(JSON.stringify(key));
  // 	cw.write(': ');
  // 	cw.write(JSON.stringify(fc));
  // 	cw.println('');
  // }
  //
  // onEnd() {
  // 	const cw = this.contentWriter;
  // 	cw.println('}');
  // 	cw.close();
  // }
};
var GithubIstanbulCoverageReporter_default = GithubIstanbulCoverageReporter;

// src/coverage/GithubSummaryIstanbulCoverageReporter.ts
import libReport2 from "istanbul-lib-report";

// src/coverage/helper.ts
var statuses = {
  red: "\u{1F534}",
  green: "\u{1F7E2}",
  blue: "\u{1F535}"
};
var getStatus = (attribute) => {
  let status = statuses.red;
  if (attribute.pct >= 50 && attribute.pct < 80) {
    status = statuses.blue;
  } else if (attribute.pct >= 80) {
    status = statuses.green;
  }
  return `<td align="center">${status}</td>`;
};
var getAttributeRow = (attribute) => `<td align="center">${attribute.pct}% (${attribute.covered} / ${attribute.total})</td>
`;

// src/coverage/GithubSummaryIstanbulCoverageReporter.ts
var htmlTableStart = `
<h2>Coverage Summary</h2>
<table>
  <thead>
    <tr>
     <th align="center">Status</th>
     <th align="center">Lines</th>
     <th align="center">Statements</th>
     <th align="center">Functions</th>
     <th align="center">Branches</th>
    </tr>
  </thead>
  <tbody>
`;
var htmlFilesTableStart = `
<h2>Coverage Summary for all files</h2>
<table>
  <thead>
    <tr>
     <th align="center">File</th>
     <th align="center">Lines</th>
     <th align="center">Statements</th>
     <th align="center">Functions</th>
     <th align="center">Branches</th>
    </tr>
  </thead>
  <tbody>
`;
var htmlTableEnd = `
  </tbody>
</table>
`;
var GithubSummaryIstanbulCoverageReporter = class extends libReport2.ReportBase {
  octokit;
  github;
  report;
  filesReport;
  constructor(options) {
    super();
    this.octokit = options.octokit;
    this.github = options.github;
    this.report = "";
    this.filesReport = "";
  }
  onStart() {
    this.report += htmlTableStart;
    this.filesReport += htmlFilesTableStart;
  }
  writeSummary(sc) {
    this.report += "<tr>\n";
    this.report += getStatus(sc.lines);
    this.report += getAttributeRow(sc.lines);
    this.report += getAttributeRow(sc.statements);
    this.report += getAttributeRow(sc.functions);
    this.report += getAttributeRow(sc.branches);
    this.report += "</tr>\n";
  }
  writeFileSummary(filePath, sc) {
    this.filesReport += "<tr>\n";
    this.filesReport += `<td alight="center">${filePath}</td>`;
    this.filesReport += getAttributeRow(sc.lines);
    this.filesReport += getAttributeRow(sc.statements);
    this.filesReport += getAttributeRow(sc.functions);
    this.filesReport += getAttributeRow(sc.branches);
    this.filesReport += "</tr>\n";
  }
  onSummary(node) {
    if (!node.isRoot()) {
      return;
    }
    this.writeSummary(node.getCoverageSummary(false));
  }
  onDetail(node) {
    this.writeFileSummary(
      node.getFileCoverage().path,
      node.getCoverageSummary(false)
    );
  }
  async onEnd() {
    this.report += htmlTableEnd;
    this.filesReport += htmlTableEnd;
    const prNumber = this.github.context.payload.pull_request?.number;
    if (prNumber) {
      await this.octokit.rest.issues.createComment({
        owner: this.github.context.repo.owner,
        repo: this.github.context.repo.repo,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        issue_number: prNumber,
        body: this.report
      });
      await this.octokit.rest.issues.createComment({
        owner: this.github.context.repo.owner,
        repo: this.github.context.repo.repo,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        issue_number: prNumber,
        body: this.filesReport
      });
    }
  }
};
var GithubSummaryIstanbulCoverageReporter_default = GithubSummaryIstanbulCoverageReporter;

// src/coverage/GithubIstanbulCoverageProviderModule.ts
import { existsSync, promises as fs } from "node:fs";

// node_modules/pathe/dist/shared/pathe.92c04245.mjs
function normalizeWindowsPath(input = "") {
  if (!input || !input.includes("\\")) {
    return input;
  }
  return input.replace(/\\/g, "/");
}
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
function cwd() {
  if (typeof process !== "undefined") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
var resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path2 = index >= 0 ? arguments_[index] : cwd();
    if (!path2 || path2.length === 0) {
      continue;
    }
    resolvedPath = `${path2}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path2);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path2, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path2.length; ++index) {
    if (index < path2.length) {
      char = path2[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1)
        ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path2.slice(lastSlash + 1, index)}`;
        } else {
          res = path2.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
var isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
var relative = function(from, to) {
  const _from = resolve(from).split("/");
  const _to = resolve(to).split("/");
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};

// src/coverage/GithubIstanbulCoverageProviderModule.ts
import {
  coverageConfigDefaults,
  defaultExclude,
  defaultInclude
} from "vitest/config";
import { BaseCoverageProvider } from "vitest/coverage";
import { createInstrumenter } from "istanbul-lib-instrument";
import _TestExclude from "test-exclude";
import github from "@actions/github";
var githubIstanbulCoverageProviderModule = {
  getProvider() {
    return new GithubIstanbulCoverageProvider();
  }
  // Implements rest of the CoverageProviderModule ...
};
var coverageStorageKey = "__VITEST_COVERAGE__";
var GithubIstanbulCoverageProvider = class extends BaseCoverageProvider {
  name = "github-istanbul";
  ctx;
  options;
  instrumenter;
  testExclude;
  initialize(ctx) {
    const config = ctx.config.coverage;
    this.ctx = ctx;
    this.options = {
      ...coverageConfigDefaults,
      // User's options
      ...config,
      // Resolved fields
      provider: "istanbul",
      reportsDirectory: resolve(
        ctx.config.root,
        config.reportsDirectory ?? coverageConfigDefaults.reportsDirectory
      ),
      reporter: this.resolveReporters(
        config.reporter ?? coverageConfigDefaults.reporter
      )
    };
    this.instrumenter = createInstrumenter({
      produceSourceMap: true,
      autoWrap: false,
      esModules: true,
      compact: false,
      coverageVariable: coverageStorageKey,
      // @ts-expect-error missing type
      coverageGlobalScope: "globalThis",
      coverageGlobalScopeFunc: false,
      ignoreClassMethods: this.options.ignoreClassMethods
    });
    this.testExclude = new _TestExclude({
      cwd: ctx.config.root,
      include: typeof this.options.include === "undefined" ? void 0 : [...this.options.include],
      exclude: [...defaultExclude, ...defaultInclude, ...this.options.exclude],
      excludeNodeModules: true,
      extension: this.options.extension
    });
  }
  resolveOptions() {
    return this.options;
  }
  onFileTransform(sourceCode, id, pluginCtx) {
    if (!this.testExclude.shouldInstrument(id)) {
      return;
    }
    const sourceMap = pluginCtx.getCombinedSourcemap();
    if (!sourceMap) {
      return;
    }
    sourceMap.sources = sourceMap.sources.map(removeQueryParameters);
    const code = this.instrumenter.instrumentSync(sourceCode, id, sourceMap);
    const map = this.instrumenter.lastSourceMap();
    return { code, map };
  }
  onAfterSuiteRun({ coverage }) {
    this.coverages.push(coverage);
  }
  async clean(clean = true) {
    if (clean && existsSync(this.options.reportsDirectory)) {
      await fs.rm(this.options.reportsDirectory, {
        recursive: true,
        force: true,
        maxRetries: 10
      });
    }
    this.coverages = [];
  }
  async reportCoverage({ allTestsRun } = {}) {
    const mergedCoverage = this.coverages.reduce(
      (coverage, previousCoverageMap) => {
        const map = import_istanbul_lib_coverage.default.createCoverageMap(coverage);
        map.merge(previousCoverageMap);
        return map;
      },
      import_istanbul_lib_coverage.default.createCoverageMap({})
    );
    if (this.options.all && allTestsRun) {
      await this.includeUntestedFiles(mergedCoverage);
    }
    includeImplicitElseBranches(mergedCoverage);
    const sourceMapStore = libSourceMaps.createSourceMapStore();
    const coverageMap = await sourceMapStore.transformCoverage(
      mergedCoverage
    );
    const context = libReport3.createContext({
      dir: this.options.reportsDirectory,
      coverageMap,
      sourceFinder: sourceMapStore.sourceFinder,
      watermarks: this.options.watermarks
    });
    for (const reporter of this.options.reporter) {
      if (["github", "github-summary"].includes(reporter[0])) {
        const octokit = github.getOctokit(process.env?.GITHUB_TOKEN ?? "");
        if (reporter[0] === "github") {
          new GithubIstanbulCoverageReporter_default({
            github,
            octokit,
            ...reporter[1]
          }).execute(context);
          continue;
        }
        if (reporter[0] === "github-summary") {
          new GithubSummaryIstanbulCoverageReporter_default({
            github,
            octokit,
            ...reporter[1]
          }).execute(context);
          continue;
        }
      }
      reports.create(reporter[0], {
        skipFull: this.options.skipFull,
        projectRoot: this.ctx.config.root,
        ...reporter[1]
      }).execute(context);
    }
    if (this.options.branches ?? this.options.functions ?? this.options.lines ?? this.options.statements) {
      this.checkThresholds(coverageMap, {
        branches: this.options.branches,
        functions: this.options.functions,
        lines: this.options.lines,
        statements: this.options.statements
      });
    }
    if (this.options.thresholdAutoUpdate && allTestsRun) {
      this.updateThresholds({
        coverageMap,
        thresholds: {
          branches: this.options.branches,
          functions: this.options.functions,
          lines: this.options.lines,
          statements: this.options.statements
        },
        perFile: this.options.perFile,
        configurationFile: this.ctx.server.config.configFile
      });
    }
  }
  checkThresholds(coverageMap, thresholds) {
    const summaries = this.options.perFile ? coverageMap.files().map((file) => ({
      file,
      summary: coverageMap.fileCoverageFor(file).toSummary()
    })) : [
      {
        file: null,
        summary: coverageMap.getCoverageSummary()
      }
    ];
    for (const { summary, file } of summaries) {
      for (const thresholdKey of [
        "lines",
        "functions",
        "statements",
        "branches"
      ]) {
        const threshold = thresholds[thresholdKey];
        if (!threshold) {
          continue;
        }
        const coverage = summary.data[thresholdKey].pct;
        if (coverage < threshold) {
          process.exitCode = 1;
          let errorMessage = `ERROR: Coverage for ${thresholdKey} (${coverage}%) does not meet`;
          if (!this.options.perFile) {
            errorMessage += " global";
          }
          errorMessage += ` threshold (${threshold}%)`;
          if (this.options.perFile && file) {
            errorMessage += ` for ${relative("./", file).replace(/\\/g, "/")}`;
          }
          console.error(errorMessage);
        }
      }
    }
  }
  async includeUntestedFiles(coverageMap) {
    const includedFiles = await this.testExclude.glob(this.ctx.config.root);
    const uncoveredFiles = includedFiles.map((file) => resolve(this.ctx.config.root, file)).filter((file) => !coverageMap.data[file]);
    const transformResults = await Promise.all(
      uncoveredFiles.map(async (filename) => {
        const transformResult = await this.ctx.vitenode.transformRequest(
          filename
        );
        return { transformResult, filename };
      })
    );
    for (const { transformResult, filename } of transformResults) {
      const sourceMap = transformResult?.map;
      const code = transformResult?.code;
      if (sourceMap && code) {
        this.instrumenter.instrumentSync(code, filename, sourceMap);
        const lastCoverage = this.instrumenter.lastFileCoverage();
        if (lastCoverage) {
          coverageMap.addFileCoverage(lastCoverage);
        }
      }
    }
  }
};
function removeQueryParameters(filename) {
  return filename.split("?")[0];
}
function isEmptyCoverageRange(range) {
  return range.start === void 0 || range.start.line === void 0 || range.start.column === void 0 || range.end === void 0 || range.end.line === void 0 || range.end.column === void 0;
}
function includeImplicitElseBranches(coverageMap) {
  for (const file of coverageMap.files()) {
    const fileCoverage = coverageMap.fileCoverageFor(file);
    for (const branchMap of Object.values(fileCoverage.branchMap)) {
      if (branchMap.type !== "if") {
        continue;
      }
      const lastIndex = branchMap.locations.length - 1;
      if (lastIndex > 0) {
        const elseLocation = branchMap.locations[lastIndex];
        if (elseLocation && isEmptyCoverageRange(elseLocation)) {
          const ifLocation = branchMap.locations[0];
          elseLocation.start = { ...ifLocation.start };
          elseLocation.end = { ...ifLocation.end };
        }
      }
    }
  }
}
var GithubIstanbulCoverageProviderModule_default = githubIstanbulCoverageProviderModule;

// src/github-istanbul-coverage-provider.ts
var github_istanbul_coverage_provider_default = GithubIstanbulCoverageProviderModule_default;
export {
  github_istanbul_coverage_provider_default as default
};
