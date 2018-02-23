/* @flow */

import {
  init,
  test,
  update,
} from './actions'

/**
 * ActionCreator interface tests
 */

init()
init(undefined)
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
init(null)


test({ data: { nestedData: 'test' } })
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
test({ data: { nestedData: 1 } })


update('test')
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
update(1)
