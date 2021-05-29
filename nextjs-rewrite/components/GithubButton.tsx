import Image from "next/image";
import styles from "../styles/GithubButton.module.css";

export default function GitHubButton() {
  return (
    <a
      className={styles.ghbutton}
      href="https://github.com/dipamsen/p5-editor-monaco"
    >
      <img src="/github.svg" height={16} width={16} />
      <span className={styles.ghtext}>View Source on Github</span>
    </a>
  );
}
