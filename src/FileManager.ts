import * as monaco from "monaco-editor";
import editor from "./EditorInstance";
import { defaultCSS, defaultHTML, defaultJS } from "./defaultContents";
import {
  closeFileList,
  fileChooser,
  fileNameElt,
  htmlToElement,
  openFileList,
} from "./DOMElements";
import { TEXT_FILE_REGEX } from "./FileUtils";

export class FileManager extends Array<EdFile> {
  static instance: FileManager;
  constructor() {
    super();
    // TypeScript Limitation: https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, FileManager.prototype);

    FileManager.instance = this;

    this.push(
      new EdFile(defaultJS, "sketch.js"),
      new EdFile(defaultHTML, "index.html"),
      new EdFile(defaultCSS, "style.css")
    );

    this.focus(0);
  }
  focus(num: number) {
    const f = this[num];
    this.forEach((n) => n.setAsInactive());
    f.setAsActive();
    fileNameElt.innerText = f.name;
  }
}

export class EdFile {
  private uri: monaco.Uri;
  private model: monaco.editor.IModel | undefined;
  focused: boolean = false;
  active: boolean;
  blobUrl: string | undefined;
  fileBlob: File | undefined;
  private _domElt;
  constructor(content: string, name: string) {
    const manager = FileManager.instance;
    this.uri = monaco.Uri.file(name);
    if (this.editableAsText)
      this.model = monaco.editor.createModel(content, null, this.uri);
    this._domElt = htmlToElement(`<div class="file">
    <button></button>
    </div>`);
    this._domElt.firstElementChild.textContent = this.name;
    fileChooser.append(this._domElt);
    this._domElt.addEventListener("click", () =>
      manager.focus(manager.indexOf(this))
    );
  }
  get path() {
    return this.uri.path;
  }
  get name() {
    return this.path.split("/").pop();
  }
  get type() {
    const p = this.uri.fsPath;
    return p.endsWith("/") || p.endsWith("\\") ? "folder" : "file";
  }
  get extension() {
    return this.type == "file" ? this.path.split(".").pop() : null;
  }
  get editableAsText() {
    return TEXT_FILE_REGEX.test(this.path);
  }
  get content() {
    return this.model?.getValue();
  }
  setAsActive() {
    this.focused = true;
    this._domElt.classList.add("selected");
    editor.setModel(this.model);
  }
  setAsInactive() {
    this.focused = false;
    this._domElt.classList.remove("selected");
  }
  toJSON() {
    return {
      name: this.name,
      path: this.path,
      content: this.content,
      isSelected: this.focused,
      blobUrl: this.blobUrl,
    };
  }
}
