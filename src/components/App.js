import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import { getLinks } from "../api";
import SearchResults from "./SearchResults";
import Header from "./Header";
import NewLinkForm from "./NewLinkForm";
import "./App.css";

const App = () => {
  const [links, setLinks] = useState("");

  useEffect(() => {
    getLinks()
      .then((response) => {
        console.log(response);
        setLinks([]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  function handleClick() {
    fetch("/potato")
      .then((res) => {
        console.log("the res", res);
        return res.json();
      })
      .then((data) => console.log("the data", data))
      .catch(console.error);
  }

  return (
    <div className="App">
      <Header />
      <div className="main-panel">
        <div className="content">
          <h1>Search for links</h1>
          <Searchbar setResults={setLinks}></Searchbar>
          <SearchResults results={links} />
          <button onClick={handleClick}> Server Test</button>
        </div>
        <div className="aside">
          <NewLinkForm />
        </div>
      </div>
    </div>
  );
};

export default App;
