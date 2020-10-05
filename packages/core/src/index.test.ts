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

  describe("#merge", () => {
    it("should be not resolved", () => {
      const c = new Container();
      // eslint-disable-next-line
      function fn(_deps: {}) {
        return () => 2112;
      }
      c.bind(fn, () => {
        return fn({});
      });
      expect(() => container.resolve(fn)()).toThrowError();
    });

    it("should be resolved", () => {
      const c = new Container();
      // eslint-disable-next-line
      function fn(_deps: {}) {
        return () => 2112;
      }
      c.bind(fn, () => {
        return fn({});
      });
      container.merge(c);
      expect(container.resolve(fn)()).toEqual(2112);
    });
  });

  describe("build", () => {
    it("should be resolved", () => {
      const c = new Container();
      // eslint-disable-next-line
      function fn(_deps: {}) {
        return () => 2112;
      }
      c.bind(fn, () => {
        return fn({});
      });
      const cons = Container.build([container, c]);
      expect(cons.resolve(fn)()).toEqual(2112);
      expect(cons.resolve(targetFn)()).toEqual("foo");
    });
  });

  describe("#checkAllResolver", () => {
    it("should be ok", () => {
      expect(container.checkAllResolver()).toBe(undefined);
    });

    it("should be throw error", () => {
      const c = new Container();
      c.bind(
        () => {},
        () => {
          throw Error();
        }
      );
      c.bind(
        () => {},
        () => {
          throw Error("foo");
        }
      );
      expect(() => c.checkAllResolver()).toThrowErrorMatchingInlineSnapshot(
        `"Error: Resolve error: () => { } Error,Error: Resolve error: () => { } Error: foo"`
      );
    });
  });
});
