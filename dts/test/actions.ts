/* eslint-disable flowtype/no-types-missing-file-annotation */
/* eslint-disable import/no-unresolved */
import {
  action, empty, error, createActions,
} from '../index'

export const UPDATE = '@namespace/UPDATE'
export const EMPTY = '@namespace/EMPTY'
export const UPDATE_FULFILLED = '@namespace/UPDATE_FULFILLED'
export const UPDATE_FAILED = '@namespace/UPDATE_FAILED'
export const BOOL_ACTION = '@namespace/BOOL_ACTION'
export const ERR_ACTION = '@namespace/ERR_ACTION'
export const ERR_META_ACTION = '@namespace/ERR_META_ACTION'

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
  [BOOL_ACTION]: (x: boolean) => action(x),
  [ERR_ACTION]: (x: number) => error(x),
  [ERR_META_ACTION]: (x: number, m: number) => error(x, m),
})

export const {
  [UPDATE]: update,
  [UPDATE_FULFILLED]: updateFulfilled,
  [UPDATE_FAILED]: updateFailed,
  [BOOL_ACTION]: boolAction,
  [ERR_ACTION]: errAction,
  [ERR_META_ACTION]: errMetaAction,
} = actions

export type Actions = typeof actions

/**
 * Tests start
 */

const checkInferedActionsType: {
    '@namespace/UPDATE': () => {type: '@namespace/UPDATE'},
    '@namespace/EMPTY': () => {type: '@namespace/EMPTY'},
    '@namespace/UPDATE_FULFILLED': (arg: EntityId[]) => {type: '@namespace/UPDATE_FULFILLED', payload: EntityId[]},
    '@namespace/UPDATE_FAILED': (arg: EntityId, meta: {sync: true}) => {type: '@namespace/UPDATE_FAILED', payload: EntityId, meta: {sync: true}},
    '@namespace/BOOL_ACTION': (arg: boolean) => {type: '@namespace/BOOL_ACTION', payload: boolean},
    '@namespace/ERR_ACTION': (arg: number) => {type: '@namespace/ERR_ACTION'; payload: number; error: true},
    '@namespace/ERR_META_ACTION': (arg: number, meta: number) => {type: '@namespace/ERR_META_ACTION'; payload: number; meta: number, error: true},
} = actions

const testUpdate: () => {type: '@namespace/UPDATE'} = update
const testUpdateFulffilled: (x: EntityId[]) => {type: '@namespace/UPDATE_FULFILLED', payload: EntityId[]} = updateFulfilled
const testUpdateFailed: (x: EntityId, meta: {sync: true}) => {type: '@namespace/UPDATE_FAILED', payload: EntityId, meta: {sync: true}} = updateFailed
const testErrAction: (x: number) => {type: '@namespace/ERR_ACTION', payload: number, error: true} = errAction
const testErrMetaAction: (x: number, m: number) => {type: '@namespace/ERR_META_ACTION', payload: number, meta: number, error: true} = errMetaAction

/* eslint-disable no-console */
console.log(
    checkInferedActionsType,
    testUpdate,
    testUpdateFulffilled,
    testUpdateFailed,
    testErrAction,
    testErrMetaAction,
)
