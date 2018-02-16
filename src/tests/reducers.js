/* @flow */

import { type Handlers, type Frozen, handleActions } from '../'

import {
  type Actions,

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
