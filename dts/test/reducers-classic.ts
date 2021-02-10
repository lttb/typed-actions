import {UPDATE, UPDATE_FULFILLED, UPDATE_FAILED} from './actions'
import type {State, Actions} from './actions'
import {handleActions} from '../index'
import type {Handlers} from '../index'

// providing all reducers is not required
export const reducer_1 = handleActions({} as Handlers<State, Actions>)

// @ts-expect-error cannot return a state shape instead of state✅
export const reducer_2 = handleActions({
  [UPDATE]: () => ({}),
} as Handlers<State, Actions>)

// payload is inferred correctly sinec it is assignable to data property ✅
export const reducer_3 = handleActions({
  [UPDATE_FULFILLED]: (state, {payload}) => ({
    ...state,
    data: payload,
    status: 'done',
  }),
} as Handlers<State, Actions>)

// @ts-expect-error: unknownField property raises an error when value is not one of $Values<State>
export const reducer_4 = handleActions({
  [UPDATE]: (state) => ({
    ...state,
    unknownField: 'I SHOULD NOT BE HERE',
  }),
} as Handlers<State, Actions>)

/**
 * ❌ unknownField does not raise an error for $Values<State>
 * This is expected. It is a limitation  of $Exact util implementation
 * without custom $Exact typescript does not raise an error for any addional fields
 */
export const reducer_5 = handleActions({
  [UPDATE_FAILED]: (state, action) => ({
    ...state,
    ready: action.meta.sync,
    status: 'failed',
    unknownField: true,
  }),
} as Handlers<State, Actions>)

export const reducer_6 = handleActions({
  [UPDATE_FAILED]: (state, action): State => ({
    //                              ^^^^^ explicit return type
    ...state,
    ready: action.meta.sync,
    status: 'failed',
    // @ts-expect-error: to avoid additional fields State should be specified as a return type explicitly
    unknownField: true,
  }),
} as Handlers<State, Actions>)
