import "./style.css";
import * as monaco from "monaco-editor";
import OutputFrame from "./OutputFrame";
import { FileManager } from "./FileManager";
import manipulate from "./manipulate";

manipulate(monaco);

import editor from "./EditorInstance";
import {
  closeFileList,
  filePickerMain,
  openFileList,
  runnerElt,
  stopperElt,
} from "./DOMElements";

const files = new FileManager();
const outputHandler = new OutputFrame(files);
editor.addAction({
  id: "run-code",
  label: "Run the Code",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
  run: reloadFrame,
});

editor.addAction({
  id: "format-run-code",
  label: "Format the Code",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
  run: () => {
    editor.getAction("editor.action.formatDocument").run();
    reloadFrame();
  },
});
runnerElt.addEventListener("click", reloadFrame);
stopperElt.addEventListener("click", stopPlaying);

function reloadFrame() {
  outputHandler.renderSketch();
}
function stopPlaying() {
  outputHandler.stop();
}

function toggleFileList() {
  openFileList.classList.toggle("hide");
  closeFileList.classList.toggle("hide");
  filePickerMain.classList.toggle("hidden");
  document.querySelector(".spacer").classList.toggle("hide");
}

openFileList.addEventListener("click", toggleFileList);
closeFileList.addEventListener("click", toggleFileList);

editor.addAction({
  id: "toggle-file-names",
  label: "Show/Hide File Names",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B],
  run: toggleFileList,
});
