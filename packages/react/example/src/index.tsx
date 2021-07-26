import React from 'react';
import ReactDOM from 'react-dom';
import Container from "@kibako/core";
import { createKibakoContext } from "../../src/";

const { KibakoContext, useImpl } = createKibakoContext()
const container = new Container();

function buildFoo(deps: {}) {
  return () => 114514
}

function buildBar(deps: {
  foo: () => number
}) {
  return () => deps.foo() + 12
}

container.bind(buildFoo, () => buildFoo({}))
container.bind(buildBar, (c) => buildBar({foo: c.resolve(buildFoo)}))

const App = () => {
  const bar = useImpl(buildFoo)

  return <button onClick={() => console.log(bar())}>Click me</button>
}

ReactDOM.render(
  <React.StrictMode>
    <KibakoContext.Provider value={container}>
      <App />
    </KibakoContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
