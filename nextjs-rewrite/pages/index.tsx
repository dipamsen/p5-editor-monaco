import Head from "next/head";
import AppBar from "../components/AppBar";
import EditorPane from "../components/EditorPane";
import OutputPane from "../components/OutputPane";
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>p5.js Online Editor</title>
      </Head>
      <AppBar />
      <main className={styles.flex}>
        <EditorPane />
        <OutputPane />
      </main>
    </div>
  );
}
