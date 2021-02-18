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

export type Handlers<S extends unknown, A extends AbstractActions> = {
    [K in keyof A]?: (state: S, action: ReturnType<A[K]>) => void;
}

export declare function handleActions<T extends Handlers<any, AbstractActions>>(arg: T, state?: ExtractStateFromHandlers<T>): Reducer<ExtractStateFromHandlers<T>, ExtractActionsFromHandlers<T>>
