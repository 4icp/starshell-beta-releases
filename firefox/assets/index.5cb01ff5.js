var re$5 = { exports: {} };
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$2 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || 9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
var constants = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$2,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH
};
const debug$3 = typeof process === "object" && process.env && {}.NODE_DEBUG && /\bsemver\b/i.test({}.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$3;
(function(module, exports) {
  const { MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2 } = constants;
  const debug2 = debug_1;
  exports = module.exports = {};
  const re2 = exports.re = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R = 0;
  const createToken = (name, value, isGlobal) => {
    const index = R++;
    debug2(name, index, value);
    t2[name] = index;
    src[index] = value;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
  createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$5, re$5.exports);
const opts = ["includePrerelease", "loose", "rtl"];
const parseOptions$4 = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((o, k) => {
  o[k] = true;
  return o;
}, {});
var parseOptions_1 = parseOptions$4;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug$2 = debug_1;
const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants;
const { re: re$4, t: t$4 } = re$5.exports;
const parseOptions$3 = parseOptions_1;
const { compareIdentifiers } = identifiers;
class SemVer$e {
  constructor(version, options) {
    options = parseOptions$3(options);
    if (version instanceof SemVer$e) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    if (version.length > MAX_LENGTH$1) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH$1} characters`
      );
    }
    debug$2("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version.trim().match(options.loose ? re$4[t$4.LOOSE] : re$4[t$4.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug$2("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer$e)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer$e(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer$e)) {
      other = new SemVer$e(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer$e)) {
      other = new SemVer$e(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug$2("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer$e)) {
      other = new SemVer$e(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug$2("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  inc(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.format();
    this.raw = this.version;
    return this;
  }
}
var semver$1 = SemVer$e;
const { MAX_LENGTH } = constants;
const { re: re$3, t: t$3 } = re$5.exports;
const SemVer$d = semver$1;
const parseOptions$2 = parseOptions_1;
const parse$5 = (version, options) => {
  options = parseOptions$2(options);
  if (version instanceof SemVer$d) {
    return version;
  }
  if (typeof version !== "string") {
    return null;
  }
  if (version.length > MAX_LENGTH) {
    return null;
  }
  const r = options.loose ? re$3[t$3.LOOSE] : re$3[t$3.FULL];
  if (!r.test(version)) {
    return null;
  }
  try {
    return new SemVer$d(version, options);
  } catch (er) {
    return null;
  }
};
var parse_1 = parse$5;
const parse$4 = parse_1;
const valid$1 = (version, options) => {
  const v = parse$4(version, options);
  return v ? v.version : null;
};
var valid_1 = valid$1;
const parse$3 = parse_1;
const clean = (version, options) => {
  const s = parse$3(version.trim().replace(/^[=v]+/, ""), options);
  return s ? s.version : null;
};
var clean_1 = clean;
const SemVer$c = semver$1;
const inc = (version, release, options, identifier) => {
  if (typeof options === "string") {
    identifier = options;
    options = void 0;
  }
  try {
    return new SemVer$c(
      version instanceof SemVer$c ? version.version : version,
      options
    ).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
};
var inc_1 = inc;
const SemVer$b = semver$1;
const compare$a = (a, b, loose) => new SemVer$b(a, loose).compare(new SemVer$b(b, loose));
var compare_1 = compare$a;
const compare$9 = compare_1;
const eq$2 = (a, b, loose) => compare$9(a, b, loose) === 0;
var eq_1 = eq$2;
const parse$2 = parse_1;
const eq$1 = eq_1;
const diff = (version1, version2) => {
  if (eq$1(version1, version2)) {
    return null;
  } else {
    const v1 = parse$2(version1);
    const v2 = parse$2(version2);
    const hasPre = v1.prerelease.length || v2.prerelease.length;
    const prefix = hasPre ? "pre" : "";
    const defaultResult = hasPre ? "prerelease" : "";
    for (const key in v1) {
      if (key === "major" || key === "minor" || key === "patch") {
        if (v1[key] !== v2[key]) {
          return prefix + key;
        }
      }
    }
    return defaultResult;
  }
};
var diff_1 = diff;
const SemVer$a = semver$1;
const major = (a, loose) => new SemVer$a(a, loose).major;
var major_1 = major;
const SemVer$9 = semver$1;
const minor = (a, loose) => new SemVer$9(a, loose).minor;
var minor_1 = minor;
const SemVer$8 = semver$1;
const patch = (a, loose) => new SemVer$8(a, loose).patch;
var patch_1 = patch;
const parse$1 = parse_1;
const prerelease = (version, options) => {
  const parsed = parse$1(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
var prerelease_1 = prerelease;
const compare$8 = compare_1;
const rcompare = (a, b, loose) => compare$8(b, a, loose);
var rcompare_1 = rcompare;
const compare$7 = compare_1;
const compareLoose = (a, b) => compare$7(a, b, true);
var compareLoose_1 = compareLoose;
const SemVer$7 = semver$1;
const compareBuild$2 = (a, b, loose) => {
  const versionA = new SemVer$7(a, loose);
  const versionB = new SemVer$7(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
var compareBuild_1 = compareBuild$2;
const compareBuild$1 = compareBuild_1;
const sort = (list, loose) => list.sort((a, b) => compareBuild$1(a, b, loose));
var sort_1 = sort;
const compareBuild = compareBuild_1;
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
var rsort_1 = rsort;
const compare$6 = compare_1;
const gt$3 = (a, b, loose) => compare$6(a, b, loose) > 0;
var gt_1 = gt$3;
const compare$5 = compare_1;
const lt$2 = (a, b, loose) => compare$5(a, b, loose) < 0;
var lt_1 = lt$2;
const compare$4 = compare_1;
const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;
var neq_1 = neq$1;
const compare$3 = compare_1;
const gte$2 = (a, b, loose) => compare$3(a, b, loose) >= 0;
var gte_1 = gte$2;
const compare$2 = compare_1;
const lte$2 = (a, b, loose) => compare$2(a, b, loose) <= 0;
var lte_1 = lte$2;
const eq = eq_1;
const neq = neq_1;
const gt$2 = gt_1;
const gte$1 = gte_1;
const lt$1 = lt_1;
const lte$1 = lte_1;
const cmp$1 = (a, op, b, loose) => {
  switch (op) {
    case "===":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a === b;
    case "!==":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a !== b;
    case "":
    case "=":
    case "==":
      return eq(a, b, loose);
    case "!=":
      return neq(a, b, loose);
    case ">":
      return gt$2(a, b, loose);
    case ">=":
      return gte$1(a, b, loose);
    case "<":
      return lt$1(a, b, loose);
    case "<=":
      return lte$1(a, b, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
var cmp_1 = cmp$1;
const SemVer$6 = semver$1;
const parse = parse_1;
const { re: re$2, t: t$2 } = re$5.exports;
const coerce = (version, options) => {
  if (version instanceof SemVer$6) {
    return version;
  }
  if (typeof version === "number") {
    version = String(version);
  }
  if (typeof version !== "string") {
    return null;
  }
  options = options || {};
  let match = null;
  if (!options.rtl) {
    match = version.match(re$2[t$2.COERCE]);
  } else {
    let next;
    while ((next = re$2[t$2.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }
      re$2[t$2.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
    }
    re$2[t$2.COERCERTL].lastIndex = -1;
  }
  if (match === null) {
    return null;
  }
  return parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
};
var coerce_1 = coerce;
var yallist = Yallist$1;
Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;
function Yallist$1(list) {
  var self = this;
  if (!(self instanceof Yallist$1)) {
    self = new Yallist$1();
  }
  self.tail = null;
  self.head = null;
  self.length = 0;
  if (list && typeof list.forEach === "function") {
    list.forEach(function(item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }
  return self;
}
Yallist$1.prototype.removeNode = function(node) {
  if (node.list !== this) {
    throw new Error("removing node which does not belong to this list");
  }
  var next = node.next;
  var prev = node.prev;
  if (next) {
    next.prev = prev;
  }
  if (prev) {
    prev.next = next;
  }
  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }
  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};
Yallist$1.prototype.unshiftNode = function(node) {
  if (node === this.head) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }
  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};
Yallist$1.prototype.pushNode = function(node) {
  if (node === this.tail) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }
  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};
Yallist$1.prototype.push = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.unshift = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.pop = function() {
  if (!this.tail) {
    return void 0;
  }
  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.shift = function() {
  if (!this.head) {
    return void 0;
  }
  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.forEach = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};
Yallist$1.prototype.forEachReverse = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};
Yallist$1.prototype.get = function(n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.getReverse = function(n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.map = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.head; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};
Yallist$1.prototype.mapReverse = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.tail; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};
Yallist$1.prototype.reduce = function(fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }
  return acc;
};
Yallist$1.prototype.reduceReverse = function(fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }
  return acc;
};
Yallist$1.prototype.toArray = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr;
};
Yallist$1.prototype.toArrayReverse = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr;
};
Yallist$1.prototype.slice = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.sliceReverse = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.splice = function(start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }
  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }
  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }
  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }
  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};
Yallist$1.prototype.reverse = function() {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};
function insert(self, node, value) {
  var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
  if (inserted.next === null) {
    self.tail = inserted;
  }
  if (inserted.prev === null) {
    self.head = inserted;
  }
  self.length++;
  return inserted;
}
function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}
function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}
function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }
  this.list = list;
  this.value = value;
  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }
  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}
try {
  require("./iterator.js")(Yallist$1);
} catch (er) {
}
const Yallist = yallist;
const MAX = Symbol("max");
const LENGTH = Symbol("length");
const LENGTH_CALCULATOR = Symbol("lengthCalculator");
const ALLOW_STALE = Symbol("allowStale");
const MAX_AGE = Symbol("maxAge");
const DISPOSE = Symbol("dispose");
const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const LRU_LIST = Symbol("lruList");
const CACHE = Symbol("cache");
const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const naiveLength = () => 1;
class LRUCache {
  constructor(options) {
    if (typeof options === "number")
      options = { max: options };
    if (!options)
      options = {};
    if (options.max && (typeof options.max !== "number" || options.max < 0))
      throw new TypeError("max must be a non-negative number");
    this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }
  set max(mL) {
    if (typeof mL !== "number" || mL < 0)
      throw new TypeError("max must be a non-negative number");
    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max() {
    return this[MAX];
  }
  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale() {
    return this[ALLOW_STALE];
  }
  set maxAge(mA) {
    if (typeof mA !== "number")
      throw new TypeError("maxAge must be a non-negative number");
    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge() {
    return this[MAX_AGE];
  }
  set lengthCalculator(lC) {
    if (typeof lC !== "function")
      lC = naiveLength;
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach((hit) => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }
  get length() {
    return this[LENGTH];
  }
  get itemCount() {
    return this[LRU_LIST].length;
  }
  rforEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null; ) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null; ) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }
  keys() {
    return this[LRU_LIST].toArray().map((k) => k.key);
  }
  values() {
    return this[LRU_LIST].toArray().map((k) => k.value);
  }
  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
    }
    this[CACHE] = /* @__PURE__ */ new Map();
    this[LRU_LIST] = new Yallist();
    this[LENGTH] = 0;
  }
  dump() {
    return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter((h) => h);
  }
  dumpLru() {
    return this[LRU_LIST];
  }
  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }
      const node = this[CACHE].get(key);
      const item = node.value;
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value);
      }
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }
    const hit = new Entry(key, value, len, now, maxAge);
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value);
      return false;
    }
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }
  has(key) {
    if (!this[CACHE].has(key))
      return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }
  get(key) {
    return get(this, key, true);
  }
  peek(key) {
    return get(this, key, false);
  }
  pop() {
    const node = this[LRU_LIST].tail;
    if (!node)
      return null;
    del(this, node);
    return node.value;
  }
  del(key) {
    del(this, this[CACHE].get(key));
  }
  load(arr) {
    this.reset();
    const now = Date.now();
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }
  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}
const get = (self, key, doUse) => {
  const node = self[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE])
        return void 0;
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value;
  }
};
const isStale = (self, hit) => {
  if (!hit || !hit.maxAge && !self[MAX_AGE])
    return false;
  const diff2 = Date.now() - hit.now;
  return hit.maxAge ? diff2 > hit.maxAge : self[MAX_AGE] && diff2 > self[MAX_AGE];
};
const trim = (self) => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null; ) {
      const prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};
const del = (self, node) => {
  if (node) {
    const hit = node.value;
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value);
    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};
class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}
const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self, hit)) {
    del(self, node);
    if (!self[ALLOW_STALE])
      hit = void 0;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self);
};
var lruCache = LRUCache;
class Range$a {
  constructor(range2, options) {
    options = parseOptions$1(options);
    if (range2 instanceof Range$a) {
      if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
        return range2;
      } else {
        return new Range$a(range2.raw, options);
      }
    }
    if (range2 instanceof Comparator$3) {
      this.raw = range2.value;
      this.set = [[range2]];
      this.format();
      return this;
    }
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    this.raw = range2;
    this.set = range2.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${range2}`);
    }
    if (this.set.length > 1) {
      const first = this.set[0];
      this.set = this.set.filter((c) => !isNullSet(c[0]));
      if (this.set.length === 0) {
        this.set = [first];
      } else if (this.set.length > 1) {
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c];
            break;
          }
        }
      }
    }
    this.format();
  }
  format() {
    this.range = this.set.map((comps) => {
      return comps.join(" ").trim();
    }).join("||").trim();
    return this.range;
  }
  toString() {
    return this.range;
  }
  parseRange(range2) {
    range2 = range2.trim();
    const memoOpts = Object.keys(this.options).join(",");
    const memoKey = `parseRange:${memoOpts}:${range2}`;
    const cached = cache.get(memoKey);
    if (cached) {
      return cached;
    }
    const loose = this.options.loose;
    const hr = loose ? re$1[t$1.HYPHENRANGELOOSE] : re$1[t$1.HYPHENRANGE];
    range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
    debug$1("hyphen replace", range2);
    range2 = range2.replace(re$1[t$1.COMPARATORTRIM], comparatorTrimReplace);
    debug$1("comparator trim", range2);
    range2 = range2.replace(re$1[t$1.TILDETRIM], tildeTrimReplace);
    range2 = range2.replace(re$1[t$1.CARETTRIM], caretTrimReplace);
    range2 = range2.split(/\s+/).join(" ");
    let rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
    if (loose) {
      rangeList = rangeList.filter((comp) => {
        debug$1("loose invalid filter", comp, this.options);
        return !!comp.match(re$1[t$1.COMPARATORLOOSE]);
      });
    }
    debug$1("range list", rangeList);
    const rangeMap = /* @__PURE__ */ new Map();
    const comparators = rangeList.map((comp) => new Comparator$3(comp, this.options));
    for (const comp of comparators) {
      if (isNullSet(comp)) {
        return [comp];
      }
      rangeMap.set(comp.value, comp);
    }
    if (rangeMap.size > 1 && rangeMap.has("")) {
      rangeMap.delete("");
    }
    const result = [...rangeMap.values()];
    cache.set(memoKey, result);
    return result;
  }
  intersects(range2, options) {
    if (!(range2 instanceof Range$a)) {
      throw new TypeError("a Range is required");
    }
    return this.set.some((thisComparators) => {
      return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
        return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
          return rangeComparators.every((rangeComparator) => {
            return thisComparator.intersects(rangeComparator, options);
          });
        });
      });
    });
  }
  test(version) {
    if (!version) {
      return false;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer$5(version, this.options);
      } catch (er) {
        return false;
      }
    }
    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true;
      }
    }
    return false;
  }
}
var range = Range$a;
const LRU = lruCache;
const cache = new LRU({ max: 1e3 });
const parseOptions$1 = parseOptions_1;
const Comparator$3 = comparator;
const debug$1 = debug_1;
const SemVer$5 = semver$1;
const {
  re: re$1,
  t: t$1,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace
} = re$5.exports;
const isNullSet = (c) => c.value === "<0.0.0-0";
const isAny = (c) => c.value === "";
const isSatisfiable = (comparators, options) => {
  let result = true;
  const remainingComparators = comparators.slice();
  let testComparator = remainingComparators.pop();
  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options);
    });
    testComparator = remainingComparators.pop();
  }
  return result;
};
const parseComparator = (comp, options) => {
  debug$1("comp", comp, options);
  comp = replaceCarets(comp, options);
  debug$1("caret", comp);
  comp = replaceTildes(comp, options);
  debug$1("tildes", comp);
  comp = replaceXRanges(comp, options);
  debug$1("xrange", comp);
  comp = replaceStars(comp, options);
  debug$1("stars", comp);
  return comp;
};
const isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
const replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((c) => {
  return replaceTilde(c, options);
}).join(" ");
const replaceTilde = (comp, options) => {
  const r = options.loose ? re$1[t$1.TILDELOOSE] : re$1[t$1.TILDE];
  return comp.replace(r, (_, M, m, p, pr) => {
    debug$1("tilde", comp, _, M, m, p, pr);
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
    } else if (pr) {
      debug$1("replaceTilde pr", pr);
      ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
    } else {
      ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
    }
    debug$1("tilde return", ret);
    return ret;
  });
};
const replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((c) => {
  return replaceCaret(c, options);
}).join(" ");
const replaceCaret = (comp, options) => {
  debug$1("caret", comp, options);
  const r = options.loose ? re$1[t$1.CARETLOOSE] : re$1[t$1.CARET];
  const z = options.includePrerelease ? "-0" : "";
  return comp.replace(r, (_, M, m, p, pr) => {
    debug$1("caret", comp, _, M, m, p, pr);
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      if (M === "0") {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
      }
    } else if (pr) {
      debug$1("replaceCaret pr", pr);
      if (M === "0") {
        if (m === "0") {
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
      }
    } else {
      debug$1("no pr");
      if (M === "0") {
        if (m === "0") {
          ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
        } else {
          ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
        }
      } else {
        ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
      }
    }
    debug$1("caret return", ret);
    return ret;
  });
};
const replaceXRanges = (comp, options) => {
  debug$1("replaceXRanges", comp, options);
  return comp.split(/\s+/).map((c) => {
    return replaceXRange(c, options);
  }).join(" ");
};
const replaceXRange = (comp, options) => {
  comp = comp.trim();
  const r = options.loose ? re$1[t$1.XRANGELOOSE] : re$1[t$1.XRANGE];
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug$1("xRange", comp, ret, gtlt, M, m, p, pr);
    const xM = isX(M);
    const xm = xM || isX(m);
    const xp = xm || isX(p);
    const anyX = xp;
    if (gtlt === "=" && anyX) {
      gtlt = "";
    }
    pr = options.includePrerelease ? "-0" : "";
    if (xM) {
      if (gtlt === ">" || gtlt === "<") {
        ret = "<0.0.0-0";
      } else {
        ret = "*";
      }
    } else if (gtlt && anyX) {
      if (xm) {
        m = 0;
      }
      p = 0;
      if (gtlt === ">") {
        gtlt = ">=";
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === "<=") {
        gtlt = "<";
        if (xm) {
          M = +M + 1;
        } else {
          m = +m + 1;
        }
      }
      if (gtlt === "<") {
        pr = "-0";
      }
      ret = `${gtlt + M}.${m}.${p}${pr}`;
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
    }
    debug$1("xRange return", ret);
    return ret;
  });
};
const replaceStars = (comp, options) => {
  debug$1("replaceStars", comp, options);
  return comp.trim().replace(re$1[t$1.STAR], "");
};
const replaceGTE0 = (comp, options) => {
  debug$1("replaceGTE0", comp, options);
  return comp.trim().replace(re$1[options.includePrerelease ? t$1.GTE0PRE : t$1.GTE0], "");
};
const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = "";
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
  } else if (fpr) {
    from = `>=${from}`;
  } else {
    from = `>=${from}${incPr ? "-0" : ""}`;
  }
  if (isX(tM)) {
    to = "";
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`;
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`;
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`;
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`;
  } else {
    to = `<=${to}`;
  }
  return `${from} ${to}`.trim();
};
const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false;
    }
  }
  if (version.prerelease.length && !options.includePrerelease) {
    for (let i = 0; i < set.length; i++) {
      debug$1(set[i].semver);
      if (set[i].semver === Comparator$3.ANY) {
        continue;
      }
      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver;
        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
          return true;
        }
      }
    }
    return false;
  }
  return true;
};
const ANY$2 = Symbol("SemVer ANY");
class Comparator$2 {
  static get ANY() {
    return ANY$2;
  }
  constructor(comp, options) {
    options = parseOptions(options);
    if (comp instanceof Comparator$2) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }
    debug("comparator", comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);
    if (this.semver === ANY$2) {
      this.value = "";
    } else {
      this.value = this.operator + this.semver.version;
    }
    debug("comp", this);
  }
  parse(comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    const m = comp.match(r);
    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`);
    }
    this.operator = m[1] !== void 0 ? m[1] : "";
    if (this.operator === "=") {
      this.operator = "";
    }
    if (!m[2]) {
      this.semver = ANY$2;
    } else {
      this.semver = new SemVer$4(m[2], this.options.loose);
    }
  }
  toString() {
    return this.value;
  }
  test(version) {
    debug("Comparator.test", version, this.options.loose);
    if (this.semver === ANY$2 || version === ANY$2) {
      return true;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer$4(version, this.options);
      } catch (er) {
        return false;
      }
    }
    return cmp(version, this.operator, this.semver, this.options);
  }
  intersects(comp, options) {
    if (!(comp instanceof Comparator$2)) {
      throw new TypeError("a Comparator is required");
    }
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (this.operator === "") {
      if (this.value === "") {
        return true;
      }
      return new Range$9(comp.value, options).test(this.value);
    } else if (comp.operator === "") {
      if (comp.value === "") {
        return true;
      }
      return new Range$9(this.value, options).test(comp.semver);
    }
    const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
    const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
    const sameSemVer = this.semver.version === comp.semver.version;
    const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
    const oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
    const oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  }
}
var comparator = Comparator$2;
const parseOptions = parseOptions_1;
const { re, t } = re$5.exports;
const cmp = cmp_1;
const debug = debug_1;
const SemVer$4 = semver$1;
const Range$9 = range;
const Range$8 = range;
const satisfies$3 = (version, range2, options) => {
  try {
    range2 = new Range$8(range2, options);
  } catch (er) {
    return false;
  }
  return range2.test(version);
};
var satisfies_1 = satisfies$3;
const Range$7 = range;
const toComparators = (range2, options) => new Range$7(range2, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
var toComparators_1 = toComparators;
const SemVer$3 = semver$1;
const Range$6 = range;
const maxSatisfying = (versions, range2, options) => {
  let max = null;
  let maxSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$6(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!max || maxSV.compare(v) === -1) {
        max = v;
        maxSV = new SemVer$3(max, options);
      }
    }
  });
  return max;
};
var maxSatisfying_1 = maxSatisfying;
const SemVer$2 = semver$1;
const Range$5 = range;
const minSatisfying = (versions, range2, options) => {
  let min = null;
  let minSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$5(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!min || minSV.compare(v) === 1) {
        min = v;
        minSV = new SemVer$2(min, options);
      }
    }
  });
  return min;
};
var minSatisfying_1 = minSatisfying;
const SemVer$1 = semver$1;
const Range$4 = range;
const gt$1 = gt_1;
const minVersion = (range2, loose) => {
  range2 = new Range$4(range2, loose);
  let minver = new SemVer$1("0.0.0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = new SemVer$1("0.0.0-0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = null;
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let setMin = null;
    comparators.forEach((comparator2) => {
      const compver = new SemVer$1(comparator2.semver.version);
      switch (comparator2.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
        case "":
        case ">=":
          if (!setMin || gt$1(compver, setMin)) {
            setMin = compver;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator2.operator}`);
      }
    });
    if (setMin && (!minver || gt$1(minver, setMin))) {
      minver = setMin;
    }
  }
  if (minver && range2.test(minver)) {
    return minver;
  }
  return null;
};
var minVersion_1 = minVersion;
const Range$3 = range;
const validRange = (range2, options) => {
  try {
    return new Range$3(range2, options).range || "*";
  } catch (er) {
    return null;
  }
};
var valid = validRange;
const SemVer = semver$1;
const Comparator$1 = comparator;
const { ANY: ANY$1 } = Comparator$1;
const Range$2 = range;
const satisfies$2 = satisfies_1;
const gt = gt_1;
const lt = lt_1;
const lte = lte_1;
const gte = gte_1;
const outside$2 = (version, range2, hilo, options) => {
  version = new SemVer(version, options);
  range2 = new Range$2(range2, options);
  let gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case ">":
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = ">";
      ecomp = ">=";
      break;
    case "<":
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = "<";
      ecomp = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies$2(version, range2, options)) {
    return false;
  }
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let high = null;
    let low = null;
    comparators.forEach((comparator2) => {
      if (comparator2.semver === ANY$1) {
        comparator2 = new Comparator$1(">=0.0.0");
      }
      high = high || comparator2;
      low = low || comparator2;
      if (gtfn(comparator2.semver, high.semver, options)) {
        high = comparator2;
      } else if (ltfn(comparator2.semver, low.semver, options)) {
        low = comparator2;
      }
    });
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }
    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
};
var outside_1 = outside$2;
const outside$1 = outside_1;
const gtr = (version, range2, options) => outside$1(version, range2, ">", options);
var gtr_1 = gtr;
const outside = outside_1;
const ltr = (version, range2, options) => outside(version, range2, "<", options);
var ltr_1 = ltr;
const Range$1 = range;
const intersects = (r1, r2, options) => {
  r1 = new Range$1(r1, options);
  r2 = new Range$1(r2, options);
  return r1.intersects(r2);
};
var intersects_1 = intersects;
const satisfies$1 = satisfies_1;
const compare$1 = compare_1;
var simplify = (versions, range2, options) => {
  const set = [];
  let first = null;
  let prev = null;
  const v = versions.sort((a, b) => compare$1(a, b, options));
  for (const version of v) {
    const included = satisfies$1(version, range2, options);
    if (included) {
      prev = version;
      if (!first) {
        first = version;
      }
    } else {
      if (prev) {
        set.push([first, prev]);
      }
      prev = null;
      first = null;
    }
  }
  if (first) {
    set.push([first, null]);
  }
  const ranges = [];
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min);
    } else if (!max && min === v[0]) {
      ranges.push("*");
    } else if (!max) {
      ranges.push(`>=${min}`);
    } else if (min === v[0]) {
      ranges.push(`<=${max}`);
    } else {
      ranges.push(`${min} - ${max}`);
    }
  }
  const simplified = ranges.join(" || ");
  const original = typeof range2.raw === "string" ? range2.raw : String(range2);
  return simplified.length < original.length ? simplified : range2;
};
const Range = range;
const Comparator = comparator;
const { ANY } = Comparator;
const satisfies = satisfies_1;
const compare = compare_1;
const subset = (sub, dom, options = {}) => {
  if (sub === dom) {
    return true;
  }
  sub = new Range(sub, options);
  dom = new Range(dom, options);
  let sawNonNull = false;
  OUTER:
    for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub) {
          continue OUTER;
        }
      }
      if (sawNonNull) {
        return false;
      }
    }
  return true;
};
const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true;
  }
  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true;
    } else if (options.includePrerelease) {
      sub = [new Comparator(">=0.0.0-0")];
    } else {
      sub = [new Comparator(">=0.0.0")];
    }
  }
  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true;
    } else {
      dom = [new Comparator(">=0.0.0")];
    }
  }
  const eqSet = /* @__PURE__ */ new Set();
  let gt2, lt2;
  for (const c of sub) {
    if (c.operator === ">" || c.operator === ">=") {
      gt2 = higherGT(gt2, c, options);
    } else if (c.operator === "<" || c.operator === "<=") {
      lt2 = lowerLT(lt2, c, options);
    } else {
      eqSet.add(c.semver);
    }
  }
  if (eqSet.size > 1) {
    return null;
  }
  let gtltComp;
  if (gt2 && lt2) {
    gtltComp = compare(gt2.semver, lt2.semver, options);
    if (gtltComp > 0) {
      return null;
    } else if (gtltComp === 0 && (gt2.operator !== ">=" || lt2.operator !== "<=")) {
      return null;
    }
  }
  for (const eq2 of eqSet) {
    if (gt2 && !satisfies(eq2, String(gt2), options)) {
      return null;
    }
    if (lt2 && !satisfies(eq2, String(lt2), options)) {
      return null;
    }
    for (const c of dom) {
      if (!satisfies(eq2, String(c), options)) {
        return false;
      }
    }
    return true;
  }
  let higher, lower;
  let hasDomLT, hasDomGT;
  let needDomLTPre = lt2 && !options.includePrerelease && lt2.semver.prerelease.length ? lt2.semver : false;
  let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt2.operator === "<" && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false;
  }
  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
    hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
    if (gt2) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false;
        }
      }
      if (c.operator === ">" || c.operator === ">=") {
        higher = higherGT(gt2, c, options);
        if (higher === c && higher !== gt2) {
          return false;
        }
      } else if (gt2.operator === ">=" && !satisfies(gt2.semver, String(c), options)) {
        return false;
      }
    }
    if (lt2) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false;
        }
      }
      if (c.operator === "<" || c.operator === "<=") {
        lower = lowerLT(lt2, c, options);
        if (lower === c && lower !== lt2) {
          return false;
        }
      } else if (lt2.operator === "<=" && !satisfies(lt2.semver, String(c), options)) {
        return false;
      }
    }
    if (!c.operator && (lt2 || gt2) && gtltComp !== 0) {
      return false;
    }
  }
  if (gt2 && hasDomLT && !lt2 && gtltComp !== 0) {
    return false;
  }
  if (lt2 && hasDomGT && !gt2 && gtltComp !== 0) {
    return false;
  }
  if (needDomGTPre || needDomLTPre) {
    return false;
  }
  return true;
};
const higherGT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare(a.semver, b.semver, options);
  return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
