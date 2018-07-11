/* @flow */

import type { Actions } from '../types'

const entries
  : <T: Object>(T) => $TupleMap<$Keys<T>, <V: string>(V) => [V, $ElementType<T, V>]>
  = (Object.entries: any)

const { assign } = Object

export const createActions
  : <A: Object>(A) => Actions<A>
  = actions => entries(actions).reduce((acc, [type, actionCreator]) => ({
    ...acc,
    [type]: (...args) => assign({ type }, actionCreator(...args)),
  }), {})

export const empty
  : (void) => void
  = () => undefined

/* eslint-disable no-redeclare */
declare function actionResult<P>([P]): {|payload: P|}
declare function actionResult<P, M>([P, M]): {|payload: P, meta: M|}

declare function action<T>(...args: T): $Call<typeof actionResult, T>

export function action(payload, meta) {
  return (meta !== undefined ? { payload, meta } : { payload })
}

declare function errorResult<P>([P]): {|payload: P, error: true|}
declare function errorResult<P, M>([P, M]): {|payload: P, error: true, meta: M|}

declare function error<T>(...args: T): $Call<typeof errorResult, T>

export function error(payload, meta) {
  return (meta !== undefined ? { payload, error: true, meta } : { payload, error: true })
}
/* eslint-enable no-redeclare */
