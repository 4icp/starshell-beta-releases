(function() {
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
  const { text_to_buffer } = function(exports) {
    const range = (length, begin = 0) => Array.from({ length }, (_2, index2) => begin + index2);
    const splitEvery = (input, chunkLength) => range(Math.ceil(input.length / chunkLength)).map((index2) => index2 * chunkLength).map((begin) => input.slice(begin, begin + chunkLength));
    const hexByteWidth = 2;
    const hexadecimal = 16;
    const hexToBin = (validHex) => Uint8Array.from(splitEvery(validHex, hexByteWidth).map((byte) => parseInt(byte, hexadecimal)));
    const flattenBinArray = (array) => {
      const totalLength = array.reduce((total, bin) => total + bin.length, 0);
      const flattened = new Uint8Array(totalLength);
      array.reduce((index2, bin) => {
        flattened.set(bin, index2);
        return index2 + bin.length;
      }, 0);
      return flattened;
    };
    var BaseConversionError;
    (function(BaseConversionError2) {
      BaseConversionError2["tooLong"] = "An alphabet may be no longer than 254 characters.";
      BaseConversionError2["ambiguousCharacter"] = "A character code may only appear once in a single alphabet.";
      BaseConversionError2["unknownCharacter"] = "Encountered an unknown character for this alphabet.";
    })(BaseConversionError || (BaseConversionError = {}));
    const createBaseConverter = (alphabet) => {
      const undefinedValue = 255;
      const uint8ArrayBase = 256;
      if (alphabet.length >= undefinedValue)
        return BaseConversionError.tooLong;
      const alphabetMap = new Uint8Array(uint8ArrayBase).fill(undefinedValue);
      for (let index2 = 0; index2 < alphabet.length; index2++) {
        const characterCode = alphabet.charCodeAt(index2);
        if (alphabetMap[characterCode] !== undefinedValue) {
          return BaseConversionError.ambiguousCharacter;
        }
        alphabetMap[characterCode] = index2;
      }
      const base = alphabet.length;
      const paddingCharacter = alphabet.charAt(0);
      const factor = Math.log(base) / Math.log(uint8ArrayBase);
      const inverseFactor = Math.log(uint8ArrayBase) / Math.log(base);
      return {
        decode: (input) => {
          if (input.length === 0)
            return Uint8Array.of();
          const firstNonZeroIndex = input.split("").findIndex((character) => character !== paddingCharacter);
          if (firstNonZeroIndex === -1) {
            return new Uint8Array(input.length);
          }
          const requiredLength = Math.floor((input.length - firstNonZeroIndex) * factor + 1);
          const decoded = new Uint8Array(requiredLength);
          let nextByte = firstNonZeroIndex;
          let remainingBytes = 0;
          while (input[nextByte] !== void 0) {
            let carry = alphabetMap[input.charCodeAt(nextByte)];
            if (carry === undefinedValue)
              return BaseConversionError.unknownCharacter;
            let digit = 0;
            for (let steps = requiredLength - 1; (carry !== 0 || digit < remainingBytes) && steps !== -1; steps--, digit++) {
              carry += Math.floor(base * decoded[steps]);
              decoded[steps] = Math.floor(carry % uint8ArrayBase);
              carry = Math.floor(carry / uint8ArrayBase);
            }
            remainingBytes = digit;
            nextByte++;
          }
          const firstNonZeroResultDigit = decoded.findIndex((value) => value !== 0);
          const bin = new Uint8Array(firstNonZeroIndex + (requiredLength - firstNonZeroResultDigit));
          bin.set(decoded.slice(firstNonZeroResultDigit), firstNonZeroIndex);
          return bin;
        },
        encode: (input) => {
          if (input.length === 0)
            return "";
          const firstNonZeroIndex = input.findIndex((byte) => byte !== 0);
          if (firstNonZeroIndex === -1) {
            return paddingCharacter.repeat(input.length);
          }
          const requiredLength = Math.floor((input.length - firstNonZeroIndex) * inverseFactor + 1);
          const encoded = new Uint8Array(requiredLength);
          let nextByte = firstNonZeroIndex;
          let remainingBytes = 0;
          while (nextByte !== input.length) {
            let carry = input[nextByte];
            let digit = 0;
            for (let steps = requiredLength - 1; (carry !== 0 || digit < remainingBytes) && steps !== -1; steps--, digit++) {
              carry += Math.floor(uint8ArrayBase * encoded[steps]);
              encoded[steps] = Math.floor(carry % base);
              carry = Math.floor(carry / base);
            }
            remainingBytes = digit;
            nextByte++;
          }
          const firstNonZeroResultDigit = encoded.findIndex((value) => value !== 0);
          const padding = paddingCharacter.repeat(firstNonZeroIndex);
          return encoded.slice(firstNonZeroResultDigit).reduce((all, digit) => all + alphabet.charAt(digit), padding);
        }
      };
    };
    const bitcoinBase58Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    const base58 = createBaseConverter(bitcoinBase58Alphabet);
    const base58ToBin = base58.decode;
    base58.encode;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const base64ToBin = (validBase64) => {
      const lookup = new Uint8Array(123);
      for (let i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
      }
      const bufferLengthEstimate = validBase64.length * 0.75;
      const stringLength = validBase64.length;
      const bufferLength = validBase64[validBase64.length - 1] === "=" ? validBase64[validBase64.length - 2] === "=" ? bufferLengthEstimate - 2 : bufferLengthEstimate - 1 : bufferLengthEstimate;
      const buffer = new ArrayBuffer(bufferLength);
      const bytes = new Uint8Array(buffer);
      let p = 0;
      for (let i = 0; i < stringLength; i += 4) {
        const encoded1 = lookup[validBase64.charCodeAt(i)];
        const encoded2 = lookup[validBase64.charCodeAt(i + 1)];
        const encoded3 = lookup[validBase64.charCodeAt(i + 2)];
        const encoded4 = lookup[validBase64.charCodeAt(i + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }
      return bytes;
    };
    const binToFixedLength = (bin, bytes) => {
      const fixedBytes = new Uint8Array(bytes);
      const maxValue = 255;
      bin.length > bytes ? fixedBytes.fill(maxValue) : fixedBytes.set(bin);
      return fixedBytes;
    };
    const numberToBinUint16LE = (value) => {
      const uint16Length = 2;
      const bin = new Uint8Array(uint16Length);
      const writeAsLittleEndian = true;
      const view = new DataView(bin.buffer, bin.byteOffset, bin.byteLength);
      view.setUint16(0, value, writeAsLittleEndian);
      return bin;
    };
    const numberToBinUint32LE = (value) => {
      const uint32Length = 4;
      const bin = new Uint8Array(uint32Length);
      const writeAsLittleEndian = true;
      const view = new DataView(bin.buffer, bin.byteOffset, bin.byteLength);
      view.setUint32(0, value, writeAsLittleEndian);
      return bin;
    };
    const numberToBinUint32BE = (value) => {
      const uint32Length = 4;
      const bin = new Uint8Array(uint32Length);
      const writeAsLittleEndian = false;
      const view = new DataView(bin.buffer, bin.byteOffset, bin.byteLength);
      view.setUint32(0, value, writeAsLittleEndian);
      return bin;
    };
    const bigIntToBinUintLE = (value) => {
      const baseUint8Array = 256;
      const base = BigInt(baseUint8Array);
      const result = [];
      let remaining = value;
      while (remaining >= base) {
        result.push(Number(remaining % base));
        remaining /= base;
      }
      if (remaining > BigInt(0))
        result.push(Number(remaining));
      return Uint8Array.from(result.length > 0 ? result : [0]);
    };
    const bigIntToBinUint64LEClamped = (value) => {
      const uint64 = 8;
      return binToFixedLength(bigIntToBinUintLE(value), uint64);
    };
    const bigIntToBinUint64LE = (value) => {
      const uint64LengthInBits = 64;
      const valueAsUint64 = BigInt.asUintN(uint64LengthInBits, value);
      const fixedLengthBin = bigIntToBinUint64LEClamped(valueAsUint64);
      return fixedLengthBin;
    };
    const bigIntToBitcoinVarInt = (value) => value <= BigInt(252) ? Uint8Array.of(Number(value)) : value <= BigInt(65535) ? Uint8Array.from([
      253,
      ...numberToBinUint16LE(Number(value))
    ]) : value <= BigInt(4294967295) ? Uint8Array.from([
      254,
      ...numberToBinUint32LE(Number(value))
    ]) : Uint8Array.from([255, ...bigIntToBinUint64LE(value)]);
    var LocktimeError;
    (function(LocktimeError2) {
      LocktimeError2["dateOutOfRange"] = "The provided Date is outside of the range which can be encoded in locktime.";
      LocktimeError2["locktimeOutOfRange"] = "The provided locktime is outside of the range which can be encoded as a Date (greater than or equal to 500000000 and less than or equal to 4294967295).";
      LocktimeError2["incorrectLength"] = "The provided locktime is not the correct length (4 bytes).";
    })(LocktimeError || (LocktimeError = {}));
    const utf8ToBin = (utf8) => {
      const out = [];
      let p = 0;
      for (let i = 0; i < utf8.length; i++) {
        let c = utf8.charCodeAt(i);
        if (c < 128) {
          out[p++] = c;
        } else if (c < 2048) {
          out[p++] = c >> 6 | 192;
          out[p++] = c & 63 | 128;
        } else if ((c & 64512) === 55296 && i + 1 < utf8.length && (utf8.charCodeAt(i + 1) & 64512) === 56320) {
          c = ((c & 1023) << 10) + 65536 + (utf8.charCodeAt(i += 1) & 1023);
          out[p++] = c >> 18 | 240;
          out[p++] = c >> 12 & 63 | 128;
          out[p++] = c >> 6 & 63 | 128;
          out[p++] = c & 63 | 128;
        } else {
          out[p++] = c >> 12 | 224;
          out[p++] = c >> 6 & 63 | 128;
          out[p++] = c & 63 | 128;
        }
      }
      return new Uint8Array(out);
    };
    var Base58AddressFormatVersion;
    (function(Base58AddressFormatVersion2) {
      Base58AddressFormatVersion2[Base58AddressFormatVersion2["p2pkh"] = 0] = "p2pkh";
      Base58AddressFormatVersion2[Base58AddressFormatVersion2["p2sh"] = 5] = "p2sh";
      Base58AddressFormatVersion2[Base58AddressFormatVersion2["wif"] = 128] = "wif";
      Base58AddressFormatVersion2[Base58AddressFormatVersion2["p2pkhTestnet"] = 111] = "p2pkhTestnet";
      Base58AddressFormatVersion2[Base58AddressFormatVersion2["p2shTestnet"] = 196] = "p2shTestnet";
      Base58AddressFormatVersion2[Base58AddressFormatVersion2["wifTestnet"] = 239] = "wifTestnet";
      Base58AddressFormatVersion2[Base58AddressFormatVersion2["p2pkhCopayBCH"] = 28] = "p2pkhCopayBCH";
      Base58AddressFormatVersion2[Base58AddressFormatVersion2["p2shCopayBCH"] = 40] = "p2shCopayBCH";
    })(Base58AddressFormatVersion || (Base58AddressFormatVersion = {}));
    var Base58AddressError;
    (function(Base58AddressError2) {
      Base58AddressError2["unknownCharacter"] = "Base58Address error: address may only contain valid base58 characters.";
      Base58AddressError2["tooShort"] = "Base58Address error: address is too short to be valid.";
      Base58AddressError2["invalidChecksum"] = "Base58Address error: address has an invalid checksum.";
      Base58AddressError2["unknownAddressVersion"] = "Base58Address error: address uses an unknown address version.";
      Base58AddressError2["incorrectLength"] = "Base58Address error: the encoded payload is not the correct length (20 bytes).";
    })(Base58AddressError || (Base58AddressError = {}));
    var BitRegroupingError;
    (function(BitRegroupingError2) {
      BitRegroupingError2["integerOutOfRange"] = "An integer provided in the source array is out of the range of the specified source word length.";
      BitRegroupingError2["hasDisallowedPadding"] = "Encountered padding when padding was disallowed.";
      BitRegroupingError2["requiresDisallowedPadding"] = "Encoding requires padding while padding is disallowed.";
    })(BitRegroupingError || (BitRegroupingError = {}));
    var Bech32DecodingError;
    (function(Bech32DecodingError2) {
      Bech32DecodingError2["notBech32CharacterSet"] = "Bech32 decoding error: input contains characters outside of the Bech32 character set.";
    })(Bech32DecodingError || (Bech32DecodingError = {}));
    var CashAddressNetworkPrefix;
    (function(CashAddressNetworkPrefix2) {
      CashAddressNetworkPrefix2["mainnet"] = "bitcoincash";
      CashAddressNetworkPrefix2["testnet"] = "bchtest";
      CashAddressNetworkPrefix2["regtest"] = "bchreg";
    })(CashAddressNetworkPrefix || (CashAddressNetworkPrefix = {}));
    var CashAddressVersionByte;
    (function(CashAddressVersionByte2) {
      CashAddressVersionByte2[CashAddressVersionByte2["P2PKH"] = 0] = "P2PKH";
      CashAddressVersionByte2[CashAddressVersionByte2["P2SH"] = 8] = "P2SH";
    })(CashAddressVersionByte || (CashAddressVersionByte = {}));
    var CashAddressType;
    (function(CashAddressType2) {
      CashAddressType2[CashAddressType2["P2PKH"] = 0] = "P2PKH";
      CashAddressType2[CashAddressType2["P2SH"] = 1] = "P2SH";
    })(CashAddressType || (CashAddressType = {}));
    var CashAddressVersionByteDecodingError;
    (function(CashAddressVersionByteDecodingError2) {
      CashAddressVersionByteDecodingError2["reservedBitSet"] = "Reserved bit is set.";
    })(CashAddressVersionByteDecodingError || (CashAddressVersionByteDecodingError = {}));
    var CashAddressEncodingError;
    (function(CashAddressEncodingError2) {
      CashAddressEncodingError2["unsupportedHashLength"] = "CashAddress encoding error: a hash of this length can not be encoded as a valid CashAddress.";
    })(CashAddressEncodingError || (CashAddressEncodingError = {}));
    var CashAddressDecodingError;
    (function(CashAddressDecodingError2) {
      CashAddressDecodingError2["improperPadding"] = "CashAddress decoding error: the payload is improperly padded.";
      CashAddressDecodingError2["invalidCharacters"] = "CashAddress decoding error: the payload contains non-bech32 characters.";
      CashAddressDecodingError2["invalidChecksum"] = "CashAddress decoding error: invalid checksum \u2013 please review the address for errors.";
      CashAddressDecodingError2["invalidFormat"] = 'CashAddress decoding error: CashAddresses should be of the form "prefix:payload".';
      CashAddressDecodingError2["mismatchedHashLength"] = "CashAddress decoding error: mismatched hash length for specified address version.";
      CashAddressDecodingError2["reservedByte"] = "CashAddress decoding error: unknown CashAddress version, reserved byte set.";
    })(CashAddressDecodingError || (CashAddressDecodingError = {}));
    var CashAddressCorrectionError;
    (function(CashAddressCorrectionError2) {
      CashAddressCorrectionError2["tooManyErrors"] = "This address has more than 2 errors and cannot be corrected.";
    })(CashAddressCorrectionError || (CashAddressCorrectionError = {}));
    var OpcodesCommon;
    (function(OpcodesCommon2) {
      OpcodesCommon2[OpcodesCommon2["OP_0"] = 0] = "OP_0";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_1"] = 1] = "OP_PUSHBYTES_1";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_2"] = 2] = "OP_PUSHBYTES_2";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_3"] = 3] = "OP_PUSHBYTES_3";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_4"] = 4] = "OP_PUSHBYTES_4";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_5"] = 5] = "OP_PUSHBYTES_5";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_6"] = 6] = "OP_PUSHBYTES_6";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_7"] = 7] = "OP_PUSHBYTES_7";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_8"] = 8] = "OP_PUSHBYTES_8";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_9"] = 9] = "OP_PUSHBYTES_9";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_10"] = 10] = "OP_PUSHBYTES_10";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_11"] = 11] = "OP_PUSHBYTES_11";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_12"] = 12] = "OP_PUSHBYTES_12";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_13"] = 13] = "OP_PUSHBYTES_13";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_14"] = 14] = "OP_PUSHBYTES_14";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_15"] = 15] = "OP_PUSHBYTES_15";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_16"] = 16] = "OP_PUSHBYTES_16";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_17"] = 17] = "OP_PUSHBYTES_17";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_18"] = 18] = "OP_PUSHBYTES_18";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_19"] = 19] = "OP_PUSHBYTES_19";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_20"] = 20] = "OP_PUSHBYTES_20";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_21"] = 21] = "OP_PUSHBYTES_21";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_22"] = 22] = "OP_PUSHBYTES_22";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_23"] = 23] = "OP_PUSHBYTES_23";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_24"] = 24] = "OP_PUSHBYTES_24";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_25"] = 25] = "OP_PUSHBYTES_25";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_26"] = 26] = "OP_PUSHBYTES_26";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_27"] = 27] = "OP_PUSHBYTES_27";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_28"] = 28] = "OP_PUSHBYTES_28";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_29"] = 29] = "OP_PUSHBYTES_29";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_30"] = 30] = "OP_PUSHBYTES_30";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_31"] = 31] = "OP_PUSHBYTES_31";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_32"] = 32] = "OP_PUSHBYTES_32";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_33"] = 33] = "OP_PUSHBYTES_33";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_34"] = 34] = "OP_PUSHBYTES_34";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_35"] = 35] = "OP_PUSHBYTES_35";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_36"] = 36] = "OP_PUSHBYTES_36";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_37"] = 37] = "OP_PUSHBYTES_37";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_38"] = 38] = "OP_PUSHBYTES_38";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_39"] = 39] = "OP_PUSHBYTES_39";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_40"] = 40] = "OP_PUSHBYTES_40";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_41"] = 41] = "OP_PUSHBYTES_41";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_42"] = 42] = "OP_PUSHBYTES_42";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_43"] = 43] = "OP_PUSHBYTES_43";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_44"] = 44] = "OP_PUSHBYTES_44";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_45"] = 45] = "OP_PUSHBYTES_45";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_46"] = 46] = "OP_PUSHBYTES_46";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_47"] = 47] = "OP_PUSHBYTES_47";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_48"] = 48] = "OP_PUSHBYTES_48";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_49"] = 49] = "OP_PUSHBYTES_49";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_50"] = 50] = "OP_PUSHBYTES_50";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_51"] = 51] = "OP_PUSHBYTES_51";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_52"] = 52] = "OP_PUSHBYTES_52";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_53"] = 53] = "OP_PUSHBYTES_53";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_54"] = 54] = "OP_PUSHBYTES_54";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_55"] = 55] = "OP_PUSHBYTES_55";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_56"] = 56] = "OP_PUSHBYTES_56";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_57"] = 57] = "OP_PUSHBYTES_57";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_58"] = 58] = "OP_PUSHBYTES_58";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_59"] = 59] = "OP_PUSHBYTES_59";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_60"] = 60] = "OP_PUSHBYTES_60";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_61"] = 61] = "OP_PUSHBYTES_61";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_62"] = 62] = "OP_PUSHBYTES_62";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_63"] = 63] = "OP_PUSHBYTES_63";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_64"] = 64] = "OP_PUSHBYTES_64";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_65"] = 65] = "OP_PUSHBYTES_65";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_66"] = 66] = "OP_PUSHBYTES_66";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_67"] = 67] = "OP_PUSHBYTES_67";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_68"] = 68] = "OP_PUSHBYTES_68";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_69"] = 69] = "OP_PUSHBYTES_69";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_70"] = 70] = "OP_PUSHBYTES_70";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_71"] = 71] = "OP_PUSHBYTES_71";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_72"] = 72] = "OP_PUSHBYTES_72";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_73"] = 73] = "OP_PUSHBYTES_73";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_74"] = 74] = "OP_PUSHBYTES_74";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHBYTES_75"] = 75] = "OP_PUSHBYTES_75";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHDATA_1"] = 76] = "OP_PUSHDATA_1";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHDATA_2"] = 77] = "OP_PUSHDATA_2";
      OpcodesCommon2[OpcodesCommon2["OP_PUSHDATA_4"] = 78] = "OP_PUSHDATA_4";
      OpcodesCommon2[OpcodesCommon2["OP_1NEGATE"] = 79] = "OP_1NEGATE";
      OpcodesCommon2[OpcodesCommon2["OP_RESERVED"] = 80] = "OP_RESERVED";
      OpcodesCommon2[OpcodesCommon2["OP_1"] = 81] = "OP_1";
      OpcodesCommon2[OpcodesCommon2["OP_2"] = 82] = "OP_2";
      OpcodesCommon2[OpcodesCommon2["OP_3"] = 83] = "OP_3";
      OpcodesCommon2[OpcodesCommon2["OP_4"] = 84] = "OP_4";
      OpcodesCommon2[OpcodesCommon2["OP_5"] = 85] = "OP_5";
      OpcodesCommon2[OpcodesCommon2["OP_6"] = 86] = "OP_6";
      OpcodesCommon2[OpcodesCommon2["OP_7"] = 87] = "OP_7";
      OpcodesCommon2[OpcodesCommon2["OP_8"] = 88] = "OP_8";
      OpcodesCommon2[OpcodesCommon2["OP_9"] = 89] = "OP_9";
      OpcodesCommon2[OpcodesCommon2["OP_10"] = 90] = "OP_10";
      OpcodesCommon2[OpcodesCommon2["OP_11"] = 91] = "OP_11";
      OpcodesCommon2[OpcodesCommon2["OP_12"] = 92] = "OP_12";
      OpcodesCommon2[OpcodesCommon2["OP_13"] = 93] = "OP_13";
      OpcodesCommon2[OpcodesCommon2["OP_14"] = 94] = "OP_14";
      OpcodesCommon2[OpcodesCommon2["OP_15"] = 95] = "OP_15";
      OpcodesCommon2[OpcodesCommon2["OP_16"] = 96] = "OP_16";
      OpcodesCommon2[OpcodesCommon2["OP_NOP"] = 97] = "OP_NOP";
      OpcodesCommon2[OpcodesCommon2["OP_VER"] = 98] = "OP_VER";
      OpcodesCommon2[OpcodesCommon2["OP_IF"] = 99] = "OP_IF";
      OpcodesCommon2[OpcodesCommon2["OP_NOTIF"] = 100] = "OP_NOTIF";
      OpcodesCommon2[OpcodesCommon2["OP_VERIF"] = 101] = "OP_VERIF";
      OpcodesCommon2[OpcodesCommon2["OP_VERNOTIF"] = 102] = "OP_VERNOTIF";
      OpcodesCommon2[OpcodesCommon2["OP_ELSE"] = 103] = "OP_ELSE";
      OpcodesCommon2[OpcodesCommon2["OP_ENDIF"] = 104] = "OP_ENDIF";
      OpcodesCommon2[OpcodesCommon2["OP_VERIFY"] = 105] = "OP_VERIFY";
      OpcodesCommon2[OpcodesCommon2["OP_RETURN"] = 106] = "OP_RETURN";
      OpcodesCommon2[OpcodesCommon2["OP_TOALTSTACK"] = 107] = "OP_TOALTSTACK";
      OpcodesCommon2[OpcodesCommon2["OP_FROMALTSTACK"] = 108] = "OP_FROMALTSTACK";
      OpcodesCommon2[OpcodesCommon2["OP_2DROP"] = 109] = "OP_2DROP";
      OpcodesCommon2[OpcodesCommon2["OP_2DUP"] = 110] = "OP_2DUP";
      OpcodesCommon2[OpcodesCommon2["OP_3DUP"] = 111] = "OP_3DUP";
      OpcodesCommon2[OpcodesCommon2["OP_2OVER"] = 112] = "OP_2OVER";
      OpcodesCommon2[OpcodesCommon2["OP_2ROT"] = 113] = "OP_2ROT";
      OpcodesCommon2[OpcodesCommon2["OP_2SWAP"] = 114] = "OP_2SWAP";
      OpcodesCommon2[OpcodesCommon2["OP_IFDUP"] = 115] = "OP_IFDUP";
      OpcodesCommon2[OpcodesCommon2["OP_DEPTH"] = 116] = "OP_DEPTH";
      OpcodesCommon2[OpcodesCommon2["OP_DROP"] = 117] = "OP_DROP";
      OpcodesCommon2[OpcodesCommon2["OP_DUP"] = 118] = "OP_DUP";
      OpcodesCommon2[OpcodesCommon2["OP_NIP"] = 119] = "OP_NIP";
      OpcodesCommon2[OpcodesCommon2["OP_OVER"] = 120] = "OP_OVER";
      OpcodesCommon2[OpcodesCommon2["OP_PICK"] = 121] = "OP_PICK";
      OpcodesCommon2[OpcodesCommon2["OP_ROLL"] = 122] = "OP_ROLL";
      OpcodesCommon2[OpcodesCommon2["OP_ROT"] = 123] = "OP_ROT";
      OpcodesCommon2[OpcodesCommon2["OP_SWAP"] = 124] = "OP_SWAP";
      OpcodesCommon2[OpcodesCommon2["OP_TUCK"] = 125] = "OP_TUCK";
      OpcodesCommon2[OpcodesCommon2["OP_CAT"] = 126] = "OP_CAT";
      OpcodesCommon2[OpcodesCommon2["OP_SUBSTR"] = 127] = "OP_SUBSTR";
      OpcodesCommon2[OpcodesCommon2["OP_LEFT"] = 128] = "OP_LEFT";
      OpcodesCommon2[OpcodesCommon2["OP_RIGHT"] = 129] = "OP_RIGHT";
      OpcodesCommon2[OpcodesCommon2["OP_SIZE"] = 130] = "OP_SIZE";
      OpcodesCommon2[OpcodesCommon2["OP_INVERT"] = 131] = "OP_INVERT";
      OpcodesCommon2[OpcodesCommon2["OP_AND"] = 132] = "OP_AND";
      OpcodesCommon2[OpcodesCommon2["OP_OR"] = 133] = "OP_OR";
      OpcodesCommon2[OpcodesCommon2["OP_XOR"] = 134] = "OP_XOR";
      OpcodesCommon2[OpcodesCommon2["OP_EQUAL"] = 135] = "OP_EQUAL";
      OpcodesCommon2[OpcodesCommon2["OP_EQUALVERIFY"] = 136] = "OP_EQUALVERIFY";
      OpcodesCommon2[OpcodesCommon2["OP_RESERVED1"] = 137] = "OP_RESERVED1";
      OpcodesCommon2[OpcodesCommon2["OP_RESERVED2"] = 138] = "OP_RESERVED2";
      OpcodesCommon2[OpcodesCommon2["OP_1ADD"] = 139] = "OP_1ADD";
      OpcodesCommon2[OpcodesCommon2["OP_1SUB"] = 140] = "OP_1SUB";
      OpcodesCommon2[OpcodesCommon2["OP_2MUL"] = 141] = "OP_2MUL";
      OpcodesCommon2[OpcodesCommon2["OP_2DIV"] = 142] = "OP_2DIV";
      OpcodesCommon2[OpcodesCommon2["OP_NEGATE"] = 143] = "OP_NEGATE";
      OpcodesCommon2[OpcodesCommon2["OP_ABS"] = 144] = "OP_ABS";
      OpcodesCommon2[OpcodesCommon2["OP_NOT"] = 145] = "OP_NOT";
      OpcodesCommon2[OpcodesCommon2["OP_0NOTEQUAL"] = 146] = "OP_0NOTEQUAL";
      OpcodesCommon2[OpcodesCommon2["OP_ADD"] = 147] = "OP_ADD";
      OpcodesCommon2[OpcodesCommon2["OP_SUB"] = 148] = "OP_SUB";
      OpcodesCommon2[OpcodesCommon2["OP_MUL"] = 149] = "OP_MUL";
      OpcodesCommon2[OpcodesCommon2["OP_DIV"] = 150] = "OP_DIV";
      OpcodesCommon2[OpcodesCommon2["OP_MOD"] = 151] = "OP_MOD";
      OpcodesCommon2[OpcodesCommon2["OP_LSHIFT"] = 152] = "OP_LSHIFT";
      OpcodesCommon2[OpcodesCommon2["OP_RSHIFT"] = 153] = "OP_RSHIFT";
      OpcodesCommon2[OpcodesCommon2["OP_BOOLAND"] = 154] = "OP_BOOLAND";
      OpcodesCommon2[OpcodesCommon2["OP_BOOLOR"] = 155] = "OP_BOOLOR";
      OpcodesCommon2[OpcodesCommon2["OP_NUMEQUAL"] = 156] = "OP_NUMEQUAL";
      OpcodesCommon2[OpcodesCommon2["OP_NUMEQUALVERIFY"] = 157] = "OP_NUMEQUALVERIFY";
      OpcodesCommon2[OpcodesCommon2["OP_NUMNOTEQUAL"] = 158] = "OP_NUMNOTEQUAL";
      OpcodesCommon2[OpcodesCommon2["OP_LESSTHAN"] = 159] = "OP_LESSTHAN";
      OpcodesCommon2[OpcodesCommon2["OP_GREATERTHAN"] = 160] = "OP_GREATERTHAN";
      OpcodesCommon2[OpcodesCommon2["OP_LESSTHANOREQUAL"] = 161] = "OP_LESSTHANOREQUAL";
      OpcodesCommon2[OpcodesCommon2["OP_GREATERTHANOREQUAL"] = 162] = "OP_GREATERTHANOREQUAL";
      OpcodesCommon2[OpcodesCommon2["OP_MIN"] = 163] = "OP_MIN";
      OpcodesCommon2[OpcodesCommon2["OP_MAX"] = 164] = "OP_MAX";
      OpcodesCommon2[OpcodesCommon2["OP_WITHIN"] = 165] = "OP_WITHIN";
      OpcodesCommon2[OpcodesCommon2["OP_RIPEMD160"] = 166] = "OP_RIPEMD160";
      OpcodesCommon2[OpcodesCommon2["OP_SHA1"] = 167] = "OP_SHA1";
      OpcodesCommon2[OpcodesCommon2["OP_SHA256"] = 168] = "OP_SHA256";
      OpcodesCommon2[OpcodesCommon2["OP_HASH160"] = 169] = "OP_HASH160";
      OpcodesCommon2[OpcodesCommon2["OP_HASH256"] = 170] = "OP_HASH256";
      OpcodesCommon2[OpcodesCommon2["OP_CODESEPARATOR"] = 171] = "OP_CODESEPARATOR";
      OpcodesCommon2[OpcodesCommon2["OP_CHECKSIG"] = 172] = "OP_CHECKSIG";
      OpcodesCommon2[OpcodesCommon2["OP_CHECKSIGVERIFY"] = 173] = "OP_CHECKSIGVERIFY";
      OpcodesCommon2[OpcodesCommon2["OP_CHECKMULTISIG"] = 174] = "OP_CHECKMULTISIG";
      OpcodesCommon2[OpcodesCommon2["OP_CHECKMULTISIGVERIFY"] = 175] = "OP_CHECKMULTISIGVERIFY";
      OpcodesCommon2[OpcodesCommon2["OP_NOP1"] = 176] = "OP_NOP1";
      OpcodesCommon2[OpcodesCommon2["OP_CHECKLOCKTIMEVERIFY"] = 177] = "OP_CHECKLOCKTIMEVERIFY";
      OpcodesCommon2[OpcodesCommon2["OP_CHECKSEQUENCEVERIFY"] = 178] = "OP_CHECKSEQUENCEVERIFY";
      OpcodesCommon2[OpcodesCommon2["OP_NOP4"] = 179] = "OP_NOP4";
      OpcodesCommon2[OpcodesCommon2["OP_NOP5"] = 180] = "OP_NOP5";
      OpcodesCommon2[OpcodesCommon2["OP_NOP6"] = 181] = "OP_NOP6";
      OpcodesCommon2[OpcodesCommon2["OP_NOP7"] = 182] = "OP_NOP7";
      OpcodesCommon2[OpcodesCommon2["OP_NOP8"] = 183] = "OP_NOP8";
      OpcodesCommon2[OpcodesCommon2["OP_NOP9"] = 184] = "OP_NOP9";
      OpcodesCommon2[OpcodesCommon2["OP_NOP10"] = 185] = "OP_NOP10";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN186"] = 186] = "OP_UNKNOWN186";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN187"] = 187] = "OP_UNKNOWN187";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN188"] = 188] = "OP_UNKNOWN188";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN189"] = 189] = "OP_UNKNOWN189";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN190"] = 190] = "OP_UNKNOWN190";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN191"] = 191] = "OP_UNKNOWN191";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN192"] = 192] = "OP_UNKNOWN192";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN193"] = 193] = "OP_UNKNOWN193";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN194"] = 194] = "OP_UNKNOWN194";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN195"] = 195] = "OP_UNKNOWN195";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN196"] = 196] = "OP_UNKNOWN196";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN197"] = 197] = "OP_UNKNOWN197";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN198"] = 198] = "OP_UNKNOWN198";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN199"] = 199] = "OP_UNKNOWN199";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN200"] = 200] = "OP_UNKNOWN200";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN201"] = 201] = "OP_UNKNOWN201";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN202"] = 202] = "OP_UNKNOWN202";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN203"] = 203] = "OP_UNKNOWN203";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN204"] = 204] = "OP_UNKNOWN204";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN205"] = 205] = "OP_UNKNOWN205";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN206"] = 206] = "OP_UNKNOWN206";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN207"] = 207] = "OP_UNKNOWN207";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN208"] = 208] = "OP_UNKNOWN208";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN209"] = 209] = "OP_UNKNOWN209";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN210"] = 210] = "OP_UNKNOWN210";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN211"] = 211] = "OP_UNKNOWN211";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN212"] = 212] = "OP_UNKNOWN212";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN213"] = 213] = "OP_UNKNOWN213";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN214"] = 214] = "OP_UNKNOWN214";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN215"] = 215] = "OP_UNKNOWN215";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN216"] = 216] = "OP_UNKNOWN216";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN217"] = 217] = "OP_UNKNOWN217";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN218"] = 218] = "OP_UNKNOWN218";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN219"] = 219] = "OP_UNKNOWN219";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN220"] = 220] = "OP_UNKNOWN220";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN221"] = 221] = "OP_UNKNOWN221";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN222"] = 222] = "OP_UNKNOWN222";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN223"] = 223] = "OP_UNKNOWN223";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN224"] = 224] = "OP_UNKNOWN224";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN225"] = 225] = "OP_UNKNOWN225";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN226"] = 226] = "OP_UNKNOWN226";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN227"] = 227] = "OP_UNKNOWN227";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN228"] = 228] = "OP_UNKNOWN228";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN229"] = 229] = "OP_UNKNOWN229";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN230"] = 230] = "OP_UNKNOWN230";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN231"] = 231] = "OP_UNKNOWN231";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN232"] = 232] = "OP_UNKNOWN232";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN233"] = 233] = "OP_UNKNOWN233";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN234"] = 234] = "OP_UNKNOWN234";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN235"] = 235] = "OP_UNKNOWN235";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN236"] = 236] = "OP_UNKNOWN236";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN237"] = 237] = "OP_UNKNOWN237";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN238"] = 238] = "OP_UNKNOWN238";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN239"] = 239] = "OP_UNKNOWN239";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN240"] = 240] = "OP_UNKNOWN240";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN241"] = 241] = "OP_UNKNOWN241";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN242"] = 242] = "OP_UNKNOWN242";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN243"] = 243] = "OP_UNKNOWN243";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN244"] = 244] = "OP_UNKNOWN244";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN245"] = 245] = "OP_UNKNOWN245";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN246"] = 246] = "OP_UNKNOWN246";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN247"] = 247] = "OP_UNKNOWN247";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN248"] = 248] = "OP_UNKNOWN248";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN249"] = 249] = "OP_UNKNOWN249";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN250"] = 250] = "OP_UNKNOWN250";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN251"] = 251] = "OP_UNKNOWN251";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN252"] = 252] = "OP_UNKNOWN252";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN253"] = 253] = "OP_UNKNOWN253";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN254"] = 254] = "OP_UNKNOWN254";
      OpcodesCommon2[OpcodesCommon2["OP_UNKNOWN255"] = 255] = "OP_UNKNOWN255";
    })(OpcodesCommon || (OpcodesCommon = {}));
    var AddressType;
    (function(AddressType2) {
      AddressType2["p2pk"] = "P2PK";
      AddressType2["p2pkh"] = "P2PKH";
      AddressType2["p2sh"] = "P2SH";
      AddressType2["unknown"] = "unknown";
    })(AddressType || (AddressType = {}));
    var LockingBytecodeEncodingError;
    (function(LockingBytecodeEncodingError2) {
      LockingBytecodeEncodingError2["unknownCashAddressType"] = "This CashAddress uses an unknown address type.";
    })(LockingBytecodeEncodingError || (LockingBytecodeEncodingError = {}));
    var OpcodesBTC;
    (function(OpcodesBTC2) {
      OpcodesBTC2[OpcodesBTC2["OP_0"] = 0] = "OP_0";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_1"] = 1] = "OP_PUSHBYTES_1";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_2"] = 2] = "OP_PUSHBYTES_2";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_3"] = 3] = "OP_PUSHBYTES_3";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_4"] = 4] = "OP_PUSHBYTES_4";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_5"] = 5] = "OP_PUSHBYTES_5";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_6"] = 6] = "OP_PUSHBYTES_6";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_7"] = 7] = "OP_PUSHBYTES_7";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_8"] = 8] = "OP_PUSHBYTES_8";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_9"] = 9] = "OP_PUSHBYTES_9";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_10"] = 10] = "OP_PUSHBYTES_10";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_11"] = 11] = "OP_PUSHBYTES_11";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_12"] = 12] = "OP_PUSHBYTES_12";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_13"] = 13] = "OP_PUSHBYTES_13";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_14"] = 14] = "OP_PUSHBYTES_14";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_15"] = 15] = "OP_PUSHBYTES_15";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_16"] = 16] = "OP_PUSHBYTES_16";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_17"] = 17] = "OP_PUSHBYTES_17";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_18"] = 18] = "OP_PUSHBYTES_18";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_19"] = 19] = "OP_PUSHBYTES_19";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_20"] = 20] = "OP_PUSHBYTES_20";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_21"] = 21] = "OP_PUSHBYTES_21";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_22"] = 22] = "OP_PUSHBYTES_22";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_23"] = 23] = "OP_PUSHBYTES_23";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_24"] = 24] = "OP_PUSHBYTES_24";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_25"] = 25] = "OP_PUSHBYTES_25";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_26"] = 26] = "OP_PUSHBYTES_26";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_27"] = 27] = "OP_PUSHBYTES_27";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_28"] = 28] = "OP_PUSHBYTES_28";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_29"] = 29] = "OP_PUSHBYTES_29";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_30"] = 30] = "OP_PUSHBYTES_30";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_31"] = 31] = "OP_PUSHBYTES_31";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_32"] = 32] = "OP_PUSHBYTES_32";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_33"] = 33] = "OP_PUSHBYTES_33";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_34"] = 34] = "OP_PUSHBYTES_34";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_35"] = 35] = "OP_PUSHBYTES_35";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_36"] = 36] = "OP_PUSHBYTES_36";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_37"] = 37] = "OP_PUSHBYTES_37";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_38"] = 38] = "OP_PUSHBYTES_38";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_39"] = 39] = "OP_PUSHBYTES_39";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_40"] = 40] = "OP_PUSHBYTES_40";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_41"] = 41] = "OP_PUSHBYTES_41";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_42"] = 42] = "OP_PUSHBYTES_42";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_43"] = 43] = "OP_PUSHBYTES_43";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_44"] = 44] = "OP_PUSHBYTES_44";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_45"] = 45] = "OP_PUSHBYTES_45";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_46"] = 46] = "OP_PUSHBYTES_46";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_47"] = 47] = "OP_PUSHBYTES_47";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_48"] = 48] = "OP_PUSHBYTES_48";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_49"] = 49] = "OP_PUSHBYTES_49";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_50"] = 50] = "OP_PUSHBYTES_50";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_51"] = 51] = "OP_PUSHBYTES_51";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_52"] = 52] = "OP_PUSHBYTES_52";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_53"] = 53] = "OP_PUSHBYTES_53";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_54"] = 54] = "OP_PUSHBYTES_54";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_55"] = 55] = "OP_PUSHBYTES_55";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_56"] = 56] = "OP_PUSHBYTES_56";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_57"] = 57] = "OP_PUSHBYTES_57";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_58"] = 58] = "OP_PUSHBYTES_58";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_59"] = 59] = "OP_PUSHBYTES_59";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_60"] = 60] = "OP_PUSHBYTES_60";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_61"] = 61] = "OP_PUSHBYTES_61";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_62"] = 62] = "OP_PUSHBYTES_62";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_63"] = 63] = "OP_PUSHBYTES_63";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_64"] = 64] = "OP_PUSHBYTES_64";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_65"] = 65] = "OP_PUSHBYTES_65";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_66"] = 66] = "OP_PUSHBYTES_66";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_67"] = 67] = "OP_PUSHBYTES_67";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_68"] = 68] = "OP_PUSHBYTES_68";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_69"] = 69] = "OP_PUSHBYTES_69";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_70"] = 70] = "OP_PUSHBYTES_70";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_71"] = 71] = "OP_PUSHBYTES_71";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_72"] = 72] = "OP_PUSHBYTES_72";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_73"] = 73] = "OP_PUSHBYTES_73";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_74"] = 74] = "OP_PUSHBYTES_74";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHBYTES_75"] = 75] = "OP_PUSHBYTES_75";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHDATA_1"] = 76] = "OP_PUSHDATA_1";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHDATA_2"] = 77] = "OP_PUSHDATA_2";
      OpcodesBTC2[OpcodesBTC2["OP_PUSHDATA_4"] = 78] = "OP_PUSHDATA_4";
      OpcodesBTC2[OpcodesBTC2["OP_1NEGATE"] = 79] = "OP_1NEGATE";
      OpcodesBTC2[OpcodesBTC2["OP_RESERVED"] = 80] = "OP_RESERVED";
      OpcodesBTC2[OpcodesBTC2["OP_1"] = 81] = "OP_1";
      OpcodesBTC2[OpcodesBTC2["OP_2"] = 82] = "OP_2";
      OpcodesBTC2[OpcodesBTC2["OP_3"] = 83] = "OP_3";
      OpcodesBTC2[OpcodesBTC2["OP_4"] = 84] = "OP_4";
      OpcodesBTC2[OpcodesBTC2["OP_5"] = 85] = "OP_5";
      OpcodesBTC2[OpcodesBTC2["OP_6"] = 86] = "OP_6";
      OpcodesBTC2[OpcodesBTC2["OP_7"] = 87] = "OP_7";
      OpcodesBTC2[OpcodesBTC2["OP_8"] = 88] = "OP_8";
      OpcodesBTC2[OpcodesBTC2["OP_9"] = 89] = "OP_9";
      OpcodesBTC2[OpcodesBTC2["OP_10"] = 90] = "OP_10";
      OpcodesBTC2[OpcodesBTC2["OP_11"] = 91] = "OP_11";
      OpcodesBTC2[OpcodesBTC2["OP_12"] = 92] = "OP_12";
      OpcodesBTC2[OpcodesBTC2["OP_13"] = 93] = "OP_13";
      OpcodesBTC2[OpcodesBTC2["OP_14"] = 94] = "OP_14";
      OpcodesBTC2[OpcodesBTC2["OP_15"] = 95] = "OP_15";
      OpcodesBTC2[OpcodesBTC2["OP_16"] = 96] = "OP_16";
      OpcodesBTC2[OpcodesBTC2["OP_NOP"] = 97] = "OP_NOP";
      OpcodesBTC2[OpcodesBTC2["OP_VER"] = 98] = "OP_VER";
      OpcodesBTC2[OpcodesBTC2["OP_IF"] = 99] = "OP_IF";
      OpcodesBTC2[OpcodesBTC2["OP_NOTIF"] = 100] = "OP_NOTIF";
      OpcodesBTC2[OpcodesBTC2["OP_VERIF"] = 101] = "OP_VERIF";
      OpcodesBTC2[OpcodesBTC2["OP_VERNOTIF"] = 102] = "OP_VERNOTIF";
      OpcodesBTC2[OpcodesBTC2["OP_ELSE"] = 103] = "OP_ELSE";
      OpcodesBTC2[OpcodesBTC2["OP_ENDIF"] = 104] = "OP_ENDIF";
      OpcodesBTC2[OpcodesBTC2["OP_VERIFY"] = 105] = "OP_VERIFY";
      OpcodesBTC2[OpcodesBTC2["OP_RETURN"] = 106] = "OP_RETURN";
      OpcodesBTC2[OpcodesBTC2["OP_TOALTSTACK"] = 107] = "OP_TOALTSTACK";
      OpcodesBTC2[OpcodesBTC2["OP_FROMALTSTACK"] = 108] = "OP_FROMALTSTACK";
      OpcodesBTC2[OpcodesBTC2["OP_2DROP"] = 109] = "OP_2DROP";
      OpcodesBTC2[OpcodesBTC2["OP_2DUP"] = 110] = "OP_2DUP";
      OpcodesBTC2[OpcodesBTC2["OP_3DUP"] = 111] = "OP_3DUP";
      OpcodesBTC2[OpcodesBTC2["OP_2OVER"] = 112] = "OP_2OVER";
      OpcodesBTC2[OpcodesBTC2["OP_2ROT"] = 113] = "OP_2ROT";
      OpcodesBTC2[OpcodesBTC2["OP_2SWAP"] = 114] = "OP_2SWAP";
      OpcodesBTC2[OpcodesBTC2["OP_IFDUP"] = 115] = "OP_IFDUP";
      OpcodesBTC2[OpcodesBTC2["OP_DEPTH"] = 116] = "OP_DEPTH";
      OpcodesBTC2[OpcodesBTC2["OP_DROP"] = 117] = "OP_DROP";
      OpcodesBTC2[OpcodesBTC2["OP_DUP"] = 118] = "OP_DUP";
      OpcodesBTC2[OpcodesBTC2["OP_NIP"] = 119] = "OP_NIP";
      OpcodesBTC2[OpcodesBTC2["OP_OVER"] = 120] = "OP_OVER";
      OpcodesBTC2[OpcodesBTC2["OP_PICK"] = 121] = "OP_PICK";
      OpcodesBTC2[OpcodesBTC2["OP_ROLL"] = 122] = "OP_ROLL";
      OpcodesBTC2[OpcodesBTC2["OP_ROT"] = 123] = "OP_ROT";
      OpcodesBTC2[OpcodesBTC2["OP_SWAP"] = 124] = "OP_SWAP";
      OpcodesBTC2[OpcodesBTC2["OP_TUCK"] = 125] = "OP_TUCK";
      OpcodesBTC2[OpcodesBTC2["OP_CAT"] = 126] = "OP_CAT";
      OpcodesBTC2[OpcodesBTC2["OP_SUBSTR"] = 127] = "OP_SUBSTR";
      OpcodesBTC2[OpcodesBTC2["OP_LEFT"] = 128] = "OP_LEFT";
      OpcodesBTC2[OpcodesBTC2["OP_RIGHT"] = 129] = "OP_RIGHT";
      OpcodesBTC2[OpcodesBTC2["OP_SIZE"] = 130] = "OP_SIZE";
      OpcodesBTC2[OpcodesBTC2["OP_INVERT"] = 131] = "OP_INVERT";
      OpcodesBTC2[OpcodesBTC2["OP_AND"] = 132] = "OP_AND";
      OpcodesBTC2[OpcodesBTC2["OP_OR"] = 133] = "OP_OR";
      OpcodesBTC2[OpcodesBTC2["OP_XOR"] = 134] = "OP_XOR";
      OpcodesBTC2[OpcodesBTC2["OP_EQUAL"] = 135] = "OP_EQUAL";
      OpcodesBTC2[OpcodesBTC2["OP_EQUALVERIFY"] = 136] = "OP_EQUALVERIFY";
      OpcodesBTC2[OpcodesBTC2["OP_RESERVED1"] = 137] = "OP_RESERVED1";
      OpcodesBTC2[OpcodesBTC2["OP_RESERVED2"] = 138] = "OP_RESERVED2";
      OpcodesBTC2[OpcodesBTC2["OP_1ADD"] = 139] = "OP_1ADD";
      OpcodesBTC2[OpcodesBTC2["OP_1SUB"] = 140] = "OP_1SUB";
      OpcodesBTC2[OpcodesBTC2["OP_2MUL"] = 141] = "OP_2MUL";
      OpcodesBTC2[OpcodesBTC2["OP_2DIV"] = 142] = "OP_2DIV";
      OpcodesBTC2[OpcodesBTC2["OP_NEGATE"] = 143] = "OP_NEGATE";
      OpcodesBTC2[OpcodesBTC2["OP_ABS"] = 144] = "OP_ABS";
      OpcodesBTC2[OpcodesBTC2["OP_NOT"] = 145] = "OP_NOT";
      OpcodesBTC2[OpcodesBTC2["OP_0NOTEQUAL"] = 146] = "OP_0NOTEQUAL";
      OpcodesBTC2[OpcodesBTC2["OP_ADD"] = 147] = "OP_ADD";
      OpcodesBTC2[OpcodesBTC2["OP_SUB"] = 148] = "OP_SUB";
      OpcodesBTC2[OpcodesBTC2["OP_MUL"] = 149] = "OP_MUL";
      OpcodesBTC2[OpcodesBTC2["OP_DIV"] = 150] = "OP_DIV";
      OpcodesBTC2[OpcodesBTC2["OP_MOD"] = 151] = "OP_MOD";
      OpcodesBTC2[OpcodesBTC2["OP_LSHIFT"] = 152] = "OP_LSHIFT";
      OpcodesBTC2[OpcodesBTC2["OP_RSHIFT"] = 153] = "OP_RSHIFT";
      OpcodesBTC2[OpcodesBTC2["OP_BOOLAND"] = 154] = "OP_BOOLAND";
      OpcodesBTC2[OpcodesBTC2["OP_BOOLOR"] = 155] = "OP_BOOLOR";
      OpcodesBTC2[OpcodesBTC2["OP_NUMEQUAL"] = 156] = "OP_NUMEQUAL";
      OpcodesBTC2[OpcodesBTC2["OP_NUMEQUALVERIFY"] = 157] = "OP_NUMEQUALVERIFY";
      OpcodesBTC2[OpcodesBTC2["OP_NUMNOTEQUAL"] = 158] = "OP_NUMNOTEQUAL";
      OpcodesBTC2[OpcodesBTC2["OP_LESSTHAN"] = 159] = "OP_LESSTHAN";
      OpcodesBTC2[OpcodesBTC2["OP_GREATERTHAN"] = 160] = "OP_GREATERTHAN";
      OpcodesBTC2[OpcodesBTC2["OP_LESSTHANOREQUAL"] = 161] = "OP_LESSTHANOREQUAL";
      OpcodesBTC2[OpcodesBTC2["OP_GREATERTHANOREQUAL"] = 162] = "OP_GREATERTHANOREQUAL";
      OpcodesBTC2[OpcodesBTC2["OP_MIN"] = 163] = "OP_MIN";
      OpcodesBTC2[OpcodesBTC2["OP_MAX"] = 164] = "OP_MAX";
      OpcodesBTC2[OpcodesBTC2["OP_WITHIN"] = 165] = "OP_WITHIN";
      OpcodesBTC2[OpcodesBTC2["OP_RIPEMD160"] = 166] = "OP_RIPEMD160";
      OpcodesBTC2[OpcodesBTC2["OP_SHA1"] = 167] = "OP_SHA1";
      OpcodesBTC2[OpcodesBTC2["OP_SHA256"] = 168] = "OP_SHA256";
      OpcodesBTC2[OpcodesBTC2["OP_HASH160"] = 169] = "OP_HASH160";
      OpcodesBTC2[OpcodesBTC2["OP_HASH256"] = 170] = "OP_HASH256";
      OpcodesBTC2[OpcodesBTC2["OP_CODESEPARATOR"] = 171] = "OP_CODESEPARATOR";
      OpcodesBTC2[OpcodesBTC2["OP_CHECKSIG"] = 172] = "OP_CHECKSIG";
      OpcodesBTC2[OpcodesBTC2["OP_CHECKSIGVERIFY"] = 173] = "OP_CHECKSIGVERIFY";
      OpcodesBTC2[OpcodesBTC2["OP_CHECKMULTISIG"] = 174] = "OP_CHECKMULTISIG";
      OpcodesBTC2[OpcodesBTC2["OP_CHECKMULTISIGVERIFY"] = 175] = "OP_CHECKMULTISIGVERIFY";
      OpcodesBTC2[OpcodesBTC2["OP_NOP1"] = 176] = "OP_NOP1";
      OpcodesBTC2[OpcodesBTC2["OP_CHECKLOCKTIMEVERIFY"] = 177] = "OP_CHECKLOCKTIMEVERIFY";
      OpcodesBTC2[OpcodesBTC2["OP_CHECKSEQUENCEVERIFY"] = 178] = "OP_CHECKSEQUENCEVERIFY";
      OpcodesBTC2[OpcodesBTC2["OP_NOP4"] = 179] = "OP_NOP4";
      OpcodesBTC2[OpcodesBTC2["OP_NOP5"] = 180] = "OP_NOP5";
      OpcodesBTC2[OpcodesBTC2["OP_NOP6"] = 181] = "OP_NOP6";
      OpcodesBTC2[OpcodesBTC2["OP_NOP7"] = 182] = "OP_NOP7";
      OpcodesBTC2[OpcodesBTC2["OP_NOP8"] = 183] = "OP_NOP8";
      OpcodesBTC2[OpcodesBTC2["OP_NOP9"] = 184] = "OP_NOP9";
      OpcodesBTC2[OpcodesBTC2["OP_NOP10"] = 185] = "OP_NOP10";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN186"] = 186] = "OP_UNKNOWN186";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN187"] = 187] = "OP_UNKNOWN187";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN188"] = 188] = "OP_UNKNOWN188";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN189"] = 189] = "OP_UNKNOWN189";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN190"] = 190] = "OP_UNKNOWN190";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN191"] = 191] = "OP_UNKNOWN191";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN192"] = 192] = "OP_UNKNOWN192";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN193"] = 193] = "OP_UNKNOWN193";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN194"] = 194] = "OP_UNKNOWN194";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN195"] = 195] = "OP_UNKNOWN195";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN196"] = 196] = "OP_UNKNOWN196";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN197"] = 197] = "OP_UNKNOWN197";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN198"] = 198] = "OP_UNKNOWN198";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN199"] = 199] = "OP_UNKNOWN199";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN200"] = 200] = "OP_UNKNOWN200";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN201"] = 201] = "OP_UNKNOWN201";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN202"] = 202] = "OP_UNKNOWN202";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN203"] = 203] = "OP_UNKNOWN203";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN204"] = 204] = "OP_UNKNOWN204";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN205"] = 205] = "OP_UNKNOWN205";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN206"] = 206] = "OP_UNKNOWN206";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN207"] = 207] = "OP_UNKNOWN207";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN208"] = 208] = "OP_UNKNOWN208";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN209"] = 209] = "OP_UNKNOWN209";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN210"] = 210] = "OP_UNKNOWN210";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN211"] = 211] = "OP_UNKNOWN211";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN212"] = 212] = "OP_UNKNOWN212";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN213"] = 213] = "OP_UNKNOWN213";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN214"] = 214] = "OP_UNKNOWN214";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN215"] = 215] = "OP_UNKNOWN215";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN216"] = 216] = "OP_UNKNOWN216";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN217"] = 217] = "OP_UNKNOWN217";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN218"] = 218] = "OP_UNKNOWN218";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN219"] = 219] = "OP_UNKNOWN219";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN220"] = 220] = "OP_UNKNOWN220";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN221"] = 221] = "OP_UNKNOWN221";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN222"] = 222] = "OP_UNKNOWN222";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN223"] = 223] = "OP_UNKNOWN223";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN224"] = 224] = "OP_UNKNOWN224";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN225"] = 225] = "OP_UNKNOWN225";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN226"] = 226] = "OP_UNKNOWN226";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN227"] = 227] = "OP_UNKNOWN227";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN228"] = 228] = "OP_UNKNOWN228";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN229"] = 229] = "OP_UNKNOWN229";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN230"] = 230] = "OP_UNKNOWN230";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN231"] = 231] = "OP_UNKNOWN231";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN232"] = 232] = "OP_UNKNOWN232";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN233"] = 233] = "OP_UNKNOWN233";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN234"] = 234] = "OP_UNKNOWN234";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN235"] = 235] = "OP_UNKNOWN235";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN236"] = 236] = "OP_UNKNOWN236";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN237"] = 237] = "OP_UNKNOWN237";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN238"] = 238] = "OP_UNKNOWN238";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN239"] = 239] = "OP_UNKNOWN239";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN240"] = 240] = "OP_UNKNOWN240";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN241"] = 241] = "OP_UNKNOWN241";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN242"] = 242] = "OP_UNKNOWN242";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN243"] = 243] = "OP_UNKNOWN243";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN244"] = 244] = "OP_UNKNOWN244";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN245"] = 245] = "OP_UNKNOWN245";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN246"] = 246] = "OP_UNKNOWN246";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN247"] = 247] = "OP_UNKNOWN247";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN248"] = 248] = "OP_UNKNOWN248";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN249"] = 249] = "OP_UNKNOWN249";
      OpcodesBTC2[OpcodesBTC2["OP_SMALLINTEGER"] = 250] = "OP_SMALLINTEGER";
      OpcodesBTC2[OpcodesBTC2["OP_PUBKEYS"] = 251] = "OP_PUBKEYS";
      OpcodesBTC2[OpcodesBTC2["OP_UNKNOWN252"] = 252] = "OP_UNKNOWN252";
      OpcodesBTC2[OpcodesBTC2["OP_PUBKEYHASH"] = 253] = "OP_PUBKEYHASH";
      OpcodesBTC2[OpcodesBTC2["OP_PUBKEY"] = 254] = "OP_PUBKEY";
      OpcodesBTC2[OpcodesBTC2["OP_INVALIDOPCODE"] = 255] = "OP_INVALIDOPCODE";
    })(OpcodesBTC || (OpcodesBTC = {}));
    const instantiateHmacFunction = (hashFunction, blockByteLength) => (secret, message) => {
      const key = new Uint8Array(blockByteLength).fill(0);
      key.set(secret.length > blockByteLength ? hashFunction(secret) : secret, 0);
      const innerPaddingFill = 54;
      const innerPadding = new Uint8Array(blockByteLength).fill(innerPaddingFill);
      const innerPrefix = innerPadding.map((pad, index2) => pad ^ key[index2]);
      const innerContent = flattenBinArray([innerPrefix, message]);
      const innerResult = hashFunction(innerContent);
      const outerPaddingFill = 92;
      const outerPadding = new Uint8Array(blockByteLength).fill(outerPaddingFill);
      const outerPrefix = outerPadding.map((pad, index2) => pad ^ key[index2]);
      return hashFunction(flattenBinArray([outerPrefix, innerResult]));
    };
    const sha512BlockByteLength = 128;
    const hmacSha512 = (sha5122, secret, message) => instantiateHmacFunction(sha5122.hash, sha512BlockByteLength)(secret, message);
    const instantiateRustWasm = async (webassemblyBytes, expectedImportModuleName, hashExportName, initExportName, updateExportName, finalExportName) => {
      const wasm = (await WebAssembly.instantiate(webassemblyBytes, {
        [expectedImportModuleName]: {
          __wbindgen_throw: (ptr, len) => {
            throw new Error(Array.from(getUint8Memory().subarray(ptr, ptr + len)).map((num) => String.fromCharCode(num)).join(""));
          }
        }
      })).instance.exports;
      let cachedUint8Memory;
      let cachedUint32Memory;
      let cachedGlobalArgumentPtr;
      const globalArgumentPtr = () => {
        if (cachedGlobalArgumentPtr === void 0) {
          cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
        }
        return cachedGlobalArgumentPtr;
      };
      function getUint8Memory() {
        if (cachedUint8Memory === void 0 || cachedUint8Memory.buffer !== wasm.memory.buffer) {
          cachedUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachedUint8Memory;
      }
      const getUint32Memory = () => {
        if (cachedUint32Memory === void 0 || cachedUint32Memory.buffer !== wasm.memory.buffer) {
          cachedUint32Memory = new Uint32Array(wasm.memory.buffer);
        }
        return cachedUint32Memory;
      };
      const passArray8ToWasm = (array) => {
        const ptr = wasm.__wbindgen_malloc(array.length);
        getUint8Memory().set(array, ptr);
        return [ptr, array.length];
      };
      const getArrayU8FromWasm = (ptr, len) => getUint8Memory().subarray(ptr, ptr + len);
      const hash = (input) => {
        const [ptr0, len0] = passArray8ToWasm(input);
        const retPtr = globalArgumentPtr();
        try {
          wasm[hashExportName](retPtr, ptr0, len0);
          const mem = getUint32Memory();
          const ptr = mem[retPtr / 4];
          const len = mem[retPtr / 4 + 1];
          const realRet = getArrayU8FromWasm(ptr, len).slice();
          wasm.__wbindgen_free(ptr, len);
          return realRet;
        } finally {
          wasm.__wbindgen_free(ptr0, len0);
        }
      };
      const init = () => {
        const retPtr = globalArgumentPtr();
        wasm[initExportName](retPtr);
        const mem = getUint32Memory();
        const ptr = mem[retPtr / 4];
        const len = mem[retPtr / 4 + 1];
        const realRet = getArrayU8FromWasm(ptr, len).slice();
        wasm.__wbindgen_free(ptr, len);
        return realRet;
      };
      const update = (rawState, input) => {
        const [ptr0, len0] = passArray8ToWasm(rawState);
        const [ptr1, len1] = passArray8ToWasm(input);
        const retPtr = globalArgumentPtr();
        try {
          wasm[updateExportName](retPtr, ptr0, len0, ptr1, len1);
          const mem = getUint32Memory();
          const ptr = mem[retPtr / 4];
          const len = mem[retPtr / 4 + 1];
          const realRet = getArrayU8FromWasm(ptr, len).slice();
          wasm.__wbindgen_free(ptr, len);
          return realRet;
        } finally {
          rawState.set(getUint8Memory().subarray(ptr0 / 1, ptr0 / 1 + len0));
          wasm.__wbindgen_free(ptr0, len0);
          wasm.__wbindgen_free(ptr1, len1);
        }
      };
      const final = (rawState) => {
        const [ptr0, len0] = passArray8ToWasm(rawState);
        const retPtr = globalArgumentPtr();
        try {
          wasm[finalExportName](retPtr, ptr0, len0);
          const mem = getUint32Memory();
          const ptr = mem[retPtr / 4];
          const len = mem[retPtr / 4 + 1];
          const realRet = getArrayU8FromWasm(ptr, len).slice();
          wasm.__wbindgen_free(ptr, len);
          return realRet;
        } finally {
          rawState.set(getUint8Memory().subarray(ptr0 / 1, ptr0 / 1 + len0));
          wasm.__wbindgen_free(ptr0, len0);
        }
      };
      return {
        final,
        hash,
        init,
        update
      };
    };
    const ripemd160Base64Bytes = "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AgQMBQsgAEH8EigCACACaiICQQFyNgIEQYQTIAA2AgBB/BIgAjYCACAAIAJqIAI2AgAMBAsgAxAgDAELQewPQewPKAIAQX4gAUEDdndxNgIACyAEIAJqIQIgAyAEaiEDCyADIAMoAgRBfnE2AgQgACACQQFyNgIEIAAgAmogAjYCAAJ/AkAgAkH/AU0EQCACQQN2IgFBA3RB9A9qIQJB7A8oAgAiA0EBIAFBH3F0IgFxRQ0BIAJBCGohAyACKAIIDAILIAAgAhAhDAILQewPIAMgAXI2AgAgAkEIaiEDIAILIQEgAyAANgIAIAEgADYCDCAAIAI2AgwgACABNgIICyAFQQhqDwtBgBMgACACayIBNgIAQYgTQYgTKAIAIgAgAmoiAzYCACADIAFBAXI2AgQgACACQQNyNgIEIABBCGoLpQEBAn9BAiEFAkACQAJAAkACQCAAKAIEIgYgAWsgAk8NACABIAJqIgIgAUkhAQJAIAQEQEEAIQUgAQ0CIAZBAXQiASACIAIgAUkbIQIMAQtBACEFIAENAQsgAkEASA0AIAZFDQEgACgCACACEBMiAUUNAgwDCyAFDwsgAhAEIgENAQsgAw0BCyABBEAgACABNgIAIABBBGogAjYCAEECDwtBAQ8LAAsIAEGMFBAHAAtmAgF/A34jAEEwayIBJAAgACkCECECIAApAgghAyAAKQIAIQQgAUEUakEANgIAIAEgBDcDGCABQgE3AgQgAUH0DDYCECABIAFBGGo2AgAgASADNwMgIAEgAjcDKCABIAFBIGoQJQALuAEBAX8jAEHgAWsiAyQAIANBOGpBzAgoAgA2AgAgA0EwakHECCkCADcDACADQgA3AyAgA0G8CCkCADcDKCADQTxqQQBBxAAQKhogA0EgaiABIAIQCSADQYABaiADQSBqQeAAECgaIANBCGogA0GAAWoQCiADQSBqIANBCGpBFBADIANBiAFqIANBKGooAgA2AgAgAyADKQMgNwOAASADIANBgAFqEAsgACADKQMANwIAIANB4AFqJAALlwMBBH8jAEFAaiIDJAAgACAAKQMAIAKtfDcDACADIABBCGo2AiggAyADQShqNgIsAkACQAJAAkACQAJAIAAoAhwiBQRAQcAAIAVrIgQgAk0NASADQRhqIAUgBSACaiIEIABBIGoQFiADKAIcIAJHDQUgAygCGCABIAIQKBoMAwsgAiEEDAELIANBMGogASACIAQQFyADQTxqKAIAIQQgAygCOCEBIAMoAjAhBSADKAI0IQIgA0EgaiAAQSBqIgYgACgCHBAYIAIgAygCJEcNBCADKAIgIAUgAhAoGiAAQRxqQQA2AgAgA0EsaiAGEBkLIANBPGohAiADQThqIQUCQANAIARBP00NASADQTBqIAEgBEHAABAXIAIoAgAhBCAFKAIAIQEgA0EIakEAQcAAIAMoAjAgAygCNBAaIANBLGogAygCCBAZDAALAAsgA0EQaiAAQSBqIAQQGyADKAIUIARHDQEgAygCECABIAQQKBoLIABBHGogBDYCACADQUBrJAAPC0H0ExAHAAtB9BMQBwALQfQTEAcAC+MCAgR/AX4jAEFAaiICJAAgAiABQQhqIgU2AiQgASkDACEGIAEoAhwhAyACIAJBJGo2AigCQCADQT9NBEAgAUEgaiIEIANqQYABOgAAIAEgASgCHEEBaiIDNgIcIAJBGGogBCADEBggAigCGEEAIAIoAhwQKhpBwAAgASgCHGtBB00EQCACQShqIAQQGSACQRBqIAQgAUEcaigCABAbIAIoAhBBACACKAIUECoaCyACQQhqIARBOBAYIAIoAgxBCEcNASACKAIIIAZCA4Y3AAAgAkEoaiAEEBkgAUEcakEANgIAIAJBADYCKEEEIQECQANAIAFBGEYNASACQShqIAFqQQA6AAAgAiACKAIoQQFqNgIoIAFBAWohAQwACwALIAAgBSkAADcAACAAQRBqIAVBEGooAAA2AAAgAEEIaiAFQQhqKQAANwAAIAJBQGskAA8LQcwTIANBwAAQHQALQdwTEAcAC2MBAn8gASgCACECAkACQCABKAIEIgMgASgCCCIBRgRAIAMhAQwBCyADIAFJDQEgAQRAIAIgARATIgINAQALIAIgAxARQQEhAkEAIQELIAAgATYCBCAAIAI2AgAPC0G0ExAHAAuQAQEBfyMAQYABayIBJAAgAUEwakHECCkCADcDACABQThqQcwIKAIANgIAIAFCADcDICABQbwIKQIANwMoIAFBPGpBAEHEABAqGiABQRBqIAFBIGpB4AAQAyABQShqIAFBGGooAgA2AgAgASABKQMQNwMgIAFBCGogAUEgahALIAAgASkDCDcCACABQYABaiQAC4YB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";
    const SECP256K1_FLAGS_TYPE_CONTEXT = 1 << 0;
    const SECP256K1_FLAGS_TYPE_COMPRESSION = 1 << 1;
    const SECP256K1_FLAGS_BIT_CONTEXT_VERIFY = 1 << 8;
    const SECP256K1_FLAGS_BIT_CONTEXT_SIGN = 1 << 9;
    const SECP256K1_FLAGS_BIT_COMPRESSION = 1 << 8;
    const SECP256K1_CONTEXT_VERIFY = SECP256K1_FLAGS_TYPE_CONTEXT | SECP256K1_FLAGS_BIT_CONTEXT_VERIFY;
    const SECP256K1_CONTEXT_SIGN = SECP256K1_FLAGS_TYPE_CONTEXT | SECP256K1_FLAGS_BIT_CONTEXT_SIGN;
    const SECP256K1_CONTEXT_NONE = SECP256K1_FLAGS_TYPE_CONTEXT;
    const SECP256K1_EC_COMPRESSED = SECP256K1_FLAGS_TYPE_COMPRESSION | SECP256K1_FLAGS_BIT_COMPRESSION;
    const SECP256K1_EC_UNCOMPRESSED = SECP256K1_FLAGS_TYPE_COMPRESSION;
    var ContextFlag;
    (function(ContextFlag2) {
      ContextFlag2[ContextFlag2["NONE"] = SECP256K1_CONTEXT_NONE] = "NONE";
      ContextFlag2[ContextFlag2["VERIFY"] = SECP256K1_CONTEXT_VERIFY] = "VERIFY";
      ContextFlag2[ContextFlag2["SIGN"] = SECP256K1_CONTEXT_SIGN] = "SIGN";
      ContextFlag2[ContextFlag2["BOTH"] = SECP256K1_CONTEXT_SIGN | SECP256K1_CONTEXT_VERIFY] = "BOTH";
    })(ContextFlag || (ContextFlag = {}));
    var CompressionFlag;
    (function(CompressionFlag2) {
      CompressionFlag2[CompressionFlag2["COMPRESSED"] = SECP256K1_EC_COMPRESSED] = "COMPRESSED";
      CompressionFlag2[CompressionFlag2["UNCOMPRESSED"] = SECP256K1_EC_UNCOMPRESSED] = "UNCOMPRESSED";
    })(CompressionFlag || (CompressionFlag = {}));
    const sha256Base64Bytes = "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IAJHDQUgAygCGCABIAIQKxoMAwsgAiEEDAELIANBMGogASACIAQQFiADQTxqKAIAIQQgAygCOCEBIAMoAjAhBSADKAI0IQIgA0EgaiAAQQxqIgYgACgCCBAXIAIgAygCJEcNBCADKAIgIAUgAhArGiAAQQhqQQA2AgAgA0EsaiAGEBgLIANBPGohAiADQThqIQUCQANAIARBP00NASADQTBqIAEgBEHAABAWIAIoAgAhBCAFKAIAIQEgA0EIakEAQcAAIAMoAjAgAygCNBAZIANBLGogAygCCBAYDAALAAsgA0EQaiAAQQxqIAQQGiADKAIUIARHDQEgAygCECABIAQQKxoLIABBCGogBDYCACADQUBrJAAPC0GEFBAHAAtBhBQQBwALQYQUEAcAC98EAgN/AX4jAEHQAGsiAiQAIAIgAUHMAGo2AiQgASkDACEFIAEoAgghBCACIAJBJGo2AigCQCAEQT9NBEAgAUEMaiIDIARqQYABOgAAIAEgASgCCEEBaiIENgIIIAJBGGogAyAEEBcgAigCGEEAIAIoAhwQLRpBwAAgASgCCGtBB00EQCACQShqIAMQGCACQRBqIAMgAUEIaigCABAaIAIoAhBBACACKAIUEC0aCyACQQhqIANBOBAXIAIoAgxBCEcNASACKAIIIAVCOIYgBUIohkKAgICAgIDA/wCDhCAFQhiGQoCAgICA4D+DIAVCCIZCgICAgPAfg4SEIAVCCIhCgICA+A+DIAVCGIhCgID8B4OEIAVCKIhCgP4DgyAFQjiIhISENwAAIAJBKGogAxAYIAFBCGpBADYCACACQQA2AiggAkEoakEEciEEQQAhAwJAA0AgA0EgRg0BIAQgA2pBADoAACACIAIoAihBAWo2AiggA0EBaiEDDAALAAsgAkFAayABQeQAaikAADcDACACQThqIAFB3ABqKQAANwMAIAJBMGogAUHUAGopAAA3AwAgAiABKQBMNwMoQQAhAwJAA0AgA0EgRg0BIAJBKGogA2oiBCAEKAIAIgRBGHQgBEEIdEGAgPwHcXIgBEEIdkGA/gNxIARBGHZycjYCACADQQRqIQMMAAsACyAAIAIpAyg3AAAgAEEYaiACQUBrKQMANwAAIABBEGogAkE4aikDADcAACAAQQhqIAJBMGopAwA3AAAgAkHQAGokAA8LQdwTIARBwAAQ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KAJsIQggASAPNgJkIAEgDjYCYCABIBM2AmggASAYNgJsIAEgAjYCdCABIBc2AnAgASAQNgJ4IAEgDDYCfCABQdAAaiABQeAAaiABQfAAaiAHQevZwaJ6aiAIQfr/+4V5ahAeIAEoAlwhByABKAJYIQggASgCUCEKIAEoAlQhESABIAI2AmQgASAXNgJgIAEgEDYCaCABIAw2AmwgASARNgJ0IAEgCjYCcCABIAg2AnggASAHNgJ8IAFB0ABqIAFB4ABqIAFB8ABqIA1B8vHFs3xqIBlB98fm93tqEB4gASgCXCENIAEoAlghGCABKAJQIRMgACAeIAEoAlRqNgIEIAAgEyAdajYCACAAIAogIWo2AgggACARICJqNgIMIAAgGCAcajYCECAAIA0gG2o2AhQgACAIICBqNgIYIAAgByAfajYCHCABQYABaiQAC30BAX8jAEEwayICJAAgAiABNgIEIAIgADYCACACQSxqQQE2AgAgAkEUakECNgIAIAJBHGpBAjYCACACQQE2AiQgAkGMFTYCCCACQQI2AgwgAkHMDTYCECACIAI2AiAgAiACQQRqNgIoIAIgAkEgajYCGCACQQhqQZwVECgAC3wBAX8jAEEwayIDJAAgAyACNgIEIAMgATYCACADQSxqQQE2AgAgA0EUakECNgIAIANBHGpBAjYCACADQQE2AiQgA0HcFDYCCCADQQI2AgwgA0HMDTYCECADIANBBGo2AiAgAyADNgIoIAMgA0EgajYCGCADQQhqIAAQKAAL1gEBBn8gACABKAIAIgggAigCBCIHcyACKAIAIgVxIAggB3FzIAVBHncgBUETd3MgBUEKd3NqIAIoAggiBkEadyAGQRV3cyAGQQd3cyAEaiABKAIMaiABKAIIIgQgAigCDCIJcyAGcSAEc2oiCmoiAjYCBCAAIAogASgCBGoiATYCDCAAIAJBHncgAkETd3MgAkEKd3MgAiAHIAVzcSAHIAVxc2ogBCADaiAJIAEgCSAGc3FzaiABQRp3IAFBFXdzIAFBB3dzaiIFajYCACAAIAUgCGo2AggLeAAgACACQRl3IAJBA3ZzIAJBDndzIAEoAgAiAmo2AgAgACACQRl3IAJBA3ZzIAJBDndzIAEoAgQiAmo2AgQgACACQRl3IAJBA3ZzIAJBDndzIAEoAggiAmo2AgggACACQRl3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";
    const instantiateRipemd160Bytes = async (webassemblyBytes) => {
      const wasm = await instantiateRustWasm(webassemblyBytes, "./ripemd160", "ripemd160", "ripemd160_init", "ripemd160_update", "ripemd160_final");
      return {
        final: wasm.final,
        hash: wasm.hash,
        init: wasm.init,
        update: wasm.update
      };
    };
    const getEmbeddedRipemd160Binary = () => base64ToBin(ripemd160Base64Bytes).buffer;
    const cachedRipemd160 = {};
    const instantiateRipemd160 = async () => {
      if (cachedRipemd160.cache !== void 0) {
        return cachedRipemd160.cache;
      }
      const result = instantiateRipemd160Bytes(getEmbeddedRipemd160Binary());
      cachedRipemd160.cache = result;
      return result;
    };
    const instantiateSha256Bytes = async (webassemblyBytes) => {
      const wasm = await instantiateRustWasm(webassemblyBytes, "./sha256", "sha256", "sha256_init", "sha256_update", "sha256_final");
      return {
        final: wasm.final,
        hash: wasm.hash,
        init: wasm.init,
        update: wasm.update
      };
    };
    const getEmbeddedSha256Binary = () => base64ToBin(sha256Base64Bytes).buffer;
    const cachedSha256 = {};
    const instantiateSha256 = async () => {
      if (cachedSha256.cache !== void 0) {
        return cachedSha256.cache;
      }
      const result = instantiateSha256Bytes(getEmbeddedSha256Binary());
      cachedSha256.cache = result;
      return result;
    };
    var TransactionDecodingError;
    (function(TransactionDecodingError2) {
      TransactionDecodingError2["invalidFormat"] = "Transaction decoding error: message does not follow the version 1 or version 2 transaction format.";
    })(TransactionDecodingError || (TransactionDecodingError = {}));
    var AuthenticationErrorCommon;
    (function(AuthenticationErrorCommon2) {
      AuthenticationErrorCommon2["calledReserved"] = "Program called an unassigned, reserved operation.";
      AuthenticationErrorCommon2["calledReturn"] = "Program called an OP_RETURN operation.";
      AuthenticationErrorCommon2["calledUpgradableNop"] = "Program called a disallowed upgradable non-operation (OP_NOP1-OP_NOP10).";
      AuthenticationErrorCommon2["checkSequenceUnavailable"] = "Program called an OP_CHECKSEQUENCEVERIFY operation, but OP_CHECKSEQUENCEVERIFY requires transaction version 2 or higher.";
      AuthenticationErrorCommon2["disabledOpcode"] = "Program contains a disabled opcode.";
      AuthenticationErrorCommon2["emptyAlternateStack"] = "Tried to read from an empty alternate stack.";
      AuthenticationErrorCommon2["emptyStack"] = "Tried to read from an empty stack.";
      AuthenticationErrorCommon2["exceededMaximumBytecodeLengthLocking"] = "The provided locking bytecode exceeds the maximum bytecode length (10,000 bytes).";
      AuthenticationErrorCommon2["exceededMaximumBytecodeLengthUnlocking"] = "The provided unlocking bytecode exceeds the maximum bytecode length (10,000 bytes).";
      AuthenticationErrorCommon2["exceededMaximumStackDepth"] = "Program exceeded the maximum stack depth (1,000 items).";
      AuthenticationErrorCommon2["exceededMaximumOperationCount"] = "Program exceeded the maximum operation count (201 operations).";
      AuthenticationErrorCommon2["exceedsMaximumMultisigPublicKeyCount"] = "Program called an OP_CHECKMULTISIG which exceeds the maximum public key count (20 public keys).";
      AuthenticationErrorCommon2["exceedsMaximumPush"] = "Push exceeds the push size limit of 520 bytes.";
      AuthenticationErrorCommon2["failedVerify"] = "Program failed an OP_VERIFY operation.";
      AuthenticationErrorCommon2["invalidStackIndex"] = "Tried to read from an invalid stack index.";
      AuthenticationErrorCommon2["incompatibleLocktimeType"] = "Program called an OP_CHECKLOCKTIMEVERIFY operation with an incompatible locktime type. The transaction locktime and required locktime must both refer to either a block height or a block time.";
      AuthenticationErrorCommon2["incompatibleSequenceType"] = "Program called an OP_CHECKSEQUENCEVERIFY operation with an incompatible sequence type flag. The input sequence number and required sequence number must both use the same sequence locktime type.";
      AuthenticationErrorCommon2["insufficientPublicKeys"] = "Program called an OP_CHECKMULTISIG operation which requires signatures from more public keys than are provided.";
      AuthenticationErrorCommon2["invalidNaturalNumber"] = "Invalid input: the key/signature count inputs for OP_CHECKMULTISIG require a natural number (n > 0).";
      AuthenticationErrorCommon2["invalidProtocolBugValue"] = 'The OP_CHECKMULTISIG protocol bug value must be a Script Number 0 (to comply with the "NULLDUMMY" rule).';
      AuthenticationErrorCommon2["invalidPublicKeyEncoding"] = "Encountered an improperly encoded public key.";
      AuthenticationErrorCommon2["invalidScriptNumber"] = "Invalid input: this operation requires a valid Script Number.";
      AuthenticationErrorCommon2["invalidSignatureEncoding"] = "Encountered an improperly encoded signature.";
      AuthenticationErrorCommon2["locktimeDisabled"] = "Program called an OP_CHECKLOCKTIMEVERIFY operation, but locktime is disabled for this transaction.";
      AuthenticationErrorCommon2["malformedLockingBytecode"] = "The provided locking bytecode is malformed.";
      AuthenticationErrorCommon2["malformedPush"] = "Program must be long enough to push the requested number of bytes.";
      AuthenticationErrorCommon2["malformedUnlockingBytecode"] = "The provided unlocking bytecode is malformed.";
      AuthenticationErrorCommon2["negativeLocktime"] = "Program called an OP_CHECKLOCKTIMEVERIFY or OP_CHECKSEQUENCEVERIFY operation with a negative locktime.";
      AuthenticationErrorCommon2["nonEmptyExecutionStack"] = "Program completed with a non-empty execution stack (missing `OP_ENDIF`).";
      AuthenticationErrorCommon2["nonMinimalPush"] = "Push operations must use the smallest possible encoding.";
      AuthenticationErrorCommon2["nonNullSignatureFailure"] = 'Program failed a signature verification with a non-null signature (violating the "NULLFAIL" rule).';
      AuthenticationErrorCommon2["requiresCleanStack"] = "Program completed with an unexpected number of items on the stack (must be exactly 1).";
      AuthenticationErrorCommon2["schnorrSizedSignatureInCheckMultiSig"] = "Program used a schnorr-sized signature (65 bytes) in an OP_CHECKMULTISIG operation.";
      AuthenticationErrorCommon2["unexpectedElse"] = "Encountered an OP_ELSE outside of an OP_IF ... OP_ENDIF block.";
      AuthenticationErrorCommon2["unexpectedEndIf"] = "Encountered an OP_ENDIF which is not following a matching OP_IF.";
      AuthenticationErrorCommon2["unknownOpcode"] = "Called an unknown opcode.";
      AuthenticationErrorCommon2["unmatchedSequenceDisable"] = "Program called an OP_CHECKSEQUENCEVERIFY operation requiring the disable flag, but the input's sequence number is missing the disable flag.";
      AuthenticationErrorCommon2["unsatisfiedLocktime"] = "Program called an OP_CHECKLOCKTIMEVERIFY operation which requires a locktime greater than the transaction's locktime.";
      AuthenticationErrorCommon2["unsatisfiedSequenceNumber"] = "Program called an OP_CHECKSEQUENCEVERIFY operation which requires a sequence number greater than the input's sequence number.";
      AuthenticationErrorCommon2["unsuccessfulEvaluation"] = "Unsuccessful evaluation: completed with a non-truthy value on top of the stack.";
    })(AuthenticationErrorCommon || (AuthenticationErrorCommon = {}));
    var ScriptNumberError;
    (function(ScriptNumberError2) {
      ScriptNumberError2["outOfRange"] = "Failed to parse Script Number: overflows Script Number range.";
      ScriptNumberError2["requiresMinimal"] = "Failed to parse Script Number: the number is not minimally-encoded.";
    })(ScriptNumberError || (ScriptNumberError = {}));
    const bigIntToScriptNumber = (integer) => {
      if (integer === BigInt(0)) {
        return new Uint8Array();
      }
      const bytes = [];
      const isNegative = integer < 0;
      const byteStates = 255;
      const bitsPerByte = 8;
      let remaining = isNegative ? -integer : integer;
      while (remaining > 0) {
        bytes.push(Number(remaining & BigInt(byteStates)));
        remaining >>= BigInt(bitsPerByte);
      }
      const signFlippingByte = 128;
      if ((bytes[bytes.length - 1] & signFlippingByte) > 0) {
        bytes.push(isNegative ? signFlippingByte : 0);
      } else if (isNegative) {
        bytes[bytes.length - 1] |= signFlippingByte;
      }
      return new Uint8Array(bytes);
    };
    var ConsensusBCH;
    (function(ConsensusBCH2) {
      ConsensusBCH2[ConsensusBCH2["schnorrSignatureLength"] = 64] = "schnorrSignatureLength";
    })(ConsensusBCH || (ConsensusBCH = {}));
    var CompilerDefaults;
    (function(CompilerDefaults2) {
      CompilerDefaults2[CompilerDefaults2["defaultScenarioAddressIndex"] = 0] = "defaultScenarioAddressIndex";
      CompilerDefaults2[CompilerDefaults2["defaultScenarioCurrentBlockHeight"] = 2] = "defaultScenarioCurrentBlockHeight";
      CompilerDefaults2[CompilerDefaults2["defaultScenarioCurrentBlockTime"] = 1231469665] = "defaultScenarioCurrentBlockTime";
      CompilerDefaults2[CompilerDefaults2["defaultScenarioInputOutpointIndex"] = 0] = "defaultScenarioInputOutpointIndex";
      CompilerDefaults2["defaultScenarioInputOutpointTransactionHash"] = "0000000000000000000000000000000000000000000000000000000000000000";
      CompilerDefaults2[CompilerDefaults2["defaultScenarioInputSequenceNumber"] = 0] = "defaultScenarioInputSequenceNumber";
      CompilerDefaults2["defaultScenarioInputUnlockingBytecodeHex"] = "";
      CompilerDefaults2[CompilerDefaults2["defaultScenarioOutputSatoshis"] = 0] = "defaultScenarioOutputSatoshis";
      CompilerDefaults2["defaultScenarioTransactionOutputsLockingBytecodeHex"] = "";
      CompilerDefaults2[CompilerDefaults2["defaultScenarioTransactionLocktime"] = 0] = "defaultScenarioTransactionLocktime";
      CompilerDefaults2[CompilerDefaults2["defaultScenarioTransactionVersion"] = 2] = "defaultScenarioTransactionVersion";
      CompilerDefaults2[CompilerDefaults2["defaultScenarioValue"] = 0] = "defaultScenarioValue";
      CompilerDefaults2[CompilerDefaults2["hdKeyAddressOffset"] = 0] = "hdKeyAddressOffset";
      CompilerDefaults2["hdKeyHdPublicKeyDerivationPath"] = "m";
      CompilerDefaults2["hdKeyPrivateDerivationPath"] = "m/i";
      CompilerDefaults2["scenarioBytecodeScriptPrefix"] = "_scenario_";
      CompilerDefaults2["virtualizedTestCheckScriptPrefix"] = "__virtualized_test_check_";
      CompilerDefaults2["virtualizedTestLockingScriptPrefix"] = "__virtualized_test_lock_";
      CompilerDefaults2["virtualizedTestUnlockingScriptPrefix"] = "__virtualized_test_unlock_";
    })(CompilerDefaults || (CompilerDefaults = {}));
    const validateSecp256k1PrivateKey = (privateKey) => {
      const privateKeyLength = 32;
      if (privateKey.length !== privateKeyLength || privateKey.every((value) => value === 0)) {
        return false;
      }
      const maximumSecp256k1PrivateKey = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 186, 174, 220, 230, 175, 72, 160, 59, 191, 210, 94, 140, 208, 54, 65, 63];
      const firstDifference = privateKey.findIndex((value, i) => value !== maximumSecp256k1PrivateKey[i]);
      if (firstDifference === -1 || privateKey[firstDifference] < maximumSecp256k1PrivateKey[firstDifference]) {
        return true;
      }
      return false;
    };
    utf8ToBin("Bitcoin seed");
    const deriveHdPrivateNodeIdentifier = (crypto2, hdPrivateNode) => crypto2.ripemd160.hash(crypto2.sha256.hash(crypto2.secp256k1.derivePublicKeyCompressed(hdPrivateNode.privateKey)));
    const deriveHdPublicNodeIdentifier = (crypto2, node) => crypto2.ripemd160.hash(crypto2.sha256.hash(node.publicKey));
    var HdKeyVersion;
    (function(HdKeyVersion2) {
      HdKeyVersion2[HdKeyVersion2["mainnetPrivateKey"] = 76066276] = "mainnetPrivateKey";
      HdKeyVersion2[HdKeyVersion2["mainnetPublicKey"] = 76067358] = "mainnetPublicKey";
      HdKeyVersion2[HdKeyVersion2["testnetPrivateKey"] = 70615956] = "testnetPrivateKey";
      HdKeyVersion2[HdKeyVersion2["testnetPublicKey"] = 70617039] = "testnetPublicKey";
    })(HdKeyVersion || (HdKeyVersion = {}));
    var HdKeyDecodingError;
    (function(HdKeyDecodingError2) {
      HdKeyDecodingError2["incorrectLength"] = "HD key decoding error: length is incorrect (must encode 82 bytes).";
      HdKeyDecodingError2["invalidChecksum"] = "HD key decoding error: checksum is invalid.";
      HdKeyDecodingError2["invalidPrivateNode"] = "HD key decoding error: the key for this HD private node is not a valid Secp256k1 private key.";
      HdKeyDecodingError2["missingPrivateKeyPaddingByte"] = "HD key decoding error: version indicates a private key, but the key data is missing a padding byte.";
      HdKeyDecodingError2["privateKeyExpected"] = "HD key decoding error: expected an HD private key, but encountered an HD public key.";
      HdKeyDecodingError2["publicKeyExpected"] = "HD key decoding error: expected an HD public key, but encountered an HD private key.";
      HdKeyDecodingError2["unknownCharacter"] = "HD key decoding error: key includes a non-base58 character.";
      HdKeyDecodingError2["unknownVersion"] = "HD key decoding error: key uses an unknown version.";
    })(HdKeyDecodingError || (HdKeyDecodingError = {}));
    const decodeHdKey = (crypto2, hdKey) => {
      const decoded = base58ToBin(hdKey);
      if (decoded === BaseConversionError.unknownCharacter)
        return HdKeyDecodingError.unknownCharacter;
      const expectedLength = 82;
      if (decoded.length !== expectedLength)
        return HdKeyDecodingError.incorrectLength;
      const checksumIndex = 78;
      const payload = decoded.slice(0, checksumIndex);
      const checksumBits = decoded.slice(checksumIndex);
      const checksum = crypto2.sha256.hash(crypto2.sha256.hash(payload));
      if (!checksumBits.every((value, i) => value === checksum[i])) {
        return HdKeyDecodingError.invalidChecksum;
      }
      const depthIndex = 4;
      const fingerprintIndex = 5;
      const childIndexIndex = 9;
      const chainCodeIndex = 13;
      const keyDataIndex = 45;
      const version = new DataView(decoded.buffer, decoded.byteOffset, depthIndex).getUint32(0);
      const depth = decoded[depthIndex];
      const parentFingerprint = decoded.slice(fingerprintIndex, childIndexIndex);
      const childIndex = new DataView(decoded.buffer, decoded.byteOffset + childIndexIndex, decoded.byteOffset + chainCodeIndex).getUint32(0);
      const chainCode = decoded.slice(chainCodeIndex, keyDataIndex);
      const keyData = decoded.slice(keyDataIndex, checksumIndex);
      const isPrivateKey = version === HdKeyVersion.mainnetPrivateKey || version === HdKeyVersion.testnetPrivateKey;
      if (isPrivateKey && keyData[0] !== 0) {
        return HdKeyDecodingError.missingPrivateKeyPaddingByte;
      }
      if (isPrivateKey) {
        const privateKey = keyData.slice(1);
        const valid = validateSecp256k1PrivateKey(privateKey);
        return {
          node: valid ? {
            chainCode,
            childIndex,
            depth,
            parentFingerprint,
            privateKey,
            valid: true
          } : {
            chainCode,
            childIndex,
            depth,
            invalidPrivateKey: privateKey,
            parentFingerprint,
            valid: false
          },
          version
        };
      }
      const isPublicKey = version === HdKeyVersion.mainnetPublicKey || version === HdKeyVersion.testnetPublicKey;
      if (!isPublicKey) {
        return HdKeyDecodingError.unknownVersion;
      }
      return {
        node: {
          chainCode,
          childIndex,
          depth,
          parentFingerprint,
          publicKey: keyData
        },
        version
      };
    };
    const decodeHdPrivateKey = (crypto2, hdPrivateKey) => {
      const decoded = decodeHdKey(crypto2, hdPrivateKey);
      if (typeof decoded === "string")
        return decoded;
      if ("publicKey" in decoded.node) {
        return HdKeyDecodingError.privateKeyExpected;
      }
      if (!decoded.node.valid) {
        return HdKeyDecodingError.invalidPrivateNode;
      }
      if (decoded.version === HdKeyVersion.mainnetPrivateKey) {
        return {
          network: "mainnet",
          node: decoded.node
        };
      }
      return {
        network: "testnet",
        node: decoded.node
      };
    };
    const decodeHdPublicKey = (crypto2, hdPublicKey) => {
      const decoded = decodeHdKey(crypto2, hdPublicKey);
      if (typeof decoded === "string")
        return decoded;
      if (decoded.version === HdKeyVersion.mainnetPublicKey) {
        return {
          network: "mainnet",
          node: decoded.node
        };
      }
      if (decoded.version === HdKeyVersion.testnetPublicKey) {
        return {
          network: "testnet",
          node: decoded.node
        };
      }
      return HdKeyDecodingError.publicKeyExpected;
    };
    var HdNodeDerivationError;
    (function(HdNodeDerivationError2) {
      HdNodeDerivationError2["childIndexExceedsMaximum"] = "HD key derivation error: child index exceeds maximum (4294967295).";
      HdNodeDerivationError2["nextChildIndexRequiresHardenedAlgorithm"] = "HD key derivation error: an incredibly rare HMAC-SHA512 result occurred, and incrementing the child index would require switching to the hardened algorithm.";
      HdNodeDerivationError2["hardenedDerivationRequiresPrivateNode"] = "HD key derivation error: derivation for hardened child indexes (indexes greater than or equal to 2147483648) requires an HD private node.";
      HdNodeDerivationError2["invalidDerivationPath"] = `HD key derivation error: invalid derivation path \u2013 paths must begin with "m" or "M" and contain only forward slashes ("/"), apostrophes ("'"), or positive child index numbers.`;
      HdNodeDerivationError2["invalidPrivateDerivationPrefix"] = 'HD key derivation error: private derivation paths must begin with "m".';
      HdNodeDerivationError2["invalidPublicDerivationPrefix"] = 'HD key derivation error: public derivation paths must begin with "M".';
    })(HdNodeDerivationError || (HdNodeDerivationError = {}));
    const deriveHdPrivateNodeChild = (crypto2, node, index2) => {
      const maximumIndex = 4294967295;
      if (index2 > maximumIndex) {
        return HdNodeDerivationError.childIndexExceedsMaximum;
      }
      const hardenedIndexOffset = 2147483648;
      const useHardenedAlgorithm = index2 >= hardenedIndexOffset;
      const keyMaterial = useHardenedAlgorithm ? node.privateKey : crypto2.secp256k1.derivePublicKeyCompressed(node.privateKey);
      const serialization = Uint8Array.from([
        ...useHardenedAlgorithm ? [0] : [],
        ...keyMaterial,
        ...numberToBinUint32BE(index2)
      ]);
      const derivation = hmacSha512(crypto2.sha512, node.chainCode, serialization);
      const tweakValueLength = 32;
      const tweakValue = derivation.slice(0, tweakValueLength);
      const nextChainCode = derivation.slice(tweakValueLength);
      try {
        const nextPrivateKey = crypto2.secp256k1.addTweakPrivateKey(node.privateKey, tweakValue);
        const parentIdentifier = deriveHdPrivateNodeIdentifier(crypto2, node);
        const parentFingerprintLength = 4;
        return {
          chainCode: nextChainCode,
          childIndex: index2,
          depth: node.depth + 1,
          parentFingerprint: parentIdentifier.slice(0, parentFingerprintLength),
          parentIdentifier,
          privateKey: nextPrivateKey,
          valid: true
        };
      } catch (error) {
        if (index2 === hardenedIndexOffset - 1) {
          return HdNodeDerivationError.nextChildIndexRequiresHardenedAlgorithm;
        }
        return deriveHdPrivateNodeChild(crypto2, node, index2 + 1);
      }
    };
    const deriveHdPublicNodeChild = (crypto2, node, index2) => {
      const hardenedIndexOffset = 2147483648;
      if (index2 >= hardenedIndexOffset) {
        return HdNodeDerivationError.hardenedDerivationRequiresPrivateNode;
      }
      const serialization = Uint8Array.from([
        ...node.publicKey,
        ...numberToBinUint32BE(index2)
      ]);
      const derivation = hmacSha512(crypto2.sha512, node.chainCode, serialization);
      const tweakValueLength = 32;
      const tweakValue = derivation.slice(0, tweakValueLength);
      const nextChainCode = derivation.slice(tweakValueLength);
      try {
        const nextPublicKey = crypto2.secp256k1.addTweakPublicKeyCompressed(node.publicKey, tweakValue);
        const parentIdentifier = deriveHdPublicNodeIdentifier(crypto2, node);
        const parentFingerprintLength = 4;
        return {
          chainCode: nextChainCode,
          childIndex: index2,
          depth: node.depth + 1,
          parentFingerprint: parentIdentifier.slice(0, parentFingerprintLength),
          parentIdentifier,
          publicKey: nextPublicKey
        };
      } catch (error) {
        if (index2 === hardenedIndexOffset - 1) {
          return HdNodeDerivationError.nextChildIndexRequiresHardenedAlgorithm;
        }
        return deriveHdPublicNodeChild(crypto2, node, index2 + 1);
      }
    };
    const deriveHdPath = (crypto2, node, path) => {
      const validDerivationPath = /^[mM](?:\/[0-9]+'?)*$/u;
      if (!validDerivationPath.test(path)) {
        return HdNodeDerivationError.invalidDerivationPath;
      }
      const parsed = path.split("/");
      const isPrivateDerivation = "privateKey" in node;
      if (isPrivateDerivation && parsed[0] !== "m") {
        return HdNodeDerivationError.invalidPrivateDerivationPrefix;
      }
      if (!isPrivateDerivation && parsed[0] !== "M") {
        return HdNodeDerivationError.invalidPublicDerivationPrefix;
      }
      const base = 10;
      const hardenedIndexOffset = 2147483648;
      const indexes = parsed.slice(1).map((index2) => index2.endsWith("'") ? parseInt(index2.slice(0, -1), base) + hardenedIndexOffset : parseInt(index2, base));
      return isPrivateDerivation ? indexes.reduce((result, nextIndex) => typeof result === "string" ? result : deriveHdPrivateNodeChild(crypto2, result, nextIndex), node) : indexes.reduce((result, nextIndex) => typeof result === "string" ? result : deriveHdPublicNodeChild(crypto2, result, nextIndex), node);
    };
    var HdNodeCrackingError;
    (function(HdNodeCrackingError2) {
      HdNodeCrackingError2["cannotCrackHardenedDerivation"] = "HD node cracking error: cannot crack an HD parent node using hardened child node.";
    })(HdNodeCrackingError || (HdNodeCrackingError = {}));
    const pluckStartPosition = (range2) => ({
      startColumn: range2.startColumn,
      startLineNumber: range2.startLineNumber
    });
    const pluckEndPosition = (range2) => ({
      endColumn: range2.endColumn,
      endLineNumber: range2.endLineNumber
    });
    const mergeRanges = (ranges, parentRange = {
      endColumn: 0,
      endLineNumber: 0,
      startColumn: 0,
      startLineNumber: 0
    }) => {
      const minimumRangesToMerge = 2;
      const unsortedMerged = ranges.length < minimumRangesToMerge ? ranges.length === 1 ? ranges[0] : parentRange : ranges.reduce((merged, range2) => ({
        ...range2.endLineNumber > merged.endLineNumber ? pluckEndPosition(range2) : range2.endLineNumber === merged.endLineNumber && range2.endColumn > merged.endColumn ? pluckEndPosition(range2) : pluckEndPosition(merged),
        ...range2.startLineNumber < merged.startLineNumber ? pluckStartPosition(range2) : range2.startLineNumber === merged.startLineNumber && range2.startColumn < merged.startColumn ? pluckStartPosition(range2) : pluckStartPosition(merged)
      }), ranges[0]);
      return {
        ...pluckEndPosition(unsortedMerged),
        ...pluckStartPosition(unsortedMerged)
      };
    };
    const getResolutionErrors = (resolvedScript) => resolvedScript.reduce((errors, segment) => {
      switch (segment.type) {
        case "error":
          return [
            ...errors,
            {
              error: segment.value,
              ...segment.missingIdentifier === void 0 ? {} : {
                missingIdentifier: segment.missingIdentifier,
                owningEntity: segment.owningEntity
              },
              range: segment.range
            }
          ];
        case "push":
        case "evaluation":
          return [...errors, ...getResolutionErrors(segment.value)];
        default:
          return errors;
      }
    }, []);
    const stringifyErrors = (errors, separator = "; ") => {
      return `${errors.map((error) => `[${error.range.startLineNumber}, ${error.range.startColumn}] ${error.error}`).join(separator)}`;
    };
    function Parsimmon(action) {
      if (!(this instanceof Parsimmon)) {
        return new Parsimmon(action);
      }
      this._ = action;
    }
    const _ = Parsimmon.prototype;
    function makeSuccess(index2, value) {
      return {
        expected: [],
        furthest: -1,
        index: index2,
        status: true,
        value
      };
    }
    function makeFailure(index2, expected) {
      expected = [expected];
      return {
        expected,
        furthest: index2,
        index: -1,
        status: false,
        value: null
      };
    }
    function mergeReplies(result, last) {
      if (!last) {
        return result;
      }
      if (result.furthest > last.furthest) {
        return result;
      }
      const expected = result.furthest === last.furthest ? union(result.expected, last.expected) : last.expected;
      return {
        expected,
        furthest: last.furthest,
        index: result.index,
        status: result.status,
        value: result.value
      };
    }
    function makeLineColumnIndex(input, i) {
      const lines = input.slice(0, i).split("\n");
      const lineWeAreUpTo = lines.length;
      const columnWeAreUpTo = lines[lines.length - 1].length + 1;
      return {
        column: columnWeAreUpTo,
        line: lineWeAreUpTo,
        offset: i
      };
    }
    function union(xs, ys) {
      const obj = {};
      for (let i = 0; i < xs.length; i++) {
        obj[xs[i]] = true;
      }
      for (let j = 0; j < ys.length; j++) {
        obj[ys[j]] = true;
      }
      const keys = [];
      for (const k in obj) {
        keys.push(k);
      }
      keys.sort();
      return keys;
    }
    function flags(re) {
      const s = String(re);
      return s.slice(s.lastIndexOf("/") + 1);
    }
    function anchoredRegexp(re) {
      return RegExp(`^(?:${re.source})`, flags(re));
    }
    function seq(...params) {
      const parsers = [].slice.call(params);
      const numParsers = parsers.length;
      return Parsimmon(function(input, i) {
        let result;
        const accum = new Array(numParsers);
        for (let j = 0; j < numParsers; j += 1) {
          result = mergeReplies(parsers[j]._(input, i), result);
          if (!result.status) {
            return result;
          }
          accum[j] = result.value;
          i = result.index;
        }
        return mergeReplies(makeSuccess(i, accum), result);
      });
    }
    function seqMap(...params) {
      const args = [].slice.call(params);
      const mapper = args.pop();
      return seq.apply(null, args).map(function(results) {
        return mapper.apply(null, results);
      });
    }
    function createLanguage(parsers) {
      const language = {};
      for (const key in parsers) {
        (function(rule) {
          const func = function() {
            return parsers[rule](language);
          };
          language[rule] = lazy(func);
        })(key);
      }
      return language;
    }
    function alt(...params) {
      const parsers = [].slice.call(params);
      return Parsimmon(function(input, i) {
        let result;
        for (let j = 0; j < parsers.length; j += 1) {
          result = mergeReplies(parsers[j]._(input, i), result);
          if (result.status) {
            return result;
          }
        }
        return result;
      });
    }
    function sepBy(parser, separator) {
      return sepBy1(parser, separator).or(succeed([]));
    }
    function sepBy1(parser, separator) {
      const pairs = separator.then(parser).many();
      return seqMap(parser, pairs, function(r, rs) {
        return [r].concat(rs);
      });
    }
    _.parse = function(input) {
      const result = this.skip(eof)._(input, 0);
      if (result.status) {
        return {
          status: true,
          value: result.value
        };
      }
      return {
        expected: result.expected,
        index: makeLineColumnIndex(input, result.furthest),
        status: false
      };
    };
    _.or = function(alternative) {
      return alt(this, alternative);
    };
    _.then = function(next) {
      return seq(this, next).map(function(results) {
        return results[1];
      });
    };
    _.many = function() {
      const self2 = this;
      return Parsimmon(function(input, i) {
        const accum = [];
        let result;
        for (; ; ) {
          result = mergeReplies(self2._(input, i), result);
          if (result.status) {
            if (i === result.index) {
              throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");
            }
            i = result.index;
            accum.push(result.value);
          } else {
            return mergeReplies(makeSuccess(i, accum), result);
          }
        }
      });
    };
    _.map = function(fn) {
      const self2 = this;
      return Parsimmon(function(input, i) {
        const result = self2._(input, i);
        if (!result.status) {
          return result;
        }
        return mergeReplies(makeSuccess(result.index, fn(result.value)), result);
      });
    };
    _.skip = function(next) {
      return seq(this, next).map(function(results) {
        return results[0];
      });
    };
    _.node = function(name) {
      return seqMap(index, this, index, function(start, value, end) {
        return {
          end,
          name,
          start,
          value
        };
      });
    };
    _.sepBy = function(separator) {
      return sepBy(this, separator);
    };
    _.desc = function(expected) {
      expected = [expected];
      const self2 = this;
      return Parsimmon(function(input, i) {
        const reply = self2._(input, i);
        if (!reply.status) {
          reply.expected = expected;
        }
        return reply;
      });
    };
    function string(str) {
      const expected = `'${str}'`;
      return Parsimmon(function(input, i) {
        const j = i + str.length;
        const head = input.slice(i, j);
        if (head === str) {
          return makeSuccess(j, head);
        }
        return makeFailure(i, expected);
      });
    }
    function regexp(re, group = 0) {
      const anchored = anchoredRegexp(re);
      const expected = String(re);
      return Parsimmon(function(input, i) {
        const match2 = anchored.exec(input.slice(i));
        if (match2) {
          const fullMatch = match2[0];
          const groupMatch = match2[group];
          return makeSuccess(i + fullMatch.length, groupMatch);
        }
        return makeFailure(i, expected);
      });
    }
    function succeed(value) {
      return Parsimmon(function(__, i) {
        return makeSuccess(i, value);
      });
    }
    function lazy(f) {
      const parser = Parsimmon(function(input, i) {
        parser._ = f()._;
        return parser._(input, i);
      });
      return parser;
    }
    const index = Parsimmon(function(input, i) {
      return makeSuccess(i, makeLineColumnIndex(input, i));
    });
    const eof = Parsimmon(function(input, i) {
      if (i < input.length) {
        return makeFailure(i, "EOF");
      }
      return makeSuccess(i, null);
    });
    const optWhitespace = regexp(/\s*/u).desc("optional whitespace");
    const whitespace = regexp(/\s+/u).desc("whitespace");
    const P = {
      alt,
      createLanguage,
      index,
      lazy,
      makeFailure,
      makeSuccess,
      of: succeed,
      optWhitespace,
      regexp,
      sepBy,
      sepBy1,
      seq,
      seqMap,
      string,
      succeed,
      whitespace
    };
    const authenticationScriptParser = P.createLanguage({
      script: (r) => P.seqMap(P.optWhitespace, r.expression.sepBy(P.optWhitespace), P.optWhitespace, (_2, expressions) => expressions).node("Script"),
      expression: (r) => P.alt(r.comment, r.push, r.evaluation, r.utf8, r.binary, r.hex, r.bigint, r.identifier),
      comment: (r) => P.alt(r.singleLineComment, r.multiLineComment).node("Comment"),
      singleLineComment: () => P.seqMap(P.string("//").desc("the start of a single-line comment ('//')"), P.regexp(/[^\n]*/u), (__, comment) => comment.trim()),
      multiLineComment: () => P.seqMap(P.string("/*").desc("the start of a multi-line comment ('/*')"), P.regexp(/[\s\S]*?\*\//u).desc("the end of this multi-line comment ('*/')"), (__, comment) => comment.slice(0, -"*/".length).trim()),
      push: (r) => P.seqMap(P.string("<").desc("the start of a push statement ('<')"), r.script, P.string(">").desc("the end of this push statement ('>')"), (_2, push) => push).node("Push"),
      evaluation: (r) => P.seqMap(P.string("$").desc("the start of an evaluation ('$')"), P.string("(").desc("the opening parenthesis of this evaluation ('(')"), r.script, P.string(")").desc("the closing parenthesis of this evaluation (')')"), (_2, __, evaluation) => evaluation).node("Evaluation"),
      identifier: () => P.regexp(/[a-zA-Z_][.a-zA-Z0-9_-]*/u).desc("a valid identifier").node("Identifier"),
      utf8: () => P.alt(P.seqMap(P.string('"').desc('a double quote (")'), P.regexp(/[^"]*/u), P.string('"').desc('a closing double quote (")'), (__, literal) => literal), P.seqMap(P.string("'").desc("a single quote (')"), P.regexp(/[^']*/u), P.string("'").desc("a closing single quote (')"), (__, literal) => literal)).node("UTF8Literal"),
      hex: () => P.seqMap(P.string("0x").desc("a hex literal ('0x...')"), P.regexp(/[0-9a-f]_*(?:_*[0-9a-f]_*[0-9a-f]_*)*[0-9a-f]/iu).desc("a valid hexadecimal string"), (__, literal) => literal).node("HexLiteral"),
      binary: () => P.seqMap(P.string("0b").desc("a binary literal ('0b...')"), P.regexp(/[01]+(?:[01_]*[01]+)*/iu).desc("a string of binary digits"), (__, literal) => literal).node("BinaryLiteral"),
      bigint: () => P.regexp(/-?[0-9]+(?:[0-9_]*[0-9]+)*/u).desc("an integer literal").node("BigIntLiteral")
    });
    const parseScript = (script) => authenticationScriptParser.script.parse(script);
    const emptyReductionTraceNode = (range2) => ({
      bytecode: Uint8Array.of(),
      range: range2
    });
    const verifyBtlEvaluationState = (state) => {
      if (state.error !== void 0) {
        return state.error;
      }
      if (state.executionStack.length !== 0) {
        return AuthenticationErrorCommon.nonEmptyExecutionStack;
      }
      if (state.stack.length !== 1) {
        return AuthenticationErrorCommon.requiresCleanStack;
      }
      return true;
    };
    const reduceScript = (resolvedScript, vm, createEvaluationProgram) => {
      const script = resolvedScript.map((segment) => {
        switch (segment.type) {
          case "bytecode":
            return { bytecode: segment.value, range: segment.range };
          case "push": {
            const push = reduceScript(segment.value, vm, createEvaluationProgram);
            const bytecode = encodeDataPush(push.bytecode);
            return {
              bytecode,
              ...push.errors === void 0 ? void 0 : { errors: push.errors },
              push,
              range: segment.range
            };
          }
          case "evaluation": {
            if (typeof vm === "undefined" || typeof createEvaluationProgram === "undefined") {
              return {
                errors: [
                  {
                    error: "Both a VM and a createState method are required to reduce evaluations.",
                    range: segment.range
                  }
                ],
                ...emptyReductionTraceNode(segment.range)
              };
            }
            const reductionTrace = reduceScript(segment.value, vm, createEvaluationProgram);
            if (reductionTrace.errors !== void 0) {
              return {
                ...emptyReductionTraceNode(segment.range),
                errors: reductionTrace.errors,
                source: reductionTrace,
                trace: []
              };
            }
            const trace = vm.debug(createEvaluationProgram(reductionTrace.bytecode));
            const lastState = trace[trace.length - 1];
            const result = verifyBtlEvaluationState(lastState);
            const bytecode = lastState.stack[lastState.stack.length - 1];
            return {
              ...typeof result === "string" ? {
                bytecode: Uint8Array.of(),
                errors: [
                  {
                    error: `Failed to reduce evaluation: ${result}`,
                    range: segment.range
                  }
                ]
              } : {
                bytecode
              },
              range: segment.range,
              source: reductionTrace,
              trace
            };
          }
          case "comment":
            return emptyReductionTraceNode(segment.range);
          case "error":
            return {
              errors: [
                {
                  error: `Tried to reduce a BTL script with resolution errors: ${segment.value}`,
                  range: segment.range
                }
              ],
              ...emptyReductionTraceNode(segment.range)
            };
          default:
            throw new Error(`"${segment.type}" is not a known segment type.`);
        }
      });
      const reduction = script.reduce((all, segment) => ({
        bytecode: [...all.bytecode, segment.bytecode],
        ranges: [...all.ranges, segment.range],
        ...all.errors !== void 0 || segment.errors !== void 0 ? {
          errors: [
            ...all.errors === void 0 ? [] : all.errors,
            ...segment.errors === void 0 ? [] : segment.errors
          ]
        } : void 0
      }), { bytecode: [], ranges: [] });
      return {
        ...reduction.errors === void 0 ? void 0 : { errors: reduction.errors },
        bytecode: flattenBinArray(reduction.bytecode),
        range: mergeRanges(reduction.ranges, resolvedScript.length === 0 ? void 0 : resolvedScript[0].range),
        script
      };
    };
    const describeExpectedInput = (expectedArray) => {
      const EOF = "EOF";
      const newArray = expectedArray.filter((value) => value !== EOF);
      if (newArray.length !== expectedArray.length) {
        newArray.push("the end of the script");
      }
      const withoutLastElement = newArray.slice(0, newArray.length - 1);
      const lastElement = newArray[newArray.length - 1];
      const arrayRequiresCommas = 3;
      const arrayRequiresOr = 2;
      return `Encountered unexpected input while parsing script. Expected ${newArray.length >= arrayRequiresCommas ? withoutLastElement.join(", ").concat(`, or ${lastElement}`) : newArray.length === arrayRequiresOr ? newArray.join(" or ") : lastElement}.`;
    };
    const compileScriptContents = ({ data, environment, script }) => {
      const parseResult = parseScript(script);
      if (!parseResult.status) {
        return {
          errorType: "parse",
          errors: [
            {
              error: describeExpectedInput(parseResult.expected),
              range: {
                endColumn: parseResult.index.column,
                endLineNumber: parseResult.index.line,
                startColumn: parseResult.index.column,
                startLineNumber: parseResult.index.line
              }
            }
          ],
          success: false
        };
      }
      const resolver = createIdentifierResolver({ data, environment });
      const resolvedScript = resolveScriptSegment(parseResult.value, resolver);
      const resolutionErrors = getResolutionErrors(resolvedScript);
      if (resolutionErrors.length !== 0) {
        return {
          errorType: "resolve",
          errors: resolutionErrors,
          parse: parseResult.value,
          resolve: resolvedScript,
          success: false
        };
      }
      const reduction = reduceScript(resolvedScript, environment.vm, environment.createAuthenticationProgram);
      return {
        ...reduction.errors === void 0 ? { bytecode: reduction.bytecode, success: true } : { errorType: "reduce", errors: reduction.errors, success: false },
        parse: parseResult.value,
        reduce: reduction,
        resolve: resolvedScript
      };
    };
    const emptyRange = () => ({
      endColumn: 0,
      endLineNumber: 0,
      startColumn: 0,
      startLineNumber: 0
    });
    const compileScriptRaw = ({ data, environment, scriptId }) => {
      var _a;
      const script = environment.scripts[scriptId];
      if (script === void 0) {
        return {
          errorType: "parse",
          errors: [
            {
              error: `No script with an ID of "${scriptId}" was provided in the compilation environment.`,
              range: emptyRange()
            }
          ],
          success: false
        };
      }
      if (((_a = environment.sourceScriptIds) === null || _a === void 0 ? void 0 : _a.includes(scriptId)) === true) {
        return {
          errorType: "parse",
          errors: [
            {
              error: `A circular dependency was encountered: script "${scriptId}" relies on itself to be generated. (Source scripts: ${environment.sourceScriptIds.join(" \u2192 ")})`,
              range: emptyRange()
            }
          ],
          success: false
        };
      }
      const sourceScriptIds = environment.sourceScriptIds === void 0 ? [scriptId] : [...environment.sourceScriptIds, scriptId];
      return compileScriptContents({
        data,
        environment: { ...environment, sourceScriptIds },
        script
      });
    };
    var IdentifierResolutionType;
    (function(IdentifierResolutionType2) {
      IdentifierResolutionType2["opcode"] = "opcode";
      IdentifierResolutionType2["variable"] = "variable";
      IdentifierResolutionType2["script"] = "script";
    })(IdentifierResolutionType || (IdentifierResolutionType = {}));
    var IdentifierResolutionErrorType;
    (function(IdentifierResolutionErrorType2) {
      IdentifierResolutionErrorType2["unknown"] = "unknown";
      IdentifierResolutionErrorType2["variable"] = "variable";
      IdentifierResolutionErrorType2["script"] = "script";
    })(IdentifierResolutionErrorType || (IdentifierResolutionErrorType = {}));
    const pluckRange = (node) => ({
      endColumn: node.end.column,
      endLineNumber: node.end.line,
      startColumn: node.start.column,
      startLineNumber: node.start.line
    });
    const removeNumericSeparators = (numericLiteral) => numericLiteral.replace(/_/gu, "");
    const resolveScriptSegment = (segment, resolveIdentifiers) => {
      const resolved = segment.value.map((child) => {
        const range2 = pluckRange(child);
        switch (child.name) {
          case "Identifier": {
            const identifier = child.value;
            const result = resolveIdentifiers(identifier);
            const ret = result.status ? {
              range: range2,
              type: "bytecode",
              value: result.bytecode,
              ...result.type === IdentifierResolutionType.opcode ? {
                opcode: identifier
              } : result.type === IdentifierResolutionType.variable ? {
                ..."debug" in result ? { debug: result.debug } : {},
                ..."signature" in result ? { signature: result.signature } : {},
                variable: identifier
              } : result.type === IdentifierResolutionType.script ? { script: identifier, source: result.source } : { unknown: identifier }
            } : {
              ..."debug" in result ? { debug: result.debug } : {},
              ..."recoverable" in result && result.recoverable ? {
                missingIdentifier: identifier,
                owningEntity: result.entityOwnership
              } : {},
              range: range2,
              type: "error",
              value: result.error
            };
            return ret;
          }
          case "Push":
            return {
              range: range2,
              type: "push",
              value: resolveScriptSegment(child.value, resolveIdentifiers)
            };
          case "Evaluation":
            return {
              range: range2,
              type: "evaluation",
              value: resolveScriptSegment(child.value, resolveIdentifiers)
            };
          case "BigIntLiteral":
            return {
              literal: child.value,
              literalType: "BigIntLiteral",
              range: range2,
              type: "bytecode",
              value: bigIntToScriptNumber(BigInt(removeNumericSeparators(child.value)))
            };
          case "BinaryLiteral":
            return {
              literal: child.value,
              literalType: "BinaryLiteral",
              range: range2,
              type: "bytecode",
              value: bigIntToScriptNumber(BigInt(`0b${removeNumericSeparators(child.value)}`))
            };
          case "HexLiteral":
            return {
              literal: child.value,
              literalType: "HexLiteral",
              range: range2,
              type: "bytecode",
              value: hexToBin(removeNumericSeparators(child.value))
            };
          case "UTF8Literal":
            return {
              literal: child.value,
              literalType: "UTF8Literal",
              range: range2,
              type: "bytecode",
              value: utf8ToBin(child.value)
            };
          case "Comment":
            return {
              range: range2,
              type: "comment",
              value: child.value
            };
          default:
            return {
              range: range2,
              type: "error",
              value: `Unrecognized segment: ${child.name}`
            };
        }
      });
      return resolved.length === 0 ? [{ range: pluckRange(segment), type: "comment", value: "" }] : resolved;
    };
    var BuiltInVariables;
    (function(BuiltInVariables2) {
      BuiltInVariables2["currentBlockTime"] = "current_block_time";
      BuiltInVariables2["currentBlockHeight"] = "current_block_height";
      BuiltInVariables2["signingSerialization"] = "signing_serialization";
    })(BuiltInVariables || (BuiltInVariables = {}));
    const attemptCompilerOperation = ({ data, environment, identifier, matchingOperations, operationExample = "operation_identifier", operationId, variableId, variableType }) => {
      if (matchingOperations === void 0) {
        return {
          error: `The "${variableId}" variable type can not be resolved because the "${variableType}" operation has not been included in this compiler's CompilationEnvironment.`,
          status: "error"
        };
      }
      if (typeof matchingOperations === "function") {
        const operation2 = matchingOperations;
        return operation2(identifier, data, environment);
      }
      if (operationId === void 0) {
        return {
          error: `This "${variableId}" variable could not be resolved because this compiler's "${variableType}" operations require an operation identifier, e.g. '${variableId}.${operationExample}'.`,
          status: "error"
        };
      }
      const operation = matchingOperations[operationId];
      if (operation === void 0) {
        return {
          error: `The identifier "${identifier}" could not be resolved because the "${variableId}.${operationId}" operation is not available to this compiler.`,
          status: "error"
        };
      }
      return operation(identifier, data, environment);
    };
    const resolveVariableIdentifier = ({ data, environment, identifier }) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const [variableId, operationId] = identifier.split(".");
      switch (variableId) {
        case BuiltInVariables.currentBlockHeight:
          return attemptCompilerOperation({
            data,
            environment,
            identifier,
            matchingOperations: (_a = environment.operations) === null || _a === void 0 ? void 0 : _a.currentBlockHeight,
            operationId,
            variableId,
            variableType: "currentBlockHeight"
          });
        case BuiltInVariables.currentBlockTime:
          return attemptCompilerOperation({
            data,
            environment,
            identifier,
            matchingOperations: (_b = environment.operations) === null || _b === void 0 ? void 0 : _b.currentBlockTime,
            operationId,
            variableId,
            variableType: "currentBlockTime"
          });
        case BuiltInVariables.signingSerialization:
          return attemptCompilerOperation({
            data,
            environment,
            identifier,
            matchingOperations: (_c = environment.operations) === null || _c === void 0 ? void 0 : _c.signingSerialization,
            operationExample: "version",
            operationId,
            variableId,
            variableType: "signingSerialization"
          });
        default: {
          const expectedVariable = (_d = environment.variables) === null || _d === void 0 ? void 0 : _d[variableId];
          if (expectedVariable === void 0) {
            return { status: "skip" };
          }
          return attemptCompilerOperation({
            data,
            environment,
            identifier,
            operationId,
            variableId,
            ...{
              AddressData: {
                matchingOperations: (_e = environment.operations) === null || _e === void 0 ? void 0 : _e.addressData,
                variableType: "addressData"
              },
              HdKey: {
                matchingOperations: (_f = environment.operations) === null || _f === void 0 ? void 0 : _f.hdKey,
                operationExample: "public_key",
                variableType: "hdKey"
              },
              Key: {
                matchingOperations: (_g = environment.operations) === null || _g === void 0 ? void 0 : _g.key,
                operationExample: "public_key",
                variableType: "key"
              },
              WalletData: {
                matchingOperations: (_h = environment.operations) === null || _h === void 0 ? void 0 : _h.walletData,
                variableType: "walletData"
              }
            }[expectedVariable.type]
          });
        }
      }
    };
    const resolveScriptIdentifier = ({ data, environment, identifier }) => {
      if (environment.scripts[identifier] === void 0) {
        return false;
      }
      const result = compileScriptRaw({ data, environment, scriptId: identifier });
      if (result.success) {
        return result;
      }
      return `Compilation error in resolved script "${identifier}": ${stringifyErrors(result.errors)}`;
    };
    const createIdentifierResolver = ({ data, environment }) => (identifier) => {
      var _a;
      const opcodeResult = (_a = environment.opcodes) === null || _a === void 0 ? void 0 : _a[identifier];
      if (opcodeResult !== void 0) {
        return {
          bytecode: opcodeResult,
          status: true,
          type: IdentifierResolutionType.opcode
        };
      }
      const variableResult = resolveVariableIdentifier({
        data,
        environment,
        identifier
      });
      if (variableResult.status !== "skip") {
        return variableResult.status === "error" ? {
          ..."debug" in variableResult ? { debug: variableResult.debug } : {},
          error: variableResult.error,
          ...environment.entityOwnership === void 0 ? {} : {
            entityOwnership: environment.entityOwnership[identifier.split(".")[0]]
          },
          recoverable: "recoverable" in variableResult,
          status: false,
          type: IdentifierResolutionErrorType.variable
        } : {
          ..."debug" in variableResult ? { debug: variableResult.debug } : {},
          bytecode: variableResult.bytecode,
          ..."signature" in variableResult ? {
            signature: variableResult.signature
          } : {},
          status: true,
          type: IdentifierResolutionType.variable
        };
      }
      const scriptResult = resolveScriptIdentifier({
        data,
        environment,
        identifier
      });
      if (scriptResult !== false) {
        return typeof scriptResult === "string" ? {
          error: scriptResult,
          scriptId: identifier,
          status: false,
          type: IdentifierResolutionErrorType.script
        } : {
          bytecode: scriptResult.bytecode,
          source: scriptResult.resolve,
          status: true,
          type: IdentifierResolutionType.script
        };
      }
      return {
        error: `Unknown identifier "${identifier}".`,
        status: false,
        type: IdentifierResolutionErrorType.unknown
      };
    };
    const attemptCompilerOperations = (operations, finalOperation) => (identifier, data, environment) => {
      for (const operation of operations) {
        const result = operation(identifier, data, environment);
        if (result.status !== "skip")
          return result;
      }
      return finalOperation(identifier, data, environment);
    };
    const compilerOperationRequires = ({ canBeSkipped, dataProperties, environmentProperties, operation }) => (identifier, data, environment) => {
      for (const property of environmentProperties) {
        if (environment[property] === void 0)
          return canBeSkipped ? { status: "skip" } : {
            error: `Cannot resolve "${identifier}" \u2013 the "${property}" property was not provided in the compilation environment.`,
            status: "error"
          };
      }
      for (const property of dataProperties) {
        if (data[property] === void 0)
          return canBeSkipped ? { status: "skip" } : {
            error: `Cannot resolve "${identifier}" \u2013 the "${property}" property was not provided in the compilation data.`,
            status: "error"
          };
      }
      return operation(identifier, data, environment);
    };
    const compilerOperationAttemptBytecodeResolution = compilerOperationRequires({
      canBeSkipped: true,
      dataProperties: ["bytecode"],
      environmentProperties: [],
      operation: (identifier, data) => {
        const { bytecode } = data;
        if (bytecode[identifier] !== void 0) {
          return { bytecode: bytecode[identifier], status: "success" };
        }
        return { status: "skip" };
      }
    });
    const compilerOperationHelperDeriveHdPrivateNode = ({ addressIndex, entityId, entityHdPrivateKey, environment, hdKey, identifier }) => {
      var _a, _b;
      const addressOffset = (_a = hdKey.addressOffset) !== null && _a !== void 0 ? _a : CompilerDefaults.hdKeyAddressOffset;
      const privateDerivationPath = (_b = hdKey.privateDerivationPath) !== null && _b !== void 0 ? _b : CompilerDefaults.hdKeyPrivateDerivationPath;
      const i = addressIndex + addressOffset;
      const validPrivatePathWithIndex = /^m(?:\/(?:[0-9]+|i)'?)*$/u;
      if (!validPrivatePathWithIndex.test(privateDerivationPath)) {
        return {
          error: `Could not generate ${identifier} \u2013 the path "${privateDerivationPath}" is not a valid "privateDerivationPath".`,
          status: "error"
        };
      }
      const instancePath = privateDerivationPath.replace("i", i.toString());
      const masterContents = decodeHdPrivateKey(environment, entityHdPrivateKey);
      if (typeof masterContents === "string") {
        return {
          error: `Could not generate ${identifier} \u2013 the HD private key provided for ${entityId} could not be decoded: ${masterContents}`,
          status: "error"
        };
      }
      const instanceNode = deriveHdPath(environment, masterContents.node, instancePath);
      if (typeof instanceNode === "string") {
        return {
          error: `Could not generate ${identifier} \u2013 the path "${instancePath}" could not be derived for entity "${entityId}": ${instanceNode}`,
          status: "error"
        };
      }
      return {
        bytecode: instanceNode.privateKey,
        status: "success"
      };
    };
    const compilerOperationHelperUnknownEntity = (identifier, variableId) => ({
      error: `Identifier "${identifier}" refers to an HdKey, but the "entityOwnership" for "${variableId}" is not available in this compilation environment.`,
      status: "error"
    });
    const compilerOperationHelperAddressIndex = (identifier) => ({
      error: `Identifier "${identifier}" refers to an HdKey, but "hdKeys.addressIndex" was not provided in the compilation data.`,
      status: "error"
    });
    const compilerOperationHelperDeriveHdKeyPrivate = ({ environment, hdKeys, identifier }) => {
      const { addressIndex, hdPrivateKeys } = hdKeys;
      const [variableId] = identifier.split(".");
      const entityId = environment.entityOwnership[variableId];
      if (entityId === void 0) {
        return compilerOperationHelperUnknownEntity(identifier, variableId);
      }
      if (addressIndex === void 0) {
        return compilerOperationHelperAddressIndex(identifier);
      }
      const entityHdPrivateKey = hdPrivateKeys === void 0 ? void 0 : hdPrivateKeys[entityId];
      if (entityHdPrivateKey === void 0) {
        return {
          error: `Identifier "${identifier}" refers to an HdKey owned by "${entityId}", but an HD private key for this entity (or an existing signature) was not provided in the compilation data.`,
          recoverable: true,
          status: "error"
        };
      }
      const hdKey = environment.variables[variableId];
      return compilerOperationHelperDeriveHdPrivateNode({
        addressIndex,
        entityHdPrivateKey,
        entityId,
        environment,
        hdKey,
        identifier
      });
    };
    const compilerOperationHelperCompileScript = ({ targetScriptId, data, environment }) => {
      const signingTarget = environment.scripts[targetScriptId];
      const compiledTarget = resolveScriptIdentifier({
        data,
        environment,
        identifier: targetScriptId
      });
      if (signingTarget === void 0 || compiledTarget === false) {
        return false;
      }
      if (typeof compiledTarget === "string") {
        return {
          error: compiledTarget,
          status: "error"
        };
      }
      return compiledTarget.bytecode;
    };
    const compilerOperationHelperGenerateCoveredBytecode = ({ data, environment, identifier, sourceScriptIds, unlockingScripts }) => {
      const currentScriptId = sourceScriptIds[sourceScriptIds.length - 1];
      if (currentScriptId === void 0) {
        return {
          error: `Identifier "${identifier}" requires a signing serialization, but "coveredBytecode" cannot be determined because the compilation environment's "sourceScriptIds" is empty.`,
          status: "error"
        };
      }
      const targetLockingScriptId = unlockingScripts[currentScriptId];
      if (targetLockingScriptId === void 0) {
        return {
          error: `Identifier "${identifier}" requires a signing serialization, but "coveredBytecode" cannot be determined because "${currentScriptId}" is not present in the compilation environment "unlockingScripts".`,
          status: "error"
        };
      }
      const result = compilerOperationHelperCompileScript({
        data,
        environment,
        targetScriptId: targetLockingScriptId
      });
      if (result === false) {
        return {
          error: `Identifier "${identifier}" requires a signing serialization which covers an unknown locking script, "${targetLockingScriptId}".`,
          status: "error"
        };
      }
      return result;
    };
    const compilerOperationAddressData = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["bytecode"],
      environmentProperties: [],
      operation: (identifier, data) => {
        const { bytecode } = data;
        if (identifier in bytecode) {
          return { bytecode: bytecode[identifier], status: "success" };
        }
        return {
          error: `Identifier "${identifier}" refers to an AddressData, but "${identifier}" was not provided in the CompilationData "bytecode".`,
          recoverable: true,
          status: "error"
        };
      }
    });
    const compilerOperationWalletData = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["bytecode"],
      environmentProperties: [],
      operation: (identifier, data) => {
        const { bytecode } = data;
        if (identifier in bytecode) {
          return { bytecode: bytecode[identifier], status: "success" };
        }
        return {
          error: `Identifier "${identifier}" refers to a WalletData, but "${identifier}" was not provided in the CompilationData "bytecode".`,
          recoverable: true,
          status: "error"
        };
      }
    });
    const compilerOperationCurrentBlockTime = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["currentBlockTime"],
      environmentProperties: [],
      operation: (_2, data) => {
        return {
          bytecode: numberToBinUint32LE(data.currentBlockTime),
          status: "success"
        };
      }
    });
    const compilerOperationCurrentBlockHeight = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["currentBlockHeight"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: bigIntToScriptNumber(BigInt(data.currentBlockHeight)),
        status: "success"
      })
    });
    const compilerOperationSigningSerializationCorrespondingOutput = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => data.transactionContext.correspondingOutput === void 0 ? { bytecode: Uint8Array.of(), status: "success" } : {
        bytecode: data.transactionContext.correspondingOutput,
        status: "success"
      }
    });
    const compilerOperationSigningSerializationCorrespondingOutputHash = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: ["sha256"],
      operation: (_2, data, environment) => data.transactionContext.correspondingOutput === void 0 ? { bytecode: Uint8Array.of(), status: "success" } : {
        bytecode: environment.sha256.hash(environment.sha256.hash(data.transactionContext.correspondingOutput)),
        status: "success"
      }
    });
    const compilerOperationHelperSigningSerializationCoveredBytecode = (returnLength) => compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: ["sourceScriptIds", "unlockingScripts"],
      operation: (identifier, data, environment) => {
        const { unlockingScripts, sourceScriptIds } = environment;
        const result = compilerOperationHelperGenerateCoveredBytecode({
          data,
          environment,
          identifier,
          sourceScriptIds,
          unlockingScripts
        });
        if ("error" in result) {
          return result;
        }
        return {
          bytecode: returnLength ? bigIntToBitcoinVarInt(BigInt(result.length)) : result,
          status: "success"
        };
      }
    });
    const compilerOperationSigningSerializationCoveredBytecode = compilerOperationHelperSigningSerializationCoveredBytecode(false);
    const compilerOperationSigningSerializationCoveredBytecodeLength = compilerOperationHelperSigningSerializationCoveredBytecode(true);
    const compilerOperationSigningSerializationLocktime = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: numberToBinUint32LE(data.transactionContext.locktime),
        status: "success"
      })
    });
    const compilerOperationSigningSerializationOutpointIndex = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: numberToBinUint32LE(data.transactionContext.outpointIndex),
        status: "success"
      })
    });
    const compilerOperationSigningSerializationOutpointTransactionHash = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: data.transactionContext.outpointTransactionHash,
        status: "success"
      })
    });
    const compilerOperationSigningSerializationOutputValue = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: data.transactionContext.outputValue,
        status: "success"
      })
    });
    const compilerOperationSigningSerializationSequenceNumber = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: numberToBinUint32LE(data.transactionContext.sequenceNumber),
        status: "success"
      })
    });
    const compilerOperationSigningSerializationTransactionOutpoints = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: data.transactionContext.transactionOutpoints,
        status: "success"
      })
    });
    const compilerOperationSigningSerializationTransactionOutpointsHash = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: ["sha256"],
      operation: (_2, data, environment) => ({
        bytecode: environment.sha256.hash(environment.sha256.hash(data.transactionContext.transactionOutpoints)),
        status: "success"
      })
    });
    const compilerOperationSigningSerializationTransactionOutputs = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: data.transactionContext.transactionOutputs,
        status: "success"
      })
    });
    const compilerOperationSigningSerializationTransactionOutputsHash = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: ["sha256"],
      operation: (_2, data, environment) => ({
        bytecode: environment.sha256.hash(environment.sha256.hash(data.transactionContext.transactionOutputs)),
        status: "success"
      })
    });
    const compilerOperationSigningSerializationTransactionSequenceNumbers = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: data.transactionContext.transactionSequenceNumbers,
        status: "success"
      })
    });
    const compilerOperationSigningSerializationTransactionSequenceNumbersHash = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: ["sha256"],
      operation: (_2, data, environment) => ({
        bytecode: environment.sha256.hash(environment.sha256.hash(data.transactionContext.transactionSequenceNumbers)),
        status: "success"
      })
    });
    const compilerOperationSigningSerializationVersion = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: [],
      operation: (_2, data) => ({
        bytecode: numberToBinUint32LE(data.transactionContext.version),
        status: "success"
      })
    });
    const compilerOperationKeyPublicKeyCommon = attemptCompilerOperations([compilerOperationAttemptBytecodeResolution], compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["keys"],
      environmentProperties: ["secp256k1"],
      operation: (identifier, data, environment) => {
        const { keys } = data;
        const { secp256k1 } = environment;
        const { privateKeys } = keys;
        const [variableId] = identifier.split(".");
        if (privateKeys !== void 0 && privateKeys[variableId] !== void 0) {
          return {
            bytecode: secp256k1.derivePublicKeyCompressed(privateKeys[variableId]),
            status: "success"
          };
        }
        return {
          error: `Identifier "${identifier}" refers to a public key, but no public or private keys for "${variableId}" were provided in the compilation data.`,
          recoverable: true,
          status: "error"
        };
      }
    }));
    const compilerOperationHdKeyPublicKeyCommon = attemptCompilerOperations([compilerOperationAttemptBytecodeResolution], compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["hdKeys"],
      environmentProperties: [
        "entityOwnership",
        "ripemd160",
        "secp256k1",
        "sha256",
        "sha512",
        "variables"
      ],
      operation: (identifier, data, environment) => {
        var _a, _b, _c;
        const { hdKeys } = data;
        const { hdPrivateKeys, addressIndex, hdPublicKeys } = hdKeys;
        const [variableId] = identifier.split(".");
        const entityId = environment.entityOwnership[variableId];
        if (entityId === void 0) {
          return compilerOperationHelperUnknownEntity(identifier, variableId);
        }
        if (addressIndex === void 0) {
          return compilerOperationHelperAddressIndex(identifier);
        }
        const entityHdPrivateKey = hdPrivateKeys === void 0 ? void 0 : hdPrivateKeys[entityId];
        const hdKey = environment.variables[variableId];
        if (entityHdPrivateKey !== void 0) {
          const privateResult = compilerOperationHelperDeriveHdPrivateNode({
            addressIndex,
            entityHdPrivateKey,
            entityId,
            environment,
            hdKey,
            identifier
          });
          if (privateResult.status === "error")
            return privateResult;
          return {
            bytecode: environment.secp256k1.derivePublicKeyCompressed(privateResult.bytecode),
            status: "success"
          };
        }
        const entityHdPublicKey = hdPublicKeys === void 0 ? void 0 : hdPublicKeys[entityId];
        if (entityHdPublicKey === void 0) {
          return {
            error: `Identifier "${identifier}" refers to an HdKey owned by "${entityId}", but an HD private key or HD public key for this entity was not provided in the compilation data.`,
            recoverable: true,
            status: "error"
          };
        }
        const addressOffset = (_a = hdKey.addressOffset) !== null && _a !== void 0 ? _a : CompilerDefaults.hdKeyAddressOffset;
        const privateDerivationPath = (_b = hdKey.privateDerivationPath) !== null && _b !== void 0 ? _b : CompilerDefaults.hdKeyPrivateDerivationPath;
        const publicDerivationPath = (_c = hdKey.publicDerivationPath) !== null && _c !== void 0 ? _c : privateDerivationPath.replace("m", "M");
        const validPublicPathWithIndex = /^M(?:\/(?:[0-9]+|i))*$/u;
        if (!validPublicPathWithIndex.test(publicDerivationPath)) {
          return {
            error: `Could not generate ${identifier} \u2013 the path "${publicDerivationPath}" is not a valid "publicDerivationPath".`,
            status: "error"
          };
        }
        const i = addressIndex + addressOffset;
        const instancePath = publicDerivationPath.replace("i", i.toString());
        const masterContents = decodeHdPublicKey(environment, entityHdPublicKey);
        if (typeof masterContents === "string") {
          return {
            error: `Could not generate "${identifier}" \u2013 the HD public key provided for "${entityId}" could not be decoded: ${masterContents}`,
            status: "error"
          };
        }
        const instanceNode = deriveHdPath(environment, masterContents.node, instancePath);
        if (typeof instanceNode === "string") {
          return {
            error: `Could not generate "${identifier}" \u2013 the path "${instancePath}" could not be derived for entity "${entityId}": ${instanceNode}`,
            status: "error"
          };
        }
        return { bytecode: instanceNode.publicKey, status: "success" };
      }
    }));
    const compilerOperationsCommon = {
      addressData: compilerOperationAddressData,
      currentBlockHeight: compilerOperationCurrentBlockHeight,
      currentBlockTime: compilerOperationCurrentBlockTime,
      hdKey: {
        public_key: compilerOperationHdKeyPublicKeyCommon
      },
      key: {
        public_key: compilerOperationKeyPublicKeyCommon
      },
      signingSerialization: {
        corresponding_output: compilerOperationSigningSerializationCorrespondingOutput,
        corresponding_output_hash: compilerOperationSigningSerializationCorrespondingOutputHash,
        covered_bytecode: compilerOperationSigningSerializationCoveredBytecode,
        covered_bytecode_length: compilerOperationSigningSerializationCoveredBytecodeLength,
        locktime: compilerOperationSigningSerializationLocktime,
        outpoint_index: compilerOperationSigningSerializationOutpointIndex,
        outpoint_transaction_hash: compilerOperationSigningSerializationOutpointTransactionHash,
        output_value: compilerOperationSigningSerializationOutputValue,
        sequence_number: compilerOperationSigningSerializationSequenceNumber,
        transaction_outpoints: compilerOperationSigningSerializationTransactionOutpoints,
        transaction_outpoints_hash: compilerOperationSigningSerializationTransactionOutpointsHash,
        transaction_outputs: compilerOperationSigningSerializationTransactionOutputs,
        transaction_outputs_hash: compilerOperationSigningSerializationTransactionOutputsHash,
        transaction_sequence_numbers: compilerOperationSigningSerializationTransactionSequenceNumbers,
        transaction_sequence_numbers_hash: compilerOperationSigningSerializationTransactionSequenceNumbersHash,
        version: compilerOperationSigningSerializationVersion
      },
      walletData: compilerOperationWalletData
    };
    var CommonPushOpcodes;
    (function(CommonPushOpcodes2) {
      CommonPushOpcodes2[CommonPushOpcodes2["OP_0"] = 0] = "OP_0";
      CommonPushOpcodes2[CommonPushOpcodes2["OP_PUSHDATA_1"] = 76] = "OP_PUSHDATA_1";
      CommonPushOpcodes2[CommonPushOpcodes2["OP_PUSHDATA_2"] = 77] = "OP_PUSHDATA_2";
      CommonPushOpcodes2[CommonPushOpcodes2["OP_PUSHDATA_4"] = 78] = "OP_PUSHDATA_4";
    })(CommonPushOpcodes || (CommonPushOpcodes = {}));
    const generateBytecodeMap = (opcodes) => Object.entries(opcodes).filter((entry) => typeof entry[1] === "number").reduce((identifiers, pair) => ({
      ...identifiers,
      [pair[0]]: Uint8Array.of(pair[1])
    }), {});
    var SigningSerializationFlag;
    (function(SigningSerializationFlag2) {
      SigningSerializationFlag2[SigningSerializationFlag2["allOutputs"] = 1] = "allOutputs";
      SigningSerializationFlag2[SigningSerializationFlag2["noOutputs"] = 2] = "noOutputs";
      SigningSerializationFlag2[SigningSerializationFlag2["correspondingOutput"] = 3] = "correspondingOutput";
      SigningSerializationFlag2[SigningSerializationFlag2["forkId"] = 64] = "forkId";
      SigningSerializationFlag2[SigningSerializationFlag2["singleInput"] = 128] = "singleInput";
    })(SigningSerializationFlag || (SigningSerializationFlag = {}));
    const match = (type, flag) => (type[0] & flag) !== 0;
    const equals = (type, flag) => (type[0] & 31) === flag;
    const shouldSerializeSingleInput = (type) => match(type, SigningSerializationFlag.singleInput);
    const shouldSerializeCorrespondingOutput = (type) => equals(type, SigningSerializationFlag.correspondingOutput);
    const shouldSerializeNoOutputs = (type) => equals(type, SigningSerializationFlag.noOutputs);
    const emptyHash = () => new Uint8Array(32).fill(0);
    const hashPrevouts = ({ sha256: sha2562, signingSerializationType, transactionOutpoints }) => shouldSerializeSingleInput(signingSerializationType) ? emptyHash() : sha2562.hash(sha2562.hash(transactionOutpoints));
    const hashSequence = ({ sha256: sha2562, signingSerializationType, transactionSequenceNumbers }) => !shouldSerializeSingleInput(signingSerializationType) && !shouldSerializeCorrespondingOutput(signingSerializationType) && !shouldSerializeNoOutputs(signingSerializationType) ? sha2562.hash(sha2562.hash(transactionSequenceNumbers)) : emptyHash();
    const hashOutputs = ({ correspondingOutput, sha256: sha2562, signingSerializationType, transactionOutputs }) => !shouldSerializeCorrespondingOutput(signingSerializationType) && !shouldSerializeNoOutputs(signingSerializationType) ? sha2562.hash(sha2562.hash(transactionOutputs)) : shouldSerializeCorrespondingOutput(signingSerializationType) ? correspondingOutput === void 0 ? emptyHash() : sha2562.hash(sha2562.hash(correspondingOutput)) : emptyHash();
    const generateSigningSerializationBCH = ({ correspondingOutput, coveredBytecode, forkId = new Uint8Array([0, 0, 0]), locktime, outpointIndex, outpointTransactionHash, outputValue, sequenceNumber, sha256: sha2562, signingSerializationType, transactionOutpoints, transactionOutputs, transactionSequenceNumbers, version }) => flattenBinArray([
      numberToBinUint32LE(version),
      hashPrevouts({ sha256: sha2562, signingSerializationType, transactionOutpoints }),
      hashSequence({
        sha256: sha2562,
        signingSerializationType,
        transactionSequenceNumbers
      }),
      outpointTransactionHash.slice().reverse(),
      numberToBinUint32LE(outpointIndex),
      bigIntToBitcoinVarInt(BigInt(coveredBytecode.length)),
      coveredBytecode,
      outputValue,
      numberToBinUint32LE(sequenceNumber),
      hashOutputs({
        correspondingOutput,
        sha256: sha2562,
        signingSerializationType,
        transactionOutputs
      }),
      numberToBinUint32LE(locktime),
      signingSerializationType,
      forkId
    ]);
    var PushOperationConstants;
    (function(PushOperationConstants2) {
      PushOperationConstants2[PushOperationConstants2["OP_0"] = 0] = "OP_0";
      PushOperationConstants2[PushOperationConstants2["maximumPushByteOperationSize"] = 75] = "maximumPushByteOperationSize";
      PushOperationConstants2[PushOperationConstants2["OP_PUSHDATA_1"] = 76] = "OP_PUSHDATA_1";
      PushOperationConstants2[PushOperationConstants2["OP_PUSHDATA_2"] = 77] = "OP_PUSHDATA_2";
      PushOperationConstants2[PushOperationConstants2["OP_PUSHDATA_4"] = 78] = "OP_PUSHDATA_4";
      PushOperationConstants2[PushOperationConstants2["highestPushDataOpcode"] = 78] = "highestPushDataOpcode";
      PushOperationConstants2[PushOperationConstants2["pushNumberOpcodesOffset"] = 80] = "pushNumberOpcodesOffset";
      PushOperationConstants2[PushOperationConstants2["pushNumberOpcodes"] = 16] = "pushNumberOpcodes";
      PushOperationConstants2[PushOperationConstants2["negativeOne"] = 129] = "negativeOne";
      PushOperationConstants2[PushOperationConstants2["OP_1NEGATE"] = 79] = "OP_1NEGATE";
      PushOperationConstants2[PushOperationConstants2["maximumPushData1Size"] = 255] = "maximumPushData1Size";
      PushOperationConstants2[PushOperationConstants2["maximumPushSize"] = 520] = "maximumPushSize";
      PushOperationConstants2[PushOperationConstants2["maximumPushData2Size"] = 65535] = "maximumPushData2Size";
      PushOperationConstants2[PushOperationConstants2["maximumPushData4Size"] = 4294967295] = "maximumPushData4Size";
    })(PushOperationConstants || (PushOperationConstants = {}));
    const encodeDataPush = (data) => data.length <= PushOperationConstants.maximumPushByteOperationSize ? data.length === 0 ? Uint8Array.of(0) : data.length === 1 ? data[0] !== 0 && data[0] <= PushOperationConstants.pushNumberOpcodes ? Uint8Array.of(data[0] + PushOperationConstants.pushNumberOpcodesOffset) : data[0] === PushOperationConstants.negativeOne ? Uint8Array.of(PushOperationConstants.OP_1NEGATE) : Uint8Array.from([1, ...data]) : Uint8Array.from([data.length, ...data]) : data.length <= PushOperationConstants.maximumPushData1Size ? Uint8Array.from([
      PushOperationConstants.OP_PUSHDATA_1,
      data.length,
      ...data
    ]) : data.length <= PushOperationConstants.maximumPushData2Size ? Uint8Array.from([
      PushOperationConstants.OP_PUSHDATA_2,
      ...numberToBinUint16LE(data.length),
      ...data
    ]) : Uint8Array.from([
      PushOperationConstants.OP_PUSHDATA_4,
      ...numberToBinUint32LE(data.length),
      ...data
    ]);
    [
      OpcodesCommon.OP_PUSHBYTES_1,
      OpcodesCommon.OP_PUSHBYTES_2,
      OpcodesCommon.OP_PUSHBYTES_3,
      OpcodesCommon.OP_PUSHBYTES_4,
      OpcodesCommon.OP_PUSHBYTES_5,
      OpcodesCommon.OP_PUSHBYTES_6,
      OpcodesCommon.OP_PUSHBYTES_7,
      OpcodesCommon.OP_PUSHBYTES_8,
      OpcodesCommon.OP_PUSHBYTES_9,
      OpcodesCommon.OP_PUSHBYTES_10,
      OpcodesCommon.OP_PUSHBYTES_11,
      OpcodesCommon.OP_PUSHBYTES_12,
      OpcodesCommon.OP_PUSHBYTES_13,
      OpcodesCommon.OP_PUSHBYTES_14,
      OpcodesCommon.OP_PUSHBYTES_15,
      OpcodesCommon.OP_PUSHBYTES_16,
      OpcodesCommon.OP_PUSHBYTES_17,
      OpcodesCommon.OP_PUSHBYTES_18,
      OpcodesCommon.OP_PUSHBYTES_19,
      OpcodesCommon.OP_PUSHBYTES_20,
      OpcodesCommon.OP_PUSHBYTES_21,
      OpcodesCommon.OP_PUSHBYTES_22,
      OpcodesCommon.OP_PUSHBYTES_23,
      OpcodesCommon.OP_PUSHBYTES_24,
      OpcodesCommon.OP_PUSHBYTES_25,
      OpcodesCommon.OP_PUSHBYTES_26,
      OpcodesCommon.OP_PUSHBYTES_27,
      OpcodesCommon.OP_PUSHBYTES_28,
      OpcodesCommon.OP_PUSHBYTES_29,
      OpcodesCommon.OP_PUSHBYTES_30,
      OpcodesCommon.OP_PUSHBYTES_31,
      OpcodesCommon.OP_PUSHBYTES_32,
      OpcodesCommon.OP_PUSHBYTES_33,
      OpcodesCommon.OP_PUSHBYTES_34,
      OpcodesCommon.OP_PUSHBYTES_35,
      OpcodesCommon.OP_PUSHBYTES_36,
      OpcodesCommon.OP_PUSHBYTES_37,
      OpcodesCommon.OP_PUSHBYTES_38,
      OpcodesCommon.OP_PUSHBYTES_39,
      OpcodesCommon.OP_PUSHBYTES_40,
      OpcodesCommon.OP_PUSHBYTES_41,
      OpcodesCommon.OP_PUSHBYTES_42,
      OpcodesCommon.OP_PUSHBYTES_43,
      OpcodesCommon.OP_PUSHBYTES_44,
      OpcodesCommon.OP_PUSHBYTES_45,
      OpcodesCommon.OP_PUSHBYTES_46,
      OpcodesCommon.OP_PUSHBYTES_47,
      OpcodesCommon.OP_PUSHBYTES_48,
      OpcodesCommon.OP_PUSHBYTES_49,
      OpcodesCommon.OP_PUSHBYTES_50,
      OpcodesCommon.OP_PUSHBYTES_51,
      OpcodesCommon.OP_PUSHBYTES_52,
      OpcodesCommon.OP_PUSHBYTES_53,
      OpcodesCommon.OP_PUSHBYTES_54,
      OpcodesCommon.OP_PUSHBYTES_55,
      OpcodesCommon.OP_PUSHBYTES_56,
      OpcodesCommon.OP_PUSHBYTES_57,
      OpcodesCommon.OP_PUSHBYTES_58,
      OpcodesCommon.OP_PUSHBYTES_59,
      OpcodesCommon.OP_PUSHBYTES_60,
      OpcodesCommon.OP_PUSHBYTES_61,
      OpcodesCommon.OP_PUSHBYTES_62,
      OpcodesCommon.OP_PUSHBYTES_63,
      OpcodesCommon.OP_PUSHBYTES_64,
      OpcodesCommon.OP_PUSHBYTES_65,
      OpcodesCommon.OP_PUSHBYTES_66,
      OpcodesCommon.OP_PUSHBYTES_67,
      OpcodesCommon.OP_PUSHBYTES_68,
      OpcodesCommon.OP_PUSHBYTES_69,
      OpcodesCommon.OP_PUSHBYTES_70,
      OpcodesCommon.OP_PUSHBYTES_71,
      OpcodesCommon.OP_PUSHBYTES_72,
      OpcodesCommon.OP_PUSHBYTES_73,
      OpcodesCommon.OP_PUSHBYTES_74,
      OpcodesCommon.OP_PUSHBYTES_75
    ];
    [
      OpcodesCommon.OP_1NEGATE,
      OpcodesCommon.OP_1,
      OpcodesCommon.OP_2,
      OpcodesCommon.OP_3,
      OpcodesCommon.OP_4,
      OpcodesCommon.OP_5,
      OpcodesCommon.OP_6,
      OpcodesCommon.OP_7,
      OpcodesCommon.OP_8,
      OpcodesCommon.OP_9,
      OpcodesCommon.OP_10,
      OpcodesCommon.OP_11,
      OpcodesCommon.OP_12,
      OpcodesCommon.OP_13,
      OpcodesCommon.OP_14,
      OpcodesCommon.OP_15,
      OpcodesCommon.OP_16
    ];
    var Bits;
    (function(Bits2) {
      Bits2[Bits2["sequenceLocktimeDisableFlag"] = 31] = "sequenceLocktimeDisableFlag";
      Bits2[Bits2["sequenceLocktimeTypeFlag"] = 22] = "sequenceLocktimeTypeFlag";
    })(Bits || (Bits = {}));
    var Constants$1;
    (function(Constants2) {
      Constants2[Constants2["locktimeScriptNumberByteLength"] = 5] = "locktimeScriptNumberByteLength";
      Constants2[Constants2["locktimeThreshold"] = 5e8] = "locktimeThreshold";
      Constants2[Constants2["locktimeDisablingSequenceNumber"] = 4294967295] = "locktimeDisablingSequenceNumber";
      Constants2[Constants2["sequenceLocktimeTransactionVersionMinimum"] = 2] = "sequenceLocktimeTransactionVersionMinimum";
      Constants2[Constants2["sequenceLocktimeDisableFlag"] = 2147483648] = "sequenceLocktimeDisableFlag";
      Constants2[Constants2["sequenceLocktimeTypeFlag"] = 4194304] = "sequenceLocktimeTypeFlag";
      Constants2[Constants2["sequenceGranularity"] = 9] = "sequenceGranularity";
      Constants2[Constants2["sequenceLocktimeMask"] = 65535] = "sequenceLocktimeMask";
    })(Constants$1 || (Constants$1 = {}));
    var OpcodeDescriptionsCommon;
    (function(OpcodeDescriptionsCommon2) {
      OpcodeDescriptionsCommon2["OP_0"] = "Push the Script Number 0 onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_1"] = "Push the next byte onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_2"] = "Push the next 2 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_3"] = "Push the next 3 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_4"] = "Push the next 4 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_5"] = "Push the next 5 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_6"] = "Push the next 6 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_7"] = "Push the next 7 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_8"] = "Push the next 8 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_9"] = "Push the next 9 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_10"] = "Push the next 10 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_11"] = "Push the next 11 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_12"] = "Push the next 12 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_13"] = "Push the next 13 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_14"] = "Push the next 14 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_15"] = "Push the next 15 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_16"] = "Push the next 16 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_17"] = "Push the next 17 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_18"] = "Push the next 18 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_19"] = "Push the next 19 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_20"] = "Push the next 20 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_21"] = "Push the next 21 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_22"] = "Push the next 22 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_23"] = "Push the next 23 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_24"] = "Push the next 24 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_25"] = "Push the next 25 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_26"] = "Push the next 26 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_27"] = "Push the next 27 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_28"] = "Push the next 28 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_29"] = "Push the next 29 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_30"] = "Push the next 30 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_31"] = "Push the next 31 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_32"] = "Push the next 32 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_33"] = "Push the next 33 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_34"] = "Push the next 34 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_35"] = "Push the next 35 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_36"] = "Push the next 36 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_37"] = "Push the next 37 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_38"] = "Push the next 38 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_39"] = "Push the next 39 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_40"] = "Push the next 40 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_41"] = "Push the next 41 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_42"] = "Push the next 42 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_43"] = "Push the next 43 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_44"] = "Push the next 44 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_45"] = "Push the next 45 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_46"] = "Push the next 46 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_47"] = "Push the next 47 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_48"] = "Push the next 48 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_49"] = "Push the next 49 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_50"] = "Push the next 50 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_51"] = "Push the next 51 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_52"] = "Push the next 52 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_53"] = "Push the next 53 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_54"] = "Push the next 54 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_55"] = "Push the next 55 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_56"] = "Push the next 56 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_57"] = "Push the next 57 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_58"] = "Push the next 58 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_59"] = "Push the next 59 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_60"] = "Push the next 60 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_61"] = "Push the next 61 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_62"] = "Push the next 62 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_63"] = "Push the next 63 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_64"] = "Push the next 64 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_65"] = "Push the next 65 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_66"] = "Push the next 66 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_67"] = "Push the next 67 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_68"] = "Push the next 68 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_69"] = "Push the next 69 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_70"] = "Push the next 70 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_71"] = "Push the next 71 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_72"] = "Push the next 72 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_73"] = "Push the next 73 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_74"] = "Push the next 74 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHBYTES_75"] = "Push the next 75 bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHDATA_1"] = "Read the next Uint8 and push that number of bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHDATA_2"] = "Read the next little-endian Uint16 and push that number of bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_PUSHDATA_4"] = "Read the next little-endian Uint32 and push that number of bytes onto the stack.";
      OpcodeDescriptionsCommon2["OP_1NEGATE"] = "Push the Script Number -1 onto the stack.";
      OpcodeDescriptionsCommon2["OP_RESERVED"] = "Error unless found in an unexecuted conditional branch. Note: OP_RESERVED does not count toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_1"] = "Push the Script Number 1 onto the stack.";
      OpcodeDescriptionsCommon2["OP_2"] = "Push the Script Number 2 onto the stack.";
      OpcodeDescriptionsCommon2["OP_3"] = "Push the Script Number 3 onto the stack.";
      OpcodeDescriptionsCommon2["OP_4"] = "Push the Script Number 4 onto the stack.";
      OpcodeDescriptionsCommon2["OP_5"] = "Push the Script Number 5 onto the stack.";
      OpcodeDescriptionsCommon2["OP_6"] = "Push the Script Number 6 onto the stack.";
      OpcodeDescriptionsCommon2["OP_7"] = "Push the Script Number 7 onto the stack.";
      OpcodeDescriptionsCommon2["OP_8"] = "Push the Script Number 8 onto the stack.";
      OpcodeDescriptionsCommon2["OP_9"] = "Push the Script Number 9 onto the stack.";
      OpcodeDescriptionsCommon2["OP_10"] = "Push the Script Number 10 onto the stack.";
      OpcodeDescriptionsCommon2["OP_11"] = "Push the Script Number 11 onto the stack.";
      OpcodeDescriptionsCommon2["OP_12"] = "Push the Script Number 12 onto the stack.";
      OpcodeDescriptionsCommon2["OP_13"] = "Push the Script Number 13 onto the stack.";
      OpcodeDescriptionsCommon2["OP_14"] = "Push the Script Number 14 onto the stack.";
      OpcodeDescriptionsCommon2["OP_15"] = "Push the Script Number 15 onto the stack.";
      OpcodeDescriptionsCommon2["OP_16"] = "Push the Script Number 16 onto the stack.";
      OpcodeDescriptionsCommon2["OP_NOP"] = "No operation. Note: OP_NOP counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_VER"] = "Error unless found in an unexecuted conditional branch. Note: OP_VER counts toward the opcode limit. (Historically, this pushed a protocol version number to the stack.)";
      OpcodeDescriptionsCommon2["OP_IF"] = 'Pop the top item from the stack. If it is not "truthy", skip evaluation until the matching OP_ELSE or OP_ENDIF.';
      OpcodeDescriptionsCommon2["OP_NOTIF"] = "Evaluate OP_NOT followed by OP_IF.";
      OpcodeDescriptionsCommon2["OP_VERIF"] = "Error, even when found in an unexecuted conditional branch. (Historically, this was a combination of OP_VER and OP_IF.)";
      OpcodeDescriptionsCommon2["OP_VERNOTIF"] = "Error, even when found in an unexecuted conditional branch. (Historically, this was a combination of OP_VER and OP_NOTIF.)";
      OpcodeDescriptionsCommon2["OP_ELSE"] = "Invert conditional evaluation within the current OP_IF ... OP_ENDIF block. (If evaluation is enabled, disable it, if it is disabled, enable it.)";
      OpcodeDescriptionsCommon2["OP_ENDIF"] = "End the current OP_IF ... OP_ENDIF block.";
      OpcodeDescriptionsCommon2["OP_VERIFY"] = `Pop the top item from the stack and error if it isn't "truthy".`;
      OpcodeDescriptionsCommon2["OP_RETURN"] = "Error when executed.";
      OpcodeDescriptionsCommon2["OP_TOALTSTACK"] = "Pop the top item from the stack and push it onto the alternate stack.";
      OpcodeDescriptionsCommon2["OP_FROMALTSTACK"] = "Pop the top item from the alternate stack and push it onto the stack.";
      OpcodeDescriptionsCommon2["OP_2DROP"] = "Pop the top 2 items from the stack and discard them.";
      OpcodeDescriptionsCommon2["OP_2DUP"] = "Duplicate the top 2 items on the stack. (E.g. [a, b] -> [a, b, a, b])";
      OpcodeDescriptionsCommon2["OP_3DUP"] = "Duplicate the top 3 items on the stack. (E.g. [a, b, c] -> [a, b, c, a, b, c])";
      OpcodeDescriptionsCommon2["OP_2OVER"] = "Duplicate the 2 items beginning at a depth of 2 on the stack. (E.g. [a, b, c, d] -> [a, b, c, d, a, b])";
      OpcodeDescriptionsCommon2["OP_2ROT"] = "Rotate the top 6 items on the stack, bringing the fifth and sixth items to the top. (E.g. [a, b, c, d, e, f] -> [c, d, e, f, a, b])";
      OpcodeDescriptionsCommon2["OP_2SWAP"] = "Swap the positions of the top two pairs of items on the stack. (E.g. [a, b, c, d] -> [c, d, a, b])";
      OpcodeDescriptionsCommon2["OP_IFDUP"] = 'If the top item on the stack is "truthy", duplicate it.';
      OpcodeDescriptionsCommon2["OP_DEPTH"] = "Push the current number of stack items as a Script Number.";
      OpcodeDescriptionsCommon2["OP_DROP"] = "Pop the top item from the stack and discard it. (E.g. [a] -> [])";
      OpcodeDescriptionsCommon2["OP_DUP"] = "Duplicate the top item on the stack. (E.g. [a] -> [a, a])";
      OpcodeDescriptionsCommon2["OP_NIP"] = "Remove the second-to-top item from the stack. (E.g. [a, b] -> [b])";
      OpcodeDescriptionsCommon2["OP_OVER"] = "Duplicate the second-to-top item on the stack. (E.g. [a, b] -> [a, b, a])";
      OpcodeDescriptionsCommon2["OP_PICK"] = "Pop the top item from the stack as a Script Number. Duplicate the item at that depth (zero-indexed), placing it on top of the stack. (E.g. [a, b, c, 2] -> [a, b, c, a])";
      OpcodeDescriptionsCommon2["OP_ROLL"] = "Pop the top item from the stack as a Script Number. Move the item at that depth (zero-indexed) to the top of the stack. (E.g. [a, b, c, 2] -> [b, c, a])";
      OpcodeDescriptionsCommon2["OP_ROT"] = "Rotate the top 3 items on the stack, bringing the third item to the top. (E.g. [a, b, c] -> [b, c, a])";
      OpcodeDescriptionsCommon2["OP_SWAP"] = "Swap the top two items on the stack. (E.g. [a, b] -> [b, a])";
      OpcodeDescriptionsCommon2["OP_TUCK"] = "Duplicate the item at the top of the stack, inserting it below the second-to-top item. (E.g. [a, b] -> [b, a, b])";
      OpcodeDescriptionsCommon2["OP_CAT"] = "Error, even when found in an unexecuted conditional branch. (Historically, this concatenated two stack items.)";
      OpcodeDescriptionsCommon2["OP_SUBSTR"] = "Error, even when found in an unexecuted conditional branch. (Historically, this returned a section of a stack item.)";
      OpcodeDescriptionsCommon2["OP_LEFT"] = "Error, even when found in an unexecuted conditional branch. (Historically, this returned a section to the left of a point in a stack item.)";
      OpcodeDescriptionsCommon2["OP_RIGHT"] = "Error, even when found in an unexecuted conditional branch. (Historically, this returned a section to the right of a point in a stack item.)";
      OpcodeDescriptionsCommon2["OP_SIZE"] = "Push the byte-length of the top stack item as a Script Number.";
      OpcodeDescriptionsCommon2["OP_INVERT"] = "Error, even when found in an unexecuted conditional branch. (Historically, this flipped all the bits in a stack item.)";
      OpcodeDescriptionsCommon2["OP_AND"] = "Error, even when found in an unexecuted conditional branch. (Historically, this performed a boolean AND on each bit in two stack items.)";
      OpcodeDescriptionsCommon2["OP_OR"] = "Error, even when found in an unexecuted conditional branch. (Historically, this performed a boolean OR on each bit in two stack items.)";
      OpcodeDescriptionsCommon2["OP_XOR"] = "Error, even when found in an unexecuted conditional branch. (Historically, this performed a boolean XOR on each bit in two stack items.)";
      OpcodeDescriptionsCommon2["OP_EQUAL"] = "Pop the top two items from the stack and compare them byte-by-byte. If they are the same, push a Script Number 1, otherwise push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_EQUALVERIFY"] = "Pop the top two items from the stack and compare them byte-by-byte. If the values are different, error. (This operation is a combination of OP_EQUAL followed by OP_VERIFY.)";
      OpcodeDescriptionsCommon2["OP_RESERVED1"] = "Error unless found in an unexecuted conditional branch. Note: OP_RESERVED1 counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_RESERVED2"] = "Error unless found in an unexecuted conditional branch. Note: OP_RESERVED2 counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_1ADD"] = "Pop the top item from the stack as a Script Number, add 1, then push the result.";
      OpcodeDescriptionsCommon2["OP_1SUB"] = "Pop the top item from the stack as a Script Number, subtract 1, then push the result.";
      OpcodeDescriptionsCommon2["OP_2MUL"] = "Error, even when found in an unexecuted conditional branch. (Historically, this multiplied a Script Number by 2.)";
      OpcodeDescriptionsCommon2["OP_2DIV"] = "Error, even when found in an unexecuted conditional branch. (Historically, this divided a Script Number by 2.)";
      OpcodeDescriptionsCommon2["OP_NEGATE"] = "Pop the top item from the stack as a Script Number, negate it, then push the result.";
      OpcodeDescriptionsCommon2["OP_ABS"] = "Pop the top item from the stack as a Script Number, take its absolute value, then push the result.";
      OpcodeDescriptionsCommon2["OP_NOT"] = "Pop the top item from the stack as a Script Number. If its value is 0, push a Script Number 1, otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_0NOTEQUAL"] = "Pop the top item from the stack as a Script Number. If its value is not 0, push a Script Number 1, otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_ADD"] = "Pop the top two items from the stack as Script Numbers. Add them, then push the result.";
      OpcodeDescriptionsCommon2["OP_SUB"] = "Pop the top two items from the stack as Script Numbers. Subtract the top item from the second item, then push the result.";
      OpcodeDescriptionsCommon2["OP_MUL"] = "Error, even when found in an unexecuted conditional branch. (Historically, this multiplied two Script Numbers.)";
      OpcodeDescriptionsCommon2["OP_DIV"] = "Error, even when found in an unexecuted conditional branch. (Historically, this divided two Script Numbers.)";
      OpcodeDescriptionsCommon2["OP_MOD"] = "Error, even when found in an unexecuted conditional branch. (Historically, this returned the remainder after dividing one Script Number by another.)";
      OpcodeDescriptionsCommon2["OP_LSHIFT"] = "Error, even when found in an unexecuted conditional branch. (Historically, this performed a sign-preserving, left bit shift.)";
      OpcodeDescriptionsCommon2["OP_RSHIFT"] = "Error, even when found in an unexecuted conditional branch. (Historically, this performed a sign-preserving, right bit shift.)";
      OpcodeDescriptionsCommon2["OP_BOOLAND"] = "Pop the top two items from the stack as Script Numbers. If neither value is a Script Number 0, push a Script Number 1. Otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_BOOLOR"] = "Pop the top two items from the stack as Script Numbers. If either value is a Script Number 1, push a Script Number 1. Otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_NUMEQUAL"] = "Pop the top two items from the stack as Script Numbers. If the values are equal, push a Script Number 1. Otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_NUMEQUALVERIFY"] = "Pop the top two items from the stack as Script Numbers. If the values are different, error. (This operation is a combination of OP_NUMEQUAL followed by OP_VERIFY.)";
      OpcodeDescriptionsCommon2["OP_NUMNOTEQUAL"] = "Pop the top two items from the stack as Script Numbers. If the values are not equal, push a Script Number 1. Otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_LESSTHAN"] = "Pop the top two items from the stack as Script Numbers. If the second item is less than top item, push a Script Number 1. Otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_GREATERTHAN"] = "Pop the top two items from the stack as Script Numbers. If the second item is greater than top item, push a Script Number 1. Otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_LESSTHANOREQUAL"] = "Pop the top two items from the stack as Script Numbers. If the second item is less than or equal to the top item, push a Script Number 1. Otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_GREATERTHANOREQUAL"] = "Pop the top two items from the stack as Script Numbers. If the second item is greater than or equal to the top item, push a Script Number 1. Otherwise, push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_MIN"] = "Pop the top two items from the stack as Script Numbers. Push the smaller of the two numbers.";
      OpcodeDescriptionsCommon2["OP_MAX"] = "Pop the top two items from the stack as Script Numbers. Push the larger of the two numbers.";
      OpcodeDescriptionsCommon2["OP_WITHIN"] = "Pop the top three items from the stack as Script Numbers. If the top number is within the range defined by the following two numbers (left-inclusive), push a Script Number 1. Otherwise, push a Script Number 0. (E.g. for [a, b, c]: if (b <= a), and (a < c), [1]. Else [0].)";
      OpcodeDescriptionsCommon2["OP_RIPEMD160"] = "Pop the top item from the stack and pass it through ripemd160, pushing the result onto the stack.";
      OpcodeDescriptionsCommon2["OP_SHA1"] = "Pop the top item from the stack and pass it through sha1, pushing the result onto the stack.";
      OpcodeDescriptionsCommon2["OP_SHA256"] = "Pop the top item from the stack and pass it through sha256, pushing the result onto the stack.";
      OpcodeDescriptionsCommon2["OP_HASH160"] = "Pop the top item from the stack and pass it through sha256, then ripemd160, pushing the result onto the stack.";
      OpcodeDescriptionsCommon2["OP_HASH256"] = "Pop the top item from the stack and pass it through sha256 twice, pushing the result onto the stack.";
      OpcodeDescriptionsCommon2["OP_CODESEPARATOR"] = "Update the value of lastCodeSeparator to the instruction pointer's current value. (This reduces the coverage of signing serializations used in signature verification operations.)";
      OpcodeDescriptionsCommon2["OP_CHECKSIG"] = "Pop the top two items from the stack. Treat the top as a signature and the second as a public key. If the signature is valid, push a Script Number 1, otherwise push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_CHECKSIGVERIFY"] = "Pop the top two items from the stack. Treat the top as a signature and the second as a public key. If the signature is not valid, error. (This operation is a combination of OP_CHECKSIG followed by OP_VERIFY.)";
      OpcodeDescriptionsCommon2["OP_CHECKMULTISIG"] = "Pop items from the stack: first pop the Script Number of public keys, then pop each of those public keys. Next, pop the Script Number of required signatures, then pop each of those signatures. Finally, pop a final Script Number which must be 0 due to a protocol bug. Checking each signature against each public key in order, if all signatures are valid \u2013 and the required number of signatures have been provided \u2013 push a Script Number 1, otherwise push a Script Number 0.";
      OpcodeDescriptionsCommon2["OP_CHECKMULTISIGVERIFY"] = "Pop items from the stack: first pop the Script Number of public keys, then pop each of those public keys. Next, pop the Script Number of required signatures, then pop each of those signatures. Finally, (due to a protocol bug) pop an unused final Script Number which must be 0. Checking each signature against each public key in order, if any signatures are invalid \u2013 or the required number of signatures have not been provided \u2013 error. (This operation is a combination of OP_CHECKMULTISIG followed by OP_VERIFY.)";
      OpcodeDescriptionsCommon2["OP_NOP1"] = "No operation (reserved for future expansion). Note: OP_NOP1 counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_CHECKLOCKTIMEVERIFY"] = "Verify the transaction occurs after an absolute block time or height: read the top item on the stack as a Script Number (without removing it), and compare it to the transaction's locktime. If the required locktime has not passed, or if locktime has been disabled for this input by a maximized sequence number, error.";
      OpcodeDescriptionsCommon2["OP_CHECKSEQUENCEVERIFY"] = `Verify the transaction occurs after the output being spent has "aged" by a relative block time or block height since it was created: read the top item on the stack as a Script Number (without removing it), and compare it to the age encoded in the input's sequence number. If the required relative locktime has not passed, or if relative locktime has been disabled by the sequence number or the transaction version, error.`;
      OpcodeDescriptionsCommon2["OP_NOP4"] = "No operation (reserved for future expansion). Note: OP_NOP4 counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_NOP6"] = "No operation (reserved for future expansion). Note: OP_NOP6 counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_NOP5"] = "No operation (reserved for future expansion). Note: OP_NOP5 counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_NOP7"] = "No operation (reserved for future expansion). Note: OP_NOP7 counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_NOP8"] = "No operation (reserved for future expansion). Note: OP_NOP8 counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_NOP9"] = "No operation (reserved for future expansion). Note: OP_NOP9 counts toward the opcode limit.";
      OpcodeDescriptionsCommon2["OP_NOP10"] = "No operation (reserved for future expansion). Note: OP_NOP10 counts toward the opcode limit.";
    })(OpcodeDescriptionsCommon || (OpcodeDescriptionsCommon = {}));
    var ConsensusCommon;
    (function(ConsensusCommon2) {
      ConsensusCommon2[ConsensusCommon2["maximumStackItemLength"] = 520] = "maximumStackItemLength";
      ConsensusCommon2[ConsensusCommon2["maximumScriptNumberLength"] = 4] = "maximumScriptNumberLength";
      ConsensusCommon2[ConsensusCommon2["maximumOperationCount"] = 201] = "maximumOperationCount";
      ConsensusCommon2[ConsensusCommon2["maximumBytecodeLength"] = 1e4] = "maximumBytecodeLength";
      ConsensusCommon2[ConsensusCommon2["maximumStackDepth"] = 1e3] = "maximumStackDepth";
    })(ConsensusCommon || (ConsensusCommon = {}));
    var AuthenticationErrorBCH;
    (function(AuthenticationErrorBCH2) {
      AuthenticationErrorBCH2["exceededMaximumOperationCount"] = "Program exceeded the maximum operation count (201 operations).";
      AuthenticationErrorBCH2["exceededMaximumStackItemLength"] = "Program attempted to push a stack item which exceeded the maximum stack item length (520 bytes).";
      AuthenticationErrorBCH2["exceededMaximumScriptNumberLength"] = "Program attempted an OP_BIN2NUM operation on a byte sequence which cannot be encoded within the maximum Script Number length (4 bytes).";
      AuthenticationErrorBCH2["divisionByZero"] = "Program attempted to divide a number by zero.";
      AuthenticationErrorBCH2["insufficientLength"] = "Program called an OP_NUM2BIN operation with an insufficient byte length to re-encode the provided number.";
      AuthenticationErrorBCH2["invalidSplitIndex"] = "Program called an OP_SPLIT operation with an invalid index.";
      AuthenticationErrorBCH2["malformedP2shBytecode"] = "Redeem bytecode was malformed prior to P2SH evaluation.";
      AuthenticationErrorBCH2["mismatchedBitwiseOperandLength"] = "Program attempted a bitwise operation on operands of different lengths.";
      AuthenticationErrorBCH2["requiresPushOnly"] = "Unlocking bytecode may contain only push operations.";
    })(AuthenticationErrorBCH || (AuthenticationErrorBCH = {}));
    var OpcodesBCH;
    (function(OpcodesBCH2) {
      OpcodesBCH2[OpcodesBCH2["OP_0"] = 0] = "OP_0";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_1"] = 1] = "OP_PUSHBYTES_1";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_2"] = 2] = "OP_PUSHBYTES_2";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_3"] = 3] = "OP_PUSHBYTES_3";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_4"] = 4] = "OP_PUSHBYTES_4";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_5"] = 5] = "OP_PUSHBYTES_5";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_6"] = 6] = "OP_PUSHBYTES_6";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_7"] = 7] = "OP_PUSHBYTES_7";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_8"] = 8] = "OP_PUSHBYTES_8";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_9"] = 9] = "OP_PUSHBYTES_9";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_10"] = 10] = "OP_PUSHBYTES_10";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_11"] = 11] = "OP_PUSHBYTES_11";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_12"] = 12] = "OP_PUSHBYTES_12";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_13"] = 13] = "OP_PUSHBYTES_13";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_14"] = 14] = "OP_PUSHBYTES_14";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_15"] = 15] = "OP_PUSHBYTES_15";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_16"] = 16] = "OP_PUSHBYTES_16";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_17"] = 17] = "OP_PUSHBYTES_17";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_18"] = 18] = "OP_PUSHBYTES_18";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_19"] = 19] = "OP_PUSHBYTES_19";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_20"] = 20] = "OP_PUSHBYTES_20";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_21"] = 21] = "OP_PUSHBYTES_21";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_22"] = 22] = "OP_PUSHBYTES_22";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_23"] = 23] = "OP_PUSHBYTES_23";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_24"] = 24] = "OP_PUSHBYTES_24";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_25"] = 25] = "OP_PUSHBYTES_25";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_26"] = 26] = "OP_PUSHBYTES_26";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_27"] = 27] = "OP_PUSHBYTES_27";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_28"] = 28] = "OP_PUSHBYTES_28";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_29"] = 29] = "OP_PUSHBYTES_29";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_30"] = 30] = "OP_PUSHBYTES_30";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_31"] = 31] = "OP_PUSHBYTES_31";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_32"] = 32] = "OP_PUSHBYTES_32";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_33"] = 33] = "OP_PUSHBYTES_33";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_34"] = 34] = "OP_PUSHBYTES_34";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_35"] = 35] = "OP_PUSHBYTES_35";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_36"] = 36] = "OP_PUSHBYTES_36";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_37"] = 37] = "OP_PUSHBYTES_37";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_38"] = 38] = "OP_PUSHBYTES_38";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_39"] = 39] = "OP_PUSHBYTES_39";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_40"] = 40] = "OP_PUSHBYTES_40";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_41"] = 41] = "OP_PUSHBYTES_41";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_42"] = 42] = "OP_PUSHBYTES_42";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_43"] = 43] = "OP_PUSHBYTES_43";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_44"] = 44] = "OP_PUSHBYTES_44";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_45"] = 45] = "OP_PUSHBYTES_45";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_46"] = 46] = "OP_PUSHBYTES_46";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_47"] = 47] = "OP_PUSHBYTES_47";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_48"] = 48] = "OP_PUSHBYTES_48";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_49"] = 49] = "OP_PUSHBYTES_49";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_50"] = 50] = "OP_PUSHBYTES_50";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_51"] = 51] = "OP_PUSHBYTES_51";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_52"] = 52] = "OP_PUSHBYTES_52";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_53"] = 53] = "OP_PUSHBYTES_53";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_54"] = 54] = "OP_PUSHBYTES_54";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_55"] = 55] = "OP_PUSHBYTES_55";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_56"] = 56] = "OP_PUSHBYTES_56";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_57"] = 57] = "OP_PUSHBYTES_57";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_58"] = 58] = "OP_PUSHBYTES_58";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_59"] = 59] = "OP_PUSHBYTES_59";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_60"] = 60] = "OP_PUSHBYTES_60";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_61"] = 61] = "OP_PUSHBYTES_61";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_62"] = 62] = "OP_PUSHBYTES_62";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_63"] = 63] = "OP_PUSHBYTES_63";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_64"] = 64] = "OP_PUSHBYTES_64";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_65"] = 65] = "OP_PUSHBYTES_65";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_66"] = 66] = "OP_PUSHBYTES_66";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_67"] = 67] = "OP_PUSHBYTES_67";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_68"] = 68] = "OP_PUSHBYTES_68";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_69"] = 69] = "OP_PUSHBYTES_69";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_70"] = 70] = "OP_PUSHBYTES_70";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_71"] = 71] = "OP_PUSHBYTES_71";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_72"] = 72] = "OP_PUSHBYTES_72";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_73"] = 73] = "OP_PUSHBYTES_73";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_74"] = 74] = "OP_PUSHBYTES_74";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHBYTES_75"] = 75] = "OP_PUSHBYTES_75";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHDATA_1"] = 76] = "OP_PUSHDATA_1";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHDATA_2"] = 77] = "OP_PUSHDATA_2";
      OpcodesBCH2[OpcodesBCH2["OP_PUSHDATA_4"] = 78] = "OP_PUSHDATA_4";
      OpcodesBCH2[OpcodesBCH2["OP_1NEGATE"] = 79] = "OP_1NEGATE";
      OpcodesBCH2[OpcodesBCH2["OP_RESERVED"] = 80] = "OP_RESERVED";
      OpcodesBCH2[OpcodesBCH2["OP_1"] = 81] = "OP_1";
      OpcodesBCH2[OpcodesBCH2["OP_2"] = 82] = "OP_2";
      OpcodesBCH2[OpcodesBCH2["OP_3"] = 83] = "OP_3";
      OpcodesBCH2[OpcodesBCH2["OP_4"] = 84] = "OP_4";
      OpcodesBCH2[OpcodesBCH2["OP_5"] = 85] = "OP_5";
      OpcodesBCH2[OpcodesBCH2["OP_6"] = 86] = "OP_6";
      OpcodesBCH2[OpcodesBCH2["OP_7"] = 87] = "OP_7";
      OpcodesBCH2[OpcodesBCH2["OP_8"] = 88] = "OP_8";
      OpcodesBCH2[OpcodesBCH2["OP_9"] = 89] = "OP_9";
      OpcodesBCH2[OpcodesBCH2["OP_10"] = 90] = "OP_10";
      OpcodesBCH2[OpcodesBCH2["OP_11"] = 91] = "OP_11";
      OpcodesBCH2[OpcodesBCH2["OP_12"] = 92] = "OP_12";
      OpcodesBCH2[OpcodesBCH2["OP_13"] = 93] = "OP_13";
      OpcodesBCH2[OpcodesBCH2["OP_14"] = 94] = "OP_14";
      OpcodesBCH2[OpcodesBCH2["OP_15"] = 95] = "OP_15";
      OpcodesBCH2[OpcodesBCH2["OP_16"] = 96] = "OP_16";
      OpcodesBCH2[OpcodesBCH2["OP_NOP"] = 97] = "OP_NOP";
      OpcodesBCH2[OpcodesBCH2["OP_VER"] = 98] = "OP_VER";
      OpcodesBCH2[OpcodesBCH2["OP_IF"] = 99] = "OP_IF";
      OpcodesBCH2[OpcodesBCH2["OP_NOTIF"] = 100] = "OP_NOTIF";
      OpcodesBCH2[OpcodesBCH2["OP_VERIF"] = 101] = "OP_VERIF";
      OpcodesBCH2[OpcodesBCH2["OP_VERNOTIF"] = 102] = "OP_VERNOTIF";
      OpcodesBCH2[OpcodesBCH2["OP_ELSE"] = 103] = "OP_ELSE";
      OpcodesBCH2[OpcodesBCH2["OP_ENDIF"] = 104] = "OP_ENDIF";
      OpcodesBCH2[OpcodesBCH2["OP_VERIFY"] = 105] = "OP_VERIFY";
      OpcodesBCH2[OpcodesBCH2["OP_RETURN"] = 106] = "OP_RETURN";
      OpcodesBCH2[OpcodesBCH2["OP_TOALTSTACK"] = 107] = "OP_TOALTSTACK";
      OpcodesBCH2[OpcodesBCH2["OP_FROMALTSTACK"] = 108] = "OP_FROMALTSTACK";
      OpcodesBCH2[OpcodesBCH2["OP_2DROP"] = 109] = "OP_2DROP";
      OpcodesBCH2[OpcodesBCH2["OP_2DUP"] = 110] = "OP_2DUP";
      OpcodesBCH2[OpcodesBCH2["OP_3DUP"] = 111] = "OP_3DUP";
      OpcodesBCH2[OpcodesBCH2["OP_2OVER"] = 112] = "OP_2OVER";
      OpcodesBCH2[OpcodesBCH2["OP_2ROT"] = 113] = "OP_2ROT";
      OpcodesBCH2[OpcodesBCH2["OP_2SWAP"] = 114] = "OP_2SWAP";
      OpcodesBCH2[OpcodesBCH2["OP_IFDUP"] = 115] = "OP_IFDUP";
      OpcodesBCH2[OpcodesBCH2["OP_DEPTH"] = 116] = "OP_DEPTH";
      OpcodesBCH2[OpcodesBCH2["OP_DROP"] = 117] = "OP_DROP";
      OpcodesBCH2[OpcodesBCH2["OP_DUP"] = 118] = "OP_DUP";
      OpcodesBCH2[OpcodesBCH2["OP_NIP"] = 119] = "OP_NIP";
      OpcodesBCH2[OpcodesBCH2["OP_OVER"] = 120] = "OP_OVER";
      OpcodesBCH2[OpcodesBCH2["OP_PICK"] = 121] = "OP_PICK";
      OpcodesBCH2[OpcodesBCH2["OP_ROLL"] = 122] = "OP_ROLL";
      OpcodesBCH2[OpcodesBCH2["OP_ROT"] = 123] = "OP_ROT";
      OpcodesBCH2[OpcodesBCH2["OP_SWAP"] = 124] = "OP_SWAP";
      OpcodesBCH2[OpcodesBCH2["OP_TUCK"] = 125] = "OP_TUCK";
      OpcodesBCH2[OpcodesBCH2["OP_CAT"] = 126] = "OP_CAT";
      OpcodesBCH2[OpcodesBCH2["OP_SPLIT"] = 127] = "OP_SPLIT";
      OpcodesBCH2[OpcodesBCH2["OP_NUM2BIN"] = 128] = "OP_NUM2BIN";
      OpcodesBCH2[OpcodesBCH2["OP_BIN2NUM"] = 129] = "OP_BIN2NUM";
      OpcodesBCH2[OpcodesBCH2["OP_SIZE"] = 130] = "OP_SIZE";
      OpcodesBCH2[OpcodesBCH2["OP_INVERT"] = 131] = "OP_INVERT";
      OpcodesBCH2[OpcodesBCH2["OP_AND"] = 132] = "OP_AND";
      OpcodesBCH2[OpcodesBCH2["OP_OR"] = 133] = "OP_OR";
      OpcodesBCH2[OpcodesBCH2["OP_XOR"] = 134] = "OP_XOR";
      OpcodesBCH2[OpcodesBCH2["OP_EQUAL"] = 135] = "OP_EQUAL";
      OpcodesBCH2[OpcodesBCH2["OP_EQUALVERIFY"] = 136] = "OP_EQUALVERIFY";
      OpcodesBCH2[OpcodesBCH2["OP_RESERVED1"] = 137] = "OP_RESERVED1";
      OpcodesBCH2[OpcodesBCH2["OP_RESERVED2"] = 138] = "OP_RESERVED2";
      OpcodesBCH2[OpcodesBCH2["OP_1ADD"] = 139] = "OP_1ADD";
      OpcodesBCH2[OpcodesBCH2["OP_1SUB"] = 140] = "OP_1SUB";
      OpcodesBCH2[OpcodesBCH2["OP_2MUL"] = 141] = "OP_2MUL";
      OpcodesBCH2[OpcodesBCH2["OP_2DIV"] = 142] = "OP_2DIV";
      OpcodesBCH2[OpcodesBCH2["OP_NEGATE"] = 143] = "OP_NEGATE";
      OpcodesBCH2[OpcodesBCH2["OP_ABS"] = 144] = "OP_ABS";
      OpcodesBCH2[OpcodesBCH2["OP_NOT"] = 145] = "OP_NOT";
      OpcodesBCH2[OpcodesBCH2["OP_0NOTEQUAL"] = 146] = "OP_0NOTEQUAL";
      OpcodesBCH2[OpcodesBCH2["OP_ADD"] = 147] = "OP_ADD";
      OpcodesBCH2[OpcodesBCH2["OP_SUB"] = 148] = "OP_SUB";
      OpcodesBCH2[OpcodesBCH2["OP_MUL"] = 149] = "OP_MUL";
      OpcodesBCH2[OpcodesBCH2["OP_DIV"] = 150] = "OP_DIV";
      OpcodesBCH2[OpcodesBCH2["OP_MOD"] = 151] = "OP_MOD";
      OpcodesBCH2[OpcodesBCH2["OP_LSHIFT"] = 152] = "OP_LSHIFT";
      OpcodesBCH2[OpcodesBCH2["OP_RSHIFT"] = 153] = "OP_RSHIFT";
      OpcodesBCH2[OpcodesBCH2["OP_BOOLAND"] = 154] = "OP_BOOLAND";
      OpcodesBCH2[OpcodesBCH2["OP_BOOLOR"] = 155] = "OP_BOOLOR";
      OpcodesBCH2[OpcodesBCH2["OP_NUMEQUAL"] = 156] = "OP_NUMEQUAL";
      OpcodesBCH2[OpcodesBCH2["OP_NUMEQUALVERIFY"] = 157] = "OP_NUMEQUALVERIFY";
      OpcodesBCH2[OpcodesBCH2["OP_NUMNOTEQUAL"] = 158] = "OP_NUMNOTEQUAL";
      OpcodesBCH2[OpcodesBCH2["OP_LESSTHAN"] = 159] = "OP_LESSTHAN";
      OpcodesBCH2[OpcodesBCH2["OP_GREATERTHAN"] = 160] = "OP_GREATERTHAN";
      OpcodesBCH2[OpcodesBCH2["OP_LESSTHANOREQUAL"] = 161] = "OP_LESSTHANOREQUAL";
      OpcodesBCH2[OpcodesBCH2["OP_GREATERTHANOREQUAL"] = 162] = "OP_GREATERTHANOREQUAL";
      OpcodesBCH2[OpcodesBCH2["OP_MIN"] = 163] = "OP_MIN";
      OpcodesBCH2[OpcodesBCH2["OP_MAX"] = 164] = "OP_MAX";
      OpcodesBCH2[OpcodesBCH2["OP_WITHIN"] = 165] = "OP_WITHIN";
      OpcodesBCH2[OpcodesBCH2["OP_RIPEMD160"] = 166] = "OP_RIPEMD160";
      OpcodesBCH2[OpcodesBCH2["OP_SHA1"] = 167] = "OP_SHA1";
      OpcodesBCH2[OpcodesBCH2["OP_SHA256"] = 168] = "OP_SHA256";
      OpcodesBCH2[OpcodesBCH2["OP_HASH160"] = 169] = "OP_HASH160";
      OpcodesBCH2[OpcodesBCH2["OP_HASH256"] = 170] = "OP_HASH256";
      OpcodesBCH2[OpcodesBCH2["OP_CODESEPARATOR"] = 171] = "OP_CODESEPARATOR";
      OpcodesBCH2[OpcodesBCH2["OP_CHECKSIG"] = 172] = "OP_CHECKSIG";
      OpcodesBCH2[OpcodesBCH2["OP_CHECKSIGVERIFY"] = 173] = "OP_CHECKSIGVERIFY";
      OpcodesBCH2[OpcodesBCH2["OP_CHECKMULTISIG"] = 174] = "OP_CHECKMULTISIG";
      OpcodesBCH2[OpcodesBCH2["OP_CHECKMULTISIGVERIFY"] = 175] = "OP_CHECKMULTISIGVERIFY";
      OpcodesBCH2[OpcodesBCH2["OP_NOP1"] = 176] = "OP_NOP1";
      OpcodesBCH2[OpcodesBCH2["OP_CHECKLOCKTIMEVERIFY"] = 177] = "OP_CHECKLOCKTIMEVERIFY";
      OpcodesBCH2[OpcodesBCH2["OP_CHECKSEQUENCEVERIFY"] = 178] = "OP_CHECKSEQUENCEVERIFY";
      OpcodesBCH2[OpcodesBCH2["OP_NOP4"] = 179] = "OP_NOP4";
      OpcodesBCH2[OpcodesBCH2["OP_NOP5"] = 180] = "OP_NOP5";
      OpcodesBCH2[OpcodesBCH2["OP_NOP6"] = 181] = "OP_NOP6";
      OpcodesBCH2[OpcodesBCH2["OP_NOP7"] = 182] = "OP_NOP7";
      OpcodesBCH2[OpcodesBCH2["OP_NOP8"] = 183] = "OP_NOP8";
      OpcodesBCH2[OpcodesBCH2["OP_NOP9"] = 184] = "OP_NOP9";
      OpcodesBCH2[OpcodesBCH2["OP_NOP10"] = 185] = "OP_NOP10";
      OpcodesBCH2[OpcodesBCH2["OP_CHECKDATASIG"] = 186] = "OP_CHECKDATASIG";
      OpcodesBCH2[OpcodesBCH2["OP_CHECKDATASIGVERIFY"] = 187] = "OP_CHECKDATASIGVERIFY";
      OpcodesBCH2[OpcodesBCH2["OP_REVERSEBYTES"] = 188] = "OP_REVERSEBYTES";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN189"] = 189] = "OP_UNKNOWN189";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN190"] = 190] = "OP_UNKNOWN190";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN191"] = 191] = "OP_UNKNOWN191";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN192"] = 192] = "OP_UNKNOWN192";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN193"] = 193] = "OP_UNKNOWN193";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN194"] = 194] = "OP_UNKNOWN194";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN195"] = 195] = "OP_UNKNOWN195";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN196"] = 196] = "OP_UNKNOWN196";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN197"] = 197] = "OP_UNKNOWN197";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN198"] = 198] = "OP_UNKNOWN198";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN199"] = 199] = "OP_UNKNOWN199";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN200"] = 200] = "OP_UNKNOWN200";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN201"] = 201] = "OP_UNKNOWN201";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN202"] = 202] = "OP_UNKNOWN202";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN203"] = 203] = "OP_UNKNOWN203";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN204"] = 204] = "OP_UNKNOWN204";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN205"] = 205] = "OP_UNKNOWN205";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN206"] = 206] = "OP_UNKNOWN206";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN207"] = 207] = "OP_UNKNOWN207";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN208"] = 208] = "OP_UNKNOWN208";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN209"] = 209] = "OP_UNKNOWN209";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN210"] = 210] = "OP_UNKNOWN210";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN211"] = 211] = "OP_UNKNOWN211";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN212"] = 212] = "OP_UNKNOWN212";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN213"] = 213] = "OP_UNKNOWN213";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN214"] = 214] = "OP_UNKNOWN214";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN215"] = 215] = "OP_UNKNOWN215";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN216"] = 216] = "OP_UNKNOWN216";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN217"] = 217] = "OP_UNKNOWN217";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN218"] = 218] = "OP_UNKNOWN218";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN219"] = 219] = "OP_UNKNOWN219";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN220"] = 220] = "OP_UNKNOWN220";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN221"] = 221] = "OP_UNKNOWN221";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN222"] = 222] = "OP_UNKNOWN222";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN223"] = 223] = "OP_UNKNOWN223";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN224"] = 224] = "OP_UNKNOWN224";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN225"] = 225] = "OP_UNKNOWN225";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN226"] = 226] = "OP_UNKNOWN226";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN227"] = 227] = "OP_UNKNOWN227";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN228"] = 228] = "OP_UNKNOWN228";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN229"] = 229] = "OP_UNKNOWN229";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN230"] = 230] = "OP_UNKNOWN230";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN231"] = 231] = "OP_UNKNOWN231";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN232"] = 232] = "OP_UNKNOWN232";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN233"] = 233] = "OP_UNKNOWN233";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN234"] = 234] = "OP_UNKNOWN234";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN235"] = 235] = "OP_UNKNOWN235";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN236"] = 236] = "OP_UNKNOWN236";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN237"] = 237] = "OP_UNKNOWN237";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN238"] = 238] = "OP_UNKNOWN238";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN239"] = 239] = "OP_UNKNOWN239";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN240"] = 240] = "OP_UNKNOWN240";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN241"] = 241] = "OP_UNKNOWN241";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN242"] = 242] = "OP_UNKNOWN242";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN243"] = 243] = "OP_UNKNOWN243";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN244"] = 244] = "OP_UNKNOWN244";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN245"] = 245] = "OP_UNKNOWN245";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN246"] = 246] = "OP_UNKNOWN246";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN247"] = 247] = "OP_UNKNOWN247";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN248"] = 248] = "OP_UNKNOWN248";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN249"] = 249] = "OP_UNKNOWN249";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN250"] = 250] = "OP_UNKNOWN250";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN251"] = 251] = "OP_UNKNOWN251";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN252"] = 252] = "OP_UNKNOWN252";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN253"] = 253] = "OP_UNKNOWN253";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN254"] = 254] = "OP_UNKNOWN254";
      OpcodesBCH2[OpcodesBCH2["OP_UNKNOWN255"] = 255] = "OP_UNKNOWN255";
    })(OpcodesBCH || (OpcodesBCH = {}));
    var OpcodeAlternateNamesBCH;
    (function(OpcodeAlternateNamesBCH2) {
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_FALSE"] = 0] = "OP_FALSE";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_PUSHBYTES_0"] = 0] = "OP_PUSHBYTES_0";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_TRUE"] = 81] = "OP_TRUE";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_NOP2"] = 177] = "OP_NOP2";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_NOP3"] = 178] = "OP_NOP3";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_UNKNOWN186"] = 186] = "OP_UNKNOWN186";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_UNKNOWN187"] = 187] = "OP_UNKNOWN187";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["FIRST_UNDEFINED_OP_VALUE"] = 189] = "FIRST_UNDEFINED_OP_VALUE";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_PREFIX_BEGIN"] = 240] = "OP_PREFIX_BEGIN";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_PREFIX_END"] = 247] = "OP_PREFIX_END";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_SMALLINTEGER"] = 250] = "OP_SMALLINTEGER";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_PUBKEYS"] = 251] = "OP_PUBKEYS";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_PUBKEYHASH"] = 253] = "OP_PUBKEYHASH";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_PUBKEY"] = 254] = "OP_PUBKEY";
      OpcodeAlternateNamesBCH2[OpcodeAlternateNamesBCH2["OP_INVALIDOPCODE"] = 255] = "OP_INVALIDOPCODE";
    })(OpcodeAlternateNamesBCH || (OpcodeAlternateNamesBCH = {}));
    var Constants;
    (function(Constants2) {
      Constants2[Constants2["positiveSign"] = 0] = "positiveSign";
      Constants2[Constants2["negativeSign"] = 128] = "negativeSign";
    })(Constants || (Constants = {}));
    var InstructionSetBCH;
    (function(InstructionSetBCH2) {
      InstructionSetBCH2["BCH_2019_05"] = "BCH_2019_05";
      InstructionSetBCH2["BCH_2019_05_STRICT"] = "BCH_2019_05_STRICT";
      InstructionSetBCH2["BCH_2019_11"] = "BCH_2019_11";
      InstructionSetBCH2["BCH_2019_11_STRICT"] = "BCH_2019_11_STRICT";
      InstructionSetBCH2["BCH_2020_05"] = "BCH_2020_05";
      InstructionSetBCH2["BCH_2020_05_STRICT"] = "BCH_2020_05_STRICT";
      InstructionSetBCH2["BCH_2020_11_SPEC"] = "BCH_2020_11";
      InstructionSetBCH2["BCH_2020_11_STRICT_SPEC"] = "BCH_2020_11_STRICT";
      InstructionSetBCH2["BCH_2021_05_SPEC"] = "BCH_2021_05";
      InstructionSetBCH2["BCH_2021_05_STRICT_SPEC"] = "BCH_2021_05_STRICT";
      InstructionSetBCH2["BCH_2021_11_SPEC"] = "BCH_2021_11";
      InstructionSetBCH2["BCH_2021_11_STRICT_SPEC"] = "BCH_2021_11_STRICT";
      InstructionSetBCH2["BCH_2022_05_SPEC"] = "BCH_2022_05";
      InstructionSetBCH2["BCH_2022_05_STRICT_SPEC"] = "BCH_2022_05_STRICT";
      InstructionSetBCH2["BCH_2022_11_SPEC"] = "BCH_2022_11";
      InstructionSetBCH2["BCH_2022_11_STRICT_SPEC"] = "BCH_2022_11_STRICT";
    })(InstructionSetBCH || (InstructionSetBCH = {}));
    InstructionSetBCH.BCH_2020_05_STRICT;
    var OpcodeDescriptionsUniqueBCH;
    (function(OpcodeDescriptionsUniqueBCH2) {
      OpcodeDescriptionsUniqueBCH2["OP_CAT"] = "Pop the top 2 items from the stack and concatenate them, pushing the result.";
      OpcodeDescriptionsUniqueBCH2["OP_SPLIT"] = "Pop the top item from the stack as an index (Script Number) and the next item as a byte array. Split the byte array into two stack items at the index (zero-based), pushing the results.";
      OpcodeDescriptionsUniqueBCH2["OP_NUM2BIN"] = "Pop the top item from the stack as an item length (Script Number) and the next item as a Script Number (without encoding restrictions). Re-encode the number using a byte array of the provided length, filling any unused bytes with zeros. (If the requested length is too short to encode the number, error.)";
      OpcodeDescriptionsUniqueBCH2["OP_BIN2NUM"] = "Pop the top item from the stack as a Script Number without encoding restrictions. Minimally-encode the number and push the result. (If the number can't be encoded in 4 bytes or less, error.)";
      OpcodeDescriptionsUniqueBCH2["OP_AND"] = "Pop the top 2 items from the stack and perform a bitwise AND on each byte, pushing the result. If the length of the items are not equal, error.";
      OpcodeDescriptionsUniqueBCH2["OP_OR"] = "Pop the top 2 items from the stack and perform a bitwise OR on each byte, pushing the result. If the length of the items are not equal, error.";
      OpcodeDescriptionsUniqueBCH2["OP_XOR"] = "Pop the top 2 items from the stack and perform a bitwise XOR on each byte, pushing the result. If the length of the items are not equal, error.";
      OpcodeDescriptionsUniqueBCH2["OP_DIV"] = "Pop the top item from the stack as a denominator (Script Number) and the next as a numerator (Script Number). Divide and push the result to the stack.";
      OpcodeDescriptionsUniqueBCH2["OP_MOD"] = "Pop the top item from the stack as a denominator (Script Number) and the next as a numerator (Script Number). Divide and push the remainder to the stack.";
      OpcodeDescriptionsUniqueBCH2["OP_CHECKDATASIG"] = "Pop the top 3 items from the stack. Treat the top as a public key, the second as a message, and the third as a signature. If the signature is valid, push a Script Number 1, otherwise push a Script Number 0.";
      OpcodeDescriptionsUniqueBCH2["OP_CHECKDATASIGVERIFY"] = "Pop the top 3 items from the stack. Treat the top as a public key, the second as a message, and the third as a signature. If the signature is not valid, error. (This operation is a combination of OP_CHECKDATASIG followed by OP_VERIFY.)";
      OpcodeDescriptionsUniqueBCH2["OP_REVERSEBYTES"] = "Pop the top item from the stack and reverse it, pushing the result.";
    })(OpcodeDescriptionsUniqueBCH || (OpcodeDescriptionsUniqueBCH = {}));
    ({
      ...OpcodeDescriptionsCommon,
      ...OpcodeDescriptionsUniqueBCH
    });
    Object.entries(generateBytecodeMap(OpcodesBCH)).reduce((acc, cur) => ({ ...acc, [cur[0].slice("OP_".length)]: cur[1] }), {
      PUSHDATA1: Uint8Array.of(OpcodesBCH.OP_PUSHDATA_1),
      PUSHDATA2: Uint8Array.of(OpcodesBCH.OP_PUSHDATA_2),
      PUSHDATA4: Uint8Array.of(OpcodesBCH.OP_PUSHDATA_4)
    });
    var WalletImportFormatError;
    (function(WalletImportFormatError2) {
      WalletImportFormatError2["incorrectLength"] = "The WIF private key payload is not the correct length.";
    })(WalletImportFormatError || (WalletImportFormatError = {}));
    var SigningSerializationAlgorithmIdentifier;
    (function(SigningSerializationAlgorithmIdentifier2) {
      SigningSerializationAlgorithmIdentifier2["allOutputs"] = "all_outputs";
      SigningSerializationAlgorithmIdentifier2["allOutputsSingleInput"] = "all_outputs_single_input";
      SigningSerializationAlgorithmIdentifier2["correspondingOutput"] = "corresponding_output";
      SigningSerializationAlgorithmIdentifier2["correspondingOutputSingleInput"] = "corresponding_output_single_input";
      SigningSerializationAlgorithmIdentifier2["noOutputs"] = "no_outputs";
      SigningSerializationAlgorithmIdentifier2["noOutputsSingleInput"] = "no_outputs_single_input";
    })(SigningSerializationAlgorithmIdentifier || (SigningSerializationAlgorithmIdentifier = {}));
    const getSigningSerializationType = (algorithmIdentifier, prefix = "") => {
      switch (algorithmIdentifier) {
        case `${prefix}${SigningSerializationAlgorithmIdentifier.allOutputs}`:
          return Uint8Array.of(SigningSerializationFlag.allOutputs | SigningSerializationFlag.forkId);
        case `${prefix}${SigningSerializationAlgorithmIdentifier.allOutputsSingleInput}`:
          return Uint8Array.of(SigningSerializationFlag.allOutputs | SigningSerializationFlag.singleInput | SigningSerializationFlag.forkId);
        case `${prefix}${SigningSerializationAlgorithmIdentifier.correspondingOutput}`:
          return Uint8Array.of(SigningSerializationFlag.correspondingOutput | SigningSerializationFlag.forkId);
        case `${prefix}${SigningSerializationAlgorithmIdentifier.correspondingOutputSingleInput}`:
          return Uint8Array.of(SigningSerializationFlag.correspondingOutput | SigningSerializationFlag.singleInput | SigningSerializationFlag.forkId);
        case `${prefix}${SigningSerializationAlgorithmIdentifier.noOutputs}`:
          return Uint8Array.of(SigningSerializationFlag.noOutputs | SigningSerializationFlag.forkId);
        case `${prefix}${SigningSerializationAlgorithmIdentifier.noOutputsSingleInput}`:
          return Uint8Array.of(SigningSerializationFlag.noOutputs | SigningSerializationFlag.singleInput | SigningSerializationFlag.forkId);
        default:
          return void 0;
      }
    };
    const compilerOperationHelperComputeSignatureBCH = ({ coveredBytecode, identifier, transactionContext, operationName, privateKey, sha256: sha2562, sign }) => {
      const [, , algorithm, unknown] = identifier.split(".");
      if (unknown !== void 0) {
        return {
          error: `Unknown component in "${identifier}" \u2013 the fragment "${unknown}" is not recognized.`,
          status: "error"
        };
      }
      if (algorithm === void 0) {
        return {
          error: `Invalid signature identifier. Signatures must be of the form: "[variable_id].${operationName}.[signing_serialization_type]".`,
          status: "error"
        };
      }
      const signingSerializationType = getSigningSerializationType(algorithm);
      if (signingSerializationType === void 0) {
        return {
          error: `Unknown signing serialization algorithm, "${algorithm}".`,
          status: "error"
        };
      }
      const serialization = generateSigningSerializationBCH({
        correspondingOutput: transactionContext.correspondingOutput,
        coveredBytecode,
        locktime: transactionContext.locktime,
        outpointIndex: transactionContext.outpointIndex,
        outpointTransactionHash: transactionContext.outpointTransactionHash,
        outputValue: transactionContext.outputValue,
        sequenceNumber: transactionContext.sequenceNumber,
        sha256: sha2562,
        signingSerializationType,
        transactionOutpoints: transactionContext.transactionOutpoints,
        transactionOutputs: transactionContext.transactionOutputs,
        transactionSequenceNumbers: transactionContext.transactionSequenceNumbers,
        version: transactionContext.version
      });
      const digest = sha2562.hash(sha2562.hash(serialization));
      const bitcoinEncodedSignature = Uint8Array.from([
        ...sign(privateKey, digest),
        ...signingSerializationType
      ]);
      return {
        bytecode: bitcoinEncodedSignature,
        signature: { serialization },
        status: "success"
      };
    };
    const compilerOperationHelperHdKeySignatureBCH = ({ operationName, secp256k1Method }) => attemptCompilerOperations([compilerOperationAttemptBytecodeResolution], compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["hdKeys", "transactionContext"],
      environmentProperties: [
        "entityOwnership",
        "ripemd160",
        "secp256k1",
        "sha256",
        "sha512",
        "variables",
        "sourceScriptIds",
        "unlockingScripts"
      ],
      operation: (identifier, data, environment) => {
        const { hdKeys, transactionContext } = data;
        const { secp256k1, sha256: sha2562, sourceScriptIds, unlockingScripts } = environment;
        const derivationResult = compilerOperationHelperDeriveHdKeyPrivate({
          environment,
          hdKeys,
          identifier
        });
        if (derivationResult.status === "error")
          return derivationResult;
        const result = compilerOperationHelperGenerateCoveredBytecode({
          data,
          environment,
          identifier,
          sourceScriptIds,
          unlockingScripts
        });
        if ("error" in result) {
          return result;
        }
        return compilerOperationHelperComputeSignatureBCH({
          coveredBytecode: result,
          identifier,
          operationName,
          privateKey: derivationResult.bytecode,
          sha256: sha2562,
          sign: secp256k1[secp256k1Method],
          transactionContext
        });
      }
    }));
    const compilerOperationHdKeyEcdsaSignatureBCH = compilerOperationHelperHdKeySignatureBCH({
      operationName: "signature",
      secp256k1Method: "signMessageHashDER"
    });
    const compilerOperationHdKeySchnorrSignatureBCH = compilerOperationHelperHdKeySignatureBCH({
      operationName: "schnorr_signature",
      secp256k1Method: "signMessageHashSchnorr"
    });
    const compilerOperationHelperKeySignatureBCH = ({ operationName, secp256k1Method }) => attemptCompilerOperations([compilerOperationAttemptBytecodeResolution], compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["keys", "transactionContext"],
      environmentProperties: [
        "sha256",
        "secp256k1",
        "unlockingScripts",
        "sourceScriptIds"
      ],
      operation: (identifier, data, environment) => {
        const { keys, transactionContext } = data;
        const { secp256k1, sha256: sha2562, unlockingScripts, sourceScriptIds } = environment;
        const { privateKeys } = keys;
        const [variableId] = identifier.split(".");
        const privateKey = privateKeys === void 0 ? void 0 : privateKeys[variableId];
        if (privateKey === void 0) {
          return {
            error: `Identifier "${identifier}" refers to a Key, but a private key for "${variableId}" (or an existing signature) was not provided in the compilation data.`,
            recoverable: true,
            status: "error"
          };
        }
        const result = compilerOperationHelperGenerateCoveredBytecode({
          data,
          environment,
          identifier,
          sourceScriptIds,
          unlockingScripts
        });
        if ("error" in result) {
          return result;
        }
        return compilerOperationHelperComputeSignatureBCH({
          coveredBytecode: result,
          identifier,
          operationName,
          privateKey,
          sha256: sha2562,
          sign: secp256k1[secp256k1Method],
          transactionContext
        });
      }
    }));
    const compilerOperationKeyEcdsaSignatureBCH = compilerOperationHelperKeySignatureBCH({
      operationName: "signature",
      secp256k1Method: "signMessageHashDER"
    });
    const compilerOperationKeySchnorrSignatureBCH = compilerOperationHelperKeySignatureBCH({
      operationName: "schnorr_signature",
      secp256k1Method: "signMessageHashSchnorr"
    });
    const compilerOperationHelperComputeDataSignatureBCH = ({ data, environment, identifier, operationName, privateKey, sha256: sha2562, sign }) => {
      const [, , scriptId, unknown] = identifier.split(".");
      if (unknown !== void 0) {
        return {
          error: `Unknown component in "${identifier}" \u2013 the fragment "${unknown}" is not recognized.`,
          status: "error"
        };
      }
      if (scriptId === void 0) {
        return {
          error: `Invalid data signature identifier. Data signatures must be of the form: "[variable_id].${operationName}.[target_script_id]".`,
          status: "error"
        };
      }
      const result = compilerOperationHelperCompileScript({
        data,
        environment,
        targetScriptId: scriptId
      });
      if (result === false) {
        return {
          error: `Data signature tried to sign an unknown target script, "${scriptId}".`,
          status: "error"
        };
      }
      if ("error" in result) {
        return result;
      }
      const digest = sha2562.hash(result);
      return {
        bytecode: sign(privateKey, digest),
        signature: { message: result },
        status: "success"
      };
    };
    const compilerOperationHelperKeyDataSignatureBCH = ({ operationName, secp256k1Method }) => attemptCompilerOperations([compilerOperationAttemptBytecodeResolution], compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["keys"],
      environmentProperties: ["sha256", "secp256k1"],
      operation: (identifier, data, environment) => {
        const { keys } = data;
        const { secp256k1, sha256: sha2562 } = environment;
        const { privateKeys } = keys;
        const [variableId] = identifier.split(".");
        const privateKey = privateKeys === void 0 ? void 0 : privateKeys[variableId];
        if (privateKey === void 0) {
          return {
            error: `Identifier "${identifier}" refers to a Key, but a private key for "${variableId}" (or an existing signature) was not provided in the compilation data.`,
            recoverable: true,
            status: "error"
          };
        }
        return compilerOperationHelperComputeDataSignatureBCH({
          data,
          environment,
          identifier,
          operationName,
          privateKey,
          sha256: sha2562,
          sign: secp256k1[secp256k1Method]
        });
      }
    }));
    const compilerOperationKeyEcdsaDataSignatureBCH = compilerOperationHelperKeyDataSignatureBCH({
      operationName: "data_signature",
      secp256k1Method: "signMessageHashDER"
    });
    const compilerOperationKeySchnorrDataSignatureBCH = compilerOperationHelperKeyDataSignatureBCH({
      operationName: "schnorr_data_signature",
      secp256k1Method: "signMessageHashSchnorr"
    });
    const compilerOperationHelperHdKeyDataSignatureBCH = ({ operationName, secp256k1Method }) => attemptCompilerOperations([compilerOperationAttemptBytecodeResolution], compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["hdKeys"],
      environmentProperties: [
        "entityOwnership",
        "ripemd160",
        "secp256k1",
        "sha256",
        "sha512",
        "variables"
      ],
      operation: (identifier, data, environment) => {
        const { hdKeys } = data;
        const { secp256k1, sha256: sha2562 } = environment;
        const derivationResult = compilerOperationHelperDeriveHdKeyPrivate({
          environment,
          hdKeys,
          identifier
        });
        if (derivationResult.status === "error")
          return derivationResult;
        return compilerOperationHelperComputeDataSignatureBCH({
          data,
          environment,
          identifier,
          operationName,
          privateKey: derivationResult.bytecode,
          sha256: sha2562,
          sign: secp256k1[secp256k1Method]
        });
      }
    }));
    const compilerOperationHdKeyEcdsaDataSignatureBCH = compilerOperationHelperHdKeyDataSignatureBCH({
      operationName: "data_signature",
      secp256k1Method: "signMessageHashDER"
    });
    const compilerOperationHdKeySchnorrDataSignatureBCH = compilerOperationHelperHdKeyDataSignatureBCH({
      operationName: "schnorr_data_signature",
      secp256k1Method: "signMessageHashSchnorr"
    });
    const compilerOperationSigningSerializationFullBCH = compilerOperationRequires({
      canBeSkipped: false,
      dataProperties: ["transactionContext"],
      environmentProperties: ["sha256", "sourceScriptIds", "unlockingScripts"],
      operation: (identifier, data, environment) => {
        const [, algorithmOrComponent, unknownPart] = identifier.split(".");
        if (algorithmOrComponent === void 0) {
          return {
            error: `Invalid signing serialization operation. Include the desired component or algorithm, e.g. "signing_serialization.version".`,
            status: "error"
          };
        }
        if (unknownPart !== void 0) {
          return {
            error: `Unknown component in "${identifier}" \u2013 the fragment "${unknownPart}" is not recognized.`,
            status: "error"
          };
        }
        const signingSerializationType = getSigningSerializationType(algorithmOrComponent, "full_");
        if (signingSerializationType === void 0) {
          return {
            error: `Unknown signing serialization algorithm, "${algorithmOrComponent}".`,
            status: "error"
          };
        }
        const { sha256: sha2562, sourceScriptIds, unlockingScripts } = environment;
        const result = compilerOperationHelperGenerateCoveredBytecode({
          data,
          environment,
          identifier,
          sourceScriptIds,
          unlockingScripts
        });
        if ("error" in result) {
          return result;
        }
        const { transactionContext } = data;
        return {
          bytecode: generateSigningSerializationBCH({
            correspondingOutput: transactionContext.correspondingOutput,
            coveredBytecode: result,
            locktime: transactionContext.locktime,
            outpointIndex: transactionContext.outpointIndex,
            outpointTransactionHash: transactionContext.outpointTransactionHash,
            outputValue: transactionContext.outputValue,
            sequenceNumber: transactionContext.sequenceNumber,
            sha256: sha2562,
            signingSerializationType,
            transactionOutpoints: transactionContext.transactionOutpoints,
            transactionOutputs: transactionContext.transactionOutputs,
            transactionSequenceNumbers: transactionContext.transactionSequenceNumbers,
            version: transactionContext.version
          }),
          status: "success"
        };
      }
    });
    ({
      ...compilerOperationsCommon,
      hdKey: {
        data_signature: compilerOperationHdKeyEcdsaDataSignatureBCH,
        public_key: compilerOperationsCommon.hdKey.public_key,
        schnorr_data_signature: compilerOperationHdKeySchnorrDataSignatureBCH,
        schnorr_signature: compilerOperationHdKeySchnorrSignatureBCH,
        signature: compilerOperationHdKeyEcdsaSignatureBCH
      },
      key: {
        data_signature: compilerOperationKeyEcdsaDataSignatureBCH,
        public_key: compilerOperationsCommon.key.public_key,
        schnorr_data_signature: compilerOperationKeySchnorrDataSignatureBCH,
        schnorr_signature: compilerOperationKeySchnorrSignatureBCH,
        signature: compilerOperationKeyEcdsaSignatureBCH
      },
      signingSerialization: {
        ...compilerOperationsCommon.signingSerialization,
        full_all_outputs: compilerOperationSigningSerializationFullBCH,
        full_all_outputs_single_input: compilerOperationSigningSerializationFullBCH,
        full_corresponding_output: compilerOperationSigningSerializationFullBCH,
        full_corresponding_output_single_input: compilerOperationSigningSerializationFullBCH,
        full_no_outputs: compilerOperationSigningSerializationFullBCH,
        full_no_outputs_single_input: compilerOperationSigningSerializationFullBCH
      }
    });
    var sha256Uint8array = {};
    Object.defineProperty(sha256Uint8array, "__esModule", { value: true });
    sha256Uint8array.Hash = createHash_1 = sha256Uint8array.createHash = void 0;
    const K = [
      1116352408 | 0,
      1899447441 | 0,
      3049323471 | 0,
      3921009573 | 0,
      961987163 | 0,
      1508970993 | 0,
      2453635748 | 0,
      2870763221 | 0,
      3624381080 | 0,
      310598401 | 0,
      607225278 | 0,
      1426881987 | 0,
      1925078388 | 0,
      2162078206 | 0,
      2614888103 | 0,
      3248222580 | 0,
      3835390401 | 0,
      4022224774 | 0,
      264347078 | 0,
      604807628 | 0,
      770255983 | 0,
      1249150122 | 0,
      1555081692 | 0,
      1996064986 | 0,
      2554220882 | 0,
      2821834349 | 0,
      2952996808 | 0,
      3210313671 | 0,
      3336571891 | 0,
      3584528711 | 0,
      113926993 | 0,
      338241895 | 0,
      666307205 | 0,
      773529912 | 0,
      1294757372 | 0,
      1396182291 | 0,
      1695183700 | 0,
      1986661051 | 0,
      2177026350 | 0,
      2456956037 | 0,
      2730485921 | 0,
      2820302411 | 0,
      3259730800 | 0,
      3345764771 | 0,
      3516065817 | 0,
      3600352804 | 0,
      4094571909 | 0,
      275423344 | 0,
      430227734 | 0,
      506948616 | 0,
      659060556 | 0,
      883997877 | 0,
      958139571 | 0,
      1322822218 | 0,
      1537002063 | 0,
      1747873779 | 0,
      1955562222 | 0,
      2024104815 | 0,
      2227730452 | 0,
      2361852424 | 0,
      2428436474 | 0,
      2756734187 | 0,
      3204031479 | 0,
      3329325298 | 0
    ];
    const algorithms = {
      sha256: 1
    };
    function createHash(algorithm) {
      if (algorithm && !algorithms[algorithm] && !algorithms[algorithm.toLowerCase()]) {
        throw new Error("Digest method not supported");
      }
      return new Hash();
    }
    var createHash_1 = sha256Uint8array.createHash = createHash;
    class Hash {
      constructor() {
        this.A = 1779033703 | 0;
        this.B = 3144134277 | 0;
        this.C = 1013904242 | 0;
        this.D = 2773480762 | 0;
        this.E = 1359893119 | 0;
        this.F = 2600822924 | 0;
        this.G = 528734635 | 0;
        this.H = 1541459225 | 0;
        this._size = 0;
        this._sp = 0;
        if (!sharedBuffer || sharedOffset >= 8e3) {
          sharedBuffer = new ArrayBuffer(8e3);
          sharedOffset = 0;
        }
        this._byte = new Uint8Array(sharedBuffer, sharedOffset, 80);
        this._word = new Int32Array(sharedBuffer, sharedOffset, 20);
        sharedOffset += 80;
      }
      update(data) {
        if (typeof data === "string") {
          return this._utf8(data);
        }
        if (data == null) {
          throw new TypeError("Invalid type: " + typeof data);
        }
        const byteOffset = data.byteOffset;
        const length = data.byteLength;
        let blocks = length / 64 | 0;
        let offset = 0;
        if (blocks && !(byteOffset & 3) && !(this._size % 64)) {
          const block = new Int32Array(data.buffer, byteOffset, blocks * 16);
          while (blocks--) {
            this._int32(block, offset >> 2);
            offset += 64;
          }
          this._size += offset;
        }
        const BYTES_PER_ELEMENT = data.BYTES_PER_ELEMENT;
        if (BYTES_PER_ELEMENT !== 1 && data.buffer) {
          const rest = new Uint8Array(data.buffer, byteOffset + offset, length - offset);
          return this._uint8(rest);
        }
        if (offset === length)
          return this;
        return this._uint8(data, offset);
      }
      _uint8(data, offset) {
        const { _byte, _word } = this;
        const length = data.length;
        offset = offset | 0;
        while (offset < length) {
          const start = this._size % 64;
          let index2 = start;
          while (offset < length && index2 < 64) {
            _byte[index2++] = data[offset++];
          }
          if (index2 >= 64) {
            this._int32(_word);
          }
          this._size += index2 - start;
        }
        return this;
      }
      _utf8(text) {
        const { _byte, _word } = this;
        const length = text.length;
        let surrogate = this._sp;
        for (let offset = 0; offset < length; ) {
          const start = this._size % 64;
          let index2 = start;
          while (offset < length && index2 < 64) {
            let code = text.charCodeAt(offset++) | 0;
            if (code < 128) {
              _byte[index2++] = code;
            } else if (code < 2048) {
              _byte[index2++] = 192 | code >>> 6;
              _byte[index2++] = 128 | code & 63;
            } else if (code < 55296 || code > 57343) {
              _byte[index2++] = 224 | code >>> 12;
              _byte[index2++] = 128 | code >>> 6 & 63;
              _byte[index2++] = 128 | code & 63;
            } else if (surrogate) {
              code = ((surrogate & 1023) << 10) + (code & 1023) + 65536;
              _byte[index2++] = 240 | code >>> 18;
              _byte[index2++] = 128 | code >>> 12 & 63;
              _byte[index2++] = 128 | code >>> 6 & 63;
              _byte[index2++] = 128 | code & 63;
              surrogate = 0;
            } else {
              surrogate = code;
            }
          }
          if (index2 >= 64) {
            this._int32(_word);
            _word[0] = _word[16];
          }
          this._size += index2 - start;
        }
        this._sp = surrogate;
        return this;
      }
      _int32(data, offset) {
        let { A, B, C, D, E, F, G, H } = this;
        let i = 0;
        offset = offset | 0;
        while (i < 16) {
          W[i++] = swap32(data[offset++]);
        }
        for (i = 16; i < 64; i++) {
          W[i] = gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16] | 0;
        }
        for (i = 0; i < 64; i++) {
          const T1 = H + sigma1(E) + ch(E, F, G) + K[i] + W[i] | 0;
          const T2 = sigma0(A) + maj(A, B, C) | 0;
          H = G;
          G = F;
          F = E;
          E = D + T1 | 0;
          D = C;
          C = B;
          B = A;
          A = T1 + T2 | 0;
        }
        this.A = A + this.A | 0;
        this.B = B + this.B | 0;
        this.C = C + this.C | 0;
        this.D = D + this.D | 0;
        this.E = E + this.E | 0;
        this.F = F + this.F | 0;
        this.G = G + this.G | 0;
        this.H = H + this.H | 0;
      }
      digest(encoding) {
        const { _byte, _word } = this;
        let i = this._size % 64 | 0;
        _byte[i++] = 128;
        while (i & 3) {
          _byte[i++] = 0;
        }
        i >>= 2;
        if (i > 14) {
          while (i < 16) {
            _word[i++] = 0;
          }
          i = 0;
          this._int32(_word);
        }
        while (i < 16) {
          _word[i++] = 0;
        }
        const bits64 = this._size * 8;
        const low32 = (bits64 & 4294967295) >>> 0;
        const high32 = (bits64 - low32) / 4294967296;
        if (high32)
          _word[14] = swap32(high32);
        if (low32)
          _word[15] = swap32(low32);
        this._int32(_word);
        return encoding === "hex" ? this._hex() : this._bin();
      }
      _hex() {
        const { A, B, C, D, E, F, G, H } = this;
        return hex32(A) + hex32(B) + hex32(C) + hex32(D) + hex32(E) + hex32(F) + hex32(G) + hex32(H);
      }
      _bin() {
        const { A, B, C, D, E, F, G, H, _byte, _word } = this;
        _word[0] = swap32(A);
        _word[1] = swap32(B);
        _word[2] = swap32(C);
        _word[3] = swap32(D);
        _word[4] = swap32(E);
        _word[5] = swap32(F);
        _word[6] = swap32(G);
        _word[7] = swap32(H);
        return _byte.slice(0, 32);
      }
    }
    sha256Uint8array.Hash = Hash;
    const W = new Int32Array(64);
    let sharedBuffer;
    let sharedOffset = 0;
    const hex32 = (num) => (num + 4294967296).toString(16).substr(-8);
    const swapLE = (c) => c << 24 & 4278190080 | c << 8 & 16711680 | c >> 8 & 65280 | c >> 24 & 255;
    const swapBE = (c) => c;
    const swap32 = isBE() ? swapBE : swapLE;
    const ch = (x, y, z) => z ^ x & (y ^ z);
    const maj = (x, y, z) => x & y | z & (x | y);
    const sigma0 = (x) => (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
    const sigma1 = (x) => (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
    const gamma0 = (x) => (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
    const gamma1 = (x) => (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10;
    function isBE() {
      const buf = new Uint8Array(new Uint16Array([65279]).buffer);
      return buf[0] === 254;
    }
    async function sha256(atu8_data) {
      return new Uint8Array(await crypto.subtle.digest("SHA-256", atu8_data));
    }
    const sha256_sync_insecure = (atu8_data) => createHash_1().update(atu8_data).digest();
    let y_sha256;
    void instantiateSha256().then((y) => y_sha256 = y);
    const sha256_sync = (atu8_data) => y_sha256.final(y_sha256.update(y_sha256.init(), atu8_data));
    let y_ripemd;
    void instantiateRipemd160().then((y) => y_ripemd = y);
    const ripemd160_sync = (atu8_data) => y_ripemd.final(y_ripemd.update(y_ripemd.init(), atu8_data));
    async function sha512(atu8_data) {
      return new Uint8Array(await crypto.subtle.digest("SHA-512", atu8_data));
    }
    async function hmac(atu8_sk, atu8_message, si_algo = "SHA-256") {
      const dk_sign = await crypto.subtle.importKey("raw", atu8_sk, {
        name: "HMAC",
        hash: { name: si_algo }
      }, false, ["sign"]);
      return new Uint8Array(await crypto.subtle.sign("HMAC", dk_sign, atu8_message));
    }
    function zero_out(atu8_data) {
      atu8_data.fill(0);
      if (atu8_data.reduce((c, x) => c + x, 0) !== 0)
        throw new Error("Failed to zero out sensitive memory region");
    }
    function text_to_buffer2(s_text) {
      return new TextEncoder().encode(s_text);
    }
    function buffer_to_text(atu8_text) {
      return new TextDecoder().decode(atu8_text);
    }
    function json_to_buffer(w_json) {
      return text_to_buffer2(JSON.stringify(w_json));
    }
    function buffer_to_json(atu8_json) {
      return JSON.parse(buffer_to_text(atu8_json));
    }
    function concat(a_buffers) {
      const nb_out = a_buffers.reduce((c_bytes, atu8_each) => c_bytes + atu8_each.byteLength, 0);
      const atu8_out = new Uint8Array(nb_out);
      let ib_write = 0;
      for (const atu8_each of a_buffers) {
        atu8_out.set(atu8_each, ib_write);
        ib_write += atu8_each.byteLength;
      }
      return atu8_out;
    }
    const sfcc = String.fromCharCode;
    function buffer_to_hex(atu8_buffer) {
      let sx_hex = "";
      for (const xb_byte of atu8_buffer) {
        sx_hex += xb_byte.toString(16).padStart(2, "0");
      }
      return sx_hex;
    }
    function hex_to_buffer(sx_hex) {
      const nl_hex = sx_hex.length;
      if (nl_hex % 2 !== 0)
        throw new Error(`Invalid hex string length is not a multiple of 2`);
      const nb_buffer = nl_hex / 2;
      const atu8_buffer = new Uint8Array(nb_buffer);
      for (let i_byte = 0; i_byte < nb_buffer; i_byte++) {
        atu8_buffer[i_byte] = parseInt(sx_hex.slice(i_byte + i_byte, i_byte + i_byte + 2), 16);
      }
      return atu8_buffer;
    }
    function buffer_to_base64(atu8_buffer) {
      return globalThis.btoa(buffer_to_string8(atu8_buffer));
    }
    function base64_to_buffer(sx_buffer) {
      return string8_to_buffer(globalThis.atob(sx_buffer));
    }
    function buffer_to_string8(atu8_buffer) {
      let sx_buffer = "";
      for (const xb_byte of atu8_buffer) {
        sx_buffer += sfcc(xb_byte);
      }
      return sx_buffer;
    }
    function string8_to_buffer(sx_buffer) {
      const nl_pairs = sx_buffer.length;
      const atu8_buffer = new Uint8Array(nl_pairs);
      for (let i_read = 0; i_read < nl_pairs; i_read++) {
        atu8_buffer[i_read] = sx_buffer.charCodeAt(i_read);
      }
      return atu8_buffer;
    }
    exports.base64_to_buffer = base64_to_buffer;
    exports.buffer_to_base64 = buffer_to_base64;
    exports.buffer_to_hex = buffer_to_hex;
    exports.buffer_to_json = buffer_to_json;
    exports.buffer_to_string8 = buffer_to_string8;
    exports.buffer_to_text = buffer_to_text;
    exports.concat = concat;
    exports.hex_to_buffer = hex_to_buffer;
    exports.hmac = hmac;
    exports.json_to_buffer = json_to_buffer;
    exports.ripemd160_sync = ripemd160_sync;
    exports.sha256 = sha256;
    exports.sha256_sync = sha256_sync;
    exports.sha256_sync_insecure = sha256_sync_insecure;
    exports.sha512 = sha512;
    exports.string8_to_buffer = string8_to_buffer;
    exports.text_to_buffer = text_to_buffer2;
    exports.zero_out = zero_out;
    Object.defineProperty(exports, "__esModule", { value: true });
    return exports;
  }({});
  const { ConnectionHandle } = function(exports) {
    function ode(h_object) {
      return Object.entries(h_object);
    }
    const XT_DEBOUNCE = 250;
    const hm_fields$1 = /* @__PURE__ */ new WeakMap();
    function StorageModule$_push(g_fields) {
      clearTimeout(g_fields.i_debounce);
      setTimeout(async () => {
        await g_fields.k_channel.uploadStore(Object.fromEntries(g_fields.hm_cache.entries()));
      }, XT_DEBOUNCE);
    }
    async function StorageModule$_pull(g_fields) {
      const h_store = await g_fields.k_channel.downloadStore();
      if (typeof h_store !== "object") {
        throw new Error("Failed to create store; app must not have permissions");
      }
      g_fields.hm_cache = new Map(ode(h_store));
    }
    class StorageModule {
      static create(k_handle, k_channel) {
        const k_storage = new StorageModule(k_handle, k_channel);
        StorageModule$_pull.call(this, hm_fields$1.get(k_storage));
        return k_storage;
      }
      constructor(k_handle, k_channel) {
        hm_fields$1.set(this, {
          k_handle,
          k_channel,
          hm_cache: /* @__PURE__ */ new Map(),
          i_debounce: 0,
          b_locked: false
        });
      }
      get [Symbol.toStringTag]() {
        return "StorageModuleMap";
      }
      get length() {
        return this.size;
      }
      get size() {
        return [...this.keys()].length;
      }
      key(i_key) {
        return [...this.keys()][i_key];
      }
      keys() {
        return hm_fields$1.get(this).hm_cache.keys();
      }
      getItem(si_key) {
        return hm_fields$1.get(this).hm_cache.get(si_key) ?? null;
      }
      setItem(si_key, s_value) {
        const g_fields = hm_fields$1.get(this);
        if (typeof si_key !== "string")
          throw new TypeError("Key must be a string");
        if (typeof s_value !== "string")
          throw new TypeError("Value must be a string");
        if (s_value === null) {
          g_fields.hm_cache.delete(si_key);
        } else {
          g_fields.hm_cache.set(si_key, s_value);
        }
        StorageModule$_push.call(this, g_fields);
      }
      removeItem(si_key) {
        this.delete(si_key);
      }
      clear() {
        const g_fields = hm_fields$1.get(this);
        g_fields.hm_cache.clear();
        StorageModule$_push.call(this, g_fields);
      }
      has(si_key) {
        return this.get(si_key) !== null;
      }
      set(si_key, s_value) {
        this.setItem(si_key, s_value);
        return this;
      }
      delete(si_key) {
        const g_fields = hm_fields$1.get(this);
        const b_deleted = g_fields.hm_cache.delete(si_key);
        StorageModule$_push.call(this, g_fields);
        return b_deleted;
      }
      entries() {
        return hm_fields$1.get(this).hm_cache.entries();
      }
      values() {
        return hm_fields$1.get(this).hm_cache.values();
      }
      forEach(f_each) {
        return hm_fields$1.get(this).hm_cache.forEach(f_each);
      }
    }
    StorageModule.prototype.put = StorageModule.prototype.set;
    StorageModule.prototype[Symbol.iterator] = StorageModule.prototype.entries;
    const h_handlers = {
      respondAction(g_respond) {
        const i_msg = g_respond.index;
        const fk_respond = this._h_callbacks[i_msg + ""];
        if (!fk_respond) {
          return console.error(`Received action response but no callback was found at index ${i_msg}`);
        }
        delete this._h_callbacks[i_msg + ""];
        fk_respond(g_respond.result);
      },
      emitEvent(g_event) {
      }
    };
    class ConnectionChannel {
      constructor(_d_port) {
        Object.defineProperty(this, "_d_port", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: _d_port
        });
        Object.defineProperty(this, "_c_msgs", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: 0
        });
        Object.defineProperty(this, "_h_callbacks", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        _d_port.onmessage = (d_event) => {
          const { type: si_type, value: w_value } = d_event.data;
          const f_handler = h_handlers[si_type];
          if (!f_handler) {
            console.error(`Received message having an unregistered type "${si_type}"`);
            return;
          }
          console.debug(`Received connection port message having registered type %o`, d_event.data);
          f_handler.call(this, w_value);
        };
      }
      async submit(si_msg, w_value) {
        const i_msg = this._c_msgs++;
        return new Promise((fk_resolve) => {
          this._h_callbacks[i_msg + ""] = fk_resolve;
          this._d_port.postMessage({
            type: si_msg,
            value: w_value ?? null,
            count: i_msg
          });
        });
      }
      async uploadStore(h_store) {
        await this.submit("uploadStore", h_store);
      }
      async lockStore() {
        await this.submit("lockStore");
      }
      async releaseStore() {
        await this.submit("releaseStore");
      }
      async downloadStore() {
        return await this.submit("downloadStore");
      }
    }
    const hm_fields = /* @__PURE__ */ new WeakMap();
    class ConnectionHandle2 {
      static async create(si_handle, gc_handle, d_port2) {
        const k_handle = new ConnectionHandle2(si_handle, gc_handle, d_port2);
        const g_fields = hm_fields.get(k_handle);
        const [km_storage, km_hotwallet] = await Promise.all([
          (async () => {
            if (gc_handle.features.storage) {
              return StorageModule.create(k_handle, g_fields.k_channel);
            }
            return null;
          })(),
          (async () => {
            if (gc_handle.features.hotWallet) {
              return StorageModule.create(k_handle, g_fields.k_channel);
            }
            return null;
          })()
        ]);
        Object.assign(g_fields, {
          km_storage,
          km_hotwallet
        });
        return k_handle;
      }
      constructor(si_handle, gc_handle, d_port2) {
        const k_channel = new ConnectionChannel(d_port2);
        hm_fields.set(this, {
          k_channel,
          c_comands: 0,
          km_storage: null,
          km_hotwallet: null
        });
      }
      get storage() {
        return hm_fields.get(this).km_storage;
      }
      get hotWallet() {
        return hm_fields.get(this).km_hotwallet;
      }
    }
    exports.ConnectionChannel = ConnectionChannel;
    exports.ConnectionHandle = ConnectionHandle2;
    Object.defineProperty(exports, "__esModule", { value: true });
    return exports;
  }({});
  const {
    N_PX_WIDTH_POPUP,
    N_PX_HEIGHT_POPUP,
    NB_MAX_MESSAGE
  } = function(exports) {
    const NB_MAX_MESSAGE2 = 2 * 1024 * 1024;
    const N_PX_WIDTH_POPUP2 = 360;
    const N_PX_HEIGHT_POPUP2 = 600;
    const A_CHAIN_FAMILIES = [
      "cosmos"
    ];
    const A_CHAIN_CATEGORIES = [
      "mainnet",
      "testnet"
    ];
    const R_CHAIN_ID = /^[a-z0-9][a-z0-9-]{2,64}$/;
    const R_CHAIN_NAME = /^[\p{L}\p{S}](\p{Zs}?[\p{L}\p{N}\p{S}._:/-])+$/u;
    exports.A_CHAIN_CATEGORIES = A_CHAIN_CATEGORIES;
    exports.A_CHAIN_FAMILIES = A_CHAIN_FAMILIES;
    exports.NB_MAX_MESSAGE = NB_MAX_MESSAGE2;
    exports.N_PX_HEIGHT_POPUP = N_PX_HEIGHT_POPUP2;
    exports.N_PX_WIDTH_POPUP = N_PX_WIDTH_POPUP2;
    exports.R_CHAIN_ID = R_CHAIN_ID;
    exports.R_CHAIN_NAME = R_CHAIN_NAME;
    Object.defineProperty(exports, "__esModule", { value: true });
    return exports;
  }({});
  const debug = (s, ...a_args) => console.debug(`StarShell.mcs-relay: ${s}`, ...a_args);
  debug(`Launched on <${location.href}>`);
  const SI_EXPORT = "starshell";
  const A_SAFE_FUNCTIONS = [
    "addEventListener",
    "postMessage",
    "Error",
    "Function",
    "Object",
    "Reflect",
    "MessageChannel",
    "crypto"
  ];
  class SecurityError extends Error {
  }
  class PotentialBugError extends Error {
  }
  let b_aborted = false;
  function abort(s_reason) {
    b_aborted = true;
    window.postMessage({
      type: "panic",
      value: "" + s_reason
    }, window.origin);
    throw new SecurityError(`StarShell threw a security error: "${s_reason}"`);
  }
  function assert_not_aborted() {
    if (b_aborted)
      throw new Error("StarShell withdrew wallet access from this website due to a security violation");
  }
  function report_bug(s_info) {
    window.postMessage({
      type: "bug",
      value: "" + s_info
    }, window.origin);
    throw new PotentialBugError("StarShell encountered an unexpected error that might indicate a potential bug");
  }
  const dm_payload = document.querySelector("script#starshell-mcs-relay-payload");
  if (!dm_payload || dm_payload.nodeName.toLowerCase() !== "script") {
    return abort("Failed to locate payload script element within relay frame");
  }
  let g_payload;
  {
    const sx_payload = dm_payload.textContent;
    if (!sx_payload || !sx_payload.trim()) {
      return abort("The relay frame had an empty payload");
    }
    try {
      g_payload = JSON.parse(sx_payload);
    } catch (e_parse) {
      return abort("Failed to parse the payload text due to invalid JSON");
    }
  }
  if (typeof g_payload !== "object") {
    return abort("The payload injected into the relay frame was not an object");
  }
  if (typeof g_payload.session !== "string" || typeof g_payload.csurl !== "string") {
    return abort("The payload injected into the relay frame had an invalid shape or was missing properties");
  }
  dm_payload.remove();
  const {
    session: sh_session,
    csurl: p_content_script
  } = g_payload;
  const sh_stack = crypto.randomUUID();
  let d_port;
  function deep_freeze(z_object, h_frozen = /* @__PURE__ */ new Map()) {
    if (typeof z_object !== "object" && typeof z_object !== "function")
      return;
    if (!z_object)
      return;
    if (h_frozen[z_object])
      return;
    h_frozen[z_object] = true;
    Object.freeze(z_object);
    deep_freeze(Reflect.getPrototypeOf(z_object), h_frozen);
    for (const w_key of Reflect.ownKeys(z_object)) {
      const g_descriptor = Reflect.getOwnPropertyDescriptor(z_object, w_key);
      if (g_descriptor && !g_descriptor.get) {
        deep_freeze(g_descriptor.value, h_frozen);
      }
    }
    return z_object;
  }
  function normalize_stack(a_lines, i_start) {
    return [
      a_lines[0],
      a_lines[i_start].replace(/(:\d+:\d+)(\D*)$/, ":1:1$2"),
      ...a_lines.slice(i_start + 1)
    ].join("\n");
  }
  let c_access_connect = 0;
  let c_access_stack = 0;
  let c_access_export = 0;
  let b_access_capture = true;
  let a_stacks_init = [];
  let b_ratified = false;
  const hm_requests = /* @__PURE__ */ new Map();
  const h_bundle = {
    hardenGlobal() {
      const h_descriptors = Object.getOwnPropertyDescriptors(d_parent);
      for (const si_key in h_descriptors) {
        Reflect.defineProperty(d_parent, si_key, Reflect.getOwnPropertyDescriptor(h_bundle, si_key));
      }
    },
    natives() {
    },
    verifiableStack() {
      if (c_access_stack++ === 0) {
        let s_stack;
        try {
          throw new Error("StarShell security check");
        } catch (e_thrown) {
          s_stack = e_thrown.stack;
        }
        return {
          stack: s_stack,
          signature: JSON.stringify(hmacSHA256(s_stack, sh_stack))
        };
      }
    },
    verify(f_caller) {
      let s_stack_local;
      try {
        throw new Error("StarShell security check");
      } catch (e_thrown) {
        s_stack_local = e_thrown.stack;
      }
      const s_sig_auth = JSON.stringify(hmacSHA256("starshell", sh_session));
      try {
        const {
          proof: {
            stack: s_stack_verify,
            signature: s_sig_verify
          },
          signature: s_sig_proof
        } = f_caller(s_sig_auth);
        if (typeof s_stack_verify !== "string" || typeof s_sig_verify !== "string" || typeof s_sig_proof !== "string") {
          return abort("Invalid stack property types");
        }
        const a_lines_verify = s_stack_verify.split(/\n/g);
        const a_lines_local = s_stack_local.split(/\n/g);
        if (a_lines_local.length + 2 !== a_lines_verify.length) {
          return abort("Call stack length mismatch");
        }
        const s_stack_local_norm = normalize_stack(a_lines_local, 1);
        const s_stack_page_norm = normalize_stack(a_lines_verify, 3);
        if (s_stack_local_norm !== s_stack_page_norm) {
          return abort("Unable to verify caller identity");
        }
        if (c_access_export <= 2) {
          return abort(`Website script did not capture reference to global '${SI_EXPORT}' property which is required`);
        }
        if (s_sig_verify !== JSON.stringify(hmacSHA256(s_stack_verify, sh_stack))) {
          return abort("Invalid verification stack signature");
        }
        if (s_sig_proof !== JSON.stringify(hmacSHA256(JSON.stringify({
          stack: s_stack_verify,
          signature: s_sig_verify
        }), sh_session))) {
          return abort("Invalid proof signature");
        }
        b_access_capture = false;
        return (z_global) => {
          if (z_global !== h_bundle) {
            return abort("Failed to ratify Provider API");
          }
          b_ratified = true;
          check_advertisement();
        };
      } catch (e_uncaught) {
        if (!(e_uncaught instanceof SecurityError)) {
          return abort(`Uncaught error """${e_uncaught.stack ?? e_uncaught + ""}"""`);
        } else {
          throw e_uncaught;
        }
      }
    },
    get connect() {
      if (b_aborted)
        throw new Error("StarShell withdrew wallet access from this website due to a security violation");
      let i_access_connect = c_access_connect++;
      let b_used = false;
      return (g_advertisement, gc_manifest) => {
        return new Promise((fk_resolve, fe_reject) => {
          if (b_aborted)
            return fe_reject(new Error("StarShell withdrew wallet access from this website due to a security violation"));
          if (b_used)
            return fe_reject(`Blocked re-use of cached 'window.starshell.connect' method`);
          b_used = true;
          if (!g_advertisement)
            return fe_reject(new TypeError("Missing requisite advertisement object in arguments"));
          if (g_advertisement !== g_advertisement_outgoing)
            return fe_reject(new Error("Ignoring request to connect using foreign advertisement"));
          let sx_manifest = "";
          try {
            sx_manifest = JSON.stringify(gc_manifest);
            gc_manifest = JSON.parse(sx_manifest);
          } catch (e_disarm) {
            return fe_reject(new Error(`Invalid manifest object; failed to serialize.
${e_disarm.stack}`));
          }
          if (text_to_buffer(sx_manifest).byteLength > NB_MAX_MESSAGE) {
            return fe_reject(new Error("Message exceeds maximum byte length"));
          }
          hm_requests.set(i_access_connect, {
            index: i_access_connect,
            manifest: gc_manifest,
            resolve: fk_resolve,
            reject: fe_reject
          });
          try {
            d_port.postMessage({
              type: "requestConnect",
              value: {
                index: i_access_connect,
                manifest: gc_manifest
              }
            });
          } catch (e_post) {
            d_port.postMessage({
              type: "reportWebsiteError",
              value: (e_post.stack || e_post || "") + ""
            });
            return fe_reject(new Error(`Invalid connection request; failed to serialize object.
${e_post.stack}`));
          }
        });
      };
    }
  };
  for (const si_key of A_SAFE_FUNCTIONS) {
    h_bundle[si_key] = deep_freeze(window[si_key]);
  }
  Object.freeze(h_bundle);
  const d_parent = window.parent;
  const f_setter_starshell = () => {
  };
  const f_getter_starshell = () => {
    if (b_aborted)
      throw new Error("StarShell withdrew wallet access from this website due to a security violation");
    c_access_export += 1;
    if (b_access_capture) {
      try {
        throw new Error("StarShell security check");
      } catch (e_thrown) {
        a_stacks_init.push(e_thrown.stack);
      }
    }
    return h_bundle;
  };
  if (!Reflect.defineProperty(d_parent, SI_EXPORT, {
    enumerable: true,
    configurable: false,
    set: f_setter_starshell,
    get: f_getter_starshell
  }) || d_parent[SI_EXPORT] !== h_bundle) {
    return abort(`Unable to define non-modifiable property '${SI_EXPORT}' on parent window`);
  }
  if (!Object.isFrozen(window[SI_EXPORT])) {
    Object.freeze(window[SI_EXPORT]);
    if (!Object.isFrozen(window[SI_EXPORT])) {
      return abort(`Unable to freeze property '${SI_EXPORT}' on parent window`);
    }
  }
  {
    const gc_confirm = Reflect.getOwnPropertyDescriptor(d_parent, SI_EXPORT);
    if (typeof gc_confirm !== "object" || gc_confirm.configurable !== false || f_getter_starshell !== gc_confirm.get || f_setter_starshell !== gc_confirm.set) {
      return abort(`Failed to confirm definition of non-modifiable property '${SI_EXPORT}' on parent window`);
    }
  }
  debug(`Defined global window.starshell %o`, d_parent.starshell);
  const d_channel = new MessageChannel();
  d_port = d_channel.port1;
  let b_ack_relay = false;
  let g_advertisement_outgoing;
  function check_advertisement() {
    if (b_ratified && b_ack_relay) {
      if (g_advertisement_outgoing) {
        return abort("Advertisement already made");
      }
      g_advertisement_outgoing = {
        isStarShell: true,
        features: []
      };
      window.dispatchEvent.call(d_parent, new CustomEvent("walletAdvertisement", {
        detail: g_advertisement_outgoing
      }));
    }
  }
  const h_handlers_port = {
    acknowledgeChannel() {
      assert_not_aborted();
      if (b_ack_relay) {
        return abort("Received more than 1 relay acknowledgement");
      }
      b_ack_relay = true;
      check_advertisement();
    },
    async respondConnect(g_response, a_ports) {
      assert_not_aborted();
      const {
        index: i_response,
        answer: g_answer
      } = g_response;
      const g_request = hm_requests.get(i_response);
      if (!g_request) {
        return report_bug(`Connection response index "${i_response}" was not found in relay frame map`);
      }
      const {
        error: s_error,
        handle: si_handle,
        config: gc_handle
      } = g_answer;
      if (s_error) {
        return g_request.reject(new Error(s_error));
      }
      if (!a_ports || !a_ports.length) {
        return report_bug(`Connection response index "${i_response}" is missing MessagePorts`);
      }
      const k_handle = await ConnectionHandle.create(si_handle, gc_handle, a_ports[0]);
      g_request.resolve(k_handle);
    }
  };
  d_port.onmessage = function port_message_handler(d_event) {
    const {
      type: si_type,
      value: w_value
    } = d_event.data;
    const f_handler = h_handlers_port[si_type];
    if (!f_handler) {
      console.error(`Received message having an unregistered type "${si_type}"`);
      return;
    }
    debug(`Received relay port message having registered type %o`, d_event.data);
    f_handler(w_value ?? null, d_event.ports);
  };
  const g_establish = {
    type: "establishChannel"
  };
  g_establish["auth"] = JSON.stringify(hmacSHA256(JSON.stringify(g_establish), sh_session));
  window.postMessage(g_establish, window.origin, [d_channel.port2]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNzLXJlbGF5LjY3M2M0MGE4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NyaXB0L21jcy1yZWxheS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFVuaW9uIH0gZnJvbSAndHMtdG9vbGJlbHQnO1xuaW1wb3J0IHR5cGUgeyBNZXJnZSB9IGZyb20gJ3RzLXRvb2xiZWx0L291dC9PYmplY3QvX2FwaSdcblxuaW1wb3J0IHR5cGUgKiBhcyBDb25uZWN0aW9uTW9kdWxlIGZyb20gJyMvcHJvdmlkZXIvY29ubmVjdGlvbic7XG5pbXBvcnQgdHlwZSAqIGFzIENvbnN0YW50cyBmcm9tICcuL2NvbnN0YW50cyc7XG5cbnR5cGUgQ29ubmVjdGlvbkhhbmRsZSA9IENvbm5lY3Rpb25Nb2R1bGUuQ29ubmVjdGlvbkhhbmRsZTtcblxuaW1wb3J0IHR5cGUge1xuXHRBZHZlcnRpc2VtZW50LFxuXHRDb25uZWN0aW9uTWFuaWZlc3QsXG59IGZyb20gJy4vY29tbW9uJztcblxuaW1wb3J0IHR5cGUgeyBSZWxheVRvSG9zdCwgSG9zdFRvUmVsYXkgfSBmcm9tICcuL21lc3NhZ2VzJztcbmltcG9ydCB0eXBlIHsgVm9jYWIgfSBmcm9tICcjL21ldGEvdm9jYWInO1xuaW1wb3J0IHR5cGUgeyBPbWl0VW5rbm93bktleXMgfSBmcm9tICcjL21ldGEvYmVsdCc7XG5cblxuLyoqXG4gKiBTdG9yZSBwZW5kaW5nIHJlcXVlc3RzIHdoaWxlIHdhaXRpbmYgZm9yIGV4dGVuc2lvbiB0byByZXNwb25kXG4gKi9cbnR5cGUgUGVuZGluZ1JlcXVlc3QgPSBNZXJnZTx7XG5cdHJlc29sdmUoa2NfaGFuZGxlOiBDb25uZWN0aW9uSGFuZGxlKTogdm9pZCxcblx0cmVqZWN0KGVfcmVhc29uOiBFcnJvcik6IHZvaWQsXG59LCBPbWl0VW5rbm93bktleXM8Vm9jYWIuTWVzc2FnZVZhbHVlPFJlbGF5VG9Ib3N0LkF1dGhlZFZvY2FiLCAncmVxdWVzdENvbm5lY3QnPj4+O1xuXG5cbi8vIFRPRE86IG1vdmUgdGhpcyB0byBBUEkgdHlwZXNcbi8qKlxuICogRGVmaW5lIHRoZSBjb25uZWN0IG1ldGhvZFxuICovXG5pbnRlcmZhY2UgQ29ubmVjdE1ldGhvZCB7XG5cdChnX2FkdmVydGlzZW1lbnQ6IEFkdmVydGlzZW1lbnQsIGdjX21hbmlmZXN0OiBDb25uZWN0aW9uTWFuaWZlc3QpOiBQcm9taXNlPENvbm5lY3Rpb25IYW5kbGU+O1xufVxuXG4vLyBjcmVhdGUgYSBzYWZlIFdpbmRvdyBvYmplY3QgZm9yIHRoZSBpbnBhZ2Ugc2NyaXB0XG4oZnVuY3Rpb24oKSB7XG5cdGNvbnN0IGhtYWNTSEEyNTYgPSBpbmxpbmVfcmVxdWlyZSgnY3J5cHRvLWpzL2htYWMtc2hhMjU2Jyk7XG5cblx0Y29uc3QgeyB0ZXh0X3RvX2J1ZmZlciB9ID0gaW5saW5lX3JlcXVpcmUoJyMvdXRpbC9kYXRhLnRzJyk7XG5cdGNvbnN0IHsgQ29ubmVjdGlvbkhhbmRsZSB9ID0gaW5saW5lX3JlcXVpcmUoJy4uL3Byb3ZpZGVyL2Nvbm5lY3Rpb24udHMnKSBhcyB0eXBlb2YgQ29ubmVjdGlvbk1vZHVsZTtcblx0Y29uc3Qge1xuXHRcdE5fUFhfV0lEVEhfUE9QVVAsXG5cdFx0Tl9QWF9IRUlHSFRfUE9QVVAsXG5cdFx0TkJfTUFYX01FU1NBR0UsXG5cdH0gPSBpbmxpbmVfcmVxdWlyZSgnLi9jb25zdGFudHMudHMnKSBhcyB0eXBlb2YgQ29uc3RhbnRzO1xuXG5cdC8vIHZlcmJvc2Vcblx0Y29uc3QgZGVidWcgPSAoczogc3RyaW5nLCAuLi5hX2FyZ3M6IGFueVtdKSA9PiBjb25zb2xlLmRlYnVnKGBTdGFyU2hlbGwubWNzLXJlbGF5OiAke3N9YCwgLi4uYV9hcmdzKTtcblx0ZGVidWcoYExhdW5jaGVkIG9uIDwke2xvY2F0aW9uLmhyZWZ9PmApO1xuXG5cblx0Y29uc3QgU0lfRVhQT1JUID0gJ3N0YXJzaGVsbCc7XG5cblx0Ly8gbGlzdCBvZiBuYXRpdmUgcHJvcGVydGllcyB0byBmcmVlemUgaW50byBzYWZlIGJ1bmRsZVxuXHRjb25zdCBBX1NBRkVfRlVOQ1RJT05TID0gW1xuXHRcdCdhZGRFdmVudExpc3RlbmVyJyxcblx0XHQncG9zdE1lc3NhZ2UnLFxuXHRcdCdFcnJvcicsXG5cdFx0J0Z1bmN0aW9uJyxcblx0XHQnT2JqZWN0Jyxcblx0XHQnUmVmbGVjdCcsXG5cdFx0J01lc3NhZ2VDaGFubmVsJyxcblx0XHQnY3J5cHRvJyxcblx0XTtcblxuXHQvLyBzdWJjbGFzcyBFcnJvciB0byBiZSBhYmxlIHRvIHJlY29nbml6ZSBvYmplY3Qgb3JpZ2luXG5cdGNsYXNzIFNlY3VyaXR5RXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXHRjbGFzcyBQb3RlbnRpYWxCdWdFcnJvciBleHRlbmRzIEVycm9ye31cblxuXHQvLyBmbGFnIGluIGNhc2Ugc2VjdXJpdHkgdmlvbGF0aW9uIG9jY3Vyc1xuXHRsZXQgYl9hYm9ydGVkID0gZmFsc2U7XG5cblx0LyoqXG5cdCAqIEFib3J0IHBhZ2UgY29ubmVjdGlvbiBhbmQgcmVwb3J0IGEgc2VjdXJpdHkgZXJyb3Jcblx0ICovXG5cdGZ1bmN0aW9uIGFib3J0KHNfcmVhc29uOiBzdHJpbmcpIHtcblx0XHQvLyBzZXQgYWJvcnQgZmxhZ1xuXHRcdGJfYWJvcnRlZCA9IHRydWU7XG5cblx0XHQvLyBub3RpZnkgZXh0ZW5zaW9uXG5cdFx0d2luZG93LnBvc3RNZXNzYWdlKHtcblx0XHRcdHR5cGU6ICdwYW5pYycsXG5cdFx0XHR2YWx1ZTogJycrc19yZWFzb24sXG5cdFx0fSwgd2luZG93Lm9yaWdpbik7XG5cblx0XHQvLyBqdW1wIG91dCBvZiBjYWxsIHN0YWNrXG5cdFx0dGhyb3cgbmV3IFNlY3VyaXR5RXJyb3IoYFN0YXJTaGVsbCB0aHJldyBhIHNlY3VyaXR5IGVycm9yOiBcIiR7c19yZWFzb259XCJgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnQgdGhhdCB0aGUgY29ubmVjdGlvbiBoYXMgbm90IGJlZW4gYWJvcnRlZFxuXHQgKi9cblx0ZnVuY3Rpb24gYXNzZXJ0X25vdF9hYm9ydGVkKCkge1xuXHRcdC8vIGFscmVhZHkgYWJvcnRlZFxuXHRcdGlmKGJfYWJvcnRlZCkgdGhyb3cgbmV3IEVycm9yKCdTdGFyU2hlbGwgd2l0aGRyZXcgd2FsbGV0IGFjY2VzcyBmcm9tIHRoaXMgd2Vic2l0ZSBkdWUgdG8gYSBzZWN1cml0eSB2aW9sYXRpb24nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXBvcnQgYSBidWcgdG8gdGhlIGlzb2xhdGVkIGNvbnRlbnQgc2NyaXB0XG5cdCAqL1xuXHRmdW5jdGlvbiByZXBvcnRfYnVnKHNfaW5mbzogc3RyaW5nKSB7XG5cdFx0Ly8gbm90aWZ5IGlzb2xhdGVkIGNvbnRlbnQgc2NyaXB0IHRoYXQgcmVsYXkgaXMgc2VjdXJlZCBhbmQgdHJhbnNmZXIgcG9ydFxuXHRcdHdpbmRvdy5wb3N0TWVzc2FnZSh7XG5cdFx0XHR0eXBlOiAnYnVnJyxcblx0XHRcdHZhbHVlOiAnJytzX2luZm8sXG5cdFx0fSwgd2luZG93Lm9yaWdpbik7XG5cblx0XHQvLyBqdW1wIG91dCBvZiBjYWxsIHN0YWNrXG5cdFx0dGhyb3cgbmV3IFBvdGVudGlhbEJ1Z0Vycm9yKCdTdGFyU2hlbGwgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvciB0aGF0IG1pZ2h0IGluZGljYXRlIGEgcG90ZW50aWFsIGJ1ZycpO1xuXHR9XG5cblx0Ly8gZmV0Y2ggdGhlIHBheWxvYWQgc2NyaXB0IGVsZW1lbnRcblx0Y29uc3QgZG1fcGF5bG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdCNzdGFyc2hlbGwtbWNzLXJlbGF5LXBheWxvYWQnKTtcblxuXHQvLyBlbGVtZW50IG5vdCBmb3VuZFxuXHRpZighZG1fcGF5bG9hZCB8fCAnc2NyaXB0JyAhPT0gZG1fcGF5bG9hZC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0cmV0dXJuIGFib3J0KCdGYWlsZWQgdG8gbG9jYXRlIHBheWxvYWQgc2NyaXB0IGVsZW1lbnQgd2l0aGluIHJlbGF5IGZyYW1lJyk7XG5cdH1cblxuXHQvLyBleHRyYWN0IHRoZSBwYXlsb2FkXG5cdGxldCBnX3BheWxvYWQ6IEhvc3RUb1JlbGF5LlBheWxvYWQ7XG5cdHtcblx0XHQvLyBnZXQgdGhlIHBheWxvYWQgdGV4dFxuXHRcdGNvbnN0IHN4X3BheWxvYWQgPSBkbV9wYXlsb2FkLnRleHRDb250ZW50XG5cblx0XHQvLyB0ZXh0IGlzIGVtcHR5IG9yIGJsYW5rXG5cdFx0aWYoIXN4X3BheWxvYWQgfHwgIXN4X3BheWxvYWQudHJpbSgpKSB7XG5cdFx0XHRyZXR1cm4gYWJvcnQoJ1RoZSByZWxheSBmcmFtZSBoYWQgYW4gZW1wdHkgcGF5bG9hZCcpO1xuXHRcdH1cblxuXHRcdC8vIHBhcnNlIHRoZSB0ZXh0XG5cdFx0dHJ5IHtcblx0XHRcdGdfcGF5bG9hZCA9IEpTT04ucGFyc2Uoc3hfcGF5bG9hZCk7XG5cdFx0fVxuXHRcdGNhdGNoKGVfcGFyc2UpIHtcblx0XHRcdHJldHVybiBhYm9ydCgnRmFpbGVkIHRvIHBhcnNlIHRoZSBwYXlsb2FkIHRleHQgZHVlIHRvIGludmFsaWQgSlNPTicpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGludmFsaWQgcGF5bG9hZCB0eXBlXG5cdGlmKCdvYmplY3QnICE9PSB0eXBlb2YgZ19wYXlsb2FkKSB7XG5cdFx0cmV0dXJuIGFib3J0KCdUaGUgcGF5bG9hZCBpbmplY3RlZCBpbnRvIHRoZSByZWxheSBmcmFtZSB3YXMgbm90IGFuIG9iamVjdCcpO1xuXHR9XG5cblx0Ly8gaW52YWxpZCBwYXlsb2FkIHByb3BlcnRpZXNcblx0aWYoJ3N0cmluZycgIT09IHR5cGVvZiBnX3BheWxvYWQuc2Vzc2lvbiB8fCAnc3RyaW5nJyAhPT0gdHlwZW9mIGdfcGF5bG9hZC5jc3VybCkge1xuXHRcdHJldHVybiBhYm9ydCgnVGhlIHBheWxvYWQgaW5qZWN0ZWQgaW50byB0aGUgcmVsYXkgZnJhbWUgaGFkIGFuIGludmFsaWQgc2hhcGUgb3Igd2FzIG1pc3NpbmcgcHJvcGVydGllcycpO1xuXHR9XG5cblx0Ly8gcmVtb3ZlIGV2ZXJ5dGhpbmcgZnJvbSB0aGUgZG9jdW1lbnQgZm9yIGZ1bnNpZXNcblx0ZG1fcGF5bG9hZC5yZW1vdmUoKTtcblx0Ly8gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKSkuZm9yRWFjaChkbSA9PiBkbS5yZW1vdmUoKSk7XG5cblx0Ly8gZGVzdHJ1Y3R1cmUgcGF5bG9hZFxuXHRjb25zdCB7XG5cdFx0c2Vzc2lvbjogc2hfc2Vzc2lvbixcblx0XHRjc3VybDogcF9jb250ZW50X3NjcmlwdCxcblx0fSA9IGdfcGF5bG9hZCBhcyBIb3N0VG9SZWxheS5QYXlsb2FkO1xuXG5cdC8vIGNyZWF0ZSBwcml2YXRlIHN0YWNrLXNpZ25pbmcga2V5XG5cdGNvbnN0IHNoX3N0YWNrID0gY3J5cHRvLnJhbmRvbVVVSUQoKTtcblxuXHQvLyBwcmVwIHBvcnRcblx0bGV0IGRfcG9ydDogVm9jYWIuVHlwZWRQb3J0PFJlbGF5VG9Ib3N0LkF1dGhlZFZvY2FiLCBIb3N0VG9SZWxheS5BdXRoZWRWb2NhYj47XG5cblx0Ly8gVE9PRDogY2FwdHVyZSB3aW5kb3cgcmVmZXJlbmNlcyBuZWVkZWQgYWZ0ZXIgc3luYyBpbiBjYXNlIHdpbmRvdyByZWZlcmVuY2UgbGVha3MgdG8gcGFyZW50IGZyYW1lXG5cdC8vIHZpYSBhbnkgYnVuZGxlZCBuYXRpdmUgZnVuY3Rpb24gcmV0dXJuIHZhbHVlcyBvciBwcm9wZXJ0aWVzXG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gYSBkZWVwIChyZWN1cnNpdmUgYW5kIHByb3RvdHlwZSBjaGFpbikgZnJlZXplIG9uIHRoZSBnaXZlbiBvYmplY3Rcblx0ICovXG5cdGZ1bmN0aW9uIGRlZXBfZnJlZXplKHpfb2JqZWN0OiBhbnksIGhfZnJvemVuPW5ldyBNYXA8T2JqZWN0LCBib29sZWFuPigpKSB7XG5cdFx0Ly8gb25seSBmcmVlemUgb2JqZWN0cyBhbmQgZnVuY3Rpb25zXG5cdFx0aWYoJ29iamVjdCcgIT09IHR5cGVvZiB6X29iamVjdCAmJiAnZnVuY3Rpb24nICE9PSB0eXBlb2Ygel9vYmplY3QpIHJldHVybjtcblxuXHRcdC8vIGV4Y2x1ZGUgbnVsbFxuXHRcdGlmKCF6X29iamVjdCkgcmV0dXJuO1xuXG5cdFx0Ly8gc2tpcCBvYmplY3RzIGFscmVhZHkgZW5jb3VudGVyZWRcblx0XHRpZihoX2Zyb3plblt6X29iamVjdF0pIHJldHVybjtcblxuXHRcdC8vIHJlY29yZCBlbnRyeVxuXHRcdGhfZnJvemVuW3pfb2JqZWN0XSA9IHRydWU7XG5cblx0XHQvLyBmcmVlemUgdGhlIGl0ZW1cblx0XHRPYmplY3QuZnJlZXplKHpfb2JqZWN0KTtcblxuXHRcdC8vIGF0dGVtcHQgdG8gZnJlZXplIGl0cyBwcm90b3R5cGVcblx0XHRkZWVwX2ZyZWV6ZShSZWZsZWN0LmdldFByb3RvdHlwZU9mKHpfb2JqZWN0KSwgaF9mcm96ZW4pO1xuXG5cdFx0Ly8gaXRlcmF0ZSBvdmVyIGl0cyBrZXlzXG5cdFx0Zm9yKGNvbnN0IHdfa2V5IG9mIFJlZmxlY3Qub3duS2V5cyh6X29iamVjdCkpIHtcblx0XHRcdC8vIGZldGNoIHRoZSB2YWx1ZSdzIGRlc2NyaXB0b3Jcblx0XHRcdGNvbnN0IGdfZGVzY3JpcHRvciA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHpfb2JqZWN0LCB3X2tleSk7XG5cblx0XHRcdC8vIGRhdGEgZGVzY3JpcHRvcnMgb25seTsgZGVlcCBmcmVlemUgdGhlaXIgdmFsdWVcblx0XHRcdGlmKGdfZGVzY3JpcHRvciAmJiAhZ19kZXNjcmlwdG9yLmdldCkge1xuXHRcdFx0XHRkZWVwX2ZyZWV6ZShnX2Rlc2NyaXB0b3IudmFsdWUsIGhfZnJvemVuKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyByZXR1cm4gZnJvemVuIG9iamVjdFxuXHRcdHJldHVybiB6X29iamVjdDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIE5vcm1hbGl6ZXMgYSBjYWxsIHN0YWNrIGJ5IHJlbW92aW5nIGdhcCBsaW5lcyBhbmQgcmVwbGFjaW5nIHRoZSBgOmxpbmU6Y29sYCBzdHJpbmcgIGF0IHRoZSBpX3N0YXJ0IHJvd1xuXHQgKi9cblx0ZnVuY3Rpb24gbm9ybWFsaXplX3N0YWNrKGFfbGluZXM6IHN0cmluZ1tdLCBpX3N0YXJ0PTEpOiBzdHJpbmcge1xuXHRcdHJldHVybiBbXG5cdFx0XHRhX2xpbmVzWzBdLFxuXHRcdFx0YV9saW5lc1tpX3N0YXJ0XS5yZXBsYWNlKC8oOlxcZCs6XFxkKykoXFxEKikkLywgJzoxOjEkMicpLFxuXHRcdFx0Li4uYV9saW5lcy5zbGljZShpX3N0YXJ0KzEpLFxuXHRcdF0uam9pbignXFxuJyk7XG5cdH1cblxuXHQvLyBkaXN0aW5ndWlzaCBiZXR3ZWVuIGNvbm5lY3QgYWNjZXNzb3JzXG5cdGxldCBjX2FjY2Vzc19jb25uZWN0ID0gMDtcblxuXHQvLyBjb3VudCBudW1iZXIgb2YgdGltZXMgc3RhY2sgdmVyaWZpZXIgaXMgY2FsbGVkXG5cdGxldCBjX2FjY2Vzc19zdGFjayA9IDA7XG5cdFxuXHQvLyBjb3VudCBudW1iZXIgb2YgdGltZXMgZXhwb3J0IGlzIGFjY2Vzc2VkXG5cdGxldCBjX2FjY2Vzc19leHBvcnQgPSAwO1xuXG5cdC8vIGNhcHR1cmUgc3RhY2tzIHRvIG1ha2Ugc3VyZSBpbnBhZ2UgY29udGVudCBzY3JpcHQgYm9va2VuZHMgdGhlIHJlY2VpdmVyc1xuXHRsZXQgYl9hY2Nlc3NfY2FwdHVyZSA9IHRydWU7XG5cdGxldCBhX3N0YWNrc19pbml0OiBzdHJpbmdbXSA9IFtdO1xuXG5cdC8vIHJhdGlmaWVkIGZsYWdcblx0bGV0IGJfcmF0aWZpZWQgPSBmYWxzZTtcblxuXHQvLyBoYXJkZW5lZCBmbGFnXG5cdGxldCBiX2hhcmRlbmVkID0gZmFsc2U7XG5cblx0Ly8gY29uZWN0aW9uIHJlcXVlc3RzXG5cdGNvbnN0IGhtX3JlcXVlc3RzID0gbmV3IE1hcDxudW1iZXIsIFBlbmRpbmdSZXF1ZXN0PigpO1xuXG5cdC8vIHByZXAgbmV3IGJ1bmRsZVxuXHRjb25zdCBoX2J1bmRsZSA9IHtcblx0XHQvLyBpc0hhcmRlbmVkKHNpX2tleSwgd19wZXJjZWl2ZWQpOiBib29sZWFuIHtcblx0XHQvLyBcdHJldHVybiAoJ3N0cmluZycgPT09IHR5cGVvZiBzaV9rZXkgJiYgQV9TQUZFX0ZVTkNUSU9OUy5pbmNsdWRlcyhzaV9rZXkpICYmIHdfcGVyY2VpdmVkID09PSB3aW5kb3dbc2lfa2V5XSk7XG5cdFx0Ly8gfSxcblxuXHRcdC8vIGhhcmRlbmluZyB0aGUgZ2xvYmFsIGNhbiBiZSB1c2VmdWwgd2hlbiBpbXBvcnRpbmcgM3JkIHBhcnR5IGxpYnJhcmllcyB0aGF0IHVzZSB3aW5kb3dcblx0XHQvLyB3aXRob3V0IHdvcnJ5aW5nIGFib3V0IGVzdGFibGlzaGluZyBhIENvbXBhcnRtZW50IHRvIGNvbnRhaW4gdGhlIGltcG9ydGVkIG1vZHVsZVxuXHRcdC8vIGhvd2V2ZXIsIGl0IHJlcXVpcmVzIHVzaW5nIGFzeW5jIGltcG9ydHMgdG8gZW5zdXJlIHRoZSBpbXBvcnRlZCBtb2R1bGUgZG9lcyBub3QgY2FjaGVcblx0XHQvLyBhbnkgd2luZG93IGZ1bmN0aW9ucyBiZWZvcmUgaXQgaXMgaGFyZGVuZWQuIGFsc28sIGhhcmRlbmluZyB0aGUgZ2xvYmFsIGRvZXMgbm90IHByZWNsdWRlXG5cdFx0Ly8gYW4gYXR0YWNrZXIgZnJvbSBleHRlbmRpbmcgd2luZG93IChzaW5jZSBpdCBtdXN0IHJlbWFpbiBjb25maWd1cmFibGUpIGJ5IGRlZmluaW5nIHByb3BlcnRpZXNcblx0XHQvLyB0aGF0IHBvbHlmaWxsIG5ldyBXZWIgQVBJcyB3aGljaCBhcmUgbm90IHlldCBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXIsIG1lYW5pbmcgdGhleSBhcmVcblx0XHQvLyBhY3R1YWxseSB1bmRlZmluZWQsIHNvIGhhcmRlbmluZyBkb2VzIG5vdCBmcmVlemUgdGhlbVxuXHRcdGhhcmRlbkdsb2JhbCgpIHtcblx0XHRcdC8vIGFscmVhZHkgaGFyZGVuZWRcblx0XHRcdGlmKGJfaGFyZGVuZWQpIHJldHVybiB0cnVlO1xuXG5cdFx0XHRjb25zdCBoX2Rlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoZF9wYXJlbnQpO1xuXHRcdFx0Zm9yKGNvbnN0IHNpX2tleSBpbiBoX2Rlc2NyaXB0b3JzKSB7XG5cdFx0XHRcdFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZF9wYXJlbnQsIHNpX2tleSwgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaF9idW5kbGUsIHNpX2tleSkhKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gdGhlIHNhZmVzdCB3YXkgd291bGQgYmUgdG8gY3JlYXRlIGEgbmV3IG5lc3RlZCBpZnJhbWUgZm9yIGVhY2ggY29tcGFydG1lbnQgdG8gY2FwdHVyZSBhIGZyZXNoIHdpbmRvdyBpbnN0YW5jZVxuXHRcdG5hdGl2ZXMoKSB7XG5cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUHJvZHVjZSBhIHN0YWNrIHVzaW5nIHRoZSB0cnVzdGVkLCBuYXRpdmUgRXJyb3IgY2xhc3MgYW5kIHNpZ24gaXRcblx0XHQgKi9cblx0XHR2ZXJpZmlhYmxlU3RhY2soKSB7XG5cdFx0XHQvLyBvbmx5IHJldHVybiB0byBmaXJzdCBhY2Nlc3NvclxuXHRcdFx0aWYoMCA9PT0gY19hY2Nlc3Nfc3RhY2srKykge1xuXHRcdFx0XHQvLyBnZW5lcmF0ZSBuZXcgc3RhY2tcblx0XHRcdFx0bGV0IHNfc3RhY2s7XG5cdFx0XHRcdHRyeSB7IHRocm93IG5ldyBFcnJvcignU3RhclNoZWxsIHNlY3VyaXR5IGNoZWNrJyk7IH0gY2F0Y2goZV90aHJvd24pIHsgc19zdGFjayA9IGVfdGhyb3duLnN0YWNrIH1cblx0XHRcdFx0XG5cdFx0XHRcdC8vIHJldHVybiB0aGUgc3RhY2sgYW5kIHNpZ24gaXRcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzdGFjazogc19zdGFjayxcblx0XHRcdFx0XHRzaWduYXR1cmU6IEpTT04uc3RyaW5naWZ5KGhtYWNTSEEyNTYoc19zdGFjaywgc2hfc3RhY2spKSxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogXG5cdFx0ICovXG5cdFx0dmVyaWZ5KGZfY2FsbGVyKSB7XG5cdFx0XHQvLyBnZW5lcmF0ZSBuZXcgc3RhY2tcblx0XHRcdGxldCBzX3N0YWNrX2xvY2FsO1xuXHRcdFx0dHJ5IHsgdGhyb3cgbmV3IEVycm9yKCdTdGFyU2hlbGwgc2VjdXJpdHkgY2hlY2snKTsgfSBjYXRjaChlX3Rocm93bikgeyBzX3N0YWNrX2xvY2FsID0gZV90aHJvd24uc3RhY2sgfVxuXG5cdFx0XHQvLyBzaWduIGF1dGhcblx0XHRcdGNvbnN0IHNfc2lnX2F1dGggPSBKU09OLnN0cmluZ2lmeShobWFjU0hBMjU2KCdzdGFyc2hlbGwnLCBzaF9zZXNzaW9uKSk7XG5cblx0XHRcdC8vIGhhbmRsZSB1bmNhdWdodCBlcnJvcnNcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIGludm9rZSBjYWxsZXIgYW5kIGRlc3RydWN0dXJlIHJlc3VsdFxuXHRcdFx0XHRjb25zdCB7XG5cdFx0XHRcdFx0cHJvb2Y6IHtcblx0XHRcdFx0XHRcdHN0YWNrOiBzX3N0YWNrX3ZlcmlmeSxcblx0XHRcdFx0XHRcdHNpZ25hdHVyZTogc19zaWdfdmVyaWZ5LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2lnbmF0dXJlOiBzX3NpZ19wcm9vZixcblx0XHRcdFx0fSA9IGZfY2FsbGVyKHNfc2lnX2F1dGgpO1xuXG5cdFx0XHRcdC8vIGFzc2VydCB0eXBlc1xuXHRcdFx0XHRpZignc3RyaW5nJyAhPT0gdHlwZW9mIHNfc3RhY2tfdmVyaWZ5IHx8ICdzdHJpbmcnICE9PSB0eXBlb2Ygc19zaWdfdmVyaWZ5IHx8ICdzdHJpbmcnICE9PSB0eXBlb2Ygc19zaWdfcHJvb2YpIHtcblx0XHRcdFx0XHRyZXR1cm4gYWJvcnQoJ0ludmFsaWQgc3RhY2sgcHJvcGVydHkgdHlwZXMnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHNwbGl0XG5cdFx0XHRcdGNvbnN0IGFfbGluZXNfdmVyaWZ5ID0gc19zdGFja192ZXJpZnkuc3BsaXQoL1xcbi9nKTtcblx0XHRcdFx0Y29uc3QgYV9saW5lc19sb2NhbCA9IHNfc3RhY2tfbG9jYWwuc3BsaXQoL1xcbi9nKTtcblxuXHRcdFx0XHQvLyBwYWdlIHN0YWNrIHNob3VsZCBiZSBleGFjdGx5IDIgY2FsbHMgZGVlcGVyXG5cdFx0XHRcdGlmKGFfbGluZXNfbG9jYWwubGVuZ3RoICsgMiAhPT0gYV9saW5lc192ZXJpZnkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGFib3J0KCdDYWxsIHN0YWNrIGxlbmd0aCBtaXNtYXRjaCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gbm9ybWFsaXplIGJvdGggc3RhY2tzXG5cdFx0XHRcdGNvbnN0IHNfc3RhY2tfbG9jYWxfbm9ybSA9IG5vcm1hbGl6ZV9zdGFjayhhX2xpbmVzX2xvY2FsLCAxKTtcblx0XHRcdFx0Y29uc3Qgc19zdGFja19wYWdlX25vcm0gPSBub3JtYWxpemVfc3RhY2soYV9saW5lc192ZXJpZnksIDMpO1xuXG5cdFx0XHRcdC8vIGNvbXBhcmUgc3RhY2tzXG5cdFx0XHRcdGlmKHNfc3RhY2tfbG9jYWxfbm9ybSAhPT0gc19zdGFja19wYWdlX25vcm0pIHtcblx0XHRcdFx0XHRyZXR1cm4gYWJvcnQoJ1VuYWJsZSB0byB2ZXJpZnkgY2FsbGVyIGlkZW50aXR5Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBtYWtlIHN1cmUgdGhlIHVzZXIgY2FwdHVyZWQgYSByZWZlcmVuY2UgdG8gdGhlIGV4cG9ydFxuXHRcdFx0XHRpZihjX2FjY2Vzc19leHBvcnQgPD0gMikge1xuXHRcdFx0XHRcdHJldHVybiBhYm9ydChgV2Vic2l0ZSBzY3JpcHQgZGlkIG5vdCBjYXB0dXJlIHJlZmVyZW5jZSB0byBnbG9iYWwgJyR7U0lfRVhQT1JUfScgcHJvcGVydHkgd2hpY2ggaXMgcmVxdWlyZWRgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG5vIGxvbmdlciBhcHBsaWVzXG5cdFx0XHRcdC8vIC8vIGVuc3VyZSBmaXJzdCBhbmQgbGFzdCBhY2Nlc3MgY29tZXMgZnJvbSBpbnBhZ2UgY29udGVudCBzY3JpcHRcblx0XHRcdFx0Ly8gaWYoYV9zdGFja3NfaW5pdFswXSAhPT0gYV9zdGFja3NfaW5pdFthX3N0YWNrc19pbml0Lmxlbmd0aC0xXSkge1xuXHRcdFx0XHQvLyBcdHJldHVybiBhYm9ydChgRmFpbGVkIHRvIHJlbGlhYmx5IHZhbGlkYXRlIFByb3ZpZGVyIEFQSSBlbnRyeXBvaW50YCk7XG5cdFx0XHRcdC8vIH1cblxuXHRcdFx0XHQvLyB2ZXJpZnkgdGhlIHZlcmlmaWNhdGlvbiBzaWduYXR1cmUgKGxvbClcblx0XHRcdFx0aWYoc19zaWdfdmVyaWZ5ICE9PSBKU09OLnN0cmluZ2lmeShobWFjU0hBMjU2KHNfc3RhY2tfdmVyaWZ5LCBzaF9zdGFjaykpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGFib3J0KCdJbnZhbGlkIHZlcmlmaWNhdGlvbiBzdGFjayBzaWduYXR1cmUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHJlY29uc3RydWN0IHRoZSBwcm9vZiBzaWduYXR1cmUgYW5kIHZlcmlmeSBpdFxuXHRcdFx0XHRpZihzX3NpZ19wcm9vZiAhPT0gSlNPTi5zdHJpbmdpZnkoaG1hY1NIQTI1NihKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0c3RhY2s6IHNfc3RhY2tfdmVyaWZ5LCAgLy8gLnJlcGxhY2UobmV3IFJlZ0V4cChgXFxcXChtY3MtcmVsYXkudHMoOlswLTldKzpbMC05XSspXFxcXClgLCAnZycpLCAnKG1jcy1yZWxheS50cyknKVxuXHRcdFx0XHRcdHNpZ25hdHVyZTogc19zaWdfdmVyaWZ5LFxuXHRcdFx0XHR9KSwgc2hfc2Vzc2lvbikpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGFib3J0KCdJbnZhbGlkIHByb29mIHNpZ25hdHVyZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gc3RvcCBjYXB0dXJpbmdcblx0XHRcdFx0Yl9hY2Nlc3NfY2FwdHVyZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJldHVybiBmdW5jdGlvbiB0byB0cnVzdGVkIGNhbGxlclxuXHRcdFx0XHRyZXR1cm4gKHpfZ2xvYmFsOiB1bmtub3duKSA9PiB7XG5cdFx0XHRcdFx0Ly8gcGFzc2VkIHJlZmVyZW5jZSBkb2VzIG5vdCBtYXRjaFxuXHRcdFx0XHRcdGlmKHpfZ2xvYmFsICE9PSBoX2J1bmRsZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGFib3J0KCdGYWlsZWQgdG8gcmF0aWZ5IFByb3ZpZGVyIEFQSScpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIHN1Y2Nlc3NmdWxseSByYXRpZmllZCBnbG9iYWxcblx0XHRcdFx0XHRiX3JhdGlmaWVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdC8vIGNoZWNrIGFkdmVydGlzZW1lbnRcblx0XHRcdFx0XHRjaGVja19hZHZlcnRpc2VtZW50KCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlX3VuY2F1Z2h0KSB7XG5cdFx0XHRcdGlmKCEoZV91bmNhdWdodCBpbnN0YW5jZW9mIFNlY3VyaXR5RXJyb3IpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGFib3J0KGBVbmNhdWdodCBlcnJvciBcIlwiXCIke2VfdW5jYXVnaHQuc3RhY2s/PyBlX3VuY2F1Z2h0KycnfVwiXCJcImApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IGVfdW5jYXVnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogV2Vic2l0ZSBpcyBtYWtpbmcgYSBjb25uZWN0aW9uIHJlcXVlc3Rcblx0XHQgKi9cblx0XHRnZXQgY29ubmVjdCgpOiBDb25uZWN0TWV0aG9kIHtcblx0XHRcdC8vIGFscmVhZHkgYWJvcnRlZFxuXHRcdFx0aWYoYl9hYm9ydGVkKSB0aHJvdyBuZXcgRXJyb3IoJ1N0YXJTaGVsbCB3aXRoZHJldyB3YWxsZXQgYWNjZXNzIGZyb20gdGhpcyB3ZWJzaXRlIGR1ZSB0byBhIHNlY3VyaXR5IHZpb2xhdGlvbicpO1xuXG5cdFx0XHQvLyBjb25uZWN0IGFjY2VzcyBpbmRleFxuXHRcdFx0bGV0IGlfYWNjZXNzX2Nvbm5lY3QgPSBjX2FjY2Vzc19jb25uZWN0Kys7XG5cblx0XHRcdC8vIGZ1bmN0aW9uIGNhbiBvbmx5IGJlIHVzZWQgb25jZVxuXHRcdFx0bGV0IGJfdXNlZCA9IGZhbHNlO1xuXG5cdFx0XHQvLyBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gZm9yIGVhY2ggY29ubmVjdCBhY2Nlc3Ncblx0XHRcdHJldHVybiAoZ19hZHZlcnRpc2VtZW50OiBBZHZlcnRpc2VtZW50LCBnY19tYW5pZmVzdDogQ29ubmVjdGlvbk1hbmlmZXN0KTogUHJvbWlzZTxDb25uZWN0aW9uSGFuZGxlPiA9PiB7XG5cdFx0XHRcdC8vIGdvIGFzeW5jXG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgoZmtfcmVzb2x2ZSwgZmVfcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0Ly8gYWxyZWFkeSBhYm9ydGVkXG5cdFx0XHRcdFx0aWYoYl9hYm9ydGVkKSByZXR1cm4gZmVfcmVqZWN0KG5ldyBFcnJvcignU3RhclNoZWxsIHdpdGhkcmV3IHdhbGxldCBhY2Nlc3MgZnJvbSB0aGlzIHdlYnNpdGUgZHVlIHRvIGEgc2VjdXJpdHkgdmlvbGF0aW9uJykpO1xuXG5cdFx0XHRcdFx0Ly8gY29ubmVjdGlvbiBmdW5jdGlvbiBhbHJlYWR5IHVzZWRcblx0XHRcdFx0XHRpZihiX3VzZWQpIHJldHVybiBmZV9yZWplY3QoYEJsb2NrZWQgcmUtdXNlIG9mIGNhY2hlZCAnd2luZG93LnN0YXJzaGVsbC5jb25uZWN0JyBtZXRob2RgKTtcblxuXHRcdFx0XHRcdC8vIGZ1bmN0aW9uIGhhcyBub3cgYmVlbiB1c2VkXG5cdFx0XHRcdFx0Yl91c2VkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdC8vIG1pc3NpbmcgYWR2ZXJ0aXNlbWVudFxuXHRcdFx0XHRcdGlmKCFnX2FkdmVydGlzZW1lbnQpIHJldHVybiBmZV9yZWplY3QobmV3IFR5cGVFcnJvcignTWlzc2luZyByZXF1aXNpdGUgYWR2ZXJ0aXNlbWVudCBvYmplY3QgaW4gYXJndW1lbnRzJykpO1xuXG5cdFx0XHRcdFx0Ly8gYWR2ZXJ0aXNlbWVudCBkaWQgbm90IG9yaWdpbmF0ZSBmcm9tIHN0YXJzaGVsbFxuXHRcdFx0XHRcdGlmKGdfYWR2ZXJ0aXNlbWVudCAhPT0gZ19hZHZlcnRpc2VtZW50X291dGdvaW5nKSByZXR1cm4gZmVfcmVqZWN0KG5ldyBFcnJvcignSWdub3JpbmcgcmVxdWVzdCB0byBjb25uZWN0IHVzaW5nIGZvcmVpZ24gYWR2ZXJ0aXNlbWVudCcpKTtcblxuXHRcdFx0XHRcdC8vIGRpc2FybSB1c2VyIGlucHV0XG5cdFx0XHRcdFx0bGV0IHN4X21hbmlmZXN0ID0gJyc7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHN4X21hbmlmZXN0ID0gSlNPTi5zdHJpbmdpZnkoZ2NfbWFuaWZlc3QpO1xuXHRcdFx0XHRcdFx0Z2NfbWFuaWZlc3QgPSBKU09OLnBhcnNlKHN4X21hbmlmZXN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2F0Y2goZV9kaXNhcm0pIHtcblx0XHRcdFx0XHRcdHJldHVybiBmZV9yZWplY3QobmV3IEVycm9yKGBJbnZhbGlkIG1hbmlmZXN0IG9iamVjdDsgZmFpbGVkIHRvIHNlcmlhbGl6ZS5cXG4ke2VfZGlzYXJtLnN0YWNrfWApKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBjaGVjayBieXRlIGxlbmd0aFxuXHRcdFx0XHRcdGlmKHRleHRfdG9fYnVmZmVyKHN4X21hbmlmZXN0KS5ieXRlTGVuZ3RoID4gTkJfTUFYX01FU1NBR0UpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmZV9yZWplY3QobmV3IEVycm9yKCdNZXNzYWdlIGV4Y2VlZHMgbWF4aW11bSBieXRlIGxlbmd0aCcpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRcdC8vIHNhdmUgcmVxdWVzdFxuXHRcdFx0XHRcdGhtX3JlcXVlc3RzLnNldChpX2FjY2Vzc19jb25uZWN0LCB7XG5cdFx0XHRcdFx0XHRpbmRleDogaV9hY2Nlc3NfY29ubmVjdCxcblx0XHRcdFx0XHRcdG1hbmlmZXN0OiBnY19tYW5pZmVzdCxcblx0XHRcdFx0XHRcdHJlc29sdmU6IGZrX3Jlc29sdmUsXG5cdFx0XHRcdFx0XHRyZWplY3Q6IGZlX3JlamVjdCxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8vIGFkdmVydGlzZW1lbnQgaXMgbGVnaXRpbWF0ZSwgc3VibWl0IGNvbm5lY3Rpb24gcmVxdWVzdFxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRkX3BvcnQucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAncmVxdWVzdENvbm5lY3QnLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRcdFx0XHRcdGluZGV4OiBpX2FjY2Vzc19jb25uZWN0LFxuXHRcdFx0XHRcdFx0XHRcdG1hbmlmZXN0OiBnY19tYW5pZmVzdCxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBzZXJpYWxpemF0aW9uIGVycm9yIHBvc3RpbmcgbWVzc2FnZVxuXHRcdFx0XHRcdGNhdGNoKGVfcG9zdCkge1xuXHRcdFx0XHRcdFx0ZF9wb3J0LnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ3JlcG9ydFdlYnNpdGVFcnJvcicsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiAoZV9wb3N0LnN0YWNrIHx8IGVfcG9zdCB8fCAnJykrJycsXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0Ly8gc2hvdyBpbiBwYWdlIGNvbnNvbGVcblx0XHRcdFx0XHRcdHJldHVybiBmZV9yZWplY3QobmV3IEVycm9yKGBJbnZhbGlkIGNvbm5lY3Rpb24gcmVxdWVzdDsgZmFpbGVkIHRvIHNlcmlhbGl6ZSBvYmplY3QuXFxuJHtlX3Bvc3Quc3RhY2t9YCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cdH07XG5cblx0Ly8gZWFjaCBrZXkgdG8gZnJlZXplIG9uIHRoZSBuZXcgd2luZG93IG9iamVjdFxuXHRmb3IoY29uc3Qgc2lfa2V5IG9mIEFfU0FGRV9GVU5DVElPTlMpIHtcblx0XHQvLyBkZWVwIGZyZWV6ZSBpdCBvbnRvIHRoZSBidW5kbGUgb2JqZWN0XG5cdFx0aF9idW5kbGVbc2lfa2V5XSA9IGRlZXBfZnJlZXplKHdpbmRvd1tzaV9rZXldKTtcblx0fVxuXG5cdC8vIGZyZWV6ZSB0aGUgYnVuZGxlIG9iamVjdFxuXHRPYmplY3QuZnJlZXplKGhfYnVuZGxlKTtcblxuXHQvLyByZWYgcGFyZW50IHdpbmRvd1xuXHRjb25zdCBkX3BhcmVudCA9IHdpbmRvdy5wYXJlbnQ7XG5cblx0Ly8gYnVuZGxlIHNldHRlclxuXHRjb25zdCBmX3NldHRlcl9zdGFyc2hlbGwgPSAoKSA9PiB7XG5cdFx0Ly8gbm8tb3Bcblx0fTtcblxuXHQvLyBidW5kbGUgZ2V0dGVyXG5cdGNvbnN0IGZfZ2V0dGVyX3N0YXJzaGVsbCA9ICgpID0+IHtcblx0XHQvLyBhbHJlYWR5IGFib3J0ZWRcblx0XHRpZihiX2Fib3J0ZWQpIHRocm93IG5ldyBFcnJvcignU3RhclNoZWxsIHdpdGhkcmV3IHdhbGxldCBhY2Nlc3MgZnJvbSB0aGlzIHdlYnNpdGUgZHVlIHRvIGEgc2VjdXJpdHkgdmlvbGF0aW9uJyk7XG5cblx0XHQvLyBjb3VudCBhY2Nlc3MgYXR0ZW1wdHNcblx0XHRjX2FjY2Vzc19leHBvcnQgKz0gMTtcblxuXHRcdC8vIHdpbGwgd2FudCB0byBjb21wYXJlIHN0YWNrcyBsYXRlclxuXHRcdGlmKGJfYWNjZXNzX2NhcHR1cmUpIHtcblx0XHRcdHRyeSB7IHRocm93IG5ldyBFcnJvcignU3RhclNoZWxsIHNlY3VyaXR5IGNoZWNrJyk7IH0gY2F0Y2goZV90aHJvd24pIHsgYV9zdGFja3NfaW5pdC5wdXNoKGVfdGhyb3duLnN0YWNrKTsgfVxuXHRcdH1cblxuXHRcdC8vIHJldHVybiBidW5kbGVcblx0XHRyZXR1cm4gaF9idW5kbGU7XG5cdH07XG5cblx0Ly8gZGVmaW5lIG5vbi1tb2RpZmlhYmxlIHByb3BlcnR5IG9uIHBhcmVudCB3aW5kb3dcblx0aWYoIVJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZF9wYXJlbnQsIFNJX0VYUE9SVCwge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRzZXQ6IGZfc2V0dGVyX3N0YXJzaGVsbCxcblx0XHRnZXQ6IGZfZ2V0dGVyX3N0YXJzaGVsbCxcblx0fSkgfHwgZF9wYXJlbnRbU0lfRVhQT1JUXSAhPT0gaF9idW5kbGUpIHtcblx0XHRyZXR1cm4gYWJvcnQoYFVuYWJsZSB0byBkZWZpbmUgbm9uLW1vZGlmaWFibGUgcHJvcGVydHkgJyR7U0lfRVhQT1JUfScgb24gcGFyZW50IHdpbmRvd2ApO1xuXHR9XG5cblx0Ly8gcmVkdW5kYW50IGFzc2VydGlvblxuXHRpZighT2JqZWN0LmlzRnJvemVuKHdpbmRvd1tTSV9FWFBPUlRdKSkge1xuXHRcdE9iamVjdC5mcmVlemUod2luZG93W1NJX0VYUE9SVF0pO1xuXG5cdFx0Ly8gc3RpbGwgZGlkbid0IHdvcmtcblx0XHRpZighT2JqZWN0LmlzRnJvemVuKHdpbmRvd1tTSV9FWFBPUlRdKSkge1xuXHRcdFx0cmV0dXJuIGFib3J0KGBVbmFibGUgdG8gZnJlZXplIHByb3BlcnR5ICcke1NJX0VYUE9SVH0nIG9uIHBhcmVudCB3aW5kb3dgKTtcblx0XHR9XG5cdH1cblx0XG5cdC8vIGNvbmZpcm0gbW9kaWZpYWJpbGl0eSB1c2luZyBzZWNvbmRhcnkgbWV0aG9kXG5cdHtcblx0XHRjb25zdCBnY19jb25maXJtID0gUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZF9wYXJlbnQsIFNJX0VYUE9SVCk7XG5cdFx0aWYoJ29iamVjdCcgIT09IHR5cGVvZiBnY19jb25maXJtXG5cdFx0XHR8fCBmYWxzZSAhPT0gZ2NfY29uZmlybS5jb25maWd1cmFibGVcblx0XHRcdHx8IGZfZ2V0dGVyX3N0YXJzaGVsbCAhPT0gZ2NfY29uZmlybS5nZXRcblx0XHRcdHx8IGZfc2V0dGVyX3N0YXJzaGVsbCAhPT0gZ2NfY29uZmlybS5zZXRcblx0XHQpIHtcblx0XHRcdHJldHVybiBhYm9ydChgRmFpbGVkIHRvIGNvbmZpcm0gZGVmaW5pdGlvbiBvZiBub24tbW9kaWZpYWJsZSBwcm9wZXJ0eSAnJHtTSV9FWFBPUlR9JyBvbiBwYXJlbnQgd2luZG93YCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gdmVyYm9zZVxuXHRkZWJ1ZyhgRGVmaW5lZCBnbG9iYWwgd2luZG93LnN0YXJzaGVsbCAlb2AsIGRfcGFyZW50LnN0YXJzaGVsbCk7XG5cblx0Ly8gY3JlYXRlIG5ldyBNZXNzYWdlQ2hhbm5lbCB0byBjb21tdW5pY2F0ZSB3aXRoIGlzb2xhdGVkIGNvbnRlbnQgc2NyaXB0XG5cdGNvbnN0IGRfY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuXG5cdC8vIHNhdmUgbG9jYWwgc2lkZSBvZiBwb3J0XG5cdGRfcG9ydCA9IGRfY2hhbm5lbC5wb3J0MTtcblxuXHQvLyBvbmx5IGFsbG93IGZvciBhIHNpbmdsZSBhY2tub2x3ZWRnZW1lbnRcblx0bGV0IGJfYWNrX3JlbGF5ID0gZmFsc2U7XG5cblx0Ly8gdGhlIG91dGdvaW5nIGFkdmVydGlzZW1lbnRcblx0bGV0IGdfYWR2ZXJ0aXNlbWVudF9vdXRnb2luZztcblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciBhcHAgaXMgcmVhZHkgdG8gYWR2ZXJ0aXNlIGluIG1haW4gd29ybGRcblx0ICovXG5cdGZ1bmN0aW9uIGNoZWNrX2FkdmVydGlzZW1lbnQoKSB7XG5cdFx0Ly8gZ2xvYmFsIGlzIHJhdGlmaWVkIGFuZCByZWxheSBpcyBhY2tub3dsZWRnZVxuXHRcdGlmKGJfcmF0aWZpZWQgJiYgYl9hY2tfcmVsYXkpIHtcblx0XHRcdC8vIGFkdmVydGlzZW1lbnQgYWxyZWFkeSBtYWRlXG5cdFx0XHRpZihnX2FkdmVydGlzZW1lbnRfb3V0Z29pbmcpIHtcblx0XHRcdFx0cmV0dXJuIGFib3J0KCdBZHZlcnRpc2VtZW50IGFscmVhZHkgbWFkZScpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjcmVhdGUgYWR2ZXJ0aXNlbWVudFxuXHRcdFx0Z19hZHZlcnRpc2VtZW50X291dGdvaW5nID0ge1xuXHRcdFx0XHRpc1N0YXJTaGVsbDogdHJ1ZSxcblx0XHRcdFx0ZmVhdHVyZXM6IFtdLFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gYWR2ZXJ0aXNlXG5cdFx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudC5jYWxsKGRfcGFyZW50LCBuZXcgQ3VzdG9tRXZlbnQoJ3dhbGxldEFkdmVydGlzZW1lbnQnLCB7XG5cdFx0XHRcdGRldGFpbDogZ19hZHZlcnRpc2VtZW50X291dGdvaW5nLFxuXHRcdFx0fSkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIHByZXAgcG9ydCBoYW5kbGVyc1xuXHQvLyBjb25zdCBoX2hhbmRsZXJzX3BvcnQ6IFJlY29yZDxIb3N0VG9SZWxheS5DaGFubmVsTWVzc2FnZVsndHlwZSddLCBNZXNzYWdlSGFuZGxlcj4gPSB7XG5cdGNvbnN0IGhfaGFuZGxlcnNfcG9ydDogVm9jYWIuSGFuZGxlcnNQb3J0UmVjZWl2YWJsZTxIb3N0VG9SZWxheS5BdXRoZWRWb2NhYj4gPSB7XG5cdFx0Ly8gaXNvbGF0ZWQgY29udGVudCBzY3JpcHQgYWNrbm93bGVkZ2VkIHJlbGF5XG5cdFx0YWNrbm93bGVkZ2VDaGFubmVsKCkge1xuXHRcdFx0YXNzZXJ0X25vdF9hYm9ydGVkKCk7XG5cblx0XHRcdC8vIGV4cGVjdCBleGFjdGx5IDEgYWNrbm93bGVkZ2VtZW50XG5cdFx0XHRpZihiX2Fja19yZWxheSkge1xuXHRcdFx0XHRyZXR1cm4gYWJvcnQoJ1JlY2VpdmVkIG1vcmUgdGhhbiAxIHJlbGF5IGFja25vd2xlZGdlbWVudCcpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZWxheSB3YXMgYWNrbm93bGVkZ2VkXG5cdFx0XHRiX2Fja19yZWxheSA9IHRydWU7XG5cblx0XHRcdC8vIGNoZWNrIGlmIHJlYWR5IHRvIGFkdmVydGlzZVxuXHRcdFx0Y2hlY2tfYWR2ZXJ0aXNlbWVudCgpO1xuXHRcdH0sXG5cblx0XHQvLyBjb25uZWN0aW9uXG5cdFx0YXN5bmMgcmVzcG9uZENvbm5lY3QoZ19yZXNwb25zZSwgYV9wb3J0cykge1xuXHRcdFx0YXNzZXJ0X25vdF9hYm9ydGVkKCk7XG5cblx0XHRcdC8vIGRlc3RydWN0dXJlIHJlc3BvbnNlXG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdGluZGV4OiBpX3Jlc3BvbnNlLFxuXHRcdFx0XHRhbnN3ZXI6IGdfYW5zd2VyLFxuXHRcdFx0fSA9IGdfcmVzcG9uc2U7XG5cblx0XHRcdC8vIGZldGNoIHJlcXVlc3QgZnJvbSBtYXBcblx0XHRcdGNvbnN0IGdfcmVxdWVzdCA9IGhtX3JlcXVlc3RzLmdldChpX3Jlc3BvbnNlKTtcblx0XHRcdGlmKCFnX3JlcXVlc3QpIHtcblx0XHRcdFx0cmV0dXJuIHJlcG9ydF9idWcoYENvbm5lY3Rpb24gcmVzcG9uc2UgaW5kZXggXCIke2lfcmVzcG9uc2V9XCIgd2FzIG5vdCBmb3VuZCBpbiByZWxheSBmcmFtZSBtYXBgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZGVzdHJ1Y3R1cmUgYW5zd2VyXG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdGVycm9yOiBzX2Vycm9yLFxuXHRcdFx0XHRoYW5kbGU6IHNpX2hhbmRsZSxcblx0XHRcdFx0Y29uZmlnOiBnY19oYW5kbGUsXG5cdFx0XHR9ID0gZ19hbnN3ZXIgYXMgVW5pb24uTWVyZ2U8dHlwZW9mIGdfYW5zd2VyPjtcblxuXHRcdFx0Ly8gdGhlcmUgd2FzIGFuIGVycm9yXG5cdFx0XHRpZihzX2Vycm9yKSB7XG5cdFx0XHRcdHJldHVybiBnX3JlcXVlc3QucmVqZWN0KG5ldyBFcnJvcihzX2Vycm9yKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIG5vIHBvcnRzXG5cdFx0XHRpZighYV9wb3J0cyB8fCAhYV9wb3J0cy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIHJlcG9ydF9idWcoYENvbm5lY3Rpb24gcmVzcG9uc2UgaW5kZXggXCIke2lfcmVzcG9uc2V9XCIgaXMgbWlzc2luZyBNZXNzYWdlUG9ydHNgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY29ubmVjdGlvbiBzdWNjZXNzOyBjcmVhdGUgaGFuZGxlXG5cdFx0XHRjb25zdCBrX2hhbmRsZSA9IGF3YWl0IENvbm5lY3Rpb25IYW5kbGUuY3JlYXRlKHNpX2hhbmRsZSwgZ2NfaGFuZGxlLCBhX3BvcnRzWzBdKTtcblxuXHRcdFx0Ly8gcmVzcG9uZCB0byByZXF1ZXN0XG5cdFx0XHRnX3JlcXVlc3QucmVzb2x2ZShrX2hhbmRsZSk7XG5cdFx0fSxcblx0fTtcblxuXHQvLyBiaW5kIGxpc3RlbmVyXG5cdGRfcG9ydC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiBwb3J0X21lc3NhZ2VfaGFuZGxlcihkX2V2ZW50KSB7XG5cdFx0Ly8gZGVzdHJ1Y3R1cmUgbWVzc2FnZSBkYXRhXG5cdFx0Y29uc3Qge1xuXHRcdFx0dHlwZTogc2lfdHlwZSxcblx0XHRcdHZhbHVlOiB3X3ZhbHVlLFxuXHRcdH0gPSBkX2V2ZW50LmRhdGEgYXMgVW5pb24uTWVyZ2U8dHlwZW9mIGRfZXZlbnQuZGF0YT47XG5cblx0XHQvLyByZWYgaGFuZGxlclxuXHRcdGNvbnN0IGZfaGFuZGxlciA9IGhfaGFuZGxlcnNfcG9ydFtzaV90eXBlXSBhcyBWb2NhYi5IYW5kbGVyUG9ydFJlY2VpdmFibGU7XG5cdFx0aWYoIWZfaGFuZGxlcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgUmVjZWl2ZWQgbWVzc2FnZSBoYXZpbmcgYW4gdW5yZWdpc3RlcmVkIHR5cGUgXCIke3NpX3R5cGV9XCJgKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBoYW5kbGVyIGlzIHJlZ2lzdGVyZWQ7IGV4ZWN1dGUgaXRcblx0XHRkZWJ1ZyhgUmVjZWl2ZWQgcmVsYXkgcG9ydCBtZXNzYWdlIGhhdmluZyByZWdpc3RlcmVkIHR5cGUgJW9gLCBkX2V2ZW50LmRhdGEpO1xuXHRcdGZfaGFuZGxlcih3X3ZhbHVlID8/IG51bGwsIGRfZXZlbnQucG9ydHMpO1xuXHR9O1xuXG5cdC8vIHR5cGUtY2hlY2tcblx0Y29uc3QgZ19lc3RhYmxpc2g6IE9taXQ8Vm9jYWIuTWVzc2FnZTxSZWxheVRvSG9zdC5TdWJmcmFtZVZvY2FiLCAnZXN0YWJsaXNoQ2hhbm5lbCc+LCAnYXV0aCc+ID0ge1xuXHRcdHR5cGU6ICdlc3RhYmxpc2hDaGFubmVsJyxcblx0fTtcblxuXHQvLyBpbnNlcnQgYXV0aFxuXHRnX2VzdGFibGlzaFsnYXV0aCddID0gSlNPTi5zdHJpbmdpZnkoaG1hY1NIQTI1NihKU09OLnN0cmluZ2lmeShnX2VzdGFibGlzaCksIHNoX3Nlc3Npb24pKTtcblxuXHQvLyBub3RpZnkgaXNvbGF0ZWQgY29udGVudCBzY3JpcHQgdGhhdCByZWxheSBpcyBzZWN1cmVkIGFuZCB0cmFuc2ZlciBwb3J0XG5cdHdpbmRvdy5wb3N0TWVzc2FnZShnX2VzdGFibGlzaCwgd2luZG93Lm9yaWdpbiwgW2RfY2hhbm5lbC5wb3J0Ml0pO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQ0MsQUFBVyxZQUFBO0FBQ0wsUUFBQSxhQUFhLFdBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUViLFFBQUEsRUFBRSxtQkFBbUIsU0FBQSxTQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ3JCLFFBQUEsRUFBRSxxQkFBcUIsU0FBQSxTQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
