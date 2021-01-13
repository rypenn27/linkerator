import React, { useState } from "react";

import { getLinks } from "../api";

const SearchBar = ({ setResults }) => {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const { links } = await getLinks();

    setResults(links);
  }

  return (
    <div id="search">
      <h3>Look up links here...</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Link name"
          value={text}
          onChange={handleTextChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
