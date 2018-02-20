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
    action.data.nestedData = 'test'

    /* eslint-enable no-param-reassign */

    return state
  },
}: Handlers<State, Actions>))
