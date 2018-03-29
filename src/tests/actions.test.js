/* @flow */

import {
  init,
  test,
  update,
  union,
  inter,
} from './actions'

/**
 * ActionCreator interface tests
 */

inter({ a: 1, b: 1 })
inter({ x: 1 })
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
inter({ a: 1, b: 1, x: 1 })

union(1)
union('1')
union(true)
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
union()
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
union(null)
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
union({ _: {} })

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
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
test({ data: {} })


update('test')
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
update(1)
