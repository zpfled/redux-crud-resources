'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateReducers = exports.generateActionCreators = exports.generateActions = undefined;

var _actions = require('./actions.js');

var _actions2 = _interopRequireDefault(_actions);

var _actionCreators = require('./actionCreators.js');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

var _reducers = require('./reducers.js');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.generateActions = _actions2.default;
exports.generateActionCreators = _actionCreators2.default;
exports.generateReducers = _reducers2.default;