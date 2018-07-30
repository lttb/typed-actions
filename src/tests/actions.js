/* @flow */

import { createActions, action, empty, error } from '../'

let actions

export const TEST = '@namespace/TEST'
export const INIT = '@namespace/INIT'
export const UPDATE = '@namespace/UPDATE'
export const UNION = '@namespace/UNION'
export const INTER = '@namespace/INTER'
export const ARITY2 = '@namespace/ARITY2'
export const ARITY3 = '@namespace/ARITY3'
export const ERROR = '@namespace/ERROR'
export const ERROR_META = '@namespace/ERROR_META'

export const {
  [TEST]: test,
  [INIT]: init,
  [UPDATE]: update,
  [UNION]: union,
  [INTER]: inter,
  [ARITY2]: arity2,
  [ARITY3]: arity3,
  [ERROR]: errorAction,
  [ERROR_META]: errorMetaAction,
} = actions = createActions({
  [TEST]: (x: {data: {nestedData: string}}) => action(x),
  [INIT]: empty,
  [UPDATE]: (x: ?string) => action(x),
  [UNION]: (x: string | number | boolean) => action(x),
  [INTER]: (x: ($Exact<{a: 1, b: 1}>) | $Exact<{x: 1}>) => action(x),
  [ARITY2]: (x: boolean, y: boolean) => action(x && y),
  [ARITY3]: (x: boolean, y: boolean, z: boolean) => action(x && y && z),
  [ERROR]: (x: string) => error(x),
  [ERROR_META]: (x: string) => error(x, { someData: true }),
})

export type Actions = typeof actions
