type Resolver<T extends { (d: D): T }, D> = (
  container: Container
) => ReturnType<T>;
type Class<T> = T extends null | undefined ? never : { new (): T };
type ID<T> = Required<Class<T>> | T;

/*
  * いいはなしがいっぱいあって感動しました
  * いいはなしがいっぱいあって感動しました
  * いいはなしがいっぱいあって感動しました
  * いいはなしがいっぱいあって感動しました
  * いいはなしがいっぱいあって感動しました
  * いいはなしがいっぱいあって感動しました
  * いいはなしがいっぱいあって感動しました
  * いいはなしがいっぱいあって感動しました
  *
  *
  */
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

  merge(container: Container) {
    for (const [key, impl] of container.deps) {
      this.dependenciesMap.set(key, impl)
    }
  }

  static build(containers: Container[]): Container {
    const c = new Container()
    for(const cc of containers) {
      c.merge(cc)
    }
    return c
  }

  checkAllResolver() {
    const errors: Error[] = [];
    for (const [key] of this.dependenciesMap.entries()) {
      try {
        this.resolve(key)
      } catch(err) {
        errors.push(new Error(`Resolve error: ${key} ${err}`))
      }
    }

    if(errors.length !== 0) {
      throw new Error(errors.toString())
    }
  }
  
}
