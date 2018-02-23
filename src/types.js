/* @flow */

import { type Reducer } from 'redux-actions'

export type ArgumentType = <T, R>((T) => R) => T & T

export type ReturnType = <T, R>(T => R) => R

export type Frozen<V> = $ReadOnly<FrozenMapper<V>>
type FrozenMapper<V> = $Exact<$ObjMap<V, InnerFrozen>>
type InnerFrozen =
    & (<V: Object>(V) => $ReadOnly<FrozenMapper<V>>)
    & (<V: Array<any>>(V) => $TupleMap<V, InnerFrozen>)
    & (<V>(V) => V)


type Action<T, Rest> = Frozen<{type: T, ...$Exact<Rest>}>


type MapAction = <K, A, R, V, X: (A) => R>(
  actionType: K,
  actionCreator: X
) => $Call<(A => R) => ((A) => Action<K, R>), X>

export type Actions<A> = $ObjMap<$ObjMapi<A, MapAction>, <A, R>((A & A) => R) => ((A) => R)>


type MapReducer<S> = <Args, ActionType>(
    (...args: Args) => ActionType
) => Reducer<$ReadOnly<S>, $Exact<{...$Exact<ActionType>}>>

export type Handlers<S, A> = $Shape<$ObjMap<A, MapReducer<S>>>
