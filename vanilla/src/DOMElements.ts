export const fileNameElt = document.querySelector<HTMLDivElement>(".filename");
export const runnerElt = document.querySelector<HTMLDivElement>(".runbtn");
export const stopperElt = document.querySelector<HTMLDivElement>(".stopbtn");

export function htmlToElement(html: string): HTMLElement {
  var template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.children[0] as HTMLElement;
}

export const editorContainerElt =
  document.querySelector<HTMLDivElement>("#editor");
export const iFrameElt = document.querySelector("iframe");

export const mainElt = document.querySelector<HTMLDivElement>(".main");

export const fileChooser = document.querySelector<HTMLDivElement>(".files");
export const filePickerMain =
  document.querySelector<HTMLDivElement>(".filepicker");
