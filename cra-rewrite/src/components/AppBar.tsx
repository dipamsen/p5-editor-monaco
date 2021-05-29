import GitHubButton from "./GithubButton";

export default function AppBar() {
  return (
    <div>
      <h1>p5.js Online Editor</h1>
      <div>
        Built with{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://microsoft.github.io/monaco-editor/"
        >
          Monaco Editor
        </a>
      </div>
      <div>
        Inspired by{" "}
        <a target="_blank" rel="noreferrer" href="https://editor.p5js.org">
          p5.js Web Editor
        </a>
      </div>
      <p>
        <GitHubButton />
      </p>
    </div>
  );
}
