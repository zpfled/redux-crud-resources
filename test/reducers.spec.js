import expect from 'expect';
import { describe, it } from 'mocha';
import { generateActions, generateReducers } from '../src';
import _ from 'underscore';
import _s from 'underscore.string';
import Promise from 'bluebird';

const RESOURCES = [ 'post', 'user' ];
const ACTIONS = generateActions(RESOURCES);
const REDUCERS = generateReducers(RESOURCES, ACTIONS);

_.forEach(RESOURCES, resourceName => {
  const ResourceName = _s.capitalize(resourceName);
  const RESOURCE_NAME = resourceName.toUpperCase();

  const loadingResources = `loading${ResourceName}s`;
  describe(loadingResources, () => {

    const deleteResource = ACTIONS[ `DELETE_${RESOURCE_NAME}` ];
    describe(deleteResource, () => {
      it('returns a promise without cancelling any existing promises', () => {
        const promise = 'promise';
        const existingPromise = Promise.resolve('existing');
        expect.spyOn(existingPromise, 'cancel');
        expect(REDUCERS[ loadingResources ](existingPromise, { type: deleteResource, promise })).toEqual(promise);
        expect(existingPromise.cancel).toNotHaveBeenCalled();
      });
    });

    const saveResource = ACTIONS[ `SAVE_${RESOURCE_NAME}` ];
    describe(saveResource, () => {
      it('returns a promise without cancelling any existing promises', () => {
        const promise = 'promise';
        const existingPromise = Promise.resolve('existing');
        expect.spyOn(existingPromise, 'cancel');
        expect(REDUCERS[ loadingResources ](existingPromise, { type: saveResource, promise })).toEqual(promise);
        expect(existingPromise.cancel).toNotHaveBeenCalled();
      })
    });

    const saveResources = ACTIONS[ `SAVE_${RESOURCE_NAME}S` ];
    describe(saveResources, () => {
      it('returns a promise without cancelling any existing promises', () => {
        const promise = 'promise';
        const existingPromise = Promise.resolve('existing');
        expect.spyOn(existingPromise, 'cancel');
        expect(REDUCERS[ loadingResources ](existingPromise, { type: saveResources, promise })).toEqual(promise);
        expect(existingPromise.cancel).toNotHaveBeenCalled();
      })
    });

    const getResources = ACTIONS[ `GET_${RESOURCE_NAME}S` ];
    describe(getResources, () => {
      it('returns a promise without cancelling any existing promises', () => {
        const promise = 'promise';
        const existingPromise = Promise.resolve('existing');
        expect.spyOn(existingPromise, 'cancel');
        expect(REDUCERS[ loadingResources ](existingPromise, { type: getResources, promise })).toEqual(promise);
        expect(existingPromise.cancel).toHaveBeenCalled();
      })
    });

    const checkForNullReturn = (actionType) => {
      const promise = 'promise';
      const existingPromise = Promise.resolve('existing');
      expect.spyOn(existingPromise, 'cancel');
      expect(REDUCERS[ loadingResources ](existingPromise, { type: actionType, promise })).toEqual(null);
      expect(existingPromise.cancel).toNotHaveBeenCalled();
    };

    //all actions which return null
    _.forEach([
      ACTIONS[ `DELETE_${RESOURCE_NAME}_ERROR` ],
      ACTIONS[ `DELETE_${RESOURCE_NAME}_SUCCESS` ],
      ACTIONS[ `GET_${RESOURCE_NAME}S_ERROR` ],
      ACTIONS[ `GET_${RESOURCE_NAME}S_SUCCESS` ],
      ACTIONS[ `GET_ALL_${RESOURCE_NAME}S_SUCCESS` ],
      ACTIONS[ `GET_${RESOURCE_NAME}S_SUCCESS_ADD` ],
      ACTIONS[ `SAVE_${RESOURCE_NAME}_ERROR` ],
      ACTIONS[ `SAVE_${RESOURCE_NAME}_SUCCESS` ],
      ACTIONS[ `SAVE_${RESOURCE_NAME}S_ERROR` ],
      ACTIONS[ `SAVE_${RESOURCE_NAME}S_SUCCESS` ],
    ], actionType => {
      describe(actionType, () => it('returns null', () => checkForNullReturn(actionType)));
    })
  });

  const resourcesById = `${resourceName}sById`;
  describe(resourcesById, () => {

    const deleteSuccess = ACTIONS[ `DELETE_${RESOURCE_NAME}_SUCCESS` ];
    describe(deleteSuccess, () => {
      it('returns the collection without the deleted resource included', () => {
        const byId = { 1: { id: 1, name: 'a' }, 2: { id: 2, name: 'b' }, 3: { id: 3, name: 'c' } };

        expect(REDUCERS[ resourcesById ](byId, { type: deleteSuccess, [ resourceName ]: byId[ 1 ] }))
          .toEqual({ 2: { id: 2, name: 'b' }, 3: { id: 3, name: 'c' } });
      });
    });

    const getResourcesSuccess = ACTIONS[ `GET_${RESOURCE_NAME}S_SUCCESS` ];
    describe(getResourcesSuccess, () => {
      it('returns a new collection of the resource, indexed by id', () => {
        const resources = [ { id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' } ];

        expect(REDUCERS[ resourcesById ](null, { type: getResourcesSuccess, [ `${resourceName}s` ]: resources }))
          .toEqual(_.indexBy(resources, 'id'));
      });
    });

    const getAllResourcesSuccess = ACTIONS[ `GET_ALL_${RESOURCE_NAME}S_SUCCESS` ];
    describe(getAllResourcesSuccess, () => {
      it('returns a new collection of the resource, indexed by id', () => {
        const resources = [ { id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' } ];

        expect(REDUCERS[ resourcesById ](null, { type: getResourcesSuccess, [ `${resourceName}s` ]: resources }))
          .toEqual(_.indexBy(resources, 'id'));
      });
    });

    const getResourcesSuccessAdd = ACTIONS[ `GET_${RESOURCE_NAME}S_SUCCESS_ADD` ];
    describe(getResourcesSuccessAdd, () => {
      it('returns the old collection of the resource with the new elements added, indexed by id', () => {
        const byId = { 1: { id: 1, name: 'a' }, 2: { id: 2, name: 'b' }, 3: { id: 3, name: 'c' } };
        const toAdd = [ { id: 4, name: 'd' }, { id: 5, name: 'e' } ];
        expect(REDUCERS[ resourcesById ](byId, { type: getResourcesSuccessAdd, [ `${resourceName}s` ]: toAdd }))
          .toEqual({ ...byId, ..._.indexBy(toAdd, 'id') });
      });
    });

    const getSingleResourceSuccess = ACTIONS[ `GET_SINGLE_${RESOURCE_NAME}_SUCCESS` ];
    describe(getSingleResourceSuccess, () => {
      it('returns the old collection of the resource with the new element added, indexed by id', () => {
        const byId = { 1: { id: 1, name: 'a' }, 2: { id: 2, name: 'b' }, 3: { id: 3, name: 'c' } };
        const toAdd = { id: 4, name: 'd' };

        expect(REDUCERS[ resourcesById ](byId, { type: getSingleResourceSuccess, [ resourceName ]: toAdd }))
          .toEqual({ ...byId, 4: toAdd });
      });
    });

    const saveResourceSuccess = ACTIONS[ `SAVE_${RESOURCE_NAME}_SUCCESS` ];
    describe(saveResourceSuccess, () => {
      it('returns the old collection of the resource with the new elements added, indexed by id', () => {
        const byId = { 1: { id: 1, name: 'a' }, 2: { id: 2, name: 'b' }, 3: { id: 3, name: 'c' } };
        const toAdd = { id: 3, name: 'd' };

        expect(REDUCERS[ resourcesById ](byId, { type: saveResourceSuccess, [ resourceName ]: toAdd }))
          .toEqual({ ...byId, 3: toAdd });
      });
    });

    const saveResourcesSuccess = ACTIONS[ `SAVE_${RESOURCE_NAME}S_SUCCESS` ];
    describe(saveResourcesSuccess, () => {
      it('returns the old collection of the resource with the new elements added, indexed by id', () => {
        const byId = { 1: { id: 1, name: 'a' }, 2: { id: 2, name: 'b' }, 3: { id: 3, name: 'c' } };
        const toAdd = [ { id: 3, name: 'd' }, { id: 4, name: 'e' } ];

        expect(REDUCERS[ resourcesById ](byId, { type: saveResourcesSuccess, [ `${resourceName}s` ]: toAdd }))
          .toEqual({ ...byId, ..._.indexBy(toAdd, 'id') });
      });
    });
  });

  const totalCount = `total${ResourceName}sCount`;
  describe(totalCount, () => {

    const getAllResourcesSuccess = ACTIONS[ `GET_ALL_${RESOURCE_NAME}S_SUCCESS` ];
    describe(getAllResourcesSuccess, () => {
      it('returns the count of all returned resources', () => {
        expect(REDUCERS[ totalCount ](5, { type: getAllResourcesSuccess, [ `${resourceName}s` ]: [ 1, 2, 3, 4 ] }))
          .toEqual(4);
      });
    });

    const getResourcesSuccess = ACTIONS[ `GET_${RESOURCE_NAME}S_SUCCESS` ];
    describe(getResourcesSuccess, () => {
      it('returns the total count of resources', () => {
        expect(REDUCERS[ totalCount ](null, { type: getResourcesSuccess, totalCount: 9 })).toEqual(9);
      });
    });
  });
});