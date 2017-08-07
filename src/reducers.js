import _ from 'underscore';
import _s from 'underscore.string';

let REDUCERS = {};

export default function (resources, actions) {
  _.forEach(resources, resourceName => {
    const ResourceName = _s.capitalize(resourceName);
    const RESOURCE_NAME = resourceName.toUpperCase();

    REDUCERS[ `loading${ResourceName}s` ] = (state = null, action) => {
      switch (action.type) {
        // all actions which make a fetch
        case actions[ `DELETE_${RESOURCE_NAME}` ]:
        case actions[ `SAVE_${RESOURCE_NAME}` ]:
        case actions[ `SAVE_${RESOURCE_NAME}S` ]:
        case actions[ `GET_SINGLE_${RESOURCE_NAME}` ]:
          return action.promise;

        case actions[ `GET_${RESOURCE_NAME}S` ]:
        case actions[ `GET_ALL_${RESOURCE_NAME}S` ]:
          // cancel any pending fetch promise
          if (state) {
            state.cancel();
          }

          return action.promise;

        // set loading{Resource} to null after all the following actions
        case actions[ `DELETE_${RESOURCE_NAME}_ERROR` ]:
        case actions[ `DELETE_${RESOURCE_NAME}_SUCCESS` ]:
        case actions[ `GET_${RESOURCE_NAME}S_ERROR` ]:
        case actions[ `GET_${RESOURCE_NAME}S_SUCCESS` ]:
        case actions[ `GET_ALL_${RESOURCE_NAME}S_SUCCESS` ]:
        case actions[ `GET_${RESOURCE_NAME}S_SUCCESS_ADD` ]:
        case actions[ `SAVE_${RESOURCE_NAME}_ERROR` ]:
        case actions[ `SAVE_${RESOURCE_NAME}_SUCCESS` ]:
        case actions[ `SAVE_${RESOURCE_NAME}S_ERROR` ]:
        case actions[ `SAVE_${RESOURCE_NAME}S_SUCCESS` ]:
        case actions[ `GET_SINGLE_${RESOURCE_NAME}_SUCCESS` ]:
          return null;
        default:
          return state;
      }
    };

    REDUCERS[ `${resourceName}sById` ] = (state = {}, action) => {
      switch (action.type) {
        case actions[ `DELETE_${RESOURCE_NAME}_SUCCESS` ]:
          let newState = { ...state };
          delete newState[ action[ resourceName ].id ];
          return newState;
        case actions[ `GET_${RESOURCE_NAME}S_SUCCESS` ]:
        case actions[ `GET_ALL_${RESOURCE_NAME}S_SUCCESS` ]:
          return _.indexBy(action[ `${resourceName}s` ], 'id');

        case actions[ `GET_${RESOURCE_NAME}S_SUCCESS_ADD` ]:
        case actions[ `GET_ALL_${RESOURCE_NAME}S_SUCCESS_ADD` ]:
        case actions[ `SAVE_${RESOURCE_NAME}S_SUCCESS` ]:
          return { ...state, ..._.indexBy(action[ `${resourceName}s` ], 'id') };
        case actions[ `GET_SINGLE_${RESOURCE_NAME}_SUCCESS` ]:
        case actions[ `SAVE_${RESOURCE_NAME}_SUCCESS` ]:
          return { ...state, [ action[ resourceName ].id ]: action[ resourceName ] };
        case actions.RESET_ALL_STATE:
          return {};

        default:
          return state;
      }
    };

    REDUCERS[ `total${ResourceName}sCount` ] = (state = 0, action) => {
      switch (action.type) {
        case actions[ `GET_${RESOURCE_NAME}S_SUCCESS` ]:
          return action.totalCount;
        case actions[ `GET_ALL_${RESOURCE_NAME}S_SUCCESS` ]:
          return action[ `${resourceName}s` ].length;
        case actions.RESET_ALL_STATE:
          return 0;
        default:
          return state;
      }
    };
  });

  return REDUCERS;
};
