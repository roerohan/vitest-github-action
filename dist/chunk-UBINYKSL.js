import {
  ANNOTATION_KEY,
  ArrowFunctionExpression,
  BlockStatement,
  CallExpression,
  CatchClause,
  ExpressionStatement,
  FIXED_STRINGS,
  INVALID_ANNOTATION_KEY,
  Identifier,
  LOGLEVEL_DEBUG,
  LOGLEVEL_ERROR,
  LOGLEVEL_INFO,
  LOGLEVEL_WARN,
  Literal,
  Program,
  Property,
  ReturnStatement,
  TemplateLiteral,
  URL_OUTPUT_AMD_BASEPATH,
  URL_OUTPUT_AMD_ID,
  URL_OUTPUT_DIR,
  URL_OUTPUT_EXTERNALIMPORTATTRIBUTES,
  URL_OUTPUT_FORMAT,
  URL_OUTPUT_GENERATEDCODE,
  URL_OUTPUT_INLINEDYNAMICIMPORTS,
  URL_OUTPUT_INTEROP,
  URL_OUTPUT_MANUALCHUNKS,
  URL_OUTPUT_SOURCEMAPBASEURL,
  URL_OUTPUT_SOURCEMAPFILE,
  URL_PRESERVEENTRYSIGNATURES,
  URL_TREESHAKE,
  URL_TREESHAKE_MODULESIDEEFFECTS,
  URL_WATCH,
  addTrailingSlashIfMissed,
  augmentCodeLocation,
  convertAnnotations,
  convertNode,
  convertString,
  error,
  getAliasName,
  getImportPath,
  getReadStringFunction,
  getRollupEror,
  isAbsolute,
  isPathFragment,
  isRelative,
  isValidUrl,
  locate,
  logAddonNotGenerated,
  logAlreadyClosed,
  logAmbiguousExternalNamespaces,
  logAnonymousPluginCache,
  logAssetNotFinalisedForFileName,
  logAssetReferenceIdNotFoundForSetSource,
  logAssetSourceAlreadySet,
  logBadLoader,
  logCannotAssignModuleToChunk,
  logCannotCallNamespace,
  logCannotEmitFromOptionsHook,
  logChunkInvalid,
  logChunkNotGeneratedForFileName,
  logCircularDependency,
  logCircularReexport,
  logConflictingSourcemapSources,
  logConstVariableReassignError,
  logCyclicCrossChunkReexport,
  logDuplicateArgumentNameError,
  logDuplicateExportError,
  logDuplicatePluginName,
  logEmptyChunk,
  logEntryCannotBeExternal,
  logEval,
  logExternalModulesCannotBeIncludedInManualChunks,
  logExternalModulesCannotBeTransformedToModules,
  logExternalSyntheticExports,
  logFailedValidation,
  logFileNameConflict,
  logFileReferenceIdNotFoundForFilename,
  logFirstSideEffect,
  logIllegalIdentifierAsName,
  logIllegalImportReassignment,
  logImplicitDependantCannotBeExternal,
  logImplicitDependantIsNotIncluded,
  logImportAttributeIsInvalid,
  logImportOptionsAreInvalid,
  logIncompatibleExportOptionValue,
  logInconsistentImportAttributes,
  logInputHookInOutputPlugin,
  logInternalIdCannotBeExternal,
  logInvalidAddonPluginHook,
  logInvalidAnnotation,
  logInvalidExportOptionValue,
  logInvalidFormatForTopLevelAwait,
  logInvalidFunctionPluginHook,
  logInvalidLogPosition,
  logInvalidOption,
  logInvalidRollupPhaseForChunkEmission,
  logInvalidSetAssetSourceCall,
  logInvalidSourcemapForError,
  logLevelPriority,
  logMissingEntryExport,
  logMissingExport,
  logMissingFileOrDirOption,
  logMissingGlobalName,
  logMissingNameOptionForIifeExport,
  logMissingNameOptionForUmdExport,
  logMissingNodeBuiltins,
  logMixedExport,
  logModuleLevelDirective,
  logModuleParseError,
  logNamespaceConflict,
  logNoAssetSourceSet,
  logNoTransformMapOrAstWithoutCode,
  logOptimizeChunkStatus,
  logParseError,
  logPluginError,
  logRedeclarationError,
  logShimmedExport,
  logSourcemapBroken,
  logSyntheticNamedExportsNeedNamespaceExport,
  logThisIsUndefined,
  logUnexpectedNamedImport,
  logUnexpectedNamespaceReexport,
  logUnknownOption,
  logUnresolvedEntry,
  logUnresolvedImplicitDependant,
  logUnresolvedImport,
  logUnresolvedImportTreatedAsExternal,
  logUnusedExternalImports,
  normalize,
  parseAst,
  printQuotedStringList,
  relative,
  relativeId,
  require_native,
  warnDeprecation
} from "./chunk-A6TDBKPY.js";
import {
  __toESM
} from "./chunk-UPBZT3NW.js";

// node_modules/rollup/dist/es/shared/node-entry.js
var import_native = __toESM(require_native(), 1);
import { relative as relative2, dirname, basename, extname, resolve as resolve$1 } from "node:path";
import require$$0$1, { win32, posix, isAbsolute as isAbsolute2, resolve } from "path";
import process$1, { env as env$1 } from "node:process";
import { performance } from "node:perf_hooks";
import { lstat, realpath, readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import * as tty from "tty";
var version = "4.12.0";
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i = 0; i < chars$1.length; i++) {
  const c = chars$1.charCodeAt(i);
  intToChar[i] = c;
  charToInt[c] = i;
}
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
  decode(buf) {
    const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
    return out.toString();
  }
} : {
  decode(buf) {
    let out = "";
    for (let i = 0; i < buf.length; i++) {
      out += String.fromCharCode(buf[i]);
    }
    return out;
  }
};
function decode(mappings) {
  const state = new Int32Array(5);
  const decoded = [];
  let index = 0;
  do {
    const semi = indexOf(mappings, index);
    const line = [];
    let sorted = true;
    let lastCol = 0;
    state[0] = 0;
    for (let i = index; i < semi; i++) {
      let seg;
      i = decodeInteger(mappings, i, state, 0);
      const col = state[0];
      if (col < lastCol)
        sorted = false;
      lastCol = col;
      if (hasMoreVlq(mappings, i, semi)) {
        i = decodeInteger(mappings, i, state, 1);
        i = decodeInteger(mappings, i, state, 2);
        i = decodeInteger(mappings, i, state, 3);
        if (hasMoreVlq(mappings, i, semi)) {
          i = decodeInteger(mappings, i, state, 4);
          seg = [col, state[1], state[2], state[3], state[4]];
        } else {
          seg = [col, state[1], state[2], state[3]];
        }
      } else {
        seg = [col];
      }
      line.push(seg);
    }
    if (!sorted)
      sort(line);
    decoded.push(line);
    index = semi + 1;
  } while (index <= mappings.length);
  return decoded;
}
function indexOf(mappings, index) {
  const idx = mappings.indexOf(";", index);
  return idx === -1 ? mappings.length : idx;
}
function decodeInteger(mappings, pos, state, j) {
  let value = 0;
  let shift = 0;
  let integer = 0;
  do {
    const c = mappings.charCodeAt(pos++);
    integer = charToInt[c];
    value |= (integer & 31) << shift;
    shift += 5;
  } while (integer & 32);
  const shouldNegate = value & 1;
  value >>>= 1;
  if (shouldNegate) {
    value = -2147483648 | -value;
  }
  state[j] += value;
  return pos;
}
function hasMoreVlq(mappings, i, length) {
  if (i >= length)
    return false;
  return mappings.charCodeAt(i) !== comma;
}
function sort(line) {
  line.sort(sortComparator);
}
function sortComparator(a, b) {
  return a[0] - b[0];
}
function encode(decoded) {
  const state = new Int32Array(5);
  const bufLength = 1024 * 16;
  const subLength = bufLength - 36;
  const buf = new Uint8Array(bufLength);
  const sub = buf.subarray(0, subLength);
  let pos = 0;
  let out = "";
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    if (i > 0) {
      if (pos === bufLength) {
        out += td.decode(buf);
        pos = 0;
      }
      buf[pos++] = semicolon;
    }
    if (line.length === 0)
      continue;
    state[0] = 0;
    for (let j = 0; j < line.length; j++) {
      const segment = line[j];
      if (pos > subLength) {
        out += td.decode(sub);
        buf.copyWithin(0, subLength, pos);
        pos -= subLength;
      }
      if (j > 0)
        buf[pos++] = comma;
      pos = encodeInteger(buf, pos, state, segment, 0);
      if (segment.length === 1)
        continue;
      pos = encodeInteger(buf, pos, state, segment, 1);
      pos = encodeInteger(buf, pos, state, segment, 2);
      pos = encodeInteger(buf, pos, state, segment, 3);
      if (segment.length === 4)
        continue;
      pos = encodeInteger(buf, pos, state, segment, 4);
    }
  }
  return out + td.decode(buf.subarray(0, pos));
}
function encodeInteger(buf, pos, state, segment, j) {
  const next = segment[j];
  let num = next - state[j];
  state[j] = next;
  num = num < 0 ? -num << 1 | 1 : num << 1;
  do {
    let clamped = num & 31;
    num >>>= 5;
    if (num > 0)
      clamped |= 32;
    buf[pos++] = intToChar[clamped];
  } while (num > 0);
  return pos;
}
var BitSet = class _BitSet {
  constructor(arg) {
    this.bits = arg instanceof _BitSet ? arg.bits.slice() : [];
  }
  add(n2) {
    this.bits[n2 >> 5] |= 1 << (n2 & 31);
  }
  has(n2) {
    return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
  }
};
var Chunk$1 = class Chunk {
  constructor(start, end, content) {
    this.start = start;
    this.end = end;
    this.original = content;
    this.intro = "";
    this.outro = "";
    this.content = content;
    this.storeName = false;
    this.edited = false;
    {
      this.previous = null;
      this.next = null;
    }
  }
  appendLeft(content) {
    this.outro += content;
  }
  appendRight(content) {
    this.intro = this.intro + content;
  }
  clone() {
    const chunk = new Chunk(this.start, this.end, this.original);
    chunk.intro = this.intro;
    chunk.outro = this.outro;
    chunk.content = this.content;
    chunk.storeName = this.storeName;
    chunk.edited = this.edited;
    return chunk;
  }
  contains(index) {
    return this.start < index && index < this.end;
  }
  eachNext(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.next;
    }
  }
  eachPrevious(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.previous;
    }
  }
  edit(content, storeName, contentOnly) {
    this.content = content;
    if (!contentOnly) {
      this.intro = "";
      this.outro = "";
    }
    this.storeName = storeName;
    this.edited = true;
    return this;
  }
  prependLeft(content) {
    this.outro = content + this.outro;
  }
  prependRight(content) {
    this.intro = content + this.intro;
  }
  reset() {
    this.intro = "";
    this.outro = "";
    if (this.edited) {
      this.content = this.original;
      this.storeName = false;
      this.edited = false;
    }
  }
  split(index) {
    const sliceIndex = index - this.start;
    const originalBefore = this.original.slice(0, sliceIndex);
    const originalAfter = this.original.slice(sliceIndex);
    this.original = originalBefore;
    const newChunk = new Chunk(index, this.end, originalAfter);
    newChunk.outro = this.outro;
    this.outro = "";
    this.end = index;
    if (this.edited) {
      newChunk.edit("", false);
      this.content = "";
    } else {
      this.content = originalBefore;
    }
    newChunk.next = this.next;
    if (newChunk.next)
      newChunk.next.previous = newChunk;
    newChunk.previous = this;
    this.next = newChunk;
    return newChunk;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(rx) {
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length)
      return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        this.split(this.start + trimmed.length).edit("", void 0, true);
        if (this.edited) {
          this.edit(trimmed, this.storeName, true);
        }
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length)
        return true;
    }
  }
  trimStart(rx) {
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length)
      return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        const newChunk = this.split(this.end - trimmed.length);
        if (this.edited) {
          newChunk.edit(trimmed, this.storeName, true);
        }
        this.edit("", void 0, true);
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length)
        return true;
    }
  }
};
function getBtoa() {
  if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
    return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof Buffer === "function") {
    return (str) => Buffer.from(str, "utf-8").toString("base64");
  } else {
    return () => {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
  }
}
var btoa = /* @__PURE__ */ getBtoa();
var SourceMap = class {
  constructor(properties) {
    this.version = 3;
    this.file = properties.file;
    this.sources = properties.sources;
    this.sourcesContent = properties.sourcesContent;
    this.names = properties.names;
    this.mappings = encode(properties.mappings);
    if (typeof properties.x_google_ignoreList !== "undefined") {
      this.x_google_ignoreList = properties.x_google_ignoreList;
    }
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
  }
};
function guessIndent(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  const min = spaced.reduce((previous, current) => {
    const numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
  const fromParts = from.split(/[/\\]/);
  const toParts = to.split(/[/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    let i = fromParts.length;
    while (i--)
      fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
}
var toString = Object.prototype.toString;
function isObject$1(thing) {
  return toString.call(thing) === "[object Object]";
}
function getLocator(source) {
  const originalLines = source.split("\n");
  const lineOffsets = [];
  for (let i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }
  return function locate2(index) {
    let i = 0;
    let j = lineOffsets.length;
    while (i < j) {
      const m = i + j >> 1;
      if (index < lineOffsets[m]) {
        j = m;
      } else {
        i = m + 1;
      }
    }
    const line = i - 1;
    const column = index - lineOffsets[line];
    return { line, column };
  };
}
var wordRegex = /\w/;
var Mappings = class {
  constructor(hires) {
    this.hires = hires;
    this.generatedCodeLine = 0;
    this.generatedCodeColumn = 0;
    this.raw = [];
    this.rawSegments = this.raw[this.generatedCodeLine] = [];
    this.pending = null;
  }
  addEdit(sourceIndex, content, loc, nameIndex) {
    if (content.length) {
      let contentLineEnd = content.indexOf("\n", 0);
      let previousContentLineEnd = -1;
      while (contentLineEnd >= 0) {
        const segment2 = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        if (nameIndex >= 0) {
          segment2.push(nameIndex);
        }
        this.rawSegments.push(segment2);
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        previousContentLineEnd = contentLineEnd;
        contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
      }
      const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
      if (nameIndex >= 0) {
        segment.push(nameIndex);
      }
      this.rawSegments.push(segment);
      this.advance(content.slice(previousContentLineEnd + 1));
    } else if (this.pending) {
      this.rawSegments.push(this.pending);
      this.advance(content);
    }
    this.pending = null;
  }
  addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
    let originalCharIndex = chunk.start;
    let first = true;
    let charInHiresBoundary = false;
    while (originalCharIndex < chunk.end) {
      if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
        const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        if (this.hires === "boundary") {
          if (wordRegex.test(original[originalCharIndex])) {
            if (!charInHiresBoundary) {
              this.rawSegments.push(segment);
              charInHiresBoundary = true;
            }
          } else {
            this.rawSegments.push(segment);
            charInHiresBoundary = false;
          }
        } else {
          this.rawSegments.push(segment);
        }
      }
      if (original[originalCharIndex] === "\n") {
        loc.line += 1;
        loc.column = 0;
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        first = true;
      } else {
        loc.column += 1;
        this.generatedCodeColumn += 1;
        first = false;
      }
      originalCharIndex += 1;
    }
    this.pending = null;
  }
  advance(str) {
    if (!str)
      return;
    const lines = str.split("\n");
    if (lines.length > 1) {
      for (let i = 0; i < lines.length - 1; i++) {
        this.generatedCodeLine++;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
      }
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += lines[lines.length - 1].length;
  }
};
var n = "\n";
var warned = {
  insertLeft: false,
  insertRight: false,
  storeName: false
};
var MagicString = class _MagicString {
  constructor(string, options = {}) {
    const chunk = new Chunk$1(0, string.length, string);
    Object.defineProperties(this, {
      original: { writable: true, value: string },
      outro: { writable: true, value: "" },
      intro: { writable: true, value: "" },
      firstChunk: { writable: true, value: chunk },
      lastChunk: { writable: true, value: chunk },
      lastSearchedChunk: { writable: true, value: chunk },
      byStart: { writable: true, value: {} },
      byEnd: { writable: true, value: {} },
      filename: { writable: true, value: options.filename },
      indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
      sourcemapLocations: { writable: true, value: new BitSet() },
      storedNames: { writable: true, value: {} },
      indentStr: { writable: true, value: void 0 },
      ignoreList: { writable: true, value: options.ignoreList }
    });
    this.byStart[0] = chunk;
    this.byEnd[string.length] = chunk;
  }
  addSourcemapLocation(char) {
    this.sourcemapLocations.add(char);
  }
  append(content) {
    if (typeof content !== "string")
      throw new TypeError("outro content must be a string");
    this.outro += content;
    return this;
  }
  appendLeft(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.appendLeft(content);
    } else {
      this.intro += content;
    }
    return this;
  }
  appendRight(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.appendRight(content);
    } else {
      this.outro += content;
    }
    return this;
  }
  clone() {
    const cloned = new _MagicString(this.original, { filename: this.filename });
    let originalChunk = this.firstChunk;
    let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
    while (originalChunk) {
      cloned.byStart[clonedChunk.start] = clonedChunk;
      cloned.byEnd[clonedChunk.end] = clonedChunk;
      const nextOriginalChunk = originalChunk.next;
      const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
      if (nextClonedChunk) {
        clonedChunk.next = nextClonedChunk;
        nextClonedChunk.previous = clonedChunk;
        clonedChunk = nextClonedChunk;
      }
      originalChunk = nextOriginalChunk;
    }
    cloned.lastChunk = clonedChunk;
    if (this.indentExclusionRanges) {
      cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
    }
    cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
    cloned.intro = this.intro;
    cloned.outro = this.outro;
    return cloned;
  }
  generateDecodedMap(options) {
    options = options || {};
    const sourceIndex = 0;
    const names = Object.keys(this.storedNames);
    const mappings = new Mappings(options.hires);
    const locate2 = getLocator(this.original);
    if (this.intro) {
      mappings.advance(this.intro);
    }
    this.firstChunk.eachNext((chunk) => {
      const loc = locate2(chunk.start);
      if (chunk.intro.length)
        mappings.advance(chunk.intro);
      if (chunk.edited) {
        mappings.addEdit(
          sourceIndex,
          chunk.content,
          loc,
          chunk.storeName ? names.indexOf(chunk.original) : -1
        );
      } else {
        mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
      }
      if (chunk.outro.length)
        mappings.advance(chunk.outro);
    });
    return {
      file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
      sources: [
        options.source ? getRelativePath(options.file || "", options.source) : options.file || ""
      ],
      sourcesContent: options.includeContent ? [this.original] : void 0,
      names,
      mappings: mappings.raw,
      x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
    };
  }
  generateMap(options) {
    return new SourceMap(this.generateDecodedMap(options));
  }
  _ensureindentStr() {
    if (this.indentStr === void 0) {
      this.indentStr = guessIndent(this.original);
    }
  }
  _getRawIndentString() {
    this._ensureindentStr();
    return this.indentStr;
  }
  getIndentString() {
    this._ensureindentStr();
    return this.indentStr === null ? "	" : this.indentStr;
  }
  indent(indentStr, options) {
    const pattern = /^[^\r\n]/gm;
    if (isObject$1(indentStr)) {
      options = indentStr;
      indentStr = void 0;
    }
    if (indentStr === void 0) {
      this._ensureindentStr();
      indentStr = this.indentStr || "	";
    }
    if (indentStr === "")
      return this;
    options = options || {};
    const isExcluded = {};
    if (options.exclude) {
      const exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
      exclusions.forEach((exclusion) => {
        for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
          isExcluded[i] = true;
        }
      });
    }
    let shouldIndentNextCharacter = options.indentStart !== false;
    const replacer = (match) => {
      if (shouldIndentNextCharacter)
        return `${indentStr}${match}`;
      shouldIndentNextCharacter = true;
      return match;
    };
    this.intro = this.intro.replace(pattern, replacer);
    let charIndex = 0;
    let chunk = this.firstChunk;
    while (chunk) {
      const end = chunk.end;
      if (chunk.edited) {
        if (!isExcluded[charIndex]) {
          chunk.content = chunk.content.replace(pattern, replacer);
          if (chunk.content.length) {
            shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
          }
        }
      } else {
        charIndex = chunk.start;
        while (charIndex < end) {
          if (!isExcluded[charIndex]) {
            const char = this.original[charIndex];
            if (char === "\n") {
              shouldIndentNextCharacter = true;
            } else if (char !== "\r" && shouldIndentNextCharacter) {
              shouldIndentNextCharacter = false;
              if (charIndex === chunk.start) {
                chunk.prependRight(indentStr);
              } else {
                this._splitChunk(chunk, charIndex);
                chunk = chunk.next;
                chunk.prependRight(indentStr);
              }
            }
          }
          charIndex += 1;
        }
      }
      charIndex = chunk.end;
      chunk = chunk.next;
    }
    this.outro = this.outro.replace(pattern, replacer);
    return this;
  }
  insert() {
    throw new Error(
      "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
    );
  }
  insertLeft(index, content) {
    if (!warned.insertLeft) {
      console.warn(
        "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
      );
      warned.insertLeft = true;
    }
    return this.appendLeft(index, content);
  }
  insertRight(index, content) {
    if (!warned.insertRight) {
      console.warn(
        "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
      );
      warned.insertRight = true;
    }
    return this.prependRight(index, content);
  }
  move(start, end, index) {
    if (index >= start && index <= end)
      throw new Error("Cannot move a selection inside itself");
    this._split(start);
    this._split(end);
    this._split(index);
    const first = this.byStart[start];
    const last = this.byEnd[end];
    const oldLeft = first.previous;
    const oldRight = last.next;
    const newRight = this.byStart[index];
    if (!newRight && last === this.lastChunk)
      return this;
    const newLeft = newRight ? newRight.previous : this.lastChunk;
    if (oldLeft)
      oldLeft.next = oldRight;
    if (oldRight)
      oldRight.previous = oldLeft;
    if (newLeft)
      newLeft.next = first;
    if (newRight)
      newRight.previous = last;
    if (!first.previous)
      this.firstChunk = last.next;
    if (!last.next) {
      this.lastChunk = first.previous;
      this.lastChunk.next = null;
    }
    first.previous = newLeft;
    last.next = newRight || null;
    if (!newLeft)
      this.firstChunk = first;
    if (!newRight)
      this.lastChunk = last;
    return this;
  }
  overwrite(start, end, content, options) {
    options = options || {};
    return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
  }
  update(start, end, content, options) {
    if (typeof content !== "string")
      throw new TypeError("replacement content must be a string");
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    if (end > this.original.length)
      throw new Error("end is out of bounds");
    if (start === end)
      throw new Error(
        "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
      );
    this._split(start);
    this._split(end);
    if (options === true) {
      if (!warned.storeName) {
        console.warn(
          "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
        );
        warned.storeName = true;
      }
      options = { storeName: true };
    }
    const storeName = options !== void 0 ? options.storeName : false;
    const overwrite = options !== void 0 ? options.overwrite : false;
    if (storeName) {
      const original = this.original.slice(start, end);
      Object.defineProperty(this.storedNames, original, {
        writable: true,
        value: true,
        enumerable: true
      });
    }
    const first = this.byStart[start];
    const last = this.byEnd[end];
    if (first) {
      let chunk = first;
      while (chunk !== last) {
        if (chunk.next !== this.byStart[chunk.end]) {
          throw new Error("Cannot overwrite across a split point");
        }
        chunk = chunk.next;
        chunk.edit("", false);
      }
      first.edit(content, storeName, !overwrite);
    } else {
      const newChunk = new Chunk$1(start, end, "").edit(content, storeName);
      last.next = newChunk;
      newChunk.previous = last;
    }
    return this;
  }
  prepend(content) {
    if (typeof content !== "string")
      throw new TypeError("outro content must be a string");
    this.intro = content + this.intro;
    return this;
  }
  prependLeft(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.prependLeft(content);
    } else {
      this.intro = content + this.intro;
    }
    return this;
  }
  prependRight(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.prependRight(content);
    } else {
      this.outro = content + this.outro;
    }
    return this;
  }
  remove(start, end) {
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    if (start === end)
      return this;
    if (start < 0 || end > this.original.length)
      throw new Error("Character is out of bounds");
    if (start > end)
      throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.intro = "";
      chunk.outro = "";
      chunk.edit("");
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  reset(start, end) {
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    if (start === end)
      return this;
    if (start < 0 || end > this.original.length)
      throw new Error("Character is out of bounds");
    if (start > end)
      throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.reset();
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  lastChar() {
    if (this.outro.length)
      return this.outro[this.outro.length - 1];
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length)
        return chunk.outro[chunk.outro.length - 1];
      if (chunk.content.length)
        return chunk.content[chunk.content.length - 1];
      if (chunk.intro.length)
        return chunk.intro[chunk.intro.length - 1];
    } while (chunk = chunk.previous);
    if (this.intro.length)
      return this.intro[this.intro.length - 1];
    return "";
  }
  lastLine() {
    let lineIndex = this.outro.lastIndexOf(n);
    if (lineIndex !== -1)
      return this.outro.substr(lineIndex + 1);
    let lineStr = this.outro;
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length > 0) {
        lineIndex = chunk.outro.lastIndexOf(n);
        if (lineIndex !== -1)
          return chunk.outro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.outro + lineStr;
      }
      if (chunk.content.length > 0) {
        lineIndex = chunk.content.lastIndexOf(n);
        if (lineIndex !== -1)
          return chunk.content.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.content + lineStr;
      }
      if (chunk.intro.length > 0) {
        lineIndex = chunk.intro.lastIndexOf(n);
        if (lineIndex !== -1)
          return chunk.intro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.intro + lineStr;
      }
    } while (chunk = chunk.previous);
    lineIndex = this.intro.lastIndexOf(n);
    if (lineIndex !== -1)
      return this.intro.substr(lineIndex + 1) + lineStr;
    return this.intro + lineStr;
  }
  slice(start = 0, end = this.original.length) {
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    let result = "";
    let chunk = this.firstChunk;
    while (chunk && (chunk.start > start || chunk.end <= start)) {
      if (chunk.start < end && chunk.end >= end) {
        return result;
      }
      chunk = chunk.next;
    }
    if (chunk && chunk.edited && chunk.start !== start)
      throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
    const startChunk = chunk;
    while (chunk) {
      if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
        result += chunk.intro;
      }
      const containsEnd = chunk.start < end && chunk.end >= end;
      if (containsEnd && chunk.edited && chunk.end !== end)
        throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
      const sliceStart = startChunk === chunk ? start - chunk.start : 0;
      const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
      result += chunk.content.slice(sliceStart, sliceEnd);
      if (chunk.outro && (!containsEnd || chunk.end === end)) {
        result += chunk.outro;
      }
      if (containsEnd) {
        break;
      }
      chunk = chunk.next;
    }
    return result;
  }
  // TODO deprecate this? not really very useful
  snip(start, end) {
    const clone = this.clone();
    clone.remove(0, start);
    clone.remove(end, clone.original.length);
    return clone;
  }
  _split(index) {
    if (this.byStart[index] || this.byEnd[index])
      return;
    let chunk = this.lastSearchedChunk;
    const searchForward = index > chunk.end;
    while (chunk) {
      if (chunk.contains(index))
        return this._splitChunk(chunk, index);
      chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
    }
  }
  _splitChunk(chunk, index) {
    if (chunk.edited && chunk.content.length) {
      const loc = getLocator(this.original)(index);
      throw new Error(
        `Cannot split a chunk that has already been edited (${loc.line}:${loc.column} \u2013 "${chunk.original}")`
      );
    }
    const newChunk = chunk.split(index);
    this.byEnd[index] = chunk;
    this.byStart[index] = newChunk;
    this.byEnd[newChunk.end] = newChunk;
    if (chunk === this.lastChunk)
      this.lastChunk = newChunk;
    this.lastSearchedChunk = chunk;
    return true;
  }
  toString() {
    let str = this.intro;
    let chunk = this.firstChunk;
    while (chunk) {
      str += chunk.toString();
      chunk = chunk.next;
    }
    return str + this.outro;
  }
  isEmpty() {
    let chunk = this.firstChunk;
    do {
      if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
        return false;
    } while (chunk = chunk.next);
    return true;
  }
  length() {
    let chunk = this.firstChunk;
    let length = 0;
    do {
      length += chunk.intro.length + chunk.content.length + chunk.outro.length;
    } while (chunk = chunk.next);
    return length;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  }
  trimEndAborted(charType) {
    const rx = new RegExp((charType || "\\s") + "+$");
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length)
      return true;
    let chunk = this.lastChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimEnd(rx);
      if (chunk.end !== end) {
        if (this.lastChunk === chunk) {
          this.lastChunk = chunk.next;
        }
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted)
        return true;
      chunk = chunk.previous;
    } while (chunk);
    return false;
  }
  trimEnd(charType) {
    this.trimEndAborted(charType);
    return this;
  }
  trimStartAborted(charType) {
    const rx = new RegExp("^" + (charType || "\\s") + "+");
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length)
      return true;
    let chunk = this.firstChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimStart(rx);
      if (chunk.end !== end) {
        if (chunk === this.lastChunk)
          this.lastChunk = chunk.next;
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted)
        return true;
      chunk = chunk.next;
    } while (chunk);
    return false;
  }
  trimStart(charType) {
    this.trimStartAborted(charType);
    return this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  _replaceRegexp(searchValue, replacement) {
    function getReplacement(match, str) {
      if (typeof replacement === "string") {
        return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
          if (i === "$")
            return "$";
          if (i === "&")
            return match[0];
          const num = +i;
          if (num < match.length)
            return match[+i];
          return `$${i}`;
        });
      } else {
        return replacement(...match, match.index, str, match.groups);
      }
    }
    function matchAll(re, str) {
      let match;
      const matches = [];
      while (match = re.exec(str)) {
        matches.push(match);
      }
      return matches;
    }
    if (searchValue.global) {
      const matches = matchAll(searchValue, this.original);
      matches.forEach((match) => {
        if (match.index != null)
          this.overwrite(
            match.index,
            match.index + match[0].length,
            getReplacement(match, this.original)
          );
      });
    } else {
      const match = this.original.match(searchValue);
      if (match && match.index != null)
        this.overwrite(
          match.index,
          match.index + match[0].length,
          getReplacement(match, this.original)
        );
    }
    return this;
  }
  _replaceString(string, replacement) {
    const { original } = this;
    const index = original.indexOf(string);
    if (index !== -1) {
      this.overwrite(index, index + string.length, replacement);
    }
    return this;
  }
  replace(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceString(searchValue, replacement);
    }
    return this._replaceRegexp(searchValue, replacement);
  }
  _replaceAllString(string, replacement) {
    const { original } = this;
    const stringLength = string.length;
    for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
      this.overwrite(index, index + stringLength, replacement);
    }
    return this;
  }
  replaceAll(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceAllString(searchValue, replacement);
    }
    if (!searchValue.global) {
      throw new TypeError(
        "MagicString.prototype.replaceAll called with a non-global RegExp argument"
      );
    }
    return this._replaceRegexp(searchValue, replacement);
  }
};
var hasOwnProp = Object.prototype.hasOwnProperty;
var Bundle$1 = class Bundle {
  constructor(options = {}) {
    this.intro = options.intro || "";
    this.separator = options.separator !== void 0 ? options.separator : "\n";
    this.sources = [];
    this.uniqueSources = [];
    this.uniqueSourceIndexByFilename = {};
  }
  addSource(source) {
    if (source instanceof MagicString) {
      return this.addSource({
        content: source,
        filename: source.filename,
        separator: this.separator
      });
    }
    if (!isObject$1(source) || !source.content) {
      throw new Error(
        "bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`"
      );
    }
    ["filename", "ignoreList", "indentExclusionRanges", "separator"].forEach((option) => {
      if (!hasOwnProp.call(source, option))
        source[option] = source.content[option];
    });
    if (source.separator === void 0) {
      source.separator = this.separator;
    }
    if (source.filename) {
      if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
        this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
        this.uniqueSources.push({ filename: source.filename, content: source.content.original });
      } else {
        const uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
        if (source.content.original !== uniqueSource.content) {
          throw new Error(`Illegal source: same filename (${source.filename}), different contents`);
        }
      }
    }
    this.sources.push(source);
    return this;
  }
  append(str, options) {
    this.addSource({
      content: new MagicString(str),
      separator: options && options.separator || ""
    });
    return this;
  }
  clone() {
    const bundle = new Bundle({
      intro: this.intro,
      separator: this.separator
    });
    this.sources.forEach((source) => {
      bundle.addSource({
        filename: source.filename,
        content: source.content.clone(),
        separator: source.separator
      });
    });
    return bundle;
  }
  generateDecodedMap(options = {}) {
    const names = [];
    let x_google_ignoreList = void 0;
    this.sources.forEach((source) => {
      Object.keys(source.content.storedNames).forEach((name) => {
        if (!~names.indexOf(name))
          names.push(name);
      });
    });
    const mappings = new Mappings(options.hires);
    if (this.intro) {
      mappings.advance(this.intro);
    }
    this.sources.forEach((source, i) => {
      if (i > 0) {
        mappings.advance(this.separator);
      }
      const sourceIndex = source.filename ? this.uniqueSourceIndexByFilename[source.filename] : -1;
      const magicString = source.content;
      const locate2 = getLocator(magicString.original);
      if (magicString.intro) {
        mappings.advance(magicString.intro);
      }
      magicString.firstChunk.eachNext((chunk) => {
        const loc = locate2(chunk.start);
        if (chunk.intro.length)
          mappings.advance(chunk.intro);
        if (source.filename) {
          if (chunk.edited) {
            mappings.addEdit(
              sourceIndex,
              chunk.content,
              loc,
              chunk.storeName ? names.indexOf(chunk.original) : -1
            );
          } else {
            mappings.addUneditedChunk(
              sourceIndex,
              chunk,
              magicString.original,
              loc,
              magicString.sourcemapLocations
            );
          }
        } else {
          mappings.advance(chunk.content);
        }
        if (chunk.outro.length)
          mappings.advance(chunk.outro);
      });
      if (magicString.outro) {
        mappings.advance(magicString.outro);
      }
      if (source.ignoreList && sourceIndex !== -1) {
        if (x_google_ignoreList === void 0) {
          x_google_ignoreList = [];
        }
        x_google_ignoreList.push(sourceIndex);
      }
    });
    return {
      file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
      sources: this.uniqueSources.map((source) => {
        return options.file ? getRelativePath(options.file, source.filename) : source.filename;
      }),
      sourcesContent: this.uniqueSources.map((source) => {
        return options.includeContent ? source.content : null;
      }),
      names,
      mappings: mappings.raw,
      x_google_ignoreList
    };
  }
  generateMap(options) {
    return new SourceMap(this.generateDecodedMap(options));
  }
  getIndentString() {
    const indentStringCounts = {};
    this.sources.forEach((source) => {
      const indentStr = source.content._getRawIndentString();
      if (indentStr === null)
        return;
      if (!indentStringCounts[indentStr])
        indentStringCounts[indentStr] = 0;
      indentStringCounts[indentStr] += 1;
    });
    return Object.keys(indentStringCounts).sort((a, b) => {
      return indentStringCounts[a] - indentStringCounts[b];
    })[0] || "	";
  }
  indent(indentStr) {
    if (!arguments.length) {
      indentStr = this.getIndentString();
    }
    if (indentStr === "")
      return this;
    let trailingNewline = !this.intro || this.intro.slice(-1) === "\n";
    this.sources.forEach((source, i) => {
      const separator = source.separator !== void 0 ? source.separator : this.separator;
      const indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
      source.content.indent(indentStr, {
        exclude: source.indentExclusionRanges,
        indentStart
        //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
      });
      trailingNewline = source.content.lastChar() === "\n";
    });
    if (this.intro) {
      this.intro = indentStr + this.intro.replace(/^[^\n]/gm, (match, index) => {
        return index > 0 ? indentStr + match : match;
      });
    }
    return this;
  }
  prepend(str) {
    this.intro = str + this.intro;
    return this;
  }
  toString() {
    const body = this.sources.map((source, i) => {
      const separator = source.separator !== void 0 ? source.separator : this.separator;
      const str = (i > 0 ? separator : "") + source.content.toString();
      return str;
    }).join("");
    return this.intro + body;
  }
  isEmpty() {
    if (this.intro.length && this.intro.trim())
      return false;
    if (this.sources.some((source) => !source.content.isEmpty()))
      return false;
    return true;
  }
  length() {
    return this.sources.reduce(
      (length, source) => length + source.content.length(),
      this.intro.length
    );
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  }
  trimStart(charType) {
    const rx = new RegExp("^" + (charType || "\\s") + "+");
    this.intro = this.intro.replace(rx, "");
    if (!this.intro) {
      let source;
      let i = 0;
      do {
        source = this.sources[i++];
        if (!source) {
          break;
        }
      } while (!source.content.trimStartAborted(charType));
    }
    return this;
  }
  trimEnd(charType) {
    const rx = new RegExp((charType || "\\s") + "+$");
    let source;
    let i = this.sources.length - 1;
    do {
      source = this.sources[i--];
      if (!source) {
        this.intro = this.intro.replace(rx, "");
        break;
      }
    } while (!source.content.trimEndAborted(charType));
    return this;
  }
};
var needsEscapeRegEx = /[\n\r'\\\u2028\u2029]/;
var quoteNewlineRegEx = /([\n\r'\u2028\u2029])/g;
var backSlashRegEx = /\\/g;
function escapeId(id) {
  if (!needsEscapeRegEx.test(id))
    return id;
  return id.replace(backSlashRegEx, "\\\\").replace(quoteNewlineRegEx, "\\$1");
}
var ExternalChunk = class {
  constructor(module, options, inputBase) {
    this.options = options;
    this.inputBase = inputBase;
    this.defaultVariableName = "";
    this.namespaceVariableName = "";
    this.variableName = "";
    this.fileName = null;
    this.importAttributes = null;
    this.id = module.id;
    this.moduleInfo = module.info;
    this.renormalizeRenderPath = module.renormalizeRenderPath;
    this.suggestedVariableName = module.suggestedVariableName;
  }
  getFileName() {
    if (this.fileName) {
      return this.fileName;
    }
    const { paths } = this.options;
    return this.fileName = (typeof paths === "function" ? paths(this.id) : paths[this.id]) || (this.renormalizeRenderPath ? normalize(relative2(this.inputBase, this.id)) : this.id);
  }
  getImportAttributes(snippets) {
    return this.importAttributes ||= formatAttributes(this.options.format === "es" && this.options.externalImportAttributes && this.moduleInfo.attributes, snippets);
  }
  getImportPath(importer) {
    return escapeId(this.renormalizeRenderPath ? getImportPath(importer, this.getFileName(), this.options.format === "amd", false) : this.getFileName());
  }
};
function formatAttributes(attributes, { getObject }) {
  if (!attributes) {
    return null;
  }
  const assertionEntries = Object.entries(attributes).map(([key, value]) => [key, `'${value}'`]);
  if (assertionEntries.length > 0) {
    return getObject(assertionEntries, { lineBreakIndent: null });
  }
  return null;
}
function getOrCreate(map, key, init2) {
  const existing = map.get(key);
  if (existing !== void 0) {
    return existing;
  }
  const value = init2();
  map.set(key, value);
  return value;
}
function getNewSet() {
  return /* @__PURE__ */ new Set();
}
function getNewArray() {
  return [];
}
var UnknownKey = Symbol("Unknown Key");
var UnknownNonAccessorKey = Symbol("Unknown Non-Accessor Key");
var UnknownInteger = Symbol("Unknown Integer");
var SymbolToStringTag = Symbol("Symbol.toStringTag");
var EMPTY_PATH = [];
var UNKNOWN_PATH = [UnknownKey];
var UNKNOWN_NON_ACCESSOR_PATH = [UnknownNonAccessorKey];
var UNKNOWN_INTEGER_PATH = [UnknownInteger];
var EntitiesKey = Symbol("Entities");
var PathTracker = class {
  constructor() {
    this.entityPaths = Object.create(null, {
      [EntitiesKey]: { value: /* @__PURE__ */ new Set() }
    });
  }
  trackEntityAtPathAndGetIfTracked(path2, entity) {
    const trackedEntities = this.getEntities(path2);
    if (trackedEntities.has(entity))
      return true;
    trackedEntities.add(entity);
    return false;
  }
  withTrackedEntityAtPath(path2, entity, onUntracked, returnIfTracked) {
    const trackedEntities = this.getEntities(path2);
    if (trackedEntities.has(entity))
      return returnIfTracked;
    trackedEntities.add(entity);
    const result = onUntracked();
    trackedEntities.delete(entity);
    return result;
  }
  getEntities(path2) {
    let currentPaths = this.entityPaths;
    for (const pathSegment of path2) {
      currentPaths = currentPaths[pathSegment] = currentPaths[pathSegment] || Object.create(null, { [EntitiesKey]: { value: /* @__PURE__ */ new Set() } });
    }
    return currentPaths[EntitiesKey];
  }
};
var SHARED_RECURSION_TRACKER = new PathTracker();
var DiscriminatedPathTracker = class {
  constructor() {
    this.entityPaths = Object.create(null, {
      [EntitiesKey]: { value: /* @__PURE__ */ new Map() }
    });
  }
  trackEntityAtPathAndGetIfTracked(path2, discriminator, entity) {
    let currentPaths = this.entityPaths;
    for (const pathSegment of path2) {
      currentPaths = currentPaths[pathSegment] = currentPaths[pathSegment] || Object.create(null, { [EntitiesKey]: { value: /* @__PURE__ */ new Map() } });
    }
    const trackedEntities = getOrCreate(currentPaths[EntitiesKey], discriminator, getNewSet);
    if (trackedEntities.has(entity))
      return true;
    trackedEntities.add(entity);
    return false;
  }
};
function isFlagSet(flags, flag) {
  return (flags & flag) !== 0;
}
function setFlag(flags, flag, value) {
  return flags & ~flag | -value & flag;
}
var UnknownValue = Symbol("Unknown Value");
var UnknownTruthyValue = Symbol("Unknown Truthy Value");
var ExpressionEntity = class {
  constructor() {
    this.flags = 0;
  }
  get included() {
    return isFlagSet(
      this.flags,
      1
      /* Flag.included */
    );
  }
  set included(value) {
    this.flags = setFlag(this.flags, 1, value);
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, _path, _recursionTracker) {
    deoptimizeInteraction(interaction);
  }
  deoptimizePath(_path) {
  }
  /**
   * If possible it returns a stringifyable literal value for this node that
   * can be used for inlining or comparing values. Otherwise, it should return
   * UnknownValue.
   */
  getLiteralValueAtPath(_path, _recursionTracker, _origin) {
    return UnknownValue;
  }
  getReturnExpressionWhenCalledAtPath(_path, _interaction, _recursionTracker, _origin) {
    return UNKNOWN_RETURN_EXPRESSION;
  }
  hasEffectsOnInteractionAtPath(_path, _interaction, _context) {
    return true;
  }
  include(_context, _includeChildrenRecursively, _options) {
    this.included = true;
  }
  includeCallArguments(context, parameters) {
    for (const argument of parameters) {
      argument.include(context, false);
    }
  }
  shouldBeIncluded(_context) {
    return true;
  }
};
var UNKNOWN_EXPRESSION = new class UnknownExpression extends ExpressionEntity {
}();
var UNKNOWN_RETURN_EXPRESSION = [
  UNKNOWN_EXPRESSION,
  false
];
var deoptimizeInteraction = (interaction) => {
  for (const argument of interaction.args) {
    argument?.deoptimizePath(UNKNOWN_PATH);
  }
};
var INTERACTION_ACCESSED = 0;
var INTERACTION_ASSIGNED = 1;
var INTERACTION_CALLED = 2;
var NODE_INTERACTION_UNKNOWN_ACCESS = {
  args: [null],
  type: INTERACTION_ACCESSED
};
var NODE_INTERACTION_UNKNOWN_ASSIGNMENT = {
  args: [null, UNKNOWN_EXPRESSION],
  type: INTERACTION_ASSIGNED
};
var NODE_INTERACTION_UNKNOWN_CALL = {
  args: [null],
  type: INTERACTION_CALLED,
  withNew: false
};
var Variable = class extends ExpressionEntity {
  constructor(name) {
    super();
    this.name = name;
    this.alwaysRendered = false;
    this.forbiddenNames = null;
    this.initReached = false;
    this.isId = false;
    this.isReassigned = false;
    this.kind = null;
    this.renderBaseName = null;
    this.renderName = null;
  }
  /**
   * Binds identifiers that reference this variable to this variable.
   * Necessary to be able to change variable names.
   */
  addReference(_identifier) {
  }
  /**
   * Prevent this variable from being renamed to this name to avoid name
   * collisions
   */
  forbidName(name) {
    (this.forbiddenNames ||= /* @__PURE__ */ new Set()).add(name);
  }
  getBaseVariableName() {
    return this.renderedLikeHoisted?.getBaseVariableName() || this.renderBaseName || this.renderName || this.name;
  }
  getName(getPropertyAccess, useOriginalName) {
    if (useOriginalName?.(this)) {
      return this.name;
    }
    if (this.renderedLikeHoisted) {
      return this.renderedLikeHoisted.getName(getPropertyAccess, useOriginalName);
    }
    const name = this.renderName || this.name;
    return this.renderBaseName ? `${this.renderBaseName}${getPropertyAccess(name)}` : name;
  }
  hasEffectsOnInteractionAtPath(path2, { type }, _context) {
    return type !== INTERACTION_ACCESSED || path2.length > 0;
  }
  /**
   * Marks this variable as being part of the bundle, which is usually the case when one of
   * its identifiers becomes part of the bundle. Returns true if it has not been included
   * previously.
   * Once a variable is included, it should take care all its declarations are included.
   */
  include() {
    this.included = true;
    this.renderedLikeHoisted?.include();
  }
  /**
   * Links the rendered name of this variable to another variable and includes
   * this variable if the other variable is included.
   */
  renderLikeHoisted(variable) {
    this.renderedLikeHoisted = variable;
  }
  markCalledFromTryStatement() {
  }
  setRenderNames(baseName, name) {
    this.renderBaseName = baseName;
    this.renderName = name;
  }
};
var ExternalVariable = class extends Variable {
  constructor(module, name) {
    super(name);
    this.referenced = false;
    this.module = module;
    this.isNamespace = name === "*";
  }
  addReference(identifier2) {
    this.referenced = true;
    if (this.name === "default" || this.name === "*") {
      this.module.suggestName(identifier2.name);
    }
  }
  hasEffectsOnInteractionAtPath(path2, { type }) {
    return type !== INTERACTION_ACCESSED || path2.length > (this.isNamespace ? 1 : 0);
  }
  include() {
    super.include();
    this.module.used = true;
  }
};
var BLANK = Object.freeze(/* @__PURE__ */ Object.create(null));
var EMPTY_OBJECT = Object.freeze({});
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_SET = Object.freeze(new class extends Set {
  add() {
    throw new Error("Cannot add to empty set");
  }
}());
var RESERVED_NAMES = /* @__PURE__ */ new Set([
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "NaN",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "with",
  "yield"
]);
var illegalCharacters = /[^\w$]/g;
var startsWithDigit = (value) => /\d/.test(value[0]);
var needsEscape = (value) => startsWithDigit(value) || RESERVED_NAMES.has(value) || value === "arguments";
function isLegal(value) {
  if (needsEscape(value)) {
    return false;
  }
  return !illegalCharacters.test(value);
}
function makeLegal(value) {
  value = value.replace(/-(\w)/g, (_, letter) => letter.toUpperCase()).replace(illegalCharacters, "_");
  if (needsEscape(value))
    value = `_${value}`;
  return value || "_";
}
var VALID_IDENTIFIER_REGEXP = /^[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*$/u;
var NUMBER_REGEXP = /^(?:0|[1-9]\d*)$/;
function stringifyObjectKeyIfNeeded(key) {
  if (VALID_IDENTIFIER_REGEXP.test(key)) {
    return key === "__proto__" ? '["__proto__"]' : key;
  }
  if (NUMBER_REGEXP.test(key) && +key <= Number.MAX_SAFE_INTEGER) {
    return key;
  }
  return JSON.stringify(key);
}
function stringifyIdentifierIfNeeded(key) {
  if (VALID_IDENTIFIER_REGEXP.test(key)) {
    return key;
  }
  return JSON.stringify(key);
}
var ExternalModule = class {
  constructor(options, id, moduleSideEffects, meta, renormalizeRenderPath, attributes) {
    this.options = options;
    this.id = id;
    this.renormalizeRenderPath = renormalizeRenderPath;
    this.dynamicImporters = [];
    this.execIndex = Infinity;
    this.exportedVariables = /* @__PURE__ */ new Map();
    this.importers = [];
    this.reexported = false;
    this.used = false;
    this.declarations = /* @__PURE__ */ new Map();
    this.mostCommonSuggestion = 0;
    this.nameSuggestions = /* @__PURE__ */ new Map();
    this.suggestedVariableName = makeLegal(id.split(/[/\\]/).pop());
    const { importers, dynamicImporters } = this;
    this.info = {
      ast: null,
      attributes,
      code: null,
      dynamicallyImportedIdResolutions: EMPTY_ARRAY,
      dynamicallyImportedIds: EMPTY_ARRAY,
      get dynamicImporters() {
        return dynamicImporters.sort();
      },
      exportedBindings: null,
      exports: null,
      hasDefaultExport: null,
      id,
      implicitlyLoadedAfterOneOf: EMPTY_ARRAY,
      implicitlyLoadedBefore: EMPTY_ARRAY,
      importedIdResolutions: EMPTY_ARRAY,
      importedIds: EMPTY_ARRAY,
      get importers() {
        return importers.sort();
      },
      isEntry: false,
      isExternal: true,
      isIncluded: null,
      meta,
      moduleSideEffects,
      syntheticNamedExports: false
    };
  }
  getVariableForExportName(name) {
    const declaration = this.declarations.get(name);
    if (declaration)
      return [declaration];
    const externalVariable = new ExternalVariable(this, name);
    this.declarations.set(name, externalVariable);
    this.exportedVariables.set(externalVariable, name);
    return [externalVariable];
  }
  suggestName(name) {
    const value = (this.nameSuggestions.get(name) ?? 0) + 1;
    this.nameSuggestions.set(name, value);
    if (value > this.mostCommonSuggestion) {
      this.mostCommonSuggestion = value;
      this.suggestedVariableName = name;
    }
  }
  warnUnusedImports() {
    const unused = [...this.declarations].filter(([name, declaration]) => name !== "*" && !declaration.included && !this.reexported && !declaration.referenced).map(([name]) => name);
    if (unused.length === 0)
      return;
    const importersSet = /* @__PURE__ */ new Set();
    for (const name of unused) {
      for (const importer of this.declarations.get(name).module.importers) {
        importersSet.add(importer);
      }
    }
    const importersArray = [...importersSet];
    this.options.onLog(LOGLEVEL_WARN, logUnusedExternalImports(this.id, unused, importersArray));
  }
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var f = n2.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n2[k];
      }
    });
  });
  return a;
}
var utils$3 = {};
var path$1 = require$$0$1;
var WIN_SLASH = "\\\\/";
var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
var DOT_LITERAL = "\\.";
var PLUS_LITERAL = "\\+";
var QMARK_LITERAL = "\\?";
var SLASH_LITERAL = "\\/";
var ONE_CHAR = "(?=.)";
var QMARK = "[^/]";
var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
var NO_DOT = `(?!${DOT_LITERAL})`;
var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
var STAR = `${QMARK}*?`;
var POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};
var WINDOWS_CHARS = {
  ...POSIX_CHARS,
  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};
var POSIX_REGEX_SOURCE$1 = {
  alnum: "a-zA-Z0-9",
  alpha: "a-zA-Z",
  ascii: "\\x00-\\x7F",
  blank: " \\t",
  cntrl: "\\x00-\\x1F\\x7F",
  digit: "0-9",
  graph: "\\x21-\\x7E",
  lower: "a-z",
  print: "\\x20-\\x7E ",
  punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
  space: " \\t\\r\\n\\v\\f",
  upper: "A-Z",
  word: "A-Za-z0-9_",
  xdigit: "A-Fa-f0-9"
};
var constants$2 = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    "***": "*",
    "**/**": "**",
    "**/**/**": "**"
  },
  // Digits
  CHAR_0: 48,
  /* 0 */
  CHAR_9: 57,
  /* 9 */
  // Alphabet chars.
  CHAR_UPPERCASE_A: 65,
  /* A */
  CHAR_LOWERCASE_A: 97,
  /* a */
  CHAR_UPPERCASE_Z: 90,
  /* Z */
  CHAR_LOWERCASE_Z: 122,
  /* z */
  CHAR_LEFT_PARENTHESES: 40,
  /* ( */
  CHAR_RIGHT_PARENTHESES: 41,
  /* ) */
  CHAR_ASTERISK: 42,
  /* * */
  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38,
  /* & */
  CHAR_AT: 64,
  /* @ */
  CHAR_BACKWARD_SLASH: 92,
  /* \ */
  CHAR_CARRIAGE_RETURN: 13,
  /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94,
  /* ^ */
  CHAR_COLON: 58,
  /* : */
  CHAR_COMMA: 44,
  /* , */
  CHAR_DOT: 46,
  /* . */
  CHAR_DOUBLE_QUOTE: 34,
  /* " */
  CHAR_EQUAL: 61,
  /* = */
  CHAR_EXCLAMATION_MARK: 33,
  /* ! */
  CHAR_FORM_FEED: 12,
  /* \f */
  CHAR_FORWARD_SLASH: 47,
  /* / */
  CHAR_GRAVE_ACCENT: 96,
  /* ` */
  CHAR_HASH: 35,
  /* # */
  CHAR_HYPHEN_MINUS: 45,
  /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60,
  /* < */
  CHAR_LEFT_CURLY_BRACE: 123,
  /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91,
  /* [ */
  CHAR_LINE_FEED: 10,
  /* \n */
  CHAR_NO_BREAK_SPACE: 160,
  /* \u00A0 */
  CHAR_PERCENT: 37,
  /* % */
  CHAR_PLUS: 43,
  /* + */
  CHAR_QUESTION_MARK: 63,
  /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62,
  /* > */
  CHAR_RIGHT_CURLY_BRACE: 125,
  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93,
  /* ] */
  CHAR_SEMICOLON: 59,
  /* ; */
  CHAR_SINGLE_QUOTE: 39,
  /* ' */
  CHAR_SPACE: 32,
  /*   */
  CHAR_TAB: 9,
  /* \t */
  CHAR_UNDERSCORE: 95,
  /* _ */
  CHAR_VERTICAL_LINE: 124,
  /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
  /* \uFEFF */
  SEP: path$1.sep,
  /**
   * Create EXTGLOB_CHARS
   */
  extglobChars(chars2) {
    return {
      "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars2.STAR})` },
      "?": { type: "qmark", open: "(?:", close: ")?" },
      "+": { type: "plus", open: "(?:", close: ")+" },
      "*": { type: "star", open: "(?:", close: ")*" },
      "@": { type: "at", open: "(?:", close: ")" }
    };
  },
  /**
   * Create GLOB_CHARS
   */
  globChars(win322) {
    return win322 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};
(function(exports) {
  const path2 = require$$0$1;
  const win322 = process.platform === "win32";
  const {
    REGEX_BACKSLASH,
    REGEX_REMOVE_BACKSLASH,
    REGEX_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_GLOBAL
  } = constants$2;
  exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
  exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
  exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
  exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
  exports.removeBackslashes = (str) => {
    return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
      return match === "\\" ? "" : match;
    });
  };
  exports.supportsLookbehinds = () => {
    const segs = process.version.slice(1).split(".").map(Number);
    if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
      return true;
    }
    return false;
  };
  exports.isWindows = (options) => {
    if (options && typeof options.windows === "boolean") {
      return options.windows;
    }
    return win322 === true || path2.sep === "\\";
  };
  exports.escapeLast = (input, char, lastIdx) => {
    const idx = input.lastIndexOf(char, lastIdx);
    if (idx === -1)
      return input;
    if (input[idx - 1] === "\\")
      return exports.escapeLast(input, char, idx - 1);
    return `${input.slice(0, idx)}\\${input.slice(idx)}`;
  };
  exports.removePrefix = (input, state = {}) => {
    let output = input;
    if (output.startsWith("./")) {
      output = output.slice(2);
      state.prefix = "./";
    }
    return output;
  };
  exports.wrapOutput = (input, state = {}, options = {}) => {
    const prepend = options.contains ? "" : "^";
    const append = options.contains ? "" : "$";
    let output = `${prepend}(?:${input})${append}`;
    if (state.negated === true) {
      output = `(?:^(?!${output}).*$)`;
    }
    return output;
  };
})(utils$3);
var utils$2 = utils$3;
var {
  CHAR_ASTERISK,
  /* * */
  CHAR_AT,
  /* @ */
  CHAR_BACKWARD_SLASH,
  /* \ */
  CHAR_COMMA,
  /* , */
  CHAR_DOT,
  /* . */
  CHAR_EXCLAMATION_MARK,
  /* ! */
  CHAR_FORWARD_SLASH,
  /* / */
  CHAR_LEFT_CURLY_BRACE,
  /* { */
  CHAR_LEFT_PARENTHESES,
  /* ( */
  CHAR_LEFT_SQUARE_BRACKET,
  /* [ */
  CHAR_PLUS,
  /* + */
  CHAR_QUESTION_MARK,
  /* ? */
  CHAR_RIGHT_CURLY_BRACE,
  /* } */
  CHAR_RIGHT_PARENTHESES,
  /* ) */
  CHAR_RIGHT_SQUARE_BRACKET
  /* ] */
} = constants$2;
var isPathSeparator = (code) => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};
var depth = (token) => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};
var scan$1 = (input, options) => {
  const opts = options || {};
  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];
  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let negatedExtglob = false;
  let finished = false;
  let braces = 0;
  let prev;
  let code;
  let token = { value: "", depth: 0, isGlob: false };
  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };
  while (index < length) {
    code = advance();
    let next;
    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();
      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }
    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces++;
      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }
        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          continue;
        }
        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces--;
          if (braces === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: "", depth: 0, isGlob: false };
      if (finished === true)
        continue;
      if (prev === CHAR_DOT && index === start + 1) {
        start += 2;
        continue;
      }
      lastIndex = index + 1;
      continue;
    }
    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;
        if (code === CHAR_EXCLAMATION_MARK && index === start) {
          negatedExtglob = true;
        }
        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }
            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }
    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK)
        isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }
        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;
          break;
        }
      }
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }
    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob = token.isGlob = true;
      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }
          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (isGlob === true) {
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
  }
  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }
  let base2 = str;
  let prefix = "";
  let glob = "";
  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }
  if (base2 && isGlob === true && lastIndex > 0) {
    base2 = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob === true) {
    base2 = "";
    glob = str;
  } else {
    base2 = str;
  }
  if (base2 && base2 !== "" && base2 !== "/" && base2 !== str) {
    if (isPathSeparator(base2.charCodeAt(base2.length - 1))) {
      base2 = base2.slice(0, -1);
    }
  }
  if (opts.unescape === true) {
    if (glob)
      glob = utils$2.removeBackslashes(glob);
    if (base2 && backslashes === true) {
      base2 = utils$2.removeBackslashes(base2);
    }
  }
  const state = {
    prefix,
    input,
    start,
    base: base2,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated,
    negatedExtglob
  };
  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }
  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;
    for (let idx = 0; idx < slashes.length; idx++) {
      const n2 = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n2, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== "") {
        parts.push(value);
      }
      prevIndex = i;
    }
    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);
      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }
    state.slashes = slashes;
    state.parts = parts;
  }
  return state;
};
var scan_1 = scan$1;
var constants$1 = constants$2;
var utils$1 = utils$3;
var {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants$1;
var expandRange = (args, options) => {
  if (typeof options.expandRange === "function") {
    return options.expandRange(...args, options);
  }
  args.sort();
  const value = `[${args.join("-")}]`;
  return value;
};
var syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};
var parse$1 = (input, options) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected a string");
  }
  input = REPLACEMENTS[input] || input;
  const opts = { ...options };
  const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }
  const bos = { type: "bos", value: "", output: opts.prepend || "" };
  const tokens = [bos];
  const capture = opts.capture ? "" : "?:";
  const win322 = utils$1.isWindows(options);
  const PLATFORM_CHARS = constants$1.globChars(win322);
  const EXTGLOB_CHARS = constants$1.extglobChars(PLATFORM_CHARS);
  const {
    DOT_LITERAL: DOT_LITERAL2,
    PLUS_LITERAL: PLUS_LITERAL2,
    SLASH_LITERAL: SLASH_LITERAL2,
    ONE_CHAR: ONE_CHAR2,
    DOTS_SLASH: DOTS_SLASH2,
    NO_DOT: NO_DOT2,
    NO_DOT_SLASH: NO_DOT_SLASH2,
    NO_DOTS_SLASH: NO_DOTS_SLASH2,
    QMARK: QMARK2,
    QMARK_NO_DOT: QMARK_NO_DOT2,
    STAR: STAR2,
    START_ANCHOR: START_ANCHOR2
  } = PLATFORM_CHARS;
  const globstar = (opts2) => {
    return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
  };
  const nodot = opts.dot ? "" : NO_DOT2;
  const qmarkNoDot = opts.dot ? QMARK2 : QMARK_NO_DOT2;
  let star = opts.bash === true ? globstar(opts) : STAR2;
  if (opts.capture) {
    star = `(${star})`;
  }
  if (typeof opts.noext === "boolean") {
    opts.noextglob = opts.noext;
  }
  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: "",
    output: "",
    prefix: "",
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };
  input = utils$1.removePrefix(input, state);
  len = input.length;
  const extglobs = [];
  const braces = [];
  const stack = [];
  let prev = bos;
  let value;
  const eos = () => state.index === len - 1;
  const peek = state.peek = (n2 = 1) => input[state.index + n2];
  const advance = state.advance = () => input[++state.index] || "";
  const remaining = () => input.slice(state.index + 1);
  const consume = (value2 = "", num = 0) => {
    state.consumed += value2;
    state.index += num;
  };
  const append = (token) => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };
  const negate = () => {
    let count = 1;
    while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
      advance();
      state.start++;
      count++;
    }
    if (count % 2 === 0) {
      return false;
    }
    state.negated = true;
    state.start++;
    return true;
  };
  const increment = (type) => {
    state[type]++;
    stack.push(type);
  };
  const decrement = (type) => {
    state[type]--;
    stack.pop();
  };
  const push = (tok) => {
    if (prev.type === "globstar") {
      const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
      const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
      if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = "star";
        prev.value = "*";
        prev.output = star;
        state.output += prev.output;
      }
    }
    if (extglobs.length && tok.type !== "paren") {
      extglobs[extglobs.length - 1].inner += tok.value;
    }
    if (tok.value || tok.output)
      append(tok);
    if (prev && prev.type === "text" && tok.type === "text") {
      prev.value += tok.value;
      prev.output = (prev.output || "") + tok.value;
      return;
    }
    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };
  const extglobOpen = (type, value2) => {
    const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? "(" : "") + token.open;
    increment("parens");
    push({ type, value: value2, output: state.output ? "" : ONE_CHAR2 });
    push({ type: "paren", extglob: true, value: advance(), output });
    extglobs.push(token);
  };
  const extglobClose = (token) => {
    let output = token.close + (opts.capture ? ")" : "");
    let rest;
    if (token.type === "negate") {
      let extglobStar = star;
      if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
        extglobStar = globstar(opts);
      }
      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }
      if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
        const expression = parse$1(rest, { ...options, fastpaths: false }).output;
        output = token.close = `)${expression})${extglobStar})`;
      }
      if (token.prev.type === "bos") {
        state.negatedExtglob = true;
      }
    }
    push({ type: "paren", extglob: true, value, output });
    decrement("parens");
  };
  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;
    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars2, first, rest, index) => {
      if (first === "\\") {
        backslashes = true;
        return m;
      }
      if (first === "?") {
        if (esc) {
          return esc + first + (rest ? QMARK2.repeat(rest.length) : "");
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK2.repeat(rest.length) : "");
        }
        return QMARK2.repeat(chars2.length);
      }
      if (first === ".") {
        return DOT_LITERAL2.repeat(chars2.length);
      }
      if (first === "*") {
        if (esc) {
          return esc + first + (rest ? star : "");
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });
    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, "");
      } else {
        output = output.replace(/\\+/g, (m) => {
          return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
        });
      }
    }
    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }
    state.output = utils$1.wrapOutput(output, state, options);
    return state;
  }
  while (!eos()) {
    value = advance();
    if (value === "\0") {
      continue;
    }
    if (value === "\\") {
      const next = peek();
      if (next === "/" && opts.bash !== true) {
        continue;
      }
      if (next === "." || next === ";") {
        continue;
      }
      if (!next) {
        value += "\\";
        push({ type: "text", value });
        continue;
      }
      const match = /^\\+/.exec(remaining());
      let slashes = 0;
      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += "\\";
        }
      }
      if (opts.unescape === true) {
        value = advance();
      } else {
        value += advance();
      }
      if (state.brackets === 0) {
        push({ type: "text", value });
        continue;
      }
    }
    if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
      if (opts.posix !== false && value === ":") {
        const inner = prev.value.slice(1);
        if (inner.includes("[")) {
          prev.posix = true;
          if (inner.includes(":")) {
            const idx = prev.value.lastIndexOf("[");
            const pre = prev.value.slice(0, idx);
            const rest2 = prev.value.slice(idx + 2);
            const posix2 = POSIX_REGEX_SOURCE[rest2];
            if (posix2) {
              prev.value = pre + posix2;
              state.backtrack = true;
              advance();
              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR2;
              }
              continue;
            }
          }
        }
      }
      if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
        value = `\\${value}`;
      }
      if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
        value = `\\${value}`;
      }
      if (opts.posix === true && value === "!" && prev.value === "[") {
        value = "^";
      }
      prev.value += value;
      append({ value });
      continue;
    }
    if (state.quotes === 1 && value !== '"') {
      value = utils$1.escapeRegex(value);
      prev.value += value;
      append({ value });
      continue;
    }
    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: "text", value });
      }
      continue;
    }
    if (value === "(") {
      increment("parens");
      push({ type: "paren", value });
      continue;
    }
    if (value === ")") {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError("opening", "("));
      }
      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }
      push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
      decrement("parens");
      continue;
    }
    if (value === "[") {
      if (opts.nobracket === true || !remaining().includes("]")) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("closing", "]"));
        }
        value = `\\${value}`;
      } else {
        increment("brackets");
      }
      push({ type: "bracket", value });
      continue;
    }
    if (value === "]") {
      if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
        push({ type: "text", value, output: `\\${value}` });
        continue;
      }
      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("opening", "["));
        }
        push({ type: "text", value, output: `\\${value}` });
        continue;
      }
      decrement("brackets");
      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
        value = `/${value}`;
      }
      prev.value += value;
      append({ value });
      if (opts.literalBrackets === false || utils$1.hasRegexChars(prevValue)) {
        continue;
      }
      const escaped = utils$1.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }
    if (value === "{" && opts.nobrace !== true) {
      increment("braces");
      const open = {
        type: "brace",
        value,
        output: "(",
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };
      braces.push(open);
      push(open);
      continue;
    }
    if (value === "}") {
      const brace = braces[braces.length - 1];
      if (opts.nobrace === true || !brace) {
        push({ type: "text", value, output: value });
        continue;
      }
      let output = ")";
      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];
        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === "brace") {
            break;
          }
          if (arr[i].type !== "dots") {
            range.unshift(arr[i].value);
          }
        }
        output = expandRange(range, opts);
        state.backtrack = true;
      }
      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = "\\{";
        value = output = "\\}";
        state.output = out;
        for (const t of toks) {
          state.output += t.output || t.value;
        }
      }
      push({ type: "brace", value, output });
      decrement("braces");
      braces.pop();
      continue;
    }
    if (value === "|") {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: "text", value });
      continue;
    }
    if (value === ",") {
      let output = value;
      const brace = braces[braces.length - 1];
      if (brace && stack[stack.length - 1] === "braces") {
        brace.comma = true;
        output = "|";
      }
      push({ type: "comma", value, output });
      continue;
    }
    if (value === "/") {
      if (prev.type === "dot" && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = "";
        state.output = "";
        tokens.pop();
        prev = bos;
        continue;
      }
      push({ type: "slash", value, output: SLASH_LITERAL2 });
      continue;
    }
    if (value === ".") {
      if (state.braces > 0 && prev.type === "dot") {
        if (prev.value === ".")
          prev.output = DOT_LITERAL2;
        const brace = braces[braces.length - 1];
        prev.type = "dots";
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }
      if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
        push({ type: "text", value, output: DOT_LITERAL2 });
        continue;
      }
      push({ type: "dot", value, output: DOT_LITERAL2 });
      continue;
    }
    if (value === "?") {
      const isGroup = prev && prev.value === "(";
      if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        extglobOpen("qmark", value);
        continue;
      }
      if (prev && prev.type === "paren") {
        const next = peek();
        let output = value;
        if (next === "<" && !utils$1.supportsLookbehinds()) {
          throw new Error("Node.js v10 or higher is required for regex lookbehinds");
        }
        if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
          output = `\\${value}`;
        }
        push({ type: "text", value, output });
        continue;
      }
      if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
        push({ type: "qmark", value, output: QMARK_NO_DOT2 });
        continue;
      }
      push({ type: "qmark", value, output: QMARK2 });
      continue;
    }
    if (value === "!") {
      if (opts.noextglob !== true && peek() === "(") {
        if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
          extglobOpen("negate", value);
          continue;
        }
      }
      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }
    if (value === "+") {
      if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        extglobOpen("plus", value);
        continue;
      }
      if (prev && prev.value === "(" || opts.regex === false) {
        push({ type: "plus", value, output: PLUS_LITERAL2 });
        continue;
      }
      if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
        push({ type: "plus", value });
        continue;
      }
      push({ type: "plus", value: PLUS_LITERAL2 });
      continue;
    }
    if (value === "@") {
      if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        push({ type: "at", extglob: true, value, output: "" });
        continue;
      }
      push({ type: "text", value });
      continue;
    }
    if (value !== "*") {
      if (value === "$" || value === "^") {
        value = `\\${value}`;
      }
      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }
      push({ type: "text", value });
      continue;
    }
    if (prev && (prev.type === "globstar" || prev.star === true)) {
      prev.type = "star";
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }
    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen("star", value);
      continue;
    }
    if (prev.type === "star") {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }
      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === "slash" || prior.type === "bos";
      const afterStar = before && (before.type === "star" || before.type === "globstar");
      if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
        push({ type: "star", value, output: "" });
        continue;
      }
      const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
      const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
      if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
        push({ type: "star", value, output: "" });
        continue;
      }
      while (rest.slice(0, 3) === "/**") {
        const after = input[state.index + 4];
        if (after && after !== "/") {
          break;
        }
        rest = rest.slice(3);
        consume("/**", 3);
      }
      if (prior.type === "bos" && eos()) {
        prev.type = "globstar";
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }
      if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;
        prev.type = "globstar";
        prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }
      if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
        const end = rest[1] !== void 0 ? "|$" : "";
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;
        prev.type = "globstar";
        prev.output = `${globstar(opts)}${SLASH_LITERAL2}|${SLASH_LITERAL2}${end})`;
        prev.value += value;
        state.output += prior.output + prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: "slash", value: "/", output: "" });
        continue;
      }
      if (prior.type === "bos" && rest[0] === "/") {
        prev.type = "globstar";
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL2}|${globstar(opts)}${SLASH_LITERAL2})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: "slash", value: "/", output: "" });
        continue;
      }
      state.output = state.output.slice(0, -prev.output.length);
      prev.type = "globstar";
      prev.output = globstar(opts);
      prev.value += value;
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }
    const token = { type: "star", value, output: star };
    if (opts.bash === true) {
      token.output = ".*?";
      if (prev.type === "bos" || prev.type === "slash") {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }
    if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }
    if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
      if (prev.type === "dot") {
        state.output += NO_DOT_SLASH2;
        prev.output += NO_DOT_SLASH2;
      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH2;
        prev.output += NO_DOTS_SLASH2;
      } else {
        state.output += nodot;
        prev.output += nodot;
      }
      if (peek() !== "*") {
        state.output += ONE_CHAR2;
        prev.output += ONE_CHAR2;
      }
    }
    push(token);
  }
  while (state.brackets > 0) {
    if (opts.strictBrackets === true)
      throw new SyntaxError(syntaxError("closing", "]"));
    state.output = utils$1.escapeLast(state.output, "[");
    decrement("brackets");
  }
  while (state.parens > 0) {
    if (opts.strictBrackets === true)
      throw new SyntaxError(syntaxError("closing", ")"));
    state.output = utils$1.escapeLast(state.output, "(");
    decrement("parens");
  }
  while (state.braces > 0) {
    if (opts.strictBrackets === true)
      throw new SyntaxError(syntaxError("closing", "}"));
    state.output = utils$1.escapeLast(state.output, "{");
    decrement("braces");
  }
  if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
    push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL2}?` });
  }
  if (state.backtrack === true) {
    state.output = "";
    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;
      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }
  return state;
};
parse$1.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }
  input = REPLACEMENTS[input] || input;
  const win322 = utils$1.isWindows(options);
  const {
    DOT_LITERAL: DOT_LITERAL2,
    SLASH_LITERAL: SLASH_LITERAL2,
    ONE_CHAR: ONE_CHAR2,
    DOTS_SLASH: DOTS_SLASH2,
    NO_DOT: NO_DOT2,
    NO_DOTS: NO_DOTS2,
    NO_DOTS_SLASH: NO_DOTS_SLASH2,
    STAR: STAR2,
    START_ANCHOR: START_ANCHOR2
  } = constants$1.globChars(win322);
  const nodot = opts.dot ? NO_DOTS2 : NO_DOT2;
  const slashDot = opts.dot ? NO_DOTS_SLASH2 : NO_DOT2;
  const capture = opts.capture ? "" : "?:";
  const state = { negated: false, prefix: "" };
  let star = opts.bash === true ? ".*?" : STAR2;
  if (opts.capture) {
    star = `(${star})`;
  }
  const globstar = (opts2) => {
    if (opts2.noglobstar === true)
      return star;
    return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
  };
  const create = (str) => {
    switch (str) {
      case "*":
        return `${nodot}${ONE_CHAR2}${star}`;
      case ".*":
        return `${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "*.*":
        return `${nodot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "*/*":
        return `${nodot}${star}${SLASH_LITERAL2}${ONE_CHAR2}${slashDot}${star}`;
      case "**":
        return nodot + globstar(opts);
      case "**/*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${ONE_CHAR2}${star}`;
      case "**/*.*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "**/.*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match)
          return;
        const source2 = create(match[1]);
        if (!source2)
          return;
        return source2 + DOT_LITERAL2 + match[2];
      }
    }
  };
  const output = utils$1.removePrefix(input, state);
  let source = create(output);
  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL2}?`;
  }
  return source;
};
var parse_1 = parse$1;
var path = require$$0$1;
var scan = scan_1;
var parse = parse_1;
var utils = utils$3;
var constants = constants$2;
var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
var picomatch$1 = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map((input) => picomatch$1(input, options, returnState));
    const arrayMatcher = (str) => {
      for (const isMatch of fns) {
        const state2 = isMatch(str);
        if (state2)
          return state2;
      }
      return false;
    };
    return arrayMatcher;
  }
  const isState = isObject(glob) && glob.tokens && glob.input;
  if (glob === "" || typeof glob !== "string" && !isState) {
    throw new TypeError("Expected pattern to be a non-empty string");
  }
  const opts = options || {};
  const posix2 = utils.isWindows(options);
  const regex = isState ? picomatch$1.compileRe(glob, options) : picomatch$1.makeRe(glob, options, false, true);
  const state = regex.state;
  delete regex.state;
  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch$1(opts.ignore, ignoreOpts, returnState);
  }
  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch$1.test(input, regex, options, { glob, posix: posix2 });
    const result = { glob, state, regex, posix: posix2, input, output, match, isMatch };
    if (typeof opts.onResult === "function") {
      opts.onResult(result);
    }
    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }
    if (isIgnored(input)) {
      if (typeof opts.onIgnore === "function") {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }
    if (typeof opts.onMatch === "function") {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };
  if (returnState) {
    matcher.state = state;
  }
  return matcher;
};
picomatch$1.test = (input, regex, options, { glob, posix: posix2 } = {}) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected input to be a string");
  }
  if (input === "") {
    return { isMatch: false, output: "" };
  }
  const opts = options || {};
  const format = opts.format || (posix2 ? utils.toPosixSlashes : null);
  let match = input === glob;
  let output = match && format ? format(input) : input;
  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }
  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch$1.matchBase(input, regex, options, posix2);
    } else {
      match = regex.exec(output);
    }
  }
  return { isMatch: Boolean(match), match, output };
};
picomatch$1.matchBase = (input, glob, options, posix2 = utils.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch$1.makeRe(glob, options);
  return regex.test(path.basename(input));
};
picomatch$1.isMatch = (str, patterns, options) => picomatch$1(patterns, options)(str);
picomatch$1.parse = (pattern, options) => {
  if (Array.isArray(pattern))
    return pattern.map((p) => picomatch$1.parse(p, options));
  return parse(pattern, { ...options, fastpaths: false });
};
picomatch$1.scan = (input, options) => scan(input, options);
picomatch$1.compileRe = (state, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return state.output;
  }
  const opts = options || {};
  const prepend = opts.contains ? "" : "^";
  const append = opts.contains ? "" : "$";
  let source = `${prepend}(?:${state.output})${append}`;
  if (state && state.negated === true) {
    source = `^(?!${source}).*$`;
  }
  const regex = picomatch$1.toRegex(source, options);
  if (returnState === true) {
    regex.state = state;
  }
  return regex;
};
picomatch$1.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== "string") {
    throw new TypeError("Expected a non-empty string");
  }
  let parsed = { negated: false, fastpaths: true };
  if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
    parsed.output = parse.fastpaths(input, options);
  }
  if (!parsed.output) {
    parsed = parse(input, options);
  }
  return picomatch$1.compileRe(parsed, options, returnOutput, returnState);
};
picomatch$1.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
  } catch (err) {
    if (options && options.debug === true)
      throw err;
    return /$^/;
  }
};
picomatch$1.constants = constants;
var picomatch_1 = picomatch$1;
var picomatch = picomatch_1;
var pm = /* @__PURE__ */ getDefaultExportFromCjs(picomatch);
var extractors = {
  ArrayPattern(names, param) {
    for (const element of param.elements) {
      if (element)
        extractors[element.type](names, element);
    }
  },
  AssignmentPattern(names, param) {
    extractors[param.left.type](names, param.left);
  },
  Identifier(names, param) {
    names.push(param.name);
  },
  MemberExpression() {
  },
  ObjectPattern(names, param) {
    for (const prop of param.properties) {
      if (prop.type === "RestElement") {
        extractors.RestElement(names, prop);
      } else {
        extractors[prop.value.type](names, prop.value);
      }
    }
  },
  RestElement(names, param) {
    extractors[param.argument.type](names, param.argument);
  }
};
var extractAssignedNames = function extractAssignedNames2(param) {
  const names = [];
  extractors[param.type](names, param);
  return names;
};
function isArray(arg) {
  return Array.isArray(arg);
}
function ensureArray$1(thing) {
  if (isArray(thing))
    return thing;
  if (thing == null)
    return [];
  return [thing];
}
var normalizePath = function normalizePath2(filename) {
  return filename.split(win32.sep).join(posix.sep);
};
function getMatcherString(id, resolutionBase) {
  if (resolutionBase === false || isAbsolute2(id) || id.startsWith("**")) {
    return normalizePath(id);
  }
  const basePath = normalizePath(resolve(resolutionBase || "")).replace(/[-^$*+?.()|[\]{}]/g, "\\$&");
  return posix.join(basePath, normalizePath(id));
}
var createFilter = function createFilter2(include, exclude, options) {
  const resolutionBase = options && options.resolve;
  const getMatcher = (id) => id instanceof RegExp ? id : {
    test: (what) => {
      const pattern = getMatcherString(id, resolutionBase);
      const fn = pm(pattern, { dot: true });
      const result = fn(what);
      return result;
    }
  };
  const includeMatchers = ensureArray$1(include).map(getMatcher);
  const excludeMatchers = ensureArray$1(exclude).map(getMatcher);
  return function result(id) {
    if (typeof id !== "string")
      return false;
    if (/\0/.test(id))
      return false;
    const pathId = normalizePath(id);
    for (let i = 0; i < excludeMatchers.length; ++i) {
      const matcher = excludeMatchers[i];
      if (matcher.test(pathId))
        return false;
    }
    for (let i = 0; i < includeMatchers.length; ++i) {
      const matcher = includeMatchers[i];
      if (matcher.test(pathId))
        return true;
    }
    return !includeMatchers.length;
  };
};
var reservedWords = "break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public";
var builtins = "arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl";
var forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(" "));
forbiddenIdentifiers.add("");
function createInclusionContext() {
  return {
    brokenFlow: false,
    hasBreak: false,
    hasContinue: false,
    includedCallArguments: /* @__PURE__ */ new Set(),
    includedLabels: /* @__PURE__ */ new Set()
  };
}
function createHasEffectsContext() {
  return {
    accessed: new PathTracker(),
    assigned: new PathTracker(),
    brokenFlow: false,
    called: new DiscriminatedPathTracker(),
    hasBreak: false,
    hasContinue: false,
    ignore: {
      breaks: false,
      continues: false,
      labels: /* @__PURE__ */ new Set(),
      returnYield: false,
      this: false
    },
    includedLabels: /* @__PURE__ */ new Set(),
    instantiated: new DiscriminatedPathTracker(),
    replacedVariableInits: /* @__PURE__ */ new Map()
  };
}
function assembleMemberDescriptions(memberDescriptions, inheritedDescriptions = null) {
  return Object.create(inheritedDescriptions, memberDescriptions);
}
var UNDEFINED_EXPRESSION = new class UndefinedExpression extends ExpressionEntity {
  getLiteralValueAtPath() {
    return void 0;
  }
}();
var returnsUnknown = {
  value: {
    hasEffectsWhenCalled: null,
    returns: UNKNOWN_EXPRESSION
  }
};
var UNKNOWN_LITERAL_BOOLEAN = new class UnknownBoolean extends ExpressionEntity {
  getReturnExpressionWhenCalledAtPath(path2) {
    if (path2.length === 1) {
      return getMemberReturnExpressionWhenCalled(literalBooleanMembers, path2[0]);
    }
    return UNKNOWN_RETURN_EXPRESSION;
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (interaction.type === INTERACTION_ACCESSED) {
      return path2.length > 1;
    }
    if (interaction.type === INTERACTION_CALLED && path2.length === 1) {
      return hasMemberEffectWhenCalled(literalBooleanMembers, path2[0], interaction, context);
    }
    return true;
  }
}();
var returnsBoolean = {
  value: {
    hasEffectsWhenCalled: null,
    returns: UNKNOWN_LITERAL_BOOLEAN
  }
};
var UNKNOWN_LITERAL_NUMBER = new class UnknownNumber extends ExpressionEntity {
  getReturnExpressionWhenCalledAtPath(path2) {
    if (path2.length === 1) {
      return getMemberReturnExpressionWhenCalled(literalNumberMembers, path2[0]);
    }
    return UNKNOWN_RETURN_EXPRESSION;
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (interaction.type === INTERACTION_ACCESSED) {
      return path2.length > 1;
    }
    if (interaction.type === INTERACTION_CALLED && path2.length === 1) {
      return hasMemberEffectWhenCalled(literalNumberMembers, path2[0], interaction, context);
    }
    return true;
  }
}();
var returnsNumber = {
  value: {
    hasEffectsWhenCalled: null,
    returns: UNKNOWN_LITERAL_NUMBER
  }
};
var UNKNOWN_LITERAL_STRING = new class UnknownString extends ExpressionEntity {
  getReturnExpressionWhenCalledAtPath(path2) {
    if (path2.length === 1) {
      return getMemberReturnExpressionWhenCalled(literalStringMembers, path2[0]);
    }
    return UNKNOWN_RETURN_EXPRESSION;
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (interaction.type === INTERACTION_ACCESSED) {
      return path2.length > 1;
    }
    if (interaction.type === INTERACTION_CALLED && path2.length === 1) {
      return hasMemberEffectWhenCalled(literalStringMembers, path2[0], interaction, context);
    }
    return true;
  }
}();
var returnsString = {
  value: {
    hasEffectsWhenCalled: null,
    returns: UNKNOWN_LITERAL_STRING
  }
};
var stringReplace = {
  value: {
    hasEffectsWhenCalled({ args }, context) {
      const argument1 = args[2];
      return args.length < 3 || typeof argument1.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, {
        deoptimizeCache() {
        }
      }) === "symbol" && argument1.hasEffectsOnInteractionAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_CALL, context);
    },
    returns: UNKNOWN_LITERAL_STRING
  }
};
var objectMembers = assembleMemberDescriptions({
  hasOwnProperty: returnsBoolean,
  isPrototypeOf: returnsBoolean,
  propertyIsEnumerable: returnsBoolean,
  toLocaleString: returnsString,
  toString: returnsString,
  valueOf: returnsUnknown
});
var literalBooleanMembers = assembleMemberDescriptions({
  valueOf: returnsBoolean
}, objectMembers);
var literalNumberMembers = assembleMemberDescriptions({
  toExponential: returnsString,
  toFixed: returnsString,
  toLocaleString: returnsString,
  toPrecision: returnsString,
  valueOf: returnsNumber
}, objectMembers);
var literalRegExpMembers = assembleMemberDescriptions({
  exec: returnsUnknown,
  test: returnsBoolean
}, objectMembers);
var literalStringMembers = assembleMemberDescriptions({
  anchor: returnsString,
  at: returnsUnknown,
  big: returnsString,
  blink: returnsString,
  bold: returnsString,
  charAt: returnsString,
  charCodeAt: returnsNumber,
  codePointAt: returnsUnknown,
  concat: returnsString,
  endsWith: returnsBoolean,
  fixed: returnsString,
  fontcolor: returnsString,
  fontsize: returnsString,
  includes: returnsBoolean,
  indexOf: returnsNumber,
  italics: returnsString,
  lastIndexOf: returnsNumber,
  link: returnsString,
  localeCompare: returnsNumber,
  match: returnsUnknown,
  matchAll: returnsUnknown,
  normalize: returnsString,
  padEnd: returnsString,
  padStart: returnsString,
  repeat: returnsString,
  replace: stringReplace,
  replaceAll: stringReplace,
  search: returnsNumber,
  slice: returnsString,
  small: returnsString,
  split: returnsUnknown,
  startsWith: returnsBoolean,
  strike: returnsString,
  sub: returnsString,
  substr: returnsString,
  substring: returnsString,
  sup: returnsString,
  toLocaleLowerCase: returnsString,
  toLocaleUpperCase: returnsString,
  toLowerCase: returnsString,
  toString: returnsString,
  // overrides the toString() method of the Object object; it does not inherit Object.prototype.toString()
  toUpperCase: returnsString,
  trim: returnsString,
  trimEnd: returnsString,
  trimLeft: returnsString,
  trimRight: returnsString,
  trimStart: returnsString,
  valueOf: returnsString
}, objectMembers);
function getLiteralMembersForValue(value) {
  if (value instanceof RegExp) {
    return literalRegExpMembers;
  }
  switch (typeof value) {
    case "boolean": {
      return literalBooleanMembers;
    }
    case "number": {
      return literalNumberMembers;
    }
    case "string": {
      return literalStringMembers;
    }
  }
  return /* @__PURE__ */ Object.create(null);
}
function hasMemberEffectWhenCalled(members, memberName, interaction, context) {
  if (typeof memberName !== "string" || !members[memberName]) {
    return true;
  }
  return members[memberName].hasEffectsWhenCalled?.(interaction, context) || false;
}
function getMemberReturnExpressionWhenCalled(members, memberName) {
  if (typeof memberName !== "string" || !members[memberName])
    return UNKNOWN_RETURN_EXPRESSION;
  return [members[memberName].returns, false];
}
var childNodeKeys = {
  ArrayExpression: ["elements"],
  ArrayPattern: ["elements"],
  ArrowFunctionExpression: ["params", "body"],
  AssignmentExpression: ["left", "right"],
  AssignmentPattern: ["left", "right"],
  AwaitExpression: ["argument"],
  BinaryExpression: ["left", "right"],
  BlockStatement: ["body"],
  BreakStatement: ["label"],
  CallExpression: ["callee", "arguments"],
  CatchClause: ["param", "body"],
  ChainExpression: ["expression"],
  ClassBody: ["body"],
  ClassDeclaration: ["id", "superClass", "body"],
  ClassExpression: ["id", "superClass", "body"],
  ConditionalExpression: ["test", "consequent", "alternate"],
  ContinueStatement: ["label"],
  DebuggerStatement: [],
  DoWhileStatement: ["body", "test"],
  EmptyStatement: [],
  ExportAllDeclaration: ["exported", "source", "attributes"],
  ExportDefaultDeclaration: ["declaration"],
  ExportNamedDeclaration: ["specifiers", "source", "attributes", "declaration"],
  ExportSpecifier: ["local", "exported"],
  ExpressionStatement: ["expression"],
  ForInStatement: ["left", "right", "body"],
  ForOfStatement: ["left", "right", "body"],
  ForStatement: ["init", "test", "update", "body"],
  FunctionDeclaration: ["id", "params", "body"],
  FunctionExpression: ["id", "params", "body"],
  Identifier: [],
  IfStatement: ["test", "consequent", "alternate"],
  ImportAttribute: ["key", "value"],
  ImportDeclaration: ["specifiers", "source", "attributes"],
  ImportDefaultSpecifier: ["local"],
  ImportExpression: ["source", "options"],
  ImportNamespaceSpecifier: ["local"],
  ImportSpecifier: ["imported", "local"],
  LabeledStatement: ["label", "body"],
  Literal: [],
  LogicalExpression: ["left", "right"],
  MemberExpression: ["object", "property"],
  MetaProperty: ["meta", "property"],
  MethodDefinition: ["key", "value"],
  NewExpression: ["callee", "arguments"],
  ObjectExpression: ["properties"],
  ObjectPattern: ["properties"],
  PanicError: [],
  ParseError: [],
  PrivateIdentifier: [],
  Program: ["body"],
  Property: ["key", "value"],
  PropertyDefinition: ["key", "value"],
  RestElement: ["argument"],
  ReturnStatement: ["argument"],
  SequenceExpression: ["expressions"],
  SpreadElement: ["argument"],
  StaticBlock: ["body"],
  Super: [],
  SwitchCase: ["test", "consequent"],
  SwitchStatement: ["discriminant", "cases"],
  TaggedTemplateExpression: ["tag", "quasi"],
  TemplateElement: [],
  TemplateLiteral: ["quasis", "expressions"],
  ThisExpression: [],
  ThrowStatement: ["argument"],
  TryStatement: ["block", "handler", "finalizer"],
  UnaryExpression: ["argument"],
  UpdateExpression: ["argument"],
  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["id", "init"],
  WhileStatement: ["test", "body"],
  YieldExpression: ["argument"]
};
var INCLUDE_PARAMETERS = "variables";
var NodeBase = class extends ExpressionEntity {
  /**
   * Nodes can apply custom deoptimizations once they become part of the
   * executed code. To do this, they must initialize this as false, implement
   * applyDeoptimizations and call this from include and hasEffects if they have
   * custom handlers
   */
  get deoptimized() {
    return isFlagSet(
      this.flags,
      2
      /* Flag.deoptimized */
    );
  }
  set deoptimized(value) {
    this.flags = setFlag(this.flags, 2, value);
  }
  constructor(parent, parentScope) {
    super();
    this.parent = parent;
    this.scope = parentScope;
    this.createScope(parentScope);
  }
  addExportedVariables(_variables, _exportNamesByVariable) {
  }
  /**
   * Override this to bind assignments to variables and do any initialisations
   * that require the scopes to be populated with variables.
   */
  bind() {
    for (const key of childNodeKeys[this.type]) {
      const value = this[key];
      if (Array.isArray(value)) {
        for (const child of value) {
          child?.bind();
        }
      } else if (value) {
        value.bind();
      }
    }
  }
  /**
   * Override if this node should receive a different scope than the parent
   * scope.
   */
  createScope(parentScope) {
    this.scope = parentScope;
  }
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    for (const key of childNodeKeys[this.type]) {
      const value = this[key];
      if (value === null)
        continue;
      if (Array.isArray(value)) {
        for (const child of value) {
          if (child?.hasEffects(context))
            return true;
        }
      } else if (value.hasEffects(context))
        return true;
    }
    return false;
  }
  hasEffectsAsAssignmentTarget(context, _checkAccess) {
    return this.hasEffects(context) || this.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.assignmentInteraction, context);
  }
  include(context, includeChildrenRecursively, _options) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    this.included = true;
    for (const key of childNodeKeys[this.type]) {
      const value = this[key];
      if (value === null)
        continue;
      if (Array.isArray(value)) {
        for (const child of value) {
          child?.include(context, includeChildrenRecursively);
        }
      } else {
        value.include(context, includeChildrenRecursively);
      }
    }
  }
  includeAsAssignmentTarget(context, includeChildrenRecursively, _deoptimizeAccess) {
    this.include(context, includeChildrenRecursively);
  }
  /**
   * Override to perform special initialisation steps after the scope is
   * initialised
   */
  initialise() {
    this.scope.context.magicString.addSourcemapLocation(this.start);
    this.scope.context.magicString.addSourcemapLocation(this.end);
  }
  parseNode(esTreeNode) {
    for (const [key, value] of Object.entries(esTreeNode)) {
      if (this.hasOwnProperty(key))
        continue;
      if (key.charCodeAt(0) === 95) {
        if (key === ANNOTATION_KEY) {
          this.annotations = value;
        } else if (key === INVALID_ANNOTATION_KEY) {
          this.invalidAnnotations = value;
        }
      } else if (typeof value !== "object" || value === null) {
        this[key] = value;
      } else if (Array.isArray(value)) {
        this[key] = [];
        for (const child of value) {
          this[key].push(child === null ? null : new (this.scope.context.getNodeConstructor(child.type))(this, this.scope).parseNode(child));
        }
      } else {
        this[key] = new (this.scope.context.getNodeConstructor(value.type))(this, this.scope).parseNode(value);
      }
    }
    childNodeKeys[esTreeNode.type] ||= createChildNodeKeysForNode(esTreeNode);
    this.initialise();
    return this;
  }
  removeAnnotations(code) {
    if (this.annotations) {
      for (const annotation of this.annotations) {
        code.remove(annotation.start, annotation.end);
      }
    }
  }
  render(code, options) {
    for (const key of childNodeKeys[this.type]) {
      const value = this[key];
      if (value === null)
        continue;
      if (Array.isArray(value)) {
        for (const child of value) {
          child?.render(code, options);
        }
      } else {
        value.render(code, options);
      }
    }
  }
  setAssignedValue(value) {
    this.assignmentInteraction = { args: [null, value], type: INTERACTION_ASSIGNED };
  }
  shouldBeIncluded(context) {
    return this.included || !context.brokenFlow && this.hasEffects(createHasEffectsContext());
  }
  /**
   * Just deoptimize everything by default so that when e.g. we do not track
   * something properly, it is deoptimized.
   * @protected
   */
  applyDeoptimizations() {
    this.deoptimized = true;
    for (const key of childNodeKeys[this.type]) {
      const value = this[key];
      if (value === null)
        continue;
      if (Array.isArray(value)) {
        for (const child of value) {
          child?.deoptimizePath(UNKNOWN_PATH);
        }
      } else {
        value.deoptimizePath(UNKNOWN_PATH);
      }
    }
    this.scope.context.requestTreeshakingPass();
  }
};
function createChildNodeKeysForNode(esTreeNode) {
  return Object.keys(esTreeNode).filter(
    (key) => typeof esTreeNode[key] === "object" && key.charCodeAt(0) !== 95
    /* _ */
  );
}
var SpreadElement = class extends NodeBase {
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    if (path2.length > 0) {
      this.argument.deoptimizeArgumentsOnInteractionAtPath(interaction, [UnknownKey, ...path2], recursionTracker);
    }
  }
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    const { propertyReadSideEffects } = this.scope.context.options.treeshake;
    return this.argument.hasEffects(context) || propertyReadSideEffects && (propertyReadSideEffects === "always" || this.argument.hasEffectsOnInteractionAtPath(UNKNOWN_PATH, NODE_INTERACTION_UNKNOWN_ACCESS, context));
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    this.argument.deoptimizePath([UnknownKey, UnknownKey]);
    this.scope.context.requestTreeshakingPass();
  }
};
var Method = class extends ExpressionEntity {
  constructor(description) {
    super();
    this.description = description;
  }
  deoptimizeArgumentsOnInteractionAtPath({ args, type }, path2) {
    if (type === INTERACTION_CALLED && path2.length === 0) {
      if (this.description.mutatesSelfAsArray) {
        args[0]?.deoptimizePath(UNKNOWN_INTEGER_PATH);
      }
      if (this.description.mutatesArgs) {
        for (let index = 1; index < args.length; index++) {
          args[index].deoptimizePath(UNKNOWN_PATH);
        }
      }
    }
  }
  getReturnExpressionWhenCalledAtPath(path2, { args }) {
    if (path2.length > 0) {
      return UNKNOWN_RETURN_EXPRESSION;
    }
    return [
      this.description.returnsPrimitive || (this.description.returns === "self" ? args[0] || UNKNOWN_EXPRESSION : this.description.returns()),
      false
    ];
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    const { type } = interaction;
    if (path2.length > (type === INTERACTION_ACCESSED ? 1 : 0)) {
      return true;
    }
    if (type === INTERACTION_CALLED) {
      const { args } = interaction;
      if (this.description.mutatesSelfAsArray === true && args[0]?.hasEffectsOnInteractionAtPath(UNKNOWN_INTEGER_PATH, NODE_INTERACTION_UNKNOWN_ASSIGNMENT, context)) {
        return true;
      }
      if (this.description.callsArgs) {
        for (const argumentIndex of this.description.callsArgs) {
          if (args[argumentIndex + 1]?.hasEffectsOnInteractionAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_CALL, context)) {
            return true;
          }
        }
      }
    }
    return false;
  }
};
var METHOD_RETURNS_BOOLEAN = [
  new Method({
    callsArgs: null,
    mutatesArgs: false,
    mutatesSelfAsArray: false,
    returns: null,
    returnsPrimitive: UNKNOWN_LITERAL_BOOLEAN
  })
];
var METHOD_RETURNS_STRING = [
  new Method({
    callsArgs: null,
    mutatesArgs: false,
    mutatesSelfAsArray: false,
    returns: null,
    returnsPrimitive: UNKNOWN_LITERAL_STRING
  })
];
var METHOD_RETURNS_NUMBER = [
  new Method({
    callsArgs: null,
    mutatesArgs: false,
    mutatesSelfAsArray: false,
    returns: null,
    returnsPrimitive: UNKNOWN_LITERAL_NUMBER
  })
];
var METHOD_RETURNS_UNKNOWN = [
  new Method({
    callsArgs: null,
    mutatesArgs: false,
    mutatesSelfAsArray: false,
    returns: null,
    returnsPrimitive: UNKNOWN_EXPRESSION
  })
];
var INTEGER_REG_EXP = /^\d+$/;
var ObjectEntity = class extends ExpressionEntity {
  get hasLostTrack() {
    return isFlagSet(
      this.flags,
      2048
      /* Flag.hasLostTrack */
    );
  }
  set hasLostTrack(value) {
    this.flags = setFlag(this.flags, 2048, value);
  }
  get hasUnknownDeoptimizedInteger() {
    return isFlagSet(
      this.flags,
      4096
      /* Flag.hasUnknownDeoptimizedInteger */
    );
  }
  set hasUnknownDeoptimizedInteger(value) {
    this.flags = setFlag(this.flags, 4096, value);
  }
  get hasUnknownDeoptimizedProperty() {
    return isFlagSet(
      this.flags,
      8192
      /* Flag.hasUnknownDeoptimizedProperty */
    );
  }
  set hasUnknownDeoptimizedProperty(value) {
    this.flags = setFlag(this.flags, 8192, value);
  }
  // If a PropertyMap is used, this will be taken as propertiesAndGettersByKey
  // and we assume there are no setters or getters
  constructor(properties, prototypeExpression, immutable = false) {
    super();
    this.prototypeExpression = prototypeExpression;
    this.immutable = immutable;
    this.additionalExpressionsToBeDeoptimized = /* @__PURE__ */ new Set();
    this.allProperties = [];
    this.deoptimizedPaths = /* @__PURE__ */ Object.create(null);
    this.expressionsToBeDeoptimizedByKey = /* @__PURE__ */ Object.create(null);
    this.gettersByKey = /* @__PURE__ */ Object.create(null);
    this.propertiesAndGettersByKey = /* @__PURE__ */ Object.create(null);
    this.propertiesAndSettersByKey = /* @__PURE__ */ Object.create(null);
    this.settersByKey = /* @__PURE__ */ Object.create(null);
    this.unknownIntegerProps = [];
    this.unmatchableGetters = [];
    this.unmatchablePropertiesAndGetters = [];
    this.unmatchableSetters = [];
    if (Array.isArray(properties)) {
      this.buildPropertyMaps(properties);
    } else {
      this.propertiesAndGettersByKey = this.propertiesAndSettersByKey = properties;
      for (const propertiesForKey of Object.values(properties)) {
        this.allProperties.push(...propertiesForKey);
      }
    }
  }
  deoptimizeAllProperties(noAccessors) {
    const isDeoptimized = this.hasLostTrack || this.hasUnknownDeoptimizedProperty;
    if (noAccessors) {
      this.hasUnknownDeoptimizedProperty = true;
    } else {
      this.hasLostTrack = true;
    }
    if (isDeoptimized) {
      return;
    }
    for (const properties of [
      ...Object.values(this.propertiesAndGettersByKey),
      ...Object.values(this.settersByKey)
    ]) {
      for (const property2 of properties) {
        property2.deoptimizePath(UNKNOWN_PATH);
      }
    }
    this.prototypeExpression?.deoptimizePath([UnknownKey, UnknownKey]);
    this.deoptimizeCachedEntities();
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    const [key, ...subPath] = path2;
    const { args, type } = interaction;
    if (this.hasLostTrack || // single paths that are deoptimized will not become getters or setters
    (type === INTERACTION_CALLED || path2.length > 1) && (this.hasUnknownDeoptimizedProperty || typeof key === "string" && this.deoptimizedPaths[key])) {
      deoptimizeInteraction(interaction);
      return;
    }
    const [propertiesForExactMatchByKey, relevantPropertiesByKey, relevantUnmatchableProperties] = type === INTERACTION_CALLED || path2.length > 1 ? [
      this.propertiesAndGettersByKey,
      this.propertiesAndGettersByKey,
      this.unmatchablePropertiesAndGetters
    ] : type === INTERACTION_ACCESSED ? [this.propertiesAndGettersByKey, this.gettersByKey, this.unmatchableGetters] : [this.propertiesAndSettersByKey, this.settersByKey, this.unmatchableSetters];
    if (typeof key === "string") {
      if (propertiesForExactMatchByKey[key]) {
        const properties = relevantPropertiesByKey[key];
        if (properties) {
          for (const property2 of properties) {
            property2.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
          }
        }
        if (!this.immutable) {
          for (const argument of args) {
            if (argument) {
              this.additionalExpressionsToBeDeoptimized.add(argument);
            }
          }
        }
        return;
      }
      for (const property2 of relevantUnmatchableProperties) {
        property2.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
      }
      if (INTEGER_REG_EXP.test(key)) {
        for (const property2 of this.unknownIntegerProps) {
          property2.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
        }
      }
    } else {
      for (const properties of [
        ...Object.values(relevantPropertiesByKey),
        relevantUnmatchableProperties
      ]) {
        for (const property2 of properties) {
          property2.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
        }
      }
      for (const property2 of this.unknownIntegerProps) {
        property2.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
      }
    }
    if (!this.immutable) {
      for (const argument of args) {
        if (argument) {
          this.additionalExpressionsToBeDeoptimized.add(argument);
        }
      }
    }
    this.prototypeExpression?.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizeIntegerProperties() {
    if (this.hasLostTrack || this.hasUnknownDeoptimizedProperty || this.hasUnknownDeoptimizedInteger) {
      return;
    }
    this.hasUnknownDeoptimizedInteger = true;
    for (const [key, propertiesAndGetters] of Object.entries(this.propertiesAndGettersByKey)) {
      if (INTEGER_REG_EXP.test(key)) {
        for (const property2 of propertiesAndGetters) {
          property2.deoptimizePath(UNKNOWN_PATH);
        }
      }
    }
    this.deoptimizeCachedIntegerEntities();
  }
  // Assumption: If only a specific path is deoptimized, no accessors are created
  deoptimizePath(path2) {
    if (this.hasLostTrack || this.immutable) {
      return;
    }
    const key = path2[0];
    if (path2.length === 1) {
      if (typeof key !== "string") {
        if (key === UnknownInteger) {
          return this.deoptimizeIntegerProperties();
        }
        return this.deoptimizeAllProperties(key === UnknownNonAccessorKey);
      }
      if (!this.deoptimizedPaths[key]) {
        this.deoptimizedPaths[key] = true;
        const expressionsToBeDeoptimized = this.expressionsToBeDeoptimizedByKey[key];
        if (expressionsToBeDeoptimized) {
          for (const expression of expressionsToBeDeoptimized) {
            expression.deoptimizeCache();
          }
        }
      }
    }
    const subPath = path2.length === 1 ? UNKNOWN_PATH : path2.slice(1);
    for (const property2 of typeof key === "string" ? [
      ...this.propertiesAndGettersByKey[key] || this.unmatchablePropertiesAndGetters,
      ...this.settersByKey[key] || this.unmatchableSetters
    ] : this.allProperties) {
      property2.deoptimizePath(subPath);
    }
    this.prototypeExpression?.deoptimizePath(path2.length === 1 ? [...path2, UnknownKey] : path2);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    if (path2.length === 0) {
      return UnknownTruthyValue;
    }
    const key = path2[0];
    const expressionAtPath = this.getMemberExpressionAndTrackDeopt(key, origin);
    if (expressionAtPath) {
      return expressionAtPath.getLiteralValueAtPath(path2.slice(1), recursionTracker, origin);
    }
    if (this.prototypeExpression) {
      return this.prototypeExpression.getLiteralValueAtPath(path2, recursionTracker, origin);
    }
    if (path2.length === 1) {
      return void 0;
    }
    return UnknownValue;
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    if (path2.length === 0) {
      return UNKNOWN_RETURN_EXPRESSION;
    }
    const [key, ...subPath] = path2;
    const expressionAtPath = this.getMemberExpressionAndTrackDeopt(key, origin);
    if (expressionAtPath) {
      return expressionAtPath.getReturnExpressionWhenCalledAtPath(subPath, interaction, recursionTracker, origin);
    }
    if (this.prototypeExpression) {
      return this.prototypeExpression.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
    }
    return UNKNOWN_RETURN_EXPRESSION;
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    const [key, ...subPath] = path2;
    if (subPath.length > 0 || interaction.type === INTERACTION_CALLED) {
      const expressionAtPath = this.getMemberExpression(key);
      if (expressionAtPath) {
        return expressionAtPath.hasEffectsOnInteractionAtPath(subPath, interaction, context);
      }
      if (this.prototypeExpression) {
        return this.prototypeExpression.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      return true;
    }
    if (key === UnknownNonAccessorKey)
      return false;
    if (this.hasLostTrack)
      return true;
    const [propertiesAndAccessorsByKey, accessorsByKey, unmatchableAccessors] = interaction.type === INTERACTION_ACCESSED ? [this.propertiesAndGettersByKey, this.gettersByKey, this.unmatchableGetters] : [this.propertiesAndSettersByKey, this.settersByKey, this.unmatchableSetters];
    if (typeof key === "string") {
      if (propertiesAndAccessorsByKey[key]) {
        const accessors = accessorsByKey[key];
        if (accessors) {
          for (const accessor of accessors) {
            if (accessor.hasEffectsOnInteractionAtPath(subPath, interaction, context))
              return true;
          }
        }
        return false;
      }
      for (const accessor of unmatchableAccessors) {
        if (accessor.hasEffectsOnInteractionAtPath(subPath, interaction, context)) {
          return true;
        }
      }
    } else {
      for (const accessors of [...Object.values(accessorsByKey), unmatchableAccessors]) {
        for (const accessor of accessors) {
          if (accessor.hasEffectsOnInteractionAtPath(subPath, interaction, context))
            return true;
        }
      }
    }
    if (this.prototypeExpression) {
      return this.prototypeExpression.hasEffectsOnInteractionAtPath(path2, interaction, context);
    }
    return false;
  }
  buildPropertyMaps(properties) {
    const { allProperties, propertiesAndGettersByKey, propertiesAndSettersByKey, settersByKey, gettersByKey, unknownIntegerProps, unmatchablePropertiesAndGetters, unmatchableGetters, unmatchableSetters } = this;
    const unmatchablePropertiesAndSetters = [];
    for (let index = properties.length - 1; index >= 0; index--) {
      const { key, kind, property: property2 } = properties[index];
      allProperties.push(property2);
      if (typeof key === "string") {
        if (kind === "set") {
          if (!propertiesAndSettersByKey[key]) {
            propertiesAndSettersByKey[key] = [property2, ...unmatchablePropertiesAndSetters];
            settersByKey[key] = [property2, ...unmatchableSetters];
          }
        } else if (kind === "get") {
          if (!propertiesAndGettersByKey[key]) {
            propertiesAndGettersByKey[key] = [property2, ...unmatchablePropertiesAndGetters];
            gettersByKey[key] = [property2, ...unmatchableGetters];
          }
        } else {
          if (!propertiesAndSettersByKey[key]) {
            propertiesAndSettersByKey[key] = [property2, ...unmatchablePropertiesAndSetters];
          }
          if (!propertiesAndGettersByKey[key]) {
            propertiesAndGettersByKey[key] = [property2, ...unmatchablePropertiesAndGetters];
          }
        }
      } else {
        if (key === UnknownInteger) {
          unknownIntegerProps.push(property2);
          continue;
        }
        if (kind === "set")
          unmatchableSetters.push(property2);
        if (kind === "get")
          unmatchableGetters.push(property2);
        if (kind !== "get")
          unmatchablePropertiesAndSetters.push(property2);
        if (kind !== "set")
          unmatchablePropertiesAndGetters.push(property2);
      }
    }
  }
  deoptimizeCachedEntities() {
    for (const expressionsToBeDeoptimized of Object.values(this.expressionsToBeDeoptimizedByKey)) {
      for (const expression of expressionsToBeDeoptimized) {
        expression.deoptimizeCache();
      }
    }
    for (const expression of this.additionalExpressionsToBeDeoptimized) {
      expression.deoptimizePath(UNKNOWN_PATH);
    }
  }
  deoptimizeCachedIntegerEntities() {
    for (const [key, expressionsToBeDeoptimized] of Object.entries(this.expressionsToBeDeoptimizedByKey)) {
      if (INTEGER_REG_EXP.test(key)) {
        for (const expression of expressionsToBeDeoptimized) {
          expression.deoptimizeCache();
        }
      }
    }
    for (const expression of this.additionalExpressionsToBeDeoptimized) {
      expression.deoptimizePath(UNKNOWN_INTEGER_PATH);
    }
  }
  getMemberExpression(key) {
    if (this.hasLostTrack || this.hasUnknownDeoptimizedProperty || typeof key !== "string" || this.hasUnknownDeoptimizedInteger && INTEGER_REG_EXP.test(key) || this.deoptimizedPaths[key]) {
      return UNKNOWN_EXPRESSION;
    }
    const properties = this.propertiesAndGettersByKey[key];
    if (properties?.length === 1) {
      return properties[0];
    }
    if (properties || this.unmatchablePropertiesAndGetters.length > 0 || this.unknownIntegerProps.length > 0 && INTEGER_REG_EXP.test(key)) {
      return UNKNOWN_EXPRESSION;
    }
    return null;
  }
  getMemberExpressionAndTrackDeopt(key, origin) {
    if (typeof key !== "string") {
      return UNKNOWN_EXPRESSION;
    }
    const expression = this.getMemberExpression(key);
    if (!(expression === UNKNOWN_EXPRESSION || this.immutable)) {
      const expressionsToBeDeoptimized = this.expressionsToBeDeoptimizedByKey[key] = this.expressionsToBeDeoptimizedByKey[key] || [];
      expressionsToBeDeoptimized.push(origin);
    }
    return expression;
  }
};
var isInteger = (property2) => typeof property2 === "string" && /^\d+$/.test(property2);
var OBJECT_PROTOTYPE_FALLBACK = new class ObjectPrototypeFallbackExpression extends ExpressionEntity {
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2) {
    if (interaction.type === INTERACTION_CALLED && path2.length === 1 && !isInteger(path2[0])) {
      deoptimizeInteraction(interaction);
    }
  }
  getLiteralValueAtPath(path2) {
    return path2.length === 1 && isInteger(path2[0]) ? void 0 : UnknownValue;
  }
  hasEffectsOnInteractionAtPath(path2, { type }) {
    return path2.length > 1 || type === INTERACTION_CALLED;
  }
}();
var OBJECT_PROTOTYPE = new ObjectEntity({
  __proto__: null,
  hasOwnProperty: METHOD_RETURNS_BOOLEAN,
  isPrototypeOf: METHOD_RETURNS_BOOLEAN,
  propertyIsEnumerable: METHOD_RETURNS_BOOLEAN,
  toLocaleString: METHOD_RETURNS_STRING,
  toString: METHOD_RETURNS_STRING,
  valueOf: METHOD_RETURNS_UNKNOWN
}, OBJECT_PROTOTYPE_FALLBACK, true);
var NEW_ARRAY_PROPERTIES = [
  { key: UnknownInteger, kind: "init", property: UNKNOWN_EXPRESSION },
  { key: "length", kind: "init", property: UNKNOWN_LITERAL_NUMBER }
];
var METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_BOOLEAN = [
  new Method({
    callsArgs: [0],
    mutatesArgs: false,
    mutatesSelfAsArray: "deopt-only",
    returns: null,
    returnsPrimitive: UNKNOWN_LITERAL_BOOLEAN
  })
];
var METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NUMBER = [
  new Method({
    callsArgs: [0],
    mutatesArgs: false,
    mutatesSelfAsArray: "deopt-only",
    returns: null,
    returnsPrimitive: UNKNOWN_LITERAL_NUMBER
  })
];
var METHOD_MUTATES_SELF_RETURNS_NEW_ARRAY = [
  new Method({
    callsArgs: null,
    mutatesArgs: false,
    mutatesSelfAsArray: true,
    returns: () => new ObjectEntity(NEW_ARRAY_PROPERTIES, ARRAY_PROTOTYPE),
    returnsPrimitive: null
  })
];
var METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY = [
  new Method({
    callsArgs: null,
    mutatesArgs: false,
    mutatesSelfAsArray: "deopt-only",
    returns: () => new ObjectEntity(NEW_ARRAY_PROPERTIES, ARRAY_PROTOTYPE),
    returnsPrimitive: null
  })
];
var METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NEW_ARRAY = [
  new Method({
    callsArgs: [0],
    mutatesArgs: false,
    mutatesSelfAsArray: "deopt-only",
    returns: () => new ObjectEntity(NEW_ARRAY_PROPERTIES, ARRAY_PROTOTYPE),
    returnsPrimitive: null
  })
];
var METHOD_MUTATES_SELF_AND_ARGS_RETURNS_NUMBER = [
  new Method({
    callsArgs: null,
    mutatesArgs: true,
    mutatesSelfAsArray: true,
    returns: null,
    returnsPrimitive: UNKNOWN_LITERAL_NUMBER
  })
];
var METHOD_MUTATES_SELF_RETURNS_UNKNOWN = [
  new Method({
    callsArgs: null,
    mutatesArgs: false,
    mutatesSelfAsArray: true,
    returns: null,
    returnsPrimitive: UNKNOWN_EXPRESSION
  })
];
var METHOD_DEOPTS_SELF_RETURNS_UNKNOWN = [
  new Method({
    callsArgs: null,
    mutatesArgs: false,
    mutatesSelfAsArray: "deopt-only",
    returns: null,
    returnsPrimitive: UNKNOWN_EXPRESSION
  })
];
var METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN = [
  new Method({
    callsArgs: [0],
    mutatesArgs: false,
    mutatesSelfAsArray: "deopt-only",
    returns: null,
    returnsPrimitive: UNKNOWN_EXPRESSION
  })
];
var METHOD_MUTATES_SELF_RETURNS_SELF = [
  new Method({
    callsArgs: null,
    mutatesArgs: false,
    mutatesSelfAsArray: true,
    returns: "self",
    returnsPrimitive: null
  })
];
var METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_SELF = [
  new Method({
    callsArgs: [0],
    mutatesArgs: false,
    mutatesSelfAsArray: true,
    returns: "self",
    returnsPrimitive: null
  })
];
var ARRAY_PROTOTYPE = new ObjectEntity({
  __proto__: null,
  // We assume that accessors have effects as we do not track the accessed value afterwards
  at: METHOD_DEOPTS_SELF_RETURNS_UNKNOWN,
  concat: METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY,
  copyWithin: METHOD_MUTATES_SELF_RETURNS_SELF,
  entries: METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY,
  every: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_BOOLEAN,
  fill: METHOD_MUTATES_SELF_RETURNS_SELF,
  filter: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NEW_ARRAY,
  find: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
  findIndex: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NUMBER,
  findLast: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
  findLastIndex: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NUMBER,
  flat: METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY,
  flatMap: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NEW_ARRAY,
  forEach: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
  includes: METHOD_RETURNS_BOOLEAN,
  indexOf: METHOD_RETURNS_NUMBER,
  join: METHOD_RETURNS_STRING,
  keys: METHOD_RETURNS_UNKNOWN,
  lastIndexOf: METHOD_RETURNS_NUMBER,
  map: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NEW_ARRAY,
  pop: METHOD_MUTATES_SELF_RETURNS_UNKNOWN,
  push: METHOD_MUTATES_SELF_AND_ARGS_RETURNS_NUMBER,
  reduce: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
  reduceRight: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
  reverse: METHOD_MUTATES_SELF_RETURNS_SELF,
  shift: METHOD_MUTATES_SELF_RETURNS_UNKNOWN,
  slice: METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY,
  some: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_BOOLEAN,
  sort: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_SELF,
  splice: METHOD_MUTATES_SELF_RETURNS_NEW_ARRAY,
  toLocaleString: METHOD_RETURNS_STRING,
  toString: METHOD_RETURNS_STRING,
  unshift: METHOD_MUTATES_SELF_AND_ARGS_RETURNS_NUMBER,
  values: METHOD_DEOPTS_SELF_RETURNS_UNKNOWN
}, OBJECT_PROTOTYPE, true);
var ArrayExpression = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.objectEntity = null;
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizePath(path2) {
    this.getObjectEntity().deoptimizePath(path2);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    return this.getObjectEntity().getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return this.getObjectEntity().hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    let hasSpread = false;
    for (let index = 0; index < this.elements.length; index++) {
      const element = this.elements[index];
      if (element && (hasSpread || element instanceof SpreadElement)) {
        hasSpread = true;
        element.deoptimizePath(UNKNOWN_PATH);
      }
    }
    this.scope.context.requestTreeshakingPass();
  }
  getObjectEntity() {
    if (this.objectEntity !== null) {
      return this.objectEntity;
    }
    const properties = [
      { key: "length", kind: "init", property: UNKNOWN_LITERAL_NUMBER }
    ];
    let hasSpread = false;
    for (let index = 0; index < this.elements.length; index++) {
      const element = this.elements[index];
      if (hasSpread || element instanceof SpreadElement) {
        if (element) {
          hasSpread = true;
          properties.unshift({ key: UnknownInteger, kind: "init", property: element });
        }
      } else if (element) {
        properties.push({ key: String(index), kind: "init", property: element });
      } else {
        properties.push({ key: String(index), kind: "init", property: UNDEFINED_EXPRESSION });
      }
    }
    return this.objectEntity = new ObjectEntity(properties, ARRAY_PROTOTYPE);
  }
};
var ArrayPattern = class extends NodeBase {
  addExportedVariables(variables, exportNamesByVariable) {
    for (const element of this.elements) {
      element?.addExportedVariables(variables, exportNamesByVariable);
    }
  }
  declare(kind) {
    const variables = [];
    for (const element of this.elements) {
      if (element !== null) {
        variables.push(...element.declare(kind, UNKNOWN_EXPRESSION));
      }
    }
    return variables;
  }
  // Patterns can only be deoptimized at the empty path at the moment
  deoptimizePath() {
    for (const element of this.elements) {
      element?.deoptimizePath(EMPTY_PATH);
    }
  }
  // Patterns are only checked at the emtpy path at the moment
  hasEffectsOnInteractionAtPath(_path, interaction, context) {
    for (const element of this.elements) {
      if (element?.hasEffectsOnInteractionAtPath(EMPTY_PATH, interaction, context))
        return true;
    }
    return false;
  }
  markDeclarationReached() {
    for (const element of this.elements) {
      element?.markDeclarationReached();
    }
  }
};
var LocalVariable = class extends Variable {
  constructor(name, declarator, init2, context, kind) {
    super(name);
    this.init = init2;
    this.calledFromTryStatement = false;
    this.additionalInitializers = null;
    this.expressionsToBeDeoptimized = [];
    this.declarations = declarator ? [declarator] : [];
    this.deoptimizationTracker = context.deoptimizationTracker;
    this.module = context.module;
    this.kind = kind;
  }
  addDeclaration(identifier2, init2) {
    this.declarations.push(identifier2);
    this.markInitializersForDeoptimization().push(init2);
  }
  consolidateInitializers() {
    if (this.additionalInitializers) {
      for (const initializer of this.additionalInitializers) {
        initializer.deoptimizePath(UNKNOWN_PATH);
      }
      this.additionalInitializers = null;
    }
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    if (this.isReassigned) {
      deoptimizeInteraction(interaction);
      return;
    }
    recursionTracker.withTrackedEntityAtPath(path2, this.init, () => this.init.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker), void 0);
  }
  deoptimizePath(path2) {
    if (this.isReassigned || this.deoptimizationTracker.trackEntityAtPathAndGetIfTracked(path2, this)) {
      return;
    }
    if (path2.length === 0) {
      this.isReassigned = true;
      const expressionsToBeDeoptimized = this.expressionsToBeDeoptimized;
      this.expressionsToBeDeoptimized = EMPTY_ARRAY;
      for (const expression of expressionsToBeDeoptimized) {
        expression.deoptimizeCache();
      }
      this.init.deoptimizePath(UNKNOWN_PATH);
    } else {
      this.init.deoptimizePath(path2);
    }
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    if (this.isReassigned) {
      return UnknownValue;
    }
    return recursionTracker.withTrackedEntityAtPath(path2, this.init, () => {
      this.expressionsToBeDeoptimized.push(origin);
      return this.init.getLiteralValueAtPath(path2, recursionTracker, origin);
    }, UnknownValue);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    if (this.isReassigned) {
      return UNKNOWN_RETURN_EXPRESSION;
    }
    return recursionTracker.withTrackedEntityAtPath(path2, this.init, () => {
      this.expressionsToBeDeoptimized.push(origin);
      return this.init.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
    }, UNKNOWN_RETURN_EXPRESSION);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    switch (interaction.type) {
      case INTERACTION_ACCESSED: {
        if (this.isReassigned)
          return true;
        return !context.accessed.trackEntityAtPathAndGetIfTracked(path2, this) && this.init.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      case INTERACTION_ASSIGNED: {
        if (this.included)
          return true;
        if (path2.length === 0)
          return false;
        if (this.isReassigned)
          return true;
        return !context.assigned.trackEntityAtPathAndGetIfTracked(path2, this) && this.init.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      case INTERACTION_CALLED: {
        if (this.isReassigned)
          return true;
        return !(interaction.withNew ? context.instantiated : context.called).trackEntityAtPathAndGetIfTracked(path2, interaction.args, this) && this.init.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
    }
  }
  include() {
    if (!this.included) {
      super.include();
      for (const declaration of this.declarations) {
        if (!declaration.included)
          declaration.include(createInclusionContext(), false);
        let node = declaration.parent;
        while (!node.included) {
          node.included = true;
          if (node.type === Program)
            break;
          node = node.parent;
        }
      }
    }
  }
  includeCallArguments(context, parameters) {
    if (this.isReassigned || context.includedCallArguments.has(this.init)) {
      for (const argument of parameters) {
        argument.include(context, false);
      }
    } else {
      context.includedCallArguments.add(this.init);
      this.init.includeCallArguments(context, parameters);
      context.includedCallArguments.delete(this.init);
    }
  }
  markCalledFromTryStatement() {
    this.calledFromTryStatement = true;
  }
  markInitializersForDeoptimization() {
    if (this.additionalInitializers === null) {
      this.additionalInitializers = [this.init];
      this.init = UNKNOWN_EXPRESSION;
      this.isReassigned = true;
    }
    return this.additionalInitializers;
  }
};
var MAX_TRACKED_INTERACTIONS = 20;
var NO_INTERACTIONS = EMPTY_ARRAY;
var UNKNOWN_DEOPTIMIZED_FIELD = /* @__PURE__ */ new Set([UnknownKey]);
var EMPTY_PATH_TRACKER = new PathTracker();
var UNKNOWN_DEOPTIMIZED_ENTITY = /* @__PURE__ */ new Set([UNKNOWN_EXPRESSION]);
var ParameterVariable = class extends LocalVariable {
  constructor(name, declarator, context) {
    super(name, declarator, UNKNOWN_EXPRESSION, context, "parameter");
    this.deoptimizationInteractions = [];
    this.deoptimizations = new PathTracker();
    this.deoptimizedFields = /* @__PURE__ */ new Set();
    this.entitiesToBeDeoptimized = /* @__PURE__ */ new Set();
  }
  addEntityToBeDeoptimized(entity) {
    if (entity === UNKNOWN_EXPRESSION) {
      if (!this.entitiesToBeDeoptimized.has(UNKNOWN_EXPRESSION)) {
        this.entitiesToBeDeoptimized.add(UNKNOWN_EXPRESSION);
        for (const { interaction } of this.deoptimizationInteractions) {
          deoptimizeInteraction(interaction);
        }
        this.deoptimizationInteractions = NO_INTERACTIONS;
      }
    } else if (this.deoptimizedFields.has(UnknownKey)) {
      entity.deoptimizePath(UNKNOWN_PATH);
    } else if (!this.entitiesToBeDeoptimized.has(entity)) {
      this.entitiesToBeDeoptimized.add(entity);
      for (const field of this.deoptimizedFields) {
        entity.deoptimizePath([field]);
      }
      for (const { interaction, path: path2 } of this.deoptimizationInteractions) {
        entity.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, SHARED_RECURSION_TRACKER);
      }
    }
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2) {
    if (path2.length >= 2 || this.entitiesToBeDeoptimized.has(UNKNOWN_EXPRESSION) || this.deoptimizationInteractions.length >= MAX_TRACKED_INTERACTIONS || path2.length === 1 && (this.deoptimizedFields.has(UnknownKey) || interaction.type === INTERACTION_CALLED && this.deoptimizedFields.has(path2[0]))) {
      deoptimizeInteraction(interaction);
      return;
    }
    if (!this.deoptimizations.trackEntityAtPathAndGetIfTracked(path2, interaction.args)) {
      for (const entity of this.entitiesToBeDeoptimized) {
        entity.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, SHARED_RECURSION_TRACKER);
      }
      if (!this.entitiesToBeDeoptimized.has(UNKNOWN_EXPRESSION)) {
        this.deoptimizationInteractions.push({
          interaction,
          path: path2
        });
      }
    }
  }
  deoptimizePath(path2) {
    if (path2.length === 0 || this.deoptimizedFields.has(UnknownKey)) {
      return;
    }
    const key = path2[0];
    if (this.deoptimizedFields.has(key)) {
      return;
    }
    this.deoptimizedFields.add(key);
    for (const entity of this.entitiesToBeDeoptimized) {
      entity.deoptimizePath([key]);
    }
    if (key === UnknownKey) {
      this.deoptimizationInteractions = NO_INTERACTIONS;
      this.deoptimizations = EMPTY_PATH_TRACKER;
      this.deoptimizedFields = UNKNOWN_DEOPTIMIZED_FIELD;
      this.entitiesToBeDeoptimized = UNKNOWN_DEOPTIMIZED_ENTITY;
    }
  }
  getReturnExpressionWhenCalledAtPath(path2) {
    if (path2.length === 0) {
      this.deoptimizePath(UNKNOWN_PATH);
    } else if (!this.deoptimizedFields.has(path2[0])) {
      this.deoptimizePath([path2[0]]);
    }
    return UNKNOWN_RETURN_EXPRESSION;
  }
};
var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var base = 64;
function toBase64(value) {
  let outString = "";
  do {
    const currentDigit = value % base;
    value = value / base | 0;
    outString = chars[currentDigit] + outString;
  } while (value !== 0);
  return outString;
}
function getSafeName(baseName, usedNames, forbiddenNames) {
  let safeName = baseName;
  let count = 1;
  while (usedNames.has(safeName) || RESERVED_NAMES.has(safeName) || forbiddenNames?.has(safeName)) {
    safeName = `${baseName}$${toBase64(count++)}`;
  }
  usedNames.add(safeName);
  return safeName;
}
var Scope = class {
  constructor() {
    this.children = [];
    this.variables = /* @__PURE__ */ new Map();
  }
  /*
  Redeclaration rules:
  - var can redeclare var
  - in function scopes, function and var can redeclare function and var
  - var is hoisted across scopes, function remains in the scope it is declared
  - var and function can redeclare function parameters, but parameters cannot redeclare parameters
  - function cannot redeclare catch scope parameters
  - var can redeclare catch scope parameters in a way
      - if the parameter is an identifier and not a pattern
      - then the variable is still declared in the hoisted outer scope, but the initializer is assigned to the parameter
  - const, let, class, and function except in the cases above cannot redeclare anything
   */
  addDeclaration(identifier2, context, init2, kind) {
    const name = identifier2.name;
    const existingVariable = this.hoistedVariables?.get(name) || this.variables.get(name);
    if (existingVariable) {
      const existingKind = existingVariable.kind;
      if (kind === "var" && existingKind === "var") {
        existingVariable.addDeclaration(identifier2, init2);
        return existingVariable;
      }
      context.error(logRedeclarationError(name), identifier2.start);
    }
    const newVariable = new LocalVariable(identifier2.name, identifier2, init2, context, kind);
    this.variables.set(name, newVariable);
    return newVariable;
  }
  addHoistedVariable(name, variable) {
    (this.hoistedVariables ||= /* @__PURE__ */ new Map()).set(name, variable);
  }
  contains(name) {
    return this.variables.has(name);
  }
  findVariable(_name) {
    throw new Error("Internal Error: findVariable needs to be implemented by a subclass");
  }
};
var ChildScope = class _ChildScope extends Scope {
  constructor(parent, context) {
    super();
    this.parent = parent;
    this.context = context;
    this.accessedOutsideVariables = /* @__PURE__ */ new Map();
    parent.children.push(this);
  }
  addAccessedDynamicImport(importExpression2) {
    (this.accessedDynamicImports || (this.accessedDynamicImports = /* @__PURE__ */ new Set())).add(importExpression2);
    if (this.parent instanceof _ChildScope) {
      this.parent.addAccessedDynamicImport(importExpression2);
    }
  }
  addAccessedGlobals(globals, accessedGlobalsByScope) {
    const accessedGlobals = accessedGlobalsByScope.get(this) || /* @__PURE__ */ new Set();
    for (const name of globals) {
      accessedGlobals.add(name);
    }
    accessedGlobalsByScope.set(this, accessedGlobals);
    if (this.parent instanceof _ChildScope) {
      this.parent.addAccessedGlobals(globals, accessedGlobalsByScope);
    }
  }
  addNamespaceMemberAccess(name, variable) {
    this.accessedOutsideVariables.set(name, variable);
    this.parent.addNamespaceMemberAccess(name, variable);
  }
  addReturnExpression(expression) {
    this.parent instanceof _ChildScope && this.parent.addReturnExpression(expression);
  }
  addUsedOutsideNames(usedNames, format, exportNamesByVariable, accessedGlobalsByScope) {
    for (const variable of this.accessedOutsideVariables.values()) {
      if (variable.included) {
        usedNames.add(variable.getBaseVariableName());
        if (format === "system" && exportNamesByVariable.has(variable)) {
          usedNames.add("exports");
        }
      }
    }
    const accessedGlobals = accessedGlobalsByScope.get(this);
    if (accessedGlobals) {
      for (const name of accessedGlobals) {
        usedNames.add(name);
      }
    }
  }
  contains(name) {
    return this.variables.has(name) || this.parent.contains(name);
  }
  deconflict(format, exportNamesByVariable, accessedGlobalsByScope) {
    const usedNames = /* @__PURE__ */ new Set();
    this.addUsedOutsideNames(usedNames, format, exportNamesByVariable, accessedGlobalsByScope);
    if (this.accessedDynamicImports) {
      for (const importExpression2 of this.accessedDynamicImports) {
        if (importExpression2.inlineNamespace) {
          usedNames.add(importExpression2.inlineNamespace.getBaseVariableName());
        }
      }
    }
    for (const [name, variable] of this.variables) {
      if (variable.included || variable.alwaysRendered) {
        variable.setRenderNames(null, getSafeName(name, usedNames, variable.forbiddenNames));
      }
    }
    for (const scope of this.children) {
      scope.deconflict(format, exportNamesByVariable, accessedGlobalsByScope);
    }
  }
  findLexicalBoundary() {
    return this.parent.findLexicalBoundary();
  }
  findVariable(name) {
    const knownVariable = this.variables.get(name) || this.accessedOutsideVariables.get(name);
    if (knownVariable) {
      return knownVariable;
    }
    const variable = this.parent.findVariable(name);
    this.accessedOutsideVariables.set(name, variable);
    return variable;
  }
};
var CatchBodyScope = class extends ChildScope {
  constructor(parent) {
    super(parent, parent.context);
    this.parent = parent;
  }
  addDeclaration(identifier2, context, init2, kind) {
    if (kind === "var") {
      const name = identifier2.name;
      const existingVariable = this.hoistedVariables?.get(name) || this.variables.get(name);
      if (existingVariable) {
        const existingKind = existingVariable.kind;
        if (existingKind === "parameter" && // If this is a destructured parameter, it is forbidden to redeclare
        existingVariable.declarations[0].parent.type === CatchClause) {
          const declaredVariable2 = this.parent.parent.addDeclaration(identifier2, context, UNDEFINED_EXPRESSION, kind);
          existingVariable.renderLikeHoisted(declaredVariable2);
          this.addHoistedVariable(name, declaredVariable2);
          return declaredVariable2;
        }
        if (existingKind === "var") {
          existingVariable.addDeclaration(identifier2, init2);
          return existingVariable;
        }
        return context.error(logRedeclarationError(name), identifier2.start);
      }
      const declaredVariable = this.parent.parent.addDeclaration(identifier2, context, init2, kind);
      declaredVariable.markInitializersForDeoptimization();
      this.addHoistedVariable(name, declaredVariable);
      return declaredVariable;
    }
    return super.addDeclaration(identifier2, context, init2, kind);
  }
};
var FunctionBodyScope = class extends ChildScope {
  constructor(parent) {
    super(parent, parent.context);
  }
  // There is stuff that is only allowed in function scopes, i.e. functions can
  // be redeclared, functions and var can redeclare each other
  addDeclaration(identifier2, context, init2, kind) {
    const name = identifier2.name;
    const existingVariable = this.hoistedVariables?.get(name) || this.variables.get(name);
    if (existingVariable) {
      const existingKind = existingVariable.kind;
      if ((kind === "var" || kind === "function") && (existingKind === "var" || existingKind === "function" || existingKind === "parameter")) {
        existingVariable.addDeclaration(identifier2, init2);
        return existingVariable;
      }
      context.error(logRedeclarationError(name), identifier2.start);
    }
    const newVariable = new LocalVariable(identifier2.name, identifier2, init2, context, kind);
    this.variables.set(name, newVariable);
    return newVariable;
  }
};
var ParameterScope = class extends ChildScope {
  constructor(parent, isCatchScope) {
    super(parent, parent.context);
    this.parameters = [];
    this.hasRest = false;
    this.bodyScope = isCatchScope ? new CatchBodyScope(this) : new FunctionBodyScope(this);
  }
  /**
   * Adds a parameter to this scope. Parameters must be added in the correct
   * order, i.e. from left to right.
   */
  addParameterDeclaration(identifier2) {
    const { name, start } = identifier2;
    const existingParameter = this.variables.get(name);
    if (existingParameter) {
      return this.context.error(logDuplicateArgumentNameError(name), start);
    }
    const variable = new ParameterVariable(name, identifier2, this.context);
    this.variables.set(name, variable);
    this.bodyScope.addHoistedVariable(name, variable);
    return variable;
  }
  addParameterVariables(parameters, hasRest) {
    this.parameters = parameters;
    for (const parameterList of parameters) {
      for (const parameter of parameterList) {
        parameter.alwaysRendered = true;
      }
    }
    this.hasRest = hasRest;
  }
  includeCallArguments(context, parameters) {
    let calledFromTryStatement = false;
    let argumentIncluded = false;
    const restParameter = this.hasRest && this.parameters[this.parameters.length - 1];
    for (const checkedArgument of parameters) {
      if (checkedArgument instanceof SpreadElement) {
        for (const argument of parameters) {
          argument.include(context, false);
        }
        break;
      }
    }
    for (let index = parameters.length - 1; index >= 0; index--) {
      const parameterVariables = this.parameters[index] || restParameter;
      const argument = parameters[index];
      if (parameterVariables) {
        calledFromTryStatement = false;
        if (parameterVariables.length === 0) {
          argumentIncluded = true;
        } else {
          for (const variable of parameterVariables) {
            if (variable.included) {
              argumentIncluded = true;
            }
            if (variable.calledFromTryStatement) {
              calledFromTryStatement = true;
            }
          }
        }
      }
      if (!argumentIncluded && argument.shouldBeIncluded(context)) {
        argumentIncluded = true;
      }
      if (argumentIncluded) {
        argument.include(context, calledFromTryStatement);
      }
    }
  }
};
var ReturnValueScope = class extends ParameterScope {
  constructor() {
    super(...arguments);
    this.returnExpression = null;
    this.returnExpressions = [];
  }
  addReturnExpression(expression) {
    this.returnExpressions.push(expression);
  }
  getReturnExpression() {
    if (this.returnExpression === null)
      this.updateReturnExpression();
    return this.returnExpression;
  }
  updateReturnExpression() {
    if (this.returnExpressions.length === 1) {
      this.returnExpression = this.returnExpressions[0];
    } else {
      this.returnExpression = UNKNOWN_EXPRESSION;
      for (const expression of this.returnExpressions) {
        expression.deoptimizePath(UNKNOWN_PATH);
      }
    }
  }
};
function is_reference(node, parent) {
  if (node.type === "MemberExpression") {
    return !node.computed && is_reference(node.object, node);
  }
  if (node.type === "Identifier") {
    if (!parent)
      return true;
    switch (parent.type) {
      case "MemberExpression":
        return parent.computed || node === parent.object;
      case "MethodDefinition":
        return parent.computed;
      case "PropertyDefinition":
        return parent.computed || node === parent.value;
      case "Property":
        return parent.computed || node === parent.value;
      case "ExportSpecifier":
      case "ImportSpecifier":
        return node === parent.local;
      case "LabeledStatement":
      case "BreakStatement":
      case "ContinueStatement":
        return false;
      default:
        return true;
    }
  }
  return false;
}
var PureFunctionKey = Symbol("PureFunction");
var getPureFunctions = ({ treeshake }) => {
  const pureFunctions = /* @__PURE__ */ Object.create(null);
  for (const functionName of treeshake ? treeshake.manualPureFunctions : []) {
    let currentFunctions = pureFunctions;
    for (const pathSegment of functionName.split(".")) {
      currentFunctions = currentFunctions[pathSegment] ||= /* @__PURE__ */ Object.create(null);
    }
    currentFunctions[PureFunctionKey] = true;
  }
  return pureFunctions;
};
var doNothing = () => {
};
var ValueProperties = Symbol("Value Properties");
var getTruthyLiteralValue = () => UnknownTruthyValue;
var returnFalse = () => false;
var returnTrue = () => true;
var PURE = {
  deoptimizeArgumentsOnCall: doNothing,
  getLiteralValue: getTruthyLiteralValue,
  hasEffectsWhenCalled: returnFalse
};
var IMPURE = {
  deoptimizeArgumentsOnCall: doNothing,
  getLiteralValue: getTruthyLiteralValue,
  hasEffectsWhenCalled: returnTrue
};
var PURE_WITH_ARRAY = {
  deoptimizeArgumentsOnCall: doNothing,
  getLiteralValue: getTruthyLiteralValue,
  hasEffectsWhenCalled({ args }) {
    return args.length > 1 && !(args[1] instanceof ArrayExpression);
  }
};
var GETTER_ACCESS = {
  deoptimizeArgumentsOnCall: doNothing,
  getLiteralValue: getTruthyLiteralValue,
  hasEffectsWhenCalled({ args }, context) {
    const [_thisArgument, firstArgument] = args;
    return !(firstArgument instanceof ExpressionEntity) || firstArgument.hasEffectsOnInteractionAtPath(UNKNOWN_PATH, NODE_INTERACTION_UNKNOWN_ACCESS, context);
  }
};
var O = {
  __proto__: null,
  [ValueProperties]: IMPURE
};
var PF = {
  __proto__: null,
  [ValueProperties]: PURE
};
var PF_NO_GETTER = {
  __proto__: null,
  [ValueProperties]: GETTER_ACCESS
};
var MUTATES_ARG_WITHOUT_ACCESSOR = {
  __proto__: null,
  [ValueProperties]: {
    deoptimizeArgumentsOnCall({ args: [, firstArgument] }) {
      firstArgument?.deoptimizePath(UNKNOWN_PATH);
    },
    getLiteralValue: getTruthyLiteralValue,
    hasEffectsWhenCalled({ args }, context) {
      return args.length <= 1 || args[1].hasEffectsOnInteractionAtPath(UNKNOWN_NON_ACCESSOR_PATH, NODE_INTERACTION_UNKNOWN_ASSIGNMENT, context);
    }
  }
};
var C = {
  __proto__: null,
  [ValueProperties]: IMPURE,
  prototype: O
};
var PC = {
  __proto__: null,
  [ValueProperties]: PURE,
  prototype: O
};
var PC_WITH_ARRAY = {
  __proto__: null,
  [ValueProperties]: PURE_WITH_ARRAY,
  prototype: O
};
var ARRAY_TYPE = {
  __proto__: null,
  [ValueProperties]: PURE,
  from: O,
  of: PF,
  prototype: O
};
var INTL_MEMBER = {
  __proto__: null,
  [ValueProperties]: PURE,
  supportedLocalesOf: PC
};
var knownGlobals = {
  // Placeholders for global objects to avoid shape mutations
  global: O,
  globalThis: O,
  self: O,
  window: O,
  // Common globals
  __proto__: null,
  [ValueProperties]: IMPURE,
  Array: {
    __proto__: null,
    [ValueProperties]: IMPURE,
    from: O,
    isArray: PF,
    of: PF,
    prototype: O
  },
  ArrayBuffer: {
    __proto__: null,
    [ValueProperties]: PURE,
    isView: PF,
    prototype: O
  },
  Atomics: O,
  BigInt: C,
  BigInt64Array: C,
  BigUint64Array: C,
  Boolean: PC,
  constructor: C,
  DataView: PC,
  Date: {
    __proto__: null,
    [ValueProperties]: PURE,
    now: PF,
    parse: PF,
    prototype: O,
    UTC: PF
  },
  decodeURI: PF,
  decodeURIComponent: PF,
  encodeURI: PF,
  encodeURIComponent: PF,
  Error: PC,
  escape: PF,
  eval: O,
  EvalError: PC,
  Float32Array: ARRAY_TYPE,
  Float64Array: ARRAY_TYPE,
  Function: C,
  hasOwnProperty: O,
  Infinity: O,
  Int16Array: ARRAY_TYPE,
  Int32Array: ARRAY_TYPE,
  Int8Array: ARRAY_TYPE,
  isFinite: PF,
  isNaN: PF,
  isPrototypeOf: O,
  JSON: O,
  Map: PC_WITH_ARRAY,
  Math: {
    __proto__: null,
    [ValueProperties]: IMPURE,
    abs: PF,
    acos: PF,
    acosh: PF,
    asin: PF,
    asinh: PF,
    atan: PF,
    atan2: PF,
    atanh: PF,
    cbrt: PF,
    ceil: PF,
    clz32: PF,
    cos: PF,
    cosh: PF,
    exp: PF,
    expm1: PF,
    floor: PF,
    fround: PF,
    hypot: PF,
    imul: PF,
    log: PF,
    log10: PF,
    log1p: PF,
    log2: PF,
    max: PF,
    min: PF,
    pow: PF,
    random: PF,
    round: PF,
    sign: PF,
    sin: PF,
    sinh: PF,
    sqrt: PF,
    tan: PF,
    tanh: PF,
    trunc: PF
  },
  NaN: O,
  Number: {
    __proto__: null,
    [ValueProperties]: PURE,
    isFinite: PF,
    isInteger: PF,
    isNaN: PF,
    isSafeInteger: PF,
    parseFloat: PF,
    parseInt: PF,
    prototype: O
  },
  Object: {
    __proto__: null,
    [ValueProperties]: PURE,
    create: PF,
    // Technically those can throw in certain situations, but we ignore this as
    // code that relies on this will hopefully wrap this in a try-catch, which
    // deoptimizes everything anyway
    defineProperty: MUTATES_ARG_WITHOUT_ACCESSOR,
    defineProperties: MUTATES_ARG_WITHOUT_ACCESSOR,
    freeze: MUTATES_ARG_WITHOUT_ACCESSOR,
    getOwnPropertyDescriptor: PF,
    getOwnPropertyDescriptors: PF,
    getOwnPropertyNames: PF,
    getOwnPropertySymbols: PF,
    getPrototypeOf: PF,
    hasOwn: PF,
    is: PF,
    isExtensible: PF,
    isFrozen: PF,
    isSealed: PF,
    keys: PF,
    fromEntries: O,
    entries: PF_NO_GETTER,
    values: PF_NO_GETTER,
    prototype: O
  },
  parseFloat: PF,
  parseInt: PF,
  Promise: {
    __proto__: null,
    [ValueProperties]: IMPURE,
    all: O,
    allSettled: O,
    any: O,
    prototype: O,
    race: O,
    reject: O,
    resolve: O
  },
  propertyIsEnumerable: O,
  Proxy: O,
  RangeError: PC,
  ReferenceError: PC,
  Reflect: O,
  RegExp: PC,
  Set: PC_WITH_ARRAY,
  SharedArrayBuffer: C,
  String: {
    __proto__: null,
    [ValueProperties]: PURE,
    fromCharCode: PF,
    fromCodePoint: PF,
    prototype: O,
    raw: PF
  },
  Symbol: {
    __proto__: null,
    [ValueProperties]: PURE,
    for: PF,
    keyFor: PF,
    prototype: O,
    toStringTag: {
      __proto__: null,
      [ValueProperties]: {
        deoptimizeArgumentsOnCall: doNothing,
        getLiteralValue() {
          return SymbolToStringTag;
        },
        hasEffectsWhenCalled: returnTrue
      }
    }
  },
  SyntaxError: PC,
  toLocaleString: O,
  toString: O,
  TypeError: PC,
  Uint16Array: ARRAY_TYPE,
  Uint32Array: ARRAY_TYPE,
  Uint8Array: ARRAY_TYPE,
  Uint8ClampedArray: ARRAY_TYPE,
  // Technically, this is a global, but it needs special handling
  // undefined: ?,
  unescape: PF,
  URIError: PC,
  valueOf: O,
  WeakMap: PC_WITH_ARRAY,
  WeakSet: PC_WITH_ARRAY,
  // Additional globals shared by Node and Browser that are not strictly part of the language
  clearInterval: C,
  clearTimeout: C,
  console: {
    __proto__: null,
    [ValueProperties]: IMPURE,
    assert: C,
    clear: C,
    count: C,
    countReset: C,
    debug: C,
    dir: C,
    dirxml: C,
    error: C,
    exception: C,
    group: C,
    groupCollapsed: C,
    groupEnd: C,
    info: C,
    log: C,
    table: C,
    time: C,
    timeEnd: C,
    timeLog: C,
    trace: C,
    warn: C
  },
  Intl: {
    __proto__: null,
    [ValueProperties]: IMPURE,
    Collator: INTL_MEMBER,
    DateTimeFormat: INTL_MEMBER,
    DisplayNames: INTL_MEMBER,
    ListFormat: INTL_MEMBER,
    Locale: INTL_MEMBER,
    NumberFormat: INTL_MEMBER,
    PluralRules: INTL_MEMBER,
    RelativeTimeFormat: INTL_MEMBER,
    Segmenter: INTL_MEMBER
  },
  setInterval: C,
  setTimeout: C,
  TextDecoder: C,
  TextEncoder: C,
  URL: {
    __proto__: null,
    [ValueProperties]: IMPURE,
    prototype: O,
    canParse: PF
  },
  URLSearchParams: C,
  // Browser specific globals
  AbortController: C,
  AbortSignal: C,
  addEventListener: O,
  alert: O,
  AnalyserNode: C,
  Animation: C,
  AnimationEvent: C,
  applicationCache: O,
  ApplicationCache: C,
  ApplicationCacheErrorEvent: C,
  atob: O,
  Attr: C,
  Audio: C,
  AudioBuffer: C,
  AudioBufferSourceNode: C,
  AudioContext: C,
  AudioDestinationNode: C,
  AudioListener: C,
  AudioNode: C,
  AudioParam: C,
  AudioProcessingEvent: C,
  AudioScheduledSourceNode: C,
  AudioWorkletNode: C,
  BarProp: C,
  BaseAudioContext: C,
  BatteryManager: C,
  BeforeUnloadEvent: C,
  BiquadFilterNode: C,
  Blob: C,
  BlobEvent: C,
  blur: O,
  BroadcastChannel: C,
  btoa: O,
  ByteLengthQueuingStrategy: C,
  Cache: C,
  caches: O,
  CacheStorage: C,
  cancelAnimationFrame: O,
  cancelIdleCallback: O,
  CanvasCaptureMediaStreamTrack: C,
  CanvasGradient: C,
  CanvasPattern: C,
  CanvasRenderingContext2D: C,
  ChannelMergerNode: C,
  ChannelSplitterNode: C,
  CharacterData: C,
  clientInformation: O,
  ClipboardEvent: C,
  close: O,
  closed: O,
  CloseEvent: C,
  Comment: C,
  CompositionEvent: C,
  confirm: O,
  ConstantSourceNode: C,
  ConvolverNode: C,
  CountQueuingStrategy: C,
  createImageBitmap: O,
  Credential: C,
  CredentialsContainer: C,
  crypto: O,
  Crypto: C,
  CryptoKey: C,
  CSS: C,
  CSSConditionRule: C,
  CSSFontFaceRule: C,
  CSSGroupingRule: C,
  CSSImportRule: C,
  CSSKeyframeRule: C,
  CSSKeyframesRule: C,
  CSSMediaRule: C,
  CSSNamespaceRule: C,
  CSSPageRule: C,
  CSSRule: C,
  CSSRuleList: C,
  CSSStyleDeclaration: C,
  CSSStyleRule: C,
  CSSStyleSheet: C,
  CSSSupportsRule: C,
  CustomElementRegistry: C,
  customElements: O,
  CustomEvent: {
    __proto__: null,
    [ValueProperties]: {
      deoptimizeArgumentsOnCall({ args }) {
        args[2]?.deoptimizePath(["detail"]);
      },
      getLiteralValue: getTruthyLiteralValue,
      hasEffectsWhenCalled: returnFalse
    },
    prototype: O
  },
  DataTransfer: C,
  DataTransferItem: C,
  DataTransferItemList: C,
  defaultstatus: O,
  defaultStatus: O,
  DelayNode: C,
  DeviceMotionEvent: C,
  DeviceOrientationEvent: C,
  devicePixelRatio: O,
  dispatchEvent: O,
  document: O,
  Document: C,
  DocumentFragment: C,
  DocumentType: C,
  DOMError: C,
  DOMException: C,
  DOMImplementation: C,
  DOMMatrix: C,
  DOMMatrixReadOnly: C,
  DOMParser: C,
  DOMPoint: C,
  DOMPointReadOnly: C,
  DOMQuad: C,
  DOMRect: C,
  DOMRectReadOnly: C,
  DOMStringList: C,
  DOMStringMap: C,
  DOMTokenList: C,
  DragEvent: C,
  DynamicsCompressorNode: C,
  Element: C,
  ErrorEvent: C,
  Event: C,
  EventSource: C,
  EventTarget: C,
  external: O,
  fetch: O,
  File: C,
  FileList: C,
  FileReader: C,
  find: O,
  focus: O,
  FocusEvent: C,
  FontFace: C,
  FontFaceSetLoadEvent: C,
  FormData: C,
  frames: O,
  GainNode: C,
  Gamepad: C,
  GamepadButton: C,
  GamepadEvent: C,
  getComputedStyle: O,
  getSelection: O,
  HashChangeEvent: C,
  Headers: C,
  history: O,
  History: C,
  HTMLAllCollection: C,
  HTMLAnchorElement: C,
  HTMLAreaElement: C,
  HTMLAudioElement: C,
  HTMLBaseElement: C,
  HTMLBodyElement: C,
  HTMLBRElement: C,
  HTMLButtonElement: C,
  HTMLCanvasElement: C,
  HTMLCollection: C,
  HTMLContentElement: C,
  HTMLDataElement: C,
  HTMLDataListElement: C,
  HTMLDetailsElement: C,
  HTMLDialogElement: C,
  HTMLDirectoryElement: C,
  HTMLDivElement: C,
  HTMLDListElement: C,
  HTMLDocument: C,
  HTMLElement: C,
  HTMLEmbedElement: C,
  HTMLFieldSetElement: C,
  HTMLFontElement: C,
  HTMLFormControlsCollection: C,
  HTMLFormElement: C,
  HTMLFrameElement: C,
  HTMLFrameSetElement: C,
  HTMLHeadElement: C,
  HTMLHeadingElement: C,
  HTMLHRElement: C,
  HTMLHtmlElement: C,
  HTMLIFrameElement: C,
  HTMLImageElement: C,
  HTMLInputElement: C,
  HTMLLabelElement: C,
  HTMLLegendElement: C,
  HTMLLIElement: C,
  HTMLLinkElement: C,
  HTMLMapElement: C,
  HTMLMarqueeElement: C,
  HTMLMediaElement: C,
  HTMLMenuElement: C,
  HTMLMetaElement: C,
  HTMLMeterElement: C,
  HTMLModElement: C,
  HTMLObjectElement: C,
  HTMLOListElement: C,
  HTMLOptGroupElement: C,
  HTMLOptionElement: C,
  HTMLOptionsCollection: C,
  HTMLOutputElement: C,
  HTMLParagraphElement: C,
  HTMLParamElement: C,
  HTMLPictureElement: C,
  HTMLPreElement: C,
  HTMLProgressElement: C,
  HTMLQuoteElement: C,
  HTMLScriptElement: C,
  HTMLSelectElement: C,
  HTMLShadowElement: C,
  HTMLSlotElement: C,
  HTMLSourceElement: C,
  HTMLSpanElement: C,
  HTMLStyleElement: C,
  HTMLTableCaptionElement: C,
  HTMLTableCellElement: C,
  HTMLTableColElement: C,
  HTMLTableElement: C,
  HTMLTableRowElement: C,
  HTMLTableSectionElement: C,
  HTMLTemplateElement: C,
  HTMLTextAreaElement: C,
  HTMLTimeElement: C,
  HTMLTitleElement: C,
  HTMLTrackElement: C,
  HTMLUListElement: C,
  HTMLUnknownElement: C,
  HTMLVideoElement: C,
  IDBCursor: C,
  IDBCursorWithValue: C,
  IDBDatabase: C,
  IDBFactory: C,
  IDBIndex: C,
  IDBKeyRange: C,
  IDBObjectStore: C,
  IDBOpenDBRequest: C,
  IDBRequest: C,
  IDBTransaction: C,
  IDBVersionChangeEvent: C,
  IdleDeadline: C,
  IIRFilterNode: C,
  Image: C,
  ImageBitmap: C,
  ImageBitmapRenderingContext: C,
  ImageCapture: C,
  ImageData: C,
  indexedDB: O,
  innerHeight: O,
  innerWidth: O,
  InputEvent: C,
  IntersectionObserver: C,
  IntersectionObserverEntry: C,
  isSecureContext: O,
  KeyboardEvent: C,
  KeyframeEffect: C,
  length: O,
  localStorage: O,
  location: O,
  Location: C,
  locationbar: O,
  matchMedia: O,
  MediaDeviceInfo: C,
  MediaDevices: C,
  MediaElementAudioSourceNode: C,
  MediaEncryptedEvent: C,
  MediaError: C,
  MediaKeyMessageEvent: C,
  MediaKeySession: C,
  MediaKeyStatusMap: C,
  MediaKeySystemAccess: C,
  MediaList: C,
  MediaQueryList: C,
  MediaQueryListEvent: C,
  MediaRecorder: C,
  MediaSettingsRange: C,
  MediaSource: C,
  MediaStream: C,
  MediaStreamAudioDestinationNode: C,
  MediaStreamAudioSourceNode: C,
  MediaStreamEvent: C,
  MediaStreamTrack: C,
  MediaStreamTrackEvent: C,
  menubar: O,
  MessageChannel: C,
  MessageEvent: C,
  MessagePort: C,
  MIDIAccess: C,
  MIDIConnectionEvent: C,
  MIDIInput: C,
  MIDIInputMap: C,
  MIDIMessageEvent: C,
  MIDIOutput: C,
  MIDIOutputMap: C,
  MIDIPort: C,
  MimeType: C,
  MimeTypeArray: C,
  MouseEvent: C,
  moveBy: O,
  moveTo: O,
  MutationEvent: C,
  MutationObserver: C,
  MutationRecord: C,
  name: O,
  NamedNodeMap: C,
  NavigationPreloadManager: C,
  navigator: O,
  Navigator: C,
  NetworkInformation: C,
  Node: C,
  NodeFilter: O,
  NodeIterator: C,
  NodeList: C,
  Notification: C,
  OfflineAudioCompletionEvent: C,
  OfflineAudioContext: C,
  offscreenBuffering: O,
  OffscreenCanvas: C,
  open: O,
  openDatabase: O,
  Option: C,
  origin: O,
  OscillatorNode: C,
  outerHeight: O,
  outerWidth: O,
  PageTransitionEvent: C,
  pageXOffset: O,
  pageYOffset: O,
  PannerNode: C,
  parent: O,
  Path2D: C,
  PaymentAddress: C,
  PaymentRequest: C,
  PaymentRequestUpdateEvent: C,
  PaymentResponse: C,
  performance: O,
  Performance: C,
  PerformanceEntry: C,
  PerformanceLongTaskTiming: C,
  PerformanceMark: C,
  PerformanceMeasure: C,
  PerformanceNavigation: C,
  PerformanceNavigationTiming: C,
  PerformanceObserver: C,
  PerformanceObserverEntryList: C,
  PerformancePaintTiming: C,
  PerformanceResourceTiming: C,
  PerformanceTiming: C,
  PeriodicWave: C,
  Permissions: C,
  PermissionStatus: C,
  personalbar: O,
  PhotoCapabilities: C,
  Plugin: C,
  PluginArray: C,
  PointerEvent: C,
  PopStateEvent: C,
  postMessage: O,
  Presentation: C,
  PresentationAvailability: C,
  PresentationConnection: C,
  PresentationConnectionAvailableEvent: C,
  PresentationConnectionCloseEvent: C,
  PresentationConnectionList: C,
  PresentationReceiver: C,
  PresentationRequest: C,
  print: O,
  ProcessingInstruction: C,
  ProgressEvent: C,
  PromiseRejectionEvent: C,
  prompt: O,
  PushManager: C,
  PushSubscription: C,
  PushSubscriptionOptions: C,
  queueMicrotask: O,
  RadioNodeList: C,
  Range: C,
  ReadableStream: C,
  RemotePlayback: C,
  removeEventListener: O,
  Request: C,
  requestAnimationFrame: O,
  requestIdleCallback: O,
  resizeBy: O,
  ResizeObserver: C,
  ResizeObserverEntry: C,
  resizeTo: O,
  Response: C,
  RTCCertificate: C,
  RTCDataChannel: C,
  RTCDataChannelEvent: C,
  RTCDtlsTransport: C,
  RTCIceCandidate: C,
  RTCIceTransport: C,
  RTCPeerConnection: C,
  RTCPeerConnectionIceEvent: C,
  RTCRtpReceiver: C,
  RTCRtpSender: C,
  RTCSctpTransport: C,
  RTCSessionDescription: C,
  RTCStatsReport: C,
  RTCTrackEvent: C,
  screen: O,
  Screen: C,
  screenLeft: O,
  ScreenOrientation: C,
  screenTop: O,
  screenX: O,
  screenY: O,
  ScriptProcessorNode: C,
  scroll: O,
  scrollbars: O,
  scrollBy: O,
  scrollTo: O,
  scrollX: O,
  scrollY: O,
  SecurityPolicyViolationEvent: C,
  Selection: C,
  ServiceWorker: C,
  ServiceWorkerContainer: C,
  ServiceWorkerRegistration: C,
  sessionStorage: O,
  ShadowRoot: C,
  SharedWorker: C,
  SourceBuffer: C,
  SourceBufferList: C,
  speechSynthesis: O,
  SpeechSynthesisEvent: C,
  SpeechSynthesisUtterance: C,
  StaticRange: C,
  status: O,
  statusbar: O,
  StereoPannerNode: C,
  stop: O,
  Storage: C,
  StorageEvent: C,
  StorageManager: C,
  styleMedia: O,
  StyleSheet: C,
  StyleSheetList: C,
  SubtleCrypto: C,
  SVGAElement: C,
  SVGAngle: C,
  SVGAnimatedAngle: C,
  SVGAnimatedBoolean: C,
  SVGAnimatedEnumeration: C,
  SVGAnimatedInteger: C,
  SVGAnimatedLength: C,
  SVGAnimatedLengthList: C,
  SVGAnimatedNumber: C,
  SVGAnimatedNumberList: C,
  SVGAnimatedPreserveAspectRatio: C,
  SVGAnimatedRect: C,
  SVGAnimatedString: C,
  SVGAnimatedTransformList: C,
  SVGAnimateElement: C,
  SVGAnimateMotionElement: C,
  SVGAnimateTransformElement: C,
  SVGAnimationElement: C,
  SVGCircleElement: C,
  SVGClipPathElement: C,
  SVGComponentTransferFunctionElement: C,
  SVGDefsElement: C,
  SVGDescElement: C,
  SVGDiscardElement: C,
  SVGElement: C,
  SVGEllipseElement: C,
  SVGFEBlendElement: C,
  SVGFEColorMatrixElement: C,
  SVGFEComponentTransferElement: C,
  SVGFECompositeElement: C,
  SVGFEConvolveMatrixElement: C,
  SVGFEDiffuseLightingElement: C,
  SVGFEDisplacementMapElement: C,
  SVGFEDistantLightElement: C,
  SVGFEDropShadowElement: C,
  SVGFEFloodElement: C,
  SVGFEFuncAElement: C,
  SVGFEFuncBElement: C,
  SVGFEFuncGElement: C,
  SVGFEFuncRElement: C,
  SVGFEGaussianBlurElement: C,
  SVGFEImageElement: C,
  SVGFEMergeElement: C,
  SVGFEMergeNodeElement: C,
  SVGFEMorphologyElement: C,
  SVGFEOffsetElement: C,
  SVGFEPointLightElement: C,
  SVGFESpecularLightingElement: C,
  SVGFESpotLightElement: C,
  SVGFETileElement: C,
  SVGFETurbulenceElement: C,
  SVGFilterElement: C,
  SVGForeignObjectElement: C,
  SVGGElement: C,
  SVGGeometryElement: C,
  SVGGradientElement: C,
  SVGGraphicsElement: C,
  SVGImageElement: C,
  SVGLength: C,
  SVGLengthList: C,
  SVGLinearGradientElement: C,
  SVGLineElement: C,
  SVGMarkerElement: C,
  SVGMaskElement: C,
  SVGMatrix: C,
  SVGMetadataElement: C,
  SVGMPathElement: C,
  SVGNumber: C,
  SVGNumberList: C,
  SVGPathElement: C,
  SVGPatternElement: C,
  SVGPoint: C,
  SVGPointList: C,
  SVGPolygonElement: C,
  SVGPolylineElement: C,
  SVGPreserveAspectRatio: C,
  SVGRadialGradientElement: C,
  SVGRect: C,
  SVGRectElement: C,
  SVGScriptElement: C,
  SVGSetElement: C,
  SVGStopElement: C,
  SVGStringList: C,
  SVGStyleElement: C,
  SVGSVGElement: C,
  SVGSwitchElement: C,
  SVGSymbolElement: C,
  SVGTextContentElement: C,
  SVGTextElement: C,
  SVGTextPathElement: C,
  SVGTextPositioningElement: C,
  SVGTitleElement: C,
  SVGTransform: C,
  SVGTransformList: C,
  SVGTSpanElement: C,
  SVGUnitTypes: C,
  SVGUseElement: C,
  SVGViewElement: C,
  TaskAttributionTiming: C,
  Text: C,
  TextEvent: C,
  TextMetrics: C,
  TextTrack: C,
  TextTrackCue: C,
  TextTrackCueList: C,
  TextTrackList: C,
  TimeRanges: C,
  toolbar: O,
  top: O,
  Touch: C,
  TouchEvent: C,
  TouchList: C,
  TrackEvent: C,
  TransitionEvent: C,
  TreeWalker: C,
  UIEvent: C,
  ValidityState: C,
  visualViewport: O,
  VisualViewport: C,
  VTTCue: C,
  WaveShaperNode: C,
  WebAssembly: O,
  WebGL2RenderingContext: C,
  WebGLActiveInfo: C,
  WebGLBuffer: C,
  WebGLContextEvent: C,
  WebGLFramebuffer: C,
  WebGLProgram: C,
  WebGLQuery: C,
  WebGLRenderbuffer: C,
  WebGLRenderingContext: C,
  WebGLSampler: C,
  WebGLShader: C,
  WebGLShaderPrecisionFormat: C,
  WebGLSync: C,
  WebGLTexture: C,
  WebGLTransformFeedback: C,
  WebGLUniformLocation: C,
  WebGLVertexArrayObject: C,
  WebSocket: C,
  WheelEvent: C,
  Window: C,
  Worker: C,
  WritableStream: C,
  XMLDocument: C,
  XMLHttpRequest: C,
  XMLHttpRequestEventTarget: C,
  XMLHttpRequestUpload: C,
  XMLSerializer: C,
  XPathEvaluator: C,
  XPathExpression: C,
  XPathResult: C,
  XSLTProcessor: C
};
for (const global of ["window", "global", "self", "globalThis"]) {
  knownGlobals[global] = knownGlobals;
}
function getGlobalAtPath(path2) {
  let currentGlobal = knownGlobals;
  for (const pathSegment of path2) {
    if (typeof pathSegment !== "string") {
      return null;
    }
    currentGlobal = currentGlobal[pathSegment];
    if (!currentGlobal) {
      return null;
    }
  }
  return currentGlobal[ValueProperties];
}
var GlobalVariable = class extends Variable {
  constructor() {
    super(...arguments);
    this.isReassigned = true;
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    switch (interaction.type) {
      case INTERACTION_ACCESSED:
      case INTERACTION_ASSIGNED: {
        if (!getGlobalAtPath([this.name, ...path2].slice(0, -1))) {
          super.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
        }
        return;
      }
      case INTERACTION_CALLED: {
        const globalAtPath = getGlobalAtPath([this.name, ...path2]);
        if (globalAtPath) {
          globalAtPath.deoptimizeArgumentsOnCall(interaction);
        } else {
          super.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
        }
        return;
      }
    }
  }
  getLiteralValueAtPath(path2, _recursionTracker, _origin) {
    const globalAtPath = getGlobalAtPath([this.name, ...path2]);
    return globalAtPath ? globalAtPath.getLiteralValue() : UnknownValue;
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    switch (interaction.type) {
      case INTERACTION_ACCESSED: {
        if (path2.length === 0) {
          return this.name !== "undefined" && !getGlobalAtPath([this.name]);
        }
        return !getGlobalAtPath([this.name, ...path2].slice(0, -1));
      }
      case INTERACTION_ASSIGNED: {
        return true;
      }
      case INTERACTION_CALLED: {
        const globalAtPath = getGlobalAtPath([this.name, ...path2]);
        return !globalAtPath || globalAtPath.hasEffectsWhenCalled(interaction, context);
      }
    }
  }
};
var tdzVariableKinds = {
  __proto__: null,
  class: true,
  const: true,
  let: true,
  var: true
};
var Identifier2 = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.variable = null;
  }
  get isTDZAccess() {
    if (!isFlagSet(
      this.flags,
      4
      /* Flag.tdzAccessDefined */
    )) {
      return null;
    }
    return isFlagSet(
      this.flags,
      8
      /* Flag.tdzAccess */
    );
  }
  set isTDZAccess(value) {
    this.flags = setFlag(this.flags, 4, true);
    this.flags = setFlag(this.flags, 8, value);
  }
  addExportedVariables(variables, exportNamesByVariable) {
    if (exportNamesByVariable.has(this.variable)) {
      variables.push(this.variable);
    }
  }
  bind() {
    if (!this.variable && is_reference(this, this.parent)) {
      this.variable = this.scope.findVariable(this.name);
      this.variable.addReference(this);
    }
  }
  declare(kind, init2) {
    let variable;
    const { treeshake } = this.scope.context.options;
    switch (kind) {
      case "var": {
        variable = this.scope.addDeclaration(this, this.scope.context, init2, kind);
        if (treeshake && treeshake.correctVarValueBeforeDeclaration) {
          variable.markInitializersForDeoptimization();
        }
        break;
      }
      case "function": {
        variable = this.scope.addDeclaration(this, this.scope.context, init2, kind);
        break;
      }
      case "let":
      case "const":
      case "class": {
        variable = this.scope.addDeclaration(this, this.scope.context, init2, kind);
        break;
      }
      case "parameter": {
        variable = this.scope.addParameterDeclaration(this);
        break;
      }
      default: {
        throw new Error(`Internal Error: Unexpected identifier kind ${kind}.`);
      }
    }
    return [this.variable = variable];
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.variable.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizePath(path2) {
    if (path2.length === 0 && !this.scope.contains(this.name)) {
      this.disallowImportReassignment();
    }
    this.variable?.deoptimizePath(path2);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    return this.getVariableRespectingTDZ().getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    const [expression, isPure] = this.getVariableRespectingTDZ().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
    return [expression, isPure || this.isPureFunction(path2)];
  }
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    if (this.isPossibleTDZ() && this.variable.kind !== "var") {
      return true;
    }
    return this.scope.context.options.treeshake.unknownGlobalSideEffects && this.variable instanceof GlobalVariable && !this.isPureFunction(EMPTY_PATH) && this.variable.hasEffectsOnInteractionAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_ACCESS, context);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    switch (interaction.type) {
      case INTERACTION_ACCESSED: {
        return this.variable !== null && !this.isPureFunction(path2) && this.getVariableRespectingTDZ().hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      case INTERACTION_ASSIGNED: {
        return (path2.length > 0 ? this.getVariableRespectingTDZ() : this.variable).hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      case INTERACTION_CALLED: {
        return !this.isPureFunction(path2) && this.getVariableRespectingTDZ().hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
    }
  }
  include() {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    if (!this.included) {
      this.included = true;
      if (this.variable !== null) {
        this.scope.context.includeVariableInModule(this.variable);
      }
    }
  }
  includeCallArguments(context, parameters) {
    this.variable.includeCallArguments(context, parameters);
  }
  isPossibleTDZ() {
    const cachedTdzAccess = this.isTDZAccess;
    if (cachedTdzAccess !== null)
      return cachedTdzAccess;
    if (!(this.variable instanceof LocalVariable && this.variable.kind && this.variable.kind in tdzVariableKinds && // we ignore possible TDZs due to circular module dependencies as
    // otherwise we get many false positives
    this.variable.module === this.scope.context.module)) {
      return this.isTDZAccess = false;
    }
    let decl_id;
    if (this.variable.declarations && this.variable.declarations.length === 1 && (decl_id = this.variable.declarations[0]) && this.start < decl_id.start && closestParentFunctionOrProgram(this) === closestParentFunctionOrProgram(decl_id)) {
      return this.isTDZAccess = true;
    }
    if (!this.variable.initReached && this.scope.context.module.isExecuted) {
      return this.isTDZAccess = true;
    }
    return this.isTDZAccess = false;
  }
  markDeclarationReached() {
    this.variable.initReached = true;
  }
  render(code, { snippets: { getPropertyAccess }, useOriginalName }, { renderedParentType, isCalleeOfRenderedParent, isShorthandProperty } = BLANK) {
    if (this.variable) {
      const name = this.variable.getName(getPropertyAccess, useOriginalName);
      if (name !== this.name) {
        code.overwrite(this.start, this.end, name, {
          contentOnly: true,
          storeName: true
        });
        if (isShorthandProperty) {
          code.prependRight(this.start, `${this.name}: `);
        }
      }
      if (name === "eval" && renderedParentType === CallExpression && isCalleeOfRenderedParent) {
        code.appendRight(this.start, "0, ");
      }
    }
  }
  disallowImportReassignment() {
    return this.scope.context.error(logIllegalImportReassignment(this.name, this.scope.context.module.id), this.start);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    if (this.variable instanceof LocalVariable) {
      this.variable.consolidateInitializers();
      this.scope.context.requestTreeshakingPass();
    }
  }
  getVariableRespectingTDZ() {
    if (this.isPossibleTDZ()) {
      return UNKNOWN_EXPRESSION;
    }
    return this.variable;
  }
  isPureFunction(path2) {
    let currentPureFunction = this.scope.context.manualPureFunctions[this.name];
    for (const segment of path2) {
      if (currentPureFunction) {
        if (currentPureFunction[PureFunctionKey]) {
          return true;
        }
        currentPureFunction = currentPureFunction[segment];
      } else {
        return false;
      }
    }
    return currentPureFunction?.[PureFunctionKey];
  }
};
function closestParentFunctionOrProgram(node) {
  while (node && !/^Program|Function/.test(node.type)) {
    node = node.parent;
  }
  return node;
}
function treeshakeNode(node, code, start, end) {
  code.remove(start, end);
  node.removeAnnotations(code);
}
var NO_SEMICOLON = { isNoStatement: true };
function findFirstOccurrenceOutsideComment(code, searchString, start = 0) {
  let searchPos, charCodeAfterSlash;
  searchPos = code.indexOf(searchString, start);
  while (true) {
    start = code.indexOf("/", start);
    if (start === -1 || start >= searchPos)
      return searchPos;
    charCodeAfterSlash = code.charCodeAt(++start);
    ++start;
    start = charCodeAfterSlash === 47 ? code.indexOf("\n", start) + 1 : code.indexOf("*/", start) + 2;
    if (start > searchPos) {
      searchPos = code.indexOf(searchString, start);
    }
  }
}
var NON_WHITESPACE = /\S/g;
function findNonWhiteSpace(code, index) {
  NON_WHITESPACE.lastIndex = index;
  const result = NON_WHITESPACE.exec(code);
  return result.index;
}
function findFirstLineBreakOutsideComment(code) {
  let lineBreakPos, charCodeAfterSlash, start = 0;
  lineBreakPos = code.indexOf("\n", start);
  while (true) {
    start = code.indexOf("/", start);
    if (start === -1 || start > lineBreakPos)
      return [lineBreakPos, lineBreakPos + 1];
    charCodeAfterSlash = code.charCodeAt(start + 1);
    if (charCodeAfterSlash === 47)
      return [start, lineBreakPos + 1];
    start = code.indexOf("*/", start + 2) + 2;
    if (start > lineBreakPos) {
      lineBreakPos = code.indexOf("\n", start);
    }
  }
}
function renderStatementList(statements, code, start, end, options) {
  let currentNode, currentNodeStart, currentNodeNeedsBoundaries, nextNodeStart;
  let nextNode = statements[0];
  let nextNodeNeedsBoundaries = !nextNode.included || nextNode.needsBoundaries;
  if (nextNodeNeedsBoundaries) {
    nextNodeStart = start + findFirstLineBreakOutsideComment(code.original.slice(start, nextNode.start))[1];
  }
  for (let nextIndex = 1; nextIndex <= statements.length; nextIndex++) {
    currentNode = nextNode;
    currentNodeStart = nextNodeStart;
    currentNodeNeedsBoundaries = nextNodeNeedsBoundaries;
    nextNode = statements[nextIndex];
    nextNodeNeedsBoundaries = nextNode === void 0 ? false : !nextNode.included || nextNode.needsBoundaries;
    if (currentNodeNeedsBoundaries || nextNodeNeedsBoundaries) {
      nextNodeStart = currentNode.end + findFirstLineBreakOutsideComment(code.original.slice(currentNode.end, nextNode === void 0 ? end : nextNode.start))[1];
      if (currentNode.included) {
        currentNodeNeedsBoundaries ? currentNode.render(code, options, {
          end: nextNodeStart,
          start: currentNodeStart
        }) : currentNode.render(code, options);
      } else {
        treeshakeNode(currentNode, code, currentNodeStart, nextNodeStart);
      }
    } else {
      currentNode.render(code, options);
    }
  }
}
function getCommaSeparatedNodesWithBoundaries(nodes, code, start, end) {
  const splitUpNodes = [];
  let node, nextNodeStart, contentEnd, char;
  let separator = start - 1;
  for (const nextNode of nodes) {
    if (node !== void 0) {
      separator = node.end + findFirstOccurrenceOutsideComment(code.original.slice(node.end, nextNode.start), ",");
    }
    nextNodeStart = contentEnd = separator + 1 + findFirstLineBreakOutsideComment(code.original.slice(separator + 1, nextNode.start))[1];
    while (char = code.original.charCodeAt(nextNodeStart), char === 32 || char === 9 || char === 10 || char === 13)
      nextNodeStart++;
    if (node !== void 0) {
      splitUpNodes.push({
        contentEnd,
        end: nextNodeStart,
        node,
        separator,
        start
      });
    }
    node = nextNode;
    start = nextNodeStart;
  }
  splitUpNodes.push({
    contentEnd: end,
    end,
    node,
    separator: null,
    start
  });
  return splitUpNodes;
}
function removeLineBreaks(code, start, end) {
  while (true) {
    const [removeStart, removeEnd] = findFirstLineBreakOutsideComment(code.original.slice(start, end));
    if (removeStart === -1) {
      break;
    }
    code.remove(start + removeStart, start += removeEnd);
  }
}
var BlockScope = class extends ChildScope {
  constructor(parent) {
    super(parent, parent.context);
  }
  addDeclaration(identifier2, context, init2, kind) {
    if (kind === "var") {
      const name = identifier2.name;
      const existingVariable = this.hoistedVariables?.get(name) || this.variables.get(name);
      if (existingVariable) {
        if (existingVariable.kind === "var" || kind === "var" && existingVariable.kind === "parameter") {
          existingVariable.addDeclaration(identifier2, init2);
          return existingVariable;
        }
        return context.error(logRedeclarationError(name), identifier2.start);
      }
      const declaredVariable = this.parent.addDeclaration(identifier2, context, init2, kind);
      declaredVariable.markInitializersForDeoptimization();
      this.addHoistedVariable(name, declaredVariable);
      return declaredVariable;
    }
    return super.addDeclaration(identifier2, context, init2, kind);
  }
};
var ExpressionStatement2 = class extends NodeBase {
  initialise() {
    super.initialise();
    if (this.directive && this.directive !== "use strict" && this.parent.type === Program) {
      this.scope.context.log(
        LOGLEVEL_WARN,
        // This is necessary, because either way (deleting or not) can lead to errors.
        logModuleLevelDirective(this.directive, this.scope.context.module.id),
        this.start
      );
    }
  }
  removeAnnotations(code) {
    this.expression.removeAnnotations(code);
  }
  render(code, options) {
    super.render(code, options);
    if (code.original[this.end - 1] !== ";") {
      code.appendLeft(this.end, ";");
    }
  }
  shouldBeIncluded(context) {
    if (this.directive && this.directive !== "use strict")
      return this.parent.type !== Program;
    return super.shouldBeIncluded(context);
  }
  applyDeoptimizations() {
  }
};
var BlockStatement2 = class extends NodeBase {
  get deoptimizeBody() {
    return isFlagSet(
      this.flags,
      32768
      /* Flag.deoptimizeBody */
    );
  }
  set deoptimizeBody(value) {
    this.flags = setFlag(this.flags, 32768, value);
  }
  get directlyIncluded() {
    return isFlagSet(
      this.flags,
      16384
      /* Flag.directlyIncluded */
    );
  }
  set directlyIncluded(value) {
    this.flags = setFlag(this.flags, 16384, value);
  }
  addImplicitReturnExpressionToScope() {
    const lastStatement = this.body[this.body.length - 1];
    if (!lastStatement || lastStatement.type !== ReturnStatement) {
      this.scope.addReturnExpression(UNKNOWN_EXPRESSION);
    }
  }
  createScope(parentScope) {
    this.scope = this.parent.preventChildBlockScope ? parentScope : new BlockScope(parentScope);
  }
  hasEffects(context) {
    if (this.deoptimizeBody)
      return true;
    for (const node of this.body) {
      if (context.brokenFlow)
        break;
      if (node.hasEffects(context))
        return true;
    }
    return false;
  }
  include(context, includeChildrenRecursively) {
    if (!(this.deoptimizeBody && this.directlyIncluded)) {
      this.included = true;
      this.directlyIncluded = true;
      if (this.deoptimizeBody)
        includeChildrenRecursively = true;
      for (const node of this.body) {
        if (includeChildrenRecursively || node.shouldBeIncluded(context))
          node.include(context, includeChildrenRecursively);
      }
    }
  }
  initialise() {
    super.initialise();
    const firstBodyStatement = this.body[0];
    this.deoptimizeBody = firstBodyStatement instanceof ExpressionStatement2 && firstBodyStatement.directive === "use asm";
  }
  render(code, options) {
    if (this.body.length > 0) {
      renderStatementList(this.body, code, this.start + 1, this.end - 1, options);
    } else {
      super.render(code, options);
    }
  }
};
var RestElement = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.declarationInit = null;
  }
  addExportedVariables(variables, exportNamesByVariable) {
    this.argument.addExportedVariables(variables, exportNamesByVariable);
  }
  declare(kind, init2) {
    this.declarationInit = init2;
    return this.argument.declare(kind, UNKNOWN_EXPRESSION);
  }
  deoptimizePath(path2) {
    path2.length === 0 && this.argument.deoptimizePath(EMPTY_PATH);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return path2.length > 0 || this.argument.hasEffectsOnInteractionAtPath(EMPTY_PATH, interaction, context);
  }
  markDeclarationReached() {
    this.argument.markDeclarationReached();
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    if (this.declarationInit !== null) {
      this.declarationInit.deoptimizePath([UnknownKey, UnknownKey]);
      this.scope.context.requestTreeshakingPass();
    }
  }
};
var FunctionBase = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.objectEntity = null;
  }
  get async() {
    return isFlagSet(
      this.flags,
      256
      /* Flag.async */
    );
  }
  set async(value) {
    this.flags = setFlag(this.flags, 256, value);
  }
  get deoptimizedReturn() {
    return isFlagSet(
      this.flags,
      512
      /* Flag.deoptimizedReturn */
    );
  }
  set deoptimizedReturn(value) {
    this.flags = setFlag(this.flags, 512, value);
  }
  get generator() {
    return isFlagSet(
      this.flags,
      4194304
      /* Flag.generator */
    );
  }
  set generator(value) {
    this.flags = setFlag(this.flags, 4194304, value);
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    if (interaction.type === INTERACTION_CALLED) {
      const { parameters } = this.scope;
      const { args } = interaction;
      let hasRest = false;
      for (let position = 0; position < args.length - 1; position++) {
        const parameter = this.params[position];
        const argument = args[position + 1];
        if (hasRest || parameter instanceof RestElement) {
          hasRest = true;
          argument.deoptimizePath(UNKNOWN_PATH);
        } else if (parameter instanceof Identifier2) {
          parameters[position][0].addEntityToBeDeoptimized(argument);
          this.addArgumentToBeDeoptimized(argument);
        } else if (parameter) {
          argument.deoptimizePath(UNKNOWN_PATH);
        } else {
          this.addArgumentToBeDeoptimized(argument);
        }
      }
    } else {
      this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
    }
  }
  deoptimizePath(path2) {
    this.getObjectEntity().deoptimizePath(path2);
    if (path2.length === 1 && path2[0] === UnknownKey) {
      this.scope.getReturnExpression().deoptimizePath(UNKNOWN_PATH);
      for (const parameterList of this.scope.parameters) {
        for (const parameter of parameterList) {
          parameter.deoptimizePath(UNKNOWN_PATH);
        }
      }
    }
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    return this.getObjectEntity().getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    if (path2.length > 0) {
      return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
    }
    if (this.async) {
      if (!this.deoptimizedReturn) {
        this.deoptimizedReturn = true;
        this.scope.getReturnExpression().deoptimizePath(UNKNOWN_PATH);
        this.scope.context.requestTreeshakingPass();
      }
      return UNKNOWN_RETURN_EXPRESSION;
    }
    return [this.scope.getReturnExpression(), false];
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (path2.length > 0 || interaction.type !== INTERACTION_CALLED) {
      return this.getObjectEntity().hasEffectsOnInteractionAtPath(path2, interaction, context);
    }
    if (this.annotationNoSideEffects) {
      return false;
    }
    if (this.async) {
      const { propertyReadSideEffects } = this.scope.context.options.treeshake;
      const returnExpression = this.scope.getReturnExpression();
      if (returnExpression.hasEffectsOnInteractionAtPath(["then"], NODE_INTERACTION_UNKNOWN_CALL, context) || propertyReadSideEffects && (propertyReadSideEffects === "always" || returnExpression.hasEffectsOnInteractionAtPath(["then"], NODE_INTERACTION_UNKNOWN_ACCESS, context))) {
        return true;
      }
    }
    for (const parameter of this.params) {
      if (parameter.hasEffects(context))
        return true;
    }
    return false;
  }
  include(context, includeChildrenRecursively) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    this.included = true;
    const { brokenFlow } = context;
    context.brokenFlow = false;
    this.body.include(context, includeChildrenRecursively);
    context.brokenFlow = brokenFlow;
  }
  includeCallArguments(context, parameters) {
    this.scope.includeCallArguments(context, parameters);
  }
  initialise() {
    super.initialise();
    if (this.body instanceof BlockStatement2) {
      this.body.addImplicitReturnExpressionToScope();
    } else {
      this.scope.addReturnExpression(this.body);
    }
    if (this.annotations && this.scope.context.options.treeshake.annotations) {
      this.annotationNoSideEffects = this.annotations.some((comment) => comment.type === "noSideEffects");
    }
  }
  parseNode(esTreeNode) {
    const { body, params } = esTreeNode;
    const parameters = this.params = [];
    const { scope } = this;
    const { bodyScope, context } = scope;
    for (const parameter of params) {
      parameters.push(new (context.getNodeConstructor(parameter.type))(this, scope).parseNode(parameter));
    }
    scope.addParameterVariables(parameters.map((parameter) => parameter.declare("parameter", UNKNOWN_EXPRESSION)), parameters[parameters.length - 1] instanceof RestElement);
    this.body = new (context.getNodeConstructor(body.type))(this, bodyScope).parseNode(body);
    return super.parseNode(esTreeNode);
  }
  addArgumentToBeDeoptimized(_argument) {
  }
  applyDeoptimizations() {
  }
};
FunctionBase.prototype.preventChildBlockScope = true;
var ArrowFunctionExpression2 = class extends FunctionBase {
  constructor() {
    super(...arguments);
    this.objectEntity = null;
  }
  get expression() {
    return isFlagSet(
      this.flags,
      8388608
      /* Flag.expression */
    );
  }
  set expression(value) {
    this.flags = setFlag(this.flags, 8388608, value);
  }
  createScope(parentScope) {
    this.scope = new ReturnValueScope(parentScope, false);
  }
  hasEffects() {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    return false;
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (super.hasEffectsOnInteractionAtPath(path2, interaction, context)) {
      return true;
    }
    if (this.annotationNoSideEffects) {
      return false;
    }
    if (interaction.type === INTERACTION_CALLED) {
      const { ignore, brokenFlow } = context;
      context.ignore = {
        breaks: false,
        continues: false,
        labels: /* @__PURE__ */ new Set(),
        returnYield: true,
        this: false
      };
      if (this.body.hasEffects(context))
        return true;
      context.ignore = ignore;
      context.brokenFlow = brokenFlow;
    }
    return false;
  }
  include(context, includeChildrenRecursively) {
    super.include(context, includeChildrenRecursively);
    for (const parameter of this.params) {
      if (!(parameter instanceof Identifier2)) {
        parameter.include(context, includeChildrenRecursively);
      }
    }
  }
  getObjectEntity() {
    if (this.objectEntity !== null) {
      return this.objectEntity;
    }
    return this.objectEntity = new ObjectEntity([], OBJECT_PROTOTYPE);
  }
};
function getSystemExportStatement(exportedVariables, { exportNamesByVariable, snippets: { _, getObject, getPropertyAccess } }, modifier = "") {
  if (exportedVariables.length === 1 && exportNamesByVariable.get(exportedVariables[0]).length === 1) {
    const variable = exportedVariables[0];
    return `exports(${JSON.stringify(exportNamesByVariable.get(variable)[0])},${_}${variable.getName(getPropertyAccess)}${modifier})`;
  } else {
    const fields = [];
    for (const variable of exportedVariables) {
      for (const exportName of exportNamesByVariable.get(variable)) {
        fields.push([exportName, variable.getName(getPropertyAccess) + modifier]);
      }
    }
    return `exports(${getObject(fields, { lineBreakIndent: null })})`;
  }
}
function renderSystemExportExpression(exportedVariable, expressionStart, expressionEnd, code, { exportNamesByVariable, snippets: { _ } }) {
  code.prependRight(expressionStart, `exports(${JSON.stringify(exportNamesByVariable.get(exportedVariable)[0])},${_}`);
  code.appendLeft(expressionEnd, ")");
}
function renderSystemExportFunction(exportedVariables, expressionStart, expressionEnd, needsParens, code, options) {
  const { _, getDirectReturnIifeLeft } = options.snippets;
  code.prependRight(expressionStart, getDirectReturnIifeLeft(["v"], `${getSystemExportStatement(exportedVariables, options)},${_}v`, { needsArrowReturnParens: true, needsWrappedFunction: needsParens }));
  code.appendLeft(expressionEnd, ")");
}
function renderSystemExportSequenceAfterExpression(exportedVariable, expressionStart, expressionEnd, needsParens, code, options) {
  const { _, getPropertyAccess } = options.snippets;
  code.appendLeft(expressionEnd, `,${_}${getSystemExportStatement([exportedVariable], options)},${_}${exportedVariable.getName(getPropertyAccess)}`);
  if (needsParens) {
    code.prependRight(expressionStart, "(");
    code.appendLeft(expressionEnd, ")");
  }
}
function renderSystemExportSequenceBeforeExpression(exportedVariable, expressionStart, expressionEnd, needsParens, code, options, modifier) {
  const { _ } = options.snippets;
  code.prependRight(expressionStart, `${getSystemExportStatement([exportedVariable], options, modifier)},${_}`);
  if (needsParens) {
    code.prependRight(expressionStart, "(");
    code.appendLeft(expressionEnd, ")");
  }
}
var ObjectPattern = class extends NodeBase {
  addExportedVariables(variables, exportNamesByVariable) {
    for (const property2 of this.properties) {
      if (property2.type === Property) {
        property2.value.addExportedVariables(variables, exportNamesByVariable);
      } else {
        property2.argument.addExportedVariables(variables, exportNamesByVariable);
      }
    }
  }
  declare(kind, init2) {
    const variables = [];
    for (const property2 of this.properties) {
      variables.push(...property2.declare(kind, init2));
    }
    return variables;
  }
  deoptimizePath(path2) {
    if (path2.length === 0) {
      for (const property2 of this.properties) {
        property2.deoptimizePath(path2);
      }
    }
  }
  hasEffectsOnInteractionAtPath(_path, interaction, context) {
    for (const property2 of this.properties) {
      if (property2.hasEffectsOnInteractionAtPath(EMPTY_PATH, interaction, context))
        return true;
    }
    return false;
  }
  markDeclarationReached() {
    for (const property2 of this.properties) {
      property2.markDeclarationReached();
    }
  }
};
var AssignmentExpression = class extends NodeBase {
  hasEffects(context) {
    const { deoptimized, left, operator, right } = this;
    if (!deoptimized)
      this.applyDeoptimizations();
    return right.hasEffects(context) || left.hasEffectsAsAssignmentTarget(context, operator !== "=");
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return this.right.hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  include(context, includeChildrenRecursively) {
    const { deoptimized, left, right, operator } = this;
    if (!deoptimized)
      this.applyDeoptimizations();
    this.included = true;
    if (includeChildrenRecursively || operator !== "=" || left.included || left.hasEffectsAsAssignmentTarget(createHasEffectsContext(), false)) {
      left.includeAsAssignmentTarget(context, includeChildrenRecursively, operator !== "=");
    }
    right.include(context, includeChildrenRecursively);
  }
  initialise() {
    super.initialise();
    if (this.left instanceof Identifier2) {
      const variable = this.scope.variables.get(this.left.name);
      if (variable?.kind === "const") {
        this.scope.context.error(logConstVariableReassignError(), this.left.start);
      }
    }
    this.left.setAssignedValue(this.right);
  }
  render(code, options, { preventASI, renderedParentType, renderedSurroundingElement } = BLANK) {
    const { left, right, start, end, parent } = this;
    if (left.included) {
      left.render(code, options);
      right.render(code, options);
    } else {
      const inclusionStart = findNonWhiteSpace(code.original, findFirstOccurrenceOutsideComment(code.original, "=", left.end) + 1);
      code.remove(start, inclusionStart);
      if (preventASI) {
        removeLineBreaks(code, inclusionStart, right.start);
      }
      right.render(code, options, {
        renderedParentType: renderedParentType || parent.type,
        renderedSurroundingElement: renderedSurroundingElement || parent.type
      });
    }
    if (options.format === "system") {
      if (left instanceof Identifier2) {
        const variable = left.variable;
        const exportNames = options.exportNamesByVariable.get(variable);
        if (exportNames) {
          if (exportNames.length === 1) {
            renderSystemExportExpression(variable, start, end, code, options);
          } else {
            renderSystemExportSequenceAfterExpression(variable, start, end, parent.type !== ExpressionStatement, code, options);
          }
          return;
        }
      } else {
        const systemPatternExports = [];
        left.addExportedVariables(systemPatternExports, options.exportNamesByVariable);
        if (systemPatternExports.length > 0) {
          renderSystemExportFunction(systemPatternExports, start, end, renderedSurroundingElement === ExpressionStatement, code, options);
          return;
        }
      }
    }
    if (left.included && left instanceof ObjectPattern && (renderedSurroundingElement === ExpressionStatement || renderedSurroundingElement === ArrowFunctionExpression)) {
      code.appendRight(start, "(");
      code.prependLeft(end, ")");
    }
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    this.left.deoptimizePath(EMPTY_PATH);
    this.right.deoptimizePath(UNKNOWN_PATH);
    this.scope.context.requestTreeshakingPass();
  }
};
var AssignmentPattern = class extends NodeBase {
  addExportedVariables(variables, exportNamesByVariable) {
    this.left.addExportedVariables(variables, exportNamesByVariable);
  }
  declare(kind, init2) {
    return this.left.declare(kind, init2);
  }
  deoptimizePath(path2) {
    path2.length === 0 && this.left.deoptimizePath(path2);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return path2.length > 0 || this.left.hasEffectsOnInteractionAtPath(EMPTY_PATH, interaction, context);
  }
  markDeclarationReached() {
    this.left.markDeclarationReached();
  }
  render(code, options, { isShorthandProperty } = BLANK) {
    this.left.render(code, options, { isShorthandProperty });
    this.right.render(code, options);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    this.left.deoptimizePath(EMPTY_PATH);
    this.right.deoptimizePath(UNKNOWN_PATH);
    this.scope.context.requestTreeshakingPass();
  }
};
var ArgumentsVariable = class extends LocalVariable {
  constructor(context) {
    super("arguments", null, UNKNOWN_EXPRESSION, context, "other");
    this.deoptimizedArguments = [];
  }
  addArgumentToBeDeoptimized(argument) {
    if (this.included) {
      argument.deoptimizePath(UNKNOWN_PATH);
    } else {
      this.deoptimizedArguments.push(argument);
    }
  }
  hasEffectsOnInteractionAtPath(path2, { type }) {
    return type !== INTERACTION_ACCESSED || path2.length > 1;
  }
  include() {
    super.include();
    for (const argument of this.deoptimizedArguments) {
      argument.deoptimizePath(UNKNOWN_PATH);
    }
    this.deoptimizedArguments.length = 0;
  }
};
var ThisVariable = class extends ParameterVariable {
  constructor(context) {
    super("this", null, context);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return (context.replacedVariableInits.get(this) || UNKNOWN_EXPRESSION).hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
};
var FunctionScope = class extends ReturnValueScope {
  constructor(parent) {
    const { context } = parent;
    super(parent, false);
    this.variables.set("arguments", this.argumentsVariable = new ArgumentsVariable(context));
    this.variables.set("this", this.thisVariable = new ThisVariable(context));
  }
  findLexicalBoundary() {
    return this;
  }
  includeCallArguments(context, parameters) {
    super.includeCallArguments(context, parameters);
    if (this.argumentsVariable.included) {
      for (const argument of parameters) {
        if (!argument.included) {
          argument.include(context, false);
        }
      }
    }
  }
};
var FunctionNode = class extends FunctionBase {
  constructor() {
    super(...arguments);
    this.objectEntity = null;
  }
  createScope(parentScope) {
    this.scope = new FunctionScope(parentScope);
    this.constructedEntity = new ObjectEntity(/* @__PURE__ */ Object.create(null), OBJECT_PROTOTYPE);
    this.scope.thisVariable.addEntityToBeDeoptimized(this.constructedEntity);
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    super.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
    if (interaction.type === INTERACTION_CALLED && path2.length === 0 && interaction.args[0]) {
      this.scope.thisVariable.addEntityToBeDeoptimized(interaction.args[0]);
    }
  }
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    if (this.annotationNoSideEffects) {
      return false;
    }
    return !!this.id?.hasEffects(context);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (super.hasEffectsOnInteractionAtPath(path2, interaction, context))
      return true;
    if (this.annotationNoSideEffects) {
      return false;
    }
    if (interaction.type === INTERACTION_CALLED) {
      const thisInit = context.replacedVariableInits.get(this.scope.thisVariable);
      context.replacedVariableInits.set(this.scope.thisVariable, interaction.withNew ? this.constructedEntity : UNKNOWN_EXPRESSION);
      const { brokenFlow, ignore, replacedVariableInits } = context;
      context.ignore = {
        breaks: false,
        continues: false,
        labels: /* @__PURE__ */ new Set(),
        returnYield: true,
        this: interaction.withNew
      };
      if (this.body.hasEffects(context))
        return true;
      context.brokenFlow = brokenFlow;
      if (thisInit) {
        replacedVariableInits.set(this.scope.thisVariable, thisInit);
      } else {
        replacedVariableInits.delete(this.scope.thisVariable);
      }
      context.ignore = ignore;
    }
    return false;
  }
  include(context, includeChildrenRecursively) {
    super.include(context, includeChildrenRecursively);
    this.id?.include();
    const hasArguments = this.scope.argumentsVariable.included;
    for (const parameter of this.params) {
      if (!(parameter instanceof Identifier2) || hasArguments) {
        parameter.include(context, includeChildrenRecursively);
      }
    }
  }
  initialise() {
    super.initialise();
    this.id?.declare("function", this);
  }
  addArgumentToBeDeoptimized(argument) {
    this.scope.argumentsVariable.addArgumentToBeDeoptimized(argument);
  }
  getObjectEntity() {
    if (this.objectEntity !== null) {
      return this.objectEntity;
    }
    return this.objectEntity = new ObjectEntity([
      {
        key: "prototype",
        kind: "init",
        property: new ObjectEntity([], OBJECT_PROTOTYPE)
      }
    ], OBJECT_PROTOTYPE);
  }
};
var AwaitExpression = class extends NodeBase {
  hasEffects() {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    return true;
  }
  include(context, includeChildrenRecursively) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    if (!this.included) {
      this.included = true;
      checkTopLevelAwait:
        if (!this.scope.context.usesTopLevelAwait) {
          let parent = this.parent;
          do {
            if (parent instanceof FunctionNode || parent instanceof ArrowFunctionExpression2)
              break checkTopLevelAwait;
          } while (parent = parent.parent);
          this.scope.context.usesTopLevelAwait = true;
        }
    }
    this.argument.include(context, includeChildrenRecursively);
  }
};
var binaryOperators = {
  "!=": (left, right) => left != right,
  "!==": (left, right) => left !== right,
  "%": (left, right) => left % right,
  "&": (left, right) => left & right,
  "*": (left, right) => left * right,
  // At the moment, "**" will be transpiled to Math.pow
  "**": (left, right) => left ** right,
  "+": (left, right) => left + right,
  "-": (left, right) => left - right,
  "/": (left, right) => left / right,
  "<": (left, right) => left < right,
  "<<": (left, right) => left << right,
  "<=": (left, right) => left <= right,
  "==": (left, right) => left == right,
  "===": (left, right) => left === right,
  ">": (left, right) => left > right,
  ">=": (left, right) => left >= right,
  ">>": (left, right) => left >> right,
  ">>>": (left, right) => left >>> right,
  "^": (left, right) => left ^ right,
  "|": (left, right) => left | right
  // We use the fallback for cases where we return something unknown
  // in: () => UnknownValue,
  // instanceof: () => UnknownValue,
};
var BinaryExpression = class extends NodeBase {
  deoptimizeCache() {
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    if (path2.length > 0)
      return UnknownValue;
    const leftValue = this.left.getLiteralValueAtPath(EMPTY_PATH, recursionTracker, origin);
    if (typeof leftValue === "symbol")
      return UnknownValue;
    const rightValue = this.right.getLiteralValueAtPath(EMPTY_PATH, recursionTracker, origin);
    if (typeof rightValue === "symbol")
      return UnknownValue;
    const operatorFunction = binaryOperators[this.operator];
    if (!operatorFunction)
      return UnknownValue;
    return operatorFunction(leftValue, rightValue);
  }
  hasEffects(context) {
    if (this.operator === "+" && this.parent instanceof ExpressionStatement2 && this.left.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this) === "") {
      return true;
    }
    return super.hasEffects(context);
  }
  hasEffectsOnInteractionAtPath(path2, { type }) {
    return type !== INTERACTION_ACCESSED || path2.length > 1;
  }
  removeAnnotations(code) {
    this.left.removeAnnotations(code);
  }
  render(code, options, { renderedSurroundingElement } = BLANK) {
    this.left.render(code, options, { renderedSurroundingElement });
    this.right.render(code, options);
  }
};
var BreakStatement = class extends NodeBase {
  hasEffects(context) {
    if (this.label) {
      if (!context.ignore.labels.has(this.label.name))
        return true;
      context.includedLabels.add(this.label.name);
    } else {
      if (!context.ignore.breaks)
        return true;
      context.hasBreak = true;
    }
    context.brokenFlow = true;
    return false;
  }
  include(context) {
    this.included = true;
    if (this.label) {
      this.label.include();
      context.includedLabels.add(this.label.name);
    } else {
      context.hasBreak = true;
    }
    context.brokenFlow = true;
  }
};
function renderCallArguments(code, options, node) {
  if (node.arguments.length > 0) {
    if (node.arguments[node.arguments.length - 1].included) {
      for (const argument of node.arguments) {
        argument.render(code, options);
      }
    } else {
      let lastIncludedIndex = node.arguments.length - 2;
      while (lastIncludedIndex >= 0 && !node.arguments[lastIncludedIndex].included) {
        lastIncludedIndex--;
      }
      if (lastIncludedIndex >= 0) {
        for (let index = 0; index <= lastIncludedIndex; index++) {
          node.arguments[index].render(code, options);
        }
        code.remove(findFirstOccurrenceOutsideComment(code.original, ",", node.arguments[lastIncludedIndex].end), node.end - 1);
      } else {
        code.remove(findFirstOccurrenceOutsideComment(code.original, "(", node.callee.end) + 1, node.end - 1);
      }
    }
  }
}
var Literal2 = class extends NodeBase {
  deoptimizeArgumentsOnInteractionAtPath() {
  }
  getLiteralValueAtPath(path2) {
    if (path2.length > 0 || // unknown literals can also be null but do not start with an "n"
    this.value === null && this.scope.context.code.charCodeAt(this.start) !== 110 || typeof this.value === "bigint" || // to support shims for regular expressions
    this.scope.context.code.charCodeAt(this.start) === 47) {
      return UnknownValue;
    }
    return this.value;
  }
  getReturnExpressionWhenCalledAtPath(path2) {
    if (path2.length !== 1)
      return UNKNOWN_RETURN_EXPRESSION;
    return getMemberReturnExpressionWhenCalled(this.members, path2[0]);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    switch (interaction.type) {
      case INTERACTION_ACCESSED: {
        return path2.length > (this.value === null ? 0 : 1);
      }
      case INTERACTION_ASSIGNED: {
        return true;
      }
      case INTERACTION_CALLED: {
        if (this.included && this.value instanceof RegExp && (this.value.global || this.value.sticky)) {
          return true;
        }
        return path2.length !== 1 || hasMemberEffectWhenCalled(this.members, path2[0], interaction, context);
      }
    }
  }
  initialise() {
    super.initialise();
    this.members = getLiteralMembersForValue(this.value);
  }
  parseNode(esTreeNode) {
    this.value = esTreeNode.value;
    this.regex = esTreeNode.regex;
    return super.parseNode(esTreeNode);
  }
  render(code) {
    if (typeof this.value === "string") {
      code.indentExclusionRanges.push([this.start + 1, this.end - 1]);
    }
  }
};
var MAX_PATH_DEPTH = 7;
function getResolvablePropertyKey(memberExpression2) {
  return memberExpression2.computed ? getResolvableComputedPropertyKey(memberExpression2.property) : memberExpression2.property.name;
}
function getResolvableComputedPropertyKey(propertyKey) {
  if (propertyKey instanceof Literal2) {
    return String(propertyKey.value);
  }
  return null;
}
function getPathIfNotComputed(memberExpression2) {
  const nextPathKey = memberExpression2.propertyKey;
  const object = memberExpression2.object;
  if (typeof nextPathKey === "string") {
    if (object instanceof Identifier2) {
      return [
        { key: object.name, pos: object.start },
        { key: nextPathKey, pos: memberExpression2.property.start }
      ];
    }
    if (object instanceof MemberExpression) {
      const parentPath = getPathIfNotComputed(object);
      return parentPath && [...parentPath, { key: nextPathKey, pos: memberExpression2.property.start }];
    }
  }
  return null;
}
function getStringFromPath(path2) {
  let pathString = path2[0].key;
  for (let index = 1; index < path2.length; index++) {
    pathString += "." + path2[index].key;
  }
  return pathString;
}
var MemberExpression = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.variable = null;
    this.expressionsToBeDeoptimized = [];
  }
  get computed() {
    return isFlagSet(
      this.flags,
      1024
      /* Flag.computed */
    );
  }
  set computed(value) {
    this.flags = setFlag(this.flags, 1024, value);
  }
  get optional() {
    return isFlagSet(
      this.flags,
      128
      /* Flag.optional */
    );
  }
  set optional(value) {
    this.flags = setFlag(this.flags, 128, value);
  }
  get assignmentDeoptimized() {
    return isFlagSet(
      this.flags,
      16
      /* Flag.assignmentDeoptimized */
    );
  }
  set assignmentDeoptimized(value) {
    this.flags = setFlag(this.flags, 16, value);
  }
  get bound() {
    return isFlagSet(
      this.flags,
      32
      /* Flag.bound */
    );
  }
  set bound(value) {
    this.flags = setFlag(this.flags, 32, value);
  }
  get isUndefined() {
    return isFlagSet(
      this.flags,
      64
      /* Flag.isUndefined */
    );
  }
  set isUndefined(value) {
    this.flags = setFlag(this.flags, 64, value);
  }
  bind() {
    this.bound = true;
    const path2 = getPathIfNotComputed(this);
    const baseVariable = path2 && this.scope.findVariable(path2[0].key);
    if (baseVariable?.isNamespace) {
      const resolvedVariable = resolveNamespaceVariables(baseVariable, path2.slice(1), this.scope.context);
      if (!resolvedVariable) {
        super.bind();
      } else if (resolvedVariable === "undefined") {
        this.isUndefined = true;
      } else {
        this.variable = resolvedVariable;
        this.scope.addNamespaceMemberAccess(getStringFromPath(path2), resolvedVariable);
      }
    } else {
      super.bind();
    }
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    if (this.variable) {
      this.variable.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
    } else if (!this.isUndefined) {
      if (path2.length < MAX_PATH_DEPTH) {
        this.object.deoptimizeArgumentsOnInteractionAtPath(interaction, [this.getPropertyKey(), ...path2], recursionTracker);
      } else {
        deoptimizeInteraction(interaction);
      }
    }
  }
  deoptimizeCache() {
    const { expressionsToBeDeoptimized, object } = this;
    this.expressionsToBeDeoptimized = EMPTY_ARRAY;
    this.propertyKey = UnknownKey;
    object.deoptimizePath(UNKNOWN_PATH);
    for (const expression of expressionsToBeDeoptimized) {
      expression.deoptimizeCache();
    }
  }
  deoptimizePath(path2) {
    if (path2.length === 0)
      this.disallowNamespaceReassignment();
    if (this.variable) {
      this.variable.deoptimizePath(path2);
    } else if (!this.isUndefined && path2.length < MAX_PATH_DEPTH) {
      const propertyKey = this.getPropertyKey();
      this.object.deoptimizePath([
        propertyKey === UnknownKey ? UnknownNonAccessorKey : propertyKey,
        ...path2
      ]);
    }
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    if (this.variable) {
      return this.variable.getLiteralValueAtPath(path2, recursionTracker, origin);
    }
    if (this.isUndefined) {
      return void 0;
    }
    if (this.propertyKey !== UnknownKey && path2.length < MAX_PATH_DEPTH) {
      this.expressionsToBeDeoptimized.push(origin);
      return this.object.getLiteralValueAtPath([this.getPropertyKey(), ...path2], recursionTracker, origin);
    }
    return UnknownValue;
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    if (this.variable) {
      return this.variable.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
    }
    if (this.isUndefined) {
      return [UNDEFINED_EXPRESSION, false];
    }
    if (this.propertyKey !== UnknownKey && path2.length < MAX_PATH_DEPTH) {
      this.expressionsToBeDeoptimized.push(origin);
      return this.object.getReturnExpressionWhenCalledAtPath([this.getPropertyKey(), ...path2], interaction, recursionTracker, origin);
    }
    return UNKNOWN_RETURN_EXPRESSION;
  }
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    return this.property.hasEffects(context) || this.object.hasEffects(context) || this.hasAccessEffect(context);
  }
  hasEffectsAsAssignmentTarget(context, checkAccess) {
    if (checkAccess && !this.deoptimized)
      this.applyDeoptimizations();
    if (!this.assignmentDeoptimized)
      this.applyAssignmentDeoptimization();
    return this.property.hasEffects(context) || this.object.hasEffects(context) || checkAccess && this.hasAccessEffect(context) || this.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.assignmentInteraction, context);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (this.variable) {
      return this.variable.hasEffectsOnInteractionAtPath(path2, interaction, context);
    }
    if (this.isUndefined) {
      return true;
    }
    if (path2.length < MAX_PATH_DEPTH) {
      return this.object.hasEffectsOnInteractionAtPath([this.getPropertyKey(), ...path2], interaction, context);
    }
    return true;
  }
  include(context, includeChildrenRecursively) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    this.includeProperties(context, includeChildrenRecursively);
  }
  includeAsAssignmentTarget(context, includeChildrenRecursively, deoptimizeAccess) {
    if (!this.assignmentDeoptimized)
      this.applyAssignmentDeoptimization();
    if (deoptimizeAccess) {
      this.include(context, includeChildrenRecursively);
    } else {
      this.includeProperties(context, includeChildrenRecursively);
    }
  }
  includeCallArguments(context, parameters) {
    if (this.variable) {
      this.variable.includeCallArguments(context, parameters);
    } else {
      super.includeCallArguments(context, parameters);
    }
  }
  initialise() {
    super.initialise();
    this.propertyKey = getResolvablePropertyKey(this);
    this.accessInteraction = { args: [this.object], type: INTERACTION_ACCESSED };
  }
  isSkippedAsOptional(origin) {
    return !this.variable && !this.isUndefined && (this.object.isSkippedAsOptional?.(origin) || this.optional && this.object.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, origin) == null);
  }
  render(code, options, { renderedParentType, isCalleeOfRenderedParent, renderedSurroundingElement } = BLANK) {
    if (this.variable || this.isUndefined) {
      const { snippets: { getPropertyAccess } } = options;
      let replacement = this.variable ? this.variable.getName(getPropertyAccess) : "undefined";
      if (renderedParentType && isCalleeOfRenderedParent)
        replacement = "0, " + replacement;
      code.overwrite(this.start, this.end, replacement, {
        contentOnly: true,
        storeName: true
      });
    } else {
      if (renderedParentType && isCalleeOfRenderedParent) {
        code.appendRight(this.start, "0, ");
      }
      this.object.render(code, options, { renderedSurroundingElement });
      this.property.render(code, options);
    }
  }
  setAssignedValue(value) {
    this.assignmentInteraction = {
      args: [this.object, value],
      type: INTERACTION_ASSIGNED
    };
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    const { propertyReadSideEffects } = this.scope.context.options.treeshake;
    if (
      // Namespaces are not bound and should not be deoptimized
      this.bound && propertyReadSideEffects && !(this.variable || this.isUndefined)
    ) {
      const propertyKey = this.getPropertyKey();
      this.object.deoptimizeArgumentsOnInteractionAtPath(this.accessInteraction, [propertyKey], SHARED_RECURSION_TRACKER);
      this.scope.context.requestTreeshakingPass();
    }
  }
  applyAssignmentDeoptimization() {
    this.assignmentDeoptimized = true;
    const { propertyReadSideEffects } = this.scope.context.options.treeshake;
    if (
      // Namespaces are not bound and should not be deoptimized
      this.bound && propertyReadSideEffects && !(this.variable || this.isUndefined)
    ) {
      this.object.deoptimizeArgumentsOnInteractionAtPath(this.assignmentInteraction, [this.getPropertyKey()], SHARED_RECURSION_TRACKER);
      this.scope.context.requestTreeshakingPass();
    }
  }
  disallowNamespaceReassignment() {
    if (this.object instanceof Identifier2) {
      const variable = this.scope.findVariable(this.object.name);
      if (variable.isNamespace) {
        if (this.variable) {
          this.scope.context.includeVariableInModule(this.variable);
        }
        this.scope.context.log(LOGLEVEL_WARN, logIllegalImportReassignment(this.object.name, this.scope.context.module.id), this.start);
      }
    }
  }
  getPropertyKey() {
    if (this.propertyKey === null) {
      this.propertyKey = UnknownKey;
      const value = this.property.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
      return this.propertyKey = value === SymbolToStringTag ? value : typeof value === "symbol" ? UnknownKey : String(value);
    }
    return this.propertyKey;
  }
  hasAccessEffect(context) {
    const { propertyReadSideEffects } = this.scope.context.options.treeshake;
    return !(this.variable || this.isUndefined) && propertyReadSideEffects && (propertyReadSideEffects === "always" || this.object.hasEffectsOnInteractionAtPath([this.getPropertyKey()], this.accessInteraction, context));
  }
  includeProperties(context, includeChildrenRecursively) {
    if (!this.included) {
      this.included = true;
      if (this.variable) {
        this.scope.context.includeVariableInModule(this.variable);
      }
    }
    this.object.include(context, includeChildrenRecursively);
    this.property.include(context, includeChildrenRecursively);
  }
};
function resolveNamespaceVariables(baseVariable, path2, astContext) {
  if (path2.length === 0)
    return baseVariable;
  if (!baseVariable.isNamespace || baseVariable instanceof ExternalVariable)
    return null;
  const exportName = path2[0].key;
  const variable = baseVariable.context.traceExport(exportName);
  if (!variable) {
    if (path2.length === 1) {
      const fileName = baseVariable.context.fileName;
      astContext.log(LOGLEVEL_WARN, logMissingExport(exportName, astContext.module.id, fileName), path2[0].pos);
      return "undefined";
    }
    return null;
  }
  return resolveNamespaceVariables(variable, path2.slice(1), astContext);
}
var CallExpressionBase = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.returnExpression = null;
    this.deoptimizableDependentExpressions = [];
    this.expressionsToBeDeoptimized = /* @__PURE__ */ new Set();
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    const { args } = interaction;
    const [returnExpression, isPure] = this.getReturnExpression(recursionTracker);
    if (isPure)
      return;
    const deoptimizedExpressions = args.filter((expression) => !!expression && expression !== UNKNOWN_EXPRESSION);
    if (deoptimizedExpressions.length === 0)
      return;
    if (returnExpression === UNKNOWN_EXPRESSION) {
      for (const expression of deoptimizedExpressions) {
        expression.deoptimizePath(UNKNOWN_PATH);
      }
    } else {
      recursionTracker.withTrackedEntityAtPath(path2, returnExpression, () => {
        for (const expression of deoptimizedExpressions) {
          this.expressionsToBeDeoptimized.add(expression);
        }
        returnExpression.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }, null);
    }
  }
  deoptimizeCache() {
    if (this.returnExpression?.[0] !== UNKNOWN_EXPRESSION) {
      this.returnExpression = UNKNOWN_RETURN_EXPRESSION;
      const { deoptimizableDependentExpressions, expressionsToBeDeoptimized } = this;
      this.expressionsToBeDeoptimized = EMPTY_SET;
      this.deoptimizableDependentExpressions = EMPTY_ARRAY;
      for (const expression of deoptimizableDependentExpressions) {
        expression.deoptimizeCache();
      }
      for (const expression of expressionsToBeDeoptimized) {
        expression.deoptimizePath(UNKNOWN_PATH);
      }
    }
  }
  deoptimizePath(path2) {
    if (path2.length === 0 || this.scope.context.deoptimizationTracker.trackEntityAtPathAndGetIfTracked(path2, this)) {
      return;
    }
    const [returnExpression] = this.getReturnExpression();
    if (returnExpression !== UNKNOWN_EXPRESSION) {
      returnExpression.deoptimizePath(path2);
    }
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    const [returnExpression] = this.getReturnExpression(recursionTracker);
    if (returnExpression === UNKNOWN_EXPRESSION) {
      return UnknownValue;
    }
    return recursionTracker.withTrackedEntityAtPath(path2, returnExpression, () => {
      this.deoptimizableDependentExpressions.push(origin);
      return returnExpression.getLiteralValueAtPath(path2, recursionTracker, origin);
    }, UnknownValue);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    const returnExpression = this.getReturnExpression(recursionTracker);
    if (returnExpression[0] === UNKNOWN_EXPRESSION) {
      return returnExpression;
    }
    return recursionTracker.withTrackedEntityAtPath(path2, returnExpression, () => {
      this.deoptimizableDependentExpressions.push(origin);
      const [expression, isPure] = returnExpression[0].getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
      return [expression, isPure || returnExpression[1]];
    }, UNKNOWN_RETURN_EXPRESSION);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    const { type } = interaction;
    if (type === INTERACTION_CALLED) {
      const { args, withNew } = interaction;
      if ((withNew ? context.instantiated : context.called).trackEntityAtPathAndGetIfTracked(path2, args, this)) {
        return false;
      }
    } else if ((type === INTERACTION_ASSIGNED ? context.assigned : context.accessed).trackEntityAtPathAndGetIfTracked(path2, this)) {
      return false;
    }
    const [returnExpression, isPure] = this.getReturnExpression();
    return (type === INTERACTION_ASSIGNED || !isPure) && returnExpression.hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
};
var CallExpression2 = class extends CallExpressionBase {
  get optional() {
    return isFlagSet(
      this.flags,
      128
      /* Flag.optional */
    );
  }
  set optional(value) {
    this.flags = setFlag(this.flags, 128, value);
  }
  bind() {
    super.bind();
    if (this.callee instanceof Identifier2) {
      const variable = this.scope.findVariable(this.callee.name);
      if (variable.isNamespace) {
        this.scope.context.log(LOGLEVEL_WARN, logCannotCallNamespace(this.callee.name), this.start);
      }
      if (this.callee.name === "eval") {
        this.scope.context.log(LOGLEVEL_WARN, logEval(this.scope.context.module.id), this.start);
      }
    }
    this.interaction = {
      args: [
        this.callee instanceof MemberExpression && !this.callee.variable ? this.callee.object : null,
        ...this.arguments
      ],
      type: INTERACTION_CALLED,
      withNew: false
    };
  }
  hasEffects(context) {
    try {
      for (const argument of this.arguments) {
        if (argument.hasEffects(context))
          return true;
      }
      if (this.annotationPure) {
        return false;
      }
      return this.callee.hasEffects(context) || this.callee.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.interaction, context);
    } finally {
      if (!this.deoptimized)
        this.applyDeoptimizations();
    }
  }
  include(context, includeChildrenRecursively) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    if (includeChildrenRecursively) {
      super.include(context, includeChildrenRecursively);
      if (includeChildrenRecursively === INCLUDE_PARAMETERS && this.callee instanceof Identifier2 && this.callee.variable) {
        this.callee.variable.markCalledFromTryStatement();
      }
    } else {
      this.included = true;
      this.callee.include(context, false);
    }
    this.callee.includeCallArguments(context, this.arguments);
  }
  initialise() {
    super.initialise();
    if (this.annotations && this.scope.context.options.treeshake.annotations) {
      this.annotationPure = this.annotations.some((comment) => comment.type === "pure");
    }
  }
  isSkippedAsOptional(origin) {
    return this.callee.isSkippedAsOptional?.(origin) || this.optional && this.callee.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, origin) == null;
  }
  render(code, options, { renderedSurroundingElement } = BLANK) {
    this.callee.render(code, options, {
      isCalleeOfRenderedParent: true,
      renderedSurroundingElement
    });
    renderCallArguments(code, options, this);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    this.callee.deoptimizeArgumentsOnInteractionAtPath(this.interaction, EMPTY_PATH, SHARED_RECURSION_TRACKER);
    this.scope.context.requestTreeshakingPass();
  }
  getReturnExpression(recursionTracker = SHARED_RECURSION_TRACKER) {
    if (this.returnExpression === null) {
      this.returnExpression = UNKNOWN_RETURN_EXPRESSION;
      return this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, this.interaction, recursionTracker, this);
    }
    return this.returnExpression;
  }
};
var CatchClause2 = class extends NodeBase {
  createScope(parentScope) {
    this.scope = new ParameterScope(parentScope, true);
  }
  parseNode(esTreeNode) {
    const { body, param, type } = esTreeNode;
    this.type = type;
    if (param) {
      this.param = new (this.scope.context.getNodeConstructor(param.type))(this, this.scope).parseNode(param);
      this.param.declare("parameter", UNKNOWN_EXPRESSION);
    }
    this.body = new BlockStatement2(this, this.scope.bodyScope).parseNode(body);
    return super.parseNode(esTreeNode);
  }
};
CatchClause2.prototype.preventChildBlockScope = true;
var ChainExpression = class extends NodeBase {
  // deoptimizations are not relevant as we are not caching values
  deoptimizeCache() {
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    if (this.expression.isSkippedAsOptional(origin))
      return void 0;
    return this.expression.getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  hasEffects(context) {
    if (this.expression.isSkippedAsOptional(this))
      return false;
    return this.expression.hasEffects(context);
  }
  removeAnnotations(code) {
    this.expression.removeAnnotations(code);
  }
};
var ClassBodyScope = class extends ChildScope {
  constructor(parent, classNode) {
    const { context } = parent;
    super(parent, context);
    this.variables.set("this", this.thisVariable = new LocalVariable("this", null, classNode, context, "other"));
    this.instanceScope = new ChildScope(this, context);
    this.instanceScope.variables.set("this", new ThisVariable(context));
  }
  findLexicalBoundary() {
    return this;
  }
};
var ClassBody = class extends NodeBase {
  createScope(parentScope) {
    this.scope = new ClassBodyScope(parentScope, this.parent);
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    this.scope.context.includeVariableInModule(this.scope.thisVariable);
    for (const definition of this.body) {
      definition.include(context, includeChildrenRecursively);
    }
  }
  parseNode(esTreeNode) {
    const body = this.body = [];
    for (const definition of esTreeNode.body) {
      body.push(new (this.scope.context.getNodeConstructor(definition.type))(this, definition.static ? this.scope : this.scope.instanceScope).parseNode(definition));
    }
    return super.parseNode(esTreeNode);
  }
  applyDeoptimizations() {
  }
};
var MethodBase = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.accessedValue = null;
  }
  get computed() {
    return isFlagSet(
      this.flags,
      1024
      /* Flag.computed */
    );
  }
  set computed(value) {
    this.flags = setFlag(this.flags, 1024, value);
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    if (interaction.type === INTERACTION_ACCESSED && this.kind === "get" && path2.length === 0) {
      return this.value.deoptimizeArgumentsOnInteractionAtPath({
        args: interaction.args,
        type: INTERACTION_CALLED,
        withNew: false
      }, EMPTY_PATH, recursionTracker);
    }
    if (interaction.type === INTERACTION_ASSIGNED && this.kind === "set" && path2.length === 0) {
      return this.value.deoptimizeArgumentsOnInteractionAtPath({
        args: interaction.args,
        type: INTERACTION_CALLED,
        withNew: false
      }, EMPTY_PATH, recursionTracker);
    }
    this.getAccessedValue()[0].deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  // As getter properties directly receive their values from fixed function
  // expressions, there is no known situation where a getter is deoptimized.
  deoptimizeCache() {
  }
  deoptimizePath(path2) {
    this.getAccessedValue()[0].deoptimizePath(path2);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    return this.getAccessedValue()[0].getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    return this.getAccessedValue()[0].getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
  }
  hasEffects(context) {
    return this.key.hasEffects(context);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (this.kind === "get" && interaction.type === INTERACTION_ACCESSED && path2.length === 0) {
      return this.value.hasEffectsOnInteractionAtPath(EMPTY_PATH, {
        args: interaction.args,
        type: INTERACTION_CALLED,
        withNew: false
      }, context);
    }
    if (this.kind === "set" && interaction.type === INTERACTION_ASSIGNED) {
      return this.value.hasEffectsOnInteractionAtPath(EMPTY_PATH, {
        args: interaction.args,
        type: INTERACTION_CALLED,
        withNew: false
      }, context);
    }
    return this.getAccessedValue()[0].hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  applyDeoptimizations() {
  }
  getAccessedValue() {
    if (this.accessedValue === null) {
      if (this.kind === "get") {
        this.accessedValue = UNKNOWN_RETURN_EXPRESSION;
        return this.accessedValue = this.value.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_CALL, SHARED_RECURSION_TRACKER, this);
      } else {
        return this.accessedValue = [this.value, false];
      }
    }
    return this.accessedValue;
  }
};
var MethodDefinition = class extends MethodBase {
  applyDeoptimizations() {
  }
};
var ObjectMember = class extends ExpressionEntity {
  constructor(object, key) {
    super();
    this.object = object;
    this.key = key;
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.object.deoptimizeArgumentsOnInteractionAtPath(interaction, [this.key, ...path2], recursionTracker);
  }
  deoptimizePath(path2) {
    this.object.deoptimizePath([this.key, ...path2]);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    return this.object.getLiteralValueAtPath([this.key, ...path2], recursionTracker, origin);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    return this.object.getReturnExpressionWhenCalledAtPath([this.key, ...path2], interaction, recursionTracker, origin);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return this.object.hasEffectsOnInteractionAtPath([this.key, ...path2], interaction, context);
  }
};
var ClassNode = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.objectEntity = null;
  }
  createScope(parentScope) {
    this.scope = new ChildScope(parentScope, parentScope.context);
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizeCache() {
    this.getObjectEntity().deoptimizeAllProperties();
  }
  deoptimizePath(path2) {
    this.getObjectEntity().deoptimizePath(path2);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    return this.getObjectEntity().getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
  }
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    const initEffect = this.superClass?.hasEffects(context) || this.body.hasEffects(context);
    this.id?.markDeclarationReached();
    return initEffect || super.hasEffects(context);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return interaction.type === INTERACTION_CALLED && path2.length === 0 ? !interaction.withNew || (this.classConstructor === null ? this.superClass?.hasEffectsOnInteractionAtPath(path2, interaction, context) : this.classConstructor.hasEffectsOnInteractionAtPath(path2, interaction, context)) || false : this.getObjectEntity().hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  include(context, includeChildrenRecursively) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    this.included = true;
    this.superClass?.include(context, includeChildrenRecursively);
    this.body.include(context, includeChildrenRecursively);
    if (this.id) {
      this.id.markDeclarationReached();
      this.id.include();
    }
  }
  initialise() {
    super.initialise();
    this.id?.declare("class", this);
    for (const method of this.body.body) {
      if (method instanceof MethodDefinition && method.kind === "constructor") {
        this.classConstructor = method;
        return;
      }
    }
    this.classConstructor = null;
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    for (const definition of this.body.body) {
      if (!(definition.static || definition instanceof MethodDefinition && definition.kind === "constructor")) {
        definition.deoptimizePath(UNKNOWN_PATH);
      }
    }
    this.scope.context.requestTreeshakingPass();
  }
  getObjectEntity() {
    if (this.objectEntity !== null) {
      return this.objectEntity;
    }
    const staticProperties = [];
    const dynamicMethods = [];
    for (const definition of this.body.body) {
      const properties = definition.static ? staticProperties : dynamicMethods;
      const definitionKind = definition.kind;
      if (properties === dynamicMethods && !definitionKind)
        continue;
      const kind = definitionKind === "set" || definitionKind === "get" ? definitionKind : "init";
      let key;
      if (definition.computed) {
        const keyValue = definition.key.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
        if (typeof keyValue === "symbol") {
          properties.push({ key: UnknownKey, kind, property: definition });
          continue;
        } else {
          key = String(keyValue);
        }
      } else {
        key = definition.key instanceof Identifier2 ? definition.key.name : String(definition.key.value);
      }
      properties.push({ key, kind, property: definition });
    }
    staticProperties.unshift({
      key: "prototype",
      kind: "init",
      property: new ObjectEntity(dynamicMethods, this.superClass ? new ObjectMember(this.superClass, "prototype") : OBJECT_PROTOTYPE)
    });
    return this.objectEntity = new ObjectEntity(staticProperties, this.superClass || OBJECT_PROTOTYPE);
  }
};
var ClassDeclaration = class extends ClassNode {
  initialise() {
    super.initialise();
    if (this.id !== null) {
      this.id.variable.isId = true;
    }
  }
  parseNode(esTreeNode) {
    if (esTreeNode.id !== null) {
      this.id = new Identifier2(this, this.scope.parent).parseNode(esTreeNode.id);
    }
    return super.parseNode(esTreeNode);
  }
  render(code, options) {
    const { exportNamesByVariable, format, snippets: { _, getPropertyAccess } } = options;
    if (this.id) {
      const { variable, name } = this.id;
      if (format === "system" && exportNamesByVariable.has(variable)) {
        code.appendLeft(this.end, `${_}${getSystemExportStatement([variable], options)};`);
      }
      const renderedVariable = variable.getName(getPropertyAccess);
      if (renderedVariable !== name) {
        this.superClass?.render(code, options);
        this.body.render(code, {
          ...options,
          useOriginalName: (_variable) => _variable === variable
        });
        code.prependRight(this.start, `let ${renderedVariable}${_}=${_}`);
        code.prependLeft(this.end, ";");
        return;
      }
    }
    super.render(code, options);
  }
  applyDeoptimizations() {
    super.applyDeoptimizations();
    const { id, scope } = this;
    if (id) {
      const { name, variable } = id;
      for (const accessedVariable of scope.accessedOutsideVariables.values()) {
        if (accessedVariable !== variable) {
          accessedVariable.forbidName(name);
        }
      }
    }
  }
};
var ClassExpression = class extends ClassNode {
  render(code, options, { renderedSurroundingElement } = BLANK) {
    super.render(code, options);
    if (renderedSurroundingElement === ExpressionStatement) {
      code.appendRight(this.start, "(");
      code.prependLeft(this.end, ")");
    }
  }
};
var MultiExpression = class _MultiExpression extends ExpressionEntity {
  constructor(expressions) {
    super();
    this.expressions = expressions;
  }
  deoptimizePath(path2) {
    for (const expression of this.expressions) {
      expression.deoptimizePath(path2);
    }
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    return [
      new _MultiExpression(this.expressions.map((expression) => expression.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0])),
      false
    ];
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    for (const expression of this.expressions) {
      if (expression.hasEffectsOnInteractionAtPath(path2, interaction, context))
        return true;
    }
    return false;
  }
};
var ConditionalExpression = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.expressionsToBeDeoptimized = [];
    this.usedBranch = null;
  }
  get isBranchResolutionAnalysed() {
    return isFlagSet(
      this.flags,
      65536
      /* Flag.isBranchResolutionAnalysed */
    );
  }
  set isBranchResolutionAnalysed(value) {
    this.flags = setFlag(this.flags, 65536, value);
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.consequent.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
    this.alternate.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizeCache() {
    if (this.usedBranch !== null) {
      const unusedBranch = this.usedBranch === this.consequent ? this.alternate : this.consequent;
      this.usedBranch = null;
      unusedBranch.deoptimizePath(UNKNOWN_PATH);
      const { expressionsToBeDeoptimized } = this;
      this.expressionsToBeDeoptimized = EMPTY_ARRAY;
      for (const expression of expressionsToBeDeoptimized) {
        expression.deoptimizeCache();
      }
    }
  }
  deoptimizePath(path2) {
    const usedBranch = this.getUsedBranch();
    if (usedBranch) {
      usedBranch.deoptimizePath(path2);
    } else {
      this.consequent.deoptimizePath(path2);
      this.alternate.deoptimizePath(path2);
    }
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    const usedBranch = this.getUsedBranch();
    if (!usedBranch)
      return UnknownValue;
    this.expressionsToBeDeoptimized.push(origin);
    return usedBranch.getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    const usedBranch = this.getUsedBranch();
    if (!usedBranch)
      return [
        new MultiExpression([
          this.consequent.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0],
          this.alternate.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0]
        ]),
        false
      ];
    this.expressionsToBeDeoptimized.push(origin);
    return usedBranch.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
  }
  hasEffects(context) {
    if (this.test.hasEffects(context))
      return true;
    const usedBranch = this.getUsedBranch();
    if (!usedBranch) {
      return this.consequent.hasEffects(context) || this.alternate.hasEffects(context);
    }
    return usedBranch.hasEffects(context);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    const usedBranch = this.getUsedBranch();
    if (!usedBranch) {
      return this.consequent.hasEffectsOnInteractionAtPath(path2, interaction, context) || this.alternate.hasEffectsOnInteractionAtPath(path2, interaction, context);
    }
    return usedBranch.hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    const usedBranch = this.getUsedBranch();
    if (includeChildrenRecursively || this.test.shouldBeIncluded(context) || usedBranch === null) {
      this.test.include(context, includeChildrenRecursively);
      this.consequent.include(context, includeChildrenRecursively);
      this.alternate.include(context, includeChildrenRecursively);
    } else {
      usedBranch.include(context, includeChildrenRecursively);
    }
  }
  includeCallArguments(context, parameters) {
    const usedBranch = this.getUsedBranch();
    if (usedBranch) {
      usedBranch.includeCallArguments(context, parameters);
    } else {
      this.consequent.includeCallArguments(context, parameters);
      this.alternate.includeCallArguments(context, parameters);
    }
  }
  removeAnnotations(code) {
    this.test.removeAnnotations(code);
  }
  render(code, options, { isCalleeOfRenderedParent, preventASI, renderedParentType, renderedSurroundingElement } = BLANK) {
    const usedBranch = this.getUsedBranch();
    if (this.test.included) {
      this.test.render(code, options, { renderedSurroundingElement });
      this.consequent.render(code, options);
      this.alternate.render(code, options);
    } else {
      const colonPos = findFirstOccurrenceOutsideComment(code.original, ":", this.consequent.end);
      const inclusionStart = findNonWhiteSpace(code.original, (this.consequent.included ? findFirstOccurrenceOutsideComment(code.original, "?", this.test.end) : colonPos) + 1);
      if (preventASI) {
        removeLineBreaks(code, inclusionStart, usedBranch.start);
      }
      code.remove(this.start, inclusionStart);
      if (this.consequent.included) {
        code.remove(colonPos, this.end);
      }
      this.test.removeAnnotations(code);
      usedBranch.render(code, options, {
        isCalleeOfRenderedParent,
        preventASI: true,
        renderedParentType: renderedParentType || this.parent.type,
        renderedSurroundingElement: renderedSurroundingElement || this.parent.type
      });
    }
  }
  getUsedBranch() {
    if (this.isBranchResolutionAnalysed) {
      return this.usedBranch;
    }
    this.isBranchResolutionAnalysed = true;
    const testValue = this.test.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
    return typeof testValue === "symbol" ? null : this.usedBranch = testValue ? this.consequent : this.alternate;
  }
};
var ContinueStatement = class extends NodeBase {
  hasEffects(context) {
    if (this.label) {
      if (!context.ignore.labels.has(this.label.name))
        return true;
      context.includedLabels.add(this.label.name);
    } else {
      if (!context.ignore.continues)
        return true;
      context.hasContinue = true;
    }
    context.brokenFlow = true;
    return false;
  }
  include(context) {
    this.included = true;
    if (this.label) {
      this.label.include();
      context.includedLabels.add(this.label.name);
    } else {
      context.hasContinue = true;
    }
    context.brokenFlow = true;
  }
};
var DebuggerStatement = class extends NodeBase {
  hasEffects() {
    return true;
  }
};
function hasLoopBodyEffects(context, body) {
  const { brokenFlow, hasBreak, hasContinue, ignore } = context;
  const { breaks, continues } = ignore;
  ignore.breaks = true;
  ignore.continues = true;
  context.hasBreak = false;
  context.hasContinue = false;
  if (body.hasEffects(context))
    return true;
  ignore.breaks = breaks;
  ignore.continues = continues;
  context.hasBreak = hasBreak;
  context.hasContinue = hasContinue;
  context.brokenFlow = brokenFlow;
  return false;
}
function includeLoopBody(context, body, includeChildrenRecursively) {
  const { brokenFlow, hasBreak, hasContinue } = context;
  context.hasBreak = false;
  context.hasContinue = false;
  body.include(context, includeChildrenRecursively, { asSingleStatement: true });
  context.hasBreak = hasBreak;
  context.hasContinue = hasContinue;
  context.brokenFlow = brokenFlow;
}
var DoWhileStatement = class extends NodeBase {
  hasEffects(context) {
    if (this.test.hasEffects(context))
      return true;
    return hasLoopBodyEffects(context, this.body);
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    this.test.include(context, includeChildrenRecursively);
    includeLoopBody(context, this.body, includeChildrenRecursively);
  }
};
var EmptyStatement = class extends NodeBase {
  hasEffects() {
    return false;
  }
};
var ExportAllDeclaration = class extends NodeBase {
  hasEffects() {
    return false;
  }
  initialise() {
    super.initialise();
    this.scope.context.addExport(this);
  }
  render(code, _options, nodeRenderOptions) {
    code.remove(nodeRenderOptions.start, nodeRenderOptions.end);
  }
  applyDeoptimizations() {
  }
};
ExportAllDeclaration.prototype.needsBoundaries = true;
var FunctionDeclaration = class extends FunctionNode {
  initialise() {
    super.initialise();
    if (this.id !== null) {
      this.id.variable.isId = true;
    }
  }
  parseNode(esTreeNode) {
    if (esTreeNode.id !== null) {
      this.id = new Identifier2(this, this.scope.parent).parseNode(esTreeNode.id);
    }
    return super.parseNode(esTreeNode);
  }
};
function getDeclarationStart(code, start) {
  return findNonWhiteSpace(code, findFirstOccurrenceOutsideComment(code, "default", start) + 7);
}
function getFunctionIdInsertPosition(code, start) {
  const declarationEnd = findFirstOccurrenceOutsideComment(code, "function", start) + "function".length;
  code = code.slice(declarationEnd, findFirstOccurrenceOutsideComment(code, "(", declarationEnd));
  const generatorStarPos = findFirstOccurrenceOutsideComment(code, "*");
  if (generatorStarPos === -1) {
    return declarationEnd;
  }
  return declarationEnd + generatorStarPos + 1;
}
var ExportDefaultDeclaration = class extends NodeBase {
  include(context, includeChildrenRecursively) {
    super.include(context, includeChildrenRecursively);
    if (includeChildrenRecursively) {
      this.scope.context.includeVariableInModule(this.variable);
    }
  }
  initialise() {
    super.initialise();
    const declaration = this.declaration;
    this.declarationName = declaration.id && declaration.id.name || this.declaration.name;
    this.variable = this.scope.addExportDefaultDeclaration(this.declarationName || this.scope.context.getModuleName(), this, this.scope.context);
    this.scope.context.addExport(this);
  }
  removeAnnotations(code) {
    this.declaration.removeAnnotations(code);
  }
  render(code, options, nodeRenderOptions) {
    const { start, end } = nodeRenderOptions;
    const declarationStart = getDeclarationStart(code.original, this.start);
    if (this.declaration instanceof FunctionDeclaration) {
      this.renderNamedDeclaration(code, declarationStart, this.declaration.id === null ? getFunctionIdInsertPosition(code.original, declarationStart) : null, options);
    } else if (this.declaration instanceof ClassDeclaration) {
      this.renderNamedDeclaration(code, declarationStart, this.declaration.id === null ? findFirstOccurrenceOutsideComment(code.original, "class", start) + "class".length : null, options);
    } else if (this.variable.getOriginalVariable() !== this.variable) {
      treeshakeNode(this, code, start, end);
      return;
    } else if (this.variable.included) {
      this.renderVariableDeclaration(code, declarationStart, options);
    } else {
      code.remove(this.start, declarationStart);
      this.declaration.render(code, options, {
        renderedSurroundingElement: ExpressionStatement
      });
      if (code.original[this.end - 1] !== ";") {
        code.appendLeft(this.end, ";");
      }
      return;
    }
    this.declaration.render(code, options);
  }
  applyDeoptimizations() {
  }
  renderNamedDeclaration(code, declarationStart, idInsertPosition, options) {
    const { exportNamesByVariable, format, snippets: { getPropertyAccess } } = options;
    const name = this.variable.getName(getPropertyAccess);
    code.remove(this.start, declarationStart);
    if (idInsertPosition !== null) {
      code.appendLeft(idInsertPosition, ` ${name}`);
    }
    if (format === "system" && this.declaration instanceof ClassDeclaration && exportNamesByVariable.has(this.variable)) {
      code.appendLeft(this.end, ` ${getSystemExportStatement([this.variable], options)};`);
    }
  }
  renderVariableDeclaration(code, declarationStart, { format, exportNamesByVariable, snippets: { cnst, getPropertyAccess } }) {
    const hasTrailingSemicolon = code.original.charCodeAt(this.end - 1) === 59;
    const systemExportNames = format === "system" && exportNamesByVariable.get(this.variable);
    if (systemExportNames) {
      code.overwrite(this.start, declarationStart, `${cnst} ${this.variable.getName(getPropertyAccess)} = exports(${JSON.stringify(systemExportNames[0])}, `);
      code.appendRight(hasTrailingSemicolon ? this.end - 1 : this.end, ")" + (hasTrailingSemicolon ? "" : ";"));
    } else {
      code.overwrite(this.start, declarationStart, `${cnst} ${this.variable.getName(getPropertyAccess)} = `);
      if (!hasTrailingSemicolon) {
        code.appendLeft(this.end, ";");
      }
    }
  }
};
ExportDefaultDeclaration.prototype.needsBoundaries = true;
var ExportNamedDeclaration = class extends NodeBase {
  bind() {
    this.declaration?.bind();
  }
  hasEffects(context) {
    return !!this.declaration?.hasEffects(context);
  }
  initialise() {
    super.initialise();
    this.scope.context.addExport(this);
  }
  removeAnnotations(code) {
    this.declaration?.removeAnnotations(code);
  }
  render(code, options, nodeRenderOptions) {
    const { start, end } = nodeRenderOptions;
    if (this.declaration === null) {
      code.remove(start, end);
    } else {
      code.remove(this.start, this.declaration.start);
      this.declaration.render(code, options, { end, start });
    }
  }
  applyDeoptimizations() {
  }
};
ExportNamedDeclaration.prototype.needsBoundaries = true;
var ExportSpecifier = class extends NodeBase {
  applyDeoptimizations() {
  }
};
var ForInStatement = class extends NodeBase {
  createScope(parentScope) {
    this.scope = new BlockScope(parentScope);
  }
  hasEffects(context) {
    const { body, deoptimized, left, right } = this;
    if (!deoptimized)
      this.applyDeoptimizations();
    if (left.hasEffectsAsAssignmentTarget(context, false) || right.hasEffects(context))
      return true;
    return hasLoopBodyEffects(context, body);
  }
  include(context, includeChildrenRecursively) {
    const { body, deoptimized, left, right } = this;
    if (!deoptimized)
      this.applyDeoptimizations();
    this.included = true;
    left.includeAsAssignmentTarget(context, includeChildrenRecursively || true, false);
    right.include(context, includeChildrenRecursively);
    includeLoopBody(context, body, includeChildrenRecursively);
  }
  initialise() {
    super.initialise();
    this.left.setAssignedValue(UNKNOWN_EXPRESSION);
  }
  render(code, options) {
    this.left.render(code, options, NO_SEMICOLON);
    this.right.render(code, options, NO_SEMICOLON);
    if (code.original.charCodeAt(this.right.start - 1) === 110) {
      code.prependLeft(this.right.start, " ");
    }
    this.body.render(code, options);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    this.left.deoptimizePath(EMPTY_PATH);
    this.scope.context.requestTreeshakingPass();
  }
};
var ForOfStatement = class extends NodeBase {
  get await() {
    return isFlagSet(
      this.flags,
      131072
      /* Flag.await */
    );
  }
  set await(value) {
    this.flags = setFlag(this.flags, 131072, value);
  }
  createScope(parentScope) {
    this.scope = new BlockScope(parentScope);
  }
  hasEffects() {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    return true;
  }
  include(context, includeChildrenRecursively) {
    const { body, deoptimized, left, right } = this;
    if (!deoptimized)
      this.applyDeoptimizations();
    this.included = true;
    left.includeAsAssignmentTarget(context, includeChildrenRecursively || true, false);
    right.include(context, includeChildrenRecursively);
    includeLoopBody(context, body, includeChildrenRecursively);
  }
  initialise() {
    super.initialise();
    this.left.setAssignedValue(UNKNOWN_EXPRESSION);
  }
  render(code, options) {
    this.left.render(code, options, NO_SEMICOLON);
    this.right.render(code, options, NO_SEMICOLON);
    if (code.original.charCodeAt(this.right.start - 1) === 102) {
      code.prependLeft(this.right.start, " ");
    }
    this.body.render(code, options);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    this.left.deoptimizePath(EMPTY_PATH);
    this.right.deoptimizePath(UNKNOWN_PATH);
    this.scope.context.requestTreeshakingPass();
  }
};
var ForStatement = class extends NodeBase {
  createScope(parentScope) {
    this.scope = new BlockScope(parentScope);
  }
  hasEffects(context) {
    if (this.init?.hasEffects(context) || this.test?.hasEffects(context) || this.update?.hasEffects(context)) {
      return true;
    }
    return hasLoopBodyEffects(context, this.body);
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    this.init?.include(context, includeChildrenRecursively, { asSingleStatement: true });
    this.test?.include(context, includeChildrenRecursively);
    this.update?.include(context, includeChildrenRecursively);
    includeLoopBody(context, this.body, includeChildrenRecursively);
  }
  render(code, options) {
    this.init?.render(code, options, NO_SEMICOLON);
    this.test?.render(code, options, NO_SEMICOLON);
    this.update?.render(code, options, NO_SEMICOLON);
    this.body.render(code, options);
  }
};
var FunctionExpression = class extends FunctionNode {
  createScope(parentScope) {
    super.createScope(this.idScope = new ChildScope(parentScope, parentScope.context));
  }
  parseNode(esTreeNode) {
    if (esTreeNode.id !== null) {
      this.id = new Identifier2(this, this.idScope).parseNode(esTreeNode.id);
    }
    return super.parseNode(esTreeNode);
  }
  render(code, options, { renderedSurroundingElement } = BLANK) {
    super.render(code, options);
    if (renderedSurroundingElement === ExpressionStatement) {
      code.appendRight(this.start, "(");
      code.prependLeft(this.end, ")");
    }
  }
};
var TrackingScope = class extends BlockScope {
  constructor() {
    super(...arguments);
    this.hoistedDeclarations = [];
  }
  addDeclaration(identifier2, context, init2, kind) {
    this.hoistedDeclarations.push(identifier2);
    return super.addDeclaration(identifier2, context, init2, kind);
  }
};
var unset = Symbol("unset");
var IfStatement = class _IfStatement extends NodeBase {
  constructor() {
    super(...arguments);
    this.testValue = unset;
  }
  deoptimizeCache() {
    this.testValue = UnknownValue;
  }
  hasEffects(context) {
    if (this.test.hasEffects(context)) {
      return true;
    }
    const testValue = this.getTestValue();
    if (typeof testValue === "symbol") {
      const { brokenFlow } = context;
      if (this.consequent.hasEffects(context))
        return true;
      const consequentBrokenFlow = context.brokenFlow;
      context.brokenFlow = brokenFlow;
      if (this.alternate === null)
        return false;
      if (this.alternate.hasEffects(context))
        return true;
      context.brokenFlow = context.brokenFlow && consequentBrokenFlow;
      return false;
    }
    return testValue ? this.consequent.hasEffects(context) : !!this.alternate?.hasEffects(context);
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    if (includeChildrenRecursively) {
      this.includeRecursively(includeChildrenRecursively, context);
    } else {
      const testValue = this.getTestValue();
      if (typeof testValue === "symbol") {
        this.includeUnknownTest(context);
      } else {
        this.includeKnownTest(context, testValue);
      }
    }
  }
  parseNode(esTreeNode) {
    this.consequent = new (this.scope.context.getNodeConstructor(esTreeNode.consequent.type))(this, this.consequentScope = new TrackingScope(this.scope)).parseNode(esTreeNode.consequent);
    if (esTreeNode.alternate) {
      this.alternate = new (this.scope.context.getNodeConstructor(esTreeNode.alternate.type))(this, this.alternateScope = new TrackingScope(this.scope)).parseNode(esTreeNode.alternate);
    }
    return super.parseNode(esTreeNode);
  }
  render(code, options) {
    const { snippets: { getPropertyAccess } } = options;
    const testValue = this.getTestValue();
    const hoistedDeclarations = [];
    const includesIfElse = this.test.included;
    const noTreeshake = !this.scope.context.options.treeshake;
    if (includesIfElse) {
      this.test.render(code, options);
    } else {
      code.remove(this.start, this.consequent.start);
    }
    if (this.consequent.included && (noTreeshake || typeof testValue === "symbol" || testValue)) {
      this.consequent.render(code, options);
    } else {
      code.overwrite(this.consequent.start, this.consequent.end, includesIfElse ? ";" : "");
      hoistedDeclarations.push(...this.consequentScope.hoistedDeclarations);
    }
    if (this.alternate) {
      if (this.alternate.included && (noTreeshake || typeof testValue === "symbol" || !testValue)) {
        if (includesIfElse) {
          if (code.original.charCodeAt(this.alternate.start - 1) === 101) {
            code.prependLeft(this.alternate.start, " ");
          }
        } else {
          code.remove(this.consequent.end, this.alternate.start);
        }
        this.alternate.render(code, options);
      } else {
        if (includesIfElse && this.shouldKeepAlternateBranch()) {
          code.overwrite(this.alternate.start, this.end, ";");
        } else {
          code.remove(this.consequent.end, this.end);
        }
        hoistedDeclarations.push(...this.alternateScope.hoistedDeclarations);
      }
    }
    this.renderHoistedDeclarations(hoistedDeclarations, code, getPropertyAccess);
  }
  applyDeoptimizations() {
  }
  getTestValue() {
    if (this.testValue === unset) {
      return this.testValue = this.test.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
    }
    return this.testValue;
  }
  includeKnownTest(context, testValue) {
    if (this.test.shouldBeIncluded(context)) {
      this.test.include(context, false);
    }
    if (testValue && this.consequent.shouldBeIncluded(context)) {
      this.consequent.include(context, false, { asSingleStatement: true });
    }
    if (!testValue && this.alternate?.shouldBeIncluded(context)) {
      this.alternate.include(context, false, { asSingleStatement: true });
    }
  }
  includeRecursively(includeChildrenRecursively, context) {
    this.test.include(context, includeChildrenRecursively);
    this.consequent.include(context, includeChildrenRecursively);
    this.alternate?.include(context, includeChildrenRecursively);
  }
  includeUnknownTest(context) {
    this.test.include(context, false);
    const { brokenFlow } = context;
    let consequentBrokenFlow = false;
    if (this.consequent.shouldBeIncluded(context)) {
      this.consequent.include(context, false, { asSingleStatement: true });
      consequentBrokenFlow = context.brokenFlow;
      context.brokenFlow = brokenFlow;
    }
    if (this.alternate?.shouldBeIncluded(context)) {
      this.alternate.include(context, false, { asSingleStatement: true });
      context.brokenFlow = context.brokenFlow && consequentBrokenFlow;
    }
  }
  renderHoistedDeclarations(hoistedDeclarations, code, getPropertyAccess) {
    const hoistedVariables = [
      ...new Set(hoistedDeclarations.map((identifier2) => {
        const variable = identifier2.variable;
        return variable.included ? variable.getName(getPropertyAccess) : "";
      }))
    ].filter(Boolean).join(", ");
    if (hoistedVariables) {
      const parentType = this.parent.type;
      const needsBraces = parentType !== Program && parentType !== BlockStatement;
      code.prependRight(this.start, `${needsBraces ? "{ " : ""}var ${hoistedVariables}; `);
      if (needsBraces) {
        code.appendLeft(this.end, ` }`);
      }
    }
  }
  shouldKeepAlternateBranch() {
    let currentParent = this.parent;
    do {
      if (currentParent instanceof _IfStatement && currentParent.alternate) {
        return true;
      }
      if (currentParent instanceof BlockStatement2) {
        return false;
      }
      currentParent = currentParent.parent;
    } while (currentParent);
    return false;
  }
};
var ImportAttribute = class extends NodeBase {
};
var ImportDeclaration = class extends NodeBase {
  // Do not bind specifiers or attributes
  bind() {
  }
  hasEffects() {
    return false;
  }
  initialise() {
    super.initialise();
    this.scope.context.addImport(this);
  }
  render(code, _options, nodeRenderOptions) {
    code.remove(nodeRenderOptions.start, nodeRenderOptions.end);
  }
  applyDeoptimizations() {
  }
};
ImportDeclaration.prototype.needsBoundaries = true;
var ImportDefaultSpecifier = class extends NodeBase {
  applyDeoptimizations() {
  }
};
var INTEROP_DEFAULT_VARIABLE = "_interopDefault";
var INTEROP_DEFAULT_COMPAT_VARIABLE = "_interopDefaultCompat";
var INTEROP_NAMESPACE_VARIABLE = "_interopNamespace";
var INTEROP_NAMESPACE_COMPAT_VARIABLE = "_interopNamespaceCompat";
var INTEROP_NAMESPACE_DEFAULT_VARIABLE = "_interopNamespaceDefault";
var INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE = "_interopNamespaceDefaultOnly";
var MERGE_NAMESPACES_VARIABLE = "_mergeNamespaces";
var DOCUMENT_CURRENT_SCRIPT = "_documentCurrentScript";
var defaultInteropHelpersByInteropType = {
  auto: INTEROP_DEFAULT_VARIABLE,
  compat: INTEROP_DEFAULT_COMPAT_VARIABLE,
  default: null,
  defaultOnly: null,
  esModule: null
};
var isDefaultAProperty = (interopType, externalLiveBindings) => interopType === "esModule" || externalLiveBindings && (interopType === "auto" || interopType === "compat");
var namespaceInteropHelpersByInteropType = {
  auto: INTEROP_NAMESPACE_VARIABLE,
  compat: INTEROP_NAMESPACE_COMPAT_VARIABLE,
  default: INTEROP_NAMESPACE_DEFAULT_VARIABLE,
  defaultOnly: INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE,
  esModule: null
};
var canDefaultBeTakenFromNamespace = (interopType, externalLiveBindings) => interopType !== "esModule" && isDefaultAProperty(interopType, externalLiveBindings);
var getHelpersBlock = (additionalHelpers, accessedGlobals, indent, snippets, liveBindings, freeze, symbols) => {
  const usedHelpers = new Set(additionalHelpers);
  for (const variable of HELPER_NAMES) {
    if (accessedGlobals.has(variable)) {
      usedHelpers.add(variable);
    }
  }
  return HELPER_NAMES.map((variable) => usedHelpers.has(variable) ? HELPER_GENERATORS[variable](indent, snippets, liveBindings, freeze, symbols, usedHelpers) : "").join("");
};
var HELPER_GENERATORS = {
  [DOCUMENT_CURRENT_SCRIPT](_t, { _, n: n2 }) {
    return `var${_}${DOCUMENT_CURRENT_SCRIPT}${_}=${_}typeof${_}document${_}!==${_}'undefined'${_}?${_}document.currentScript${_}:${_}null;${n2}`;
  },
  [INTEROP_DEFAULT_COMPAT_VARIABLE](_t, snippets, liveBindings) {
    const { _, getDirectReturnFunction, n: n2 } = snippets;
    const [left, right] = getDirectReturnFunction(["e"], {
      functionReturn: true,
      lineBreakIndent: null,
      name: INTEROP_DEFAULT_COMPAT_VARIABLE
    });
    return `${left}${getIsCompatNamespace(snippets)}${_}?${_}${liveBindings ? getDefaultLiveBinding(snippets) : getDefaultStatic(snippets)}${right}${n2}${n2}`;
  },
  [INTEROP_DEFAULT_VARIABLE](_t, snippets, liveBindings) {
    const { _, getDirectReturnFunction, n: n2 } = snippets;
    const [left, right] = getDirectReturnFunction(["e"], {
      functionReturn: true,
      lineBreakIndent: null,
      name: INTEROP_DEFAULT_VARIABLE
    });
    return `${left}e${_}&&${_}e.__esModule${_}?${_}${liveBindings ? getDefaultLiveBinding(snippets) : getDefaultStatic(snippets)}${right}${n2}${n2}`;
  },
  [INTEROP_NAMESPACE_COMPAT_VARIABLE](t, snippets, liveBindings, freeze, symbols, usedHelpers) {
    const { _, getDirectReturnFunction, n: n2 } = snippets;
    if (usedHelpers.has(INTEROP_NAMESPACE_DEFAULT_VARIABLE)) {
      const [left, right] = getDirectReturnFunction(["e"], {
        functionReturn: true,
        lineBreakIndent: null,
        name: INTEROP_NAMESPACE_COMPAT_VARIABLE
      });
      return `${left}${getIsCompatNamespace(snippets)}${_}?${_}e${_}:${_}${INTEROP_NAMESPACE_DEFAULT_VARIABLE}(e)${right}${n2}${n2}`;
    }
    return `function ${INTEROP_NAMESPACE_COMPAT_VARIABLE}(e)${_}{${n2}${t}if${_}(${getIsCompatNamespace(snippets)})${_}return e;${n2}` + createNamespaceObject(t, t, snippets, liveBindings, freeze, symbols) + `}${n2}${n2}`;
  },
  [INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE](_t, snippets, _liveBindings, freeze, symbols) {
    const { getDirectReturnFunction, getObject, n: n2, _ } = snippets;
    const [left, right] = getDirectReturnFunction(["e"], {
      functionReturn: true,
      lineBreakIndent: null,
      name: INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE
    });
    return `${left}${getFrozen(freeze, getWithToStringTag(symbols, getObject([
      [null, `__proto__:${_}null`],
      ["default", "e"]
    ], { lineBreakIndent: null }), snippets))}${right}${n2}${n2}`;
  },
  [INTEROP_NAMESPACE_DEFAULT_VARIABLE](t, snippets, liveBindings, freeze, symbols) {
    const { _, n: n2 } = snippets;
    return `function ${INTEROP_NAMESPACE_DEFAULT_VARIABLE}(e)${_}{${n2}` + createNamespaceObject(t, t, snippets, liveBindings, freeze, symbols) + `}${n2}${n2}`;
  },
  [INTEROP_NAMESPACE_VARIABLE](t, snippets, liveBindings, freeze, symbols, usedHelpers) {
    const { _, getDirectReturnFunction, n: n2 } = snippets;
    if (usedHelpers.has(INTEROP_NAMESPACE_DEFAULT_VARIABLE)) {
      const [left, right] = getDirectReturnFunction(["e"], {
        functionReturn: true,
        lineBreakIndent: null,
        name: INTEROP_NAMESPACE_VARIABLE
      });
      return `${left}e${_}&&${_}e.__esModule${_}?${_}e${_}:${_}${INTEROP_NAMESPACE_DEFAULT_VARIABLE}(e)${right}${n2}${n2}`;
    }
    return `function ${INTEROP_NAMESPACE_VARIABLE}(e)${_}{${n2}${t}if${_}(e${_}&&${_}e.__esModule)${_}return e;${n2}` + createNamespaceObject(t, t, snippets, liveBindings, freeze, symbols) + `}${n2}${n2}`;
  },
  [MERGE_NAMESPACES_VARIABLE](t, snippets, liveBindings, freeze, symbols) {
    const { _, cnst, n: n2 } = snippets;
    const useForEach = cnst === "var" && liveBindings;
    return `function ${MERGE_NAMESPACES_VARIABLE}(n, m)${_}{${n2}${t}${loopOverNamespaces(`{${n2}${t}${t}${t}if${_}(k${_}!==${_}'default'${_}&&${_}!(k in n))${_}{${n2}` + (liveBindings ? useForEach ? copyOwnPropertyLiveBinding : copyPropertyLiveBinding : copyPropertyStatic)(t, t + t + t + t, snippets) + `${t}${t}${t}}${n2}${t}${t}}`, useForEach, t, snippets)}${n2}${t}return ${getFrozen(freeze, getWithToStringTag(symbols, "n", snippets))};${n2}}${n2}${n2}`;
  }
};
var getDefaultLiveBinding = ({ _, getObject }) => `e${_}:${_}${getObject([["default", "e"]], { lineBreakIndent: null })}`;
var getDefaultStatic = ({ _, getPropertyAccess }) => `e${getPropertyAccess("default")}${_}:${_}e`;
var getIsCompatNamespace = ({ _ }) => `e${_}&&${_}typeof e${_}===${_}'object'${_}&&${_}'default'${_}in e`;
var createNamespaceObject = (t, index, snippets, liveBindings, freeze, symbols) => {
  const { _, cnst, getObject, getPropertyAccess, n: n2, s } = snippets;
  const copyProperty = `{${n2}` + (liveBindings ? copyNonDefaultOwnPropertyLiveBinding : copyPropertyStatic)(t, index + t + t, snippets) + `${index}${t}}`;
  return `${index}${cnst} n${_}=${_}Object.create(null${symbols ? `,${_}{${_}[Symbol.toStringTag]:${_}${getToStringTagValue(getObject)}${_}}` : ""});${n2}${index}if${_}(e)${_}{${n2}${index}${t}${loopOverKeys(copyProperty, !liveBindings, snippets)}${n2}${index}}${n2}${index}n${getPropertyAccess("default")}${_}=${_}e;${n2}${index}return ${getFrozen(freeze, "n")}${s}${n2}`;
};
var loopOverKeys = (body, allowVariableLoopVariable, { _, cnst, getFunctionIntro, s }) => cnst !== "var" || allowVariableLoopVariable ? `for${_}(${cnst} k in e)${_}${body}` : `Object.keys(e).forEach(${getFunctionIntro(["k"], {
  isAsync: false,
  name: null
})}${body})${s}`;
var loopOverNamespaces = (body, useForEach, t, { _, cnst, getDirectReturnFunction, getFunctionIntro, n: n2 }) => {
  if (useForEach) {
    const [left, right] = getDirectReturnFunction(["e"], {
      functionReturn: false,
      lineBreakIndent: { base: t, t },
      name: null
    });
    return `m.forEach(${left}e${_}&&${_}typeof e${_}!==${_}'string'${_}&&${_}!Array.isArray(e)${_}&&${_}Object.keys(e).forEach(${getFunctionIntro(["k"], {
      isAsync: false,
      name: null
    })}${body})${right});`;
  }
  return `for${_}(var i${_}=${_}0;${_}i${_}<${_}m.length;${_}i++)${_}{${n2}${t}${t}${cnst} e${_}=${_}m[i];${n2}${t}${t}if${_}(typeof e${_}!==${_}'string'${_}&&${_}!Array.isArray(e))${_}{${_}for${_}(${cnst} k in e)${_}${body}${_}}${n2}${t}}`;
};
var copyNonDefaultOwnPropertyLiveBinding = (t, index, snippets) => {
  const { _, n: n2 } = snippets;
  return `${index}if${_}(k${_}!==${_}'default')${_}{${n2}` + copyOwnPropertyLiveBinding(t, index + t, snippets) + `${index}}${n2}`;
};
var copyOwnPropertyLiveBinding = (t, index, { _, cnst, getDirectReturnFunction, n: n2 }) => {
  const [left, right] = getDirectReturnFunction([], {
    functionReturn: true,
    lineBreakIndent: null,
    name: null
  });
  return `${index}${cnst} d${_}=${_}Object.getOwnPropertyDescriptor(e,${_}k);${n2}${index}Object.defineProperty(n,${_}k,${_}d.get${_}?${_}d${_}:${_}{${n2}${index}${t}enumerable:${_}true,${n2}${index}${t}get:${_}${left}e[k]${right}${n2}${index}});${n2}`;
};
var copyPropertyLiveBinding = (t, index, { _, cnst, getDirectReturnFunction, n: n2 }) => {
  const [left, right] = getDirectReturnFunction([], {
    functionReturn: true,
    lineBreakIndent: null,
    name: null
  });
  return `${index}${cnst} d${_}=${_}Object.getOwnPropertyDescriptor(e,${_}k);${n2}${index}if${_}(d)${_}{${n2}${index}${t}Object.defineProperty(n,${_}k,${_}d.get${_}?${_}d${_}:${_}{${n2}${index}${t}${t}enumerable:${_}true,${n2}${index}${t}${t}get:${_}${left}e[k]${right}${n2}${index}${t}});${n2}${index}}${n2}`;
};
var copyPropertyStatic = (_t, index, { _, n: n2 }) => `${index}n[k]${_}=${_}e[k];${n2}`;
var getFrozen = (freeze, fragment) => freeze ? `Object.freeze(${fragment})` : fragment;
var getWithToStringTag = (symbols, fragment, { _, getObject }) => symbols ? `Object.defineProperty(${fragment},${_}Symbol.toStringTag,${_}${getToStringTagValue(getObject)})` : fragment;
var HELPER_NAMES = Object.keys(HELPER_GENERATORS);
function getToStringTagValue(getObject) {
  return getObject([["value", "'Module'"]], {
    lineBreakIndent: null
  });
}
function isReassignedExportsMember(variable, exportNamesByVariable) {
  return variable.renderBaseName !== null && exportNamesByVariable.has(variable) && variable.isReassigned;
}
var VariableDeclarator = class extends NodeBase {
  declareDeclarator(kind) {
    this.id.declare(kind, this.init || UNDEFINED_EXPRESSION);
  }
  deoptimizePath(path2) {
    this.id.deoptimizePath(path2);
  }
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    const initEffect = this.init?.hasEffects(context);
    this.id.markDeclarationReached();
    return initEffect || this.id.hasEffects(context);
  }
  include(context, includeChildrenRecursively) {
    const { deoptimized, id, init: init2 } = this;
    if (!deoptimized)
      this.applyDeoptimizations();
    this.included = true;
    init2?.include(context, includeChildrenRecursively);
    id.markDeclarationReached();
    if (includeChildrenRecursively || id.shouldBeIncluded(context)) {
      id.include(context, includeChildrenRecursively);
    }
  }
  removeAnnotations(code) {
    this.init?.removeAnnotations(code);
  }
  render(code, options) {
    const { exportNamesByVariable, snippets: { _, getPropertyAccess } } = options;
    const { end, id, init: init2, start } = this;
    const renderId = id.included;
    if (renderId) {
      id.render(code, options);
    } else {
      const operatorPos = findFirstOccurrenceOutsideComment(code.original, "=", id.end);
      code.remove(start, findNonWhiteSpace(code.original, operatorPos + 1));
    }
    if (init2) {
      if (id instanceof Identifier2 && init2 instanceof ClassExpression && !init2.id) {
        const renderedVariable = id.variable.getName(getPropertyAccess);
        if (renderedVariable !== id.name) {
          code.appendLeft(init2.start + 5, ` ${id.name}`);
        }
      }
      init2.render(code, options, renderId ? BLANK : { renderedSurroundingElement: ExpressionStatement });
    } else if (id instanceof Identifier2 && isReassignedExportsMember(id.variable, exportNamesByVariable)) {
      code.appendLeft(end, `${_}=${_}void 0`);
    }
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    const { id, init: init2 } = this;
    if (init2 && id instanceof Identifier2 && init2 instanceof ClassExpression && !init2.id) {
      const { name, variable } = id;
      for (const accessedVariable of init2.scope.accessedOutsideVariables.values()) {
        if (accessedVariable !== variable) {
          accessedVariable.forbidName(name);
        }
      }
    }
  }
};
var ImportExpression = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.inlineNamespace = null;
    this.attributes = null;
    this.mechanism = null;
    this.namespaceExportName = void 0;
    this.resolution = null;
    this.resolutionString = null;
  }
  // Do not bind attributes
  bind() {
    this.source.bind();
  }
  /**
   * Get imported variables for deterministic usage, valid cases are:
   *
   * - `const { foo } = await import('bar')`.
   * - `(await import('bar')).foo`
   * - `import('bar').then(({ foo }) => {})`
   *
   * Returns empty array if it's side-effect only import.
   * Returns undefined if it's not fully deterministic.
   */
  getDeterministicImportedNames() {
    const parent1 = this.parent;
    if (parent1 instanceof ExpressionStatement2) {
      return EMPTY_ARRAY;
    }
    if (parent1 instanceof AwaitExpression) {
      const parent2 = parent1.parent;
      if (parent2 instanceof ExpressionStatement2) {
        return EMPTY_ARRAY;
      }
      if (parent2 instanceof VariableDeclarator) {
        const declaration = parent2.id;
        return declaration instanceof ObjectPattern ? getDeterministicObjectDestructure(declaration) : void 0;
      }
      if (parent2 instanceof MemberExpression) {
        const id = parent2.property;
        if (!parent2.computed && id instanceof Identifier2) {
          return [id.name];
        }
      }
      return;
    }
    if (parent1 instanceof MemberExpression) {
      const callExpression2 = parent1.parent;
      const property2 = parent1.property;
      if (!(callExpression2 instanceof CallExpression2) || !(property2 instanceof Identifier2)) {
        return;
      }
      const memberName = property2.name;
      if (callExpression2.parent instanceof ExpressionStatement2 && ["catch", "finally"].includes(memberName)) {
        return EMPTY_ARRAY;
      }
      if (memberName !== "then")
        return;
      if (callExpression2.arguments.length === 0) {
        return EMPTY_ARRAY;
      }
      const argument = callExpression2.arguments[0];
      if (callExpression2.arguments.length !== 1 || !(argument instanceof ArrowFunctionExpression2 || argument instanceof FunctionExpression)) {
        return;
      }
      if (argument.params.length === 0) {
        return EMPTY_ARRAY;
      }
      const declaration = argument.params[0];
      if (argument.params.length === 1 && declaration instanceof ObjectPattern) {
        return getDeterministicObjectDestructure(declaration);
      }
      return;
    }
  }
  hasEffects() {
    return true;
  }
  include(context, includeChildrenRecursively) {
    if (!this.included) {
      this.included = true;
      this.scope.context.includeDynamicImport(this);
      this.scope.addAccessedDynamicImport(this);
    }
    this.source.include(context, includeChildrenRecursively);
  }
  initialise() {
    super.initialise();
    this.scope.context.addDynamicImport(this);
  }
  parseNode(esTreeNode) {
    this.sourceAstNode = esTreeNode.source;
    return super.parseNode(esTreeNode);
  }
  render(code, options) {
    const { snippets: { _, getDirectReturnFunction, getObject, getPropertyAccess } } = options;
    if (this.inlineNamespace) {
      const [left, right] = getDirectReturnFunction([], {
        functionReturn: true,
        lineBreakIndent: null,
        name: null
      });
      code.overwrite(this.start, this.end, `Promise.resolve().then(${left}${this.inlineNamespace.getName(getPropertyAccess)}${right})`);
      return;
    }
    if (this.mechanism) {
      code.overwrite(this.start, findFirstOccurrenceOutsideComment(code.original, "(", this.start + 6) + 1, this.mechanism.left);
      code.overwrite(this.end - 1, this.end, this.mechanism.right);
    }
    if (this.resolutionString) {
      code.overwrite(this.source.start, this.source.end, this.resolutionString);
      if (this.namespaceExportName) {
        const [left, right] = getDirectReturnFunction(["n"], {
          functionReturn: true,
          lineBreakIndent: null,
          name: null
        });
        code.prependLeft(this.end, `.then(${left}n.${this.namespaceExportName}${right})`);
      }
    } else {
      this.source.render(code, options);
    }
    if (this.attributes !== true) {
      if (this.options) {
        code.overwrite(this.source.end, this.end - 1, "", { contentOnly: true });
      }
      if (this.attributes) {
        code.appendLeft(this.end - 1, `,${_}${getObject([["assert", this.attributes]], {
          lineBreakIndent: null
        })}`);
      }
    }
  }
  setExternalResolution(exportMode, resolution, options, snippets, pluginDriver, accessedGlobalsByScope, resolutionString, namespaceExportName, attributes) {
    const { format } = options;
    this.inlineNamespace = null;
    this.resolution = resolution;
    this.resolutionString = resolutionString;
    this.namespaceExportName = namespaceExportName;
    this.attributes = attributes;
    const accessedGlobals = [...accessedImportGlobals[format] || []];
    let helper;
    ({ helper, mechanism: this.mechanism } = this.getDynamicImportMechanismAndHelper(resolution, exportMode, options, snippets, pluginDriver));
    if (helper) {
      accessedGlobals.push(helper);
    }
    if (accessedGlobals.length > 0) {
      this.scope.addAccessedGlobals(accessedGlobals, accessedGlobalsByScope);
    }
  }
  setInternalResolution(inlineNamespace) {
    this.inlineNamespace = inlineNamespace;
  }
  applyDeoptimizations() {
  }
  getDynamicImportMechanismAndHelper(resolution, exportMode, { compact, dynamicImportInCjs, format, generatedCode: { arrowFunctions }, interop }, { _, getDirectReturnFunction, getDirectReturnIifeLeft }, pluginDriver) {
    const mechanism = pluginDriver.hookFirstSync("renderDynamicImport", [
      {
        customResolution: typeof this.resolution === "string" ? this.resolution : null,
        format,
        moduleId: this.scope.context.module.id,
        targetModuleId: this.resolution && typeof this.resolution !== "string" ? this.resolution.id : null
      }
    ]);
    if (mechanism) {
      return { helper: null, mechanism };
    }
    const hasDynamicTarget = !this.resolution || typeof this.resolution === "string";
    switch (format) {
      case "cjs": {
        if (dynamicImportInCjs && (!resolution || typeof resolution === "string" || resolution instanceof ExternalModule)) {
          return { helper: null, mechanism: null };
        }
        const helper = getInteropHelper(resolution, exportMode, interop);
        let left = `require(`;
        let right = `)`;
        if (helper) {
          left = `/*#__PURE__*/${helper}(${left}`;
          right += ")";
        }
        const [functionLeft, functionRight] = getDirectReturnFunction([], {
          functionReturn: true,
          lineBreakIndent: null,
          name: null
        });
        left = `Promise.resolve().then(${functionLeft}${left}`;
        right += `${functionRight})`;
        if (!arrowFunctions && hasDynamicTarget) {
          left = getDirectReturnIifeLeft(["t"], `${left}t${right}`, {
            needsArrowReturnParens: false,
            needsWrappedFunction: true
          });
          right = ")";
        }
        return {
          helper,
          mechanism: { left, right }
        };
      }
      case "amd": {
        const resolve2 = compact ? "c" : "resolve";
        const reject = compact ? "e" : "reject";
        const helper = getInteropHelper(resolution, exportMode, interop);
        const [resolveLeft, resolveRight] = getDirectReturnFunction(["m"], {
          functionReturn: false,
          lineBreakIndent: null,
          name: null
        });
        const resolveNamespace = helper ? `${resolveLeft}${resolve2}(/*#__PURE__*/${helper}(m))${resolveRight}` : resolve2;
        const [handlerLeft, handlerRight] = getDirectReturnFunction([resolve2, reject], {
          functionReturn: false,
          lineBreakIndent: null,
          name: null
        });
        let left = `new Promise(${handlerLeft}require([`;
        let right = `],${_}${resolveNamespace},${_}${reject})${handlerRight})`;
        if (!arrowFunctions && hasDynamicTarget) {
          left = getDirectReturnIifeLeft(["t"], `${left}t${right}`, {
            needsArrowReturnParens: false,
            needsWrappedFunction: true
          });
          right = ")";
        }
        return {
          helper,
          mechanism: { left, right }
        };
      }
      case "system": {
        return {
          helper: null,
          mechanism: {
            left: "module.import(",
            right: ")"
          }
        };
      }
    }
    return { helper: null, mechanism: null };
  }
};
function getInteropHelper(resolution, exportMode, interop) {
  return exportMode === "external" ? namespaceInteropHelpersByInteropType[interop(resolution instanceof ExternalModule ? resolution.id : null)] : exportMode === "default" ? INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE : null;
}
var accessedImportGlobals = {
  amd: ["require"],
  cjs: ["require"],
  system: ["module"]
};
function getDeterministicObjectDestructure(objectPattern2) {
  const variables = [];
  for (const property2 of objectPattern2.properties) {
    if (property2.type === "RestElement" || property2.computed || property2.key.type !== "Identifier")
      return;
    variables.push(property2.key.name);
  }
  return variables;
}
var ImportNamespaceSpecifier = class extends NodeBase {
  applyDeoptimizations() {
  }
};
var ImportSpecifier = class extends NodeBase {
  applyDeoptimizations() {
  }
};
var LabeledStatement = class extends NodeBase {
  hasEffects(context) {
    const { brokenFlow, includedLabels } = context;
    context.ignore.labels.add(this.label.name);
    context.includedLabels = /* @__PURE__ */ new Set();
    let bodyHasEffects = false;
    if (this.body.hasEffects(context)) {
      bodyHasEffects = true;
    } else {
      context.ignore.labels.delete(this.label.name);
      if (context.includedLabels.has(this.label.name)) {
        context.includedLabels.delete(this.label.name);
        context.brokenFlow = brokenFlow;
      }
    }
    context.includedLabels = /* @__PURE__ */ new Set([...includedLabels, ...context.includedLabels]);
    return bodyHasEffects;
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    const { brokenFlow, includedLabels } = context;
    context.includedLabels = /* @__PURE__ */ new Set();
    this.body.include(context, includeChildrenRecursively);
    if (includeChildrenRecursively || context.includedLabels.has(this.label.name)) {
      this.label.include();
      context.includedLabels.delete(this.label.name);
      context.brokenFlow = brokenFlow;
    }
    context.includedLabels = /* @__PURE__ */ new Set([...includedLabels, ...context.includedLabels]);
  }
  render(code, options) {
    if (this.label.included) {
      this.label.render(code, options);
    } else {
      code.remove(this.start, findNonWhiteSpace(code.original, findFirstOccurrenceOutsideComment(code.original, ":", this.label.end) + 1));
    }
    this.body.render(code, options);
  }
};
var LogicalExpression = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.expressionsToBeDeoptimized = [];
    this.usedBranch = null;
  }
  //private isBranchResolutionAnalysed = false;
  get isBranchResolutionAnalysed() {
    return isFlagSet(
      this.flags,
      65536
      /* Flag.isBranchResolutionAnalysed */
    );
  }
  set isBranchResolutionAnalysed(value) {
    this.flags = setFlag(this.flags, 65536, value);
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.left.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
    this.right.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizeCache() {
    if (this.usedBranch) {
      const unusedBranch = this.usedBranch === this.left ? this.right : this.left;
      this.usedBranch = null;
      unusedBranch.deoptimizePath(UNKNOWN_PATH);
      const { scope: { context }, expressionsToBeDeoptimized } = this;
      this.expressionsToBeDeoptimized = EMPTY_ARRAY;
      for (const expression of expressionsToBeDeoptimized) {
        expression.deoptimizeCache();
      }
      context.requestTreeshakingPass();
    }
  }
  deoptimizePath(path2) {
    const usedBranch = this.getUsedBranch();
    if (usedBranch) {
      usedBranch.deoptimizePath(path2);
    } else {
      this.left.deoptimizePath(path2);
      this.right.deoptimizePath(path2);
    }
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    const usedBranch = this.getUsedBranch();
    if (!usedBranch)
      return UnknownValue;
    this.expressionsToBeDeoptimized.push(origin);
    return usedBranch.getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    const usedBranch = this.getUsedBranch();
    if (!usedBranch)
      return [
        new MultiExpression([
          this.left.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0],
          this.right.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0]
        ]),
        false
      ];
    this.expressionsToBeDeoptimized.push(origin);
    return usedBranch.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
  }
  hasEffects(context) {
    if (this.left.hasEffects(context)) {
      return true;
    }
    if (this.getUsedBranch() !== this.left) {
      return this.right.hasEffects(context);
    }
    return false;
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    const usedBranch = this.getUsedBranch();
    if (!usedBranch) {
      return this.left.hasEffectsOnInteractionAtPath(path2, interaction, context) || this.right.hasEffectsOnInteractionAtPath(path2, interaction, context);
    }
    return usedBranch.hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    const usedBranch = this.getUsedBranch();
    if (includeChildrenRecursively || usedBranch === this.right && this.left.shouldBeIncluded(context) || !usedBranch) {
      this.left.include(context, includeChildrenRecursively);
      this.right.include(context, includeChildrenRecursively);
    } else {
      usedBranch.include(context, includeChildrenRecursively);
    }
  }
  removeAnnotations(code) {
    this.left.removeAnnotations(code);
  }
  render(code, options, { isCalleeOfRenderedParent, preventASI, renderedParentType, renderedSurroundingElement } = BLANK) {
    if (!this.left.included || !this.right.included) {
      const operatorPos = findFirstOccurrenceOutsideComment(code.original, this.operator, this.left.end);
      if (this.right.included) {
        const removePos = findNonWhiteSpace(code.original, operatorPos + 2);
        code.remove(this.start, removePos);
        if (preventASI) {
          removeLineBreaks(code, removePos, this.right.start);
        }
        this.left.removeAnnotations(code);
      } else {
        code.remove(operatorPos, this.end);
      }
      this.getUsedBranch().render(code, options, {
        isCalleeOfRenderedParent,
        preventASI,
        renderedParentType: renderedParentType || this.parent.type,
        renderedSurroundingElement: renderedSurroundingElement || this.parent.type
      });
    } else {
      this.left.render(code, options, {
        preventASI,
        renderedSurroundingElement
      });
      this.right.render(code, options);
    }
  }
  getUsedBranch() {
    if (!this.isBranchResolutionAnalysed) {
      this.isBranchResolutionAnalysed = true;
      const leftValue = this.left.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
      if (typeof leftValue === "symbol") {
        return null;
      } else {
        this.usedBranch = this.operator === "||" && leftValue || this.operator === "&&" && !leftValue || this.operator === "??" && leftValue != null ? this.left : this.right;
      }
    }
    return this.usedBranch;
  }
};
var FILE_PREFIX = "ROLLUP_FILE_URL_";
var IMPORT = "import";
var MetaProperty = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.metaProperty = null;
    this.preliminaryChunkId = null;
    this.referenceId = null;
  }
  getReferencedFileName(outputPluginDriver) {
    const { meta: { name }, metaProperty: metaProperty2 } = this;
    if (name === IMPORT && metaProperty2?.startsWith(FILE_PREFIX)) {
      return outputPluginDriver.getFileName(metaProperty2.slice(FILE_PREFIX.length));
    }
    return null;
  }
  hasEffects() {
    return false;
  }
  hasEffectsOnInteractionAtPath(path2, { type }) {
    return path2.length > 1 || type !== INTERACTION_ACCESSED;
  }
  include() {
    if (!this.included) {
      this.included = true;
      if (this.meta.name === IMPORT) {
        this.scope.context.addImportMeta(this);
        const parent = this.parent;
        const metaProperty2 = this.metaProperty = parent instanceof MemberExpression && typeof parent.propertyKey === "string" ? parent.propertyKey : null;
        if (metaProperty2?.startsWith(FILE_PREFIX)) {
          this.referenceId = metaProperty2.slice(FILE_PREFIX.length);
        }
      }
    }
  }
  render(code, renderOptions) {
    const { format, pluginDriver, snippets } = renderOptions;
    const { scope: { context: { module } }, meta: { name }, metaProperty: metaProperty2, parent, preliminaryChunkId, referenceId, start, end } = this;
    const { id: moduleId } = module;
    if (name !== IMPORT)
      return;
    const chunkId = preliminaryChunkId;
    if (referenceId) {
      const fileName = pluginDriver.getFileName(referenceId);
      const relativePath = normalize(relative2(dirname(chunkId), fileName));
      const replacement2 = pluginDriver.hookFirstSync("resolveFileUrl", [
        { chunkId, fileName, format, moduleId, referenceId, relativePath }
      ]) || relativeUrlMechanisms[format](relativePath);
      code.overwrite(parent.start, parent.end, replacement2, { contentOnly: true });
      return;
    }
    let replacement = pluginDriver.hookFirstSync("resolveImportMeta", [
      metaProperty2,
      { chunkId, format, moduleId }
    ]);
    if (!replacement) {
      replacement = importMetaMechanisms[format]?.(metaProperty2, { chunkId, snippets });
      renderOptions.accessedDocumentCurrentScript ||= formatsMaybeAccessDocumentCurrentScript.includes(format) && replacement !== "undefined";
    }
    if (typeof replacement === "string") {
      if (parent instanceof MemberExpression) {
        code.overwrite(parent.start, parent.end, replacement, { contentOnly: true });
      } else {
        code.overwrite(start, end, replacement, { contentOnly: true });
      }
    }
  }
  setResolution(format, accessedGlobalsByScope, preliminaryChunkId) {
    this.preliminaryChunkId = preliminaryChunkId;
    const accessedGlobals = (this.metaProperty?.startsWith(FILE_PREFIX) ? accessedFileUrlGlobals : accessedMetaUrlGlobals)[format];
    if (accessedGlobals.length > 0) {
      this.scope.addAccessedGlobals(accessedGlobals, accessedGlobalsByScope);
    }
  }
};
var formatsMaybeAccessDocumentCurrentScript = ["cjs", "iife", "umd"];
var accessedMetaUrlGlobals = {
  amd: ["document", "module", "URL"],
  cjs: ["document", "require", "URL", DOCUMENT_CURRENT_SCRIPT],
  es: [],
  iife: ["document", "URL", DOCUMENT_CURRENT_SCRIPT],
  system: ["module"],
  umd: ["document", "require", "URL", DOCUMENT_CURRENT_SCRIPT]
};
var accessedFileUrlGlobals = {
  amd: ["document", "require", "URL"],
  cjs: ["document", "require", "URL"],
  es: [],
  iife: ["document", "URL"],
  system: ["module", "URL"],
  umd: ["document", "require", "URL"]
};
var getResolveUrl = (path2, URL2 = "URL") => `new ${URL2}(${path2}).href`;
var getRelativeUrlFromDocument = (relativePath, umd2 = false) => getResolveUrl(`'${escapeId(relativePath)}', ${umd2 ? `typeof document === 'undefined' ? location.href : ` : ""}document.currentScript && document.currentScript.src || document.baseURI`);
var getGenericImportMetaMechanism = (getUrl) => (property2, { chunkId }) => {
  const urlMechanism = getUrl(chunkId);
  return property2 === null ? `({ url: ${urlMechanism} })` : property2 === "url" ? urlMechanism : "undefined";
};
var getFileUrlFromFullPath = (path2) => `require('u' + 'rl').pathToFileURL(${path2}).href`;
var getFileUrlFromRelativePath = (path2) => getFileUrlFromFullPath(`__dirname + '/${path2}'`);
var getUrlFromDocument = (chunkId, umd2 = false) => `${umd2 ? `typeof document === 'undefined' ? location.href : ` : ""}(${DOCUMENT_CURRENT_SCRIPT} && ${DOCUMENT_CURRENT_SCRIPT}.src || new URL('${escapeId(chunkId)}', document.baseURI).href)`;
var relativeUrlMechanisms = {
  amd: (relativePath) => {
    if (relativePath[0] !== ".")
      relativePath = "./" + relativePath;
    return getResolveUrl(`require.toUrl('${relativePath}'), document.baseURI`);
  },
  cjs: (relativePath) => `(typeof document === 'undefined' ? ${getFileUrlFromRelativePath(relativePath)} : ${getRelativeUrlFromDocument(relativePath)})`,
  es: (relativePath) => getResolveUrl(`'${relativePath}', import.meta.url`),
  iife: (relativePath) => getRelativeUrlFromDocument(relativePath),
  system: (relativePath) => getResolveUrl(`'${relativePath}', module.meta.url`),
  umd: (relativePath) => `(typeof document === 'undefined' && typeof location === 'undefined' ? ${getFileUrlFromRelativePath(relativePath)} : ${getRelativeUrlFromDocument(relativePath, true)})`
};
var importMetaMechanisms = {
  amd: getGenericImportMetaMechanism(() => getResolveUrl(`module.uri, document.baseURI`)),
  cjs: getGenericImportMetaMechanism((chunkId) => `(typeof document === 'undefined' ? ${getFileUrlFromFullPath("__filename")} : ${getUrlFromDocument(chunkId)})`),
  iife: getGenericImportMetaMechanism((chunkId) => getUrlFromDocument(chunkId)),
  system: (property2, { snippets: { getPropertyAccess } }) => property2 === null ? `module.meta` : `module.meta${getPropertyAccess(property2)}`,
  umd: getGenericImportMetaMechanism((chunkId) => `(typeof document === 'undefined' && typeof location === 'undefined' ? ${getFileUrlFromFullPath("__filename")} : ${getUrlFromDocument(chunkId, true)})`)
};
var NewExpression = class extends NodeBase {
  hasEffects(context) {
    try {
      for (const argument of this.arguments) {
        if (argument.hasEffects(context))
          return true;
      }
      if (this.annotationPure) {
        return false;
      }
      return this.callee.hasEffects(context) || this.callee.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.interaction, context);
    } finally {
      if (!this.deoptimized)
        this.applyDeoptimizations();
    }
  }
  hasEffectsOnInteractionAtPath(path2, { type }) {
    return path2.length > 0 || type !== INTERACTION_ACCESSED;
  }
  include(context, includeChildrenRecursively) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    if (includeChildrenRecursively) {
      super.include(context, includeChildrenRecursively);
    } else {
      this.included = true;
      this.callee.include(context, false);
    }
    this.callee.includeCallArguments(context, this.arguments);
  }
  initialise() {
    super.initialise();
    this.interaction = {
      args: [null, ...this.arguments],
      type: INTERACTION_CALLED,
      withNew: true
    };
    if (this.annotations && this.scope.context.options.treeshake.annotations) {
      this.annotationPure = this.annotations.some((comment) => comment.type === "pure");
    }
  }
  render(code, options) {
    this.callee.render(code, options);
    renderCallArguments(code, options, this);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    this.callee.deoptimizeArgumentsOnInteractionAtPath(this.interaction, EMPTY_PATH, SHARED_RECURSION_TRACKER);
    this.scope.context.requestTreeshakingPass();
  }
};
var ObjectExpression = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.objectEntity = null;
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizeCache() {
    this.getObjectEntity().deoptimizeAllProperties();
  }
  deoptimizePath(path2) {
    this.getObjectEntity().deoptimizePath(path2);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    return this.getObjectEntity().getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return this.getObjectEntity().hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  render(code, options, { renderedSurroundingElement } = BLANK) {
    super.render(code, options);
    if (renderedSurroundingElement === ExpressionStatement || renderedSurroundingElement === ArrowFunctionExpression) {
      code.appendRight(this.start, "(");
      code.prependLeft(this.end, ")");
    }
  }
  applyDeoptimizations() {
  }
  getObjectEntity() {
    if (this.objectEntity !== null) {
      return this.objectEntity;
    }
    let prototype = OBJECT_PROTOTYPE;
    const properties = [];
    for (const property2 of this.properties) {
      if (property2 instanceof SpreadElement) {
        properties.push({ key: UnknownKey, kind: "init", property: property2 });
        continue;
      }
      let key;
      if (property2.computed) {
        const keyValue = property2.key.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
        if (typeof keyValue === "symbol") {
          properties.push({ key: UnknownKey, kind: property2.kind, property: property2 });
          continue;
        } else {
          key = String(keyValue);
        }
      } else {
        key = property2.key instanceof Identifier2 ? property2.key.name : String(property2.key.value);
        if (key === "__proto__" && property2.kind === "init") {
          prototype = property2.value instanceof Literal2 && property2.value.value === null ? null : property2.value;
          continue;
        }
      }
      properties.push({ key, kind: property2.kind, property: property2 });
    }
    return this.objectEntity = new ObjectEntity(properties, prototype);
  }
};
var PanicError = class extends NodeBase {
  initialise() {
    const id = this.scope.context.module.id;
    const parseError2 = getRollupEror(logParseError(this.message));
    const moduleParseError = logModuleParseError(parseError2, id);
    return error(moduleParseError);
  }
};
var ParseError = class extends NodeBase {
  initialise() {
    const pos = this.start;
    const id = this.scope.context.module.id;
    const parseError2 = getRollupEror(logParseError(this.message, pos));
    const moduleParseError = logModuleParseError(parseError2, id);
    this.scope.context.error(moduleParseError, pos);
  }
};
var PrivateIdentifier = class extends NodeBase {
};
var Program2 = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.hasCachedEffect = null;
    this.hasLoggedEffect = false;
  }
  hasCachedEffects() {
    if (!this.included) {
      return false;
    }
    return this.hasCachedEffect === null ? this.hasCachedEffect = this.hasEffects(createHasEffectsContext()) : this.hasCachedEffect;
  }
  hasEffects(context) {
    for (const node of this.body) {
      if (node.hasEffects(context)) {
        if (this.scope.context.options.experimentalLogSideEffects && !this.hasLoggedEffect) {
          this.hasLoggedEffect = true;
          const { code, log, module } = this.scope.context;
          log(LOGLEVEL_INFO, logFirstSideEffect(code, module.id, locate(code, node.start, { offsetLine: 1 })), node.start);
        }
        return this.hasCachedEffect = true;
      }
    }
    return false;
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    for (const node of this.body) {
      if (includeChildrenRecursively || node.shouldBeIncluded(context)) {
        node.include(context, includeChildrenRecursively);
      }
    }
  }
  initialise() {
    super.initialise();
    if (this.invalidAnnotations)
      for (const { start, end, type } of this.invalidAnnotations) {
        this.scope.context.magicString.remove(start, end);
        if (type === "pure" || type === "noSideEffects") {
          this.scope.context.log(LOGLEVEL_WARN, logInvalidAnnotation(this.scope.context.code.slice(start, end), this.scope.context.module.id, type), start);
        }
      }
  }
  render(code, options) {
    let start = this.start;
    if (code.original.startsWith("#!")) {
      start = Math.min(code.original.indexOf("\n") + 1, this.end);
      code.remove(0, start);
    }
    if (this.body.length > 0) {
      while (code.original[start] === "/" && /[*/]/.test(code.original[start + 1])) {
        const firstLineBreak = findFirstLineBreakOutsideComment(code.original.slice(start, this.body[0].start));
        if (firstLineBreak[0] === -1) {
          break;
        }
        start += firstLineBreak[1];
      }
      renderStatementList(this.body, code, start, this.end, options);
    } else {
      super.render(code, options);
    }
  }
  applyDeoptimizations() {
  }
};
var Property2 = class extends MethodBase {
  constructor() {
    super(...arguments);
    this.declarationInit = null;
  }
  //declare method: boolean;
  get method() {
    return isFlagSet(
      this.flags,
      262144
      /* Flag.method */
    );
  }
  set method(value) {
    this.flags = setFlag(this.flags, 262144, value);
  }
  //declare shorthand: boolean;
  get shorthand() {
    return isFlagSet(
      this.flags,
      524288
      /* Flag.shorthand */
    );
  }
  set shorthand(value) {
    this.flags = setFlag(this.flags, 524288, value);
  }
  declare(kind, init2) {
    this.declarationInit = init2;
    return this.value.declare(kind, UNKNOWN_EXPRESSION);
  }
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    const propertyReadSideEffects = this.scope.context.options.treeshake.propertyReadSideEffects;
    return this.parent.type === "ObjectPattern" && propertyReadSideEffects === "always" || this.key.hasEffects(context) || this.value.hasEffects(context);
  }
  markDeclarationReached() {
    this.value.markDeclarationReached();
  }
  render(code, options) {
    if (!this.shorthand) {
      this.key.render(code, options);
    }
    this.value.render(code, options, { isShorthandProperty: this.shorthand });
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    if (this.declarationInit !== null) {
      this.declarationInit.deoptimizePath([UnknownKey, UnknownKey]);
      this.scope.context.requestTreeshakingPass();
    }
  }
};
var PropertyDefinition = class extends NodeBase {
  get computed() {
    return isFlagSet(
      this.flags,
      1024
      /* Flag.computed */
    );
  }
  set computed(value) {
    this.flags = setFlag(this.flags, 1024, value);
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.value?.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizePath(path2) {
    this.value?.deoptimizePath(path2);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    return this.value ? this.value.getLiteralValueAtPath(path2, recursionTracker, origin) : UnknownValue;
  }
  getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
    return this.value ? this.value.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) : UNKNOWN_RETURN_EXPRESSION;
  }
  hasEffects(context) {
    return this.key.hasEffects(context) || this.static && !!this.value?.hasEffects(context);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return !this.value || this.value.hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  applyDeoptimizations() {
  }
};
var ReturnStatement2 = class extends NodeBase {
  hasEffects(context) {
    if (!context.ignore.returnYield || this.argument?.hasEffects(context))
      return true;
    context.brokenFlow = true;
    return false;
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    this.argument?.include(context, includeChildrenRecursively);
    context.brokenFlow = true;
  }
  initialise() {
    super.initialise();
    this.scope.addReturnExpression(this.argument || UNKNOWN_EXPRESSION);
  }
  render(code, options) {
    if (this.argument) {
      this.argument.render(code, options, { preventASI: true });
      if (this.argument.start === this.start + 6) {
        code.prependLeft(this.start + 6, " ");
      }
    }
  }
};
var SequenceExpression = class extends NodeBase {
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.expressions[this.expressions.length - 1].deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizePath(path2) {
    this.expressions[this.expressions.length - 1].deoptimizePath(path2);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    return this.expressions[this.expressions.length - 1].getLiteralValueAtPath(path2, recursionTracker, origin);
  }
  hasEffects(context) {
    for (const expression of this.expressions) {
      if (expression.hasEffects(context))
        return true;
    }
    return false;
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    return this.expressions[this.expressions.length - 1].hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    const lastExpression = this.expressions[this.expressions.length - 1];
    for (const expression of this.expressions) {
      if (includeChildrenRecursively || expression === lastExpression && !(this.parent instanceof ExpressionStatement2) || expression.shouldBeIncluded(context))
        expression.include(context, includeChildrenRecursively);
    }
  }
  removeAnnotations(code) {
    this.expressions[0].removeAnnotations(code);
  }
  render(code, options, { renderedParentType, isCalleeOfRenderedParent, preventASI } = BLANK) {
    let includedNodes = 0;
    let lastSeparatorPos = null;
    const lastNode = this.expressions[this.expressions.length - 1];
    for (const { node, separator, start, end } of getCommaSeparatedNodesWithBoundaries(this.expressions, code, this.start, this.end)) {
      if (!node.included) {
        treeshakeNode(node, code, start, end);
        continue;
      }
      includedNodes++;
      lastSeparatorPos = separator;
      if (includedNodes === 1 && preventASI) {
        removeLineBreaks(code, start, node.start);
      }
      if (includedNodes === 1) {
        const parentType = renderedParentType || this.parent.type;
        node.render(code, options, {
          isCalleeOfRenderedParent: isCalleeOfRenderedParent && node === lastNode,
          renderedParentType: parentType,
          renderedSurroundingElement: parentType
        });
      } else {
        node.render(code, options);
      }
    }
    if (lastSeparatorPos) {
      code.remove(lastSeparatorPos, this.end);
    }
  }
};
var StaticBlock = class extends NodeBase {
  createScope(parentScope) {
    this.scope = new BlockScope(parentScope);
  }
  hasEffects(context) {
    for (const node of this.body) {
      if (node.hasEffects(context))
        return true;
    }
    return false;
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    for (const node of this.body) {
      if (includeChildrenRecursively || node.shouldBeIncluded(context))
        node.include(context, includeChildrenRecursively);
    }
  }
  render(code, options) {
    if (this.body.length > 0) {
      const bodyStartPos = findFirstOccurrenceOutsideComment(code.original.slice(this.start, this.end), "{") + 1;
      renderStatementList(this.body, code, this.start + bodyStartPos, this.end - 1, options);
    } else {
      super.render(code, options);
    }
  }
};
var Super = class extends NodeBase {
  bind() {
    this.variable = this.scope.findVariable("this");
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.variable.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizePath(path2) {
    this.variable.deoptimizePath(path2);
  }
  include() {
    if (!this.included) {
      this.included = true;
      this.scope.context.includeVariableInModule(this.variable);
    }
  }
};
var SwitchCase = class extends NodeBase {
  hasEffects(context) {
    if (this.test?.hasEffects(context))
      return true;
    for (const node of this.consequent) {
      if (context.brokenFlow)
        break;
      if (node.hasEffects(context))
        return true;
    }
    return false;
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    this.test?.include(context, includeChildrenRecursively);
    for (const node of this.consequent) {
      if (includeChildrenRecursively || node.shouldBeIncluded(context))
        node.include(context, includeChildrenRecursively);
    }
  }
  render(code, options, nodeRenderOptions) {
    if (this.consequent.length > 0) {
      this.test && this.test.render(code, options);
      const testEnd = this.test ? this.test.end : findFirstOccurrenceOutsideComment(code.original, "default", this.start) + 7;
      const consequentStart = findFirstOccurrenceOutsideComment(code.original, ":", testEnd) + 1;
      renderStatementList(this.consequent, code, consequentStart, nodeRenderOptions.end, options);
    } else {
      super.render(code, options);
    }
  }
};
SwitchCase.prototype.needsBoundaries = true;
var SwitchStatement = class extends NodeBase {
  createScope(parentScope) {
    this.parentScope = parentScope;
    this.scope = new BlockScope(parentScope);
  }
  hasEffects(context) {
    if (this.discriminant.hasEffects(context))
      return true;
    const { brokenFlow, hasBreak, ignore } = context;
    const { breaks } = ignore;
    ignore.breaks = true;
    context.hasBreak = false;
    let onlyHasBrokenFlow = true;
    for (const switchCase2 of this.cases) {
      if (switchCase2.hasEffects(context))
        return true;
      onlyHasBrokenFlow &&= context.brokenFlow && !context.hasBreak;
      context.hasBreak = false;
      context.brokenFlow = brokenFlow;
    }
    if (this.defaultCase !== null) {
      context.brokenFlow = onlyHasBrokenFlow;
    }
    ignore.breaks = breaks;
    context.hasBreak = hasBreak;
    return false;
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    this.discriminant.include(context, includeChildrenRecursively);
    const { brokenFlow, hasBreak } = context;
    context.hasBreak = false;
    let onlyHasBrokenFlow = true;
    let isCaseIncluded = includeChildrenRecursively || this.defaultCase !== null && this.defaultCase < this.cases.length - 1;
    for (let caseIndex = this.cases.length - 1; caseIndex >= 0; caseIndex--) {
      const switchCase2 = this.cases[caseIndex];
      if (switchCase2.included) {
        isCaseIncluded = true;
      }
      if (!isCaseIncluded) {
        const hasEffectsContext = createHasEffectsContext();
        hasEffectsContext.ignore.breaks = true;
        isCaseIncluded = switchCase2.hasEffects(hasEffectsContext);
      }
      if (isCaseIncluded) {
        switchCase2.include(context, includeChildrenRecursively);
        onlyHasBrokenFlow &&= context.brokenFlow && !context.hasBreak;
        context.hasBreak = false;
        context.brokenFlow = brokenFlow;
      } else {
        onlyHasBrokenFlow = brokenFlow;
      }
    }
    if (isCaseIncluded && this.defaultCase !== null) {
      context.brokenFlow = onlyHasBrokenFlow;
    }
    context.hasBreak = hasBreak;
  }
  initialise() {
    super.initialise();
    for (let caseIndex = 0; caseIndex < this.cases.length; caseIndex++) {
      if (this.cases[caseIndex].test === null) {
        this.defaultCase = caseIndex;
        return;
      }
    }
    this.defaultCase = null;
  }
  parseNode(esTreeNode) {
    this.discriminant = new (this.scope.context.getNodeConstructor(esTreeNode.discriminant.type))(this, this.parentScope).parseNode(esTreeNode.discriminant);
    return super.parseNode(esTreeNode);
  }
  render(code, options) {
    this.discriminant.render(code, options);
    if (this.cases.length > 0) {
      renderStatementList(this.cases, code, this.cases[0].start, this.end - 1, options);
    }
  }
};
var TaggedTemplateExpression = class extends CallExpressionBase {
  bind() {
    super.bind();
    if (this.tag.type === Identifier) {
      const name = this.tag.name;
      const variable = this.scope.findVariable(name);
      if (variable.isNamespace) {
        this.scope.context.log(LOGLEVEL_WARN, logCannotCallNamespace(name), this.start);
      }
    }
  }
  hasEffects(context) {
    try {
      for (const argument of this.quasi.expressions) {
        if (argument.hasEffects(context))
          return true;
      }
      return this.tag.hasEffects(context) || this.tag.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.interaction, context);
    } finally {
      if (!this.deoptimized)
        this.applyDeoptimizations();
    }
  }
  include(context, includeChildrenRecursively) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    if (includeChildrenRecursively) {
      super.include(context, includeChildrenRecursively);
    } else {
      this.included = true;
      this.tag.include(context, includeChildrenRecursively);
      this.quasi.include(context, includeChildrenRecursively);
    }
    this.tag.includeCallArguments(context, this.args);
    const [returnExpression] = this.getReturnExpression();
    if (!returnExpression.included) {
      returnExpression.include(context, false);
    }
  }
  initialise() {
    super.initialise();
    this.args = [UNKNOWN_EXPRESSION, ...this.quasi.expressions];
    this.interaction = {
      args: [
        this.tag instanceof MemberExpression && !this.tag.variable ? this.tag.object : null,
        ...this.args
      ],
      type: INTERACTION_CALLED,
      withNew: false
    };
  }
  render(code, options) {
    this.tag.render(code, options, { isCalleeOfRenderedParent: true });
    this.quasi.render(code, options);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    this.tag.deoptimizeArgumentsOnInteractionAtPath(this.interaction, EMPTY_PATH, SHARED_RECURSION_TRACKER);
    this.scope.context.requestTreeshakingPass();
  }
  getReturnExpression(recursionTracker = SHARED_RECURSION_TRACKER) {
    if (this.returnExpression === null) {
      this.returnExpression = UNKNOWN_RETURN_EXPRESSION;
      return this.returnExpression = this.tag.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, this.interaction, recursionTracker, this);
    }
    return this.returnExpression;
  }
};
var TemplateElement = class extends NodeBase {
  get tail() {
    return isFlagSet(
      this.flags,
      1048576
      /* Flag.tail */
    );
  }
  set tail(value) {
    this.flags = setFlag(this.flags, 1048576, value);
  }
  // Do not try to bind value
  bind() {
  }
  hasEffects() {
    return false;
  }
  include() {
    this.included = true;
  }
  parseNode(esTreeNode) {
    this.value = esTreeNode.value;
    return super.parseNode(esTreeNode);
  }
  render() {
  }
};
var TemplateLiteral2 = class extends NodeBase {
  deoptimizeArgumentsOnInteractionAtPath() {
  }
  getLiteralValueAtPath(path2) {
    if (path2.length > 0 || this.quasis.length !== 1) {
      return UnknownValue;
    }
    return this.quasis[0].value.cooked;
  }
  getReturnExpressionWhenCalledAtPath(path2) {
    if (path2.length !== 1) {
      return UNKNOWN_RETURN_EXPRESSION;
    }
    return getMemberReturnExpressionWhenCalled(literalStringMembers, path2[0]);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (interaction.type === INTERACTION_ACCESSED) {
      return path2.length > 1;
    }
    if (interaction.type === INTERACTION_CALLED && path2.length === 1) {
      return hasMemberEffectWhenCalled(literalStringMembers, path2[0], interaction, context);
    }
    return true;
  }
  render(code, options) {
    code.indentExclusionRanges.push([this.start, this.end]);
    super.render(code, options);
  }
};
var UndefinedVariable = class extends Variable {
  constructor() {
    super("undefined");
  }
  getLiteralValueAtPath() {
    return void 0;
  }
};
var ExportDefaultVariable = class _ExportDefaultVariable extends LocalVariable {
  constructor(name, exportDefaultDeclaration2, context) {
    super(name, exportDefaultDeclaration2, exportDefaultDeclaration2.declaration, context, "other");
    this.hasId = false;
    this.originalId = null;
    this.originalVariable = null;
    const declaration = exportDefaultDeclaration2.declaration;
    if ((declaration instanceof FunctionDeclaration || declaration instanceof ClassDeclaration) && declaration.id) {
      this.hasId = true;
      this.originalId = declaration.id;
    } else if (declaration instanceof Identifier2) {
      this.originalId = declaration;
    }
  }
  addReference(identifier2) {
    if (!this.hasId) {
      this.name = identifier2.name;
    }
  }
  forbidName(name) {
    const original = this.getOriginalVariable();
    if (original === this) {
      super.forbidName(name);
    } else {
      original.forbidName(name);
    }
  }
  getAssignedVariableName() {
    return this.originalId && this.originalId.name || null;
  }
  getBaseVariableName() {
    const original = this.getOriginalVariable();
    return original === this ? super.getBaseVariableName() : original.getBaseVariableName();
  }
  getDirectOriginalVariable() {
    return this.originalId && (this.hasId || !(this.originalId.isPossibleTDZ() || this.originalId.variable.isReassigned || this.originalId.variable instanceof UndefinedVariable || // this avoids a circular dependency
    "syntheticNamespace" in this.originalId.variable)) ? this.originalId.variable : null;
  }
  getName(getPropertyAccess) {
    const original = this.getOriginalVariable();
    return original === this ? super.getName(getPropertyAccess) : original.getName(getPropertyAccess);
  }
  getOriginalVariable() {
    if (this.originalVariable)
      return this.originalVariable;
    let original = this;
    let currentVariable;
    const checkedVariables = /* @__PURE__ */ new Set();
    do {
      checkedVariables.add(original);
      currentVariable = original;
      original = currentVariable.getDirectOriginalVariable();
    } while (original instanceof _ExportDefaultVariable && !checkedVariables.has(original));
    return this.originalVariable = original || currentVariable;
  }
};
var ModuleScope = class extends ChildScope {
  constructor(parent, context) {
    super(parent, context);
    this.variables.set("this", new LocalVariable("this", null, UNDEFINED_EXPRESSION, context, "other"));
  }
  addDeclaration(identifier2, context, init2, kind) {
    if (this.context.module.importDescriptions.has(identifier2.name)) {
      context.error(logRedeclarationError(identifier2.name), identifier2.start);
    }
    return super.addDeclaration(identifier2, context, init2, kind);
  }
  addExportDefaultDeclaration(name, exportDefaultDeclaration2, context) {
    const variable = new ExportDefaultVariable(name, exportDefaultDeclaration2, context);
    this.variables.set("default", variable);
    return variable;
  }
  addNamespaceMemberAccess() {
  }
  deconflict(format, exportNamesByVariable, accessedGlobalsByScope) {
    for (const scope of this.children)
      scope.deconflict(format, exportNamesByVariable, accessedGlobalsByScope);
  }
  findLexicalBoundary() {
    return this;
  }
  findVariable(name) {
    const knownVariable = this.variables.get(name) || this.accessedOutsideVariables.get(name);
    if (knownVariable) {
      return knownVariable;
    }
    const variable = this.context.traceVariable(name) || this.parent.findVariable(name);
    if (variable instanceof GlobalVariable) {
      this.accessedOutsideVariables.set(name, variable);
    }
    return variable;
  }
};
var ThisExpression = class extends NodeBase {
  bind() {
    this.variable = this.scope.findVariable("this");
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    this.variable.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
  }
  deoptimizePath(path2) {
    this.variable.deoptimizePath(path2);
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    if (path2.length === 0) {
      return interaction.type !== INTERACTION_ACCESSED;
    }
    return this.variable.hasEffectsOnInteractionAtPath(path2, interaction, context);
  }
  include() {
    if (!this.included) {
      this.included = true;
      this.scope.context.includeVariableInModule(this.variable);
    }
  }
  initialise() {
    super.initialise();
    this.alias = this.scope.findLexicalBoundary() instanceof ModuleScope ? this.scope.context.moduleContext : null;
    if (this.alias === "undefined") {
      this.scope.context.log(LOGLEVEL_WARN, logThisIsUndefined(), this.start);
    }
  }
  render(code) {
    if (this.alias !== null) {
      code.overwrite(this.start, this.end, this.alias, {
        contentOnly: false,
        storeName: true
      });
    }
  }
};
var ThrowStatement = class extends NodeBase {
  hasEffects() {
    return true;
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    this.argument.include(context, includeChildrenRecursively);
    context.brokenFlow = true;
  }
  render(code, options) {
    this.argument.render(code, options, { preventASI: true });
    if (this.argument.start === this.start + 5) {
      code.prependLeft(this.start + 5, " ");
    }
  }
};
var TryStatement = class extends NodeBase {
  constructor() {
    super(...arguments);
    this.directlyIncluded = false;
    this.includedLabelsAfterBlock = null;
  }
  hasEffects(context) {
    return (this.scope.context.options.treeshake.tryCatchDeoptimization ? this.block.body.length > 0 : this.block.hasEffects(context)) || !!this.finalizer?.hasEffects(context);
  }
  include(context, includeChildrenRecursively) {
    const tryCatchDeoptimization = this.scope.context.options.treeshake?.tryCatchDeoptimization;
    const { brokenFlow, includedLabels } = context;
    if (!this.directlyIncluded || !tryCatchDeoptimization) {
      this.included = true;
      this.directlyIncluded = true;
      this.block.include(context, tryCatchDeoptimization ? INCLUDE_PARAMETERS : includeChildrenRecursively);
      if (includedLabels.size > 0) {
        this.includedLabelsAfterBlock = [...includedLabels];
      }
      context.brokenFlow = brokenFlow;
    } else if (this.includedLabelsAfterBlock) {
      for (const label of this.includedLabelsAfterBlock) {
        includedLabels.add(label);
      }
    }
    if (this.handler !== null) {
      this.handler.include(context, includeChildrenRecursively);
      context.brokenFlow = brokenFlow;
    }
    this.finalizer?.include(context, includeChildrenRecursively);
  }
};
var unaryOperators = {
  "!": (value) => !value,
  "+": (value) => +value,
  "-": (value) => -value,
  delete: () => UnknownValue,
  typeof: (value) => typeof value,
  void: () => void 0,
  "~": (value) => ~value
};
var UnaryExpression = class extends NodeBase {
  get prefix() {
    return isFlagSet(
      this.flags,
      2097152
      /* Flag.prefix */
    );
  }
  set prefix(value) {
    this.flags = setFlag(this.flags, 2097152, value);
  }
  getLiteralValueAtPath(path2, recursionTracker, origin) {
    if (path2.length > 0)
      return UnknownValue;
    const argumentValue = this.argument.getLiteralValueAtPath(EMPTY_PATH, recursionTracker, origin);
    if (typeof argumentValue === "symbol")
      return UnknownValue;
    return unaryOperators[this.operator](argumentValue);
  }
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    if (this.operator === "typeof" && this.argument instanceof Identifier2)
      return false;
    return this.argument.hasEffects(context) || this.operator === "delete" && this.argument.hasEffectsOnInteractionAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_ASSIGNMENT, context);
  }
  hasEffectsOnInteractionAtPath(path2, { type }) {
    return type !== INTERACTION_ACCESSED || path2.length > (this.operator === "void" ? 0 : 1);
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    if (this.operator === "delete") {
      this.argument.deoptimizePath(EMPTY_PATH);
      this.scope.context.requestTreeshakingPass();
    }
  }
};
var UpdateExpression = class extends NodeBase {
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    return this.argument.hasEffectsAsAssignmentTarget(context, true);
  }
  hasEffectsOnInteractionAtPath(path2, { type }) {
    return path2.length > 1 || type !== INTERACTION_ACCESSED;
  }
  include(context, includeChildrenRecursively) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    this.included = true;
    this.argument.includeAsAssignmentTarget(context, includeChildrenRecursively, true);
  }
  initialise() {
    super.initialise();
    this.argument.setAssignedValue(UNKNOWN_EXPRESSION);
  }
  render(code, options) {
    const { exportNamesByVariable, format, snippets: { _ } } = options;
    this.argument.render(code, options);
    if (format === "system") {
      const variable = this.argument.variable;
      const exportNames = exportNamesByVariable.get(variable);
      if (exportNames) {
        if (this.prefix) {
          if (exportNames.length === 1) {
            renderSystemExportExpression(variable, this.start, this.end, code, options);
          } else {
            renderSystemExportSequenceAfterExpression(variable, this.start, this.end, this.parent.type !== ExpressionStatement, code, options);
          }
        } else {
          const operator = this.operator[0];
          renderSystemExportSequenceBeforeExpression(variable, this.start, this.end, this.parent.type !== ExpressionStatement, code, options, `${_}${operator}${_}1`);
        }
      }
    }
  }
  applyDeoptimizations() {
    this.deoptimized = true;
    this.argument.deoptimizePath(EMPTY_PATH);
    if (this.argument instanceof Identifier2) {
      const variable = this.scope.findVariable(this.argument.name);
      variable.isReassigned = true;
    }
    this.scope.context.requestTreeshakingPass();
  }
};
function areAllDeclarationsIncludedAndNotExported(declarations, exportNamesByVariable) {
  for (const declarator of declarations) {
    if (!declarator.id.included)
      return false;
    if (declarator.id.type === Identifier) {
      if (exportNamesByVariable.has(declarator.id.variable))
        return false;
    } else {
      const exportedVariables = [];
      declarator.id.addExportedVariables(exportedVariables, exportNamesByVariable);
      if (exportedVariables.length > 0)
        return false;
    }
  }
  return true;
}
var VariableDeclaration = class extends NodeBase {
  deoptimizePath() {
    for (const declarator of this.declarations) {
      declarator.deoptimizePath(EMPTY_PATH);
    }
  }
  hasEffectsOnInteractionAtPath() {
    return false;
  }
  include(context, includeChildrenRecursively, { asSingleStatement } = BLANK) {
    this.included = true;
    for (const declarator of this.declarations) {
      if (includeChildrenRecursively || declarator.shouldBeIncluded(context))
        declarator.include(context, includeChildrenRecursively);
      const { id, init: init2 } = declarator;
      if (asSingleStatement) {
        id.include(context, includeChildrenRecursively);
      }
      if (init2 && id.included && !init2.included && (id instanceof ObjectPattern || id instanceof ArrayPattern)) {
        init2.include(context, includeChildrenRecursively);
      }
    }
  }
  initialise() {
    super.initialise();
    for (const declarator of this.declarations) {
      declarator.declareDeclarator(this.kind);
    }
  }
  removeAnnotations(code) {
    this.declarations[0].removeAnnotations(code);
  }
  render(code, options, nodeRenderOptions = BLANK) {
    if (areAllDeclarationsIncludedAndNotExported(this.declarations, options.exportNamesByVariable)) {
      for (const declarator of this.declarations) {
        declarator.render(code, options);
      }
      if (!nodeRenderOptions.isNoStatement && code.original.charCodeAt(this.end - 1) !== 59) {
        code.appendLeft(this.end, ";");
      }
    } else {
      this.renderReplacedDeclarations(code, options);
    }
  }
  applyDeoptimizations() {
  }
  renderDeclarationEnd(code, separatorString, lastSeparatorPos, actualContentEnd, renderedContentEnd, systemPatternExports, options) {
    if (code.original.charCodeAt(this.end - 1) === 59) {
      code.remove(this.end - 1, this.end);
    }
    separatorString += ";";
    if (lastSeparatorPos === null) {
      code.appendLeft(renderedContentEnd, separatorString);
    } else {
      if (code.original.charCodeAt(actualContentEnd - 1) === 10 && (code.original.charCodeAt(this.end) === 10 || code.original.charCodeAt(this.end) === 13)) {
        actualContentEnd--;
        if (code.original.charCodeAt(actualContentEnd) === 13) {
          actualContentEnd--;
        }
      }
      if (actualContentEnd === lastSeparatorPos + 1) {
        code.overwrite(lastSeparatorPos, renderedContentEnd, separatorString);
      } else {
        code.overwrite(lastSeparatorPos, lastSeparatorPos + 1, separatorString);
        code.remove(actualContentEnd, renderedContentEnd);
      }
    }
    if (systemPatternExports.length > 0) {
      code.appendLeft(renderedContentEnd, ` ${getSystemExportStatement(systemPatternExports, options)};`);
    }
  }
  renderReplacedDeclarations(code, options) {
    const separatedNodes = getCommaSeparatedNodesWithBoundaries(this.declarations, code, this.start + this.kind.length, this.end - (code.original.charCodeAt(this.end - 1) === 59 ? 1 : 0));
    let actualContentEnd, renderedContentEnd;
    renderedContentEnd = findNonWhiteSpace(code.original, this.start + this.kind.length);
    let lastSeparatorPos = renderedContentEnd - 1;
    code.remove(this.start, lastSeparatorPos);
    let isInDeclaration = false;
    let hasRenderedContent = false;
    let separatorString = "", leadingString, nextSeparatorString;
    const aggregatedSystemExports = [];
    const singleSystemExport = gatherSystemExportsAndGetSingleExport(separatedNodes, options, aggregatedSystemExports);
    for (const { node, start, separator, contentEnd, end } of separatedNodes) {
      if (!node.included) {
        code.remove(start, end);
        node.removeAnnotations(code);
        continue;
      }
      node.render(code, options);
      leadingString = "";
      nextSeparatorString = "";
      if (!node.id.included || node.id instanceof Identifier2 && isReassignedExportsMember(node.id.variable, options.exportNamesByVariable)) {
        if (hasRenderedContent) {
          separatorString += ";";
        }
        isInDeclaration = false;
      } else {
        if (singleSystemExport && singleSystemExport === node.id.variable) {
          const operatorPos = findFirstOccurrenceOutsideComment(code.original, "=", node.id.end);
          renderSystemExportExpression(singleSystemExport, findNonWhiteSpace(code.original, operatorPos + 1), separator === null ? contentEnd : separator, code, options);
        }
        if (isInDeclaration) {
          separatorString += ",";
        } else {
          if (hasRenderedContent) {
            separatorString += ";";
          }
          leadingString += `${this.kind} `;
          isInDeclaration = true;
        }
      }
      if (renderedContentEnd === lastSeparatorPos + 1) {
        code.overwrite(lastSeparatorPos, renderedContentEnd, separatorString + leadingString);
      } else {
        code.overwrite(lastSeparatorPos, lastSeparatorPos + 1, separatorString);
        code.appendLeft(renderedContentEnd, leadingString);
      }
      actualContentEnd = contentEnd;
      renderedContentEnd = end;
      hasRenderedContent = true;
      lastSeparatorPos = separator;
      separatorString = nextSeparatorString;
    }
    this.renderDeclarationEnd(code, separatorString, lastSeparatorPos, actualContentEnd, renderedContentEnd, aggregatedSystemExports, options);
  }
};
function gatherSystemExportsAndGetSingleExport(separatedNodes, options, aggregatedSystemExports) {
  let singleSystemExport = null;
  if (options.format === "system") {
    for (const { node } of separatedNodes) {
      if (node.id instanceof Identifier2 && node.init && aggregatedSystemExports.length === 0 && options.exportNamesByVariable.get(node.id.variable)?.length === 1) {
        singleSystemExport = node.id.variable;
        aggregatedSystemExports.push(singleSystemExport);
      } else {
        node.id.addExportedVariables(aggregatedSystemExports, options.exportNamesByVariable);
      }
    }
    if (aggregatedSystemExports.length > 1) {
      singleSystemExport = null;
    } else if (singleSystemExport) {
      aggregatedSystemExports.length = 0;
    }
  }
  return singleSystemExport;
}
var WhileStatement = class extends NodeBase {
  hasEffects(context) {
    if (this.test.hasEffects(context))
      return true;
    return hasLoopBodyEffects(context, this.body);
  }
  include(context, includeChildrenRecursively) {
    this.included = true;
    this.test.include(context, includeChildrenRecursively);
    includeLoopBody(context, this.body, includeChildrenRecursively);
  }
};
var YieldExpression = class extends NodeBase {
  hasEffects(context) {
    if (!this.deoptimized)
      this.applyDeoptimizations();
    return !(context.ignore.returnYield && !this.argument?.hasEffects(context));
  }
  render(code, options) {
    if (this.argument) {
      this.argument.render(code, options, { preventASI: true });
      if (this.argument.start === this.start + 5) {
        code.prependLeft(this.start + 5, " ");
      }
    }
  }
};
function convertProgram(buffer, parent, parentScope) {
  return convertNode2(parent, parentScope, 0, new Uint32Array(buffer.buffer), getReadStringFunction(buffer));
}
var nodeTypeStrings = [
  "PanicError",
  "ParseError",
  "ArrayExpression",
  "ArrayPattern",
  "ArrowFunctionExpression",
  "AssignmentExpression",
  "AssignmentPattern",
  "AwaitExpression",
  "BinaryExpression",
  "BlockStatement",
  "BreakStatement",
  "CallExpression",
  "CatchClause",
  "ChainExpression",
  "ClassBody",
  "ClassDeclaration",
  "ClassExpression",
  "ConditionalExpression",
  "ContinueStatement",
  "DebuggerStatement",
  "ExpressionStatement",
  "DoWhileStatement",
  "EmptyStatement",
  "ExportAllDeclaration",
  "ExportDefaultDeclaration",
  "ExportNamedDeclaration",
  "ExportSpecifier",
  "ExpressionStatement",
  "ForInStatement",
  "ForOfStatement",
  "ForStatement",
  "FunctionDeclaration",
  "FunctionExpression",
  "Identifier",
  "IfStatement",
  "ImportAttribute",
  "ImportDeclaration",
  "ImportDefaultSpecifier",
  "ImportExpression",
  "ImportNamespaceSpecifier",
  "ImportSpecifier",
  "LabeledStatement",
  "Literal",
  "Literal",
  "Literal",
  "Literal",
  "Literal",
  "Literal",
  "LogicalExpression",
  "MemberExpression",
  "MetaProperty",
  "MethodDefinition",
  "NewExpression",
  "ObjectExpression",
  "ObjectPattern",
  "PrivateIdentifier",
  "Program",
  "Property",
  "PropertyDefinition",
  "RestElement",
  "ReturnStatement",
  "SequenceExpression",
  "SpreadElement",
  "StaticBlock",
  "Super",
  "SwitchCase",
  "SwitchStatement",
  "TaggedTemplateExpression",
  "TemplateElement",
  "TemplateLiteral",
  "ThisExpression",
  "ThrowStatement",
  "TryStatement",
  "UnaryExpression",
  "UpdateExpression",
  "VariableDeclaration",
  "VariableDeclarator",
  "WhileStatement",
  "YieldExpression"
];
var nodeConstructors$1 = [
  PanicError,
  ParseError,
  ArrayExpression,
  ArrayPattern,
  ArrowFunctionExpression2,
  AssignmentExpression,
  AssignmentPattern,
  AwaitExpression,
  BinaryExpression,
  BlockStatement2,
  BreakStatement,
  CallExpression2,
  CatchClause2,
  ChainExpression,
  ClassBody,
  ClassDeclaration,
  ClassExpression,
  ConditionalExpression,
  ContinueStatement,
  DebuggerStatement,
  ExpressionStatement2,
  DoWhileStatement,
  EmptyStatement,
  ExportAllDeclaration,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  ExpressionStatement2,
  ForInStatement,
  ForOfStatement,
  ForStatement,
  FunctionDeclaration,
  FunctionExpression,
  Identifier2,
  IfStatement,
  ImportAttribute,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportExpression,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  LabeledStatement,
  Literal2,
  Literal2,
  Literal2,
  Literal2,
  Literal2,
  Literal2,
  LogicalExpression,
  MemberExpression,
  MetaProperty,
  MethodDefinition,
  NewExpression,
  ObjectExpression,
  ObjectPattern,
  PrivateIdentifier,
  Program2,
  Property2,
  PropertyDefinition,
  RestElement,
  ReturnStatement2,
  SequenceExpression,
  SpreadElement,
  StaticBlock,
  Super,
  SwitchCase,
  SwitchStatement,
  TaggedTemplateExpression,
  TemplateElement,
  TemplateLiteral2,
  ThisExpression,
  ThrowStatement,
  TryStatement,
  UnaryExpression,
  UpdateExpression,
  VariableDeclaration,
  VariableDeclarator,
  WhileStatement,
  YieldExpression
];
var bufferParsers = [
  function panicError(node, position, buffer, readString) {
    node.message = convertString(position, buffer, readString);
  },
  function parseError(node, position, buffer, readString) {
    node.message = convertString(position, buffer, readString);
  },
  function arrayExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.elements = convertNodeList(node, scope, position, buffer, readString);
  },
  function arrayPattern(node, position, buffer, readString) {
    const { scope } = node;
    node.elements = convertNodeList(node, scope, position, buffer, readString);
  },
  function arrowFunctionExpression(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.async = (flags & 1) === 1;
    node.expression = (flags & 2) === 2;
    node.generator = (flags & 4) === 4;
    const parameters = node.params = convertNodeList(node, scope, buffer[position + 1], buffer, readString);
    scope.addParameterVariables(parameters.map((parameter) => parameter.declare("parameter", UNKNOWN_EXPRESSION)), parameters[parameters.length - 1] instanceof RestElement);
    node.body = convertNode2(node, scope.bodyScope, buffer[position + 2], buffer, readString);
    const annotations = node.annotations = convertAnnotations(position + 3, buffer);
    node.annotationNoSideEffects = annotations.some((comment) => comment.type === "noSideEffects");
  },
  function assignmentExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.operator = FIXED_STRINGS[buffer[position]];
    node.right = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.left = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function assignmentPattern(node, position, buffer, readString) {
    const { scope } = node;
    node.right = convertNode2(node, scope, buffer[position], buffer, readString);
    node.left = convertNode2(node, scope, position + 1, buffer, readString);
  },
  function awaitExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.argument = convertNode2(node, scope, position, buffer, readString);
  },
  function binaryExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.operator = FIXED_STRINGS[buffer[position]];
    node.right = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.left = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function blockStatement(node, position, buffer, readString) {
    const { scope } = node;
    node.body = convertNodeList(node, scope, position, buffer, readString);
  },
  function breakStatement(node, position, buffer, readString) {
    const { scope } = node;
    const labelPosition = buffer[position];
    node.label = labelPosition === 0 ? null : convertNode2(node, scope, labelPosition, buffer, readString);
  },
  function callExpression(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.optional = (flags & 1) === 1;
    node.callee = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.arguments = convertNodeList(node, scope, buffer[position + 2], buffer, readString);
    node.annotations = convertAnnotations(position + 3, buffer);
  },
  function catchClause(node, position, buffer, readString) {
    const { scope } = node;
    const parameterPosition = buffer[position];
    const parameter = node.param = parameterPosition === 0 ? null : convertNode2(node, scope, parameterPosition, buffer, readString);
    parameter?.declare("parameter", UNKNOWN_EXPRESSION);
    node.body = convertNode2(node, scope.bodyScope, buffer[position + 1], buffer, readString);
  },
  function chainExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.expression = convertNode2(node, scope, position, buffer, readString);
  },
  function classBody(node, position, buffer, readString) {
    const { scope } = node;
    const length = buffer[position];
    const body = node.body = [];
    for (let index = 0; index < length; index++) {
      const nodePosition = buffer[position + 1 + index];
      body.push(convertNode2(node, (buffer[nodePosition + 3] & 1) === 0 ? scope.instanceScope : scope, nodePosition, buffer, readString));
    }
  },
  function classDeclaration(node, position, buffer, readString) {
    const { scope } = node;
    const idPosition = buffer[position];
    node.id = idPosition === 0 ? null : convertNode2(node, scope.parent, idPosition, buffer, readString);
    const superClassPosition = buffer[position + 1];
    node.superClass = superClassPosition === 0 ? null : convertNode2(node, scope, superClassPosition, buffer, readString);
    node.body = convertNode2(node, scope, buffer[position + 2], buffer, readString);
  },
  function classExpression(node, position, buffer, readString) {
    const { scope } = node;
    const idPosition = buffer[position];
    node.id = idPosition === 0 ? null : convertNode2(node, scope, idPosition, buffer, readString);
    const superClassPosition = buffer[position + 1];
    node.superClass = superClassPosition === 0 ? null : convertNode2(node, scope, superClassPosition, buffer, readString);
    node.body = convertNode2(node, scope, buffer[position + 2], buffer, readString);
  },
  function conditionalExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.consequent = convertNode2(node, scope, buffer[position], buffer, readString);
    node.alternate = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.test = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function continueStatement(node, position, buffer, readString) {
    const { scope } = node;
    const labelPosition = buffer[position];
    node.label = labelPosition === 0 ? null : convertNode2(node, scope, labelPosition, buffer, readString);
  },
  function debuggerStatement() {
  },
  function directive(node, position, buffer, readString) {
    const { scope } = node;
    node.expression = convertNode2(node, scope, buffer[position], buffer, readString);
    node.directive = convertString(position + 1, buffer, readString);
  },
  function doWhileStatement(node, position, buffer, readString) {
    const { scope } = node;
    node.test = convertNode2(node, scope, buffer[position], buffer, readString);
    node.body = convertNode2(node, scope, position + 1, buffer, readString);
  },
  function emptyStatement() {
  },
  function exportAllDeclaration(node, position, buffer, readString) {
    const { scope } = node;
    const exportedPosition = buffer[position];
    node.exported = exportedPosition === 0 ? null : convertNode2(node, scope, exportedPosition, buffer, readString);
    node.source = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.attributes = convertNodeList(node, scope, buffer[position + 2], buffer, readString);
  },
  function exportDefaultDeclaration(node, position, buffer, readString) {
    const { scope } = node;
    node.declaration = convertNode2(node, scope, position, buffer, readString);
  },
  function exportNamedDeclaration(node, position, buffer, readString) {
    const { scope } = node;
    const sourcePosition = buffer[position];
    node.source = sourcePosition === 0 ? null : convertNode2(node, scope, sourcePosition, buffer, readString);
    node.attributes = convertNodeList(node, scope, buffer[position + 1], buffer, readString);
    const declarationPosition = buffer[position + 2];
    node.declaration = declarationPosition === 0 ? null : convertNode2(node, scope, declarationPosition, buffer, readString);
    node.specifiers = convertNodeList(node, scope, position + 3, buffer, readString);
  },
  function exportSpecifier(node, position, buffer, readString) {
    const { scope } = node;
    const exportedPosition = buffer[position];
    node.local = convertNode2(node, scope, position + 1, buffer, readString);
    node.exported = exportedPosition === 0 ? node.local : convertNode2(node, scope, exportedPosition, buffer, readString);
  },
  function expressionStatement(node, position, buffer, readString) {
    const { scope } = node;
    node.expression = convertNode2(node, scope, position, buffer, readString);
  },
  function forInStatement(node, position, buffer, readString) {
    const { scope } = node;
    node.right = convertNode2(node, scope, buffer[position], buffer, readString);
    node.body = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.left = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function forOfStatement(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.await = (flags & 1) === 1;
    node.right = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.body = convertNode2(node, scope, buffer[position + 2], buffer, readString);
    node.left = convertNode2(node, scope, position + 3, buffer, readString);
  },
  function forStatement(node, position, buffer, readString) {
    const { scope } = node;
    const initPosition = buffer[position];
    node.init = initPosition === 0 ? null : convertNode2(node, scope, initPosition, buffer, readString);
    const testPosition = buffer[position + 1];
    node.test = testPosition === 0 ? null : convertNode2(node, scope, testPosition, buffer, readString);
    const updatePosition = buffer[position + 2];
    node.update = updatePosition === 0 ? null : convertNode2(node, scope, updatePosition, buffer, readString);
    node.body = convertNode2(node, scope, buffer[position + 3], buffer, readString);
  },
  function functionDeclaration(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.async = (flags & 1) === 1;
    node.generator = (flags & 2) === 2;
    const idPosition = buffer[position + 1];
    node.id = idPosition === 0 ? null : convertNode2(node, scope.parent, idPosition, buffer, readString);
    const parameters = node.params = convertNodeList(node, scope, buffer[position + 2], buffer, readString);
    scope.addParameterVariables(parameters.map((parameter) => parameter.declare("parameter", UNKNOWN_EXPRESSION)), parameters[parameters.length - 1] instanceof RestElement);
    node.body = convertNode2(node, scope.bodyScope, buffer[position + 3], buffer, readString);
    const annotations = node.annotations = convertAnnotations(position + 4, buffer);
    node.annotationNoSideEffects = annotations.some((comment) => comment.type === "noSideEffects");
  },
  function functionExpression(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.async = (flags & 1) === 1;
    node.generator = (flags & 2) === 2;
    const idPosition = buffer[position + 1];
    node.id = idPosition === 0 ? null : convertNode2(node, node.idScope, idPosition, buffer, readString);
    const parameters = node.params = convertNodeList(node, scope, buffer[position + 2], buffer, readString);
    scope.addParameterVariables(parameters.map((parameter) => parameter.declare("parameter", UNKNOWN_EXPRESSION)), parameters[parameters.length - 1] instanceof RestElement);
    node.body = convertNode2(node, scope.bodyScope, buffer[position + 3], buffer, readString);
    const annotations = node.annotations = convertAnnotations(position + 4, buffer);
    node.annotationNoSideEffects = annotations.some((comment) => comment.type === "noSideEffects");
  },
  function identifier(node, position, buffer, readString) {
    node.name = convertString(position, buffer, readString);
  },
  function ifStatement(node, position, buffer, readString) {
    const { scope } = node;
    node.consequent = convertNode2(node, node.consequentScope = new TrackingScope(scope), buffer[position], buffer, readString);
    const alternatePosition = buffer[position + 1];
    node.alternate = alternatePosition === 0 ? null : convertNode2(node, node.alternateScope = new TrackingScope(scope), alternatePosition, buffer, readString);
    node.test = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function importAttribute(node, position, buffer, readString) {
    const { scope } = node;
    node.value = convertNode2(node, scope, buffer[position], buffer, readString);
    node.key = convertNode2(node, scope, position + 1, buffer, readString);
  },
  function importDeclaration(node, position, buffer, readString) {
    const { scope } = node;
    node.source = convertNode2(node, scope, buffer[position], buffer, readString);
    node.attributes = convertNodeList(node, scope, buffer[position + 1], buffer, readString);
    node.specifiers = convertNodeList(node, scope, position + 2, buffer, readString);
  },
  function importDefaultSpecifier(node, position, buffer, readString) {
    const { scope } = node;
    node.local = convertNode2(node, scope, position, buffer, readString);
  },
  function importExpression(node, position, buffer, readString) {
    const { scope } = node;
    const optionsPosition = buffer[position];
    node.options = optionsPosition === 0 ? null : convertNode2(node, scope, optionsPosition, buffer, readString);
    node.source = convertNode2(node, scope, position + 1, buffer, readString);
    node.sourceAstNode = convertNode(position + 1, buffer, readString);
  },
  function importNamespaceSpecifier(node, position, buffer, readString) {
    const { scope } = node;
    node.local = convertNode2(node, scope, position, buffer, readString);
  },
  function importSpecifier(node, position, buffer, readString) {
    const { scope } = node;
    const importedPosition = buffer[position];
    node.local = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.imported = importedPosition === 0 ? node.local : convertNode2(node, scope, importedPosition, buffer, readString);
  },
  function labeledStatement(node, position, buffer, readString) {
    const { scope } = node;
    node.body = convertNode2(node, scope, buffer[position], buffer, readString);
    node.label = convertNode2(node, scope, position + 1, buffer, readString);
  },
  function literalBigInt(node, position, buffer, readString) {
    node.raw = convertString(buffer[position], buffer, readString);
    const bigint = node.bigint = convertString(position + 1, buffer, readString);
    node.value = BigInt(bigint);
  },
  function literalBoolean(node, position, buffer) {
    const flags = buffer[position];
    const value = node.value = (flags & 1) === 1;
    node.raw = value ? "true" : "false";
  },
  function literalNull(node) {
    node.value = null;
  },
  function literalNumber(node, position, buffer, readString) {
    const rawPosition = buffer[position];
    node.raw = rawPosition === 0 ? void 0 : convertString(rawPosition, buffer, readString);
    node.value = new DataView(buffer.buffer).getFloat64(position + 1 << 2, true);
  },
  function literalRegExp(node, position, buffer, readString) {
    const pattern = convertString(buffer[position], buffer, readString);
    const flags = convertString(position + 1, buffer, readString);
    node.raw = `/${pattern}/${flags}`;
    node.regex = { flags, pattern };
    node.value = new RegExp(pattern, flags);
  },
  function literalString(node, position, buffer, readString) {
    const rawPosition = buffer[position];
    node.raw = rawPosition === 0 ? void 0 : convertString(rawPosition, buffer, readString);
    node.value = convertString(position + 1, buffer, readString);
  },
  function logicalExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.operator = FIXED_STRINGS[buffer[position]];
    node.right = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.left = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function memberExpression(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.computed = (flags & 1) === 1;
    node.optional = (flags & 2) === 2;
    node.property = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.object = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function metaProperty(node, position, buffer, readString) {
    const { scope } = node;
    node.property = convertNode2(node, scope, buffer[position], buffer, readString);
    node.meta = convertNode2(node, scope, position + 1, buffer, readString);
  },
  function methodDefinition(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.static = (flags & 1) === 1;
    node.computed = (flags & 2) === 2;
    node.value = convertNode2(node, scope, buffer[position + 1], buffer, readString);
    node.kind = FIXED_STRINGS[buffer[position + 2]];
    node.key = convertNode2(node, scope, position + 3, buffer, readString);
  },
  function newExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.callee = convertNode2(node, scope, buffer[position], buffer, readString);
    node.arguments = convertNodeList(node, scope, buffer[position + 1], buffer, readString);
    node.annotations = convertAnnotations(position + 2, buffer);
  },
  function objectExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.properties = convertNodeList(node, scope, position, buffer, readString);
  },
  function objectPattern(node, position, buffer, readString) {
    const { scope } = node;
    node.properties = convertNodeList(node, scope, position, buffer, readString);
  },
  function privateIdentifier(node, position, buffer, readString) {
    node.name = convertString(position, buffer, readString);
  },
  function program(node, position, buffer, readString) {
    const { scope } = node;
    node.invalidAnnotations = convertAnnotations(buffer[position], buffer);
    node.body = convertNodeList(node, scope, position + 1, buffer, readString);
  },
  function property(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.method = (flags & 1) === 1;
    node.shorthand = (flags & 2) === 2;
    node.computed = (flags & 4) === 4;
    const keyPosition = buffer[position + 1];
    node.value = convertNode2(node, scope, buffer[position + 2], buffer, readString);
    node.kind = FIXED_STRINGS[buffer[position + 3]];
    node.key = keyPosition === 0 ? node.value : convertNode2(node, scope, keyPosition, buffer, readString);
  },
  function propertyDefinition(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.static = (flags & 1) === 1;
    node.computed = (flags & 2) === 2;
    const valuePosition = buffer[position + 1];
    node.value = valuePosition === 0 ? null : convertNode2(node, scope, valuePosition, buffer, readString);
    node.key = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function restElement(node, position, buffer, readString) {
    const { scope } = node;
    node.argument = convertNode2(node, scope, position, buffer, readString);
  },
  function returnStatement(node, position, buffer, readString) {
    const { scope } = node;
    const argumentPosition = buffer[position];
    node.argument = argumentPosition === 0 ? null : convertNode2(node, scope, argumentPosition, buffer, readString);
  },
  function sequenceExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.expressions = convertNodeList(node, scope, position, buffer, readString);
  },
  function spreadElement(node, position, buffer, readString) {
    const { scope } = node;
    node.argument = convertNode2(node, scope, position, buffer, readString);
  },
  function staticBlock(node, position, buffer, readString) {
    const { scope } = node;
    node.body = convertNodeList(node, scope, position, buffer, readString);
  },
  function superElement() {
  },
  function switchCase(node, position, buffer, readString) {
    const { scope } = node;
    const testPosition = buffer[position];
    node.test = testPosition === 0 ? null : convertNode2(node, scope, testPosition, buffer, readString);
    node.consequent = convertNodeList(node, scope, buffer[position + 1], buffer, readString);
  },
  function switchStatement(node, position, buffer, readString) {
    const { scope } = node;
    node.cases = convertNodeList(node, scope, buffer[position], buffer, readString);
    node.discriminant = convertNode2(node, node.parentScope, position + 1, buffer, readString);
  },
  function taggedTemplateExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.quasi = convertNode2(node, scope, buffer[position], buffer, readString);
    node.tag = convertNode2(node, scope, position + 1, buffer, readString);
  },
  function templateElement(node, position, buffer, readString) {
    const flags = buffer[position];
    node.tail = (flags & 1) === 1;
    const cookedPosition = buffer[position + 1];
    const cooked = cookedPosition === 0 ? void 0 : convertString(cookedPosition, buffer, readString);
    const raw = convertString(position + 2, buffer, readString);
    node.value = { cooked, raw };
  },
  function templateLiteral(node, position, buffer, readString) {
    const { scope } = node;
    node.expressions = convertNodeList(node, scope, buffer[position], buffer, readString);
    node.quasis = convertNodeList(node, scope, position + 1, buffer, readString);
  },
  function thisExpression() {
  },
  function throwStatement(node, position, buffer, readString) {
    const { scope } = node;
    node.argument = convertNode2(node, scope, position, buffer, readString);
  },
  function tryStatement(node, position, buffer, readString) {
    const { scope } = node;
    const handlerPosition = buffer[position];
    node.handler = handlerPosition === 0 ? null : convertNode2(node, scope, handlerPosition, buffer, readString);
    const finalizerPosition = buffer[position + 1];
    node.finalizer = finalizerPosition === 0 ? null : convertNode2(node, scope, finalizerPosition, buffer, readString);
    node.block = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function unaryExpression(node, position, buffer, readString) {
    const { scope } = node;
    node.operator = FIXED_STRINGS[buffer[position]];
    node.argument = convertNode2(node, scope, position + 1, buffer, readString);
  },
  function updateExpression(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.prefix = (flags & 1) === 1;
    node.operator = FIXED_STRINGS[buffer[position + 1]];
    node.argument = convertNode2(node, scope, position + 2, buffer, readString);
  },
  function variableDeclaration(node, position, buffer, readString) {
    const { scope } = node;
    node.kind = FIXED_STRINGS[buffer[position]];
    node.declarations = convertNodeList(node, scope, position + 1, buffer, readString);
  },
  function variableDeclarator(node, position, buffer, readString) {
    const { scope } = node;
    const initPosition = buffer[position];
    node.init = initPosition === 0 ? null : convertNode2(node, scope, initPosition, buffer, readString);
    node.id = convertNode2(node, scope, position + 1, buffer, readString);
  },
  function whileStatement(node, position, buffer, readString) {
    const { scope } = node;
    node.body = convertNode2(node, scope, buffer[position], buffer, readString);
    node.test = convertNode2(node, scope, position + 1, buffer, readString);
  },
  function yieldExpression(node, position, buffer, readString) {
    const { scope } = node;
    const flags = buffer[position];
    node.delegate = (flags & 1) === 1;
    const argumentPosition = buffer[position + 1];
    node.argument = argumentPosition === 0 ? null : convertNode2(node, scope, argumentPosition, buffer, readString);
  }
];
function convertNode2(parent, parentScope, position, buffer, readString) {
  const nodeType = buffer[position];
  const NodeConstructor = nodeConstructors$1[nodeType];
  if (!NodeConstructor) {
    console.trace();
    throw new Error(`Unknown node type: ${nodeType}`);
  }
  const node = new NodeConstructor(parent, parentScope);
  node.type = nodeTypeStrings[nodeType];
  node.start = buffer[position + 1];
  node.end = buffer[position + 2];
  bufferParsers[nodeType](node, position + 3, buffer, readString);
  node.initialise();
  return node;
}
function convertNodeList(parent, parentScope, position, buffer, readString) {
  const length = buffer[position++];
  const list = [];
  for (let index = 0; index < length; index++) {
    const nodePosition = buffer[position++];
    list.push(nodePosition ? convertNode2(parent, parentScope, nodePosition, buffer, readString) : null);
  }
  return list;
}
var UnknownNode = class extends NodeBase {
  hasEffects() {
    return true;
  }
  include(context) {
    super.include(context, true);
  }
};
var nodeConstructors = {
  ArrayExpression,
  ArrayPattern,
  ArrowFunctionExpression: ArrowFunctionExpression2,
  AssignmentExpression,
  AssignmentPattern,
  AwaitExpression,
  BinaryExpression,
  BlockStatement: BlockStatement2,
  BreakStatement,
  CallExpression: CallExpression2,
  CatchClause: CatchClause2,
  ChainExpression,
  ClassBody,
  ClassDeclaration,
  ClassExpression,
  ConditionalExpression,
  ContinueStatement,
  DoWhileStatement,
  EmptyStatement,
  ExportAllDeclaration,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  ExpressionStatement: ExpressionStatement2,
  ForInStatement,
  ForOfStatement,
  ForStatement,
  FunctionDeclaration,
  FunctionExpression,
  Identifier: Identifier2,
  IfStatement,
  ImportAttribute,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportExpression,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  LabeledStatement,
  Literal: Literal2,
  LogicalExpression,
  MemberExpression,
  MetaProperty,
  MethodDefinition,
  NewExpression,
  ObjectExpression,
  ObjectPattern,
  PanicError,
  ParseError,
  PrivateIdentifier,
  Program: Program2,
  Property: Property2,
  PropertyDefinition,
  RestElement,
  ReturnStatement: ReturnStatement2,
  SequenceExpression,
  SpreadElement,
  StaticBlock,
  Super,
  SwitchCase,
  SwitchStatement,
  TaggedTemplateExpression,
  TemplateElement,
  TemplateLiteral: TemplateLiteral2,
  ThisExpression,
  ThrowStatement,
  TryStatement,
  UnaryExpression,
  UnknownNode,
  UpdateExpression,
  VariableDeclaration,
  VariableDeclarator,
  WhileStatement,
  YieldExpression
};
var MISSING_EXPORT_SHIM_VARIABLE = "_missingExportShim";
var ExportShimVariable = class extends Variable {
  constructor(module) {
    super(MISSING_EXPORT_SHIM_VARIABLE);
    this.module = module;
  }
  include() {
    super.include();
    this.module.needsExportShim = true;
  }
};
var NamespaceVariable = class extends Variable {
  constructor(context) {
    super(context.getModuleName());
    this.memberVariables = null;
    this.mergedNamespaces = [];
    this.referencedEarly = false;
    this.references = [];
    this.context = context;
    this.module = context.module;
  }
  addReference(identifier2) {
    this.references.push(identifier2);
    this.name = identifier2.name;
  }
  deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
    if (path2.length > 1 || path2.length === 1 && interaction.type === INTERACTION_CALLED) {
      const key = path2[0];
      if (typeof key === "string") {
        this.getMemberVariables()[key]?.deoptimizeArgumentsOnInteractionAtPath(interaction, path2.slice(1), recursionTracker);
      } else {
        deoptimizeInteraction(interaction);
      }
    }
  }
  deoptimizePath(path2) {
    if (path2.length > 1) {
      const key = path2[0];
      if (typeof key === "string") {
        this.getMemberVariables()[key]?.deoptimizePath(path2.slice(1));
      }
    }
  }
  getLiteralValueAtPath(path2) {
    if (path2[0] === SymbolToStringTag) {
      return "Module";
    }
    return UnknownValue;
  }
  getMemberVariables() {
    if (this.memberVariables) {
      return this.memberVariables;
    }
    const memberVariables = /* @__PURE__ */ Object.create(null);
    const sortedExports = [...this.context.getExports(), ...this.context.getReexports()].sort();
    for (const name of sortedExports) {
      if (name[0] !== "*" && name !== this.module.info.syntheticNamedExports) {
        const exportedVariable = this.context.traceExport(name);
        if (exportedVariable) {
          memberVariables[name] = exportedVariable;
        }
      }
    }
    return this.memberVariables = memberVariables;
  }
  hasEffectsOnInteractionAtPath(path2, interaction, context) {
    const { type } = interaction;
    if (path2.length === 0) {
      return true;
    }
    if (path2.length === 1 && type !== INTERACTION_CALLED) {
      return type === INTERACTION_ASSIGNED;
    }
    const key = path2[0];
    if (typeof key !== "string") {
      return true;
    }
    const memberVariable = this.getMemberVariables()[key];
    return !memberVariable || memberVariable.hasEffectsOnInteractionAtPath(path2.slice(1), interaction, context);
  }
  include() {
    super.include();
    this.context.includeAllExports();
  }
  prepare(accessedGlobalsByScope) {
    if (this.mergedNamespaces.length > 0) {
      this.module.scope.addAccessedGlobals([MERGE_NAMESPACES_VARIABLE], accessedGlobalsByScope);
    }
  }
  renderBlock(options) {
    const { exportNamesByVariable, format, freeze, indent: t, symbols, snippets: { _, cnst, getObject, getPropertyAccess, n: n2, s } } = options;
    const memberVariables = this.getMemberVariables();
    const members = Object.entries(memberVariables).filter(([_2, variable]) => variable.included).map(([name2, variable]) => {
      if (this.referencedEarly || variable.isReassigned || variable === this) {
        return [
          null,
          `get ${stringifyObjectKeyIfNeeded(name2)}${_}()${_}{${_}return ${variable.getName(getPropertyAccess)}${s}${_}}`
        ];
      }
      return [name2, variable.getName(getPropertyAccess)];
    });
    members.unshift([null, `__proto__:${_}null`]);
    let output = getObject(members, { lineBreakIndent: { base: "", t } });
    if (this.mergedNamespaces.length > 0) {
      const assignmentArguments = this.mergedNamespaces.map((variable) => variable.getName(getPropertyAccess));
      output = `/*#__PURE__*/${MERGE_NAMESPACES_VARIABLE}(${output},${_}[${assignmentArguments.join(`,${_}`)}])`;
    } else {
      if (symbols) {
        output = `/*#__PURE__*/Object.defineProperty(${output},${_}Symbol.toStringTag,${_}${getToStringTagValue(getObject)})`;
      }
      if (freeze) {
        output = `/*#__PURE__*/Object.freeze(${output})`;
      }
    }
    const name = this.getName(getPropertyAccess);
    output = `${cnst} ${name}${_}=${_}${output};`;
    if (format === "system" && exportNamesByVariable.has(this)) {
      output += `${n2}${getSystemExportStatement([this], options)};`;
    }
    return output;
  }
  renderFirst() {
    return this.referencedEarly;
  }
  setMergedNamespaces(mergedNamespaces) {
    this.mergedNamespaces = mergedNamespaces;
    const moduleExecIndex = this.context.getModuleExecIndex();
    for (const identifier2 of this.references) {
      const { context } = identifier2.scope;
      if (context.getModuleExecIndex() <= moduleExecIndex) {
        this.referencedEarly = true;
        break;
      }
    }
  }
};
NamespaceVariable.prototype.isNamespace = true;
var SyntheticNamedExportVariable = class _SyntheticNamedExportVariable extends Variable {
  constructor(context, name, syntheticNamespace) {
    super(name);
    this.baseVariable = null;
    this.context = context;
    this.module = context.module;
    this.syntheticNamespace = syntheticNamespace;
  }
  getBaseVariable() {
    if (this.baseVariable)
      return this.baseVariable;
    let baseVariable = this.syntheticNamespace;
    while (baseVariable instanceof ExportDefaultVariable || baseVariable instanceof _SyntheticNamedExportVariable) {
      if (baseVariable instanceof ExportDefaultVariable) {
        const original = baseVariable.getOriginalVariable();
        if (original === baseVariable)
          break;
        baseVariable = original;
      }
      if (baseVariable instanceof _SyntheticNamedExportVariable) {
        baseVariable = baseVariable.syntheticNamespace;
      }
    }
    return this.baseVariable = baseVariable;
  }
  getBaseVariableName() {
    return this.syntheticNamespace.getBaseVariableName();
  }
  getName(getPropertyAccess) {
    return `${this.syntheticNamespace.getName(getPropertyAccess)}${getPropertyAccess(this.name)}`;
  }
  include() {
    super.include();
    this.context.includeVariableInModule(this.syntheticNamespace);
  }
  setRenderNames(baseName, name) {
    super.setRenderNames(baseName, name);
  }
};
var BuildPhase;
(function(BuildPhase2) {
  BuildPhase2[BuildPhase2["LOAD_AND_PARSE"] = 0] = "LOAD_AND_PARSE";
  BuildPhase2[BuildPhase2["ANALYSE"] = 1] = "ANALYSE";
  BuildPhase2[BuildPhase2["GENERATE"] = 2] = "GENERATE";
})(BuildPhase || (BuildPhase = {}));
var sourceMapCache = /* @__PURE__ */ new WeakMap();
function resetCacheToEncoded(cache) {
  if (cache.encodedMappings === void 0 && cache.decodedMappings) {
    cache.encodedMappings = encode(cache.decodedMappings);
  }
  cache.decodedMappings = void 0;
}
function resetSourcemapCache(map, sourcemapChain) {
  if (map) {
    const cache = sourceMapCache.get(map);
    if (cache) {
      resetCacheToEncoded(cache);
    }
  }
  if (!sourcemapChain) {
    return;
  }
  for (const map2 of sourcemapChain) {
    if (map2.missing)
      continue;
    resetSourcemapCache(map2);
  }
}
function decodedSourcemap(map) {
  if (!map)
    return null;
  if (typeof map === "string") {
    map = JSON.parse(map);
  }
  if (!map.mappings) {
    return {
      mappings: [],
      names: [],
      sources: [],
      version: 3
    };
  }
  const originalMappings = map.mappings;
  const isAlreadyDecoded = Array.isArray(originalMappings);
  const cache = {
    decodedMappings: isAlreadyDecoded ? originalMappings : void 0,
    encodedMappings: isAlreadyDecoded ? void 0 : originalMappings
  };
  const decodedMap = {
    ...map,
    // By moving mappings behind an accessor, we can avoid unneeded computation for cases
    // where the mappings field is never actually accessed. This appears to greatly reduce
    // the overhead of sourcemap decoding in terms of both compute time and memory usage.
    get mappings() {
      if (cache.decodedMappings) {
        return cache.decodedMappings;
      }
      cache.decodedMappings = cache.encodedMappings ? decode(cache.encodedMappings) : [];
      cache.encodedMappings = void 0;
      return cache.decodedMappings;
    }
  };
  sourceMapCache.set(decodedMap, cache);
  return decodedMap;
}
function getId(m) {
  return m.id;
}
function getOriginalLocation(sourcemapChain, location) {
  const filteredSourcemapChain = sourcemapChain.filter((sourcemap) => !sourcemap.missing);
  traceSourcemap:
    while (filteredSourcemapChain.length > 0) {
      const sourcemap = filteredSourcemapChain.pop();
      const line = sourcemap.mappings[location.line - 1];
      if (line) {
        const filteredLine = line.filter((segment) => segment.length > 1);
        const lastSegment = filteredLine[filteredLine.length - 1];
        for (const segment of filteredLine) {
          if (segment[0] >= location.column || segment === lastSegment) {
            location = {
              column: segment[3],
              line: segment[2] + 1
            };
            continue traceSourcemap;
          }
        }
      }
      throw new Error("Can't resolve original location of error.");
    }
  return location;
}
var ATTRIBUTE_KEYWORDS = /* @__PURE__ */ new Set(["assert", "with"]);
function getAttributesFromImportExpression(node) {
  const { scope: { context }, options, start } = node;
  if (!(options instanceof ObjectExpression)) {
    if (options) {
      context.module.log(LOGLEVEL_WARN, logImportAttributeIsInvalid(context.module.id), start);
    }
    return EMPTY_OBJECT;
  }
  const assertProperty = options.properties.find((property2) => ATTRIBUTE_KEYWORDS.has(getPropertyKey(property2)))?.value;
  if (!assertProperty) {
    return EMPTY_OBJECT;
  }
  if (!(assertProperty instanceof ObjectExpression)) {
    context.module.log(LOGLEVEL_WARN, logImportOptionsAreInvalid(context.module.id), start);
    return EMPTY_OBJECT;
  }
  const assertFields = assertProperty.properties.map((property2) => {
    const key = getPropertyKey(property2);
    if (typeof key === "string" && typeof property2.value.value === "string") {
      return [key, property2.value.value];
    }
    context.module.log(LOGLEVEL_WARN, logImportAttributeIsInvalid(context.module.id), property2.start);
    return null;
  }).filter((property2) => !!property2);
  if (assertFields.length > 0) {
    return Object.fromEntries(assertFields);
  }
  return EMPTY_OBJECT;
}
var getPropertyKey = (property2) => {
  const key = property2.key;
  return key && !property2.computed && (key.name || key.value);
};
function getAttributesFromImportExportDeclaration(attributes) {
  return attributes?.length ? Object.fromEntries(attributes.map((assertion) => [getPropertyKey(assertion), assertion.value.value])) : EMPTY_OBJECT;
}
function doAttributesDiffer(assertionA, assertionB) {
  const keysA = Object.keys(assertionA);
  return keysA.length !== Object.keys(assertionB).length || keysA.some((key) => assertionA[key] !== assertionB[key]);
}
var timers = /* @__PURE__ */ new Map();
function getPersistedLabel(label, level) {
  switch (level) {
    case 1: {
      return `# ${label}`;
    }
    case 2: {
      return `## ${label}`;
    }
    case 3: {
      return label;
    }
    default: {
      return `${"  ".repeat(level - 4)}- ${label}`;
    }
  }
}
function timeStartImpl(label, level = 3) {
  label = getPersistedLabel(label, level);
  const startMemory = process$1.memoryUsage().heapUsed;
  const startTime = performance.now();
  const timer = timers.get(label);
  if (timer === void 0) {
    timers.set(label, {
      memory: 0,
      startMemory,
      startTime,
      time: 0,
      totalMemory: 0
    });
  } else {
    timer.startMemory = startMemory;
    timer.startTime = startTime;
  }
}
function timeEndImpl(label, level = 3) {
  label = getPersistedLabel(label, level);
  const timer = timers.get(label);
  if (timer !== void 0) {
    const currentMemory = process$1.memoryUsage().heapUsed;
    timer.memory += currentMemory - timer.startMemory;
    timer.time += performance.now() - timer.startTime;
    timer.totalMemory = Math.max(timer.totalMemory, currentMemory);
  }
}
function getTimings() {
  const newTimings = {};
  for (const [label, { memory, time, totalMemory }] of timers) {
    newTimings[label] = [time, memory, totalMemory];
  }
  return newTimings;
}
var timeStart = doNothing;
var timeEnd = doNothing;
var TIMED_PLUGIN_HOOKS = [
  "augmentChunkHash",
  "buildEnd",
  "buildStart",
  "generateBundle",
  "load",
  "moduleParsed",
  "options",
  "outputOptions",
  "renderChunk",
  "renderDynamicImport",
  "renderStart",
  "resolveDynamicImport",
  "resolveFileUrl",
  "resolveId",
  "resolveImportMeta",
  "shouldTransformCachedModule",
  "transform",
  "writeBundle"
];
function getPluginWithTimers(plugin, index) {
  if (plugin._hasTimer)
    return plugin;
  plugin._hasTimer = true;
  for (const hook of TIMED_PLUGIN_HOOKS) {
    if (hook in plugin) {
      let timerLabel = `plugin ${index}`;
      if (plugin.name) {
        timerLabel += ` (${plugin.name})`;
      }
      timerLabel += ` - ${hook}`;
      const handler = function(...parameters) {
        timeStart(timerLabel, 4);
        const result = hookFunction.apply(this, parameters);
        timeEnd(timerLabel, 4);
        return result;
      };
      let hookFunction;
      if (typeof plugin[hook].handler === "function") {
        hookFunction = plugin[hook].handler;
        plugin[hook].handler = handler;
      } else {
        hookFunction = plugin[hook];
        plugin[hook] = handler;
      }
    }
  }
  return plugin;
}
function initialiseTimers(inputOptions) {
  if (inputOptions.perf) {
    timers = /* @__PURE__ */ new Map();
    timeStart = timeStartImpl;
    timeEnd = timeEndImpl;
    inputOptions.plugins = inputOptions.plugins.map(getPluginWithTimers);
  } else {
    timeStart = doNothing;
    timeEnd = doNothing;
  }
}
function markModuleAndImpureDependenciesAsExecuted(baseModule) {
  baseModule.isExecuted = true;
  const modules = [baseModule];
  const visitedModules = /* @__PURE__ */ new Set();
  for (const module of modules) {
    for (const dependency of [...module.dependencies, ...module.implicitlyLoadedBefore]) {
      if (!(dependency instanceof ExternalModule) && !dependency.isExecuted && (dependency.info.moduleSideEffects || module.implicitlyLoadedBefore.has(dependency)) && !visitedModules.has(dependency.id)) {
        dependency.isExecuted = true;
        visitedModules.add(dependency.id);
        modules.push(dependency);
      }
    }
  }
}
var MISSING_EXPORT_SHIM_DESCRIPTION = {
  identifier: null,
  localName: MISSING_EXPORT_SHIM_VARIABLE
};
function getVariableForExportNameRecursive(target, name, importerForSideEffects, isExportAllSearch, searchedNamesAndModules = /* @__PURE__ */ new Map()) {
  const searchedModules = searchedNamesAndModules.get(name);
  if (searchedModules) {
    if (searchedModules.has(target)) {
      return isExportAllSearch ? [null] : error(logCircularReexport(name, target.id));
    }
    searchedModules.add(target);
  } else {
    searchedNamesAndModules.set(name, /* @__PURE__ */ new Set([target]));
  }
  return target.getVariableForExportName(name, {
    importerForSideEffects,
    isExportAllSearch,
    searchedNamesAndModules
  });
}
function getAndExtendSideEffectModules(variable, module) {
  const sideEffectModules = getOrCreate(module.sideEffectDependenciesByVariable, variable, getNewSet);
  let currentVariable = variable;
  const referencedVariables = /* @__PURE__ */ new Set([currentVariable]);
  while (true) {
    const importingModule = currentVariable.module;
    currentVariable = currentVariable instanceof ExportDefaultVariable ? currentVariable.getDirectOriginalVariable() : currentVariable instanceof SyntheticNamedExportVariable ? currentVariable.syntheticNamespace : null;
    if (!currentVariable || referencedVariables.has(currentVariable)) {
      break;
    }
    referencedVariables.add(currentVariable);
    sideEffectModules.add(importingModule);
    const originalSideEffects = importingModule.sideEffectDependenciesByVariable.get(currentVariable);
    if (originalSideEffects) {
      for (const module2 of originalSideEffects) {
        sideEffectModules.add(module2);
      }
    }
  }
  return sideEffectModules;
}
var Module = class _Module {
  constructor(graph, id, options, isEntry, moduleSideEffects, syntheticNamedExports, meta, attributes) {
    this.graph = graph;
    this.id = id;
    this.options = options;
    this.alternativeReexportModules = /* @__PURE__ */ new Map();
    this.chunkFileNames = /* @__PURE__ */ new Set();
    this.chunkNames = [];
    this.cycles = /* @__PURE__ */ new Set();
    this.dependencies = /* @__PURE__ */ new Set();
    this.dynamicDependencies = /* @__PURE__ */ new Set();
    this.dynamicImporters = [];
    this.dynamicImports = [];
    this.execIndex = Infinity;
    this.implicitlyLoadedAfter = /* @__PURE__ */ new Set();
    this.implicitlyLoadedBefore = /* @__PURE__ */ new Set();
    this.importDescriptions = /* @__PURE__ */ new Map();
    this.importMetas = [];
    this.importedFromNotTreeshaken = false;
    this.importers = [];
    this.includedDynamicImporters = [];
    this.includedImports = /* @__PURE__ */ new Set();
    this.isExecuted = false;
    this.isUserDefinedEntryPoint = false;
    this.needsExportShim = false;
    this.sideEffectDependenciesByVariable = /* @__PURE__ */ new Map();
    this.sourcesWithAttributes = /* @__PURE__ */ new Map();
    this.allExportNames = null;
    this.ast = null;
    this.exportAllModules = [];
    this.exportAllSources = /* @__PURE__ */ new Set();
    this.exportNamesByVariable = null;
    this.exportShimVariable = new ExportShimVariable(this);
    this.exports = /* @__PURE__ */ new Map();
    this.namespaceReexportsByName = /* @__PURE__ */ new Map();
    this.reexportDescriptions = /* @__PURE__ */ new Map();
    this.relevantDependencies = null;
    this.syntheticExports = /* @__PURE__ */ new Map();
    this.syntheticNamespace = null;
    this.transformDependencies = [];
    this.transitiveReexports = null;
    this.excludeFromSourcemap = /\0/.test(id);
    this.context = options.moduleContext(id);
    this.preserveSignature = this.options.preserveEntrySignatures;
    const module = this;
    const { dynamicImports, dynamicImporters, exportAllSources, exports, implicitlyLoadedAfter, implicitlyLoadedBefore, importers, reexportDescriptions, sourcesWithAttributes } = this;
    this.info = {
      ast: null,
      attributes,
      code: null,
      get dynamicallyImportedIdResolutions() {
        return dynamicImports.map(({ argument }) => typeof argument === "string" && module.resolvedIds[argument]).filter(Boolean);
      },
      get dynamicallyImportedIds() {
        return dynamicImports.map(({ id: id2 }) => id2).filter((id2) => id2 != null);
      },
      get dynamicImporters() {
        return dynamicImporters.sort();
      },
      get exportedBindings() {
        const exportBindings = { ".": [...exports.keys()] };
        for (const [name, { source }] of reexportDescriptions) {
          (exportBindings[source] ??= []).push(name);
        }
        for (const source of exportAllSources) {
          (exportBindings[source] ??= []).push("*");
        }
        return exportBindings;
      },
      get exports() {
        return [
          ...exports.keys(),
          ...reexportDescriptions.keys(),
          ...[...exportAllSources].map(() => "*")
        ];
      },
      get hasDefaultExport() {
        if (!module.ast) {
          return null;
        }
        return module.exports.has("default") || reexportDescriptions.has("default");
      },
      id,
      get implicitlyLoadedAfterOneOf() {
        return Array.from(implicitlyLoadedAfter, getId).sort();
      },
      get implicitlyLoadedBefore() {
        return Array.from(implicitlyLoadedBefore, getId).sort();
      },
      get importedIdResolutions() {
        return Array.from(sourcesWithAttributes.keys(), (source) => module.resolvedIds[source]).filter(Boolean);
      },
      get importedIds() {
        return Array.from(sourcesWithAttributes.keys(), (source) => module.resolvedIds[source]?.id).filter(Boolean);
      },
      get importers() {
        return importers.sort();
      },
      isEntry,
      isExternal: false,
      get isIncluded() {
        if (graph.phase !== BuildPhase.GENERATE) {
          return null;
        }
        return module.isIncluded();
      },
      meta: { ...meta },
      moduleSideEffects,
      syntheticNamedExports
    };
  }
  basename() {
    const base2 = basename(this.id);
    const extension = extname(this.id);
    return makeLegal(extension ? base2.slice(0, -extension.length) : base2);
  }
  bindReferences() {
    this.ast.bind();
  }
  error(properties, pos) {
    pos !== void 0 && this.addLocationToLogProps(properties, pos);
    return error(properties);
  }
  // sum up the length of all ast nodes that are included
  estimateSize() {
    let size = 0;
    for (const node of this.ast.body) {
      if (node.included) {
        size += node.end - node.start;
      }
    }
    return size;
  }
  getAllExportNames() {
    if (this.allExportNames) {
      return this.allExportNames;
    }
    this.allExportNames = /* @__PURE__ */ new Set([...this.exports.keys(), ...this.reexportDescriptions.keys()]);
    for (const module of this.exportAllModules) {
      if (module instanceof ExternalModule) {
        this.allExportNames.add(`*${module.id}`);
        continue;
      }
      for (const name of module.getAllExportNames()) {
        if (name !== "default")
          this.allExportNames.add(name);
      }
    }
    if (typeof this.info.syntheticNamedExports === "string") {
      this.allExportNames.delete(this.info.syntheticNamedExports);
    }
    return this.allExportNames;
  }
  getDependenciesToBeIncluded() {
    if (this.relevantDependencies)
      return this.relevantDependencies;
    this.relevantDependencies = /* @__PURE__ */ new Set();
    const necessaryDependencies = /* @__PURE__ */ new Set();
    const alwaysCheckedDependencies = /* @__PURE__ */ new Set();
    const dependencyVariables = new Set(this.includedImports);
    if (this.info.isEntry || this.includedDynamicImporters.length > 0 || this.namespace.included || this.implicitlyLoadedAfter.size > 0) {
      for (const exportName of [...this.getReexports(), ...this.getExports()]) {
        const [exportedVariable] = this.getVariableForExportName(exportName);
        if (exportedVariable?.included) {
          dependencyVariables.add(exportedVariable);
        }
      }
    }
    for (let variable of dependencyVariables) {
      const sideEffectDependencies = this.sideEffectDependenciesByVariable.get(variable);
      if (sideEffectDependencies) {
        for (const module of sideEffectDependencies) {
          alwaysCheckedDependencies.add(module);
        }
      }
      if (variable instanceof SyntheticNamedExportVariable) {
        variable = variable.getBaseVariable();
      } else if (variable instanceof ExportDefaultVariable) {
        variable = variable.getOriginalVariable();
      }
      necessaryDependencies.add(variable.module);
    }
    if (!this.options.treeshake || this.info.moduleSideEffects === "no-treeshake") {
      for (const dependency of this.dependencies) {
        this.relevantDependencies.add(dependency);
      }
    } else {
      this.addRelevantSideEffectDependencies(this.relevantDependencies, necessaryDependencies, alwaysCheckedDependencies);
    }
    for (const dependency of necessaryDependencies) {
      this.relevantDependencies.add(dependency);
    }
    return this.relevantDependencies;
  }
  getExportNamesByVariable() {
    if (this.exportNamesByVariable) {
      return this.exportNamesByVariable;
    }
    const exportNamesByVariable = /* @__PURE__ */ new Map();
    for (const exportName of this.getAllExportNames()) {
      let [tracedVariable] = this.getVariableForExportName(exportName);
      if (tracedVariable instanceof ExportDefaultVariable) {
        tracedVariable = tracedVariable.getOriginalVariable();
      }
      if (!tracedVariable || !(tracedVariable.included || tracedVariable instanceof ExternalVariable)) {
        continue;
      }
      const existingExportNames = exportNamesByVariable.get(tracedVariable);
      if (existingExportNames) {
        existingExportNames.push(exportName);
      } else {
        exportNamesByVariable.set(tracedVariable, [exportName]);
      }
    }
    return this.exportNamesByVariable = exportNamesByVariable;
  }
  getExports() {
    return [...this.exports.keys()];
  }
  getReexports() {
    if (this.transitiveReexports) {
      return this.transitiveReexports;
    }
    this.transitiveReexports = [];
    const reexports = new Set(this.reexportDescriptions.keys());
    for (const module of this.exportAllModules) {
      if (module instanceof ExternalModule) {
        reexports.add(`*${module.id}`);
      } else {
        for (const name of [...module.getReexports(), ...module.getExports()]) {
          if (name !== "default")
            reexports.add(name);
        }
      }
    }
    return this.transitiveReexports = [...reexports];
  }
  getRenderedExports() {
    const renderedExports = [];
    const removedExports = [];
    for (const exportName of this.exports.keys()) {
      const [variable] = this.getVariableForExportName(exportName);
      (variable?.included ? renderedExports : removedExports).push(exportName);
    }
    return { removedExports, renderedExports };
  }
  getSyntheticNamespace() {
    if (this.syntheticNamespace === null) {
      this.syntheticNamespace = void 0;
      [this.syntheticNamespace] = this.getVariableForExportName(typeof this.info.syntheticNamedExports === "string" ? this.info.syntheticNamedExports : "default", { onlyExplicit: true });
    }
    if (!this.syntheticNamespace) {
      return error(logSyntheticNamedExportsNeedNamespaceExport(this.id, this.info.syntheticNamedExports));
    }
    return this.syntheticNamespace;
  }
  getVariableForExportName(name, { importerForSideEffects, isExportAllSearch, onlyExplicit, searchedNamesAndModules } = EMPTY_OBJECT) {
    if (name[0] === "*") {
      if (name.length === 1) {
        return [this.namespace];
      }
      const module = this.graph.modulesById.get(name.slice(1));
      return module.getVariableForExportName("*");
    }
    const reexportDeclaration = this.reexportDescriptions.get(name);
    if (reexportDeclaration) {
      const [variable] = getVariableForExportNameRecursive(reexportDeclaration.module, reexportDeclaration.localName, importerForSideEffects, false, searchedNamesAndModules);
      if (!variable) {
        return this.error(logMissingExport(reexportDeclaration.localName, this.id, reexportDeclaration.module.id), reexportDeclaration.start);
      }
      if (importerForSideEffects) {
        setAlternativeExporterIfCyclic(variable, importerForSideEffects, this);
        if (this.info.moduleSideEffects) {
          getOrCreate(importerForSideEffects.sideEffectDependenciesByVariable, variable, getNewSet).add(this);
        }
      }
      return [variable];
    }
    const exportDeclaration = this.exports.get(name);
    if (exportDeclaration) {
      if (exportDeclaration === MISSING_EXPORT_SHIM_DESCRIPTION) {
        return [this.exportShimVariable];
      }
      const name2 = exportDeclaration.localName;
      const variable = this.traceVariable(name2, {
        importerForSideEffects,
        searchedNamesAndModules
      });
      if (importerForSideEffects) {
        setAlternativeExporterIfCyclic(variable, importerForSideEffects, this);
        getOrCreate(importerForSideEffects.sideEffectDependenciesByVariable, variable, getNewSet).add(this);
      }
      return [variable];
    }
    if (onlyExplicit) {
      return [null];
    }
    if (name !== "default") {
      const foundNamespaceReexport = this.namespaceReexportsByName.get(name) ?? this.getVariableFromNamespaceReexports(name, importerForSideEffects, searchedNamesAndModules);
      this.namespaceReexportsByName.set(name, foundNamespaceReexport);
      if (foundNamespaceReexport[0]) {
        return foundNamespaceReexport;
      }
    }
    if (this.info.syntheticNamedExports) {
      return [
        getOrCreate(this.syntheticExports, name, () => new SyntheticNamedExportVariable(this.astContext, name, this.getSyntheticNamespace()))
      ];
    }
    if (!isExportAllSearch && this.options.shimMissingExports) {
      this.shimMissingExport(name);
      return [this.exportShimVariable];
    }
    return [null];
  }
  hasEffects() {
    return this.info.moduleSideEffects === "no-treeshake" || this.ast.hasCachedEffects();
  }
  include() {
    const context = createInclusionContext();
    if (this.ast.shouldBeIncluded(context))
      this.ast.include(context, false);
  }
  includeAllExports(includeNamespaceMembers) {
    if (!this.isExecuted) {
      markModuleAndImpureDependenciesAsExecuted(this);
      this.graph.needsTreeshakingPass = true;
    }
    for (const exportName of this.exports.keys()) {
      if (includeNamespaceMembers || exportName !== this.info.syntheticNamedExports) {
        const variable = this.getVariableForExportName(exportName)[0];
        if (!variable) {
          return error(logMissingEntryExport(exportName, this.id));
        }
        variable.deoptimizePath(UNKNOWN_PATH);
        if (!variable.included) {
          this.includeVariable(variable);
        }
      }
    }
    for (const name of this.getReexports()) {
      const [variable] = this.getVariableForExportName(name);
      if (variable) {
        variable.deoptimizePath(UNKNOWN_PATH);
        if (!variable.included) {
          this.includeVariable(variable);
        }
        if (variable instanceof ExternalVariable) {
          variable.module.reexported = true;
        }
      }
    }
    if (includeNamespaceMembers) {
      this.namespace.setMergedNamespaces(this.includeAndGetAdditionalMergedNamespaces());
    }
  }
  includeAllInBundle() {
    this.ast.include(createInclusionContext(), true);
    this.includeAllExports(false);
  }
  includeExportsByNames(names) {
    if (!this.isExecuted) {
      markModuleAndImpureDependenciesAsExecuted(this);
      this.graph.needsTreeshakingPass = true;
    }
    let includeNamespaceMembers = false;
    for (const name of names) {
      const variable = this.getVariableForExportName(name)[0];
      if (variable) {
        variable.deoptimizePath(UNKNOWN_PATH);
        if (!variable.included) {
          this.includeVariable(variable);
        }
      }
      if (!this.exports.has(name) && !this.reexportDescriptions.has(name)) {
        includeNamespaceMembers = true;
      }
    }
    if (includeNamespaceMembers) {
      this.namespace.setMergedNamespaces(this.includeAndGetAdditionalMergedNamespaces());
    }
  }
  isIncluded() {
    return this.ast && (this.ast.included || this.namespace.included || this.importedFromNotTreeshaken || this.exportShimVariable.included);
  }
  linkImports() {
    this.addModulesToImportDescriptions(this.importDescriptions);
    this.addModulesToImportDescriptions(this.reexportDescriptions);
    const externalExportAllModules = [];
    for (const source of this.exportAllSources) {
      const module = this.graph.modulesById.get(this.resolvedIds[source].id);
      if (module instanceof ExternalModule) {
        externalExportAllModules.push(module);
        continue;
      }
      this.exportAllModules.push(module);
    }
    this.exportAllModules.push(...externalExportAllModules);
  }
  log(level, properties, pos) {
    this.addLocationToLogProps(properties, pos);
    this.options.onLog(level, properties);
  }
  render(options) {
    const source = this.magicString.clone();
    this.ast.render(source, options);
    source.trim();
    const { usesTopLevelAwait } = this.astContext;
    if (usesTopLevelAwait && options.format !== "es" && options.format !== "system") {
      return error(logInvalidFormatForTopLevelAwait(this.id, options.format));
    }
    return { source, usesTopLevelAwait };
  }
  async setSource({ ast, code, customTransformCache, originalCode, originalSourcemap, resolvedIds, sourcemapChain, transformDependencies, transformFiles, ...moduleOptions }) {
    timeStart("generate ast", 3);
    if (code.startsWith("#!")) {
      const shebangEndPosition = code.indexOf("\n");
      this.shebang = code.slice(2, shebangEndPosition);
    }
    this.info.code = code;
    this.originalCode = originalCode;
    this.originalSourcemap = decodedSourcemap(originalSourcemap);
    this.sourcemapChain = sourcemapChain.map((mapOrMissing) => mapOrMissing.missing ? mapOrMissing : decodedSourcemap(mapOrMissing));
    resetSourcemapCache(this.originalSourcemap, this.sourcemapChain);
    if (transformFiles) {
      this.transformFiles = transformFiles;
    }
    this.transformDependencies = transformDependencies;
    this.customTransformCache = customTransformCache;
    this.updateOptions(moduleOptions);
    this.resolvedIds = resolvedIds ?? /* @__PURE__ */ Object.create(null);
    const fileName = this.id;
    this.magicString = new MagicString(code, {
      filename: this.excludeFromSourcemap ? null : fileName,
      // don't include plugin helpers in sourcemap
      indentExclusionRanges: []
    });
    this.astContext = {
      addDynamicImport: this.addDynamicImport.bind(this),
      addExport: this.addExport.bind(this),
      addImport: this.addImport.bind(this),
      addImportMeta: this.addImportMeta.bind(this),
      code,
      // Only needed for debugging
      deoptimizationTracker: this.graph.deoptimizationTracker,
      error: this.error.bind(this),
      fileName,
      // Needed for warnings
      getExports: this.getExports.bind(this),
      getModuleExecIndex: () => this.execIndex,
      getModuleName: this.basename.bind(this),
      getNodeConstructor: (name) => nodeConstructors[name] || nodeConstructors.UnknownNode,
      getReexports: this.getReexports.bind(this),
      importDescriptions: this.importDescriptions,
      includeAllExports: () => this.includeAllExports(true),
      includeDynamicImport: this.includeDynamicImport.bind(this),
      includeVariableInModule: this.includeVariableInModule.bind(this),
      log: this.log.bind(this),
      magicString: this.magicString,
      manualPureFunctions: this.graph.pureFunctions,
      module: this,
      moduleContext: this.context,
      options: this.options,
      requestTreeshakingPass: () => this.graph.needsTreeshakingPass = true,
      traceExport: (name) => this.getVariableForExportName(name)[0],
      traceVariable: this.traceVariable.bind(this),
      usesTopLevelAwait: false
    };
    this.scope = new ModuleScope(this.graph.scope, this.astContext);
    this.namespace = new NamespaceVariable(this.astContext);
    const programParent = { context: this.astContext, type: "Module" };
    if (ast) {
      this.ast = new nodeConstructors[ast.type](programParent, this.scope).parseNode(ast);
      this.info.ast = ast;
    } else {
      timeEnd("generate ast", 3);
      const astBuffer = await (0, import_native.parseAsync)(code, false);
      timeStart("generate ast", 3);
      this.ast = convertProgram(astBuffer, programParent, this.scope);
      Object.defineProperty(this.info, "ast", {
        get: () => {
          if (this.graph.astLru.has(fileName)) {
            return this.graph.astLru.get(fileName);
          } else {
            const parsedAst = this.tryParse();
            if (this.options.cache !== false) {
              Object.defineProperty(this.info, "ast", {
                value: parsedAst
              });
              return parsedAst;
            }
            this.graph.astLru.set(fileName, parsedAst);
            return parsedAst;
          }
        }
      });
    }
    timeEnd("generate ast", 3);
  }
  toJSON() {
    return {
      ast: this.info.ast,
      attributes: this.info.attributes,
      code: this.info.code,
      customTransformCache: this.customTransformCache,
      // eslint-disable-next-line unicorn/prefer-spread
      dependencies: Array.from(this.dependencies, getId),
      id: this.id,
      meta: this.info.meta,
      moduleSideEffects: this.info.moduleSideEffects,
      originalCode: this.originalCode,
      originalSourcemap: this.originalSourcemap,
      resolvedIds: this.resolvedIds,
      sourcemapChain: this.sourcemapChain,
      syntheticNamedExports: this.info.syntheticNamedExports,
      transformDependencies: this.transformDependencies,
      transformFiles: this.transformFiles
    };
  }
  traceVariable(name, { importerForSideEffects, isExportAllSearch, searchedNamesAndModules } = EMPTY_OBJECT) {
    const localVariable = this.scope.variables.get(name);
    if (localVariable) {
      return localVariable;
    }
    const importDescription = this.importDescriptions.get(name);
    if (importDescription) {
      const otherModule = importDescription.module;
      if (otherModule instanceof _Module && importDescription.name === "*") {
        return otherModule.namespace;
      }
      const [declaration] = getVariableForExportNameRecursive(otherModule, importDescription.name, importerForSideEffects || this, isExportAllSearch, searchedNamesAndModules);
      if (!declaration) {
        return this.error(logMissingExport(importDescription.name, this.id, otherModule.id), importDescription.start);
      }
      return declaration;
    }
    return null;
  }
  updateOptions({ meta, moduleSideEffects, syntheticNamedExports }) {
    if (moduleSideEffects != null) {
      this.info.moduleSideEffects = moduleSideEffects;
    }
    if (syntheticNamedExports != null) {
      this.info.syntheticNamedExports = syntheticNamedExports;
    }
    if (meta != null) {
      Object.assign(this.info.meta, meta);
    }
  }
  addDynamicImport(node) {
    let argument = node.sourceAstNode;
    if (argument.type === TemplateLiteral) {
      if (argument.quasis.length === 1 && typeof argument.quasis[0].value.cooked === "string") {
        argument = argument.quasis[0].value.cooked;
      }
    } else if (argument.type === Literal && typeof argument.value === "string") {
      argument = argument.value;
    }
    this.dynamicImports.push({ argument, id: null, node, resolution: null });
  }
  assertUniqueExportName(name, nodeStart) {
    if (this.exports.has(name) || this.reexportDescriptions.has(name)) {
      this.error(logDuplicateExportError(name), nodeStart);
    }
  }
  addExport(node) {
    if (node instanceof ExportDefaultDeclaration) {
      this.assertUniqueExportName("default", node.start);
      this.exports.set("default", {
        identifier: node.variable.getAssignedVariableName(),
        localName: "default"
      });
    } else if (node instanceof ExportAllDeclaration) {
      const source = node.source.value;
      this.addSource(source, node);
      if (node.exported) {
        const name = node.exported instanceof Literal2 ? node.exported.value : node.exported.name;
        this.assertUniqueExportName(name, node.exported.start);
        this.reexportDescriptions.set(name, {
          localName: "*",
          module: null,
          // filled in later,
          source,
          start: node.start
        });
      } else {
        this.exportAllSources.add(source);
      }
    } else if (node.source instanceof Literal2) {
      const source = node.source.value;
      this.addSource(source, node);
      for (const { exported, local, start } of node.specifiers) {
        const name = exported instanceof Literal2 ? exported.value : exported.name;
        this.assertUniqueExportName(name, start);
        this.reexportDescriptions.set(name, {
          localName: local instanceof Literal2 ? local.value : local.name,
          module: null,
          // filled in later,
          source,
          start
        });
      }
    } else if (node.declaration) {
      const declaration = node.declaration;
      if (declaration instanceof VariableDeclaration) {
        for (const declarator of declaration.declarations) {
          for (const localName of extractAssignedNames(declarator.id)) {
            this.assertUniqueExportName(localName, declarator.id.start);
            this.exports.set(localName, { identifier: null, localName });
          }
        }
      } else {
        const localName = declaration.id.name;
        this.assertUniqueExportName(localName, declaration.id.start);
        this.exports.set(localName, { identifier: null, localName });
      }
    } else {
      for (const { local, exported } of node.specifiers) {
        const localName = local.name;
        const exportedName = exported instanceof Identifier2 ? exported.name : exported.value;
        this.assertUniqueExportName(exportedName, exported.start);
        this.exports.set(exportedName, { identifier: null, localName });
      }
    }
  }
  addImport(node) {
    const source = node.source.value;
    this.addSource(source, node);
    for (const specifier of node.specifiers) {
      const localName = specifier.local.name;
      if (this.scope.variables.has(localName) || this.importDescriptions.has(localName)) {
        this.error(logRedeclarationError(localName), specifier.local.start);
      }
      const name = specifier instanceof ImportDefaultSpecifier ? "default" : specifier instanceof ImportNamespaceSpecifier ? "*" : specifier.imported instanceof Identifier2 ? specifier.imported.name : specifier.imported.value;
      this.importDescriptions.set(localName, {
        module: null,
        // filled in later
        name,
        source,
        start: specifier.start
      });
    }
  }
  addImportMeta(node) {
    this.importMetas.push(node);
  }
  addLocationToLogProps(properties, pos) {
    properties.id = this.id;
    properties.pos = pos;
    let code = this.info.code;
    const location = locate(code, pos, { offsetLine: 1 });
    if (location) {
      let { column, line } = location;
      try {
        ({ column, line } = getOriginalLocation(this.sourcemapChain, { column, line }));
        code = this.originalCode;
      } catch (error_) {
        this.options.onLog(LOGLEVEL_WARN, logInvalidSourcemapForError(error_, this.id, column, line, pos));
      }
      augmentCodeLocation(properties, { column, line }, code, this.id);
    }
  }
  addModulesToImportDescriptions(importDescription) {
    for (const specifier of importDescription.values()) {
      const { id } = this.resolvedIds[specifier.source];
      specifier.module = this.graph.modulesById.get(id);
    }
  }
  addRelevantSideEffectDependencies(relevantDependencies, necessaryDependencies, alwaysCheckedDependencies) {
    const handledDependencies = /* @__PURE__ */ new Set();
    const addSideEffectDependencies = (possibleDependencies) => {
      for (const dependency of possibleDependencies) {
        if (handledDependencies.has(dependency)) {
          continue;
        }
        handledDependencies.add(dependency);
        if (necessaryDependencies.has(dependency)) {
          relevantDependencies.add(dependency);
          continue;
        }
        if (!(dependency.info.moduleSideEffects || alwaysCheckedDependencies.has(dependency))) {
          continue;
        }
        if (dependency instanceof ExternalModule || dependency.hasEffects()) {
          relevantDependencies.add(dependency);
          continue;
        }
        addSideEffectDependencies(dependency.dependencies);
      }
    };
    addSideEffectDependencies(this.dependencies);
    addSideEffectDependencies(alwaysCheckedDependencies);
  }
  addSource(source, declaration) {
    const parsedAttributes = getAttributesFromImportExportDeclaration(declaration.attributes);
    const existingAttributes = this.sourcesWithAttributes.get(source);
    if (existingAttributes) {
      if (doAttributesDiffer(existingAttributes, parsedAttributes)) {
        this.log(LOGLEVEL_WARN, logInconsistentImportAttributes(existingAttributes, parsedAttributes, source, this.id), declaration.start);
      }
    } else {
      this.sourcesWithAttributes.set(source, parsedAttributes);
    }
  }
  getVariableFromNamespaceReexports(name, importerForSideEffects, searchedNamesAndModules) {
    let foundSyntheticDeclaration = null;
    const foundInternalDeclarations = /* @__PURE__ */ new Map();
    const foundExternalDeclarations = /* @__PURE__ */ new Set();
    for (const module of this.exportAllModules) {
      if (module.info.syntheticNamedExports === name) {
        continue;
      }
      const [variable, indirectExternal] = getVariableForExportNameRecursive(
        module,
        name,
        importerForSideEffects,
        true,
        // We are creating a copy to handle the case where the same binding is
        // imported through different namespace reexports gracefully
        copyNameToModulesMap(searchedNamesAndModules)
      );
      if (module instanceof ExternalModule || indirectExternal) {
        foundExternalDeclarations.add(variable);
      } else if (variable instanceof SyntheticNamedExportVariable) {
        if (!foundSyntheticDeclaration) {
          foundSyntheticDeclaration = variable;
        }
      } else if (variable) {
        foundInternalDeclarations.set(variable, module);
      }
    }
    if (foundInternalDeclarations.size > 0) {
      const foundDeclarationList = [...foundInternalDeclarations];
      const usedDeclaration = foundDeclarationList[0][0];
      if (foundDeclarationList.length === 1) {
        return [usedDeclaration];
      }
      this.options.onLog(LOGLEVEL_WARN, logNamespaceConflict(name, this.id, foundDeclarationList.map(([, module]) => module.id)));
      return [null];
    }
    if (foundExternalDeclarations.size > 0) {
      const foundDeclarationList = [...foundExternalDeclarations];
      const usedDeclaration = foundDeclarationList[0];
      if (foundDeclarationList.length > 1) {
        this.options.onLog(LOGLEVEL_WARN, logAmbiguousExternalNamespaces(name, this.id, usedDeclaration.module.id, foundDeclarationList.map((declaration) => declaration.module.id)));
      }
      return [usedDeclaration, true];
    }
    if (foundSyntheticDeclaration) {
      return [foundSyntheticDeclaration];
    }
    return [null];
  }
  includeAndGetAdditionalMergedNamespaces() {
    const externalNamespaces = /* @__PURE__ */ new Set();
    const syntheticNamespaces = /* @__PURE__ */ new Set();
    for (const module of [this, ...this.exportAllModules]) {
      if (module instanceof ExternalModule) {
        const [externalVariable] = module.getVariableForExportName("*");
        externalVariable.include();
        this.includedImports.add(externalVariable);
        externalNamespaces.add(externalVariable);
      } else if (module.info.syntheticNamedExports) {
        const syntheticNamespace = module.getSyntheticNamespace();
        syntheticNamespace.include();
        this.includedImports.add(syntheticNamespace);
        syntheticNamespaces.add(syntheticNamespace);
      }
    }
    return [...syntheticNamespaces, ...externalNamespaces];
  }
  includeDynamicImport(node) {
    const resolution = this.dynamicImports.find((dynamicImport) => dynamicImport.node === node).resolution;
    if (resolution instanceof _Module) {
      resolution.includedDynamicImporters.push(this);
      const importedNames = this.options.treeshake ? node.getDeterministicImportedNames() : void 0;
      if (importedNames) {
        resolution.includeExportsByNames(importedNames);
      } else {
        resolution.includeAllExports(true);
      }
    }
  }
  includeVariable(variable) {
    const variableModule = variable.module;
    if (variable.included) {
      if (variableModule instanceof _Module && variableModule !== this) {
        getAndExtendSideEffectModules(variable, this);
      }
    } else {
      variable.include();
      this.graph.needsTreeshakingPass = true;
      if (variableModule instanceof _Module) {
        if (!variableModule.isExecuted) {
          markModuleAndImpureDependenciesAsExecuted(variableModule);
        }
        if (variableModule !== this) {
          const sideEffectModules = getAndExtendSideEffectModules(variable, this);
          for (const module of sideEffectModules) {
            if (!module.isExecuted) {
              markModuleAndImpureDependenciesAsExecuted(module);
            }
          }
        }
      }
    }
  }
  includeVariableInModule(variable) {
    this.includeVariable(variable);
    const variableModule = variable.module;
    if (variableModule && variableModule !== this) {
      this.includedImports.add(variable);
    }
  }
  shimMissingExport(name) {
    this.options.onLog(LOGLEVEL_WARN, logShimmedExport(this.id, name));
    this.exports.set(name, MISSING_EXPORT_SHIM_DESCRIPTION);
  }
  tryParse() {
    try {
      return parseAst(this.info.code);
    } catch (error_) {
      return this.error(logModuleParseError(error_, this.id), error_.pos);
    }
  }
};
function setAlternativeExporterIfCyclic(variable, importer, reexporter) {
  if (variable.module instanceof Module && variable.module !== reexporter) {
    const exporterCycles = variable.module.cycles;
    if (exporterCycles.size > 0) {
      const importerCycles = reexporter.cycles;
      for (const cycleSymbol of importerCycles) {
        if (exporterCycles.has(cycleSymbol)) {
          importer.alternativeReexportModules.set(variable, reexporter);
          break;
        }
      }
    }
  }
}
var copyNameToModulesMap = (searchedNamesAndModules) => searchedNamesAndModules && // eslint-disable-next-line unicorn/prefer-spread
new Map(Array.from(searchedNamesAndModules, ([name, modules]) => [name, new Set(modules)]));
function removeJsExtension(name) {
  return name.endsWith(".js") ? name.slice(0, -3) : name;
}
function getCompleteAmdId(options, chunkId) {
  if (options.autoId) {
    return `${options.basePath ? options.basePath + "/" : ""}${removeJsExtension(chunkId)}`;
  }
  return options.id ?? "";
}
function getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings, reexportProtoFromExternal, mechanism = "return ") {
  const { _, getDirectReturnFunction, getFunctionIntro, getPropertyAccess, n: n2, s } = snippets;
  if (!namedExportsMode) {
    return `${n2}${n2}${mechanism}${getSingleDefaultExport(exports, dependencies, interop, externalLiveBindings, getPropertyAccess)};`;
  }
  let exportBlock = "";
  for (const { defaultVariableName, importPath, isChunk, name, namedExportsMode: depNamedExportsMode, namespaceVariableName, reexports } of dependencies) {
    if (reexports && namedExportsMode) {
      for (const specifier of reexports) {
        if (specifier.reexported !== "*") {
          const importName = getReexportedImportName(name, specifier.imported, depNamedExportsMode, isChunk, defaultVariableName, namespaceVariableName, interop, importPath, externalLiveBindings, getPropertyAccess);
          if (exportBlock)
            exportBlock += n2;
          if (specifier.imported !== "*" && specifier.needsLiveBinding) {
            const [left, right] = getDirectReturnFunction([], {
              functionReturn: true,
              lineBreakIndent: null,
              name: null
            });
            exportBlock += `Object.defineProperty(exports,${_}${JSON.stringify(specifier.reexported)},${_}{${n2}${t}enumerable:${_}true,${n2}${t}get:${_}${left}${importName}${right}${n2}});`;
          } else if (specifier.reexported === "__proto__") {
            exportBlock += `Object.defineProperty(exports,${_}"__proto__",${_}{${n2}${t}enumerable:${_}true,${n2}${t}value:${_}${importName}${n2}});`;
          } else {
            exportBlock += `exports${getPropertyAccess(specifier.reexported)}${_}=${_}${importName};`;
          }
        }
      }
    }
  }
  for (const { exported, local } of exports) {
    const lhs = `exports${getPropertyAccess(exported)}`;
    const rhs = local;
    if (lhs !== rhs) {
      if (exportBlock)
        exportBlock += n2;
      exportBlock += exported === "__proto__" ? `Object.defineProperty(exports,${_}"__proto__",${_}{${n2}${t}enumerable:${_}true,${n2}${t}value:${_}${rhs}${n2}});` : `${lhs}${_}=${_}${rhs};`;
    }
  }
  for (const { name, reexports } of dependencies) {
    if (reexports && namedExportsMode) {
      for (const specifier of reexports) {
        if (specifier.reexported === "*") {
          if (exportBlock)
            exportBlock += n2;
          if (!specifier.needsLiveBinding && reexportProtoFromExternal) {
            const protoString = "'__proto__'";
            exportBlock += `Object.prototype.hasOwnProperty.call(${name},${_}${protoString})${_}&&${n2}${t}!Object.prototype.hasOwnProperty.call(exports,${_}${protoString})${_}&&${n2}${t}Object.defineProperty(exports,${_}${protoString},${_}{${n2}${t}${t}enumerable:${_}true,${n2}${t}${t}value:${_}${name}[${protoString}]${n2}${t}});${n2}${n2}`;
          }
          const copyPropertyIfNecessary = `{${n2}${t}if${_}(k${_}!==${_}'default'${_}&&${_}!Object.prototype.hasOwnProperty.call(exports,${_}k))${_}${getDefineProperty(name, specifier.needsLiveBinding, t, snippets)}${s}${n2}}`;
          exportBlock += `Object.keys(${name}).forEach(${getFunctionIntro(["k"], {
            isAsync: false,
            name: null
          })}${copyPropertyIfNecessary});`;
        }
      }
    }
  }
  if (exportBlock) {
    return `${n2}${n2}${exportBlock}`;
  }
  return "";
}
function getSingleDefaultExport(exports, dependencies, interop, externalLiveBindings, getPropertyAccess) {
  if (exports.length > 0) {
    return exports[0].local;
  } else {
    for (const { defaultVariableName, importPath, isChunk, name, namedExportsMode: depNamedExportsMode, namespaceVariableName, reexports } of dependencies) {
      if (reexports) {
        return getReexportedImportName(name, reexports[0].imported, depNamedExportsMode, isChunk, defaultVariableName, namespaceVariableName, interop, importPath, externalLiveBindings, getPropertyAccess);
      }
    }
  }
}
function getReexportedImportName(moduleVariableName, imported, depNamedExportsMode, isChunk, defaultVariableName, namespaceVariableName, interop, moduleId, externalLiveBindings, getPropertyAccess) {
  if (imported === "default") {
    if (!isChunk) {
      const moduleInterop = interop(moduleId);
      const variableName = defaultInteropHelpersByInteropType[moduleInterop] ? defaultVariableName : moduleVariableName;
      return isDefaultAProperty(moduleInterop, externalLiveBindings) ? `${variableName}${getPropertyAccess("default")}` : variableName;
    }
    return depNamedExportsMode ? `${moduleVariableName}${getPropertyAccess("default")}` : moduleVariableName;
  }
  if (imported === "*") {
    return (isChunk ? !depNamedExportsMode : namespaceInteropHelpersByInteropType[interop(moduleId)]) ? namespaceVariableName : moduleVariableName;
  }
  return `${moduleVariableName}${getPropertyAccess(imported)}`;
}
function getEsModuleValue(getObject) {
  return getObject([["value", "true"]], {
    lineBreakIndent: null
  });
}
function getNamespaceMarkers(hasNamedExports, addEsModule, addNamespaceToStringTag, { _, getObject }) {
  if (hasNamedExports) {
    if (addEsModule) {
      if (addNamespaceToStringTag) {
        return `Object.defineProperties(exports,${_}${getObject([
          ["__esModule", getEsModuleValue(getObject)],
          [null, `[Symbol.toStringTag]:${_}${getToStringTagValue(getObject)}`]
        ], {
          lineBreakIndent: null
        })});`;
      }
      return `Object.defineProperty(exports,${_}'__esModule',${_}${getEsModuleValue(getObject)});`;
    }
    if (addNamespaceToStringTag) {
      return `Object.defineProperty(exports,${_}Symbol.toStringTag,${_}${getToStringTagValue(getObject)});`;
    }
  }
  return "";
}
var getDefineProperty = (name, needsLiveBinding, t, { _, getDirectReturnFunction, n: n2 }) => {
  if (needsLiveBinding) {
    const [left, right] = getDirectReturnFunction([], {
      functionReturn: true,
      lineBreakIndent: null,
      name: null
    });
    return `Object.defineProperty(exports,${_}k,${_}{${n2}${t}${t}enumerable:${_}true,${n2}${t}${t}get:${_}${left}${name}[k]${right}${n2}${t}})`;
  }
  return `exports[k]${_}=${_}${name}[k]`;
};
function getInteropBlock(dependencies, interop, externalLiveBindings, freeze, symbols, accessedGlobals, indent, snippets) {
  const { _, cnst, n: n2 } = snippets;
  const neededInteropHelpers = /* @__PURE__ */ new Set();
  const interopStatements = [];
  const addInteropStatement = (helperVariableName, helper, dependencyVariableName) => {
    neededInteropHelpers.add(helper);
    interopStatements.push(`${cnst} ${helperVariableName}${_}=${_}/*#__PURE__*/${helper}(${dependencyVariableName});`);
  };
  for (const { defaultVariableName, imports, importPath, isChunk, name, namedExportsMode, namespaceVariableName, reexports } of dependencies) {
    if (isChunk) {
      for (const { imported, reexported } of [
        ...imports || [],
        ...reexports || []
      ]) {
        if (imported === "*" && reexported !== "*") {
          if (!namedExportsMode) {
            addInteropStatement(namespaceVariableName, INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE, name);
          }
          break;
        }
      }
    } else {
      const moduleInterop = interop(importPath);
      let hasDefault = false;
      let hasNamespace = false;
      for (const { imported, reexported } of [
        ...imports || [],
        ...reexports || []
      ]) {
        let helper;
        let variableName;
        if (imported === "default") {
          if (!hasDefault) {
            hasDefault = true;
            if (defaultVariableName !== namespaceVariableName) {
              variableName = defaultVariableName;
              helper = defaultInteropHelpersByInteropType[moduleInterop];
            }
          }
        } else if (imported === "*" && reexported !== "*" && !hasNamespace) {
          hasNamespace = true;
          helper = namespaceInteropHelpersByInteropType[moduleInterop];
          variableName = namespaceVariableName;
        }
        if (helper) {
          addInteropStatement(variableName, helper, name);
        }
      }
    }
  }
  return `${getHelpersBlock(neededInteropHelpers, accessedGlobals, indent, snippets, externalLiveBindings, freeze, symbols)}${interopStatements.length > 0 ? `${interopStatements.join(n2)}${n2}${n2}` : ""}`;
}
function addJsExtension(name) {
  return name.endsWith(".js") ? name : name + ".js";
}
function updateExtensionForRelativeAmdId(id, forceJsExtensionForImports) {
  if (id[0] !== ".") {
    return id;
  }
  return forceJsExtensionForImports ? addJsExtension(id) : removeJsExtension(id);
}
var require$$0 = [
  "assert",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "diagnostics_channel",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "timers",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib"
];
var _static = require$$0;
var builtinModules = /* @__PURE__ */ getDefaultExportFromCjs(_static);
var nodeBuiltins = /* @__PURE__ */ new Set([
  ...builtinModules,
  // TODO
  // remove once builtin-modules includes PR: https://github.com/sindresorhus/builtin-modules/pull/17
  "assert/strict",
  "dns/promises",
  "fs/promises",
  "path/posix",
  "path/win32",
  "readline/promises",
  "stream/consumers",
  "stream/promises",
  "stream/web",
  "timers/promises",
  "util/types"
]);
function warnOnBuiltins(log, dependencies) {
  const externalBuiltins = dependencies.map(({ importPath }) => importPath).filter((importPath) => nodeBuiltins.has(importPath) || importPath.startsWith("node:"));
  if (externalBuiltins.length === 0)
    return;
  log(LOGLEVEL_WARN, logMissingNodeBuiltins(externalBuiltins));
}
function amd(magicString, { accessedGlobals, dependencies, exports, hasDefaultExport, hasExports, id, indent: t, intro, isEntryFacade, isModuleFacade, namedExportsMode, log, outro, snippets }, { amd: amd2, esModule, externalLiveBindings, freeze, generatedCode: { symbols }, interop, reexportProtoFromExternal, strict }) {
  warnOnBuiltins(log, dependencies);
  const deps = dependencies.map((m) => `'${updateExtensionForRelativeAmdId(m.importPath, amd2.forceJsExtensionForImports)}'`);
  const parameters = dependencies.map((m) => m.name);
  const { n: n2, getNonArrowFunctionIntro, _ } = snippets;
  if (namedExportsMode && hasExports) {
    parameters.unshift(`exports`);
    deps.unshift(`'exports'`);
  }
  if (accessedGlobals.has("require")) {
    parameters.unshift("require");
    deps.unshift(`'require'`);
  }
  if (accessedGlobals.has("module")) {
    parameters.unshift("module");
    deps.unshift(`'module'`);
  }
  const completeAmdId = getCompleteAmdId(amd2, id);
  const defineParameters = (completeAmdId ? `'${completeAmdId}',${_}` : ``) + (deps.length > 0 ? `[${deps.join(`,${_}`)}],${_}` : ``);
  const useStrict = strict ? `${_}'use strict';` : "";
  magicString.prepend(`${intro}${getInteropBlock(dependencies, interop, externalLiveBindings, freeze, symbols, accessedGlobals, t, snippets)}`);
  const exportBlock = getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings, reexportProtoFromExternal);
  let namespaceMarkers = getNamespaceMarkers(namedExportsMode && hasExports, isEntryFacade && (esModule === true || esModule === "if-default-prop" && hasDefaultExport), isModuleFacade && symbols, snippets);
  if (namespaceMarkers) {
    namespaceMarkers = n2 + n2 + namespaceMarkers;
  }
  magicString.append(`${exportBlock}${namespaceMarkers}${outro}`).indent(t).prepend(`${amd2.define}(${defineParameters}(${getNonArrowFunctionIntro(parameters, {
    isAsync: false,
    name: null
  })}{${useStrict}${n2}${n2}`).append(`${n2}${n2}}));`);
}
function cjs(magicString, { accessedGlobals, dependencies, exports, hasDefaultExport, hasExports, indent: t, intro, isEntryFacade, isModuleFacade, namedExportsMode, outro, snippets }, { compact, esModule, externalLiveBindings, freeze, interop, generatedCode: { symbols }, reexportProtoFromExternal, strict }) {
  const { _, n: n2 } = snippets;
  const useStrict = strict ? `'use strict';${n2}${n2}` : "";
  let namespaceMarkers = getNamespaceMarkers(namedExportsMode && hasExports, isEntryFacade && (esModule === true || esModule === "if-default-prop" && hasDefaultExport), isModuleFacade && symbols, snippets);
  if (namespaceMarkers) {
    namespaceMarkers += n2 + n2;
  }
  const importBlock = getImportBlock$1(dependencies, snippets, compact);
  const interopBlock = getInteropBlock(dependencies, interop, externalLiveBindings, freeze, symbols, accessedGlobals, t, snippets);
  magicString.prepend(`${useStrict}${intro}${namespaceMarkers}${importBlock}${interopBlock}`);
  const exportBlock = getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings, reexportProtoFromExternal, `module.exports${_}=${_}`);
  magicString.append(`${exportBlock}${outro}`);
}
function getImportBlock$1(dependencies, { _, cnst, n: n2 }, compact) {
  let importBlock = "";
  let definingVariable = false;
  for (const { importPath, name, reexports, imports } of dependencies) {
    if (!reexports && !imports) {
      if (importBlock) {
        importBlock += compact && !definingVariable ? "," : `;${n2}`;
      }
      definingVariable = false;
      importBlock += `require('${importPath}')`;
    } else {
      importBlock += compact && definingVariable ? "," : `${importBlock ? `;${n2}` : ""}${cnst} `;
      definingVariable = true;
      importBlock += `${name}${_}=${_}require('${importPath}')`;
    }
  }
  if (importBlock) {
    return `${importBlock};${n2}${n2}`;
  }
  return "";
}
function es(magicString, { accessedGlobals, indent: t, intro, outro, dependencies, exports, snippets }, { externalLiveBindings, freeze, generatedCode: { symbols } }) {
  const { n: n2 } = snippets;
  const importBlock = getImportBlock(dependencies, snippets);
  if (importBlock.length > 0)
    intro += importBlock.join(n2) + n2 + n2;
  intro += getHelpersBlock(null, accessedGlobals, t, snippets, externalLiveBindings, freeze, symbols);
  if (intro)
    magicString.prepend(intro);
  const exportBlock = getExportBlock(exports, snippets);
  if (exportBlock.length > 0)
    magicString.append(n2 + n2 + exportBlock.join(n2).trim());
  if (outro)
    magicString.append(outro);
  magicString.trim();
}
function getImportBlock(dependencies, { _ }) {
  const importBlock = [];
  for (const { importPath, reexports, imports, name, attributes } of dependencies) {
    const assertion = attributes ? `${_}assert${_}${attributes}` : "";
    const pathWithAssertion = `'${importPath}'${assertion};`;
    if (!reexports && !imports) {
      importBlock.push(`import${_}${pathWithAssertion}`);
      continue;
    }
    if (imports) {
      let defaultImport = null;
      let starImport = null;
      const importedNames = [];
      for (const specifier of imports) {
        if (specifier.imported === "default") {
          defaultImport = specifier;
        } else if (specifier.imported === "*") {
          starImport = specifier;
        } else {
          importedNames.push(specifier);
        }
      }
      if (starImport) {
        importBlock.push(`import${_}*${_}as ${starImport.local} from${_}${pathWithAssertion}`);
      }
      if (defaultImport && importedNames.length === 0) {
        importBlock.push(`import ${defaultImport.local} from${_}${pathWithAssertion}`);
      } else if (importedNames.length > 0) {
        importBlock.push(`import ${defaultImport ? `${defaultImport.local},${_}` : ""}{${_}${importedNames.map((specifier) => specifier.imported === specifier.local ? specifier.imported : `${stringifyIdentifierIfNeeded(specifier.imported)} as ${specifier.local}`).join(`,${_}`)}${_}}${_}from${_}${pathWithAssertion}`);
      }
    }
    if (reexports) {
      let starExport = null;
      const namespaceReexports = [];
      const namedReexports = [];
      for (const specifier of reexports) {
        if (specifier.reexported === "*") {
          starExport = specifier;
        } else if (specifier.imported === "*") {
          namespaceReexports.push(specifier);
        } else {
          namedReexports.push(specifier);
        }
      }
      if (starExport) {
        importBlock.push(`export${_}*${_}from${_}${pathWithAssertion}`);
      }
      if (namespaceReexports.length > 0) {
        if (!imports || !imports.some((specifier) => specifier.imported === "*" && specifier.local === name)) {
          importBlock.push(`import${_}*${_}as ${name} from${_}${pathWithAssertion}`);
        }
        for (const specifier of namespaceReexports) {
          importBlock.push(`export${_}{${_}${name === specifier.reexported ? name : `${name} as ${stringifyIdentifierIfNeeded(specifier.reexported)}`} };`);
        }
      }
      if (namedReexports.length > 0) {
        importBlock.push(`export${_}{${_}${namedReexports.map((specifier) => specifier.imported === specifier.reexported ? stringifyIdentifierIfNeeded(specifier.imported) : `${stringifyIdentifierIfNeeded(specifier.imported)} as ${stringifyIdentifierIfNeeded(specifier.reexported)}`).join(`,${_}`)}${_}}${_}from${_}${pathWithAssertion}`);
      }
    }
  }
  return importBlock;
}
function getExportBlock(exports, { _, cnst }) {
  const exportBlock = [];
  const exportDeclaration = [];
  for (const specifier of exports) {
    if (specifier.expression) {
      exportBlock.push(`${cnst} ${specifier.local}${_}=${_}${specifier.expression};`);
    }
    exportDeclaration.push(specifier.exported === specifier.local ? specifier.local : `${specifier.local} as ${stringifyIdentifierIfNeeded(specifier.exported)}`);
  }
  if (exportDeclaration.length > 0) {
    exportBlock.push(`export${_}{${_}${exportDeclaration.join(`,${_}`)}${_}};`);
  }
  return exportBlock;
}
var keypath = (keypath2, getPropertyAccess) => keypath2.split(".").map(getPropertyAccess).join("");
function setupNamespace(name, root, globals, { _, getPropertyAccess, s }, compact) {
  const parts = name.split(".");
  parts[0] = (typeof globals === "function" ? globals(parts[0]) : globals[parts[0]]) || parts[0];
  parts.pop();
  let propertyPath = root;
  return parts.map((part) => {
    propertyPath += getPropertyAccess(part);
    return `${propertyPath}${_}=${_}${propertyPath}${_}||${_}{}${s}`;
  }).join(compact ? "," : "\n") + (compact && parts.length > 0 ? ";" : "\n");
}
function assignToDeepVariable(deepName, root, globals, assignment, { _, getPropertyAccess }) {
  const parts = deepName.split(".");
  parts[0] = (typeof globals === "function" ? globals(parts[0]) : globals[parts[0]]) || parts[0];
  const last = parts.pop();
  let propertyPath = root;
  let deepAssignment = [
    ...parts.map((part) => {
      propertyPath += getPropertyAccess(part);
      return `${propertyPath}${_}=${_}${propertyPath}${_}||${_}{}`;
    }),
    `${propertyPath}${getPropertyAccess(last)}`
  ].join(`,${_}`) + `${_}=${_}${assignment}`;
  if (parts.length > 0) {
    deepAssignment = `(${deepAssignment})`;
  }
  return deepAssignment;
}
function trimEmptyImports(dependencies) {
  let index = dependencies.length;
  while (index--) {
    const { imports, reexports } = dependencies[index];
    if (imports || reexports) {
      return dependencies.slice(0, index + 1);
    }
  }
  return [];
}
function iife(magicString, { accessedGlobals, dependencies, exports, hasDefaultExport, hasExports, indent: t, intro, namedExportsMode, log, outro, snippets }, { compact, esModule, extend, freeze, externalLiveBindings, reexportProtoFromExternal, globals, interop, name, generatedCode: { symbols }, strict }) {
  const { _, getNonArrowFunctionIntro, getPropertyAccess, n: n2 } = snippets;
  const isNamespaced = name && name.includes(".");
  const useVariableAssignment = !extend && !isNamespaced;
  if (name && useVariableAssignment && !isLegal(name)) {
    return error(logIllegalIdentifierAsName(name));
  }
  warnOnBuiltins(log, dependencies);
  const external = trimEmptyImports(dependencies);
  const deps = external.map((dep) => dep.globalName || "null");
  const parameters = external.map((m) => m.name);
  if (hasExports && !name) {
    log(LOGLEVEL_WARN, logMissingNameOptionForIifeExport());
  }
  if (namedExportsMode && hasExports) {
    if (extend) {
      deps.unshift(`this${keypath(name, getPropertyAccess)}${_}=${_}this${keypath(name, getPropertyAccess)}${_}||${_}{}`);
      parameters.unshift("exports");
    } else {
      deps.unshift("{}");
      parameters.unshift("exports");
    }
  }
  const useStrict = strict ? `${t}'use strict';${n2}` : "";
  const interopBlock = getInteropBlock(dependencies, interop, externalLiveBindings, freeze, symbols, accessedGlobals, t, snippets);
  magicString.prepend(`${intro}${interopBlock}`);
  let wrapperIntro = `(${getNonArrowFunctionIntro(parameters, {
    isAsync: false,
    name: null
  })}{${n2}${useStrict}${n2}`;
  if (hasExports) {
    if (name && !(extend && namedExportsMode)) {
      wrapperIntro = (useVariableAssignment ? `var ${name}` : `this${keypath(name, getPropertyAccess)}`) + `${_}=${_}${wrapperIntro}`;
    }
    if (isNamespaced) {
      wrapperIntro = setupNamespace(name, "this", globals, snippets, compact) + wrapperIntro;
    }
  }
  let wrapperOutro = `${n2}${n2}})(${deps.join(`,${_}`)});`;
  if (hasExports && !extend && namedExportsMode) {
    wrapperOutro = `${n2}${n2}${t}return exports;${wrapperOutro}`;
  }
  const exportBlock = getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings, reexportProtoFromExternal);
  let namespaceMarkers = getNamespaceMarkers(namedExportsMode && hasExports, esModule === true || esModule === "if-default-prop" && hasDefaultExport, symbols, snippets);
  if (namespaceMarkers) {
    namespaceMarkers = n2 + n2 + namespaceMarkers;
  }
  magicString.append(`${exportBlock}${namespaceMarkers}${outro}`).indent(t).prepend(wrapperIntro).append(wrapperOutro);
}
function system(magicString, { accessedGlobals, dependencies, exports, hasExports, indent: t, intro, snippets, outro, usesTopLevelAwait }, { externalLiveBindings, freeze, name, generatedCode: { symbols }, strict, systemNullSetters }) {
  const { _, getFunctionIntro, getNonArrowFunctionIntro, n: n2, s } = snippets;
  const { importBindings, setters, starExcludes } = analyzeDependencies(dependencies, exports, t, snippets);
  const registeredName = name ? `'${name}',${_}` : "";
  const wrapperParameters = accessedGlobals.has("module") ? ["exports", "module"] : hasExports ? ["exports"] : [];
  let wrapperStart = `System.register(${registeredName}[` + dependencies.map(({ importPath }) => `'${importPath}'`).join(`,${_}`) + `],${_}(${getNonArrowFunctionIntro(wrapperParameters, {
    isAsync: false,
    name: null
  })}{${n2}${t}${strict ? "'use strict';" : ""}` + getStarExcludesBlock(starExcludes, t, snippets) + getImportBindingsBlock(importBindings, t, snippets) + `${n2}${t}return${_}{${setters.length > 0 ? `${n2}${t}${t}setters:${_}[${setters.map((setter) => setter ? `${getFunctionIntro(["module"], {
    isAsync: false,
    name: null
  })}{${n2}${t}${t}${t}${setter}${n2}${t}${t}}` : systemNullSetters ? `null` : `${getFunctionIntro([], { isAsync: false, name: null })}{}`).join(`,${_}`)}],` : ""}${n2}`;
  wrapperStart += `${t}${t}execute:${_}(${getNonArrowFunctionIntro([], {
    isAsync: usesTopLevelAwait,
    name: null
  })}{${n2}${n2}`;
  const wrapperEnd = `${t}${t}})${n2}${t}}${s}${n2}}));`;
  magicString.prepend(intro + getHelpersBlock(null, accessedGlobals, t, snippets, externalLiveBindings, freeze, symbols) + getHoistedExportsBlock(exports, t, snippets)).append(`${outro}${n2}${n2}` + getSyntheticExportsBlock(exports, t, snippets) + getMissingExportsBlock(exports, t, snippets)).indent(`${t}${t}${t}`).append(wrapperEnd).prepend(wrapperStart);
}
function analyzeDependencies(dependencies, exports, t, { _, cnst, getObject, getPropertyAccess, n: n2 }) {
  const importBindings = [];
  const setters = [];
  let starExcludes = null;
  for (const { imports, reexports } of dependencies) {
    const setter = [];
    if (imports) {
      for (const specifier of imports) {
        importBindings.push(specifier.local);
        if (specifier.imported === "*") {
          setter.push(`${specifier.local}${_}=${_}module;`);
        } else {
          setter.push(`${specifier.local}${_}=${_}module${getPropertyAccess(specifier.imported)};`);
        }
      }
    }
    if (reexports) {
      const reexportedNames = [];
      let hasStarReexport = false;
      for (const { imported, reexported } of reexports) {
        if (reexported === "*") {
          hasStarReexport = true;
        } else {
          reexportedNames.push([
            reexported,
            imported === "*" ? "module" : `module${getPropertyAccess(imported)}`
          ]);
        }
      }
      if (reexportedNames.length > 1 || hasStarReexport) {
        if (hasStarReexport) {
          if (!starExcludes) {
            starExcludes = getStarExcludes({ dependencies, exports });
          }
          reexportedNames.unshift([null, `__proto__:${_}null`]);
          const exportMapping = getObject(reexportedNames, { lineBreakIndent: null });
          setter.push(`${cnst} setter${_}=${_}${exportMapping};`, `for${_}(${cnst} name in module)${_}{`, `${t}if${_}(!_starExcludes[name])${_}setter[name]${_}=${_}module[name];`, "}", "exports(setter);");
        } else {
          const exportMapping = getObject(reexportedNames, { lineBreakIndent: null });
          setter.push(`exports(${exportMapping});`);
        }
      } else {
        const [key, value] = reexportedNames[0];
        setter.push(`exports(${JSON.stringify(key)},${_}${value});`);
      }
    }
    setters.push(setter.join(`${n2}${t}${t}${t}`));
  }
  return { importBindings, setters, starExcludes };
}
var getStarExcludes = ({ dependencies, exports }) => {
  const starExcludes = new Set(exports.map((expt) => expt.exported));
  starExcludes.add("default");
  for (const { reexports } of dependencies) {
    if (reexports) {
      for (const reexport of reexports) {
        if (reexport.reexported !== "*")
          starExcludes.add(reexport.reexported);
      }
    }
  }
  return starExcludes;
};
var getStarExcludesBlock = (starExcludes, t, { _, cnst, getObject, n: n2 }) => {
  if (starExcludes) {
    const fields = [...starExcludes].map((property2) => [
      property2,
      "1"
    ]);
    fields.unshift([null, `__proto__:${_}null`]);
    return `${n2}${t}${cnst} _starExcludes${_}=${_}${getObject(fields, {
      lineBreakIndent: { base: t, t }
    })};`;
  }
  return "";
};
var getImportBindingsBlock = (importBindings, t, { _, n: n2 }) => importBindings.length > 0 ? `${n2}${t}var ${importBindings.join(`,${_}`)};` : "";
var getHoistedExportsBlock = (exports, t, snippets) => getExportsBlock(exports.filter((expt) => expt.hoisted).map((expt) => ({ name: expt.exported, value: expt.local })), t, snippets);
function getExportsBlock(exports, t, { _, n: n2 }) {
  if (exports.length === 0) {
    return "";
  }
  if (exports.length === 1) {
    return `exports(${JSON.stringify(exports[0].name)},${_}${exports[0].value});${n2}${n2}`;
  }
  return `exports({${n2}` + exports.map(({ name, value }) => `${t}${stringifyObjectKeyIfNeeded(name)}:${_}${value}`).join(`,${n2}`) + `${n2}});${n2}${n2}`;
}
var getSyntheticExportsBlock = (exports, t, snippets) => getExportsBlock(exports.filter((expt) => expt.expression).map((expt) => ({ name: expt.exported, value: expt.local })), t, snippets);
var getMissingExportsBlock = (exports, t, snippets) => getExportsBlock(exports.filter((expt) => expt.local === MISSING_EXPORT_SHIM_VARIABLE).map((expt) => ({ name: expt.exported, value: MISSING_EXPORT_SHIM_VARIABLE })), t, snippets);
function globalProperty(name, globalVariable, getPropertyAccess) {
  if (!name)
    return "null";
  return `${globalVariable}${keypath(name, getPropertyAccess)}`;
}
function safeAccess(name, globalVariable, { _, getPropertyAccess }) {
  let propertyPath = globalVariable;
  return name.split(".").map((part) => propertyPath += getPropertyAccess(part)).join(`${_}&&${_}`);
}
function umd(magicString, { accessedGlobals, dependencies, exports, hasDefaultExport, hasExports, id, indent: t, intro, namedExportsMode, log, outro, snippets }, { amd: amd2, compact, esModule, extend, externalLiveBindings, freeze, interop, name, generatedCode: { symbols }, globals, noConflict, reexportProtoFromExternal, strict }) {
  const { _, cnst, getFunctionIntro, getNonArrowFunctionIntro, getPropertyAccess, n: n2, s } = snippets;
  const factoryVariable = compact ? "f" : "factory";
  const globalVariable = compact ? "g" : "global";
  if (hasExports && !name) {
    return error(logMissingNameOptionForUmdExport());
  }
  warnOnBuiltins(log, dependencies);
  const amdDeps = dependencies.map((m) => `'${updateExtensionForRelativeAmdId(m.importPath, amd2.forceJsExtensionForImports)}'`);
  const cjsDeps = dependencies.map((m) => `require('${m.importPath}')`);
  const trimmedImports = trimEmptyImports(dependencies);
  const globalDeps = trimmedImports.map((module) => globalProperty(module.globalName, globalVariable, getPropertyAccess));
  const factoryParameters = trimmedImports.map((m) => m.name);
  if (namedExportsMode && (hasExports || noConflict)) {
    amdDeps.unshift(`'exports'`);
    cjsDeps.unshift(`exports`);
    globalDeps.unshift(assignToDeepVariable(name, globalVariable, globals, `${extend ? `${globalProperty(name, globalVariable, getPropertyAccess)}${_}||${_}` : ""}{}`, snippets));
    factoryParameters.unshift("exports");
  }
  const completeAmdId = getCompleteAmdId(amd2, id);
  const amdParameters = (completeAmdId ? `'${completeAmdId}',${_}` : ``) + (amdDeps.length > 0 ? `[${amdDeps.join(`,${_}`)}],${_}` : ``);
  const define = amd2.define;
  const cjsExport = !namedExportsMode && hasExports ? `module.exports${_}=${_}` : ``;
  const useStrict = strict ? `${_}'use strict';${n2}` : ``;
  let iifeExport;
  if (noConflict) {
    const noConflictExportsVariable = compact ? "e" : "exports";
    let factory;
    if (!namedExportsMode && hasExports) {
      factory = `${cnst} ${noConflictExportsVariable}${_}=${_}${assignToDeepVariable(name, globalVariable, globals, `${factoryVariable}(${globalDeps.join(`,${_}`)})`, snippets)};`;
    } else {
      const module = globalDeps.shift();
      factory = `${cnst} ${noConflictExportsVariable}${_}=${_}${module};${n2}${t}${t}${factoryVariable}(${[noConflictExportsVariable, ...globalDeps].join(`,${_}`)});`;
    }
    iifeExport = `(${getFunctionIntro([], { isAsync: false, name: null })}{${n2}${t}${t}${cnst} current${_}=${_}${safeAccess(name, globalVariable, snippets)};${n2}${t}${t}${factory}${n2}${t}${t}${noConflictExportsVariable}.noConflict${_}=${_}${getFunctionIntro([], {
      isAsync: false,
      name: null
    })}{${_}${globalProperty(name, globalVariable, getPropertyAccess)}${_}=${_}current;${_}return ${noConflictExportsVariable}${s}${_}};${n2}${t}})()`;
  } else {
    iifeExport = `${factoryVariable}(${globalDeps.join(`,${_}`)})`;
    if (!namedExportsMode && hasExports) {
      iifeExport = assignToDeepVariable(name, globalVariable, globals, iifeExport, snippets);
    }
  }
  const iifeNeedsGlobal = hasExports || noConflict && namedExportsMode || globalDeps.length > 0;
  const wrapperParameters = [factoryVariable];
  if (iifeNeedsGlobal) {
    wrapperParameters.unshift(globalVariable);
  }
  const globalArgument = iifeNeedsGlobal ? `this,${_}` : "";
  const iifeStart = iifeNeedsGlobal ? `(${globalVariable}${_}=${_}typeof globalThis${_}!==${_}'undefined'${_}?${_}globalThis${_}:${_}${globalVariable}${_}||${_}self,${_}` : "";
  const iifeEnd = iifeNeedsGlobal ? ")" : "";
  const cjsIntro = iifeNeedsGlobal ? `${t}typeof exports${_}===${_}'object'${_}&&${_}typeof module${_}!==${_}'undefined'${_}?${_}${cjsExport}${factoryVariable}(${cjsDeps.join(`,${_}`)})${_}:${n2}` : "";
  const wrapperIntro = `(${getNonArrowFunctionIntro(wrapperParameters, { isAsync: false, name: null })}{${n2}` + cjsIntro + `${t}typeof ${define}${_}===${_}'function'${_}&&${_}${define}.amd${_}?${_}${define}(${amdParameters}${factoryVariable})${_}:${n2}${t}${iifeStart}${iifeExport}${iifeEnd};${n2}})(${globalArgument}(${getNonArrowFunctionIntro(factoryParameters, {
    isAsync: false,
    name: null
  })}{${useStrict}${n2}`;
  const wrapperOutro = n2 + n2 + "}));";
  magicString.prepend(`${intro}${getInteropBlock(dependencies, interop, externalLiveBindings, freeze, symbols, accessedGlobals, t, snippets)}`);
  const exportBlock = getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings, reexportProtoFromExternal);
  let namespaceMarkers = getNamespaceMarkers(namedExportsMode && hasExports, esModule === true || esModule === "if-default-prop" && hasDefaultExport, symbols, snippets);
  if (namespaceMarkers) {
    namespaceMarkers = n2 + n2 + namespaceMarkers;
  }
  magicString.append(`${exportBlock}${namespaceMarkers}${outro}`).trim().indent(t).append(wrapperOutro).prepend(wrapperIntro);
}
var finalisers = { amd, cjs, es, iife, system, umd };
var concatSeparator = (out, next) => next ? `${out}
${next}` : out;
var concatDblSeparator = (out, next) => next ? `${out}

${next}` : out;
async function createAddons(options, outputPluginDriver, chunk) {
  try {
    let [banner, footer, intro, outro] = await Promise.all([
      outputPluginDriver.hookReduceValue("banner", options.banner(chunk), [chunk], concatSeparator),
      outputPluginDriver.hookReduceValue("footer", options.footer(chunk), [chunk], concatSeparator),
      outputPluginDriver.hookReduceValue("intro", options.intro(chunk), [chunk], concatDblSeparator),
      outputPluginDriver.hookReduceValue("outro", options.outro(chunk), [chunk], concatDblSeparator)
    ]);
    if (intro)
      intro += "\n\n";
    if (outro)
      outro = `

${outro}`;
    if (banner)
      banner += "\n";
    if (footer)
      footer = "\n" + footer;
    return { banner, footer, intro, outro };
  } catch (error_) {
    return error(logAddonNotGenerated(error_.message, error_.hook, error_.plugin));
  }
}
var DECONFLICT_IMPORTED_VARIABLES_BY_FORMAT = {
  amd: deconflictImportsOther,
  cjs: deconflictImportsOther,
  es: deconflictImportsEsmOrSystem,
  iife: deconflictImportsOther,
  system: deconflictImportsEsmOrSystem,
  umd: deconflictImportsOther
};
function deconflictChunk(modules, dependenciesToBeDeconflicted, imports, usedNames, format, interop, preserveModules, externalLiveBindings, chunkByModule, externalChunkByModule, syntheticExports, exportNamesByVariable, accessedGlobalsByScope, includedNamespaces) {
  const reversedModules = [...modules].reverse();
  for (const module of reversedModules) {
    module.scope.addUsedOutsideNames(usedNames, format, exportNamesByVariable, accessedGlobalsByScope);
  }
  deconflictTopLevelVariables(usedNames, reversedModules, includedNamespaces);
  DECONFLICT_IMPORTED_VARIABLES_BY_FORMAT[format](usedNames, imports, dependenciesToBeDeconflicted, interop, preserveModules, externalLiveBindings, chunkByModule, externalChunkByModule, syntheticExports);
  for (const module of reversedModules) {
    module.scope.deconflict(format, exportNamesByVariable, accessedGlobalsByScope);
  }
}
function deconflictImportsEsmOrSystem(usedNames, imports, dependenciesToBeDeconflicted, _interop, preserveModules, _externalLiveBindings, chunkByModule, externalChunkByModule, syntheticExports) {
  for (const dependency of dependenciesToBeDeconflicted.dependencies) {
    if (preserveModules || dependency instanceof ExternalChunk) {
      dependency.variableName = getSafeName(dependency.suggestedVariableName, usedNames, null);
    }
  }
  for (const variable of imports) {
    const module = variable.module;
    const name = variable.name;
    if (variable.isNamespace && (preserveModules || module instanceof ExternalModule)) {
      variable.setRenderNames(null, (module instanceof ExternalModule ? externalChunkByModule.get(module) : chunkByModule.get(module)).variableName);
    } else if (module instanceof ExternalModule && name === "default") {
      variable.setRenderNames(null, getSafeName([...module.exportedVariables].some(([exportedVariable, exportedName]) => exportedName === "*" && exportedVariable.included) ? module.suggestedVariableName + "__default" : module.suggestedVariableName, usedNames, variable.forbiddenNames));
    } else {
      variable.setRenderNames(null, getSafeName(makeLegal(name), usedNames, variable.forbiddenNames));
    }
  }
  for (const variable of syntheticExports) {
    variable.setRenderNames(null, getSafeName(variable.name, usedNames, variable.forbiddenNames));
  }
}
function deconflictImportsOther(usedNames, imports, { deconflictedDefault, deconflictedNamespace, dependencies }, interop, preserveModules, externalLiveBindings, chunkByModule, externalChunkByModule) {
  for (const chunk of dependencies) {
    chunk.variableName = getSafeName(chunk.suggestedVariableName, usedNames, null);
  }
  for (const chunk of deconflictedNamespace) {
    chunk.namespaceVariableName = getSafeName(`${chunk.suggestedVariableName}__namespace`, usedNames, null);
  }
  for (const externalModule of deconflictedDefault) {
    externalModule.defaultVariableName = deconflictedNamespace.has(externalModule) && canDefaultBeTakenFromNamespace(interop(externalModule.id), externalLiveBindings) ? externalModule.namespaceVariableName : getSafeName(`${externalModule.suggestedVariableName}__default`, usedNames, null);
  }
  for (const variable of imports) {
    const module = variable.module;
    if (module instanceof ExternalModule) {
      const chunk = externalChunkByModule.get(module);
      const name = variable.name;
      if (name === "default") {
        const moduleInterop = interop(module.id);
        const variableName = defaultInteropHelpersByInteropType[moduleInterop] ? chunk.defaultVariableName : chunk.variableName;
        if (isDefaultAProperty(moduleInterop, externalLiveBindings)) {
          variable.setRenderNames(variableName, "default");
        } else {
          variable.setRenderNames(null, variableName);
        }
      } else if (name === "*") {
        variable.setRenderNames(null, namespaceInteropHelpersByInteropType[interop(module.id)] ? chunk.namespaceVariableName : chunk.variableName);
      } else {
        variable.setRenderNames(chunk.variableName, null);
      }
    } else {
      const chunk = chunkByModule.get(module);
      if (preserveModules && variable.isNamespace) {
        variable.setRenderNames(null, chunk.exportMode === "default" ? chunk.namespaceVariableName : chunk.variableName);
      } else if (chunk.exportMode === "default") {
        variable.setRenderNames(null, chunk.variableName);
      } else {
        variable.setRenderNames(chunk.variableName, chunk.getVariableExportName(variable));
      }
    }
  }
}
function deconflictTopLevelVariables(usedNames, modules, includedNamespaces) {
  for (const module of modules) {
    for (const variable of module.scope.variables.values()) {
      if (variable.included && // this will only happen for exports in some formats
      !(variable.renderBaseName || variable instanceof ExportDefaultVariable && variable.getOriginalVariable() !== variable)) {
        variable.setRenderNames(null, getSafeName(variable.name, usedNames, variable.forbiddenNames));
      }
    }
    if (includedNamespaces.has(module)) {
      const namespace = module.namespace;
      namespace.setRenderNames(null, getSafeName(namespace.name, usedNames, namespace.forbiddenNames));
    }
  }
}
function assignExportsToMangledNames(exports, exportsByName, exportNamesByVariable) {
  let nameIndex = 0;
  for (const variable of exports) {
    let [exportName] = variable.name;
    if (exportsByName.has(exportName)) {
      do {
        exportName = toBase64(++nameIndex);
        if (exportName.charCodeAt(0) === 49) {
          nameIndex += 9 * 64 ** (exportName.length - 1);
          exportName = toBase64(nameIndex);
        }
      } while (RESERVED_NAMES.has(exportName) || exportsByName.has(exportName));
    }
    exportsByName.set(exportName, variable);
    exportNamesByVariable.set(variable, [exportName]);
  }
}
function assignExportsToNames(exports, exportsByName, exportNamesByVariable) {
  for (const variable of exports) {
    let nameIndex = 0;
    let exportName = variable.name;
    while (exportsByName.has(exportName)) {
      exportName = variable.name + "$" + ++nameIndex;
    }
    exportsByName.set(exportName, variable);
    exportNamesByVariable.set(variable, [exportName]);
  }
}
function getExportMode(chunk, { exports: exportMode, name, format }, facadeModuleId, log) {
  const exportKeys = chunk.getExportNames();
  if (exportMode === "default") {
    if (exportKeys.length !== 1 || exportKeys[0] !== "default") {
      return error(logIncompatibleExportOptionValue("default", exportKeys, facadeModuleId));
    }
  } else if (exportMode === "none" && exportKeys.length > 0) {
    return error(logIncompatibleExportOptionValue("none", exportKeys, facadeModuleId));
  }
  if (exportMode === "auto") {
    if (exportKeys.length === 0) {
      exportMode = "none";
    } else if (exportKeys.length === 1 && exportKeys[0] === "default") {
      exportMode = "default";
    } else {
      if (format !== "es" && format !== "system" && exportKeys.includes("default")) {
        log(LOGLEVEL_WARN, logMixedExport(facadeModuleId, name));
      }
      exportMode = "named";
    }
  }
  return exportMode;
}
function guessIndentString(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  const min = spaced.reduce((previous, current) => {
    const numberSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numberSpaces, previous);
  }, Infinity);
  return " ".repeat(min);
}
function getIndentString(modules, options) {
  if (options.indent !== true)
    return options.indent;
  for (const module of modules) {
    const indent = guessIndentString(module.originalCode);
    if (indent !== null)
      return indent;
  }
  return "	";
}
function getStaticDependencies(chunk, orderedModules, chunkByModule, externalChunkByModule) {
  const staticDependencyBlocks = [];
  const handledDependencies = /* @__PURE__ */ new Set();
  for (let modulePos = orderedModules.length - 1; modulePos >= 0; modulePos--) {
    const module = orderedModules[modulePos];
    if (!handledDependencies.has(module)) {
      const staticDependencies = [];
      addStaticDependencies(module, staticDependencies, handledDependencies, chunk, chunkByModule, externalChunkByModule);
      staticDependencyBlocks.unshift(staticDependencies);
    }
  }
  const dependencies = /* @__PURE__ */ new Set();
  for (const block of staticDependencyBlocks) {
    for (const dependency of block) {
      dependencies.add(dependency);
    }
  }
  return dependencies;
}
function addStaticDependencies(module, staticDependencies, handledModules, chunk, chunkByModule, externalChunkByModule) {
  const dependencies = module.getDependenciesToBeIncluded();
  for (const dependency of dependencies) {
    if (dependency instanceof ExternalModule) {
      staticDependencies.push(externalChunkByModule.get(dependency));
      continue;
    }
    const dependencyChunk = chunkByModule.get(dependency);
    if (dependencyChunk !== chunk) {
      staticDependencies.push(dependencyChunk);
      continue;
    }
    if (!handledModules.has(dependency)) {
      handledModules.add(dependency);
      addStaticDependencies(dependency, staticDependencies, handledModules, chunk, chunkByModule, externalChunkByModule);
    }
  }
}
var hashPlaceholderLeft = "!~{";
var hashPlaceholderRight = "}~";
var hashPlaceholderOverhead = hashPlaceholderLeft.length + hashPlaceholderRight.length;
var MAX_HASH_SIZE = 22;
var DEFAULT_HASH_SIZE = 8;
var getHashPlaceholderGenerator = () => {
  let nextIndex = 0;
  return (optionName, hashSize) => {
    if (hashSize > MAX_HASH_SIZE) {
      return error(logFailedValidation(`Hashes cannot be longer than ${MAX_HASH_SIZE} characters, received ${hashSize}. Check the "${optionName}" option.`));
    }
    const placeholder = `${hashPlaceholderLeft}${toBase64(++nextIndex).padStart(hashSize - hashPlaceholderOverhead, "0")}${hashPlaceholderRight}`;
    if (placeholder.length > hashSize) {
      return error(logFailedValidation(`To generate hashes for this number of chunks (currently ${nextIndex}), you need a minimum hash size of ${placeholder.length}, received ${hashSize}. Check the "${optionName}" option.`));
    }
    return placeholder;
  };
};
var REPLACER_REGEX = new RegExp(`${hashPlaceholderLeft}[0-9a-zA-Z_$]{1,${MAX_HASH_SIZE - hashPlaceholderOverhead}}${hashPlaceholderRight}`, "g");
var replacePlaceholders = (code, hashesByPlaceholder) => code.replace(REPLACER_REGEX, (placeholder) => hashesByPlaceholder.get(placeholder) || placeholder);
var replaceSinglePlaceholder = (code, placeholder, value) => code.replace(REPLACER_REGEX, (match) => match === placeholder ? value : match);
var replacePlaceholdersWithDefaultAndGetContainedPlaceholders = (code, placeholders) => {
  const containedPlaceholders = /* @__PURE__ */ new Set();
  const transformedCode = code.replace(REPLACER_REGEX, (placeholder) => {
    if (placeholders.has(placeholder)) {
      containedPlaceholders.add(placeholder);
      return `${hashPlaceholderLeft}${"0".repeat(placeholder.length - hashPlaceholderOverhead)}${hashPlaceholderRight}`;
    }
    return placeholder;
  });
  return { containedPlaceholders, transformedCode };
};
var lowercaseBundleKeys = Symbol("bundleKeys");
var FILE_PLACEHOLDER = {
  type: "placeholder"
};
var getOutputBundle = (outputBundleBase) => {
  const reservedLowercaseBundleKeys = /* @__PURE__ */ new Set();
  return new Proxy(outputBundleBase, {
    deleteProperty(target, key) {
      if (typeof key === "string") {
        reservedLowercaseBundleKeys.delete(key.toLowerCase());
      }
      return Reflect.deleteProperty(target, key);
    },
    get(target, key) {
      if (key === lowercaseBundleKeys) {
        return reservedLowercaseBundleKeys;
      }
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      if (typeof key === "string") {
        reservedLowercaseBundleKeys.add(key.toLowerCase());
      }
      return Reflect.set(target, key, value);
    }
  });
};
var removeUnreferencedAssets = (outputBundle) => {
  const unreferencedAssets = /* @__PURE__ */ new Set();
  const bundleEntries = Object.values(outputBundle);
  for (const asset of bundleEntries) {
    asset.type === "asset" && asset.needsCodeReference && unreferencedAssets.add(asset.fileName);
  }
  for (const chunk of bundleEntries) {
    if (chunk.type === "chunk") {
      for (const referencedFile of chunk.referencedFiles) {
        unreferencedAssets.has(referencedFile) && unreferencedAssets.delete(referencedFile);
      }
    }
  }
  for (const file of unreferencedAssets) {
    delete outputBundle[file];
  }
};
function renderNamePattern(pattern, patternName, replacements) {
  if (isPathFragment(pattern))
    return error(logFailedValidation(`Invalid pattern "${pattern}" for "${patternName}", patterns can be neither absolute nor relative paths. If you want your files to be stored in a subdirectory, write its name without a leading slash like this: subdirectory/pattern.`));
  return pattern.replace(/\[(\w+)(:\d+)?]/g, (_match, type, size) => {
    if (!replacements.hasOwnProperty(type) || size && type !== "hash") {
      return error(logFailedValidation(`"[${type}${size || ""}]" is not a valid placeholder in the "${patternName}" pattern.`));
    }
    const replacement = replacements[type](size && Number.parseInt(size.slice(1)));
    if (isPathFragment(replacement))
      return error(logFailedValidation(`Invalid substitution "${replacement}" for placeholder "[${type}]" in "${patternName}" pattern, can be neither absolute nor relative path.`));
    return replacement;
  });
}
function makeUnique(name, { [lowercaseBundleKeys]: reservedLowercaseBundleKeys }) {
  if (!reservedLowercaseBundleKeys.has(name.toLowerCase()))
    return name;
  const extension = extname(name);
  name = name.slice(0, Math.max(0, name.length - extension.length));
  let uniqueName, uniqueIndex = 1;
  while (reservedLowercaseBundleKeys.has((uniqueName = name + ++uniqueIndex + extension).toLowerCase()))
    ;
  return uniqueName;
}
var NON_ASSET_EXTENSIONS = /* @__PURE__ */ new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".mts",
  ".cjs",
  ".cts"
]);
function getGlobalName(chunk, globals, hasExports, log) {
  const globalName = typeof globals === "function" ? globals(chunk.id) : globals[chunk.id];
  if (globalName) {
    return globalName;
  }
  if (hasExports) {
    log(LOGLEVEL_WARN, logMissingGlobalName(chunk.id, chunk.variableName));
    return chunk.variableName;
  }
}
var Chunk2 = class _Chunk {
  constructor(orderedModules, inputOptions, outputOptions, unsetOptions, pluginDriver, modulesById, chunkByModule, externalChunkByModule, facadeChunkByModule, includedNamespaces, manualChunkAlias, getPlaceholder, bundle, inputBase, snippets) {
    this.orderedModules = orderedModules;
    this.inputOptions = inputOptions;
    this.outputOptions = outputOptions;
    this.unsetOptions = unsetOptions;
    this.pluginDriver = pluginDriver;
    this.modulesById = modulesById;
    this.chunkByModule = chunkByModule;
    this.externalChunkByModule = externalChunkByModule;
    this.facadeChunkByModule = facadeChunkByModule;
    this.includedNamespaces = includedNamespaces;
    this.manualChunkAlias = manualChunkAlias;
    this.getPlaceholder = getPlaceholder;
    this.bundle = bundle;
    this.inputBase = inputBase;
    this.snippets = snippets;
    this.entryModules = [];
    this.exportMode = "named";
    this.facadeModule = null;
    this.namespaceVariableName = "";
    this.variableName = "";
    this.accessedGlobalsByScope = /* @__PURE__ */ new Map();
    this.dependencies = /* @__PURE__ */ new Set();
    this.dynamicEntryModules = [];
    this.dynamicName = null;
    this.exportNamesByVariable = /* @__PURE__ */ new Map();
    this.exports = /* @__PURE__ */ new Set();
    this.exportsByName = /* @__PURE__ */ new Map();
    this.fileName = null;
    this.implicitEntryModules = [];
    this.implicitlyLoadedBefore = /* @__PURE__ */ new Set();
    this.imports = /* @__PURE__ */ new Set();
    this.includedDynamicImports = null;
    this.includedReexportsByModule = /* @__PURE__ */ new Map();
    this.isEmpty = true;
    this.name = null;
    this.needsExportsShim = false;
    this.preRenderedChunkInfo = null;
    this.preliminaryFileName = null;
    this.preliminarySourcemapFileName = null;
    this.renderedChunkInfo = null;
    this.renderedDependencies = null;
    this.renderedModules = /* @__PURE__ */ Object.create(null);
    this.sortedExportNames = null;
    this.strictFacade = false;
    this.execIndex = orderedModules.length > 0 ? orderedModules[0].execIndex : Infinity;
    const chunkModules = new Set(orderedModules);
    for (const module of orderedModules) {
      chunkByModule.set(module, this);
      if (module.namespace.included && !outputOptions.preserveModules) {
        includedNamespaces.add(module);
      }
      if (this.isEmpty && module.isIncluded()) {
        this.isEmpty = false;
      }
      if (module.info.isEntry || outputOptions.preserveModules) {
        this.entryModules.push(module);
      }
      for (const importer of module.includedDynamicImporters) {
        if (!chunkModules.has(importer)) {
          this.dynamicEntryModules.push(module);
          if (module.info.syntheticNamedExports) {
            includedNamespaces.add(module);
            this.exports.add(module.namespace);
          }
        }
      }
      if (module.implicitlyLoadedAfter.size > 0) {
        this.implicitEntryModules.push(module);
      }
    }
    this.suggestedVariableName = makeLegal(this.generateVariableName());
  }
  static generateFacade(inputOptions, outputOptions, unsetOptions, pluginDriver, modulesById, chunkByModule, externalChunkByModule, facadeChunkByModule, includedNamespaces, facadedModule, facadeName, getPlaceholder, bundle, inputBase, snippets) {
    const chunk = new _Chunk([], inputOptions, outputOptions, unsetOptions, pluginDriver, modulesById, chunkByModule, externalChunkByModule, facadeChunkByModule, includedNamespaces, null, getPlaceholder, bundle, inputBase, snippets);
    chunk.assignFacadeName(facadeName, facadedModule);
    if (!facadeChunkByModule.has(facadedModule)) {
      facadeChunkByModule.set(facadedModule, chunk);
    }
    for (const dependency of facadedModule.getDependenciesToBeIncluded()) {
      chunk.dependencies.add(dependency instanceof Module ? chunkByModule.get(dependency) : externalChunkByModule.get(dependency));
    }
    if (!chunk.dependencies.has(chunkByModule.get(facadedModule)) && facadedModule.info.moduleSideEffects && facadedModule.hasEffects()) {
      chunk.dependencies.add(chunkByModule.get(facadedModule));
    }
    chunk.ensureReexportsAreAvailableForModule(facadedModule);
    chunk.facadeModule = facadedModule;
    chunk.strictFacade = true;
    return chunk;
  }
  canModuleBeFacade(module, exposedVariables) {
    const moduleExportNamesByVariable = module.getExportNamesByVariable();
    for (const exposedVariable of this.exports) {
      if (!moduleExportNamesByVariable.has(exposedVariable)) {
        return false;
      }
    }
    for (const exposedVariable of exposedVariables) {
      if (!(exposedVariable.module === module || moduleExportNamesByVariable.has(exposedVariable) || exposedVariable instanceof SyntheticNamedExportVariable && moduleExportNamesByVariable.has(exposedVariable.getBaseVariable()))) {
        return false;
      }
    }
    return true;
  }
  finalizeChunk(code, map, sourcemapFileName, hashesByPlaceholder) {
    const renderedChunkInfo = this.getRenderedChunkInfo();
    const finalize = (code2) => replacePlaceholders(code2, hashesByPlaceholder);
    const preliminaryFileName = renderedChunkInfo.fileName;
    const fileName = this.fileName = finalize(preliminaryFileName);
    return {
      ...renderedChunkInfo,
      code,
      dynamicImports: renderedChunkInfo.dynamicImports.map(finalize),
      fileName,
      implicitlyLoadedBefore: renderedChunkInfo.implicitlyLoadedBefore.map(finalize),
      importedBindings: Object.fromEntries(Object.entries(renderedChunkInfo.importedBindings).map(([fileName2, bindings]) => [
        finalize(fileName2),
        bindings
      ])),
      imports: renderedChunkInfo.imports.map(finalize),
      map,
      preliminaryFileName,
      referencedFiles: renderedChunkInfo.referencedFiles.map(finalize),
      sourcemapFileName
    };
  }
  generateExports() {
    this.sortedExportNames = null;
    const remainingExports = new Set(this.exports);
    if (this.facadeModule !== null && (this.facadeModule.preserveSignature !== false || this.strictFacade)) {
      const exportNamesByVariable = this.facadeModule.getExportNamesByVariable();
      for (const [variable, exportNames] of exportNamesByVariable) {
        this.exportNamesByVariable.set(variable, [...exportNames]);
        for (const exportName of exportNames) {
          this.exportsByName.set(exportName, variable);
        }
        remainingExports.delete(variable);
      }
    }
    if (this.outputOptions.minifyInternalExports) {
      assignExportsToMangledNames(remainingExports, this.exportsByName, this.exportNamesByVariable);
    } else {
      assignExportsToNames(remainingExports, this.exportsByName, this.exportNamesByVariable);
    }
    if (this.outputOptions.preserveModules || this.facadeModule && this.facadeModule.info.isEntry)
      this.exportMode = getExportMode(this, this.outputOptions, this.facadeModule.id, this.inputOptions.onLog);
  }
  generateFacades() {
    const facades = [];
    const entryModules = /* @__PURE__ */ new Set([...this.entryModules, ...this.implicitEntryModules]);
    const exposedVariables = new Set(this.dynamicEntryModules.map(({ namespace }) => namespace));
    for (const module of entryModules) {
      if (module.preserveSignature) {
        for (const exportedVariable of module.getExportNamesByVariable().keys()) {
          if (this.chunkByModule.get(exportedVariable.module) === this) {
            exposedVariables.add(exportedVariable);
          }
        }
      }
    }
    for (const module of entryModules) {
      const requiredFacades = Array.from(
        new Set(module.chunkNames.filter(({ isUserDefined }) => isUserDefined).map(({ name }) => name)),
        // mapping must run after Set 'name' dedupe
        (name) => ({
          name
        })
      );
      if (requiredFacades.length === 0 && module.isUserDefinedEntryPoint) {
        requiredFacades.push({});
      }
      requiredFacades.push(...Array.from(module.chunkFileNames, (fileName) => ({ fileName })));
      if (requiredFacades.length === 0) {
        requiredFacades.push({});
      }
      if (!this.facadeModule) {
        const needsStrictFacade = !this.outputOptions.preserveModules && (module.preserveSignature === "strict" || module.preserveSignature === "exports-only" && module.getExportNamesByVariable().size > 0);
        if (!needsStrictFacade || this.canModuleBeFacade(module, exposedVariables)) {
          this.facadeModule = module;
          this.facadeChunkByModule.set(module, this);
          if (module.preserveSignature) {
            this.strictFacade = needsStrictFacade;
          }
          this.assignFacadeName(requiredFacades.shift(), module, this.outputOptions.preserveModules);
        }
      }
      for (const facadeName of requiredFacades) {
        facades.push(_Chunk.generateFacade(this.inputOptions, this.outputOptions, this.unsetOptions, this.pluginDriver, this.modulesById, this.chunkByModule, this.externalChunkByModule, this.facadeChunkByModule, this.includedNamespaces, module, facadeName, this.getPlaceholder, this.bundle, this.inputBase, this.snippets));
      }
    }
    for (const module of this.dynamicEntryModules) {
      if (module.info.syntheticNamedExports)
        continue;
      if (!this.facadeModule && this.canModuleBeFacade(module, exposedVariables)) {
        this.facadeModule = module;
        this.facadeChunkByModule.set(module, this);
        this.strictFacade = true;
        this.dynamicName = getChunkNameFromModule(module);
      } else if (this.facadeModule === module && !this.strictFacade && this.canModuleBeFacade(module, exposedVariables)) {
        this.strictFacade = true;
      } else if (!this.facadeChunkByModule.get(module)?.strictFacade) {
        this.includedNamespaces.add(module);
        this.exports.add(module.namespace);
      }
    }
    if (!this.outputOptions.preserveModules) {
      this.addNecessaryImportsForFacades();
    }
    return facades;
  }
  getChunkName() {
    return this.name ??= this.outputOptions.sanitizeFileName(this.getFallbackChunkName());
  }
  getExportNames() {
    return this.sortedExportNames ??= [...this.exportsByName.keys()].sort();
  }
  getFileName() {
    return this.fileName || this.getPreliminaryFileName().fileName;
  }
  getImportPath(importer) {
    return escapeId(getImportPath(importer, this.getFileName(), this.outputOptions.format === "amd" && !this.outputOptions.amd.forceJsExtensionForImports, true));
  }
  getPreliminaryFileName() {
    if (this.preliminaryFileName) {
      return this.preliminaryFileName;
    }
    let fileName;
    let hashPlaceholder = null;
    const { chunkFileNames, entryFileNames, file, format, preserveModules } = this.outputOptions;
    if (file) {
      fileName = basename(file);
    } else if (this.fileName === null) {
      const [pattern, patternName] = preserveModules || this.facadeModule?.isUserDefinedEntryPoint ? [entryFileNames, "output.entryFileNames"] : [chunkFileNames, "output.chunkFileNames"];
      fileName = renderNamePattern(typeof pattern === "function" ? pattern(this.getPreRenderedChunkInfo()) : pattern, patternName, {
        format: () => format,
        hash: (size) => hashPlaceholder || (hashPlaceholder = this.getPlaceholder(patternName, size || DEFAULT_HASH_SIZE)),
        name: () => this.getChunkName()
      });
      if (!hashPlaceholder) {
        fileName = makeUnique(fileName, this.bundle);
      }
    } else {
      fileName = this.fileName;
    }
    if (!hashPlaceholder) {
      this.bundle[fileName] = FILE_PLACEHOLDER;
    }
    return this.preliminaryFileName = { fileName, hashPlaceholder };
  }
  getPreliminarySourcemapFileName() {
    if (this.preliminarySourcemapFileName) {
      return this.preliminarySourcemapFileName;
    }
    let sourcemapFileName = null;
    let hashPlaceholder = null;
    const { sourcemapFileNames, format } = this.outputOptions;
    if (sourcemapFileNames) {
      const [pattern, patternName] = [sourcemapFileNames, "output.sourcemapFileNames"];
      sourcemapFileName = renderNamePattern(typeof pattern === "function" ? pattern(this.getPreRenderedChunkInfo()) : pattern, patternName, {
        chunkhash: () => this.getPreliminaryFileName().hashPlaceholder || "",
        format: () => format,
        hash: (size) => hashPlaceholder || (hashPlaceholder = this.getPlaceholder(patternName, size || DEFAULT_HASH_SIZE)),
        name: () => this.getChunkName()
      });
      if (!hashPlaceholder) {
        sourcemapFileName = makeUnique(sourcemapFileName, this.bundle);
      }
    } else {
      return null;
    }
    return this.preliminarySourcemapFileName = { fileName: sourcemapFileName, hashPlaceholder };
  }
  getRenderedChunkInfo() {
    if (this.renderedChunkInfo) {
      return this.renderedChunkInfo;
    }
    return this.renderedChunkInfo = {
      ...this.getPreRenderedChunkInfo(),
      dynamicImports: this.getDynamicDependencies().map(resolveFileName),
      fileName: this.getFileName(),
      // eslint-disable-next-line unicorn/prefer-spread
      implicitlyLoadedBefore: Array.from(this.implicitlyLoadedBefore, resolveFileName),
      importedBindings: getImportedBindingsPerDependency(this.getRenderedDependencies(), resolveFileName),
      // eslint-disable-next-line unicorn/prefer-spread
      imports: Array.from(this.dependencies, resolveFileName),
      modules: this.renderedModules,
      referencedFiles: this.getReferencedFiles()
    };
  }
  getVariableExportName(variable) {
    if (this.outputOptions.preserveModules && variable instanceof NamespaceVariable) {
      return "*";
    }
    return this.exportNamesByVariable.get(variable)[0];
  }
  link() {
    this.dependencies = getStaticDependencies(this, this.orderedModules, this.chunkByModule, this.externalChunkByModule);
    for (const module of this.orderedModules) {
      this.addImplicitlyLoadedBeforeFromModule(module);
      this.setUpChunkImportsAndExportsForModule(module);
    }
  }
  async render() {
    const { dependencies, exportMode, facadeModule, inputOptions: { onLog }, outputOptions, pluginDriver, snippets } = this;
    const { format, hoistTransitiveImports, preserveModules } = outputOptions;
    if (hoistTransitiveImports && !preserveModules && facadeModule !== null) {
      for (const dep of dependencies) {
        if (dep instanceof _Chunk)
          this.inlineChunkDependencies(dep);
      }
    }
    const preliminaryFileName = this.getPreliminaryFileName();
    const preliminarySourcemapFileName = this.getPreliminarySourcemapFileName();
    const { accessedGlobals, indent, magicString, renderedSource, usedModules, usesTopLevelAwait } = this.renderModules(preliminaryFileName.fileName);
    const renderedDependencies = [...this.getRenderedDependencies().values()];
    const renderedExports = exportMode === "none" ? [] : this.getChunkExportDeclarations(format);
    let hasExports = renderedExports.length > 0;
    let hasDefaultExport = false;
    for (const renderedDependence of renderedDependencies) {
      const { reexports } = renderedDependence;
      if (reexports?.length) {
        hasExports = true;
        if (!hasDefaultExport && reexports.some((reexport) => reexport.reexported === "default")) {
          hasDefaultExport = true;
        }
        if (format === "es") {
          renderedDependence.reexports = reexports.filter(
            // eslint-disable-next-line unicorn/prefer-array-some
            ({ reexported }) => !renderedExports.find(({ exported }) => exported === reexported)
          );
        }
      }
    }
    if (!hasDefaultExport) {
      for (const { exported } of renderedExports) {
        if (exported === "default") {
          hasDefaultExport = true;
          break;
        }
      }
    }
    const { intro, outro, banner, footer } = await createAddons(outputOptions, pluginDriver, this.getRenderedChunkInfo());
    finalisers[format](renderedSource, {
      accessedGlobals,
      dependencies: renderedDependencies,
      exports: renderedExports,
      hasDefaultExport,
      hasExports,
      id: preliminaryFileName.fileName,
      indent,
      intro,
      isEntryFacade: preserveModules || facadeModule !== null && facadeModule.info.isEntry,
      isModuleFacade: facadeModule !== null,
      log: onLog,
      namedExportsMode: exportMode !== "default",
      outro,
      snippets,
      usesTopLevelAwait
    }, outputOptions);
    if (banner)
      magicString.prepend(banner);
    if (format === "es" || format === "cjs") {
      const shebang = facadeModule !== null && facadeModule.info.isEntry && facadeModule.shebang;
      shebang && magicString.prepend(`#!${shebang}
`);
    }
    if (footer)
      magicString.append(footer);
    return {
      chunk: this,
      magicString,
      preliminaryFileName,
      preliminarySourcemapFileName,
      usedModules
    };
  }
  addImplicitlyLoadedBeforeFromModule(baseModule) {
    const { chunkByModule, implicitlyLoadedBefore } = this;
    for (const module of baseModule.implicitlyLoadedBefore) {
      const chunk = chunkByModule.get(module);
      if (chunk && chunk !== this) {
        implicitlyLoadedBefore.add(chunk);
      }
    }
  }
  addNecessaryImportsForFacades() {
    for (const [module, variables] of this.includedReexportsByModule) {
      if (this.includedNamespaces.has(module)) {
        for (const variable of variables) {
          this.imports.add(variable);
        }
      }
    }
  }
  assignFacadeName({ fileName, name }, facadedModule, preservePath) {
    if (fileName) {
      this.fileName = fileName;
    } else {
      this.name = this.outputOptions.sanitizeFileName(name || (preservePath ? this.getPreserveModulesChunkNameFromModule(facadedModule) : getChunkNameFromModule(facadedModule)));
    }
  }
  checkCircularDependencyImport(variable, importingModule) {
    const variableModule = variable.module;
    if (variableModule instanceof Module) {
      const exportChunk = this.chunkByModule.get(variableModule);
      let alternativeReexportModule;
      do {
        alternativeReexportModule = importingModule.alternativeReexportModules.get(variable);
        if (alternativeReexportModule) {
          const exportingChunk = this.chunkByModule.get(alternativeReexportModule);
          if (exportingChunk !== exportChunk) {
            this.inputOptions.onLog(LOGLEVEL_WARN, logCyclicCrossChunkReexport(
              // Namespaces do not have an export name
              variableModule.getExportNamesByVariable().get(variable)?.[0] || "*",
              variableModule.id,
              alternativeReexportModule.id,
              importingModule.id,
              this.outputOptions.preserveModules
            ));
          }
          importingModule = alternativeReexportModule;
        }
      } while (alternativeReexportModule);
    }
  }
  ensureReexportsAreAvailableForModule(module) {
    const includedReexports = [];
    const map = module.getExportNamesByVariable();
    for (const exportedVariable of map.keys()) {
      const isSynthetic = exportedVariable instanceof SyntheticNamedExportVariable;
      const importedVariable = isSynthetic ? exportedVariable.getBaseVariable() : exportedVariable;
      this.checkCircularDependencyImport(importedVariable, module);
      if (!(importedVariable instanceof NamespaceVariable && this.outputOptions.preserveModules)) {
        const exportingModule = importedVariable.module;
        if (exportingModule instanceof Module) {
          const chunk = this.chunkByModule.get(exportingModule);
          if (chunk && chunk !== this) {
            chunk.exports.add(importedVariable);
            includedReexports.push(importedVariable);
            if (isSynthetic) {
              this.imports.add(importedVariable);
            }
          }
        }
      }
    }
    if (includedReexports.length > 0) {
      this.includedReexportsByModule.set(module, includedReexports);
    }
  }
  generateVariableName() {
    if (this.manualChunkAlias) {
      return this.manualChunkAlias;
    }
    const moduleForNaming = this.entryModules[0] || this.implicitEntryModules[0] || this.dynamicEntryModules[0] || this.orderedModules[this.orderedModules.length - 1];
    if (moduleForNaming) {
      return getChunkNameFromModule(moduleForNaming);
    }
    return "chunk";
  }
  getChunkExportDeclarations(format) {
    const exports = [];
    for (const exportName of this.getExportNames()) {
      if (exportName[0] === "*")
        continue;
      const variable = this.exportsByName.get(exportName);
      if (!(variable instanceof SyntheticNamedExportVariable)) {
        const module = variable.module;
        if (module) {
          const chunk = this.chunkByModule.get(module);
          if (chunk !== this) {
            if (!chunk || format !== "es") {
              continue;
            }
            const chunkDep = this.renderedDependencies.get(chunk);
            if (!chunkDep) {
              continue;
            }
            const { imports, reexports } = chunkDep;
            const importedByReexported = reexports?.find(({ reexported }) => reexported === exportName);
            const isImported = imports?.find(({ imported }) => imported === importedByReexported?.imported);
            if (!isImported) {
              continue;
            }
          }
        }
      }
      let expression = null;
      let hoisted = false;
      let local = variable.getName(this.snippets.getPropertyAccess);
      if (variable instanceof LocalVariable) {
        for (const declaration of variable.declarations) {
          if (declaration.parent instanceof FunctionDeclaration || declaration instanceof ExportDefaultDeclaration && declaration.declaration instanceof FunctionDeclaration) {
            hoisted = true;
            break;
          }
        }
      } else if (variable instanceof SyntheticNamedExportVariable) {
        expression = local;
        if (format === "es") {
          local = variable.renderName;
        }
      }
      exports.push({
        exported: exportName,
        expression,
        hoisted,
        local
      });
    }
    return exports;
  }
  getDependenciesToBeDeconflicted(addNonNamespacesAndInteropHelpers, addDependenciesWithoutBindings, interop) {
    const dependencies = /* @__PURE__ */ new Set();
    const deconflictedDefault = /* @__PURE__ */ new Set();
    const deconflictedNamespace = /* @__PURE__ */ new Set();
    for (const variable of [...this.exportNamesByVariable.keys(), ...this.imports]) {
      if (addNonNamespacesAndInteropHelpers || variable.isNamespace) {
        const module = variable.module;
        if (module instanceof ExternalModule) {
          const chunk = this.externalChunkByModule.get(module);
          dependencies.add(chunk);
          if (addNonNamespacesAndInteropHelpers) {
            if (variable.name === "default") {
              if (defaultInteropHelpersByInteropType[interop(module.id)]) {
                deconflictedDefault.add(chunk);
              }
            } else if (variable.name === "*" && namespaceInteropHelpersByInteropType[interop(module.id)]) {
              deconflictedNamespace.add(chunk);
            }
          }
        } else {
          const chunk = this.chunkByModule.get(module);
          if (chunk !== this) {
            dependencies.add(chunk);
            if (addNonNamespacesAndInteropHelpers && chunk.exportMode === "default" && variable.isNamespace) {
              deconflictedNamespace.add(chunk);
            }
          }
        }
      }
    }
    if (addDependenciesWithoutBindings) {
      for (const dependency of this.dependencies) {
        dependencies.add(dependency);
      }
    }
    return { deconflictedDefault, deconflictedNamespace, dependencies };
  }
  getDynamicDependencies() {
    return this.getIncludedDynamicImports().map((resolvedDynamicImport) => resolvedDynamicImport.facadeChunk || resolvedDynamicImport.chunk || resolvedDynamicImport.externalChunk || resolvedDynamicImport.resolution).filter((resolution) => resolution !== this && (resolution instanceof _Chunk || resolution instanceof ExternalChunk));
  }
  getDynamicImportStringAndAttributes(resolution, fileName) {
    if (resolution instanceof ExternalModule) {
      const chunk = this.externalChunkByModule.get(resolution);
      return [`'${chunk.getImportPath(fileName)}'`, chunk.getImportAttributes(this.snippets)];
    }
    return [
      resolution || "",
      this.outputOptions.format === "es" && this.outputOptions.externalImportAttributes || null
    ];
  }
  getFallbackChunkName() {
    if (this.manualChunkAlias) {
      return this.manualChunkAlias;
    }
    if (this.dynamicName) {
      return this.dynamicName;
    }
    if (this.fileName) {
      return getAliasName(this.fileName);
    }
    return getAliasName(this.orderedModules[this.orderedModules.length - 1].id);
  }
  getImportSpecifiers() {
    const { interop } = this.outputOptions;
    const importsByDependency = /* @__PURE__ */ new Map();
    for (const variable of this.imports) {
      const module = variable.module;
      let dependency;
      let imported;
      if (module instanceof ExternalModule) {
        dependency = this.externalChunkByModule.get(module);
        imported = variable.name;
        if (imported !== "default" && imported !== "*" && interop(module.id) === "defaultOnly") {
          return error(logUnexpectedNamedImport(module.id, imported, false));
        }
      } else {
        dependency = this.chunkByModule.get(module);
        imported = dependency.getVariableExportName(variable);
      }
      getOrCreate(importsByDependency, dependency, getNewArray).push({
        imported,
        local: variable.getName(this.snippets.getPropertyAccess)
      });
    }
    return importsByDependency;
  }
  getIncludedDynamicImports() {
    if (this.includedDynamicImports) {
      return this.includedDynamicImports;
    }
    const includedDynamicImports = [];
    for (const module of this.orderedModules) {
      for (const { node, resolution } of module.dynamicImports) {
        if (!node.included) {
          continue;
        }
        includedDynamicImports.push(resolution instanceof Module ? {
          chunk: this.chunkByModule.get(resolution),
          externalChunk: null,
          facadeChunk: this.facadeChunkByModule.get(resolution),
          node,
          resolution
        } : resolution instanceof ExternalModule ? {
          chunk: null,
          externalChunk: this.externalChunkByModule.get(resolution),
          facadeChunk: null,
          node,
          resolution
        } : { chunk: null, externalChunk: null, facadeChunk: null, node, resolution });
      }
    }
    return this.includedDynamicImports = includedDynamicImports;
  }
  getPreRenderedChunkInfo() {
    if (this.preRenderedChunkInfo) {
      return this.preRenderedChunkInfo;
    }
    const { dynamicEntryModules, facadeModule, implicitEntryModules, orderedModules } = this;
    return this.preRenderedChunkInfo = {
      exports: this.getExportNames(),
      facadeModuleId: facadeModule && facadeModule.id,
      isDynamicEntry: dynamicEntryModules.length > 0,
      isEntry: !!facadeModule?.info.isEntry,
      isImplicitEntry: implicitEntryModules.length > 0,
      moduleIds: orderedModules.map(({ id }) => id),
      name: this.getChunkName(),
      type: "chunk"
    };
  }
  getPreserveModulesChunkNameFromModule(module) {
    const predefinedChunkName = getPredefinedChunkNameFromModule(module);
    if (predefinedChunkName)
      return predefinedChunkName;
    const { preserveModulesRoot, sanitizeFileName: sanitizeFileName2 } = this.outputOptions;
    const sanitizedId = sanitizeFileName2(normalize(module.id.split(QUERY_HASH_REGEX, 1)[0]));
    const extensionName = extname(sanitizedId);
    const idWithoutExtension = NON_ASSET_EXTENSIONS.has(extensionName) ? sanitizedId.slice(0, -extensionName.length) : sanitizedId;
    if (isAbsolute(idWithoutExtension)) {
      return preserveModulesRoot && resolve$1(idWithoutExtension).startsWith(preserveModulesRoot) ? idWithoutExtension.slice(preserveModulesRoot.length).replace(/^[/\\]/, "") : relative(this.inputBase, idWithoutExtension);
    } else {
      return `_virtual/${basename(idWithoutExtension)}`;
    }
  }
  getReexportSpecifiers() {
    const { externalLiveBindings, interop } = this.outputOptions;
    const reexportSpecifiers = /* @__PURE__ */ new Map();
    for (let exportName of this.getExportNames()) {
      let dependency;
      let imported;
      let needsLiveBinding = false;
      if (exportName[0] === "*") {
        const id = exportName.slice(1);
        if (interop(id) === "defaultOnly") {
          this.inputOptions.onLog(LOGLEVEL_WARN, logUnexpectedNamespaceReexport(id));
        }
        needsLiveBinding = externalLiveBindings;
        dependency = this.externalChunkByModule.get(this.modulesById.get(id));
        imported = exportName = "*";
      } else {
        const variable = this.exportsByName.get(exportName);
        if (variable instanceof SyntheticNamedExportVariable)
          continue;
        const module = variable.module;
        if (module instanceof Module) {
          dependency = this.chunkByModule.get(module);
          if (dependency === this)
            continue;
          imported = dependency.getVariableExportName(variable);
          needsLiveBinding = variable.isReassigned;
        } else {
          dependency = this.externalChunkByModule.get(module);
          imported = variable.name;
          if (imported !== "default" && imported !== "*" && interop(module.id) === "defaultOnly") {
            return error(logUnexpectedNamedImport(module.id, imported, true));
          }
          needsLiveBinding = externalLiveBindings && (imported !== "default" || isDefaultAProperty(interop(module.id), true));
        }
      }
      getOrCreate(reexportSpecifiers, dependency, getNewArray).push({
        imported,
        needsLiveBinding,
        reexported: exportName
      });
    }
    return reexportSpecifiers;
  }
  getReferencedFiles() {
    const referencedFiles = /* @__PURE__ */ new Set();
    for (const module of this.orderedModules) {
      for (const meta of module.importMetas) {
        const fileName = meta.getReferencedFileName(this.pluginDriver);
        if (fileName) {
          referencedFiles.add(fileName);
        }
      }
    }
    return [...referencedFiles];
  }
  getRenderedDependencies() {
    if (this.renderedDependencies) {
      return this.renderedDependencies;
    }
    const importSpecifiers = this.getImportSpecifiers();
    const reexportSpecifiers = this.getReexportSpecifiers();
    const renderedDependencies = /* @__PURE__ */ new Map();
    const fileName = this.getFileName();
    for (const dep of this.dependencies) {
      const imports = importSpecifiers.get(dep) || null;
      const reexports = reexportSpecifiers.get(dep) || null;
      const namedExportsMode = dep instanceof ExternalChunk || dep.exportMode !== "default";
      const importPath = dep.getImportPath(fileName);
      renderedDependencies.set(dep, {
        attributes: dep instanceof ExternalChunk ? dep.getImportAttributes(this.snippets) : null,
        defaultVariableName: dep.defaultVariableName,
        globalName: dep instanceof ExternalChunk && (this.outputOptions.format === "umd" || this.outputOptions.format === "iife") && getGlobalName(dep, this.outputOptions.globals, (imports || reexports) !== null, this.inputOptions.onLog),
        importPath,
        imports,
        isChunk: dep instanceof _Chunk,
        name: dep.variableName,
        namedExportsMode,
        namespaceVariableName: dep.namespaceVariableName,
        reexports
      });
    }
    return this.renderedDependencies = renderedDependencies;
  }
  inlineChunkDependencies(chunk) {
    for (const dep of chunk.dependencies) {
      if (this.dependencies.has(dep))
        continue;
      this.dependencies.add(dep);
      if (dep instanceof _Chunk) {
        this.inlineChunkDependencies(dep);
      }
    }
  }
  // This method changes properties on the AST before rendering and must not be async
  renderModules(fileName) {
    const { accessedGlobalsByScope, dependencies, exportNamesByVariable, includedNamespaces, inputOptions: { onLog }, isEmpty, orderedModules, outputOptions, pluginDriver, renderedModules, snippets } = this;
    const { compact, format, freeze, generatedCode: { symbols } } = outputOptions;
    const { _, cnst, n: n2 } = snippets;
    this.setDynamicImportResolutions(fileName);
    this.setImportMetaResolutions(fileName);
    this.setIdentifierRenderResolutions();
    const magicString = new Bundle$1({ separator: `${n2}${n2}` });
    const indent = getIndentString(orderedModules, outputOptions);
    const usedModules = [];
    let hoistedSource = "";
    const accessedGlobals = /* @__PURE__ */ new Set();
    const renderedModuleSources = /* @__PURE__ */ new Map();
    const renderOptions = {
      accessedDocumentCurrentScript: false,
      exportNamesByVariable,
      format,
      freeze,
      indent,
      pluginDriver,
      snippets,
      symbols,
      useOriginalName: null
    };
    let usesTopLevelAwait = false;
    for (const module of orderedModules) {
      let renderedLength = 0;
      let source;
      if (module.isIncluded() || includedNamespaces.has(module)) {
        const rendered = module.render(renderOptions);
        if (!renderOptions.accessedDocumentCurrentScript && formatsMaybeAccessDocumentCurrentScript.includes(format)) {
          this.accessedGlobalsByScope.get(module.scope)?.delete(DOCUMENT_CURRENT_SCRIPT);
        }
        renderOptions.accessedDocumentCurrentScript = false;
        ({ source } = rendered);
        usesTopLevelAwait ||= rendered.usesTopLevelAwait;
        renderedLength = source.length();
        if (renderedLength) {
          if (compact && source.lastLine().includes("//"))
            source.append("\n");
          renderedModuleSources.set(module, source);
          magicString.addSource(source);
          usedModules.push(module);
        }
        const namespace = module.namespace;
        if (includedNamespaces.has(module)) {
          const rendered2 = namespace.renderBlock(renderOptions);
          if (namespace.renderFirst())
            hoistedSource += n2 + rendered2;
          else
            magicString.addSource(new MagicString(rendered2));
        }
        const accessedGlobalVariables = accessedGlobalsByScope.get(module.scope);
        if (accessedGlobalVariables) {
          for (const name of accessedGlobalVariables) {
            accessedGlobals.add(name);
          }
        }
      }
      const { renderedExports, removedExports } = module.getRenderedExports();
      renderedModules[module.id] = {
        get code() {
          return source?.toString() ?? null;
        },
        originalLength: module.originalCode.length,
        removedExports,
        renderedExports,
        renderedLength
      };
    }
    if (hoistedSource)
      magicString.prepend(hoistedSource + n2 + n2);
    if (this.needsExportsShim) {
      magicString.prepend(`${n2}${cnst} ${MISSING_EXPORT_SHIM_VARIABLE}${_}=${_}void 0;${n2}${n2}`);
    }
    const renderedSource = compact ? magicString : magicString.trim();
    if (isEmpty && this.getExportNames().length === 0 && dependencies.size === 0) {
      onLog(LOGLEVEL_WARN, logEmptyChunk(this.getChunkName()));
    }
    return { accessedGlobals, indent, magicString, renderedSource, usedModules, usesTopLevelAwait };
  }
  setDynamicImportResolutions(fileName) {
    const { accessedGlobalsByScope, outputOptions, pluginDriver, snippets } = this;
    for (const resolvedDynamicImport of this.getIncludedDynamicImports()) {
      if (resolvedDynamicImport.chunk) {
        const { chunk, facadeChunk, node, resolution } = resolvedDynamicImport;
        if (chunk === this) {
          node.setInternalResolution(resolution.namespace);
        } else {
          node.setExternalResolution((facadeChunk || chunk).exportMode, resolution, outputOptions, snippets, pluginDriver, accessedGlobalsByScope, `'${(facadeChunk || chunk).getImportPath(fileName)}'`, !facadeChunk?.strictFacade && chunk.exportNamesByVariable.get(resolution.namespace)[0], null);
        }
      } else {
        const { node, resolution } = resolvedDynamicImport;
        const [resolutionString, attributes] = this.getDynamicImportStringAndAttributes(resolution, fileName);
        node.setExternalResolution("external", resolution, outputOptions, snippets, pluginDriver, accessedGlobalsByScope, resolutionString, false, attributes);
      }
    }
  }
  setIdentifierRenderResolutions() {
    const { format, generatedCode: { symbols }, interop, preserveModules, externalLiveBindings } = this.outputOptions;
    const syntheticExports = /* @__PURE__ */ new Set();
    for (const exportName of this.getExportNames()) {
      const exportVariable = this.exportsByName.get(exportName);
      if (format !== "es" && format !== "system" && exportVariable.isReassigned && !exportVariable.isId) {
        exportVariable.setRenderNames("exports", exportName);
      } else if (exportVariable instanceof SyntheticNamedExportVariable) {
        syntheticExports.add(exportVariable);
      } else {
        exportVariable.setRenderNames(null, null);
      }
    }
    for (const module of this.orderedModules) {
      if (module.needsExportShim) {
        this.needsExportsShim = true;
        break;
      }
    }
    const usedNames = /* @__PURE__ */ new Set(["Object", "Promise"]);
    if (this.needsExportsShim) {
      usedNames.add(MISSING_EXPORT_SHIM_VARIABLE);
    }
    if (symbols) {
      usedNames.add("Symbol");
    }
    switch (format) {
      case "system": {
        usedNames.add("module").add("exports");
        break;
      }
      case "es": {
        break;
      }
      case "cjs": {
        usedNames.add("module").add("require").add("__filename").add("__dirname");
      }
      default: {
        usedNames.add("exports");
        for (const helper of HELPER_NAMES) {
          usedNames.add(helper);
        }
      }
    }
    deconflictChunk(this.orderedModules, this.getDependenciesToBeDeconflicted(format !== "es" && format !== "system", format === "amd" || format === "umd" || format === "iife", interop), this.imports, usedNames, format, interop, preserveModules, externalLiveBindings, this.chunkByModule, this.externalChunkByModule, syntheticExports, this.exportNamesByVariable, this.accessedGlobalsByScope, this.includedNamespaces);
  }
  setImportMetaResolutions(fileName) {
    const { accessedGlobalsByScope, includedNamespaces, orderedModules, outputOptions: { format } } = this;
    for (const module of orderedModules) {
      for (const importMeta of module.importMetas) {
        importMeta.setResolution(format, accessedGlobalsByScope, fileName);
      }
      if (includedNamespaces.has(module)) {
        module.namespace.prepare(accessedGlobalsByScope);
      }
    }
  }
  setUpChunkImportsAndExportsForModule(module) {
    const moduleImports = new Set(module.includedImports);
    if (!this.outputOptions.preserveModules && this.includedNamespaces.has(module)) {
      const memberVariables = module.namespace.getMemberVariables();
      for (const variable of Object.values(memberVariables)) {
        if (variable.included) {
          moduleImports.add(variable);
        }
      }
    }
    for (let variable of moduleImports) {
      if (variable instanceof ExportDefaultVariable) {
        variable = variable.getOriginalVariable();
      }
      if (variable instanceof SyntheticNamedExportVariable) {
        variable = variable.getBaseVariable();
      }
      const chunk = this.chunkByModule.get(variable.module);
      if (chunk !== this) {
        this.imports.add(variable);
        if (variable.module instanceof Module) {
          this.checkCircularDependencyImport(variable, module);
          if (!(variable instanceof NamespaceVariable && this.outputOptions.preserveModules)) {
            chunk.exports.add(variable);
          }
        }
      }
    }
    if (this.includedNamespaces.has(module) || module.info.isEntry && module.preserveSignature !== false || module.includedDynamicImporters.some((importer) => this.chunkByModule.get(importer) !== this)) {
      this.ensureReexportsAreAvailableForModule(module);
    }
    for (const { node, resolution } of module.dynamicImports) {
      if (node.included && resolution instanceof Module && this.chunkByModule.get(resolution) === this && !this.includedNamespaces.has(resolution)) {
        this.includedNamespaces.add(resolution);
        this.ensureReexportsAreAvailableForModule(resolution);
      }
    }
  }
};
function getChunkNameFromModule(module) {
  return getPredefinedChunkNameFromModule(module) ?? getAliasName(module.id);
}
function getPredefinedChunkNameFromModule(module) {
  return module.chunkNames.find(({ isUserDefined }) => isUserDefined)?.name ?? module.chunkNames[0]?.name;
}
function getImportedBindingsPerDependency(renderedDependencies, resolveFileName2) {
  const importedBindingsPerDependency = {};
  for (const [dependency, declaration] of renderedDependencies) {
    const specifiers = /* @__PURE__ */ new Set();
    if (declaration.imports) {
      for (const { imported } of declaration.imports) {
        specifiers.add(imported);
      }
    }
    if (declaration.reexports) {
      for (const { imported } of declaration.reexports) {
        specifiers.add(imported);
      }
    }
    importedBindingsPerDependency[resolveFileName2(dependency)] = [...specifiers];
  }
  return importedBindingsPerDependency;
}
var QUERY_HASH_REGEX = /[#?]/;
var resolveFileName = (dependency) => dependency.getFileName();
function* concatLazy(iterables) {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
function getChunkAssignments(entries, manualChunkAliasByEntry, minChunkSize, log) {
  const { chunkDefinitions, modulesInManualChunks } = getChunkDefinitionsFromManualChunks(manualChunkAliasByEntry);
  const { allEntries, dependentEntriesByModule, dynamicallyDependentEntriesByDynamicEntry, dynamicImportsByEntry } = analyzeModuleGraph(entries);
  const chunkAtoms = getChunksWithSameDependentEntries(getModulesWithDependentEntries(dependentEntriesByModule, modulesInManualChunks));
  const staticDependencyAtomsByEntry = getStaticDependencyAtomsByEntry(allEntries, chunkAtoms);
  const alreadyLoadedAtomsByEntry = getAlreadyLoadedAtomsByEntry(staticDependencyAtomsByEntry, dynamicallyDependentEntriesByDynamicEntry, dynamicImportsByEntry, allEntries);
  removeUnnecessaryDependentEntries(chunkAtoms, alreadyLoadedAtomsByEntry);
  const { chunks, sideEffectAtoms, sizeByAtom } = getChunksWithSameDependentEntriesAndCorrelatedAtoms(chunkAtoms, staticDependencyAtomsByEntry, alreadyLoadedAtomsByEntry, minChunkSize);
  chunkDefinitions.push(...getOptimizedChunks(chunks, minChunkSize, sideEffectAtoms, sizeByAtom, log).map(({ modules }) => ({
    alias: null,
    modules
  })));
  return chunkDefinitions;
}
function getChunkDefinitionsFromManualChunks(manualChunkAliasByEntry) {
  const chunkDefinitions = [];
  const modulesInManualChunks = new Set(manualChunkAliasByEntry.keys());
  const manualChunkModulesByAlias = /* @__PURE__ */ Object.create(null);
  for (const [entry, alias] of manualChunkAliasByEntry) {
    addStaticDependenciesToManualChunk(entry, manualChunkModulesByAlias[alias] ||= [], modulesInManualChunks);
  }
  for (const [alias, modules] of Object.entries(manualChunkModulesByAlias)) {
    chunkDefinitions.push({ alias, modules });
  }
  return { chunkDefinitions, modulesInManualChunks };
}
function addStaticDependenciesToManualChunk(entry, manualChunkModules, modulesInManualChunks) {
  const modulesToHandle = /* @__PURE__ */ new Set([entry]);
  for (const module of modulesToHandle) {
    modulesInManualChunks.add(module);
    manualChunkModules.push(module);
    for (const dependency of module.dependencies) {
      if (!(dependency instanceof ExternalModule || modulesInManualChunks.has(dependency))) {
        modulesToHandle.add(dependency);
      }
    }
  }
}
function analyzeModuleGraph(entries) {
  const dynamicEntryModules = /* @__PURE__ */ new Set();
  const dependentEntriesByModule = /* @__PURE__ */ new Map();
  const dynamicImportModulesByEntry = [];
  const allEntriesSet = new Set(entries);
  let entryIndex = 0;
  for (const currentEntry of allEntriesSet) {
    const dynamicImportsForCurrentEntry = /* @__PURE__ */ new Set();
    dynamicImportModulesByEntry.push(dynamicImportsForCurrentEntry);
    const modulesToHandle = /* @__PURE__ */ new Set([currentEntry]);
    for (const module of modulesToHandle) {
      getOrCreate(dependentEntriesByModule, module, getNewSet).add(entryIndex);
      for (const dependency of module.getDependenciesToBeIncluded()) {
        if (!(dependency instanceof ExternalModule)) {
          modulesToHandle.add(dependency);
        }
      }
      for (const { resolution } of module.dynamicImports) {
        if (resolution instanceof Module && resolution.includedDynamicImporters.length > 0 && !allEntriesSet.has(resolution)) {
          dynamicEntryModules.add(resolution);
          allEntriesSet.add(resolution);
          dynamicImportsForCurrentEntry.add(resolution);
        }
      }
      for (const dependency of module.implicitlyLoadedBefore) {
        if (!allEntriesSet.has(dependency)) {
          dynamicEntryModules.add(dependency);
          allEntriesSet.add(dependency);
        }
      }
    }
    entryIndex++;
  }
  const allEntries = [...allEntriesSet];
  const { dynamicEntries, dynamicImportsByEntry } = getDynamicEntries(allEntries, dynamicEntryModules, dynamicImportModulesByEntry);
  return {
    allEntries,
    dependentEntriesByModule,
    dynamicallyDependentEntriesByDynamicEntry: getDynamicallyDependentEntriesByDynamicEntry(dependentEntriesByModule, dynamicEntries, allEntries),
    dynamicImportsByEntry
  };
}
function getDynamicEntries(allEntries, dynamicEntryModules, dynamicImportModulesByEntry) {
  const entryIndexByModule = /* @__PURE__ */ new Map();
  const dynamicEntries = /* @__PURE__ */ new Set();
  for (const [entryIndex, entry] of allEntries.entries()) {
    entryIndexByModule.set(entry, entryIndex);
    if (dynamicEntryModules.has(entry)) {
      dynamicEntries.add(entryIndex);
    }
  }
  const dynamicImportsByEntry = [];
  for (const dynamicImportModules of dynamicImportModulesByEntry) {
    const dynamicImports = /* @__PURE__ */ new Set();
    for (const dynamicEntry of dynamicImportModules) {
      dynamicImports.add(entryIndexByModule.get(dynamicEntry));
    }
    dynamicImportsByEntry.push(dynamicImports);
  }
  return { dynamicEntries, dynamicImportsByEntry };
}
function getDynamicallyDependentEntriesByDynamicEntry(dependentEntriesByModule, dynamicEntries, allEntries) {
  const dynamicallyDependentEntriesByDynamicEntry = /* @__PURE__ */ new Map();
  for (const dynamicEntryIndex of dynamicEntries) {
    const dynamicallyDependentEntries = getOrCreate(dynamicallyDependentEntriesByDynamicEntry, dynamicEntryIndex, getNewSet);
    const dynamicEntry = allEntries[dynamicEntryIndex];
    for (const importer of concatLazy([
      dynamicEntry.includedDynamicImporters,
      dynamicEntry.implicitlyLoadedAfter
    ])) {
      for (const entry of dependentEntriesByModule.get(importer)) {
        dynamicallyDependentEntries.add(entry);
      }
    }
  }
  return dynamicallyDependentEntriesByDynamicEntry;
}
function getChunksWithSameDependentEntries(modulesWithDependentEntries) {
  const chunkModules = /* @__PURE__ */ Object.create(null);
  for (const { dependentEntries, modules } of modulesWithDependentEntries) {
    let chunkSignature = 0n;
    for (const entryIndex of dependentEntries) {
      chunkSignature |= 1n << BigInt(entryIndex);
    }
    (chunkModules[String(chunkSignature)] ||= {
      dependentEntries: new Set(dependentEntries),
      modules: []
    }).modules.push(...modules);
  }
  return Object.values(chunkModules);
}
function* getModulesWithDependentEntries(dependentEntriesByModule, modulesInManualChunks) {
  for (const [module, dependentEntries] of dependentEntriesByModule) {
    if (!modulesInManualChunks.has(module)) {
      yield { dependentEntries, modules: [module] };
    }
  }
}
function getStaticDependencyAtomsByEntry(allEntries, chunkAtoms) {
  const staticDependencyAtomsByEntry = allEntries.map(() => 0n);
  let atomMask = 1n;
  for (const { dependentEntries } of chunkAtoms) {
    for (const entryIndex of dependentEntries) {
      staticDependencyAtomsByEntry[entryIndex] |= atomMask;
    }
    atomMask <<= 1n;
  }
  return staticDependencyAtomsByEntry;
}
function getAlreadyLoadedAtomsByEntry(staticDependencyAtomsByEntry, dynamicallyDependentEntriesByDynamicEntry, dynamicImportsByEntry, allEntries) {
  const alreadyLoadedAtomsByEntry = allEntries.map((_entry, entryIndex) => dynamicallyDependentEntriesByDynamicEntry.has(entryIndex) ? -1n : 0n);
  for (const [dynamicEntryIndex, dynamicallyDependentEntries] of dynamicallyDependentEntriesByDynamicEntry) {
    dynamicallyDependentEntriesByDynamicEntry.delete(dynamicEntryIndex);
    const knownLoadedAtoms = alreadyLoadedAtomsByEntry[dynamicEntryIndex];
    let updatedLoadedAtoms = knownLoadedAtoms;
    for (const entryIndex of dynamicallyDependentEntries) {
      updatedLoadedAtoms &= staticDependencyAtomsByEntry[entryIndex] | alreadyLoadedAtomsByEntry[entryIndex];
    }
    if (updatedLoadedAtoms !== knownLoadedAtoms) {
      alreadyLoadedAtomsByEntry[dynamicEntryIndex] = updatedLoadedAtoms;
      for (const dynamicImport of dynamicImportsByEntry[dynamicEntryIndex]) {
        getOrCreate(dynamicallyDependentEntriesByDynamicEntry, dynamicImport, getNewSet).add(dynamicEntryIndex);
      }
    }
  }
  return alreadyLoadedAtomsByEntry;
}
function removeUnnecessaryDependentEntries(chunkAtoms, alreadyLoadedAtomsByEntry) {
  let chunkMask = 1n;
  for (const { dependentEntries } of chunkAtoms) {
    for (const entryIndex of dependentEntries) {
      if ((alreadyLoadedAtomsByEntry[entryIndex] & chunkMask) === chunkMask) {
        dependentEntries.delete(entryIndex);
      }
    }
    chunkMask <<= 1n;
  }
}
function getChunksWithSameDependentEntriesAndCorrelatedAtoms(chunkAtoms, staticDependencyAtomsByEntry, alreadyLoadedAtomsByEntry, minChunkSize) {
  const chunksBySignature = /* @__PURE__ */ Object.create(null);
  const chunkByModule = /* @__PURE__ */ new Map();
  const sizeByAtom = [];
  let sideEffectAtoms = 0n;
  let atomMask = 1n;
  for (const { dependentEntries, modules } of chunkAtoms) {
    let chunkSignature = 0n;
    let correlatedAtoms = -1n;
    for (const entryIndex of dependentEntries) {
      chunkSignature |= 1n << BigInt(entryIndex);
      correlatedAtoms &= staticDependencyAtomsByEntry[entryIndex] | alreadyLoadedAtomsByEntry[entryIndex];
    }
    const chunk = chunksBySignature[String(chunkSignature)] ||= {
      containedAtoms: 0n,
      correlatedAtoms,
      dependencies: /* @__PURE__ */ new Set(),
      dependentChunks: /* @__PURE__ */ new Set(),
      dependentEntries: new Set(dependentEntries),
      modules: [],
      pure: true,
      size: 0
    };
    let atomSize = 0;
    let pure = true;
    for (const module of modules) {
      chunkByModule.set(module, chunk);
      if (module.isIncluded()) {
        pure &&= !module.hasEffects();
        atomSize += minChunkSize > 1 ? module.estimateSize() : 1;
      }
    }
    if (!pure) {
      sideEffectAtoms |= atomMask;
    }
    sizeByAtom.push(atomSize);
    chunk.containedAtoms |= atomMask;
    chunk.modules.push(...modules);
    chunk.pure &&= pure;
    chunk.size += atomSize;
    atomMask <<= 1n;
  }
  const chunks = Object.values(chunksBySignature);
  sideEffectAtoms |= addChunkDependenciesAndGetExternalSideEffectAtoms(chunks, chunkByModule, atomMask);
  return { chunks, sideEffectAtoms, sizeByAtom };
}
function addChunkDependenciesAndGetExternalSideEffectAtoms(chunks, chunkByModule, nextAvailableAtomMask) {
  const signatureByExternalModule = /* @__PURE__ */ new Map();
  let externalSideEffectAtoms = 0n;
  for (const chunk of chunks) {
    const { dependencies, modules } = chunk;
    for (const module of modules) {
      for (const dependency of module.getDependenciesToBeIncluded()) {
        if (dependency instanceof ExternalModule) {
          if (dependency.info.moduleSideEffects) {
            const signature = getOrCreate(signatureByExternalModule, dependency, () => {
              const signature2 = nextAvailableAtomMask;
              nextAvailableAtomMask <<= 1n;
              externalSideEffectAtoms |= signature2;
              return signature2;
            });
            chunk.containedAtoms |= signature;
            chunk.correlatedAtoms |= signature;
          }
        } else {
          const dependencyChunk = chunkByModule.get(dependency);
          if (dependencyChunk && dependencyChunk !== chunk) {
            dependencies.add(dependencyChunk);
            dependencyChunk.dependentChunks.add(chunk);
          }
        }
      }
    }
  }
  return externalSideEffectAtoms;
}
function getOptimizedChunks(chunks, minChunkSize, sideEffectAtoms, sizeByAtom, log) {
  timeStart("optimize chunks", 3);
  const chunkPartition = getPartitionedChunks(chunks, minChunkSize);
  if (!chunkPartition) {
    timeEnd("optimize chunks", 3);
    return chunks;
  }
  minChunkSize > 1 && log("info", logOptimizeChunkStatus(chunks.length, chunkPartition.small.size, "Initially"));
  mergeChunks(chunkPartition, minChunkSize, sideEffectAtoms, sizeByAtom);
  minChunkSize > 1 && log("info", logOptimizeChunkStatus(chunkPartition.small.size + chunkPartition.big.size, chunkPartition.small.size, "After merging chunks"));
  timeEnd("optimize chunks", 3);
  return [...chunkPartition.small, ...chunkPartition.big];
}
function getPartitionedChunks(chunks, minChunkSize) {
  const smallChunks = [];
  const bigChunks = [];
  for (const chunk of chunks) {
    (chunk.size < minChunkSize ? smallChunks : bigChunks).push(chunk);
  }
  if (smallChunks.length === 0) {
    return null;
  }
  smallChunks.sort(compareChunkSize);
  bigChunks.sort(compareChunkSize);
  return {
    big: new Set(bigChunks),
    small: new Set(smallChunks)
  };
}
function compareChunkSize({ size: sizeA }, { size: sizeB }) {
  return sizeA - sizeB;
}
function mergeChunks(chunkPartition, minChunkSize, sideEffectAtoms, sizeByAtom) {
  const { small } = chunkPartition;
  for (const mergedChunk of small) {
    const bestTargetChunk = findBestMergeTarget(
      mergedChunk,
      chunkPartition,
      sideEffectAtoms,
      sizeByAtom,
      // In the default case, we do not accept size increases
      minChunkSize <= 1 ? 1 : Infinity
    );
    if (bestTargetChunk) {
      const { containedAtoms, correlatedAtoms, modules, pure, size } = mergedChunk;
      small.delete(mergedChunk);
      getChunksInPartition(bestTargetChunk, minChunkSize, chunkPartition).delete(bestTargetChunk);
      bestTargetChunk.modules.push(...modules);
      bestTargetChunk.size += size;
      bestTargetChunk.pure &&= pure;
      const { dependencies, dependentChunks, dependentEntries } = bestTargetChunk;
      bestTargetChunk.correlatedAtoms &= correlatedAtoms;
      bestTargetChunk.containedAtoms |= containedAtoms;
      for (const entry of mergedChunk.dependentEntries) {
        dependentEntries.add(entry);
      }
      for (const dependency of mergedChunk.dependencies) {
        dependencies.add(dependency);
        dependency.dependentChunks.delete(mergedChunk);
        dependency.dependentChunks.add(bestTargetChunk);
      }
      for (const dependentChunk of mergedChunk.dependentChunks) {
        dependentChunks.add(dependentChunk);
        dependentChunk.dependencies.delete(mergedChunk);
        dependentChunk.dependencies.add(bestTargetChunk);
      }
      dependencies.delete(bestTargetChunk);
      dependentChunks.delete(bestTargetChunk);
      getChunksInPartition(bestTargetChunk, minChunkSize, chunkPartition).add(bestTargetChunk);
    }
  }
}
function findBestMergeTarget(mergedChunk, { big, small }, sideEffectAtoms, sizeByAtom, smallestAdditionalSize) {
  let bestTargetChunk = null;
  for (const targetChunk of concatLazy([small, big])) {
    if (mergedChunk === targetChunk)
      continue;
    const additionalSizeAfterMerge = getAdditionalSizeAfterMerge(mergedChunk, targetChunk, smallestAdditionalSize, sideEffectAtoms, sizeByAtom);
    if (additionalSizeAfterMerge < smallestAdditionalSize) {
      bestTargetChunk = targetChunk;
      if (additionalSizeAfterMerge === 0)
        break;
      smallestAdditionalSize = additionalSizeAfterMerge;
    }
  }
  return bestTargetChunk;
}
function getAdditionalSizeAfterMerge(mergedChunk, targetChunk, currentAdditionalSize, sideEffectAtoms, sizeByAtom) {
  const firstSize = getAdditionalSizeIfNoTransitiveDependencyOrNonCorrelatedSideEffect(mergedChunk, targetChunk, currentAdditionalSize, sideEffectAtoms, sizeByAtom);
  return firstSize < currentAdditionalSize ? firstSize + getAdditionalSizeIfNoTransitiveDependencyOrNonCorrelatedSideEffect(targetChunk, mergedChunk, currentAdditionalSize - firstSize, sideEffectAtoms, sizeByAtom) : Infinity;
}
function getAdditionalSizeIfNoTransitiveDependencyOrNonCorrelatedSideEffect(dependentChunk, dependencyChunk, currentAdditionalSize, sideEffectAtoms, sizeByAtom) {
  const { correlatedAtoms } = dependencyChunk;
  let dependencyAtoms = dependentChunk.containedAtoms;
  const dependentContainedSideEffects = dependencyAtoms & sideEffectAtoms;
  if ((correlatedAtoms & dependentContainedSideEffects) !== dependentContainedSideEffects) {
    return Infinity;
  }
  const chunksToCheck = new Set(dependentChunk.dependencies);
  for (const { dependencies, containedAtoms } of chunksToCheck) {
    dependencyAtoms |= containedAtoms;
    const containedSideEffects = containedAtoms & sideEffectAtoms;
    if ((correlatedAtoms & containedSideEffects) !== containedSideEffects) {
      return Infinity;
    }
    for (const dependency of dependencies) {
      if (dependency === dependencyChunk) {
        return Infinity;
      }
      chunksToCheck.add(dependency);
    }
  }
  return getAtomsSizeIfBelowLimit(dependencyAtoms & ~correlatedAtoms, currentAdditionalSize, sizeByAtom);
}
function getAtomsSizeIfBelowLimit(atoms, currentAdditionalSize, sizeByAtom) {
  let size = 0;
  let atomIndex = 0;
  let atomSignature = 1n;
  const { length } = sizeByAtom;
  for (; atomIndex < length; atomIndex++) {
    if ((atoms & atomSignature) === atomSignature) {
      size += sizeByAtom[atomIndex];
    }
    atomSignature <<= 1n;
    if (size >= currentAdditionalSize) {
      return Infinity;
    }
  }
  return size;
}
function getChunksInPartition(chunk, minChunkSize, chunkPartition) {
  return chunk.size < minChunkSize ? chunkPartition.small : chunkPartition.big;
}
function commondir(files) {
  if (files.length === 0)
    return "/";
  if (files.length === 1)
    return dirname(files[0]);
  const commonSegments = files.slice(1).reduce((commonSegments2, file) => {
    const pathSegments = file.split(/\/+|\\+/);
    let index;
    for (index = 0; commonSegments2[index] === pathSegments[index] && index < Math.min(commonSegments2.length, pathSegments.length); index++)
      ;
    return commonSegments2.slice(0, index);
  }, files[0].split(/\/+|\\+/));
  return commonSegments.length > 1 ? commonSegments.join("/") : "/";
}
var compareExecIndex = (unitA, unitB) => unitA.execIndex > unitB.execIndex ? 1 : -1;
function sortByExecutionOrder(units) {
  units.sort(compareExecIndex);
}
function analyseModuleExecution(entryModules) {
  let nextExecIndex = 0;
  const cyclePaths = [];
  const analysedModules = /* @__PURE__ */ new Set();
  const dynamicImports = /* @__PURE__ */ new Set();
  const parents = /* @__PURE__ */ new Map();
  const orderedModules = [];
  const analyseModule = (module) => {
    if (module instanceof Module) {
      for (const dependency of module.dependencies) {
        if (parents.has(dependency)) {
          if (!analysedModules.has(dependency)) {
            cyclePaths.push(getCyclePath(dependency, module, parents));
          }
          continue;
        }
        parents.set(dependency, module);
        analyseModule(dependency);
      }
      for (const dependency of module.implicitlyLoadedBefore) {
        dynamicImports.add(dependency);
      }
      for (const { resolution } of module.dynamicImports) {
        if (resolution instanceof Module) {
          dynamicImports.add(resolution);
        }
      }
      orderedModules.push(module);
    }
    module.execIndex = nextExecIndex++;
    analysedModules.add(module);
  };
  for (const currentEntry of entryModules) {
    if (!parents.has(currentEntry)) {
      parents.set(currentEntry, null);
      analyseModule(currentEntry);
    }
  }
  for (const currentEntry of dynamicImports) {
    if (!parents.has(currentEntry)) {
      parents.set(currentEntry, null);
      analyseModule(currentEntry);
    }
  }
  return { cyclePaths, orderedModules };
}
function getCyclePath(module, parent, parents) {
  const cycleSymbol = Symbol(module.id);
  const path2 = [module.id];
  let nextModule = parent;
  module.cycles.add(cycleSymbol);
  while (nextModule !== module) {
    nextModule.cycles.add(cycleSymbol);
    path2.push(nextModule.id);
    nextModule = parents.get(nextModule);
  }
  path2.push(path2[0]);
  path2.reverse();
  return path2;
}
function getGenerateCodeSnippets({ compact, generatedCode: { arrowFunctions, constBindings, objectShorthand, reservedNamesAsProps } }) {
  const { _, n: n2, s } = compact ? { _: "", n: "", s: "" } : { _: " ", n: "\n", s: ";" };
  const cnst = constBindings ? "const" : "var";
  const getNonArrowFunctionIntro = (parameters, { isAsync, name }) => `${isAsync ? `async ` : ""}function${name ? ` ${name}` : ""}${_}(${parameters.join(`,${_}`)})${_}`;
  const getFunctionIntro = arrowFunctions ? (parameters, { isAsync, name }) => {
    const singleParameter = parameters.length === 1;
    const asyncString = isAsync ? `async${singleParameter ? " " : _}` : "";
    return `${name ? `${cnst} ${name}${_}=${_}` : ""}${asyncString}${singleParameter ? parameters[0] : `(${parameters.join(`,${_}`)})`}${_}=>${_}`;
  } : getNonArrowFunctionIntro;
  const getDirectReturnFunction = (parameters, { functionReturn, lineBreakIndent, name }) => [
    `${getFunctionIntro(parameters, {
      isAsync: false,
      name
    })}${arrowFunctions ? lineBreakIndent ? `${n2}${lineBreakIndent.base}${lineBreakIndent.t}` : "" : `{${lineBreakIndent ? `${n2}${lineBreakIndent.base}${lineBreakIndent.t}` : _}${functionReturn ? "return " : ""}`}`,
    arrowFunctions ? `${name ? ";" : ""}${lineBreakIndent ? `${n2}${lineBreakIndent.base}` : ""}` : `${s}${lineBreakIndent ? `${n2}${lineBreakIndent.base}` : _}}`
  ];
  const isValidPropertyName = reservedNamesAsProps ? (name) => VALID_IDENTIFIER_REGEXP.test(name) : (name) => !RESERVED_NAMES.has(name) && VALID_IDENTIFIER_REGEXP.test(name);
  return {
    _,
    cnst,
    getDirectReturnFunction,
    getDirectReturnIifeLeft: (parameters, returned, { needsArrowReturnParens, needsWrappedFunction }) => {
      const [left, right] = getDirectReturnFunction(parameters, {
        functionReturn: true,
        lineBreakIndent: null,
        name: null
      });
      return `${wrapIfNeeded(`${left}${wrapIfNeeded(returned, arrowFunctions && needsArrowReturnParens)}${right}`, arrowFunctions || needsWrappedFunction)}(`;
    },
    getFunctionIntro,
    getNonArrowFunctionIntro,
    getObject(fields, { lineBreakIndent }) {
      const prefix = lineBreakIndent ? `${n2}${lineBreakIndent.base}${lineBreakIndent.t}` : _;
      return `{${fields.map(([key, value]) => {
        if (key === null)
          return `${prefix}${value}`;
        const keyInObject = stringifyObjectKeyIfNeeded(key);
        return key === value && objectShorthand && key === keyInObject ? prefix + key : `${prefix}${keyInObject}:${_}${value}`;
      }).join(`,`)}${fields.length === 0 ? "" : lineBreakIndent ? `${n2}${lineBreakIndent.base}` : _}}`;
    },
    getPropertyAccess: (name) => isValidPropertyName(name) ? `.${name}` : `[${JSON.stringify(name)}]`,
    n: n2,
    s
  };
}
var wrapIfNeeded = (code, needsParens) => needsParens ? `(${code})` : code;
var Source = class {
  constructor(filename, content) {
    this.isOriginal = true;
    this.filename = filename;
    this.content = content;
  }
  traceSegment(line, column, name) {
    return { column, line, name, source: this };
  }
};
var Link = class {
  constructor(map, sources) {
    this.sources = sources;
    this.names = map.names;
    this.mappings = map.mappings;
  }
  traceMappings() {
    const sources = [];
    const sourceIndexMap = /* @__PURE__ */ new Map();
    const sourcesContent = [];
    const names = [];
    const nameIndexMap = /* @__PURE__ */ new Map();
    const mappings = [];
    for (const line of this.mappings) {
      const tracedLine = [];
      for (const segment of line) {
        if (segment.length === 1)
          continue;
        const source = this.sources[segment[1]];
        if (!source)
          continue;
        const traced = source.traceSegment(segment[2], segment[3], segment.length === 5 ? this.names[segment[4]] : "");
        if (traced) {
          const { column, line: line2, name, source: { content, filename } } = traced;
          let sourceIndex = sourceIndexMap.get(filename);
          if (sourceIndex === void 0) {
            sourceIndex = sources.length;
            sources.push(filename);
            sourceIndexMap.set(filename, sourceIndex);
            sourcesContent[sourceIndex] = content;
          } else if (sourcesContent[sourceIndex] == null) {
            sourcesContent[sourceIndex] = content;
          } else if (content != null && sourcesContent[sourceIndex] !== content) {
            return error(logConflictingSourcemapSources(filename));
          }
          const tracedSegment = [segment[0], sourceIndex, line2, column];
          if (name) {
            let nameIndex = nameIndexMap.get(name);
            if (nameIndex === void 0) {
              nameIndex = names.length;
              names.push(name);
              nameIndexMap.set(name, nameIndex);
            }
            tracedSegment[4] = nameIndex;
          }
          tracedLine.push(tracedSegment);
        }
      }
      mappings.push(tracedLine);
    }
    return { mappings, names, sources, sourcesContent };
  }
  traceSegment(line, column, name) {
    const segments = this.mappings[line];
    if (!segments)
      return null;
    let searchStart = 0;
    let searchEnd = segments.length - 1;
    while (searchStart <= searchEnd) {
      const m = searchStart + searchEnd >> 1;
      const segment = segments[m];
      if (segment[0] === column || searchStart === searchEnd) {
        if (segment.length == 1)
          return null;
        const source = this.sources[segment[1]];
        if (!source)
          return null;
        return source.traceSegment(segment[2], segment[3], segment.length === 5 ? this.names[segment[4]] : name);
      }
      if (segment[0] > column) {
        searchEnd = m - 1;
      } else {
        searchStart = m + 1;
      }
    }
    return null;
  }
};
function getLinkMap(log) {
  return function linkMap(source, map) {
    if (!map.missing) {
      return new Link(map, [source]);
    }
    log(LOGLEVEL_WARN, logSourcemapBroken(map.plugin));
    return new Link({
      mappings: [],
      names: []
    }, [source]);
  };
}
function getCollapsedSourcemap(id, originalCode, originalSourcemap, sourcemapChain, linkMap) {
  let source;
  if (originalSourcemap) {
    const sources = originalSourcemap.sources;
    const sourcesContent = originalSourcemap.sourcesContent || [];
    const directory = dirname(id) || ".";
    const sourceRoot = originalSourcemap.sourceRoot || ".";
    const baseSources = sources.map((source2, index) => new Source(resolve$1(directory, sourceRoot, source2), sourcesContent[index]));
    source = new Link(originalSourcemap, baseSources);
  } else {
    source = new Source(id, originalCode);
  }
  return sourcemapChain.reduce(linkMap, source);
}
function collapseSourcemaps(file, map, modules, bundleSourcemapChain, excludeContent, log) {
  const linkMap = getLinkMap(log);
  const moduleSources = modules.filter((module) => !module.excludeFromSourcemap).map((module) => getCollapsedSourcemap(module.id, module.originalCode, module.originalSourcemap, module.sourcemapChain, linkMap));
  const link = new Link(map, moduleSources);
  const source = bundleSourcemapChain.reduce(linkMap, link);
  let { sources, sourcesContent, names, mappings } = source.traceMappings();
  if (file) {
    const directory = dirname(file);
    sources = sources.map((source2) => relative2(directory, source2));
    file = basename(file);
  }
  sourcesContent = excludeContent ? null : sourcesContent;
  for (const module of modules) {
    resetSourcemapCache(module.originalSourcemap, module.sourcemapChain);
  }
  return new SourceMap({ file, mappings, names, sources, sourcesContent });
}
function collapseSourcemap(id, originalCode, originalSourcemap, sourcemapChain, log) {
  if (sourcemapChain.length === 0) {
    return originalSourcemap;
  }
  const source = getCollapsedSourcemap(id, originalCode, originalSourcemap, sourcemapChain, getLinkMap(log));
  const map = source.traceMappings();
  return decodedSourcemap({ version: 3, ...map });
}
var textEncoder;
var getHash64 = (input) => (0, import_native.xxhashBase64Url)(ensureBuffer(input));
var getHash36 = (input) => (0, import_native.xxhashBase36)(ensureBuffer(input));
var getHash16 = (input) => (0, import_native.xxhashBase16)(ensureBuffer(input));
var hasherByType = {
  base36: getHash36,
  base64: getHash64,
  hex: getHash16
};
function ensureBuffer(input) {
  if (typeof input === "string") {
    if (typeof Buffer === "undefined") {
      textEncoder ??= new TextEncoder();
      return textEncoder.encode(input);
    }
    return Buffer.from(input);
  }
  return input;
}
var SOURCEMAPPING_URL = "sourceMa";
SOURCEMAPPING_URL += "ppingURL";
async function renderChunks(chunks, bundle, pluginDriver, outputOptions, log) {
  timeStart("render chunks", 2);
  reserveEntryChunksInBundle(chunks);
  const renderedChunks = await Promise.all(chunks.map((chunk) => chunk.render()));
  timeEnd("render chunks", 2);
  timeStart("transform chunks", 2);
  const getHash = hasherByType[outputOptions.hashCharacters];
  const chunkGraph = getChunkGraph(chunks);
  const { initialHashesByPlaceholder, nonHashedChunksWithPlaceholders, renderedChunksByPlaceholder, hashDependenciesByPlaceholder } = await transformChunksAndGenerateContentHashes(renderedChunks, chunkGraph, outputOptions, pluginDriver, getHash, log);
  const hashesByPlaceholder = generateFinalHashes(renderedChunksByPlaceholder, hashDependenciesByPlaceholder, initialHashesByPlaceholder, bundle, getHash);
  addChunksToBundle(renderedChunksByPlaceholder, hashesByPlaceholder, bundle, nonHashedChunksWithPlaceholders, pluginDriver, outputOptions);
  timeEnd("transform chunks", 2);
}
function reserveEntryChunksInBundle(chunks) {
  for (const chunk of chunks) {
    if (chunk.facadeModule && chunk.facadeModule.isUserDefinedEntryPoint) {
      chunk.getPreliminaryFileName();
    }
  }
}
function getChunkGraph(chunks) {
  return Object.fromEntries(chunks.map((chunk) => {
    const renderedChunkInfo = chunk.getRenderedChunkInfo();
    return [renderedChunkInfo.fileName, renderedChunkInfo];
  }));
}
async function transformChunk(magicString, fileName, usedModules, chunkGraph, options, outputPluginDriver, log) {
  let map = null;
  const sourcemapChain = [];
  let code = await outputPluginDriver.hookReduceArg0("renderChunk", [magicString.toString(), chunkGraph[fileName], options, { chunks: chunkGraph }], (code2, result, plugin) => {
    if (result == null)
      return code2;
    if (typeof result === "string")
      result = {
        code: result,
        map: void 0
      };
    if (result.map !== null) {
      const map2 = decodedSourcemap(result.map);
      sourcemapChain.push(map2 || { missing: true, plugin: plugin.name });
    }
    return result.code;
  });
  const { compact, dir, file, sourcemap, sourcemapExcludeSources, sourcemapFile, sourcemapPathTransform, sourcemapIgnoreList } = options;
  if (!compact && code[code.length - 1] !== "\n")
    code += "\n";
  if (sourcemap) {
    timeStart("sourcemaps", 3);
    let resultingFile;
    if (file)
      resultingFile = resolve$1(sourcemapFile || file);
    else if (dir)
      resultingFile = resolve$1(dir, fileName);
    else
      resultingFile = resolve$1(fileName);
    const decodedMap = magicString.generateDecodedMap({});
    map = collapseSourcemaps(resultingFile, decodedMap, usedModules, sourcemapChain, sourcemapExcludeSources, log);
    for (let sourcesIndex = 0; sourcesIndex < map.sources.length; ++sourcesIndex) {
      let sourcePath = map.sources[sourcesIndex];
      const sourcemapPath = `${resultingFile}.map`;
      const ignoreList = sourcemapIgnoreList(sourcePath, sourcemapPath);
      if (typeof ignoreList !== "boolean") {
        error(logFailedValidation("sourcemapIgnoreList function must return a boolean."));
      }
      if (ignoreList) {
        if (map.x_google_ignoreList === void 0) {
          map.x_google_ignoreList = [];
        }
        if (!map.x_google_ignoreList.includes(sourcesIndex)) {
          map.x_google_ignoreList.push(sourcesIndex);
        }
      }
      if (sourcemapPathTransform) {
        sourcePath = sourcemapPathTransform(sourcePath, sourcemapPath);
        if (typeof sourcePath !== "string") {
          error(logFailedValidation(`sourcemapPathTransform function must return a string.`));
        }
      }
      map.sources[sourcesIndex] = normalize(sourcePath);
    }
    timeEnd("sourcemaps", 3);
  }
  return {
    code,
    map
  };
}
async function transformChunksAndGenerateContentHashes(renderedChunks, chunkGraph, outputOptions, pluginDriver, getHash, log) {
  const nonHashedChunksWithPlaceholders = [];
  const renderedChunksByPlaceholder = /* @__PURE__ */ new Map();
  const hashDependenciesByPlaceholder = /* @__PURE__ */ new Map();
  const initialHashesByPlaceholder = /* @__PURE__ */ new Map();
  const placeholders = /* @__PURE__ */ new Set();
  for (const { preliminaryFileName: { hashPlaceholder } } of renderedChunks) {
    if (hashPlaceholder)
      placeholders.add(hashPlaceholder);
  }
  await Promise.all(renderedChunks.map(async ({ chunk, preliminaryFileName: { fileName, hashPlaceholder }, preliminarySourcemapFileName, magicString, usedModules }) => {
    const transformedChunk = {
      chunk,
      fileName,
      sourcemapFileName: preliminarySourcemapFileName?.fileName ?? null,
      ...await transformChunk(magicString, fileName, usedModules, chunkGraph, outputOptions, pluginDriver, log)
    };
    const { code, map } = transformedChunk;
    if (hashPlaceholder) {
      const { containedPlaceholders, transformedCode } = replacePlaceholdersWithDefaultAndGetContainedPlaceholders(code, placeholders);
      let contentToHash = transformedCode;
      const hashAugmentation = pluginDriver.hookReduceValueSync("augmentChunkHash", "", [chunk.getRenderedChunkInfo()], (augmentation, pluginHash) => {
        if (pluginHash) {
          augmentation += pluginHash;
        }
        return augmentation;
      });
      if (hashAugmentation) {
        contentToHash += hashAugmentation;
      }
      renderedChunksByPlaceholder.set(hashPlaceholder, transformedChunk);
      hashDependenciesByPlaceholder.set(hashPlaceholder, {
        containedPlaceholders,
        contentHash: getHash(contentToHash)
      });
    } else {
      nonHashedChunksWithPlaceholders.push(transformedChunk);
    }
    const sourcemapHashPlaceholder = preliminarySourcemapFileName?.hashPlaceholder;
    if (map && sourcemapHashPlaceholder) {
      initialHashesByPlaceholder.set(preliminarySourcemapFileName.hashPlaceholder, getHash(map.toString()).slice(0, preliminarySourcemapFileName.hashPlaceholder.length));
    }
  }));
  return {
    hashDependenciesByPlaceholder,
    initialHashesByPlaceholder,
    nonHashedChunksWithPlaceholders,
    renderedChunksByPlaceholder
  };
}
function generateFinalHashes(renderedChunksByPlaceholder, hashDependenciesByPlaceholder, initialHashesByPlaceholder, bundle, getHash) {
  const hashesByPlaceholder = new Map(initialHashesByPlaceholder);
  for (const [placeholder, { fileName }] of renderedChunksByPlaceholder) {
    let contentToHash = "";
    const hashDependencyPlaceholders = /* @__PURE__ */ new Set([placeholder]);
    for (const dependencyPlaceholder of hashDependencyPlaceholders) {
      const { containedPlaceholders, contentHash } = hashDependenciesByPlaceholder.get(dependencyPlaceholder);
      contentToHash += contentHash;
      for (const containedPlaceholder of containedPlaceholders) {
        hashDependencyPlaceholders.add(containedPlaceholder);
      }
    }
    let finalFileName;
    let finalHash;
    do {
      if (finalHash) {
        contentToHash = finalHash;
      }
      finalHash = getHash(contentToHash).slice(0, placeholder.length);
      finalFileName = replaceSinglePlaceholder(fileName, placeholder, finalHash);
    } while (bundle[lowercaseBundleKeys].has(finalFileName.toLowerCase()));
    bundle[finalFileName] = FILE_PLACEHOLDER;
    hashesByPlaceholder.set(placeholder, finalHash);
  }
  return hashesByPlaceholder;
}
function addChunksToBundle(renderedChunksByPlaceholder, hashesByPlaceholder, bundle, nonHashedChunksWithPlaceholders, pluginDriver, options) {
  for (const { chunk, code, fileName, sourcemapFileName, map } of renderedChunksByPlaceholder.values()) {
    let updatedCode = replacePlaceholders(code, hashesByPlaceholder);
    const finalFileName = replacePlaceholders(fileName, hashesByPlaceholder);
    let finalSourcemapFileName = null;
    if (map) {
      finalSourcemapFileName = sourcemapFileName ? replacePlaceholders(sourcemapFileName, hashesByPlaceholder) : `${finalFileName}.map`;
      map.file = replacePlaceholders(map.file, hashesByPlaceholder);
      updatedCode += emitSourceMapAndGetComment(finalSourcemapFileName, map, pluginDriver, options);
    }
    bundle[finalFileName] = chunk.finalizeChunk(updatedCode, map, finalSourcemapFileName, hashesByPlaceholder);
  }
  for (const { chunk, code, fileName, sourcemapFileName, map } of nonHashedChunksWithPlaceholders) {
    let updatedCode = hashesByPlaceholder.size > 0 ? replacePlaceholders(code, hashesByPlaceholder) : code;
    let finalSourcemapFileName = null;
    if (map) {
      finalSourcemapFileName = sourcemapFileName ? replacePlaceholders(sourcemapFileName, hashesByPlaceholder) : `${fileName}.map`;
      updatedCode += emitSourceMapAndGetComment(finalSourcemapFileName, map, pluginDriver, options);
    }
    bundle[fileName] = chunk.finalizeChunk(updatedCode, map, finalSourcemapFileName, hashesByPlaceholder);
  }
}
function emitSourceMapAndGetComment(fileName, map, pluginDriver, { sourcemap, sourcemapBaseUrl }) {
  let url;
  if (sourcemap === "inline") {
    url = map.toUrl();
  } else {
    const sourcemapFileName = basename(fileName);
    url = sourcemapBaseUrl ? new URL(sourcemapFileName, sourcemapBaseUrl).toString() : sourcemapFileName;
    pluginDriver.emitFile({ fileName, source: map.toString(), type: "asset" });
  }
  return sourcemap === "hidden" ? "" : `//# ${SOURCEMAPPING_URL}=${url}
`;
}
var Bundle2 = class {
  constructor(outputOptions, unsetOptions, inputOptions, pluginDriver, graph) {
    this.outputOptions = outputOptions;
    this.unsetOptions = unsetOptions;
    this.inputOptions = inputOptions;
    this.pluginDriver = pluginDriver;
    this.graph = graph;
    this.facadeChunkByModule = /* @__PURE__ */ new Map();
    this.includedNamespaces = /* @__PURE__ */ new Set();
  }
  async generate(isWrite) {
    timeStart("GENERATE", 1);
    const outputBundleBase = /* @__PURE__ */ Object.create(null);
    const outputBundle = getOutputBundle(outputBundleBase);
    this.pluginDriver.setOutputBundle(outputBundle, this.outputOptions);
    try {
      timeStart("initialize render", 2);
      await this.pluginDriver.hookParallel("renderStart", [this.outputOptions, this.inputOptions]);
      timeEnd("initialize render", 2);
      timeStart("generate chunks", 2);
      const getHashPlaceholder = getHashPlaceholderGenerator();
      const chunks = await this.generateChunks(outputBundle, getHashPlaceholder);
      if (chunks.length > 1) {
        validateOptionsForMultiChunkOutput(this.outputOptions, this.inputOptions.onLog);
      }
      this.pluginDriver.setChunkInformation(this.facadeChunkByModule);
      for (const chunk of chunks) {
        chunk.generateExports();
      }
      timeEnd("generate chunks", 2);
      await renderChunks(chunks, outputBundle, this.pluginDriver, this.outputOptions, this.inputOptions.onLog);
    } catch (error_) {
      await this.pluginDriver.hookParallel("renderError", [error_]);
      throw error_;
    }
    removeUnreferencedAssets(outputBundle);
    timeStart("generate bundle", 2);
    await this.pluginDriver.hookSeq("generateBundle", [
      this.outputOptions,
      outputBundle,
      isWrite
    ]);
    this.finaliseAssets(outputBundle);
    timeEnd("generate bundle", 2);
    timeEnd("GENERATE", 1);
    return outputBundleBase;
  }
  async addManualChunks(manualChunks) {
    const manualChunkAliasByEntry = /* @__PURE__ */ new Map();
    const chunkEntries = await Promise.all(Object.entries(manualChunks).map(async ([alias, files]) => ({
      alias,
      entries: await this.graph.moduleLoader.addAdditionalModules(files, true)
    })));
    for (const { alias, entries } of chunkEntries) {
      for (const entry of entries) {
        addModuleToManualChunk(alias, entry, manualChunkAliasByEntry);
      }
    }
    return manualChunkAliasByEntry;
  }
  assignManualChunks(getManualChunk) {
    const manualChunkAliasesWithEntry = [];
    const manualChunksApi = {
      getModuleIds: () => this.graph.modulesById.keys(),
      getModuleInfo: this.graph.getModuleInfo
    };
    for (const module of this.graph.modulesById.values()) {
      if (module instanceof Module) {
        const manualChunkAlias = getManualChunk(module.id, manualChunksApi);
        if (typeof manualChunkAlias === "string") {
          manualChunkAliasesWithEntry.push([manualChunkAlias, module]);
        }
      }
    }
    manualChunkAliasesWithEntry.sort(([aliasA], [aliasB]) => aliasA > aliasB ? 1 : aliasA < aliasB ? -1 : 0);
    const manualChunkAliasByEntry = /* @__PURE__ */ new Map();
    for (const [alias, module] of manualChunkAliasesWithEntry) {
      addModuleToManualChunk(alias, module, manualChunkAliasByEntry);
    }
    return manualChunkAliasByEntry;
  }
  finaliseAssets(bundle) {
    if (this.outputOptions.validate) {
      for (const file of Object.values(bundle)) {
        if ("code" in file) {
          try {
            parseAst(file.code);
          } catch (error_) {
            this.inputOptions.onLog(LOGLEVEL_WARN, logChunkInvalid(file, error_));
          }
        }
      }
    }
    this.pluginDriver.finaliseAssets();
  }
  async generateChunks(bundle, getHashPlaceholder) {
    const { experimentalMinChunkSize, inlineDynamicImports, manualChunks, preserveModules } = this.outputOptions;
    const manualChunkAliasByEntry = typeof manualChunks === "object" ? await this.addManualChunks(manualChunks) : this.assignManualChunks(manualChunks);
    const snippets = getGenerateCodeSnippets(this.outputOptions);
    const includedModules = getIncludedModules(this.graph.modulesById);
    const inputBase = commondir(getAbsoluteEntryModulePaths(includedModules, preserveModules));
    const externalChunkByModule = getExternalChunkByModule(this.graph.modulesById, this.outputOptions, inputBase);
    const chunks = [];
    const chunkByModule = /* @__PURE__ */ new Map();
    for (const { alias, modules } of inlineDynamicImports ? [{ alias: null, modules: includedModules }] : preserveModules ? includedModules.map((module) => ({ alias: null, modules: [module] })) : getChunkAssignments(this.graph.entryModules, manualChunkAliasByEntry, experimentalMinChunkSize, this.inputOptions.onLog)) {
      sortByExecutionOrder(modules);
      const chunk = new Chunk2(modules, this.inputOptions, this.outputOptions, this.unsetOptions, this.pluginDriver, this.graph.modulesById, chunkByModule, externalChunkByModule, this.facadeChunkByModule, this.includedNamespaces, alias, getHashPlaceholder, bundle, inputBase, snippets);
      chunks.push(chunk);
    }
    for (const chunk of chunks) {
      chunk.link();
    }
    const facades = [];
    for (const chunk of chunks) {
      facades.push(...chunk.generateFacades());
    }
    return [...chunks, ...facades];
  }
};
function validateOptionsForMultiChunkOutput(outputOptions, log) {
  if (outputOptions.format === "umd" || outputOptions.format === "iife")
    return error(logInvalidOption("output.format", URL_OUTPUT_FORMAT, "UMD and IIFE output formats are not supported for code-splitting builds", outputOptions.format));
  if (typeof outputOptions.file === "string")
    return error(logInvalidOption("output.file", URL_OUTPUT_DIR, 'when building multiple chunks, the "output.dir" option must be used, not "output.file". To inline dynamic imports, set the "inlineDynamicImports" option'));
  if (outputOptions.sourcemapFile)
    return error(logInvalidOption("output.sourcemapFile", URL_OUTPUT_SOURCEMAPFILE, '"output.sourcemapFile" is only supported for single-file builds'));
  if (!outputOptions.amd.autoId && outputOptions.amd.id)
    log(LOGLEVEL_WARN, logInvalidOption("output.amd.id", URL_OUTPUT_AMD_ID, 'this option is only properly supported for single-file builds. Use "output.amd.autoId" and "output.amd.basePath" instead'));
}
function getIncludedModules(modulesById) {
  const includedModules = [];
  for (const module of modulesById.values()) {
    if (module instanceof Module && (module.isIncluded() || module.info.isEntry || module.includedDynamicImporters.length > 0)) {
      includedModules.push(module);
    }
  }
  return includedModules;
}
function getAbsoluteEntryModulePaths(includedModules, preserveModules) {
  const absoluteEntryModulePaths = [];
  for (const module of includedModules) {
    if ((module.info.isEntry || preserveModules) && isAbsolute(module.id)) {
      absoluteEntryModulePaths.push(module.id);
    }
  }
  return absoluteEntryModulePaths;
}
function getExternalChunkByModule(modulesById, outputOptions, inputBase) {
  const externalChunkByModule = /* @__PURE__ */ new Map();
  for (const module of modulesById.values()) {
    if (module instanceof ExternalModule) {
      externalChunkByModule.set(module, new ExternalChunk(module, outputOptions, inputBase));
    }
  }
  return externalChunkByModule;
}
function addModuleToManualChunk(alias, module, manualChunkAliasByEntry) {
  const existingAlias = manualChunkAliasByEntry.get(module);
  if (typeof existingAlias === "string" && existingAlias !== alias) {
    return error(logCannotAssignModuleToChunk(module.id, alias, existingAlias));
  }
  manualChunkAliasByEntry.set(module, alias);
}
function flru(max) {
  var num, curr, prev;
  var limit = max || 1;
  function keep(key, value) {
    if (++num > limit) {
      prev = curr;
      reset(1);
      ++num;
    }
    curr[key] = value;
  }
  function reset(isPartial) {
    num = 0;
    curr = /* @__PURE__ */ Object.create(null);
    isPartial || (prev = /* @__PURE__ */ Object.create(null));
  }
  reset();
  return {
    clear: reset,
    has: function(key) {
      return curr[key] !== void 0 || prev[key] !== void 0;
    },
    get: function(key) {
      var val = curr[key];
      if (val !== void 0)
        return val;
      if ((val = prev[key]) !== void 0) {
        keep(key, val);
        return val;
      }
    },
    set: function(key, value) {
      if (curr[key] !== void 0) {
        curr[key] = value;
      } else {
        keep(key, value);
      }
    }
  };
}
function resolveIdViaPlugins(source, importer, pluginDriver, moduleLoaderResolveId, skip, customOptions, isEntry, attributes) {
  let skipped = null;
  let replaceContext = null;
  if (skip) {
    skipped = /* @__PURE__ */ new Set();
    for (const skippedCall of skip) {
      if (source === skippedCall.source && importer === skippedCall.importer) {
        skipped.add(skippedCall.plugin);
      }
    }
    replaceContext = (pluginContext, plugin) => ({
      ...pluginContext,
      resolve: (source2, importer2, { attributes: attributes2, custom, isEntry: isEntry2, skipSelf } = BLANK) => {
        skipSelf ??= true;
        return moduleLoaderResolveId(source2, importer2, custom, isEntry2, attributes2 || EMPTY_OBJECT, skipSelf ? [...skip, { importer: importer2, plugin, source: source2 }] : skip);
      }
    });
  }
  return pluginDriver.hookFirstAndGetPlugin("resolveId", [source, importer, { attributes, custom: customOptions, isEntry }], replaceContext, skipped);
}
async function resolveId(source, importer, preserveSymlinks, pluginDriver, moduleLoaderResolveId, skip, customOptions, isEntry, attributes) {
  const pluginResult = await resolveIdViaPlugins(source, importer, pluginDriver, moduleLoaderResolveId, skip, customOptions, isEntry, attributes);
  if (pluginResult != null) {
    const [resolveIdResult, plugin] = pluginResult;
    if (typeof resolveIdResult === "object" && !resolveIdResult.resolvedBy) {
      return {
        ...resolveIdResult,
        resolvedBy: plugin.name
      };
    }
    if (typeof resolveIdResult === "string") {
      return {
        id: resolveIdResult,
        resolvedBy: plugin.name
      };
    }
    return resolveIdResult;
  }
  if (importer !== void 0 && !isAbsolute(source) && source[0] !== ".")
    return null;
  return addJsExtensionIfNecessary(importer ? resolve$1(dirname(importer), source) : resolve$1(source), preserveSymlinks);
}
async function addJsExtensionIfNecessary(file, preserveSymlinks) {
  return await findFile(file, preserveSymlinks) ?? await findFile(file + ".mjs", preserveSymlinks) ?? await findFile(file + ".js", preserveSymlinks);
}
async function findFile(file, preserveSymlinks) {
  try {
    const stats = await lstat(file);
    if (!preserveSymlinks && stats.isSymbolicLink())
      return await findFile(await realpath(file), preserveSymlinks);
    if (preserveSymlinks && stats.isSymbolicLink() || stats.isFile()) {
      const name = basename(file);
      const files = await readdir(dirname(file));
      if (files.includes(name))
        return file;
    }
  } catch {
  }
}
var ANONYMOUS_PLUGIN_PREFIX = "at position ";
var ANONYMOUS_OUTPUT_PLUGIN_PREFIX = "at output position ";
function createPluginCache(cache) {
  return {
    delete(id) {
      return delete cache[id];
    },
    get(id) {
      const item = cache[id];
      if (!item)
        return;
      item[0] = 0;
      return item[1];
    },
    has(id) {
      const item = cache[id];
      if (!item)
        return false;
      item[0] = 0;
      return true;
    },
    set(id, value) {
      cache[id] = [0, value];
    }
  };
}
function getTrackedPluginCache(pluginCache, onUse) {
  return {
    delete(id) {
      onUse();
      return pluginCache.delete(id);
    },
    get(id) {
      onUse();
      return pluginCache.get(id);
    },
    has(id) {
      onUse();
      return pluginCache.has(id);
    },
    set(id, value) {
      onUse();
      return pluginCache.set(id, value);
    }
  };
}
var NO_CACHE = {
  delete() {
    return false;
  },
  get() {
    return void 0;
  },
  has() {
    return false;
  },
  set() {
  }
};
function uncacheablePluginError(pluginName) {
  if (pluginName.startsWith(ANONYMOUS_PLUGIN_PREFIX) || pluginName.startsWith(ANONYMOUS_OUTPUT_PLUGIN_PREFIX)) {
    return error(logAnonymousPluginCache());
  }
  return error(logDuplicatePluginName(pluginName));
}
function getCacheForUncacheablePlugin(pluginName) {
  return {
    delete() {
      return uncacheablePluginError(pluginName);
    },
    get() {
      return uncacheablePluginError(pluginName);
    },
    has() {
      return uncacheablePluginError(pluginName);
    },
    set() {
      return uncacheablePluginError(pluginName);
    }
  };
}
async function asyncFlatten(array) {
  do {
    array = (await Promise.all(array)).flat(Infinity);
  } while (array.some((v) => v?.then));
  return array;
}
var getOnLog = (config, logLevel, printLog = defaultPrintLog) => {
  const { onwarn, onLog } = config;
  const defaultOnLog = getDefaultOnLog(printLog, onwarn);
  if (onLog) {
    const minimalPriority = logLevelPriority[logLevel];
    return (level, log) => onLog(level, addLogToString(log), (level2, handledLog) => {
      if (level2 === LOGLEVEL_ERROR) {
        return error(normalizeLog(handledLog));
      }
      if (logLevelPriority[level2] >= minimalPriority) {
        defaultOnLog(level2, normalizeLog(handledLog));
      }
    });
  }
  return defaultOnLog;
};
var getDefaultOnLog = (printLog, onwarn) => onwarn ? (level, log) => {
  if (level === LOGLEVEL_WARN) {
    onwarn(addLogToString(log), (warning) => printLog(LOGLEVEL_WARN, normalizeLog(warning)));
  } else {
    printLog(level, log);
  }
} : printLog;
var addLogToString = (log) => {
  Object.defineProperty(log, "toString", {
    value: () => getExtendedLogMessage(log),
    writable: true
  });
  return log;
};
var normalizeLog = (log) => typeof log === "string" ? { message: log } : typeof log === "function" ? normalizeLog(log()) : log;
var getExtendedLogMessage = (log) => {
  let prefix = "";
  if (log.plugin) {
    prefix += `(${log.plugin} plugin) `;
  }
  if (log.loc) {
    prefix += `${relativeId(log.loc.file)} (${log.loc.line}:${log.loc.column}) `;
  }
  return prefix + log.message;
};
var defaultPrintLog = (level, log) => {
  const message = getExtendedLogMessage(log);
  switch (level) {
    case LOGLEVEL_WARN: {
      return console.warn(message);
    }
    case LOGLEVEL_DEBUG: {
      return console.debug(message);
    }
    default: {
      return console.info(message);
    }
  }
};
function warnUnknownOptions(passedOptions, validOptions, optionType, log, ignoredKeys = /$./) {
  const validOptionSet = new Set(validOptions);
  const unknownOptions = Object.keys(passedOptions).filter((key) => !(validOptionSet.has(key) || ignoredKeys.test(key)));
  if (unknownOptions.length > 0) {
    log(LOGLEVEL_WARN, logUnknownOption(optionType, unknownOptions, [...validOptionSet].sort()));
  }
}
var treeshakePresets = {
  recommended: {
    annotations: true,
    correctVarValueBeforeDeclaration: false,
    manualPureFunctions: EMPTY_ARRAY,
    moduleSideEffects: () => true,
    propertyReadSideEffects: true,
    tryCatchDeoptimization: true,
    unknownGlobalSideEffects: false
  },
  safest: {
    annotations: true,
    correctVarValueBeforeDeclaration: true,
    manualPureFunctions: EMPTY_ARRAY,
    moduleSideEffects: () => true,
    propertyReadSideEffects: true,
    tryCatchDeoptimization: true,
    unknownGlobalSideEffects: true
  },
  smallest: {
    annotations: true,
    correctVarValueBeforeDeclaration: false,
    manualPureFunctions: EMPTY_ARRAY,
    moduleSideEffects: () => false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
    unknownGlobalSideEffects: false
  }
};
var generatedCodePresets = {
  es2015: {
    arrowFunctions: true,
    constBindings: true,
    objectShorthand: true,
    reservedNamesAsProps: true,
    symbols: true
  },
  es5: {
    arrowFunctions: false,
    constBindings: false,
    objectShorthand: false,
    reservedNamesAsProps: true,
    symbols: false
  }
};
var objectifyOption = (value) => value && typeof value === "object" ? value : {};
var objectifyOptionWithPresets = (presets, optionName, urlSnippet, additionalValues) => (value) => {
  if (typeof value === "string") {
    const preset = presets[value];
    if (preset) {
      return preset;
    }
    error(logInvalidOption(optionName, urlSnippet, `valid values are ${additionalValues}${printQuotedStringList(Object.keys(presets))}. You can also supply an object for more fine-grained control`, value));
  }
  return objectifyOption(value);
};
var getOptionWithPreset = (value, presets, optionName, urlSnippet, additionalValues) => {
  const presetName = value?.preset;
  if (presetName) {
    const preset = presets[presetName];
    if (preset) {
      return { ...preset, ...value };
    } else {
      error(logInvalidOption(`${optionName}.preset`, urlSnippet, `valid values are ${printQuotedStringList(Object.keys(presets))}`, presetName));
    }
  }
  return objectifyOptionWithPresets(presets, optionName, urlSnippet, additionalValues)(value);
};
var normalizePluginOption = async (plugins) => (await asyncFlatten([plugins])).filter(Boolean);
async function transform(source, module, pluginDriver, log) {
  const id = module.id;
  const sourcemapChain = [];
  let originalSourcemap = source.map === null ? null : decodedSourcemap(source.map);
  const originalCode = source.code;
  let ast = source.ast;
  const transformDependencies = [];
  const emittedFiles = [];
  let customTransformCache = false;
  const useCustomTransformCache = () => customTransformCache = true;
  let pluginName = "";
  let currentSource = source.code;
  function transformReducer(previousCode, result, plugin) {
    let code2;
    let map;
    if (typeof result === "string") {
      code2 = result;
    } else if (result && typeof result === "object") {
      module.updateOptions(result);
      if (result.code == null) {
        if (result.map || result.ast) {
          log(LOGLEVEL_WARN, logNoTransformMapOrAstWithoutCode(plugin.name));
        }
        return previousCode;
      }
      ({ code: code2, map, ast } = result);
    } else {
      return previousCode;
    }
    if (map !== null) {
      sourcemapChain.push(decodedSourcemap(typeof map === "string" ? JSON.parse(map) : map) || {
        missing: true,
        plugin: plugin.name
      });
    }
    currentSource = code2;
    return code2;
  }
  const getLogHandler2 = (handler) => (log2, pos) => {
    log2 = normalizeLog(log2);
    if (pos)
      augmentCodeLocation(log2, pos, currentSource, id);
    log2.id = id;
    log2.hook = "transform";
    handler(log2);
  };
  let code;
  try {
    code = await pluginDriver.hookReduceArg0("transform", [currentSource, id], transformReducer, (pluginContext, plugin) => {
      pluginName = plugin.name;
      return {
        ...pluginContext,
        addWatchFile(id2) {
          transformDependencies.push(id2);
          pluginContext.addWatchFile(id2);
        },
        cache: customTransformCache ? pluginContext.cache : getTrackedPluginCache(pluginContext.cache, useCustomTransformCache),
        debug: getLogHandler2(pluginContext.debug),
        emitFile(emittedFile) {
          emittedFiles.push(emittedFile);
          return pluginDriver.emitFile(emittedFile);
        },
        error(error_, pos) {
          if (typeof error_ === "string")
            error_ = { message: error_ };
          if (pos)
            augmentCodeLocation(error_, pos, currentSource, id);
          error_.id = id;
          error_.hook = "transform";
          return pluginContext.error(error_);
        },
        getCombinedSourcemap() {
          const combinedMap = collapseSourcemap(id, originalCode, originalSourcemap, sourcemapChain, log);
          if (!combinedMap) {
            const magicString = new MagicString(originalCode);
            return magicString.generateMap({ hires: true, includeContent: true, source: id });
          }
          if (originalSourcemap !== combinedMap) {
            originalSourcemap = combinedMap;
            sourcemapChain.length = 0;
          }
          return new SourceMap({
            ...combinedMap,
            file: null,
            sourcesContent: combinedMap.sourcesContent
          });
        },
        info: getLogHandler2(pluginContext.info),
        setAssetSource() {
          return this.error(logInvalidSetAssetSourceCall());
        },
        warn: getLogHandler2(pluginContext.warn)
      };
    });
  } catch (error_) {
    return error(logPluginError(error_, pluginName, { hook: "transform", id }));
  }
  if (!customTransformCache && // files emitted by a transform hook need to be emitted again if the hook is skipped
  emittedFiles.length > 0)
    module.transformFiles = emittedFiles;
  return {
    ast,
    code,
    customTransformCache,
    originalCode,
    originalSourcemap,
    sourcemapChain,
    transformDependencies
  };
}
var RESOLVE_DEPENDENCIES = "resolveDependencies";
var ModuleLoader = class {
  constructor(graph, modulesById, options, pluginDriver) {
    this.graph = graph;
    this.modulesById = modulesById;
    this.options = options;
    this.pluginDriver = pluginDriver;
    this.implicitEntryModules = /* @__PURE__ */ new Set();
    this.indexedEntryModules = [];
    this.latestLoadModulesPromise = Promise.resolve();
    this.moduleLoadPromises = /* @__PURE__ */ new Map();
    this.modulesWithLoadedDependencies = /* @__PURE__ */ new Set();
    this.nextChunkNamePriority = 0;
    this.nextEntryModuleIndex = 0;
    this.resolveId = async (source, importer, customOptions, isEntry, attributes, skip = null) => this.getResolvedIdWithDefaults(this.getNormalizedResolvedIdWithoutDefaults(this.options.external(source, importer, false) ? false : await resolveId(source, importer, this.options.preserveSymlinks, this.pluginDriver, this.resolveId, skip, customOptions, typeof isEntry === "boolean" ? isEntry : !importer, attributes), importer, source), attributes);
    this.hasModuleSideEffects = options.treeshake ? options.treeshake.moduleSideEffects : () => true;
  }
  async addAdditionalModules(unresolvedModules, isAddForManualChunks) {
    const result = this.extendLoadModulesPromise(Promise.all(unresolvedModules.map((id) => this.loadEntryModule(id, false, void 0, null, isAddForManualChunks))));
    await this.awaitLoadModulesPromise();
    return result;
  }
  async addEntryModules(unresolvedEntryModules, isUserDefined) {
    const firstEntryModuleIndex = this.nextEntryModuleIndex;
    this.nextEntryModuleIndex += unresolvedEntryModules.length;
    const firstChunkNamePriority = this.nextChunkNamePriority;
    this.nextChunkNamePriority += unresolvedEntryModules.length;
    const newEntryModules = await this.extendLoadModulesPromise(Promise.all(unresolvedEntryModules.map(({ id, importer }) => this.loadEntryModule(id, true, importer, null))).then((entryModules) => {
      for (const [index, entryModule] of entryModules.entries()) {
        entryModule.isUserDefinedEntryPoint = entryModule.isUserDefinedEntryPoint || isUserDefined;
        addChunkNamesToModule(entryModule, unresolvedEntryModules[index], isUserDefined, firstChunkNamePriority + index);
        const existingIndexedModule = this.indexedEntryModules.find((indexedModule) => indexedModule.module === entryModule);
        if (existingIndexedModule) {
          existingIndexedModule.index = Math.min(existingIndexedModule.index, firstEntryModuleIndex + index);
        } else {
          this.indexedEntryModules.push({
            index: firstEntryModuleIndex + index,
            module: entryModule
          });
        }
      }
      this.indexedEntryModules.sort(({ index: indexA }, { index: indexB }) => indexA > indexB ? 1 : -1);
      return entryModules;
    }));
    await this.awaitLoadModulesPromise();
    return {
      entryModules: this.indexedEntryModules.map(({ module }) => module),
      implicitEntryModules: [...this.implicitEntryModules],
      newEntryModules
    };
  }
  async emitChunk({ fileName, id, importer, name, implicitlyLoadedAfterOneOf, preserveSignature }) {
    const unresolvedModule = {
      fileName: fileName || null,
      id,
      importer,
      name: name || null
    };
    const module = implicitlyLoadedAfterOneOf ? await this.addEntryWithImplicitDependants(unresolvedModule, implicitlyLoadedAfterOneOf) : (await this.addEntryModules([unresolvedModule], false)).newEntryModules[0];
    if (preserveSignature != null) {
      module.preserveSignature = preserveSignature;
    }
    return module;
  }
  async preloadModule(resolvedId) {
    const module = await this.fetchModule(this.getResolvedIdWithDefaults(resolvedId, EMPTY_OBJECT), void 0, false, resolvedId.resolveDependencies ? RESOLVE_DEPENDENCIES : true);
    return module.info;
  }
  addEntryWithImplicitDependants(unresolvedModule, implicitlyLoadedAfter) {
    const chunkNamePriority = this.nextChunkNamePriority++;
    return this.extendLoadModulesPromise(this.loadEntryModule(unresolvedModule.id, false, unresolvedModule.importer, null).then(async (entryModule) => {
      addChunkNamesToModule(entryModule, unresolvedModule, false, chunkNamePriority);
      if (!entryModule.info.isEntry) {
        const implicitlyLoadedAfterModules = await Promise.all(implicitlyLoadedAfter.map((id) => this.loadEntryModule(id, false, unresolvedModule.importer, entryModule.id)));
        if (!entryModule.info.isEntry) {
          this.implicitEntryModules.add(entryModule);
          for (const module of implicitlyLoadedAfterModules) {
            entryModule.implicitlyLoadedAfter.add(module);
          }
          for (const dependant of entryModule.implicitlyLoadedAfter) {
            dependant.implicitlyLoadedBefore.add(entryModule);
          }
        }
      }
      return entryModule;
    }));
  }
  async addModuleSource(id, importer, module) {
    let source;
    try {
      source = await this.graph.fileOperationQueue.run(async () => {
        const content = await this.pluginDriver.hookFirst("load", [id]);
        if (content !== null)
          return content;
        this.graph.watchFiles[id] = true;
        return await readFile(id, "utf8");
      });
    } catch (error_) {
      let message = `Could not load ${id}`;
      if (importer)
        message += ` (imported by ${relativeId(importer)})`;
      message += `: ${error_.message}`;
      error_.message = message;
      throw error_;
    }
    const sourceDescription = typeof source === "string" ? { code: source } : source != null && typeof source === "object" && typeof source.code === "string" ? source : error(logBadLoader(id));
    const code = sourceDescription.code;
    if (code.charCodeAt(0) === 65279) {
      sourceDescription.code = code.slice(1);
    }
    const cachedModule = this.graph.cachedModules.get(id);
    if (cachedModule && !cachedModule.customTransformCache && cachedModule.originalCode === sourceDescription.code && !await this.pluginDriver.hookFirst("shouldTransformCachedModule", [
      {
        ast: cachedModule.ast,
        code: cachedModule.code,
        id: cachedModule.id,
        meta: cachedModule.meta,
        moduleSideEffects: cachedModule.moduleSideEffects,
        resolvedSources: cachedModule.resolvedIds,
        syntheticNamedExports: cachedModule.syntheticNamedExports
      }
    ])) {
      if (cachedModule.transformFiles) {
        for (const emittedFile of cachedModule.transformFiles)
          this.pluginDriver.emitFile(emittedFile);
      }
      await module.setSource(cachedModule);
    } else {
      module.updateOptions(sourceDescription);
      await module.setSource(await transform(sourceDescription, module, this.pluginDriver, this.options.onLog));
    }
  }
  async awaitLoadModulesPromise() {
    let startingPromise;
    do {
      startingPromise = this.latestLoadModulesPromise;
      await startingPromise;
    } while (startingPromise !== this.latestLoadModulesPromise);
  }
  extendLoadModulesPromise(loadNewModulesPromise) {
    this.latestLoadModulesPromise = Promise.all([
      loadNewModulesPromise,
      this.latestLoadModulesPromise
    ]);
    this.latestLoadModulesPromise.catch(() => {
    });
    return loadNewModulesPromise;
  }
  async fetchDynamicDependencies(module, resolveDynamicImportPromises) {
    const dependencies = await Promise.all(resolveDynamicImportPromises.map((resolveDynamicImportPromise) => resolveDynamicImportPromise.then(async ([dynamicImport, resolvedId]) => {
      if (resolvedId === null)
        return null;
      if (typeof resolvedId === "string") {
        dynamicImport.resolution = resolvedId;
        return null;
      }
      return dynamicImport.resolution = await this.fetchResolvedDependency(relativeId(resolvedId.id), module.id, resolvedId);
    })));
    for (const dependency of dependencies) {
      if (dependency) {
        module.dynamicDependencies.add(dependency);
        dependency.dynamicImporters.push(module.id);
      }
    }
  }
  // If this is a preload, then this method always waits for the dependencies of
  // the module to be resolved.
  // Otherwise, if the module does not exist, it waits for the module and all
  // its dependencies to be loaded.
  // Otherwise, it returns immediately.
  async fetchModule({ attributes, id, meta, moduleSideEffects, syntheticNamedExports }, importer, isEntry, isPreload) {
    const existingModule = this.modulesById.get(id);
    if (existingModule instanceof Module) {
      if (importer && doAttributesDiffer(attributes, existingModule.info.attributes)) {
        this.options.onLog(LOGLEVEL_WARN, logInconsistentImportAttributes(existingModule.info.attributes, attributes, id, importer));
      }
      await this.handleExistingModule(existingModule, isEntry, isPreload);
      return existingModule;
    }
    if (existingModule instanceof ExternalModule) {
      return error(logExternalModulesCannotBeTransformedToModules(existingModule.id));
    }
    const module = new Module(this.graph, id, this.options, isEntry, moduleSideEffects, syntheticNamedExports, meta, attributes);
    this.modulesById.set(id, module);
    const loadPromise = this.addModuleSource(id, importer, module).then(() => [
      this.getResolveStaticDependencyPromises(module),
      this.getResolveDynamicImportPromises(module),
      loadAndResolveDependenciesPromise
    ]);
    const loadAndResolveDependenciesPromise = waitForDependencyResolution(loadPromise).then(() => this.pluginDriver.hookParallel("moduleParsed", [module.info]));
    loadAndResolveDependenciesPromise.catch(() => {
    });
    this.moduleLoadPromises.set(module, loadPromise);
    const resolveDependencyPromises = await loadPromise;
    if (!isPreload) {
      await this.fetchModuleDependencies(module, ...resolveDependencyPromises);
    } else if (isPreload === RESOLVE_DEPENDENCIES) {
      await loadAndResolveDependenciesPromise;
    }
    return module;
  }
  async fetchModuleDependencies(module, resolveStaticDependencyPromises, resolveDynamicDependencyPromises, loadAndResolveDependenciesPromise) {
    if (this.modulesWithLoadedDependencies.has(module)) {
      return;
    }
    this.modulesWithLoadedDependencies.add(module);
    await Promise.all([
      this.fetchStaticDependencies(module, resolveStaticDependencyPromises),
      this.fetchDynamicDependencies(module, resolveDynamicDependencyPromises)
    ]);
    module.linkImports();
    await loadAndResolveDependenciesPromise;
  }
  fetchResolvedDependency(source, importer, resolvedId) {
    if (resolvedId.external) {
      const { attributes, external, id, moduleSideEffects, meta } = resolvedId;
      let externalModule = this.modulesById.get(id);
      if (!externalModule) {
        externalModule = new ExternalModule(this.options, id, moduleSideEffects, meta, external !== "absolute" && isAbsolute(id), attributes);
        this.modulesById.set(id, externalModule);
      } else if (!(externalModule instanceof ExternalModule)) {
        return error(logInternalIdCannotBeExternal(source, importer));
      } else if (doAttributesDiffer(externalModule.info.attributes, attributes)) {
        this.options.onLog(LOGLEVEL_WARN, logInconsistentImportAttributes(externalModule.info.attributes, attributes, source, importer));
      }
      return Promise.resolve(externalModule);
    }
    return this.fetchModule(resolvedId, importer, false, false);
  }
  async fetchStaticDependencies(module, resolveStaticDependencyPromises) {
    for (const dependency of await Promise.all(resolveStaticDependencyPromises.map((resolveStaticDependencyPromise) => resolveStaticDependencyPromise.then(([source, resolvedId]) => this.fetchResolvedDependency(source, module.id, resolvedId))))) {
      module.dependencies.add(dependency);
      dependency.importers.push(module.id);
    }
    if (!this.options.treeshake || module.info.moduleSideEffects === "no-treeshake") {
      for (const dependency of module.dependencies) {
        if (dependency instanceof Module) {
          dependency.importedFromNotTreeshaken = true;
        }
      }
    }
  }
  getNormalizedResolvedIdWithoutDefaults(resolveIdResult, importer, source) {
    const { makeAbsoluteExternalsRelative } = this.options;
    if (resolveIdResult) {
      if (typeof resolveIdResult === "object") {
        const external2 = resolveIdResult.external || this.options.external(resolveIdResult.id, importer, true);
        return {
          ...resolveIdResult,
          external: external2 && (external2 === "relative" || !isAbsolute(resolveIdResult.id) || external2 === true && isNotAbsoluteExternal(resolveIdResult.id, source, makeAbsoluteExternalsRelative) || "absolute")
        };
      }
      const external = this.options.external(resolveIdResult, importer, true);
      return {
        external: external && (isNotAbsoluteExternal(resolveIdResult, source, makeAbsoluteExternalsRelative) || "absolute"),
        id: external && makeAbsoluteExternalsRelative ? normalizeRelativeExternalId(resolveIdResult, importer) : resolveIdResult
      };
    }
    const id = makeAbsoluteExternalsRelative ? normalizeRelativeExternalId(source, importer) : source;
    if (resolveIdResult !== false && !this.options.external(id, importer, true)) {
      return null;
    }
    return {
      external: isNotAbsoluteExternal(id, source, makeAbsoluteExternalsRelative) || "absolute",
      id
    };
  }
  getResolveDynamicImportPromises(module) {
    return module.dynamicImports.map(async (dynamicImport) => {
      const resolvedId = await this.resolveDynamicImport(module, dynamicImport.argument, module.id, getAttributesFromImportExpression(dynamicImport.node));
      if (resolvedId && typeof resolvedId === "object") {
        dynamicImport.id = resolvedId.id;
      }
      return [dynamicImport, resolvedId];
    });
  }
  getResolveStaticDependencyPromises(module) {
    return Array.from(module.sourcesWithAttributes, async ([source, attributes]) => [
      source,
      module.resolvedIds[source] = module.resolvedIds[source] || this.handleInvalidResolvedId(await this.resolveId(source, module.id, EMPTY_OBJECT, false, attributes), source, module.id, attributes)
    ]);
  }
  getResolvedIdWithDefaults(resolvedId, attributes) {
    if (!resolvedId) {
      return null;
    }
    const external = resolvedId.external || false;
    return {
      attributes: resolvedId.attributes || attributes,
      external,
      id: resolvedId.id,
      meta: resolvedId.meta || {},
      moduleSideEffects: resolvedId.moduleSideEffects ?? this.hasModuleSideEffects(resolvedId.id, !!external),
      resolvedBy: resolvedId.resolvedBy ?? "rollup",
      syntheticNamedExports: resolvedId.syntheticNamedExports ?? false
    };
  }
  async handleExistingModule(module, isEntry, isPreload) {
    const loadPromise = this.moduleLoadPromises.get(module);
    if (isPreload) {
      return isPreload === RESOLVE_DEPENDENCIES ? waitForDependencyResolution(loadPromise) : loadPromise;
    }
    if (isEntry) {
      module.info.isEntry = true;
      this.implicitEntryModules.delete(module);
      for (const dependant of module.implicitlyLoadedAfter) {
        dependant.implicitlyLoadedBefore.delete(module);
      }
      module.implicitlyLoadedAfter.clear();
    }
    return this.fetchModuleDependencies(module, ...await loadPromise);
  }
  handleInvalidResolvedId(resolvedId, source, importer, attributes) {
    if (resolvedId === null) {
      if (isRelative(source)) {
        return error(logUnresolvedImport(source, importer));
      }
      this.options.onLog(LOGLEVEL_WARN, logUnresolvedImportTreatedAsExternal(source, importer));
      return {
        attributes,
        external: true,
        id: source,
        meta: {},
        moduleSideEffects: this.hasModuleSideEffects(source, true),
        resolvedBy: "rollup",
        syntheticNamedExports: false
      };
    } else if (resolvedId.external && resolvedId.syntheticNamedExports) {
      this.options.onLog(LOGLEVEL_WARN, logExternalSyntheticExports(source, importer));
    }
    return resolvedId;
  }
  async loadEntryModule(unresolvedId, isEntry, importer, implicitlyLoadedBefore, isLoadForManualChunks = false) {
    const resolveIdResult = await resolveId(unresolvedId, importer, this.options.preserveSymlinks, this.pluginDriver, this.resolveId, null, EMPTY_OBJECT, true, EMPTY_OBJECT);
    if (resolveIdResult == null) {
      return error(implicitlyLoadedBefore === null ? logUnresolvedEntry(unresolvedId) : logUnresolvedImplicitDependant(unresolvedId, implicitlyLoadedBefore));
    }
    const isExternalModules = typeof resolveIdResult === "object" && resolveIdResult.external;
    if (resolveIdResult === false || isExternalModules) {
      return error(implicitlyLoadedBefore === null ? isExternalModules && isLoadForManualChunks ? logExternalModulesCannotBeIncludedInManualChunks(unresolvedId) : logEntryCannotBeExternal(unresolvedId) : logImplicitDependantCannotBeExternal(unresolvedId, implicitlyLoadedBefore));
    }
    return this.fetchModule(this.getResolvedIdWithDefaults(typeof resolveIdResult === "object" ? resolveIdResult : { id: resolveIdResult }, EMPTY_OBJECT), void 0, isEntry, false);
  }
  async resolveDynamicImport(module, specifier, importer, attributes) {
    const resolution = await this.pluginDriver.hookFirst("resolveDynamicImport", [
      specifier,
      importer,
      { attributes }
    ]);
    if (typeof specifier !== "string") {
      if (typeof resolution === "string") {
        return resolution;
      }
      if (!resolution) {
        return null;
      }
      return this.getResolvedIdWithDefaults(resolution, attributes);
    }
    if (resolution == null) {
      const existingResolution = module.resolvedIds[specifier];
      if (existingResolution) {
        if (doAttributesDiffer(existingResolution.attributes, attributes)) {
          this.options.onLog(LOGLEVEL_WARN, logInconsistentImportAttributes(existingResolution.attributes, attributes, specifier, importer));
        }
        return existingResolution;
      }
      return module.resolvedIds[specifier] = this.handleInvalidResolvedId(await this.resolveId(specifier, module.id, EMPTY_OBJECT, false, attributes), specifier, module.id, attributes);
    }
    return this.handleInvalidResolvedId(this.getResolvedIdWithDefaults(this.getNormalizedResolvedIdWithoutDefaults(resolution, importer, specifier), attributes), specifier, importer, attributes);
  }
};
function normalizeRelativeExternalId(source, importer) {
  return isRelative(source) ? importer ? resolve$1(importer, "..", source) : resolve$1(source) : source;
}
function addChunkNamesToModule(module, { fileName, name }, isUserDefined, priority) {
  if (fileName !== null) {
    module.chunkFileNames.add(fileName);
  } else if (name !== null) {
    let namePosition = 0;
    while (module.chunkNames[namePosition]?.priority < priority)
      namePosition++;
    module.chunkNames.splice(namePosition, 0, { isUserDefined, name, priority });
  }
}
function isNotAbsoluteExternal(id, source, makeAbsoluteExternalsRelative) {
  return makeAbsoluteExternalsRelative === true || makeAbsoluteExternalsRelative === "ifRelativeSource" && isRelative(source) || !isAbsolute(id);
}
async function waitForDependencyResolution(loadPromise) {
  const [resolveStaticDependencyPromises, resolveDynamicImportPromises] = await loadPromise;
  return Promise.all([...resolveStaticDependencyPromises, ...resolveDynamicImportPromises]);
}
var GlobalScope = class extends Scope {
  constructor() {
    super();
    this.parent = null;
    this.variables.set("undefined", new UndefinedVariable());
  }
  findVariable(name) {
    let variable = this.variables.get(name);
    if (!variable) {
      variable = new GlobalVariable(name);
      this.variables.set(name, variable);
    }
    return variable;
  }
};
function generateAssetFileName(name, source, sourceHash, outputOptions, bundle) {
  const emittedName = outputOptions.sanitizeFileName(name || "asset");
  return makeUnique(renderNamePattern(typeof outputOptions.assetFileNames === "function" ? outputOptions.assetFileNames({ name, source, type: "asset" }) : outputOptions.assetFileNames, "output.assetFileNames", {
    ext: () => extname(emittedName).slice(1),
    extname: () => extname(emittedName),
    hash: (size) => sourceHash.slice(0, Math.max(0, size || DEFAULT_HASH_SIZE)),
    name: () => emittedName.slice(0, Math.max(0, emittedName.length - extname(emittedName).length))
  }), bundle);
}
function reserveFileNameInBundle(fileName, { bundle }, log) {
  if (bundle[lowercaseBundleKeys].has(fileName.toLowerCase())) {
    log(LOGLEVEL_WARN, logFileNameConflict(fileName));
  } else {
    bundle[fileName] = FILE_PLACEHOLDER;
  }
}
var emittedFileTypes = /* @__PURE__ */ new Set(["chunk", "asset", "prebuilt-chunk"]);
function hasValidType(emittedFile) {
  return Boolean(emittedFile && emittedFileTypes.has(emittedFile.type));
}
function hasValidName(emittedFile) {
  const validatedName = emittedFile.fileName || emittedFile.name;
  return !validatedName || typeof validatedName === "string" && !isPathFragment(validatedName);
}
function getValidSource(source, emittedFile, fileReferenceId) {
  if (!(typeof source === "string" || source instanceof Uint8Array)) {
    const assetName = emittedFile.fileName || emittedFile.name || fileReferenceId;
    return error(logFailedValidation(`Could not set source for ${typeof assetName === "string" ? `asset "${assetName}"` : "unnamed asset"}, asset source needs to be a string, Uint8Array or Buffer.`));
  }
  return source;
}
function getAssetFileName(file, referenceId) {
  if (typeof file.fileName !== "string") {
    return error(logAssetNotFinalisedForFileName(file.name || referenceId));
  }
  return file.fileName;
}
function getChunkFileName(file, facadeChunkByModule) {
  if (file.fileName) {
    return file.fileName;
  }
  if (facadeChunkByModule) {
    return facadeChunkByModule.get(file.module).getFileName();
  }
  return error(logChunkNotGeneratedForFileName(file.fileName || file.name));
}
var FileEmitter = class {
  constructor(graph, options, baseFileEmitter) {
    this.graph = graph;
    this.options = options;
    this.facadeChunkByModule = null;
    this.nextIdBase = 1;
    this.output = null;
    this.outputFileEmitters = [];
    this.emitFile = (emittedFile) => {
      if (!hasValidType(emittedFile)) {
        return error(logFailedValidation(`Emitted files must be of type "asset", "chunk" or "prebuilt-chunk", received "${emittedFile && emittedFile.type}".`));
      }
      if (emittedFile.type === "prebuilt-chunk") {
        return this.emitPrebuiltChunk(emittedFile);
      }
      if (!hasValidName(emittedFile)) {
        return error(logFailedValidation(`The "fileName" or "name" properties of emitted chunks and assets must be strings that are neither absolute nor relative paths, received "${emittedFile.fileName || emittedFile.name}".`));
      }
      if (emittedFile.type === "chunk") {
        return this.emitChunk(emittedFile);
      }
      return this.emitAsset(emittedFile);
    };
    this.finaliseAssets = () => {
      for (const [referenceId, emittedFile] of this.filesByReferenceId) {
        if (emittedFile.type === "asset" && typeof emittedFile.fileName !== "string")
          return error(logNoAssetSourceSet(emittedFile.name || referenceId));
      }
    };
    this.getFileName = (fileReferenceId) => {
      const emittedFile = this.filesByReferenceId.get(fileReferenceId);
      if (!emittedFile)
        return error(logFileReferenceIdNotFoundForFilename(fileReferenceId));
      if (emittedFile.type === "chunk") {
        return getChunkFileName(emittedFile, this.facadeChunkByModule);
      }
      if (emittedFile.type === "prebuilt-chunk") {
        return emittedFile.fileName;
      }
      return getAssetFileName(emittedFile, fileReferenceId);
    };
    this.setAssetSource = (referenceId, requestedSource) => {
      const consumedFile = this.filesByReferenceId.get(referenceId);
      if (!consumedFile)
        return error(logAssetReferenceIdNotFoundForSetSource(referenceId));
      if (consumedFile.type !== "asset") {
        return error(logFailedValidation(`Asset sources can only be set for emitted assets but "${referenceId}" is an emitted chunk.`));
      }
      if (consumedFile.source !== void 0) {
        return error(logAssetSourceAlreadySet(consumedFile.name || referenceId));
      }
      const source = getValidSource(requestedSource, consumedFile, referenceId);
      if (this.output) {
        this.finalizeAdditionalAsset(consumedFile, source, this.output);
      } else {
        consumedFile.source = source;
        for (const emitter of this.outputFileEmitters) {
          emitter.finalizeAdditionalAsset(consumedFile, source, emitter.output);
        }
      }
    };
    this.setChunkInformation = (facadeChunkByModule) => {
      this.facadeChunkByModule = facadeChunkByModule;
    };
    this.setOutputBundle = (bundle, outputOptions) => {
      const getHash = hasherByType[outputOptions.hashCharacters];
      const output = this.output = {
        bundle,
        fileNamesBySource: /* @__PURE__ */ new Map(),
        getHash,
        outputOptions
      };
      for (const emittedFile of this.filesByReferenceId.values()) {
        if (emittedFile.fileName) {
          reserveFileNameInBundle(emittedFile.fileName, output, this.options.onLog);
        }
      }
      const consumedAssetsByHash = /* @__PURE__ */ new Map();
      for (const consumedFile of this.filesByReferenceId.values()) {
        if (consumedFile.type === "asset" && consumedFile.source !== void 0) {
          if (consumedFile.fileName) {
            this.finalizeAdditionalAsset(consumedFile, consumedFile.source, output);
          } else {
            const sourceHash = getHash(consumedFile.source);
            getOrCreate(consumedAssetsByHash, sourceHash, () => []).push(consumedFile);
          }
        } else if (consumedFile.type === "prebuilt-chunk") {
          this.output.bundle[consumedFile.fileName] = this.createPrebuiltChunk(consumedFile);
        }
      }
      for (const [sourceHash, consumedFiles] of consumedAssetsByHash) {
        this.finalizeAssetsWithSameSource(consumedFiles, sourceHash, output);
      }
    };
    this.filesByReferenceId = baseFileEmitter ? new Map(baseFileEmitter.filesByReferenceId) : /* @__PURE__ */ new Map();
    baseFileEmitter?.addOutputFileEmitter(this);
  }
  addOutputFileEmitter(outputFileEmitter) {
    this.outputFileEmitters.push(outputFileEmitter);
  }
  assignReferenceId(file, idBase) {
    let referenceId = idBase;
    do {
      referenceId = getHash64(referenceId).slice(0, 8).replaceAll("-", "$");
    } while (this.filesByReferenceId.has(referenceId) || this.outputFileEmitters.some(({ filesByReferenceId }) => filesByReferenceId.has(referenceId)));
    file.referenceId = referenceId;
    this.filesByReferenceId.set(referenceId, file);
    for (const { filesByReferenceId } of this.outputFileEmitters) {
      filesByReferenceId.set(referenceId, file);
    }
    return referenceId;
  }
  createPrebuiltChunk(prebuiltChunk) {
    return {
      code: prebuiltChunk.code,
      dynamicImports: [],
      exports: prebuiltChunk.exports || [],
      facadeModuleId: null,
      fileName: prebuiltChunk.fileName,
      implicitlyLoadedBefore: [],
      importedBindings: {},
      imports: [],
      isDynamicEntry: false,
      isEntry: false,
      isImplicitEntry: false,
      map: prebuiltChunk.map || null,
      moduleIds: [],
      modules: {},
      name: prebuiltChunk.fileName,
      preliminaryFileName: prebuiltChunk.fileName,
      referencedFiles: [],
      sourcemapFileName: prebuiltChunk.sourcemapFileName || null,
      type: "chunk"
    };
  }
  emitAsset(emittedAsset) {
    const source = emittedAsset.source === void 0 ? void 0 : getValidSource(emittedAsset.source, emittedAsset, null);
    const consumedAsset = {
      fileName: emittedAsset.fileName,
      name: emittedAsset.name,
      needsCodeReference: !!emittedAsset.needsCodeReference,
      referenceId: "",
      source,
      type: "asset"
    };
    const referenceId = this.assignReferenceId(consumedAsset, emittedAsset.fileName || emittedAsset.name || String(this.nextIdBase++));
    if (this.output) {
      this.emitAssetWithReferenceId(consumedAsset, this.output);
    } else {
      for (const fileEmitter of this.outputFileEmitters) {
        fileEmitter.emitAssetWithReferenceId(consumedAsset, fileEmitter.output);
      }
    }
    return referenceId;
  }
  emitAssetWithReferenceId(consumedAsset, output) {
    const { fileName, source } = consumedAsset;
    if (fileName) {
      reserveFileNameInBundle(fileName, output, this.options.onLog);
    }
    if (source !== void 0) {
      this.finalizeAdditionalAsset(consumedAsset, source, output);
    }
  }
  emitChunk(emittedChunk) {
    if (this.graph.phase > BuildPhase.LOAD_AND_PARSE) {
      return error(logInvalidRollupPhaseForChunkEmission());
    }
    if (typeof emittedChunk.id !== "string") {
      return error(logFailedValidation(`Emitted chunks need to have a valid string id, received "${emittedChunk.id}"`));
    }
    const consumedChunk = {
      fileName: emittedChunk.fileName,
      module: null,
      name: emittedChunk.name || emittedChunk.id,
      referenceId: "",
      type: "chunk"
    };
    this.graph.moduleLoader.emitChunk(emittedChunk).then((module) => consumedChunk.module = module).catch(() => {
    });
    return this.assignReferenceId(consumedChunk, emittedChunk.id);
  }
  emitPrebuiltChunk(emitPrebuiltChunk) {
    if (typeof emitPrebuiltChunk.code !== "string") {
      return error(logFailedValidation(`Emitted prebuilt chunks need to have a valid string code, received "${emitPrebuiltChunk.code}".`));
    }
    if (typeof emitPrebuiltChunk.fileName !== "string" || isPathFragment(emitPrebuiltChunk.fileName)) {
      return error(logFailedValidation(`The "fileName" property of emitted prebuilt chunks must be strings that are neither absolute nor relative paths, received "${emitPrebuiltChunk.fileName}".`));
    }
    const consumedPrebuiltChunk = {
      code: emitPrebuiltChunk.code,
      exports: emitPrebuiltChunk.exports,
      fileName: emitPrebuiltChunk.fileName,
      map: emitPrebuiltChunk.map,
      referenceId: "",
      type: "prebuilt-chunk"
    };
    const referenceId = this.assignReferenceId(consumedPrebuiltChunk, consumedPrebuiltChunk.fileName);
    if (this.output) {
      this.output.bundle[consumedPrebuiltChunk.fileName] = this.createPrebuiltChunk(consumedPrebuiltChunk);
    }
    return referenceId;
  }
  finalizeAdditionalAsset(consumedFile, source, { bundle, fileNamesBySource, getHash, outputOptions }) {
    let { fileName, needsCodeReference, referenceId } = consumedFile;
    if (!fileName) {
      const sourceHash = getHash(source);
      fileName = fileNamesBySource.get(sourceHash);
      if (!fileName) {
        fileName = generateAssetFileName(consumedFile.name, source, sourceHash, outputOptions, bundle);
        fileNamesBySource.set(sourceHash, fileName);
      }
    }
    const assetWithFileName = { ...consumedFile, fileName, source };
    this.filesByReferenceId.set(referenceId, assetWithFileName);
    const existingAsset = bundle[fileName];
    if (existingAsset?.type === "asset") {
      existingAsset.needsCodeReference &&= needsCodeReference;
    } else {
      bundle[fileName] = {
        fileName,
        name: consumedFile.name,
        needsCodeReference,
        source,
        type: "asset"
      };
    }
  }
  finalizeAssetsWithSameSource(consumedFiles, sourceHash, { bundle, fileNamesBySource, outputOptions }) {
    let fileName = "";
    let usedConsumedFile;
    let needsCodeReference = true;
    for (const consumedFile of consumedFiles) {
      needsCodeReference &&= consumedFile.needsCodeReference;
      const assetFileName = generateAssetFileName(consumedFile.name, consumedFile.source, sourceHash, outputOptions, bundle);
      if (!fileName || assetFileName.length < fileName.length || assetFileName.length === fileName.length && assetFileName < fileName) {
        fileName = assetFileName;
        usedConsumedFile = consumedFile;
      }
    }
    fileNamesBySource.set(sourceHash, fileName);
    for (const consumedFile of consumedFiles) {
      const assetWithFileName = { ...consumedFile, fileName };
      this.filesByReferenceId.set(consumedFile.referenceId, assetWithFileName);
    }
    bundle[fileName] = {
      fileName,
      name: usedConsumedFile.name,
      needsCodeReference,
      source: usedConsumedFile.source,
      type: "asset"
    };
  }
};
function getLogHandler(level, code, logger, pluginName, logLevel) {
  if (logLevelPriority[level] < logLevelPriority[logLevel]) {
    return doNothing;
  }
  return (log, pos) => {
    if (pos != null) {
      logger(LOGLEVEL_WARN, logInvalidLogPosition(pluginName));
    }
    log = normalizeLog(log);
    if (log.code && !log.pluginCode) {
      log.pluginCode = log.code;
    }
    log.code = code;
    log.plugin = pluginName;
    logger(level, log);
  };
}
function getPluginContext(plugin, pluginCache, graph, options, fileEmitter, existingPluginNames) {
  const { logLevel, onLog } = options;
  let cacheable = true;
  if (typeof plugin.cacheKey !== "string") {
    if (plugin.name.startsWith(ANONYMOUS_PLUGIN_PREFIX) || plugin.name.startsWith(ANONYMOUS_OUTPUT_PLUGIN_PREFIX) || existingPluginNames.has(plugin.name)) {
      cacheable = false;
    } else {
      existingPluginNames.add(plugin.name);
    }
  }
  let cacheInstance;
  if (!pluginCache) {
    cacheInstance = NO_CACHE;
  } else if (cacheable) {
    const cacheKey = plugin.cacheKey || plugin.name;
    cacheInstance = createPluginCache(pluginCache[cacheKey] || (pluginCache[cacheKey] = /* @__PURE__ */ Object.create(null)));
  } else {
    cacheInstance = getCacheForUncacheablePlugin(plugin.name);
  }
  return {
    addWatchFile(id) {
      graph.watchFiles[id] = true;
    },
    cache: cacheInstance,
    debug: getLogHandler(LOGLEVEL_DEBUG, "PLUGIN_LOG", onLog, plugin.name, logLevel),
    emitFile: fileEmitter.emitFile.bind(fileEmitter),
    error(error_) {
      return error(logPluginError(normalizeLog(error_), plugin.name));
    },
    getFileName: fileEmitter.getFileName,
    getModuleIds: () => graph.modulesById.keys(),
    getModuleInfo: graph.getModuleInfo,
    getWatchFiles: () => Object.keys(graph.watchFiles),
    info: getLogHandler(LOGLEVEL_INFO, "PLUGIN_LOG", onLog, plugin.name, logLevel),
    load(resolvedId) {
      return graph.moduleLoader.preloadModule(resolvedId);
    },
    meta: {
      rollupVersion: version,
      watchMode: graph.watchMode
    },
    parse: parseAst,
    resolve(source, importer, { attributes, custom, isEntry, skipSelf } = BLANK) {
      skipSelf ??= true;
      return graph.moduleLoader.resolveId(source, importer, custom, isEntry, attributes || EMPTY_OBJECT, skipSelf ? [{ importer, plugin, source }] : null);
    },
    setAssetSource: fileEmitter.setAssetSource,
    warn: getLogHandler(LOGLEVEL_WARN, "PLUGIN_WARNING", onLog, plugin.name, logLevel)
  };
}
var inputHookNames = {
  buildEnd: 1,
  buildStart: 1,
  closeBundle: 1,
  closeWatcher: 1,
  load: 1,
  moduleParsed: 1,
  onLog: 1,
  options: 1,
  resolveDynamicImport: 1,
  resolveId: 1,
  shouldTransformCachedModule: 1,
  transform: 1,
  watchChange: 1
};
var inputHooks = Object.keys(inputHookNames);
var PluginDriver = class _PluginDriver {
  constructor(graph, options, userPlugins, pluginCache, basePluginDriver) {
    this.graph = graph;
    this.options = options;
    this.pluginCache = pluginCache;
    this.sortedPlugins = /* @__PURE__ */ new Map();
    this.unfulfilledActions = /* @__PURE__ */ new Set();
    this.fileEmitter = new FileEmitter(graph, options, basePluginDriver && basePluginDriver.fileEmitter);
    this.emitFile = this.fileEmitter.emitFile.bind(this.fileEmitter);
    this.getFileName = this.fileEmitter.getFileName.bind(this.fileEmitter);
    this.finaliseAssets = this.fileEmitter.finaliseAssets.bind(this.fileEmitter);
    this.setChunkInformation = this.fileEmitter.setChunkInformation.bind(this.fileEmitter);
    this.setOutputBundle = this.fileEmitter.setOutputBundle.bind(this.fileEmitter);
    this.plugins = [...basePluginDriver ? basePluginDriver.plugins : [], ...userPlugins];
    const existingPluginNames = /* @__PURE__ */ new Set();
    this.pluginContexts = new Map(this.plugins.map((plugin) => [
      plugin,
      getPluginContext(plugin, pluginCache, graph, options, this.fileEmitter, existingPluginNames)
    ]));
    if (basePluginDriver) {
      for (const plugin of userPlugins) {
        for (const hook of inputHooks) {
          if (hook in plugin) {
            options.onLog(LOGLEVEL_WARN, logInputHookInOutputPlugin(plugin.name, hook));
          }
        }
      }
    }
  }
  createOutputPluginDriver(plugins) {
    return new _PluginDriver(this.graph, this.options, plugins, this.pluginCache, this);
  }
  getUnfulfilledHookActions() {
    return this.unfulfilledActions;
  }
  // chains, first non-null result stops and returns
  hookFirst(hookName, parameters, replaceContext, skipped) {
    return this.hookFirstAndGetPlugin(hookName, parameters, replaceContext, skipped).then((result) => result && result[0]);
  }
  // chains, first non-null result stops and returns result and last plugin
  async hookFirstAndGetPlugin(hookName, parameters, replaceContext, skipped) {
    for (const plugin of this.getSortedPlugins(hookName)) {
      if (skipped?.has(plugin))
        continue;
      const result = await this.runHook(hookName, parameters, plugin, replaceContext);
      if (result != null)
        return [result, plugin];
    }
    return null;
  }
  // chains synchronously, first non-null result stops and returns
  hookFirstSync(hookName, parameters, replaceContext) {
    for (const plugin of this.getSortedPlugins(hookName)) {
      const result = this.runHookSync(hookName, parameters, plugin, replaceContext);
      if (result != null)
        return result;
    }
    return null;
  }
  // parallel, ignores returns
  async hookParallel(hookName, parameters, replaceContext) {
    const parallelPromises = [];
    for (const plugin of this.getSortedPlugins(hookName)) {
      if (plugin[hookName].sequential) {
        await Promise.all(parallelPromises);
        parallelPromises.length = 0;
        await this.runHook(hookName, parameters, plugin, replaceContext);
      } else {
        parallelPromises.push(this.runHook(hookName, parameters, plugin, replaceContext));
      }
    }
    await Promise.all(parallelPromises);
  }
  // chains, reduces returned value, handling the reduced value as the first hook argument
  hookReduceArg0(hookName, [argument0, ...rest], reduce, replaceContext) {
    let promise = Promise.resolve(argument0);
    for (const plugin of this.getSortedPlugins(hookName)) {
      promise = promise.then((argument02) => this.runHook(hookName, [argument02, ...rest], plugin, replaceContext).then((result) => reduce.call(this.pluginContexts.get(plugin), argument02, result, plugin)));
    }
    return promise;
  }
  // chains synchronously, reduces returned value, handling the reduced value as the first hook argument
  hookReduceArg0Sync(hookName, [argument0, ...rest], reduce, replaceContext) {
    for (const plugin of this.getSortedPlugins(hookName)) {
      const parameters = [argument0, ...rest];
      const result = this.runHookSync(hookName, parameters, plugin, replaceContext);
      argument0 = reduce.call(this.pluginContexts.get(plugin), argument0, result, plugin);
    }
    return argument0;
  }
  // chains, reduces returned value to type string, handling the reduced value separately. permits hooks as values.
  async hookReduceValue(hookName, initialValue, parameters, reducer) {
    const results = [];
    const parallelResults = [];
    for (const plugin of this.getSortedPlugins(hookName, validateAddonPluginHandler)) {
      if (plugin[hookName].sequential) {
        results.push(...await Promise.all(parallelResults));
        parallelResults.length = 0;
        results.push(await this.runHook(hookName, parameters, plugin));
      } else {
        parallelResults.push(this.runHook(hookName, parameters, plugin));
      }
    }
    results.push(...await Promise.all(parallelResults));
    return results.reduce(reducer, await initialValue);
  }
  // chains synchronously, reduces returned value to type T, handling the reduced value separately. permits hooks as values.
  hookReduceValueSync(hookName, initialValue, parameters, reduce, replaceContext) {
    let accumulator = initialValue;
    for (const plugin of this.getSortedPlugins(hookName)) {
      const result = this.runHookSync(hookName, parameters, plugin, replaceContext);
      accumulator = reduce.call(this.pluginContexts.get(plugin), accumulator, result, plugin);
    }
    return accumulator;
  }
  // chains, ignores returns
  hookSeq(hookName, parameters, replaceContext) {
    let promise = Promise.resolve();
    for (const plugin of this.getSortedPlugins(hookName)) {
      promise = promise.then(() => this.runHook(hookName, parameters, plugin, replaceContext));
    }
    return promise.then(noReturn);
  }
  getSortedPlugins(hookName, validateHandler) {
    return getOrCreate(this.sortedPlugins, hookName, () => getSortedValidatedPlugins(hookName, this.plugins, validateHandler));
  }
  // Implementation signature
  runHook(hookName, parameters, plugin, replaceContext) {
    const hook = plugin[hookName];
    const handler = typeof hook === "object" ? hook.handler : hook;
    let context = this.pluginContexts.get(plugin);
    if (replaceContext) {
      context = replaceContext(context, plugin);
    }
    let action = null;
    return Promise.resolve().then(() => {
      if (typeof handler !== "function") {
        return handler;
      }
      const hookResult = handler.apply(context, parameters);
      if (!hookResult?.then) {
        return hookResult;
      }
      action = [plugin.name, hookName, parameters];
      this.unfulfilledActions.add(action);
      return Promise.resolve(hookResult).then((result) => {
        this.unfulfilledActions.delete(action);
        return result;
      });
    }).catch((error_) => {
      if (action !== null) {
        this.unfulfilledActions.delete(action);
      }
      return error(logPluginError(error_, plugin.name, { hook: hookName }));
    });
  }
  /**
   * Run a sync plugin hook and return the result.
   * @param hookName Name of the plugin hook. Must be in `PluginHooks`.
   * @param args Arguments passed to the plugin hook.
   * @param plugin The acutal plugin
   * @param replaceContext When passed, the plugin context can be overridden.
   */
  runHookSync(hookName, parameters, plugin, replaceContext) {
    const hook = plugin[hookName];
    const handler = typeof hook === "object" ? hook.handler : hook;
    let context = this.pluginContexts.get(plugin);
    if (replaceContext) {
      context = replaceContext(context, plugin);
    }
    try {
      return handler.apply(context, parameters);
    } catch (error_) {
      return error(logPluginError(error_, plugin.name, { hook: hookName }));
    }
  }
};
function getSortedValidatedPlugins(hookName, plugins, validateHandler = validateFunctionPluginHandler) {
  const pre = [];
  const normal = [];
  const post = [];
  for (const plugin of plugins) {
    const hook = plugin[hookName];
    if (hook) {
      if (typeof hook === "object") {
        validateHandler(hook.handler, hookName, plugin);
        if (hook.order === "pre") {
          pre.push(plugin);
          continue;
        }
        if (hook.order === "post") {
          post.push(plugin);
          continue;
        }
      } else {
        validateHandler(hook, hookName, plugin);
      }
      normal.push(plugin);
    }
  }
  return [...pre, ...normal, ...post];
}
function validateFunctionPluginHandler(handler, hookName, plugin) {
  if (typeof handler !== "function") {
    error(logInvalidFunctionPluginHook(hookName, plugin.name));
  }
}
function validateAddonPluginHandler(handler, hookName, plugin) {
  if (typeof handler !== "string" && typeof handler !== "function") {
    return error(logInvalidAddonPluginHook(hookName, plugin.name));
  }
}
function noReturn() {
}
var Queue = class {
  constructor(maxParallel) {
    this.maxParallel = maxParallel;
    this.queue = [];
    this.workerCount = 0;
  }
  run(task) {
    return new Promise((resolve2, reject) => {
      this.queue.push({ reject, resolve: resolve2, task });
      this.work();
    });
  }
  async work() {
    if (this.workerCount >= this.maxParallel)
      return;
    this.workerCount++;
    let entry;
    while (entry = this.queue.shift()) {
      const { reject, resolve: resolve2, task } = entry;
      try {
        const result = await task();
        resolve2(result);
      } catch (error2) {
        reject(error2);
      }
    }
    this.workerCount--;
  }
};
function normalizeEntryModules(entryModules) {
  if (Array.isArray(entryModules)) {
    return entryModules.map((id) => ({
      fileName: null,
      id,
      implicitlyLoadedAfter: [],
      importer: void 0,
      name: null
    }));
  }
  return Object.entries(entryModules).map(([name, id]) => ({
    fileName: null,
    id,
    implicitlyLoadedAfter: [],
    importer: void 0,
    name
  }));
}
var Graph = class {
  constructor(options, watcher) {
    this.options = options;
    this.astLru = flru(5);
    this.cachedModules = /* @__PURE__ */ new Map();
    this.deoptimizationTracker = new PathTracker();
    this.entryModules = [];
    this.modulesById = /* @__PURE__ */ new Map();
    this.needsTreeshakingPass = false;
    this.phase = BuildPhase.LOAD_AND_PARSE;
    this.scope = new GlobalScope();
    this.watchFiles = /* @__PURE__ */ Object.create(null);
    this.watchMode = false;
    this.externalModules = [];
    this.implicitEntryModules = [];
    this.modules = [];
    this.getModuleInfo = (moduleId) => {
      const foundModule = this.modulesById.get(moduleId);
      if (!foundModule)
        return null;
      return foundModule.info;
    };
    if (options.cache !== false) {
      if (options.cache?.modules) {
        for (const module of options.cache.modules)
          this.cachedModules.set(module.id, module);
      }
      this.pluginCache = options.cache?.plugins || /* @__PURE__ */ Object.create(null);
      for (const name in this.pluginCache) {
        const cache = this.pluginCache[name];
        for (const value of Object.values(cache))
          value[0]++;
      }
    }
    if (watcher) {
      this.watchMode = true;
      const handleChange = (...parameters) => this.pluginDriver.hookParallel("watchChange", parameters);
      const handleClose = () => this.pluginDriver.hookParallel("closeWatcher", []);
      watcher.onCurrentRun("change", handleChange);
      watcher.onCurrentRun("close", handleClose);
    }
    this.pluginDriver = new PluginDriver(this, options, options.plugins, this.pluginCache);
    this.moduleLoader = new ModuleLoader(this, this.modulesById, this.options, this.pluginDriver);
    this.fileOperationQueue = new Queue(options.maxParallelFileOps);
    this.pureFunctions = getPureFunctions(options);
  }
  async build() {
    timeStart("generate module graph", 2);
    await this.generateModuleGraph();
    timeEnd("generate module graph", 2);
    timeStart("sort and bind modules", 2);
    this.phase = BuildPhase.ANALYSE;
    this.sortModules();
    timeEnd("sort and bind modules", 2);
    timeStart("mark included statements", 2);
    this.includeStatements();
    timeEnd("mark included statements", 2);
    this.phase = BuildPhase.GENERATE;
  }
  getCache() {
    for (const name in this.pluginCache) {
      const cache = this.pluginCache[name];
      let allDeleted = true;
      for (const [key, value] of Object.entries(cache)) {
        if (value[0] >= this.options.experimentalCacheExpiry)
          delete cache[key];
        else
          allDeleted = false;
      }
      if (allDeleted)
        delete this.pluginCache[name];
    }
    return {
      modules: this.modules.map((module) => module.toJSON()),
      plugins: this.pluginCache
    };
  }
  async generateModuleGraph() {
    ({ entryModules: this.entryModules, implicitEntryModules: this.implicitEntryModules } = await this.moduleLoader.addEntryModules(normalizeEntryModules(this.options.input), true));
    if (this.entryModules.length === 0) {
      throw new Error("You must supply options.input to rollup");
    }
    for (const module of this.modulesById.values()) {
      if (module instanceof Module) {
        this.modules.push(module);
      } else {
        this.externalModules.push(module);
      }
    }
  }
  includeStatements() {
    const entryModules = [...this.entryModules, ...this.implicitEntryModules];
    for (const module of entryModules) {
      markModuleAndImpureDependenciesAsExecuted(module);
    }
    if (this.options.treeshake) {
      let treeshakingPass = 1;
      do {
        timeStart(`treeshaking pass ${treeshakingPass}`, 3);
        this.needsTreeshakingPass = false;
        for (const module of this.modules) {
          if (module.isExecuted) {
            if (module.info.moduleSideEffects === "no-treeshake") {
              module.includeAllInBundle();
            } else {
              module.include();
            }
          }
        }
        if (treeshakingPass === 1) {
          for (const module of entryModules) {
            if (module.preserveSignature !== false) {
              module.includeAllExports(false);
              this.needsTreeshakingPass = true;
            }
          }
        }
        timeEnd(`treeshaking pass ${treeshakingPass++}`, 3);
      } while (this.needsTreeshakingPass);
    } else {
      for (const module of this.modules)
        module.includeAllInBundle();
    }
    for (const externalModule of this.externalModules)
      externalModule.warnUnusedImports();
    for (const module of this.implicitEntryModules) {
      for (const dependant of module.implicitlyLoadedAfter) {
        if (!(dependant.info.isEntry || dependant.isIncluded())) {
          error(logImplicitDependantIsNotIncluded(dependant));
        }
      }
    }
  }
  sortModules() {
    const { orderedModules, cyclePaths } = analyseModuleExecution(this.entryModules);
    for (const cyclePath of cyclePaths) {
      this.options.onLog(LOGLEVEL_WARN, logCircularDependency(cyclePath));
    }
    this.modules = orderedModules;
    for (const module of this.modules) {
      module.bindReferences();
    }
    this.warnForMissingExports();
  }
  warnForMissingExports() {
    for (const module of this.modules) {
      for (const importDescription of module.importDescriptions.values()) {
        if (importDescription.name !== "*" && !importDescription.module.getVariableForExportName(importDescription.name)[0]) {
          module.log(LOGLEVEL_WARN, logMissingExport(importDescription.name, module.id, importDescription.module.id), importDescription.start);
        }
      }
    }
  }
};
function formatAction([pluginName, hookName, parameters]) {
  const action = `(${pluginName}) ${hookName}`;
  const s = JSON.stringify;
  switch (hookName) {
    case "resolveId": {
      return `${action} ${s(parameters[0])} ${s(parameters[1])}`;
    }
    case "load": {
      return `${action} ${s(parameters[0])}`;
    }
    case "transform": {
      return `${action} ${s(parameters[1])}`;
    }
    case "shouldTransformCachedModule": {
      return `${action} ${s(parameters[0].id)}`;
    }
    case "moduleParsed": {
      return `${action} ${s(parameters[0].id)}`;
    }
  }
  return action;
}
var handleBeforeExit = null;
var rejectByPluginDriver = /* @__PURE__ */ new Map();
async function catchUnfinishedHookActions(pluginDriver, callback) {
  const emptyEventLoopPromise = new Promise((_, reject) => {
    rejectByPluginDriver.set(pluginDriver, reject);
    if (!handleBeforeExit) {
      handleBeforeExit = () => {
        for (const [pluginDriver2, reject2] of rejectByPluginDriver) {
          const unfulfilledActions = pluginDriver2.getUnfulfilledHookActions();
          reject2(new Error(`Unexpected early exit. This happens when Promises returned by plugins cannot resolve. Unfinished hook action(s) on exit:
` + [...unfulfilledActions].map(formatAction).join("\n")));
        }
      };
      process$1.once("beforeExit", handleBeforeExit);
    }
  });
  try {
    return await Promise.race([callback(), emptyEventLoopPromise]);
  } finally {
    rejectByPluginDriver.delete(pluginDriver);
    if (rejectByPluginDriver.size === 0) {
      process$1.off("beforeExit", handleBeforeExit);
      handleBeforeExit = null;
    }
  }
}
async function initWasm() {
}
function getLogger(plugins, onLog, watchMode, logLevel) {
  plugins = getSortedValidatedPlugins("onLog", plugins);
  const minimalPriority = logLevelPriority[logLevel];
  const logger = (level, log, skipped = EMPTY_SET) => {
    const logPriority = logLevelPriority[level];
    if (logPriority < minimalPriority) {
      return;
    }
    for (const plugin of plugins) {
      if (skipped.has(plugin))
        continue;
      const { onLog: pluginOnLog } = plugin;
      const getLogHandler2 = (level2) => {
        if (logLevelPriority[level2] < minimalPriority) {
          return doNothing;
        }
        return (log2) => logger(level2, normalizeLog(log2), new Set(skipped).add(plugin));
      };
      const handler = "handler" in pluginOnLog ? pluginOnLog.handler : pluginOnLog;
      if (handler.call({
        debug: getLogHandler2(LOGLEVEL_DEBUG),
        error: (log2) => error(normalizeLog(log2)),
        info: getLogHandler2(LOGLEVEL_INFO),
        meta: { rollupVersion: version, watchMode },
        warn: getLogHandler2(LOGLEVEL_WARN)
      }, level, log) === false) {
        return;
      }
    }
    onLog(level, log);
  };
  return logger;
}
function ensureArray(items) {
  if (Array.isArray(items)) {
    return items.filter(Boolean);
  }
  if (items) {
    return [items];
  }
  return [];
}
async function normalizeInputOptions(config, watchMode) {
  const unsetOptions = /* @__PURE__ */ new Set();
  const context = config.context ?? "undefined";
  const plugins = await normalizePluginOption(config.plugins);
  const logLevel = config.logLevel || LOGLEVEL_INFO;
  const onLog = getLogger(plugins, getOnLog(config, logLevel), watchMode, logLevel);
  const strictDeprecations = config.strictDeprecations || false;
  const maxParallelFileOps = getMaxParallelFileOps(config);
  const options = {
    cache: getCache(config),
    context,
    experimentalCacheExpiry: config.experimentalCacheExpiry ?? 10,
    experimentalLogSideEffects: config.experimentalLogSideEffects || false,
    external: getIdMatcher(config.external),
    input: getInput(config),
    logLevel,
    makeAbsoluteExternalsRelative: config.makeAbsoluteExternalsRelative ?? "ifRelativeSource",
    maxParallelFileOps,
    moduleContext: getModuleContext(config, context),
    onLog,
    perf: config.perf || false,
    plugins,
    preserveEntrySignatures: config.preserveEntrySignatures ?? "exports-only",
    preserveSymlinks: config.preserveSymlinks || false,
    shimMissingExports: config.shimMissingExports || false,
    strictDeprecations,
    treeshake: getTreeshake(config)
  };
  warnUnknownOptions(config, [...Object.keys(options), "onwarn", "watch"], "input options", onLog, /^(output)$/);
  return { options, unsetOptions };
}
var getCache = (config) => config.cache === true ? void 0 : config.cache?.cache || config.cache;
var getIdMatcher = (option) => {
  if (option === true) {
    return () => true;
  }
  if (typeof option === "function") {
    return (id, ...parameters) => !id.startsWith("\0") && option(id, ...parameters) || false;
  }
  if (option) {
    const ids = /* @__PURE__ */ new Set();
    const matchers = [];
    for (const value of ensureArray(option)) {
      if (value instanceof RegExp) {
        matchers.push(value);
      } else {
        ids.add(value);
      }
    }
    return (id, ..._arguments) => ids.has(id) || matchers.some((matcher) => matcher.test(id));
  }
  return () => false;
};
var getInput = (config) => {
  const configInput = config.input;
  return configInput == null ? [] : typeof configInput === "string" ? [configInput] : configInput;
};
var getMaxParallelFileOps = (config) => {
  const maxParallelFileOps = config.maxParallelFileOps;
  if (typeof maxParallelFileOps === "number") {
    if (maxParallelFileOps <= 0)
      return Infinity;
    return maxParallelFileOps;
  }
  return 20;
};
var getModuleContext = (config, context) => {
  const configModuleContext = config.moduleContext;
  if (typeof configModuleContext === "function") {
    return (id) => configModuleContext(id) ?? context;
  }
  if (configModuleContext) {
    const contextByModuleId = /* @__PURE__ */ Object.create(null);
    for (const [key, moduleContext] of Object.entries(configModuleContext)) {
      contextByModuleId[resolve$1(key)] = moduleContext;
    }
    return (id) => contextByModuleId[id] ?? context;
  }
  return () => context;
};
var getTreeshake = (config) => {
  const configTreeshake = config.treeshake;
  if (configTreeshake === false) {
    return false;
  }
  const configWithPreset = getOptionWithPreset(config.treeshake, treeshakePresets, "treeshake", URL_TREESHAKE, "false, true, ");
  return {
    annotations: configWithPreset.annotations !== false,
    correctVarValueBeforeDeclaration: configWithPreset.correctVarValueBeforeDeclaration === true,
    manualPureFunctions: configWithPreset.manualPureFunctions ?? EMPTY_ARRAY,
    moduleSideEffects: getHasModuleSideEffects(configWithPreset.moduleSideEffects),
    propertyReadSideEffects: configWithPreset.propertyReadSideEffects === "always" ? "always" : configWithPreset.propertyReadSideEffects !== false,
    tryCatchDeoptimization: configWithPreset.tryCatchDeoptimization !== false,
    unknownGlobalSideEffects: configWithPreset.unknownGlobalSideEffects !== false
  };
};
var getHasModuleSideEffects = (moduleSideEffectsOption) => {
  if (typeof moduleSideEffectsOption === "boolean") {
    return () => moduleSideEffectsOption;
  }
  if (moduleSideEffectsOption === "no-external") {
    return (_id, external) => !external;
  }
  if (typeof moduleSideEffectsOption === "function") {
    return (id, external) => id.startsWith("\0") ? true : moduleSideEffectsOption(id, external) !== false;
  }
  if (Array.isArray(moduleSideEffectsOption)) {
    const ids = new Set(moduleSideEffectsOption);
    return (id) => ids.has(id);
  }
  if (moduleSideEffectsOption) {
    error(logInvalidOption("treeshake.moduleSideEffects", URL_TREESHAKE_MODULESIDEEFFECTS, 'please use one of false, "no-external", a function or an array'));
  }
  return () => true;
};
var INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
var DRIVE_LETTER_REGEX = /^[a-z]:/i;
function sanitizeFileName(name) {
  const match = DRIVE_LETTER_REGEX.exec(name);
  const driveLetter = match ? match[0] : "";
  return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "_");
}
async function normalizeOutputOptions(config, inputOptions, unsetInputOptions) {
  const unsetOptions = new Set(unsetInputOptions);
  const compact = config.compact || false;
  const format = getFormat(config);
  const inlineDynamicImports = getInlineDynamicImports(config, inputOptions);
  const preserveModules = getPreserveModules(config, inlineDynamicImports, inputOptions);
  const file = getFile(config, preserveModules, inputOptions);
  const generatedCode = getGeneratedCode(config);
  const externalImportAttributes = getExternalImportAttributes(config, inputOptions);
  const outputOptions = {
    amd: getAmd(config),
    assetFileNames: config.assetFileNames ?? "assets/[name]-[hash][extname]",
    banner: getAddon(config, "banner"),
    chunkFileNames: config.chunkFileNames ?? "[name]-[hash].js",
    compact,
    dir: getDir(config, file),
    dynamicImportInCjs: config.dynamicImportInCjs ?? true,
    entryFileNames: getEntryFileNames(config, unsetOptions),
    esModule: config.esModule ?? "if-default-prop",
    experimentalMinChunkSize: config.experimentalMinChunkSize ?? 1,
    exports: getExports(config, unsetOptions),
    extend: config.extend || false,
    externalImportAssertions: externalImportAttributes,
    externalImportAttributes,
    externalLiveBindings: config.externalLiveBindings ?? true,
    file,
    footer: getAddon(config, "footer"),
    format,
    freeze: config.freeze ?? true,
    generatedCode,
    globals: config.globals || {},
    hashCharacters: config.hashCharacters ?? "base64",
    hoistTransitiveImports: config.hoistTransitiveImports ?? true,
    indent: getIndent(config, compact),
    inlineDynamicImports,
    interop: getInterop(config),
    intro: getAddon(config, "intro"),
    manualChunks: getManualChunks(config, inlineDynamicImports, preserveModules),
    minifyInternalExports: getMinifyInternalExports(config, format, compact),
    name: config.name,
    noConflict: config.noConflict || false,
    outro: getAddon(config, "outro"),
    paths: config.paths || {},
    plugins: await normalizePluginOption(config.plugins),
    preserveModules,
    preserveModulesRoot: getPreserveModulesRoot(config),
    reexportProtoFromExternal: config.reexportProtoFromExternal ?? true,
    sanitizeFileName: typeof config.sanitizeFileName === "function" ? config.sanitizeFileName : config.sanitizeFileName === false ? (id) => id : sanitizeFileName,
    sourcemap: config.sourcemap || false,
    sourcemapBaseUrl: getSourcemapBaseUrl(config),
    sourcemapExcludeSources: config.sourcemapExcludeSources || false,
    sourcemapFile: config.sourcemapFile,
    sourcemapFileNames: getSourcemapFileNames(config, unsetOptions),
    sourcemapIgnoreList: typeof config.sourcemapIgnoreList === "function" ? config.sourcemapIgnoreList : config.sourcemapIgnoreList === false ? () => false : (relativeSourcePath) => relativeSourcePath.includes("node_modules"),
    sourcemapPathTransform: config.sourcemapPathTransform,
    strict: config.strict ?? true,
    systemNullSetters: config.systemNullSetters ?? true,
    validate: config.validate || false
  };
  warnUnknownOptions(config, Object.keys(outputOptions), "output options", inputOptions.onLog);
  return { options: outputOptions, unsetOptions };
}
var getFile = (config, preserveModules, inputOptions) => {
  const { file } = config;
  if (typeof file === "string") {
    if (preserveModules) {
      return error(logInvalidOption("output.file", URL_OUTPUT_DIR, 'you must set "output.dir" instead of "output.file" when using the "output.preserveModules" option'));
    }
    if (!Array.isArray(inputOptions.input))
      return error(logInvalidOption("output.file", URL_OUTPUT_DIR, 'you must set "output.dir" instead of "output.file" when providing named inputs'));
  }
  return file;
};
var getFormat = (config) => {
  const configFormat = config.format;
  switch (configFormat) {
    case void 0:
    case "es":
    case "esm":
    case "module": {
      return "es";
    }
    case "cjs":
    case "commonjs": {
      return "cjs";
    }
    case "system":
    case "systemjs": {
      return "system";
    }
    case "amd":
    case "iife":
    case "umd": {
      return configFormat;
    }
    default: {
      return error(logInvalidOption("output.format", URL_OUTPUT_FORMAT, `Valid values are "amd", "cjs", "system", "es", "iife" or "umd"`, configFormat));
    }
  }
};
var getInlineDynamicImports = (config, inputOptions) => {
  const inlineDynamicImports = config.inlineDynamicImports || false;
  const { input } = inputOptions;
  if (inlineDynamicImports && (Array.isArray(input) ? input : Object.keys(input)).length > 1) {
    return error(logInvalidOption("output.inlineDynamicImports", URL_OUTPUT_INLINEDYNAMICIMPORTS, 'multiple inputs are not supported when "output.inlineDynamicImports" is true'));
  }
  return inlineDynamicImports;
};
var getPreserveModules = (config, inlineDynamicImports, inputOptions) => {
  const preserveModules = config.preserveModules || false;
  if (preserveModules) {
    if (inlineDynamicImports) {
      return error(logInvalidOption("output.inlineDynamicImports", URL_OUTPUT_INLINEDYNAMICIMPORTS, `this option is not supported for "output.preserveModules"`));
    }
    if (inputOptions.preserveEntrySignatures === false) {
      return error(logInvalidOption("preserveEntrySignatures", URL_PRESERVEENTRYSIGNATURES, 'setting this option to false is not supported for "output.preserveModules"'));
    }
  }
  return preserveModules;
};
var getPreserveModulesRoot = (config) => {
  const { preserveModulesRoot } = config;
  if (preserveModulesRoot === null || preserveModulesRoot === void 0) {
    return void 0;
  }
  return resolve$1(preserveModulesRoot);
};
var getAmd = (config) => {
  const mergedOption = {
    autoId: false,
    basePath: "",
    define: "define",
    forceJsExtensionForImports: false,
    ...config.amd
  };
  if ((mergedOption.autoId || mergedOption.basePath) && mergedOption.id) {
    return error(logInvalidOption("output.amd.id", URL_OUTPUT_AMD_ID, 'this option cannot be used together with "output.amd.autoId"/"output.amd.basePath"'));
  }
  if (mergedOption.basePath && !mergedOption.autoId) {
    return error(logInvalidOption("output.amd.basePath", URL_OUTPUT_AMD_BASEPATH, 'this option only works with "output.amd.autoId"'));
  }
  return mergedOption.autoId ? {
    autoId: true,
    basePath: mergedOption.basePath,
    define: mergedOption.define,
    forceJsExtensionForImports: mergedOption.forceJsExtensionForImports
  } : {
    autoId: false,
    define: mergedOption.define,
    forceJsExtensionForImports: mergedOption.forceJsExtensionForImports,
    id: mergedOption.id
  };
};
var getAddon = (config, name) => {
  const configAddon = config[name];
  if (typeof configAddon === "function") {
    return configAddon;
  }
  return () => configAddon || "";
};
var getDir = (config, file) => {
  const { dir } = config;
  if (typeof dir === "string" && typeof file === "string") {
    return error(logInvalidOption("output.dir", URL_OUTPUT_DIR, 'you must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks'));
  }
  return dir;
};
var getEntryFileNames = (config, unsetOptions) => {
  const configEntryFileNames = config.entryFileNames;
  if (configEntryFileNames == null) {
    unsetOptions.add("entryFileNames");
  }
  return configEntryFileNames ?? "[name].js";
};
function getExports(config, unsetOptions) {
  const configExports = config.exports;
  if (configExports == null) {
    unsetOptions.add("exports");
  } else if (!["default", "named", "none", "auto"].includes(configExports)) {
    return error(logInvalidExportOptionValue(configExports));
  }
  return configExports || "auto";
}
var getExternalImportAttributes = (config, inputOptions) => {
  if (config.externalImportAssertions != void 0) {
    warnDeprecation(`The "output.externalImportAssertions" option is deprecated. Use the "output.externalImportAttributes" option instead.`, URL_OUTPUT_EXTERNALIMPORTATTRIBUTES, true, inputOptions);
  }
  return config.externalImportAttributes ?? config.externalImportAssertions ?? true;
};
var getGeneratedCode = (config) => {
  const configWithPreset = getOptionWithPreset(config.generatedCode, generatedCodePresets, "output.generatedCode", URL_OUTPUT_GENERATEDCODE, "");
  return {
    arrowFunctions: configWithPreset.arrowFunctions === true,
    constBindings: configWithPreset.constBindings === true,
    objectShorthand: configWithPreset.objectShorthand === true,
    reservedNamesAsProps: configWithPreset.reservedNamesAsProps !== false,
    symbols: configWithPreset.symbols === true
  };
};
var getIndent = (config, compact) => {
  if (compact) {
    return "";
  }
  const configIndent = config.indent;
  return configIndent === false ? "" : configIndent ?? true;
};
var ALLOWED_INTEROP_TYPES = /* @__PURE__ */ new Set([
  "compat",
  "auto",
  "esModule",
  "default",
  "defaultOnly"
]);
var getInterop = (config) => {
  const configInterop = config.interop;
  if (typeof configInterop === "function") {
    const interopPerId = /* @__PURE__ */ Object.create(null);
    let defaultInterop = null;
    return (id) => id === null ? defaultInterop || validateInterop(defaultInterop = configInterop(id)) : id in interopPerId ? interopPerId[id] : validateInterop(interopPerId[id] = configInterop(id));
  }
  return configInterop === void 0 ? () => "default" : () => validateInterop(configInterop);
};
var validateInterop = (interop) => {
  if (!ALLOWED_INTEROP_TYPES.has(interop)) {
    return error(logInvalidOption(
      "output.interop",
      URL_OUTPUT_INTEROP,
      // eslint-disable-next-line unicorn/prefer-spread
      `use one of ${Array.from(ALLOWED_INTEROP_TYPES, (value) => JSON.stringify(value)).join(", ")}`,
      interop
    ));
  }
  return interop;
};
var getManualChunks = (config, inlineDynamicImports, preserveModules) => {
  const configManualChunks = config.manualChunks;
  if (configManualChunks) {
    if (inlineDynamicImports) {
      return error(logInvalidOption("output.manualChunks", URL_OUTPUT_MANUALCHUNKS, 'this option is not supported for "output.inlineDynamicImports"'));
    }
    if (preserveModules) {
      return error(logInvalidOption("output.manualChunks", URL_OUTPUT_MANUALCHUNKS, 'this option is not supported for "output.preserveModules"'));
    }
  }
  return configManualChunks || {};
};
var getMinifyInternalExports = (config, format, compact) => config.minifyInternalExports ?? (compact || format === "es" || format === "system");
var getSourcemapFileNames = (config, unsetOptions) => {
  const configSourcemapFileNames = config.sourcemapFileNames;
  if (configSourcemapFileNames == null) {
    unsetOptions.add("sourcemapFileNames");
  }
  return configSourcemapFileNames;
};
var getSourcemapBaseUrl = (config) => {
  const { sourcemapBaseUrl } = config;
  if (sourcemapBaseUrl) {
    if (isValidUrl(sourcemapBaseUrl)) {
      return addTrailingSlashIfMissed(sourcemapBaseUrl);
    }
    return error(logInvalidOption("output.sourcemapBaseUrl", URL_OUTPUT_SOURCEMAPBASEURL, `must be a valid URL, received ${JSON.stringify(sourcemapBaseUrl)}`));
  }
};
function rollup(rawInputOptions) {
  return rollupInternal(rawInputOptions, null);
}
async function rollupInternal(rawInputOptions, watcher) {
  const { options: inputOptions, unsetOptions: unsetInputOptions } = await getInputOptions(rawInputOptions, watcher !== null);
  initialiseTimers(inputOptions);
  await initWasm();
  const graph = new Graph(inputOptions, watcher);
  const useCache = rawInputOptions.cache !== false;
  if (rawInputOptions.cache) {
    inputOptions.cache = void 0;
    rawInputOptions.cache = void 0;
  }
  timeStart("BUILD", 1);
  await catchUnfinishedHookActions(graph.pluginDriver, async () => {
    try {
      timeStart("initialize", 2);
      await graph.pluginDriver.hookParallel("buildStart", [inputOptions]);
      timeEnd("initialize", 2);
      await graph.build();
    } catch (error_) {
      const watchFiles = Object.keys(graph.watchFiles);
      if (watchFiles.length > 0) {
        error_.watchFiles = watchFiles;
      }
      await graph.pluginDriver.hookParallel("buildEnd", [error_]);
      await graph.pluginDriver.hookParallel("closeBundle", []);
      throw error_;
    }
    await graph.pluginDriver.hookParallel("buildEnd", []);
  });
  timeEnd("BUILD", 1);
  const result = {
    cache: useCache ? graph.getCache() : void 0,
    async close() {
      if (result.closed)
        return;
      result.closed = true;
      await graph.pluginDriver.hookParallel("closeBundle", []);
    },
    closed: false,
    async generate(rawOutputOptions) {
      if (result.closed)
        return error(logAlreadyClosed());
      return handleGenerateWrite(false, inputOptions, unsetInputOptions, rawOutputOptions, graph);
    },
    get watchFiles() {
      return Object.keys(graph.watchFiles);
    },
    async write(rawOutputOptions) {
      if (result.closed)
        return error(logAlreadyClosed());
      return handleGenerateWrite(true, inputOptions, unsetInputOptions, rawOutputOptions, graph);
    }
  };
  if (inputOptions.perf)
    result.getTimings = getTimings;
  return result;
}
async function getInputOptions(initialInputOptions, watchMode) {
  if (!initialInputOptions) {
    throw new Error("You must supply an options object to rollup");
  }
  const processedInputOptions = await getProcessedInputOptions(initialInputOptions, watchMode);
  const { options, unsetOptions } = await normalizeInputOptions(processedInputOptions, watchMode);
  normalizePlugins(options.plugins, ANONYMOUS_PLUGIN_PREFIX);
  return { options, unsetOptions };
}
async function getProcessedInputOptions(inputOptions, watchMode) {
  const plugins = getSortedValidatedPlugins("options", await normalizePluginOption(inputOptions.plugins));
  const logLevel = inputOptions.logLevel || LOGLEVEL_INFO;
  const logger = getLogger(plugins, getOnLog(inputOptions, logLevel), watchMode, logLevel);
  for (const plugin of plugins) {
    const { name, options } = plugin;
    const handler = "handler" in options ? options.handler : options;
    const processedOptions = await handler.call({
      debug: getLogHandler(LOGLEVEL_DEBUG, "PLUGIN_LOG", logger, name, logLevel),
      error: (error_) => error(logPluginError(normalizeLog(error_), name, { hook: "onLog" })),
      info: getLogHandler(LOGLEVEL_INFO, "PLUGIN_LOG", logger, name, logLevel),
      meta: { rollupVersion: version, watchMode },
      warn: getLogHandler(LOGLEVEL_WARN, "PLUGIN_WARNING", logger, name, logLevel)
    }, inputOptions);
    if (processedOptions) {
      inputOptions = processedOptions;
    }
  }
  return inputOptions;
}
function normalizePlugins(plugins, anonymousPrefix) {
  for (const [index, plugin] of plugins.entries()) {
    if (!plugin.name) {
      plugin.name = `${anonymousPrefix}${index + 1}`;
    }
  }
}
async function handleGenerateWrite(isWrite, inputOptions, unsetInputOptions, rawOutputOptions, graph) {
  const { options: outputOptions, outputPluginDriver, unsetOptions } = await getOutputOptionsAndPluginDriver(rawOutputOptions, graph.pluginDriver, inputOptions, unsetInputOptions);
  return catchUnfinishedHookActions(outputPluginDriver, async () => {
    const bundle = new Bundle2(outputOptions, unsetOptions, inputOptions, outputPluginDriver, graph);
    const generated = await bundle.generate(isWrite);
    if (isWrite) {
      timeStart("WRITE", 1);
      if (!outputOptions.dir && !outputOptions.file) {
        return error(logMissingFileOrDirOption());
      }
      await Promise.all(Object.values(generated).map((chunk) => graph.fileOperationQueue.run(() => writeOutputFile(chunk, outputOptions))));
      await outputPluginDriver.hookParallel("writeBundle", [outputOptions, generated]);
      timeEnd("WRITE", 1);
    }
    return createOutput(generated);
  });
}
async function getOutputOptionsAndPluginDriver(rawOutputOptions, inputPluginDriver, inputOptions, unsetInputOptions) {
  if (!rawOutputOptions) {
    throw new Error("You must supply an options object");
  }
  const rawPlugins = await normalizePluginOption(rawOutputOptions.plugins);
  normalizePlugins(rawPlugins, ANONYMOUS_OUTPUT_PLUGIN_PREFIX);
  const outputPluginDriver = inputPluginDriver.createOutputPluginDriver(rawPlugins);
  return {
    ...await getOutputOptions(inputOptions, unsetInputOptions, rawOutputOptions, outputPluginDriver),
    outputPluginDriver
  };
}
function getOutputOptions(inputOptions, unsetInputOptions, rawOutputOptions, outputPluginDriver) {
  return normalizeOutputOptions(outputPluginDriver.hookReduceArg0Sync("outputOptions", [rawOutputOptions], (outputOptions, result) => result || outputOptions, (pluginContext) => {
    const emitError = () => pluginContext.error(logCannotEmitFromOptionsHook());
    return {
      ...pluginContext,
      emitFile: emitError,
      setAssetSource: emitError
    };
  }), inputOptions, unsetInputOptions);
}
function createOutput(outputBundle) {
  return {
    output: Object.values(outputBundle).filter((outputFile) => Object.keys(outputFile).length > 0).sort((outputFileA, outputFileB) => getSortingFileType(outputFileA) - getSortingFileType(outputFileB))
  };
}
var SortingFileType;
(function(SortingFileType2) {
  SortingFileType2[SortingFileType2["ENTRY_CHUNK"] = 0] = "ENTRY_CHUNK";
  SortingFileType2[SortingFileType2["SECONDARY_CHUNK"] = 1] = "SECONDARY_CHUNK";
  SortingFileType2[SortingFileType2["ASSET"] = 2] = "ASSET";
})(SortingFileType || (SortingFileType = {}));
function getSortingFileType(file) {
  if (file.type === "asset") {
    return SortingFileType.ASSET;
  }
  if (file.isEntry) {
    return SortingFileType.ENTRY_CHUNK;
  }
  return SortingFileType.SECONDARY_CHUNK;
}
async function writeOutputFile(outputFile, outputOptions) {
  const fileName = resolve$1(outputOptions.dir || dirname(outputOptions.file), outputFile.fileName);
  await mkdir(dirname(fileName), { recursive: true });
  return writeFile(fileName, outputFile.type === "asset" ? outputFile.source : outputFile.code);
}
function defineConfig(options) {
  return options;
}
var {
  env = {},
  argv = [],
  platform = ""
} = typeof process === "undefined" ? {} : process;
var isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
var isForced = "FORCE_COLOR" in env || argv.includes("--color");
var isWindows = platform === "win32";
var isDumbTerminal = env.TERM === "dumb";
var isCompatibleTerminal = tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal;
var isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
var isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
var replaceClose = (index, string, close, replace, head = string.substring(0, index) + replace, tail = string.substring(index + close.length), next = tail.indexOf(close)) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
var clearBleed = (index, string, open, close, replace) => index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
var filterEmpty = (open, close, replace = open, at = open.length + 1) => (string) => string || !(string === "" || string === void 0) ? clearBleed(
  ("" + string).indexOf(close, at),
  string,
  open,
  close,
  replace
) : "";
var init = (open, close, replace) => filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
var colors = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1B[22m\x1B[1m"),
  dim: init(2, 22, "\x1B[22m\x1B[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49)
};
var createColors = ({ useColor = isColorSupported } = {}) => useColor ? colors : Object.keys(colors).reduce(
  (colors2, key) => ({ ...colors2, [key]: String }),
  {}
);
createColors();
var { bold, cyan, dim, gray, green, red, underline, yellow } = createColors({
  useColor: env$1.FORCE_COLOR !== "0" && !env$1.NO_COLOR
});
var stderr = (...parameters) => process$1.stderr.write(`${parameters.join("")}
`);
function handleError(error2, recover = false) {
  const name = error2.name || error2.cause?.name;
  const nameSection = name ? `${name}: ` : "";
  const pluginSection = error2.plugin ? `(plugin ${error2.plugin}) ` : "";
  const message = `${pluginSection}${nameSection}${error2.message}`;
  const outputLines = [bold(red(`[!] ${bold(message.toString())}`))];
  if (error2.url) {
    outputLines.push(cyan(error2.url));
  }
  if (error2.loc) {
    outputLines.push(`${relativeId(error2.loc.file || error2.id)} (${error2.loc.line}:${error2.loc.column})`);
  } else if (error2.id) {
    outputLines.push(relativeId(error2.id));
  }
  if (error2.frame) {
    outputLines.push(dim(error2.frame));
  }
  if (error2.stack) {
    outputLines.push(dim(error2.stack?.replace(`${nameSection}${error2.message}
`, "")));
  }
  outputLines.push("", "");
  stderr(outputLines.join("\n"));
  if (!recover)
    process$1.exit(1);
}
var commandAliases = {
  c: "config",
  d: "dir",
  e: "external",
  f: "format",
  g: "globals",
  h: "help",
  i: "input",
  m: "sourcemap",
  n: "name",
  o: "file",
  p: "plugin",
  v: "version",
  w: "watch"
};
var EMPTY_COMMAND_OPTIONS = { external: [], globals: void 0 };
async function mergeOptions(config, watchMode, rawCommandOptions = EMPTY_COMMAND_OPTIONS, printLog) {
  const command = getCommandOptions(rawCommandOptions);
  const plugins = await normalizePluginOption(config.plugins);
  const logLevel = config.logLevel || LOGLEVEL_INFO;
  const onLog = getOnLog(config, logLevel, printLog);
  const log = getLogger(plugins, onLog, watchMode, logLevel);
  const inputOptions = mergeInputOptions(config, command, plugins, log, onLog);
  if (command.output) {
    Object.assign(command, command.output);
  }
  const outputOptionsArray = ensureArray(config.output);
  if (outputOptionsArray.length === 0)
    outputOptionsArray.push({});
  const outputOptions = await Promise.all(outputOptionsArray.map((singleOutputOptions) => mergeOutputOptions(singleOutputOptions, command, log)));
  warnUnknownOptions(command, [
    ...Object.keys(inputOptions),
    ...Object.keys(outputOptions[0]).filter((option) => option !== "sourcemapIgnoreList" && option !== "sourcemapPathTransform"),
    ...Object.keys(commandAliases),
    "bundleConfigAsCjs",
    "config",
    "configPlugin",
    "environment",
    "failAfterWarnings",
    "filterLogs",
    "forceExit",
    "plugin",
    "silent",
    "stdin",
    "waitForBundleInput"
  ], "CLI flags", log, /^_$|output$|config/);
  inputOptions.output = outputOptions;
  return inputOptions;
}
function getCommandOptions(rawCommandOptions) {
  const external = rawCommandOptions.external && typeof rawCommandOptions.external === "string" ? rawCommandOptions.external.split(",") : [];
  return {
    ...rawCommandOptions,
    external,
    globals: typeof rawCommandOptions.globals === "string" ? rawCommandOptions.globals.split(",").reduce((globals, globalDefinition) => {
      const [id, variableName] = globalDefinition.split(":");
      globals[id] = variableName;
      if (!external.includes(id)) {
        external.push(id);
      }
      return globals;
    }, /* @__PURE__ */ Object.create(null)) : void 0
  };
}
function mergeInputOptions(config, overrides, plugins, log, onLog) {
  const getOption = (name) => overrides[name] ?? config[name];
  const inputOptions = {
    cache: config.cache,
    context: getOption("context"),
    experimentalCacheExpiry: getOption("experimentalCacheExpiry"),
    experimentalLogSideEffects: getOption("experimentalLogSideEffects"),
    external: getExternal(config, overrides),
    input: getOption("input") || [],
    logLevel: getOption("logLevel"),
    makeAbsoluteExternalsRelative: getOption("makeAbsoluteExternalsRelative"),
    maxParallelFileOps: getOption("maxParallelFileOps"),
    moduleContext: getOption("moduleContext"),
    onLog,
    onwarn: void 0,
    perf: getOption("perf"),
    plugins,
    preserveEntrySignatures: getOption("preserveEntrySignatures"),
    preserveSymlinks: getOption("preserveSymlinks"),
    shimMissingExports: getOption("shimMissingExports"),
    strictDeprecations: getOption("strictDeprecations"),
    treeshake: getObjectOption(config, overrides, "treeshake", objectifyOptionWithPresets(treeshakePresets, "treeshake", URL_TREESHAKE, "false, true, ")),
    watch: getWatch(config, overrides)
  };
  warnUnknownOptions(config, Object.keys(inputOptions), "input options", log, /^output$/);
  return inputOptions;
}
var getExternal = (config, overrides) => {
  const configExternal = config.external;
  return typeof configExternal === "function" ? (source, importer, isResolved) => configExternal(source, importer, isResolved) || overrides.external.includes(source) : [...ensureArray(configExternal), ...overrides.external];
};
var getObjectOption = (config, overrides, name, objectifyValue = objectifyOption) => {
  const commandOption = normalizeObjectOptionValue(overrides[name], objectifyValue);
  const configOption = normalizeObjectOptionValue(config[name], objectifyValue);
  if (commandOption !== void 0) {
    return commandOption && { ...configOption, ...commandOption };
  }
  return configOption;
};
var getWatch = (config, overrides) => config.watch !== false && getObjectOption(config, overrides, "watch");
var normalizeObjectOptionValue = (optionValue, objectifyValue) => {
  if (!optionValue) {
    return optionValue;
  }
  if (Array.isArray(optionValue)) {
    return optionValue.reduce((result, value) => value && result && { ...result, ...objectifyValue(value) }, {});
  }
  return objectifyValue(optionValue);
};
async function mergeOutputOptions(config, overrides, log) {
  const getOption = (name) => overrides[name] ?? config[name];
  const outputOptions = {
    amd: getObjectOption(config, overrides, "amd"),
    assetFileNames: getOption("assetFileNames"),
    banner: getOption("banner"),
    chunkFileNames: getOption("chunkFileNames"),
    compact: getOption("compact"),
    dir: getOption("dir"),
    dynamicImportInCjs: getOption("dynamicImportInCjs"),
    entryFileNames: getOption("entryFileNames"),
    esModule: getOption("esModule"),
    experimentalMinChunkSize: getOption("experimentalMinChunkSize"),
    exports: getOption("exports"),
    extend: getOption("extend"),
    externalImportAssertions: getOption("externalImportAssertions"),
    externalImportAttributes: getOption("externalImportAttributes"),
    externalLiveBindings: getOption("externalLiveBindings"),
    file: getOption("file"),
    footer: getOption("footer"),
    format: getOption("format"),
    freeze: getOption("freeze"),
    generatedCode: getObjectOption(config, overrides, "generatedCode", objectifyOptionWithPresets(generatedCodePresets, "output.generatedCode", URL_OUTPUT_GENERATEDCODE, "")),
    globals: getOption("globals"),
    hashCharacters: getOption("hashCharacters"),
    hoistTransitiveImports: getOption("hoistTransitiveImports"),
    indent: getOption("indent"),
    inlineDynamicImports: getOption("inlineDynamicImports"),
    interop: getOption("interop"),
    intro: getOption("intro"),
    manualChunks: getOption("manualChunks"),
    minifyInternalExports: getOption("minifyInternalExports"),
    name: getOption("name"),
    noConflict: getOption("noConflict"),
    outro: getOption("outro"),
    paths: getOption("paths"),
    plugins: await normalizePluginOption(config.plugins),
    preserveModules: getOption("preserveModules"),
    preserveModulesRoot: getOption("preserveModulesRoot"),
    reexportProtoFromExternal: getOption("reexportProtoFromExternal"),
    sanitizeFileName: getOption("sanitizeFileName"),
    sourcemap: getOption("sourcemap"),
    sourcemapBaseUrl: getOption("sourcemapBaseUrl"),
    sourcemapExcludeSources: getOption("sourcemapExcludeSources"),
    sourcemapFile: getOption("sourcemapFile"),
    sourcemapFileNames: getOption("sourcemapFileNames"),
    sourcemapIgnoreList: getOption("sourcemapIgnoreList"),
    sourcemapPathTransform: getOption("sourcemapPathTransform"),
    strict: getOption("strict"),
    systemNullSetters: getOption("systemNullSetters"),
    validate: getOption("validate")
  };
  warnUnknownOptions(config, Object.keys(outputOptions), "output options", log);
  return outputOptions;
}
var WatchEmitter = class {
  constructor() {
    this.currentHandlers = /* @__PURE__ */ Object.create(null);
    this.persistentHandlers = /* @__PURE__ */ Object.create(null);
  }
  // Will be overwritten by Rollup
  async close() {
  }
  emit(event, ...parameters) {
    return Promise.all([...this.getCurrentHandlers(event), ...this.getPersistentHandlers(event)].map((handler) => handler(...parameters)));
  }
  off(event, listener) {
    const listeners = this.persistentHandlers[event];
    if (listeners) {
      listeners.splice(listeners.indexOf(listener) >>> 0, 1);
    }
    return this;
  }
  on(event, listener) {
    this.getPersistentHandlers(event).push(listener);
    return this;
  }
  onCurrentRun(event, listener) {
    this.getCurrentHandlers(event).push(listener);
    return this;
  }
  once(event, listener) {
    const selfRemovingListener = (...parameters) => {
      this.off(event, selfRemovingListener);
      return listener(...parameters);
    };
    this.on(event, selfRemovingListener);
    return this;
  }
  removeAllListeners() {
    this.removeListenersForCurrentRun();
    this.persistentHandlers = /* @__PURE__ */ Object.create(null);
    return this;
  }
  removeListenersForCurrentRun() {
    this.currentHandlers = /* @__PURE__ */ Object.create(null);
    return this;
  }
  getCurrentHandlers(event) {
    return this.currentHandlers[event] || (this.currentHandlers[event] = []);
  }
  getPersistentHandlers(event) {
    return this.persistentHandlers[event] || (this.persistentHandlers[event] = []);
  }
};
var fsEvents;
var fsEventsImportError;
async function loadFsEvents() {
  try {
    ({ default: fsEvents } = await import("fsevents"));
  } catch (error2) {
    fsEventsImportError = error2;
  }
}
function getFsEvents() {
  if (fsEventsImportError)
    throw fsEventsImportError;
  return fsEvents;
}
var fseventsImporter = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getFsEvents,
  loadFsEvents
}, Symbol.toStringTag, { value: "Module" });
function watch(configs) {
  const emitter = new WatchEmitter();
  watchInternal(configs, emitter).catch((error2) => {
    handleError(error2);
  });
  return emitter;
}
async function watchInternal(configs, emitter) {
  const optionsList = await Promise.all(ensureArray(configs).map((config) => mergeOptions(config, true)));
  const watchOptionsList = optionsList.filter((config) => config.watch !== false);
  if (watchOptionsList.length === 0) {
    return error(logInvalidOption("watch", URL_WATCH, 'there must be at least one config where "watch" is not set to "false"'));
  }
  await loadFsEvents();
  const { Watcher } = await import("./watch-ZPFPWRHD.js");
  new Watcher(watchOptionsList, emitter);
}

export {
  version,
  getAugmentedNamespace,
  picomatch,
  createFilter,
  rollup,
  rollupInternal,
  defineConfig,
  fseventsImporter,
  watch
};
/*! Bundled license information:

rollup/dist/es/shared/node-entry.js:
  (*
    @license
  	Rollup.js v4.12.0
  	Fri, 16 Feb 2024 13:31:42 GMT - commit 0146b84be33a8416b4df4b9382549a7ca19dd64a
  
  	https://github.com/rollup/rollup
  
  	Released under the MIT License.
  *)
*/
