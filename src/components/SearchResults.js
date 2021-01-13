import React from "react";

import "./SearchResults.css";
import Bookmark from "./Bookmark";

const SearchResults = ({ results }) => {
  return (
    <div id="results">
      <h3>Links Found: ({results.length} results):</h3>
      <div className="linkList">
        {results ? (
          results.map((result) => (
            <Bookmark key={result.id} bookmark={result} />
          ))
        ) : (
          <div>no results</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
