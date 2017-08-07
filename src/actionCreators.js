import _ from 'underscore';
import _s from 'underscore.string';

let ACTION_CREATORS = {};

export default function (resources, actions) {
  _.forEach(resources, resourceName => {
    const ResourceName = _s.capitalize(resourceName);
    const RESOURCE_NAME = resourceName.toUpperCase();

    // get
    ACTION_CREATORS[ `get${ResourceName}s` ] = (dao, params, resetState = true) => {
      const promise = dao[ `${resourceName}s` ].get(params);

      const onSuccess = (dispatch, resources, totalCount) => {
        if (resetState) {
          dispatch({
            type: actions[ `GET_${RESOURCE_NAME}S_SUCCESS` ],
            [ `${resourceName}s` ]: resources,
            totalCount
          });
        } else {
          dispatch({
            type: actions[ `GET_${RESOURCE_NAME}S_SUCCESS_ADD` ],
            [ `${resourceName}s` ]: resources,
            totalCount
          });
        }
      };

      const onError = (dispatch, error) => {
        dispatch({ type: actions[ `GET_${RESOURCE_NAME}S_ERROR` ], error });
      };

      return (dispatch) => {
        dispatch({ type: actions[ `GET_${RESOURCE_NAME}S` ], promise });

        return promise
          .then(({ results, totalCount }) => onSuccess(dispatch, results, totalCount))
          .catch((error) => onError(dispatch, error));
      };
    };

    // getAll
    ACTION_CREATORS[ `getAll${ResourceName}s` ] = (dao, params, resetState = true) => {
      const promise = dao[ `${resourceName}s` ].getAll(params);

      const onSuccess = (dispatch, resources) => {
        if (resetState) {
          dispatch({
            type: actions[ `GET_ALL_${RESOURCE_NAME}S_SUCCESS` ],
            [ `${resourceName}s` ]: resources,
          });
        } else {
          dispatch({
            type: actions[ `GET_ALL_${RESOURCE_NAME}S_SUCCESS_ADD` ],
            [ `${resourceName}s` ]: resources,
          });
        }
      };

      const onError = (dispatch, error) => {
        dispatch({ type: actions[ `GET_ALL_${RESOURCE_NAME}S_ERROR` ], error });
      };

      return (dispatch) => {
        dispatch({ type: actions[ `GET_ALL_${RESOURCE_NAME}S` ], promise, });

        return promise
          .then((resource) => onSuccess(dispatch, resource))
          .catch((error) => onError(dispatch, error));
      };
    };

    // getSingle
    ACTION_CREATORS[ `getSingle${ResourceName}` ] = (dao, id) => {
      const promise = dao[ `${resourceName}s` ].getSingle(id);

      const onSuccess = (dispatch, resource) => {
        dispatch({ type: actions[ `GET_SINGLE_${RESOURCE_NAME}_SUCCESS` ], [ `${resourceName}` ]: resource });
      };

      const onError = (dispatch, error) => {
        dispatch({ type: actions[ `GET_SINGLE_${RESOURCE_NAME}_ERROR` ], error });
      };

      return (dispatch) => {
        dispatch({ type: actions[ `GET_SINGLE_${RESOURCE_NAME}` ], promise, });

        return promise
          .then((resource) => onSuccess(dispatch, resource))
          .catch((error) => onError(dispatch, error));
      };
    };

    // save
    ACTION_CREATORS[ `save${ResourceName}` ] = (dao, resource) => {
      const promise = dao[ `${resourceName}s` ].save(resource);

      const onSuccess = (dispatch, resource) => {
        dispatch({ type: actions[ `SAVE_${RESOURCE_NAME}_SUCCESS` ], [ resourceName ]: resource });
      };

      const onError = (dispatch, error) => {
        dispatch({ type: actions[ `SAVE_${RESOURCE_NAME}_ERROR` ], [ resourceName ]: resource, error });
      };

      return (dispatch) => {
        dispatch({ type: actions[ `SAVE_${RESOURCE_NAME}` ], promise, });

        return promise
          .then((resource) => onSuccess(dispatch, resource))
          .catch((error) => onError(dispatch, error));
      };
    };

    // save multiple
    ACTION_CREATORS[ `save${ResourceName}s` ] = (dao, resources) => {
      const promise = Promise.all(_.map(resources, r => dao[ `${resourceName}s` ].save(r)));

      const onSuccess = (dispatch, resources) => {
        dispatch({ type: actions[ `SAVE_${RESOURCE_NAME}S_SUCCESS` ], [ `${resourceName}s` ]: resources });
      };

      const onError = (dispatch, error) => {
        dispatch({ type: actions[ `SAVE_${RESOURCE_NAME}S_ERROR` ], [ `${resourceName}s` ]: resources, error });
      };

      return (dispatch) => {
        dispatch({ type: actions[ `SAVE_${RESOURCE_NAME}S` ], promise, });

        return promise
          .then((resources) => onSuccess(dispatch, resources))
          .catch((error) => onError(dispatch, error));
      };
    };

    // delete
    ACTION_CREATORS[ `delete${ResourceName}` ] = (dao, resource) => {
      const promise = dao[ `${resourceName}s` ].destroyId(resource.id);

      const onSuccess = (dispatch) => {
        dispatch({
          type: actions[ `DELETE_${RESOURCE_NAME}_SUCCESS` ],
          [ resourceName ]: resource,
          onClickUndo: () => dispatch(ACTION_CREATORS[ `save${ResourceName}` ](dao, resource))
        });
      };

      const onError = (dispatch, error) => {
        dispatch({ type: actions[ `DELETE_${RESOURCE_NAME}_ERROR` ], [ resourceName ]: resource, error, });
      };

      return (dispatch) => {
        dispatch({ type: actions[ `DELETE_${RESOURCE_NAME}` ], promise });

        return promise
          .then(() => onSuccess(dispatch))
          .catch((error) => onError(dispatch, error));
      };
    };
  });

  return ACTION_CREATORS;
};
