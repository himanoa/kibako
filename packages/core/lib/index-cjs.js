'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Container {
    constructor() {
        this.dependenciesMap = new Map();
    }
    get deps() {
        return this.dependenciesMap.entries();
    }
    bind(key, resolver) {
        this.dependenciesMap.set(key, resolver);
    }
    resolve(key) {
        const resolver = this.dependenciesMap.get(key);
        if (resolver) {
            return resolver(this);
        }
        throw new Error(`${key} is not defined`);
    }
    merge(container) {
        for (const [key, impl] of container.deps) {
            this.dependenciesMap.set(key, impl);
        }
    }
    static build(containers) {
        const c = new Container();
        for (const cc of containers) {
            c.merge(cc);
        }
        return c;
    }
    checkAllResolver() {
        const errors = [];
        for (const [key] of this.dependenciesMap.entries()) {
            try {
                this.resolve(key);
            }
            catch (err) {
                errors.push(new Error(`Resolve error: ${key} ${err}`));
            }
        }
        if (errors.length !== 0) {
            throw new Error(errors.toString());
        }
    }
}

exports.default = Container;
