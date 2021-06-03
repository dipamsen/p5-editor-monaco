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

const resizable = function (resizer: HTMLElement) {
  const direction = resizer.getAttribute("data-direction") || "horizontal";
  const prevSibling = resizer.previousElementSibling as HTMLElement;
  const nextSibling = resizer.nextElementSibling as HTMLElement;

  // The current position of mouse
  let x = 0;
  let y = 0;
  let prevSiblingHeight = 0;
  let prevSiblingWidth = 0;

  // Handle the mousedown event
  // that's triggered when user drags the resizer
  const mouseDownHandler = function (e: MouseEvent) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;
    const rect = prevSibling.getBoundingClientRect();
    prevSiblingHeight = rect.height;
    prevSiblingWidth = rect.width;

    // Attach the listeners to `document`
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e: MouseEvent) {
    // How far the mouse has been moved
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    switch (direction) {
      case "vertical":
        const h =
          ((prevSiblingHeight + dy) * 100) /
          resizer.parentElement.getBoundingClientRect().height;
        prevSibling.style.height = `${h}%`;
        break;
      case "horizontal":
      default:
        const w =
          ((prevSiblingWidth + dx) * 100) /
          resizer.parentElement.getBoundingClientRect().width;
        prevSibling.style.width = `${w}%`;
        break;
    }

    const cursor = direction === "horizontal" ? "col-resize" : "row-resize";
    resizer.style.cursor = cursor;
    document.body.style.cursor = cursor;

    prevSibling.style.userSelect = "none";
    prevSibling.style.pointerEvents = "none";

    nextSibling.style.userSelect = "none";
    nextSibling.style.pointerEvents = "none";

    editor.layout();
  };

  const mouseUpHandler = function () {
    resizer.style.removeProperty("cursor");
    document.body.style.removeProperty("cursor");
    setTimeout(() => {
      prevSibling.style.removeProperty("user-select");
      prevSibling.style.removeProperty("pointer-events");

      nextSibling.style.removeProperty("user-select");
      nextSibling.style.removeProperty("pointer-events");
    });

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  // Attach the handler
  resizer.addEventListener("mousedown", mouseDownHandler);
};

document.querySelectorAll(".resizer").forEach(resizable);
