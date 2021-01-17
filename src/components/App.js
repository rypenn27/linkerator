import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import { getLinks } from "../api";
import SearchResults from "./SearchResults";
import Header from "./Header";
import NewLinkForm from "./NewLinkForm";
import "./App.css";

const App = () => {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getLinks()
      .then((response) => {
        response.sort((a, b) => b.count - a.count);
        setLinks(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.length === 0) {
      console.log("Setting filtered links to ", links);
      setFilteredLinks(links);
    } else {
      setFilteredLinks(
        links.filter((link) => {
          if (link.linkname.toLowerCase().includes(searchTerm.toLowerCase()))
            return true;

          for (let tag of link.tags) {
            if (tag.toLowerCase().includes(searchTerm.toLowerCase()))
              return true;
          }
          return false;
        })
      );
    }
  }, [searchTerm, links]);

  return (
    <div className="App">
      <Header />
      <div className="main-panel">
        <div className="content">
          <h1>Search for links</h1>
          <Searchbar setSearchTerm={setSearchTerm}></Searchbar>
          <SearchResults results={filteredLinks} setLinks={setLinks} />
        </div>
        <div className="aside">
          <NewLinkForm />
        </div>
      </div>
    </div>
  );
};

export default App;
