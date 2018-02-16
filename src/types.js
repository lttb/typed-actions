/* @flow */

export type ArgumentType = <T, R>((T) => R) => T & T

export type ReturnType = <T, R>(T => R) => R

export type Frozen<A> = $ReadOnly<$Exact<$ObjMap<A, (<V: Object>(V) => Frozen<V>) & <V>(V) => V>>>


type Action<T, Rest> = Frozen<{
  ...$Exact<{type: T}>,
  ...$Exact<Rest>,
}>


type MapActionData<A> = $ObjMap<A, ReturnType>
type MapActionArgs<A> = $ObjMap<A, ArgumentType>


type MapAction<ActionArgsMap> = <K, V>(
  actionType: K,
  actionData: V
) => (args: $ElementType<ActionArgsMap, K>) => Action<K, V>

export type Actions<A> = $ObjMapi<MapActionData<A>, MapAction<MapActionArgs<A>>>


type MapReducer<S> = <A>(A) => ($ReadOnly<$Shape<S>>, A) => $ReadOnly<$Shape<S>>

export type Handlers<S, A> = $Shape<$ObjMap<MapActionData<A>, MapReducer<S>>>
