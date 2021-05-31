export function htmlToElement(html: string): HTMLElement {
  const template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.children[0] as HTMLElement;
}
export const fileNameElt = document.querySelector<HTMLDivElement>(".filename");
export const runnerElt = document.querySelector<HTMLDivElement>(".runbtn");
export const stopperElt = document.querySelector<HTMLDivElement>(".stopbtn");

export const editorContainerElt =
  document.querySelector<HTMLDivElement>("#editor");
export const iFrameElt = document.querySelector("iframe");

export const mainElt = document.querySelector("main");

export const fileChooser = document.querySelector<HTMLDivElement>(".files");
export const filePickerMain =
  document.querySelector<HTMLDivElement>(".filepicker");
