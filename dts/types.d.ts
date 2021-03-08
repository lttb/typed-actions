export type Frozen<T> = Readonly<InnerFrozen<T>>
export type InnerFrozen<T> = T extends object
  ? Readonly<{[K in keyof T]: InnerFrozen<T[K]>}>
  : T extends any[]
    ? ReadonlyArray<T[number]>
    : T

export type Arguments<T extends (...args: any) => any> = Parameters<T>
