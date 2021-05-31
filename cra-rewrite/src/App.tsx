import React from "react";
import "./App.css";
import AppBar from "./components/AppBar";

function App() {
  return (
    <div className="App">
      <AppBar />
      <main>
        <EditorPane />
      </main>
    </div>
  );
}

export default App;
