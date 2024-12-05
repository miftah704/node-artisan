#!/usr/bin/env node
"use strict";

var _commander = require("commander");
var _controller = require("./controller.js");
var _model = require("./model.js");
var _transformer = require("./transformer.js");
var _service = require("./service.js");
var _repository = require("./repository.js");
var _enum = require("./enum.js");
var _chalk = _interopRequireDefault(require("chalk"));
var _figures = _interopRequireDefault(require("figures"));
var _table = require("table");
var _middleware = require("./middleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var program = new _commander.Command();
program.command('list').description('List all available artisan commands').action(function () {
  console.log(_chalk["default"].cyan(_figures["default"].info), _chalk["default"].bold('[Available Commands]'));
  console.log();
  var data = program.commands.map(function (cmd) {
    return [_chalk["default"].bold.yellow(cmd.name()), _chalk["default"].whiteBright(cmd.description())];
  });
  var config = {
    columns: {
      0: {
        alignment: 'left',
        wrapWord: true
      },
      1: {
        alignment: 'left',
        wrapWord: true
      }
    },
    border: {
      topBody: _chalk["default"].gray('─'),
      topJoin: _chalk["default"].gray('┬'),
      topLeft: _chalk["default"].gray('┌'),
      topRight: _chalk["default"].gray('┐'),
      bottomBody: _chalk["default"].gray('─'),
      bottomJoin: _chalk["default"].gray('┴'),
      bottomLeft: _chalk["default"].gray('└'),
      bottomRight: _chalk["default"].gray('┘'),
      bodyLeft: _chalk["default"].gray('│'),
      bodyRight: _chalk["default"].gray('│'),
      bodyJoin: _chalk["default"].gray('│'),
      joinBody: _chalk["default"].gray('─'),
      joinLeft: _chalk["default"].gray('├'),
      joinRight: _chalk["default"].gray('┤'),
      joinJoin: _chalk["default"].gray('┼')
    },
    drawHorizontalLine: function drawHorizontalLine(index, size) {
      return index === 0 || index === 1 || index === size;
    }
  };
  var output = (0, _table.table)([[_chalk["default"].bold('Command'), _chalk["default"].bold('Description')]].concat(_toConsumableArray(data)), config);
  console.log(output);
});
program.command('make:controller <name> [functions...]').description('Create a new controller in src/controllers directory').action(function (name) {
  var functions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _controller.makeController)(name, functions);
});
program.command('make:enum <name> [functions...]').description('Create a new enum in src/enums directory').action(function (name) {
  var functions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _enum.makeEnum)(name, functions);
});
program.command('make:middleware <name> [functions...]').description('Create a new middleware in src/middleware directory').action(function (name) {
  var functions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _middleware.makeMiddleware)(name, functions);
});
program.command('make:model <name>').description('Create a new model in src/models directory').action(function (name) {
  return (0, _model.makeModel)(name);
});
program.command('make:transformer <name>').description('Create a new transformer in src/transformers directory').action(function (name) {
  return (0, _transformer.makeTransformer)(name);
});
program.command('make:service <name> [functions...]').description('Create a new service in src/services directory').action(function (name) {
  var functions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _service.makeService)(name, functions);
});
program.command('make:repository <name> [functions...]').description('Create a new repository in src/repositories directory').action(function (name) {
  var functions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _repository.makeRepository)(name, functions);
});
program.parse(process.argv);