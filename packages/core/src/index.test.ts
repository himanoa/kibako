import Container from "./index"

const targetFn = (deps: {dep1: string}) => () => 2
const container  = new Container()

container.bind("foo", () => "foo")
container.bind(targetFn, (container) => targetFn(container.resolve("foo")))

describe("Container", () => {
  describe("#resolve", () => {
    describe("when dependencies can not be resolved", () => {
      it("should be resoled", () => {
        expect(() => { container.resolve("doo") }).toThrowError(
          "doo is not defined"
        )
      })
    })
    describe("when dependencies can be resolved", () => {
      it("should be resoled", () => {
        const target = container.resolve(targetFn)
        expect(target()).toBe(2)
      })
    })
  })
})
