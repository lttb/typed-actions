/* @flow */

import produce from 'immer'

import type { Reducer } from 'redux-actions'

import type { SafeExact, InnerFrozen, ReturnType } from './types'

type MapReducer<S> = <ActionType, State: $Call<InnerFrozen, S>>(
  (...args: any[]) => ActionType
) => ($Call<SafeExact, S>, ActionType, State) => (State | void)

export type Handlers<S, A> = $Shape<$ObjMap<A, MapReducer<S>>>

/* eslint-disable no-redeclare */
declare function handleActions<S, A: {}>(
  Handlers<S, A>,
  ?(S | {||})
): Reducer<S, $Values<$ObjMap<A, ReturnType>>>

export function handleActions(handlers, defaultState = {}) {
  return (state = defaultState, action) => produce(state, (draft) => {
    if (handlers[action.type]) handlers[action.type](draft, action, state)
  })
}
/* eslint-enable no-redeclare */
