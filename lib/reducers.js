'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (resources, actions) {
  _underscore2.default.forEach(resources, function (resourceName) {
    var ResourceName = _underscore4.default.capitalize(resourceName);
    var RESOURCE_NAME = resourceName.toUpperCase();

    REDUCERS['loading' + ResourceName + 's'] = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var action = arguments[1];

      switch (action.type) {
        // all actions which make a fetch
        case actions['DELETE_' + RESOURCE_NAME]:
        case actions['SAVE_' + RESOURCE_NAME]:
        case actions['SAVE_' + RESOURCE_NAME + 'S']:
        case actions['GET_SINGLE_' + RESOURCE_NAME]:
          return action.promise;

        case actions['GET_' + RESOURCE_NAME + 'S']:
        case actions['GET_ALL_' + RESOURCE_NAME + 'S']:
          // cancel any pending fetch promise
          if (state) {
            state.cancel();
          }

          return action.promise;

        // set loading{Resource} to null after all the following actions
        case actions['DELETE_' + RESOURCE_NAME + '_ERROR']:
        case actions['DELETE_' + RESOURCE_NAME + '_SUCCESS']:
        case actions['GET_' + RESOURCE_NAME + 'S_ERROR']:
        case actions['GET_' + RESOURCE_NAME + 'S_SUCCESS']:
        case actions['GET_ALL_' + RESOURCE_NAME + 'S_SUCCESS']:
        case actions['GET_' + RESOURCE_NAME + 'S_SUCCESS_ADD']:
        case actions['SAVE_' + RESOURCE_NAME + '_ERROR']:
        case actions['SAVE_' + RESOURCE_NAME + '_SUCCESS']:
        case actions['SAVE_' + RESOURCE_NAME + 'S_ERROR']:
        case actions['SAVE_' + RESOURCE_NAME + 'S_SUCCESS']:
        case actions['GET_SINGLE_' + RESOURCE_NAME + '_SUCCESS']:
          return null;
        default:
          return state;
      }
    };

    REDUCERS[resourceName + 'sById'] = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments[1];

      switch (action.type) {
        case actions['DELETE_' + RESOURCE_NAME + '_SUCCESS']:
          var newState = _extends({}, state);
          delete newState[action[resourceName].id];
          return newState;
        case actions['GET_' + RESOURCE_NAME + 'S_SUCCESS']:
        case actions['GET_ALL_' + RESOURCE_NAME + 'S_SUCCESS']:
          return _underscore2.default.indexBy(action[resourceName + 's'], 'id');

        case actions['GET_' + RESOURCE_NAME + 'S_SUCCESS_ADD']:
        case actions['GET_ALL_' + RESOURCE_NAME + 'S_SUCCESS_ADD']:
        case actions['SAVE_' + RESOURCE_NAME + 'S_SUCCESS']:
          return _extends({}, state, _underscore2.default.indexBy(action[resourceName + 's'], 'id'));
        case actions['GET_SINGLE_' + RESOURCE_NAME + '_SUCCESS']:
        case actions['SAVE_' + RESOURCE_NAME + '_SUCCESS']:
          return _extends({}, state, _defineProperty({}, action[resourceName].id, action[resourceName]));
        case actions.RESET_ALL_STATE:
          return {};

        default:
          return state;
      }
    };

    REDUCERS['total' + ResourceName + 'sCount'] = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var action = arguments[1];

      switch (action.type) {
        case actions['GET_' + RESOURCE_NAME + 'S_SUCCESS']:
          return action.totalCount;
        case actions['GET_ALL_' + RESOURCE_NAME + 'S_SUCCESS']:
          return action[resourceName + 's'].length;
        case actions.RESET_ALL_STATE:
          return 0;
        default:
          return state;
      }
    };
  });

  return REDUCERS;
};

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _underscore3 = require('underscore.string');

var _underscore4 = _interopRequireDefault(_underscore3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REDUCERS = {};

;