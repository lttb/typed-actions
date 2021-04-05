import {UPDATE, UPDATE_FULFILLED, UPDATE_FAILED, BOOL_ACTION} from './actions'
import type {State, Actions} from './actions'
import {handleActions} from '../immer'
import type {Handlers} from '../immer'

// providing all reducers is not required
export const reducer_1 = handleActions({} as Handlers<State, Actions>)

export const reducer_2 = handleActions({
  [UPDATE]: () => ({}),
} as Handlers<State, Actions>)

// payload is inferred correctly sinec it is assignable to data property ✅
export const reducer_3 = handleActions({
  [UPDATE_FULFILLED]: (state, {payload}) => {
    state.data = payload;
    state.status = 'done';
  },
  [UPDATE_FAILED]: (state, {payload, meta}) => {
    state.data = [payload];
    // correct meta type ✅
    state.ready = meta.sync,
    state.status = 'done';
  },
} as Handlers<State, Actions>)

export const reducer_4 = handleActions({
  [UPDATE]: (state) => {
    // @ts-expect-error: unknownField does not exist on State
    state.unknownField = 'I SHOULD NOT BE HERE';
  },
} as Handlers<State, Actions>)

type BoolState = boolean;

// accepts the second argument the same type as state
export const bool_reducer_1 = handleActions({
    [BOOL_ACTION]: (state, {payload}) => state && payload,
} as Handlers<BoolState, Actions>, false)

// does not accept the second argument that's not of type State
export const bool_reducer_2 = handleActions(
    {
        [BOOL_ACTION]: (state, {payload}) => state && payload,
    } as Handlers<BoolState, Actions>,
    // @ts-expect-error Argument of type '"string"' is not assignable to parameter of type 'boolean | undefined'.
    'string',
)
