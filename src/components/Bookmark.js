import React from "react";

import "./Bookmark.css";

const Bookmark = ({ key, bookmark }) => {
  return (
    <div className="Bookmark">
      <div className="url">
        <p className="linkname">{bookmark.linkname}</p>
        <p className="count">{bookmark.count}</p>
        <p className="comment">{bookmark.comment}</p>
      </div>
    </div>
  );
};

export default Bookmark;
