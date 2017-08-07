import expect from 'expect';
import { describe, it } from 'mocha';
import { generateActions } from '../src';

describe('generateActions', () => {
  describe('given an array of resource names', () => {
    it('generates and returns an object of actions', () => {
      const RESOURCES = [ 'post', 'user' ];
      const generated = generateActions(RESOURCES);

      //posts
      expect(generated[ 'DELETE_POST' ]).toEqual('request: delete post');
      expect(generated[ 'DELETE_POST_ERROR' ]).toEqual('error: delete post');
      expect(generated[ 'DELETE_POST_SUCCESS' ]).toEqual('success: delete post');

      expect(generated[ 'GET_POSTS' ]).toEqual('request: get posts');
      expect(generated[ 'GET_POSTS_ERROR' ]).toEqual('error: get posts');
      expect(generated[ 'GET_POSTS_SUCCESS' ]).toEqual('success: get posts (replace existing state)');
      expect(generated[ 'GET_POSTS_SUCCESS_ADD' ]).toEqual('success: get posts (add to existing state)');

      expect(generated[ 'GET_ALL_POSTS' ]).toEqual('request: get all posts');
      expect(generated[ 'GET_ALL_POSTS_ERROR' ]).toEqual('error: get all posts');
      expect(generated[ 'GET_ALL_POSTS_SUCCESS' ]).toEqual('success: get all posts (replace existing state)');
      expect(generated[ 'GET_ALL_POSTS_SUCCESS_ADD' ]).toEqual('success: get all posts (add to existing state)');

      expect(generated[ 'GET_SINGLE_POST' ]).toEqual('request: get single post');
      expect(generated[ 'GET_SINGLE_POST_ERROR' ]).toEqual('error: get single post');
      expect(generated[ 'GET_SINGLE_POST_SUCCESS' ]).toEqual('success: get single post');

      expect(generated[ 'SAVE_POST' ]).toEqual('request: save post');
      expect(generated[ 'SAVE_POST_ERROR' ]).toEqual('error: save post');
      expect(generated[ 'SAVE_POST_SUCCESS' ]).toEqual('success: save post');

      expect(generated[ 'SAVE_POSTS' ]).toEqual('request: save posts');
      expect(generated[ 'SAVE_POSTS_ERROR' ]).toEqual('error: save posts');
      expect(generated[ 'SAVE_POSTS_SUCCESS' ]).toEqual('success: save posts');

      //users
      expect(generated[ 'GET_USERS' ]).toEqual('request: get users');
      expect(generated[ 'GET_USERS_ERROR' ]).toEqual('error: get users');
      expect(generated[ 'GET_USERS_SUCCESS' ]).toEqual('success: get users (replace existing state)');
      expect(generated[ 'GET_USERS_SUCCESS_ADD' ]).toEqual('success: get users (add to existing state)');

      expect(generated[ 'GET_ALL_USERS' ]).toEqual('request: get all users');
      expect(generated[ 'GET_ALL_USERS_ERROR' ]).toEqual('error: get all users');
      expect(generated[ 'GET_ALL_USERS_SUCCESS' ]).toEqual('success: get all users (replace existing state)');
      expect(generated[ 'GET_ALL_USERS_SUCCESS_ADD' ]).toEqual('success: get all users (add to existing state)');

      expect(generated[ 'GET_SINGLE_USER' ]).toEqual('request: get single user');
      expect(generated[ 'GET_SINGLE_USER_ERROR' ]).toEqual('error: get single user');
      expect(generated[ 'GET_SINGLE_USER_SUCCESS' ]).toEqual('success: get single user');

      expect(generated[ 'SAVE_USER' ]).toEqual('request: save user');
      expect(generated[ 'SAVE_USER_ERROR' ]).toEqual('error: save user');
      expect(generated[ 'SAVE_USER_SUCCESS' ]).toEqual('success: save user');

      expect(generated[ 'SAVE_USERS' ]).toEqual('request: save users');
      expect(generated[ 'SAVE_USERS_ERROR' ]).toEqual('error: save users');
      expect(generated[ 'SAVE_USERS_SUCCESS' ]).toEqual('success: save users');
    });
  });
});
