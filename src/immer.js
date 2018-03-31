/* @flow */

import produce from 'immer'

import type { Reducer } from 'redux-actions'

import type { SafeExact, InnerFrozen, Frozen } from './types'

type MapReducer<S> = <ActionType>(
  (...args: any[]) => ActionType
) => (S, ActionType, $Call<InnerFrozen, S>) => (void | S)

export type Handlers<S, A> = $Shape<$ObjMap<A, MapReducer<$Call<SafeExact, S>>>>

/* eslint-disable no-redeclare */
declare function handleActions<S, A: {}>(
  Handlers<S, A>,
  ?(S | {||})
): Reducer<S, $Values<$ObjMap<A, <T, R>((...args: T) => R) => Frozen<R>>>>

export function handleActions(handlers, defaultState = {}) {
  return (state = defaultState, action) => produce(state, (draft) => {
    if (!handlers[action.type]) return undefined

    return handlers[action.type](draft, action, state)
  })
}
/* eslint-enable no-redeclare */
