import { consoleClear, consoleLogs, mainElt } from "./DOMElements";

class MagicConsole {
  static logs: string[] = [];
  static init() {
    this.logs = new Proxy(this.logs, {});
  }
  static clear() {
    this.logs.length = 0;
    consoleLogs.innerHTML = "";
  }
  static append(elt: HTMLElement) {
    consoleLogs.append(elt);
    // elt.scrollIntoView(false);
    const topBar = consoleLogs.parentElement.previousElementSibling;
    const full = consoleLogs.parentElement.parentElement;
    consoleLogs.style.height = full.clientHeight - topBar.clientHeight + "px";
  }
}

MagicConsole.init();

consoleClear.addEventListener("click", () => MagicConsole.clear());

export default MagicConsole;
