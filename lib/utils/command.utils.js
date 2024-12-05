"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Command = /*#__PURE__*/function () {
  function Command() {
    _classCallCheck(this, Command);
  }
  return _createClass(Command, null, [{
    key: "createFile",
    value: function createFile(filePath, template) {
      var folderPath = _path["default"].dirname(filePath);
      if (!_fs["default"].existsSync(folderPath)) {
        _fs["default"].mkdirSync(folderPath, {
          recursive: true
        });
        console.log("Folder ".concat(folderPath, " created successfully."));
      }
      if (_fs["default"].existsSync(filePath)) {
        console.log("".concat(filePath, " already exists."));
        return;
      }
      _fs["default"].writeFileSync(filePath, template);
      console.log("".concat(filePath, " created successfully at: ").concat(filePath));
    }
  }, {
    key: "toKebabCase",
    value: function toKebabCase(str) {
      return str.replace(/[A-Z]/g, function (match) {
        return "-".concat(match.toLowerCase());
      }).replace(/^-/, '');
    }
  }, {
    key: "removeSuffixFromName",
    value: function removeSuffixFromName(name, type) {
      var regex = new RegExp("".concat(type, "(s)?$"), 'i');
      return name.replace(regex, '');
    }
  }, {
    key: "toPascalCase",
    value: function toPascalCase(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        return index === 0 ? match.toUpperCase() : match.toLowerCase();
      }).replace(/\s+/g, '');
    }
  }, {
    key: "generateFunctions",
    value: function generateFunctions(functions, className) {
      return functions.map(function (fn) {
        return "static async ".concat(fn, "(req: Request, res: Response, next: NextFunction) {\n    try {\n      //\n    } catch (error) {\n      next(error)\n    }\n  }");
      }).join('\n');
    }
  }]);
}();
var _default = exports["default"] = Command;