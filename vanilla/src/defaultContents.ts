import { EXTERNAL_LINK_REGEX } from "./FileUtils";

export const defaultJS = `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`;

export const defaultHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/addons/p5.sound.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
`;

export const defaultCSS = `html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
`;

export const consoleErrorScript = `
var nativeConsoleLog = console.log
console.log = function log(...args) {
  parent.postMessage(args)
  nativeConsoleLog.call(null, ...args)
}
`;
