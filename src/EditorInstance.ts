import * as monaco from "monaco-editor";
import { editorContainerElt, filePickerMain, mainElt } from "./DOMElements";

// @ts-expect-error
window.U = monaco.Uri;

const editor = monaco.editor.create(editorContainerElt, {
  theme: "vs-dark",
  tabSize: 2,
  insertSpaces: true,
  fontSize: 20,
  "semanticHighlighting.enabled": true,
});

// @ts-ignore
window.layout = (arg) => editor.layout(arg);

editor;

window.onresize = () => editor.layout();
export default editor;
