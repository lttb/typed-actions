/* @flow */

export type ArgumentType = <T, R>((T) => R) => T & T

export type ReturnType = <T, R>((...args: T) => R) => R

export type Frozen<V> = $ReadOnly<FrozenMapper<V>>
type FrozenMapper<V> = $Exact<$ObjMap<V, InnerFrozen>>
export type InnerFrozen =
  & (<V: Object>(V) => $ReadOnly<FrozenMapper<V>>)
  & (<V: Array<any>>(V) => $TupleMap<V, InnerFrozen>)
  & (<V: $ReadOnlyArray<any>>(V) => $TupleMap<V, InnerFrozen>)
  & (<V>(V) => V)


type Action<T: $Subtype<string>, Rest> = {|type: T, ...$Exact<Rest>|}

/* eslint-disable no-redeclare */
declare function arguments<A>((A) => any): [A]
declare function arguments<A, B>((A, B) => any): [A, B]
declare function arguments<A, B, C>((A, B, C) => any): [A, B, C]

export type Arguments<T> = $Call<typeof arguments, T>

/**
 * A function to locate errors well after $ObjMap.
 *
 * @see https://github.com/facebook/flow/issues/5785
 */

declare function locate<A, B, C, D, E, F, R>((
  A | (B & void),
  C | (D & void),
  E | (F & void),
) => R): ((
  A | (void & null & empty),
  C | (void & null & empty),
  E | (void & null & empty),
) => R)

declare function locate<A, B, C, D, R>((
  A | (B & void),
  C | (D & void),
) => R): ((
  A | (void & null & empty),
  C | (void & null & empty),
) => R)

declare function locate<A, B, R>((
  A | (B & void),
) => R): ((
  // a hack to get rid of extra unions without type loss
  A | (void & null & empty),
) => R)

declare function locate<A, R>(
  A => R,
): (A => R)
/* eslint-enable no-redeclare */

export type Actions<Collection> = $ObjMap<$ObjMapi<Collection, <
  K, V, R, A, B, C,
>(K, V) => $Call<
  & (((...args: [A, B, C]) => R) => (A, B, C) => Action<K, R>)
  & (((...args: [A, B]) => R) => (A, B) => Action<K, R>)
  & (((...args: [A]) => R) => (A) => Action<K, R>)
, V>>, typeof locate>

export type SafeExact =
  & (<V: Object>(V) => $Exact<V>)
  & (<V>(V) => V)
