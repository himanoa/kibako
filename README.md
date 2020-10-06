## Kibako

Kibako is IoC container library written in TypeScript

### Installation

`yarn install @kibako/core`

### Usages

For example

```typescript
import { Container } from "@kibako/core"

const container  = new Container()

// -- Injectable implementation

type Foovar = {}
type FoobarApiService = () => Promise<Foobar>

const foobarServiceBuilder: (deps: { apiClient: (option: any) => Promise<any> }) => FoobarApiService = (deps) => () => {
  return deps.apiClient(...)
}

// -- register

container.bind(foobarServiceBuilder, () => {
  foobarServiceBuilder({apiClient: () => Promise.resolve({})})
})

// -- Using foobarServiceBuilder implementation

container.resolve(foobarServiceBuilder)()

```
