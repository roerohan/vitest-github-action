import {
  relative
} from "./chunk-NEAEAVYU.js";
import {
  require_main
} from "./chunk-6MUWZ5DY.js";
import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-UPBZT3NW.js";

// node_modules/pretty-format/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/pretty-format/node_modules/ansi-styles/index.js"(exports, module) {
    "use strict";
    var ANSI_BACKGROUND_OFFSET = 10;
    var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles2 = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles2.color.gray = styles2.color.blackBright;
      styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
      styles2.color.grey = styles2.color.blackBright;
      styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles2)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles2[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles2[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles2, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles2, "codes", {
        value: codes,
        enumerable: false
      });
      styles2.color.close = "\x1B[39m";
      styles2.bgColor.close = "\x1B[49m";
      styles2.color.ansi256 = wrapAnsi256();
      styles2.color.ansi16m = wrapAnsi16m();
      styles2.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
      styles2.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
      Object.defineProperties(styles2, {
        rgbToAnsi256: {
          value: (red, green, blue) => {
            if (red === green && green === blue) {
              if (red < 8) {
                return 16;
              }
              if (red > 248) {
                return 231;
              }
              return Math.round((red - 8) / 247 * 24) + 232;
            }
            return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
          },
          enumerable: false
        },
        hexToRgb: {
          value: (hex2) => {
            const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex2.toString(16));
            if (!matches) {
              return [0, 0, 0];
            }
            let { colorString } = matches.groups;
            if (colorString.length === 3) {
              colorString = colorString.split("").map((character) => character + character).join("");
            }
            const integer = Number.parseInt(colorString, 16);
            return [
              integer >> 16 & 255,
              integer >> 8 & 255,
              integer & 255
            ];
          },
          enumerable: false
        },
        hexToAnsi256: {
          value: (hex2) => styles2.rgbToAnsi256(...styles2.hexToRgb(hex2)),
          enumerable: false
        }
      });
      return styles2;
    }
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/pretty-format/build/collections.js
var require_collections = __commonJS({
  "node_modules/pretty-format/build/collections.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.printIteratorEntries = printIteratorEntries;
    exports.printIteratorValues = printIteratorValues;
    exports.printListItems = printListItems;
    exports.printObjectProperties = printObjectProperties;
    var getKeysOfEnumerableProperties = (object, compareKeys) => {
      const rawKeys = Object.keys(object);
      const keys = compareKeys !== null ? rawKeys.sort(compareKeys) : rawKeys;
      if (Object.getOwnPropertySymbols) {
        Object.getOwnPropertySymbols(object).forEach((symbol) => {
          if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
            keys.push(symbol);
          }
        });
      }
      return keys;
    };
    function printIteratorEntries(iterator, config, indentation, depth, refs, printer, separator = ": ") {
      let result = "";
      let width = 0;
      let current = iterator.next();
      if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while (!current.done) {
          result += indentationNext;
          if (width++ === config.maxWidth) {
            result += "\u2026";
            break;
          }
          const name = printer(
            current.value[0],
            config,
            indentationNext,
            depth,
            refs
          );
          const value = printer(
            current.value[1],
            config,
            indentationNext,
            depth,
            refs
          );
          result += name + separator + value;
          current = iterator.next();
          if (!current.done) {
            result += `,${config.spacingInner}`;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printIteratorValues(iterator, config, indentation, depth, refs, printer) {
      let result = "";
      let width = 0;
      let current = iterator.next();
      if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while (!current.done) {
          result += indentationNext;
          if (width++ === config.maxWidth) {
            result += "\u2026";
            break;
          }
          result += printer(current.value, config, indentationNext, depth, refs);
          current = iterator.next();
          if (!current.done) {
            result += `,${config.spacingInner}`;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printListItems(list, config, indentation, depth, refs, printer) {
      let result = "";
      if (list.length) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for (let i = 0; i < list.length; i++) {
          result += indentationNext;
          if (i === config.maxWidth) {
            result += "\u2026";
            break;
          }
          if (i in list) {
            result += printer(list[i], config, indentationNext, depth, refs);
          }
          if (i < list.length - 1) {
            result += `,${config.spacingInner}`;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printObjectProperties(val, config, indentation, depth, refs, printer) {
      let result = "";
      const keys = getKeysOfEnumerableProperties(val, config.compareKeys);
      if (keys.length) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const name = printer(key, config, indentationNext, depth, refs);
          const value = printer(val[key], config, indentationNext, depth, refs);
          result += `${indentationNext + name}: ${value}`;
          if (i < keys.length - 1) {
            result += `,${config.spacingInner}`;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
  }
});

// node_modules/pretty-format/build/plugins/AsymmetricMatcher.js
var require_AsymmetricMatcher = __commonJS({
  "node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _collections = require_collections();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var asymmetricMatcher = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("jest.asymmetricMatcher") : 1267621;
    var SPACE = " ";
    var serialize = (val, config, indentation, depth, refs, printer) => {
      const stringedValue = val.toString();
      if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") {
        if (++depth > config.maxDepth) {
          return `[${stringedValue}]`;
        }
        return `${stringedValue + SPACE}[${(0, _collections.printListItems)(
          val.sample,
          config,
          indentation,
          depth,
          refs,
          printer
        )}]`;
      }
      if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") {
        if (++depth > config.maxDepth) {
          return `[${stringedValue}]`;
        }
        return `${stringedValue + SPACE}{${(0, _collections.printObjectProperties)(
          val.sample,
          config,
          indentation,
          depth,
          refs,
          printer
        )}}`;
      }
      if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching") {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }
      if (stringedValue === "StringContaining" || stringedValue === "StringNotContaining") {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }
      if (typeof val.toAsymmetricMatcher !== "function") {
        throw new Error(
          `Asymmetric matcher ${val.constructor.name} does not implement toAsymmetricMatcher()`
        );
      }
      return val.toAsymmetricMatcher();
    };
    exports.serialize = serialize;
    var test = (val) => val && val.$$typeof === asymmetricMatcher;
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/plugins/DOMCollection.js
var require_DOMCollection = __commonJS({
  "node_modules/pretty-format/build/plugins/DOMCollection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _collections = require_collections();
    var SPACE = " ";
    var OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
    var ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
    var testName = (name) => OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
    var test = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
    exports.test = test;
    var isNamedNodeMap = (collection) => collection.constructor.name === "NamedNodeMap";
    var serialize = (collection, config, indentation, depth, refs, printer) => {
      const name = collection.constructor.name;
      if (++depth > config.maxDepth) {
        return `[${name}]`;
      }
      return (config.min ? "" : name + SPACE) + (OBJECT_NAMES.indexOf(name) !== -1 ? `{${(0, _collections.printObjectProperties)(
        isNamedNodeMap(collection) ? Array.from(collection).reduce((props, attribute) => {
          props[attribute.name] = attribute.value;
          return props;
        }, {}) : {
          ...collection
        },
        config,
        indentation,
        depth,
        refs,
        printer
      )}}` : `[${(0, _collections.printListItems)(
        Array.from(collection),
        config,
        indentation,
        depth,
        refs,
        printer
      )}]`);
    };
    exports.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/plugins/lib/escapeHTML.js
var require_escapeHTML = __commonJS({
  "node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = escapeHTML;
    function escapeHTML(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }
});

// node_modules/pretty-format/build/plugins/lib/markup.js
var require_markup = __commonJS({
  "node_modules/pretty-format/build/plugins/lib/markup.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.printText = exports.printProps = exports.printElementAsLeaf = exports.printElement = exports.printComment = exports.printChildren = void 0;
    var _escapeHTML = _interopRequireDefault(require_escapeHTML());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var printProps = (keys, props, config, indentation, depth, refs, printer) => {
      const indentationNext = indentation + config.indent;
      const colors = config.colors;
      return keys.map((key) => {
        const value = props[key];
        let printed = printer(value, config, indentationNext, depth, refs);
        if (typeof value !== "string") {
          if (printed.indexOf("\n") !== -1) {
            printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
          }
          printed = `{${printed}}`;
        }
        return `${config.spacingInner + indentation + colors.prop.open + key + colors.prop.close}=${colors.value.open}${printed}${colors.value.close}`;
      }).join("");
    };
    exports.printProps = printProps;
    var printChildren = (children, config, indentation, depth, refs, printer) => children.map(
      (child) => config.spacingOuter + indentation + (typeof child === "string" ? printText(child, config) : printer(child, config, indentation, depth, refs))
    ).join("");
    exports.printChildren = printChildren;
    var printText = (text, config) => {
      const contentColor = config.colors.content;
      return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
    };
    exports.printText = printText;
    var printComment = (comment, config) => {
      const commentColor = config.colors.comment;
      return `${commentColor.open}<!--${(0, _escapeHTML.default)(comment)}-->${commentColor.close}`;
    };
    exports.printComment = printComment;
    var printElement = (type, printedProps, printedChildren, config, indentation) => {
      const tagColor = config.colors.tag;
      return `${tagColor.open}<${type}${printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open}${printedChildren ? `>${tagColor.close}${printedChildren}${config.spacingOuter}${indentation}${tagColor.open}</${type}` : `${printedProps && !config.min ? "" : " "}/`}>${tagColor.close}`;
    };
    exports.printElement = printElement;
    var printElementAsLeaf = (type, config) => {
      const tagColor = config.colors.tag;
      return `${tagColor.open}<${type}${tagColor.close} \u2026${tagColor.open} />${tagColor.close}`;
    };
    exports.printElementAsLeaf = printElementAsLeaf;
  }
});

// node_modules/pretty-format/build/plugins/DOMElement.js
var require_DOMElement = __commonJS({
  "node_modules/pretty-format/build/plugins/DOMElement.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _markup = require_markup();
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var FRAGMENT_NODE = 11;
    var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
    var testHasAttribute = (val) => {
      try {
        return typeof val.hasAttribute === "function" && val.hasAttribute("is");
      } catch {
        return false;
      }
    };
    var testNode = (val) => {
      const constructorName = val.constructor.name;
      const { nodeType, tagName } = val;
      const isCustomElement = typeof tagName === "string" && tagName.includes("-") || testHasAttribute(val);
      return nodeType === ELEMENT_NODE && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE && constructorName === "Text" || nodeType === COMMENT_NODE && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
    };
    var test = (val) => val?.constructor?.name && testNode(val);
    exports.test = test;
    function nodeIsText(node) {
      return node.nodeType === TEXT_NODE;
    }
    function nodeIsComment(node) {
      return node.nodeType === COMMENT_NODE;
    }
    function nodeIsFragment(node) {
      return node.nodeType === FRAGMENT_NODE;
    }
    var serialize = (node, config, indentation, depth, refs, printer) => {
      if (nodeIsText(node)) {
        return (0, _markup.printText)(node.data, config);
      }
      if (nodeIsComment(node)) {
        return (0, _markup.printComment)(node.data, config);
      }
      const type = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
      if (++depth > config.maxDepth) {
        return (0, _markup.printElementAsLeaf)(type, config);
      }
      return (0, _markup.printElement)(
        type,
        (0, _markup.printProps)(
          nodeIsFragment(node) ? [] : Array.from(node.attributes, (attr) => attr.name).sort(),
          nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
            props[attribute.name] = attribute.value;
            return props;
          }, {}),
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        (0, _markup.printChildren)(
          Array.prototype.slice.call(node.childNodes || node.children),
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        config,
        indentation
      );
    };
    exports.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/plugins/Immutable.js
var require_Immutable = __commonJS({
  "node_modules/pretty-format/build/plugins/Immutable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _collections = require_collections();
    var IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
    var IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
    var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
    var IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
    var IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
    var IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
    var IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
    var IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
    var IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
    var getImmutableName = (name) => `Immutable.${name}`;
    var printAsLeaf = (name) => `[${name}]`;
    var SPACE = " ";
    var LAZY = "\u2026";
    var printImmutableEntries = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : `${getImmutableName(type) + SPACE}{${(0, _collections.printIteratorEntries)(
      val.entries(),
      config,
      indentation,
      depth,
      refs,
      printer
    )}}`;
    function getRecordEntries(val) {
      let i = 0;
      return {
        next() {
          if (i < val._keys.length) {
            const key = val._keys[i++];
            return {
              done: false,
              value: [key, val.get(key)]
            };
          }
          return {
            done: true,
            value: void 0
          };
        }
      };
    }
    var printImmutableRecord = (val, config, indentation, depth, refs, printer) => {
      const name = getImmutableName(val._name || "Record");
      return ++depth > config.maxDepth ? printAsLeaf(name) : `${name + SPACE}{${(0, _collections.printIteratorEntries)(
        getRecordEntries(val),
        config,
        indentation,
        depth,
        refs,
        printer
      )}}`;
    };
    var printImmutableSeq = (val, config, indentation, depth, refs, printer) => {
      const name = getImmutableName("Seq");
      if (++depth > config.maxDepth) {
        return printAsLeaf(name);
      }
      if (val[IS_KEYED_SENTINEL]) {
        return `${name + SPACE}{${// from Immutable collection of entries or from ECMAScript object
        val._iter || val._object ? (0, _collections.printIteratorEntries)(
          val.entries(),
          config,
          indentation,
          depth,
          refs,
          printer
        ) : LAZY}}`;
      }
      return `${name + SPACE}[${val._iter || // from Immutable collection of values
      val._array || // from ECMAScript array
      val._collection || // from ECMAScript collection in immutable v4
      val._iterable ? (0, _collections.printIteratorValues)(
        val.values(),
        config,
        indentation,
        depth,
        refs,
        printer
      ) : LAZY}]`;
    };
    var printImmutableValues = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : `${getImmutableName(type) + SPACE}[${(0, _collections.printIteratorValues)(
      val.values(),
      config,
      indentation,
      depth,
      refs,
      printer
    )}]`;
    var serialize = (val, config, indentation, depth, refs, printer) => {
      if (val[IS_MAP_SENTINEL]) {
        return printImmutableEntries(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map"
        );
      }
      if (val[IS_LIST_SENTINEL]) {
        return printImmutableValues(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          "List"
        );
      }
      if (val[IS_SET_SENTINEL]) {
        return printImmutableValues(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set"
        );
      }
      if (val[IS_STACK_SENTINEL]) {
        return printImmutableValues(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          "Stack"
        );
      }
      if (val[IS_SEQ_SENTINEL]) {
        return printImmutableSeq(val, config, indentation, depth, refs, printer);
      }
      return printImmutableRecord(val, config, indentation, depth, refs, printer);
    };
    exports.serialize = serialize;
    var test = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b2 = Symbol.for("react.element");
    var c2 = Symbol.for("react.portal");
    var d2 = Symbol.for("react.fragment");
    var e = Symbol.for("react.strict_mode");
    var f = Symbol.for("react.profiler");
    var g = Symbol.for("react.provider");
    var h2 = Symbol.for("react.context");
    var k = Symbol.for("react.server_context");
    var l2 = Symbol.for("react.forward_ref");
    var m2 = Symbol.for("react.suspense");
    var n2 = Symbol.for("react.suspense_list");
    var p2 = Symbol.for("react.memo");
    var q = Symbol.for("react.lazy");
    var t2 = Symbol.for("react.offscreen");
    var u2;
    u2 = Symbol.for("react.module.reference");
    function v(a2) {
      if ("object" === typeof a2 && null !== a2) {
        var r2 = a2.$$typeof;
        switch (r2) {
          case b2:
            switch (a2 = a2.type, a2) {
              case d2:
              case f:
              case e:
              case m2:
              case n2:
                return a2;
              default:
                switch (a2 = a2 && a2.$$typeof, a2) {
                  case k:
                  case h2:
                  case l2:
                  case q:
                  case p2:
                  case g:
                    return a2;
                  default:
                    return r2;
                }
            }
          case c2:
            return r2;
        }
      }
    }
    exports.ContextConsumer = h2;
    exports.ContextProvider = g;
    exports.Element = b2;
    exports.ForwardRef = l2;
    exports.Fragment = d2;
    exports.Lazy = q;
    exports.Memo = p2;
    exports.Portal = c2;
    exports.Profiler = f;
    exports.StrictMode = e;
    exports.Suspense = m2;
    exports.SuspenseList = n2;
    exports.isAsyncMode = function() {
      return false;
    };
    exports.isConcurrentMode = function() {
      return false;
    };
    exports.isContextConsumer = function(a2) {
      return v(a2) === h2;
    };
    exports.isContextProvider = function(a2) {
      return v(a2) === g;
    };
    exports.isElement = function(a2) {
      return "object" === typeof a2 && null !== a2 && a2.$$typeof === b2;
    };
    exports.isForwardRef = function(a2) {
      return v(a2) === l2;
    };
    exports.isFragment = function(a2) {
      return v(a2) === d2;
    };
    exports.isLazy = function(a2) {
      return v(a2) === q;
    };
    exports.isMemo = function(a2) {
      return v(a2) === p2;
    };
    exports.isPortal = function(a2) {
      return v(a2) === c2;
    };
    exports.isProfiler = function(a2) {
      return v(a2) === f;
    };
    exports.isStrictMode = function(a2) {
      return v(a2) === e;
    };
    exports.isSuspense = function(a2) {
      return v(a2) === m2;
    };
    exports.isSuspenseList = function(a2) {
      return v(a2) === n2;
    };
    exports.isValidElementType = function(a2) {
      return "string" === typeof a2 || "function" === typeof a2 || a2 === d2 || a2 === f || a2 === e || a2 === m2 || a2 === n2 || a2 === t2 || "object" === typeof a2 && null !== a2 && (a2.$$typeof === q || a2.$$typeof === p2 || a2.$$typeof === g || a2.$$typeof === h2 || a2.$$typeof === l2 || a2.$$typeof === u2 || void 0 !== a2.getModuleId) ? true : false;
    };
    exports.typeOf = v;
  }
});

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_SERVER_CONTEXT_TYPE:
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        function isSuspenseList(object) {
          return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element2;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.SuspenseList = SuspenseList;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isSuspenseList = isSuspenseList;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_is_production_min();
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/pretty-format/build/plugins/ReactElement.js
var require_ReactElement = __commonJS({
  "node_modules/pretty-format/build/plugins/ReactElement.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var ReactIs = _interopRequireWildcard(require_react_is());
    var _markup = require_markup();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var getChildren = (arg, children = []) => {
      if (Array.isArray(arg)) {
        arg.forEach((item) => {
          getChildren(item, children);
        });
      } else if (arg != null && arg !== false) {
        children.push(arg);
      }
      return children;
    };
    var getType3 = (element) => {
      const type = element.type;
      if (typeof type === "string") {
        return type;
      }
      if (typeof type === "function") {
        return type.displayName || type.name || "Unknown";
      }
      if (ReactIs.isFragment(element)) {
        return "React.Fragment";
      }
      if (ReactIs.isSuspense(element)) {
        return "React.Suspense";
      }
      if (typeof type === "object" && type !== null) {
        if (ReactIs.isContextProvider(element)) {
          return "Context.Provider";
        }
        if (ReactIs.isContextConsumer(element)) {
          return "Context.Consumer";
        }
        if (ReactIs.isForwardRef(element)) {
          if (type.displayName) {
            return type.displayName;
          }
          const functionName = type.render.displayName || type.render.name || "";
          return functionName !== "" ? `ForwardRef(${functionName})` : "ForwardRef";
        }
        if (ReactIs.isMemo(element)) {
          const functionName = type.displayName || type.type.displayName || type.type.name || "";
          return functionName !== "" ? `Memo(${functionName})` : "Memo";
        }
      }
      return "UNDEFINED";
    };
    var getPropKeys = (element) => {
      const { props } = element;
      return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
    };
    var serialize = (element, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, _markup.printElementAsLeaf)(getType3(element), config) : (0, _markup.printElement)(
      getType3(element),
      (0, _markup.printProps)(
        getPropKeys(element),
        element.props,
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ),
      (0, _markup.printChildren)(
        getChildren(element.props.children),
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ),
      config,
      indentation
    );
    exports.serialize = serialize;
    var test = (val) => val != null && ReactIs.isElement(val);
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/plugins/ReactTestComponent.js
var require_ReactTestComponent = __commonJS({
  "node_modules/pretty-format/build/plugins/ReactTestComponent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _markup = require_markup();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var testSymbol = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("react.test.json") : 245830487;
    var getPropKeys = (object) => {
      const { props } = object;
      return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
    };
    var serialize = (object, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config) : (0, _markup.printElement)(
      object.type,
      object.props ? (0, _markup.printProps)(
        getPropKeys(object),
        object.props,
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ) : "",
      object.children ? (0, _markup.printChildren)(
        object.children,
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ) : "",
      config,
      indentation
    );
    exports.serialize = serialize;
    var test = (val) => val && val.$$typeof === testSymbol;
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// node_modules/pretty-format/build/index.js
var require_build = __commonJS({
  "node_modules/pretty-format/build/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = exports.DEFAULT_OPTIONS = void 0;
    exports.format = format3;
    exports.plugins = void 0;
    var _ansiStyles = _interopRequireDefault(require_ansi_styles());
    var _collections = require_collections();
    var _AsymmetricMatcher = _interopRequireDefault(
      require_AsymmetricMatcher()
    );
    var _DOMCollection = _interopRequireDefault(require_DOMCollection());
    var _DOMElement = _interopRequireDefault(require_DOMElement());
    var _Immutable = _interopRequireDefault(require_Immutable());
    var _ReactElement = _interopRequireDefault(require_ReactElement());
    var _ReactTestComponent = _interopRequireDefault(
      require_ReactTestComponent()
    );
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var toString3 = Object.prototype.toString;
    var toISOString = Date.prototype.toISOString;
    var errorToString = Error.prototype.toString;
    var regExpToString = RegExp.prototype.toString;
    var getConstructorName = (val) => typeof val.constructor === "function" && val.constructor.name || "Object";
    var isWindow = (val) => typeof window !== "undefined" && val === window;
    var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
    var NEWLINE_REGEXP = /\n/gi;
    var PrettyFormatPluginError = class extends Error {
      constructor(message, stack) {
        super(message);
        this.stack = stack;
        this.name = this.constructor.name;
      }
    };
    function isToStringedArrayType(toStringed) {
      return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
    }
    function printNumber(val) {
      return Object.is(val, -0) ? "-0" : String(val);
    }
    function printBigInt(val) {
      return String(`${val}n`);
    }
    function printFunction(val, printFunctionName) {
      if (!printFunctionName) {
        return "[Function]";
      }
      return `[Function ${val.name || "anonymous"}]`;
    }
    function printSymbol(val) {
      return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
    }
    function printError(val) {
      return `[${errorToString.call(val)}]`;
    }
    function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
      if (val === true || val === false) {
        return `${val}`;
      }
      if (val === void 0) {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      const typeOf = typeof val;
      if (typeOf === "number") {
        return printNumber(val);
      }
      if (typeOf === "bigint") {
        return printBigInt(val);
      }
      if (typeOf === "string") {
        if (escapeString) {
          return `"${val.replace(/"|\\/g, "\\$&")}"`;
        }
        return `"${val}"`;
      }
      if (typeOf === "function") {
        return printFunction(val, printFunctionName);
      }
      if (typeOf === "symbol") {
        return printSymbol(val);
      }
      const toStringed = toString3.call(val);
      if (toStringed === "[object WeakMap]") {
        return "WeakMap {}";
      }
      if (toStringed === "[object WeakSet]") {
        return "WeakSet {}";
      }
      if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
        return printFunction(val, printFunctionName);
      }
      if (toStringed === "[object Symbol]") {
        return printSymbol(val);
      }
      if (toStringed === "[object Date]") {
        return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
      }
      if (toStringed === "[object Error]") {
        return printError(val);
      }
      if (toStringed === "[object RegExp]") {
        if (escapeRegex) {
          return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        return regExpToString.call(val);
      }
      if (val instanceof Error) {
        return printError(val);
      }
      return null;
    }
    function printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON) {
      if (refs.indexOf(val) !== -1) {
        return "[Circular]";
      }
      refs = refs.slice();
      refs.push(val);
      const hitMaxDepth = ++depth > config.maxDepth;
      const min = config.min;
      if (config.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
        return printer(val.toJSON(), config, indentation, depth, refs, true);
      }
      const toStringed = toString3.call(val);
      if (toStringed === "[object Arguments]") {
        return hitMaxDepth ? "[Arguments]" : `${min ? "" : "Arguments "}[${(0, _collections.printListItems)(
          val,
          config,
          indentation,
          depth,
          refs,
          printer
        )}]`;
      }
      if (isToStringedArrayType(toStringed)) {
        return hitMaxDepth ? `[${val.constructor.name}]` : `${min ? "" : !config.printBasicPrototype && val.constructor.name === "Array" ? "" : `${val.constructor.name} `}[${(0, _collections.printListItems)(
          val,
          config,
          indentation,
          depth,
          refs,
          printer
        )}]`;
      }
      if (toStringed === "[object Map]") {
        return hitMaxDepth ? "[Map]" : `Map {${(0, _collections.printIteratorEntries)(
          val.entries(),
          config,
          indentation,
          depth,
          refs,
          printer,
          " => "
        )}}`;
      }
      if (toStringed === "[object Set]") {
        return hitMaxDepth ? "[Set]" : `Set {${(0, _collections.printIteratorValues)(
          val.values(),
          config,
          indentation,
          depth,
          refs,
          printer
        )}}`;
      }
      return hitMaxDepth || isWindow(val) ? `[${getConstructorName(val)}]` : `${min ? "" : !config.printBasicPrototype && getConstructorName(val) === "Object" ? "" : `${getConstructorName(val)} `}{${(0, _collections.printObjectProperties)(
        val,
        config,
        indentation,
        depth,
        refs,
        printer
      )}}`;
    }
    function isNewPlugin(plugin) {
      return plugin.serialize != null;
    }
    function printPlugin(plugin, val, config, indentation, depth, refs) {
      let printed;
      try {
        printed = isNewPlugin(plugin) ? plugin.serialize(val, config, indentation, depth, refs, printer) : plugin.print(
          val,
          (valChild) => printer(valChild, config, indentation, depth, refs),
          (str) => {
            const indentationNext = indentation + config.indent;
            return indentationNext + str.replace(NEWLINE_REGEXP, `
${indentationNext}`);
          },
          {
            edgeSpacing: config.spacingOuter,
            min: config.min,
            spacing: config.spacingInner
          },
          config.colors
        );
      } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
      }
      if (typeof printed !== "string") {
        throw new Error(
          `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`
        );
      }
      return printed;
    }
    function findPlugin(plugins4, val) {
      for (let p2 = 0; p2 < plugins4.length; p2++) {
        try {
          if (plugins4[p2].test(val)) {
            return plugins4[p2];
          }
        } catch (error) {
          throw new PrettyFormatPluginError(error.message, error.stack);
        }
      }
      return null;
    }
    function printer(val, config, indentation, depth, refs, hasCalledToJSON) {
      const plugin = findPlugin(config.plugins, val);
      if (plugin !== null) {
        return printPlugin(plugin, val, config, indentation, depth, refs);
      }
      const basicResult = printBasicValue(
        val,
        config.printFunctionName,
        config.escapeRegex,
        config.escapeString
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(
        val,
        config,
        indentation,
        depth,
        refs,
        hasCalledToJSON
      );
    }
    var DEFAULT_THEME = {
      comment: "gray",
      content: "reset",
      prop: "yellow",
      tag: "cyan",
      value: "green"
    };
    var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
    var toOptionsSubtype = (options) => options;
    var DEFAULT_OPTIONS = toOptionsSubtype({
      callToJSON: true,
      compareKeys: void 0,
      escapeRegex: false,
      escapeString: true,
      highlight: false,
      indent: 2,
      maxDepth: Infinity,
      maxWidth: Infinity,
      min: false,
      plugins: [],
      printBasicPrototype: true,
      printFunctionName: true,
      theme: DEFAULT_THEME
    });
    exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
    function validateOptions(options) {
      Object.keys(options).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(DEFAULT_OPTIONS, key)) {
          throw new Error(`pretty-format: Unknown option "${key}".`);
        }
      });
      if (options.min && options.indent !== void 0 && options.indent !== 0) {
        throw new Error(
          'pretty-format: Options "min" and "indent" cannot be used together.'
        );
      }
      if (options.theme !== void 0) {
        if (options.theme === null) {
          throw new Error('pretty-format: Option "theme" must not be null.');
        }
        if (typeof options.theme !== "object") {
          throw new Error(
            `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`
          );
        }
      }
    }
    var getColorsHighlight = (options) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      const value = options.theme && options.theme[key] !== void 0 ? options.theme[key] : DEFAULT_THEME[key];
      const color = value && _ansiStyles.default[value];
      if (color && typeof color.close === "string" && typeof color.open === "string") {
        colors[key] = color;
      } else {
        throw new Error(
          `pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`
        );
      }
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getColorsEmpty = () => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      colors[key] = {
        close: "",
        open: ""
      };
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getPrintFunctionName = (options) => options?.printFunctionName ?? DEFAULT_OPTIONS.printFunctionName;
    var getEscapeRegex = (options) => options?.escapeRegex ?? DEFAULT_OPTIONS.escapeRegex;
    var getEscapeString = (options) => options?.escapeString ?? DEFAULT_OPTIONS.escapeString;
    var getConfig = (options) => ({
      callToJSON: options?.callToJSON ?? DEFAULT_OPTIONS.callToJSON,
      colors: options?.highlight ? getColorsHighlight(options) : getColorsEmpty(),
      compareKeys: typeof options?.compareKeys === "function" || options?.compareKeys === null ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
      escapeRegex: getEscapeRegex(options),
      escapeString: getEscapeString(options),
      indent: options?.min ? "" : createIndent(options?.indent ?? DEFAULT_OPTIONS.indent),
      maxDepth: options?.maxDepth ?? DEFAULT_OPTIONS.maxDepth,
      maxWidth: options?.maxWidth ?? DEFAULT_OPTIONS.maxWidth,
      min: options?.min ?? DEFAULT_OPTIONS.min,
      plugins: options?.plugins ?? DEFAULT_OPTIONS.plugins,
      printBasicPrototype: options?.printBasicPrototype ?? true,
      printFunctionName: getPrintFunctionName(options),
      spacingInner: options?.min ? " " : "\n",
      spacingOuter: options?.min ? "" : "\n"
    });
    function createIndent(indent) {
      return new Array(indent + 1).join(" ");
    }
    function format3(val, options) {
      if (options) {
        validateOptions(options);
        if (options.plugins) {
          const plugin = findPlugin(options.plugins, val);
          if (plugin !== null) {
            return printPlugin(plugin, val, getConfig(options), "", 0, []);
          }
        }
      }
      const basicResult = printBasicValue(
        val,
        getPrintFunctionName(options),
        getEscapeRegex(options),
        getEscapeString(options)
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(val, getConfig(options), "", 0, []);
    }
    var plugins3 = {
      AsymmetricMatcher: _AsymmetricMatcher.default,
      DOMCollection: _DOMCollection.default,
      DOMElement: _DOMElement.default,
      Immutable: _Immutable.default,
      ReactElement: _ReactElement.default,
      ReactTestComponent: _ReactTestComponent.default
    };
    exports.plugins = plugins3;
    var _default = format3;
    exports.default = _default;
  }
});

// node_modules/get-func-name/index.js
var require_get_func_name = __commonJS({
  "node_modules/get-func-name/index.js"(exports, module) {
    "use strict";
    var toString3 = Function.prototype.toString;
    var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
    var maxFunctionSourceLength = 512;
    function getFuncName3(aFunc) {
      if (typeof aFunc !== "function") {
        return null;
      }
      var name = "";
      if (typeof Function.prototype.name === "undefined" && typeof aFunc.name === "undefined") {
        var functionSource = toString3.call(aFunc);
        if (functionSource.indexOf("(") > maxFunctionSourceLength) {
          return name;
        }
        var match = functionSource.match(functionNameMatch);
        if (match) {
          name = match[1];
        }
      } else {
        name = aFunc.name;
      }
      return name;
    }
    module.exports = getFuncName3;
  }
});

// node_modules/diff-sequences/build/index.js
var require_build2 = __commonJS({
  "node_modules/diff-sequences/build/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = diffSequence;
    var pkg = "diff-sequences";
    var NOT_YET_SET = 0;
    var countCommonItemsF = (aIndex, aEnd, bIndex, bEnd, isCommon) => {
      let nCommon = 0;
      while (aIndex < aEnd && bIndex < bEnd && isCommon(aIndex, bIndex)) {
        aIndex += 1;
        bIndex += 1;
        nCommon += 1;
      }
      return nCommon;
    };
    var countCommonItemsR = (aStart, aIndex, bStart, bIndex, isCommon) => {
      let nCommon = 0;
      while (aStart <= aIndex && bStart <= bIndex && isCommon(aIndex, bIndex)) {
        aIndex -= 1;
        bIndex -= 1;
        nCommon += 1;
      }
      return nCommon;
    };
    var extendPathsF = (d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF) => {
      let iF = 0;
      let kF = -d2;
      let aFirst = aIndexesF[iF];
      let aIndexPrev1 = aFirst;
      aIndexesF[iF] += countCommonItemsF(
        aFirst + 1,
        aEnd,
        bF + aFirst - kF + 1,
        bEnd,
        isCommon
      );
      const nF = d2 < iMaxF ? d2 : iMaxF;
      for (iF += 1, kF += 2; iF <= nF; iF += 1, kF += 2) {
        if (iF !== d2 && aIndexPrev1 < aIndexesF[iF]) {
          aFirst = aIndexesF[iF];
        } else {
          aFirst = aIndexPrev1 + 1;
          if (aEnd <= aFirst) {
            return iF - 1;
          }
        }
        aIndexPrev1 = aIndexesF[iF];
        aIndexesF[iF] = aFirst + countCommonItemsF(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
      }
      return iMaxF;
    };
    var extendPathsR = (d2, aStart, bStart, bR, isCommon, aIndexesR, iMaxR) => {
      let iR = 0;
      let kR = d2;
      let aFirst = aIndexesR[iR];
      let aIndexPrev1 = aFirst;
      aIndexesR[iR] -= countCommonItemsR(
        aStart,
        aFirst - 1,
        bStart,
        bR + aFirst - kR - 1,
        isCommon
      );
      const nR = d2 < iMaxR ? d2 : iMaxR;
      for (iR += 1, kR -= 2; iR <= nR; iR += 1, kR -= 2) {
        if (iR !== d2 && aIndexesR[iR] < aIndexPrev1) {
          aFirst = aIndexesR[iR];
        } else {
          aFirst = aIndexPrev1 - 1;
          if (aFirst < aStart) {
            return iR - 1;
          }
        }
        aIndexPrev1 = aIndexesR[iR];
        aIndexesR[iR] = aFirst - countCommonItemsR(
          aStart,
          aFirst - 1,
          bStart,
          bR + aFirst - kR - 1,
          isCommon
        );
      }
      return iMaxR;
    };
    var extendOverlappablePathsF = (d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division) => {
      const bF = bStart - aStart;
      const aLength = aEnd - aStart;
      const bLength = bEnd - bStart;
      const baDeltaLength = bLength - aLength;
      const kMinOverlapF = -baDeltaLength - (d2 - 1);
      const kMaxOverlapF = -baDeltaLength + (d2 - 1);
      let aIndexPrev1 = NOT_YET_SET;
      const nF = d2 < iMaxF ? d2 : iMaxF;
      for (let iF = 0, kF = -d2; iF <= nF; iF += 1, kF += 2) {
        const insert2 = iF === 0 || iF !== d2 && aIndexPrev1 < aIndexesF[iF];
        const aLastPrev = insert2 ? aIndexesF[iF] : aIndexPrev1;
        const aFirst = insert2 ? aLastPrev : aLastPrev + 1;
        const bFirst = bF + aFirst - kF;
        const nCommonF = countCommonItemsF(
          aFirst + 1,
          aEnd,
          bFirst + 1,
          bEnd,
          isCommon
        );
        const aLast = aFirst + nCommonF;
        aIndexPrev1 = aIndexesF[iF];
        aIndexesF[iF] = aLast;
        if (kMinOverlapF <= kF && kF <= kMaxOverlapF) {
          const iR = (d2 - 1 - (kF + baDeltaLength)) / 2;
          if (iR <= iMaxR && aIndexesR[iR] - 1 <= aLast) {
            const bLastPrev = bF + aLastPrev - (insert2 ? kF + 1 : kF - 1);
            const nCommonR = countCommonItemsR(
              aStart,
              aLastPrev,
              bStart,
              bLastPrev,
              isCommon
            );
            const aIndexPrevFirst = aLastPrev - nCommonR;
            const bIndexPrevFirst = bLastPrev - nCommonR;
            const aEndPreceding = aIndexPrevFirst + 1;
            const bEndPreceding = bIndexPrevFirst + 1;
            division.nChangePreceding = d2 - 1;
            if (d2 - 1 === aEndPreceding + bEndPreceding - aStart - bStart) {
              division.aEndPreceding = aStart;
              division.bEndPreceding = bStart;
            } else {
              division.aEndPreceding = aEndPreceding;
              division.bEndPreceding = bEndPreceding;
            }
            division.nCommonPreceding = nCommonR;
            if (nCommonR !== 0) {
              division.aCommonPreceding = aEndPreceding;
              division.bCommonPreceding = bEndPreceding;
            }
            division.nCommonFollowing = nCommonF;
            if (nCommonF !== 0) {
              division.aCommonFollowing = aFirst + 1;
              division.bCommonFollowing = bFirst + 1;
            }
            const aStartFollowing = aLast + 1;
            const bStartFollowing = bFirst + nCommonF + 1;
            division.nChangeFollowing = d2 - 1;
            if (d2 - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
              division.aStartFollowing = aEnd;
              division.bStartFollowing = bEnd;
            } else {
              division.aStartFollowing = aStartFollowing;
              division.bStartFollowing = bStartFollowing;
            }
            return true;
          }
        }
      }
      return false;
    };
    var extendOverlappablePathsR = (d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division) => {
      const bR = bEnd - aEnd;
      const aLength = aEnd - aStart;
      const bLength = bEnd - bStart;
      const baDeltaLength = bLength - aLength;
      const kMinOverlapR = baDeltaLength - d2;
      const kMaxOverlapR = baDeltaLength + d2;
      let aIndexPrev1 = NOT_YET_SET;
      const nR = d2 < iMaxR ? d2 : iMaxR;
      for (let iR = 0, kR = d2; iR <= nR; iR += 1, kR -= 2) {
        const insert2 = iR === 0 || iR !== d2 && aIndexesR[iR] < aIndexPrev1;
        const aLastPrev = insert2 ? aIndexesR[iR] : aIndexPrev1;
        const aFirst = insert2 ? aLastPrev : aLastPrev - 1;
        const bFirst = bR + aFirst - kR;
        const nCommonR = countCommonItemsR(
          aStart,
          aFirst - 1,
          bStart,
          bFirst - 1,
          isCommon
        );
        const aLast = aFirst - nCommonR;
        aIndexPrev1 = aIndexesR[iR];
        aIndexesR[iR] = aLast;
        if (kMinOverlapR <= kR && kR <= kMaxOverlapR) {
          const iF = (d2 + (kR - baDeltaLength)) / 2;
          if (iF <= iMaxF && aLast - 1 <= aIndexesF[iF]) {
            const bLast = bFirst - nCommonR;
            division.nChangePreceding = d2;
            if (d2 === aLast + bLast - aStart - bStart) {
              division.aEndPreceding = aStart;
              division.bEndPreceding = bStart;
            } else {
              division.aEndPreceding = aLast;
              division.bEndPreceding = bLast;
            }
            division.nCommonPreceding = nCommonR;
            if (nCommonR !== 0) {
              division.aCommonPreceding = aLast;
              division.bCommonPreceding = bLast;
            }
            division.nChangeFollowing = d2 - 1;
            if (d2 === 1) {
              division.nCommonFollowing = 0;
              division.aStartFollowing = aEnd;
              division.bStartFollowing = bEnd;
            } else {
              const bLastPrev = bR + aLastPrev - (insert2 ? kR - 1 : kR + 1);
              const nCommonF = countCommonItemsF(
                aLastPrev,
                aEnd,
                bLastPrev,
                bEnd,
                isCommon
              );
              division.nCommonFollowing = nCommonF;
              if (nCommonF !== 0) {
                division.aCommonFollowing = aLastPrev;
                division.bCommonFollowing = bLastPrev;
              }
              const aStartFollowing = aLastPrev + nCommonF;
              const bStartFollowing = bLastPrev + nCommonF;
              if (d2 - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
                division.aStartFollowing = aEnd;
                division.bStartFollowing = bEnd;
              } else {
                division.aStartFollowing = aStartFollowing;
                division.bStartFollowing = bStartFollowing;
              }
            }
            return true;
          }
        }
      }
      return false;
    };
    var divide = (nChange, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, aIndexesR, division) => {
      const bF = bStart - aStart;
      const bR = bEnd - aEnd;
      const aLength = aEnd - aStart;
      const bLength = bEnd - bStart;
      const baDeltaLength = bLength - aLength;
      let iMaxF = aLength;
      let iMaxR = aLength;
      aIndexesF[0] = aStart - 1;
      aIndexesR[0] = aEnd;
      if (baDeltaLength % 2 === 0) {
        const dMin = (nChange || baDeltaLength) / 2;
        const dMax = (aLength + bLength) / 2;
        for (let d2 = 1; d2 <= dMax; d2 += 1) {
          iMaxF = extendPathsF(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
          if (d2 < dMin) {
            iMaxR = extendPathsR(d2, aStart, bStart, bR, isCommon, aIndexesR, iMaxR);
          } else if (
            // If a reverse path overlaps a forward path in the same diagonal,
            // return a division of the index intervals at the middle change.
            extendOverlappablePathsR(
              d2,
              aStart,
              aEnd,
              bStart,
              bEnd,
              isCommon,
              aIndexesF,
              iMaxF,
              aIndexesR,
              iMaxR,
              division
            )
          ) {
            return;
          }
        }
      } else {
        const dMin = ((nChange || baDeltaLength) + 1) / 2;
        const dMax = (aLength + bLength + 1) / 2;
        let d2 = 1;
        iMaxF = extendPathsF(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
        for (d2 += 1; d2 <= dMax; d2 += 1) {
          iMaxR = extendPathsR(
            d2 - 1,
            aStart,
            bStart,
            bR,
            isCommon,
            aIndexesR,
            iMaxR
          );
          if (d2 < dMin) {
            iMaxF = extendPathsF(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
          } else if (
            // If a forward path overlaps a reverse path in the same diagonal,
            // return a division of the index intervals at the middle change.
            extendOverlappablePathsF(
              d2,
              aStart,
              aEnd,
              bStart,
              bEnd,
              isCommon,
              aIndexesF,
              iMaxF,
              aIndexesR,
              iMaxR,
              division
            )
          ) {
            return;
          }
        }
      }
      throw new Error(
        `${pkg}: no overlap aStart=${aStart} aEnd=${aEnd} bStart=${bStart} bEnd=${bEnd}`
      );
    };
    var findSubsequences = (nChange, aStart, aEnd, bStart, bEnd, transposed, callbacks, aIndexesF, aIndexesR, division) => {
      if (bEnd - bStart < aEnd - aStart) {
        transposed = !transposed;
        if (transposed && callbacks.length === 1) {
          const { foundSubsequence: foundSubsequence2, isCommon: isCommon2 } = callbacks[0];
          callbacks[1] = {
            foundSubsequence: (nCommon, bCommon, aCommon) => {
              foundSubsequence2(nCommon, aCommon, bCommon);
            },
            isCommon: (bIndex, aIndex) => isCommon2(aIndex, bIndex)
          };
        }
        const tStart = aStart;
        const tEnd = aEnd;
        aStart = bStart;
        aEnd = bEnd;
        bStart = tStart;
        bEnd = tEnd;
      }
      const { foundSubsequence, isCommon } = callbacks[transposed ? 1 : 0];
      divide(
        nChange,
        aStart,
        aEnd,
        bStart,
        bEnd,
        isCommon,
        aIndexesF,
        aIndexesR,
        division
      );
      const {
        nChangePreceding,
        aEndPreceding,
        bEndPreceding,
        nCommonPreceding,
        aCommonPreceding,
        bCommonPreceding,
        nCommonFollowing,
        aCommonFollowing,
        bCommonFollowing,
        nChangeFollowing,
        aStartFollowing,
        bStartFollowing
      } = division;
      if (aStart < aEndPreceding && bStart < bEndPreceding) {
        findSubsequences(
          nChangePreceding,
          aStart,
          aEndPreceding,
          bStart,
          bEndPreceding,
          transposed,
          callbacks,
          aIndexesF,
          aIndexesR,
          division
        );
      }
      if (nCommonPreceding !== 0) {
        foundSubsequence(nCommonPreceding, aCommonPreceding, bCommonPreceding);
      }
      if (nCommonFollowing !== 0) {
        foundSubsequence(nCommonFollowing, aCommonFollowing, bCommonFollowing);
      }
      if (aStartFollowing < aEnd && bStartFollowing < bEnd) {
        findSubsequences(
          nChangeFollowing,
          aStartFollowing,
          aEnd,
          bStartFollowing,
          bEnd,
          transposed,
          callbacks,
          aIndexesF,
          aIndexesR,
          division
        );
      }
    };
    var validateLength = (name, arg) => {
      if (typeof arg !== "number") {
        throw new TypeError(`${pkg}: ${name} typeof ${typeof arg} is not a number`);
      }
      if (!Number.isSafeInteger(arg)) {
        throw new RangeError(`${pkg}: ${name} value ${arg} is not a safe integer`);
      }
      if (arg < 0) {
        throw new RangeError(`${pkg}: ${name} value ${arg} is a negative integer`);
      }
    };
    var validateCallback = (name, arg) => {
      const type = typeof arg;
      if (type !== "function") {
        throw new TypeError(`${pkg}: ${name} typeof ${type} is not a function`);
      }
    };
    function diffSequence(aLength, bLength, isCommon, foundSubsequence) {
      validateLength("aLength", aLength);
      validateLength("bLength", bLength);
      validateCallback("isCommon", isCommon);
      validateCallback("foundSubsequence", foundSubsequence);
      const nCommonF = countCommonItemsF(0, aLength, 0, bLength, isCommon);
      if (nCommonF !== 0) {
        foundSubsequence(nCommonF, 0, 0);
      }
      if (aLength !== nCommonF || bLength !== nCommonF) {
        const aStart = nCommonF;
        const bStart = nCommonF;
        const nCommonR = countCommonItemsR(
          aStart,
          aLength - 1,
          bStart,
          bLength - 1,
          isCommon
        );
        const aEnd = aLength - nCommonR;
        const bEnd = bLength - nCommonR;
        const nCommonFR = nCommonF + nCommonR;
        if (aLength !== nCommonFR && bLength !== nCommonFR) {
          const nChange = 0;
          const transposed = false;
          const callbacks = [
            {
              foundSubsequence,
              isCommon
            }
          ];
          const aIndexesF = [NOT_YET_SET];
          const aIndexesR = [NOT_YET_SET];
          const division = {
            aCommonFollowing: NOT_YET_SET,
            aCommonPreceding: NOT_YET_SET,
            aEndPreceding: NOT_YET_SET,
            aStartFollowing: NOT_YET_SET,
            bCommonFollowing: NOT_YET_SET,
            bCommonPreceding: NOT_YET_SET,
            bEndPreceding: NOT_YET_SET,
            bStartFollowing: NOT_YET_SET,
            nChangeFollowing: NOT_YET_SET,
            nChangePreceding: NOT_YET_SET,
            nCommonFollowing: NOT_YET_SET,
            nCommonPreceding: NOT_YET_SET
          };
          findSubsequences(
            nChange,
            aStart,
            aEnd,
            bStart,
            bEnd,
            transposed,
            callbacks,
            aIndexesF,
            aIndexesR,
            division
          );
        }
        if (nCommonR !== 0) {
          foundSubsequence(nCommonR, aEnd, bEnd);
        }
      }
    }
  }
});

// node_modules/vitest/dist/vendor/constants.K-Wf1PUy.js
var defaultPort = 51204;
var defaultBrowserPort = 63315;
var EXIT_CODE_RESTART = 43;
var API_PATH = "/__vitest_api__";
var extraInlineDeps = [
  /^(?!.*(?:node_modules)).*\.mjs$/,
  /^(?!.*(?:node_modules)).*\.cjs\.js$/,
  // Vite client
  /vite\w*\/dist\/client\/env.mjs/,
  // Nuxt
  "@nuxt/test-utils"
];
var CONFIG_NAMES = [
  "vitest.config",
  "vite.config"
];
var WORKSPACES_NAMES = [
  "vitest.workspace",
  "vitest.projects"
];
var CONFIG_EXTENSIONS = [
  ".ts",
  ".mts",
  ".cts",
  ".js",
  ".mjs",
  ".cjs"
];
var configFiles = CONFIG_NAMES.flatMap(
  (name) => CONFIG_EXTENSIONS.map((ext) => name + ext)
);
var WORKSPACES_EXTENSIONS = [
  ...CONFIG_EXTENSIONS,
  ".json"
];
var workspacesFiles = WORKSPACES_NAMES.flatMap(
  (name) => WORKSPACES_EXTENSIONS.map((ext) => name + ext)
);

// node_modules/vite/dist/node/index.js
var import_esbuild = __toESM(require_main(), 1);

// node_modules/vite/dist/node/runtime.js
var isWindows = typeof process !== "undefined" && process.platform === "win32";
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  const c2 = chars.charCodeAt(i);
  charToInt[c2] = i;
}
var comma = ",".charCodeAt(0);
var SOURCEMAPPING_URL = "sourceMa";
SOURCEMAPPING_URL += "ppingURL";
var VITE_RUNTIME_SOURCEMAPPING_URL = `${SOURCEMAPPING_URL}=data:application/json;charset=utf-8`;
var VITE_RUNTIME_SOURCEMAPPING_REGEXP = new RegExp(`//# ${VITE_RUNTIME_SOURCEMAPPING_URL};base64,(.+)`);
var retrieveFileHandlers = /* @__PURE__ */ new Set();
var retrieveSourceMapHandlers = /* @__PURE__ */ new Set();
var createExecHandlers = (handlers) => {
  return (...args) => {
    for (const handler of handlers) {
      const result = handler(...args);
      if (result)
        return result;
    }
    return null;
  };
};
var retrieveFileFromHandlers = createExecHandlers(retrieveFileHandlers);
var retrievSourceMapFromHandlers = createExecHandlers(retrieveSourceMapHandlers);
var originalPrepare = Error.prepareStackTrace;
var AsyncFunction = async function() {
}.constructor;

// node_modules/vitest/dist/vendor/_commonjsHelpers.jjO7Zipk.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

// node_modules/std-env/dist/index.mjs
var r = /* @__PURE__ */ Object.create(null);
var E = (e) => globalThis.process?.env || import.meta.env || globalThis.Deno?.env.toObject() || globalThis.__env__ || (e ? r : globalThis);
var s = new Proxy(r, { get(e, o) {
  return E()[o] ?? r[o];
}, has(e, o) {
  const i = E();
  return o in i || o in r;
}, set(e, o, i) {
  const g = E(true);
  return g[o] = i, true;
}, deleteProperty(e, o) {
  if (!o)
    return false;
  const i = E(true);
  return delete i[o], true;
}, ownKeys() {
  const e = E(true);
  return Object.keys(e);
} });
var t = typeof process < "u" && process.env && process.env.NODE_ENV || "";
var p = [["APPVEYOR"], ["AWS_AMPLIFY", "AWS_APP_ID", { ci: true }], ["AZURE_PIPELINES", "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"], ["AZURE_STATIC", "INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"], ["APPCIRCLE", "AC_APPCIRCLE"], ["BAMBOO", "bamboo_planKey"], ["BITBUCKET", "BITBUCKET_COMMIT"], ["BITRISE", "BITRISE_IO"], ["BUDDY", "BUDDY_WORKSPACE_ID"], ["BUILDKITE"], ["CIRCLE", "CIRCLECI"], ["CIRRUS", "CIRRUS_CI"], ["CLOUDFLARE_PAGES", "CF_PAGES", { ci: true }], ["CODEBUILD", "CODEBUILD_BUILD_ARN"], ["CODEFRESH", "CF_BUILD_ID"], ["DRONE"], ["DRONE", "DRONE_BUILD_EVENT"], ["DSARI"], ["GITHUB_ACTIONS"], ["GITLAB", "GITLAB_CI"], ["GITLAB", "CI_MERGE_REQUEST_ID"], ["GOCD", "GO_PIPELINE_LABEL"], ["LAYERCI"], ["HUDSON", "HUDSON_URL"], ["JENKINS", "JENKINS_URL"], ["MAGNUM"], ["NETLIFY"], ["NETLIFY", "NETLIFY_LOCAL", { ci: false }], ["NEVERCODE"], ["RENDER"], ["SAIL", "SAILCI"], ["SEMAPHORE"], ["SCREWDRIVER"], ["SHIPPABLE"], ["SOLANO", "TDDIUM"], ["STRIDER"], ["TEAMCITY", "TEAMCITY_VERSION"], ["TRAVIS"], ["VERCEL", "NOW_BUILDER"], ["VERCEL", "VERCEL", { ci: false }], ["VERCEL", "VERCEL_ENV", { ci: false }], ["APPCENTER", "APPCENTER_BUILD_ID"], ["CODESANDBOX", "CODESANDBOX_SSE", { ci: false }], ["STACKBLITZ"], ["STORMKIT"], ["CLEAVR"], ["ZEABUR"], ["CODESPHERE", "CODESPHERE_APP_ID", { ci: true }], ["RAILWAY", "RAILWAY_PROJECT_ID"], ["RAILWAY", "RAILWAY_SERVICE_ID"]];
function B() {
  if (globalThis.process?.env)
    for (const e of p) {
      const o = e[1] || e[0];
      if (globalThis.process?.env[o])
        return { name: e[0].toLowerCase(), ...e[2] };
    }
  return globalThis.process?.env?.SHELL === "/bin/jsh" && globalThis.process?.versions?.webcontainer ? { name: "stackblitz", ci: false } : { name: "", ci: false };
}
var l = B();
var d = l.name;
function n(e) {
  return e ? e !== "false" : false;
}
var I = globalThis.process?.platform || "";
var T = n(s.CI) || l.ci !== false;
var R = n(globalThis.process?.stdout && globalThis.process?.stdout.isTTY);
var h = n(s.DEBUG);
var C = t === "test" || n(s.TEST);
var m = n(s.MINIMAL) || T || C || !R;
var a = /^win/i.test(I);
var M = /^linux/i.test(I);
var V = /^darwin/i.test(I);
var Y = !n(s.NO_COLOR) && (n(s.FORCE_COLOR) || (R || a) && s.TERM !== "dumb" || T);
var _ = (globalThis.process?.versions?.node || "").replace(/^v/, "") || null;
var y = Number(_?.split(".")[0]) || null;
var W = globalThis.process || /* @__PURE__ */ Object.create(null);
var c = { versions: {} };
var w = new Proxy(W, { get(e, o) {
  if (o === "env")
    return s;
  if (o in e)
    return e[o];
  if (o in c)
    return c[o];
} });
var A = globalThis.process?.release?.name === "node";
var L = !!globalThis.Bun || !!globalThis.process?.versions?.bun;
var D = !!globalThis.Deno;
var O = !!globalThis.fastly;
var S = !!globalThis.Netlify;
var N = !!globalThis.EdgeRuntime;
var u = globalThis.navigator?.userAgent === "Cloudflare-Workers";
var b = !!globalThis.__lagon__;
var F = [[S, "netlify"], [N, "edge-light"], [u, "workerd"], [O, "fastly"], [D, "deno"], [L, "bun"], [A, "node"], [b, "lagon"]];
function G() {
  const e = F.find((o) => o[0]);
  if (e)
    return { name: e[1] };
}
var P = G();
var K = P?.name || "";

// node_modules/@vitest/utils/dist/helpers.js
function notNullish(v) {
  return v != null;
}
function isPrimitive(value) {
  return value === null || typeof value !== "function" && typeof value !== "object";
}
function toArray(array) {
  if (array === null || array === void 0)
    array = [];
  if (Array.isArray(array))
    return array;
  return [array];
}
function isFinalObj(obj) {
  return obj === Object.prototype || obj === Function.prototype || obj === RegExp.prototype;
}
function getType(value) {
  return Object.prototype.toString.apply(value).slice(8, -1);
}
function collectOwnProperties(obj, collector) {
  const collect = typeof collector === "function" ? collector : (key) => collector.add(key);
  Object.getOwnPropertyNames(obj).forEach(collect);
  Object.getOwnPropertySymbols(obj).forEach(collect);
}
function getOwnProperties(obj) {
  const ownProps = /* @__PURE__ */ new Set();
  if (isFinalObj(obj))
    return [];
  collectOwnProperties(obj, ownProps);
  return Array.from(ownProps);
}
var defaultCloneOptions = { forceWritable: false };
function deepClone(val, options = defaultCloneOptions) {
  const seen = /* @__PURE__ */ new WeakMap();
  return clone(val, seen, options);
}
function clone(val, seen, options = defaultCloneOptions) {
  let k, out;
  if (seen.has(val))
    return seen.get(val);
  if (Array.isArray(val)) {
    out = Array(k = val.length);
    seen.set(val, out);
    while (k--)
      out[k] = clone(val[k], seen, options);
    return out;
  }
  if (Object.prototype.toString.call(val) === "[object Object]") {
    out = Object.create(Object.getPrototypeOf(val));
    seen.set(val, out);
    const props = getOwnProperties(val);
    for (const k2 of props) {
      const descriptor = Object.getOwnPropertyDescriptor(val, k2);
      if (!descriptor)
        continue;
      const cloned = clone(val[k2], seen, options);
      if ("get" in descriptor) {
        Object.defineProperty(out, k2, {
          ...descriptor,
          get() {
            return cloned;
          }
        });
      } else {
        Object.defineProperty(out, k2, {
          ...descriptor,
          writable: options.forceWritable ? true : descriptor.writable,
          value: cloned
        });
      }
    }
    return out;
  }
  return val;
}
function createDefer() {
  let resolve2 = null;
  let reject = null;
  const p2 = new Promise((_resolve, _reject) => {
    resolve2 = _resolve;
    reject = _reject;
  });
  p2.resolve = resolve2;
  p2.reject = reject;
  return p2;
}

// node_modules/@vitest/utils/dist/chunk-display.js
var import_pretty_format = __toESM(require_build(), 1);

// node_modules/loupe/lib/helpers.js
var ansiColors = {
  bold: ["1", "22"],
  dim: ["2", "22"],
  italic: ["3", "23"],
  underline: ["4", "24"],
  // 5 & 6 are blinking
  inverse: ["7", "27"],
  hidden: ["8", "28"],
  strike: ["9", "29"],
  // 10-20 are fonts
  // 21-29 are resets for 1-9
  black: ["30", "39"],
  red: ["31", "39"],
  green: ["32", "39"],
  yellow: ["33", "39"],
  blue: ["34", "39"],
  magenta: ["35", "39"],
  cyan: ["36", "39"],
  white: ["37", "39"],
  brightblack: ["30;1", "39"],
  brightred: ["31;1", "39"],
  brightgreen: ["32;1", "39"],
  brightyellow: ["33;1", "39"],
  brightblue: ["34;1", "39"],
  brightmagenta: ["35;1", "39"],
  brightcyan: ["36;1", "39"],
  brightwhite: ["37;1", "39"],
  grey: ["90", "39"]
};
var styles = {
  special: "cyan",
  number: "yellow",
  bigint: "yellow",
  boolean: "yellow",
  undefined: "grey",
  null: "bold",
  string: "green",
  symbol: "green",
  date: "magenta",
  regexp: "red"
};
var truncator = "\u2026";
function colorise(value, styleType) {
  const color = ansiColors[styles[styleType]] || ansiColors[styleType];
  if (!color) {
    return String(value);
  }
  return `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m`;
}
function normaliseOptions({
  showHidden = false,
  depth = 2,
  colors = false,
  customInspect = true,
  showProxy = false,
  maxArrayLength = Infinity,
  breakLength = Infinity,
  seen = [],
  // eslint-disable-next-line no-shadow
  truncate: truncate2 = Infinity,
  stylize = String
} = {}) {
  const options = {
    showHidden: Boolean(showHidden),
    depth: Number(depth),
    colors: Boolean(colors),
    customInspect: Boolean(customInspect),
    showProxy: Boolean(showProxy),
    maxArrayLength: Number(maxArrayLength),
    breakLength: Number(breakLength),
    truncate: Number(truncate2),
    seen,
    stylize
  };
  if (options.colors) {
    options.stylize = colorise;
  }
  return options;
}
function truncate(string2, length, tail = truncator) {
  string2 = String(string2);
  const tailLength = tail.length;
  const stringLength = string2.length;
  if (tailLength > length && stringLength > tailLength) {
    return tail;
  }
  if (stringLength > length && stringLength > tailLength) {
    return `${string2.slice(0, length - tailLength)}${tail}`;
  }
  return string2;
}
function inspectList(list, options, inspectItem, separator = ", ") {
  inspectItem = inspectItem || options.inspect;
  const size = list.length;
  if (size === 0)
    return "";
  const originalLength = options.truncate;
  let output = "";
  let peek = "";
  let truncated = "";
  for (let i = 0; i < size; i += 1) {
    const last = i + 1 === list.length;
    const secondToLast = i + 2 === list.length;
    truncated = `${truncator}(${list.length - i})`;
    const value = list[i];
    options.truncate = originalLength - output.length - (last ? 0 : separator.length);
    const string2 = peek || inspectItem(value, options) + (last ? "" : separator);
    const nextLength = output.length + string2.length;
    const truncatedLength = nextLength + truncated.length;
    if (last && nextLength > originalLength && output.length + truncated.length <= originalLength) {
      break;
    }
    if (!last && !secondToLast && truncatedLength > originalLength) {
      break;
    }
    peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator);
    if (!last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength) {
      break;
    }
    output += string2;
    if (!last && !secondToLast && nextLength + peek.length >= originalLength) {
      truncated = `${truncator}(${list.length - i - 1})`;
      break;
    }
    truncated = "";
  }
  return `${output}${truncated}`;
}
function quoteComplexKey(key) {
  if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) {
    return key;
  }
  return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
function inspectProperty([key, value], options) {
  options.truncate -= 2;
  if (typeof key === "string") {
    key = quoteComplexKey(key);
  } else if (typeof key !== "number") {
    key = `[${options.inspect(key, options)}]`;
  }
  options.truncate -= key.length;
  value = options.inspect(value, options);
  return `${key}: ${value}`;
}

// node_modules/loupe/lib/array.js
function inspectArray(array, options) {
  const nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length)
    return "[]";
  options.truncate -= 4;
  const listContents = inspectList(array, options);
  options.truncate -= listContents.length;
  let propertyContents = "";
  if (nonIndexProperties.length) {
    propertyContents = inspectList(
      nonIndexProperties.map((key) => [key, array[key]]),
      options,
      inspectProperty
    );
  }
  return `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}

// node_modules/loupe/lib/typedarray.js
var import_get_func_name = __toESM(require_get_func_name());
var getArrayName = (array) => {
  if (typeof Buffer === "function" && array instanceof Buffer) {
    return "Buffer";
  }
  if (array[Symbol.toStringTag]) {
    return array[Symbol.toStringTag];
  }
  return (0, import_get_func_name.default)(array.constructor);
};
function inspectTypedArray(array, options) {
  const name = getArrayName(array);
  options.truncate -= name.length + 4;
  const nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length)
    return `${name}[]`;
  let output = "";
  for (let i = 0; i < array.length; i++) {
    const string2 = `${options.stylize(truncate(array[i], options.truncate), "number")}${i === array.length - 1 ? "" : ", "}`;
    options.truncate -= string2.length;
    if (array[i] !== array.length && options.truncate <= 3) {
      output += `${truncator}(${array.length - array[i] + 1})`;
      break;
    }
    output += string2;
  }
  let propertyContents = "";
  if (nonIndexProperties.length) {
    propertyContents = inspectList(
      nonIndexProperties.map((key) => [key, array[key]]),
      options,
      inspectProperty
    );
  }
  return `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}

// node_modules/loupe/lib/date.js
function inspectDate(dateObject, options) {
  const stringRepresentation = dateObject.toJSON();
  if (stringRepresentation === null) {
    return "Invalid Date";
  }
  const split = stringRepresentation.split("T");
  const date = split[0];
  return options.stylize(`${date}T${truncate(split[1], options.truncate - date.length - 1)}`, "date");
}

// node_modules/loupe/lib/function.js
var import_get_func_name2 = __toESM(require_get_func_name());
function inspectFunction(func, options) {
  const name = (0, import_get_func_name2.default)(func);
  if (!name) {
    return options.stylize("[Function]", "special");
  }
  return options.stylize(`[Function ${truncate(name, options.truncate - 11)}]`, "special");
}

// node_modules/loupe/lib/map.js
function inspectMapEntry([key, value], options) {
  options.truncate -= 4;
  key = options.inspect(key, options);
  options.truncate -= key.length;
  value = options.inspect(value, options);
  return `${key} => ${value}`;
}
function mapToEntries(map) {
  const entries = [];
  map.forEach((value, key) => {
    entries.push([key, value]);
  });
  return entries;
}
function inspectMap(map, options) {
  const size = map.size - 1;
  if (size <= 0) {
    return "Map{}";
  }
  options.truncate -= 7;
  return `Map{ ${inspectList(mapToEntries(map), options, inspectMapEntry)} }`;
}

// node_modules/loupe/lib/number.js
var isNaN2 = Number.isNaN || ((i) => i !== i);
function inspectNumber(number, options) {
  if (isNaN2(number)) {
    return options.stylize("NaN", "number");
  }
  if (number === Infinity) {
    return options.stylize("Infinity", "number");
  }
  if (number === -Infinity) {
    return options.stylize("-Infinity", "number");
  }
  if (number === 0) {
    return options.stylize(1 / number === Infinity ? "+0" : "-0", "number");
  }
  return options.stylize(truncate(number, options.truncate), "number");
}

// node_modules/loupe/lib/bigint.js
function inspectBigInt(number, options) {
  let nums = truncate(number.toString(), options.truncate - 1);
  if (nums !== truncator)
    nums += "n";
  return options.stylize(nums, "bigint");
}

// node_modules/loupe/lib/regexp.js
function inspectRegExp(value, options) {
  const flags = value.toString().split("/")[2];
  const sourceLength = options.truncate - (2 + flags.length);
  const source = value.source;
  return options.stylize(`/${truncate(source, sourceLength)}/${flags}`, "regexp");
}

// node_modules/loupe/lib/set.js
function arrayFromSet(set2) {
  const values = [];
  set2.forEach((value) => {
    values.push(value);
  });
  return values;
}
function inspectSet(set2, options) {
  if (set2.size === 0)
    return "Set{}";
  options.truncate -= 7;
  return `Set{ ${inspectList(arrayFromSet(set2), options)} }`;
}

// node_modules/loupe/lib/string.js
var stringEscapeChars = new RegExp(
  "['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]",
  "g"
);
var escapeCharacters = {
  "\b": "\\b",
  "	": "\\t",
  "\n": "\\n",
  "\f": "\\f",
  "\r": "\\r",
  "'": "\\'",
  "\\": "\\\\"
};
var hex = 16;
var unicodeLength = 4;
function escape(char) {
  return escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(hex)}`.slice(-unicodeLength)}`;
}
function inspectString(string2, options) {
  if (stringEscapeChars.test(string2)) {
    string2 = string2.replace(stringEscapeChars, escape);
  }
  return options.stylize(`'${truncate(string2, options.truncate - 2)}'`, "string");
}

// node_modules/loupe/lib/symbol.js
function inspectSymbol(value) {
  if ("description" in Symbol.prototype) {
    return value.description ? `Symbol(${value.description})` : "Symbol()";
  }
  return value.toString();
}

// node_modules/loupe/lib/promise.js
var getPromiseValue = () => "Promise{\u2026}";
try {
  const { getPromiseDetails, kPending, kRejected } = process.binding("util");
  if (Array.isArray(getPromiseDetails(Promise.resolve()))) {
    getPromiseValue = (value, options) => {
      const [state, innerValue] = getPromiseDetails(value);
      if (state === kPending) {
        return "Promise{<pending>}";
      }
      return `Promise${state === kRejected ? "!" : ""}{${options.inspect(innerValue, options)}}`;
    };
  }
} catch (notNode) {
}
var promise_default = getPromiseValue;

// node_modules/loupe/lib/class.js
var import_get_func_name3 = __toESM(require_get_func_name());

// node_modules/loupe/lib/object.js
function inspectObject(object, options) {
  const properties = Object.getOwnPropertyNames(object);
  const symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
  if (properties.length === 0 && symbols.length === 0) {
    return "{}";
  }
  options.truncate -= 4;
  options.seen = options.seen || [];
  if (options.seen.indexOf(object) >= 0) {
    return "[Circular]";
  }
  options.seen.push(object);
  const propertyContents = inspectList(
    properties.map((key) => [key, object[key]]),
    options,
    inspectProperty
  );
  const symbolContents = inspectList(
    symbols.map((key) => [key, object[key]]),
    options,
    inspectProperty
  );
  options.seen.pop();
  let sep = "";
  if (propertyContents && symbolContents) {
    sep = ", ";
  }
  return `{ ${propertyContents}${sep}${symbolContents} }`;
}

// node_modules/loupe/lib/class.js
var toStringTag = typeof Symbol !== "undefined" && Symbol.toStringTag ? Symbol.toStringTag : false;
function inspectClass(value, options) {
  let name = "";
  if (toStringTag && toStringTag in value) {
    name = value[toStringTag];
  }
  name = name || (0, import_get_func_name3.default)(value.constructor);
  if (!name || name === "_class") {
    name = "<Anonymous Class>";
  }
  options.truncate -= name.length;
  return `${name}${inspectObject(value, options)}`;
}

// node_modules/loupe/lib/arguments.js
function inspectArguments(args, options) {
  if (args.length === 0)
    return "Arguments[]";
  options.truncate -= 13;
  return `Arguments[ ${inspectList(args, options)} ]`;
}

// node_modules/loupe/lib/error.js
var errorKeys = [
  "stack",
  "line",
  "column",
  "name",
  "message",
  "fileName",
  "lineNumber",
  "columnNumber",
  "number",
  "description"
];
function inspectObject2(error, options) {
  const properties = Object.getOwnPropertyNames(error).filter((key) => errorKeys.indexOf(key) === -1);
  const name = error.name;
  options.truncate -= name.length;
  let message = "";
  if (typeof error.message === "string") {
    message = truncate(error.message, options.truncate);
  } else {
    properties.unshift("message");
  }
  message = message ? `: ${message}` : "";
  options.truncate -= message.length + 5;
  const propertyContents = inspectList(
    properties.map((key) => [key, error[key]]),
    options,
    inspectProperty
  );
  return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
}

// node_modules/loupe/lib/html.js
function inspectAttribute([key, value], options) {
  options.truncate -= 3;
  if (!value) {
    return `${options.stylize(key, "yellow")}`;
  }
  return `${options.stylize(key, "yellow")}=${options.stylize(`"${value}"`, "string")}`;
}
function inspectHTMLCollection(collection, options) {
  return inspectList(collection, options, inspectHTML, "\n");
}
function inspectHTML(element, options) {
  const properties = element.getAttributeNames();
  const name = element.tagName.toLowerCase();
  const head = options.stylize(`<${name}`, "special");
  const headClose = options.stylize(`>`, "special");
  const tail = options.stylize(`</${name}>`, "special");
  options.truncate -= name.length * 2 + 5;
  let propertyContents = "";
  if (properties.length > 0) {
    propertyContents += " ";
    propertyContents += inspectList(
      properties.map((key) => [key, element.getAttribute(key)]),
      options,
      inspectAttribute,
      " "
    );
  }
  options.truncate -= propertyContents.length;
  const truncate2 = options.truncate;
  let children = inspectHTMLCollection(element.children, options);
  if (children && children.length > truncate2) {
    children = `${truncator}(${element.children.length})`;
  }
  return `${head}${propertyContents}${headClose}${children}${tail}`;
}

// node_modules/loupe/index.js
var symbolsSupported = typeof Symbol === "function" && typeof Symbol.for === "function";
var chaiInspect = symbolsSupported ? Symbol.for("chai/inspect") : "@@chai/inspect";
var nodeInspect = false;
try {
  const nodeUtil = __require("util");
  nodeInspect = nodeUtil.inspect ? nodeUtil.inspect.custom : false;
} catch (noNodeInspect) {
  nodeInspect = false;
}
function FakeMap() {
  this.key = "chai/loupe__" + Math.random() + Date.now();
}
FakeMap.prototype = {
  // eslint-disable-next-line object-shorthand
  get: function get(key) {
    return key[this.key];
  },
  // eslint-disable-next-line object-shorthand
  has: function has(key) {
    return this.key in key;
  },
  // eslint-disable-next-line object-shorthand
  set: function set(key, value) {
    if (Object.isExtensible(key)) {
      Object.defineProperty(key, this.key, {
        // eslint-disable-next-line object-shorthand
        value,
        configurable: true
      });
    }
  }
};
var constructorMap = new (typeof WeakMap === "function" ? WeakMap : FakeMap)();
var stringTagMap = {};
var baseTypesMap = {
  undefined: (value, options) => options.stylize("undefined", "undefined"),
  null: (value, options) => options.stylize(null, "null"),
  boolean: (value, options) => options.stylize(value, "boolean"),
  Boolean: (value, options) => options.stylize(value, "boolean"),
  number: inspectNumber,
  Number: inspectNumber,
  bigint: inspectBigInt,
  BigInt: inspectBigInt,
  string: inspectString,
  String: inspectString,
  function: inspectFunction,
  Function: inspectFunction,
  symbol: inspectSymbol,
  // A Symbol polyfill will return `Symbol` not `symbol` from typedetect
  Symbol: inspectSymbol,
  Array: inspectArray,
  Date: inspectDate,
  Map: inspectMap,
  Set: inspectSet,
  RegExp: inspectRegExp,
  Promise: promise_default,
  // WeakSet, WeakMap are totally opaque to us
  WeakSet: (value, options) => options.stylize("WeakSet{\u2026}", "special"),
  WeakMap: (value, options) => options.stylize("WeakMap{\u2026}", "special"),
  Arguments: inspectArguments,
  Int8Array: inspectTypedArray,
  Uint8Array: inspectTypedArray,
  Uint8ClampedArray: inspectTypedArray,
  Int16Array: inspectTypedArray,
  Uint16Array: inspectTypedArray,
  Int32Array: inspectTypedArray,
  Uint32Array: inspectTypedArray,
  Float32Array: inspectTypedArray,
  Float64Array: inspectTypedArray,
  Generator: () => "",
  DataView: () => "",
  ArrayBuffer: () => "",
  Error: inspectObject2,
  HTMLCollection: inspectHTMLCollection,
  NodeList: inspectHTMLCollection
};
var inspectCustom = (value, options, type) => {
  if (chaiInspect in value && typeof value[chaiInspect] === "function") {
    return value[chaiInspect](options);
  }
  if (nodeInspect && nodeInspect in value && typeof value[nodeInspect] === "function") {
    return value[nodeInspect](options.depth, options);
  }
  if ("inspect" in value && typeof value.inspect === "function") {
    return value.inspect(options.depth, options);
  }
  if ("constructor" in value && constructorMap.has(value.constructor)) {
    return constructorMap.get(value.constructor)(value, options);
  }
  if (stringTagMap[type]) {
    return stringTagMap[type](value, options);
  }
  return "";
};
var toString = Object.prototype.toString;
function inspect(value, options) {
  options = normaliseOptions(options);
  options.inspect = inspect;
  const { customInspect } = options;
  let type = value === null ? "null" : typeof value;
  if (type === "object") {
    type = toString.call(value).slice(8, -1);
  }
  if (baseTypesMap[type]) {
    return baseTypesMap[type](value, options);
  }
  if (customInspect && value) {
    const output = inspectCustom(value, options, type);
    if (output) {
      if (typeof output === "string")
        return output;
      return inspect(output, options);
    }
  }
  const proto = value ? Object.getPrototypeOf(value) : false;
  if (proto === Object.prototype || proto === null) {
    return inspectObject(value, options);
  }
  if (value && typeof HTMLElement === "function" && value instanceof HTMLElement) {
    return inspectHTML(value, options);
  }
  if ("constructor" in value) {
    if (value.constructor !== Object) {
      return inspectClass(value, options);
    }
    return inspectObject(value, options);
  }
  if (value === Object(value)) {
    return inspectObject(value, options);
  }
  return options.stylize(String(value), type);
}

// node_modules/@vitest/utils/dist/chunk-display.js
var {
  AsymmetricMatcher,
  DOMCollection,
  DOMElement,
  Immutable,
  ReactElement,
  ReactTestComponent
} = import_pretty_format.plugins;
var PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher
];
function stringify(object, maxDepth = 10, { maxLength, ...options } = {}) {
  const MAX_LENGTH = maxLength ?? 1e4;
  let result;
  try {
    result = (0, import_pretty_format.format)(object, {
      maxDepth,
      escapeString: false,
      // min: true,
      plugins: PLUGINS,
      ...options
    });
  } catch {
    result = (0, import_pretty_format.format)(object, {
      callToJSON: false,
      maxDepth,
      escapeString: false,
      // min: true,
      plugins: PLUGINS,
      ...options
    });
  }
  return result.length >= MAX_LENGTH && maxDepth > 1 ? stringify(object, Math.floor(maxDepth / 2)) : result;
}
var formatRegExp = /%[sdjifoOcj%]/g;
function format(...args) {
  if (typeof args[0] !== "string") {
    const objects = [];
    for (let i2 = 0; i2 < args.length; i2++)
      objects.push(inspect2(args[i2], { depth: 0, colors: false, compact: 3 }));
    return objects.join(" ");
  }
  const len = args.length;
  let i = 1;
  const template = args[0];
  let str = String(template).replace(formatRegExp, (x) => {
    if (x === "%%")
      return "%";
    if (i >= len)
      return x;
    switch (x) {
      case "%s": {
        const value = args[i++];
        if (typeof value === "bigint")
          return `${value.toString()}n`;
        if (typeof value === "number" && value === 0 && 1 / value < 0)
          return "-0";
        if (typeof value === "object" && value !== null)
          return inspect2(value, { depth: 0, colors: false, compact: 3 });
        return String(value);
      }
      case "%d": {
        const value = args[i++];
        if (typeof value === "bigint")
          return `${value.toString()}n`;
        return Number(value).toString();
      }
      case "%i": {
        const value = args[i++];
        if (typeof value === "bigint")
          return `${value.toString()}n`;
        return Number.parseInt(String(value)).toString();
      }
      case "%f":
        return Number.parseFloat(String(args[i++])).toString();
      case "%o":
        return inspect2(args[i++], { showHidden: true, showProxy: true });
      case "%O":
        return inspect2(args[i++]);
      case "%c": {
        i++;
        return "";
      }
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch (err) {
          const m2 = err.message;
          if (
            // chromium
            m2.includes("circular structure") || m2.includes("cyclic structures") || m2.includes("cyclic object")
          )
            return "[Circular]";
          throw err;
        }
      default:
        return x;
    }
  });
  for (let x = args[i]; i < len; x = args[++i]) {
    if (x === null || typeof x !== "object")
      str += ` ${x}`;
    else
      str += ` ${inspect2(x)}`;
  }
  return str;
}
function inspect2(obj, options = {}) {
  if (options.truncate === 0)
    options.truncate = Number.POSITIVE_INFINITY;
  return inspect(obj, options);
}

// node_modules/@vitest/utils/dist/chunk-colors.js
var SAFE_TIMERS_SYMBOL = Symbol("vitest:SAFE_TIMERS");
var SAFE_COLORS_SYMBOL = Symbol("vitest:SAFE_COLORS");
var colorsMap = {
  bold: ["\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"],
  dim: ["\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"],
  italic: ["\x1B[3m", "\x1B[23m"],
  underline: ["\x1B[4m", "\x1B[24m"],
  inverse: ["\x1B[7m", "\x1B[27m"],
  hidden: ["\x1B[8m", "\x1B[28m"],
  strikethrough: ["\x1B[9m", "\x1B[29m"],
  black: ["\x1B[30m", "\x1B[39m"],
  red: ["\x1B[31m", "\x1B[39m"],
  green: ["\x1B[32m", "\x1B[39m"],
  yellow: ["\x1B[33m", "\x1B[39m"],
  blue: ["\x1B[34m", "\x1B[39m"],
  magenta: ["\x1B[35m", "\x1B[39m"],
  cyan: ["\x1B[36m", "\x1B[39m"],
  white: ["\x1B[37m", "\x1B[39m"],
  gray: ["\x1B[90m", "\x1B[39m"],
  bgBlack: ["\x1B[40m", "\x1B[49m"],
  bgRed: ["\x1B[41m", "\x1B[49m"],
  bgGreen: ["\x1B[42m", "\x1B[49m"],
  bgYellow: ["\x1B[43m", "\x1B[49m"],
  bgBlue: ["\x1B[44m", "\x1B[49m"],
  bgMagenta: ["\x1B[45m", "\x1B[49m"],
  bgCyan: ["\x1B[46m", "\x1B[49m"],
  bgWhite: ["\x1B[47m", "\x1B[49m"]
};
var colorsEntries = Object.entries(colorsMap);
function string(str) {
  return String(str);
}
string.open = "";
string.close = "";
var defaultColors = /* @__PURE__ */ colorsEntries.reduce((acc, [key]) => {
  acc[key] = string;
  return acc;
}, { isColorSupported: false });
function getColors() {
  return globalThis[SAFE_COLORS_SYMBOL] || defaultColors;
}

// node_modules/@vitest/utils/dist/index.js
var import_pretty_format2 = __toESM(require_build(), 1);
function getSafeTimers() {
  const {
    setTimeout: safeSetTimeout,
    setInterval: safeSetInterval,
    clearInterval: safeClearInterval,
    clearTimeout: safeClearTimeout,
    setImmediate: safeSetImmediate,
    clearImmediate: safeClearImmediate
  } = globalThis[SAFE_TIMERS_SYMBOL] || globalThis;
  const {
    nextTick: safeNextTick
  } = globalThis[SAFE_TIMERS_SYMBOL] || globalThis.process || { nextTick: (cb) => cb() };
  return {
    nextTick: safeNextTick,
    setTimeout: safeSetTimeout,
    setInterval: safeSetInterval,
    clearInterval: safeClearInterval,
    clearTimeout: safeClearTimeout,
    setImmediate: safeSetImmediate,
    clearImmediate: safeClearImmediate
  };
}
var RealDate = Date;
function random(seed) {
  const x = Math.sin(seed++) * 1e4;
  return x - Math.floor(x);
}
function shuffle(array, seed = RealDate.now()) {
  let length = array.length;
  while (length) {
    const index = Math.floor(random(seed) * length--);
    const previous = array[length];
    array[length] = array[index];
    array[index] = previous;
    ++seed;
  }
  return array;
}
var lineSplitRE = /\r?\n/;
function positionToOffset(source, lineNumber, columnNumber) {
  const lines = source.split(lineSplitRE);
  const nl = /\r\n/.test(source) ? 2 : 1;
  let start = 0;
  if (lineNumber > lines.length)
    return source.length;
  for (let i = 0; i < lineNumber - 1; i++)
    start += lines[i].length + nl;
  return start + columnNumber;
}
function getDefaultExportFromCjs2(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var Identifier;
var JSXIdentifier;
var JSXPunctuator;
var JSXString;
var JSXText;
var KeywordsWithExpressionAfter;
var KeywordsWithNoLineTerminatorAfter;
var LineTerminatorSequence;
var MultiLineComment;
var Newline;
var NumericLiteral;
var Punctuator;
var RegularExpressionLiteral;
var SingleLineComment;
var StringLiteral;
var Template;
var TokensNotPrecedingObjectLiteral;
var TokensPrecedingExpression;
var WhiteSpace;
RegularExpressionLiteral = /\/(?![*\/])(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\\]).|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/yu;
Punctuator = /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y;
Identifier = /(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/yu;
StringLiteral = /(['"])(?:(?!\1)[^\\\n\r]|\\(?:\r\n|[^]))*(\1)?/y;
NumericLiteral = /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y;
Template = /[`}](?:[^`\\$]|\\[^]|\$(?!\{))*(`|\$\{)?/y;
WhiteSpace = /[\t\v\f\ufeff\p{Zs}]+/yu;
LineTerminatorSequence = /\r?\n|[\r\u2028\u2029]/y;
MultiLineComment = /\/\*(?:[^*]|\*(?!\/))*(\*\/)?/y;
SingleLineComment = /\/\/.*/y;
JSXPunctuator = /[<>.:={}]|\/(?![\/*])/y;
JSXIdentifier = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/yu;
JSXString = /(['"])(?:(?!\1)[^])*(\1)?/y;
JSXText = /[^<>{}]+/y;
TokensPrecedingExpression = /^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/;
TokensNotPrecedingObjectLiteral = /^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/;
KeywordsWithExpressionAfter = /^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/;
KeywordsWithNoLineTerminatorAfter = /^(?:return|throw|yield)$/;
Newline = RegExp(LineTerminatorSequence.source);
var jsTokens_1 = function* (input, { jsx = false } = {}) {
  var braces, firstCodePoint, isExpression, lastIndex, lastSignificantToken, length, match, mode, nextLastIndex, nextLastSignificantToken, parenNesting, postfixIncDec, punctuator, stack;
  ({ length } = input);
  lastIndex = 0;
  lastSignificantToken = "";
  stack = [
    { tag: "JS" }
  ];
  braces = [];
  parenNesting = 0;
  postfixIncDec = false;
  while (lastIndex < length) {
    mode = stack[stack.length - 1];
    switch (mode.tag) {
      case "JS":
      case "JSNonExpressionParen":
      case "InterpolationInTemplate":
      case "InterpolationInJSX":
        if (input[lastIndex] === "/" && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken))) {
          RegularExpressionLiteral.lastIndex = lastIndex;
          if (match = RegularExpressionLiteral.exec(input)) {
            lastIndex = RegularExpressionLiteral.lastIndex;
            lastSignificantToken = match[0];
            postfixIncDec = true;
            yield {
              type: "RegularExpressionLiteral",
              value: match[0],
              closed: match[1] !== void 0 && match[1] !== "\\"
            };
            continue;
          }
        }
        Punctuator.lastIndex = lastIndex;
        if (match = Punctuator.exec(input)) {
          punctuator = match[0];
          nextLastIndex = Punctuator.lastIndex;
          nextLastSignificantToken = punctuator;
          switch (punctuator) {
            case "(":
              if (lastSignificantToken === "?NonExpressionParenKeyword") {
                stack.push({
                  tag: "JSNonExpressionParen",
                  nesting: parenNesting
                });
              }
              parenNesting++;
              postfixIncDec = false;
              break;
            case ")":
              parenNesting--;
              postfixIncDec = true;
              if (mode.tag === "JSNonExpressionParen" && parenNesting === mode.nesting) {
                stack.pop();
                nextLastSignificantToken = "?NonExpressionParenEnd";
                postfixIncDec = false;
              }
              break;
            case "{":
              Punctuator.lastIndex = 0;
              isExpression = !TokensNotPrecedingObjectLiteral.test(lastSignificantToken) && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken));
              braces.push(isExpression);
              postfixIncDec = false;
              break;
            case "}":
              switch (mode.tag) {
                case "InterpolationInTemplate":
                  if (braces.length === mode.nesting) {
                    Template.lastIndex = lastIndex;
                    match = Template.exec(input);
                    lastIndex = Template.lastIndex;
                    lastSignificantToken = match[0];
                    if (match[1] === "${") {
                      lastSignificantToken = "?InterpolationInTemplate";
                      postfixIncDec = false;
                      yield {
                        type: "TemplateMiddle",
                        value: match[0]
                      };
                    } else {
                      stack.pop();
                      postfixIncDec = true;
                      yield {
                        type: "TemplateTail",
                        value: match[0],
                        closed: match[1] === "`"
                      };
                    }
                    continue;
                  }
                  break;
                case "InterpolationInJSX":
                  if (braces.length === mode.nesting) {
                    stack.pop();
                    lastIndex += 1;
                    lastSignificantToken = "}";
                    yield {
                      type: "JSXPunctuator",
                      value: "}"
                    };
                    continue;
                  }
              }
              postfixIncDec = braces.pop();
              nextLastSignificantToken = postfixIncDec ? "?ExpressionBraceEnd" : "}";
              break;
            case "]":
              postfixIncDec = true;
              break;
            case "++":
            case "--":
              nextLastSignificantToken = postfixIncDec ? "?PostfixIncDec" : "?UnaryIncDec";
              break;
            case "<":
              if (jsx && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken))) {
                stack.push({ tag: "JSXTag" });
                lastIndex += 1;
                lastSignificantToken = "<";
                yield {
                  type: "JSXPunctuator",
                  value: punctuator
                };
                continue;
              }
              postfixIncDec = false;
              break;
            default:
              postfixIncDec = false;
          }
          lastIndex = nextLastIndex;
          lastSignificantToken = nextLastSignificantToken;
          yield {
            type: "Punctuator",
            value: punctuator
          };
          continue;
        }
        Identifier.lastIndex = lastIndex;
        if (match = Identifier.exec(input)) {
          lastIndex = Identifier.lastIndex;
          nextLastSignificantToken = match[0];
          switch (match[0]) {
            case "for":
            case "if":
            case "while":
            case "with":
              if (lastSignificantToken !== "." && lastSignificantToken !== "?.") {
                nextLastSignificantToken = "?NonExpressionParenKeyword";
              }
          }
          lastSignificantToken = nextLastSignificantToken;
          postfixIncDec = !KeywordsWithExpressionAfter.test(match[0]);
          yield {
            type: match[1] === "#" ? "PrivateIdentifier" : "IdentifierName",
            value: match[0]
          };
          continue;
        }
        StringLiteral.lastIndex = lastIndex;
        if (match = StringLiteral.exec(input)) {
          lastIndex = StringLiteral.lastIndex;
          lastSignificantToken = match[0];
          postfixIncDec = true;
          yield {
            type: "StringLiteral",
            value: match[0],
            closed: match[2] !== void 0
          };
          continue;
        }
        NumericLiteral.lastIndex = lastIndex;
        if (match = NumericLiteral.exec(input)) {
          lastIndex = NumericLiteral.lastIndex;
          lastSignificantToken = match[0];
          postfixIncDec = true;
          yield {
            type: "NumericLiteral",
            value: match[0]
          };
          continue;
        }
        Template.lastIndex = lastIndex;
        if (match = Template.exec(input)) {
          lastIndex = Template.lastIndex;
          lastSignificantToken = match[0];
          if (match[1] === "${") {
            lastSignificantToken = "?InterpolationInTemplate";
            stack.push({
              tag: "InterpolationInTemplate",
              nesting: braces.length
            });
            postfixIncDec = false;
            yield {
              type: "TemplateHead",
              value: match[0]
            };
          } else {
            postfixIncDec = true;
            yield {
              type: "NoSubstitutionTemplate",
              value: match[0],
              closed: match[1] === "`"
            };
          }
          continue;
        }
        break;
      case "JSXTag":
      case "JSXTagEnd":
        JSXPunctuator.lastIndex = lastIndex;
        if (match = JSXPunctuator.exec(input)) {
          lastIndex = JSXPunctuator.lastIndex;
          nextLastSignificantToken = match[0];
          switch (match[0]) {
            case "<":
              stack.push({ tag: "JSXTag" });
              break;
            case ">":
              stack.pop();
              if (lastSignificantToken === "/" || mode.tag === "JSXTagEnd") {
                nextLastSignificantToken = "?JSX";
                postfixIncDec = true;
              } else {
                stack.push({ tag: "JSXChildren" });
              }
              break;
            case "{":
              stack.push({
                tag: "InterpolationInJSX",
                nesting: braces.length
              });
              nextLastSignificantToken = "?InterpolationInJSX";
              postfixIncDec = false;
              break;
            case "/":
              if (lastSignificantToken === "<") {
                stack.pop();
                if (stack[stack.length - 1].tag === "JSXChildren") {
                  stack.pop();
                }
                stack.push({ tag: "JSXTagEnd" });
              }
          }
          lastSignificantToken = nextLastSignificantToken;
          yield {
            type: "JSXPunctuator",
            value: match[0]
          };
          continue;
        }
        JSXIdentifier.lastIndex = lastIndex;
        if (match = JSXIdentifier.exec(input)) {
          lastIndex = JSXIdentifier.lastIndex;
          lastSignificantToken = match[0];
          yield {
            type: "JSXIdentifier",
            value: match[0]
          };
          continue;
        }
        JSXString.lastIndex = lastIndex;
        if (match = JSXString.exec(input)) {
          lastIndex = JSXString.lastIndex;
          lastSignificantToken = match[0];
          yield {
            type: "JSXString",
            value: match[0],
            closed: match[2] !== void 0
          };
          continue;
        }
        break;
      case "JSXChildren":
        JSXText.lastIndex = lastIndex;
        if (match = JSXText.exec(input)) {
          lastIndex = JSXText.lastIndex;
          lastSignificantToken = match[0];
          yield {
            type: "JSXText",
            value: match[0]
          };
          continue;
        }
        switch (input[lastIndex]) {
          case "<":
            stack.push({ tag: "JSXTag" });
            lastIndex++;
            lastSignificantToken = "<";
            yield {
              type: "JSXPunctuator",
              value: "<"
            };
            continue;
          case "{":
            stack.push({
              tag: "InterpolationInJSX",
              nesting: braces.length
            });
            lastIndex++;
            lastSignificantToken = "?InterpolationInJSX";
            postfixIncDec = false;
            yield {
              type: "JSXPunctuator",
              value: "{"
            };
            continue;
        }
    }
    WhiteSpace.lastIndex = lastIndex;
    if (match = WhiteSpace.exec(input)) {
      lastIndex = WhiteSpace.lastIndex;
      yield {
        type: "WhiteSpace",
        value: match[0]
      };
      continue;
    }
    LineTerminatorSequence.lastIndex = lastIndex;
    if (match = LineTerminatorSequence.exec(input)) {
      lastIndex = LineTerminatorSequence.lastIndex;
      postfixIncDec = false;
      if (KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken)) {
        lastSignificantToken = "?NoLineTerminatorHere";
      }
      yield {
        type: "LineTerminatorSequence",
        value: match[0]
      };
      continue;
    }
    MultiLineComment.lastIndex = lastIndex;
    if (match = MultiLineComment.exec(input)) {
      lastIndex = MultiLineComment.lastIndex;
      if (Newline.test(match[0])) {
        postfixIncDec = false;
        if (KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken)) {
          lastSignificantToken = "?NoLineTerminatorHere";
        }
      }
      yield {
        type: "MultiLineComment",
        value: match[0],
        closed: match[1] !== void 0
      };
      continue;
    }
    SingleLineComment.lastIndex = lastIndex;
    if (match = SingleLineComment.exec(input)) {
      lastIndex = SingleLineComment.lastIndex;
      postfixIncDec = false;
      yield {
        type: "SingleLineComment",
        value: match[0]
      };
      continue;
    }
    firstCodePoint = String.fromCodePoint(input.codePointAt(lastIndex));
    lastIndex += firstCodePoint.length;
    lastSignificantToken = firstCodePoint;
    postfixIncDec = false;
    yield {
      type: mode.tag.startsWith("JSX") ? "JSXInvalid" : "Invalid",
      value: firstCodePoint
    };
  }
  return void 0;
};
var jsTokens = /* @__PURE__ */ getDefaultExportFromCjs2(jsTokens_1);
var reservedWords = {
  keyword: [
    "break",
    "case",
    "catch",
    "continue",
    "debugger",
    "default",
    "do",
    "else",
    "finally",
    "for",
    "function",
    "if",
    "return",
    "switch",
    "throw",
    "try",
    "var",
    "const",
    "while",
    "with",
    "new",
    "this",
    "super",
    "class",
    "extends",
    "export",
    "import",
    "null",
    "true",
    "false",
    "in",
    "instanceof",
    "typeof",
    "void",
    "delete"
  ],
  strict: [
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "yield"
  ]
};
var keywords = new Set(reservedWords.keyword);
var reservedWordsStrictSet = new Set(reservedWords.strict);
var sometimesKeywords = /* @__PURE__ */ new Set(["as", "async", "from", "get", "of", "set"]);
function isReservedWord(word) {
  return word === "await" || word === "enum";
}
function isStrictReservedWord(word) {
  return isReservedWord(word) || reservedWordsStrictSet.has(word);
}
function isKeyword(word) {
  return keywords.has(word);
}
var BRACKET = /^[()[\]{}]$/;
var getTokenType = function(token) {
  if (token.type === "IdentifierName") {
    if (isKeyword(token.value) || isStrictReservedWord(token.value) || sometimesKeywords.has(token.value))
      return "Keyword";
    if (token.value[0] && token.value[0] !== token.value[0].toLowerCase())
      return "IdentifierCapitalized";
  }
  return token.type === "Punctuator" && BRACKET.test(token.value) ? "Bracket" : token.type === "Invalid" && (token.value === "@" || token.value === "#") ? "Punctuator" : token.type;
};
function getCallableType(token) {
  if (token.type === "IdentifierName")
    return "IdentifierCallable";
  if (token.type === "PrivateIdentifier")
    return "PrivateIdentifierCallable";
  throw new Error("Not a callable token");
}
var colorize = (defs, type, value) => {
  let colorize2 = defs[type];
  return colorize2 ? colorize2(value) : value;
};
var highlightTokens = (defs, text, jsx) => {
  let highlighted = "", lastPotentialCallable = null, stackedHighlight = "";
  for (let token of jsTokens(text, { jsx })) {
    let type = getTokenType(token);
    if (type === "IdentifierName" || type === "PrivateIdentifier") {
      lastPotentialCallable && (highlighted += colorize(defs, getTokenType(lastPotentialCallable), lastPotentialCallable.value) + stackedHighlight, stackedHighlight = ""), lastPotentialCallable = token;
      continue;
    }
    if (lastPotentialCallable && (token.type === "WhiteSpace" || token.type === "LineTerminatorSequence" || token.type === "Punctuator" && (token.value === "?." || token.value === "!"))) {
      stackedHighlight += colorize(defs, type, token.value);
      continue;
    }
    if (stackedHighlight && !lastPotentialCallable && (highlighted += stackedHighlight, stackedHighlight = ""), lastPotentialCallable) {
      let type2 = token.type === "Punctuator" && token.value === "(" ? getCallableType(lastPotentialCallable) : getTokenType(lastPotentialCallable);
      highlighted += colorize(defs, type2, lastPotentialCallable.value) + stackedHighlight, stackedHighlight = "", lastPotentialCallable = null;
    }
    highlighted += colorize(defs, type, token.value);
  }
  return highlighted;
};
function highlight$1(code, options = { jsx: false, colors: {} }) {
  return code && highlightTokens(options.colors || {}, code, options.jsx);
}
function getDefs(c2) {
  const Invalid = (text) => c2.white(c2.bgRed(c2.bold(text)));
  return {
    Keyword: c2.magenta,
    IdentifierCapitalized: c2.yellow,
    Punctuator: c2.yellow,
    StringLiteral: c2.green,
    NoSubstitutionTemplate: c2.green,
    MultiLineComment: c2.gray,
    SingleLineComment: c2.gray,
    RegularExpressionLiteral: c2.cyan,
    NumericLiteral: c2.blue,
    TemplateHead: (text) => c2.green(text.slice(0, text.length - 2)) + c2.cyan(text.slice(-2)),
    TemplateTail: (text) => c2.cyan(text.slice(0, 1)) + c2.green(text.slice(1)),
    TemplateMiddle: (text) => c2.cyan(text.slice(0, 1)) + c2.green(text.slice(1, text.length - 2)) + c2.cyan(text.slice(-2)),
    IdentifierCallable: c2.blue,
    PrivateIdentifierCallable: (text) => `#${c2.blue(text.slice(1))}`,
    Invalid,
    JSXString: c2.green,
    JSXIdentifier: c2.yellow,
    JSXInvalid: Invalid,
    JSXPunctuator: c2.yellow
  };
}
function highlight(code, options = { jsx: false }) {
  return highlight$1(code, {
    jsx: options.jsx,
    colors: getDefs(options.colors || getColors())
  });
}

// node_modules/@vitest/utils/dist/diff.js
var import_pretty_format3 = __toESM(require_build(), 1);
var diff$1 = __toESM(require_build2(), 1);
function getType2(value) {
  if (value === void 0) {
    return "undefined";
  } else if (value === null) {
    return "null";
  } else if (Array.isArray(value)) {
    return "array";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else if (typeof value === "function") {
    return "function";
  } else if (typeof value === "number") {
    return "number";
  } else if (typeof value === "string") {
    return "string";
  } else if (typeof value === "bigint") {
    return "bigint";
  } else if (typeof value === "object") {
    if (value != null) {
      if (value.constructor === RegExp)
        return "regexp";
      else if (value.constructor === Map)
        return "map";
      else if (value.constructor === Set)
        return "set";
      else if (value.constructor === Date)
        return "date";
    }
    return "object";
  } else if (typeof value === "symbol") {
    return "symbol";
  }
  throw new Error(`value of unknown type: ${value}`);
}
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;
var Diff = class {
  0;
  1;
  constructor(op, text) {
    this[0] = op;
    this[1] = text;
  }
};
var NO_DIFF_MESSAGE = "Compared values have no visual difference.";
var SIMILAR_MESSAGE = "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.";
function formatTrailingSpaces(line, trailingSpaceFormatter) {
  return line.replace(/\s+$/, (match) => trailingSpaceFormatter(match));
}
function printDiffLine(line, isFirstOrLast, color, indicator, trailingSpaceFormatter, emptyFirstOrLastLinePlaceholder) {
  return line.length !== 0 ? color(
    `${indicator} ${formatTrailingSpaces(line, trailingSpaceFormatter)}`
  ) : indicator !== " " ? color(indicator) : isFirstOrLast && emptyFirstOrLastLinePlaceholder.length !== 0 ? color(`${indicator} ${emptyFirstOrLastLinePlaceholder}`) : "";
}
function printDeleteLine(line, isFirstOrLast, {
  aColor,
  aIndicator,
  changeLineTrailingSpaceColor,
  emptyFirstOrLastLinePlaceholder
}) {
  return printDiffLine(
    line,
    isFirstOrLast,
    aColor,
    aIndicator,
    changeLineTrailingSpaceColor,
    emptyFirstOrLastLinePlaceholder
  );
}
function printInsertLine(line, isFirstOrLast, {
  bColor,
  bIndicator,
  changeLineTrailingSpaceColor,
  emptyFirstOrLastLinePlaceholder
}) {
  return printDiffLine(
    line,
    isFirstOrLast,
    bColor,
    bIndicator,
    changeLineTrailingSpaceColor,
    emptyFirstOrLastLinePlaceholder
  );
}
function printCommonLine(line, isFirstOrLast, {
  commonColor,
  commonIndicator,
  commonLineTrailingSpaceColor,
  emptyFirstOrLastLinePlaceholder
}) {
  return printDiffLine(
    line,
    isFirstOrLast,
    commonColor,
    commonIndicator,
    commonLineTrailingSpaceColor,
    emptyFirstOrLastLinePlaceholder
  );
}
function createPatchMark(aStart, aEnd, bStart, bEnd, { patchColor }) {
  return patchColor(
    `@@ -${aStart + 1},${aEnd - aStart} +${bStart + 1},${bEnd - bStart} @@`
  );
}
function joinAlignedDiffsNoExpand(diffs, options) {
  const iLength = diffs.length;
  const nContextLines = options.contextLines;
  const nContextLines2 = nContextLines + nContextLines;
  let jLength = iLength;
  let hasExcessAtStartOrEnd = false;
  let nExcessesBetweenChanges = 0;
  let i = 0;
  while (i !== iLength) {
    const iStart = i;
    while (i !== iLength && diffs[i][0] === DIFF_EQUAL)
      i += 1;
    if (iStart !== i) {
      if (iStart === 0) {
        if (i > nContextLines) {
          jLength -= i - nContextLines;
          hasExcessAtStartOrEnd = true;
        }
      } else if (i === iLength) {
        const n2 = i - iStart;
        if (n2 > nContextLines) {
          jLength -= n2 - nContextLines;
          hasExcessAtStartOrEnd = true;
        }
      } else {
        const n2 = i - iStart;
        if (n2 > nContextLines2) {
          jLength -= n2 - nContextLines2;
          nExcessesBetweenChanges += 1;
        }
      }
    }
    while (i !== iLength && diffs[i][0] !== DIFF_EQUAL)
      i += 1;
  }
  const hasPatch = nExcessesBetweenChanges !== 0 || hasExcessAtStartOrEnd;
  if (nExcessesBetweenChanges !== 0)
    jLength += nExcessesBetweenChanges + 1;
  else if (hasExcessAtStartOrEnd)
    jLength += 1;
  const jLast = jLength - 1;
  const lines = [];
  let jPatchMark = 0;
  if (hasPatch)
    lines.push("");
  let aStart = 0;
  let bStart = 0;
  let aEnd = 0;
  let bEnd = 0;
  const pushCommonLine = (line) => {
    const j = lines.length;
    lines.push(printCommonLine(line, j === 0 || j === jLast, options));
    aEnd += 1;
    bEnd += 1;
  };
  const pushDeleteLine = (line) => {
    const j = lines.length;
    lines.push(printDeleteLine(line, j === 0 || j === jLast, options));
    aEnd += 1;
  };
  const pushInsertLine = (line) => {
    const j = lines.length;
    lines.push(printInsertLine(line, j === 0 || j === jLast, options));
    bEnd += 1;
  };
  i = 0;
  while (i !== iLength) {
    let iStart = i;
    while (i !== iLength && diffs[i][0] === DIFF_EQUAL)
      i += 1;
    if (iStart !== i) {
      if (iStart === 0) {
        if (i > nContextLines) {
          iStart = i - nContextLines;
          aStart = iStart;
          bStart = iStart;
          aEnd = aStart;
          bEnd = bStart;
        }
        for (let iCommon = iStart; iCommon !== i; iCommon += 1)
          pushCommonLine(diffs[iCommon][1]);
      } else if (i === iLength) {
        const iEnd = i - iStart > nContextLines ? iStart + nContextLines : i;
        for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1)
          pushCommonLine(diffs[iCommon][1]);
      } else {
        const nCommon = i - iStart;
        if (nCommon > nContextLines2) {
          const iEnd = iStart + nContextLines;
          for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1)
            pushCommonLine(diffs[iCommon][1]);
          lines[jPatchMark] = createPatchMark(
            aStart,
            aEnd,
            bStart,
            bEnd,
            options
          );
          jPatchMark = lines.length;
          lines.push("");
          const nOmit = nCommon - nContextLines2;
          aStart = aEnd + nOmit;
          bStart = bEnd + nOmit;
          aEnd = aStart;
          bEnd = bStart;
          for (let iCommon = i - nContextLines; iCommon !== i; iCommon += 1)
            pushCommonLine(diffs[iCommon][1]);
        } else {
          for (let iCommon = iStart; iCommon !== i; iCommon += 1)
            pushCommonLine(diffs[iCommon][1]);
        }
      }
    }
    while (i !== iLength && diffs[i][0] === DIFF_DELETE) {
      pushDeleteLine(diffs[i][1]);
      i += 1;
    }
    while (i !== iLength && diffs[i][0] === DIFF_INSERT) {
      pushInsertLine(diffs[i][1]);
      i += 1;
    }
  }
  if (hasPatch)
    lines[jPatchMark] = createPatchMark(aStart, aEnd, bStart, bEnd, options);
  return lines.join("\n");
}
function joinAlignedDiffsExpand(diffs, options) {
  return diffs.map((diff2, i, diffs2) => {
    const line = diff2[1];
    const isFirstOrLast = i === 0 || i === diffs2.length - 1;
    switch (diff2[0]) {
      case DIFF_DELETE:
        return printDeleteLine(line, isFirstOrLast, options);
      case DIFF_INSERT:
        return printInsertLine(line, isFirstOrLast, options);
      default:
        return printCommonLine(line, isFirstOrLast, options);
    }
  }).join("\n");
}
var noColor = (string2) => string2;
var DIFF_CONTEXT_DEFAULT = 5;
function getDefaultOptions() {
  const c2 = getColors();
  return {
    aAnnotation: "Expected",
    aColor: c2.green,
    aIndicator: "-",
    bAnnotation: "Received",
    bColor: c2.red,
    bIndicator: "+",
    changeColor: c2.inverse,
    changeLineTrailingSpaceColor: noColor,
    commonColor: c2.dim,
    commonIndicator: " ",
    commonLineTrailingSpaceColor: noColor,
    compareKeys: void 0,
    contextLines: DIFF_CONTEXT_DEFAULT,
    emptyFirstOrLastLinePlaceholder: "",
    expand: true,
    includeChangeCounts: false,
    omitAnnotationLines: false,
    patchColor: c2.yellow
  };
}
function getCompareKeys(compareKeys) {
  return compareKeys && typeof compareKeys === "function" ? compareKeys : void 0;
}
function getContextLines(contextLines) {
  return typeof contextLines === "number" && Number.isSafeInteger(contextLines) && contextLines >= 0 ? contextLines : DIFF_CONTEXT_DEFAULT;
}
function normalizeDiffOptions(options = {}) {
  return {
    ...getDefaultOptions(),
    ...options,
    compareKeys: getCompareKeys(options.compareKeys),
    contextLines: getContextLines(options.contextLines)
  };
}
function isEmptyString(lines) {
  return lines.length === 1 && lines[0].length === 0;
}
function countChanges(diffs) {
  let a2 = 0;
  let b2 = 0;
  diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE:
        a2 += 1;
        break;
      case DIFF_INSERT:
        b2 += 1;
        break;
    }
  });
  return { a: a2, b: b2 };
}
function printAnnotation({
  aAnnotation,
  aColor,
  aIndicator,
  bAnnotation,
  bColor,
  bIndicator,
  includeChangeCounts,
  omitAnnotationLines
}, changeCounts) {
  if (omitAnnotationLines)
    return "";
  let aRest = "";
  let bRest = "";
  if (includeChangeCounts) {
    const aCount = String(changeCounts.a);
    const bCount = String(changeCounts.b);
    const baAnnotationLengthDiff = bAnnotation.length - aAnnotation.length;
    const aAnnotationPadding = " ".repeat(Math.max(0, baAnnotationLengthDiff));
    const bAnnotationPadding = " ".repeat(Math.max(0, -baAnnotationLengthDiff));
    const baCountLengthDiff = bCount.length - aCount.length;
    const aCountPadding = " ".repeat(Math.max(0, baCountLengthDiff));
    const bCountPadding = " ".repeat(Math.max(0, -baCountLengthDiff));
    aRest = `${aAnnotationPadding}  ${aIndicator} ${aCountPadding}${aCount}`;
    bRest = `${bAnnotationPadding}  ${bIndicator} ${bCountPadding}${bCount}`;
  }
  const a2 = `${aIndicator} ${aAnnotation}${aRest}`;
  const b2 = `${bIndicator} ${bAnnotation}${bRest}`;
  return `${aColor(a2)}
${bColor(b2)}

`;
}
function printDiffLines(diffs, options) {
  return printAnnotation(options, countChanges(diffs)) + (options.expand ? joinAlignedDiffsExpand(diffs, options) : joinAlignedDiffsNoExpand(diffs, options));
}
function diffLinesUnified(aLines, bLines, options) {
  return printDiffLines(
    diffLinesRaw(
      isEmptyString(aLines) ? [] : aLines,
      isEmptyString(bLines) ? [] : bLines
    ),
    normalizeDiffOptions(options)
  );
}
function diffLinesUnified2(aLinesDisplay, bLinesDisplay, aLinesCompare, bLinesCompare, options) {
  if (isEmptyString(aLinesDisplay) && isEmptyString(aLinesCompare)) {
    aLinesDisplay = [];
    aLinesCompare = [];
  }
  if (isEmptyString(bLinesDisplay) && isEmptyString(bLinesCompare)) {
    bLinesDisplay = [];
    bLinesCompare = [];
  }
  if (aLinesDisplay.length !== aLinesCompare.length || bLinesDisplay.length !== bLinesCompare.length) {
    return diffLinesUnified(aLinesDisplay, bLinesDisplay, options);
  }
  const diffs = diffLinesRaw(aLinesCompare, bLinesCompare);
  let aIndex = 0;
  let bIndex = 0;
  diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE:
        diff2[1] = aLinesDisplay[aIndex];
        aIndex += 1;
        break;
      case DIFF_INSERT:
        diff2[1] = bLinesDisplay[bIndex];
        bIndex += 1;
        break;
      default:
        diff2[1] = bLinesDisplay[bIndex];
        aIndex += 1;
        bIndex += 1;
    }
  });
  return printDiffLines(diffs, normalizeDiffOptions(options));
}
function diffLinesRaw(aLines, bLines) {
  const aLength = aLines.length;
  const bLength = bLines.length;
  const isCommon = (aIndex2, bIndex2) => aLines[aIndex2] === bLines[bIndex2];
  const diffs = [];
  let aIndex = 0;
  let bIndex = 0;
  const foundSubsequence = (nCommon, aCommon, bCommon) => {
    for (; aIndex !== aCommon; aIndex += 1)
      diffs.push(new Diff(DIFF_DELETE, aLines[aIndex]));
    for (; bIndex !== bCommon; bIndex += 1)
      diffs.push(new Diff(DIFF_INSERT, bLines[bIndex]));
    for (; nCommon !== 0; nCommon -= 1, aIndex += 1, bIndex += 1)
      diffs.push(new Diff(DIFF_EQUAL, bLines[bIndex]));
  };
  const diffSequences = diff$1.default.default || diff$1.default;
  diffSequences(aLength, bLength, isCommon, foundSubsequence);
  for (; aIndex !== aLength; aIndex += 1)
    diffs.push(new Diff(DIFF_DELETE, aLines[aIndex]));
  for (; bIndex !== bLength; bIndex += 1)
    diffs.push(new Diff(DIFF_INSERT, bLines[bIndex]));
  return diffs;
}
function getCommonMessage(message, options) {
  const { commonColor } = normalizeDiffOptions(options);
  return commonColor(message);
}
var {
  AsymmetricMatcher: AsymmetricMatcher2,
  DOMCollection: DOMCollection2,
  DOMElement: DOMElement2,
  Immutable: Immutable2,
  ReactElement: ReactElement2,
  ReactTestComponent: ReactTestComponent2
} = import_pretty_format3.plugins;
var PLUGINS2 = [
  ReactTestComponent2,
  ReactElement2,
  DOMElement2,
  DOMCollection2,
  Immutable2,
  AsymmetricMatcher2
];
var FORMAT_OPTIONS = {
  plugins: PLUGINS2
};
var FALLBACK_FORMAT_OPTIONS = {
  callToJSON: false,
  maxDepth: 10,
  plugins: PLUGINS2
};
function diff(a2, b2, options) {
  if (Object.is(a2, b2))
    return "";
  const aType = getType2(a2);
  let expectedType = aType;
  let omitDifference = false;
  if (aType === "object" && typeof a2.asymmetricMatch === "function") {
    if (a2.$$typeof !== Symbol.for("jest.asymmetricMatcher")) {
      return null;
    }
    if (typeof a2.getExpectedType !== "function") {
      return null;
    }
    expectedType = a2.getExpectedType();
    omitDifference = expectedType === "string";
  }
  if (expectedType !== getType2(b2)) {
    const { aAnnotation, aColor, aIndicator, bAnnotation, bColor, bIndicator } = normalizeDiffOptions(options);
    const formatOptions = getFormatOptions(FALLBACK_FORMAT_OPTIONS, options);
    const aDisplay = (0, import_pretty_format3.format)(a2, formatOptions);
    const bDisplay = (0, import_pretty_format3.format)(b2, formatOptions);
    const aDiff = `${aColor(`${aIndicator} ${aAnnotation}:`)} 
${aDisplay}`;
    const bDiff = `${bColor(`${bIndicator} ${bAnnotation}:`)} 
${bDisplay}`;
    return `${aDiff}

${bDiff}`;
  }
  if (omitDifference)
    return null;
  switch (aType) {
    case "string":
      return diffLinesUnified(a2.split("\n"), b2.split("\n"), options);
    case "boolean":
    case "number":
      return comparePrimitive(a2, b2, options);
    case "map":
      return compareObjects(sortMap(a2), sortMap(b2), options);
    case "set":
      return compareObjects(sortSet(a2), sortSet(b2), options);
    default:
      return compareObjects(a2, b2, options);
  }
}
function comparePrimitive(a2, b2, options) {
  const aFormat = (0, import_pretty_format3.format)(a2, FORMAT_OPTIONS);
  const bFormat = (0, import_pretty_format3.format)(b2, FORMAT_OPTIONS);
  return aFormat === bFormat ? "" : diffLinesUnified(aFormat.split("\n"), bFormat.split("\n"), options);
}
function sortMap(map) {
  return new Map(Array.from(map.entries()).sort());
}
function sortSet(set2) {
  return new Set(Array.from(set2.values()).sort());
}
function compareObjects(a2, b2, options) {
  let difference;
  let hasThrown = false;
  try {
    const formatOptions = getFormatOptions(FORMAT_OPTIONS, options);
    difference = getObjectsDifference(a2, b2, formatOptions, options);
  } catch {
    hasThrown = true;
  }
  const noDiffMessage = getCommonMessage(NO_DIFF_MESSAGE, options);
  if (difference === void 0 || difference === noDiffMessage) {
    const formatOptions = getFormatOptions(FALLBACK_FORMAT_OPTIONS, options);
    difference = getObjectsDifference(a2, b2, formatOptions, options);
    if (difference !== noDiffMessage && !hasThrown) {
      difference = `${getCommonMessage(
        SIMILAR_MESSAGE,
        options
      )}

${difference}`;
    }
  }
  return difference;
}
function getFormatOptions(formatOptions, options) {
  const { compareKeys } = normalizeDiffOptions(options);
  return {
    ...formatOptions,
    compareKeys
  };
}
function getObjectsDifference(a2, b2, formatOptions, options) {
  const formatOptionsZeroIndent = { ...formatOptions, indent: 0 };
  const aCompare = (0, import_pretty_format3.format)(a2, formatOptionsZeroIndent);
  const bCompare = (0, import_pretty_format3.format)(b2, formatOptionsZeroIndent);
  if (aCompare === bCompare) {
    return getCommonMessage(NO_DIFF_MESSAGE, options);
  } else {
    const aDisplay = (0, import_pretty_format3.format)(a2, formatOptions);
    const bDisplay = (0, import_pretty_format3.format)(b2, formatOptions);
    return diffLinesUnified2(
      aDisplay.split("\n"),
      bDisplay.split("\n"),
      aCompare.split("\n"),
      bCompare.split("\n"),
      options
    );
  }
}

