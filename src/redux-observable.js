/* @flow */

/* eslint-disable import/no-unresolved, import/extensions */

import type { Observable } from 'rxjs/Observable'

export type Epic<S, Actions, D> = (
  action$: ActionObservable<Actions, *>,
  store: {getState(): S},
  dependencies: D,
) => Observable<*>;

interface ActionObservable<Actions, A> extends Observable<A> {
  ofType: <T: $Subtype<string>>(...args: T[]) => ActionObservable<
    Actions,
    /**
     * Make Actions flatten by $Exact trick for the better readability in epics
     */
    $ElementType<$ObjMap<Actions, <T, R>(T => R) => $Exact<{...$Exact<R>}>>, T>
  >;
}
