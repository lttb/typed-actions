/* eslint-disable flowtype/no-types-missing-file-annotation */
/* eslint-disable import/no-unresolved */
import {
  action, empty, createActions,
} from '../index'

export const UPDATE = '@namespace/UPDATE'
export const EMPTY = '@namespace/EMPTY'
export const UPDATE_FULFILLED = '@namespace/UPDATE_FULFILLED'
export const UPDATE_FAILED = '@namespace/UPDATE_FAILED'

export type EntityId = {id: number}
export type State = {
  status: 'done' | 'pending' | 'error' | 'failed';
  ready: boolean;
  data?: EntityId[];
}

const actions = createActions({
  /**
   * {type: EMPTY}
   */
  [EMPTY]: empty,
  /**
   * {type: UPDATE}
   */
  [UPDATE]: action,
  /**
   * {type: UPDATE_FULFILLED, payload: EntityId[]}
   */
  [UPDATE_FULFILLED]: (x: EntityId[]) => action(x),
  /**
   * {type: UPDATE_FAILED, payload: EntityId, meta: {sync: true}}
   */
  [UPDATE_FAILED]: (x: EntityId, meta: {sync: true}) => action(x, meta),
})

export const checkInferedActionsType: {
    '@namespace/UPDATE': () => {type: '@namespace/UPDATE'},
    '@namespace/EMPTY': () => {type: '@namespace/EMPTY'},
    '@namespace/UPDATE_FULFILLED': (arg: EntityId[]) => {type: '@namespace/UPDATE_FULFILLED', payload: EntityId[]},
    '@namespace/UPDATE_FAILED': (arg: EntityId, meta: {sync: true}) => {type: '@namespace/UPDATE_FAILED', payload: EntityId, meta: {sync: true}},
} = actions

export const {
  [UPDATE]: update,
  [UPDATE_FULFILLED]: updateFulfilled,
  [UPDATE_FAILED]: updateFailed,
} = actions

export type Actions = typeof actions
