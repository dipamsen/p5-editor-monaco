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

window.onresize = () =>
  editor.layout({
    width: (mainElt.clientWidth - filePickerMain.clientWidth) / 2,
    height: editor.getDomNode().clientHeight,
  });
export default editor;
