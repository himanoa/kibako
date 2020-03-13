module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true
    }
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "no-unused-vars": "off",
    "complexity": ["warn", { max: 10 }]
  }
};
