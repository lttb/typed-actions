/* @flow */

import type { Reducer } from 'redux-actions'
import baseHandleActions from 'redux-actions/lib/handleActions'
import type { InnerFrozen, Frozen } from './types'

export * from './types'
export * from './actions'

type MapReducer<S> = <ActionType>(
  (...args: any[]) => ActionType
) => (S, $Call<InnerFrozen, ActionType>) => S

export type Handlers<S, A> = $Shape<$ObjMap<A, MapReducer<$Call<InnerFrozen, S>>>>

/* eslint-disable no-redeclare */
declare function handleActions<S, A: {}>(
  Handlers<S, A>,
  ?(S | {||}),
): Reducer<S, $Values<$ObjMap<A, <T, R>(T => R) => Frozen<R>>>>

export function handleActions(handlers, defaultState = {}) {
  return baseHandleActions(handlers, defaultState)
}
/* eslint-enable no-redeclare */
