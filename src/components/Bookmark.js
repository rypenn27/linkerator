import React from "react";
import { incrementClickCount } from "../api";

import "./Bookmark.css";

const Bookmark = ({ bookmark, setLinks }) => {
  const linkClick = async () => {
    const newLink = await incrementClickCount(bookmark);
    setLinks((links) =>
      links.map((link) => {
        if (link.id === newLink.id) return newLink;
        return link;
      })
    );
  };

  return (
    <div className="Bookmark">
      <div className="url">
        <p className="linkname">
          <a
            onClick={linkClick}
            target="_blank"
            href={
              bookmark.linkname.startsWith("http")
                ? bookmark.linkname
                : "http://" + bookmark.linkname
            }
          >
            {bookmark.linkname}
          </a>
        </p>
        <p className="count">{bookmark.count}</p>
        <p className="comment">{bookmark.comment}</p>
      </div>
    </div>
  );
};

export default Bookmark;
