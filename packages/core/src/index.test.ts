import Container from "./index";

const targetFn = (deps: { dep1: string }) => () => deps.dep1;
const container = new Container();

container.bind("foo", () => "foo");
container.bind(targetFn, (container) =>
  targetFn({ dep1: container.resolve("foo") })
);

describe("Container", () => {
  describe("#get", () => {
    it("should be container state", () => {
      expect(Array.from(container.deps).length).toBe(2);
    });
  });
  describe("#resolve", () => {
    describe("when dependencies can not be resolved", () => {
      it("should be resoled", () => {
        expect(() => {
          container.resolve("doo");
        }).toThrowError("doo is not defined");
      });
    });
    describe("when dependencies can be resolved", () => {
      it("should be resoled", () => {
        const target = container.resolve(targetFn);
        expect(target()).toBe("foo");
      });
    });
  });
});
