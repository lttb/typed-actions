/* @flow */

import { createActions, action, empty } from '../'

let actions

export const INIT = 'Namespace/INIT'
export const UPDATE = 'Namespace/UPDATE'

export const {
  [INIT]: init,
  [UPDATE]: update,
} = actions = createActions({
  [INIT]: empty,
  [UPDATE]: (x: string) => action(x),
})

export type Actions = typeof actions
