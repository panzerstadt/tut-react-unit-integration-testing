import React from "react";
import logo from "./logo.svg";
import "./App.css";

import CommentForm from "./components/CommentForm";
import ImageCard from "./components/ImageCard";
import useFetch from "./components/Api";

import img from "./assets/19023.jpeg";

function App() {
  const [state, doFetch] = useFetch("https://httpbin.org/get?id=1", {});

  return (
    <div className="App">
      <header className="App-header">
        <CommentForm />
        <ImageCard src={img} title="Team Lab" author="@someone" />
        <div style={{ color: "white" }}>
          {state.data && state.data.args && state.data.args.id}
        </div>
      </header>
    </div>
  );
}

export default App;
