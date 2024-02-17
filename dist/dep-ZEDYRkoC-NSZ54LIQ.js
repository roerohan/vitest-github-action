import {
  lib
} from "./chunk-LGJLTCGJ.js";
import {
  getDefaultExportFromCjs
} from "./chunk-6MUWZ5DY.js";
import "./chunk-A6TDBKPY.js";
import "./chunk-UPBZT3NW.js";

// node_modules/vite/dist/node/chunks/dep-ZEDYRkoC.js
import require$$0 from "path";
import require$$0__default from "fs";
import { fileURLToPath as __cjs_fileURLToPath } from "node:url";
import { dirname as __cjs_dirname } from "node:path";
import { createRequire as __cjs_createRequire } from "node:module";
var __filename = __cjs_fileURLToPath(import.meta.url);
var __dirname = __cjs_dirname(__filename);
var require2 = __cjs_createRequire(import.meta.url);
var __require = require2;
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    var e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (var k in e) {
        if (k !== "default" && !(k in n)) {
          n[k] = e[k];
        }
      }
    }
  }
  return n;
}
var formatImportPrelude$2 = function formatImportPrelude(layer, media, supports) {
  const parts = [];
  if (typeof layer !== "undefined") {
    let layerParams = "layer";
    if (layer) {
      layerParams = `layer(${layer})`;
    }
    parts.push(layerParams);
  }
  if (typeof supports !== "undefined") {
    parts.push(`supports(${supports})`);
  }
  if (typeof media !== "undefined") {
    parts.push(media);
  }
  return parts.join(" ");
};
var formatImportPrelude$1 = formatImportPrelude$2;
var base64EncodedImport = function base64EncodedConditionalImport(prelude, conditions) {
  conditions.reverse();
  const first = conditions.pop();
  let params = `${prelude} ${formatImportPrelude$1(
    first.layer,
    first.media,
    first.supports
  )}`;
  for (const condition of conditions) {
    params = `'data:text/css;base64,${Buffer.from(`@import ${params}`).toString(
      "base64"
    )}' ${formatImportPrelude$1(
      condition.layer,
      condition.media,
      condition.supports
    )}`;
  }
  return params;
};
var base64EncodedConditionalImport2 = base64EncodedImport;
var applyConditions$1 = function applyConditions(bundle, atRule) {
  bundle.forEach((stmt) => {
    if (stmt.type === "charset" || stmt.type === "warning" || !stmt.conditions?.length) {
      return;
    }
    if (stmt.type === "import") {
      stmt.node.params = base64EncodedConditionalImport2(
        stmt.fullUri,
        stmt.conditions
      );
      return;
    }
    const { nodes } = stmt;
    const { parent } = nodes[0];
    const atRules = [];
    for (const condition of stmt.conditions) {
      if (typeof condition.media !== "undefined") {
        const mediaNode = atRule({
          name: "media",
          params: condition.media,
          source: parent.source
        });
        atRules.push(mediaNode);
      }
      if (typeof condition.supports !== "undefined") {
        const supportsNode = atRule({
          name: "supports",
          params: `(${condition.supports})`,
          source: parent.source
        });
        atRules.push(supportsNode);
      }
      if (typeof condition.layer !== "undefined") {
        const layerNode = atRule({
          name: "layer",
          params: condition.layer,
          source: parent.source
        });
        atRules.push(layerNode);
      }
    }
    const outerAtRule = atRules.shift();
    const innerAtRule = atRules.reduce((previous, next) => {
      previous.append(next);
      return next;
    }, outerAtRule);
    parent.insertBefore(nodes[0], outerAtRule);
    nodes.forEach((node) => {
      node.parent = void 0;
    });
    nodes[0].raws.before = nodes[0].raws.before || "\n";
    innerAtRule.append(nodes);
    stmt.type = "nodes";
    stmt.nodes = [outerAtRule];
    delete stmt.node;
  });
};
var applyRaws$1 = function applyRaws(bundle) {
  bundle.forEach((stmt, index2) => {
    if (index2 === 0)
      return;
    if (stmt.parent) {
      const { before } = stmt.parent.node.raws;
      if (stmt.type === "nodes")
        stmt.nodes[0].raws.before = before;
      else
        stmt.node.raws.before = before;
    } else if (stmt.type === "nodes") {
      stmt.nodes[0].raws.before = stmt.nodes[0].raws.before || "\n";
    }
  });
};
var applyStyles$1 = function applyStyles(bundle, styles) {
  styles.nodes = [];
  bundle.forEach((stmt) => {
    if (["charset", "import"].includes(stmt.type)) {
      stmt.node.parent = void 0;
      styles.append(stmt.node);
    } else if (stmt.type === "nodes") {
      stmt.nodes.forEach((node) => {
        node.parent = void 0;
        styles.append(node);
      });
    }
  });
};
var readCache$1 = { exports: {} };
var pify$2 = { exports: {} };
var processFn = function(fn, P, opts) {
  return function() {
    var that = this;
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    return new P(function(resolve2, reject) {
      args.push(function(err, result) {
        if (err) {
          reject(err);
        } else if (opts.multiArgs) {
          var results = new Array(arguments.length - 1);
          for (var i2 = 1; i2 < arguments.length; i2++) {
            results[i2 - 1] = arguments[i2];
          }
          resolve2(results);
        } else {
          resolve2(result);
        }
      });
      fn.apply(that, args);
    });
  };
};
var pify$1 = pify$2.exports = function(obj, P, opts) {
  if (typeof P !== "function") {
    opts = P;
    P = Promise;
  }
  opts = opts || {};
  opts.exclude = opts.exclude || [/.+Sync$/];
  var filter = function(key) {
    var match = function(pattern) {
      return typeof pattern === "string" ? key === pattern : pattern.test(key);
    };
    return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
  };
  var ret = typeof obj === "function" ? function() {
    if (opts.excludeMain) {
      return obj.apply(this, arguments);
    }
    return processFn(obj, P, opts).apply(this, arguments);
  } : {};
  return Object.keys(obj).reduce(function(ret2, key) {
    var x = obj[key];
    ret2[key] = typeof x === "function" && filter(key) ? processFn(x, P, opts) : x;
    return ret2;
  }, ret);
};
pify$1.all = pify$1;
var pifyExports = pify$2.exports;
var fs = require$$0__default;
var path$3 = require$$0;
var pify = pifyExports;
var stat = pify(fs.stat);
var readFile = pify(fs.readFile);
var resolve = path$3.resolve;
var cache = /* @__PURE__ */ Object.create(null);
function convert(content, encoding) {
  if (Buffer.isEncoding(encoding)) {
    return content.toString(encoding);
  }
  return content;
}
readCache$1.exports = function(path2, encoding) {
  path2 = resolve(path2);
  return stat(path2).then(function(stats) {
    var item = cache[path2];
    if (item && item.mtime.getTime() === stats.mtime.getTime()) {
      return convert(item.content, encoding);
    }
    return readFile(path2).then(function(data) {
      cache[path2] = {
        mtime: stats.mtime,
        content: data
      };
      return convert(data, encoding);
    });
  }).catch(function(err) {
    cache[path2] = null;
    return Promise.reject(err);
  });
};
readCache$1.exports.sync = function(path2, encoding) {
  path2 = resolve(path2);
  try {
    var stats = fs.statSync(path2);
    var item = cache[path2];
    if (item && item.mtime.getTime() === stats.mtime.getTime()) {
      return convert(item.content, encoding);
    }
    var data = fs.readFileSync(path2);
    cache[path2] = {
      mtime: stats.mtime,
      content: data
    };
    return convert(data, encoding);
  } catch (err) {
    cache[path2] = null;
    throw err;
  }
};
readCache$1.exports.get = function(path2, encoding) {
  path2 = resolve(path2);
  if (cache[path2]) {
    return convert(cache[path2].content, encoding);
  }
  return null;
};
readCache$1.exports.clear = function() {
  cache = /* @__PURE__ */ Object.create(null);
};
var readCacheExports = readCache$1.exports;
var anyDataURLRegexp = /^data:text\/css(?:;(base64|plain))?,/i;
var base64DataURLRegexp = /^data:text\/css;base64,/i;
var plainDataURLRegexp = /^data:text\/css;plain,/i;
function isValid(url) {
  return anyDataURLRegexp.test(url);
}
function contents(url) {
  if (base64DataURLRegexp.test(url)) {
    return Buffer.from(url.slice(21), "base64").toString();
  }
  if (plainDataURLRegexp.test(url)) {
    return decodeURIComponent(url.slice(20));
  }
  return decodeURIComponent(url.slice(14));
}
var dataUrl = {
  isValid,
  contents
};
var readCache = readCacheExports;
var dataURL$1 = dataUrl;
var loadContent$1 = function loadContent(filename) {
  if (dataURL$1.isValid(filename)) {
    return dataURL$1.contents(filename);
  }
  return readCache(filename, "utf-8");
};
var valueParser = lib;
var { stringify } = valueParser;
function split(params, start) {
  const list = [];
  const last = params.reduce((item, node, index2) => {
    if (index2 < start)
      return "";
    if (node.type === "div" && node.value === ",") {
      list.push(item);
      return "";
    }
    return item + stringify(node);
  }, "");
  list.push(last);
  return list;
}
var parseStatements$1 = function parseStatements(result, styles, conditions, from) {
  const statements = [];
  let nodes = [];
  styles.each((node) => {
    let stmt;
    if (node.type === "atrule") {
      if (node.name === "import")
        stmt = parseImport(result, node, conditions, from);
      else if (node.name === "charset")
        stmt = parseCharset(result, node, conditions, from);
    }
    if (stmt) {
      if (nodes.length) {
        statements.push({
          type: "nodes",
          nodes,
          conditions: [...conditions],
          from
        });
        nodes = [];
      }
      statements.push(stmt);
    } else
      nodes.push(node);
  });
  if (nodes.length) {
    statements.push({
      type: "nodes",
      nodes,
      conditions: [...conditions],
      from
    });
  }
  return statements;
};
function parseCharset(result, atRule, conditions, from) {
  if (atRule.prev()) {
    return result.warn("@charset must precede all other statements", {
      node: atRule
    });
  }
  return {
    type: "charset",
    node: atRule,
    conditions: [...conditions],
    from
  };
}
function parseImport(result, atRule, conditions, from) {
  let prev = atRule.prev();
  if (prev) {
    do {
      if (prev.type === "comment" || prev.type === "atrule" && prev.name === "import") {
        prev = prev.prev();
        continue;
      }
      break;
    } while (prev);
  }
  if (prev) {
    do {
      if (prev.type === "comment" || prev.type === "atrule" && (prev.name === "charset" || prev.name === "layer" && !prev.nodes)) {
        prev = prev.prev();
        continue;
      }
      return result.warn(
        "@import must precede all other statements (besides @charset or empty @layer)",
        { node: atRule }
      );
    } while (prev);
  }
  if (atRule.nodes) {
    return result.warn(
      "It looks like you didn't end your @import statement correctly. Child nodes are attached to it.",
      { node: atRule }
    );
  }
  const params = valueParser(atRule.params).nodes;
  const stmt = {
    type: "import",
    uri: "",
    fullUri: "",
    node: atRule,
    conditions: [...conditions],
    from
  };
  let layer;
  let media;
  let supports;
  for (let i = 0; i < params.length; i++) {
    const node = params[i];
    if (node.type === "space" || node.type === "comment")
      continue;
    if (node.type === "string") {
      if (stmt.uri) {
        return result.warn(`Multiple url's in '${atRule.toString()}'`, {
          node: atRule
        });
      }
      if (!node.value) {
        return result.warn(`Unable to find uri in '${atRule.toString()}'`, {
          node: atRule
        });
      }
      stmt.uri = node.value;
      stmt.fullUri = stringify(node);
      continue;
    }
    if (node.type === "function" && /^url$/i.test(node.value)) {
      if (stmt.uri) {
        return result.warn(`Multiple url's in '${atRule.toString()}'`, {
          node: atRule
        });
      }
      if (!node.nodes?.[0]?.value) {
        return result.warn(`Unable to find uri in '${atRule.toString()}'`, {
          node: atRule
        });
      }
      stmt.uri = node.nodes[0].value;
      stmt.fullUri = stringify(node);
      continue;
    }
    if (!stmt.uri) {
      return result.warn(`Unable to find uri in '${atRule.toString()}'`, {
        node: atRule
      });
    }
    if ((node.type === "word" || node.type === "function") && /^layer$/i.test(node.value)) {
      if (typeof layer !== "undefined") {
        return result.warn(`Multiple layers in '${atRule.toString()}'`, {
          node: atRule
        });
      }
      if (typeof supports !== "undefined") {
        return result.warn(
          `layers must be defined before support conditions in '${atRule.toString()}'`,
          {
            node: atRule
          }
        );
      }
      if (node.nodes) {
        layer = stringify(node.nodes);
      } else {
        layer = "";
      }
      continue;
    }
    if (node.type === "function" && /^supports$/i.test(node.value)) {
      if (typeof supports !== "undefined") {
        return result.warn(
          `Multiple support conditions in '${atRule.toString()}'`,
          {
            node: atRule
          }
        );
      }
      supports = stringify(node.nodes);
      continue;
    }
    media = split(params, i);
    break;
  }
  if (!stmt.uri) {
    return result.warn(`Unable to find uri in '${atRule.toString()}'`, {
      node: atRule
    });
  }
  if (typeof media !== "undefined" || typeof layer !== "undefined" || typeof supports !== "undefined") {
    stmt.conditions.push({
      layer,
      media,
      supports
    });
  }
  return stmt;
}
var path$2 = require$$0;
var sugarss;
var processContent$1 = function processContent(result, content, filename, options, postcss) {
  const { plugins } = options;
  const ext = path$2.extname(filename);
  const parserList = [];
  if (ext === ".sss") {
    if (!sugarss) {
      try {
        sugarss = __require("sugarss");
      } catch {
      }
    }
    if (sugarss)
      return runPostcss(postcss, content, filename, plugins, [sugarss]);
  }
  if (result.opts.syntax?.parse) {
    parserList.push(result.opts.syntax.parse);
  }
  if (result.opts.parser)
    parserList.push(result.opts.parser);
  parserList.push(null);
  return runPostcss(postcss, content, filename, plugins, parserList);
};
function runPostcss(postcss, content, filename, plugins, parsers, index2) {
  if (!index2)
    index2 = 0;
  return postcss(plugins).process(content, {
    from: filename,
    parser: parsers[index2]
  }).catch((err) => {
    index2++;
    if (index2 === parsers.length)
      throw err;
    return runPostcss(postcss, content, filename, plugins, parsers, index2);
  });
}
var path$1 = require$$0;
var dataURL = dataUrl;
var parseStatements2 = parseStatements$1;
var processContent2 = processContent$1;
var resolveId$1 = (id) => id;
var formatImportPrelude2 = formatImportPrelude$2;
async function parseStyles$1(result, styles, options, state, conditions, from, postcss) {
  const statements = parseStatements2(result, styles, conditions, from);
  for (const stmt of statements) {
    if (stmt.type !== "import" || !isProcessableURL(stmt.uri)) {
      continue;
    }
    if (options.filter && !options.filter(stmt.uri)) {
      continue;
    }
    await resolveImportId(result, stmt, options, state, postcss);
  }
  let charset;
  const imports = [];
  const bundle = [];
  function handleCharset(stmt) {
    if (!charset)
      charset = stmt;
    else if (stmt.node.params.toLowerCase() !== charset.node.params.toLowerCase()) {
      throw stmt.node.error(
        `Incompatible @charset statements:
  ${stmt.node.params} specified in ${stmt.node.source.input.file}
  ${charset.node.params} specified in ${charset.node.source.input.file}`
      );
    }
  }
  statements.forEach((stmt) => {
    if (stmt.type === "charset")
      handleCharset(stmt);
    else if (stmt.type === "import") {
      if (stmt.children) {
        stmt.children.forEach((child, index2) => {
          if (child.type === "import")
            imports.push(child);
          else if (child.type === "charset")
            handleCharset(child);
          else
            bundle.push(child);
          if (index2 === 0)
            child.parent = stmt;
        });
      } else
        imports.push(stmt);
    } else if (stmt.type === "nodes") {
      bundle.push(stmt);
    }
  });
  return charset ? [charset, ...imports.concat(bundle)] : imports.concat(bundle);
}
async function resolveImportId(result, stmt, options, state, postcss) {
  if (dataURL.isValid(stmt.uri)) {
    stmt.children = await loadImportContent(
      result,
      stmt,
      stmt.uri,
      options,
      state,
      postcss
    );
    return;
  } else if (dataURL.isValid(stmt.from.slice(-1))) {
    throw stmt.node.error(
      `Unable to import '${stmt.uri}' from a stylesheet that is embedded in a data url`
    );
  }
  const atRule = stmt.node;
  let sourceFile;
  if (atRule.source?.input?.file) {
    sourceFile = atRule.source.input.file;
  }
  const base = sourceFile ? path$1.dirname(atRule.source.input.file) : options.root;
  const paths = [await options.resolve(stmt.uri, base, options, atRule)].flat();
  const resolved = await Promise.all(
    paths.map((file) => {
      return !path$1.isAbsolute(file) ? resolveId$1(file) : file;
    })
  );
  resolved.forEach((file) => {
    result.messages.push({
      type: "dependency",
      plugin: "postcss-import",
      file,
      parent: sourceFile
    });
  });
  const importedContent = await Promise.all(
    resolved.map((file) => {
      return loadImportContent(result, stmt, file, options, state, postcss);
    })
  );
  stmt.children = importedContent.flat().filter((x) => !!x);
}
async function loadImportContent(result, stmt, filename, options, state, postcss) {
  const atRule = stmt.node;
  const { conditions, from } = stmt;
  const stmtDuplicateCheckKey = conditions.map(
    (condition) => formatImportPrelude2(condition.layer, condition.media, condition.supports)
  ).join(":");
  if (options.skipDuplicates) {
    if (state.importedFiles[filename]?.[stmtDuplicateCheckKey]) {
      return;
    }
    if (!state.importedFiles[filename]) {
      state.importedFiles[filename] = {};
    }
    state.importedFiles[filename][stmtDuplicateCheckKey] = true;
  }
  if (from.includes(filename)) {
    return;
  }
  const content = await options.load(filename, options);
  if (content.trim() === "" && options.warnOnEmpty) {
    result.warn(`${filename} is empty`, { node: atRule });
    return;
  }
  if (options.skipDuplicates && state.hashFiles[content]?.[stmtDuplicateCheckKey]) {
    return;
  }
  const importedResult = await processContent2(
    result,
    content,
    filename,
    options,
    postcss
  );
  const styles = importedResult.root;
  result.messages = result.messages.concat(importedResult.messages);
  if (options.skipDuplicates) {
    const hasImport = styles.some((child) => {
      return child.type === "atrule" && child.name === "import";
    });
    if (!hasImport) {
      if (!state.hashFiles[content]) {
        state.hashFiles[content] = {};
      }
      state.hashFiles[content][stmtDuplicateCheckKey] = true;
    }
  }
  return parseStyles$1(
    result,
    styles,
    options,
    state,
    conditions,
    [...from, filename],
    postcss
  );
}
function isProcessableURL(uri) {
  if (/^(?:[a-z]+:)?\/\//i.test(uri)) {
    return false;
  }
  try {
    const url = new URL(uri, "https://example.com");
    if (url.hash) {
      return false;
    }
    if (url.search) {
      return false;
    }
  } catch {
  }
  return true;
}
var parseStyles_1 = parseStyles$1;
var path = require$$0;
var applyConditions2 = applyConditions$1;
var applyRaws2 = applyRaws$1;
var applyStyles2 = applyStyles$1;
var loadContent2 = loadContent$1;
var parseStyles = parseStyles_1;
var resolveId = (id) => id;
function AtImport(options) {
  options = {
    root: process.cwd(),
    path: [],
    skipDuplicates: true,
    resolve: resolveId,
    load: loadContent2,
    plugins: [],
    addModulesDirectories: [],
    warnOnEmpty: true,
    ...options
  };
  options.root = path.resolve(options.root);
  if (typeof options.path === "string")
    options.path = [options.path];
  if (!Array.isArray(options.path))
    options.path = [];
  options.path = options.path.map((p) => path.resolve(options.root, p));
  return {
    postcssPlugin: "postcss-import",
    async Once(styles, { result, atRule, postcss }) {
      const state = {
        importedFiles: {},
        hashFiles: {}
      };
      if (styles.source?.input?.file) {
        state.importedFiles[styles.source.input.file] = {};
      }
      if (options.plugins && !Array.isArray(options.plugins)) {
        throw new Error("plugins option must be an array");
      }
      const bundle = await parseStyles(
        result,
        styles,
        options,
        state,
        [],
        [],
        postcss
      );
      applyRaws2(bundle);
      applyConditions2(bundle, atRule);
      applyStyles2(bundle, styles);
    }
  };
}
AtImport.postcss = true;
var postcssImport = AtImport;
var index = /* @__PURE__ */ getDefaultExportFromCjs(postcssImport);
var index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [postcssImport]);
export {
  index$1 as i
};
