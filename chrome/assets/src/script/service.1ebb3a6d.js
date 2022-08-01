import "../../index.5cb01ff5.js";
import { bK as create_store_class, bL as SI_STORE_APP_POLICIES, bM as WritableStore, bN as SI_STORE_SETTINGS, bO as WritableStoreDict, bP as session_storage_get, X as XT_SECONDS, bJ as session_storage_remove, W as WebResourceCache, V as Vault, u as Accounts, ar as Chains, bi as Networks, I as ode, bQ as global_broadcast, a$ as syserr, F as global_receive, aM as XT_MINUTES, bR as fold_attrs, bS as R_TRANSFER_AMOUNT, bT as syswarn, aL as BigNumber, aO as format_amount, aT as Agents, bU as abbreviate_addr, q as buffer_to_base64, bV as sha256_sync, bW as text_to_buffer, E as Events, bh as Apps, bH as R_DOMAIN_LOCALHOST } from "../../web-resource-cache.58aa6c5e.js";
function IcsHost({
  session: sh_session
}) {
  const hmacSHA256 = function() {
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    var hmacSha256$1 = { exports: {} };
    function commonjsRequire(path) {
      throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }
    var core = { exports: {} };
    var hasRequiredCore;
    function requireCore() {
      if (hasRequiredCore)
        return core.exports;
      hasRequiredCore = 1;
      (function(module, exports) {
        (function(root, factory) {
          {
            module.exports = factory();
          }
        })(commonjsGlobal, function() {
          var CryptoJS = CryptoJS || function(Math2, undefined$1) {
            var crypto2;
            if (typeof window !== "undefined" && window.crypto) {
              crypto2 = window.crypto;
            }
            if (typeof self !== "undefined" && self.crypto) {
              crypto2 = self.crypto;
            }
            if (typeof globalThis !== "undefined" && globalThis.crypto) {
              crypto2 = globalThis.crypto;
            }
            if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
              crypto2 = window.msCrypto;
            }
            if (!crypto2 && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
              crypto2 = commonjsGlobal.crypto;
            }
            if (!crypto2 && typeof commonjsRequire === "function") {
              try {
                crypto2 = require("crypto");
              } catch (err) {
              }
            }
            var cryptoSecureRandomInt = function() {
              if (crypto2) {
                if (typeof crypto2.getRandomValues === "function") {
                  try {
                    return crypto2.getRandomValues(new Uint32Array(1))[0];
                  } catch (err) {
                  }
                }
                if (typeof crypto2.randomBytes === "function") {
                  try {
                    return crypto2.randomBytes(4).readInt32LE();
                  } catch (err) {
                  }
                }
              }
              throw new Error("Native crypto module could not be used to get secure random number.");
            };
            var create = Object.create || function() {
              function F() {
              }
              return function(obj) {
                var subtype;
                F.prototype = obj;
                subtype = new F();
                F.prototype = null;
                return subtype;
              };
            }();
            var C = {};
            var C_lib = C.lib = {};
            var Base = C_lib.Base = function() {
              return {
                extend: function(overrides) {
                  var subtype = create(this);
                  if (overrides) {
                    subtype.mixIn(overrides);
                  }
                  if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                    subtype.init = function() {
                      subtype.$super.init.apply(this, arguments);
                    };
                  }
                  subtype.init.prototype = subtype;
                  subtype.$super = this;
                  return subtype;
                },
                create: function() {
                  var instance = this.extend();
                  instance.init.apply(instance, arguments);
                  return instance;
                },
                init: function() {
                },
                mixIn: function(properties) {
                  for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                      this[propertyName] = properties[propertyName];
                    }
                  }
                  if (properties.hasOwnProperty("toString")) {
                    this.toString = properties.toString;
                  }
                },
                clone: function() {
                  return this.init.prototype.extend(this);
                }
              };
            }();
            var WordArray = C_lib.WordArray = Base.extend({
              init: function(words, sigBytes) {
                words = this.words = words || [];
                if (sigBytes != undefined$1) {
                  this.sigBytes = sigBytes;
                } else {
                  this.sigBytes = words.length * 4;
                }
              },
              toString: function(encoder) {
                return (encoder || Hex).stringify(this);
              },
              concat: function(wordArray) {
                var thisWords = this.words;
                var thatWords = wordArray.words;
                var thisSigBytes = this.sigBytes;
                var thatSigBytes = wordArray.sigBytes;
                this.clamp();
                if (thisSigBytes % 4) {
                  for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                  }
                } else {
                  for (var j = 0; j < thatSigBytes; j += 4) {
                    thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                  }
                }
                this.sigBytes += thatSigBytes;
                return this;
              },
              clamp: function() {
                var words = this.words;
                var sigBytes = this.sigBytes;
                words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
                words.length = Math2.ceil(sigBytes / 4);
              },
              clone: function() {
                var clone = Base.clone.call(this);
                clone.words = this.words.slice(0);
                return clone;
              },
              random: function(nBytes) {
                var words = [];
                for (var i = 0; i < nBytes; i += 4) {
                  words.push(cryptoSecureRandomInt());
                }
                return new WordArray.init(words, nBytes);
              }
            });
            var C_enc = C.enc = {};
            var Hex = C_enc.Hex = {
              stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var hexChars = [];
                for (var i = 0; i < sigBytes; i++) {
                  var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  hexChars.push((bite >>> 4).toString(16));
                  hexChars.push((bite & 15).toString(16));
                }
                return hexChars.join("");
              },
              parse: function(hexStr) {
                var hexStrLength = hexStr.length;
                var words = [];
                for (var i = 0; i < hexStrLength; i += 2) {
                  words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
                }
                return new WordArray.init(words, hexStrLength / 2);
              }
            };
            var Latin1 = C_enc.Latin1 = {
              stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var latin1Chars = [];
                for (var i = 0; i < sigBytes; i++) {
                  var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  latin1Chars.push(String.fromCharCode(bite));
                }
                return latin1Chars.join("");
              },
              parse: function(latin1Str) {
                var latin1StrLength = latin1Str.length;
                var words = [];
                for (var i = 0; i < latin1StrLength; i++) {
                  words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
                }
                return new WordArray.init(words, latin1StrLength);
              }
            };
            var Utf8 = C_enc.Utf8 = {
              stringify: function(wordArray) {
                try {
                  return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                  throw new Error("Malformed UTF-8 data");
                }
              },
              parse: function(utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
              }
            };
            var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
              reset: function() {
                this._data = new WordArray.init();
                this._nDataBytes = 0;
              },
              _append: function(data) {
                if (typeof data == "string") {
                  data = Utf8.parse(data);
                }
                this._data.concat(data);
                this._nDataBytes += data.sigBytes;
              },
              _process: function(doFlush) {
                var processedWords;
                var data = this._data;
                var dataWords = data.words;
                var dataSigBytes = data.sigBytes;
                var blockSize = this.blockSize;
                var blockSizeBytes = blockSize * 4;
                var nBlocksReady = dataSigBytes / blockSizeBytes;
                if (doFlush) {
                  nBlocksReady = Math2.ceil(nBlocksReady);
                } else {
                  nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
                }
                var nWordsReady = nBlocksReady * blockSize;
                var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
                if (nWordsReady) {
                  for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    this._doProcessBlock(dataWords, offset);
                  }
                  processedWords = dataWords.splice(0, nWordsReady);
                  data.sigBytes -= nBytesReady;
                }
                return new WordArray.init(processedWords, nBytesReady);
              },
              clone: function() {
                var clone = Base.clone.call(this);
                clone._data = this._data.clone();
                return clone;
              },
              _minBufferSize: 0
            });
            C_lib.Hasher = BufferedBlockAlgorithm.extend({
              cfg: Base.extend(),
              init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
                this.reset();
              },
              reset: function() {
                BufferedBlockAlgorithm.reset.call(this);
                this._doReset();
              },
              update: function(messageUpdate) {
                this._append(messageUpdate);
                this._process();
                return this;
              },
              finalize: function(messageUpdate) {
                if (messageUpdate) {
                  this._append(messageUpdate);
                }
                var hash = this._doFinalize();
                return hash;
              },
              blockSize: 512 / 32,
              _createHelper: function(hasher) {
                return function(message, cfg) {
                  return new hasher.init(cfg).finalize(message);
                };
              },
              _createHmacHelper: function(hasher) {
                return function(message, key) {
                  return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
              }
            });
            var C_algo = C.algo = {};
            return C;
          }(Math);
          return CryptoJS;
        });
      })(core);
      return core.exports;
    }
    var sha256 = { exports: {} };
    var hasRequiredSha256;
    function requireSha256() {
      if (hasRequiredSha256)
        return sha256.exports;
      hasRequiredSha256 = 1;
      (function(module, exports) {
        (function(root, factory) {
          {
            module.exports = factory(requireCore());
          }
        })(commonjsGlobal, function(CryptoJS) {
          (function(Math2) {
            var C = CryptoJS;
            var C_lib = C.lib;
            var WordArray = C_lib.WordArray;
            var Hasher = C_lib.Hasher;
            var C_algo = C.algo;
            var H = [];
            var K = [];
            (function() {
              function isPrime(n2) {
                var sqrtN = Math2.sqrt(n2);
                for (var factor = 2; factor <= sqrtN; factor++) {
                  if (!(n2 % factor)) {
                    return false;
                  }
                }
                return true;
              }
              function getFractionalBits(n2) {
                return (n2 - (n2 | 0)) * 4294967296 | 0;
              }
              var n = 2;
              var nPrime = 0;
              while (nPrime < 64) {
                if (isPrime(n)) {
                  if (nPrime < 8) {
                    H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
                  }
                  K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
                  nPrime++;
                }
                n++;
              }
            })();
            var W = [];
            var SHA256 = C_algo.SHA256 = Hasher.extend({
              _doReset: function() {
                this._hash = new WordArray.init(H.slice(0));
              },
              _doProcessBlock: function(M, offset) {
                var H2 = this._hash.words;
                var a = H2[0];
                var b = H2[1];
                var c = H2[2];
                var d = H2[3];
                var e = H2[4];
                var f = H2[5];
                var g = H2[6];
                var h = H2[7];
                for (var i = 0; i < 64; i++) {
                  if (i < 16) {
                    W[i] = M[offset + i] | 0;
                  } else {
                    var gamma0x = W[i - 15];
                    var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                    var gamma1x = W[i - 2];
                    var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                  }
                  var ch = e & f ^ ~e & g;
                  var maj = a & b ^ a & c ^ b & c;
                  var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                  var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                  var t1 = h + sigma1 + ch + K[i] + W[i];
                  var t2 = sigma0 + maj;
                  h = g;
                  g = f;
                  f = e;
                  e = d + t1 | 0;
                  d = c;
                  c = b;
                  b = a;
                  a = t1 + t2 | 0;
                }
                H2[0] = H2[0] + a | 0;
                H2[1] = H2[1] + b | 0;
                H2[2] = H2[2] + c | 0;
                H2[3] = H2[3] + d | 0;
                H2[4] = H2[4] + e | 0;
                H2[5] = H2[5] + f | 0;
                H2[6] = H2[6] + g | 0;
                H2[7] = H2[7] + h | 0;
              },
              _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;
                dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
                data.sigBytes = dataWords.length * 4;
                this._process();
                return this._hash;
              },
              clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
              }
            });
            C.SHA256 = Hasher._createHelper(SHA256);
            C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
          })(Math);
          return CryptoJS.SHA256;
        });
      })(sha256);
      return sha256.exports;
    }
    var hmac = { exports: {} };
    var hasRequiredHmac;
    function requireHmac() {
      if (hasRequiredHmac)
        return hmac.exports;
      hasRequiredHmac = 1;
      (function(module, exports) {
        (function(root, factory) {
          {
            module.exports = factory(requireCore());
          }
        })(commonjsGlobal, function(CryptoJS) {
          (function() {
            var C = CryptoJS;
            var C_lib = C.lib;
            var Base = C_lib.Base;
            var C_enc = C.enc;
            var Utf8 = C_enc.Utf8;
            var C_algo = C.algo;
            C_algo.HMAC = Base.extend({
              init: function(hasher, key) {
                hasher = this._hasher = new hasher.init();
                if (typeof key == "string") {
                  key = Utf8.parse(key);
                }
                var hasherBlockSize = hasher.blockSize;
                var hasherBlockSizeBytes = hasherBlockSize * 4;
                if (key.sigBytes > hasherBlockSizeBytes) {
                  key = hasher.finalize(key);
                }
                key.clamp();
                var oKey = this._oKey = key.clone();
                var iKey = this._iKey = key.clone();
                var oKeyWords = oKey.words;
                var iKeyWords = iKey.words;
                for (var i = 0; i < hasherBlockSize; i++) {
                  oKeyWords[i] ^= 1549556828;
                  iKeyWords[i] ^= 909522486;
                }
                oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
                this.reset();
              },
              reset: function() {
                var hasher = this._hasher;
                hasher.reset();
                hasher.update(this._iKey);
              },
              update: function(messageUpdate) {
                this._hasher.update(messageUpdate);
                return this;
              },
              finalize: function(messageUpdate) {
                var hasher = this._hasher;
                var innerHash = hasher.finalize(messageUpdate);
                hasher.reset();
                var hmac2 = hasher.finalize(this._oKey.clone().concat(innerHash));
                return hmac2;
              }
            });
          })();
        });
      })(hmac);
      return hmac.exports;
    }
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha256(), requireHmac());
        }
      })(commonjsGlobal, function(CryptoJS) {
        return CryptoJS.HmacSHA256;
      });
    })(hmacSha256$1);
    var hmacSha256 = hmacSha256$1.exports;
    return hmacSha256;
  }();
  const {
    A_CHAIN_CATEGORIES,
    A_CHAIN_FAMILIES,
    R_CHAIN_ID,
    R_CHAIN_NAME
  } = function(exports) {
    const NB_MAX_MESSAGE = 2 * 1024 * 1024;
    const N_PX_WIDTH_POPUP2 = 360;
    const N_PX_HEIGHT_POPUP2 = 600;
    const A_CHAIN_FAMILIES2 = [
      "cosmos"
    ];
    const A_CHAIN_CATEGORIES2 = [
      "mainnet",
      "testnet"
    ];
    const R_CHAIN_ID2 = /^[a-z0-9][a-z0-9-]{2,64}$/;
    const R_CHAIN_NAME2 = /^[\p{L}\p{S}](\p{Zs}?[\p{L}\p{N}\p{S}._:/-])+$/u;
    exports.A_CHAIN_CATEGORIES = A_CHAIN_CATEGORIES2;
    exports.A_CHAIN_FAMILIES = A_CHAIN_FAMILIES2;
    exports.NB_MAX_MESSAGE = NB_MAX_MESSAGE;
    exports.N_PX_HEIGHT_POPUP = N_PX_HEIGHT_POPUP2;
    exports.N_PX_WIDTH_POPUP = N_PX_WIDTH_POPUP2;
    exports.R_CHAIN_ID = R_CHAIN_ID2;
    exports.R_CHAIN_NAME = R_CHAIN_NAME2;
    Object.defineProperty(exports, "__esModule", { value: true });
    return exports;
  }({});
  const {
    locate_script: locate_script2
  } = function(exports) {
    function locate_script3(s_pattern) {
      const g_manifest = chrome.runtime.getManifest();
      for (const g_script of g_manifest.content_scripts || []) {
        for (const sr_script of g_script.js ?? []) {
          if (sr_script.startsWith(s_pattern)) {
            return sr_script;
          }
        }
      }
      for (const z_resource of g_manifest.web_accessible_resources || []) {
        if ("string" === typeof z_resource) {
          if (z_resource.startsWith(s_pattern)) {
            return z_resource;
          }
        } else {
          for (const sr_script of z_resource.resources) {
            if (sr_script.startsWith(s_pattern)) {
              return sr_script;
            }
          }
        }
      }
      return null;
    }
    exports.locate_script = locate_script3;
    Object.defineProperty(exports, "__esModule", { value: true });
    return exports;
  }({});
  const d_runtime = chrome.runtime;
  const debug = (s, ...a_args) => console.debug(`StarShell.ics-host: ${s}`, ...a_args);
  debug(`Launched on <${location.href}>`);
  class SecurityError extends Error {
  }
  let d_port;
  let b_acquainted = false;
  let b_aborted = false;
  function abort(s_reason) {
    b_aborted = true;
    void d_runtime.sendMessage({
      type: "panic",
      value: "" + s_reason
    });
    throw new SecurityError(`StarShell threw a security error: "${s_reason}"`);
  }
  function assert_not_aborted() {
    if (b_aborted)
      throw new Error("StarShell withdrew wallet access from this website due to a security violation");
  }
  const h_handlers_authed = {
    async requestConnect(g_request) {
      const {
        index: i_request,
        manifest: g_manifest
      } = g_request;
      const err = (s_reason) => {
        d_port.postMessage({
          type: "respondConnect",
          value: {
            index: i_request,
            answer: {
              error: s_reason
            }
          }
        });
      };
      if ("object" !== typeof g_manifest || "string" !== typeof g_manifest.schema) {
        return err("Invalid manifest structure");
      }
      if ("1" !== g_manifest.schema) {
        return err("Unknown or unsupported manifest schema version");
      }
      if (!Array.isArray(g_manifest.chains) || !g_manifest.chains.length) {
        return err("No chains were specified in request");
      }
      const {
        chains: a_chains
      } = g_manifest;
      const as_chains = /* @__PURE__ */ new Set();
      const a_requests = [];
      for (let i_chain = 0; i_chain < a_chains.length; i_chain++) {
        const g_chain = a_chains[i_chain];
        const cerr = (s_reason) => err(`${s_reason} at .chains[${i_chain}]`);
        if ("object" !== typeof g_chain || "string" !== typeof g_chain.category || "string" !== typeof g_chain.family || "string" !== typeof g_chain.id) {
          return cerr("Invalid chain descriptor structure");
        }
        if (!A_CHAIN_FAMILIES.includes(g_chain.family)) {
          continue;
        }
        if (!A_CHAIN_CATEGORIES.includes(g_chain.category)) {
          return cerr(`Invalid category value "${g_chain.category}"; must be one of (${A_CHAIN_CATEGORIES.join(", ")})`);
        }
        if (!R_CHAIN_ID.test(g_chain.id)) {
          return cerr(`Invalid chain id "${g_chain.id}" for ${g_chain.family} family; failed to match regular expression /${R_CHAIN_ID.source}/`);
        }
        if (g_chain.name) {
          if (!R_CHAIN_NAME.test(g_chain.name)) {
            return cerr(`Invalid chain name "${g_chain.name}"; failed to match regular expression /${R_CHAIN_NAME.source}/`);
          }
          if (g_chain.name.length > 64) {
            return cerr("Chain name too long");
          }
        }
        const p_chain = g_chain.family + "\n" + g_chain.id;
        if (as_chains.has(p_chain)) {
          return cerr(`Duplicate chain IDs in '${g_chain.family}' family: '${g_chain.id}'`);
        }
        const s_label = g_chain.name || g_chain.id;
        a_requests.push({
          ...g_chain,
          label: s_label
        });
      }
      void d_runtime.sendMessage({
        type: "requestConnection",
        value: {
          chains: a_requests
        }
      });
      const a_ports = [];
      a_ports.push(null);
      for (const g_chain of a_chains) {
        const d_channel = new MessageChannel();
        await HostConnection.create(g_chain, d_channel.port1);
        a_ports.push(d_channel.port2);
      }
      d_port.postMessage({
        type: "respondConnect",
        value: {
          index: i_request,
          answer: {
            config: {
              features: a_features
            }
          }
        }
      }, a_ports);
    },
    reportWebsiteError(s_reson) {
    }
  };
  function authed_message_handler(d_event) {
    const {
      type: si_type,
      value: w_value
    } = d_event.data;
    const f_handler = h_handlers_authed[si_type];
    if (!f_handler) {
      console.error(`Received relay port message having an unregistered type "${si_type}"`);
      return;
    }
    debug(`Received relay port message having registered type %o`, d_event.data);
    f_handler(w_value);
  }
  const h_handlers_window = {
    establishChannel(_, a_ports) {
      assert_not_aborted();
      if (b_acquainted) {
        return abort("Relay frame attempted to establish connection more than once");
      }
      b_acquainted = true;
      if (!d_window_relay) {
        return abort("Reference to relay frame window not defined");
      }
      if (!a_ports || 1 !== a_ports.length) {
        return abort("Expected exactly one MessagePort but none were transfered from relay frame");
      }
      d_port = a_ports[0];
      d_port.onmessage = authed_message_handler;
      d_port.postMessage({
        type: "acknowledgeChannel"
      });
      window.postMessage({
        type: "ratifyGlobal"
      }, window.origin);
    }
  };
  let d_window_relay;
  let d_document_relay;
  {
    const g_payload = {
      session: sh_session,
      csurl: chrome.runtime.getURL("assets/src/script/mcs-relay.js")
    };
    const dm_payload = document.createElement("script");
    dm_payload.setAttribute("type", "application/json");
    dm_payload.setAttribute("id", "starshell-mcs-relay-payload");
    dm_payload.textContent = JSON.stringify(g_payload);
    const dm_script = document.createElement("script");
    const p_relay = locate_script2("assets/src/script/mcs-relay");
    if (!p_relay) {
      throw new Error("Unable to locate relay script!");
    }
    dm_script.src = chrome.runtime.getURL(p_relay);
    dm_script.type = "module";
    const dm_iframe = document.createElement("iframe");
    const dm_div = document.createElement("div");
    dm_div.style.display = "none !important";
    const dm_shadow = dm_div.attachShadow({ mode: "closed" });
    dm_shadow.append(dm_iframe);
    try {
      document.head.append(dm_div);
    } catch (e_append) {
      document.body.append(dm_div);
    }
    d_window_relay = dm_iframe.contentWindow;
    d_document_relay = dm_iframe.contentDocument;
    d_document_relay.body.append(dm_payload);
    d_document_relay.body.append(dm_script);
    debug("Injected relay iframe");
  }
  d_window_relay.addEventListener("message", (d_event) => {
    debug(`Observed relay window message %o`, d_event);
    if (!d_event.isTrusted) {
      console.warn("Ignored untrusted event %o", d_event);
      return;
    }
    if (d_event.source !== d_event.target) {
      console.warn("Ignored cross-window message %o", d_event);
      return;
    }
    const dw_sender = d_event.target;
    if (window.origin !== d_event.origin || window !== dw_sender.parent || "about:blank" !== dw_sender.location.href) {
      console.warn("Ignored message from 3rd party %o", d_event);
      return;
    }
    const g_data = d_event.data;
    if ("object" !== typeof g_data || "string" !== typeof g_data.type) {
      debug("Ignored invalid message data %o", g_data);
      return;
    }
    const {
      type: si_type,
      auth: s_auth
    } = g_data;
    const f_handler = h_handlers_window[si_type];
    if (!f_handler) {
      console.error(`Received message having an unregistered type "${si_type}"`);
      return;
    }
    if ("string" !== typeof s_auth) {
      debug("Ignored message missing auth data %o", g_data);
      return;
    }
    const s_sig_msg = JSON.stringify(hmacSHA256(JSON.stringify({ ...g_data, auth: void 0 }), sh_session));
    if (s_sig_msg !== g_data.auth) {
      return abort("Relay frame sent invalid auth signature");
    }
    debug(`Received message having registered type %o`, d_event.data);
    void f_handler(null, d_event.ports);
  });
}
function McsRatifier({
  session: sh_session
}) {
  const debug = (s, ...a_args) => console.debug(`StarShell.mcs-ratifier: ${s}`, ...a_args);
  debug(`Launched on <${location.href}>`);
  const hmacSHA256 = function() {
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    var hmacSha256$1 = { exports: {} };
    function commonjsRequire(path) {
      throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }
    var core = { exports: {} };
    var hasRequiredCore;
    function requireCore() {
      if (hasRequiredCore)
        return core.exports;
      hasRequiredCore = 1;
      (function(module, exports) {
        (function(root, factory) {
          {
            module.exports = factory();
          }
        })(commonjsGlobal, function() {
          var CryptoJS = CryptoJS || function(Math2, undefined$1) {
            var crypto2;
            if (typeof window !== "undefined" && window.crypto) {
              crypto2 = window.crypto;
            }
            if (typeof self !== "undefined" && self.crypto) {
              crypto2 = self.crypto;
            }
            if (typeof globalThis !== "undefined" && globalThis.crypto) {
              crypto2 = globalThis.crypto;
            }
            if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
              crypto2 = window.msCrypto;
            }
            if (!crypto2 && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
              crypto2 = commonjsGlobal.crypto;
            }
            if (!crypto2 && typeof commonjsRequire === "function") {
              try {
                crypto2 = require("crypto");
              } catch (err) {
              }
            }
            var cryptoSecureRandomInt = function() {
              if (crypto2) {
                if (typeof crypto2.getRandomValues === "function") {
                  try {
                    return crypto2.getRandomValues(new Uint32Array(1))[0];
                  } catch (err) {
                  }
                }
                if (typeof crypto2.randomBytes === "function") {
                  try {
                    return crypto2.randomBytes(4).readInt32LE();
                  } catch (err) {
                  }
                }
              }
              throw new Error("Native crypto module could not be used to get secure random number.");
            };
            var create = Object.create || function() {
              function F() {
              }
              return function(obj) {
                var subtype;
                F.prototype = obj;
                subtype = new F();
                F.prototype = null;
                return subtype;
              };
            }();
            var C = {};
            var C_lib = C.lib = {};
            var Base = C_lib.Base = function() {
              return {
                extend: function(overrides) {
                  var subtype = create(this);
                  if (overrides) {
                    subtype.mixIn(overrides);
                  }
                  if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                    subtype.init = function() {
                      subtype.$super.init.apply(this, arguments);
                    };
                  }
                  subtype.init.prototype = subtype;
                  subtype.$super = this;
                  return subtype;
                },
                create: function() {
                  var instance = this.extend();
                  instance.init.apply(instance, arguments);
                  return instance;
                },
                init: function() {
                },
                mixIn: function(properties) {
                  for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                      this[propertyName] = properties[propertyName];
                    }
                  }
                  if (properties.hasOwnProperty("toString")) {
                    this.toString = properties.toString;
                  }
                },
                clone: function() {
                  return this.init.prototype.extend(this);
                }
              };
            }();
            var WordArray = C_lib.WordArray = Base.extend({
              init: function(words, sigBytes) {
                words = this.words = words || [];
                if (sigBytes != undefined$1) {
                  this.sigBytes = sigBytes;
                } else {
                  this.sigBytes = words.length * 4;
                }
              },
              toString: function(encoder) {
                return (encoder || Hex).stringify(this);
              },
              concat: function(wordArray) {
                var thisWords = this.words;
                var thatWords = wordArray.words;
                var thisSigBytes = this.sigBytes;
                var thatSigBytes = wordArray.sigBytes;
                this.clamp();
                if (thisSigBytes % 4) {
                  for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                  }
                } else {
                  for (var j = 0; j < thatSigBytes; j += 4) {
                    thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                  }
                }
                this.sigBytes += thatSigBytes;
                return this;
              },
              clamp: function() {
                var words = this.words;
                var sigBytes = this.sigBytes;
                words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
                words.length = Math2.ceil(sigBytes / 4);
              },
              clone: function() {
                var clone = Base.clone.call(this);
                clone.words = this.words.slice(0);
                return clone;
              },
              random: function(nBytes) {
                var words = [];
                for (var i = 0; i < nBytes; i += 4) {
                  words.push(cryptoSecureRandomInt());
                }
                return new WordArray.init(words, nBytes);
              }
            });
            var C_enc = C.enc = {};
            var Hex = C_enc.Hex = {
              stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var hexChars = [];
                for (var i = 0; i < sigBytes; i++) {
                  var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  hexChars.push((bite >>> 4).toString(16));
                  hexChars.push((bite & 15).toString(16));
                }
                return hexChars.join("");
              },
              parse: function(hexStr) {
                var hexStrLength = hexStr.length;
                var words = [];
                for (var i = 0; i < hexStrLength; i += 2) {
                  words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
                }
                return new WordArray.init(words, hexStrLength / 2);
              }
            };
            var Latin1 = C_enc.Latin1 = {
              stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var latin1Chars = [];
                for (var i = 0; i < sigBytes; i++) {
                  var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  latin1Chars.push(String.fromCharCode(bite));
                }
                return latin1Chars.join("");
              },
              parse: function(latin1Str) {
                var latin1StrLength = latin1Str.length;
                var words = [];
                for (var i = 0; i < latin1StrLength; i++) {
                  words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
                }
                return new WordArray.init(words, latin1StrLength);
              }
            };
            var Utf8 = C_enc.Utf8 = {
              stringify: function(wordArray) {
                try {
                  return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                  throw new Error("Malformed UTF-8 data");
                }
              },
              parse: function(utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
              }
            };
            var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
              reset: function() {
                this._data = new WordArray.init();
                this._nDataBytes = 0;
              },
              _append: function(data) {
                if (typeof data == "string") {
                  data = Utf8.parse(data);
                }
                this._data.concat(data);
                this._nDataBytes += data.sigBytes;
              },
              _process: function(doFlush) {
                var processedWords;
                var data = this._data;
                var dataWords = data.words;
                var dataSigBytes = data.sigBytes;
                var blockSize = this.blockSize;
                var blockSizeBytes = blockSize * 4;
                var nBlocksReady = dataSigBytes / blockSizeBytes;
                if (doFlush) {
                  nBlocksReady = Math2.ceil(nBlocksReady);
                } else {
                  nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
                }
                var nWordsReady = nBlocksReady * blockSize;
                var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
                if (nWordsReady) {
                  for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    this._doProcessBlock(dataWords, offset);
                  }
                  processedWords = dataWords.splice(0, nWordsReady);
                  data.sigBytes -= nBytesReady;
                }
                return new WordArray.init(processedWords, nBytesReady);
              },
              clone: function() {
                var clone = Base.clone.call(this);
                clone._data = this._data.clone();
                return clone;
              },
              _minBufferSize: 0
            });
            C_lib.Hasher = BufferedBlockAlgorithm.extend({
              cfg: Base.extend(),
              init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
                this.reset();
              },
              reset: function() {
                BufferedBlockAlgorithm.reset.call(this);
                this._doReset();
              },
              update: function(messageUpdate) {
                this._append(messageUpdate);
                this._process();
                return this;
              },
              finalize: function(messageUpdate) {
                if (messageUpdate) {
                  this._append(messageUpdate);
                }
                var hash = this._doFinalize();
                return hash;
              },
              blockSize: 512 / 32,
              _createHelper: function(hasher) {
                return function(message, cfg) {
                  return new hasher.init(cfg).finalize(message);
                };
              },
              _createHmacHelper: function(hasher) {
                return function(message, key) {
                  return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
              }
            });
            var C_algo = C.algo = {};
            return C;
          }(Math);
          return CryptoJS;
        });
      })(core);
      return core.exports;
    }
    var sha256 = { exports: {} };
    var hasRequiredSha256;
    function requireSha256() {
      if (hasRequiredSha256)
        return sha256.exports;
      hasRequiredSha256 = 1;
      (function(module, exports) {
        (function(root, factory) {
          {
            module.exports = factory(requireCore());
          }
        })(commonjsGlobal, function(CryptoJS) {
          (function(Math2) {
            var C = CryptoJS;
            var C_lib = C.lib;
            var WordArray = C_lib.WordArray;
            var Hasher = C_lib.Hasher;
            var C_algo = C.algo;
            var H = [];
            var K = [];
            (function() {
              function isPrime(n2) {
                var sqrtN = Math2.sqrt(n2);
                for (var factor = 2; factor <= sqrtN; factor++) {
                  if (!(n2 % factor)) {
                    return false;
                  }
                }
                return true;
              }
              function getFractionalBits(n2) {
                return (n2 - (n2 | 0)) * 4294967296 | 0;
              }
              var n = 2;
              var nPrime = 0;
              while (nPrime < 64) {
                if (isPrime(n)) {
                  if (nPrime < 8) {
                    H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
                  }
                  K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
                  nPrime++;
                }
                n++;
              }
            })();
            var W = [];
            var SHA256 = C_algo.SHA256 = Hasher.extend({
              _doReset: function() {
                this._hash = new WordArray.init(H.slice(0));
              },
              _doProcessBlock: function(M, offset) {
                var H2 = this._hash.words;
                var a = H2[0];
                var b = H2[1];
                var c = H2[2];
                var d = H2[3];
                var e = H2[4];
                var f = H2[5];
                var g = H2[6];
                var h = H2[7];
                for (var i = 0; i < 64; i++) {
                  if (i < 16) {
                    W[i] = M[offset + i] | 0;
                  } else {
                    var gamma0x = W[i - 15];
                    var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                    var gamma1x = W[i - 2];
                    var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                  }
                  var ch = e & f ^ ~e & g;
                  var maj = a & b ^ a & c ^ b & c;
                  var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                  var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                  var t1 = h + sigma1 + ch + K[i] + W[i];
                  var t2 = sigma0 + maj;
                  h = g;
                  g = f;
                  f = e;
                  e = d + t1 | 0;
                  d = c;
                  c = b;
                  b = a;
                  a = t1 + t2 | 0;
                }
                H2[0] = H2[0] + a | 0;
                H2[1] = H2[1] + b | 0;
                H2[2] = H2[2] + c | 0;
                H2[3] = H2[3] + d | 0;
                H2[4] = H2[4] + e | 0;
                H2[5] = H2[5] + f | 0;
                H2[6] = H2[6] + g | 0;
                H2[7] = H2[7] + h | 0;
              },
              _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;
                dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
                data.sigBytes = dataWords.length * 4;
                this._process();
                return this._hash;
              },
              clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
              }
            });
            C.SHA256 = Hasher._createHelper(SHA256);
            C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
          })(Math);
          return CryptoJS.SHA256;
        });
      })(sha256);
      return sha256.exports;
    }
    var hmac = { exports: {} };
    var hasRequiredHmac;
    function requireHmac() {
      if (hasRequiredHmac)
        return hmac.exports;
      hasRequiredHmac = 1;
      (function(module, exports) {
        (function(root, factory) {
          {
            module.exports = factory(requireCore());
          }
        })(commonjsGlobal, function(CryptoJS) {
          (function() {
            var C = CryptoJS;
            var C_lib = C.lib;
            var Base = C_lib.Base;
            var C_enc = C.enc;
            var Utf8 = C_enc.Utf8;
            var C_algo = C.algo;
            C_algo.HMAC = Base.extend({
              init: function(hasher, key) {
                hasher = this._hasher = new hasher.init();
                if (typeof key == "string") {
                  key = Utf8.parse(key);
                }
                var hasherBlockSize = hasher.blockSize;
                var hasherBlockSizeBytes = hasherBlockSize * 4;
                if (key.sigBytes > hasherBlockSizeBytes) {
                  key = hasher.finalize(key);
                }
                key.clamp();
                var oKey = this._oKey = key.clone();
                var iKey = this._iKey = key.clone();
                var oKeyWords = oKey.words;
                var iKeyWords = iKey.words;
                for (var i = 0; i < hasherBlockSize; i++) {
                  oKeyWords[i] ^= 1549556828;
                  iKeyWords[i] ^= 909522486;
                }
                oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
                this.reset();
              },
              reset: function() {
                var hasher = this._hasher;
                hasher.reset();
                hasher.update(this._iKey);
              },
              update: function(messageUpdate) {
                this._hasher.update(messageUpdate);
                return this;
              },
              finalize: function(messageUpdate) {
                var hasher = this._hasher;
                var innerHash = hasher.finalize(messageUpdate);
                hasher.reset();
                var hmac2 = hasher.finalize(this._oKey.clone().concat(innerHash));
                return hmac2;
              }
            });
          })();
        });
      })(hmac);
      return hmac.exports;
    }
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha256(), requireHmac());
        }
      })(commonjsGlobal, function(CryptoJS) {
        return CryptoJS.HmacSHA256;
      });
    })(hmacSha256$1);
    var hmacSha256 = hmacSha256$1.exports;
    return hmacSha256;
  }();
  class SecurityError extends Error {
  }
  let b_aborted = false;
  function abort(s_reason) {
    b_aborted = true;
    window.postMessage({
      type: "s2r:abort",
      value: {
        reason: "" + s_reason,
        signature: hmacSHA256("" + s_reason, sh_session)
      }
    });
    throw new SecurityError(`StarShell threw a security error: "${s_reason}"`);
  }
  function silent_exit(s_error) {
    console.error(s_error);
    b_aborted = true;
  }
  const {
    addEventListener: f_add_event_listener,
    Reflect: d_reflect,
    Reflect: {
      getOwnPropertyDescriptor: f_get_own_property_descriptor,
      getPrototypeOf: f_get_prototype_of
    }
  } = window;
  function locate_descriptor(w_ref, si_prop, a_lineage = []) {
    try {
      const g_descriptor = f_get_own_property_descriptor.call(d_reflect, w_ref, si_prop);
      if (!g_descriptor) {
        a_lineage.push(w_ref);
        const w_parent = f_get_prototype_of.call(d_reflect, w_ref);
        if (!w_parent)
          return null;
        if (a_lineage.includes(w_parent))
          return null;
        return locate_descriptor(w_parent, si_prop, a_lineage);
      }
      return g_descriptor;
    } catch (e_get) {
      return null;
    }
  }
  function access_silently(w_ref, si_prop, b_accessors = false) {
    try {
      const g_descriptor = locate_descriptor(w_ref, si_prop);
      if (!g_descriptor)
        return null;
      if (!("value" in g_descriptor)) {
        if (b_accessors)
          return w_ref[si_prop];
        return null;
      }
      return g_descriptor.value;
    } catch (e_get) {
      return null;
    }
  }
  const h_handlers_window = {
    ratifyGlobal() {
      if (!sh_session) {
        return silent_exit("StarShell is refusing to ratify global since it never received a signing key from the extension.");
      } else if (!locate_descriptor(window, "starshell")) {
        return silent_exit("StarShell failed to ratify global since it is not defined.");
      }
      const k_starshell = window.starshell;
      let f_ratify = k_starshell.verify((s_sig_auth) => {
        if (b_aborted)
          return;
        if (s_sig_auth !== JSON.stringify(hmacSHA256("starshell", sh_session))) {
          return abort("Invalid auth signature passed to ratifier");
        }
        const g_proof = k_starshell.verifiableStack();
        return {
          proof: g_proof,
          signature: JSON.stringify(hmacSHA256(JSON.stringify(g_proof), sh_session))
        };
      });
      f_ratify(k_starshell);
    }
  };
  window.addEventListener("message", (d_event) => {
    debug("Observed window message %o", d_event);
    if (b_aborted)
      return;
    if (window === access_silently(d_event, "source", true)) {
      const z_data = access_silently(d_event, "data", true);
      let si_type;
      if (z_data && "object" === typeof z_data && "string" === typeof (si_type = access_silently(z_data, "type"))) {
        const f_handler = h_handlers_window[si_type];
        if (!f_handler)
          return;
        debug(`Received relay port message having registered type %o`, d_event.data);
        f_handler(z_data);
      }
    }
  });
}
function locate_script(s_pattern) {
  const g_manifest = chrome.runtime.getManifest();
  for (const g_script of g_manifest.content_scripts || []) {
    for (const sr_script of g_script.js ?? []) {
      if (sr_script.startsWith(s_pattern)) {
        return sr_script;
      }
    }
  }
  for (const z_resource of g_manifest.web_accessible_resources || []) {
    if ("string" === typeof z_resource) {
      if (z_resource.startsWith(s_pattern)) {
        return z_resource;
      }
    } else {
      for (const sr_script of z_resource.resources) {
        if (sr_script.startsWith(s_pattern)) {
          return sr_script;
        }
      }
    }
  }
  return null;
}
const A_MATCH_ALL = [
  "file://*/*",
  "http://*/*",
  "https://*/*"
];
const G_SCRIPT_BASIC = {
  matches: A_MATCH_ALL,
  runAt: "document_start",
  persistAcrossSessions: true,
  allFrames: true,
  world: "MAIN"
};
const H_CONTENT_SCRIPT_DEFS = {
  mcs_keplr(h_overrides) {
    return {
      ...G_SCRIPT_BASIC,
      id: "keplr_polyfill",
      js: [
        locate_script("assets/src/script/mcs-keplr")
      ],
      persistAcrossSessions: true,
      ...h_overrides
    };
  }
};
const G_APP_POLICY_RESULT_BLOCKED = {
  blocked: true
};
function policy_applies(g_policy, g_app) {
  let r_matches;
  try {
    r_matches = new RegExp(g_policy.matches);
  } catch (e_parse) {
    console.error(`Failed to parse policy match pattern "${g_policy.matches}"`);
    return false;
  }
  if (r_matches.test(g_app.host)) {
    if (g_policy.except) {
      let r_except;
      try {
        r_except = new RegExp(g_policy.except);
      } catch (e_parse) {
        console.error(`Failed to parse policy match pattern "${g_policy.except}"`);
        return false;
      }
      if (r_except.test(g_app.host)) {
        return false;
      }
    }
  }
  return true;
}
const Policies = create_store_class({
  store: SI_STORE_APP_POLICIES,
  class: class PoliciesI extends WritableStore {
    static forApp(g_app) {
      return Policies.open((ks_policies) => ks_policies.forApp(g_app));
    }
    forApp(g_app) {
      let b_trusted = false;
      for (const g_policy of this._w_cache["hq"]) {
        if (policy_applies(g_policy, g_app)) {
          if ("block" === g_policy.action) {
            return G_APP_POLICY_RESULT_BLOCKED;
          } else {
            console.error(`Unknown hq policy action "${g_policy.action}"`);
            continue;
          }
        }
      }
      for (const g_policy of this._w_cache["user"]) {
        if (policy_applies(g_policy, g_app)) {
          if ("block" === g_policy.action) {
            return G_APP_POLICY_RESULT_BLOCKED;
          } else if ("trust" === g_policy.action) {
            b_trusted = true;
          } else {
            console.error(`Unknown policy action "${g_policy.action}"`);
            continue;
          }
        }
      }
      return {
        blocked: false,
        trusted: b_trusted
      };
    }
  }
});
const Settings = create_store_class({
  store: SI_STORE_SETTINGS,
  extension: "dict",
  class: class SettingsI extends WritableStoreDict {
  }
});
const N_PX_WIDTH_POPUP = 360;
const N_PX_HEIGHT_POPUP = 600;
async function flow_generic(h_params) {
  const p_flow = chrome.runtime.getURL("src/entry/flow.html");
  const p_connect = p_flow + "?" + new URLSearchParams(h_params).toString();
  const [
    a_displays,
    g_screen_info
  ] = await Promise.all([
    chrome.system.display.getInfo(),
    (async () => {
      const g_info = (await chrome.storage.session.get(["display_info"]))?.display_info;
      if (g_info)
        return g_info;
      void chrome.windows.create({
        type: "popup",
        url: p_flow + "?" + new URLSearchParams({ headless: "info" }).toString(),
        focused: true,
        width: N_PX_WIDTH_POPUP,
        height: N_PX_HEIGHT_POPUP
      });
      try {
        return (await once_storage_changes("session", "display_info", 5 * XT_SECONDS))?.newValue;
      } catch (e_timeout) {
      }
    })()
  ]);
  const h_displays = {};
  for (const g_display of a_displays) {
    if (g_display.isEnabled) {
      h_displays[g_display.bounds.width + ":" + g_display.bounds.height] = g_display;
    }
  }
  let g_window_position = {};
  if (g_screen_info) {
    const si_display = g_screen_info.width + ":" + g_screen_info.height;
    const g_display = h_displays[si_display];
    if (g_display) {
      g_window_position = {
        left: g_display.bounds.left + Math.round(g_screen_info.width / 2 - N_PX_WIDTH_POPUP / 2),
        top: g_display.bounds.top + Math.round(g_screen_info.height * 0.45 - N_PX_HEIGHT_POPUP / 2)
      };
    }
  }
  const g_window = await chrome.windows.create({
    type: "popup",
    url: p_connect,
    focused: true,
    width: N_PX_WIDTH_POPUP,
    height: N_PX_HEIGHT_POPUP,
    ...g_window_position
  });
  if ("number" !== typeof g_window.id) {
    throw new Error("Failed to create popup window");
  }
  const dv_popup = await chrome.windows.get(g_window.id, {
    windowTypes: ["popup"]
  });
  if (!dv_popup) {
    throw new Error("Failed to locate popup window");
  }
  const dt_created = await new Promise((fk_created) => {
    chrome.tabs.onUpdated.addListener(function tab_update(i_tab, g_info, dt_updated) {
      if (g_window.id === dt_updated.windowId && "number" === typeof i_tab) {
        if ("complete" === g_info.status) {
          chrome.tabs.onUpdated.removeListener(tab_update);
          fk_created(dt_updated);
        }
      }
    });
  });
  return {
    window: g_window,
    tab: dt_created
  };
}
async function flow_broadcast(gc_prompt, si_req = "") {
  const si_channel = `flow_${crypto.randomUUID()}`;
  await session_storage_get("flow") || "";
  const {
    window: g_window,
    tab: dt_flow
  } = await flow_generic({
    comm: "broadcast",
    name: si_channel
  });
  const d_broadcast = new BroadcastChannel(si_channel);
  return new Promise((fk_resolve) => {
    function shutdown(b_answer) {
      chrome.windows.onRemoved.removeListener(close_listener);
      d_broadcast.removeEventListener("message", message_listener);
      void session_storage_remove("flow");
      fk_resolve(b_answer);
    }
    function message_listener(d_event) {
      const g_msg = d_event.data;
      if ("completeFlow" === g_msg.type) {
        chrome.windows.remove(g_window.id);
        shutdown(g_msg.value.answer);
      }
    }
    d_broadcast.onmessage = message_listener;
    function close_listener(i_window) {
      if (i_window === g_window.id)
        shutdown(false);
    }
    chrome.windows.onRemoved.addListener(close_listener, {
      windowTypes: ["popup"]
    });
    d_broadcast.postMessage(gc_prompt.flow);
  });
}
const g_awaiters = {
  sync: {},
  local: {},
  session: {},
  managed: {}
};
function once_storage_changes(si_area, si_key, xt_timeout = 0) {
  return new Promise((fk_resolve, fe_reject) => {
    const h_awaiters = g_awaiters[si_area];
    const a_awaiters = h_awaiters[si_key] = h_awaiters[si_key] || [];
    let i_awaiter = -1;
    let i_timeout = 0;
    if (xt_timeout > 0) {
      i_timeout = globalThis.setTimeout(() => {
        a_awaiters.splice(i_awaiter, 1);
        fe_reject(new Error(`Timed out`));
      }, xt_timeout);
    }
    i_awaiter = a_awaiters.push((g_change) => {
      globalThis.clearTimeout(i_timeout);
      fk_resolve(g_change);
    });
  });
}
function fire_storage_change(si_area, si_key, g_change) {
  const h_awaiters = g_awaiters[si_area];
  const a_awaiters = h_awaiters[si_key];
  if (a_awaiters?.length) {
    h_awaiters[si_key] = [];
    for (const f_awaiter of a_awaiters) {
      void f_awaiter(g_change);
    }
  }
}
chrome.storage.onChanged.addListener((h_changes, si_area) => {
  const H_STORAGE_LISTENERS = {
    sync: {
      async keplr_polyfill(g_change) {
        const d_scripting = chrome.scripting;
        const gc_script = H_CONTENT_SCRIPT_DEFS.mcs_keplr();
        const b_registered = !!(await d_scripting.getRegisteredContentScripts({
          ids: [gc_script.id]
        })).length;
        if (true === g_change.newValue) {
          if (!b_registered) {
            await d_scripting.registerContentScripts([
              gc_script
            ]);
          }
        } else {
          if (!b_registered) {
            await d_scripting.unregisterContentScripts({
              ids: [gc_script.id]
            });
          }
        }
      }
    },
    local: {},
    session: {},
    managed: {}
  };
  const h_listeners = H_STORAGE_LISTENERS[si_area];
  if (h_listeners) {
    for (const si_key in h_changes) {
      const g_change = h_changes[si_key];
      fire_storage_change(si_area, si_key, g_change);
      const f_listener = h_listeners[si_key];
      if (f_listener) {
        f_listener(g_change);
      }
    }
  }
});
function parse_sender(p_sender) {
  const {
    protocol: s_protocol,
    host: s_host
  } = new URL(p_sender);
  const s_scheme = (s_protocol || "").replace(/:$/, "");
  return [s_scheme, s_host];
}
function block_app(g_sender, s_msg) {
  console.warn(`${s_msg}; blocked request from <${g_sender.url}>`);
  return true;
}
async function app_blocked(s_scheme, s_host, g_sender) {
  if ("http" === s_scheme) {
    if (!R_DOMAIN_LOCALHOST.test(s_host)) {
      return block_app(g_sender, "Non-secure HTTP contexts are not allowed to connect to wallet except for localhost");
    }
  } else if ("file" === s_scheme) {
    const b_allowed = await Settings.get("allow_file_urls");
    if (!b_allowed) {
      return block_app(g_sender, `File URLs are not allowed to connect to wallet, unless 'allow_file_urls' setting is enabled`);
    }
  } else if ("https" !== s_scheme) {
    return block_app(g_sender, `Scheme not allowed "${s_scheme}"`);
  }
  return false;
}
const message_router = (g_msg, g_sender, fk_respond) => {
  function generate_key(nb_size = 64) {
    const atu8_secret = new Uint8Array(nb_size);
    crypto.getRandomValues(atu8_secret);
    return Array.from(atu8_secret).map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  const H_HANDLERS_MESSAGE = {
    panic(g_msg2, g_sender2) {
    },
    async requestAdvertisement(g_msg2, g_sender2, fk_respond2) {
      const i_tab = g_sender2.tab.id;
      if (!g_sender2.url) {
        console.debug("Silently ignoring advertisement request from unknown source");
        return;
      }
      const [s_scheme, s_host] = parse_sender(g_sender2.url);
      const g_page = {
        tabId: i_tab,
        href: g_sender2.url + ""
      };
      console.info("get root key");
      const dk_root = await Vault.getRootKey();
      if (!dk_root) {
        console.info("no root key");
        const b_finished = await flow_broadcast({
          flow: {
            type: "authenticate",
            page: g_page
          }
        });
        console.info("flow completed");
        if (!b_finished) {
          return;
        }
        return await H_HANDLERS_MESSAGE.requestAdvertisement(g_msg2, g_sender2, fk_respond2);
      }
      console.info("root key exists");
      if (await app_blocked(s_scheme, s_host, g_sender2))
        return;
      console.info("app passed scheme check");
      {
        let g_app = await Apps.get(s_host, s_scheme);
        let b_registered = false;
        if (g_app) {
          b_registered = true;
        } else {
          g_app = {
            scheme: s_scheme,
            host: s_host,
            connections: {}
          };
        }
        const g_policy = await Policies.forApp(g_app);
        console.info("got policy for app %o", g_policy);
        if (g_policy.blocked) {
          return block_app(g_sender2, "App connection blocked by policy");
        }
        if (!b_registered && !g_policy.trusted) {
          const b_confirmed = await flow_broadcast({
            flow: {
              type: "requestAdvertisement",
              value: {
                app: g_app
              },
              page: g_page
            }
          });
          if (b_confirmed) {
            return await H_HANDLERS_MESSAGE.requestAdvertisement(g_msg2, g_sender2, fk_respond2);
          }
          console.debug("User cancelled request");
          return;
        }
      }
      console.debug(`Allowing <${g_sender2.url}> to receive advertisement`);
      const g_secrets = {
        session: generate_key()
      };
      void chrome.scripting.executeScript({
        target: {
          tabId: i_tab
        },
        func: IcsHost,
        args: [g_secrets],
        world: "ISOLATED"
      });
      void chrome.scripting.executeScript({
        target: {
          tabId: i_tab
        },
        func: McsRatifier,
        args: [g_secrets],
        world: "MAIN"
      });
      fk_respond2(g_secrets);
    },
    async flowBroadcast(g_req, g_sender2, fk_respond2) {
      const {
        key: si_req,
        config: gc_prompt
      } = g_req;
      if (!g_sender2.url) {
        console.debug("Silently ignoring advertisement request from unknown source");
        return;
      }
      const g_page = gc_prompt.flow.page = {
        tabId: g_sender2.tab.id,
        href: g_sender2.url || gc_prompt.flow.page?.href || ""
      };
      console.info("get root key");
      const dk_root = await Vault.getRootKey();
      if (!dk_root) {
        console.info("no root key");
        const b_finished = await flow_broadcast({
          flow: {
            type: "authenticate",
            page: g_page
          }
        });
        console.info("flow completed");
        if (!b_finished) {
          return;
        }
        return await H_HANDLERS_MESSAGE.flowBroadcast(g_req, g_sender2, fk_respond2);
      }
      const [s_scheme, s_host] = parse_sender(g_sender2.url);
      if (await app_blocked(s_scheme, s_host, g_sender2))
        return;
      console.info("app passed scheme check");
      const g_app = {
        scheme: s_scheme,
        host: s_host,
        connections: {}
      };
      gc_prompt.flow["value"].app = g_app;
      void flow_broadcast(gc_prompt, si_req);
    }
  };
  console.debug(`Service received message %o`, g_msg);
  if ("object" === typeof g_msg && "string" === typeof g_msg.type) {
    if (!g_sender.tab || "number" !== typeof g_sender.tab.id) {
      console.error(`Refusing request from unknown sender`);
      return;
    }
    const si_type = g_msg.type;
    const f_handler = H_HANDLERS_MESSAGE[si_type];
    if (f_handler) {
      const z_response = f_handler(g_msg.value, g_sender, fk_respond);
      if (z_response && "function" === typeof z_response["then"]) {
        return true;
      }
    }
  }
};
chrome.runtime.onMessage.addListener(message_router);
chrome.runtime.onInstalled.addListener(async () => {
});
chrome.alarms.clearAll(() => {
  console.warn("clear all");
  chrome.alarms.create("periodicChainQueries", {
    periodInMinutes: 2
  });
  chrome.alarms.onAlarm.addListener((g_alarm) => {
    switch (g_alarm.name) {
      case "periodicChainQueries": {
        void periodic_check();
        break;
      }
    }
  });
  void periodic_check();
});
let b_alive = false;
const h_sockets = {};
const auto_heal = () => setTimeout(() => {
  b_alive = false;
  void periodic_check();
}, 3 * XT_MINUTES);
let i_auto_heal = auto_heal();
function listenTransfer(si_socket_group, k_network, g_chain, g_account, sa_owner, si_type) {
  const si_socket = si_socket_group + ":Receive";
  const p_chain = Chains.pathFrom(g_chain);
  return h_sockets[si_socket] = k_network[`on${si_type}`](sa_owner, async (d_kill, g_tx) => {
    if (d_kill) {
      delete h_sockets[si_socket];
      console.error(d_kill);
    } else if (g_tx) {
      const a_logs = JSON.parse(g_tx.result?.log || "[]");
      if (a_logs?.length) {
        for (const g_event of a_logs[0].events) {
          if ("transfer" === g_event.type) {
            const g_transfer = fold_attrs(g_event);
            let s_payload = g_transfer.amount;
            let si_coin = "";
            const m_amount = R_TRANSFER_AMOUNT.exec(g_transfer.amount);
            if (!m_amount) {
              syswarn({
                text: `Failed to parse transfer amount "${g_transfer.amount}"`
              });
            } else {
              const [, s_amount, si_denom] = m_amount;
              for (const [si_coin_test, g_coin_test] of ode(g_chain.coins)) {
                if (si_denom === g_coin_test.denom) {
                  const x_amount = new BigNumber(s_amount).shiftedBy(-g_coin_test.decimals).toNumber();
                  s_payload = `${format_amount(x_amount, true)} ${si_coin_test}`;
                  si_coin = si_coin_test;
                  break;
                }
              }
            }
            let s_other = g_transfer.sender;
            const p_contact = Agents.pathForContact(s_other, g_chain.family);
            const g_contact = await Agents.getContact(p_contact);
            if (g_contact) {
              s_other = g_contact.name;
            } else {
              s_other = abbreviate_addr(s_other);
            }
            const si_notif = buffer_to_base64(sha256_sync(text_to_buffer(g_tx.tx)));
            if ("Receive" === si_type) {
              chrome.notifications.create(si_notif, {
                type: "basic",
                title: `Received ${s_payload} on ${g_chain.name}`,
                message: `${s_other} sent ${s_payload} to your ${g_account.name} account`,
                priority: 1,
                iconUrl: "/media/vendor/logo-192px.png"
              });
              await Events.open(async (ks_events) => {
                await ks_events.insert({
                  time: Date.now(),
                  type: "receive",
                  data: {
                    height: g_tx.height,
                    sender: g_transfer.sender,
                    recipient: g_transfer.recipient,
                    amount: g_transfer.amount,
                    chain: p_chain,
                    coin: si_coin,
                    hash: ""
                  }
                });
              });
            } else if ("Send" === si_type) {
              chrome.notifications.create(si_notif, {
                type: "basic",
                title: `Sent ${s_payload} on ${g_chain.name}`,
                message: `${s_payload} sent to ${s_other} from ${g_account.name} account`,
                priority: 1,
                iconUrl: "/media/vendor/logo-192px.png"
              });
              await Events.open(async (ks_events) => {
                const g_next = ks_events.filter({
                  type: "pending",
                  chain: p_chain
                }).next();
                if (g_next?.value) {
                  const g_pending = g_next.value;
                  const {
                    data: {
                      raw: sx_txn
                    }
                  } = g_pending;
                  if (sx_txn === globalThis.atob(g_tx.tx)) {
                    await ks_events.delete(g_pending);
                    await ks_events.insert({
                      time: Date.now(),
                      type: "send",
                      data: {
                        ...g_pending.data,
                        height: g_tx.height,
                        gas_used: g_tx.result.gas_used,
                        gas_wanted: g_tx.result.gas_wanted,
                        sender: g_transfer.sender,
                        recipient: g_transfer.recipient,
                        amount: g_transfer.amount
                      }
                    });
                    console.log({
                      events: ks_events.raw
                    });
                  }
                }
              });
            }
          }
        }
      }
    }
  });
}
async function periodic_check() {
  await WebResourceCache.updateAll();
  if (!await Vault.getRootKey())
    return;
  if (b_alive)
    return;
  b_alive = true;
  clearTimeout(i_auto_heal);
  const [
    ks_accounts,
    ks_chains,
    ks_networks
  ] = await Promise.all([
    Accounts.read(),
    Chains.read(),
    Networks.read()
  ]);
  const h_networks = {};
  for (const [p_network, g_network] of ks_networks.entries()) {
    h_networks[g_network.chain] = h_networks[g_network.chain] || g_network;
  }
  for (const [p_chain, g_network] of ode(h_networks)) {
    if (h_sockets[p_chain])
      continue;
    const g_chain = ks_chains.at(p_chain);
    const p_network = Networks.pathFrom(g_network);
    const k_network = Networks.activate(g_network, g_chain);
    const a_recents = [];
    try {
      h_sockets[p_chain] = k_network.listen([
        `tm.event='NewBlock'`
      ], (d_kill, g_value) => {
        if (d_kill) {
          delete h_sockets[p_chain];
        } else if (g_value) {
          a_recents.push(Date.now());
          const g_block = g_value.block;
          while (a_recents.length > 16) {
            a_recents.shift();
          }
          global_broadcast({
            type: "blockInfo",
            value: {
              header: g_block.header,
              chain: p_chain,
              network: p_network,
              recents: a_recents
            }
          });
        }
      });
      console.info({
        h_sockets
      });
    } catch (e_listen) {
      syserr({
        error: e_listen
      });
    }
    for (const [p_account, g_account] of ks_accounts.entries()) {
      const sa_owner = Chains.addressFor(g_account.pubkey, g_chain);
      if (k_network.hasRpc) {
        const si_socket_group = p_chain + "\n" + g_network.rpcHost + "\n";
        let f_close = h_sockets[si_socket_group];
        if (!f_close) {
          try {
            listenTransfer(si_socket_group, k_network, g_chain, g_account, sa_owner, "Receive");
            listenTransfer(si_socket_group, k_network, g_chain, g_account, sa_owner, "Send");
          } catch (e_receive) {
            syserr({
              error: e_receive
            });
          }
        }
      }
    }
  }
  auto_heal();
}
global_receive({
  login() {
    void periodic_check();
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS4xZWJiM2E2ZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NjcmlwdC9pY3MtaG9zdC50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9zY3JpcHQvbWNzLXJhdGlmaWVyLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3NjcmlwdC91dGlscy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9zY3JpcHQvc2NyaXB0cy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9zdG9yZS9wb2xpY2llcy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9zdG9yZS9zZXR0aW5ncy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9zY3JpcHQvY29uc3RhbnRzLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3NjcmlwdC9tc2ctZmxvdy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9zY3JpcHQvc2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XG5cdEhtYWNTSEEyNTYsXG59IGZyb20gJ2NyeXB0by1qcyc7XG5cbmltcG9ydCB0eXBlICogYXMgQ29uc3RhbnRzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB0eXBlICogYXMgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgdHlwZSAqIGFzIEZsb3cgZnJvbSAnLi9tc2ctZmxvdyc7XG5pbXBvcnQgdHlwZSB7IENoYWluRGVzY3JpcHRvciwgQ29ubmVjdGlvbk1hbmlmZXN0VjEsIFVua25vd25DaGFpbkRlc2NyaXB0b3IgfSBmcm9tICcuL2NvbW1vbic7XG5cbmltcG9ydCB0eXBlIHtcblx0SG9zdFRvUmVsYXksXG5cdFJlbGF5VG9Ib3N0LFxuXHRIb3N0VG9SYXRpZmllcixcblx0SWNzVG9TZXJ2aWNlLFxufSBmcm9tICcuL21lc3NhZ2VzJztcblxuaW1wb3J0IHR5cGUgeyBWb2NhYiB9IGZyb20gJyMvbWV0YS92b2NhYic7XG5cbmludGVyZmFjZSBTY3JpcHRQYXJhbXMge1xuXHRzZXNzaW9uOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIGhvc3QgcHJvdmlkZXMgYSBjb25uZWN0aW9uIGJldHdlZW4gdGhlIHBhZ2UgYW5kIHRoZSBleHRlbnNpb24gYW5kIGFsbG93cyBtZXNzYWdlcyBmcm9tIHRoZSByZWxheSBmcmFtZSB0byBiZVxuICogZm9yd2FyZGVkIHRvIHRoZSBzZXJ2aWNlIGlmIG5lY2Vzc2FyeS5cbiAqIFRoaXMgY29udGVudCBzY3JpcHQgaXMgZXhlY3V0ZWQgYSBydW50aW1lIGJ5IHRoZSBzZXJ2aWNlLCBzbyB0aGUgbW9kdWxlIGV4cG9ydHMgYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYW4gYXJndW1lbnQuXG4gKiBAcGFyYW0gLSBhIHtAbGluayBTZXJ2aWNlVG9JY3MuU2Vzc2lvbktleXN9IG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih7XG5cdHNlc3Npb246IHNoX3Nlc3Npb24sXG59OiBTY3JpcHRQYXJhbXMpOiB2b2lkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuXHRjb25zdCBobWFjU0hBMjU2ID0gaW5saW5lX3JlcXVpcmUoJ2NyeXB0by1qcy9obWFjLXNoYTI1NicpIGFzIHR5cGVvZiBIbWFjU0hBMjU2O1xuXG5cdGNvbnN0IHtcblx0XHRBX0NIQUlOX0NBVEVHT1JJRVMsXG5cdFx0QV9DSEFJTl9GQU1JTElFUyxcblx0XHRSX0NIQUlOX0lELFxuXHRcdFJfQ0hBSU5fTkFNRSxcblx0fSA9IGlubGluZV9yZXF1aXJlKCcuL2NvbnN0YW50cy50cycpIGFzIHR5cGVvZiBDb25zdGFudHM7XG5cblx0Y29uc3Qge1xuXHRcdGxvY2F0ZV9zY3JpcHQsXG5cdH0gPSBpbmxpbmVfcmVxdWlyZSgnLi91dGlscy50cycpIGFzIHR5cGVvZiBVdGlscztcblxuXHQvLyB0eXBlZCBjaHJvbWUgcnVudGltZSBmb3Igc2VuZGluZyBtZXNzYWdlc1xuXHRjb25zdCBkX3J1bnRpbWU6IFZvY2FiLlR5cGVkUnVudGltZTxJY3NUb1NlcnZpY2UuUHVibGljVm9jYWIsIEljc1RvU2VydmljZS5QdWJsaWNSZXNwb25zZVZvY2FiPiA9IGNocm9tZS5ydW50aW1lO1xuXG5cdC8vIHZlcmJvc2Vcblx0Y29uc3QgZGVidWcgPSAoczogc3RyaW5nLCAuLi5hX2FyZ3M6IGFueVtdKSA9PiBjb25zb2xlLmRlYnVnKGBTdGFyU2hlbGwuaWNzLWhvc3Q6ICR7c31gLCAuLi5hX2FyZ3MpO1xuXHRkZWJ1ZyhgTGF1bmNoZWQgb24gPCR7bG9jYXRpb24uaHJlZn0+YCk7XG5cblx0LyoqXG5cdCAqIFxuXHQgKi9cblx0ZnVuY3Rpb24gZmxvd19zZW5kKGdjX3Byb21wdDogRmxvdy5Qcm9tcHRDb25maWcpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKGZrX3Jlc29sdmUpID0+IHtcblx0XHRcdC8vIGNyZWF0ZSByZXNwb25zZSBrZXlcblx0XHRcdGNvbnN0IHNpX3Jlc3BvbnNlID0gY3J5cHRvLnJhbmRvbVVVSUQoKTtcblxuXHRcdFx0Ly8gd2FpdCBmb3IgcmVzcG9uc2UgZnJvbSBwb3B1cFxuXHRcdFx0ZF9ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiBmbG93X3Jlc3BvbnNlX2hhbmRsZXIoZ19tc2csIGdfc2VuZGVyKSB7XG5cdFx0XHRcdC8vIGZsb3cgcmVzcG9uc2UgbWVzc2FnZVxuXHRcdFx0XHRpZignZmxvd0Jyb2FkY2FzdFJlc3BvbnNlJyA9PT0gZ19tc2cudHlwZSkge1xuXHRcdFx0XHRcdC8vIHJlc3BvbmRpbmcgdG8gdGhpcyByZXF1ZXN0XG5cdFx0XHRcdFx0aWYoc2lfcmVzcG9uc2UgPT09IGdfbXNnLnZhbHVlLmtleSkge1xuXHRcdFx0XHRcdFx0Ly8gcmVtb3ZlIGxpc3RlbmVyXG5cdFx0XHRcdFx0XHRkX3J1bnRpbWUub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKGZsb3dfcmVzcG9uc2VfaGFuZGxlcik7XG5cblx0XHRcdFx0XHRcdC8vIHJlc29sdmUgcHJvbWlzZVxuXHRcdFx0XHRcdFx0ZmtfcmVzb2x2ZShnX21zZy52YWx1ZS5hbnN3ZXIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIGZvcndhcmQgY29tbWFuZCB0byBiYWNrZ3JvdW5kXG5cdFx0XHR2b2lkIGRfcnVudGltZS5zZW5kTWVzc2FnZSh7XG5cdFx0XHRcdHR5cGU6ICdmbG93QnJvYWRjYXN0Jyxcblx0XHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0XHRrZXk6IHNpX3Jlc3BvbnNlLFxuXHRcdFx0XHRcdGNvbmZpZzogZ2NfcHJvbXB0LFxuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogR2VuZXJhdGUgYSBuZXcgcHJpdmF0ZS9zaGFyZWQgc2VjcmV0IGtleSBvZiB0aGUgc3BlY2lmaWVkIHNpemUgaW4gYnl0ZXMgKGRlZmF1bHRzIHRvIDUxMi1iaXQga2V5KVxuXHQgKi9cblx0ZnVuY3Rpb24gZ2VuZXJhdGVfa2V5KG5iX3NpemU9NjQpOiBzdHJpbmcge1xuXHRcdC8vIHByZXAgc3BhY2UgaW4gbWVtb3J5XG5cdFx0Y29uc3QgYXR1OF9zZWNyZXQgPSBuZXcgVWludDhBcnJheShuYl9zaXplKTtcblxuXHRcdC8vIGZpbGwgd2l0aCBjcnlwdG8gcmFuZG9tIHZhbHVlc1xuXHRcdGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYXR1OF9zZWNyZXQpO1xuXG5cdFx0Ly8gY29udmVydCB0byBoZXggc3RyaW5nXG5cdFx0cmV0dXJuIEFycmF5LmZyb20oYXR1OF9zZWNyZXQpLm1hcCh4ID0+IHgudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpLmpvaW4oJycpO1xuXHR9XG5cblxuXHQvLyBzdWJjbGFzcyBFcnJvciB0byBiZSBhYmxlIHRvIHJlY29nbml6ZSBvYmplY3Qgb3JpZ2luXG5cdGNsYXNzIFNlY3VyaXR5RXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG5cdC8vIG1lc3NhZ2UgcG9ydFxuXHRsZXQgZF9wb3J0OiBWb2NhYi5UeXBlZFBvcnQ8SG9zdFRvUmVsYXkuQXV0aGVkVm9jYWI+O1xuXG5cdC8vIGZsYWcgdG8gcmVjb3JkIHJlbGF5IHN0YXRlXG5cdGxldCBiX2FjcXVhaW50ZWQgPSBmYWxzZTtcblxuXHQvLyBmbGFnIGluIGNhc2Ugc2VjdXJpdHkgdmlvbGF0aW9uIG9jY3Vyc1xuXHRsZXQgYl9hYm9ydGVkID0gZmFsc2U7XG5cblx0LyoqXG5cdCAqIEFib3J0IHBhZ2UgY29ubmVjdGlvbiBhbmQgcmVwb3J0IGEgc2VjdXJpdHkgZXJyb3Jcblx0ICovXG5cdGZ1bmN0aW9uIGFib3J0KHNfcmVhc29uOiBzdHJpbmcpIHtcblx0XHQvLyBzZXQgYWJvcnQgZmxhZ1xuXHRcdGJfYWJvcnRlZCA9IHRydWU7XG5cblx0XHQvLyBub3RpZnkgZXh0ZW5zaW9uXG5cdFx0dm9pZCBkX3J1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuXHRcdFx0dHlwZTogJ3BhbmljJyxcblx0XHRcdHZhbHVlOiAnJytzX3JlYXNvbixcblx0XHR9KTtcblxuXHRcdC8vIGp1bXAgb3V0IG9mIGNhbGwgc3RhY2tcblx0XHR0aHJvdyBuZXcgU2VjdXJpdHlFcnJvcihgU3RhclNoZWxsIHRocmV3IGEgc2VjdXJpdHkgZXJyb3I6IFwiJHtzX3JlYXNvbn1cImApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydCB0aGF0IHRoZSBjb25uZWN0aW9uIGhhcyBub3QgYmVlbiBhYm9ydGVkXG5cdCAqL1xuXHRmdW5jdGlvbiBhc3NlcnRfbm90X2Fib3J0ZWQoKSB7XG5cdFx0Ly8gYWxyZWFkeSBhYm9ydGVkXG5cdFx0aWYoYl9hYm9ydGVkKSB0aHJvdyBuZXcgRXJyb3IoJ1N0YXJTaGVsbCB3aXRoZHJldyB3YWxsZXQgYWNjZXNzIGZyb20gdGhpcyB3ZWJzaXRlIGR1ZSB0byBhIHNlY3VyaXR5IHZpb2xhdGlvbicpO1xuXHR9XG5cblx0Ly8gZGVjbGFyZSBjaGFubmVsIG1lc3NhZ2UgaGFuZGxlcnNcblx0Y29uc3QgaF9oYW5kbGVyc19hdXRoZWQ6IFZvY2FiLkhhbmRsZXJzPFJlbGF5VG9Ib3N0LkF1dGhlZFZvY2FiPiA9IHtcblx0XHQvLyBoYW5kbGUgY29ubmVjdGlvbiByZXF1ZXN0c1xuXHRcdGFzeW5jIHJlcXVlc3RDb25uZWN0KGdfcmVxdWVzdCkge1xuXHRcdFx0Ly8gZGVzdHJ1Y3R1cmUgcmVxdWVzdFxuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRpbmRleDogaV9yZXF1ZXN0LFxuXHRcdFx0XHRtYW5pZmVzdDogZ19tYW5pZmVzdCxcblx0XHRcdH0gPSBnX3JlcXVlc3Q7XG5cblx0XHRcdC8vIHJlc3BvbmQgd2l0aCBhbiBlcnJvclxuXHRcdFx0Y29uc3QgZXJyID0gKHNfcmVhc29uOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0ZF9wb3J0LnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0XHR0eXBlOiAncmVzcG9uZENvbm5lY3QnLFxuXHRcdFx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdFx0XHRpbmRleDogaV9yZXF1ZXN0LFxuXHRcdFx0XHRcdFx0YW5zd2VyOiB7XG5cdFx0XHRcdFx0XHRcdGVycm9yOiBzX3JlYXNvbixcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBpbnZhbGlkIHN0cnVjdHVyZVxuXHRcdFx0aWYoJ29iamVjdCcgIT09IHR5cGVvZiBnX21hbmlmZXN0IHx8ICdzdHJpbmcnICE9PSB0eXBlb2YgZ19tYW5pZmVzdC5zY2hlbWEpIHtcblx0XHRcdFx0cmV0dXJuIGVycignSW52YWxpZCBtYW5pZmVzdCBzdHJ1Y3R1cmUnKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gdW5rbm93biBtYW5pZmVzdCB2ZXJzaW9uXG5cdFx0XHRpZignMScgIT09IGdfbWFuaWZlc3Quc2NoZW1hKSB7XG5cdFx0XHRcdHJldHVybiBlcnIoJ1Vua25vd24gb3IgdW5zdXBwb3J0ZWQgbWFuaWZlc3Qgc2NoZW1hIHZlcnNpb24nKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gbWlzc2luZyBjaGFpbnNcblx0XHRcdGlmKCFBcnJheS5pc0FycmF5KGdfbWFuaWZlc3QuY2hhaW5zKSB8fCAhZ19tYW5pZmVzdC5jaGFpbnMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiBlcnIoJ05vIGNoYWlucyB3ZXJlIHNwZWNpZmllZCBpbiByZXF1ZXN0Jyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGRlc3RydWN0dXJlIG1hbmlmZXN0XG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdGNoYWluczogYV9jaGFpbnMsXG5cdFx0XHR9ID0gZ19tYW5pZmVzdCBhcyBDb25uZWN0aW9uTWFuaWZlc3RWMTtcblxuXHRcdFx0Ly8gbG9vayBvdXQgZm9yIGR1cGxpY2F0ZXNcblx0XHRcdGNvbnN0IGFzX2NoYWlucyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG5cblx0XHRcdGludGVyZmFjZSBDb25uZWN0aW9uUmVxdWVzdCBleHRlbmRzIFVua25vd25DaGFpbkRlc2NyaXB0b3Ige1xuXHRcdFx0XHRsYWJlbDogc3RyaW5nO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBcblx0XHRcdGNvbnN0IGFfcmVxdWVzdHM6IENvbm5lY3Rpb25SZXF1ZXN0W10gPSBbXTtcblxuXHRcdFx0Ly8gY2hhaW4gYW5zd2Vyc1xuXHRcdFx0Y29uc3QgYV9hbnN3ZXJzOiBWb2NhYi5NZXNzYWdlVmFsdWU8SG9zdFRvUmVsYXkuQXV0aGVkVm9jYWIsICdyZXNwb25kQ29ubmVjdCc+WydhbnN3ZXInXVtdID0gW107XG5cblx0XHRcdC8vIGVhY2ggY2hhaW5cblx0XHRcdGZvcihsZXQgaV9jaGFpbj0wOyBpX2NoYWluPGFfY2hhaW5zLmxlbmd0aDsgaV9jaGFpbisrKSB7XG5cdFx0XHRcdGNvbnN0IGdfY2hhaW4gPSBhX2NoYWluc1tpX2NoYWluXTtcblxuXHRcdFx0XHRjb25zdCBjZXJyID0gKHNfcmVhc29uOiBzdHJpbmcpID0+IGVycihgJHtzX3JlYXNvbn0gYXQgLmNoYWluc1ske2lfY2hhaW59XWApO1xuXG5cdFx0XHRcdC8vIHZhbGlkYXRlIGRlc2NyaXB0b3Igc3RydWN0dXJlXG5cdFx0XHRcdGlmKCdvYmplY3QnICE9PSB0eXBlb2YgZ19jaGFpbiB8fCAnc3RyaW5nJyAhPT0gdHlwZW9mIGdfY2hhaW4uY2F0ZWdvcnlcblx0XHRcdFx0XHR8fCAnc3RyaW5nJyAhPT0gdHlwZW9mIGdfY2hhaW4uZmFtaWx5IHx8ICdzdHJpbmcnICE9PSB0eXBlb2YgZ19jaGFpbi5pZCkge1xuXHRcdFx0XHRcdHJldHVybiBjZXJyKCdJbnZhbGlkIGNoYWluIGRlc2NyaXB0b3Igc3RydWN0dXJlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBmYW1pbHkgbm90IHN1cHBvcnRlZFxuXHRcdFx0XHRpZighQV9DSEFJTl9GQU1JTElFUy5pbmNsdWRlcyhnX2NoYWluLmZhbWlseSkpIHtcblx0XHRcdFx0XHRhX2Fuc3dlcnMucHVzaCh7XG5cdFx0XHRcdFx0XHRlcnJvcjogJ0ZhbWlseSBub3Qgc3VwcG9ydGVkJyxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8vIG1vdmUgb250byBuZXh0IGNoYWluXG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyB2YWxpZGF0ZSBjaGFpbiBjYXRlZ29yeVxuXHRcdFx0XHRpZighQV9DSEFJTl9DQVRFR09SSUVTLmluY2x1ZGVzKGdfY2hhaW4uY2F0ZWdvcnkpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNlcnIoYEludmFsaWQgY2F0ZWdvcnkgdmFsdWUgXCIke2dfY2hhaW4uY2F0ZWdvcnl9XCI7IG11c3QgYmUgb25lIG9mICgke0FfQ0hBSU5fQ0FURUdPUklFUy5qb2luKCcsICcpfSlgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHZhbGlkYXRlIGNoYWluIGlkXG5cdFx0XHRcdGlmKCFSX0NIQUlOX0lELnRlc3QoZ19jaGFpbi5pZCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gY2VycihgSW52YWxpZCBjaGFpbiBpZCBcIiR7Z19jaGFpbi5pZH1cIiBmb3IgJHtnX2NoYWluLmZhbWlseX0gZmFtaWx5OyBmYWlsZWQgdG8gbWF0Y2ggcmVndWxhciBleHByZXNzaW9uIC8ke1JfQ0hBSU5fSUQuc291cmNlfS9gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHZhbGlkYXRlIGNoYWluIG5hbWVcblx0XHRcdFx0aWYoZ19jaGFpbi5uYW1lKSB7XG5cdFx0XHRcdFx0aWYoIVJfQ0hBSU5fTkFNRS50ZXN0KGdfY2hhaW4ubmFtZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjZXJyKGBJbnZhbGlkIGNoYWluIG5hbWUgXCIke2dfY2hhaW4ubmFtZX1cIjsgZmFpbGVkIHRvIG1hdGNoIHJlZ3VsYXIgZXhwcmVzc2lvbiAvJHtSX0NIQUlOX05BTUUuc291cmNlfS9gKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihnX2NoYWluLm5hbWUubGVuZ3RoID4gNjQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjZXJyKCdDaGFpbiBuYW1lIHRvbyBsb25nJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gY2hhaW4gcGF0aFxuXHRcdFx0XHRjb25zdCBwX2NoYWluID0gZ19jaGFpbi5mYW1pbHkrJ1xcbicrZ19jaGFpbi5pZDtcblxuXHRcdFx0XHQvLyBkdXBsaWNhdGVcblx0XHRcdFx0aWYoYXNfY2hhaW5zLmhhcyhwX2NoYWluKSkge1xuXHRcdFx0XHRcdHJldHVybiBjZXJyKGBEdXBsaWNhdGUgY2hhaW4gSURzIGluICcke2dfY2hhaW4uZmFtaWx5fScgZmFtaWx5OiAnJHtnX2NoYWluLmlkfSdgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHNldCBjaGFpbiBsYWJlbFxuXHRcdFx0XHRjb25zdCBzX2xhYmVsID0gZ19jaGFpbi5uYW1lIHx8IGdfY2hhaW4uaWQ7XG5cblx0XHRcdFx0Ly8gcHJlcCBVSSBwcm9tcHRcblx0XHRcdFx0YV9yZXF1ZXN0cy5wdXNoKHtcblx0XHRcdFx0XHQuLi5nX2NoYWluLFxuXHRcdFx0XHRcdGxhYmVsOiBzX2xhYmVsLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dm9pZCBkX3J1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuXHRcdFx0XHR0eXBlOiAncmVxdWVzdENvbm5lY3Rpb24nLFxuXHRcdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRcdGNoYWluczogYV9yZXF1ZXN0cyxcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyAvLyBwcmVwIGZsb3cgcmVzdWx0XG5cdFx0XHQvLyBsZXQgZ19yZXN1bHQ7XG5cdFx0XHQvLyB0cnkge1xuXHRcdFx0Ly8gXHQvLyBhd2FpdCBmbG93XG5cdFx0XHQvLyBcdGdfcmVzdWx0ID0gYXdhaXQgZmxvd19zZW5kKHtcblx0XHRcdC8vIFx0XHRmbG93OiB7XG5cdFx0XHQvLyBcdFx0XHR0eXBlOiAncmVxdWVzdENvbm5lY3Rpb24nLFxuXHRcdFx0Ly8gXHRcdFx0dmFsdWU6IHtcblx0XHRcdC8vIFx0XHRcdFx0Y2hhaW5zOiBhX3JlcXVlc3RzLFxuXHRcdFx0Ly8gXHRcdFx0fSxcblx0XHRcdC8vIFx0XHRcdHBhZ2U6IHtcblx0XHRcdC8vIFx0XHRcdFx0aHJlZjogbG9jYXRpb24uaHJlZixcblx0XHRcdC8vIFx0XHRcdFx0dGFiSWQ6IC0xLFxuXHRcdFx0Ly8gXHRcdFx0fSxcblx0XHRcdC8vIFx0XHR9LFxuXHRcdFx0Ly8gXHR9KTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGNhdGNoKGVfcG9wdXApIHtcblx0XHRcdC8vIFx0Ly8gVE9ETzogaGFuZGxlIGNocm9tZSBlcnJvclxuXHRcdFx0Ly8gXHQvLyBUT0RPOiBoYW5kbGUgZmxvdyBlcnJvclxuXHRcdFx0Ly8gXHR0aHJvdyBlX3BvcHVwO1xuXHRcdFx0Ly8gfVxuXG5cdFx0XHQvLyBmZXRjaCBmcm9tIHN0b3JlXG5cblxuXHRcdFx0Ly8gcG9ydHNcblx0XHRcdGNvbnN0IGFfcG9ydHM6IEFycmF5PE1lc3NhZ2VQb3J0IHwgbnVsbD4gPSBbXTtcblxuXHRcdFx0Ly8gbm8gcG9ydFxuXHRcdFx0YV9wb3J0cy5wdXNoKG51bGwpO1xuXG5cblx0XHRcdGZvcihjb25zdCBnX2NoYWluIG9mIGFfY2hhaW5zKSB7XG5cdFx0XHRcdC8vIGNyZWF0ZSBjaGFubmVsXG5cdFx0XHRcdGNvbnN0IGRfY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuXG5cdFx0XHRcdC8vIGFzc2lnbiBwb3J0IDFcblx0XHRcdFx0Y29uc3Qga2NfY2hhaW4gPSBhd2FpdCBIb3N0Q29ubmVjdGlvbi5jcmVhdGUoZ19jaGFpbiwgZF9jaGFubmVsLnBvcnQxKTtcblxuXHRcdFx0XHQvLyByZXNvb25kIHdpdGggcG9ydCAyXG5cdFx0XHRcdGFfcG9ydHMucHVzaChkX2NoYW5uZWwucG9ydDIpO1xuXHRcdFx0fVxuXG5cblx0XHRcdGRfcG9ydC5wb3N0TWVzc2FnZSh7XG5cdFx0XHRcdHR5cGU6ICdyZXNwb25kQ29ubmVjdCcsXG5cdFx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdFx0aW5kZXg6IGlfcmVxdWVzdCxcblx0XHRcdFx0XHRhbnN3ZXI6IHtcblx0XHRcdFx0XHRcdGNvbmZpZzoge1xuXHRcdFx0XHRcdFx0XHRmZWF0dXJlczogYV9mZWF0dXJlcyxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSwgYV9wb3J0cyk7XG5cdFx0fSxcblxuXHRcdC8vIGhhbmRsZSB3ZWJzaXRlIGVycm9yIHJlcG9ydGluZ1xuXHRcdHJlcG9ydFdlYnNpdGVFcnJvcihzX3Jlc29uOiBzdHJpbmcpIHtcblx0XHRcdC8vIFRPRE86IGhhbmRsZVxuXHRcdH0sXG5cdH07XG5cblxuXHQvLyBSZWNvcmQ8UmVsYXlUb0hvc3QuQ2hhbm5lbE1lc3NhZ2VbJ3R5cGUnXSwgTWVzc2FnZUhhbmRsZXI+ID0ge1xuXHRcdC8vIGFzeW5jIHN1Ym1pdFRyYW5zYWN0aW9uKCkge1xuXHRcdC8vIFx0Y29uc3QgeV93aW5kb3cgPSBhd2FpdCBjaHJvbWUud2luZG93cy5jcmVhdGUoe1xuXHRcdC8vIFx0XHR0eXBlOiAncG9wdXAnLFxuXHRcdC8vIFx0XHR3aWR0aDogTl9QWF9XSURUSF9QT1BVUCxcblx0XHQvLyBcdFx0aGVpZ2h0OiBOX1BYX0hFSUdIVF9QT1BVUCxcblx0XHQvLyBcdFx0Zm9jdXNlZDogdHJ1ZSxcblx0XHQvLyBcdFx0dXJsOiBjaHJvbWUucnVudGltZS5nZXRVUkwoJ3NyYy9lbnRyeS9wb3B1cC5odG1sIy9wcm9tcHQnKSxcblx0XHQvLyBcdH0pO1xuXG5cdFx0Ly8gXHQvLyB5X3dpbmRvd1xuXHRcdC8vIH0sXG5cblxuXHQvLyBoYW5kbGUgbWVzc2FnZXMgZnJvbSBhdXRoZWQgcG9ydFxuXHRmdW5jdGlvbiBhdXRoZWRfbWVzc2FnZV9oYW5kbGVyKGRfZXZlbnQpIHtcblx0XHQvLyBkZXN0cnVjdHVyZSBtZXNzYWdlIGRhdGFcblx0XHRjb25zdCB7XG5cdFx0XHR0eXBlOiBzaV90eXBlLFxuXHRcdFx0dmFsdWU6IHdfdmFsdWUsXG5cdFx0fSA9IGRfZXZlbnQuZGF0YTtcblxuXHRcdC8vIHJlZiBoYW5kbGVyXG5cdFx0Y29uc3QgZl9oYW5kbGVyID0gaF9oYW5kbGVyc19hdXRoZWRbc2lfdHlwZV07XG5cdFx0aWYoIWZfaGFuZGxlcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgUmVjZWl2ZWQgcmVsYXkgcG9ydCBtZXNzYWdlIGhhdmluZyBhbiB1bnJlZ2lzdGVyZWQgdHlwZSBcIiR7c2lfdHlwZX1cImApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIGhhbmRsZXIgaXMgcmVnaXN0ZXJlZDsgZXhlY3V0ZSBpdFxuXHRcdGRlYnVnKGBSZWNlaXZlZCByZWxheSBwb3J0IG1lc3NhZ2UgaGF2aW5nIHJlZ2lzdGVyZWQgdHlwZSAlb2AsIGRfZXZlbnQuZGF0YSk7XG5cdFx0Zl9oYW5kbGVyKHdfdmFsdWUpO1xuXHR9XG5cblx0Ly8gZGVjbGFyZSB3aW5kb3cgbWVzc2FnZSBoYW5kbGVyc1xuXHRjb25zdCBoX2hhbmRsZXJzX3dpbmRvdzogVm9jYWIuSGFuZGxlcnNQb3J0UmVjZWl2YWJsZTxSZWxheVRvSG9zdC5TdWJmcmFtZVZvY2FiPiA9IHtcblx0XHQvLyAvKipcblx0XHQvLyAgKiBBIHNlY3VyaXR5IHRlc3QgaGFzIGZhaWxlZC4gQ2xvc2UgY29ubmVjdGlvbiB0byB0aGUgb2ZmZW5kaW5nIHBhZ2UuXG5cdFx0Ly8gICovXG5cdFx0Ly8gcGFuaWMoc19yZWFzb246IHN0cmluZykge1xuXHRcdC8vIFx0Ly8gbm8gbmVlZCB0byBhYm9ydCBtb3JlIHRoYW4gb25jZVxuXHRcdC8vIFx0aWYoIWJfYWJvcnRlZCkge1xuXHRcdC8vIFx0XHRyZXR1cm4gYWJvcnQoc19yZWFzb24pO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH0sXG5cblxuXHRcdC8vIC8qKlxuXHRcdC8vICAqIEEgcG90ZW50aWFsIGJ1ZyBtYXkgaGF2ZSBiZWVuIGVuY291bnRlcmVkLlxuXHRcdC8vICAqL1xuXHRcdC8vICBidWcoc19yZWFzb246IHN0cmluZykge1xuXHRcdC8vIFx0Ly8gIFRPRE86IGhhbmRsZSBidWcgcmVwb3J0aW5nXG5cblx0XHQvLyBcdC8vIG5vIG5lZWQgdG8gYWJvcnQgbW9yZSB0aGFuIG9uY2Vcblx0XHQvLyBcdGlmKCFiX2Fib3J0ZWQpIHtcblx0XHQvLyBcdFx0cmV0dXJuIGFib3J0KHNfcmVhc29uKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9LFxuXG5cblx0XHQvKipcblx0XHQgKiBUaGUgcmVsYXkgZnJhbWUgc3VjY2Vzc2Z1bGx5IGRlY2xhcmVkIGB3aW5kb3cuc3RhcnNoZWxsYCBvbiBpdHMgcGFyZW50IGZyYW1lIGluIHRoZSBtYWluIHdvcmxkXG5cdFx0ICogYW5kIGlzIHJlYWR5IHRvIGVzdGFibGlzaCBhIE1lc3NhZ2VDaGFubmVsLlxuXHRcdCAqL1xuXHRcdGVzdGFibGlzaENoYW5uZWwoXywgYV9wb3J0cykge1xuXHRcdFx0YXNzZXJ0X25vdF9hYm9ydGVkKCk7XG5cblx0XHRcdC8vIHJlcGxheWVkIG1lc3NhZ2Vcblx0XHRcdGlmKGJfYWNxdWFpbnRlZCkge1xuXHRcdFx0XHRyZXR1cm4gYWJvcnQoJ1JlbGF5IGZyYW1lIGF0dGVtcHRlZCB0byBlc3RhYmxpc2ggY29ubmVjdGlvbiBtb3JlIHRoYW4gb25jZScpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBkbyBub3QgYWxsb3cgcmVwbGF5c1xuXHRcdFx0Yl9hY3F1YWludGVkID0gdHJ1ZTtcblxuXHRcdFx0Ly8gcmVsYXkgd2luZG93IGlzIG5vdCBkZWZpbmVkXG5cdFx0XHRpZighZF93aW5kb3dfcmVsYXkpIHtcblx0XHRcdFx0cmV0dXJuIGFib3J0KCdSZWZlcmVuY2UgdG8gcmVsYXkgZnJhbWUgd2luZG93IG5vdCBkZWZpbmVkJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNoZWNrIHBvcnRzXG5cdFx0XHRpZighYV9wb3J0cyB8fCAxICE9PSBhX3BvcnRzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gYWJvcnQoJ0V4cGVjdGVkIGV4YWN0bHkgb25lIE1lc3NhZ2VQb3J0IGJ1dCBub25lIHdlcmUgdHJhbnNmZXJlZCBmcm9tIHJlbGF5IGZyYW1lJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGFjY2VwdCBtZXNzYWdlIHBvcnRcblx0XHRcdGRfcG9ydCA9IGFfcG9ydHNbMF07XG5cblx0XHRcdC8vIGJpbmQgbGlzdGVuZXJcblx0XHRcdGRfcG9ydC5vbm1lc3NhZ2UgPSBhdXRoZWRfbWVzc2FnZV9oYW5kbGVyO1xuXG5cdFx0XHQvLyBhY2tub3dsZWRnZSByZWxheSBjaGFubmVsXG5cdFx0XHRkX3BvcnQucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0XHR0eXBlOiAnYWNrbm93bGVkZ2VDaGFubmVsJyxcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyByZXF1ZXN0IHJhdGlmaWNhdGlvblxuXHRcdFx0KHdpbmRvdyBhcyBWb2NhYi5UeXBlZFdpbmRvdzxIb3N0VG9SYXRpZmllci5XaW5kb3dWb2NhYj4pLnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0dHlwZTogJ3JhdGlmeUdsb2JhbCcsXG5cdFx0XHR9LCB3aW5kb3cub3JpZ2luKTtcblx0XHR9LFxuXHR9O1xuXG5cblx0Ly8gY3JlYXRlIGFuZCBpbmplY3QgcmVsYXkgZnJhbWVcblx0bGV0IGRfd2luZG93X3JlbGF5OiBWb2NhYi5UeXBlZFdpbmRvdzxWb2NhYiwgUmVsYXlUb0hvc3QuU3ViZnJhbWVWb2NhYj47XG5cdGxldCBkX2RvY3VtZW50X3JlbGF5OiBEb2N1bWVudDtcblx0e1xuXHRcdC8vIHByZXBhcmUgdGhlIHBheWxvYWQgdGhhdCB3aWxsIGdldCBwYXNzZWQgdG8gcmVsYXkgZnJhbWVcblx0XHRjb25zdCBnX3BheWxvYWQ6IEhvc3RUb1JlbGF5LlBheWxvYWQgPSB7XG5cdFx0XHRzZXNzaW9uOiBzaF9zZXNzaW9uLFxuXHRcdFx0Y3N1cmw6IGNocm9tZS5ydW50aW1lLmdldFVSTCgnYXNzZXRzL3NyYy9zY3JpcHQvbWNzLXJlbGF5LmpzJyksXG5cdFx0fTtcblxuXHRcdC8vIGNyZWF0ZSBhIHNjcmlwdCBlbGVtZW50IHRvIGNhcnJ5IHRoZSBzZXJpYWxpemVkIHBheWxvYWRcblx0XHRjb25zdCBkbV9wYXlsb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0ZG1fcGF5bG9hZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXHRcdGRtX3BheWxvYWQuc2V0QXR0cmlidXRlKCdpZCcsICdzdGFyc2hlbGwtbWNzLXJlbGF5LXBheWxvYWQnKTtcblxuXHRcdC8vIHNlcmlhbGl6ZSBhbmQgc3RvcmUgdGhlIHBheWxvYWQgdG8gdGhlIHNjcmlwdCBlbGVtZW50XG5cdFx0ZG1fcGF5bG9hZC50ZXh0Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KGdfcGF5bG9hZCk7XG5cblx0XHQvLyBjcmVhdGUgYW5vdGhlciBzY3JpcHQgZWxlbWVudCB0byBsb2FkIHRoZSByZWxheSBhcHBsaWNhdGlvblxuXHRcdGNvbnN0IGRtX3NjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0Ly8gbG9jYXRlIHJlbGF5IHNjcmlwdFxuXHRcdGNvbnN0IHBfcmVsYXkgPSBsb2NhdGVfc2NyaXB0KCdhc3NldHMvc3JjL3NjcmlwdC9tY3MtcmVsYXknKTtcblxuXHRcdC8vIG5vdCBmb3VuZFxuXHRcdGlmKCFwX3JlbGF5KSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBsb2NhdGUgcmVsYXkgc2NyaXB0IScpO1xuXHRcdH1cblxuXHRcdC8vIHNldCB0aGUgc2NyaXB0IHNyY1xuXHRcdGRtX3NjcmlwdC5zcmMgPSBjaHJvbWUucnVudGltZS5nZXRVUkwocF9yZWxheSk7XG5cblx0XHQvLyBpbXBvcnQgYXMgbW9kdWxlXG5cdFx0ZG1fc2NyaXB0LnR5cGUgPSAnbW9kdWxlJztcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBpZnJhbWVcblx0XHRjb25zdCBkbV9pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcblxuXHRcdC8vIGNyZWF0ZSBjb250YWluZXIgZWxlbWVudCB0byBhdHRhY2ggYSBuZXcgc2hhZG93IGRvbSB0b1xuXHRcdGNvbnN0IGRtX2RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0Ly8gaW4gY2FzZSBpdCBnZXRzIGFwcGVuZGVkIHRvIGJvZHksIG1ha2Ugc3VyZSBpdCBkb2VzIG5vdCByZW5kZXIgdG8gc2NyZWVuXG5cdFx0ZG1fZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSAhaW1wb3J0YW50JztcblxuXHRcdC8vIGF0dGFjaCBuZXcgc2hhZG93IGRvbSB0byBlbGVtZW50IGluIGNsb3NlZCBtb2RlXG5cdFx0Y29uc3QgZG1fc2hhZG93ID0gZG1fZGl2LmF0dGFjaFNoYWRvdyh7bW9kZTonY2xvc2VkJ30pO1xuXG5cdFx0Ly8gYXBwZW5kIGlmcmFtZSB0byBzaGFkb3cgZG9tIHJvb3Rcblx0XHRkbV9zaGFkb3cuYXBwZW5kKGRtX2lmcmFtZSk7XG5cblx0XHQvLyBhcHBlbmQgY29udGFpbmVyIGVsZW1lbnQgdG8gdGhlIGxpdmUgZG9jdW1lbnQgdG8gaW5pdGlhbGl6ZSBpZnJhbWUncyBjb250ZW50IGRvY3VtZW50XG5cdFx0dHJ5IHtcblx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kKGRtX2Rpdik7XG5cdFx0fVxuXHRcdC8vIGJyb3dzZXIgZGlkbid0IGxpa2UgYWRkaW5nIGNvbnRlbnQgdG8gaGVhZDsgZmFsbGJhY2sgdG8gdXNpbmcgYm9keVxuXHRcdGNhdGNoKGVfYXBwZW5kKSB7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZChkbV9kaXYpO1xuXHRcdH1cblxuXHRcdC8vIHNhdmUgcmVsYXkgZnJhbWUncyBjb250ZW50IHdpbmRvdyAmIGRvY3VtZW50XG5cdFx0ZF93aW5kb3dfcmVsYXkgPSBkbV9pZnJhbWUuY29udGVudFdpbmRvdyE7XG5cdFx0ZF9kb2N1bWVudF9yZWxheSA9IGRtX2lmcmFtZS5jb250ZW50RG9jdW1lbnQhO1xuXG5cdFx0Ly8gYnVpbGQgcmVsYXkgZnJhbWUncyBkb2N1bWVudFxuXHRcdGRfZG9jdW1lbnRfcmVsYXkuYm9keS5hcHBlbmQoZG1fcGF5bG9hZCk7XG5cdFx0ZF9kb2N1bWVudF9yZWxheS5ib2R5LmFwcGVuZChkbV9zY3JpcHQpO1xuXG5cdFx0Ly8gdmVyYm9zZVxuXHRcdGRlYnVnKCdJbmplY3RlZCByZWxheSBpZnJhbWUnKTtcblx0fVxuXG5cblx0Ly8gbGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tIHJlbGF5IGZyYW1lJ3MgbWFpbiB3b3JsZFxuXHRkX3dpbmRvd19yZWxheS5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGRfZXZlbnQpID0+IHtcblx0XHQvLyB2ZXJib3NlXG5cdFx0ZGVidWcoYE9ic2VydmVkIHJlbGF5IHdpbmRvdyBtZXNzYWdlICVvYCwgZF9ldmVudCk7XG5cblx0XHQvLyBldmVudCBvcmlnaW5hdGVzIGZyb20gdHJ1c3RlZCBhY3Rpb25cblx0XHRpZighZF9ldmVudC5pc1RydXN0ZWQpIHtcblx0XHRcdGNvbnNvbGUud2FybignSWdub3JlZCB1bnRydXN0ZWQgZXZlbnQgJW8nLCBkX2V2ZW50KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBvbmx5IGFjY2VwdCBtZXNzYWdlcyBzZW50IHRvIGl0c2VsZlxuXHRcdGlmKGRfZXZlbnQuc291cmNlICE9PSBkX2V2ZW50LnRhcmdldCkge1xuXHRcdFx0Y29uc29sZS53YXJuKCdJZ25vcmVkIGNyb3NzLXdpbmRvdyBtZXNzYWdlICVvJywgZF9ldmVudCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gcmVmIG1lc3NhZ2Ugc2VuZGVyXG5cdFx0Y29uc3QgZHdfc2VuZGVyID0gZF9ldmVudC50YXJnZXQgYXMgV2luZG93O1xuXG5cdFx0Ly8gdmFsaWRhdGUgbWVzc2FnZSBzZW5kZXJcblx0XHRpZih3aW5kb3cub3JpZ2luICE9PSBkX2V2ZW50Lm9yaWdpbiB8fCB3aW5kb3cgIT09IGR3X3NlbmRlci5wYXJlbnQgfHwgJ2Fib3V0OmJsYW5rJyAhPT0gZHdfc2VuZGVyLmxvY2F0aW9uLmhyZWYpIHtcblx0XHRcdGNvbnNvbGUud2FybignSWdub3JlZCBtZXNzYWdlIGZyb20gM3JkIHBhcnR5ICVvJywgZF9ldmVudCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gdmFsaWRhdGUgbWVzc2FnZSBkYXRhXG5cdFx0Y29uc3QgZ19kYXRhID0gZF9ldmVudC5kYXRhO1xuXHRcdGlmKCdvYmplY3QnICE9PSB0eXBlb2YgZ19kYXRhIHx8ICdzdHJpbmcnICE9PSB0eXBlb2YgZ19kYXRhLnR5cGUpIHtcblx0XHRcdGRlYnVnKCdJZ25vcmVkIGludmFsaWQgbWVzc2FnZSBkYXRhICVvJywgZ19kYXRhKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBkZXN0cnVjdHVyZSBtZXNzYWdlIGRhdGFcblx0XHRjb25zdCB7XG5cdFx0XHR0eXBlOiBzaV90eXBlLFxuXHRcdFx0YXV0aDogc19hdXRoLFxuXHRcdH0gPSBnX2RhdGE7XG5cblx0XHQvLyByZWYgaGFuZGxlclxuXHRcdGNvbnN0IGZfaGFuZGxlciA9IGhfaGFuZGxlcnNfd2luZG93W3NpX3R5cGVdO1xuXHRcdGlmKCFmX2hhbmRsZXIpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFJlY2VpdmVkIG1lc3NhZ2UgaGF2aW5nIGFuIHVucmVnaXN0ZXJlZCB0eXBlIFwiJHtzaV90eXBlfVwiYCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gbWlzc2luZyBhdXRoXG5cdFx0aWYoJ3N0cmluZycgIT09IHR5cGVvZiBzX2F1dGgpIHtcblx0XHRcdGRlYnVnKCdJZ25vcmVkIG1lc3NhZ2UgbWlzc2luZyBhdXRoIGRhdGEgJW8nLCBnX2RhdGEpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIHByb2R1Y2UgY29ycmVjdCBzaWduYXR1cmVcblx0XHRjb25zdCBzX3NpZ19tc2cgPSBKU09OLnN0cmluZ2lmeShobWFjU0hBMjU2KEpTT04uc3RyaW5naWZ5KHsuLi5nX2RhdGEsIGF1dGg6dm9pZCAwfSksIHNoX3Nlc3Npb24pKTtcblxuXHRcdC8vIGF1dGhlbnRpY2F0ZVxuXHRcdGlmKHNfc2lnX21zZyAhPT0gZ19kYXRhLmF1dGgpIHtcblx0XHRcdHJldHVybiBhYm9ydCgnUmVsYXkgZnJhbWUgc2VudCBpbnZhbGlkIGF1dGggc2lnbmF0dXJlJyk7XG5cdFx0fVxuXG5cdFx0Ly8gaGFuZGxlciBpcyByZWdpc3RlcmVkOyBleGVjdXRlIGl0XG5cdFx0ZGVidWcoYFJlY2VpdmVkIG1lc3NhZ2UgaGF2aW5nIHJlZ2lzdGVyZWQgdHlwZSAlb2AsIGRfZXZlbnQuZGF0YSk7XG5cdFx0dm9pZCBmX2hhbmRsZXIobnVsbCwgZF9ldmVudC5wb3J0cyk7XG5cdH0pO1xufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRIb3N0VG9SYXRpZmllcixcbn0gZnJvbSBcIi4vbWVzc2FnZXNcIjtcbmltcG9ydCB0eXBlIHsgVm9jYWIgfSBmcm9tIFwiIy9tZXRhL3ZvY2FiXCI7XG5cbi8qKlxuICogVGhlIHJhdGlmaWVyJ3Mgc29sZSBwdXJwb3NlIGlzIHRvIHZlcmlmeSB0aGF0IHRoZSBkZWNsYXJlZCBgd2luZG93LnN0YXJzaGVsbGAgZ2xvYmFsIGlzIGF1dGhlbnRpYyBhbmQgbm90IHNwb29mZWQuXG4gKiBUaGlzIGNvbnRlbnQgc2NyaXB0IGlzIGV4ZWN1dGVkIGEgcnVudGltZSBieSB0aGUgc2VydmljZSwgc28gdGhlIG1vZHVsZSBleHBvcnRzIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGFuIGFyZ3VtZW50LlxuICogQHBhcmFtIC0gYSB7QGxpbmsgU2VydmljZVRvSWNzLlNlc3Npb25LZXlzfSBvYmplY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oe1xuXHRzZXNzaW9uOiBzaF9zZXNzaW9uLFxufSkge1xuXHQvLyB2ZXJib3NlXG5cdGNvbnN0IGRlYnVnID0gKHM6IHN0cmluZywgLi4uYV9hcmdzOiBhbnlbXSkgPT4gY29uc29sZS5kZWJ1ZyhgU3RhclNoZWxsLm1jcy1yYXRpZmllcjogJHtzfWAsIC4uLmFfYXJncyk7XG5cdGRlYnVnKGBMYXVuY2hlZCBvbiA8JHtsb2NhdGlvbi5ocmVmfT5gKTtcblxuXHRjb25zdCBobWFjU0hBMjU2ID0gaW5saW5lX3JlcXVpcmUoJ2NyeXB0by1qcy9obWFjLXNoYTI1NicpO1xuXG5cdC8vIHN1YmNsYXNzIEVycm9yIHRvIGJlIGFibGUgdG8gcmVjb2duaXplIG9iamVjdCBvcmlnaW5cblx0Y2xhc3MgU2VjdXJpdHlFcnJvciBleHRlbmRzIEVycm9yIHt9XG5cblxuXHQvLyBmbGFnIGluIGNhc2Ugc2VjdXJpdHkgdmlvbGF0aW9uIG9jY3Vyc1xuXHRsZXQgYl9hYm9ydGVkID0gZmFsc2U7XG5cblx0LyoqXG5cdCAqIEFib3J0IHBhZ2UgY29ubmVjdGlvbiBhbmQgcmVwb3J0IGEgc2VjdXJpdHkgZXJyb3Jcblx0ICovXG5cdGZ1bmN0aW9uIGFib3J0KHNfcmVhc29uOiBzdHJpbmcpIHtcblx0XHQvLyBzZXQgYWJvcnQgZmxhZ1xuXHRcdGJfYWJvcnRlZCA9IHRydWU7XG5cblx0XHQvLyBub3RpZnkgZXh0ZW5zaW9uXG5cdFx0d2luZG93LnBvc3RNZXNzYWdlKHtcblx0XHRcdHR5cGU6ICdzMnI6YWJvcnQnLFxuXHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0cmVhc29uOiAnJytzX3JlYXNvbixcblx0XHRcdFx0c2lnbmF0dXJlOiBobWFjU0hBMjU2KCcnK3NfcmVhc29uLCBzaF9zZXNzaW9uKSxcblx0XHRcdH0sXG5cdFx0fSk7XG5cblx0XHQvLyBqdW1wIG91dCBvZiBjYWxsIHN0YWNrXG5cdFx0dGhyb3cgbmV3IFNlY3VyaXR5RXJyb3IoYFN0YXJTaGVsbCB0aHJldyBhIHNlY3VyaXR5IGVycm9yOiBcIiR7c19yZWFzb259XCJgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaWxlbnRseSBhYm9ydCB0aGUgY29ubmVjdGlvbiB3aXRob3V0IGNvbW11bmljYXRpbmcgdG8gdGhlIGV4dGVuc2lvbiBvciBhbnl0aGluZyBlbHNlLlxuXHQgKi9cblx0ZnVuY3Rpb24gc2lsZW50X2V4aXQoc19lcnJvcjogc3RyaW5nKTogdm9pZCB7XG5cdFx0Ly8gb25seSBsb2cgdG8gY29uc29sZSBzaW5jZSBhbnlvbmUgY291bGQgaGF2ZSB0cmlnZ2VyZWQgdGhpcyBtZXNzYWdlXG5cdFx0Y29uc29sZS5lcnJvcihzX2Vycm9yKTtcblxuXHRcdGJfYWJvcnRlZCA9IHRydWU7XG5cdH1cblxuXHQvLyBpbiBvcmRlciB0byBwcmV2ZW50IHdlYnNpdGUgZnJvbSBkZXRlY3RpbmcgZXh0ZW5zaW9uLCBncmFiIFwiY2xlYW5cIiByZWZlcmVuY2UgdG8gcmVxdWlzaXRlIG5hdGl2ZXNcblx0Ly8gaW4gdGhlb3J5LCBhIG1hbGljaW91cyBjby1pbnN0YWxsZWQgZXh0ZW5zaW9uIGNvdWxkIGF0dGFjayBnbG9iYWwgc2NvcGUgdG8gcnVpbiB0aGlzIHByaXZhY3kgZmVhdHVyZVxuXHRjb25zdCB7XG5cdFx0YWRkRXZlbnRMaXN0ZW5lcjogZl9hZGRfZXZlbnRfbGlzdGVuZXIsXG5cdFx0UmVmbGVjdDogZF9yZWZsZWN0LFxuXHRcdFJlZmxlY3Q6IHtcblx0XHRcdGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZl9nZXRfb3duX3Byb3BlcnR5X2Rlc2NyaXB0b3IsXG5cdFx0XHRnZXRQcm90b3R5cGVPZjogZl9nZXRfcHJvdG90eXBlX29mLFxuXHRcdH0sXG5cdH0gPSB3aW5kb3c7XG5cblx0LyoqXG5cdCAqIFVzZSBuYXRpdmUgUmVmbGVjdCBmdW5jdGlvbnMgdG8gbG9jYXRlIHByb3BlcnR5IGRlc2NyaXB0b3Jcblx0ICovXG5cdCBmdW5jdGlvbiBsb2NhdGVfZGVzY3JpcHRvcih3X3JlZjogdW5rbm93biwgc2lfcHJvcDogc3RyaW5nLCBhX2xpbmVhZ2U6dW5rbm93bltdPVtdKTogbnVsbCB8IFByb3BlcnR5RGVzY3JpcHRvciB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIGdldCBkZXNjcmlwdG9yXG5cdFx0XHRjb25zdCBnX2Rlc2NyaXB0b3IgPSBmX2dldF9vd25fcHJvcGVydHlfZGVzY3JpcHRvci5jYWxsKGRfcmVmbGVjdCwgd19yZWYsIHNpX3Byb3ApO1xuXG5cdFx0XHQvLyBub3QgZGVmaW5lZFxuXHRcdFx0aWYoIWdfZGVzY3JpcHRvcikge1xuXHRcdFx0XHQvLyBhZGQgdGhpcyB0byBpZ25vcmUgc2V0XG5cdFx0XHRcdGFfbGluZWFnZS5wdXNoKHdfcmVmKVxuXG5cdFx0XHRcdC8vIGdldCBwYXJlbnRcblx0XHRcdFx0Y29uc3Qgd19wYXJlbnQgPSBmX2dldF9wcm90b3R5cGVfb2YuY2FsbChkX3JlZmxlY3QsIHdfcmVmKTtcblxuXHRcdFx0XHQvLyBlbmQgb2YgY2hhaW5cblx0XHRcdFx0aWYoIXdfcGFyZW50KSByZXR1cm4gbnVsbDtcblxuXHRcdFx0XHQvLyBibG9jayBwcm90b3R5cGUgY2hhaW4gY3ljbGVzXG5cdFx0XHRcdGlmKGFfbGluZWFnZS5pbmNsdWRlcyh3X3BhcmVudCkpIHJldHVybiBudWxsO1xuXG5cdFx0XHRcdC8vIHRyeSBwYXJlbnRcblx0XHRcdFx0cmV0dXJuIGxvY2F0ZV9kZXNjcmlwdG9yKHdfcGFyZW50LCBzaV9wcm9wLCBhX2xpbmVhZ2UpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZXR1cm4gZGVzY3JpcHRvclxuXHRcdFx0cmV0dXJuIGdfZGVzY3JpcHRvcjtcblx0XHR9XG5cdFx0Y2F0Y2goZV9nZXQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBVc2UgbmF0aXZlIFJlZmxlY3QgZnVuY3Rpb25zIHRvIGluc3BlY3QgcHJvcGVydHkgd2l0aG91dCB0cmlwcGluZyBwcm94aWVzL2FjY2Vzc29yc1xuXHQgKi9cblx0IGZ1bmN0aW9uIGFjY2Vzc19zaWxlbnRseSh3X3JlZjogYW55LCBzaV9wcm9wOiBzdHJpbmcsIGJfYWNjZXNzb3JzPWZhbHNlKTogdW5rbm93biB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIHRyeSBsb2NhdGUgZGVzY3JpcHRvclxuXHRcdFx0Y29uc3QgZ19kZXNjcmlwdG9yID0gbG9jYXRlX2Rlc2NyaXB0b3Iod19yZWYsIHNpX3Byb3ApO1xuXG5cdFx0XHQvLyBubyBwcm9wZXJ0eVxuXHRcdFx0aWYoIWdfZGVzY3JpcHRvcikgcmV0dXJuIG51bGw7XG5cblx0XHRcdC8vIHZhbHVlIGlzIG5vdCBzZXRcblx0XHRcdGlmKCEoJ3ZhbHVlJyBpbiBnX2Rlc2NyaXB0b3IpKSB7XG5cdFx0XHRcdC8vIGZhbGxiYWNrIHRvIHVzaW5nIGFjY2Vzc29ycyAobm90IGlkZWFsLCBidXQgbmVjZXNzYXJ5KVxuXHRcdFx0XHRpZihiX2FjY2Vzc29ycykgcmV0dXJuIHdfcmVmW3NpX3Byb3BdO1xuXG5cdFx0XHRcdC8vIGRvIG5vdCB0b3VjaCBhY2Nlc3NvcnNcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIG9rYXksIHJldHVybiB2YWx1ZVxuXHRcdFx0cmV0dXJuIGdfZGVzY3JpcHRvci52YWx1ZTtcblx0XHR9XG5cdFx0Y2F0Y2goZV9nZXQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8vIHByZXAgaGFuZGxlciBtYXBcblx0Y29uc3QgaF9oYW5kbGVyc193aW5kb3c6IFZvY2FiLkhhbmRsZXJzPEhvc3RUb1JhdGlmaWVyLldpbmRvd1ZvY2FiPiA9IHtcblx0XHQvLyByZXF1ZXN0IHRvIHJhdGlmeSBnbG9iYWwgZnJvbSBpbnBhZ2UgY29udGVudCBzY3JpcHRcblx0XHRyYXRpZnlHbG9iYWwoKSB7XG5cdFx0XHQvLyBkaWRuJ3QgcmVjZWl2ZSBzaWduaW5nIGtleVxuXHRcdFx0aWYoIXNoX3Nlc3Npb24pIHtcblx0XHRcdFx0cmV0dXJuIHNpbGVudF9leGl0KCdTdGFyU2hlbGwgaXMgcmVmdXNpbmcgdG8gcmF0aWZ5IGdsb2JhbCBzaW5jZSBpdCBuZXZlciByZWNlaXZlZCBhIHNpZ25pbmcga2V5IGZyb20gdGhlIGV4dGVuc2lvbi4nKTtcblx0XHRcdH1cblx0XHRcdC8vIG5vdCBkZWZpbmVkXG5cdFx0XHRlbHNlIGlmKCFsb2NhdGVfZGVzY3JpcHRvcih3aW5kb3csICdzdGFyc2hlbGwnKSkge1xuXHRcdFx0XHRyZXR1cm4gc2lsZW50X2V4aXQoJ1N0YXJTaGVsbCBmYWlsZWQgdG8gcmF0aWZ5IGdsb2JhbCBzaW5jZSBpdCBpcyBub3QgZGVmaW5lZC4nKTtcblx0XHRcdH1cblx0XHRcblx0XHRcdC8vIGNhcHR1cmUgcmVmZXJlbmNlXG5cdFx0XHRjb25zdCBrX3N0YXJzaGVsbCA9IHdpbmRvdy5zdGFyc2hlbGw7XG5cblx0XHRcdC8vIGludm9rZSBzeW5jaHJvbm91cyB2ZXJpZmljYXRpb24gY2FsbFxuXHRcdFx0bGV0IGZfcmF0aWZ5ID0ga19zdGFyc2hlbGwudmVyaWZ5KChzX3NpZ19hdXRoOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0Ly8gYWxyZWFkeSBhYm9ydGVkXG5cdFx0XHRcdGlmKGJfYWJvcnRlZCkgcmV0dXJuO1xuXG5cdFx0XHRcdC8vIGludmFsaWQgYXV0aCBzaWduYXR1cmU7IGRvIG5vdCBzaWduIGFyYml0cmFyeSBkYXRhXG5cdFx0XHRcdGlmKHNfc2lnX2F1dGggIT09IEpTT04uc3RyaW5naWZ5KGhtYWNTSEEyNTYoJ3N0YXJzaGVsbCcsIHNoX3Nlc3Npb24pKSkge1xuXHRcdFx0XHRcdHJldHVybiBhYm9ydCgnSW52YWxpZCBhdXRoIHNpZ25hdHVyZSBwYXNzZWQgdG8gcmF0aWZpZXInKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHByb2R1Y2UgdmVyaWZpYWJsZSBzdGFja1xuXHRcdFx0XHRjb25zdCBnX3Byb29mID0ga19zdGFyc2hlbGwudmVyaWZpYWJsZVN0YWNrKCk7XG5cblx0XHRcdFx0Ly8gc2lnbiB0aGUgcHJvb2Zcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRwcm9vZjogZ19wcm9vZixcblx0XHRcdFx0XHRzaWduYXR1cmU6IEpTT04uc3RyaW5naWZ5KGhtYWNTSEEyNTYoSlNPTi5zdHJpbmdpZnkoZ19wcm9vZiksIHNoX3Nlc3Npb24pKSxcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBjb25maXJtIGdsb2JhbCBieSByZWZlcmVuY2Vcblx0XHRcdGZfcmF0aWZ5KGtfc3RhcnNoZWxsKTtcblx0XHR9LFxuXHR9O1xuXG5cdC8vIHN0YXJ0IGxpc3RlbmluZyBmb3IgbWVzc2FnZXNcblx0KHdpbmRvdyBhcyBWb2NhYi5UeXBlZFdpbmRvdzxIb3N0VG9SYXRpZmllci5XaW5kb3dWb2NhYj4pLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZF9ldmVudCkgPT4ge1xuXHRcdC8vIHZlcmJvc2Vcblx0XHRkZWJ1ZygnT2JzZXJ2ZWQgd2luZG93IG1lc3NhZ2UgJW8nLCBkX2V2ZW50KTtcblxuXHRcdC8vIGFscmVhZHkgYWJvcnRlZDsgc2lsZW50bHkgZXhpdFxuXHRcdGlmKGJfYWJvcnRlZCkgcmV0dXJuO1xuXG5cdFx0Ly8gb3JpZ2luYXRlcyBmcm9tIHNhbWUgZnJhbWVcblx0XHRpZih3aW5kb3cgPT09IGFjY2Vzc19zaWxlbnRseShkX2V2ZW50LCAnc291cmNlJywgdHJ1ZSkpIHtcblx0XHRcdC8vIGFjY2VzcyBldmVudCBkYXRhXG5cdFx0XHRjb25zdCB6X2RhdGEgPSBhY2Nlc3Nfc2lsZW50bHkoZF9ldmVudCwgJ2RhdGEnLCB0cnVlKTtcblxuXHRcdFx0Ly8gZGF0YSBpdGVtIGNvbmZvcm1zXG5cdFx0XHRsZXQgc2lfdHlwZTtcblx0XHRcdGlmKHpfZGF0YSAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHpfZGF0YSAmJiAnc3RyaW5nJyA9PT0gdHlwZW9mIChzaV90eXBlPWFjY2Vzc19zaWxlbnRseSh6X2RhdGEsICd0eXBlJykpKSB7XG5cdFx0XHRcdC8vIHJlZiBoYW5kbGVyXG5cdFx0XHRcdGNvbnN0IGZfaGFuZGxlciA9IGhfaGFuZGxlcnNfd2luZG93W3NpX3R5cGVdO1xuXG5cdFx0XHRcdC8vIGlnbm9yZSB1bnJlZ2lzdGVyZWQgbWVzc2FnZVxuXHRcdFx0XHRpZighZl9oYW5kbGVyKSByZXR1cm47XG5cblx0XHRcdFx0Ly8gaGFuZGxlciBpcyByZWdpc3RlcmVkOyBleGVjdXRlIGl0XG5cdFx0XHRcdGRlYnVnKGBSZWNlaXZlZCByZWxheSBwb3J0IG1lc3NhZ2UgaGF2aW5nIHJlZ2lzdGVyZWQgdHlwZSAlb2AsIGRfZXZlbnQuZGF0YSk7XG5cdFx0XHRcdGZfaGFuZGxlcih6X2RhdGEpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59O1xuIiwiXG4vKipcbiAqIExvY2F0ZSBhIHNjcmlwdCBhc3NldCBpbiB0aGUgZXh0ZW5zaW9uIGJ1bmRsZSBieSBpdHMgcGF0aCBwcmVmaXguXG4gKiBAcGFyYW0gc19wYXR0ZXJuIHRoZSBwYXRoIHByZWZpeFxuICogQHJldHVybnMgZnVsbHkgcXVhbGlmaWVkIFVSTCB0byB0aGUgYXNzZXQsIG9yIGBudWxsYCBpZiBub3QgZm91bmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZV9zY3JpcHQoc19wYXR0ZXJuOiBzdHJpbmcpOiBudWxsIHwgc3RyaW5nIHtcblx0Y29uc3QgZ19tYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCk7XG5cblx0Ly8gZWFjaCBjb250ZW50IHNjcmlwdCBlbnRyeVxuXHRmb3IoY29uc3QgZ19zY3JpcHQgb2YgZ19tYW5pZmVzdC5jb250ZW50X3NjcmlwdHMgfHwgW10pIHtcblx0XHRmb3IoY29uc3Qgc3Jfc2NyaXB0IG9mIGdfc2NyaXB0LmpzID8/IFtdKSB7XG5cdFx0XHRpZihzcl9zY3JpcHQuc3RhcnRzV2l0aChzX3BhdHRlcm4pKSB7XG5cdFx0XHRcdHJldHVybiBzcl9zY3JpcHQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gZWFjaCB3ZWIgYWNjZXNzaWJsZSByZXNvdXJjZVxuXHRmb3IoY29uc3Qgel9yZXNvdXJjZSBvZiBnX21hbmlmZXN0LndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlcyB8fCBbXSkge1xuXHRcdC8vIGluIG1hbmlmZXN0IHYyXG5cdFx0aWYoJ3N0cmluZycgPT09IHR5cGVvZiB6X3Jlc291cmNlKSB7XG5cdFx0XHRpZih6X3Jlc291cmNlLnN0YXJ0c1dpdGgoc19wYXR0ZXJuKSkge1xuXHRcdFx0XHRyZXR1cm4gel9yZXNvdXJjZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gaW4gbWFuaWZlc3QgdjNcblx0XHRlbHNlIHtcblx0XHRcdGZvcihjb25zdCBzcl9zY3JpcHQgb2Ygel9yZXNvdXJjZS5yZXNvdXJjZXMpIHtcblx0XHRcdFx0aWYoc3Jfc2NyaXB0LnN0YXJ0c1dpdGgoc19wYXR0ZXJuKSkge1xuXHRcdFx0XHRcdHJldHVybiBzcl9zY3JpcHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn1cbiIsImltcG9ydCB0eXBlIGJyb3dzZXIgZnJvbSAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJztcbmltcG9ydCB0eXBlIHsgRGljdCwgSnNvbk9iamVjdCB9IGZyb20gJyMvdXRpbC9iZWx0JztcblxuaW1wb3J0IHtcblx0bG9jYXRlX3NjcmlwdCxcbn0gZnJvbSAnLi91dGlscyc7XG5cbmludGVyZmFjZSBTY3JpcHREZWZpbmVyIHtcblx0KGhfb3ZlcnJpZGVzPzogUGFydGlhbDxicm93c2VyLlNjcmlwdGluZy5SZWdpc3RlcmVkQ29udGVudFNjcmlwdD4pOiBicm93c2VyLlNjcmlwdGluZy5SZWdpc3RlcmVkQ29udGVudFNjcmlwdDtcbn1cblxuY29uc3QgQV9NQVRDSF9BTEwgPSBbXG5cdCdmaWxlOi8vKi8qJyxcblx0J2h0dHA6Ly8qLyonLFxuXHQnaHR0cHM6Ly8qLyonLFxuXTtcblxuY29uc3QgR19TQ1JJUFRfQkFTSUMgPSB7XG5cdG1hdGNoZXM6IEFfTUFUQ0hfQUxMLFxuXHRydW5BdDogJ2RvY3VtZW50X3N0YXJ0Jyxcblx0cGVyc2lzdEFjcm9zc1Nlc3Npb25zOiB0cnVlLFxuXHRhbGxGcmFtZXM6IHRydWUsXG5cdHdvcmxkOiAnTUFJTicsXG59IGFzIGNvbnN0O1xuXG5cbmV4cG9ydCBjb25zdCBIX0NPTlRFTlRfU0NSSVBUX0RFRlM6IERpY3Q8U2NyaXB0RGVmaW5lcj4gPSB7XG5cdC8vIGlucGFnZV93YWtlcihoX292ZXJyaWRlcykge1xuXHQvLyBcdHJldHVybiB7XG5cdC8vIFx0XHQuLi5HX1NDUklQVF9CQVNJQyxcblx0Ly8gXHRcdGlkOiAnaW5wYWdlX3dha2VyJyxcblx0Ly8gXHRcdGpzOiBbXG5cdC8vIFx0XHRcdGxvY2F0ZV9zY3JpcHQoJ2Fzc2V0cy9zcmMvc2NyaXB0L2lucGFnZS13YWtlcicpLFxuXHQvLyBcdFx0XSxcblx0Ly8gXHRcdC4uLmhfb3ZlcnJpZGVzLFxuXHQvLyBcdH07XG5cdC8vIH0sXG5cblx0Ly8gaW5wYWdlX2lmcmFtZShoX292ZXJyaWRlcykge1xuXHQvLyBcdHJldHVybiB7XG5cdC8vIFx0XHQuLi5HX1NDUklQVF9CQVNJQyxcblx0Ly8gXHRcdGlkOiAnaW5wYWdlX2lmcmFtZScsXG5cdC8vIFx0XHRqczogW1xuXHQvLyBcdFx0XHRsb2NhdGVfc2NyaXB0KCdhc3NldHMvc3JjL3NjcmlwdC9pbnBhZ2UtaWZyYW1lJyksXG5cdC8vIFx0XHRdLFxuXHQvLyBcdFx0Li4uaF9vdmVycmlkZXMsXG5cdC8vIFx0fTtcblx0Ly8gfSxcblxuXHRtY3Nfa2VwbHIoaF9vdmVycmlkZXMpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uR19TQ1JJUFRfQkFTSUMsXG5cdFx0XHRpZDogJ2tlcGxyX3BvbHlmaWxsJyxcblx0XHRcdGpzOiBbXG5cdFx0XHRcdGxvY2F0ZV9zY3JpcHQoJ2Fzc2V0cy9zcmMvc2NyaXB0L21jcy1rZXBscicpLFxuXHRcdFx0XSxcblx0XHRcdHBlcnNpc3RBY3Jvc3NTZXNzaW9uczogdHJ1ZSxcblx0XHRcdC4uLmhfb3ZlcnJpZGVzLFxuXHRcdH07XG5cdH0sXG59O1xuIiwiaW1wb3J0IHR5cGUgeyBBcHAgfSBmcm9tICcjL21ldGEvYXBwJztcblxuaW1wb3J0IHtcblx0Y3JlYXRlX3N0b3JlX2NsYXNzLFxuXHRXcml0YWJsZVN0b3JlLFxufSBmcm9tICcuL19iYXNlJztcblxuaW1wb3J0IHsgU0lfU1RPUkVfQVBQX1BPTElDSUVTIH0gZnJvbSAnIy9zaGFyZS9jb25zdGFudHMnO1xuXG5cbmV4cG9ydCB0eXBlIEFwcFBvbGljeSA9IHtcblx0YWN0aW9uOiAnYmxvY2snIHwgJ3RydXN0Jztcblx0bWF0Y2hlczogc3RyaW5nO1xuXHRleGNlcHQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQXBwUG9saWN5UmVzdWx0ID0ge1xuXHRibG9ja2VkOiB0cnVlO1xufSB8IHtcblx0YmxvY2tlZDogZmFsc2U7XG5cblx0Ly8gaW5kaWNhdGVzIHRoYXQgdGhlIHVzZXIgZG9lcyBub3QgbmVlZCBcblx0dHJ1c3RlZDogYm9vbGVhbjtcbn07XG5cbmNvbnN0IEdfQVBQX1BPTElDWV9SRVNVTFRfQkxPQ0tFRDogQXBwUG9saWN5UmVzdWx0ID0ge1xuXHRibG9ja2VkOiB0cnVlLFxufTtcblxuXG5mdW5jdGlvbiBwb2xpY3lfYXBwbGllcyhnX3BvbGljeTogQXBwUG9saWN5LCBnX2FwcDogQXBwWydpbnRlcmZhY2UnXSk6IGJvb2xlYW4ge1xuXHQvLyBjb21waWxlIG1hdGNoIHBhdHRlcm5cblx0bGV0IHJfbWF0Y2hlczogUmVnRXhwO1xuXHR0cnkge1xuXHRcdHJfbWF0Y2hlcyA9IG5ldyBSZWdFeHAoZ19wb2xpY3kubWF0Y2hlcyk7XG5cdH1cblx0Ly8gZmFpbGVkIHRvIHBhcnNlIHBvbGljeVxuXHRjYXRjaChlX3BhcnNlKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHBhcnNlIHBvbGljeSBtYXRjaCBwYXR0ZXJuIFwiJHtnX3BvbGljeS5tYXRjaGVzfVwiYCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gcG9saWN5IGFwcGxpZXNcblx0aWYocl9tYXRjaGVzLnRlc3QoZ19hcHAuaG9zdCkpIHtcblx0XHQvLyBwb2xpY3kgaGFzIGFuIGV4Y2VwdCBwYXR0ZXJuXG5cdFx0aWYoZ19wb2xpY3kuZXhjZXB0KSB7XG5cdFx0XHQvLyBjb21waWxlIGV4Y2VwdCBwYXR0ZXJuXG5cdFx0XHRsZXQgcl9leGNlcHQ6IFJlZ0V4cDtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJfZXhjZXB0ID0gbmV3IFJlZ0V4cChnX3BvbGljeS5leGNlcHQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gZmFpbGVkIHRvIHBhcnNlIHBvbGljeVxuXHRcdFx0Y2F0Y2goZV9wYXJzZSkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcGFyc2UgcG9saWN5IG1hdGNoIHBhdHRlcm4gXCIke2dfcG9saWN5LmV4Y2VwdH1cImApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGV4Y2VwdCBwYXR0ZXJuIG1hdGNoZXM7IHNraXAgcG9saWN5XG5cdFx0XHRpZihyX2V4Y2VwdC50ZXN0KGdfYXBwLmhvc3QpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBwb2xpY3kgYXBwbGllc1xuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuXG5leHBvcnQgY29uc3QgUG9saWNpZXMgPSBjcmVhdGVfc3RvcmVfY2xhc3Moe1xuXHRzdG9yZTogU0lfU1RPUkVfQVBQX1BPTElDSUVTLFxuXHRjbGFzczogY2xhc3MgUG9saWNpZXNJIGV4dGVuZHMgV3JpdGFibGVTdG9yZTx0eXBlb2YgU0lfU1RPUkVfQVBQX1BPTElDSUVTLCBBcHBQb2xpY3k+IHtcblx0XHRzdGF0aWMgZm9yQXBwKGdfYXBwOiBBcHBbJ2ludGVyZmFjZSddKTogUHJvbWlzZTxBcHBQb2xpY3lSZXN1bHQ+IHtcblx0XHRcdHJldHVybiBQb2xpY2llcy5vcGVuKGtzX3BvbGljaWVzID0+IGtzX3BvbGljaWVzLmZvckFwcChnX2FwcCkpO1xuXHRcdH1cblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvcmVxdWlyZS1hd2FpdFxuXHRcdGZvckFwcChnX2FwcDogQXBwWydpbnRlcmZhY2UnXSk6IEFwcFBvbGljeVJlc3VsdCB7XG5cdFx0XHQvLyBwcmVwIHRydXN0ZWQgZmxhZ1xuXHRcdFx0bGV0IGJfdHJ1c3RlZCA9IGZhbHNlO1xuXG5cdFx0XHQvLyBzdGVwIHRocnUgZWFjaCBocSBwb2xpY3lcblx0XHRcdGZvcihjb25zdCBnX3BvbGljeSBvZiB0aGlzLl93X2NhY2hlWydocSddKSB7XG5cdFx0XHRcdC8vIHBvbGljeSBhcHBsaWVzXG5cdFx0XHRcdGlmKHBvbGljeV9hcHBsaWVzKGdfcG9saWN5LCBnX2FwcCkpIHtcblx0XHRcdFx0XHQvLyBibG9ja2VkXG5cdFx0XHRcdFx0aWYoJ2Jsb2NrJyA9PT0gZ19wb2xpY3kuYWN0aW9uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gR19BUFBfUE9MSUNZX1JFU1VMVF9CTE9DS0VEO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyB1bmtub3duXG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGBVbmtub3duIGhxIHBvbGljeSBhY3Rpb24gXCIke2dfcG9saWN5LmFjdGlvbn1cImApO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHN0ZXAgdGhydSBlYWNoIHVzZXIgcG9saWN5XG5cdFx0XHRmb3IoY29uc3QgZ19wb2xpY3kgb2YgdGhpcy5fd19jYWNoZVsndXNlciddKSB7XG5cdFx0XHRcdC8vIHBvbGljeSBhcHBsaWVzXG5cdFx0XHRcdGlmKHBvbGljeV9hcHBsaWVzKGdfcG9saWN5LCBnX2FwcCkpIHtcblx0XHRcdFx0XHQvLyBibG9ja2VkXG5cdFx0XHRcdFx0aWYoJ2Jsb2NrJyA9PT0gZ19wb2xpY3kuYWN0aW9uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gR19BUFBfUE9MSUNZX1JFU1VMVF9CTE9DS0VEO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyB0cnVzdGVkIG9ubHkgYWxsb3dlZCBmcm9tIHVzZXJcblx0XHRcdFx0XHRlbHNlIGlmKCd0cnVzdCcgPT09IGdfcG9saWN5LmFjdGlvbikge1xuXHRcdFx0XHRcdFx0Yl90cnVzdGVkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gdW5rbm93blxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgVW5rbm93biBwb2xpY3kgYWN0aW9uIFwiJHtnX3BvbGljeS5hY3Rpb259XCJgKTtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBhbGxvd2VkXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRibG9ja2VkOiBmYWxzZSxcblx0XHRcdFx0dHJ1c3RlZDogYl90cnVzdGVkLFxuXHRcdFx0fTtcblx0XHR9XG5cdH0sXG59KTtcbiIsImltcG9ydCB7XG5cdGNyZWF0ZV9zdG9yZV9jbGFzcyxcblx0V3JpdGFibGVTdG9yZURpY3QsXG59IGZyb20gJy4vX2Jhc2UnO1xuXG5pbXBvcnQgeyBTSV9TVE9SRV9TRVRUSU5HUyB9IGZyb20gJyMvc2hhcmUvY29uc3RhbnRzJztcblxuXG5leHBvcnQgdHlwZSBTZXR0aW5nc1JlZ2lzdHJ5ID0ge1xuXHRhbGxvd19maWxlX3VybHM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBTZXR0aW5nc0tleSA9IGtleW9mIFNldHRpbmdzUmVnaXN0cnk7XG5cbmV4cG9ydCBjb25zdCBTZXR0aW5ncyA9IGNyZWF0ZV9zdG9yZV9jbGFzcyh7XG5cdHN0b3JlOiBTSV9TVE9SRV9TRVRUSU5HUyxcblx0ZXh0ZW5zaW9uOiAnZGljdCcsXG5cdGNsYXNzOiBjbGFzcyBTZXR0aW5nc0kgZXh0ZW5kcyBXcml0YWJsZVN0b3JlRGljdDx0eXBlb2YgU0lfU1RPUkVfU0VUVElOR1M+IHtcblx0XHQvLyBzdGF0aWMgYXN5bmMgZ2V0PHNpX2tleSBleHRlbmRzIFNldHRpbmdzS2V5PihzaV9rZXk6IHNpX2tleSk6IFByb21pc2U8bnVsbCB8IFNldHRpbmdzUmVnaXN0cnlbc2lfa2V5XT4ge1xuXHRcdC8vIFx0cmV0dXJuIGF3YWl0IFNldHRpbmdzLm9wZW4oKGtzX3NldHRpbmdzKSA9PiBrc19zZXR0aW5ncy5nZXQoc2lfa2V5KSk7XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gc3RhdGljIGFzeW5jIHB1dDxcblx0XHQvLyBcdHNpX2tleSBleHRlbmRzIFNldHRpbmdzS2V5LFxuXHRcdC8vIFx0d192YWx1ZSBleHRlbmRzIFNldHRpbmdzUmVnaXN0cnlbc2lfa2V5XSxcblx0XHQvLyA+KHNpX2tleTogc2lfa2V5LCB3X3ZhbHVlOiB3X3ZhbHVlKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Ly8gXHRyZXR1cm4gYXdhaXQgU2V0dGluZ3Mub3Blbigoa3Nfc2V0dGluZ3MpID0+IGtzX3NldHRpbmdzLnB1dChzaV9rZXksIHdfdmFsdWUpKTtcblx0XHQvLyB9XG5cdH0sXG59KTtcbiIsImV4cG9ydCBjb25zdCBOQl9NQVhfTUVTU0FHRSA9IDIgKiAxMDI0ICogMTAyNDsgIC8vIDIgTWlCIG1heGltdW1cblxuZXhwb3J0IGNvbnN0IE5fUFhfV0lEVEhfUE9QVVAgPSAzNjA7XG5leHBvcnQgY29uc3QgTl9QWF9IRUlHSFRfUE9QVVAgPSA2MDA7XG5cbmV4cG9ydCBjb25zdCBBX0NIQUlOX0ZBTUlMSUVTID0gW1xuXHQnY29zbW9zJyxcbl07XG5cbmV4cG9ydCBjb25zdCBBX0NIQUlOX0NBVEVHT1JJRVMgPSBbXG5cdCdtYWlubmV0Jyxcblx0J3Rlc3RuZXQnLFxuXTtcblxuLy8gY2hhaW4gaWQgcGF0dGVyblxuZXhwb3J0IGNvbnN0IFJfQ0hBSU5fSUQgPSAvXlthLXowLTldW2EtejAtOS1dezIsNjR9JC87XG5cbi8vIGNoYWluIG5hbWUgcGF0dGVyblxuZXhwb3J0IGNvbnN0IFJfQ0hBSU5fTkFNRSA9IC9eW1xccHtMfVxccHtTfV0oXFxwe1pzfT9bXFxwe0x9XFxwe059XFxwe1N9Ll86Ly1dKSskL3U7XG4iLCJpbXBvcnQge1xuXHROX1BYX1dJRFRIX1BPUFVQLFxuXHROX1BYX0hFSUdIVF9QT1BVUCxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBJbnRyYUV4dCB9IGZyb20gJy4vbWVzc2FnZXMnO1xuaW1wb3J0IHR5cGUgeyBWb2NhYiB9IGZyb20gJyMvbWV0YS92b2NhYic7XG5pbXBvcnQgdHlwZSB7IERpY3QsIEpzb25PYmplY3QgfSBmcm9tICcjL3V0aWwvYmVsdCc7XG5pbXBvcnQgeyBzZXNzaW9uX3N0b3JhZ2VfZ2V0LCBzZXNzaW9uX3N0b3JhZ2VfcmVtb3ZlIH0gZnJvbSAnIy9jcnlwdG8vdmF1bHQnO1xuaW1wb3J0IHsgWFRfU0VDT05EUyB9IGZyb20gJyMvc2hhcmUvY29uc3RhbnRzJztcbmltcG9ydCB7IG9uY2Vfc3RvcmFnZV9jaGFuZ2VzIH0gZnJvbSAnLi9zZXJ2aWNlJztcblxuXG50eXBlIEZsb3cgPSBWb2NhYi5NZXNzYWdlPEludHJhRXh0LkZsb3dWb2NhYj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvbXB0Q29uZmlnIGV4dGVuZHMgSnNvbk9iamVjdCB7XG5cdGZsb3c6IEZsb3c7XG59XG5cbnR5cGUgRmxvd0hhbmRsZSA9IHtcblx0d2luZG93OiBjaHJvbWUud2luZG93cy5XaW5kb3c7XG5cdHRhYjogY2hyb21lLnRhYnMuVGFiO1xufTtcblxuaW50ZXJmYWNlIFNjcmVlbkluZm8ge1xuXHR3aWR0aDogbnVtYmVyO1xuXHRoZWlnaHQ6IG51bWJlcjtcblx0YXZhaWxXaWR0aDogbnVtYmVyO1xuXHRhdmFpbEhlaWdodDogbnVtYmVyO1xuXHRvcmllbnRhdGlvbjogSnNvbk9iamVjdDtcblx0ZGV2aWNlUGl4ZWxSYXRpbzogbnVtYmVyLFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmxvd19nZW5lcmljKGhfcGFyYW1zOiBEaWN0KTogUHJvbWlzZTxGbG93SGFuZGxlPiB7XG5cdC8vIGdldCBmbG93IFVSTFxuXHRjb25zdCBwX2Zsb3cgPSBjaHJvbWUucnVudGltZS5nZXRVUkwoJ3NyYy9lbnRyeS9mbG93Lmh0bWwnKTtcblxuXHQvLyBpbmRpY2F0ZSB2aWEgcXVlcnkgcGFyYW1zIG1ldGhvZCBvZiBjb21tdW5pY2F0aW9uXG5cdGNvbnN0IHBfY29ubmVjdCA9IHBfZmxvdysnPycrbmV3IFVSTFNlYXJjaFBhcmFtcyhoX3BhcmFtcykudG9TdHJpbmcoKTtcblxuXHQvLyBmZXRjaCBkaXNwbGF5cyBhbmQgc2NyZWVuIGluZm9cblx0Y29uc3QgW1xuXHRcdGFfZGlzcGxheXMsXG5cdFx0Z19zY3JlZW5faW5mbyxcblx0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcblx0XHRjaHJvbWUuc3lzdGVtLmRpc3BsYXkuZ2V0SW5mbygpLFxuXG5cdFx0KGFzeW5jKCk6IFByb21pc2U8U2NyZWVuSW5mbyB8IHVuZGVmaW5lZD4gPT4ge1xuXHRcdFx0Ly8gY3JlYXRlIHBvcHVwIHRvIGRldGVybWluZSBzY3JlZW4gZGltZW5zaW9uc1xuXHRcdFx0Y29uc3QgZ19pbmZvID0gKGF3YWl0IGNocm9tZS5zdG9yYWdlLnNlc3Npb24uZ2V0KFsnZGlzcGxheV9pbmZvJ10pKT8uZGlzcGxheV9pbmZvO1xuXHRcdFx0aWYoZ19pbmZvKSByZXR1cm4gZ19pbmZvO1xuXG5cdFx0XHR2b2lkIGNocm9tZS53aW5kb3dzLmNyZWF0ZSh7XG5cdFx0XHRcdHR5cGU6ICdwb3B1cCcsXG5cdFx0XHRcdHVybDogcF9mbG93Kyc/JytuZXcgVVJMU2VhcmNoUGFyYW1zKHtoZWFkbGVzczonaW5mbyd9KS50b1N0cmluZygpLFxuXHRcdFx0XHRmb2N1c2VkOiB0cnVlLFxuXHRcdFx0XHR3aWR0aDogTl9QWF9XSURUSF9QT1BVUCxcblx0XHRcdFx0aGVpZ2h0OiBOX1BYX0hFSUdIVF9QT1BVUCxcblx0XHRcdH0pO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXR1cm4gKGF3YWl0IG9uY2Vfc3RvcmFnZV9jaGFuZ2VzKCdzZXNzaW9uJywgJ2Rpc3BsYXlfaW5mbycsIDUqWFRfU0VDT05EUykpPy5uZXdWYWx1ZTtcblx0XHRcdH1cblx0XHRcdGNhdGNoKGVfdGltZW91dCkge31cblx0XHR9KSgpLFxuXHRdKTtcblxuXHQvLyBjcmVhdGUgZGlzcGxheXMgZGljdFxuXHRjb25zdCBoX2Rpc3BsYXlzID0ge307XG5cdGZvcihjb25zdCBnX2Rpc3BsYXkgb2YgYV9kaXNwbGF5cykge1xuXHRcdGlmKGdfZGlzcGxheS5pc0VuYWJsZWQpIHtcblx0XHRcdGhfZGlzcGxheXNbZ19kaXNwbGF5LmJvdW5kcy53aWR0aCsnOicrZ19kaXNwbGF5LmJvdW5kcy5oZWlnaHRdID0gZ19kaXNwbGF5O1xuXHRcdH1cblx0fVxuXG5cdC8vIHNldCBkaXNwbGF5IHByb3BlcnRpZXNzIHRvIGJlIGNlbnRlciBvZiBzY3JlZW5cblx0bGV0IGdfd2luZG93X3Bvc2l0aW9uID0ge307XG5cdGlmKGdfc2NyZWVuX2luZm8pIHtcblx0XHRjb25zdCBzaV9kaXNwbGF5ID0gZ19zY3JlZW5faW5mby53aWR0aCsnOicrZ19zY3JlZW5faW5mby5oZWlnaHQ7XG5cdFx0Y29uc3QgZ19kaXNwbGF5ID0gaF9kaXNwbGF5c1tzaV9kaXNwbGF5XTtcblx0XHRpZihnX2Rpc3BsYXkpIHtcblx0XHRcdGdfd2luZG93X3Bvc2l0aW9uID0ge1xuXHRcdFx0XHRsZWZ0OiBnX2Rpc3BsYXkuYm91bmRzLmxlZnQgKyBNYXRoLnJvdW5kKChnX3NjcmVlbl9pbmZvLndpZHRoIC8gMikgLSAoTl9QWF9XSURUSF9QT1BVUCAvIDIpKSxcblx0XHRcdFx0dG9wOiBnX2Rpc3BsYXkuYm91bmRzLnRvcCArIE1hdGgucm91bmQoKGdfc2NyZWVuX2luZm8uaGVpZ2h0ICogMC40NSkgLSAoTl9QWF9IRUlHSFRfUE9QVVAgLyAyKSksXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdC8vIGNyZWF0ZSB3aW5kb3dcblx0Y29uc3QgZ193aW5kb3cgPSBhd2FpdCBjaHJvbWUud2luZG93cy5jcmVhdGUoe1xuXHRcdHR5cGU6ICdwb3B1cCcsXG5cdFx0dXJsOiBwX2Nvbm5lY3QsXG5cdFx0Zm9jdXNlZDogdHJ1ZSxcblx0XHR3aWR0aDogTl9QWF9XSURUSF9QT1BVUCxcblx0XHRoZWlnaHQ6IE5fUFhfSEVJR0hUX1BPUFVQLFxuXHRcdC4uLmdfd2luZG93X3Bvc2l0aW9uLFxuXHR9KTtcblxuXHQvLyB3aW5kb3cgd2FzIG5vdCBjcmVhdGVkXG5cdGlmKCdudW1iZXInICE9PSB0eXBlb2YgZ193aW5kb3cuaWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgcG9wdXAgd2luZG93Jyk7XG5cdH1cblxuXHQvLyBmZXRjaCBpdHMgdmlld1xuXHRjb25zdCBkdl9wb3B1cCA9IGF3YWl0IGNocm9tZS53aW5kb3dzLmdldChnX3dpbmRvdy5pZCwge1xuXHRcdHdpbmRvd1R5cGVzOiBbJ3BvcHVwJ10sXG5cdH0pO1xuXG5cdC8vIG5vIHZpZXdcblx0aWYoIWR2X3BvcHVwKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbG9jYXRlIHBvcHVwIHdpbmRvdycpO1xuXHR9XG5cblx0Ly8gd2FpdCBmb3IgdGFiIHRvIGxvYWRcblx0Y29uc3QgZHRfY3JlYXRlZDogY2hyb21lLnRhYnMuVGFiID0gYXdhaXQgbmV3IFByb21pc2UoKGZrX2NyZWF0ZWQpID0+IHtcblx0XHQvLyB0YWIgdXBkYXRlIGV2ZW50XG5cdFx0Y2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uIHRhYl91cGRhdGUoaV90YWIsIGdfaW5mbywgZHRfdXBkYXRlZCkge1xuXHRcdFx0Ly8gaXMgdGhlIHRhcmdldCB0YWJcblx0XHRcdGlmKGdfd2luZG93LmlkID09PSBkdF91cGRhdGVkLndpbmRvd0lkICYmICdudW1iZXInID09PSB0eXBlb2YgaV90YWIpIHtcblx0XHRcdFx0Ly8gbG9hZGluZyBjb21wZWx0ZWRcblx0XHRcdFx0aWYoJ2NvbXBsZXRlJyA9PT0gZ19pbmZvLnN0YXR1cykge1xuXHRcdFx0XHRcdC8vIHJlbW92ZSBsaXN0ZW5lclxuXHRcdFx0XHRcdGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih0YWJfdXBkYXRlKTtcblxuXHRcdFx0XHRcdC8vIHJlc29sdmUgcHJvbWlzZVxuXHRcdFx0XHRcdGZrX2NyZWF0ZWQoZHRfdXBkYXRlZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0cmV0dXJuIHtcblx0XHR3aW5kb3c6IGdfd2luZG93LFxuXHRcdHRhYjogZHRfY3JlYXRlZCxcblx0fTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZsb3dfYnJvYWRjYXN0KGdjX3Byb21wdDogUHJvbXB0Q29uZmlnLCBzaV9yZXE9JycpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0Ly8gbmFtZSB0byB1c2UgZm9yIHByaXZhdGUgYnJvYWRjYXN0IGNoYW5uZWxcblx0Y29uc3Qgc2lfY2hhbm5lbCA9IGBmbG93XyR7Y3J5cHRvLnJhbmRvbVVVSUQoKX1gO1xuXG5cdC8vIGF3YWl0aW5nIGZvciBhIHByZXZpb3VzIGZsb3cgdG8gY29tcGxldGVcblx0Y29uc3Qgc19mbG93ID0gYXdhaXQgc2Vzc2lvbl9zdG9yYWdlX2dldCgnZmxvdycpIHx8ICcnO1xuXHRpZihzX2Zsb3cpIHtcblx0XHQvLyBUT0RPOiBpbXBsZW1lbnRcblx0fVxuXG5cdC8vIGNyZWF0ZSBmbG93IHRhYlxuXHRjb25zdCB7XG5cdFx0d2luZG93OiBnX3dpbmRvdyxcblx0XHR0YWI6IGR0X2Zsb3csXG5cdH0gPSBhd2FpdCBmbG93X2dlbmVyaWMoe1xuXHRcdGNvbW06ICdicm9hZGNhc3QnLFxuXHRcdG5hbWU6IHNpX2NoYW5uZWwsXG5cdH0pO1xuXG5cdC8vIGNvbW11bmljYXRlIHdpdGggcG9wdXAgdXNpbmcgYnJvYWRjYXN0IGNoYW5uZWxcblx0Y29uc3QgZF9icm9hZGNhc3Q6IFZvY2FiLlR5cGVkQnJvYWRjYXN0PEludHJhRXh0LkZsb3dWb2NhYiwgSW50cmFFeHQuRmxvd1Jlc3BvbnNlVm9jYWI+ID0gbmV3IEJyb2FkY2FzdENoYW5uZWwoc2lfY2hhbm5lbCk7XG5cblx0Ly8gZ28gYXN5bmNcblx0cmV0dXJuIG5ldyBQcm9taXNlKChma19yZXNvbHZlKSA9PiB7XG5cdFx0Ly8gd2hlbiByZWFkeSB0byByZXNvbHZlIHRoZSBwb21pc2Vcblx0XHRmdW5jdGlvbiBzaHV0ZG93bihiX2Fuc3dlcjogYm9vbGVhbikge1xuXHRcdFx0Ly8gcmVtb3ZlIHdpbmRvdyBjbG9zZSBsaXN0ZW5lclxuXHRcdFx0Y2hyb21lLndpbmRvd3Mub25SZW1vdmVkLnJlbW92ZUxpc3RlbmVyKGNsb3NlX2xpc3RlbmVyKTtcblxuXHRcdFx0Ly8gcmVtb3ZlIGJyb2FkY2FzdCBsaXN0ZW5lclxuXHRcdFx0ZF9icm9hZGNhc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG1lc3NhZ2VfbGlzdGVuZXIpO1xuXG5cdFx0XHQvLyBjbGVhciBmbG93XG5cdFx0XHR2b2lkIHNlc3Npb25fc3RvcmFnZV9yZW1vdmUoJ2Zsb3cnKTtcblxuXHRcdFx0Ly8gcmVzb2x2ZSB3aXRoIGFuc3dlclxuXHRcdFx0ZmtfcmVzb2x2ZShiX2Fuc3dlcik7XG5cdFx0fVxuXG5cdFx0Ly8gaGFuZGxlIGluY29taW5nIG1lc3NhZ2VzXG5cdFx0ZnVuY3Rpb24gbWVzc2FnZV9saXN0ZW5lcihkX2V2ZW50KSB7XG5cdFx0XHQvLyBwYXJzZSByZXNwb25zZVxuXHRcdFx0Y29uc3QgZ19tc2cgPSBkX2V2ZW50LmRhdGE7XG5cblx0XHRcdC8vIGZsb3cgY29tcGxldGVkXG5cdFx0XHRpZignY29tcGxldGVGbG93JyA9PT0gZ19tc2cudHlwZSkge1xuXHRcdFx0XHQvLyBraWxsIHRoZSBmbG93IHdpbmRvdyAobm8gbmVlZCB0byB3YWl0IGZvciBpdCB0byByZXNvbHZlKVxuXHRcdFx0XHRjaHJvbWUud2luZG93cy5yZW1vdmUoZ193aW5kb3cuaWQhKTtcblxuXHRcdFx0XHQvLyBzaHV0ZG93biB3aXRoIGFuc3dlclxuXHRcdFx0XHRzaHV0ZG93bihnX21zZy52YWx1ZS5hbnN3ZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGxpc3RlbiBmb3IgaW5jb21pbmcgbWVzc2FnZXMgb24gYnJvYWRjYXN0IGNoYW5uZWxcblx0XHRkX2Jyb2FkY2FzdC5vbm1lc3NhZ2UgPSBtZXNzYWdlX2xpc3RlbmVyO1xuXG5cdFx0Ly8gaGFuZGxlIHBvcHVwIHdpbmRvdyBiZWluZyBjbG9zZWRcblx0XHRmdW5jdGlvbiBjbG9zZV9saXN0ZW5lcihpX3dpbmRvdykge1xuXHRcdFx0Ly8gdGFyZ2V0IHdpbmRvdzsgc2h1dGRvd24gd2l0aCBlZmZlY3RpdmUgY2FuY2VsIGFuc3dlclxuXHRcdFx0aWYoaV93aW5kb3cgPT09IGdfd2luZG93LmlkISkgc2h1dGRvd24oZmFsc2UpO1xuXHRcdH1cblxuXHRcdC8vIGxpc3RlbiBmb3IgcG9wdXAgd2luZG93IGJlaW5nIGNsb3NlZFxuXHRcdGNocm9tZS53aW5kb3dzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcihjbG9zZV9saXN0ZW5lciwge1xuXHRcdFx0d2luZG93VHlwZXM6IFsncG9wdXAnXSxcblx0XHR9KTtcblxuXHRcdC8vIHNlbmQgbWVzc2FnZVxuXHRcdGRfYnJvYWRjYXN0LnBvc3RNZXNzYWdlKGdjX3Byb21wdC5mbG93KTtcblx0fSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmbG93X3F1ZXJ5KGdjX3Byb21wdDogUHJvbXB0Q29uZmlnKTogUHJvbWlzZTx2b2lkPiB7XG5cdC8vIGNyZWF0ZSBmbG93IHRhYlxuXHRhd2FpdCBmbG93X2dlbmVyaWMoe1xuXHRcdGNvbW06ICdxdWVyeScsXG5cdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZ2NfcHJvbXB0KSxcblx0fSk7XG59XG5cblxuLy8gLyoqXG4vLyAgKiBHZW5lcmF0ZSBhIG5ldyBwcml2YXRlL3NoYXJlZCBzZWNyZXQga2V5IG9mIHRoZSBzcGVjaWZpZWQgc2l6ZSBpbiBieXRlcyAoZGVmYXVsdHMgdG8gNTEyLWJpdCBrZXkpXG4vLyAgKi9cbi8vIGV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZV9rZXkobmJfc2l6ZT02NCk6IHN0cmluZyB7XG4vLyBcdC8vIHByZXAgc3BhY2UgaW4gbWVtb3J5XG4vLyBcdGNvbnN0IGF0dThfc2VjcmV0ID0gbmV3IFVpbnQ4QXJyYXkobmJfc2l6ZSk7XG5cbi8vIFx0Ly8gZmlsbCB3aXRoIGNyeXB0byByYW5kb20gdmFsdWVzXG4vLyBcdGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYXR1OF9zZWNyZXQpO1xuXG4vLyBcdC8vIGNvbnZlcnQgdG8gaGV4IHN0cmluZ1xuLy8gXHRyZXR1cm4gQXJyYXkuZnJvbShhdHU4X3NlY3JldCkubWFwKHggPT4geC50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSkuam9pbignJyk7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBibG9ja19hcHAoZ19zZW5kZXI6IE1lc3NhZ2VTZW5kZXIsIHNfbXNnOiBzdHJpbmcpIHtcbi8vIFx0Y29uc29sZS53YXJuKGAke3NfbXNnfTsgYmxvY2tlZCByZXF1ZXN0IGZyb20gPCR7Z19zZW5kZXIudXJsfT5gKTtcbi8vIH1cblxuLy8gLy8gbG9jYWxob3N0IHBhdHRlcm5cbi8vIGNvbnN0IFJfTE9DQUxIT1NUID0gL14obG9jYWxob3N0fDEyNy4wLjAuMSkoOlxcZCspPyQvO1xuXG5cbi8vIGV4cG9ydCBuYW1lc3BhY2UgSXNvbW9ycGhpYyB7XG4vLyBcdGV4cG9ydCB0eXBlIE1lc3NhZ2U8PiA9IHtcbi8vIFx0XHRnX3NlbmRlcjogUGljazxjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyLCAndGFiJyB8ICd1cmwnPjtcblxuLy8gXHR9O1xuLy8gfVxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdEFkdmVydGlzZW1lbnQoe1xuLy8gXHRnX3NlbmRlcixcbi8vIH06IElzb21vcnBoaWMuTWVzc2FnZSkge1xuLy8gXHQvLyBubyBzZW5kZXI7IHNpbGVudGx5IHJlamVjdFxuLy8gXHRpZighZ19zZW5kZXIudGFiIHx8ICdudW1iZXInICE9PSB0eXBlb2YgZ19zZW5kZXIudGFiLmlkKSB7XG4vLyBcdFx0Y29uc29sZS5lcnJvcihgUmVmdXNpbmcgdG8gYWR2ZXJ0aXNlIHRvIHVua25vd24gc2VuZGVyYCk7XG4vLyBcdFx0cmV0dXJuO1xuLy8gXHR9XG5cbi8vIFx0Ly8gcmVmIHRhYiBpZFxuLy8gXHRjb25zdCBpX3RhYiA9IGdfc2VuZGVyLnRhYi5pZDtcblxuLy8gXHQvLyB1bmtub3duIHNvdXJjZSwgc2lsZW50bHkgcmVqZWN0XG4vLyBcdGlmKCFnX3NlbmRlci51cmwpIHtcbi8vIFx0XHRjb25zb2xlLmRlYnVnKCdTaWxlbnRseSBpZ25vcmluZyBhZHZlcnRpc2VtZW50IHJlcXVlc3QgZnJvbSB1bmtub3duIHNvdXJjZScpO1xuLy8gXHRcdHJldHVybjtcbi8vIFx0fVxuXG4vLyBcdC8vIHBhcnNlIHNlbmRlciB1cmxcbi8vIFx0Y29uc3Qge1xuLy8gXHRcdHByb3RvY29sOiBzX3Byb3RvY29sLFxuLy8gXHRcdGhvc3Q6IHNfaG9zdCxcbi8vIFx0fSA9IG5ldyBVUkwoZ19zZW5kZXIudXJsKTtcblxuLy8gXHQvLyBub3JtYWxpemUgc2NoZW1lXG4vLyBcdGNvbnN0IHNfc2NoZW1lID0gKHNfcHJvdG9jb2wgfHwgJycpLnJlcGxhY2UoLzokLywgJycpO1xuXG4vLyBcdC8vIGNoZWNrIGlmIGFwcCBpcyBsb2NrZWRcbi8vIFx0Y29uc3QgYl91bmxvY2tlZCA9IGF3YWl0IHNlc3Npb25fc3RvcmFnZV9nZXQoJ3VubG9ja2VkJyk7XG4vLyBcdGlmKCFiX3VubG9ja2VkKSB7XG4vLyBcdFx0Ly8gYXNrIHVzZXIgdG8gbG9naW5cbi8vIFx0XHRjb25zdCBiX2ZpbmlzaGVkID0gYXdhaXQgZmxvd19icm9hZGNhc3Qoe1xuLy8gXHRcdFx0Zmxvdzoge1xuLy8gXHRcdFx0XHR0eXBlOiAnbG9naW4nLFxuLy8gXHRcdFx0fSxcbi8vIFx0XHR9KTtcblxuLy8gXHRcdC8vIHVzZXIgY2FuY2VsbGVkOyBkbyBub3QgYWR2ZXJ0aXNlXG4vLyBcdFx0aWYoIWJfZmluaXNoZWQpIHtcbi8vIFx0XHRcdHJldHVybjtcbi8vIFx0XHR9XG4vLyBcdH1cblxuLy8gXHQvLyBvcGVuIHN0b3JhZ2Vcbi8vIFx0Y29uc3Qga19zdG9yYWdlID0gYXdhaXQgRXh0U3RvcmFnZS5vcGVuKCk7XG5cbi8vIFx0Ly8gbm9uLXNlY3VyZSBjb250ZXh0cyBvbmx5IGFsbG93ZWQgYXQgbG9jYWxob3N0XG4vLyBcdGlmKCdodHRwJyA9PT0gc19zY2hlbWUpIHtcbi8vIFx0XHQvLyBub3QgbG9jYWxob3N0XG4vLyBcdFx0aWYoIVJfTE9DQUxIT1NULnRlc3Qoc19ob3N0KSkge1xuLy8gXHRcdFx0cmV0dXJuIGJsb2NrX2FwcChnX3NlbmRlciwgJ05vbi1zZWN1cmUgSFRUUCBjb250ZXh0cyBhcmUgbm90IGFsbG93ZWQgdG8gY29ubmVjdCB0byB3YWxsZXQgZXhjZXB0IGZvciBsb2NhbGhvc3QnKTtcbi8vIFx0XHR9XG4vLyBcdH1cbi8vIFx0Ly8gZmlsZVxuLy8gXHRlbHNlIGlmKCdmaWxlJyA9PT0gc19zY2hlbWUpIHtcbi8vIFx0XHQvLyBjaGVjayBwb2xpY3lcbi8vIFx0XHRpZighKGF3YWl0IGtfc3RvcmFnZS5nZXRTZXR0aW5nKCdhbGxvd19maWxlX3VybHMnKSkpIHtcbi8vIFx0XHRcdHJldHVybiBibG9ja19hcHAoZ19zZW5kZXIsIGBGaWxlIFVSTHMgYXJlIG5vdCBhbGxvd2VkIHRvIGNvbm5lY3QgdG8gd2FsbGV0LCB1bmxlc3MgJ2FsbG93X2ZpbGVfdXJscycgc2V0dGluZyBpcyBlbmFibGVkYCk7XG4vLyBcdFx0fVxuLy8gXHR9XG4vLyBcdC8vIGFueXRoaW5nIGVsc2Vcbi8vIFx0ZWxzZSBpZignaHR0cHMnICE9PSBzX3NjaGVtZSkge1xuLy8gXHRcdHJldHVybiBibG9ja19hcHAoZ19zZW5kZXIsIGBTY2hlbWUgbm90IGFsbG93ZWQgXCIke3Nfc2NoZW1lfVwiYCk7XG4vLyBcdH1cblxuLy8gXHQvLyBjaGVja291dCBhcHBzIHN0b3JlXG4vLyBcdGF3YWl0IGtfc3RvcmFnZS5ib3Jyb3coWydhcHBzJ10sIGFzeW5jKGhfY2hlY2tvdXRzKSA9PiB7XG4vLyBcdFx0Y29uc3Qge1xuLy8gXHRcdFx0YXBwczoga3NfYXBwcyxcbi8vIFx0XHR9ID0gaF9jaGVja291dHM7XG5cbi8vIFx0XHQvLyBsb29rdXAgYXBwIGluIHN0b3JlXG4vLyBcdFx0bGV0IGdfYXBwID0gYXdhaXQga3NfYXBwcy5nZXQoc19ob3N0LCBzX3NjaGVtZSk7XG5cdFxuLy8gXHRcdC8vIGFwcCBpcyBub3QgeWV0IHJlZ2lzdGVyZWQ7IGluaXRpYWxpemVcbi8vIFx0XHRpZighZ19hcHApIHtcbi8vIFx0XHRcdGdfYXBwID0ge1xuLy8gXHRcdFx0XHRzY2hlbWU6IHNfc2NoZW1lLFxuLy8gXHRcdFx0XHRob3N0OiBzX2hvc3QsXG4vLyBcdFx0XHRcdGNvbm5lY3Rpb25zOiB7fSxcbi8vIFx0XHRcdH07XG4vLyBcdFx0fVxuXG4vLyBcdFx0Ly8gbG9va3VwIHBvbGljeSBvbiBhcHBcbi8vIFx0XHRjb25zdCBnX3BvbGljeSA9IGF3YWl0IGtfc3RvcmFnZS5nZXRQb2xpY3lGb3JBcHAoZ19hcHApO1xuXG4vLyBcdFx0Ly8gYSBwb2xpY3kgaW5kaWNhdGVzIHRoaXMgYXBwIGlzIGJsb2NrZWRcbi8vIFx0XHRpZihnX3BvbGljeS5ibG9ja2VkKSB7XG4vLyBcdFx0XHRyZXR1cm4gYmxvY2tfYXBwKGdfc2VuZGVyLCAnQXBwIGNvbm5lY3Rpb24gYmxvY2tlZCBieSBwb2xpY3knKTtcbi8vIFx0XHR9XG5cbi8vIFx0XHQvLyBhcHAgZG9lcyBub3QgaGF2ZSBhbnkgY29ubmVjdGlvbnNcbi8vIFx0XHRpZighT2JqZWN0LmtleXMoZ19hcHAuY29ubmVjdGlvbnMpLmxlbmd0aCkge1xuLy8gXHRcdFx0Ly8gYXBwIGlzIG5vdCB0cnVzdGVkOyByZXF1aXJlcyB1c2VyIGFwcHJvdmFsXG4vLyBcdFx0XHRpZighZ19wb2xpY3kudHJ1c3RlZCkge1xuLy8gXHRcdFx0XHQvLyByZXF1ZXN0IGFwcHJvdmFsIGZyb20gdXNlclxuLy8gXHRcdFx0XHRhd2FpdCBmbG93X2Jyb2FkY2FzdCh7XG4vLyBcdFx0XHRcdFx0Zmxvdzoge1xuLy8gXHRcdFx0XHRcdFx0dHlwZTogJ3JlcXVlc3RBZHZlcnRpc2VtZW50Jyxcbi8vIFx0XHRcdFx0XHRcdHZhbHVlOiB7XG4vLyBcdFx0XHRcdFx0XHRcdHRhYklkOiBpX3RhYixcbi8vIFx0XHRcdFx0XHRcdFx0YXBwOiBnX2FwcCxcbi8vIFx0XHRcdFx0XHRcdH0sXG4vLyBcdFx0XHRcdFx0fSxcbi8vIFx0XHRcdFx0fSk7XG5cbi8vIFx0XHRcdFx0Ly8gdXBkYXRlIHN0b3JlXG4vLyBcdFx0XHRcdGF3YWl0IGtzX2FwcHMucHV0KGdfYXBwKTtcbi8vIFx0XHRcdH1cbi8vIFx0XHR9XG4vLyBcdH0pO1xuXG4vLyBcdC8vIFRPRE86IGNvbnNpZGVyIHdoYXQgd2lsbCBoYXBwZW4gaWYgcHJvbXB0IGNsb3NlcyBidXQgc2VyaWNlIHdvcmtlciBiZWNvbWVzIGluYWN0aXZlXG5cbi8vIFx0Ly8gdmVyYm9zZVxuLy8gXHRjb25zb2xlLmRlYnVnKGBBbGxvd2luZyA8JHtnX3NlbmRlci51cmx9PiB0byByZWNlaXZlIGFkdmVydGlzZW1lbnRgKTtcblxuLy8gXHQvLyBzZWNyZXRzIGZvciB0aGlzIHNlc3Npb25cbi8vIFx0Y29uc3QgZ19zZWNyZXRzOiBTZXJ2aWNlVG9JY3MuU2Vzc2lvbktleXMgPSB7XG4vLyBcdFx0c2Vzc2lvbjogZ2VuZXJhdGVfa2V5KCksXG4vLyBcdH07XG5cbi8vIFx0Ly8gZXhlY3V0ZSBpc29sYXRlZC13b3JsZCBjb250ZW50IHNjcmlwdCAnaG9zdCdcbi8vIFx0Y2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbi8vIFx0XHR0YXJnZXQ6IHtcbi8vIFx0XHRcdHRhYklkOiBpX3RhYixcbi8vIFx0XHR9LFxuLy8gXHRcdGZ1bmM6IEljc0hvc3QsXG4vLyBcdFx0YXJnczogW2dfc2VjcmV0c10sXG4vLyBcdFx0d29ybGQ6ICdJU09MQVRFRCcsXG4vLyBcdH0pO1xuXG4vLyBcdC8vIGV4ZWN1dGUgbWFpbi13b3JsZCBjb250ZW50IHNjcmlwdCAncmF0aWZpZXInXG4vLyBcdGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4vLyBcdFx0dGFyZ2V0OiB7XG4vLyBcdFx0XHR0YWJJZDogaV90YWIsXG4vLyBcdFx0fSxcbi8vIFx0XHRmdW5jOiBNY3NSYXRpZmllcixcbi8vIFx0XHRhcmdzOiBbZ19zZWNyZXRzXSxcbi8vIFx0XHR3b3JsZDogJ01BSU4nLFxuLy8gXHR9KTtcblxuLy8gXHQvLyByZXNwb25kIHRvIGlucGFnZSBjb250ZW50IHNjcmlwdCB3aXRoIHNlc3Npb24gc2VjcmV0c1xuLy8gXHRyZXR1cm4gZ19zZWNyZXRzO1xuLy8gfSIsImltcG9ydCB0eXBlIGJyb3dzZXIgZnJvbSAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJztcblxuaW1wb3J0ICogYXMgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG5cbmltcG9ydCB7IERpY3QsIEpzb25PYmplY3QsIEpzb25WYWx1ZSwgb2RlLCBQcm9taXNhYmxlIH0gZnJvbSAnIy91dGlsL2JlbHQnO1xuXG5pbXBvcnQgdHlwZSB7XG5cdEljc1RvU2VydmljZSxcblx0U2VydmljZVRvSWNzLFxufSBmcm9tICcuL21lc3NhZ2VzJztcblxuaW1wb3J0IEljc0hvc3QgZnJvbSAnLi9pY3MtaG9zdCc7XG5pbXBvcnQgTWNzUmF0aWZpZXIgZnJvbSAnLi9tY3MtcmF0aWZpZXInO1xuXG5pbXBvcnQge1xuXHRIX0NPTlRFTlRfU0NSSVBUX0RFRlMsXG59IGZyb20gJy4vc2NyaXB0cyc7XG5cbmltcG9ydCB0eXBlIHsgVm9jYWIgfSBmcm9tICcjL21ldGEvdm9jYWInO1xuaW1wb3J0IHsgVmF1bHQgfSBmcm9tICcjL2NyeXB0by92YXVsdCc7XG5pbXBvcnQgeyBBcHBzIH0gZnJvbSAnIy9zdG9yZS9hcHBzJztcbmltcG9ydCB7IFBvbGljaWVzIH0gZnJvbSAnIy9zdG9yZS9wb2xpY2llcyc7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJyMvc3RvcmUvc2V0dGluZ3MnO1xuaW1wb3J0IHsgZmxvd19icm9hZGNhc3QgfSBmcm9tICcuL21zZy1mbG93JztcbmltcG9ydCB7IFBfU1RBUlNIRUxMX0RFQ1JFRVMsIFJfRE9NQUlOX0xPQ0FMSE9TVCwgUl9UUkFOU0ZFUl9BTU9VTlQsIFNJX1ZFUlNJT04sIFhUX01JTlVURVMgfSBmcm9tICcjL3NoYXJlL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDaGFpbnMgfSBmcm9tICcjL3N0b3JlL2NoYWlucyc7XG5pbXBvcnQgeyBBY3RpdmVOZXR3b3JrLCBCYWxhbmNlQnVuZGxlLCBOZXR3b3JrcyB9IGZyb20gJyMvc3RvcmUvbmV0d29ya3MnO1xuaW1wb3J0IHsgQ29zbW9zTmV0d29yaywgZm9sZF9hdHRycywgUGVuZGluZ1NlbmQsIFR5cGVkRXZlbnQgfSBmcm9tICcjL2NoYWluL21haW4nO1xuaW1wb3J0IHsgQWNjb3VudHMgfSBmcm9tICcjL3N0b3JlL2FjY291bnRzJztcbmltcG9ydCBCaWdOdW1iZXIgZnJvbSAnYmlnbnVtYmVyLmpzJztcbmltcG9ydCB7IGFiYnJldmlhdGVfYWRkciwgZm9ybWF0X2Ftb3VudCwgZm9ybWF0X2ZpYXQgfSBmcm9tICcjL3V0aWwvZm9ybWF0JztcbmltcG9ydCB0eXBlIHsgQmVjaDMyLCBDaGFpbiwgQ2hhaW5QYXRoLCBOYXRpdmVDb2luIH0gZnJvbSAnIy9tZXRhL2NoYWluJztcbmltcG9ydCB0eXBlIHsgQ29pbiB9IGZyb20gJ2Nvc21vcy1ncnBjL2Rpc3QvY29zbW9zL2Jhc2UvdjFiZXRhMS9jb2luJztcbmltcG9ydCB7IHl3X25ldHdvcmtfYWN0aXZlIH0gZnJvbSAnIy9hcHAvbWVtJztcbmltcG9ydCB7IGdsb2JhbF9icm9hZGNhc3QsIGdsb2JhbF9yZWNlaXZlIH0gZnJvbSAnLi9tc2ctZ2xvYmFsJztcbmltcG9ydCB0eXBlIHsgTmV0d29yayB9IGZyb20gJyMvbWV0YS9uZXR3b3JrJztcbmltcG9ydCB7IGJ1ZmZlcl90b19iYXNlNjQsIHNoYTI1Nl9zeW5jLCB0ZXh0X3RvX2J1ZmZlciB9IGZyb20gJyMvdXRpbC9kYXRhJztcbmltcG9ydCB7IHN5c2Vyciwgc3lzd2FybiB9IGZyb20gJyMvYXBwL2NvbW1vbic7XG5pbXBvcnQgeyBBZ2VudHMgfSBmcm9tICcjL3N0b3JlL2FnZW50cyc7XG5pbXBvcnQgdHlwZSB7IEJsb2NrSW5mb0hlYWRlciB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB0eXBlIHsgQWNjb3VudCB9IGZyb20gJyMvbWV0YS9hY2NvdW50JztcbmltcG9ydCB7IEV2ZW50cyB9IGZyb20gJyMvc3RvcmUvZXZlbnRzJztcbmltcG9ydCB0eXBlIHsgTG9nRXZlbnQgfSBmcm9tICcjL21ldGEvc3RvcmUnO1xuaW1wb3J0IHsgRGVjcmVlLCBXZWJSZXNvdXJjZUNhY2hlIH0gZnJvbSAnIy9zdG9yZS93ZWItcmVzb3VyY2UtY2FjaGUnO1xuaW1wb3J0IHsgY2hlY2tfcmVzdHJpY3Rpb25zIH0gZnJvbSAnIy9leHRlbnNpb24vcmVzdHJpY3Rpb25zJztcblxuaW50ZXJmYWNlIFNlcnZpY2VNZXNzYWdlSGFuZGxlciB7XG5cdChtZXNzYWdlOiBhbnksIHNlbmRlcjogTWVzc2FnZVNlbmRlciwgc2VuZFJlc3BvbnNlOiAocmVzcG9uc2U/OiBhbnkpID0+IHZvaWQpOiB2b2lkO1xufVxuXG4vLyBjb25zdCBOX1BYX1dJRFRIX1BPUFVQID0gMzYwO1xuLy8gY29uc3QgTl9QWF9IRUlHSFRfUE9QVVAgPSA2MDA7XG5cblxuXG4vLyB0eXBlIGFsaWFzZXNcbmludGVyZmFjZSBTdG9yYWdlQ2hhbmdlPHdfdmFsdWUgZXh0ZW5kcyBKc29uVmFsdWU+IGV4dGVuZHMgY2hyb21lLnN0b3JhZ2UuU3RvcmFnZUNoYW5nZSB7XG5cdG5ld1ZhbHVlPzogd192YWx1ZTtcblx0b2xkVmFsdWU/OiB3X3ZhbHVlO1xufVxuXG50eXBlIFN0b3JhZ2VBcmVhID0gJ2xvY2FsJyB8ICdzZXNzaW9uJyB8ICdzeW5jJyB8ICdtYW5hZ2VkJztcblxuY29uc3QgSF9TVE9SQUdFX1NDSEVNQVMgPSB7XG5cdHN5bmM6IHtcblx0XHRrZXBscl9wb2x5ZmlsbDoge30sXG5cdH0sXG5cdGxvY2FsOiB7XG5cdFx0Ly8gYXBwczoge30sXG5cdH0sXG5cdHNlc3Npb246IHt9LFxuXHRtYW5hZ2VkOiB7fSxcbn0gYXMgY29uc3Q7XG5cbnR5cGUgU3RvcmFnZUxpc3RlbmVyPFxuXHRzaV9hcmVhIGV4dGVuZHMgU3RvcmFnZUFyZWEsXG4+ID0gc2lfYXJlYSBleHRlbmRzIFN0b3JhZ2VBcmVhXG5cdD8gUmVjb3JkPGtleW9mIHR5cGVvZiBIX1NUT1JBR0VfU0NIRU1BU1tzaV9hcmVhXSwge1xuXHRcdChnX2NoYW5nZTogU3RvcmFnZUNoYW5nZTxTVl9LZXBsclBvbHlmaWxsPik6IFByb21pc2U8dm9pZD47XG5cdH0+XG5cdDogdm9pZDtcblxudHlwZSBTdG9yYWdlTGlzdGVuZXJNYXAgPSB7XG5cdFtzaV9hcmVhIGluIFN0b3JhZ2VBcmVhXT86IFN0b3JhZ2VMaXN0ZW5lcjxzaV9hcmVhPjtcbn1cblxudHlwZSBTVl9LZXBsclBvbHlmaWxsID0gYm9vbGVhbjtcblxuXG50eXBlIFN0b3JhZ2VDaGFuZ2VDYWxsYmFjayA9IChnX2NoYW5nZTogY2hyb21lLnN0b3JhZ2UuU3RvcmFnZUNoYW5nZSkgPT4gUHJvbWlzYWJsZTx2b2lkPjtcblxuY29uc3QgZ19hd2FpdGVyczogUmVjb3JkPFN0b3JhZ2VBcmVhLCBEaWN0PFN0b3JhZ2VDaGFuZ2VDYWxsYmFja1tdPj4gPSB7XG5cdHN5bmM6IHt9LFxuXHRsb2NhbDoge30sXG5cdHNlc3Npb246IHt9LFxuXHRtYW5hZ2VkOiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbmNlX3N0b3JhZ2VfY2hhbmdlcyhzaV9hcmVhOiBTdG9yYWdlQXJlYSwgc2lfa2V5OiBzdHJpbmcsIHh0X3RpbWVvdXQ9MCk6IFByb21pc2U8Y2hyb21lLnN0b3JhZ2UuU3RvcmFnZUNoYW5nZT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKGZrX3Jlc29sdmUsIGZlX3JlamVjdCkgPT4ge1xuXHRcdGNvbnN0IGhfYXdhaXRlcnMgPSBnX2F3YWl0ZXJzW3NpX2FyZWFdO1xuXHRcdGNvbnN0IGFfYXdhaXRlcnMgPSBoX2F3YWl0ZXJzW3NpX2tleV0gPSBoX2F3YWl0ZXJzW3NpX2tleV0gfHwgW107XG5cblx0XHRsZXQgaV9hd2FpdGVyID0gLTE7XG5cdFx0bGV0IGlfdGltZW91dCA9IDA7XG5cdFx0aWYoeHRfdGltZW91dCA+IDApIHtcblx0XHRcdGlfdGltZW91dCA9IGdsb2JhbFRoaXMuc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdC8vIHJlbW92ZSBhd2FpdGVyXG5cdFx0XHRcdGFfYXdhaXRlcnMuc3BsaWNlKGlfYXdhaXRlciwgMSk7XG5cblx0XHRcdFx0Ly8gcmVqZWN0XG5cdFx0XHRcdGZlX3JlamVjdChuZXcgRXJyb3IoYFRpbWVkIG91dGApKTtcblx0XHRcdH0sIHh0X3RpbWVvdXQpO1xuXHRcdH1cblxuXHRcdGlfYXdhaXRlciA9IGFfYXdhaXRlcnMucHVzaCgoZ19jaGFuZ2UpID0+IHtcblx0XHRcdGdsb2JhbFRoaXMuY2xlYXJUaW1lb3V0KGlfdGltZW91dCk7XG5cdFx0XHRma19yZXNvbHZlKGdfY2hhbmdlKTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGZpcmVfc3RvcmFnZV9jaGFuZ2Uoc2lfYXJlYTogU3RvcmFnZUFyZWEsIHNpX2tleTogc3RyaW5nLCBnX2NoYW5nZTogY2hyb21lLnN0b3JhZ2UuU3RvcmFnZUNoYW5nZSkge1xuXHRjb25zdCBoX2F3YWl0ZXJzID0gZ19hd2FpdGVyc1tzaV9hcmVhXTtcblx0Y29uc3QgYV9hd2FpdGVycyA9IGhfYXdhaXRlcnNbc2lfa2V5XTtcblxuXHRpZihhX2F3YWl0ZXJzPy5sZW5ndGgpIHtcblx0XHQvLyByZXNldCBhd2FpdGVyc1xuXHRcdGhfYXdhaXRlcnNbc2lfa2V5XSA9IFtdO1xuXG5cdFx0Ly8gY2FsbCBlYWNoIGxpc3RlbmVyXG5cdFx0Zm9yKGNvbnN0IGZfYXdhaXRlciBvZiBhX2F3YWl0ZXJzKSB7XG5cdFx0XHR2b2lkIGZfYXdhaXRlcihnX2NoYW5nZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8vIFxuY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKChoX2NoYW5nZXMsIHNpX2FyZWEpID0+IHtcblx0Y29uc3QgSF9TVE9SQUdFX0xJU1RFTkVSUzogU3RvcmFnZUxpc3RlbmVyTWFwID0ge1xuXHRcdHN5bmM6IHtcblx0XHRcdC8vIFxuXHRcdFx0YXN5bmMga2VwbHJfcG9seWZpbGwoZ19jaGFuZ2UpIHtcblx0XHRcdFx0Y29uc3QgZF9zY3JpcHRpbmcgPSBjaHJvbWUuc2NyaXB0aW5nIGFzIGJyb3dzZXIuU2NyaXB0aW5nLlN0YXRpYztcblx0XG5cdFx0XHRcdC8vIGJ1aWxkIHRoZSBjb250ZW50IHNjcmlwdCBkZWZpbml0aW9uXG5cdFx0XHRcdGNvbnN0IGdjX3NjcmlwdCA9IEhfQ09OVEVOVF9TQ1JJUFRfREVGUy5tY3Nfa2VwbHIoKTtcblx0XG5cdFx0XHRcdC8vIGNoZWNrIHRoZSBjdXJyZW50IHN0YXR1cyBvZiB0aGUgc2NyaXB0LCBpLmUuLCB3aGV0aGVyIG9yIG5vdCBpdCBpcyBlbmFibGVkXG5cdFx0XHRcdC8vIHplcm8gbGVuZ3RoIGluZGljYXRlcyBubyBjdXJyZW50bHkgcmVnaXN0ZXJlZCBzY3JpcHRzIG1hdGNoIHRoZSBnaXZlbiBpZFxuXHRcdFx0XHRjb25zdCBiX3JlZ2lzdGVyZWQgPSAhIShhd2FpdCBkX3NjcmlwdGluZy5nZXRSZWdpc3RlcmVkQ29udGVudFNjcmlwdHMoe1xuXHRcdFx0XHRcdGlkczogW2djX3NjcmlwdC5pZF0sXG5cdFx0XHRcdH0pKS5sZW5ndGg7XG5cdFxuXHRcdFx0XHQvLyBLZXBsciBwb2x5ZmlsbCBvcHRpb24gaXMgbm93IGVuYWJsZWRcblx0XHRcdFx0aWYodHJ1ZSA9PT0gZ19jaGFuZ2UubmV3VmFsdWUpIHtcblx0XHRcdFx0XHQvLyBzY3JpcHQgaXMgbm90IGN1cnJlbnRseSByZWdpc3RlcmVkXG5cdFx0XHRcdFx0aWYoIWJfcmVnaXN0ZXJlZCkge1xuXHRcdFx0XHRcdFx0Ly8gcmVnaXN0ZXIgdGhlIGNvbnRlbnQgc2NyaXB0XG5cdFx0XHRcdFx0XHRhd2FpdCBkX3NjcmlwdGluZy5yZWdpc3RlckNvbnRlbnRTY3JpcHRzKFtcblx0XHRcdFx0XHRcdFx0Z2Nfc2NyaXB0LFxuXHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIEtlcGxyIHBvbHlmaWxsIG9wdGlvbiBpcyBub3cgZGlzYWJsZWRcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Ly8gc2NyaXB0IGlzIGN1cnJlbnRseSByZWdpc3RlcmVkXG5cdFx0XHRcdFx0aWYoIWJfcmVnaXN0ZXJlZCkge1xuXHRcdFx0XHRcdFx0Ly8gdW5yZWdpc3RlciB0aGUgY29udGVudCBzY3JpcHRcblx0XHRcdFx0XHRcdGF3YWl0IGRfc2NyaXB0aW5nLnVucmVnaXN0ZXJDb250ZW50U2NyaXB0cyh7XG5cdFx0XHRcdFx0XHRcdGlkczogW2djX3NjcmlwdC5pZF1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XG5cdFx0fSxcblxuXHRcdC8vIC8vIGxvY2FsIHN0b3JhZ2UgYXJlYSBjaGFuZ2UgbGlzdGVuZXJcblx0XHRsb2NhbDoge30sXG5cblx0XHRzZXNzaW9uOiB7fSxcblxuXHRcdG1hbmFnZWQ6IHt9LFxuXHR9O1xuXHRcblx0Ly8gbG9va3VwIG5hbWVzcGFjZS1zcGVjaWZpYyBsaXN0ZW5lciBkaWN0XG5cdGNvbnN0IGhfbGlzdGVuZXJzID0gSF9TVE9SQUdFX0xJU1RFTkVSU1tzaV9hcmVhXTtcblxuXHQvLyBsaXN0ZW5lcnMgYXZhaWxhYmxlXG5cdGlmKGhfbGlzdGVuZXJzKSB7XG5cdFx0Ly8gZWFjaCBjaGFuZ2UgY2hhbmdlc1xuXHRcdGZvcihjb25zdCBzaV9rZXkgaW4gaF9jaGFuZ2VzKSB7XG5cdFx0XHRjb25zdCBnX2NoYW5nZSA9IGhfY2hhbmdlc1tzaV9rZXldO1xuXG5cdFx0XHQvLyBmaXJlIGF3YWl0ZXIgY2FsbGJhY2tzIGZpcnN0XG5cdFx0XHRmaXJlX3N0b3JhZ2VfY2hhbmdlKHNpX2FyZWEsIHNpX2tleSwgZ19jaGFuZ2UpO1xuXG5cdFx0XHQvLyBsaXN0ZW5lciBleGlzdHMgZm9yIHRoaXMga2V5XG5cdFx0XHRjb25zdCBmX2xpc3RlbmVyID0gaF9saXN0ZW5lcnNbc2lfa2V5XTtcblx0XHRcdGlmKGZfbGlzdGVuZXIpIHtcblx0XHRcdFx0Zl9saXN0ZW5lcihnX2NoYW5nZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbn0pO1xuXG5cbnR5cGUgTWVzc2FnZVNlbmRlciA9IGNocm9tZS5ydW50aW1lLk1lc3NhZ2VTZW5kZXI7XG5cbmludGVyZmFjZSBTZW5kUmVzcG9uc2Uge1xuXHQod19kYXRhPzogYW55KTogdm9pZDtcbn1cblxuaW50ZXJmYWNlIE1lc3NhZ2VIYW5kbGVyPHdfbXNnPWFueT4ge1xuXHQoZ19tc2c6IHdfbXNnLCBnX3NlbmRlcjogTWVzc2FnZVNlbmRlciwgZmtfcmVzcG9uZDogU2VuZFJlc3BvbnNlKTogdm9pZCB8IGJvb2xlYW5cbn1cblxuZnVuY3Rpb24gcGFyc2Vfc2VuZGVyKHBfc2VuZGVyOiBzdHJpbmcpIHtcblx0Ly8gcGFyc2Ugc2VuZGVyIHVybFxuXHRjb25zdCB7XG5cdFx0cHJvdG9jb2w6IHNfcHJvdG9jb2wsXG5cdFx0aG9zdDogc19ob3N0LFxuXHR9ID0gbmV3IFVSTChwX3NlbmRlcik7XG5cblx0Ly8gbm9ybWFsaXplIHNjaGVtZVxuXHRjb25zdCBzX3NjaGVtZSA9IChzX3Byb3RvY29sIHx8ICcnKS5yZXBsYWNlKC86JC8sICcnKTtcblxuXHRyZXR1cm4gW3Nfc2NoZW1lIGFzICdmaWxlJyB8ICdodHRwJyB8ICdodHRwcycsIHNfaG9zdF0gYXMgY29uc3Q7XG59XG5cblxuZnVuY3Rpb24gYmxvY2tfYXBwKGdfc2VuZGVyOiBNZXNzYWdlU2VuZGVyLCBzX21zZzogc3RyaW5nKTogYm9vbGVhbiB7XG5cdGNvbnNvbGUud2FybihgJHtzX21zZ307IGJsb2NrZWQgcmVxdWVzdCBmcm9tIDwke2dfc2VuZGVyLnVybH0+YCk7XG5cdHJldHVybiB0cnVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhcHBfYmxvY2tlZChzX3NjaGVtZTogc3RyaW5nLCBzX2hvc3Q6IHN0cmluZywgZ19zZW5kZXI6IE1lc3NhZ2VTZW5kZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0Ly8gbm9uLXNlY3VyZSBjb250ZXh0cyBvbmx5IGFsbG93ZWQgYXQgbG9jYWxob3N0XG5cdGlmKCdodHRwJyA9PT0gc19zY2hlbWUpIHtcblx0XHQvLyBub3QgbG9jYWxob3N0XG5cdFx0aWYoIVJfRE9NQUlOX0xPQ0FMSE9TVC50ZXN0KHNfaG9zdCkpIHtcblx0XHRcdHJldHVybiBibG9ja19hcHAoZ19zZW5kZXIsICdOb24tc2VjdXJlIEhUVFAgY29udGV4dHMgYXJlIG5vdCBhbGxvd2VkIHRvIGNvbm5lY3QgdG8gd2FsbGV0IGV4Y2VwdCBmb3IgbG9jYWxob3N0Jyk7XG5cdFx0fVxuXHR9XG5cdC8vIGZpbGVcblx0ZWxzZSBpZignZmlsZScgPT09IHNfc2NoZW1lKSB7XG5cdFx0Ly8gY2hlY2sgcG9saWN5XG5cdFx0Y29uc3QgYl9hbGxvd2VkID0gYXdhaXQgU2V0dGluZ3MuZ2V0KCdhbGxvd19maWxlX3VybHMnKTtcblx0XHRpZighYl9hbGxvd2VkKSB7XG5cdFx0XHRyZXR1cm4gYmxvY2tfYXBwKGdfc2VuZGVyLCBgRmlsZSBVUkxzIGFyZSBub3QgYWxsb3dlZCB0byBjb25uZWN0IHRvIHdhbGxldCwgdW5sZXNzICdhbGxvd19maWxlX3VybHMnIHNldHRpbmcgaXMgZW5hYmxlZGApO1xuXHRcdH1cblx0fVxuXHQvLyBhbnl0aGluZyBlbHNlXG5cdGVsc2UgaWYoJ2h0dHBzJyAhPT0gc19zY2hlbWUpIHtcblx0XHRyZXR1cm4gYmxvY2tfYXBwKGdfc2VuZGVyLCBgU2NoZW1lIG5vdCBhbGxvd2VkIFwiJHtzX3NjaGVtZX1cImApO1xuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEhhbmRsZSBtZXNzYWdlcyBmcm9tIGNvbnRlbnQgc2NyaXB0c1xuICovXG5jb25zdCBtZXNzYWdlX3JvdXRlcjogTWVzc2FnZUhhbmRsZXIgPSAoZ19tc2csIGdfc2VuZGVyLCBma19yZXNwb25kKSA9PiB7XG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSBhIG5ldyBwcml2YXRlL3NoYXJlZCBzZWNyZXQga2V5IG9mIHRoZSBzcGVjaWZpZWQgc2l6ZSBpbiBieXRlcyAoZGVmYXVsdHMgdG8gNTEyLWJpdCBrZXkpXG5cdCAqL1xuXHRmdW5jdGlvbiBnZW5lcmF0ZV9rZXkobmJfc2l6ZT02NCk6IHN0cmluZyB7XG5cdFx0Ly8gcHJlcCBzcGFjZSBpbiBtZW1vcnlcblx0XHRjb25zdCBhdHU4X3NlY3JldCA9IG5ldyBVaW50OEFycmF5KG5iX3NpemUpO1xuXG5cdFx0Ly8gZmlsbCB3aXRoIGNyeXB0byByYW5kb20gdmFsdWVzXG5cdFx0Y3J5cHRvLmdldFJhbmRvbVZhbHVlcyhhdHU4X3NlY3JldCk7XG5cblx0XHQvLyBjb252ZXJ0IHRvIGhleCBzdHJpbmdcblx0XHRyZXR1cm4gQXJyYXkuZnJvbShhdHU4X3NlY3JldCkubWFwKHggPT4geC50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSkuam9pbignJyk7XG5cdH1cblxuXG5cdC8vIGRlY2xhcmUgbWVzc2FnZSBoYW5kbGVyIGRpY3Rcblx0Y29uc3QgSF9IQU5ETEVSU19NRVNTQUdFOiBWb2NhYi5IYW5kbGVyc0Nocm9tZTxJY3NUb1NlcnZpY2UuUHVibGljVm9jYWI+ID0ge1xuXHRcdC8vIFxuXHRcdHBhbmljKGdfbXNnLCBnX3NlbmRlcikge1xuXHRcdFx0Ly8gVE9ETzogaGFuZGxlXG5cdFx0fSxcblxuXHRcdC8vIHBhZ2UgaXMgcmVxdWVzdGluZyBhZHZlcnRpc2VtZW50IHZpYSBpY3Mtc3BvdHRlclxuXHRcdGFzeW5jIHJlcXVlc3RBZHZlcnRpc2VtZW50KGdfbXNnLCBnX3NlbmRlciwgZmtfcmVzcG9uZCkge1xuXHRcdFx0Ly8gcmVmIHRhYiBpZFxuXHRcdFx0Y29uc3QgaV90YWIgPSBnX3NlbmRlci50YWIhLmlkITtcblxuXHRcdFx0Ly8gdW5rbm93biBzb3VyY2UsIHNpbGVudGx5IHJlamVjdFxuXHRcdFx0aWYoIWdfc2VuZGVyLnVybCkge1xuXHRcdFx0XHRjb25zb2xlLmRlYnVnKCdTaWxlbnRseSBpZ25vcmluZyBhZHZlcnRpc2VtZW50IHJlcXVlc3QgZnJvbSB1bmtub3duIHNvdXJjZScpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIHBhcnNlIHNlbmRlciB1cmxcblx0XHRcdGNvbnN0IFtzX3NjaGVtZSwgc19ob3N0XSA9IHBhcnNlX3NlbmRlcihnX3NlbmRlci51cmwpO1xuXG5cdFx0XHQvLyBwcmVwIHBhZ2UgZGVzY3JpcHRvciBmb3IgcmVzdG9yZXNcblx0XHRcdGNvbnN0IGdfcGFnZSA9IHtcblx0XHRcdFx0dGFiSWQ6IGlfdGFiLFxuXHRcdFx0XHRocmVmOiBnX3NlbmRlci51cmwrJycsXG5cdFx0XHR9O1xuXG5jb25zb2xlLmluZm8oJ2dldCByb290IGtleScpO1xuXHRcdFx0Ly8gY2hlY2sgaWYgYXBwIGlzIGxvY2tlZFxuXHRcdFx0Y29uc3QgZGtfcm9vdCA9IGF3YWl0IFZhdWx0LmdldFJvb3RLZXkoKTtcblx0XHRcdGlmKCFka19yb290KSB7XG5jb25zb2xlLmluZm8oJ25vIHJvb3Qga2V5Jyk7XG5cdFx0XHRcdC8vIGFzayB1c2VyIHRvIGxvZ2luXG5cdFx0XHRcdGNvbnN0IGJfZmluaXNoZWQgPSBhd2FpdCBmbG93X2Jyb2FkY2FzdCh7XG5cdFx0XHRcdFx0Zmxvdzoge1xuXHRcdFx0XHRcdFx0dHlwZTogJ2F1dGhlbnRpY2F0ZScsXG5cdFx0XHRcdFx0XHRwYWdlOiBnX3BhZ2UsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cbmNvbnNvbGUuaW5mbygnZmxvdyBjb21wbGV0ZWQnKTtcblx0XHRcdFx0Ly8gdXNlciBjYW5jZWxsZWQ7IGRvIG5vdCBhZHZlcnRpc2Vcblx0XHRcdFx0aWYoIWJfZmluaXNoZWQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyByZXRyeVxuXHRcdFx0XHRyZXR1cm4gYXdhaXQgSF9IQU5ETEVSU19NRVNTQUdFLnJlcXVlc3RBZHZlcnRpc2VtZW50KGdfbXNnLCBnX3NlbmRlciwgZmtfcmVzcG9uZCk7XG5cdFx0XHR9XG5cbmNvbnNvbGUuaW5mbygncm9vdCBrZXkgZXhpc3RzJyk7XG5cblx0XHRcdC8vIGFwcCBpcyBibG9ja2VkOyBleGl0XG5cdFx0XHRpZihhd2FpdCBhcHBfYmxvY2tlZChzX3NjaGVtZSwgc19ob3N0LCBnX3NlbmRlcikpIHJldHVybjtcblxuY29uc29sZS5pbmZvKCdhcHAgcGFzc2VkIHNjaGVtZSBjaGVjaycpO1xuXG5cdFx0XHQvLyBjaGVjayBhcHAncyBwb2xpY3kgYW5kIHJlZ2lzdHJhdGlvbiBzdGF0dXNcblx0XHRcdHtcblx0XHRcdFx0Ly8gbG9va3VwIGFwcCBpbiBzdG9yZVxuXHRcdFx0XHRsZXQgZ19hcHAgPSBhd2FpdCBBcHBzLmdldChzX2hvc3QsIHNfc2NoZW1lKTtcblxuXHRcdFx0XHQvLyBhcHAgcmVnaXN0cnRpb24gc3RhdGVcblx0XHRcdFx0bGV0IGJfcmVnaXN0ZXJlZCA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIGFwcCBpcyByZWdpc3RlcmVkOyBtYXJrIGl0IHN1Y2hcblx0XHRcdFx0aWYoZ19hcHApIHtcblx0XHRcdFx0XHRiX3JlZ2lzdGVyZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGFwcCBpcyBub3QgeWV0IHJlZ2lzdGVyZWQ7IGluaXRpYWxpemVcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Z19hcHAgPSB7XG5cdFx0XHRcdFx0XHRzY2hlbWU6IHNfc2NoZW1lLFxuXHRcdFx0XHRcdFx0aG9zdDogc19ob3N0LFxuXHRcdFx0XHRcdFx0Y29ubmVjdGlvbnM6IHt9LFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBsb29rdXAgcG9saWN5IG9uIGFwcFxuXHRcdFx0XHRjb25zdCBnX3BvbGljeSA9IGF3YWl0IFBvbGljaWVzLmZvckFwcChnX2FwcCk7XG5cbmNvbnNvbGUuaW5mbygnZ290IHBvbGljeSBmb3IgYXBwICVvJywgZ19wb2xpY3kpO1xuXHRcdFx0XHQvLyBhIHBvbGljeSBpbmRpY2F0ZXMgdGhpcyBhcHAgaXMgYmxvY2tlZFxuXHRcdFx0XHRpZihnX3BvbGljeS5ibG9ja2VkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGJsb2NrX2FwcChnX3NlbmRlciwgJ0FwcCBjb25uZWN0aW9uIGJsb2NrZWQgYnkgcG9saWN5Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyAvLyBhcHAgZG9lcyBub3QgaGF2ZSBhbnkgY29ubmVjdGlvbnNcblx0XHRcdFx0Ly8gaWYoIU9iamVjdC5rZXlzKGdfYXBwLmNvbm5lY3Rpb25zKS5sZW5ndGgpIHtcblxuXHRcdFx0XHQvLyBhcHAgaXMgbm90IHJlZ2lzdGVyZWQgYW5kIG5vdCB0cnVzdGVkOyByZXF1aXJlcyB1c2VyIGFwcHJvdmFsXG5cdFx0XHRcdGlmKCFiX3JlZ2lzdGVyZWQgJiYgIWdfcG9saWN5LnRydXN0ZWQpIHtcblx0XHRcdFx0XHQvLyByZXF1ZXN0IGFwcHJvdmFsIGZyb20gdXNlclxuXHRcdFx0XHRcdGNvbnN0IGJfY29uZmlybWVkID0gYXdhaXQgZmxvd19icm9hZGNhc3Qoe1xuXHRcdFx0XHRcdFx0Zmxvdzoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAncmVxdWVzdEFkdmVydGlzZW1lbnQnLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRcdFx0XHRcdGFwcDogZ19hcHAsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHBhZ2U6IGdfcGFnZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyByZXRyeSBcblx0XHRcdFx0XHRpZihiX2NvbmZpcm1lZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGF3YWl0IEhfSEFORExFUlNfTUVTU0FHRS5yZXF1ZXN0QWR2ZXJ0aXNlbWVudChnX21zZywgZ19zZW5kZXIsIGZrX3Jlc3BvbmQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGFib3J0XG5cdFx0XHRcdFx0Y29uc29sZS5kZWJ1ZygnVXNlciBjYW5jZWxsZWQgcmVxdWVzdCcpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUT0RPOiBjb25zaWRlciB3aGF0IHdpbGwgaGFwcGVuIGlmIHByb21wdCBjbG9zZXMgYnV0IHNlcmljZSB3b3JrZXIgYmVjb21lcyBpbmFjdGl2ZVxuXG5cdFx0XHQvLyB2ZXJib3NlXG5cdFx0XHRjb25zb2xlLmRlYnVnKGBBbGxvd2luZyA8JHtnX3NlbmRlci51cmx9PiB0byByZWNlaXZlIGFkdmVydGlzZW1lbnRgKTtcblxuXHRcdFx0Ly8gc2VjcmV0cyBmb3IgdGhpcyBzZXNzaW9uXG5cdFx0XHRjb25zdCBnX3NlY3JldHM6IFNlcnZpY2VUb0ljcy5TZXNzaW9uS2V5cyA9IHtcblx0XHRcdFx0c2Vzc2lvbjogZ2VuZXJhdGVfa2V5KCksXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBleGVjdXRlIGlzb2xhdGVkLXdvcmxkIGNvbnRlbnQgc2NyaXB0ICdob3N0J1xuXHRcdFx0dm9pZCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuXHRcdFx0XHR0YXJnZXQ6IHtcblx0XHRcdFx0XHR0YWJJZDogaV90YWIsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmM6IEljc0hvc3QsXG5cdFx0XHRcdGFyZ3M6IFtnX3NlY3JldHNdLFxuXHRcdFx0XHR3b3JsZDogJ0lTT0xBVEVEJyxcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBleGVjdXRlIG1haW4td29ybGQgY29udGVudCBzY3JpcHQgJ3JhdGlmaWVyJ1xuXHRcdFx0dm9pZCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuXHRcdFx0XHR0YXJnZXQ6IHtcblx0XHRcdFx0XHR0YWJJZDogaV90YWIsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmM6IE1jc1JhdGlmaWVyLFxuXHRcdFx0XHRhcmdzOiBbZ19zZWNyZXRzXSxcblx0XHRcdFx0d29ybGQ6ICdNQUlOJyxcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyByZXNwb25kIHRvIGlucGFnZSBjb250ZW50IHNjcmlwdCB3aXRoIHNlc3Npb24gc2VjcmV0c1xuXHRcdFx0ZmtfcmVzcG9uZChnX3NlY3JldHMpO1xuXHRcdH0sXG5cblx0XHRhc3luYyBmbG93QnJvYWRjYXN0KGdfcmVxLCBnX3NlbmRlciwgZmtfcmVzcG9uZCkge1xuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRrZXk6IHNpX3JlcSxcblx0XHRcdFx0Y29uZmlnOiBnY19wcm9tcHQsXG5cdFx0XHR9ID0gZ19yZXE7XG5cblx0XHRcdC8vIHVua25vd24gc291cmNlLCBzaWxlbnRseSByZWplY3Rcblx0XHRcdGlmKCFnX3NlbmRlci51cmwpIHtcblx0XHRcdFx0Y29uc29sZS5kZWJ1ZygnU2lsZW50bHkgaWdub3JpbmcgYWR2ZXJ0aXNlbWVudCByZXF1ZXN0IGZyb20gdW5rbm93biBzb3VyY2UnKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzZXQgdGhlIHBhZ2UgZnJvbSB3aGljaCB0aGUgZmxvdyBpcyBiZWluZyByZXF1ZXN0ZWRcblx0XHRcdGNvbnN0IGdfcGFnZSA9IGdjX3Byb21wdC5mbG93LnBhZ2UgPSB7XG5cdFx0XHRcdHRhYklkOiBnX3NlbmRlci50YWIhLmlkISxcblx0XHRcdFx0aHJlZjogZ19zZW5kZXIudXJsIHx8IGdjX3Byb21wdC5mbG93LnBhZ2U/LmhyZWYgfHwgJycsXG5cdFx0XHR9O1xuXG5jb25zb2xlLmluZm8oJ2dldCByb290IGtleScpO1xuXHRcdFx0Ly8gY2hlY2sgaWYgYXBwIGlzIGxvY2tlZFxuXHRcdFx0Y29uc3QgZGtfcm9vdCA9IGF3YWl0IFZhdWx0LmdldFJvb3RLZXkoKTtcblx0XHRcdGlmKCFka19yb290KSB7XG5jb25zb2xlLmluZm8oJ25vIHJvb3Qga2V5Jyk7XG5cdFx0XHRcdC8vIGFzayB1c2VyIHRvIGxvZ2luXG5cdFx0XHRcdGNvbnN0IGJfZmluaXNoZWQgPSBhd2FpdCBmbG93X2Jyb2FkY2FzdCh7XG5cdFx0XHRcdFx0Zmxvdzoge1xuXHRcdFx0XHRcdFx0dHlwZTogJ2F1dGhlbnRpY2F0ZScsXG5cdFx0XHRcdFx0XHRwYWdlOiBnX3BhZ2UsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cbmNvbnNvbGUuaW5mbygnZmxvdyBjb21wbGV0ZWQnKTtcblx0XHRcdFx0Ly8gdXNlciBjYW5jZWxsZWQ7IGRvIG5vdCBjb250aW51ZVxuXHRcdFx0XHRpZighYl9maW5pc2hlZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHJldHJ5XG5cdFx0XHRcdHJldHVybiBhd2FpdCBIX0hBTkRMRVJTX01FU1NBR0UuZmxvd0Jyb2FkY2FzdChnX3JlcSwgZ19zZW5kZXIsIGZrX3Jlc3BvbmQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBwYXJzZSBzZW5kZXIgdXJsXG5cdFx0XHRjb25zdCBbc19zY2hlbWUsIHNfaG9zdF0gPSBwYXJzZV9zZW5kZXIoZ19zZW5kZXIudXJsKTtcblxuXHRcdFx0Ly8gYXBwIGlzIGJsb2NrZWQ7IGV4aXRcblx0XHRcdGlmKGF3YWl0IGFwcF9ibG9ja2VkKHNfc2NoZW1lLCBzX2hvc3QsIGdfc2VuZGVyKSkgcmV0dXJuO1xuXG5jb25zb2xlLmluZm8oJ2FwcCBwYXNzZWQgc2NoZW1lIGNoZWNrJyk7XG5cblx0XHRcdC8vIHByZXAgYXBwIGRlc2NyaXB0b3Jcblx0XHRcdGNvbnN0IGdfYXBwID0ge1xuXHRcdFx0XHRzY2hlbWU6IHNfc2NoZW1lLFxuXHRcdFx0XHRob3N0OiBzX2hvc3QsXG5cdFx0XHRcdGNvbm5lY3Rpb25zOiB7fSxcblx0XHRcdH07XG5cblx0XHRcdGdjX3Byb21wdC5mbG93Wyd2YWx1ZSddLmFwcCA9IGdfYXBwO1xuXG5cdFx0XHQvLyBmb3J3YXJkIHJlcXVlc3Rcblx0XHRcdHZvaWQgZmxvd19icm9hZGNhc3QoZ2NfcHJvbXB0LCBzaV9yZXEpO1xuXHRcdH0sXG5cdH07XG5cblx0Ly8gdmVyYm9zZVxuXHRjb25zb2xlLmRlYnVnKGBTZXJ2aWNlIHJlY2VpdmVkIG1lc3NhZ2UgJW9gLCBnX21zZyk7XG5cblx0Ly8gdmVyaWZ5IG1lc3NhZ2Ugc3RydWN0dXJlXG5cdGlmKCdvYmplY3QnID09PSB0eXBlb2YgZ19tc2cgJiYgJ3N0cmluZycgPT09IHR5cGVvZiBnX21zZy50eXBlKSB7XG5cdFx0Ly8gcmVqZWN0IHVua25vd24gc2VuZGVyc1xuXHRcdGlmKCFnX3NlbmRlci50YWIgfHwgJ251bWJlcicgIT09IHR5cGVvZiBnX3NlbmRlci50YWIuaWQpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFJlZnVzaW5nIHJlcXVlc3QgZnJvbSB1bmtub3duIHNlbmRlcmApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIHJlZiBtZXNzYWdlIHR5cGVcblx0XHRjb25zdCBzaV90eXBlID0gZ19tc2cudHlwZTtcblxuXHRcdC8vIGxvb2t1cCBoYW5kbGVyXG5cdFx0Y29uc3QgZl9oYW5kbGVyID0gSF9IQU5ETEVSU19NRVNTQUdFW3NpX3R5cGVdO1xuXG5cdFx0Ly8gcm91dGUgbWVzc2FnZSB0byBoYW5kbGVyXG5cdFx0aWYoZl9oYW5kbGVyKSB7XG5cdFx0XHRjb25zdCB6X3Jlc3BvbnNlID0gZl9oYW5kbGVyKGdfbXNnLnZhbHVlLCBnX3NlbmRlciBhcyBNZXNzYWdlU2VuZGVyLCBma19yZXNwb25kIGFzIFNlbmRSZXNwb25zZSk7XG5cblx0XHRcdC8vIGFzeW5jIGhhbmRsZXJcblx0XHRcdGlmKHpfcmVzcG9uc2UgJiYgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHpfcmVzcG9uc2VbJ3RoZW4nXSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuLy8gYmluZCBtZXNzYWdlIHJvdXRlciBsaXN0ZW5lclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKG1lc3NhZ2Vfcm91dGVyKTtcblxuXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcihhc3luYygpID0+IHtcblx0Ly8gLy8gdXBvbiBmaXJzdCBpbnN0YWxsLCB3YWxrIHRoZSB1c2VyIHRocm91Z2ggc2V0dXBcblx0Ly8gYXdhaXQgZmxvd19icm9hZGNhc3Qoe1xuXHQvLyBcdGZsb3c6IHtcblx0Ly8gXHRcdHR5cGU6ICdhdXRoZW50aWNhdGUnLFxuXHQvLyBcdFx0cGFnZTogbnVsbCxcblx0Ly8gXHR9LFxuXHQvLyB9KTtcblxuXHQvLyBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zZXNzaW9uLnNldEFjY2Vzc0xldmVsKHtcblx0Ly8gXHRhY2Nlc3NMZXZlbDogY2hyb21lLnN0b3JhZ2UuQWNjZXNzTGV2ZWwuVFJVU1RFRF9BTkRfVU5UUlVTVEVEX0NPTlRFWFRTLFxuXHQvLyB9KTtcblxuXHQvLyBjb25zb2xlLmxvZygnb2snKTtcblxuXHQvLyBjb25zdCBkX3NjcmlwdGluZyA9IGNocm9tZS5zY3JpcHRpbmcgYXMgYnJvd3Nlci5TY3JpcHRpbmcuU3RhdGljO1xuXG5cblx0Ly8gY29uc3QgZ193YWtlciA9IEhfQ09OVEVOVF9TQ1JJUFRfREVGUy5pbnBhZ2Vfd2FrZXIoKTtcblxuXHQvLyBhd2FpdCBkX3NjcmlwdGluZy5yZWdpc3RlckNvbnRlbnRTY3JpcHRzKFtcblx0Ly8gXHR7XG5cdC8vIFx0XHQuLi5nX3dha2VyLFxuXHQvLyBcdFx0Ly8ganM6IFtcblx0Ly8gXHRcdC8vIFx0J3Myci5zaWduaW5nLmtleSNhZTQyNjFjJyxcblx0Ly8gXHRcdC8vIFx0Li4uZ193YWtlci5qcyxcblx0Ly8gXHRcdC8vIF0sXG5cdC8vIFx0fSxcblx0Ly8gXSk7XG5cblx0Ly8gY29uc3QgYV9zY3JpcHRzID0gYXdhaXQgZF9zY3JpcHRpbmcuZ2V0UmVnaXN0ZXJlZENvbnRlbnRTY3JpcHRzKCk7XG5cdC8vIGZvcihjb25zdCBnX3NjcmlwdCBvZiBhX3NjcmlwdHMpIHtcblx0Ly8gXHRjb25zb2xlLmxvZyhnX3NjcmlwdCk7XG5cdC8vIH1cblxufSk7XG5cbnR5cGUgTm90aWZpY2F0aW9uID0ge1xuXHR0eXBlOiAnYmFsYW5jZSc7XG5cdGNoYWluOiBDaGFpblsnaW50ZXJmYWNlJ107XG5cdGNvaW46IHN0cmluZztcblx0Y2FjaGVkOiBDb2luIHwgbnVsbDtcblx0YmFsYW5jZTogQ29pbjtcbn07XG5cbmNocm9tZS5hbGFybXMuY2xlYXJBbGwoKCkgPT4ge1xuXHRjb25zb2xlLndhcm4oJ2NsZWFyIGFsbCcpO1xuXG5cdGNocm9tZS5hbGFybXMuY3JlYXRlKCdwZXJpb2RpY0NoYWluUXVlcmllcycsIHtcblx0XHRwZXJpb2RJbk1pbnV0ZXM6IDIsXG5cdH0pO1xuXG5cdGNocm9tZS5hbGFybXMub25BbGFybS5hZGRMaXN0ZW5lcigoZ19hbGFybSkgPT4ge1xuXHRcdHN3aXRjaChnX2FsYXJtLm5hbWUpIHtcblx0XHRcdGNhc2UgJ3BlcmlvZGljQ2hhaW5RdWVyaWVzJzoge1xuXHRcdFx0XHR2b2lkIHBlcmlvZGljX2NoZWNrKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0dm9pZCBwZXJpb2RpY19jaGVjaygpO1xufSk7XG5cbmxldCBiX2FsaXZlID0gZmFsc2U7XG5jb25zdCBoX3NvY2tldHM6IERpY3Q8Vm9pZEZ1bmN0aW9uPiA9IHt9O1xuXG5jb25zdCBhdXRvX2hlYWwgPSAoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcblx0Yl9hbGl2ZSA9IGZhbHNlO1xuXHR2b2lkIHBlcmlvZGljX2NoZWNrKCk7XG59LCAzKlhUX01JTlVURVMpO1xuXG5sZXQgaV9hdXRvX2hlYWwgPSBhdXRvX2hlYWwoKTtcblxuZnVuY3Rpb24gbGlzdGVuVHJhbnNmZXIoXG5cdHNpX3NvY2tldF9ncm91cDogc3RyaW5nLFxuXHRrX25ldHdvcms6IEFjdGl2ZU5ldHdvcmssXG5cdGdfY2hhaW46IENoYWluWydpbnRlcmZhY2UnXSxcblx0Z19hY2NvdW50OiBBY2NvdW50WydpbnRlcmZhY2UnXSxcblx0c2Ffb3duZXI6IEJlY2gzMi5TdHJpbmcsXG5cdHNpX3R5cGU6ICdSZWNlaXZlJyB8ICdTZW5kJ1xuKTogVm9pZEZ1bmN0aW9uIHtcblx0Y29uc3Qgc2lfc29ja2V0ID0gc2lfc29ja2V0X2dyb3VwKyc6UmVjZWl2ZSc7XG5cblx0Y29uc3QgcF9jaGFpbiA9IENoYWlucy5wYXRoRnJvbShnX2NoYWluKTtcblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWxvb3AtZnVuY1xuXHRyZXR1cm4gaF9zb2NrZXRzW3NpX3NvY2tldF0gPSAoa19uZXR3b3JrW2BvbiR7c2lfdHlwZX1gXSBhcyBBY3RpdmVOZXR3b3JrWydvblJlY2VpdmUnXSB8IEFjdGl2ZU5ldHdvcmtbJ29uU2VuZCddKShzYV9vd25lciwgYXN5bmMoZF9raWxsLCBnX3R4KSA9PiB7XG5cdFx0aWYoZF9raWxsKSB7XG5cdFx0XHRkZWxldGUgaF9zb2NrZXRzW3NpX3NvY2tldF07XG5cdFx0XHRjb25zb2xlLmVycm9yKGRfa2lsbCk7XG5cdFx0XHQvLyBzeXNlcnIoe1xuXHRcdFx0Ly8gXHR0ZXh0OiBkX2tpbGwuLFxuXHRcdFx0Ly8gfSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYoZ190eCkge1xuXHRcdFx0Y29uc3QgYV9sb2dzID0gSlNPTi5wYXJzZShnX3R4LnJlc3VsdD8ubG9nIHx8ICdbXScpO1xuXHRcdFx0aWYoYV9sb2dzPy5sZW5ndGgpIHtcblx0XHRcdFx0Zm9yKGNvbnN0IGdfZXZlbnQgb2YgYV9sb2dzWzBdLmV2ZW50cykge1xuXHRcdFx0XHRcdGlmKCd0cmFuc2ZlcicgPT09IGdfZXZlbnQudHlwZSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZ190cmFuc2ZlciA9IGZvbGRfYXR0cnMoZ19ldmVudCBhcyBUeXBlZEV2ZW50KTtcblxuXHRcdFx0XHRcdFx0Ly8gZGVmYXVsdCByZWNlaXZlIHN0cmluZ1xuXHRcdFx0XHRcdFx0bGV0IHNfcGF5bG9hZCA9IGdfdHJhbnNmZXIuYW1vdW50O1xuXG5cdFx0XHRcdFx0XHQvLyBhdHRlbXB0IHRvIHBhcnNlIGFtb3VudFxuXHRcdFx0XHRcdFx0bGV0IHNpX2NvaW4gPSAnJztcblx0XHRcdFx0XHRcdGxldCBnX2NvaW46IE5hdGl2ZUNvaW47XG5cdFx0XHRcdFx0XHRjb25zdCBtX2Ftb3VudCA9IFJfVFJBTlNGRVJfQU1PVU5ULmV4ZWMoZ190cmFuc2Zlci5hbW91bnQpO1xuXHRcdFx0XHRcdFx0aWYoIW1fYW1vdW50KSB7XG5cdFx0XHRcdFx0XHRcdHN5c3dhcm4oe1xuXHRcdFx0XHRcdFx0XHRcdHRleHQ6IGBGYWlsZWQgdG8gcGFyc2UgdHJhbnNmZXIgYW1vdW50IFwiJHtnX3RyYW5zZmVyLmFtb3VudH1cImAsXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIGRlc3RydWN0dXJlIGludG8gYW1vdW50IGFuZCBkZW5vbVxuXHRcdFx0XHRcdFx0XHRjb25zdCBbLCBzX2Ftb3VudCwgc2lfZGVub21dID0gbV9hbW91bnQ7XG5cblx0XHRcdFx0XHRcdFx0Ly8gbG9jYXRlIGNvaW5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IFtzaV9jb2luX3Rlc3QsIGdfY29pbl90ZXN0XSBvZiBvZGUoZ19jaGFpbi5jb2lucykpIHtcblx0XHRcdFx0XHRcdFx0XHRpZihzaV9kZW5vbSA9PT0gZ19jb2luX3Rlc3QuZGVub20pIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHhfYW1vdW50ID0gbmV3IEJpZ051bWJlcihzX2Ftb3VudCkuc2hpZnRlZEJ5KC1nX2NvaW5fdGVzdC5kZWNpbWFscykudG9OdW1iZXIoKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNfcGF5bG9hZCA9IGAke2Zvcm1hdF9hbW91bnQoeF9hbW91bnQsIHRydWUpfSAke3NpX2NvaW5fdGVzdH1gO1xuXHRcdFx0XHRcdFx0XHRcdFx0c2lfY29pbiA9IHNpX2NvaW5fdGVzdDtcblx0XHRcdFx0XHRcdFx0XHRcdGdfY29pbiA9IGdfY29pbl90ZXN0O1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGxldCBzX290aGVyID0gZ190cmFuc2Zlci5zZW5kZXI7XG5cdFx0XHRcdFx0XHRjb25zdCBwX2NvbnRhY3QgPSBBZ2VudHMucGF0aEZvckNvbnRhY3Qoc19vdGhlciwgZ19jaGFpbi5mYW1pbHkpO1xuXHRcdFx0XHRcdFx0Y29uc3QgZ19jb250YWN0ID0gYXdhaXQgQWdlbnRzLmdldENvbnRhY3QocF9jb250YWN0KTtcblx0XHRcdFx0XHRcdGlmKGdfY29udGFjdCkge1xuXHRcdFx0XHRcdFx0XHRzX290aGVyID0gZ19jb250YWN0Lm5hbWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0c19vdGhlciA9IGFiYnJldmlhdGVfYWRkcihzX290aGVyKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gaGFzaCB0eCB0byBjcmVhdGUgbm90aWZpY2F0aW9uIGlkXG5cdFx0XHRcdFx0XHRjb25zdCBzaV9ub3RpZiA9IGJ1ZmZlcl90b19iYXNlNjQoc2hhMjU2X3N5bmModGV4dF90b19idWZmZXIoZ190eC50eCkpKTtcblxuXHRcdFx0XHRcdFx0Ly8gbm90aWZ5XG5cdFx0XHRcdFx0XHRpZignUmVjZWl2ZScgPT09IHNpX3R5cGUpIHtcblx0XHRcdFx0XHRcdFx0Y2hyb21lLm5vdGlmaWNhdGlvbnMuY3JlYXRlKHNpX25vdGlmLCB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ2Jhc2ljJyxcblx0XHRcdFx0XHRcdFx0XHR0aXRsZTogYFJlY2VpdmVkICR7c19wYXlsb2FkfSBvbiAke2dfY2hhaW4ubmFtZX1gLFxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6IGAke3Nfb3RoZXJ9IHNlbnQgJHtzX3BheWxvYWR9IHRvIHlvdXIgJHtnX2FjY291bnQubmFtZX0gYWNjb3VudGAsXG5cdFx0XHRcdFx0XHRcdFx0Ly8gY29udGV4dE1lc3NhZ2U6ICdDbGljayB0byB2aWV3IGRldGFpbHMnLFxuXHRcdFx0XHRcdFx0XHRcdHByaW9yaXR5OiAxLFxuXHRcdFx0XHRcdFx0XHRcdGljb25Vcmw6ICcvbWVkaWEvdmVuZG9yL2xvZ28tMTkycHgucG5nJyxcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gaW5zZXJ0IGV2ZW50XG5cdFx0XHRcdFx0XHRcdGF3YWl0IEV2ZW50cy5vcGVuKGFzeW5jKGtzX2V2ZW50cykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGF3YWl0IGtzX2V2ZW50cy5pbnNlcnQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dGltZTogRGF0ZS5ub3coKSxcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6ICdyZWNlaXZlJyxcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBnX3R4LmhlaWdodCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VuZGVyOiBnX3RyYW5zZmVyLnNlbmRlcixcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVjaXBpZW50OiBnX3RyYW5zZmVyLnJlY2lwaWVudCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0YW1vdW50OiBnX3RyYW5zZmVyLmFtb3VudCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW46IHBfY2hhaW4sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvaW46IHNpX2NvaW4sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGhhc2g6ICcnLFxuXHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHR9IGFzIExvZ0V2ZW50PCdyZWNlaXZlJz4pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYoJ1NlbmQnID09PSBzaV90eXBlKSB7XG5cdFx0XHRcdFx0XHRcdGNocm9tZS5ub3RpZmljYXRpb25zLmNyZWF0ZShzaV9ub3RpZiwge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6ICdiYXNpYycsXG5cdFx0XHRcdFx0XHRcdFx0dGl0bGU6IGBTZW50ICR7c19wYXlsb2FkfSBvbiAke2dfY2hhaW4ubmFtZX1gLFxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6IGAke3NfcGF5bG9hZH0gc2VudCB0byAke3Nfb3RoZXJ9IGZyb20gJHtnX2FjY291bnQubmFtZX0gYWNjb3VudGAsXG5cdFx0XHRcdFx0XHRcdFx0Ly8gY29udGV4dE1lc3NhZ2U6ICdDbGljayB0byB2aWV3IGRldGFpbHMnLFxuXHRcdFx0XHRcdFx0XHRcdHByaW9yaXR5OiAxLFxuXHRcdFx0XHRcdFx0XHRcdGljb25Vcmw6ICcvbWVkaWEvdmVuZG9yL2xvZ28tMTkycHgucG5nJyxcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gaW5zZXJ0IGV2ZW50XG5cdFx0XHRcdFx0XHRcdGF3YWl0IEV2ZW50cy5vcGVuKGFzeW5jKGtzX2V2ZW50cykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGdfbmV4dCA9IGtzX2V2ZW50cy5maWx0ZXIoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogJ3BlbmRpbmcnLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW46IHBfY2hhaW4sXG5cdFx0XHRcdFx0XHRcdFx0fSkubmV4dCgpIGFzIExvZ0V2ZW50PCdwZW5kaW5nJz47XG5cblx0XHRcdFx0XHRcdFx0XHRpZihnX25leHQ/LnZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBnX3BlbmRpbmcgPSBnX25leHQudmFsdWUgYXMgTG9nRXZlbnQ8J3BlbmRpbmcnPjtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJhdzogc3hfdHhuLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0fSA9IGdfcGVuZGluZztcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoc3hfdHhuID09PSBnbG9iYWxUaGlzLmF0b2IoZ190eC50eCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQga3NfZXZlbnRzLmRlbGV0ZShnX3BlbmRpbmcpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IGtzX2V2ZW50cy5pbnNlcnQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRpbWU6IERhdGUubm93KCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogJ3NlbmQnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC4uLmdfcGVuZGluZy5kYXRhLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBnX3R4LmhlaWdodCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGdhc191c2VkOiBnX3R4LnJlc3VsdC5nYXNfdXNlZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGdhc193YW50ZWQ6IGdfdHgucmVzdWx0Lmdhc193YW50ZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZW5kZXI6IGdfdHJhbnNmZXIuc2VuZGVyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVjaXBpZW50OiBnX3RyYW5zZmVyLnJlY2lwaWVudCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFtb3VudDogZ190cmFuc2Zlci5hbW91bnQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBhcyBMb2dFdmVudDwnc2VuZCc+KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnRzOiBrc19ldmVudHMucmF3LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBlcmlvZGljX2NoZWNrKCkge1xuXHQvLyBmZXRjaCBsYXRlc3QgZGVjcmVlc1xuXHRhd2FpdCBXZWJSZXNvdXJjZUNhY2hlLnVwZGF0ZUFsbCgpO1xuXG5cdC8vIG5vdCBzaWduZWQgaW47IGV4aXRcblx0aWYoIWF3YWl0IFZhdWx0LmdldFJvb3RLZXkoKSkgcmV0dXJuO1xuXG5cdGlmKGJfYWxpdmUpIHJldHVybjtcblx0Yl9hbGl2ZSA9IHRydWU7XG5cdGNsZWFyVGltZW91dChpX2F1dG9faGVhbCk7XG5cblx0Ly8gcmVhZCBmcm9tIHN0b3Jlc1xuXHRjb25zdCBbXG5cdFx0a3NfYWNjb3VudHMsXG5cdFx0a3NfY2hhaW5zLFxuXHRcdGtzX25ldHdvcmtzLFxuXHRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuXHRcdEFjY291bnRzLnJlYWQoKSxcblx0XHRDaGFpbnMucmVhZCgpLFxuXHRcdE5ldHdvcmtzLnJlYWQoKSxcblx0XSk7XG5cblx0Ly8gcHJlcCBuZXR3b3JrID0+IGNoYWluIG1hcFxuXHRjb25zdCBoX25ldHdvcmtzOiBSZWNvcmQ8Q2hhaW5QYXRoLCBOZXR3b3JrWydpbnRlcmZhY2UnXT4gPSB7fTtcblx0Zm9yKGNvbnN0IFtwX25ldHdvcmssIGdfbmV0d29ya10gb2Yga3NfbmV0d29ya3MuZW50cmllcygpKSB7XG5cdFx0aF9uZXR3b3Jrc1tnX25ldHdvcmsuY2hhaW5dID0gaF9uZXR3b3Jrc1tnX25ldHdvcmsuY2hhaW5dIHx8IGdfbmV0d29yaztcblx0fVxuXG5cblx0Ly8gZWFjaCBjaGFpbiB3LyBpdHMgZGVmYXVsdCBwcm92aWRlclxuXHRmb3IoY29uc3QgW3BfY2hhaW4sIGdfbmV0d29ya10gb2Ygb2RlKGhfbmV0d29ya3MpKSB7XG5cdFx0Ly8gYWxyZWFkeSBsaXN0ZW5pbmdcblx0XHRpZihoX3NvY2tldHNbcF9jaGFpbl0pIGNvbnRpbnVlO1xuXG5cdFx0Ly8gcmVmIGNoYWluXG5cdFx0Y29uc3QgZ19jaGFpbiA9IGtzX2NoYWlucy5hdChwX2NoYWluKSE7XG5cblx0XHQvLyBjcmVhdGUgbmV0d29ya1xuXHRcdGNvbnN0IHBfbmV0d29yayA9IE5ldHdvcmtzLnBhdGhGcm9tKGdfbmV0d29yayk7XG5cdFx0Y29uc3Qga19uZXR3b3JrID0gTmV0d29ya3MuYWN0aXZhdGUoZ19uZXR3b3JrLCBnX2NoYWluKTtcblxuXHRcdC8vIGxpc3RlbiBmb3IgbmV3IGJsb2Nrc1xuXHRcdGNvbnN0IGFfcmVjZW50czogbnVtYmVyW10gPSBbXTtcblx0XHR0cnkge1xuXHRcdFx0aF9zb2NrZXRzW3BfY2hhaW5dID0ga19uZXR3b3JrLmxpc3RlbihbXG5cdFx0XHRcdGB0bS5ldmVudD0nTmV3QmxvY2snYCxcblx0XHRcdF0sIChkX2tpbGwsIGdfdmFsdWUpID0+IHtcblx0XHRcdFx0aWYoZF9raWxsKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIGhfc29ja2V0c1twX2NoYWluXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKGdfdmFsdWUpIHtcblx0XHRcdFx0XHRhX3JlY2VudHMucHVzaChEYXRlLm5vdygpKTtcblxuXHRcdFx0XHRcdGNvbnN0IGdfYmxvY2sgPSBnX3ZhbHVlLmJsb2NrIGFzIHtcblx0XHRcdFx0XHRcdGhlYWRlcjogQmxvY2tJbmZvSGVhZGVyO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHR3aGlsZShhX3JlY2VudHMubGVuZ3RoID4gMTYpIHtcblx0XHRcdFx0XHRcdGFfcmVjZW50cy5zaGlmdCgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGdsb2JhbF9icm9hZGNhc3Qoe1xuXHRcdFx0XHRcdFx0dHlwZTogJ2Jsb2NrSW5mbycsXG5cdFx0XHRcdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRcdFx0XHRoZWFkZXI6IGdfYmxvY2suaGVhZGVyLFxuXHRcdFx0XHRcdFx0XHRjaGFpbjogcF9jaGFpbixcblx0XHRcdFx0XHRcdFx0bmV0d29yazogcF9uZXR3b3JrLFxuXHRcdFx0XHRcdFx0XHRyZWNlbnRzOiBhX3JlY2VudHMsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc29sZS5pbmZvKHtcblx0XHRcdFx0aF9zb2NrZXRzLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGNhdGNoKGVfbGlzdGVuKSB7XG5cdFx0XHRzeXNlcnIoe1xuXHRcdFx0XHRlcnJvcjogZV9saXN0ZW4sXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBlYWNoIGFjY291bnRcblx0XHRmb3IoY29uc3QgW3BfYWNjb3VudCwgZ19hY2NvdW50XSBvZiBrc19hY2NvdW50cy5lbnRyaWVzKCkpIHtcblx0XHRcdGNvbnN0IHNhX293bmVyID0gQ2hhaW5zLmFkZHJlc3NGb3IoZ19hY2NvdW50LnB1YmtleSwgZ19jaGFpbik7XG5cblx0XHRcdGlmKGtfbmV0d29yay5oYXNScGMpIHtcblx0XHRcdFx0Y29uc3Qgc2lfc29ja2V0X2dyb3VwID0gcF9jaGFpbisnXFxuJytnX25ldHdvcmsucnBjSG9zdCErJ1xcbic7XG5cblx0XHRcdFx0Ly8gc3Vic2NyaWJlIHRvIHdlYnNvY2tldCBldmVudHNcblx0XHRcdFx0bGV0IGZfY2xvc2UgPSBoX3NvY2tldHNbc2lfc29ja2V0X2dyb3VwXTtcblx0XHRcdFx0aWYoIWZfY2xvc2UpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0bGlzdGVuVHJhbnNmZXIoc2lfc29ja2V0X2dyb3VwLCBrX25ldHdvcmssIGdfY2hhaW4sIGdfYWNjb3VudCwgc2Ffb3duZXIsICdSZWNlaXZlJyk7XG5cdFx0XHRcdFx0XHRsaXN0ZW5UcmFuc2ZlcihzaV9zb2NrZXRfZ3JvdXAsIGtfbmV0d29yaywgZ19jaGFpbiwgZ19hY2NvdW50LCBzYV9vd25lciwgJ1NlbmQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2F0Y2goZV9yZWNlaXZlKSB7XG5cdFx0XHRcdFx0XHRzeXNlcnIoe1xuXHRcdFx0XHRcdFx0XHRlcnJvcjogZV9yZWNlaXZlLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIC8vIHF1ZXJ5IGFsbCBiYWxhbmNlc1xuXHRcdFx0Ly8gdm9pZCBrX25ldHdvcmsuYmFua0JhbGFuY2VzKHNhX293bmVyKS50aGVuKChoX2JhbGFuY2VzKSA9PiB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1sb29wLWZ1bmNcblx0XHRcdC8vIFx0Ly8gcXVlcnkgc3VjY2VlZGVkXG5cdFx0XHQvLyBcdGZvcihjb25zdCBbc2lfY29pbiwgZ19idW5kbGVdIG9mIG9kZShoX2JhbGFuY2VzKSkge1xuXHRcdFx0Ly8gXHRcdGNvbnN0IHtcblx0XHRcdC8vIFx0XHRcdGJhbGFuY2U6IGdfYmFsYW5jZSxcblx0XHRcdC8vIFx0XHRcdGNhY2hlZDogZ19jYWNoZWQsXG5cdFx0XHQvLyBcdFx0fSA9IGdfYnVuZGxlO1xuXG5cdFx0XHQvLyBcdFx0Ly8gYW1vdW50IGRpZmZlcnMgZnJvbSBjYWNoZWRcblx0XHRcdC8vIFx0XHRpZihnX2JhbGFuY2UuYW1vdW50ICE9PSBnX2NhY2hlZD8uYW1vdW50KSB7XG5cdFx0XHQvLyBcdFx0XHQvLyBub3RpZnlcblx0XHRcdC8vIFx0XHRcdGFfbm90aWZpY2F0aW9ucy5wdXNoKHtcblx0XHRcdC8vIFx0XHRcdFx0dHlwZTogJ2JhbGFuY2UnLFxuXHRcdFx0Ly8gXHRcdFx0XHRjaGFpbjogZ19jaGFpbixcblx0XHRcdC8vIFx0XHRcdFx0Y29pbjogc2lfY29pbixcblx0XHRcdC8vIFx0XHRcdFx0Y2FjaGVkOiBnX2NhY2hlZCxcblx0XHRcdC8vIFx0XHRcdFx0YmFsYW5jZTogZ19iYWxhbmNlLFxuXHRcdFx0Ly8gXHRcdFx0fSk7XG5cblx0XHRcdC8vIFx0XHRcdGxldCBzX21lc3NhZ2UgPSAnJztcblx0XHRcdC8vIFx0XHRcdGxldCBzX2NvbnRleHQgPSAnJztcblx0XHRcdC8vIFx0XHRcdGlmKDEgPT09IGFfbm90aWZpY2F0aW9ucy5sZW5ndGgpIHtcblx0XHRcdC8vIFx0XHRcdFx0aWYoZ19jYWNoZWQpIHtcblx0XHRcdC8vIFx0XHRcdFx0XHRjb25zdCB5Z19jaGFuZ2UgPSBuZXcgQmlnTnVtYmVyKGdfYmFsYW5jZS5hbW91bnQpLm1pbnVzKGdfY2FjaGVkLmFtb3VudClcblx0XHRcdC8vIFx0XHRcdFx0XHRcdC5zaGlmdGVkQnkoLWdfY2hhaW4uY29pbnNbc2lfY29pbl0uZGVjaW1hbHMpO1xuXG5cdFx0XHQvLyBcdFx0XHRcdFx0Ly8gcmVjZWl2ZWQgY29pbnNcblx0XHRcdC8vIFx0XHRcdFx0XHRpZih5Z19jaGFuZ2UuZ3QoMCkpIHtcblx0XHRcdC8vIFx0XHRcdFx0XHRcdHNfbWVzc2FnZSA9IGBCYWxhbmNlIGluY3JlYXNlZCArJHtmb3JtYXRfYW1vdW50KHlnX2NoYW5nZS50b051bWJlcigpLCB0cnVlKX0gJHtzaV9jb2lufWA7XG5cdFx0XHQvLyBcdFx0XHRcdFx0XHQvLyBzX2NvbnRleHQgPSBgZnJvbSBgXG5cdFx0XHQvLyBcdFx0XHRcdFx0fVxuXHRcdFx0Ly8gXHRcdFx0XHR9XG5cblx0XHRcdC8vIFx0XHRcdFx0Y2hyb21lLm5vdGlmaWNhdGlvbnMuY3JlYXRlKCdiYW5rQmFsYW5jZUNoYW5nZScsIHtcblx0XHRcdC8vIFx0XHRcdFx0XHR0eXBlOiAnYmFzaWMnLFxuXHRcdFx0Ly8gXHRcdFx0XHRcdHRpdGxlOiAnQmFsYW5jZSBJbmNyZWFzZWQnLFxuXHRcdFx0Ly8gXHRcdFx0XHRcdG1lc3NhZ2U6IHNfbWVzc2FnZSxcblx0XHRcdC8vIFx0XHRcdFx0XHRjb250ZXh0TWVzc2FnZTogc19jb250ZXh0LFxuXHRcdFx0Ly8gXHRcdFx0XHRcdHByaW9yaXR5OiAxLFxuXHRcdFx0Ly8gXHRcdFx0XHRcdGljb25Vcmw6ICcnLFxuXHRcdFx0Ly8gXHRcdFx0XHRcdC8vIGV2ZW50VGltZTogXG5cdFx0XHQvLyBcdFx0XHRcdH0pO1xuXHRcdFx0Ly8gXHRcdFx0fVxuXHRcdFx0Ly8gXHRcdH1cblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gfSk7XG5cdFx0fVxuXHR9XG5cblx0YXV0b19oZWFsKCk7XG59XG5cbmdsb2JhbF9yZWNlaXZlKHtcblx0bG9naW4oKSB7XG5cdFx0dm9pZCBwZXJpb2RpY19jaGVjaygpO1xuXHR9LFxufSk7XG4iXSwibmFtZXMiOlsibG9jYXRlX3NjcmlwdCIsImdfbXNnIiwiZ19zZW5kZXIiLCJma19yZXNwb25kIl0sIm1hcHBpbmdzIjoiOztBQTRCd0IsU0FBQSxRQUFBO0FBQUEsRUFDdkIsU0FBUztBQUNWLEdBQXVCO0FBRWhCLFFBQUEsYUFBYSxXQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
