'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (resources) {
  _underscore2.default.forEach(resources, function (resourceName) {
    var RESOURCE_NAME = resourceName.toUpperCase();

    // delete
    ACTIONS['DELETE_' + RESOURCE_NAME] = 'request: delete ' + resourceName;
    ACTIONS['DELETE_' + RESOURCE_NAME + '_ERROR'] = 'error: delete ' + resourceName;
    ACTIONS['DELETE_' + RESOURCE_NAME + '_SUCCESS'] = 'success: delete ' + resourceName;

    // get paginated
    ACTIONS['GET_' + RESOURCE_NAME + 'S'] = 'request: get ' + resourceName + 's';
    ACTIONS['GET_' + RESOURCE_NAME + 'S_ERROR'] = 'error: get ' + resourceName + 's';
    ACTIONS['GET_' + RESOURCE_NAME + 'S_SUCCESS'] = 'success: get ' + resourceName + 's (replace existing state)';
    ACTIONS['GET_' + RESOURCE_NAME + 'S_SUCCESS_ADD'] = 'success: get ' + resourceName + 's (add to existing state)';

    // get all
    ACTIONS['GET_ALL_' + RESOURCE_NAME + 'S'] = 'request: get all ' + resourceName + 's';
    ACTIONS['GET_ALL_' + RESOURCE_NAME + 'S_ERROR'] = 'error: get all ' + resourceName + 's';
    ACTIONS['GET_ALL_' + RESOURCE_NAME + 'S_SUCCESS'] = 'success: get all ' + resourceName + 's (replace existing state)';
    ACTIONS['GET_ALL_' + RESOURCE_NAME + 'S_SUCCESS_ADD'] = 'success: get all ' + resourceName + 's (add to existing state)';

    // get single
    ACTIONS['GET_SINGLE_' + RESOURCE_NAME] = 'request: get single ' + resourceName;
    ACTIONS['GET_SINGLE_' + RESOURCE_NAME + '_ERROR'] = 'error: get single ' + resourceName;
    ACTIONS['GET_SINGLE_' + RESOURCE_NAME + '_SUCCESS'] = 'success: get single ' + resourceName;

    // save
    ACTIONS['SAVE_' + RESOURCE_NAME] = 'request: save ' + resourceName;
    ACTIONS['SAVE_' + RESOURCE_NAME + '_ERROR'] = 'error: save ' + resourceName;
    ACTIONS['SAVE_' + RESOURCE_NAME + '_SUCCESS'] = 'success: save ' + resourceName;

    // save multiple
    ACTIONS['SAVE_' + RESOURCE_NAME + 'S'] = 'request: save ' + resourceName + 's';
    ACTIONS['SAVE_' + RESOURCE_NAME + 'S_ERROR'] = 'error: save ' + resourceName + 's';
    ACTIONS['SAVE_' + RESOURCE_NAME + 'S_SUCCESS'] = 'success: save ' + resourceName + 's';
  });

  return ACTIONS;
};

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTIONS = {};

;