/* @flow */

import type { Actions } from './types'

const entries
  : <T: Object>(T) => $TupleMap<$Keys<T>, <V: string>(V) => [V, $ElementType<T, V>]>
  = (Object.entries: any)

const { assign } = Object

export const createActions
  : <A: Object>(A) => Actions<A>
  = actions => entries(actions).reduce((acc, [type, actionCreator]) => ({
    ...acc,
    [type]: data => assign({ type }, actionCreator(data)),
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
/* eslint-enable no-redeclare */
