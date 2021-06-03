import { consoleClear, consoleLogs } from "./DOMElements";

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
    elt.scrollIntoView(false);
  }
}

MagicConsole.init();

consoleClear.addEventListener("click", () => MagicConsole.clear());

export default MagicConsole;