// node_modules/@vitest/utils/dist/error.js
var import_pretty_format4 = __toESM(require_build(), 1);
var import_diff_sequences = __toESM(require_build2(), 1);
var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
function isImmutable(v) {
  return v && (v[IS_COLLECTION_SYMBOL] || v[IS_RECORD_SYMBOL]);
}
var OBJECT_PROTO = Object.getPrototypeOf({});
function getUnserializableMessage(err) {
  if (err instanceof Error)
    return `<unserializable>: ${err.message}`;
  if (typeof err === "string")
    return `<unserializable>: ${err}`;
  return "<unserializable>";
}
function serializeError(val, seen = /* @__PURE__ */ new WeakMap()) {
  if (!val || typeof val === "string")
    return val;
  if (typeof val === "function")
    return `Function<${val.name || "anonymous"}>`;
  if (typeof val === "symbol")
    return val.toString();
  if (typeof val !== "object")
    return val;
  if (isImmutable(val))
    return serializeError(val.toJSON(), seen);
  if (val instanceof Promise || val.constructor && val.constructor.prototype === "AsyncFunction")
    return "Promise";
  if (typeof Element !== "undefined" && val instanceof Element)
    return val.tagName;
  if (typeof val.asymmetricMatch === "function")
    return `${val.toString()} ${format(val.sample)}`;
  if (seen.has(val))
    return seen.get(val);
  if (Array.isArray(val)) {
    const clone2 = new Array(val.length);
    seen.set(val, clone2);
    val.forEach((e, i) => {
      try {
        clone2[i] = serializeError(e, seen);
      } catch (err) {
        clone2[i] = getUnserializableMessage(err);
      }
    });
    return clone2;
  } else {
    const clone2 = /* @__PURE__ */ Object.create(null);
    seen.set(val, clone2);
    let obj = val;
    while (obj && obj !== OBJECT_PROTO) {
      Object.getOwnPropertyNames(obj).forEach((key) => {
        if (key in clone2)
          return;
        try {
          clone2[key] = serializeError(val[key], seen);
        } catch (err) {
          delete clone2[key];
          clone2[key] = getUnserializableMessage(err);
        }
      });
      obj = Object.getPrototypeOf(obj);
    }
    return clone2;
  }
}
function normalizeErrorMessage(message) {
  return message.replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "");
}
function processError(err, diffOptions) {
  if (!err || typeof err !== "object")
    return { message: err };
  if (err.stack)
    err.stackStr = String(err.stack);
  if (err.name)
    err.nameStr = String(err.name);
  if (err.showDiff || err.showDiff === void 0 && err.expected !== void 0 && err.actual !== void 0) {
    const clonedActual = deepClone(err.actual, { forceWritable: true });
    const clonedExpected = deepClone(err.expected, { forceWritable: true });
    const { replacedActual, replacedExpected } = replaceAsymmetricMatcher(clonedActual, clonedExpected);
    err.diff = diff(replacedExpected, replacedActual, { ...diffOptions, ...err.diffOptions });
  }
  if (typeof err.expected !== "string")
    err.expected = stringify(err.expected, 10);
  if (typeof err.actual !== "string")
    err.actual = stringify(err.actual, 10);
  try {
    if (typeof err.message === "string")
      err.message = normalizeErrorMessage(err.message);
    if (typeof err.cause === "object" && typeof err.cause.message === "string")
      err.cause.message = normalizeErrorMessage(err.cause.message);
  } catch {
  }
  try {
    return serializeError(err);
  } catch (e) {
    return serializeError(new Error(`Failed to fully serialize error: ${e == null ? void 0 : e.message}
Inner error message: ${err == null ? void 0 : err.message}`));
  }
}
function isAsymmetricMatcher(data) {
  const type = getType(data);
  return type === "Object" && typeof data.asymmetricMatch === "function";
}
function isReplaceable(obj1, obj2) {
  const obj1Type = getType(obj1);
  const obj2Type = getType(obj2);
  return obj1Type === obj2Type && (obj1Type === "Object" || obj1Type === "Array");
}
function replaceAsymmetricMatcher(actual, expected, actualReplaced = /* @__PURE__ */ new WeakSet(), expectedReplaced = /* @__PURE__ */ new WeakSet()) {
  if (!isReplaceable(actual, expected))
    return { replacedActual: actual, replacedExpected: expected };
  if (actualReplaced.has(actual) || expectedReplaced.has(expected))
    return { replacedActual: actual, replacedExpected: expected };
  actualReplaced.add(actual);
  expectedReplaced.add(expected);
  getOwnProperties(expected).forEach((key) => {
    const expectedValue = expected[key];
    const actualValue = actual[key];
    if (isAsymmetricMatcher(expectedValue)) {
      if (expectedValue.asymmetricMatch(actualValue))
        actual[key] = expectedValue;
    } else if (isAsymmetricMatcher(actualValue)) {
      if (actualValue.asymmetricMatch(expectedValue))
        expected[key] = actualValue;
    } else if (isReplaceable(actualValue, expectedValue)) {
      const replaced = replaceAsymmetricMatcher(
        actualValue,
        expectedValue,
        actualReplaced,
        expectedReplaced
      );
      actual[key] = replaced.replacedActual;
      expected[key] = replaced.replacedExpected;
    }
  });
  return {
    replacedActual: actual,
    replacedExpected: expected
  };
}

