import "../styles/GithubButton.css";
import GithubLogo from "../assets/github.svg";

export default function GitHubButton() {
  return (
    <a
      className="ghbutton"
      href="https://github.com/dipamsen/p5-editor-monaco"
      target="_blank"
      rel="noreferrer"
    >
      <img alt="github logo" src={GithubLogo} height={16} width={16} />
      <span className="ghtext">View Source on Github</span>
    </a>
  );
}
