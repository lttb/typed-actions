/* @flow */

export type ArgumentType = <T, R>((T) => R) => T & T
export type ReturnType = <T, R>((...args: T) => R) => R
