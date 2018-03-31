/* @flow */

/* eslint-disable no-param-reassign */

import { type Handlers, handleActions } from '../immer'

import {
  type Actions,

  INIT,
  UPDATE,
} from './actions'

export type State = {
    data: {
      nestedData: number,
    },
    anotherData: string,
    arrayData: $ReadOnlyArray<{test: string}>,
};

handleActions(({
  [INIT]: state => state,

  [UPDATE]: (state, { payload }) => {
    state.anotherData = payload || ''
  },
}: Handlers<State, Actions>))

/**
 * $ExpectError
 *
 * Property HEY not found in the Type
 */
handleActions(({
  HEY: state => state,
}: Handlers<State, Actions>))

handleActions(({
  [UPDATE]: (state, { payload }) => {
    /**
     * $ExpectError
     *
     * Incompatible state and payload types
     */
    state.data = payload
  },
}: Handlers<State, Actions>))

const reducer = handleActions(({
  [UPDATE]: (state, { payload }) => {
    state.anotherData = payload || ''
  },
}: Handlers<State, Actions>))

/**
 * $ExpectError
 *
 * Incompatible State Types
 */
reducer({
  data: {
    nestedData: 2,
  },
}, {
  type: UPDATE,
  payload: 'test',
})

/**
 * $ExpectError
 *
 * There is no action argument
 */
reducer({
  data: {
    nestedData: 2,
  },
  anotherData: 'test',
})

reducer({
  data: {
    nestedData: 2,
  },
  anotherData: 'test',
  arrayData: [{ test: 'me' }],
}, {
  type: UPDATE,
  payload: 'test',
})

reducer({
  data: {
    nestedData: 2,
  },
  anotherData: 'test',
  arrayData: [{ test: 'me' }],
}, {
  type: UPDATE,
  /**
   * $ExpectError
   *
   * Incompatible Action Type
   */
  payload: 2,
})

/**
 * It should work with State as a primitive
 */
handleActions(({
  [UPDATE]: state => state,
}: Handlers<'a' | 'b' | '', Actions>), '')

/**
 * It should work with State as an array
 */
handleActions(({
  [UPDATE]: state => state,
}: Handlers<$ReadOnlyArray<number>, Actions>), [1, 2, 3])
