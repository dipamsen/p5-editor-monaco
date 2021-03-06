import * as monaco from "monaco-editor";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import * as Snippets from "./snippets.json";
import p5Def from "./p5.global.txt";
import editor from "./EditorInstance";
import { consoleLogs, iFrameElt } from "./DOMElements";
import Prettier from "prettier";
import Babel from "prettier/parser-babel";
const ESLint: typeof import("eslint") = require("./eslint");
/** @ts-ignore */
import CustomDef from "./assets/custom-def.d.ts";
/** @ts-ignore */
import GlobalDef from "./assets/p5/global.d.ts";
import ColorProvider from "./ColorProvider";
import MagicConsole from "./MagicConsole";

const S = Array.from(Snippets) as Snippet[];
interface Snippet {
  prefix: string;
  body: string[];
  description: string;
}

export default function manipulate(M: typeof monaco) {
  // EMMET support for HTML and CSS
  emmetHTML(M);
  emmetCSS(M);

  // Closing Tag for HTML
  M.languages.registerCompletionItemProvider("html", {
    triggerCharacters: [">"],
    provideCompletionItems: (model, position) => {
      const codePre: string = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const tag = codePre.match(/.*<(\w+)>$/)?.[1];
      if (!tag) return { suggestions: [] };
      const word = model.getWordUntilPosition(position);
      return {
        suggestions: [
          {
            label: `</${tag}>`,
            kind: M.languages.CompletionItemKind.EnumMember,
            insertText: `</${tag}>`,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            },
          },
        ],
      };
    },
  });

  // BuiltIn VSCode JavaScript Snippets
  M.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: S.map(({ prefix, body, description }) => ({
          label: prefix,
          kind: M.languages.CompletionItemKind.Snippet,
          documentation: description,
          insertText: body.join("\n"),
          range,
          insertTextRules:
            M.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        })),
      };
    },
  });

  // Color Provider in JavaScript
  M.languages.registerColorProvider("javascript", new ColorProvider());

  M.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  M.languages.typescript.javascriptDefaults.setCompilerOptions({
    allowNonTsExtensions: true,
    allowJs: true,
    checkJs: true,
  });

  const i = M.Uri.file("p5.instance.d.ts");
  M.languages.typescript.javascriptDefaults.addExtraLib(
    CustomDef,
    i.toString()
  );
  M.editor.createModel(CustomDef, "typescript", i);
  const g = M.Uri.file("p5.global.d.ts");
  M.languages.typescript.javascriptDefaults.addExtraLib(
    GlobalDef,
    g.toString()
  );
  M.editor.createModel(GlobalDef, "typescript", g);

  // @ts-ignore
  window.typings = {
    add(uri: string, name: string) {
      fetch(uri)
        .then((r) => r.text())
        .then((lib) => {
          const u = M.Uri.file(`${name}.d.ts`);
          M.languages.typescript.javascriptDefaults.addExtraLib(
            lib,
            u.toString()
          );
          M.editor.createModel(lib, "typescript", u);
        });
    },
  };

  // @ts-ignore
  // Helper Function for Matter.js
  window.addMatterJS = () => {
    // @ts-ignore
    window.typings.add(
      "https://cdn.jsdelivr.net/gh/DefinitelyTyped/DefinitelyTyped/types/matter-js/index.d.ts",
      "Matter"
    );
  };
  // Add p5.js AutoComplete + IntelliSense
  // const url = M.Uri.file("p5.global.d.ts");
  // M.languages.typescript.javascriptDefaults.addExtraLib(p5Def, url.toString());
  // M.editor.createModel(p5Def, "typescript", url);

  // ESLint Code Action
  editor.addAction({
    id: "lint-code",
    label: "Lint the Code",

    run(editor) {
      const l = new ESLint.Linter();

      const errors = l.verify(editor.getValue(), {});
      console.log(errors);
    },
  });

  // Prettier Code Action
  editor.addAction({
    id: "format-code",
    label: "Format Code with Prettier",
    keybindings: [M.KeyMod.CtrlCmd | M.KeyMod.Shift | M.KeyCode.KEY_F],
    run() {
      editor.getAction("editor.action.formatDocument").run();
    },
  });

  // Prettier Code Formatter
  M.languages.registerDocumentFormattingEditProvider("javascript", {
    provideDocumentFormattingEdits(model, options, token) {
      console.log("Formatting");
      const code = model.getValue();
      const result = Prettier.format(code, {
        parser: "babel",
        plugins: [Babel],
      });

      return [
        {
          range: model.getFullModelRange(),
          text: result,
        },
      ];
    },
    displayName: `Prettier ${Prettier.version}`,
  });

  window.addEventListener("message", (ev) => {
    if (ev.source == iFrameElt.contentWindow) {
      console.log(ev);
      // console.log(ev.data.map(JSON.parse));
      const elt = document.createElement("div");
      elt.textContent = ev.data;
      MagicConsole.append(elt);
    }
  });
}
