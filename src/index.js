/* @flow */

import { type Reducer } from 'redux-actions'
import baseHandleActions from 'redux-actions/lib/handleActions'
import { type Actions, type Handlers } from './types'

const entries
  : <T: Object>(T) => $TupleMap<$Keys<T>, <V: string>(V) => [V, $ElementType<T, V>]>
  = (Object.entries: any)

const { assign } = Object

export * from './types'

export const createActions
  : <A: Object>(A) => Actions<A>
  = actions => entries(actions).reduce((acc, [type, actionCreator]) => ({
    ...acc,
    [type]: data => assign({ type }, actionCreator(data)),
  }), {})

export const handleActions
  : <S, A>(Handlers<S, A>, ?(S | {||})) => Reducer<S, A>
  = (handlers, defaultState) => baseHandleActions(handlers, defaultState || {})

export const empty
  : (void) => void
  = () => undefined

/* eslint-disable no-redeclare */
declare function action<P>(payload: P): {|payload: P|}
declare function action<P, M>(payload: P, meta: M): {|payload: P, meta: M|}

export function action(payload, meta) {
  return (meta !== undefined ? { payload, meta } : { payload })
}
/* eslint-enalbe no-redeclare */
