type Resolver<T extends { (d: D): T }, D> = (
  container: Container
) => ReturnType<T>;
type Class<T> = T extends null | undefined ? never : { new (): T };
type ID<T> = Required<Class<T>> | T;

export default class Container {
  private dependenciesMap = new Map();

  constructor() {}

  get deps() {
    return this.dependenciesMap.entries();
  }

  bind<T extends { (deps: object): ReturnType<T> }>(
    key: ID<T>,
    resolver: Resolver<T, ReturnType<T>>
  ) {
    this.dependenciesMap.set(key, resolver);
  }

  resolve<T extends { (): ReturnType<T> }>(key: ID<T>): ReturnType<T> {
    const resolver = this.dependenciesMap.get(key);
    if (resolver) {
      return resolver(this);
    }
    throw new Error(`${key} is not defined`);
  }
}
