"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GetConfig_js_1 = require("./Library/GetConfig.js");
var Index_js_1 = require("./Option/Index.js");
var files_pipe_1 = require("files-pipe");
var js_api_1 = require("@rometools/js-api");
var path_1 = require("path");
exports.default = (function (_Option) {
    if (_Option === void 0) { _Option = {}; }
    for (var Option_1 in _Option) {
        if (Object.prototype.hasOwnProperty.call(_Option, Option_1) &&
            _Option[Option_1] === true) {
            _Option[Option_1] = Index_js_1.default[Option_1];
        }
    }
    var __Option = (0, files_pipe_1.Merge)(Index_js_1.default, _Option);
    var Paths = new Set();
    if (typeof __Option["Path"] !== "undefined") {
        if (__Option["Path"] instanceof Array ||
            __Option["Path"] instanceof Set) {
            for (var _i = 0, _a = __Option["Path"]; _i < _a.length; _i++) {
                var Path = _a[_i];
                Paths.add(Path);
            }
        }
    }
    return {
        name: "astro-rome",
        hooks: {
            "astro:build:done": function (_a) {
                var Dir = _a.dir;
                return __awaiter(void 0, void 0, void 0, function () {
                    var Rome_1, _b, _c, _d, _i, Paths_1, Path, _Error_1;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _e.trys.push([0, 11, , 12]);
                                if (!Paths.size) {
                                    Paths.add(Dir);
                                }
                                return [4 /*yield*/, js_api_1.Rome.create({
                                        distribution: js_api_1.Distribution.NODE,
                                    })];
                            case 1:
                                Rome_1 = _e.sent();
                                if (!(typeof __Option.Rome === "undefined" ||
                                    __Option.Rome === null)) return [3 /*break*/, 3];
                                _b = __Option;
                                _d = (_c = JSON).parse;
                                return [4 /*yield*/, (0, GetConfig_js_1.default)("rome.json")];
                            case 2:
                                _b.Rome = _d.apply(_c, [_e.sent()]);
                                _e.label = 3;
                            case 3:
                                if (__Option.Rome && __Option.Rome !== true) {
                                    __Option.Rome["$schema"] = undefined;
                                    Rome_1.applyConfiguration(__Option.Rome);
                                }
                                _i = 0, Paths_1 = Paths;
                                _e.label = 4;
                            case 4:
                                if (!(_i < Paths_1.length)) return [3 /*break*/, 10];
                                Path = Paths_1[_i];
                                return [4 /*yield*/, new files_pipe_1.default(__Option["Cache"], __Option["Logger"]).In(Path)];
                            case 5: return [4 /*yield*/, (_e.sent()).By("**/*.{js,mjs,cjs,ts}")];
                            case 6: return [4 /*yield*/, (_e.sent()).Not(__Option["Exclude"])];
                            case 7: return [4 /*yield*/, (_e.sent()).Pipe((0, files_pipe_1.Merge)(Index_js_1.default["Action"], {
                                    Wrote: function (On) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            try {
                                                return [2 /*return*/, Rome_1.formatContent(On.Buffer.toString(), {
                                                        filePath: (0, path_1.resolve)(On.Input),
                                                    }).content];
                                            }
                                            catch (_Error) {
                                                return [2 /*return*/, On.Buffer];
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); },
                                }))];
                            case 8:
                                _e.sent();
                                _e.label = 9;
                            case 9:
                                _i++;
                                return [3 /*break*/, 4];
                            case 10: return [3 /*break*/, 12];
                            case 11:
                                _Error_1 = _e.sent();
                                return [3 /*break*/, 12];
                            case 12: return [2 /*return*/];
                        }
                    });
                });
            },
        },
    };
});
