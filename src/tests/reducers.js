/* @flow */

import { type Handlers, type Frozen, handleActions } from '../'

import {
  type Actions,

  TEST,
  INIT,
  UPDATE,
} from './actions'

export type State = Frozen<{
    data: {
      nestedData: number,
    },
    anotherData: string,
    arrayData: $ReadOnlyArray<{test: string}>,
}>;

handleActions(({
  [INIT]: state => state,

  [UPDATE]: (state, { payload }) => ({
    ...state,
    anotherData: payload,
  }),
}: Handlers<State, Actions>))

/**
 * $ExpectError
 *
 * Property HEY not found in the Type
 */
handleActions(({
  HEY: state => state,
}: Handlers<State, Actions>))

/**
 * $ExpectError
 *
 * Incompatible state and payload types
 */
handleActions(({
  [UPDATE]: (state, { payload }) => ({
    ...state,
    data: payload,
  }),
}: Handlers<State, Actions>))

handleActions(({
  [TEST]: (state, action) => {
    /* eslint-disable no-param-reassign */

    /**
     * $ExpectError
     *
     * Deep Immutable State
     */
    state.data.nestedData = 1

    /**
     * $ExpectError
     *
     * Deep Immutable action
     */
    action.payload.data.nestedData = 'test'

    /**
     * $ExpectError
     *
     * It should keep ReadOnlyArray Type
     */
    state.arrayData[0] = { test: 'me' }

    /**
     * $ExpectError
     *
     * Deep Immutable ReadOnlyArray Item
     */
    state.arrayData[0].test = 'me'

    /* eslint-enable no-param-reassign */

    return state
  },
}: Handlers<State, Actions>))

const reducer = handleActions(({
  [UPDATE]: (state, { payload }) => ({
    ...state,
    anotherData: payload,
  }),
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
