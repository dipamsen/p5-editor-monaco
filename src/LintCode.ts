import { EdFile as File } from "./FileManager";

const ESLint: typeof import("eslint") = require("./eslint");

export default function lintCode(file: File) {
  const linter = new ESLint.Linter();
  return linter.verify(
    file.content,
    {
      parserOptions: {
        ecmaVersion: 2020,
      },
      rules: {},
    },
    file.name
  );
}
