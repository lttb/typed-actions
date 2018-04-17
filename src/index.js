/* @flow */

import type { Reducer } from 'redux-actions'
import baseHandleActions from 'redux-actions/lib/handleActions'
import type { InnerFrozen, Frozen } from './types'

export * from './types'
export * from './actions'

type MapReducer<S> = <A>((...args: any) => A) => (S, {...$Exact<Frozen<A>>}) => S

type Handlers<S, A> = $Shape<$ObjMap<A, MapReducer<$Call<InnerFrozen, S>>>>

/**
 * There is an issue with imports ordering.
 *
 * When you export types A and B (that uses A), if you'll import type B before the A,
 * there will be some strange issues in some cases.
 *
 * This way we 'bound' the type declared in file to force flow use the correct type.
 *
 * TODO: (@lttb) need to open a @flowtype issue with a simple example.
 */
type _Handlers<S, A> = Handlers<S, A>
export type { _Handlers as Handlers }


/* eslint-disable no-redeclare */
declare function handleActions<S, A: {}>(
  _Handlers<S, A>,
  ?(S | {||}),
): Reducer<S, $Values<$ObjMap<A, <T, R>((...args: T) => R) => Frozen<R>>>>

export function handleActions(handlers, defaultState = {}) {
  return baseHandleActions(handlers, defaultState)
}
/* eslint-enable no-redeclare */
