# typed-actions

[![Travis branch](https://img.shields.io/travis/lttb/typed-actions/master.svg?style=flat)](https://travis-ci.org/lttb/typed-actions)
[![npm version](https://img.shields.io/npm/v/typed-actions.svg?style=flat)](https://www.npmjs.com/package/typed-actions)
[![npm license](https://img.shields.io/npm/l/typed-actions.svg?style=flat)](https://www.npmjs.com/package/typed-actions)


Some Types and Utils (based on [redux-actions](https://github.com/reduxactions/redux-actions) way) to create type-safe actions, reducers, and epics with auto-inferred types.

**Main points**:
- 100% Flow coverage for the redux-side with minimum typings (auto-inferred types) and less boilerplate
- Safe types and functions, which help to reduce risks for Type mistakes
- Accurate Type-errors handling
- Deep immutable Type (`Frozen`) for actions and redux state
- [Immer](https://github.com/mweststrate/immer) support

## Installation

```sh
npm install typed-actions
```

## Usage

> You can get some examples [here](https://github.com/lttb/typed-actions/tree/master/src/tests) with explanations.

- [Actions](#actions)
- [Reducers](#reducers)
  - [Immer](#immer)
- [Epics](#epics)

### Actions
Actions are compatible with [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)

- `action(payload, ?meta)` produces `{type, payload} | {type, payload, meta}`
- `error(payload, ?meta)` produces `{type, payload, error: true} | {type, payload, meta, error: true}`
- `empty()` produces `{type}`


```js
import {createActions, action, empty} from 'typed-actions'
import type {EntityId} from '../types';

/**
 * Declare Action Types as constants and export them
 */
export const UPDATE = '@namespace/UPDATE'
export const UPDATE_FULFILLED = '@namespace/UPDATE_FULFILLED'
export const UPDATE_FAILED = '@namespace/UPDATE_FAILED'

/**
 * Create Actions Collection
 */
const actions = createActions({
    /**
     * {type: UPDATE}
     */
    [UPDATE]: empty,
    /**
     * {type: UPDATE_FULFILLED, payload: EntityId[]}
     */
    [UPDATE_FULFILLED]: (x: EntityId[]) => action(x),
    /**
     * {type: UPDATE_FAILED, payload: EntityId, meta: {sync: true}}
     */
    [UPDATE_FAILED]: (x: EntityId) => action(x, {sync: true}),
})

/**
 * Export Action Creators
 */
export const {
    [UPDATE]: update,
    [UPDATE_FULFILLED]: updateFulfilled,
    [UPDATE_FAILED]: updateFailed,
} = actions

/**
 * Export Collection Type
 */
export type Actions = typeof actions
```

You might find this declaration style more readable:

```js
let actions

export const {
    [UPDATE]: update,
    [UPDATE_FULFILLED]: updateFulfilled,
    [UPDATE_FAILED]: updateFailed,
} = actions = createActions({
    [UPDATE]: empty,
    [UPDATE_FULFILLED]: (x: EntityId[]) => action(x)
    [UPDATE_FAILED]: (x: EntityId) => action(x, {sync: true}),
})

export type Actions = typeof actions
```

### Reducers

```js
import {handleActions, type Handlers, type Frozen} from 'typed-actions';
import type {EntityId} from '../types';

/**
 * Import action types with Actions Collection Type
 */
import {
    type Actions,
    UPDATE,
    UPDATE_FULFILLED,
    UPDATE_FAILED,
} from './actions';

/**
 * Declare State for the reducer
 */
export type State = {
    data: EntityId[],
    status: 'done' | 'pending' | 'failed',
};

/**
 * Use Handlers Type for the type-casting.
 * This way functions will get right arguments Types
 */
export default handleActions(({
    /**
     * No need to point the State Type in arguments,
     * it would be auto-inferred Deep Immutable Type of State
     */
    [UPDATE]: state => ({
        ...state,
        status: 'pending',
    }),

    /**
     * The second argument (action) will also have the right type
     * {type: UPDATE_FULFILLED, payload: EntityId[]}
     */
    [UPDATE_FULFILLED]: (state, {payload}) => ({
        ...state,
        data: payload,
        status: 'done',
    }),

    [UPDATE_FAILED]: state => ({
        ...state,
        status: 'failed',
    }),
}: Handlers<State, Actions>));
```

#### Immer

You can use [immer](https://github.com/mweststrate/immer) for immutable state modifying.

> Note that `handler` accepts 3 arguments: `draft state` (for changes), `action` and `current state`.

```js
import { type Handlers, handleActions } from 'typed-actions/immer'
import type {EntityId} from '../types';

import {
    type Actions,
    UPDATE,
    UPDATE_FULFILLED,
    UPDATE_FAILED,
} from './actions';

export type State = {
    data: EntityId[],
    status: 'done' | 'pending' | 'failed',
};

export default handleActions(({
    [UPDATE]: state => {
        state.status = 'pending'
    },

    [UPDATE_FULFILLED]: (state, {payload}) => {
        state.data = payload
        state.status = 'done'
    },

    [UPDATE_FAILED]: state => {
        state.status = 'failed'
    },
}: Handlers<State, Actions>));
```

### Epics

If you're using [redux-observable](https://github.com/redux-observable/redux-observable), this Epic Type could be useful.

```js
import type {Epic} from 'typed-actions/redux-observable';

import {
    type Actions,
    UPDATE_FULFILLED,
    anotherOneAction,
} from './actions';

import {type State} from './reducers';

export const updateEpic: Epic<State, Actions> = action$ => action$
    .ofType(UPDATE_FULFILLED)
    /**
     * No need to add types here, action would be the right Type out of the box
     */
    .map(action => anotherOneAction(action.payload));

export const unionEpic: Epic<State, Actions> = action$ => action$
    .ofType(UPDATE, UPDATE_FULFILLED)
    /**
     * {type: UPDATE} | {type: UPDATE_FULFILLED, payload: EntityId[]}
     */
    .map(action => {
        if (action.type === UPDATE_FULFILLED) {
            /**
             * Type Refinement will work as well
             *
             * {type: UPDATE_FULFILLED, payload: EntityId[]}
             */
            console.log(action.payload)
        }
    });
```

Just to note, if you're using `dependencies` in epics, you can pass its type in as the third argument.

```js
type Dependencies = {api: () => void}

export const epic: Epic<State, Actions, Dependencies> = action$ => action$
```

The recommended way is to redeclare your own `Epic` type with custom dependencies and use it, like:

```js
// types.js
import type {Epic} from 'typed-actions/redux-observable'

type Dependencies = {api: () => void}

export type Epic<S, A, D = Dependencies> = Epic<S, A, D>

// epics.js
import type {Epic} from './types'

export const epic: Epic<State, Actions> = action$ => action$
```
