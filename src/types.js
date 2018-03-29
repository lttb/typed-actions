/* @flow */

export type ArgumentType = <T, R>((T) => R) => T & T

export type ReturnType = <T, R>(T => R) => R

export type Frozen<V> = $ReadOnly<FrozenMapper<V>>
type FrozenMapper<V> = $Exact<$ObjMap<V, InnerFrozen>>
type InnerFrozen =
  & (<V: Object>(V) => $ReadOnly<FrozenMapper<V>>)
  & (<V: Array<any>>(V) => $TupleMap<V, InnerFrozen>)
  & (<V: $ReadOnlyArray<any>>(V) => $TupleMap<V, InnerFrozen>)
  & (<V>(V) => V)


type Action<T: $Subtype<string>, Rest> = Frozen<{type: T, ...$Exact<Rest>}>

/* eslint-disable no-redeclare */
declare function locate<A, B, R>(
  (A | (B & void)) => R
// a hack to get rid of extra unions without type loose
): ($Either<A, void & null & empty> => R)

declare function locate<A, R>(
  A => R
): (A => R)
/* eslint-enable no-redeclare */

export type Actions<A> = $ObjMap<
  $ObjMapi<A, <K, A, R>(K, (A) => R) => (A) => Action<K, R>>,
  typeof locate
>

type SafeExact =
  & (<V: Object>(V) => $Exact<V>)
  & (<V>(V) => V)

type MapReducer<S> = <Args, ActionType>(
  (...args: Args) => ActionType
) => ($Call<SafeExact, S>, ActionType) => $Call<InnerFrozen, S>

export type Handlers<S, A> = $Shape<$ObjMap<A, MapReducer<S>>>
