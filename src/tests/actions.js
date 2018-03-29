/* @flow */

import { createActions, action, empty } from '../'

let actions

export const TEST = '@namespace/TEST'
export const INIT = '@namespace/INIT'
export const UPDATE = '@namespace/UPDATE'
export const UNION = '@namespace/UNION'
export const INTER = '@namespace/INTER'

export const {
  [TEST]: test,
  [INIT]: init,
  [UPDATE]: update,
  [UNION]: union,
  [INTER]: inter,
} = actions = createActions({
  [TEST]: (x: {data: {nestedData: string}}) => action(x),
  [INIT]: empty,
  [UPDATE]: (x: ?string) => action(x),
  [UNION]: (x: string | number | boolean) => action(x),
  [INTER]: (x: ($Exact<{a: 1, b: 1}>) | $Exact<{x: 1}>) => action(x),
})

export type Actions = typeof actions
