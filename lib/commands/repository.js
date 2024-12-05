"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRepository = makeRepository;
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _commandUtils = _interopRequireDefault(require("../utils/command.utils.js"));
var _chalk = _interopRequireDefault(require("chalk"));
var _figures = _interopRequireDefault(require("figures"));
var _url = require("url");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);
function makeRepository(name) {
  var functions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var parts = name.split('/');
  var repositoryName = parts.pop();
  var folderPath = _path["default"].join.apply(_path["default"], [_dirname, '..', 'repositories'].concat(_toConsumableArray(parts)));
  var fileName = _commandUtils["default"].removeSuffixFromName(repositoryName, 'repository');
  var pascalClassName = _commandUtils["default"].toPascalCase(fileName);
  var kebabCaseName = _commandUtils["default"].toKebabCase(fileName);
  var filePath = _path["default"].join(folderPath, "".concat(kebabCaseName, ".repository.ts"));
  var classFunctions = _commandUtils["default"].generateFunctions(functions, fileName);
  var content = "export default class ".concat(pascalClassName, "Repository {\n").concat(classFunctions, "\n}");
  var divider = _chalk["default"].gray(_figures["default"].line.repeat(60));
  console.log(_chalk["default"].bold.blue("\n".concat(_figures["default"].info, " [Repository Generator]\n")));
  console.log(_chalk["default"].bold("\u2728 Summary:"));
  console.log("".concat(_chalk["default"].green(_figures["default"].pointerSmall), " Repository Name: ").concat(_chalk["default"].cyan("".concat(pascalClassName))));
  console.log("".concat(_chalk["default"].green(_figures["default"].pointerSmall), " File Name      : ").concat(_chalk["default"].cyan("".concat(kebabCaseName, ".repository.ts"))));
  console.log("".concat(_chalk["default"].green(_figures["default"].pointerSmall), " Folder Path    : ").concat(_chalk["default"].cyan(folderPath)));
  console.log(divider);

  // Handle folder creation
  if (!_fs["default"].existsSync(folderPath)) {
    _fs["default"].mkdirSync(folderPath, {
      recursive: true
    });
    console.log(_chalk["default"].green("".concat(_figures["default"].tick, " Folder created:")), _chalk["default"].blue.bold(folderPath));
  } else {
    console.log(_chalk["default"].yellow("".concat(_figures["default"].warning, " Folder already exists:")), _chalk["default"].gray(folderPath));
  }

  // Handle file existence
  if (_fs["default"].existsSync(filePath)) {
    console.log(_chalk["default"].red("".concat(_figures["default"].cross, " File already exists:")), _chalk["default"].red.underline(filePath));
    console.log(divider);
    return;
  }

  // Create the file
  _commandUtils["default"].createFile(filePath, content);
  console.log(_chalk["default"].green("".concat(_figures["default"].tick, " Repository created successfully!")));
  console.log(_chalk["default"].cyan("".concat(_figures["default"].pointerSmall, " File Location:")), _chalk["default"].blue.underline(filePath));
  console.log(divider);
}