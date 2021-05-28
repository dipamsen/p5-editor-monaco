import * as monaco from "monaco-editor";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import * as Snippets from "./snippets.json";
import p5Def from "./p5.global.txt";
import editor from "./EditorInstance";
import { iFrameElt } from "./DOMElements";
import Prettier from "prettier";
import Babel from "prettier/parser-babel";
const ESLint: typeof import("eslint") = require("./eslint");

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

      if (!tag) {
        return { suggestions: [] };
      }

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

  const regexForColorProvider =
    /(?<=(?:background|fill|stroke|color)\s*\()\s*(?:(?:[0-9]*[.]?[0-9]+)+[,\s]*)+(?=\))/gm;

  // Color Provider in JavaScript
  M.languages.registerColorProvider("javascript", {
    provideColorPresentations(model, colorInfo) {
      const color = colorInfo.color;
      let label;
      console.log(color);
      const colR = Math.round(color.red * 255);
      const colG = Math.round(color.green * 255);
      const colB = Math.round(color.blue * 255);
      const colA = Math.round(color.alpha * 255);
      if (colB === colG && colG === colR) {
        if (colA === 255) {
          label = `${colR}`;
        } else {
          label = `${colR}, ${colA}`;
        }
      } else {
        if (colA === 255) {
          label = `${colR}, ${colG}, ${colB}`;
        } else {
          label = `${colR}, ${colG}, ${colB}, ${colA}`;
        }
      }
      return [
        {
          label: `${label}`,
        },
      ];
    },

    provideDocumentColors(model, token) {
      const matches = model.findMatches(
        // @ts-expect-error
        regexForColorProvider,
        false,
        true,
        true,
        null,
        true
      );
      return matches
        .map((match) => {
          const colors = match.matches[0]
            .split(",")
            .map((x) => x.trim())
            .filter((x) => x)
            .map((x) => +x);
          let color = {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
          };
          switch (colors.length) {
            case 1: {
              color.red = colors[0] / 255;
              color.green = colors[0] / 255;
              color.blue = colors[0] / 255;
              color.alpha = 1;
              break;
            }
            case 2: {
              color.red = colors[0] / 255;
              color.green = colors[0] / 255;
              color.blue = colors[0] / 255;
              color.alpha = colors[1] / 255;
              break;
            }
            case 3: {
              color.red = colors[0] / 255;
              color.green = colors[1] / 255;
              color.blue = colors[2] / 255;
              color.alpha = 1;
              break;
            }
            case 4: {
              color.red = colors[0] / 255;
              color.green = colors[1] / 255;
              color.blue = colors[2] / 255;
              color.alpha = colors[3] / 255;
              break;
            }
            default: {
              color = null;
            }
          }
          return color
            ? {
                color,
                range: match.range,
              }
            : null;
        })
        .filter((x) => x);
    },
  });

  M.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  M.languages.typescript.javascriptDefaults.setCompilerOptions({
    allowNonTsExtensions: true,
    allowJs: true,
    checkJs: true,
  });

  // Add p5.js AutoComplete + IntelliSense
  const url = M.Uri.file("p5.global.d.ts");
  M.languages.typescript.javascriptDefaults.addExtraLib(p5Def, url.toString());
  M.editor.createModel(p5Def, "typescript", url);

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
    }
  });
}