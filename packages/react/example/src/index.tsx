import React from 'react';
import ReactDOM from 'react-dom';
import Container from "@kibako/core";
import { useImpl, KibakoContext } from "@kibako/react";

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
container.bind(buildBar, (c) => buildBar(c.resolve({deps: buildFoo})))

const App = () => {
  const bar = useImpl(buildBar)

  return <button onClick={bar}>Click me</button>
}

ReactDOM.render(
  <React.StrictMode>
    <KibakoContext.Provider value={container}>
      <App />
    </KibakoContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
