/* @flow */

import { createActions, action, empty } from '../'

let actions

export const TEST = 'Namespace/TEST'
export const INIT = 'Namespace/INIT'
export const UPDATE = 'Namespace/UPDATE'

export const {
  [INIT]: init,
  [UPDATE]: update,
} = actions = createActions({
  [TEST]: (x: {data: {nestedData: string}}) => action(x),
  [INIT]: empty,
  [UPDATE]: (x: string) => action(x),
})

export type Actions = typeof actions