const lowerLT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare(a.semver, b.semver, options);
  return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
var subset_1 = subset;
const internalRe = re$5.exports;
var semver = {
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  SemVer: semver$1,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers,
  parse: parse_1,
  valid: valid_1,
  clean: clean_1,
  inc: inc_1,
  diff: diff_1,
  major: major_1,
  minor: minor_1,
  patch: patch_1,
  prerelease: prerelease_1,
  compare: compare_1,
  rcompare: rcompare_1,
  compareLoose: compareLoose_1,
  compareBuild: compareBuild_1,
  sort: sort_1,
  rsort: rsort_1,
  gt: gt_1,
  lt: lt_1,
  eq: eq_1,
  neq: neq_1,
  gte: gte_1,
  lte: lte_1,
  cmp: cmp_1,
  coerce: coerce_1,
  Comparator: comparator,
  Range: range,
  satisfies: satisfies_1,
  toComparators: toComparators_1,
  maxSatisfying: maxSatisfying_1,
  minSatisfying: minSatisfying_1,
  minVersion: minVersion_1,
  validRange: valid,
  outside: outside_1,
  gtr: gtr_1,
  ltr: ltr_1,
  intersects: intersects_1,
  simplifyRange: simplify,
  subset: subset_1
};
export { semver as s };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguNWNiMDFmZjUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9kZWJ1Zy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvcmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2ludGVybmFsL3BhcnNlLW9wdGlvbnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2ludGVybmFsL2lkZW50aWZpZXJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9jbGFzc2VzL3NlbXZlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3BhcnNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvdmFsaWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jbGVhbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2luYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvbXBhcmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9lcS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2RpZmYuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9tYWpvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL21pbm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcGF0Y2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9wcmVyZWxlYXNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcmNvbXBhcmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jb21wYXJlLWxvb3NlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvY29tcGFyZS1idWlsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3NvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9yc29ydC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2d0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9uZXEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9ndGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9sdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jbXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jb2VyY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMveWFsbGlzdC95YWxsaXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xydS1jYWNoZS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvY2xhc3Nlcy9yYW5nZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvY2xhc3Nlcy9jb21wYXJhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvc2F0aXNmaWVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvdG8tY29tcGFyYXRvcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9tYXgtc2F0aXNmeWluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL21pbi1zYXRpc2Z5aW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvbWluLXZlcnNpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy92YWxpZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL291dHNpZGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9ndHIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9sdHIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9pbnRlcnNlY3RzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvc2ltcGxpZnkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9zdWJzZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5vdGU6IHRoaXMgaXMgdGhlIHNlbXZlci5vcmcgdmVyc2lvbiBvZiB0aGUgc3BlYyB0aGF0IGl0IGltcGxlbWVudHNcbi8vIE5vdCBuZWNlc3NhcmlseSB0aGUgcGFja2FnZSB2ZXJzaW9uIG9mIHRoaXMgY29kZS5cbmNvbnN0IFNFTVZFUl9TUEVDX1ZFUlNJT04gPSAnMi4wLjAnXG5cbmNvbnN0IE1BWF9MRU5HVEggPSAyNTZcbmNvbnN0IE1BWF9TQUZFX0lOVEVHRVIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fFxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gOTAwNzE5OTI1NDc0MDk5MVxuXG4vLyBNYXggc2FmZSBzZWdtZW50IGxlbmd0aCBmb3IgY29lcmNpb24uXG5jb25zdCBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIID0gMTZcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNFTVZFUl9TUEVDX1ZFUlNJT04sXG4gIE1BWF9MRU5HVEgsXG4gIE1BWF9TQUZFX0lOVEVHRVIsXG4gIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEgsXG59XG4iLCJjb25zdCBkZWJ1ZyA9IChcbiAgdHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gIHByb2Nlc3MuZW52ICYmXG4gIHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiZcbiAgL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRylcbikgPyAoLi4uYXJncykgPT4gY29uc29sZS5lcnJvcignU0VNVkVSJywgLi4uYXJncylcbiAgOiAoKSA9PiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYnVnXG4iLCJjb25zdCB7IE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi9kZWJ1ZycpXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7fVxuXG4vLyBUaGUgYWN0dWFsIHJlZ2V4cHMgZ28gb24gZXhwb3J0cy5yZVxuY29uc3QgcmUgPSBleHBvcnRzLnJlID0gW11cbmNvbnN0IHNyYyA9IGV4cG9ydHMuc3JjID0gW11cbmNvbnN0IHQgPSBleHBvcnRzLnQgPSB7fVxubGV0IFIgPSAwXG5cbmNvbnN0IGNyZWF0ZVRva2VuID0gKG5hbWUsIHZhbHVlLCBpc0dsb2JhbCkgPT4ge1xuICBjb25zdCBpbmRleCA9IFIrK1xuICBkZWJ1ZyhuYW1lLCBpbmRleCwgdmFsdWUpXG4gIHRbbmFtZV0gPSBpbmRleFxuICBzcmNbaW5kZXhdID0gdmFsdWVcbiAgcmVbaW5kZXhdID0gbmV3IFJlZ0V4cCh2YWx1ZSwgaXNHbG9iYWwgPyAnZycgOiB1bmRlZmluZWQpXG59XG5cbi8vIFRoZSBmb2xsb3dpbmcgUmVndWxhciBFeHByZXNzaW9ucyBjYW4gYmUgdXNlZCBmb3IgdG9rZW5pemluZyxcbi8vIHZhbGlkYXRpbmcsIGFuZCBwYXJzaW5nIFNlbVZlciB2ZXJzaW9uIHN0cmluZ3MuXG5cbi8vICMjIE51bWVyaWMgSWRlbnRpZmllclxuLy8gQSBzaW5nbGUgYDBgLCBvciBhIG5vbi16ZXJvIGRpZ2l0IGZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBkaWdpdHMuXG5cbmNyZWF0ZVRva2VuKCdOVU1FUklDSURFTlRJRklFUicsICcwfFsxLTldXFxcXGQqJylcbmNyZWF0ZVRva2VuKCdOVU1FUklDSURFTlRJRklFUkxPT1NFJywgJ1swLTldKycpXG5cbi8vICMjIE5vbi1udW1lcmljIElkZW50aWZpZXJcbi8vIFplcm8gb3IgbW9yZSBkaWdpdHMsIGZvbGxvd2VkIGJ5IGEgbGV0dGVyIG9yIGh5cGhlbiwgYW5kIHRoZW4gemVybyBvclxuLy8gbW9yZSBsZXR0ZXJzLCBkaWdpdHMsIG9yIGh5cGhlbnMuXG5cbmNyZWF0ZVRva2VuKCdOT05OVU1FUklDSURFTlRJRklFUicsICdcXFxcZCpbYS16QS1aLV1bYS16QS1aMC05LV0qJylcblxuLy8gIyMgTWFpbiBWZXJzaW9uXG4vLyBUaHJlZSBkb3Qtc2VwYXJhdGVkIG51bWVyaWMgaWRlbnRpZmllcnMuXG5cbmNyZWF0ZVRva2VuKCdNQUlOVkVSU0lPTicsIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgYCgke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX0pXFxcXC5gICtcbiAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdfSlgKVxuXG5jcmVhdGVUb2tlbignTUFJTlZFUlNJT05MT09TRScsIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pXFxcXC5gICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pXFxcXC5gICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pYClcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvbiBJZGVudGlmaWVyXG4vLyBBIG51bWVyaWMgaWRlbnRpZmllciwgb3IgYSBub24tbnVtZXJpYyBpZGVudGlmaWVyLlxuXG5jcmVhdGVUb2tlbignUFJFUkVMRUFTRUlERU5USUZJRVInLCBgKD86JHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl1cbn18JHtzcmNbdC5OT05OVU1FUklDSURFTlRJRklFUl19KWApXG5cbmNyZWF0ZVRva2VuKCdQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFJywgYCg/OiR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV1cbn18JHtzcmNbdC5OT05OVU1FUklDSURFTlRJRklFUl19KWApXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb25cbi8vIEh5cGhlbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgZG90LXNlcGFyYXRlZCBwcmUtcmVsZWFzZSB2ZXJzaW9uXG4vLyBpZGVudGlmaWVycy5cblxuY3JlYXRlVG9rZW4oJ1BSRVJFTEVBU0UnLCBgKD86LSgke3NyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSXVxufSg/OlxcXFwuJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUl19KSopKWApXG5cbmNyZWF0ZVRva2VuKCdQUkVSRUxFQVNFTE9PU0UnLCBgKD86LT8oJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXVxufSg/OlxcXFwuJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXX0pKikpYClcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxuY3JlYXRlVG9rZW4oJ0JVSUxESURFTlRJRklFUicsICdbMC05QS1aYS16LV0rJylcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGFcbi8vIFBsdXMgc2lnbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgcGVyaW9kLXNlcGFyYXRlZCBidWlsZCBtZXRhZGF0YVxuLy8gaWRlbnRpZmllcnMuXG5cbmNyZWF0ZVRva2VuKCdCVUlMRCcsIGAoPzpcXFxcKygke3NyY1t0LkJVSUxESURFTlRJRklFUl1cbn0oPzpcXFxcLiR7c3JjW3QuQlVJTERJREVOVElGSUVSXX0pKikpYClcblxuLy8gIyMgRnVsbCBWZXJzaW9uIFN0cmluZ1xuLy8gQSBtYWluIHZlcnNpb24sIGZvbGxvd2VkIG9wdGlvbmFsbHkgYnkgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uIGFuZFxuLy8gYnVpbGQgbWV0YWRhdGEuXG5cbi8vIE5vdGUgdGhhdCB0aGUgb25seSBtYWpvciwgbWlub3IsIHBhdGNoLCBhbmQgcHJlLXJlbGVhc2Ugc2VjdGlvbnMgb2Zcbi8vIHRoZSB2ZXJzaW9uIHN0cmluZyBhcmUgY2FwdHVyaW5nIGdyb3Vwcy4gIFRoZSBidWlsZCBtZXRhZGF0YSBpcyBub3QgYVxuLy8gY2FwdHVyaW5nIGdyb3VwLCBiZWNhdXNlIGl0IHNob3VsZCBub3QgZXZlciBiZSB1c2VkIGluIHZlcnNpb25cbi8vIGNvbXBhcmlzb24uXG5cbmNyZWF0ZVRva2VuKCdGVUxMUExBSU4nLCBgdj8ke3NyY1t0Lk1BSU5WRVJTSU9OXVxufSR7c3JjW3QuUFJFUkVMRUFTRV19PyR7XG4gIHNyY1t0LkJVSUxEXX0/YClcblxuY3JlYXRlVG9rZW4oJ0ZVTEwnLCBgXiR7c3JjW3QuRlVMTFBMQUlOXX0kYClcblxuLy8gbGlrZSBmdWxsLCBidXQgYWxsb3dzIHYxLjIuMyBhbmQgPTEuMi4zLCB3aGljaCBwZW9wbGUgZG8gc29tZXRpbWVzLlxuLy8gYWxzbywgMS4wLjBhbHBoYTEgKHByZXJlbGVhc2Ugd2l0aG91dCB0aGUgaHlwaGVuKSB3aGljaCBpcyBwcmV0dHlcbi8vIGNvbW1vbiBpbiB0aGUgbnBtIHJlZ2lzdHJ5LlxuY3JlYXRlVG9rZW4oJ0xPT1NFUExBSU4nLCBgW3Y9XFxcXHNdKiR7c3JjW3QuTUFJTlZFUlNJT05MT09TRV1cbn0ke3NyY1t0LlBSRVJFTEVBU0VMT09TRV19PyR7XG4gIHNyY1t0LkJVSUxEXX0/YClcblxuY3JlYXRlVG9rZW4oJ0xPT1NFJywgYF4ke3NyY1t0LkxPT1NFUExBSU5dfSRgKVxuXG5jcmVhdGVUb2tlbignR1RMVCcsICcoKD86PHw+KT89PyknKVxuXG4vLyBTb21ldGhpbmcgbGlrZSBcIjIuKlwiIG9yIFwiMS4yLnhcIi5cbi8vIE5vdGUgdGhhdCBcIngueFwiIGlzIGEgdmFsaWQgeFJhbmdlIGlkZW50aWZlciwgbWVhbmluZyBcImFueSB2ZXJzaW9uXCJcbi8vIE9ubHkgdGhlIGZpcnN0IGl0ZW0gaXMgc3RyaWN0bHkgcmVxdWlyZWQuXG5jcmVhdGVUb2tlbignWFJBTkdFSURFTlRJRklFUkxPT1NFJywgYCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19fHh8WHxcXFxcKmApXG5jcmVhdGVUb2tlbignWFJBTkdFSURFTlRJRklFUicsIGAke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX18eHxYfFxcXFwqYClcblxuY3JlYXRlVG9rZW4oJ1hSQU5HRVBMQUlOJywgYFt2PVxcXFxzXSooJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGAoPzpcXFxcLigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJdfSlgICtcbiAgICAgICAgICAgICAgICAgICBgKD86JHtzcmNbdC5QUkVSRUxFQVNFXX0pPyR7XG4gICAgICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF19P2AgK1xuICAgICAgICAgICAgICAgICAgIGApPyk/YClcblxuY3JlYXRlVG9rZW4oJ1hSQU5HRVBMQUlOTE9PU0UnLCBgW3Y9XFxcXHNdKigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJMT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKD86XFxcXC4oJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSTE9PU0VdfSlgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoPzoke3NyY1t0LlBSRVJFTEVBU0VMT09TRV19KT8ke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF19P2AgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCk/KT9gKVxuXG5jcmVhdGVUb2tlbignWFJBTkdFJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKiR7c3JjW3QuWFJBTkdFUExBSU5dfSRgKVxuY3JlYXRlVG9rZW4oJ1hSQU5HRUxPT1NFJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKiR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19JGApXG5cbi8vIENvZXJjaW9uLlxuLy8gRXh0cmFjdCBhbnl0aGluZyB0aGF0IGNvdWxkIGNvbmNlaXZhYmx5IGJlIGEgcGFydCBvZiBhIHZhbGlkIHNlbXZlclxuY3JlYXRlVG9rZW4oJ0NPRVJDRScsIGAkeycoXnxbXlxcXFxkXSknICtcbiAgICAgICAgICAgICAgJyhcXFxcZHsxLCd9JHtNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIfX0pYCArXG4gICAgICAgICAgICAgIGAoPzpcXFxcLihcXFxcZHsxLCR7TUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSH19KSk/YCArXG4gICAgICAgICAgICAgIGAoPzpcXFxcLihcXFxcZHsxLCR7TUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSH19KSk/YCArXG4gICAgICAgICAgICAgIGAoPzokfFteXFxcXGRdKWApXG5jcmVhdGVUb2tlbignQ09FUkNFUlRMJywgc3JjW3QuQ09FUkNFXSwgdHJ1ZSlcblxuLy8gVGlsZGUgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcInJlYXNvbmFibHkgYXQgb3IgZ3JlYXRlciB0aGFuXCJcbmNyZWF0ZVRva2VuKCdMT05FVElMREUnLCAnKD86fj4/KScpXG5cbmNyZWF0ZVRva2VuKCdUSUxERVRSSU0nLCBgKFxcXFxzKikke3NyY1t0LkxPTkVUSUxERV19XFxcXHMrYCwgdHJ1ZSlcbmV4cG9ydHMudGlsZGVUcmltUmVwbGFjZSA9ICckMX4nXG5cbmNyZWF0ZVRva2VuKCdUSUxERScsIGBeJHtzcmNbdC5MT05FVElMREVdfSR7c3JjW3QuWFJBTkdFUExBSU5dfSRgKVxuY3JlYXRlVG9rZW4oJ1RJTERFTE9PU0UnLCBgXiR7c3JjW3QuTE9ORVRJTERFXX0ke3NyY1t0LlhSQU5HRVBMQUlOTE9PU0VdfSRgKVxuXG4vLyBDYXJldCByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwiYXQgbGVhc3QgYW5kIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGhcIlxuY3JlYXRlVG9rZW4oJ0xPTkVDQVJFVCcsICcoPzpcXFxcXiknKVxuXG5jcmVhdGVUb2tlbignQ0FSRVRUUklNJywgYChcXFxccyopJHtzcmNbdC5MT05FQ0FSRVRdfVxcXFxzK2AsIHRydWUpXG5leHBvcnRzLmNhcmV0VHJpbVJlcGxhY2UgPSAnJDFeJ1xuXG5jcmVhdGVUb2tlbignQ0FSRVQnLCBgXiR7c3JjW3QuTE9ORUNBUkVUXX0ke3NyY1t0LlhSQU5HRVBMQUlOXX0kYClcbmNyZWF0ZVRva2VuKCdDQVJFVExPT1NFJywgYF4ke3NyY1t0LkxPTkVDQVJFVF19JHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0kYClcblxuLy8gQSBzaW1wbGUgZ3QvbHQvZXEgdGhpbmcsIG9yIGp1c3QgXCJcIiB0byBpbmRpY2F0ZSBcImFueSB2ZXJzaW9uXCJcbmNyZWF0ZVRva2VuKCdDT01QQVJBVE9STE9PU0UnLCBgXiR7c3JjW3QuR1RMVF19XFxcXHMqKCR7c3JjW3QuTE9PU0VQTEFJTl19KSR8XiRgKVxuY3JlYXRlVG9rZW4oJ0NPTVBBUkFUT1InLCBgXiR7c3JjW3QuR1RMVF19XFxcXHMqKCR7c3JjW3QuRlVMTFBMQUlOXX0pJHxeJGApXG5cbi8vIEFuIGV4cHJlc3Npb24gdG8gc3RyaXAgYW55IHdoaXRlc3BhY2UgYmV0d2VlbiB0aGUgZ3RsdCBhbmQgdGhlIHRoaW5nXG4vLyBpdCBtb2RpZmllcywgc28gdGhhdCBgPiAxLjIuM2AgPT0+IGA+MS4yLjNgXG5jcmVhdGVUb2tlbignQ09NUEFSQVRPUlRSSU0nLCBgKFxcXFxzKikke3NyY1t0LkdUTFRdXG59XFxcXHMqKCR7c3JjW3QuTE9PU0VQTEFJTl19fCR7c3JjW3QuWFJBTkdFUExBSU5dfSlgLCB0cnVlKVxuZXhwb3J0cy5jb21wYXJhdG9yVHJpbVJlcGxhY2UgPSAnJDEkMiQzJ1xuXG4vLyBTb21ldGhpbmcgbGlrZSBgMS4yLjMgLSAxLjIuNGBcbi8vIE5vdGUgdGhhdCB0aGVzZSBhbGwgdXNlIHRoZSBsb29zZSBmb3JtLCBiZWNhdXNlIHRoZXknbGwgYmVcbi8vIGNoZWNrZWQgYWdhaW5zdCBlaXRoZXIgdGhlIHN0cmljdCBvciBsb29zZSBjb21wYXJhdG9yIGZvcm1cbi8vIGxhdGVyLlxuY3JlYXRlVG9rZW4oJ0hZUEhFTlJBTkdFJywgYF5cXFxccyooJHtzcmNbdC5YUkFOR0VQTEFJTl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGBcXFxccystXFxcXHMrYCArXG4gICAgICAgICAgICAgICAgICAgYCgke3NyY1t0LlhSQU5HRVBMQUlOXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYFxcXFxzKiRgKVxuXG5jcmVhdGVUb2tlbignSFlQSEVOUkFOR0VMT09TRScsIGBeXFxcXHMqKCR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYFxcXFxzKy1cXFxccytgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgXFxcXHMqJGApXG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbmNyZWF0ZVRva2VuKCdTVEFSJywgJyg8fD4pPz0/XFxcXHMqXFxcXConKVxuLy8gPj0wLjAuMCBpcyBsaWtlIGEgc3RhclxuY3JlYXRlVG9rZW4oJ0dURTAnLCAnXlxcXFxzKj49XFxcXHMqMFxcXFwuMFxcXFwuMFxcXFxzKiQnKVxuY3JlYXRlVG9rZW4oJ0dURTBQUkUnLCAnXlxcXFxzKj49XFxcXHMqMFxcXFwuMFxcXFwuMC0wXFxcXHMqJCcpXG4iLCIvLyBwYXJzZSBvdXQganVzdCB0aGUgb3B0aW9ucyB3ZSBjYXJlIGFib3V0IHNvIHdlIGFsd2F5cyBnZXQgYSBjb25zaXN0ZW50XG4vLyBvYmogd2l0aCBrZXlzIGluIGEgY29uc2lzdGVudCBvcmRlci5cbmNvbnN0IG9wdHMgPSBbJ2luY2x1ZGVQcmVyZWxlYXNlJywgJ2xvb3NlJywgJ3J0bCddXG5jb25zdCBwYXJzZU9wdGlvbnMgPSBvcHRpb25zID0+XG4gICFvcHRpb25zID8ge31cbiAgOiB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgPyB7IGxvb3NlOiB0cnVlIH1cbiAgOiBvcHRzLmZpbHRlcihrID0+IG9wdGlvbnNba10pLnJlZHVjZSgobywgaykgPT4ge1xuICAgIG9ba10gPSB0cnVlXG4gICAgcmV0dXJuIG9cbiAgfSwge30pXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlT3B0aW9uc1xuIiwiY29uc3QgbnVtZXJpYyA9IC9eWzAtOV0rJC9cbmNvbnN0IGNvbXBhcmVJZGVudGlmaWVycyA9IChhLCBiKSA9PiB7XG4gIGNvbnN0IGFudW0gPSBudW1lcmljLnRlc3QoYSlcbiAgY29uc3QgYm51bSA9IG51bWVyaWMudGVzdChiKVxuXG4gIGlmIChhbnVtICYmIGJudW0pIHtcbiAgICBhID0gK2FcbiAgICBiID0gK2JcbiAgfVxuXG4gIHJldHVybiBhID09PSBiID8gMFxuICAgIDogKGFudW0gJiYgIWJudW0pID8gLTFcbiAgICA6IChibnVtICYmICFhbnVtKSA/IDFcbiAgICA6IGEgPCBiID8gLTFcbiAgICA6IDFcbn1cblxuY29uc3QgcmNvbXBhcmVJZGVudGlmaWVycyA9IChhLCBiKSA9PiBjb21wYXJlSWRlbnRpZmllcnMoYiwgYSlcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbXBhcmVJZGVudGlmaWVycyxcbiAgcmNvbXBhcmVJZGVudGlmaWVycyxcbn1cbiIsImNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZGVidWcnKVxuY29uc3QgeyBNQVhfTEVOR1RILCBNQVhfU0FGRV9JTlRFR0VSIH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jb25zdGFudHMnKVxuY29uc3QgeyByZSwgdCB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuXG5jb25zdCBwYXJzZU9wdGlvbnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9wYXJzZS1vcHRpb25zJylcbmNvbnN0IHsgY29tcGFyZUlkZW50aWZpZXJzIH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pZGVudGlmaWVycycpXG5jbGFzcyBTZW1WZXIge1xuICBjb25zdHJ1Y3RvciAodmVyc2lvbiwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMob3B0aW9ucylcblxuICAgIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgICBpZiAodmVyc2lvbi5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlICYmXG4gICAgICAgICAgdmVyc2lvbi5pbmNsdWRlUHJlcmVsZWFzZSA9PT0gISFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSB7XG4gICAgICAgIHJldHVybiB2ZXJzaW9uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbi52ZXJzaW9uXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgVmVyc2lvbjogJHt2ZXJzaW9ufWApXG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYHZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJHtNQVhfTEVOR1RIfSBjaGFyYWN0ZXJzYFxuICAgICAgKVxuICAgIH1cblxuICAgIGRlYnVnKCdTZW1WZXInLCB2ZXJzaW9uLCBvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gICAgLy8gdGhpcyBpc24ndCBhY3R1YWxseSByZWxldmFudCBmb3IgdmVyc2lvbnMsIGJ1dCBrZWVwIGl0IHNvIHRoYXQgd2VcbiAgICAvLyBkb24ndCBydW4gaW50byB0cm91YmxlIHBhc3NpbmcgdGhpcy5vcHRpb25zIGFyb3VuZC5cbiAgICB0aGlzLmluY2x1ZGVQcmVyZWxlYXNlID0gISFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlXG5cbiAgICBjb25zdCBtID0gdmVyc2lvbi50cmltKCkubWF0Y2gob3B0aW9ucy5sb29zZSA/IHJlW3QuTE9PU0VdIDogcmVbdC5GVUxMXSlcblxuICAgIGlmICghbSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBWZXJzaW9uOiAke3ZlcnNpb259YClcbiAgICB9XG5cbiAgICB0aGlzLnJhdyA9IHZlcnNpb25cblxuICAgIC8vIHRoZXNlIGFyZSBhY3R1YWxseSBudW1iZXJzXG4gICAgdGhpcy5tYWpvciA9ICttWzFdXG4gICAgdGhpcy5taW5vciA9ICttWzJdXG4gICAgdGhpcy5wYXRjaCA9ICttWzNdXG5cbiAgICBpZiAodGhpcy5tYWpvciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5tYWpvciA8IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWFqb3IgdmVyc2lvbicpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWlub3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWlub3IgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuICAgIH1cblxuICAgIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwYXRjaCB2ZXJzaW9uJylcbiAgICB9XG5cbiAgICAvLyBudW1iZXJpZnkgYW55IHByZXJlbGVhc2UgbnVtZXJpYyBpZHNcbiAgICBpZiAoIW1bNF0pIHtcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IG1bNF0uc3BsaXQoJy4nKS5tYXAoKGlkKSA9PiB7XG4gICAgICAgIGlmICgvXlswLTldKyQvLnRlc3QoaWQpKSB7XG4gICAgICAgICAgY29uc3QgbnVtID0gK2lkXG4gICAgICAgICAgaWYgKG51bSA+PSAwICYmIG51bSA8IE1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgICAgICAgIHJldHVybiBudW1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlkXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuYnVpbGQgPSBtWzVdID8gbVs1XS5zcGxpdCgnLicpIDogW11cbiAgICB0aGlzLmZvcm1hdCgpXG4gIH1cblxuICBmb3JtYXQgKCkge1xuICAgIHRoaXMudmVyc2lvbiA9IGAke3RoaXMubWFqb3J9LiR7dGhpcy5taW5vcn0uJHt0aGlzLnBhdGNofWBcbiAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgdGhpcy52ZXJzaW9uICs9IGAtJHt0aGlzLnByZXJlbGVhc2Uuam9pbignLicpfWBcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvblxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLnZlcnNpb25cbiAgfVxuXG4gIGNvbXBhcmUgKG90aGVyKSB7XG4gICAgZGVidWcoJ1NlbVZlci5jb21wYXJlJywgdGhpcy52ZXJzaW9uLCB0aGlzLm9wdGlvbnMsIG90aGVyKVxuICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgICAgaWYgKHR5cGVvZiBvdGhlciA9PT0gJ3N0cmluZycgJiYgb3RoZXIgPT09IHRoaXMudmVyc2lvbikge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuICAgICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gICAgfVxuXG4gICAgaWYgKG90aGVyLnZlcnNpb24gPT09IHRoaXMudmVyc2lvbikge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb21wYXJlTWFpbihvdGhlcikgfHwgdGhpcy5jb21wYXJlUHJlKG90aGVyKVxuICB9XG5cbiAgY29tcGFyZU1haW4gKG90aGVyKSB7XG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWFqb3IsIG90aGVyLm1ham9yKSB8fFxuICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWlub3IsIG90aGVyLm1pbm9yKSB8fFxuICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMucGF0Y2gsIG90aGVyLnBhdGNoKVxuICAgIClcbiAgfVxuXG4gIGNvbXBhcmVQcmUgKG90aGVyKSB7XG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgICB9XG5cbiAgICAvLyBOT1QgaGF2aW5nIGEgcHJlcmVsZWFzZSBpcyA+IGhhdmluZyBvbmVcbiAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfSBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgbGV0IGkgPSAwXG4gICAgZG8ge1xuICAgICAgY29uc3QgYSA9IHRoaXMucHJlcmVsZWFzZVtpXVxuICAgICAgY29uc3QgYiA9IG90aGVyLnByZXJlbGVhc2VbaV1cbiAgICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKVxuICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0gZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAxXG4gICAgICB9IGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKVxuICAgICAgfVxuICAgIH0gd2hpbGUgKCsraSlcbiAgfVxuXG4gIGNvbXBhcmVCdWlsZCAob3RoZXIpIHtcbiAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICAgIH1cblxuICAgIGxldCBpID0gMFxuICAgIGRvIHtcbiAgICAgIGNvbnN0IGEgPSB0aGlzLmJ1aWxkW2ldXG4gICAgICBjb25zdCBiID0gb3RoZXIuYnVpbGRbaV1cbiAgICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKVxuICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0gZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAxXG4gICAgICB9IGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKVxuICAgICAgfVxuICAgIH0gd2hpbGUgKCsraSlcbiAgfVxuXG4gIC8vIHByZW1pbm9yIHdpbGwgYnVtcCB0aGUgdmVyc2lvbiB1cCB0byB0aGUgbmV4dCBtaW5vciByZWxlYXNlLCBhbmQgaW1tZWRpYXRlbHlcbiAgLy8gZG93biB0byBwcmUtcmVsZWFzZS4gcHJlbWFqb3IgYW5kIHByZXBhdGNoIHdvcmsgdGhlIHNhbWUgd2F5LlxuICBpbmMgKHJlbGVhc2UsIGlkZW50aWZpZXIpIHtcbiAgICBzd2l0Y2ggKHJlbGVhc2UpIHtcbiAgICAgIGNhc2UgJ3ByZW1ham9yJzpcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgICAgdGhpcy5taW5vciA9IDBcbiAgICAgICAgdGhpcy5tYWpvcisrXG4gICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncHJlbWlub3InOlxuICAgICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgICB0aGlzLm1pbm9yKytcbiAgICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdwcmVwYXRjaCc6XG4gICAgICAgIC8vIElmIHRoaXMgaXMgYWxyZWFkeSBhIHByZXJlbGVhc2UsIGl0IHdpbGwgYnVtcCB0byB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAgIC8vIGRyb3AgYW55IHByZXJlbGVhc2VzIHRoYXQgbWlnaHQgYWxyZWFkeSBleGlzdCwgc2luY2UgdGhleSBhcmUgbm90XG4gICAgICAgIC8vIHJlbGV2YW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpXG4gICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgICBicmVha1xuICAgICAgLy8gSWYgdGhlIGlucHV0IGlzIGEgbm9uLXByZXJlbGVhc2UgdmVyc2lvbiwgdGhpcyBhY3RzIHRoZSBzYW1lIGFzXG4gICAgICAvLyBwcmVwYXRjaC5cbiAgICAgIGNhc2UgJ3ByZXJlbGVhc2UnOlxuICAgICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ21ham9yJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1tYWpvciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1ham9yIHZlcnNpb24uXG4gICAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAgIC8vIDEuMC4wLTUgYnVtcHMgdG8gMS4wLjBcbiAgICAgICAgLy8gMS4xLjAgYnVtcHMgdG8gMi4wLjBcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMubWlub3IgIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnBhdGNoICE9PSAwIHx8XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1ham9yKytcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWlub3InOlxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtaW5vci5cbiAgICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgICBpZiAodGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5taW5vcisrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5wYXRjaCsrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgICAvLyAxLjAuMCAncHJlJyB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgICAgY2FzZSAncHJlJzpcbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgaSA9IHRoaXMucHJlcmVsZWFzZS5sZW5ndGhcbiAgICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmVyZWxlYXNlW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2VbaV0rK1xuICAgICAgICAgICAgICBpID0gLTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaCgwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgICAgLy8gMS4yLjAtYmV0YS5mb29ibHogb3IgMS4yLjAtYmV0YSBidW1wcyB0byAxLjIuMC1iZXRhLjBcbiAgICAgICAgICBpZiAoY29tcGFyZUlkZW50aWZpZXJzKHRoaXMucHJlcmVsZWFzZVswXSwgaWRlbnRpZmllcikgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChpc05hTih0aGlzLnByZXJlbGVhc2VbMV0pKSB7XG4gICAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogJHtyZWxlYXNlfWApXG4gICAgfVxuICAgIHRoaXMuZm9ybWF0KClcbiAgICB0aGlzLnJhdyA9IHRoaXMudmVyc2lvblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZW1WZXJcbiIsImNvbnN0IHsgTUFYX0xFTkdUSCB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY29uc3RhbnRzJylcbmNvbnN0IHsgcmUsIHQgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3JlJylcbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcblxuY29uc3QgcGFyc2VPcHRpb25zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGFyc2Utb3B0aW9ucycpXG5jb25zdCBwYXJzZSA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMob3B0aW9ucylcblxuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgciA9IG9wdGlvbnMubG9vc2UgPyByZVt0LkxPT1NFXSA6IHJlW3QuRlVMTF1cbiAgaWYgKCFyLnRlc3QodmVyc2lvbikpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuIiwiY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IHZhbGlkID0gKHZlcnNpb24sIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgdiA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiB2ID8gdi52ZXJzaW9uIDogbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZFxuIiwiY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IGNsZWFuID0gKHZlcnNpb24sIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgcyA9IHBhcnNlKHZlcnNpb24udHJpbSgpLnJlcGxhY2UoL15bPXZdKy8sICcnKSwgb3B0aW9ucylcbiAgcmV0dXJuIHMgPyBzLnZlcnNpb24gOiBudWxsXG59XG5tb2R1bGUuZXhwb3J0cyA9IGNsZWFuXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5cbmNvbnN0IGluYyA9ICh2ZXJzaW9uLCByZWxlYXNlLCBvcHRpb25zLCBpZGVudGlmaWVyKSA9PiB7XG4gIGlmICh0eXBlb2YgKG9wdGlvbnMpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXIgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZFxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcihcbiAgICAgIHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIgPyB2ZXJzaW9uLnZlcnNpb24gOiB2ZXJzaW9uLFxuICAgICAgb3B0aW9uc1xuICAgICkuaW5jKHJlbGVhc2UsIGlkZW50aWZpZXIpLnZlcnNpb25cbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluY1xuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgY29tcGFyZSA9IChhLCBiLCBsb29zZSkgPT5cbiAgbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShuZXcgU2VtVmVyKGIsIGxvb3NlKSlcblxubW9kdWxlLmV4cG9ydHMgPSBjb21wYXJlXG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGVxID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA9PT0gMFxubW9kdWxlLmV4cG9ydHMgPSBlcVxuIiwiY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IGVxID0gcmVxdWlyZSgnLi9lcScpXG5cbmNvbnN0IGRpZmYgPSAodmVyc2lvbjEsIHZlcnNpb24yKSA9PiB7XG4gIGlmIChlcSh2ZXJzaW9uMSwgdmVyc2lvbjIpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB2MSA9IHBhcnNlKHZlcnNpb24xKVxuICAgIGNvbnN0IHYyID0gcGFyc2UodmVyc2lvbjIpXG4gICAgY29uc3QgaGFzUHJlID0gdjEucHJlcmVsZWFzZS5sZW5ndGggfHwgdjIucHJlcmVsZWFzZS5sZW5ndGhcbiAgICBjb25zdCBwcmVmaXggPSBoYXNQcmUgPyAncHJlJyA6ICcnXG4gICAgY29uc3QgZGVmYXVsdFJlc3VsdCA9IGhhc1ByZSA/ICdwcmVyZWxlYXNlJyA6ICcnXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdjEpIHtcbiAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgIHJldHVybiBwcmVmaXggKyBrZXlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlc3VsdCAvLyBtYXkgYmUgdW5kZWZpbmVkXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZGlmZlxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgbWFqb3IgPSAoYSwgbG9vc2UpID0+IG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1ham9yXG5tb2R1bGUuZXhwb3J0cyA9IG1ham9yXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBtaW5vciA9IChhLCBsb29zZSkgPT4gbmV3IFNlbVZlcihhLCBsb29zZSkubWlub3Jcbm1vZHVsZS5leHBvcnRzID0gbWlub3JcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IHBhdGNoID0gKGEsIGxvb3NlKSA9PiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaFxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaFxuIiwiY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IHByZXJlbGVhc2UgPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZSh2ZXJzaW9uLCBvcHRpb25zKVxuICByZXR1cm4gKHBhcnNlZCAmJiBwYXJzZWQucHJlcmVsZWFzZS5sZW5ndGgpID8gcGFyc2VkLnByZXJlbGVhc2UgOiBudWxsXG59XG5tb2R1bGUuZXhwb3J0cyA9IHByZXJlbGVhc2VcbiIsImNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgcmNvbXBhcmUgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYiwgYSwgbG9vc2UpXG5tb2R1bGUuZXhwb3J0cyA9IHJjb21wYXJlXG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGNvbXBhcmVMb29zZSA9IChhLCBiKSA9PiBjb21wYXJlKGEsIGIsIHRydWUpXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVMb29zZVxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgY29tcGFyZUJ1aWxkID0gKGEsIGIsIGxvb3NlKSA9PiB7XG4gIGNvbnN0IHZlcnNpb25BID0gbmV3IFNlbVZlcihhLCBsb29zZSlcbiAgY29uc3QgdmVyc2lvbkIgPSBuZXcgU2VtVmVyKGIsIGxvb3NlKVxuICByZXR1cm4gdmVyc2lvbkEuY29tcGFyZSh2ZXJzaW9uQikgfHwgdmVyc2lvbkEuY29tcGFyZUJ1aWxkKHZlcnNpb25CKVxufVxubW9kdWxlLmV4cG9ydHMgPSBjb21wYXJlQnVpbGRcbiIsImNvbnN0IGNvbXBhcmVCdWlsZCA9IHJlcXVpcmUoJy4vY29tcGFyZS1idWlsZCcpXG5jb25zdCBzb3J0ID0gKGxpc3QsIGxvb3NlKSA9PiBsaXN0LnNvcnQoKGEsIGIpID0+IGNvbXBhcmVCdWlsZChhLCBiLCBsb29zZSkpXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRcbiIsImNvbnN0IGNvbXBhcmVCdWlsZCA9IHJlcXVpcmUoJy4vY29tcGFyZS1idWlsZCcpXG5jb25zdCByc29ydCA9IChsaXN0LCBsb29zZSkgPT4gbGlzdC5zb3J0KChhLCBiKSA9PiBjb21wYXJlQnVpbGQoYiwgYSwgbG9vc2UpKVxubW9kdWxlLmV4cG9ydHMgPSByc29ydFxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBndCA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShhLCBiLCBsb29zZSkgPiAwXG5tb2R1bGUuZXhwb3J0cyA9IGd0XG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGx0ID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8IDBcbm1vZHVsZS5leHBvcnRzID0gbHRcbiIsImNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgbmVxID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSAhPT0gMFxubW9kdWxlLmV4cG9ydHMgPSBuZXFcbiIsImNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgZ3RlID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA+PSAwXG5tb2R1bGUuZXhwb3J0cyA9IGd0ZVxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBsdGUgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpIDw9IDBcbm1vZHVsZS5leHBvcnRzID0gbHRlXG4iLCJjb25zdCBlcSA9IHJlcXVpcmUoJy4vZXEnKVxuY29uc3QgbmVxID0gcmVxdWlyZSgnLi9uZXEnKVxuY29uc3QgZ3QgPSByZXF1aXJlKCcuL2d0JylcbmNvbnN0IGd0ZSA9IHJlcXVpcmUoJy4vZ3RlJylcbmNvbnN0IGx0ID0gcmVxdWlyZSgnLi9sdCcpXG5jb25zdCBsdGUgPSByZXF1aXJlKCcuL2x0ZScpXG5cbmNvbnN0IGNtcCA9IChhLCBvcCwgYiwgbG9vc2UpID0+IHtcbiAgc3dpdGNoIChvcCkge1xuICAgIGNhc2UgJz09PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGEgPSBhLnZlcnNpb25cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYiA9IGIudmVyc2lvblxuICAgICAgfVxuICAgICAgcmV0dXJuIGEgPT09IGJcblxuICAgIGNhc2UgJyE9PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGEgPSBhLnZlcnNpb25cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYiA9IGIudmVyc2lvblxuICAgICAgfVxuICAgICAgcmV0dXJuIGEgIT09IGJcblxuICAgIGNhc2UgJyc6XG4gICAgY2FzZSAnPSc6XG4gICAgY2FzZSAnPT0nOlxuICAgICAgcmV0dXJuIGVxKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnIT0nOlxuICAgICAgcmV0dXJuIG5lcShhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJz4nOlxuICAgICAgcmV0dXJuIGd0KGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPj0nOlxuICAgICAgcmV0dXJuIGd0ZShhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJzwnOlxuICAgICAgcmV0dXJuIGx0KGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPD0nOlxuICAgICAgcmV0dXJuIGx0ZShhLCBiLCBsb29zZSlcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIG9wZXJhdG9yOiAke29wfWApXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gY21wXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgeyByZSwgdCB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuXG5jb25zdCBjb2VyY2UgPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdudW1iZXInKSB7XG4gICAgdmVyc2lvbiA9IFN0cmluZyh2ZXJzaW9uKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGxldCBtYXRjaCA9IG51bGxcbiAgaWYgKCFvcHRpb25zLnJ0bCkge1xuICAgIG1hdGNoID0gdmVyc2lvbi5tYXRjaChyZVt0LkNPRVJDRV0pXG4gIH0gZWxzZSB7XG4gICAgLy8gRmluZCB0aGUgcmlnaHQtbW9zdCBjb2VyY2libGUgc3RyaW5nIHRoYXQgZG9lcyBub3Qgc2hhcmVcbiAgICAvLyBhIHRlcm1pbnVzIHdpdGggYSBtb3JlIGxlZnQtd2FyZCBjb2VyY2libGUgc3RyaW5nLlxuICAgIC8vIEVnLCAnMS4yLjMuNCcgd2FudHMgdG8gY29lcmNlICcyLjMuNCcsIG5vdCAnMy40JyBvciAnNCdcbiAgICAvL1xuICAgIC8vIFdhbGsgdGhyb3VnaCB0aGUgc3RyaW5nIGNoZWNraW5nIHdpdGggYSAvZyByZWdleHBcbiAgICAvLyBNYW51YWxseSBzZXQgdGhlIGluZGV4IHNvIGFzIHRvIHBpY2sgdXAgb3ZlcmxhcHBpbmcgbWF0Y2hlcy5cbiAgICAvLyBTdG9wIHdoZW4gd2UgZ2V0IGEgbWF0Y2ggdGhhdCBlbmRzIGF0IHRoZSBzdHJpbmcgZW5kLCBzaW5jZSBub1xuICAgIC8vIGNvZXJjaWJsZSBzdHJpbmcgY2FuIGJlIG1vcmUgcmlnaHQtd2FyZCB3aXRob3V0IHRoZSBzYW1lIHRlcm1pbnVzLlxuICAgIGxldCBuZXh0XG4gICAgd2hpbGUgKChuZXh0ID0gcmVbdC5DT0VSQ0VSVExdLmV4ZWModmVyc2lvbikpICYmXG4gICAgICAgICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggIT09IHZlcnNpb24ubGVuZ3RoKVxuICAgICkge1xuICAgICAgaWYgKCFtYXRjaCB8fFxuICAgICAgICAgICAgbmV4dC5pbmRleCArIG5leHRbMF0ubGVuZ3RoICE9PSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCkge1xuICAgICAgICBtYXRjaCA9IG5leHRcbiAgICAgIH1cbiAgICAgIHJlW3QuQ09FUkNFUlRMXS5sYXN0SW5kZXggPSBuZXh0LmluZGV4ICsgbmV4dFsxXS5sZW5ndGggKyBuZXh0WzJdLmxlbmd0aFxuICAgIH1cbiAgICAvLyBsZWF2ZSBpdCBpbiBhIGNsZWFuIHN0YXRlXG4gICAgcmVbdC5DT0VSQ0VSVExdLmxhc3RJbmRleCA9IC0xXG4gIH1cblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIHBhcnNlKGAke21hdGNoWzJdfS4ke21hdGNoWzNdIHx8ICcwJ30uJHttYXRjaFs0XSB8fCAnMCd9YCwgb3B0aW9ucylcbn1cbm1vZHVsZS5leHBvcnRzID0gY29lcmNlXG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gWWFsbGlzdFxuXG5ZYWxsaXN0Lk5vZGUgPSBOb2RlXG5ZYWxsaXN0LmNyZWF0ZSA9IFlhbGxpc3RcblxuZnVuY3Rpb24gWWFsbGlzdCAobGlzdCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKCEoc2VsZiBpbnN0YW5jZW9mIFlhbGxpc3QpKSB7XG4gICAgc2VsZiA9IG5ldyBZYWxsaXN0KClcbiAgfVxuXG4gIHNlbGYudGFpbCA9IG51bGxcbiAgc2VsZi5oZWFkID0gbnVsbFxuICBzZWxmLmxlbmd0aCA9IDBcblxuICBpZiAobGlzdCAmJiB0eXBlb2YgbGlzdC5mb3JFYWNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBzZWxmLnB1c2goaXRlbSlcbiAgICB9KVxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBzZWxmLnB1c2goYXJndW1lbnRzW2ldKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzZWxmXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnJlbW92ZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAobm9kZS5saXN0ICE9PSB0aGlzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmluZyBub2RlIHdoaWNoIGRvZXMgbm90IGJlbG9uZyB0byB0aGlzIGxpc3QnKVxuICB9XG5cbiAgdmFyIG5leHQgPSBub2RlLm5leHRcbiAgdmFyIHByZXYgPSBub2RlLnByZXZcblxuICBpZiAobmV4dCkge1xuICAgIG5leHQucHJldiA9IHByZXZcbiAgfVxuXG4gIGlmIChwcmV2KSB7XG4gICAgcHJldi5uZXh0ID0gbmV4dFxuICB9XG5cbiAgaWYgKG5vZGUgPT09IHRoaXMuaGVhZCkge1xuICAgIHRoaXMuaGVhZCA9IG5leHRcbiAgfVxuICBpZiAobm9kZSA9PT0gdGhpcy50YWlsKSB7XG4gICAgdGhpcy50YWlsID0gcHJldlxuICB9XG5cbiAgbm9kZS5saXN0Lmxlbmd0aC0tXG4gIG5vZGUubmV4dCA9IG51bGxcbiAgbm9kZS5wcmV2ID0gbnVsbFxuICBub2RlLmxpc3QgPSBudWxsXG5cbiAgcmV0dXJuIG5leHRcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudW5zaGlmdE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAobm9kZSA9PT0gdGhpcy5oZWFkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAobm9kZS5saXN0KSB7XG4gICAgbm9kZS5saXN0LnJlbW92ZU5vZGUobm9kZSlcbiAgfVxuXG4gIHZhciBoZWFkID0gdGhpcy5oZWFkXG4gIG5vZGUubGlzdCA9IHRoaXNcbiAgbm9kZS5uZXh0ID0gaGVhZFxuICBpZiAoaGVhZCkge1xuICAgIGhlYWQucHJldiA9IG5vZGVcbiAgfVxuXG4gIHRoaXMuaGVhZCA9IG5vZGVcbiAgaWYgKCF0aGlzLnRhaWwpIHtcbiAgICB0aGlzLnRhaWwgPSBub2RlXG4gIH1cbiAgdGhpcy5sZW5ndGgrK1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5wdXNoTm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIGlmIChub2RlID09PSB0aGlzLnRhaWwpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChub2RlLmxpc3QpIHtcbiAgICBub2RlLmxpc3QucmVtb3ZlTm9kZShub2RlKVxuICB9XG5cbiAgdmFyIHRhaWwgPSB0aGlzLnRhaWxcbiAgbm9kZS5saXN0ID0gdGhpc1xuICBub2RlLnByZXYgPSB0YWlsXG4gIGlmICh0YWlsKSB7XG4gICAgdGFpbC5uZXh0ID0gbm9kZVxuICB9XG5cbiAgdGhpcy50YWlsID0gbm9kZVxuICBpZiAoIXRoaXMuaGVhZCkge1xuICAgIHRoaXMuaGVhZCA9IG5vZGVcbiAgfVxuICB0aGlzLmxlbmd0aCsrXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHB1c2godGhpcywgYXJndW1lbnRzW2ldKVxuICB9XG4gIHJldHVybiB0aGlzLmxlbmd0aFxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB1bnNoaWZ0KHRoaXMsIGFyZ3VtZW50c1tpXSlcbiAgfVxuICByZXR1cm4gdGhpcy5sZW5ndGhcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMudGFpbCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIHZhciByZXMgPSB0aGlzLnRhaWwudmFsdWVcbiAgdGhpcy50YWlsID0gdGhpcy50YWlsLnByZXZcbiAgaWYgKHRoaXMudGFpbCkge1xuICAgIHRoaXMudGFpbC5uZXh0ID0gbnVsbFxuICB9IGVsc2Uge1xuICAgIHRoaXMuaGVhZCA9IG51bGxcbiAgfVxuICB0aGlzLmxlbmd0aC0tXG4gIHJldHVybiByZXNcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5oZWFkKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgdmFyIHJlcyA9IHRoaXMuaGVhZC52YWx1ZVxuICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV4dFxuICBpZiAodGhpcy5oZWFkKSB7XG4gICAgdGhpcy5oZWFkLnByZXYgPSBudWxsXG4gIH0gZWxzZSB7XG4gICAgdGhpcy50YWlsID0gbnVsbFxuICB9XG4gIHRoaXMubGVuZ3RoLS1cbiAgcmV0dXJuIHJlc1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZuLCB0aGlzcCkge1xuICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgZm9yICh2YXIgd2Fsa2VyID0gdGhpcy5oZWFkLCBpID0gMDsgd2Fsa2VyICE9PSBudWxsOyBpKyspIHtcbiAgICBmbi5jYWxsKHRoaXNwLCB3YWxrZXIudmFsdWUsIGksIHRoaXMpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5mb3JFYWNoUmV2ZXJzZSA9IGZ1bmN0aW9uIChmbiwgdGhpc3ApIHtcbiAgdGhpc3AgPSB0aGlzcCB8fCB0aGlzXG4gIGZvciAodmFyIHdhbGtlciA9IHRoaXMudGFpbCwgaSA9IHRoaXMubGVuZ3RoIC0gMTsgd2Fsa2VyICE9PSBudWxsOyBpLS0pIHtcbiAgICBmbi5jYWxsKHRoaXNwLCB3YWxrZXIudmFsdWUsIGksIHRoaXMpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobikge1xuICBmb3IgKHZhciBpID0gMCwgd2Fsa2VyID0gdGhpcy5oZWFkOyB3YWxrZXIgIT09IG51bGwgJiYgaSA8IG47IGkrKykge1xuICAgIC8vIGFib3J0IG91dCBvZiB0aGUgbGlzdCBlYXJseSBpZiB3ZSBoaXQgYSBjeWNsZVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgaWYgKGkgPT09IG4gJiYgd2Fsa2VyICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHdhbGtlci52YWx1ZVxuICB9XG59XG5cbllhbGxpc3QucHJvdG90eXBlLmdldFJldmVyc2UgPSBmdW5jdGlvbiAobikge1xuICBmb3IgKHZhciBpID0gMCwgd2Fsa2VyID0gdGhpcy50YWlsOyB3YWxrZXIgIT09IG51bGwgJiYgaSA8IG47IGkrKykge1xuICAgIC8vIGFib3J0IG91dCBvZiB0aGUgbGlzdCBlYXJseSBpZiB3ZSBoaXQgYSBjeWNsZVxuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cbiAgaWYgKGkgPT09IG4gJiYgd2Fsa2VyICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHdhbGtlci52YWx1ZVxuICB9XG59XG5cbllhbGxpc3QucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbiwgdGhpc3ApIHtcbiAgdGhpc3AgPSB0aGlzcCB8fCB0aGlzXG4gIHZhciByZXMgPSBuZXcgWWFsbGlzdCgpXG4gIGZvciAodmFyIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsOykge1xuICAgIHJlcy5wdXNoKGZuLmNhbGwodGhpc3AsIHdhbGtlci52YWx1ZSwgdGhpcykpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbllhbGxpc3QucHJvdG90eXBlLm1hcFJldmVyc2UgPSBmdW5jdGlvbiAoZm4sIHRoaXNwKSB7XG4gIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICB2YXIgcmVzID0gbmV3IFlhbGxpc3QoKVxuICBmb3IgKHZhciB3YWxrZXIgPSB0aGlzLnRhaWw7IHdhbGtlciAhPT0gbnVsbDspIHtcbiAgICByZXMucHVzaChmbi5jYWxsKHRoaXNwLCB3YWxrZXIudmFsdWUsIHRoaXMpKVxuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoZm4sIGluaXRpYWwpIHtcbiAgdmFyIGFjY1xuICB2YXIgd2Fsa2VyID0gdGhpcy5oZWFkXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGFjYyA9IGluaXRpYWxcbiAgfSBlbHNlIGlmICh0aGlzLmhlYWQpIHtcbiAgICB3YWxrZXIgPSB0aGlzLmhlYWQubmV4dFxuICAgIGFjYyA9IHRoaXMuaGVhZC52YWx1ZVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlZHVjZSBvZiBlbXB0eSBsaXN0IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgd2Fsa2VyICE9PSBudWxsOyBpKyspIHtcbiAgICBhY2MgPSBmbihhY2MsIHdhbGtlci52YWx1ZSwgaSlcbiAgICB3YWxrZXIgPSB3YWxrZXIubmV4dFxuICB9XG5cbiAgcmV0dXJuIGFjY1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5yZWR1Y2VSZXZlcnNlID0gZnVuY3Rpb24gKGZuLCBpbml0aWFsKSB7XG4gIHZhciBhY2NcbiAgdmFyIHdhbGtlciA9IHRoaXMudGFpbFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBhY2MgPSBpbml0aWFsXG4gIH0gZWxzZSBpZiAodGhpcy50YWlsKSB7XG4gICAgd2Fsa2VyID0gdGhpcy50YWlsLnByZXZcbiAgICBhY2MgPSB0aGlzLnRhaWwudmFsdWVcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgbGlzdCB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IHRoaXMubGVuZ3RoIC0gMTsgd2Fsa2VyICE9PSBudWxsOyBpLS0pIHtcbiAgICBhY2MgPSBmbihhY2MsIHdhbGtlci52YWx1ZSwgaSlcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG5cbiAgcmV0dXJuIGFjY1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJyID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMCwgd2Fsa2VyID0gdGhpcy5oZWFkOyB3YWxrZXIgIT09IG51bGw7IGkrKykge1xuICAgIGFycltpXSA9IHdhbGtlci52YWx1ZVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS50b0FycmF5UmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyciA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMudGFpbDsgd2Fsa2VyICE9PSBudWxsOyBpKyspIHtcbiAgICBhcnJbaV0gPSB3YWxrZXIudmFsdWVcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgdG8gPSB0byB8fCB0aGlzLmxlbmd0aFxuICBpZiAodG8gPCAwKSB7XG4gICAgdG8gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICBmcm9tID0gZnJvbSB8fCAwXG4gIGlmIChmcm9tIDwgMCkge1xuICAgIGZyb20gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICB2YXIgcmV0ID0gbmV3IFlhbGxpc3QoKVxuICBpZiAodG8gPCBmcm9tIHx8IHRvIDwgMCkge1xuICAgIHJldHVybiByZXRcbiAgfVxuICBpZiAoZnJvbSA8IDApIHtcbiAgICBmcm9tID0gMFxuICB9XG4gIGlmICh0byA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdG8gPSB0aGlzLmxlbmd0aFxuICB9XG4gIGZvciAodmFyIGkgPSAwLCB3YWxrZXIgPSB0aGlzLmhlYWQ7IHdhbGtlciAhPT0gbnVsbCAmJiBpIDwgZnJvbTsgaSsrKSB7XG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxuICBmb3IgKDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCB0bzsgaSsrLCB3YWxrZXIgPSB3YWxrZXIubmV4dCkge1xuICAgIHJldC5wdXNoKHdhbGtlci52YWx1ZSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNsaWNlUmV2ZXJzZSA9IGZ1bmN0aW9uIChmcm9tLCB0bykge1xuICB0byA9IHRvIHx8IHRoaXMubGVuZ3RoXG4gIGlmICh0byA8IDApIHtcbiAgICB0byArPSB0aGlzLmxlbmd0aFxuICB9XG4gIGZyb20gPSBmcm9tIHx8IDBcbiAgaWYgKGZyb20gPCAwKSB7XG4gICAgZnJvbSArPSB0aGlzLmxlbmd0aFxuICB9XG4gIHZhciByZXQgPSBuZXcgWWFsbGlzdCgpXG4gIGlmICh0byA8IGZyb20gfHwgdG8gPCAwKSB7XG4gICAgcmV0dXJuIHJldFxuICB9XG4gIGlmIChmcm9tIDwgMCkge1xuICAgIGZyb20gPSAwXG4gIH1cbiAgaWYgKHRvID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0byA9IHRoaXMubGVuZ3RoXG4gIH1cbiAgZm9yICh2YXIgaSA9IHRoaXMubGVuZ3RoLCB3YWxrZXIgPSB0aGlzLnRhaWw7IHdhbGtlciAhPT0gbnVsbCAmJiBpID4gdG87IGktLSkge1xuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cbiAgZm9yICg7IHdhbGtlciAhPT0gbnVsbCAmJiBpID4gZnJvbTsgaS0tLCB3YWxrZXIgPSB3YWxrZXIucHJldikge1xuICAgIHJldC5wdXNoKHdhbGtlci52YWx1ZSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNwbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZGVsZXRlQ291bnQsIC4uLm5vZGVzKSB7XG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgc3RhcnQgPSB0aGlzLmxlbmd0aCAtIDFcbiAgfVxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSB0aGlzLmxlbmd0aCArIHN0YXJ0O1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCBzdGFydDsgaSsrKSB7XG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxuXG4gIHZhciByZXQgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgd2Fsa2VyICYmIGkgPCBkZWxldGVDb3VudDsgaSsrKSB7XG4gICAgcmV0LnB1c2god2Fsa2VyLnZhbHVlKVxuICAgIHdhbGtlciA9IHRoaXMucmVtb3ZlTm9kZSh3YWxrZXIpXG4gIH1cbiAgaWYgKHdhbGtlciA9PT0gbnVsbCkge1xuICAgIHdhbGtlciA9IHRoaXMudGFpbFxuICB9XG5cbiAgaWYgKHdhbGtlciAhPT0gdGhpcy5oZWFkICYmIHdhbGtlciAhPT0gdGhpcy50YWlsKSB7XG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICB3YWxrZXIgPSBpbnNlcnQodGhpcywgd2Fsa2VyLCBub2Rlc1tpXSlcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCA9IHRoaXMuaGVhZFxuICB2YXIgdGFpbCA9IHRoaXMudGFpbFxuICBmb3IgKHZhciB3YWxrZXIgPSBoZWFkOyB3YWxrZXIgIT09IG51bGw7IHdhbGtlciA9IHdhbGtlci5wcmV2KSB7XG4gICAgdmFyIHAgPSB3YWxrZXIucHJldlxuICAgIHdhbGtlci5wcmV2ID0gd2Fsa2VyLm5leHRcbiAgICB3YWxrZXIubmV4dCA9IHBcbiAgfVxuICB0aGlzLmhlYWQgPSB0YWlsXG4gIHRoaXMudGFpbCA9IGhlYWRcbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gaW5zZXJ0IChzZWxmLCBub2RlLCB2YWx1ZSkge1xuICB2YXIgaW5zZXJ0ZWQgPSBub2RlID09PSBzZWxmLmhlYWQgP1xuICAgIG5ldyBOb2RlKHZhbHVlLCBudWxsLCBub2RlLCBzZWxmKSA6XG4gICAgbmV3IE5vZGUodmFsdWUsIG5vZGUsIG5vZGUubmV4dCwgc2VsZilcblxuICBpZiAoaW5zZXJ0ZWQubmV4dCA9PT0gbnVsbCkge1xuICAgIHNlbGYudGFpbCA9IGluc2VydGVkXG4gIH1cbiAgaWYgKGluc2VydGVkLnByZXYgPT09IG51bGwpIHtcbiAgICBzZWxmLmhlYWQgPSBpbnNlcnRlZFxuICB9XG5cbiAgc2VsZi5sZW5ndGgrK1xuXG4gIHJldHVybiBpbnNlcnRlZFxufVxuXG5mdW5jdGlvbiBwdXNoIChzZWxmLCBpdGVtKSB7XG4gIHNlbGYudGFpbCA9IG5ldyBOb2RlKGl0ZW0sIHNlbGYudGFpbCwgbnVsbCwgc2VsZilcbiAgaWYgKCFzZWxmLmhlYWQpIHtcbiAgICBzZWxmLmhlYWQgPSBzZWxmLnRhaWxcbiAgfVxuICBzZWxmLmxlbmd0aCsrXG59XG5cbmZ1bmN0aW9uIHVuc2hpZnQgKHNlbGYsIGl0ZW0pIHtcbiAgc2VsZi5oZWFkID0gbmV3IE5vZGUoaXRlbSwgbnVsbCwgc2VsZi5oZWFkLCBzZWxmKVxuICBpZiAoIXNlbGYudGFpbCkge1xuICAgIHNlbGYudGFpbCA9IHNlbGYuaGVhZFxuICB9XG4gIHNlbGYubGVuZ3RoKytcbn1cblxuZnVuY3Rpb24gTm9kZSAodmFsdWUsIHByZXYsIG5leHQsIGxpc3QpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE5vZGUpKSB7XG4gICAgcmV0dXJuIG5ldyBOb2RlKHZhbHVlLCBwcmV2LCBuZXh0LCBsaXN0KVxuICB9XG5cbiAgdGhpcy5saXN0ID0gbGlzdFxuICB0aGlzLnZhbHVlID0gdmFsdWVcblxuICBpZiAocHJldikge1xuICAgIHByZXYubmV4dCA9IHRoaXNcbiAgICB0aGlzLnByZXYgPSBwcmV2XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wcmV2ID0gbnVsbFxuICB9XG5cbiAgaWYgKG5leHQpIHtcbiAgICBuZXh0LnByZXYgPSB0aGlzXG4gICAgdGhpcy5uZXh0ID0gbmV4dFxuICB9IGVsc2Uge1xuICAgIHRoaXMubmV4dCA9IG51bGxcbiAgfVxufVxuXG50cnkge1xuICAvLyBhZGQgaWYgc3VwcG9ydCBmb3IgU3ltYm9sLml0ZXJhdG9yIGlzIHByZXNlbnRcbiAgcmVxdWlyZSgnLi9pdGVyYXRvci5qcycpKFlhbGxpc3QpXG59IGNhdGNoIChlcikge31cbiIsIid1c2Ugc3RyaWN0J1xuXG4vLyBBIGxpbmtlZCBsaXN0IHRvIGtlZXAgdHJhY2sgb2YgcmVjZW50bHktdXNlZC1uZXNzXG5jb25zdCBZYWxsaXN0ID0gcmVxdWlyZSgneWFsbGlzdCcpXG5cbmNvbnN0IE1BWCA9IFN5bWJvbCgnbWF4JylcbmNvbnN0IExFTkdUSCA9IFN5bWJvbCgnbGVuZ3RoJylcbmNvbnN0IExFTkdUSF9DQUxDVUxBVE9SID0gU3ltYm9sKCdsZW5ndGhDYWxjdWxhdG9yJylcbmNvbnN0IEFMTE9XX1NUQUxFID0gU3ltYm9sKCdhbGxvd1N0YWxlJylcbmNvbnN0IE1BWF9BR0UgPSBTeW1ib2woJ21heEFnZScpXG5jb25zdCBESVNQT1NFID0gU3ltYm9sKCdkaXNwb3NlJylcbmNvbnN0IE5PX0RJU1BPU0VfT05fU0VUID0gU3ltYm9sKCdub0Rpc3Bvc2VPblNldCcpXG5jb25zdCBMUlVfTElTVCA9IFN5bWJvbCgnbHJ1TGlzdCcpXG5jb25zdCBDQUNIRSA9IFN5bWJvbCgnY2FjaGUnKVxuY29uc3QgVVBEQVRFX0FHRV9PTl9HRVQgPSBTeW1ib2woJ3VwZGF0ZUFnZU9uR2V0JylcblxuY29uc3QgbmFpdmVMZW5ndGggPSAoKSA9PiAxXG5cbi8vIGxydUxpc3QgaXMgYSB5YWxsaXN0IHdoZXJlIHRoZSBoZWFkIGlzIHRoZSB5b3VuZ2VzdFxuLy8gaXRlbSwgYW5kIHRoZSB0YWlsIGlzIHRoZSBvbGRlc3QuICB0aGUgbGlzdCBjb250YWlucyB0aGUgSGl0XG4vLyBvYmplY3RzIGFzIHRoZSBlbnRyaWVzLlxuLy8gRWFjaCBIaXQgb2JqZWN0IGhhcyBhIHJlZmVyZW5jZSB0byBpdHMgWWFsbGlzdC5Ob2RlLiAgVGhpc1xuLy8gbmV2ZXIgY2hhbmdlcy5cbi8vXG4vLyBjYWNoZSBpcyBhIE1hcCAob3IgUHNldWRvTWFwKSB0aGF0IG1hdGNoZXMgdGhlIGtleXMgdG9cbi8vIHRoZSBZYWxsaXN0Lk5vZGUgb2JqZWN0LlxuY2xhc3MgTFJVQ2FjaGUge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpXG4gICAgICBvcHRpb25zID0geyBtYXg6IG9wdGlvbnMgfVxuXG4gICAgaWYgKCFvcHRpb25zKVxuICAgICAgb3B0aW9ucyA9IHt9XG5cbiAgICBpZiAob3B0aW9ucy5tYXggJiYgKHR5cGVvZiBvcHRpb25zLm1heCAhPT0gJ251bWJlcicgfHwgb3B0aW9ucy5tYXggPCAwKSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21heCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlcicpXG4gICAgLy8gS2luZCBvZiB3ZWlyZCB0byBoYXZlIGEgZGVmYXVsdCBtYXggb2YgSW5maW5pdHksIGJ1dCBvaCB3ZWxsLlxuICAgIGNvbnN0IG1heCA9IHRoaXNbTUFYXSA9IG9wdGlvbnMubWF4IHx8IEluZmluaXR5XG5cbiAgICBjb25zdCBsYyA9IG9wdGlvbnMubGVuZ3RoIHx8IG5haXZlTGVuZ3RoXG4gICAgdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0gPSAodHlwZW9mIGxjICE9PSAnZnVuY3Rpb24nKSA/IG5haXZlTGVuZ3RoIDogbGNcbiAgICB0aGlzW0FMTE9XX1NUQUxFXSA9IG9wdGlvbnMuc3RhbGUgfHwgZmFsc2VcbiAgICBpZiAob3B0aW9ucy5tYXhBZ2UgJiYgdHlwZW9mIG9wdGlvbnMubWF4QWdlICE9PSAnbnVtYmVyJylcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21heEFnZSBtdXN0IGJlIGEgbnVtYmVyJylcbiAgICB0aGlzW01BWF9BR0VdID0gb3B0aW9ucy5tYXhBZ2UgfHwgMFxuICAgIHRoaXNbRElTUE9TRV0gPSBvcHRpb25zLmRpc3Bvc2VcbiAgICB0aGlzW05PX0RJU1BPU0VfT05fU0VUXSA9IG9wdGlvbnMubm9EaXNwb3NlT25TZXQgfHwgZmFsc2VcbiAgICB0aGlzW1VQREFURV9BR0VfT05fR0VUXSA9IG9wdGlvbnMudXBkYXRlQWdlT25HZXQgfHwgZmFsc2VcbiAgICB0aGlzLnJlc2V0KClcbiAgfVxuXG4gIC8vIHJlc2l6ZSB0aGUgY2FjaGUgd2hlbiB0aGUgbWF4IGNoYW5nZXMuXG4gIHNldCBtYXggKG1MKSB7XG4gICAgaWYgKHR5cGVvZiBtTCAhPT0gJ251bWJlcicgfHwgbUwgPCAwKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWF4IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyJylcblxuICAgIHRoaXNbTUFYXSA9IG1MIHx8IEluZmluaXR5XG4gICAgdHJpbSh0aGlzKVxuICB9XG4gIGdldCBtYXggKCkge1xuICAgIHJldHVybiB0aGlzW01BWF1cbiAgfVxuXG4gIHNldCBhbGxvd1N0YWxlIChhbGxvd1N0YWxlKSB7XG4gICAgdGhpc1tBTExPV19TVEFMRV0gPSAhIWFsbG93U3RhbGVcbiAgfVxuICBnZXQgYWxsb3dTdGFsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXNbQUxMT1dfU1RBTEVdXG4gIH1cblxuICBzZXQgbWF4QWdlIChtQSkge1xuICAgIGlmICh0eXBlb2YgbUEgIT09ICdudW1iZXInKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWF4QWdlIG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyJylcblxuICAgIHRoaXNbTUFYX0FHRV0gPSBtQVxuICAgIHRyaW0odGhpcylcbiAgfVxuICBnZXQgbWF4QWdlICgpIHtcbiAgICByZXR1cm4gdGhpc1tNQVhfQUdFXVxuICB9XG5cbiAgLy8gcmVzaXplIHRoZSBjYWNoZSB3aGVuIHRoZSBsZW5ndGhDYWxjdWxhdG9yIGNoYW5nZXMuXG4gIHNldCBsZW5ndGhDYWxjdWxhdG9yIChsQykge1xuICAgIGlmICh0eXBlb2YgbEMgIT09ICdmdW5jdGlvbicpXG4gICAgICBsQyA9IG5haXZlTGVuZ3RoXG5cbiAgICBpZiAobEMgIT09IHRoaXNbTEVOR1RIX0NBTENVTEFUT1JdKSB7XG4gICAgICB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXSA9IGxDXG4gICAgICB0aGlzW0xFTkdUSF0gPSAwXG4gICAgICB0aGlzW0xSVV9MSVNUXS5mb3JFYWNoKGhpdCA9PiB7XG4gICAgICAgIGhpdC5sZW5ndGggPSB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXShoaXQudmFsdWUsIGhpdC5rZXkpXG4gICAgICAgIHRoaXNbTEVOR1RIXSArPSBoaXQubGVuZ3RoXG4gICAgICB9KVxuICAgIH1cbiAgICB0cmltKHRoaXMpXG4gIH1cbiAgZ2V0IGxlbmd0aENhbGN1bGF0b3IgKCkgeyByZXR1cm4gdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0gfVxuXG4gIGdldCBsZW5ndGggKCkgeyByZXR1cm4gdGhpc1tMRU5HVEhdIH1cbiAgZ2V0IGl0ZW1Db3VudCAoKSB7IHJldHVybiB0aGlzW0xSVV9MSVNUXS5sZW5ndGggfVxuXG4gIHJmb3JFYWNoIChmbiwgdGhpc3ApIHtcbiAgICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgICBmb3IgKGxldCB3YWxrZXIgPSB0aGlzW0xSVV9MSVNUXS50YWlsOyB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgICBjb25zdCBwcmV2ID0gd2Fsa2VyLnByZXZcbiAgICAgIGZvckVhY2hTdGVwKHRoaXMsIGZuLCB3YWxrZXIsIHRoaXNwKVxuICAgICAgd2Fsa2VyID0gcHJldlxuICAgIH1cbiAgfVxuXG4gIGZvckVhY2ggKGZuLCB0aGlzcCkge1xuICAgIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICAgIGZvciAobGV0IHdhbGtlciA9IHRoaXNbTFJVX0xJU1RdLmhlYWQ7IHdhbGtlciAhPT0gbnVsbDspIHtcbiAgICAgIGNvbnN0IG5leHQgPSB3YWxrZXIubmV4dFxuICAgICAgZm9yRWFjaFN0ZXAodGhpcywgZm4sIHdhbGtlciwgdGhpc3ApXG4gICAgICB3YWxrZXIgPSBuZXh0XG4gICAgfVxuICB9XG5cbiAga2V5cyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTFJVX0xJU1RdLnRvQXJyYXkoKS5tYXAoayA9PiBrLmtleSlcbiAgfVxuXG4gIHZhbHVlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTFJVX0xJU1RdLnRvQXJyYXkoKS5tYXAoayA9PiBrLnZhbHVlKVxuICB9XG5cbiAgcmVzZXQgKCkge1xuICAgIGlmICh0aGlzW0RJU1BPU0VdICYmXG4gICAgICAgIHRoaXNbTFJVX0xJU1RdICYmXG4gICAgICAgIHRoaXNbTFJVX0xJU1RdLmxlbmd0aCkge1xuICAgICAgdGhpc1tMUlVfTElTVF0uZm9yRWFjaChoaXQgPT4gdGhpc1tESVNQT1NFXShoaXQua2V5LCBoaXQudmFsdWUpKVxuICAgIH1cblxuICAgIHRoaXNbQ0FDSEVdID0gbmV3IE1hcCgpIC8vIGhhc2ggb2YgaXRlbXMgYnkga2V5XG4gICAgdGhpc1tMUlVfTElTVF0gPSBuZXcgWWFsbGlzdCgpIC8vIGxpc3Qgb2YgaXRlbXMgaW4gb3JkZXIgb2YgdXNlIHJlY2VuY3lcbiAgICB0aGlzW0xFTkdUSF0gPSAwIC8vIGxlbmd0aCBvZiBpdGVtcyBpbiB0aGUgbGlzdFxuICB9XG5cbiAgZHVtcCAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTFJVX0xJU1RdLm1hcChoaXQgPT5cbiAgICAgIGlzU3RhbGUodGhpcywgaGl0KSA/IGZhbHNlIDoge1xuICAgICAgICBrOiBoaXQua2V5LFxuICAgICAgICB2OiBoaXQudmFsdWUsXG4gICAgICAgIGU6IGhpdC5ub3cgKyAoaGl0Lm1heEFnZSB8fCAwKVxuICAgICAgfSkudG9BcnJheSgpLmZpbHRlcihoID0+IGgpXG4gIH1cblxuICBkdW1wTHJ1ICgpIHtcbiAgICByZXR1cm4gdGhpc1tMUlVfTElTVF1cbiAgfVxuXG4gIHNldCAoa2V5LCB2YWx1ZSwgbWF4QWdlKSB7XG4gICAgbWF4QWdlID0gbWF4QWdlIHx8IHRoaXNbTUFYX0FHRV1cblxuICAgIGlmIChtYXhBZ2UgJiYgdHlwZW9mIG1heEFnZSAhPT0gJ251bWJlcicpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXhBZ2UgbXVzdCBiZSBhIG51bWJlcicpXG5cbiAgICBjb25zdCBub3cgPSBtYXhBZ2UgPyBEYXRlLm5vdygpIDogMFxuICAgIGNvbnN0IGxlbiA9IHRoaXNbTEVOR1RIX0NBTENVTEFUT1JdKHZhbHVlLCBrZXkpXG5cbiAgICBpZiAodGhpc1tDQUNIRV0uaGFzKGtleSkpIHtcbiAgICAgIGlmIChsZW4gPiB0aGlzW01BWF0pIHtcbiAgICAgICAgZGVsKHRoaXMsIHRoaXNbQ0FDSEVdLmdldChrZXkpKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbQ0FDSEVdLmdldChrZXkpXG4gICAgICBjb25zdCBpdGVtID0gbm9kZS52YWx1ZVxuXG4gICAgICAvLyBkaXNwb3NlIG9mIHRoZSBvbGQgb25lIGJlZm9yZSBvdmVyd3JpdGluZ1xuICAgICAgLy8gc3BsaXQgb3V0IGludG8gMiBpZnMgZm9yIGJldHRlciBjb3ZlcmFnZSB0cmFja2luZ1xuICAgICAgaWYgKHRoaXNbRElTUE9TRV0pIHtcbiAgICAgICAgaWYgKCF0aGlzW05PX0RJU1BPU0VfT05fU0VUXSlcbiAgICAgICAgICB0aGlzW0RJU1BPU0VdKGtleSwgaXRlbS52YWx1ZSlcbiAgICAgIH1cblxuICAgICAgaXRlbS5ub3cgPSBub3dcbiAgICAgIGl0ZW0ubWF4QWdlID0gbWF4QWdlXG4gICAgICBpdGVtLnZhbHVlID0gdmFsdWVcbiAgICAgIHRoaXNbTEVOR1RIXSArPSBsZW4gLSBpdGVtLmxlbmd0aFxuICAgICAgaXRlbS5sZW5ndGggPSBsZW5cbiAgICAgIHRoaXMuZ2V0KGtleSlcbiAgICAgIHRyaW0odGhpcylcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgaGl0ID0gbmV3IEVudHJ5KGtleSwgdmFsdWUsIGxlbiwgbm93LCBtYXhBZ2UpXG5cbiAgICAvLyBvdmVyc2l6ZWQgb2JqZWN0cyBmYWxsIG91dCBvZiBjYWNoZSBhdXRvbWF0aWNhbGx5LlxuICAgIGlmIChoaXQubGVuZ3RoID4gdGhpc1tNQVhdKSB7XG4gICAgICBpZiAodGhpc1tESVNQT1NFXSlcbiAgICAgICAgdGhpc1tESVNQT1NFXShrZXksIHZhbHVlKVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICB0aGlzW0xFTkdUSF0gKz0gaGl0Lmxlbmd0aFxuICAgIHRoaXNbTFJVX0xJU1RdLnVuc2hpZnQoaGl0KVxuICAgIHRoaXNbQ0FDSEVdLnNldChrZXksIHRoaXNbTFJVX0xJU1RdLmhlYWQpXG4gICAgdHJpbSh0aGlzKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBoYXMgKGtleSkge1xuICAgIGlmICghdGhpc1tDQUNIRV0uaGFzKGtleSkpIHJldHVybiBmYWxzZVxuICAgIGNvbnN0IGhpdCA9IHRoaXNbQ0FDSEVdLmdldChrZXkpLnZhbHVlXG4gICAgcmV0dXJuICFpc1N0YWxlKHRoaXMsIGhpdClcbiAgfVxuXG4gIGdldCAoa2V5KSB7XG4gICAgcmV0dXJuIGdldCh0aGlzLCBrZXksIHRydWUpXG4gIH1cblxuICBwZWVrIChrZXkpIHtcbiAgICByZXR1cm4gZ2V0KHRoaXMsIGtleSwgZmFsc2UpXG4gIH1cblxuICBwb3AgKCkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzW0xSVV9MSVNUXS50YWlsXG4gICAgaWYgKCFub2RlKVxuICAgICAgcmV0dXJuIG51bGxcblxuICAgIGRlbCh0aGlzLCBub2RlKVxuICAgIHJldHVybiBub2RlLnZhbHVlXG4gIH1cblxuICBkZWwgKGtleSkge1xuICAgIGRlbCh0aGlzLCB0aGlzW0NBQ0hFXS5nZXQoa2V5KSlcbiAgfVxuXG4gIGxvYWQgKGFycikge1xuICAgIC8vIHJlc2V0IHRoZSBjYWNoZVxuICAgIHRoaXMucmVzZXQoKVxuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxuICAgIC8vIEEgcHJldmlvdXMgc2VyaWFsaXplZCBjYWNoZSBoYXMgdGhlIG1vc3QgcmVjZW50IGl0ZW1zIGZpcnN0XG4gICAgZm9yIChsZXQgbCA9IGFyci5sZW5ndGggLSAxOyBsID49IDA7IGwtLSkge1xuICAgICAgY29uc3QgaGl0ID0gYXJyW2xdXG4gICAgICBjb25zdCBleHBpcmVzQXQgPSBoaXQuZSB8fCAwXG4gICAgICBpZiAoZXhwaXJlc0F0ID09PSAwKVxuICAgICAgICAvLyB0aGUgaXRlbSB3YXMgY3JlYXRlZCB3aXRob3V0IGV4cGlyYXRpb24gaW4gYSBub24gYWdlZCBjYWNoZVxuICAgICAgICB0aGlzLnNldChoaXQuaywgaGl0LnYpXG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF4QWdlID0gZXhwaXJlc0F0IC0gbm93XG4gICAgICAgIC8vIGRvbnQgYWRkIGFscmVhZHkgZXhwaXJlZCBpdGVtc1xuICAgICAgICBpZiAobWF4QWdlID4gMCkge1xuICAgICAgICAgIHRoaXMuc2V0KGhpdC5rLCBoaXQudiwgbWF4QWdlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJ1bmUgKCkge1xuICAgIHRoaXNbQ0FDSEVdLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IGdldCh0aGlzLCBrZXksIGZhbHNlKSlcbiAgfVxufVxuXG5jb25zdCBnZXQgPSAoc2VsZiwga2V5LCBkb1VzZSkgPT4ge1xuICBjb25zdCBub2RlID0gc2VsZltDQUNIRV0uZ2V0KGtleSlcbiAgaWYgKG5vZGUpIHtcbiAgICBjb25zdCBoaXQgPSBub2RlLnZhbHVlXG4gICAgaWYgKGlzU3RhbGUoc2VsZiwgaGl0KSkge1xuICAgICAgZGVsKHNlbGYsIG5vZGUpXG4gICAgICBpZiAoIXNlbGZbQUxMT1dfU1RBTEVdKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkb1VzZSkge1xuICAgICAgICBpZiAoc2VsZltVUERBVEVfQUdFX09OX0dFVF0pXG4gICAgICAgICAgbm9kZS52YWx1ZS5ub3cgPSBEYXRlLm5vdygpXG4gICAgICAgIHNlbGZbTFJVX0xJU1RdLnVuc2hpZnROb2RlKG5vZGUpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoaXQudmFsdWVcbiAgfVxufVxuXG5jb25zdCBpc1N0YWxlID0gKHNlbGYsIGhpdCkgPT4ge1xuICBpZiAoIWhpdCB8fCAoIWhpdC5tYXhBZ2UgJiYgIXNlbGZbTUFYX0FHRV0pKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGNvbnN0IGRpZmYgPSBEYXRlLm5vdygpIC0gaGl0Lm5vd1xuICByZXR1cm4gaGl0Lm1heEFnZSA/IGRpZmYgPiBoaXQubWF4QWdlXG4gICAgOiBzZWxmW01BWF9BR0VdICYmIChkaWZmID4gc2VsZltNQVhfQUdFXSlcbn1cblxuY29uc3QgdHJpbSA9IHNlbGYgPT4ge1xuICBpZiAoc2VsZltMRU5HVEhdID4gc2VsZltNQVhdKSB7XG4gICAgZm9yIChsZXQgd2Fsa2VyID0gc2VsZltMUlVfTElTVF0udGFpbDtcbiAgICAgIHNlbGZbTEVOR1RIXSA+IHNlbGZbTUFYXSAmJiB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgICAvLyBXZSBrbm93IHRoYXQgd2UncmUgYWJvdXQgdG8gZGVsZXRlIHRoaXMgb25lLCBhbmQgYWxzb1xuICAgICAgLy8gd2hhdCB0aGUgbmV4dCBsZWFzdCByZWNlbnRseSB1c2VkIGtleSB3aWxsIGJlLCBzbyBqdXN0XG4gICAgICAvLyBnbyBhaGVhZCBhbmQgc2V0IGl0IG5vdy5cbiAgICAgIGNvbnN0IHByZXYgPSB3YWxrZXIucHJldlxuICAgICAgZGVsKHNlbGYsIHdhbGtlcilcbiAgICAgIHdhbGtlciA9IHByZXZcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZGVsID0gKHNlbGYsIG5vZGUpID0+IHtcbiAgaWYgKG5vZGUpIHtcbiAgICBjb25zdCBoaXQgPSBub2RlLnZhbHVlXG4gICAgaWYgKHNlbGZbRElTUE9TRV0pXG4gICAgICBzZWxmW0RJU1BPU0VdKGhpdC5rZXksIGhpdC52YWx1ZSlcblxuICAgIHNlbGZbTEVOR1RIXSAtPSBoaXQubGVuZ3RoXG4gICAgc2VsZltDQUNIRV0uZGVsZXRlKGhpdC5rZXkpXG4gICAgc2VsZltMUlVfTElTVF0ucmVtb3ZlTm9kZShub2RlKVxuICB9XG59XG5cbmNsYXNzIEVudHJ5IHtcbiAgY29uc3RydWN0b3IgKGtleSwgdmFsdWUsIGxlbmd0aCwgbm93LCBtYXhBZ2UpIHtcbiAgICB0aGlzLmtleSA9IGtleVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gICAgdGhpcy5ub3cgPSBub3dcbiAgICB0aGlzLm1heEFnZSA9IG1heEFnZSB8fCAwXG4gIH1cbn1cblxuY29uc3QgZm9yRWFjaFN0ZXAgPSAoc2VsZiwgZm4sIG5vZGUsIHRoaXNwKSA9PiB7XG4gIGxldCBoaXQgPSBub2RlLnZhbHVlXG4gIGlmIChpc1N0YWxlKHNlbGYsIGhpdCkpIHtcbiAgICBkZWwoc2VsZiwgbm9kZSlcbiAgICBpZiAoIXNlbGZbQUxMT1dfU1RBTEVdKVxuICAgICAgaGl0ID0gdW5kZWZpbmVkXG4gIH1cbiAgaWYgKGhpdClcbiAgICBmbi5jYWxsKHRoaXNwLCBoaXQudmFsdWUsIGhpdC5rZXksIHNlbGYpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTFJVQ2FjaGVcbiIsIi8vIGhvaXN0ZWQgY2xhc3MgZm9yIGN5Y2xpYyBkZXBlbmRlbmN5XG5jbGFzcyBSYW5nZSB7XG4gIGNvbnN0cnVjdG9yIChyYW5nZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMob3B0aW9ucylcblxuICAgIGlmIChyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHJhbmdlLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UgJiZcbiAgICAgICAgcmFuZ2UuaW5jbHVkZVByZXJlbGVhc2UgPT09ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiByYW5nZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS5yYXcsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJhbmdlIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgICAgLy8ganVzdCBwdXQgaXQgaW4gdGhlIHNldCBhbmQgcmV0dXJuXG4gICAgICB0aGlzLnJhdyA9IHJhbmdlLnZhbHVlXG4gICAgICB0aGlzLnNldCA9IFtbcmFuZ2VdXVxuICAgICAgdGhpcy5mb3JtYXQoKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICAgIHRoaXMuaW5jbHVkZVByZXJlbGVhc2UgPSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcblxuICAgIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gICAgdGhpcy5yYXcgPSByYW5nZVxuICAgIHRoaXMuc2V0ID0gcmFuZ2VcbiAgICAgIC5zcGxpdCgnfHwnKVxuICAgICAgLy8gbWFwIHRoZSByYW5nZSB0byBhIDJkIGFycmF5IG9mIGNvbXBhcmF0b3JzXG4gICAgICAubWFwKHIgPT4gdGhpcy5wYXJzZVJhbmdlKHIudHJpbSgpKSlcbiAgICAgIC8vIHRocm93IG91dCBhbnkgY29tcGFyYXRvciBsaXN0cyB0aGF0IGFyZSBlbXB0eVxuICAgICAgLy8gdGhpcyBnZW5lcmFsbHkgbWVhbnMgdGhhdCBpdCB3YXMgbm90IGEgdmFsaWQgcmFuZ2UsIHdoaWNoIGlzIGFsbG93ZWRcbiAgICAgIC8vIGluIGxvb3NlIG1vZGUsIGJ1dCB3aWxsIHN0aWxsIHRocm93IGlmIHRoZSBXSE9MRSByYW5nZSBpcyBpbnZhbGlkLlxuICAgICAgLmZpbHRlcihjID0+IGMubGVuZ3RoKVxuXG4gICAgaWYgKCF0aGlzLnNldC5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgU2VtVmVyIFJhbmdlOiAke3JhbmdlfWApXG4gICAgfVxuXG4gICAgLy8gaWYgd2UgaGF2ZSBhbnkgdGhhdCBhcmUgbm90IHRoZSBudWxsIHNldCwgdGhyb3cgb3V0IG51bGwgc2V0cy5cbiAgICBpZiAodGhpcy5zZXQubGVuZ3RoID4gMSkge1xuICAgICAgLy8ga2VlcCB0aGUgZmlyc3Qgb25lLCBpbiBjYXNlIHRoZXkncmUgYWxsIG51bGwgc2V0c1xuICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLnNldFswXVxuICAgICAgdGhpcy5zZXQgPSB0aGlzLnNldC5maWx0ZXIoYyA9PiAhaXNOdWxsU2V0KGNbMF0pKVxuICAgICAgaWYgKHRoaXMuc2V0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnNldCA9IFtmaXJzdF1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXQubGVuZ3RoID4gMSkge1xuICAgICAgICAvLyBpZiB3ZSBoYXZlIGFueSB0aGF0IGFyZSAqLCB0aGVuIHRoZSByYW5nZSBpcyBqdXN0ICpcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHRoaXMuc2V0KSB7XG4gICAgICAgICAgaWYgKGMubGVuZ3RoID09PSAxICYmIGlzQW55KGNbMF0pKSB7XG4gICAgICAgICAgICB0aGlzLnNldCA9IFtjXVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZvcm1hdCgpXG4gIH1cblxuICBmb3JtYXQgKCkge1xuICAgIHRoaXMucmFuZ2UgPSB0aGlzLnNldFxuICAgICAgLm1hcCgoY29tcHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbXBzLmpvaW4oJyAnKS50cmltKClcbiAgICAgIH0pXG4gICAgICAuam9pbignfHwnKVxuICAgICAgLnRyaW0oKVxuICAgIHJldHVybiB0aGlzLnJhbmdlXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZ2VcbiAgfVxuXG4gIHBhcnNlUmFuZ2UgKHJhbmdlKSB7XG4gICAgcmFuZ2UgPSByYW5nZS50cmltKClcblxuICAgIC8vIG1lbW9pemUgcmFuZ2UgcGFyc2luZyBmb3IgcGVyZm9ybWFuY2UuXG4gICAgLy8gdGhpcyBpcyBhIHZlcnkgaG90IHBhdGgsIGFuZCBmdWxseSBkZXRlcm1pbmlzdGljLlxuICAgIGNvbnN0IG1lbW9PcHRzID0gT2JqZWN0LmtleXModGhpcy5vcHRpb25zKS5qb2luKCcsJylcbiAgICBjb25zdCBtZW1vS2V5ID0gYHBhcnNlUmFuZ2U6JHttZW1vT3B0c306JHtyYW5nZX1gXG4gICAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KG1lbW9LZXkpXG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgcmV0dXJuIGNhY2hlZFxuICAgIH1cblxuICAgIGNvbnN0IGxvb3NlID0gdGhpcy5vcHRpb25zLmxvb3NlXG4gICAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gICAgY29uc3QgaHIgPSBsb29zZSA/IHJlW3QuSFlQSEVOUkFOR0VMT09TRV0gOiByZVt0LkhZUEhFTlJBTkdFXVxuICAgIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSh0aGlzLm9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpKVxuICAgIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKVxuICAgIC8vIGA+IDEuMi4zIDwgMS4yLjVgID0+IGA+MS4yLjMgPDEuMi41YFxuICAgIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVt0LkNPTVBBUkFUT1JUUklNXSwgY29tcGFyYXRvclRyaW1SZXBsYWNlKVxuICAgIGRlYnVnKCdjb21wYXJhdG9yIHRyaW0nLCByYW5nZSlcblxuICAgIC8vIGB+IDEuMi4zYCA9PiBgfjEuMi4zYFxuICAgIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVt0LlRJTERFVFJJTV0sIHRpbGRlVHJpbVJlcGxhY2UpXG5cbiAgICAvLyBgXiAxLjIuM2AgPT4gYF4xLjIuM2BcbiAgICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbdC5DQVJFVFRSSU1dLCBjYXJldFRyaW1SZXBsYWNlKVxuXG4gICAgLy8gbm9ybWFsaXplIHNwYWNlc1xuICAgIHJhbmdlID0gcmFuZ2Uuc3BsaXQoL1xccysvKS5qb2luKCcgJylcblxuICAgIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSByYW5nZSBpcyBjb21wbGV0ZWx5IHRyaW1tZWQgYW5kXG4gICAgLy8gcmVhZHkgdG8gYmUgc3BsaXQgaW50byBjb21wYXJhdG9ycy5cblxuICAgIGxldCByYW5nZUxpc3QgPSByYW5nZVxuICAgICAgLnNwbGl0KCcgJylcbiAgICAgIC5tYXAoY29tcCA9PiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgdGhpcy5vcHRpb25zKSlcbiAgICAgIC5qb2luKCcgJylcbiAgICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgICAvLyA+PTAuMC4wIGlzIGVxdWl2YWxlbnQgdG8gKlxuICAgICAgLm1hcChjb21wID0+IHJlcGxhY2VHVEUwKGNvbXAsIHRoaXMub3B0aW9ucykpXG5cbiAgICBpZiAobG9vc2UpIHtcbiAgICAgIC8vIGluIGxvb3NlIG1vZGUsIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHZhbGlkIGNvbXBhcmF0b3JzXG4gICAgICByYW5nZUxpc3QgPSByYW5nZUxpc3QuZmlsdGVyKGNvbXAgPT4ge1xuICAgICAgICBkZWJ1ZygnbG9vc2UgaW52YWxpZCBmaWx0ZXInLCBjb21wLCB0aGlzLm9wdGlvbnMpXG4gICAgICAgIHJldHVybiAhIWNvbXAubWF0Y2gocmVbdC5DT01QQVJBVE9STE9PU0VdKVxuICAgICAgfSlcbiAgICB9XG4gICAgZGVidWcoJ3JhbmdlIGxpc3QnLCByYW5nZUxpc3QpXG5cbiAgICAvLyBpZiBhbnkgY29tcGFyYXRvcnMgYXJlIHRoZSBudWxsIHNldCwgdGhlbiByZXBsYWNlIHdpdGggSlVTVCBudWxsIHNldFxuICAgIC8vIGlmIG1vcmUgdGhhbiBvbmUgY29tcGFyYXRvciwgcmVtb3ZlIGFueSAqIGNvbXBhcmF0b3JzXG4gICAgLy8gYWxzbywgZG9uJ3QgaW5jbHVkZSB0aGUgc2FtZSBjb21wYXJhdG9yIG1vcmUgdGhhbiBvbmNlXG4gICAgY29uc3QgcmFuZ2VNYXAgPSBuZXcgTWFwKClcbiAgICBjb25zdCBjb21wYXJhdG9ycyA9IHJhbmdlTGlzdC5tYXAoY29tcCA9PiBuZXcgQ29tcGFyYXRvcihjb21wLCB0aGlzLm9wdGlvbnMpKVxuICAgIGZvciAoY29uc3QgY29tcCBvZiBjb21wYXJhdG9ycykge1xuICAgICAgaWYgKGlzTnVsbFNldChjb21wKSkge1xuICAgICAgICByZXR1cm4gW2NvbXBdXG4gICAgICB9XG4gICAgICByYW5nZU1hcC5zZXQoY29tcC52YWx1ZSwgY29tcClcbiAgICB9XG4gICAgaWYgKHJhbmdlTWFwLnNpemUgPiAxICYmIHJhbmdlTWFwLmhhcygnJykpIHtcbiAgICAgIHJhbmdlTWFwLmRlbGV0ZSgnJylcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBbLi4ucmFuZ2VNYXAudmFsdWVzKCldXG4gICAgY2FjaGUuc2V0KG1lbW9LZXksIHJlc3VsdClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBpbnRlcnNlY3RzIChyYW5nZSwgb3B0aW9ucykge1xuICAgIGlmICghKHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhIFJhbmdlIGlzIHJlcXVpcmVkJylcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZXQuc29tZSgodGhpc0NvbXBhcmF0b3JzKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBpc1NhdGlzZmlhYmxlKHRoaXNDb21wYXJhdG9ycywgb3B0aW9ucykgJiZcbiAgICAgICAgcmFuZ2Uuc2V0LnNvbWUoKHJhbmdlQ29tcGFyYXRvcnMpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgaXNTYXRpc2ZpYWJsZShyYW5nZUNvbXBhcmF0b3JzLCBvcHRpb25zKSAmJlxuICAgICAgICAgICAgdGhpc0NvbXBhcmF0b3JzLmV2ZXJ5KCh0aGlzQ29tcGFyYXRvcikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gcmFuZ2VDb21wYXJhdG9ycy5ldmVyeSgocmFuZ2VDb21wYXJhdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNDb21wYXJhdG9yLmludGVyc2VjdHMocmFuZ2VDb21wYXJhdG9yLCBvcHRpb25zKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfSlcbiAgfVxuXG4gIC8vIGlmIEFOWSBvZiB0aGUgc2V0cyBtYXRjaCBBTEwgb2YgaXRzIGNvbXBhcmF0b3JzLCB0aGVuIHBhc3NcbiAgdGVzdCAodmVyc2lvbikge1xuICAgIGlmICghdmVyc2lvbikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5vcHRpb25zKVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNldC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRlc3RTZXQodGhpcy5zZXRbaV0sIHZlcnNpb24sIHRoaXMub3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gUmFuZ2VcblxuY29uc3QgTFJVID0gcmVxdWlyZSgnbHJ1LWNhY2hlJylcbmNvbnN0IGNhY2hlID0gbmV3IExSVSh7IG1heDogMTAwMCB9KVxuXG5jb25zdCBwYXJzZU9wdGlvbnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9wYXJzZS1vcHRpb25zJylcbmNvbnN0IENvbXBhcmF0b3IgPSByZXF1aXJlKCcuL2NvbXBhcmF0b3InKVxuY29uc3QgZGVidWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9kZWJ1ZycpXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuL3NlbXZlcicpXG5jb25zdCB7XG4gIHJlLFxuICB0LFxuICBjb21wYXJhdG9yVHJpbVJlcGxhY2UsXG4gIHRpbGRlVHJpbVJlcGxhY2UsXG4gIGNhcmV0VHJpbVJlcGxhY2UsXG59ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuXG5jb25zdCBpc051bGxTZXQgPSBjID0+IGMudmFsdWUgPT09ICc8MC4wLjAtMCdcbmNvbnN0IGlzQW55ID0gYyA9PiBjLnZhbHVlID09PSAnJ1xuXG4vLyB0YWtlIGEgc2V0IG9mIGNvbXBhcmF0b3JzIGFuZCBkZXRlcm1pbmUgd2hldGhlciB0aGVyZVxuLy8gZXhpc3RzIGEgdmVyc2lvbiB3aGljaCBjYW4gc2F0aXNmeSBpdFxuY29uc3QgaXNTYXRpc2ZpYWJsZSA9IChjb21wYXJhdG9ycywgb3B0aW9ucykgPT4ge1xuICBsZXQgcmVzdWx0ID0gdHJ1ZVxuICBjb25zdCByZW1haW5pbmdDb21wYXJhdG9ycyA9IGNvbXBhcmF0b3JzLnNsaWNlKClcbiAgbGV0IHRlc3RDb21wYXJhdG9yID0gcmVtYWluaW5nQ29tcGFyYXRvcnMucG9wKClcblxuICB3aGlsZSAocmVzdWx0ICYmIHJlbWFpbmluZ0NvbXBhcmF0b3JzLmxlbmd0aCkge1xuICAgIHJlc3VsdCA9IHJlbWFpbmluZ0NvbXBhcmF0b3JzLmV2ZXJ5KChvdGhlckNvbXBhcmF0b3IpID0+IHtcbiAgICAgIHJldHVybiB0ZXN0Q29tcGFyYXRvci5pbnRlcnNlY3RzKG90aGVyQ29tcGFyYXRvciwgb3B0aW9ucylcbiAgICB9KVxuXG4gICAgdGVzdENvbXBhcmF0b3IgPSByZW1haW5pbmdDb21wYXJhdG9ycy5wb3AoKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyBjb21wcmlzZWQgb2YgeHJhbmdlcywgdGlsZGVzLCBzdGFycywgYW5kIGd0bHQncyBhdCB0aGlzIHBvaW50LlxuLy8gYWxyZWFkeSByZXBsYWNlZCB0aGUgaHlwaGVuIHJhbmdlc1xuLy8gdHVybiBpbnRvIGEgc2V0IG9mIEpVU1QgY29tcGFyYXRvcnMuXG5jb25zdCBwYXJzZUNvbXBhcmF0b3IgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygnY29tcCcsIGNvbXAsIG9wdGlvbnMpXG4gIGNvbXAgPSByZXBsYWNlQ2FyZXRzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCdjYXJldCcsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlVGlsZGVzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCd0aWxkZXMnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVhSYW5nZXMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3hyYW5nZScsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlU3RhcnMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3N0YXJzJywgY29tcClcbiAgcmV0dXJuIGNvbXBcbn1cblxuY29uc3QgaXNYID0gaWQgPT4gIWlkIHx8IGlkLnRvTG93ZXJDYXNlKCkgPT09ICd4JyB8fCBpZCA9PT0gJyonXG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMC0wXG4vLyB+Mi4wLCB+Mi4wLngsIH4+Mi4wLCB+PjIuMC54IC0tPiA+PTIuMC4wIDwyLjEuMC0wXG4vLyB+MS4yLCB+MS4yLngsIH4+MS4yLCB+PjEuMi54IC0tPiA+PTEuMi4wIDwxLjMuMC0wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wLTBcbi8vIH4xLjIuMCwgfj4xLjIuMCAtLT4gPj0xLjIuMCA8MS4zLjAtMFxuY29uc3QgcmVwbGFjZVRpbGRlcyA9IChjb21wLCBvcHRpb25zKSA9PlxuICBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcCgoYykgPT4ge1xuICAgIHJldHVybiByZXBsYWNlVGlsZGUoYywgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG5cbmNvbnN0IHJlcGxhY2VUaWxkZSA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5USUxERUxPT1NFXSA6IHJlW3QuVElMREVdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgKF8sIE0sIG0sIHAsIHByKSA9PiB7XG4gICAgZGVidWcoJ3RpbGRlJywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgbGV0IHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gYD49JHtNfS4wLjAgPCR7K00gKyAxfS4wLjAtMGBcbiAgICB9IGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgLy8gfjEuMiA9PSA+PTEuMi4wIDwxLjMuMC0wXG4gICAgICByZXQgPSBgPj0ke019LiR7bX0uMCA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgIH0gZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlVGlsZGUgcHInLCBwcilcbiAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgIH0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gfjEuMi4zID09ID49MS4yLjMgPDEuMy4wLTBcbiAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgIH0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9XG5cbiAgICBkZWJ1ZygndGlsZGUgcmV0dXJuJywgcmV0KVxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuLy8gXiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIF4yLCBeMi54LCBeMi54LnggLS0+ID49Mi4wLjAgPDMuMC4wLTBcbi8vIF4yLjAsIF4yLjAueCAtLT4gPj0yLjAuMCA8My4wLjAtMFxuLy8gXjEuMiwgXjEuMi54IC0tPiA+PTEuMi4wIDwyLjAuMC0wXG4vLyBeMS4yLjMgLS0+ID49MS4yLjMgPDIuMC4wLTBcbi8vIF4xLjIuMCAtLT4gPj0xLjIuMCA8Mi4wLjAtMFxuY29uc3QgcmVwbGFjZUNhcmV0cyA9IChjb21wLCBvcHRpb25zKSA9PlxuICBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcCgoYykgPT4ge1xuICAgIHJldHVybiByZXBsYWNlQ2FyZXQoYywgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG5cbmNvbnN0IHJlcGxhY2VDYXJldCA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIG9wdGlvbnMpXG4gIGNvbnN0IHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5DQVJFVExPT1NFXSA6IHJlW3QuQ0FSRVRdXG4gIGNvbnN0IHogPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gJy0wJyA6ICcnXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgKF8sIE0sIG0sIHAsIHByKSA9PiB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgbGV0IHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gYD49JHtNfS4wLjAke3p9IDwkeytNICsgMX0uMC4wLTBgXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LjAke3p9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uMCR7en0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZUNhcmV0IHByJywgcHIpXG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpIHtcbiAgICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwfS0ke3ByXG4gICAgICAgICAgfSA8JHtNfS4ke219LiR7K3AgKyAxfS0wYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgICAgICB9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgICAgfSA8JHsrTSArIDF9LjAuMC0wYFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Zygnbm8gcHInKVxuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKSB7XG4gICAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cFxuICAgICAgICAgIH0ke3p9IDwke019LiR7bX0uJHsrcCArIDF9LTBgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cFxuICAgICAgICAgIH0ke3p9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgICAgfSA8JHsrTSArIDF9LjAuMC0wYFxuICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKCdjYXJldCByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG5jb25zdCByZXBsYWNlWFJhbmdlcyA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdyZXBsYWNlWFJhbmdlcycsIGNvbXAsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wLnNwbGl0KC9cXHMrLykubWFwKChjKSA9PiB7XG4gICAgcmV0dXJuIHJlcGxhY2VYUmFuZ2UoYywgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG59XG5cbmNvbnN0IHJlcGxhY2VYUmFuZ2UgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBjb21wID0gY29tcC50cmltKClcbiAgY29uc3QgciA9IG9wdGlvbnMubG9vc2UgPyByZVt0LlhSQU5HRUxPT1NFXSA6IHJlW3QuWFJBTkdFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIChyZXQsIGd0bHQsIE0sIG0sIHAsIHByKSA9PiB7XG4gICAgZGVidWcoJ3hSYW5nZScsIGNvbXAsIHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpXG4gICAgY29uc3QgeE0gPSBpc1goTSlcbiAgICBjb25zdCB4bSA9IHhNIHx8IGlzWChtKVxuICAgIGNvbnN0IHhwID0geG0gfHwgaXNYKHApXG4gICAgY29uc3QgYW55WCA9IHhwXG5cbiAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpIHtcbiAgICAgIGd0bHQgPSAnJ1xuICAgIH1cblxuICAgIC8vIGlmIHdlJ3JlIGluY2x1ZGluZyBwcmVyZWxlYXNlcyBpbiB0aGUgbWF0Y2gsIHRoZW4gd2UgbmVlZFxuICAgIC8vIHRvIGZpeCB0aGlzIHRvIC0wLCB0aGUgbG93ZXN0IHBvc3NpYmxlIHByZXJlbGVhc2UgdmFsdWVcbiAgICBwciA9IG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgPyAnLTAnIDogJydcblxuICAgIGlmICh4TSkge1xuICAgICAgaWYgKGd0bHQgPT09ICc+JyB8fCBndGx0ID09PSAnPCcpIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBhbGxvd2VkXG4gICAgICAgIHJldCA9ICc8MC4wLjAtMCdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgZm9yYmlkZGVuXG4gICAgICAgIHJldCA9ICcqJ1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3RsdCAmJiBhbnlYKSB7XG4gICAgICAvLyB3ZSBrbm93IHBhdGNoIGlzIGFuIHgsIGJlY2F1c2Ugd2UgaGF2ZSBhbnkgeCBhdCBhbGwuXG4gICAgICAvLyByZXBsYWNlIFggd2l0aCAwXG4gICAgICBpZiAoeG0pIHtcbiAgICAgICAgbSA9IDBcbiAgICAgIH1cbiAgICAgIHAgPSAwXG5cbiAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgZ3RsdCA9ICc+PSdcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICAgIG0gPSAwXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndGx0ID09PSAnPD0nKSB7XG4gICAgICAgIC8vIDw9MC43LnggaXMgYWN0dWFsbHkgPDAuOC4wLCBzaW5jZSBhbnkgMC43Lnggc2hvdWxkXG4gICAgICAgIC8vIHBhc3MuICBTaW1pbGFybHksIDw9Ny54IGlzIGFjdHVhbGx5IDw4LjAuMCwgZXRjLlxuICAgICAgICBndGx0ID0gJzwnXG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGd0bHQgPT09ICc8Jykge1xuICAgICAgICBwciA9ICctMCdcbiAgICAgIH1cblxuICAgICAgcmV0ID0gYCR7Z3RsdCArIE19LiR7bX0uJHtwfSR7cHJ9YFxuICAgIH0gZWxzZSBpZiAoeG0pIHtcbiAgICAgIHJldCA9IGA+PSR7TX0uMC4wJHtwcn0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICByZXQgPSBgPj0ke019LiR7bX0uMCR7cHJcbiAgICAgIH0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9XG5cbiAgICBkZWJ1ZygneFJhbmdlIHJldHVybicsIHJldClcblxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuLy8gQmVjYXVzZSAqIGlzIEFORC1lZCB3aXRoIGV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgY29tcGFyYXRvcixcbi8vIGFuZCAnJyBtZWFucyBcImFueSB2ZXJzaW9uXCIsIGp1c3QgcmVtb3ZlIHRoZSAqcyBlbnRpcmVseS5cbmNvbnN0IHJlcGxhY2VTdGFycyA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdyZXBsYWNlU3RhcnMnLCBjb21wLCBvcHRpb25zKVxuICAvLyBMb29zZW5lc3MgaXMgaWdub3JlZCBoZXJlLiAgc3RhciBpcyBhbHdheXMgYXMgbG9vc2UgYXMgaXQgZ2V0cyFcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnJlcGxhY2UocmVbdC5TVEFSXSwgJycpXG59XG5cbmNvbnN0IHJlcGxhY2VHVEUwID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgZGVidWcoJ3JlcGxhY2VHVEUwJywgY29tcCwgb3B0aW9ucylcbiAgcmV0dXJuIGNvbXAudHJpbSgpXG4gICAgLnJlcGxhY2UocmVbb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSA/IHQuR1RFMFBSRSA6IHQuR1RFMF0sICcnKVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byBzdHJpbmcucmVwbGFjZShyZVt0LkhZUEhFTlJBTkdFXSlcbi8vIE0sIG0sIHBhdGNoLCBwcmVyZWxlYXNlLCBidWlsZFxuLy8gMS4yIC0gMy40LjUgPT4gPj0xLjIuMCA8PTMuNC41XG4vLyAxLjIuMyAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMC0wIEFueSAzLjQueCB3aWxsIGRvXG4vLyAxLjIgLSAzLjQgPT4gPj0xLjIuMCA8My41LjAtMFxuY29uc3QgaHlwaGVuUmVwbGFjZSA9IGluY1ByID0+ICgkMCxcbiAgZnJvbSwgZk0sIGZtLCBmcCwgZnByLCBmYixcbiAgdG8sIHRNLCB0bSwgdHAsIHRwciwgdGIpID0+IHtcbiAgaWYgKGlzWChmTSkpIHtcbiAgICBmcm9tID0gJydcbiAgfSBlbHNlIGlmIChpc1goZm0pKSB7XG4gICAgZnJvbSA9IGA+PSR7Zk19LjAuMCR7aW5jUHIgPyAnLTAnIDogJyd9YFxuICB9IGVsc2UgaWYgKGlzWChmcCkpIHtcbiAgICBmcm9tID0gYD49JHtmTX0uJHtmbX0uMCR7aW5jUHIgPyAnLTAnIDogJyd9YFxuICB9IGVsc2UgaWYgKGZwcikge1xuICAgIGZyb20gPSBgPj0ke2Zyb219YFxuICB9IGVsc2Uge1xuICAgIGZyb20gPSBgPj0ke2Zyb219JHtpbmNQciA/ICctMCcgOiAnJ31gXG4gIH1cblxuICBpZiAoaXNYKHRNKSkge1xuICAgIHRvID0gJydcbiAgfSBlbHNlIGlmIChpc1godG0pKSB7XG4gICAgdG8gPSBgPCR7K3RNICsgMX0uMC4wLTBgXG4gIH0gZWxzZSBpZiAoaXNYKHRwKSkge1xuICAgIHRvID0gYDwke3RNfS4keyt0bSArIDF9LjAtMGBcbiAgfSBlbHNlIGlmICh0cHIpIHtcbiAgICB0byA9IGA8PSR7dE19LiR7dG19LiR7dHB9LSR7dHByfWBcbiAgfSBlbHNlIGlmIChpbmNQcikge1xuICAgIHRvID0gYDwke3RNfS4ke3RtfS4keyt0cCArIDF9LTBgXG4gIH0gZWxzZSB7XG4gICAgdG8gPSBgPD0ke3RvfWBcbiAgfVxuXG4gIHJldHVybiAoYCR7ZnJvbX0gJHt0b31gKS50cmltKClcbn1cblxuY29uc3QgdGVzdFNldCA9IChzZXQsIHZlcnNpb24sIG9wdGlvbnMpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXNldFtpXS50ZXN0KHZlcnNpb24pKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAodmVyc2lvbi5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgIC8vIEZpbmQgdGhlIHNldCBvZiB2ZXJzaW9ucyB0aGF0IGFyZSBhbGxvd2VkIHRvIGhhdmUgcHJlcmVsZWFzZXNcbiAgICAvLyBGb3IgZXhhbXBsZSwgXjEuMi4zLXByLjEgZGVzdWdhcnMgdG8gPj0xLjIuMy1wci4xIDwyLjAuMFxuICAgIC8vIFRoYXQgc2hvdWxkIGFsbG93IGAxLjIuMy1wci4yYCB0byBwYXNzLlxuICAgIC8vIEhvd2V2ZXIsIGAxLjIuNC1hbHBoYS5ub3RyZWFkeWAgc2hvdWxkIE5PVCBiZSBhbGxvd2VkLFxuICAgIC8vIGV2ZW4gdGhvdWdoIGl0J3Mgd2l0aGluIHRoZSByYW5nZSBzZXQgYnkgdGhlIGNvbXBhcmF0b3JzLlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWJ1ZyhzZXRbaV0uc2VtdmVyKVxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIgPT09IENvbXBhcmF0b3IuQU5ZKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBhbGxvd2VkID0gc2V0W2ldLnNlbXZlclxuICAgICAgICBpZiAoYWxsb3dlZC5tYWpvciA9PT0gdmVyc2lvbi5tYWpvciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5taW5vciA9PT0gdmVyc2lvbi5taW5vciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5wYXRjaCA9PT0gdmVyc2lvbi5wYXRjaCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWZXJzaW9uIGhhcyBhIC1wcmUsIGJ1dCBpdCdzIG5vdCBvbmUgb2YgdGhlIG9uZXMgd2UgbGlrZS5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG4iLCJjb25zdCBBTlkgPSBTeW1ib2woJ1NlbVZlciBBTlknKVxuLy8gaG9pc3RlZCBjbGFzcyBmb3IgY3ljbGljIGRlcGVuZGVuY3lcbmNsYXNzIENvbXBhcmF0b3Ige1xuICBzdGF0aWMgZ2V0IEFOWSAoKSB7XG4gICAgcmV0dXJuIEFOWVxuICB9XG5cbiAgY29uc3RydWN0b3IgKGNvbXAsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gcGFyc2VPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBpZiAoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICAgIGlmIChjb21wLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXAgPSBjb21wLnZhbHVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVidWcoJ2NvbXBhcmF0b3InLCBjb21wLCBvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gICAgdGhpcy5wYXJzZShjb21wKVxuXG4gICAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb25cbiAgICB9XG5cbiAgICBkZWJ1ZygnY29tcCcsIHRoaXMpXG4gIH1cblxuICBwYXJzZSAoY29tcCkge1xuICAgIGNvbnN0IHIgPSB0aGlzLm9wdGlvbnMubG9vc2UgPyByZVt0LkNPTVBBUkFUT1JMT09TRV0gOiByZVt0LkNPTVBBUkFUT1JdXG4gICAgY29uc3QgbSA9IGNvbXAubWF0Y2gocilcblxuICAgIGlmICghbSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBjb21wYXJhdG9yOiAke2NvbXB9YClcbiAgICB9XG5cbiAgICB0aGlzLm9wZXJhdG9yID0gbVsxXSAhPT0gdW5kZWZpbmVkID8gbVsxXSA6ICcnXG4gICAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICc9Jykge1xuICAgICAgdGhpcy5vcGVyYXRvciA9ICcnXG4gICAgfVxuXG4gICAgLy8gaWYgaXQgbGl0ZXJhbGx5IGlzIGp1c3QgJz4nIG9yICcnIHRoZW4gYWxsb3cgYW55dGhpbmcuXG4gICAgaWYgKCFtWzJdKSB7XG4gICAgICB0aGlzLnNlbXZlciA9IEFOWVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbXZlciA9IG5ldyBTZW1WZXIobVsyXSwgdGhpcy5vcHRpb25zLmxvb3NlKVxuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVxuICB9XG5cbiAgdGVzdCAodmVyc2lvbikge1xuICAgIGRlYnVnKCdDb21wYXJhdG9yLnRlc3QnLCB2ZXJzaW9uLCB0aGlzLm9wdGlvbnMubG9vc2UpXG5cbiAgICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSB8fCB2ZXJzaW9uID09PSBBTlkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5vcHRpb25zKVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgaW50ZXJzZWN0cyAoY29tcCwgb3B0aW9ucykge1xuICAgIGlmICghKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYSBDb21wYXJhdG9yIGlzIHJlcXVpcmVkJylcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICBsb29zZTogISFvcHRpb25zLFxuICAgICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2UsXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICcnKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUmFuZ2UoY29tcC52YWx1ZSwgb3B0aW9ucykudGVzdCh0aGlzLnZhbHVlKVxuICAgIH0gZWxzZSBpZiAoY29tcC5vcGVyYXRvciA9PT0gJycpIHtcbiAgICAgIGlmIChjb21wLnZhbHVlID09PSAnJykge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBSYW5nZSh0aGlzLnZhbHVlLCBvcHRpb25zKS50ZXN0KGNvbXAuc2VtdmVyKVxuICAgIH1cblxuICAgIGNvbnN0IHNhbWVEaXJlY3Rpb25JbmNyZWFzaW5nID1cbiAgICAgICh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc+JykgJiZcbiAgICAgIChjb21wLm9wZXJhdG9yID09PSAnPj0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc+JylcbiAgICBjb25zdCBzYW1lRGlyZWN0aW9uRGVjcmVhc2luZyA9XG4gICAgICAodGhpcy5vcGVyYXRvciA9PT0gJzw9JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPCcpICYmXG4gICAgICAoY29tcC5vcGVyYXRvciA9PT0gJzw9JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPCcpXG4gICAgY29uc3Qgc2FtZVNlbVZlciA9IHRoaXMuc2VtdmVyLnZlcnNpb24gPT09IGNvbXAuc2VtdmVyLnZlcnNpb25cbiAgICBjb25zdCBkaWZmZXJlbnREaXJlY3Rpb25zSW5jbHVzaXZlID1cbiAgICAgICh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8PScpICYmXG4gICAgICAoY29tcC5vcGVyYXRvciA9PT0gJz49JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPD0nKVxuICAgIGNvbnN0IG9wcG9zaXRlRGlyZWN0aW9uc0xlc3NUaGFuID1cbiAgICAgIGNtcCh0aGlzLnNlbXZlciwgJzwnLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAgICh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc+JykgJiZcbiAgICAgICAgKGNvbXAub3BlcmF0b3IgPT09ICc8PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJzwnKVxuICAgIGNvbnN0IG9wcG9zaXRlRGlyZWN0aW9uc0dyZWF0ZXJUaGFuID1cbiAgICAgIGNtcCh0aGlzLnNlbXZlciwgJz4nLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAgICh0aGlzLm9wZXJhdG9yID09PSAnPD0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8JykgJiZcbiAgICAgICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJz4nKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIHNhbWVEaXJlY3Rpb25JbmNyZWFzaW5nIHx8XG4gICAgICBzYW1lRGlyZWN0aW9uRGVjcmVhc2luZyB8fFxuICAgICAgKHNhbWVTZW1WZXIgJiYgZGlmZmVyZW50RGlyZWN0aW9uc0luY2x1c2l2ZSkgfHxcbiAgICAgIG9wcG9zaXRlRGlyZWN0aW9uc0xlc3NUaGFuIHx8XG4gICAgICBvcHBvc2l0ZURpcmVjdGlvbnNHcmVhdGVyVGhhblxuICAgIClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBhcmF0b3JcblxuY29uc3QgcGFyc2VPcHRpb25zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGFyc2Utb3B0aW9ucycpXG5jb25zdCB7IHJlLCB0IH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9yZScpXG5jb25zdCBjbXAgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvY21wJylcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZGVidWcnKVxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi9zZW12ZXInKVxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlJylcbiIsImNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBzYXRpc2ZpZXMgPSAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgdHJ5IHtcbiAgICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gcmFuZ2UudGVzdCh2ZXJzaW9uKVxufVxubW9kdWxlLmV4cG9ydHMgPSBzYXRpc2ZpZXNcbiIsImNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5cbi8vIE1vc3RseSBqdXN0IGZvciB0ZXN0aW5nIGFuZCBsZWdhY3kgQVBJIHJlYXNvbnNcbmNvbnN0IHRvQ29tcGFyYXRvcnMgPSAocmFuZ2UsIG9wdGlvbnMpID0+XG4gIG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucykuc2V0XG4gICAgLm1hcChjb21wID0+IGNvbXAubWFwKGMgPT4gYy52YWx1ZSkuam9pbignICcpLnRyaW0oKS5zcGxpdCgnICcpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvQ29tcGFyYXRvcnNcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5cbmNvbnN0IG1heFNhdGlzZnlpbmcgPSAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSA9PiB7XG4gIGxldCBtYXggPSBudWxsXG4gIGxldCBtYXhTViA9IG51bGxcbiAgbGV0IHJhbmdlT2JqID0gbnVsbFxuICB0cnkge1xuICAgIHJhbmdlT2JqID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdmVyc2lvbnMuZm9yRWFjaCgodikgPT4ge1xuICAgIGlmIChyYW5nZU9iai50ZXN0KHYpKSB7XG4gICAgICAvLyBzYXRpc2ZpZXModiwgcmFuZ2UsIG9wdGlvbnMpXG4gICAgICBpZiAoIW1heCB8fCBtYXhTVi5jb21wYXJlKHYpID09PSAtMSkge1xuICAgICAgICAvLyBjb21wYXJlKG1heCwgdiwgdHJ1ZSlcbiAgICAgICAgbWF4ID0gdlxuICAgICAgICBtYXhTViA9IG5ldyBTZW1WZXIobWF4LCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG1heFxufVxubW9kdWxlLmV4cG9ydHMgPSBtYXhTYXRpc2Z5aW5nXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgbWluU2F0aXNmeWluZyA9ICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgbGV0IG1pbiA9IG51bGxcbiAgbGV0IG1pblNWID0gbnVsbFxuICBsZXQgcmFuZ2VPYmogPSBudWxsXG4gIHRyeSB7XG4gICAgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWluIHx8IG1pblNWLmNvbXBhcmUodikgPT09IDEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtaW4sIHYsIHRydWUpXG4gICAgICAgIG1pbiA9IHZcbiAgICAgICAgbWluU1YgPSBuZXcgU2VtVmVyKG1pbiwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtaW5cbn1cbm1vZHVsZS5leHBvcnRzID0gbWluU2F0aXNmeWluZ1xuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IGd0ID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2d0JylcblxuY29uc3QgbWluVmVyc2lvbiA9IChyYW5nZSwgbG9vc2UpID0+IHtcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKVxuXG4gIGxldCBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMC0wJylcbiAgaWYgKHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIG1pbnZlciA9IG51bGxcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXVxuXG4gICAgbGV0IHNldE1pbiA9IG51bGxcbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKChjb21wYXJhdG9yKSA9PiB7XG4gICAgICAvLyBDbG9uZSB0byBhdm9pZCBtYW5pcHVsYXRpbmcgdGhlIGNvbXBhcmF0b3IncyBzZW12ZXIgb2JqZWN0LlxuICAgICAgY29uc3QgY29tcHZlciA9IG5ldyBTZW1WZXIoY29tcGFyYXRvci5zZW12ZXIudmVyc2lvbilcbiAgICAgIHN3aXRjaCAoY29tcGFyYXRvci5vcGVyYXRvcikge1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICBpZiAoY29tcHZlci5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29tcHZlci5wYXRjaCsrXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucHJlcmVsZWFzZS5wdXNoKDApXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbXB2ZXIucmF3ID0gY29tcHZlci5mb3JtYXQoKVxuICAgICAgICAgIC8qIGZhbGx0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJyc6XG4gICAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgICBpZiAoIXNldE1pbiB8fCBndChjb21wdmVyLCBzZXRNaW4pKSB7XG4gICAgICAgICAgICBzZXRNaW4gPSBjb21wdmVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgLyogSWdub3JlIG1heGltdW0gdmVyc2lvbnMgKi9cbiAgICAgICAgICBicmVha1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBvcGVyYXRpb246ICR7Y29tcGFyYXRvci5vcGVyYXRvcn1gKVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHNldE1pbiAmJiAoIW1pbnZlciB8fCBndChtaW52ZXIsIHNldE1pbikpKSB7XG4gICAgICBtaW52ZXIgPSBzZXRNaW5cbiAgICB9XG4gIH1cblxuICBpZiAobWludmVyICYmIHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5tb2R1bGUuZXhwb3J0cyA9IG1pblZlcnNpb25cbiIsImNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCB2YWxpZFJhbmdlID0gKHJhbmdlLCBvcHRpb25zKSA9PiB7XG4gIHRyeSB7XG4gICAgLy8gUmV0dXJuICcqJyBpbnN0ZWFkIG9mICcnIHNvIHRoYXQgdHJ1dGhpbmVzcyB3b3Jrcy5cbiAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgaXQncyBpbnZhbGlkIGFueXdheVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpLnJhbmdlIHx8ICcqJ1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRSYW5nZVxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvY29tcGFyYXRvcicpXG5jb25zdCB7IEFOWSB9ID0gQ29tcGFyYXRvclxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IHNhdGlzZmllcyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9zYXRpc2ZpZXMnKVxuY29uc3QgZ3QgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvZ3QnKVxuY29uc3QgbHQgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvbHQnKVxuY29uc3QgbHRlID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2x0ZScpXG5jb25zdCBndGUgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvZ3RlJylcblxuY29uc3Qgb3V0c2lkZSA9ICh2ZXJzaW9uLCByYW5nZSwgaGlsbywgb3B0aW9ucykgPT4ge1xuICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcblxuICBsZXQgZ3RmbiwgbHRlZm4sIGx0Zm4sIGNvbXAsIGVjb21wXG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0XG4gICAgICBsdGVmbiA9IGx0ZVxuICAgICAgbHRmbiA9IGx0XG4gICAgICBjb21wID0gJz4nXG4gICAgICBlY29tcCA9ICc+PSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHRcbiAgICAgIGx0ZWZuID0gZ3RlXG4gICAgICBsdGZuID0gZ3RcbiAgICAgIGNvbXAgPSAnPCdcbiAgICAgIGVjb21wID0gJzw9J1xuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKVxuICB9XG5cbiAgLy8gSWYgaXQgc2F0aXNmaWVzIHRoZSByYW5nZSBpdCBpcyBub3Qgb3V0c2lkZVxuICBpZiAoc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldXG5cbiAgICBsZXQgaGlnaCA9IG51bGxcbiAgICBsZXQgbG93ID0gbnVsbFxuXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaCgoY29tcGFyYXRvcikgPT4ge1xuICAgICAgaWYgKGNvbXBhcmF0b3Iuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29tcGFyYXRvciA9IG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJylcbiAgICAgIH1cbiAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3JcbiAgICAgIGxvdyA9IGxvdyB8fCBjb21wYXJhdG9yXG4gICAgICBpZiAoZ3Rmbihjb21wYXJhdG9yLnNlbXZlciwgaGlnaC5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yXG4gICAgICB9IGVsc2UgaWYgKGx0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGxvdy5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGxvdyA9IGNvbXBhcmF0b3JcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gSWYgdGhlIGVkZ2UgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhIG9wZXJhdG9yIHRoZW4gb3VyIHZlcnNpb25cbiAgICAvLyBpc24ndCBvdXRzaWRlIGl0XG4gICAgaWYgKGhpZ2gub3BlcmF0b3IgPT09IGNvbXAgfHwgaGlnaC5vcGVyYXRvciA9PT0gZWNvbXApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBsb3dlc3QgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhbiBvcGVyYXRvciBhbmQgb3VyIHZlcnNpb25cbiAgICAvLyBpcyBsZXNzIHRoYW4gaXQgdGhlbiBpdCBpc24ndCBoaWdoZXIgdGhhbiB0aGUgcmFuZ2VcbiAgICBpZiAoKCFsb3cub3BlcmF0b3IgfHwgbG93Lm9wZXJhdG9yID09PSBjb21wKSAmJlxuICAgICAgICBsdGVmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG91dHNpZGVcbiIsIi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGdyZWF0ZXIgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZS5cbmNvbnN0IG91dHNpZGUgPSByZXF1aXJlKCcuL291dHNpZGUnKVxuY29uc3QgZ3RyID0gKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSA9PiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCAnPicsIG9wdGlvbnMpXG5tb2R1bGUuZXhwb3J0cyA9IGd0clxuIiwiY29uc3Qgb3V0c2lkZSA9IHJlcXVpcmUoJy4vb3V0c2lkZScpXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBsZXNzIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2VcbmNvbnN0IGx0ciA9ICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykgPT4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJzwnLCBvcHRpb25zKVxubW9kdWxlLmV4cG9ydHMgPSBsdHJcbiIsImNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBpbnRlcnNlY3RzID0gKHIxLCByMiwgb3B0aW9ucykgPT4ge1xuICByMSA9IG5ldyBSYW5nZShyMSwgb3B0aW9ucylcbiAgcjIgPSBuZXcgUmFuZ2UocjIsIG9wdGlvbnMpXG4gIHJldHVybiByMS5pbnRlcnNlY3RzKHIyKVxufVxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3RzXG4iLCIvLyBnaXZlbiBhIHNldCBvZiB2ZXJzaW9ucyBhbmQgYSByYW5nZSwgY3JlYXRlIGEgXCJzaW1wbGlmaWVkXCIgcmFuZ2Vcbi8vIHRoYXQgaW5jbHVkZXMgdGhlIHNhbWUgdmVyc2lvbnMgdGhhdCB0aGUgb3JpZ2luYWwgcmFuZ2UgZG9lc1xuLy8gSWYgdGhlIG9yaWdpbmFsIHJhbmdlIGlzIHNob3J0ZXIgdGhhbiB0aGUgc2ltcGxpZmllZCBvbmUsIHJldHVybiB0aGF0LlxuY29uc3Qgc2F0aXNmaWVzID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL3NhdGlzZmllcy5qcycpXG5jb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2NvbXBhcmUuanMnKVxubW9kdWxlLmV4cG9ydHMgPSAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHNldCA9IFtdXG4gIGxldCBmaXJzdCA9IG51bGxcbiAgbGV0IHByZXYgPSBudWxsXG4gIGNvbnN0IHYgPSB2ZXJzaW9ucy5zb3J0KChhLCBiKSA9PiBjb21wYXJlKGEsIGIsIG9wdGlvbnMpKVxuICBmb3IgKGNvbnN0IHZlcnNpb24gb2Ygdikge1xuICAgIGNvbnN0IGluY2x1ZGVkID0gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKVxuICAgIGlmIChpbmNsdWRlZCkge1xuICAgICAgcHJldiA9IHZlcnNpb25cbiAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgZmlyc3QgPSB2ZXJzaW9uXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgIHNldC5wdXNoKFtmaXJzdCwgcHJldl0pXG4gICAgICB9XG4gICAgICBwcmV2ID0gbnVsbFxuICAgICAgZmlyc3QgPSBudWxsXG4gICAgfVxuICB9XG4gIGlmIChmaXJzdCkge1xuICAgIHNldC5wdXNoKFtmaXJzdCwgbnVsbF0pXG4gIH1cblxuICBjb25zdCByYW5nZXMgPSBbXVxuICBmb3IgKGNvbnN0IFttaW4sIG1heF0gb2Ygc2V0KSB7XG4gICAgaWYgKG1pbiA9PT0gbWF4KSB7XG4gICAgICByYW5nZXMucHVzaChtaW4pXG4gICAgfSBlbHNlIGlmICghbWF4ICYmIG1pbiA9PT0gdlswXSkge1xuICAgICAgcmFuZ2VzLnB1c2goJyonKVxuICAgIH0gZWxzZSBpZiAoIW1heCkge1xuICAgICAgcmFuZ2VzLnB1c2goYD49JHttaW59YClcbiAgICB9IGVsc2UgaWYgKG1pbiA9PT0gdlswXSkge1xuICAgICAgcmFuZ2VzLnB1c2goYDw9JHttYXh9YClcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2VzLnB1c2goYCR7bWlufSAtICR7bWF4fWApXG4gICAgfVxuICB9XG4gIGNvbnN0IHNpbXBsaWZpZWQgPSByYW5nZXMuam9pbignIHx8ICcpXG4gIGNvbnN0IG9yaWdpbmFsID0gdHlwZW9mIHJhbmdlLnJhdyA9PT0gJ3N0cmluZycgPyByYW5nZS5yYXcgOiBTdHJpbmcocmFuZ2UpXG4gIHJldHVybiBzaW1wbGlmaWVkLmxlbmd0aCA8IG9yaWdpbmFsLmxlbmd0aCA/IHNpbXBsaWZpZWQgOiByYW5nZVxufVxuIiwiY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlLmpzJylcbmNvbnN0IENvbXBhcmF0b3IgPSByZXF1aXJlKCcuLi9jbGFzc2VzL2NvbXBhcmF0b3IuanMnKVxuY29uc3QgeyBBTlkgfSA9IENvbXBhcmF0b3JcbmNvbnN0IHNhdGlzZmllcyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9zYXRpc2ZpZXMuanMnKVxuY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9jb21wYXJlLmpzJylcblxuLy8gQ29tcGxleCByYW5nZSBgcjEgfHwgcjIgfHwgLi4uYCBpcyBhIHN1YnNldCBvZiBgUjEgfHwgUjIgfHwgLi4uYCBpZmY6XG4vLyAtIEV2ZXJ5IHNpbXBsZSByYW5nZSBgcjEsIHIyLCAuLi5gIGlzIGEgbnVsbCBzZXQsIE9SXG4vLyAtIEV2ZXJ5IHNpbXBsZSByYW5nZSBgcjEsIHIyLCAuLi5gIHdoaWNoIGlzIG5vdCBhIG51bGwgc2V0IGlzIGEgc3Vic2V0IG9mXG4vLyAgIHNvbWUgYFIxLCBSMiwgLi4uYFxuLy9cbi8vIFNpbXBsZSByYW5nZSBgYzEgYzIgLi4uYCBpcyBhIHN1YnNldCBvZiBzaW1wbGUgcmFuZ2UgYEMxIEMyIC4uLmAgaWZmOlxuLy8gLSBJZiBjIGlzIG9ubHkgdGhlIEFOWSBjb21wYXJhdG9yXG4vLyAgIC0gSWYgQyBpcyBvbmx5IHRoZSBBTlkgY29tcGFyYXRvciwgcmV0dXJuIHRydWVcbi8vICAgLSBFbHNlIGlmIGluIHByZXJlbGVhc2UgbW9kZSwgcmV0dXJuIGZhbHNlXG4vLyAgIC0gZWxzZSByZXBsYWNlIGMgd2l0aCBgWz49MC4wLjBdYFxuLy8gLSBJZiBDIGlzIG9ubHkgdGhlIEFOWSBjb21wYXJhdG9yXG4vLyAgIC0gaWYgaW4gcHJlcmVsZWFzZSBtb2RlLCByZXR1cm4gdHJ1ZVxuLy8gICAtIGVsc2UgcmVwbGFjZSBDIHdpdGggYFs+PTAuMC4wXWBcbi8vIC0gTGV0IEVRIGJlIHRoZSBzZXQgb2YgPSBjb21wYXJhdG9ycyBpbiBjXG4vLyAtIElmIEVRIGlzIG1vcmUgdGhhbiBvbmUsIHJldHVybiB0cnVlIChudWxsIHNldClcbi8vIC0gTGV0IEdUIGJlIHRoZSBoaWdoZXN0ID4gb3IgPj0gY29tcGFyYXRvciBpbiBjXG4vLyAtIExldCBMVCBiZSB0aGUgbG93ZXN0IDwgb3IgPD0gY29tcGFyYXRvciBpbiBjXG4vLyAtIElmIEdUIGFuZCBMVCwgYW5kIEdULnNlbXZlciA+IExULnNlbXZlciwgcmV0dXJuIHRydWUgKG51bGwgc2V0KVxuLy8gLSBJZiBhbnkgQyBpcyBhID0gcmFuZ2UsIGFuZCBHVCBvciBMVCBhcmUgc2V0LCByZXR1cm4gZmFsc2Vcbi8vIC0gSWYgRVFcbi8vICAgLSBJZiBHVCwgYW5kIEVRIGRvZXMgbm90IHNhdGlzZnkgR1QsIHJldHVybiB0cnVlIChudWxsIHNldClcbi8vICAgLSBJZiBMVCwgYW5kIEVRIGRvZXMgbm90IHNhdGlzZnkgTFQsIHJldHVybiB0cnVlIChudWxsIHNldClcbi8vICAgLSBJZiBFUSBzYXRpc2ZpZXMgZXZlcnkgQywgcmV0dXJuIHRydWVcbi8vICAgLSBFbHNlIHJldHVybiBmYWxzZVxuLy8gLSBJZiBHVFxuLy8gICAtIElmIEdULnNlbXZlciBpcyBsb3dlciB0aGFuIGFueSA+IG9yID49IGNvbXAgaW4gQywgcmV0dXJuIGZhbHNlXG4vLyAgIC0gSWYgR1QgaXMgPj0sIGFuZCBHVC5zZW12ZXIgZG9lcyBub3Qgc2F0aXNmeSBldmVyeSBDLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBJZiBHVC5zZW12ZXIgaGFzIGEgcHJlcmVsZWFzZSwgYW5kIG5vdCBpbiBwcmVyZWxlYXNlIG1vZGVcbi8vICAgICAtIElmIG5vIEMgaGFzIGEgcHJlcmVsZWFzZSBhbmQgdGhlIEdULnNlbXZlciB0dXBsZSwgcmV0dXJuIGZhbHNlXG4vLyAtIElmIExUXG4vLyAgIC0gSWYgTFQuc2VtdmVyIGlzIGdyZWF0ZXIgdGhhbiBhbnkgPCBvciA8PSBjb21wIGluIEMsIHJldHVybiBmYWxzZVxuLy8gICAtIElmIExUIGlzIDw9LCBhbmQgTFQuc2VtdmVyIGRvZXMgbm90IHNhdGlzZnkgZXZlcnkgQywgcmV0dXJuIGZhbHNlXG4vLyAgIC0gSWYgR1Quc2VtdmVyIGhhcyBhIHByZXJlbGVhc2UsIGFuZCBub3QgaW4gcHJlcmVsZWFzZSBtb2RlXG4vLyAgICAgLSBJZiBubyBDIGhhcyBhIHByZXJlbGVhc2UgYW5kIHRoZSBMVC5zZW12ZXIgdHVwbGUsIHJldHVybiBmYWxzZVxuLy8gLSBFbHNlIHJldHVybiB0cnVlXG5cbmNvbnN0IHN1YnNldCA9IChzdWIsIGRvbSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmIChzdWIgPT09IGRvbSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBzdWIgPSBuZXcgUmFuZ2Uoc3ViLCBvcHRpb25zKVxuICBkb20gPSBuZXcgUmFuZ2UoZG9tLCBvcHRpb25zKVxuICBsZXQgc2F3Tm9uTnVsbCA9IGZhbHNlXG5cbiAgT1VURVI6IGZvciAoY29uc3Qgc2ltcGxlU3ViIG9mIHN1Yi5zZXQpIHtcbiAgICBmb3IgKGNvbnN0IHNpbXBsZURvbSBvZiBkb20uc2V0KSB7XG4gICAgICBjb25zdCBpc1N1YiA9IHNpbXBsZVN1YnNldChzaW1wbGVTdWIsIHNpbXBsZURvbSwgb3B0aW9ucylcbiAgICAgIHNhd05vbk51bGwgPSBzYXdOb25OdWxsIHx8IGlzU3ViICE9PSBudWxsXG4gICAgICBpZiAoaXNTdWIpIHtcbiAgICAgICAgY29udGludWUgT1VURVJcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdGhlIG51bGwgc2V0IGlzIGEgc3Vic2V0IG9mIGV2ZXJ5dGhpbmcsIGJ1dCBudWxsIHNpbXBsZSByYW5nZXMgaW5cbiAgICAvLyBhIGNvbXBsZXggcmFuZ2Ugc2hvdWxkIGJlIGlnbm9yZWQuICBzbyBpZiB3ZSBzYXcgYSBub24tbnVsbCByYW5nZSxcbiAgICAvLyB0aGVuIHdlIGtub3cgdGhpcyBpc24ndCBhIHN1YnNldCwgYnV0IGlmIEVWRVJZIHNpbXBsZSByYW5nZSB3YXMgbnVsbCxcbiAgICAvLyB0aGVuIGl0IGlzIGEgc3Vic2V0LlxuICAgIGlmIChzYXdOb25OdWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3Qgc2ltcGxlU3Vic2V0ID0gKHN1YiwgZG9tLCBvcHRpb25zKSA9PiB7XG4gIGlmIChzdWIgPT09IGRvbSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoc3ViLmxlbmd0aCA9PT0gMSAmJiBzdWJbMF0uc2VtdmVyID09PSBBTlkpIHtcbiAgICBpZiAoZG9tLmxlbmd0aCA9PT0gMSAmJiBkb21bMF0uc2VtdmVyID09PSBBTlkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSB7XG4gICAgICBzdWIgPSBbbmV3IENvbXBhcmF0b3IoJz49MC4wLjAtMCcpXVxuICAgIH0gZWxzZSB7XG4gICAgICBzdWIgPSBbbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKV1cbiAgICB9XG4gIH1cblxuICBpZiAoZG9tLmxlbmd0aCA9PT0gMSAmJiBkb21bMF0uc2VtdmVyID09PSBBTlkpIHtcbiAgICBpZiAob3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tID0gW25ldyBDb21wYXJhdG9yKCc+PTAuMC4wJyldXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZXFTZXQgPSBuZXcgU2V0KClcbiAgbGV0IGd0LCBsdFxuICBmb3IgKGNvbnN0IGMgb2Ygc3ViKSB7XG4gICAgaWYgKGMub3BlcmF0b3IgPT09ICc+JyB8fCBjLm9wZXJhdG9yID09PSAnPj0nKSB7XG4gICAgICBndCA9IGhpZ2hlckdUKGd0LCBjLCBvcHRpb25zKVxuICAgIH0gZWxzZSBpZiAoYy5vcGVyYXRvciA9PT0gJzwnIHx8IGMub3BlcmF0b3IgPT09ICc8PScpIHtcbiAgICAgIGx0ID0gbG93ZXJMVChsdCwgYywgb3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgZXFTZXQuYWRkKGMuc2VtdmVyKVxuICAgIH1cbiAgfVxuXG4gIGlmIChlcVNldC5zaXplID4gMSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBsZXQgZ3RsdENvbXBcbiAgaWYgKGd0ICYmIGx0KSB7XG4gICAgZ3RsdENvbXAgPSBjb21wYXJlKGd0LnNlbXZlciwgbHQuc2VtdmVyLCBvcHRpb25zKVxuICAgIGlmIChndGx0Q29tcCA+IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfSBlbHNlIGlmIChndGx0Q29tcCA9PT0gMCAmJiAoZ3Qub3BlcmF0b3IgIT09ICc+PScgfHwgbHQub3BlcmF0b3IgIT09ICc8PScpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8vIHdpbGwgaXRlcmF0ZSBvbmUgb3IgemVybyB0aW1lc1xuICBmb3IgKGNvbnN0IGVxIG9mIGVxU2V0KSB7XG4gICAgaWYgKGd0ICYmICFzYXRpc2ZpZXMoZXEsIFN0cmluZyhndCksIG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGlmIChsdCAmJiAhc2F0aXNmaWVzKGVxLCBTdHJpbmcobHQpLCBvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGMgb2YgZG9tKSB7XG4gICAgICBpZiAoIXNhdGlzZmllcyhlcSwgU3RyaW5nKGMpLCBvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgbGV0IGhpZ2hlciwgbG93ZXJcbiAgbGV0IGhhc0RvbUxULCBoYXNEb21HVFxuICAvLyBpZiB0aGUgc3Vic2V0IGhhcyBhIHByZXJlbGVhc2UsIHdlIG5lZWQgYSBjb21wYXJhdG9yIGluIHRoZSBzdXBlcnNldFxuICAvLyB3aXRoIHRoZSBzYW1lIHR1cGxlIGFuZCBhIHByZXJlbGVhc2UsIG9yIGl0J3Mgbm90IGEgc3Vic2V0XG4gIGxldCBuZWVkRG9tTFRQcmUgPSBsdCAmJlxuICAgICFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlICYmXG4gICAgbHQuc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID8gbHQuc2VtdmVyIDogZmFsc2VcbiAgbGV0IG5lZWREb21HVFByZSA9IGd0ICYmXG4gICAgIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgJiZcbiAgICBndC5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPyBndC5zZW12ZXIgOiBmYWxzZVxuICAvLyBleGNlcHRpb246IDwxLjIuMy0wIGlzIHRoZSBzYW1lIGFzIDwxLjIuM1xuICBpZiAobmVlZERvbUxUUHJlICYmIG5lZWREb21MVFByZS5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgbHQub3BlcmF0b3IgPT09ICc8JyAmJiBuZWVkRG9tTFRQcmUucHJlcmVsZWFzZVswXSA9PT0gMCkge1xuICAgIG5lZWREb21MVFByZSA9IGZhbHNlXG4gIH1cblxuICBmb3IgKGNvbnN0IGMgb2YgZG9tKSB7XG4gICAgaGFzRG9tR1QgPSBoYXNEb21HVCB8fCBjLm9wZXJhdG9yID09PSAnPicgfHwgYy5vcGVyYXRvciA9PT0gJz49J1xuICAgIGhhc0RvbUxUID0gaGFzRG9tTFQgfHwgYy5vcGVyYXRvciA9PT0gJzwnIHx8IGMub3BlcmF0b3IgPT09ICc8PSdcbiAgICBpZiAoZ3QpIHtcbiAgICAgIGlmIChuZWVkRG9tR1RQcmUpIHtcbiAgICAgICAgaWYgKGMuc2VtdmVyLnByZXJlbGVhc2UgJiYgYy5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1ham9yID09PSBuZWVkRG9tR1RQcmUubWFqb3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1pbm9yID09PSBuZWVkRG9tR1RQcmUubWlub3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLnBhdGNoID09PSBuZWVkRG9tR1RQcmUucGF0Y2gpIHtcbiAgICAgICAgICBuZWVkRG9tR1RQcmUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYy5vcGVyYXRvciA9PT0gJz4nIHx8IGMub3BlcmF0b3IgPT09ICc+PScpIHtcbiAgICAgICAgaGlnaGVyID0gaGlnaGVyR1QoZ3QsIGMsIG9wdGlvbnMpXG4gICAgICAgIGlmIChoaWdoZXIgPT09IGMgJiYgaGlnaGVyICE9PSBndCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGd0Lm9wZXJhdG9yID09PSAnPj0nICYmICFzYXRpc2ZpZXMoZ3Quc2VtdmVyLCBTdHJpbmcoYyksIG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobHQpIHtcbiAgICAgIGlmIChuZWVkRG9tTFRQcmUpIHtcbiAgICAgICAgaWYgKGMuc2VtdmVyLnByZXJlbGVhc2UgJiYgYy5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1ham9yID09PSBuZWVkRG9tTFRQcmUubWFqb3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1pbm9yID09PSBuZWVkRG9tTFRQcmUubWlub3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLnBhdGNoID09PSBuZWVkRG9tTFRQcmUucGF0Y2gpIHtcbiAgICAgICAgICBuZWVkRG9tTFRQcmUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYy5vcGVyYXRvciA9PT0gJzwnIHx8IGMub3BlcmF0b3IgPT09ICc8PScpIHtcbiAgICAgICAgbG93ZXIgPSBsb3dlckxUKGx0LCBjLCBvcHRpb25zKVxuICAgICAgICBpZiAobG93ZXIgPT09IGMgJiYgbG93ZXIgIT09IGx0KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobHQub3BlcmF0b3IgPT09ICc8PScgJiYgIXNhdGlzZmllcyhsdC5zZW12ZXIsIFN0cmluZyhjKSwgb3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghYy5vcGVyYXRvciAmJiAobHQgfHwgZ3QpICYmIGd0bHRDb21wICE9PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGVyZSB3YXMgYSA8IG9yID4sIGFuZCBub3RoaW5nIGluIHRoZSBkb20sIHRoZW4gbXVzdCBiZSBmYWxzZVxuICAvLyBVTkxFU1MgaXQgd2FzIGxpbWl0ZWQgYnkgYW5vdGhlciByYW5nZSBpbiB0aGUgb3RoZXIgZGlyZWN0aW9uLlxuICAvLyBFZywgPjEuMC4wIDwxLjAuMSBpcyBzdGlsbCBhIHN1YnNldCBvZiA8Mi4wLjBcbiAgaWYgKGd0ICYmIGhhc0RvbUxUICYmICFsdCAmJiBndGx0Q29tcCAhPT0gMCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKGx0ICYmIGhhc0RvbUdUICYmICFndCAmJiBndGx0Q29tcCAhPT0gMCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gd2UgbmVlZGVkIGEgcHJlcmVsZWFzZSByYW5nZSBpbiBhIHNwZWNpZmljIHR1cGxlLCBidXQgZGlkbid0IGdldCBvbmVcbiAgLy8gdGhlbiB0aGlzIGlzbid0IGEgc3Vic2V0LiAgZWcgPj0xLjIuMy1wcmUgaXMgbm90IGEgc3Vic2V0IG9mID49MS4wLjAsXG4gIC8vIGJlY2F1c2UgaXQgaW5jbHVkZXMgcHJlcmVsZWFzZXMgaW4gdGhlIDEuMi4zIHR1cGxlXG4gIGlmIChuZWVkRG9tR1RQcmUgfHwgbmVlZERvbUxUUHJlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyA+PTEuMi4zIGlzIGxvd2VyIHRoYW4gPjEuMi4zXG5jb25zdCBoaWdoZXJHVCA9IChhLCBiLCBvcHRpb25zKSA9PiB7XG4gIGlmICghYSkge1xuICAgIHJldHVybiBiXG4gIH1cbiAgY29uc3QgY29tcCA9IGNvbXBhcmUoYS5zZW12ZXIsIGIuc2VtdmVyLCBvcHRpb25zKVxuICByZXR1cm4gY29tcCA+IDAgPyBhXG4gICAgOiBjb21wIDwgMCA/IGJcbiAgICA6IGIub3BlcmF0b3IgPT09ICc+JyAmJiBhLm9wZXJhdG9yID09PSAnPj0nID8gYlxuICAgIDogYVxufVxuXG4vLyA8PTEuMi4zIGlzIGhpZ2hlciB0aGFuIDwxLjIuM1xuY29uc3QgbG93ZXJMVCA9IChhLCBiLCBvcHRpb25zKSA9PiB7XG4gIGlmICghYSkge1xuICAgIHJldHVybiBiXG4gIH1cbiAgY29uc3QgY29tcCA9IGNvbXBhcmUoYS5zZW12ZXIsIGIuc2VtdmVyLCBvcHRpb25zKVxuICByZXR1cm4gY29tcCA8IDAgPyBhXG4gICAgOiBjb21wID4gMCA/IGJcbiAgICA6IGIub3BlcmF0b3IgPT09ICc8JyAmJiBhLm9wZXJhdG9yID09PSAnPD0nID8gYlxuICAgIDogYVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YnNldFxuIiwiLy8ganVzdCBwcmUtbG9hZCBhbGwgdGhlIHN0dWZmIHRoYXQgaW5kZXguanMgbGF6aWx5IGV4cG9ydHNcbmNvbnN0IGludGVybmFsUmUgPSByZXF1aXJlKCcuL2ludGVybmFsL3JlJylcbm1vZHVsZS5leHBvcnRzID0ge1xuICByZTogaW50ZXJuYWxSZS5yZSxcbiAgc3JjOiBpbnRlcm5hbFJlLnNyYyxcbiAgdG9rZW5zOiBpbnRlcm5hbFJlLnQsXG4gIFNFTVZFUl9TUEVDX1ZFUlNJT046IHJlcXVpcmUoJy4vaW50ZXJuYWwvY29uc3RhbnRzJykuU0VNVkVSX1NQRUNfVkVSU0lPTixcbiAgU2VtVmVyOiByZXF1aXJlKCcuL2NsYXNzZXMvc2VtdmVyJyksXG4gIGNvbXBhcmVJZGVudGlmaWVyczogcmVxdWlyZSgnLi9pbnRlcm5hbC9pZGVudGlmaWVycycpLmNvbXBhcmVJZGVudGlmaWVycyxcbiAgcmNvbXBhcmVJZGVudGlmaWVyczogcmVxdWlyZSgnLi9pbnRlcm5hbC9pZGVudGlmaWVycycpLnJjb21wYXJlSWRlbnRpZmllcnMsXG4gIHBhcnNlOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9wYXJzZScpLFxuICB2YWxpZDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvdmFsaWQnKSxcbiAgY2xlYW46IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NsZWFuJyksXG4gIGluYzogcmVxdWlyZSgnLi9mdW5jdGlvbnMvaW5jJyksXG4gIGRpZmY6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2RpZmYnKSxcbiAgbWFqb3I6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL21ham9yJyksXG4gIG1pbm9yOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9taW5vcicpLFxuICBwYXRjaDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvcGF0Y2gnKSxcbiAgcHJlcmVsZWFzZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvcHJlcmVsZWFzZScpLFxuICBjb21wYXJlOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb21wYXJlJyksXG4gIHJjb21wYXJlOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9yY29tcGFyZScpLFxuICBjb21wYXJlTG9vc2U6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NvbXBhcmUtbG9vc2UnKSxcbiAgY29tcGFyZUJ1aWxkOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb21wYXJlLWJ1aWxkJyksXG4gIHNvcnQ6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3NvcnQnKSxcbiAgcnNvcnQ6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3Jzb3J0JyksXG4gIGd0OiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9ndCcpLFxuICBsdDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvbHQnKSxcbiAgZXE6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2VxJyksXG4gIG5lcTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvbmVxJyksXG4gIGd0ZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvZ3RlJyksXG4gIGx0ZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvbHRlJyksXG4gIGNtcDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvY21wJyksXG4gIGNvZXJjZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvY29lcmNlJyksXG4gIENvbXBhcmF0b3I6IHJlcXVpcmUoJy4vY2xhc3Nlcy9jb21wYXJhdG9yJyksXG4gIFJhbmdlOiByZXF1aXJlKCcuL2NsYXNzZXMvcmFuZ2UnKSxcbiAgc2F0aXNmaWVzOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9zYXRpc2ZpZXMnKSxcbiAgdG9Db21wYXJhdG9yczogcmVxdWlyZSgnLi9yYW5nZXMvdG8tY29tcGFyYXRvcnMnKSxcbiAgbWF4U2F0aXNmeWluZzogcmVxdWlyZSgnLi9yYW5nZXMvbWF4LXNhdGlzZnlpbmcnKSxcbiAgbWluU2F0aXNmeWluZzogcmVxdWlyZSgnLi9yYW5nZXMvbWluLXNhdGlzZnlpbmcnKSxcbiAgbWluVmVyc2lvbjogcmVxdWlyZSgnLi9yYW5nZXMvbWluLXZlcnNpb24nKSxcbiAgdmFsaWRSYW5nZTogcmVxdWlyZSgnLi9yYW5nZXMvdmFsaWQnKSxcbiAgb3V0c2lkZTogcmVxdWlyZSgnLi9yYW5nZXMvb3V0c2lkZScpLFxuICBndHI6IHJlcXVpcmUoJy4vcmFuZ2VzL2d0cicpLFxuICBsdHI6IHJlcXVpcmUoJy4vcmFuZ2VzL2x0cicpLFxuICBpbnRlcnNlY3RzOiByZXF1aXJlKCcuL3Jhbmdlcy9pbnRlcnNlY3RzJyksXG4gIHNpbXBsaWZ5UmFuZ2U6IHJlcXVpcmUoJy4vcmFuZ2VzL3NpbXBsaWZ5JyksXG4gIHN1YnNldDogcmVxdWlyZSgnLi9yYW5nZXMvc3Vic2V0JyksXG59XG4iXSwibmFtZXMiOlsiTUFYX0xFTkdUSCIsIk1BWF9TQUZFX0lOVEVHRVIiLCJkZWJ1ZyIsIk1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEgiLCJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsInJlIiwidCIsInBhcnNlT3B0aW9ucyIsImNvbXBhcmVJZGVudGlmaWVycyIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwicmVxdWlyZSQkNCIsIlNlbVZlciIsInNlbXZlciIsInBhcnNlIiwidmFsaWQiLCJjb21wYXJlIiwiZXEiLCJjb21wYXJlQnVpbGQiLCJndCIsImx0IiwibmVxIiwiZ3RlIiwibHRlIiwicmVxdWlyZSQkNSIsImNtcCIsIllhbGxpc3QiLCJkaWZmIiwiUmFuZ2UiLCJyYW5nZSIsIkNvbXBhcmF0b3IiLCJBTlkiLCJzYXRpc2ZpZXMiLCJjb21wYXJhdG9yIiwicmVxdWlyZSQkNiIsInJlcXVpcmUkJDciLCJvdXRzaWRlIiwicmVxdWlyZSQkOCIsInJlcXVpcmUkJDkiLCJyZXF1aXJlJCQxMCIsInJlcXVpcmUkJDExIiwicmVxdWlyZSQkMTIiLCJyZXF1aXJlJCQxMyIsInJlcXVpcmUkJDE0IiwicmVxdWlyZSQkMTUiLCJyZXF1aXJlJCQxNiIsInJlcXVpcmUkJDE3IiwicmVxdWlyZSQkMTgiLCJyZXF1aXJlJCQxOSIsInJlcXVpcmUkJDIwIiwicmVxdWlyZSQkMjEiLCJyZXF1aXJlJCQyMiIsInJlcXVpcmUkJDIzIiwicmVxdWlyZSQkMjQiLCJyZXF1aXJlJCQyNSIsInJlcXVpcmUkJDI2IiwicmVxdWlyZSQkMjciLCJyZXF1aXJlJCQyOCIsInJlcXVpcmUkJDI5IiwicmVxdWlyZSQkMzAiLCJyZXF1aXJlJCQzMSIsInJlcXVpcmUkJDMyIiwicmVxdWlyZSQkMzMiLCJyZXF1aXJlJCQzNCIsInJlcXVpcmUkJDM1IiwicmVxdWlyZSQkMzYiLCJyZXF1aXJlJCQzNyIsInJlcXVpcmUkJDM4IiwicmVxdWlyZSQkMzkiLCJyZXF1aXJlJCQ0MCJdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sc0JBQXNCO0FBRTVCLE1BQU1BLGVBQWE7QUFDbkIsTUFBTUMscUJBQW1CLE9BQU8sb0JBQ0w7QUFHM0IsTUFBTSw0QkFBNEI7QUFFbEMsSUFBQSxZQUFpQjtBQUFBLEVBQ2Y7QUFBQSxFQUNGLFlBQUVEO0FBQUFBLEVBQ0Ysa0JBQUVDO0FBQUFBLEVBQ0E7QUFDRjtBQ2hCQSxNQUFNQyxVQUNKLE9BQU8sWUFBWSxZQUNuQixRQUFRLE9BQ1IsQ0FBQSxFQUFZLGNBQ1osY0FBYyxLQUFLLENBQUEsRUFBWSxVQUFVLElBQ3ZDLElBQUksU0FBUyxRQUFRLE1BQU0sVUFBVSxHQUFHLElBQUksSUFDNUMsTUFBTTtBQUFFO0FBRVosSUFBQSxVQUFpQkE7QUFBQUE7QUNSakIsUUFBTSxFQUFFLDJCQUFBQywyQkFBMkIsSUFBR0M7QUFDdEMsUUFBTUYsU0FBUUc7QUFDZCxZQUFVLGlCQUFpQixDQUFFO0FBRzdCLFFBQU1DLE1BQUssUUFBQSxLQUFhLENBQUU7QUFDMUIsUUFBTSxNQUFNLFFBQUEsTUFBYyxDQUFFO0FBQzVCLFFBQU1DLEtBQUksUUFBQSxJQUFZLENBQUU7QUFDeEIsTUFBSSxJQUFJO0FBRVIsUUFBTSxjQUFjLENB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
