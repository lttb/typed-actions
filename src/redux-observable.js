/* @flow */

/* eslint-disable import/no-unresolved, import/extensions */

import type { Observable } from 'rxjs/Observable'

import type { ReturnType } from './types'

export type Epic<S, Actions, D> = (
  action$: ActionObservable<Actions, *>,
  store: {getState(): S},
  dependencies: D,
) => Observable<*>;

interface ActionObservable<Actions, A> extends Observable<A> {
  ofType: <T: $Subtype<string>>(...args: T[]) => ActionObservable<
    Actions,
    $ElementType<$ObjMap<Actions, ReturnType>, T>
  >;
}
