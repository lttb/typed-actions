/* @flow */

import { type Reducer } from 'redux-actions'

export type ArgumentType = <T, R>((T) => R) => T & T

export type ReturnType = <T, R>(T => R) => R

export type Frozen<V> = $ReadOnly<FrozenMapper<V>>
type FrozenMapper<V> = $Exact<$ObjMap<V, InnerFrozen>>
type InnerFrozen =
    & (<V: Object>(V) => $ReadOnly<FrozenMapper<V>>)
    & (<V: (Array<any> | $ReadOnlyArray<any>)>(V) => $TupleMap<V, InnerFrozen>)
    & (<V>(V) => V)


type Action<T, Rest> = Frozen<{type: T, ...$Exact<Rest>}>


type MapAction = <K, A, R, V: (A) => R>(
  actionType: K,
  actionCreator: V
) => $Call<(A => R) => ((A) => Action<K, R>), V>

export type Actions<A> = $ObjMap<$ObjMapi<A, MapAction>, <A, R>((A & A) => R) => ((A) => R)>

type SafeExact =
  & (<V: Object>(V) => $Exact<V>)
  & (<V>(V) => V)

type MapReducer<S> = <Args, ActionType>(
    (...args: Args) => ActionType
) => Reducer<$Call<SafeExact, S>, $Exact<{...$Exact<ActionType>}>>

export type Handlers<S, A> = $Shape<$ObjMap<A, MapReducer<S>>>
