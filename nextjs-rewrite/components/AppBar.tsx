import GitHubButton from "./GithubButton";

export default function AppBar() {
  return (
    <div>
      <h1>p5.js Online Editor</h1>
      <div>
        Built with{" "}
        <a href="https://microsoft.github.io/monaco-editor/">Monaco Editor</a>
      </div>
      <div>
        Inspired by <a href="https://editor.p5js.org">p5.js Web Editor</a>
      </div>
      <div>
        <GitHubButton />
      </div>
    </div>
  );
}
