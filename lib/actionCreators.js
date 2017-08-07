'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (resources, actions) {
  _underscore2.default.forEach(resources, function (resourceName) {
    var ResourceName = _underscore4.default.capitalize(resourceName);
    var RESOURCE_NAME = resourceName.toUpperCase();

    // get
    ACTION_CREATORS['get' + ResourceName + 's'] = function (dao, params) {
      var resetState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var promise = dao[resourceName + 's'].get(params);

      var onSuccess = function onSuccess(dispatch, resources, totalCount) {
        if (resetState) {
          var _dispatch;

          dispatch((_dispatch = {
            type: actions['GET_' + RESOURCE_NAME + 'S_SUCCESS']
          }, _defineProperty(_dispatch, resourceName + 's', resources), _defineProperty(_dispatch, 'totalCount', totalCount), _dispatch));
        } else {
          var _dispatch2;

          dispatch((_dispatch2 = {
            type: actions['GET_' + RESOURCE_NAME + 'S_SUCCESS_ADD']
          }, _defineProperty(_dispatch2, resourceName + 's', resources), _defineProperty(_dispatch2, 'totalCount', totalCount), _dispatch2));
        }
      };

      var onError = function onError(dispatch, error) {
        dispatch({ type: actions['GET_' + RESOURCE_NAME + 'S_ERROR'], error: error });
      };

      return function (dispatch) {
        dispatch({ type: actions['GET_' + RESOURCE_NAME + 'S'], promise: promise });

        return promise.then(function (_ref) {
          var results = _ref.results,
              totalCount = _ref.totalCount;
          return onSuccess(dispatch, results, totalCount);
        }).catch(function (error) {
          return onError(dispatch, error);
        });
      };
    };

    // getAll
    ACTION_CREATORS['getAll' + ResourceName + 's'] = function (dao, params) {
      var resetState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var promise = dao[resourceName + 's'].getAll(params);

      var onSuccess = function onSuccess(dispatch, resources) {
        if (resetState) {
          dispatch(_defineProperty({
            type: actions['GET_ALL_' + RESOURCE_NAME + 'S_SUCCESS']
          }, resourceName + 's', resources));
        } else {
          dispatch(_defineProperty({
            type: actions['GET_ALL_' + RESOURCE_NAME + 'S_SUCCESS_ADD']
          }, resourceName + 's', resources));
        }
      };

      var onError = function onError(dispatch, error) {
        dispatch({ type: actions['GET_ALL_' + RESOURCE_NAME + 'S_ERROR'], error: error });
      };

      return function (dispatch) {
        dispatch({ type: actions['GET_ALL_' + RESOURCE_NAME + 'S'], promise: promise });

        return promise.then(function (resource) {
          return onSuccess(dispatch, resource);
        }).catch(function (error) {
          return onError(dispatch, error);
        });
      };
    };

    // getSingle
    ACTION_CREATORS['getSingle' + ResourceName] = function (dao, id) {
      var promise = dao[resourceName + 's'].getSingle(id);

      var onSuccess = function onSuccess(dispatch, resource) {
        dispatch(_defineProperty({ type: actions['GET_SINGLE_' + RESOURCE_NAME + '_SUCCESS'] }, '' + resourceName, resource));
      };

      var onError = function onError(dispatch, error) {
        dispatch({ type: actions['GET_SINGLE_' + RESOURCE_NAME + '_ERROR'], error: error });
      };

      return function (dispatch) {
        dispatch({ type: actions['GET_SINGLE_' + RESOURCE_NAME], promise: promise });

        return promise.then(function (resource) {
          return onSuccess(dispatch, resource);
        }).catch(function (error) {
          return onError(dispatch, error);
        });
      };
    };

    // save
    ACTION_CREATORS['save' + ResourceName] = function (dao, resource) {
      var promise = dao[resourceName + 's'].save(resource);

      var onSuccess = function onSuccess(dispatch, resource) {
        dispatch(_defineProperty({ type: actions['SAVE_' + RESOURCE_NAME + '_SUCCESS'] }, resourceName, resource));
      };

      var onError = function onError(dispatch, error) {
        var _dispatch7;

        dispatch((_dispatch7 = { type: actions['SAVE_' + RESOURCE_NAME + '_ERROR'] }, _defineProperty(_dispatch7, resourceName, resource), _defineProperty(_dispatch7, 'error', error), _dispatch7));
      };

      return function (dispatch) {
        dispatch({ type: actions['SAVE_' + RESOURCE_NAME], promise: promise });

        return promise.then(function (resource) {
          return onSuccess(dispatch, resource);
        }).catch(function (error) {
          return onError(dispatch, error);
        });
      };
    };

    // save multiple
    ACTION_CREATORS['save' + ResourceName + 's'] = function (dao, resources) {
      var promise = Promise.all(_underscore2.default.map(resources, function (r) {
        return dao[resourceName + 's'].save(r);
      }));

      var onSuccess = function onSuccess(dispatch, resources) {
        dispatch(_defineProperty({ type: actions['SAVE_' + RESOURCE_NAME + 'S_SUCCESS'] }, resourceName + 's', resources));
      };

      var onError = function onError(dispatch, error) {
        var _dispatch9;

        dispatch((_dispatch9 = { type: actions['SAVE_' + RESOURCE_NAME + 'S_ERROR'] }, _defineProperty(_dispatch9, resourceName + 's', resources), _defineProperty(_dispatch9, 'error', error), _dispatch9));
      };

      return function (dispatch) {
        dispatch({ type: actions['SAVE_' + RESOURCE_NAME + 'S'], promise: promise });

        return promise.then(function (resources) {
          return onSuccess(dispatch, resources);
        }).catch(function (error) {
          return onError(dispatch, error);
        });
      };
    };

    // delete
    ACTION_CREATORS['delete' + ResourceName] = function (dao, resource) {
      var promise = dao[resourceName + 's'].destroyId(resource.id);

      var onSuccess = function onSuccess(dispatch) {
        var _dispatch10;

        dispatch((_dispatch10 = {
          type: actions['DELETE_' + RESOURCE_NAME + '_SUCCESS']
        }, _defineProperty(_dispatch10, resourceName, resource), _defineProperty(_dispatch10, 'onClickUndo', function onClickUndo() {
          return dispatch(ACTION_CREATORS['save' + ResourceName](dao, resource));
        }), _dispatch10));
      };

      var onError = function onError(dispatch, error) {
        var _dispatch11;

        dispatch((_dispatch11 = { type: actions['DELETE_' + RESOURCE_NAME + '_ERROR'] }, _defineProperty(_dispatch11, resourceName, resource), _defineProperty(_dispatch11, 'error', error), _dispatch11));
      };

      return function (dispatch) {
        dispatch({ type: actions['DELETE_' + RESOURCE_NAME], promise: promise });

        return promise.then(function () {
          return onSuccess(dispatch);
        }).catch(function (error) {
          return onError(dispatch, error);
        });
      };
    };
  });

  return ACTION_CREATORS;
};

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _underscore3 = require('underscore.string');

var _underscore4 = _interopRequireDefault(_underscore3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACTION_CREATORS = {};

;