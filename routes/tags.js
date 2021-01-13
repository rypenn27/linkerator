const express = require("express");
const tagsRouter = express.Router();

const { getAllTags, getAllLinks, createLink } = require("../db/index");

tagsRouter.get("/:tagName/links", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const alllinks = await getLinksByTagName(tagName);
    res.send({
      alllinks,
    });
  } catch ({ linkname, message }) {
    next({ linkname, message });
  }
});

module.exports = tagsRouter;
