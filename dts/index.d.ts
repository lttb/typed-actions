import type {Reducer} from 'redux-actions';

// utils
type AbstractActions = Record<string, (...args: any) => any>;
type $Exact<T> = T & {[key in string]?: T[keyof T] | never};
export type ExtractActionsFromHandlers<H extends Handlers<any, AbstractActions>> = {
    [K in keyof H]: Required<H>[K] extends (...args: [any, infer Action, ...any[]]) => any ? Action : never;
}[keyof H];
export type ExtractStateFromHandlers<H extends Handlers<any, AbstractActions>> = {
    [K in keyof H]: Required<H>[K] extends (...args: [infer State, ...any[]]) => any ? State : never;
}[keyof H];

declare function action(): {type: string};
declare function action<T>(arg: T): {type: string; payload: T};
declare function action<T, M>(arg: T, meta: M): {type: string; payload: T; meta: M};
declare function action(arg?: any, meta?: any): {type: string; payload?: any; meta?: any};

declare function error<T>(arg: T): {type: string; payload: T, error: true};
declare function error<T, M>(arg: T, meta: M): {type: string; payload: T; meta: M, error: true};
declare function error(arg?: any, meta?: any): {type: string, payload?: any, meta?: any, error: true};

declare function empty(): {type: string};

declare function createActions<T extends AbstractActions>(
    arg: T,
): {
    [K in keyof T]: ReturnType<T[K]> extends {error: true}
        ? Parameters<T[K]> extends [infer P, infer M]
            ? (arg: P, meta: M) => {type: K, payload: P, meta: M, error: true}
            : Parameters<T[K]> extends [infer P]
                ? (arg: P) => {type: K, payload: P, error: true}
                : () => {type: K, payload: undefined, error: true}
        : Parameters<T[K]> extends [infer P, infer M]
            ? (arg: P, meta: M) => {type: K; payload: P; meta: M}
            : Parameters<T[K]> extends [infer P]
                ? (arg: P) => {type: K; payload: P}
                : () => {type: K};
};

export type Handlers<S, A extends AbstractActions> = {
    [K in keyof A]?: (state: S, action: ReturnType<A[K]>) => $Exact<S>
};

declare function handleActions<T extends Handlers<any, AbstractActions>>(arg: T, state?: ExtractStateFromHandlers<T>): Reducer<ExtractStateFromHandlers<T>, ExtractActionsFromHandlers<T>>

export {action, error, empty, createActions, handleActions}
