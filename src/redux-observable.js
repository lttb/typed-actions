/* @flow */

/* eslint-disable import/no-unresolved, import/extensions */

import { Observable } from 'rxjs/Observable'

import { type ReturnType } from './types'

export type Epic<S, Actions, D> = (
  action$: ActionObservable<
    Actions,
    $Values<$ObjMap<Actions, <V>(V) => $Call<ReturnType, V>>>
  >,
  store: {getState(): S},
  dependencies: D,
) => Observable<*>;

class ActionObservable<Actions, A> extends Observable<A> {
  ofType: <T>(...keys: T) => ActionObservable<Actions, $ElementType<
    $TupleMap<T, <V>(V) => $Call<ReturnType, $ElementType<Actions, V>>>,
    number
  >>;
}
