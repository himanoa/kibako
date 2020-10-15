import dts from "rollup-plugin-dts";
import typescript from 'rollup-plugin-typescript2';

const config = [
  {
    input: "./src/index.ts",
    output: [{ file: "lib/index-esm.js", format: "es" }],
    plugins: [typescript({ declarationDir: "./lib"})],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "lib/index-cjs.js", format: "cjs" }],
    plugins: [typescript()],
  },
  {
    input: "./lib/index.d.ts",
    output: [{ file: "./types/index.d.ts" }],
    plugins: [dts()],
  },
];

export default config;
