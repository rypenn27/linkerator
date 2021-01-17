import React, { useState } from "react";

const SearchBar = ({ setSearchTerm }) => {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(text);
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
