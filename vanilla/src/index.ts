import "./style.css";
import * as monaco from "monaco-editor";
import p5Def from "./p5.global.txt";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import * as Snippets from "./snippets.json";

emmetHTML(monaco);
emmetCSS(monaco);

monaco.languages.registerCompletionItemProvider("html", {
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
          kind: monaco.languages.CompletionItemKind.EnumMember,
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

monaco.languages.registerCompletionItemProvider("javascript", {
  provideCompletionItems(model, position) {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    return {
      suggestions: Snippets.map(({ prefix, body, description }) => ({
        label: prefix,
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: description,
        insertText: body.join("\n"),
        range,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      })),
    };
  },
});

const buttons = document.querySelectorAll<HTMLDivElement>(".tabs .tab");
const runner = document.querySelector<HTMLDivElement>(".runbtn");

monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: false,
  noSyntaxValidation: false,
});

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  allowNonTsExtensions: true,
  allowJs: true,
  checkJs: true,
});

fetch(p5Def)
  .then((res) => res.text())
  .then((p5Definition) => {
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      p5Definition,
      "p5.global.d.ts"
    );
    monaco.editor.createModel(p5Definition, "javascript");
  });

const editor = monaco.editor.create(document.getElementById("editor"), {
  theme: "vs-dark",
  tabSize: 2,
  insertSpaces: true,
  fontSize: 20,
  "semanticHighlighting.enabled": true,
});

const jsModel = monaco.editor.createModel(
  `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`,
  "javascript"
);
editor.setModel(jsModel);

const htmlModel = monaco.editor.createModel(``, "html");

const cssModel = monaco.editor.createModel(
  `html, body {
  margin: 0;
  padding: 0;
  background-color: white;
}
canvas {
  display: block;
}
`,
  "css"
);

const models = [jsModel, htmlModel, cssModel];

const iframe = document.querySelector("iframe");
reloadFrame();
function reloadFrame() {
  iframe.srcdoc = `
  <!DOCTYPE html>
<html lang="en">
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/addons/p5.sound.min.js"></script>
    <style>
      ${cssModel.getValue()}
      </style>
    <meta charset="utf-8" />
    
    </head>
  <body>
  ${htmlModel.getValue()}
  <script>
  ${jsModel.getValue()}
  </script>
  </body>
</html>

`;
}

editor.addAction({
  id: "run-code",
  label: "Run the Code",
  keybindings: [
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
  ],
  run: reloadFrame,
});

runner.onclick = reloadFrame;

onresize = () =>
  editor.layout({
    width: document.querySelector(".main").clientWidth / 2,
    height: editor.getDomNode().clientHeight,
  });

function tabClickHandler(i: number) {
  return () => {
    if (!buttons[i].classList.contains("active")) {
      editor.setModel(models[i]);
      buttons.forEach((x) => x.classList.remove("active"));
      buttons[i].classList.add("active");
    }
  };
}

buttons.forEach((x, i) => (x.onclick = tabClickHandler(i)));

// class MagicConsole {
//   private logMessages: string[];
//   private newMessagesHandler: (() => void)[] = [];
//   constructor(console: Console = window.console) {
//     this.logMessages = [];
//     const nativeLog = console.log;
//     const self = this;
//     console.log = function log(...args: string[]) {
//       self.newMessagesHandler.forEach((x) => x());
//       nativeLog(...args);
//       self.logMessages.push(...args.slice());
//     };
//   }
//   get messages() {
//     return this.logMessages;
//   }
//   clear() {
//     this.logMessages = [];
//   }
//   onNewMessage(fn: () => void) {
//     this.newMessagesHandler.push(fn);
//   }
// }
// const myConsole = new MagicConsole(iframe.contentWindow.console);
// myConsole.onNewMessage(() => {
//   DOMConsole.innerText = myConsole.messages.join("\n");
// });

// for (const [name, snippet] of Object.entries(Snippets)) {
//   snippet.
// }

// const x: monaco.languages.ProviderResult<>
