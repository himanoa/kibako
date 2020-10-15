declare type Resolver<T extends {
    (d: D): T;
}, D> = (container: Container) => ReturnType<T>;
declare type Class<T> = T extends null | undefined ? never : {
    new (): T;
};
declare type ID<T> = Required<Class<T>> | T;
export default class Container {
    private dependenciesMap;
    constructor();
    get deps(): IterableIterator<[any, any]>;
    bind<T extends {
        (deps: object): ReturnType<T>;
    }>(key: ID<T>, resolver: Resolver<T, ReturnType<T>>): void;
    resolve<T extends {
        (): ReturnType<T>;
    }>(key: ID<T>): ReturnType<T>;
    merge(container: Container): void;
    static build(containers: Container[]): Container;
    checkAllResolver(): void;
}
export {};
