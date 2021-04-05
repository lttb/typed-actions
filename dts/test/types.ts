import type {Frozen} from '../types'

type Extends<A, B> = A extends B ? true : never;

export type Result = Frozen<{
    num: number;
    bool: boolean;
    str: 'foo';
    tuple: [number, string];
    obj: {
        undef: undefined;
        nil: null;
    };
}>

export const checkDeepFreeze
    : Extends<
        Result,
        {
            readonly num: number;
            readonly bool: boolean;
            readonly str: 'foo';
            readonly tuple: readonly [number, string];
            readonly obj: {
                readonly undef: undefined;
                readonly nil: null;
            };
        }
        > = true;

type StringFrozen = Frozen<'foo'>;

export const checkPrimitiveFreeze: Extends<StringFrozen, 'foo'> = true

type TupleFrozen = Frozen<['foo', 'bar']>;

export const checkTupleFreeze: Extends<TupleFrozen, readonly ['foo', 'bar']> = true
