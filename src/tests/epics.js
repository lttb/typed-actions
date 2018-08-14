/* @flow */

import { type Epic } from '../redux-observable'
import { type Actions, INIT, UPDATE } from './actions'
import { type State } from './reducers'

const testEpic
    : Epic<State, Actions>
    = action$ => action$
      .ofType(INIT, UPDATE)
      .map((action) => {
        if (action.type === INIT) {
          /**
           * $ExpectError
           *
           * There is no .payload for INIT action
           */
          (action.payload: string)
        } else {
          /**
           * $ExpectError
           *
           * payload is string
           */
          (action.payload: number)
        }

        return {}
      })

export default testEpic