// node_modules/@vitest/runner/dist/chunk-tasks.js
function interpretTaskModes(suite, namePattern, onlyMode, parentIsOnly, allowOnly) {
  const suiteIsOnly = parentIsOnly || suite.mode === "only";
  suite.tasks.forEach((t2) => {
    const includeTask = suiteIsOnly || t2.mode === "only";
    if (onlyMode) {
      if (t2.type === "suite" && (includeTask || someTasksAreOnly(t2))) {
        if (t2.mode === "only") {
          checkAllowOnly(t2, allowOnly);
          t2.mode = "run";
        }
      } else if (t2.mode === "run" && !includeTask) {
        t2.mode = "skip";
      } else if (t2.mode === "only") {
        checkAllowOnly(t2, allowOnly);
        t2.mode = "run";
      }
    }
    if (t2.type === "test") {
      if (namePattern && !getTaskFullName(t2).match(namePattern))
        t2.mode = "skip";
    } else if (t2.type === "suite") {
      if (t2.mode === "skip")
        skipAllTasks(t2);
      else
        interpretTaskModes(t2, namePattern, onlyMode, includeTask, allowOnly);
    }
  });
  if (suite.mode === "run") {
    if (suite.tasks.length && suite.tasks.every((i) => i.mode !== "run"))
      suite.mode = "skip";
  }
}
function getTaskFullName(task) {
  return `${task.suite ? `${getTaskFullName(task.suite)} ` : ""}${task.name}`;
}
function someTasksAreOnly(suite) {
  return suite.tasks.some((t2) => t2.mode === "only" || t2.type === "suite" && someTasksAreOnly(t2));
}
function skipAllTasks(suite) {
  suite.tasks.forEach((t2) => {
    if (t2.mode === "run") {
      t2.mode = "skip";
      if (t2.type === "suite")
        skipAllTasks(t2);
    }
  });
}
function checkAllowOnly(task, allowOnly) {
  if (allowOnly)
    return;
  const error = processError(new Error("[Vitest] Unexpected .only modifier. Remove it or pass --allowOnly argument to bypass this error"));
  task.result = {
    state: "fail",
    errors: [error]
  };
}
function generateHash(str) {
  let hash = 0;
  if (str.length === 0)
    return `${hash}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `${hash}`;
}
function calculateSuiteHash(parent) {
  parent.tasks.forEach((t2, idx) => {
    t2.id = `${parent.id}_${idx}`;
    if (t2.type === "suite")
      calculateSuiteHash(t2);
  });
}
function isAtomTest(s2) {
  return s2.type === "test" || s2.type === "custom";
}
function getTests(suite) {
  const tests = [];
  const arraySuites = toArray(suite);
  for (const s2 of arraySuites) {
    if (isAtomTest(s2)) {
      tests.push(s2);
    } else {
      for (const task of s2.tasks) {
        if (isAtomTest(task))
          tests.push(task);
        else
          tests.push(...getTests(task));
      }
    }
  }
  return tests;
}
function getTasks(tasks = []) {
  return toArray(tasks).flatMap((s2) => isAtomTest(s2) ? [s2] : [s2, ...getTasks(s2.tasks)]);
}
function getSuites(suite) {
  return toArray(suite).flatMap((s2) => s2.type === "suite" ? [s2, ...getSuites(s2.tasks)] : []);
}
function hasFailed(suite) {
  return toArray(suite).some((s2) => {
    var _a2;
    return ((_a2 = s2.result) == null ? void 0 : _a2.state) === "fail" || s2.type === "suite" && hasFailed(s2.tasks);
  });
}
function getNames(task) {
  const names = [task.name];
  let current = task;
  while ((current == null ? void 0 : current.suite) || (current == null ? void 0 : current.file)) {
    current = current.suite || current.file;
    if (current == null ? void 0 : current.name)
      names.unshift(current.name);
  }
  return names;
}

// node_modules/vitest/dist/vendor/index.ir9i0ywP.js
var _a;
var isNode = typeof process < "u" && typeof process.stdout < "u" && !((_a = process.versions) == null ? void 0 : _a.deno) && !globalThis.window;
var isWindows2 = isNode && process.platform === "win32";
var relativePath = relative;
function removeUndefinedValues(obj) {
  for (const key in Object.keys(obj)) {
    if (obj[key] === void 0)
      delete obj[key];
  }
  return obj;
}

// node_modules/vitest/dist/vendor/index.8bPxjt7g.js
var DEFAULT_TIMEOUT = 6e4;
function defaultSerialize(i) {
  return i;
}
var defaultDeserialize = defaultSerialize;
var { clearTimeout: clearTimeout2, setTimeout: setTimeout2 } = globalThis;
var random2 = Math.random.bind(Math);
function createBirpc(functions, options) {
  const {
    post,
    on,
    eventNames = [],
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
    resolver,
    timeout = DEFAULT_TIMEOUT
  } = options;
  const rpcPromiseMap = /* @__PURE__ */ new Map();
  let _promise;
  const rpc = new Proxy({}, {
    get(_2, method) {
      if (method === "$functions")
        return functions;
      const sendEvent = (...args) => {
        post(serialize({ m: method, a: args, t: "q" }));
      };
      if (eventNames.includes(method)) {
        sendEvent.asEvent = sendEvent;
        return sendEvent;
      }
      const sendCall = async (...args) => {
        await _promise;
        return new Promise((resolve2, reject) => {
          const id = nanoid();
          let timeoutId;
          if (timeout >= 0) {
            timeoutId = setTimeout2(() => {
              try {
                options.onTimeoutError?.(method, args);
                throw new Error(`[birpc] timeout on calling "${method}"`);
              } catch (e) {
                reject(e);
              }
              rpcPromiseMap.delete(id);
            }, timeout).unref?.();
          }
          rpcPromiseMap.set(id, { resolve: resolve2, reject, timeoutId });
          post(serialize({ m: method, a: args, i: id, t: "q" }));
        });
      };
      sendCall.asEvent = sendEvent;
      return sendCall;
    }
  });
  _promise = on(async (data, ...extra) => {
    const msg = deserialize(data);
    if (msg.t === "q") {
      const { m: method, a: args } = msg;
      let result, error;
      const fn = resolver ? resolver(method, functions[method]) : functions[method];
      if (!fn) {
        error = new Error(`[birpc] function "${method}" not found`);
      } else {
        try {
          result = await fn.apply(rpc, args);
        } catch (e) {
          error = e;
        }
      }
      if (msg.i) {
        if (error && options.onError)
          options.onError(error, method, args);
        post(serialize({ t: "s", i: msg.i, r: result, e: error }), ...extra);
      }
    } else {
      const { i: ack, r: result, e: error } = msg;
      const promise = rpcPromiseMap.get(ack);
      if (promise) {
        clearTimeout2(promise.timeoutId);
        if (error)
          promise.reject(error);
        else
          promise.resolve(result);
      }
      rpcPromiseMap.delete(ack);
    }
  });
  return rpc;
}
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
function nanoid(size = 21) {
  let id = "";
  let i = size;
  while (i--)
    id += urlAlphabet[random2() * 64 | 0];
  return id;
}

// node_modules/vitest/dist/vendor/base.knFzp7G3.js
function groupBy(collection, iteratee) {
  return collection.reduce((acc, item) => {
    const key = iteratee(item);
    acc[key] || (acc[key] = []);
    acc[key].push(item);
    return acc;
  }, {});
}
function isPrimitive2(value) {
  return value === null || typeof value !== "function" && typeof value !== "object";
}
function slash2(str) {
  return str.replace(/\\/g, "/");
}
function noop2() {
}
function toArray2(array) {
  if (array === null || array === void 0)
    array = [];
  if (Array.isArray(array))
    return array;
  return [array];
}
function toString2(v) {
  return Object.prototype.toString.call(v);
}
function isPlainObject(val) {
  return toString2(val) === "[object Object]" && (!val.constructor || val.constructor.name === "Object");
}
function deepMerge(target, ...sources) {
  if (!sources.length)
    return target;
  const source = sources.shift();
  if (source === void 0)
    return target;
  if (isMergeableObject(target) && isMergeableObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isMergeableObject(source[key])) {
        if (!target[key])
          target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    });
  }
  return deepMerge(target, ...sources);
}
function isMergeableObject(item) {
  return isPlainObject(item) && !Array.isArray(item);
}
function stdout() {
  return console._stdout || process.stdout;
}
var AggregateErrorPonyfill = class extends Error {
  errors;
  constructor(errors, message = "") {
    super(message);
    this.errors = [...errors];
  }
};

// node_modules/@vitest/utils/dist/source-map.js
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
var resolve$2 = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
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
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
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
var isAbsolute = function(p2) {
  return _IS_ABSOLUTE_RE.test(p2);
};
var comma2 = ",".charCodeAt(0);
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt2 = new Uint8Array(128);
for (let i = 0; i < chars2.length; i++) {
  const c2 = chars2.charCodeAt(i);
  intToChar[i] = c2;
  charToInt2[c2] = i;
}
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
    const c2 = mappings.charCodeAt(pos++);
    integer = charToInt2[c2];
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
  return mappings.charCodeAt(i) !== comma2;
}
function sort(line) {
  line.sort(sortComparator$1);
}
function sortComparator$1(a2, b2) {
  return a2[0] - b2[0];
}
var schemeRegex = /^[\w+.-]+:\/\//;
var urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
var fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
var UrlType;
(function(UrlType2) {
  UrlType2[UrlType2["Empty"] = 1] = "Empty";
  UrlType2[UrlType2["Hash"] = 2] = "Hash";
  UrlType2[UrlType2["Query"] = 3] = "Query";
  UrlType2[UrlType2["RelativePath"] = 4] = "RelativePath";
  UrlType2[UrlType2["AbsolutePath"] = 5] = "AbsolutePath";
  UrlType2[UrlType2["SchemeRelative"] = 6] = "SchemeRelative";
  UrlType2[UrlType2["Absolute"] = 7] = "Absolute";
})(UrlType || (UrlType = {}));
function isAbsoluteUrl(input) {
  return schemeRegex.test(input);
}
function isSchemeRelativeUrl(input) {
  return input.startsWith("//");
}
function isAbsolutePath(input) {
  return input.startsWith("/");
}
function isFileUrl(input) {
  return input.startsWith("file:");
}
function isRelative(input) {
  return /^[.?#]/.test(input);
}
function parseAbsoluteUrl(input) {
  const match = urlRegex.exec(input);
  return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/", match[6] || "", match[7] || "");
}
function parseFileUrl(input) {
  const match = fileRegex.exec(input);
  const path = match[2];
  return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path) ? path : "/" + path, match[3] || "", match[4] || "");
}
function makeUrl(scheme, user, host, port, path, query, hash) {
  return {
    scheme,
    user,
    host,
    port,
    path,
    query,
    hash,
    type: UrlType.Absolute
  };
}
function parseUrl(input) {
  if (isSchemeRelativeUrl(input)) {
    const url2 = parseAbsoluteUrl("http:" + input);
    url2.scheme = "";
    url2.type = UrlType.SchemeRelative;
    return url2;
  }
  if (isAbsolutePath(input)) {
    const url2 = parseAbsoluteUrl("http://foo.com" + input);
    url2.scheme = "";
    url2.host = "";
    url2.type = UrlType.AbsolutePath;
    return url2;
  }
  if (isFileUrl(input))
    return parseFileUrl(input);
  if (isAbsoluteUrl(input))
    return parseAbsoluteUrl(input);
  const url = parseAbsoluteUrl("http://foo.com/" + input);
  url.scheme = "";
  url.host = "";
  url.type = input ? input.startsWith("?") ? UrlType.Query : input.startsWith("#") ? UrlType.Hash : UrlType.RelativePath : UrlType.Empty;
  return url;
}
function stripPathFilename(path) {
  if (path.endsWith("/.."))
    return path;
  const index = path.lastIndexOf("/");
  return path.slice(0, index + 1);
}
function mergePaths(url, base) {
  normalizePath(base, base.type);
  if (url.path === "/") {
    url.path = base.path;
  } else {
    url.path = stripPathFilename(base.path) + url.path;
  }
}
function normalizePath(url, type) {
  const rel = type <= UrlType.RelativePath;
  const pieces = url.path.split("/");
  let pointer = 1;
  let positive = 0;
  let addTrailingSlash = false;
  for (let i = 1; i < pieces.length; i++) {
    const piece = pieces[i];
    if (!piece) {
      addTrailingSlash = true;
      continue;
    }
    addTrailingSlash = false;
    if (piece === ".")
      continue;
    if (piece === "..") {
      if (positive) {
        addTrailingSlash = true;
        positive--;
        pointer--;
      } else if (rel) {
        pieces[pointer++] = piece;
      }
      continue;
    }
    pieces[pointer++] = piece;
    positive++;
  }
  let path = "";
  for (let i = 1; i < pointer; i++) {
    path += "/" + pieces[i];
  }
  if (!path || addTrailingSlash && !path.endsWith("/..")) {
    path += "/";
  }
  url.path = path;
}
function resolve$1(input, base) {
  if (!input && !base)
    return "";
  const url = parseUrl(input);
  let inputType = url.type;
  if (base && inputType !== UrlType.Absolute) {
    const baseUrl = parseUrl(base);
    const baseType = baseUrl.type;
    switch (inputType) {
      case UrlType.Empty:
        url.hash = baseUrl.hash;
      case UrlType.Hash:
        url.query = baseUrl.query;
      case UrlType.Query:
      case UrlType.RelativePath:
        mergePaths(url, baseUrl);
      case UrlType.AbsolutePath:
        url.user = baseUrl.user;
        url.host = baseUrl.host;
        url.port = baseUrl.port;
      case UrlType.SchemeRelative:
        url.scheme = baseUrl.scheme;
    }
    if (baseType > inputType)
      inputType = baseType;
  }
  normalizePath(url, inputType);
  const queryHash = url.query + url.hash;
  switch (inputType) {
    case UrlType.Hash:
    case UrlType.Query:
      return queryHash;
    case UrlType.RelativePath: {
      const path = url.path.slice(1);
      if (!path)
        return queryHash || ".";
      if (isRelative(base || input) && !isRelative(path)) {
        return "./" + path + queryHash;
      }
      return path + queryHash;
    }
    case UrlType.AbsolutePath:
      return url.path + queryHash;
    default:
      return url.scheme + "//" + url.user + url.host + url.port + url.path + queryHash;
  }
}
function resolve(input, base) {
  if (base && !base.endsWith("/"))
    base += "/";
  return resolve$1(input, base);
}
function stripFilename(path) {
  if (!path)
    return "";
  const index = path.lastIndexOf("/");
  return path.slice(0, index + 1);
}
var COLUMN = 0;
var SOURCES_INDEX = 1;
var SOURCE_LINE = 2;
var SOURCE_COLUMN = 3;
var NAMES_INDEX = 4;
var REV_GENERATED_LINE = 1;
var REV_GENERATED_COLUMN = 2;
function maybeSort(mappings, owned) {
  const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
  if (unsortedIndex === mappings.length)
    return mappings;
  if (!owned)
    mappings = mappings.slice();
  for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
    mappings[i] = sortSegments(mappings[i], owned);
  }
  return mappings;
}
function nextUnsortedSegmentLine(mappings, start) {
  for (let i = start; i < mappings.length; i++) {
    if (!isSorted(mappings[i]))
      return i;
  }
  return mappings.length;
}
function isSorted(line) {
  for (let j = 1; j < line.length; j++) {
    if (line[j][COLUMN] < line[j - 1][COLUMN]) {
      return false;
    }
  }
  return true;
}
function sortSegments(line, owned) {
  if (!owned)
    line = line.slice();
  return line.sort(sortComparator);
}
function sortComparator(a2, b2) {
  return a2[COLUMN] - b2[COLUMN];
}
var found = false;
function binarySearch(haystack, needle, low, high) {
  while (low <= high) {
    const mid = low + (high - low >> 1);
    const cmp = haystack[mid][COLUMN] - needle;
    if (cmp === 0) {
      found = true;
      return mid;
    }
    if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  found = false;
  return low - 1;
}
function upperBound(haystack, needle, index) {
  for (let i = index + 1; i < haystack.length; index = i++) {
    if (haystack[i][COLUMN] !== needle)
      break;
  }
  return index;
}
function lowerBound(haystack, needle, index) {
  for (let i = index - 1; i >= 0; index = i--) {
    if (haystack[i][COLUMN] !== needle)
      break;
  }
  return index;
}
function memoizedState() {
  return {
    lastKey: -1,
    lastNeedle: -1,
    lastIndex: -1
  };
}
function memoizedBinarySearch(haystack, needle, state, key) {
  const { lastKey, lastNeedle, lastIndex } = state;
  let low = 0;
  let high = haystack.length - 1;
  if (key === lastKey) {
    if (needle === lastNeedle) {
      found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
      return lastIndex;
    }
    if (needle >= lastNeedle) {
      low = lastIndex === -1 ? 0 : lastIndex;
    } else {
      high = lastIndex;
    }
  }
  state.lastKey = key;
  state.lastNeedle = needle;
  return state.lastIndex = binarySearch(haystack, needle, low, high);
}
function buildBySources(decoded, memos) {
  const sources = memos.map(buildNullArray);
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    for (let j = 0; j < line.length; j++) {
      const seg = line[j];
      if (seg.length === 1)
        continue;
      const sourceIndex = seg[SOURCES_INDEX];
      const sourceLine = seg[SOURCE_LINE];
      const sourceColumn = seg[SOURCE_COLUMN];
      const originalSource = sources[sourceIndex];
      const originalLine = originalSource[sourceLine] || (originalSource[sourceLine] = []);
      const memo = memos[sourceIndex];
      const index = upperBound(originalLine, sourceColumn, memoizedBinarySearch(originalLine, sourceColumn, memo, sourceLine));
      insert(originalLine, memo.lastIndex = index + 1, [sourceColumn, i, seg[COLUMN]]);
    }
  }
  return sources;
}
function insert(array, index, value) {
  for (let i = array.length; i > index; i--) {
    array[i] = array[i - 1];
  }
  array[index] = value;
}
function buildNullArray() {
  return { __proto__: null };
}
var LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
var COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
var LEAST_UPPER_BOUND = -1;
var GREATEST_LOWER_BOUND = 1;
var decodedMappings;
var originalPositionFor;
var generatedPositionFor;
var TraceMap = class {
  constructor(map, mapUrl) {
    const isString = typeof map === "string";
    if (!isString && map._decodedMemo)
      return map;
    const parsed = isString ? JSON.parse(map) : map;
    const { version: version2, file, names, sourceRoot, sources, sourcesContent } = parsed;
    this.version = version2;
    this.file = file;
    this.names = names || [];
    this.sourceRoot = sourceRoot;
    this.sources = sources;
    this.sourcesContent = sourcesContent;
    const from = resolve(sourceRoot || "", stripFilename(mapUrl));
    this.resolvedSources = sources.map((s2) => resolve(s2 || "", from));
    const { mappings } = parsed;
    if (typeof mappings === "string") {
      this._encoded = mappings;
      this._decoded = void 0;
    } else {
      this._encoded = void 0;
      this._decoded = maybeSort(mappings, isString);
    }
    this._decodedMemo = memoizedState();
    this._bySources = void 0;
    this._bySourceMemos = void 0;
  }
};
(() => {
  decodedMappings = (map) => {
    return map._decoded || (map._decoded = decode(map._encoded));
  };
  originalPositionFor = (map, { line, column, bias }) => {
    line--;
    if (line < 0)
      throw new Error(LINE_GTR_ZERO);
    if (column < 0)
      throw new Error(COL_GTR_EQ_ZERO);
    const decoded = decodedMappings(map);
    if (line >= decoded.length)
      return OMapping(null, null, null, null);
    const segments = decoded[line];
    const index = traceSegmentInternal(segments, map._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
    if (index === -1)
      return OMapping(null, null, null, null);
    const segment = segments[index];
    if (segment.length === 1)
      return OMapping(null, null, null, null);
    const { names, resolvedSources } = map;
    return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], segment.length === 5 ? names[segment[NAMES_INDEX]] : null);
  };
  generatedPositionFor = (map, { source, line, column, bias }) => {
    return generatedPosition(map, source, line, column, bias || GREATEST_LOWER_BOUND, false);
  };
  function generatedPosition(map, source, line, column, bias, all) {
    line--;
    if (line < 0)
      throw new Error(LINE_GTR_ZERO);
    if (column < 0)
      throw new Error(COL_GTR_EQ_ZERO);
    const { sources, resolvedSources } = map;
    let sourceIndex = sources.indexOf(source);
    if (sourceIndex === -1)
      sourceIndex = resolvedSources.indexOf(source);
    if (sourceIndex === -1)
      return all ? [] : GMapping(null, null);
    const generated = map._bySources || (map._bySources = buildBySources(decodedMappings(map), map._bySourceMemos = sources.map(memoizedState)));
    const segments = generated[sourceIndex][line];
    if (segments == null)
      return all ? [] : GMapping(null, null);
    const memo = map._bySourceMemos[sourceIndex];
    if (all)
      return sliceGeneratedPositions(segments, memo, line, column, bias);
    const index = traceSegmentInternal(segments, memo, line, column, bias);
    if (index === -1)
      return GMapping(null, null);
    const segment = segments[index];
    return GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]);
  }
})();
function OMapping(source, line, column, name) {
  return { source, line, column, name };
}
function GMapping(line, column) {
  return { line, column };
}
function traceSegmentInternal(segments, memo, line, column, bias) {
  let index = memoizedBinarySearch(segments, column, memo, line);
  if (found) {
    index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
  } else if (bias === LEAST_UPPER_BOUND)
    index++;
  if (index === -1 || index === segments.length)
    return -1;
  return index;
}
function sliceGeneratedPositions(segments, memo, line, column, bias) {
  let min = traceSegmentInternal(segments, memo, line, column, GREATEST_LOWER_BOUND);
  if (!found && bias === LEAST_UPPER_BOUND)
    min++;
  if (min === -1 || min === segments.length)
    return [];
  const matchedColumn = found ? column : segments[min][COLUMN];
  if (!found)
    min = lowerBound(segments, matchedColumn, min);
  const max = upperBound(segments, matchedColumn, min);
  const result = [];
  for (; min <= max; min++) {
    const segment = segments[min];
    result.push(GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]));
  }
  return result;
}
var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
var stackIgnorePatterns = [
  "node:internal",
  /\/packages\/\w+\/dist\//,
  /\/@vitest\/\w+\/dist\//,
  "/vitest/dist/",
  "/vitest/src/",
  "/vite-node/dist/",
  "/vite-node/src/",
  "/node_modules/chai/",
  "/node_modules/tinypool/",
  "/node_modules/tinyspy/",
  "/deps/chai.js",
  /__vitest_browser__/
];
function extractLocation(urlLike) {
  if (!urlLike.includes(":"))
    return [urlLike];
  const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
  const parts = regExp.exec(urlLike.replace(/^\(|\)$/g, ""));
  if (!parts)
    return [urlLike];
  let url = parts[1];
  if (url.startsWith("http:") || url.startsWith("https:")) {
    const urlObj = new URL(url);
    url = urlObj.pathname;
  }
  if (url.startsWith("/@fs/")) {
    url = url.slice(typeof process !== "undefined" && process.platform === "win32" ? 5 : 4);
  }
  return [url, parts[2] || void 0, parts[3] || void 0];
}
function parseSingleFFOrSafariStack(raw) {
  let line = raw.trim();
  if (SAFARI_NATIVE_CODE_REGEXP.test(line))
    return null;
  if (line.includes(" > eval"))
    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
  if (!line.includes("@") && !line.includes(":"))
    return null;
  const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
  const matches = line.match(functionNameRegex);
  const functionName = matches && matches[1] ? matches[1] : void 0;
  const [url, lineNumber, columnNumber] = extractLocation(line.replace(functionNameRegex, ""));
  if (!url || !lineNumber || !columnNumber)
    return null;
  return {
    file: url,
    method: functionName || "",
    line: Number.parseInt(lineNumber),
    column: Number.parseInt(columnNumber)
  };
}
function parseSingleV8Stack(raw) {
  let line = raw.trim();
  if (!CHROME_IE_STACK_REGEXP.test(line))
    return null;
  if (line.includes("(eval "))
    line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, "");
  let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
  const location = sanitizedLine.match(/ (\(.+\)$)/);
  sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
  const [url, lineNumber, columnNumber] = extractLocation(location ? location[1] : sanitizedLine);
  let method = location && sanitizedLine || "";
  let file = url && ["eval", "<anonymous>"].includes(url) ? void 0 : url;
  if (!file || !lineNumber || !columnNumber)
    return null;
  if (method.startsWith("async "))
    method = method.slice(6);
  if (file.startsWith("file://"))
    file = file.slice(7);
  file = resolve$2(file);
  if (method)
    method = method.replace(/__vite_ssr_import_\d+__\./g, "");
  return {
    method,
    file,
    line: Number.parseInt(lineNumber),
    column: Number.parseInt(columnNumber)
  };
}
function parseStacktrace(stack, options = {}) {
  const { ignoreStackEntries = stackIgnorePatterns } = options;
  let stacks = !CHROME_IE_STACK_REGEXP.test(stack) ? parseFFOrSafariStackTrace(stack) : parseV8Stacktrace(stack);
  if (ignoreStackEntries.length)
    stacks = stacks.filter((stack2) => !ignoreStackEntries.some((p2) => stack2.file.match(p2)));
  return stacks.map((stack2) => {
    var _a2;
    const map = (_a2 = options.getSourceMap) == null ? void 0 : _a2.call(options, stack2.file);
    if (!map || typeof map !== "object" || !map.version)
      return stack2;
    const traceMap = new TraceMap(map);
    const { line, column } = originalPositionFor(traceMap, stack2);
    if (line != null && column != null)
      return { ...stack2, line, column };
    return stack2;
  });
}
function parseFFOrSafariStackTrace(stack) {
  return stack.split("\n").map((line) => parseSingleFFOrSafariStack(line)).filter(notNullish);
}
function parseV8Stacktrace(stack) {
  return stack.split("\n").map((line) => parseSingleV8Stack(line)).filter(notNullish);
}
function parseErrorStacktrace(e, options = {}) {
  if (!e || isPrimitive(e))
    return [];
  if (e.stacks)
    return e.stacks;
  const stackStr = e.stack || e.stackStr || "";
  let stackFrames = parseStacktrace(stackStr, options);
  if (options.frameFilter)
    stackFrames = stackFrames.filter((f) => options.frameFilter(e, f) !== false);
  e.stacks = stackFrames;
  return stackFrames;
}

export {
  defaultPort,
  defaultBrowserPort,
  EXIT_CODE_RESTART,
  API_PATH,
  extraInlineDeps,
  CONFIG_NAMES,
  configFiles,
  workspacesFiles,
  commonjsGlobal,
  getDefaultExportFromCjs,
  d,
  T,
  inspect2 as inspect,
  notNullish,
  toArray,
  createDefer,
  getSafeTimers,
  shuffle,
  lineSplitRE,
  positionToOffset,
  highlight,
  interpretTaskModes,
  someTasksAreOnly,
  generateHash,
  calculateSuiteHash,
  getTests,
  getTasks,
  getSuites,
  hasFailed,
  getNames,
  isNode,
  isWindows2 as isWindows,
  relativePath,
  removeUndefinedValues,
  createBirpc,
  groupBy,
  isPrimitive2 as isPrimitive,
  slash2 as slash,
  noop2 as noop,
  toArray2,
  deepMerge,
  stdout,
  AggregateErrorPonyfill,
  generatedPositionFor,
  TraceMap,
  parseErrorStacktrace
};
/*! Bundled license information:

react-is/cjs/react-is.production.min.js:
  (**
   * @license React
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.development.js:
  (**
   * @license React
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
