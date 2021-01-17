import React from "react";

import Bookmark from "./Bookmark";

const SearchResults = ({ results, setLinks }) => {
  return (
    <div id="results">
      <h3>Links Found: ({results.length} results):</h3>
      <div className="linkList">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id}>
              <Bookmark bookmark={result} setLinks={setLinks} />
            </div>
          ))
        ) : (
          <div>no results</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
