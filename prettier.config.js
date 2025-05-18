/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  trailingComma: "all",
  arrowParens: "avoid",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
