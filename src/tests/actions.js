/* @flow */

import { createActions, action, empty } from '../'

let actions

export const TEST = '@namespace/TEST'
export const INIT = '@namespace/INIT'
export const UPDATE = '@namespace/UPDATE'

export const {
  [TEST]: test,
  [INIT]: init,
  [UPDATE]: update,
} = actions = createActions({
  [TEST]: (x: {data: {nestedData: string}}) => action(x),
  [INIT]: empty,
  [UPDATE]: (x: string) => action(x),
})

export type Actions = typeof actions
